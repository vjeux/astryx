// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file hybrid.ts
 * @input HostContext
 * @output The hybrid sheet host: native scrolling tracks the finger, a UIKit
 *   spring on the compositor finishes every release the page sees in time
 * @position Spike only (PR-0, decision D-11)
 *
 * Tracking: the host is a full-viewport scroll container whose scrollTop is
 * the sheet's visible height (a viewport-tall spacer sits above the sheet).
 * The browser scrolls it on its own thread, so the sheet stays under the
 * finger however busy the page's main thread is. scroll-snap detents (and
 * the native rubber band at the large detent) are what the browser does on
 * its own when the page cannot answer.
 *
 * Release, page free: on the (passive) touchend the page reads the release
 * state, stops the native momentum (overflow hidden, scrollTop pinned in the
 * same task), and plays the UIKit spring from that state on the sheet's
 * transform with Web Animations, then swaps the transform back for the
 * equivalent scrollTop in one task.
 *
 * Release, page blocked: the momentum and the snap run natively; when the
 * page gets the touchend late it leaves them alone and reconciles once the
 * host is at rest.
 *
 * Only passive listeners: one non-passive touch listener would make WebKit
 * wait for the main thread before scrolling, which is the whole point.
 */

import {selectSnapPoint} from '../../../../packages/core/src/motion/projection';
import {solveDecay} from '../../../../packages/core/src/motion/decay';
import type {SpringDescription} from '../../../../packages/core/src/motion/spring';
import {springs} from '../../../../packages/core/src/motion/uikit/springs';
import {dimFor, nearestDetent} from './geometry';
import {round2, type HostApi, type HostContext} from './host';
import {animateSpring, type SpringRun} from './springAnim';
import {VelocityTracker} from './velocity';

// A touchend the page sees this late (or after this long without a frame)
// was released while the main thread was blocked: the native momentum has
// been running since, so the page does not take it over.
const LATE_FRAME_MS = 60;
const REST_QUIET_MS = 150;
const MAX_REPINS = 4;

export function mountHybrid(ctx: HostContext): HostApi {
  const {host, spacer, sheet, dim, g, p, tracer, heartbeat} = ctx;
  host.classList.add('hybrid');
  if (p.passthrough) {
    host.classList.add('passthrough');
  }
  spacer.style.height = `${g.H}px`;
  sheet.style.height = `${g.sLarge}px`;
  for (const s of g.detents) {
    const marker = document.createElement('div');
    marker.className = 'snap';
    marker.style.top = `${s}px`;
    host.appendChild(marker);
  }
  const sdSupported =
    typeof CSS !== 'undefined' &&
    CSS.supports('animation-timeline: --sheet') &&
    CSS.supports('timeline-scope: --sheet');
  const useSD = p.dim === 'scroll' && sdSupported;
  if (useSD) {
    dim.classList.add('sd');
    dim.style.setProperty('animation-range', `0px ${g.sMedium}px`);
  }
  host.scrollTop = ctx.initialS;
  if (!useSD) {
    dim.style.opacity = String(dimFor(g, ctx.initialS));
  }
  tracer.log('hybrid-mount', {
    sdSupported,
    useSD,
    scrollTop: host.scrollTop,
    scrollHeight: host.scrollHeight,
    clientHeight: host.clientHeight,
  });

  const finger = new VelocityTracker();
  let touching = false;
  let run: SpringRun | null = null;
  let freeze = 0;
  let repins = 0;
  let late = false;
  let restTimer = 0;
  let restingAt = ctx.initialS;
  let lastScroll = {t: performance.now(), s: host.scrollTop};

  const pin = (s: number) => {
    if (p.stop === 'instant') {
      host.scrollTo({top: s, behavior: 'instant'});
    } else {
      host.scrollTop = s;
    }
  };

  const pause = (el: HTMLElement, paused: boolean) => {
    if (useSD) {
      el.style.animationName = paused ? 'none' : '';
    }
  };

  const settle = (target: number, why: string) => {
    const done = run;
    run = null;
    host.scrollTop = target;
    done?.anim.cancel();
    done?.dimAnim?.cancel();
    host.style.overflowY = '';
    host.style.scrollSnapType = '';
    pause(dim, false);
    if (!useSD) {
      dim.style.opacity = String(dimFor(g, target));
    }
    restingAt = target;
    late = false;
    tracer.log('settled', {target, why, scrollTop: host.scrollTop});
    if (target === 0) {
      ctx.onClosed();
    }
  };

  const springTo = (
    target: number,
    from: number,
    velocity: number,
    table: SpringDescription,
    reason: string,
  ) => {
    run?.anim.cancel();
    run?.dimAnim?.cancel();
    const spring = p.spring ?? table;
    freeze = Math.min(g.sLarge, Math.max(0, from));
    repins = 0;
    host.style.scrollSnapType = 'none';
    host.style.overflowY = 'hidden';
    pin(freeze);
    pause(dim, true);
    const pinned = freeze;
    const started = animateSpring({
      el: sheet,
      dimEl: dim,
      from,
      to: target,
      velocity,
      spring,
      toTransform: s => `translate3d(0, ${round2(pinned - s)}px, 0)`,
      toDim: s => dimFor(g, s),
    });
    run = started;
    tracer.log('spring', {
      reason,
      from: round2(from),
      to: target,
      velocity: round2(velocity),
      freeze: round2(freeze),
      settle: round2(started.settle * 1000),
      spring,
    });
    started.anim.finished.then(
      () => {
        if (run === started) {
          settle(target, 'finished');
        }
      },
      () => {},
    );
  };

  const regrab = () => {
    const held = run;
    if (held == null) {
      return;
    }
    run = null;
    const presentation = held.presentation();
    const s = Math.min(g.sLarge, Math.max(0, presentation));
    host.scrollTop = s;
    held.anim.cancel();
    held.dimAnim?.cancel();
    host.style.overflowY = '';
    // Snapping stays off until this touch ends: it would pull a finger-held
    // sheet onto a detent.
    pause(dim, false);
    if (!useSD) {
      dim.style.opacity = String(dimFor(g, s));
    }
    tracer.log('regrab', {
      presentation: round2(presentation),
      s: round2(s),
      at: round2(Number(held.anim.currentTime ?? 0)),
    });
  };

  const checkRest = (why: string) => {
    if (touching || run != null) {
      return;
    }
    const s = host.scrollTop;
    const detent = nearestDetent(g, s);
    if (Math.abs(s - detent) > 0.75) {
      tracer.log('reconcile', {why, s: round2(s), to: detent, late});
      springTo(detent, s, 0, springs.sheetDetent, 'reconcile');
      return;
    }
    if (late || restingAt !== detent) {
      tracer.log('rest', {why, s: round2(s), detent, late});
    }
    late = false;
    host.style.scrollSnapType = '';
    restingAt = detent;
    if (detent === 0) {
      ctx.onClosed();
    }
  };

  const scheduleRest = () => {
    clearTimeout(restTimer);
    restTimer = window.setTimeout(() => checkRest('quiet'), REST_QUIET_MS);
  };

  host.addEventListener(
    'scroll',
    e => {
      const s = host.scrollTop;
      tracer.scroll(e.timeStamp, s);
      lastScroll = {t: e.timeStamp, s};
      if (!useSD && run == null) {
        dim.style.opacity = String(dimFor(g, s));
      }
      if (run != null) {
        if (Math.abs(s - freeze) > 0.5) {
          // The browser moved the scroller after the pin: momentum that was
          // already in flight when the pin was committed (Chromium adds the
          // compositor's pending delta to a main-thread scrollTop). The
          // spring is drawn relative to the pin, so put the pin back; the
          // scroller is overflow: hidden by now and stays there.
          tracer.log('scroll-during-spring', {
            s: round2(s),
            freeze: round2(freeze),
            repin: repins < MAX_REPINS,
          });
          if (repins < MAX_REPINS) {
            repins++;
            host.scrollTop = freeze;
          }
        }
      } else if (!touching) {
        scheduleRest();
      }
    },
    {passive: true},
  );
  host.addEventListener(
    'scrollend',
    () => {
      if (!touching && run == null) {
        checkRest('scrollend');
      }
    },
    {passive: true},
  );

  host.addEventListener(
    'touchstart',
    e => {
      const now = performance.now();
      tracer.log('touchstart', {
        ts: round2(e.timeStamp),
        lag: round2(now - e.timeStamp),
        sinceFrame: round2(now - heartbeat.last),
        touches: e.touches.length,
        y: e.changedTouches[0]?.clientY,
        s: round2(host.scrollTop),
        springing: run != null,
      });
      if (e.touches.length !== 1) {
        return;
      }
      ctx.onTouchStart();
      touching = true;
      clearTimeout(restTimer);
      if (!p.snapDuringTouch) {
        host.style.scrollSnapType = 'none';
      }
      finger.reset();
      finger.add(e.timeStamp, e.changedTouches[0].clientY);
      if (run != null) {
        regrab();
      }
    },
    {passive: true},
  );
  host.addEventListener(
    'touchmove',
    e => {
      const touch = e.changedTouches[0];
      if (touch == null) {
        return;
      }
      finger.add(e.timeStamp, touch.clientY);
      tracer.move(e.timeStamp, touch.clientY);
    },
    {passive: true},
  );
  const onEnd = (e: TouchEvent) => {
    const now = performance.now();
    if (e.touches.length > 0 || !touching) {
      return;
    }
    touching = false;
    const y = e.changedTouches[0]?.clientY;
    if (y != null) {
      finger.add(e.timeStamp, y);
    }
    const lateBy = now - e.timeStamp;
    const sinceFrame = now - heartbeat.last;
    const isLate = lateBy > p.lateMs || sinceFrame > LATE_FRAME_MS;
    // S grows as the finger moves up.
    const velocity = -finger.velocity(e.timeStamp);
    const sRead = host.scrollTop;
    tracer.log('touchend', {
      type: e.type,
      ts: round2(e.timeStamp),
      lag: round2(lateBy),
      sinceFrame: round2(sinceFrame),
      velocity: round2(velocity),
      sRead: round2(sRead),
      lastScroll: {t: round2(lastScroll.t), s: round2(lastScroll.s)},
      late: isLate,
      samples: finger.count(),
    });
    if (p.release === 'native' || isLate) {
      late = true;
      if (p.snapDuringTouch) {
        host.style.scrollSnapType = '';
      }
      scheduleRest();
      return;
    }
    let from = sRead;
    let v0 = velocity;
    if (p.handoff === 'extrap') {
      const dt = Math.max(0, now - lastScroll.t) / 1000 + 1 / 120;
      const coast = solveDecay({from: lastScroll.s, velocity});
      from = coast.value(dt);
      v0 = coast.velocity(dt);
    }
    const pick = selectSnapPoint(g.detents, {position: from, velocity: v0});
    tracer.log('release', {
      from: round2(from),
      velocity: round2(v0),
      projected: round2(pick.projected),
      target: pick.value,
    });
    springTo(
      pick.value,
      from,
      v0,
      pick.value === 0 ? springs.sheetDismissSwipe : springs.sheetDetent,
      'release',
    );
  };
  host.addEventListener('touchend', onEnd, {passive: true});
  host.addEventListener('touchcancel', onEnd, {passive: true});

  return {
    currentS: () => (run != null ? run.presentation() : host.scrollTop),
    present(to) {
      springTo(to, host.scrollTop, 0, springs.sheetPresent, 'present');
    },
    dismiss() {
      const from = run != null ? run.presentation() : host.scrollTop;
      springTo(0, from, 0, springs.sheetDismiss, 'dismiss');
    },
    state: () => ({
      s: round2(run != null ? run.presentation() : host.scrollTop),
      restingAt,
      touching,
      late,
      springing: run != null,
      overflowY: host.style.overflowY || 'auto',
      snap: host.style.scrollSnapType || 'y mandatory',
    }),
  };
}
