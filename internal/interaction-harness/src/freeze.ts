// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file freeze.ts
 * @input A Playwright `Page`, before the page under test loads
 * @output `installPageFreeze` (installs the page clock a freeze needs, before
 *   the page's own code runs), `freezePage` and `thawPage` (stop and restart a
 *   scene: its animations, its frames and timers, and every time it reads),
 *   `freezePageOn` (freeze in an input's own task), `freezePageWhen` (freeze
 *   on the first real frame a condition holds) and `advanceFrozenPage` (step
 *   a frozen scene by its own clock)
 * @position Input timed by the scene, not by the test process: a proof that
 *   must touch a component mid-animation freezes the scene where it wants the
 *   touch, touches, and thaws. The test process can be as slow as a loaded
 *   runner makes it; the scene waits.
 *
 * While frozen, every animation in the document is paused where it stands
 * (Web Animations, CSS animations and transitions), and so is any the page
 * starts meanwhile, at its start. The timer gate (`installTimerGate`) holds the
 * page's timers and frame callbacks. Every time the page reads stands still at
 * the freeze: `performance.now()`, `Date.now()`, `event.timeStamp`, frame
 * callback times, `document.timeline.currentTime` and `Animation.startTime`.
 * A `startTime` the page writes while frozen is kept and applied at the thaw,
 * so an animation the page starts "now" starts at the thaw. After a thaw those
 * times run again, behind real time by every frozen span so far, so the page's
 * own clock and its animations on the compositor agree as they did before the
 * freeze. An animation reads as it did before the freeze (`playState` is
 * still `running`).
 *
 * The clock is the page's, in script: no engine has a native freeze that
 * holds animations. Chromium's `Emulation.setVirtualTimePolicy` stops
 * `performance.now()` and timers but not Web Animations or frame callbacks in
 * the headless shell (300 ms into a pause the timeline had advanced 300 ms
 * and a compositor animation 45 px), and its `advance` policy cannot return to
 * real time: it fast-forwards whenever the page is idle.
 *
 * Opt-in: nothing changes on a page that does not call `installPageFreeze`.
 * Install it before the page loads (before `openStory`): code that kept a
 * bound `performance.now` before the install keeps the real clock. Then
 * `installTimerGate` as usual, after the page loaded.
 */

import type {Page} from '@playwright/test';

const FREEZE_SCRIPT = `(() => {
  if (window.__harnessFreeze) return;
  if (window.__harnessTimerGate) {
    throw new Error('installPageFreeze: install it before installTimerGate (and before the page loads)');
  }
  const perf = window.performance;
  const nativeNow = Performance.prototype.now;
  const rawNow = () => nativeNow.call(perf);
  const nativeDateNow = Date.now;
  const state = {offset: 0, frozenAt: null, dateFrozenAt: 0, timelineFrozenAt: null, held: new Set(), deferred: new Map(), watching: false};
  // Real time minus every frozen span so far; the freeze instant while frozen.
  const now = real => (state.frozenAt != null && real >= state.frozenAt ? state.frozenAt : real) - state.offset;
  Performance.prototype.now = function () { return now(nativeNow.call(this)); };
  Date.now = () => (state.frozenAt != null ? state.dateFrozenAt : nativeDateNow()) - state.offset;
  const define = (proto, name, make) => {
    const own = Object.getOwnPropertyDescriptor(proto, name);
    if (own) Object.defineProperty(proto, name, Object.assign({}, own, make(own)));
  };
  define(Event.prototype, 'timeStamp', d => ({get() { return now(d.get.call(this)); }}));
  const timelineProto = Object.getOwnPropertyDescriptor(AnimationTimeline.prototype, 'currentTime') ? AnimationTimeline.prototype : DocumentTimeline.prototype;
  // The timeline's time is its last frame's: frozen, it stays what it was.
  let timelineTime = null;
  define(timelineProto, 'currentTime', d => {
    timelineTime = d.get;
    // Never back: after a thaw the timeline's last frame can sit a little
    // before the frozen frame on the shifted clock.
    let last = -Infinity;
    return {get() {
      if (state.frozenAt != null) {
        last = Math.max(last, state.frozenAt - state.offset);
        return last;
      }
      const real = d.get.call(this);
      if (real == null) return real;
      last = Math.max(last, Number(real) - state.offset);
      return last;
    }};
  });
  const startTime = Object.getOwnPropertyDescriptor(Animation.prototype, 'startTime');
  const currentTime = Object.getOwnPropertyDescriptor(Animation.prototype, 'currentTime');
  const playState = Object.getOwnPropertyDescriptor(Animation.prototype, 'playState');
  const nativePause = Animation.prototype.pause;
  const nativePlay = Animation.prototype.play;
  const nativeCancel = Animation.prototype.cancel;
  const nativeFinish = Animation.prototype.finish;
  // Paused exactly where it stands: a pause alone completes on the next frame
  // (Chromium advances one more frame first; WebKit lost a time set by script).
  const hold = animation => {
    if (state.held.has(animation)) return;
    const at = currentTime.get.call(animation);
    nativePause.call(animation);
    if (at != null) currentTime.set.call(animation, at);
    state.held.add(animation);
  };
  const release = animation => { state.held.delete(animation); state.deferred.delete(animation); };
  Object.defineProperty(Animation.prototype, 'startTime', Object.assign({}, startTime, {
    get() {
      if (state.deferred.has(this)) return state.deferred.get(this);
      if (state.held.has(this)) {
        // Held, it reads as running: the start it had, on the page's clock.
        const at = currentTime.get.call(this);
        return at == null || this.playbackRate === 0 ? null : state.frozenAt - state.offset - Number(at) / this.playbackRate;
      }
      const real = startTime.get.call(this);
      return real == null ? real : Number(real) - state.offset;
    },
    set(value) {
      if (value == null) { state.deferred.delete(this); startTime.set.call(this, value); return; }
      if (state.frozenAt != null) {
        // Held where it would stand at the frozen instant; the thaw starts it.
        hold(this);
        state.deferred.set(this, Number(value));
        currentTime.set.call(this, (state.frozenAt - state.offset - Number(value)) * this.playbackRate);
        return;
      }
      startTime.set.call(this, Number(value) + state.offset);
    },
  }));
  Object.defineProperty(Animation.prototype, 'playState', Object.assign({}, playState, {
    get() { return state.held.has(this) ? 'running' : playState.get.call(this); },
  }));
  Animation.prototype.play = function () {
    if (state.frozenAt != null) { hold(this); return; }
    return nativePlay.call(this);
  };
  Animation.prototype.pause = function () { release(this); return nativePause.call(this); };
  Animation.prototype.cancel = function () { release(this); return nativeCancel.call(this); };
  Animation.prototype.finish = function () { release(this); return nativeFinish.call(this); };
  const nativeAnimate = Element.prototype.animate;
  Element.prototype.animate = function (...args) {
    const animation = nativeAnimate.apply(this, args);
    if (state.frozenAt != null) hold(animation);
    return animation;
  };
  // Frame callbacks get the page's time; the timer gate, installed after
  // this, holds them while frozen.
  const nativeFrame = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = callback => nativeFrame(time => callback(now(time)));
  // A CSS animation or transition the page starts while frozen: held at its
  // start on the next frame.
  const watch = () => {
    if (state.frozenAt == null) { state.watching = false; return; }
    for (const animation of document.getAnimations()) {
      if (!state.held.has(animation) && playState.get.call(animation) === 'running') {
        nativePause.call(animation);
        currentTime.set.call(animation, 0);
        state.held.add(animation);
      }
    }
    nativeFrame(watch);
  };
  window.__harnessFreeze = {
    // The real frames, for the harness's own waits while frozen.
    frame: nativeFrame,
    get frozen() { return state.frozenAt != null; },
    freeze() {
      if (state.frozenAt != null) return;
      state.frozenAt = rawNow();
      state.dateFrozenAt = nativeDateNow();
      const timeline = timelineTime == null ? null : timelineTime.call(document.timeline);
      state.timelineFrozenAt = timeline == null ? null : Number(timeline);
      // Each running animation is held at the freeze instant, not at the last
      // frame's time: the page's clock and its animations then agree exactly
      // (the screen moves on by less than a frame as the freeze lands).
      const ahead = state.timelineFrozenAt == null ? 0 : state.frozenAt - state.timelineFrozenAt;
      for (const animation of document.getAnimations()) {
        if (playState.get.call(animation) !== 'running') continue;
        const at = currentTime.get.call(animation);
        hold(animation);
        if (at != null) currentTime.set.call(animation, Number(at) + ahead * animation.playbackRate);
      }
      if (!state.watching) { state.watching = true; nativeFrame(watch); }
    },
    // Moves the frozen scene on by ms: the page's clock and every held
    // animation together, timers and frames still held.
    advance(ms) {
      if (state.frozenAt == null) throw new Error('advanceFrozenPage: the page is not frozen');
      state.offset -= ms;
      for (const animation of state.held) {
        if (state.deferred.has(animation)) {
          currentTime.set.call(animation, (state.frozenAt - state.offset - state.deferred.get(animation)) * animation.playbackRate);
        } else {
          const at = currentTime.get.call(animation);
          if (at != null) currentTime.set.call(animation, Number(at) + ms * animation.playbackRate);
        }
      }
    },
    thaw() {
      if (state.frozenAt == null) return;
      state.offset += rawNow() - state.frozenAt;
      state.frozenAt = null;
      const held = [...state.held];
      state.held.clear();
      for (const animation of held) {
        if (state.deferred.has(animation)) {
          const value = state.deferred.get(animation);
          state.deferred.delete(animation);
          startTime.set.call(animation, value + state.offset);
          continue;
        }
        // On from where it stood, dated now: a plain play() resolves its start
        // later, and WebKit then resumed at the start it had before the pause.
        const at = currentTime.get.call(animation);
        const timeline = timelineTime == null ? null : timelineTime.call(document.timeline);
        if (at != null && timeline != null && animation.playbackRate !== 0) {
          startTime.set.call(animation, Number(timeline) - Number(at) / animation.playbackRate);
        } else {
          nativePlay.call(animation);
        }
      }
    },
  };
})()`;

/**
 * Installs the page clock a freeze needs, for this page and every document it
 * loads from now on. Opt-in: a page without it is untouched. Call it before
 * the page under test loads, and before `installTimerGate`.
 */
export async function installPageFreeze(page: Page): Promise<void> {
  await page.addInitScript(FREEZE_SCRIPT);
  await page.evaluate(FREEZE_SCRIPT);
}

/**
 * Freezes the scene in one page task: every animation pauses where it
 * stands, the timer gate holds timers and frame callbacks, and every time the
 * page reads stands still. Needs `installPageFreeze` before the page loaded
 * and `installTimerGate` after.
 */
export async function freezePage(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as {
      __harnessFreeze?: {freeze(): void};
      __harnessTimerGate?: {frozen: boolean};
    };
    if (w.__harnessFreeze == null || w.__harnessTimerGate == null) {
      throw new Error(
        'freezePage: call installPageFreeze before the page loads, then installTimerGate',
      );
    }
    w.__harnessFreeze.freeze();
    w.__harnessTimerGate.frozen = true;
  });
}

/**
 * Arms a one-shot freeze on the page's next `type` event (a `touchstart`, a
 * `touchend`, a `scroll`): the scene freezes in a capture listener on the
 * window, in the event's own task, so the animations the page starts for that
 * input are held at their start however late the test process reacts. A
 * listener the page registered on the window before this one runs first; any
 * animation it starts is held at the freeze instant, a few microseconds in.
 */
export async function freezePageOn(page: Page, type: string): Promise<void> {
  await page.evaluate(eventType => {
    const w = window as unknown as {
      __harnessFreeze?: {freeze(): void};
      __harnessTimerGate?: {frozen: boolean};
    };
    const freeze = w.__harnessFreeze;
    const gate = w.__harnessTimerGate;
    if (freeze == null || gate == null) {
      throw new Error(
        'freezePageOn: call installPageFreeze before the page loads, then installTimerGate',
      );
    }
    window.addEventListener(
      eventType,
      () => {
        freeze.freeze();
        gate.frozen = true;
      },
      {capture: true, once: true},
    );
  }, type);
}

/**
 * Freezes the scene in the first frame where `predicate(arg)` holds in the
 * page, checked on every real frame: the scene stops where the proof wants it
 * however late the test process reacts. `predicate` runs in the page (it is
 * serialized, as for `page.waitForFunction`); it may read layout. Rejects
 * past `timeout` ms without freezing.
 */
export async function freezePageWhen<A>(
  page: Page,
  predicate: (arg: A) => boolean,
  arg: A,
  {timeout = 5_000}: {timeout?: number} = {},
): Promise<void> {
  await page.evaluate(
    ([source, value, wait]) =>
      new Promise<void>((resolve, reject) => {
        const w = window as unknown as {
          __harnessFreeze?: {
            freeze(): void;
            frame: (callback: () => void) => number;
          };
          __harnessTimerGate?: {frozen: boolean};
        };
        const freeze = w.__harnessFreeze;
        const gate = w.__harnessTimerGate;
        if (freeze == null || gate == null) {
          reject(
            new Error(
              'freezePageWhen: call installPageFreeze before the page loads, then installTimerGate',
            ),
          );
          return;
        }
        const check = new Function(`return (${source});`)() as (
          value: unknown,
        ) => boolean;
        const deadline = performance.now() + wait;
        const tick = () => {
          if (check(value)) {
            freeze.freeze();
            gate.frozen = true;
            resolve();
          } else if (performance.now() > deadline) {
            reject(
              new Error(
                `freezePageWhen: the condition did not hold within ${wait} ms`,
              ),
            );
          } else {
            freeze.frame(tick);
          }
        };
        freeze.frame(tick);
      }),
    [predicate.toString(), arg, timeout] as const,
  );
}

/**
 * Moves a frozen scene on by `ms`: the page's clock and every held animation
 * advance together, as if `ms` had passed, while timers and frame callbacks
 * stay held for the thaw. A proof steps the scene to the instant it wants
 * (a lens mid-slide) by the scene's own time, however loaded the runner is.
 */
export async function advanceFrozenPage(page: Page, ms: number): Promise<void> {
  await page.evaluate(step => {
    const freeze = (
      window as unknown as {__harnessFreeze?: {advance(ms: number): void}}
    ).__harnessFreeze;
    if (freeze == null) {
      throw new Error('advanceFrozenPage: call installPageFreeze first');
    }
    freeze.advance(step);
  }, ms);
}

/**
 * Thaws the scene in one page task: every animation held by the freeze plays
 * on from where it stood (one the page started while frozen, from its start),
 * the page's time runs again, and the held timers and frame callbacks run, in
 * the order they came due.
 */
export async function thawPage(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as {
      __harnessFreeze?: {thaw(): void};
      __harnessTimerGate?: {
        frozen: boolean;
        queue: {key: string; run: () => void}[];
      };
    };
    w.__harnessFreeze?.thaw();
    const gate = w.__harnessTimerGate;
    if (gate == null) {
      return;
    }
    gate.frozen = false;
    while (gate.queue.length > 0) {
      gate.queue.shift()?.run();
    }
  });
}
