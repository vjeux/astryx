// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ChatLayoutTranscriptDismiss.interaction.browser.spec.ts
 * @input The Core/ChatLayout full AI chat story, a visual viewport the test
 *   drives as Mobile Safari's keyboard does, and the harness's touch driver
 * @output Proves the drag-to-dismiss in real browsers. A finger's drag down
 *   the transcript dismisses the keyboard as it reaches the composer, before
 *   the lift. The composer bounces once with the scroll-to-bottom button.
 *   One that stays above it keeps the keyboard. A drag down that starts on
 *   the composer dismisses it too, and no drag there scrolls the page under
 *   the keyboard. A mouse drag selects the transcript's text, with nothing
 *   prevented or captured.
 * @position Interaction proofs for ChatLayout's FR10, run in Chromium and
 *   WebKit
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  pinch,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';
import {cubicBezier} from '../../motion/bezier';
import {keyboard as ANDROID_KEYBOARD} from '../../motion/android/keyboard';

const storybook = withStorybook(test);

// The cover Mobile Safari reports on an iPhone 17 Pro (keyboard, accessory
// bar and the floating address bar over a 714 px layout viewport).
const COVER = 337;

/**
 * Replaces `window.visualViewport` before the page loads with one the test
 * drives: `__keyboard(cover)` shrinks it from the bottom and fires one
 * `resize`, as Mobile Safari does.
 */
async function installKeyboard(page: Page) {
  await page.addInitScript(() => {
    // Mobile Safari has no keyboard geometry API (spec:AST-099 FR6).
    Reflect.deleteProperty(Navigator.prototype, 'virtualKeyboard');
    const viewport = Object.assign(new EventTarget(), {
      height: window.innerHeight,
      width: window.innerWidth,
      offsetTop: 0,
      offsetLeft: 0,
      pageTop: 0,
      pageLeft: 0,
      scale: 1,
    });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      get: () => viewport,
    });
    (window as unknown as {__keyboard: (cover: number) => void}).__keyboard =
      cover => {
        viewport.height = window.innerHeight - cover;
        viewport.dispatchEvent(new Event('resize'));
      };
  });
}

interface Chat {
  composer: Locator;
  editable: Locator;
}

/**
 * Chrome on Android: the visual viewport the test drives, and a
 * VirtualKeyboard object the keyboard guide reads as Chrome's profile. There
 * the dock rides Gboard's slides on the keyboard's own curve.
 */
async function installAndroidKeyboard(page: Page) {
  await page.addInitScript(() => {
    const keyboard = Object.assign(new EventTarget(), {
      overlaysContent: false,
      boundingRect: new DOMRect(0, 0, 0, 0),
    });
    Object.defineProperty(navigator, 'virtualKeyboard', {
      configurable: true,
      value: keyboard,
    });
    const viewport = Object.assign(new EventTarget(), {
      height: window.innerHeight,
      width: window.innerWidth,
      offsetTop: 0,
      offsetLeft: 0,
      pageTop: 0,
      pageLeft: 0,
      scale: 1,
    });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      get: () => viewport,
    });
    (window as unknown as {__keyboard: (cover: number) => void}).__keyboard =
      cover => {
        viewport.height = window.innerHeight - cover;
        viewport.dispatchEvent(new Event('resize'));
      };
  });
}

async function openChat(
  page: Page,
  {android = false}: {android?: boolean} = {},
): Promise<Chat> {
  if (android) {
    await installAndroidKeyboard(page);
  } else {
    await installKeyboard(page);
  }
  await installInputRecorder(page);
  await openStory(page, storybook(), 'core-chatlayout--full-ai-chat');
  const editable = page.locator('[contenteditable="true"]').first();
  await expect(editable).toBeVisible();
  // Name the composer's box: the frosted layer's sibling that holds the text.
  await editable.evaluate(element => {
    const frosted = (parent: Element) =>
      [...parent.children].some(child => {
        const style = getComputedStyle(child);
        const filter =
          style.getPropertyValue('backdrop-filter') ||
          style.getPropertyValue('-webkit-backdrop-filter');
        return filter !== '' && filter !== 'none';
      });
    let box: HTMLElement | null = element as HTMLElement;
    while (box?.parentElement != null && !frosted(box.parentElement)) {
      box = box.parentElement;
    }
    box?.setAttribute('data-testid', 'chat-composer-box');
  });
  const composer = page.getByTestId('chat-composer-box');
  await expect(composer).toBeVisible();
  // The story opens at its newest message.
  await page.waitForTimeout(300);
  return {composer, editable};
}

async function keyboardUp(page: Page, {composer, editable}: Chat) {
  await editable.focus();
  await page.evaluate(
    c => (window as unknown as {__keyboard: (c: number) => void}).__keyboard(c),
    COVER,
  );
  await expect(editable).toBeFocused();
  const composerBox = await composer.boundingBox();
  const textBox = await editable.boundingBox();
  if (composerBox == null || textBox == null) {
    throw new Error('The composer has no box.');
  }
  return {
    x: textBox.x + textBox.width / 2,
    // Above everything the composer holds.
    aboveComposer: composerBox.y - 40,
    // Inside the composer's text.
    inComposer: textBox.y + 4,
  };
}

const transcriptScroll = async (composer: Locator) =>
  composer.evaluate(el => {
    let scroller: HTMLElement | null = el.parentElement;
    while (
      scroller != null &&
      !/(auto|scroll)/.test(getComputedStyle(scroller).overflowY)
    ) {
      scroller = scroller.parentElement;
    }
    return (scroller ?? document.scrollingElement)?.scrollTop ?? 0;
  });

test('a drag that stays above the composer scrolls and keeps the keyboard', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  const driver = await touchDriver(page);
  const before = await transcriptScroll(chat.composer);
  await driver.play(
    drag(
      {x: rows.x, y: 120},
      {x: rows.x, y: rows.aboveComposer},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).toBeFocused();
  if (driver.drivesNativeGestures) {
    expect(await transcriptScroll(chat.composer)).toBeLessThan(before);
  }
});

/** What `recordInput` saw, read back by `inputLog`. */
interface InputLog {
  /** Each blur of the composer's text: the input event then in progress. */
  blurs: {during: string; y: number; line: number}[];
  /**
   * Each one-finger touchmove of a touch that started on the composer, once
   * it is past the page hold's 5 px slop: whether it was cancelled.
   */
  composerMoves: boolean[];
  /** Each two-finger touchmove on the composer: whether it was cancelled. */
  pinchMoves: boolean[];
}

/**
 * Records the input event in progress, from before the page loads, so these
 * listeners run before the page's own on the same target.
 */
async function installInputRecorder(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as {__last: {type: string; y: number}};
    w.__last = {type: '', y: 0};
    const note = (event: Event) => {
      const y =
        event instanceof PointerEvent
          ? event.clientY
          : ((event as TouchEvent).changedTouches[0]?.clientY ?? 0);
      w.__last = {type: event.type, y};
    };
    for (const type of [
      'touchstart',
      'touchmove',
      'touchend',
      'pointerdown',
      'pointermove',
      'pointerup',
    ]) {
      window.addEventListener(type, note, {capture: true, passive: true});
    }
  });
}

/**
 * Records, from here on, what each blur of the composer's text happens
 * during, and whether each touchmove on the composer was cancelled. The
 * window's listeners see a move's `defaultPrevented` after the page's own.
 */
async function recordInput(page: Page, {composer, editable}: Chat) {
  await editable.evaluate(
    (field, box) => {
      const log: InputLog = {blurs: [], composerMoves: [], pinchMoves: []};
      const w = window as unknown as {
        __input: InputLog;
        __last: {type: string; y: number};
      };
      w.__input = log;
      field.addEventListener('blur', () =>
        log.blurs.push({
          during: w.__last.type,
          y: w.__last.y,
          line: (box as Element).getBoundingClientRect().top,
        }),
      );
      const onComposer = (event: Event) =>
        (box as Element).contains(event.target as Node);
      let start: {x: number; y: number} | null = null;
      window.addEventListener(
        'touchstart',
        event => {
          const [finger] = Array.from(event.touches);
          start =
            event.touches.length === 1 && finger != null && onComposer(event)
              ? {x: finger.clientX, y: finger.clientY}
              : null;
        },
        {passive: true},
      );
      window.addEventListener(
        'touchmove',
        event => {
          if (!onComposer(event)) {
            return;
          }
          if (event.touches.length > 1) {
            log.pinchMoves.push(event.defaultPrevented);
            return;
          }
          const [finger] = Array.from(event.touches);
          if (
            start != null &&
            finger != null &&
            Math.max(
              Math.abs(finger.clientX - start.x),
              Math.abs(finger.clientY - start.y),
            ) >= 6
          ) {
            log.composerMoves.push(event.defaultPrevented);
          }
        },
        {passive: true},
      );
    },
    await composer.elementHandle(),
  );
}

const inputLog = async (page: Page) =>
  page.evaluate(() => (window as unknown as {__input: InputLog}).__input);

test('a drag that reaches the composer blurs its text as it crosses, before the lift, and focus rests on the composer’s group', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  await recordInput(page, chat);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: 120},
      {x: rows.x, y: rows.inComposer},
      {durationMs: 300, restMs: 200},
    ),
  );
  await expect(chat.editable).not.toBeFocused();
  // The dismissal only blurs the composer's text (FR10). Under a finger the
  // keyboard module parks focus on the composer's group, as after Done
  // (spec:AST-099). The drag's end over the text focuses nothing.
  expect(
    await chat.editable.evaluate(
      element =>
        document.activeElement?.getAttribute('role') === 'group' &&
        document.activeElement.contains(element),
    ),
  ).toBe(true);
  const {blurs} = await inputLog(page);
  expect(blurs).toHaveLength(1);
  // A move blurred it, at or past the composer's top: not the lift.
  expect(blurs[0].during).toMatch(/move$/);
  expect(blurs[0].y).toBeGreaterThanOrEqual(blurs[0].line);
});

/**
 * The dock's motion, as `traceDock` records it: the composer's top every
 * frame, and the bounce the field's blur started, if any.
 */
interface DockTrace {
  frames: number[];
  bounce: {
    /** The running animations that move something in the dock's subtree. */
    count: number;
    /** Whether the first of them is the bounce layer's own. */
    isLayers: boolean;
    /** The composer's and the button's offsets, frame by frame along it. */
    samples: {composer: number; button: number}[];
    /** Whether it has finished, with the composer back where it started. */
    isAtRest: boolean;
  } | null;
  /** Moving animations a frame found other than the sampled one. */
  others: number;
}

/**
 * Records the composer's top every frame. When the field loses focus, it
 * samples the animation that the blur started and that moves something in
 * the dock container's subtree. Paused at each frame along it, it reads the
 * composer's and the scroll-to-bottom button's offsets from their tops at its
 * start. Then it plays the animation on from where it was. A transition of a
 * color or a shadow moves nothing, so it doesn't count. `dockTrace` reads the
 * record back.
 */
async function traceDock(page: Page, composer: Locator, button: Locator) {
  await composer.evaluate(
    (dock, pill) => {
      // The composer's box sits in the bounce layer, in the dock container.
      const layer = dock.parentElement as HTMLElement;
      const container = layer.parentElement as HTMLElement;
      const trace: DockTrace = {frames: [], bounce: null, others: 0};
      (window as unknown as {__dock: DockTrace}).__dock = trace;
      const moves = (animation: Animation) =>
        (animation.effect as KeyframeEffect | null)
          ?.getKeyframes()
          .some(keyframe =>
            Object.keys(keyframe).some(name =>
              /^(translate|transform|scale|rotate|top|bottom|left|right|inset|margin)/.test(
                name,
              ),
            ),
          ) === true;
      const moving = () =>
        container.getAnimations({subtree: true}).filter(moves);
      const tops = () => [
        dock.getBoundingClientRect().top,
        (pill as Element).getBoundingClientRect().top,
      ];
      let sampled: Animation | null = null;
      const sample = () => {
        const running = moving();
        if (trace.bounce != null || running.length === 0) {
          return;
        }
        const [animation] = running;
        sampled = animation;
        const effect = animation.effect as KeyframeEffect;
        const resumeAt = animation.currentTime ?? 0;
        const end = Number(effect.getComputedTiming().endTime);
        // WebKit reads a running animation at each call, so two reads in turn
        // can see two moments of it. Paused, both reads see the same one.
        animation.pause();
        animation.currentTime = 0;
        const [composerStart, buttonStart] = tops();
        const samples = [];
        for (let time = 0; time <= end; time += 1000 / 60) {
          animation.currentTime = time;
          const [composerTop, buttonTop] = tops();
          samples.push({
            composer: composerTop - composerStart,
            button: buttonTop - buttonStart,
          });
        }
        animation.currentTime = resumeAt;
        animation.play();
        const bounce = {
          count: running.length,
          isLayers: effect.target === layer,
          samples,
          isAtRest: false,
        };
        trace.bounce = bounce;
        // The animator retires the bounce at its end, so its `finished` may
        // never settle. At rest, nothing in the dock moves.
        const settle = () => {
          if (moving().length === 0) {
            bounce.isAtRest = tops()[0] === composerStart;
            return;
          }
          requestAnimationFrame(settle);
        };
        requestAnimationFrame(settle);
      };
      // The blur and the bounce it starts run in one task. So a microtask from
      // the blur runs after the bounce has begun, whatever the frame rate.
      dock.addEventListener('focusout', () => queueMicrotask(sample));
      const tick = () => {
        trace.others += moving().filter(
          animation => animation !== sampled,
        ).length;
        trace.frames.push(dock.getBoundingClientRect().top);
        if (trace.frames.length < 2000) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    },
    await button.elementHandle(),
  );
}

const dockTrace = async (page: Page) =>
  page.evaluate(() => (window as unknown as {__dock: DockTrace}).__dock);

/** Each frame's offset from the first one's. */
const offsets = (frames: number[]) => frames.map(top => top - frames[0]);

/** The scroll-to-bottom button, shown and at rest above the composer. */
async function showScrollButton(composer: Locator) {
  const dock = composer.locator('xpath=..');
  await dock.evaluate(el => {
    let scroller: HTMLElement | null = el.parentElement;
    while (
      scroller != null &&
      !/(auto|scroll)/.test(getComputedStyle(scroller).overflowY)
    ) {
      scroller = scroller.parentElement;
    }
    (scroller ?? document.scrollingElement)?.scrollBy(0, -600);
  });
  const button = dock.getByRole('button', {name: 'Scroll to bottom'});
  await expect(button).toBeVisible();
  // Its own fade and slide in have ended.
  await expect
    .poll(
      async () =>
        dock.evaluate(
          el =>
            el
              .getAnimations({subtree: true})
              .filter(animation => animation.playState === 'running').length,
        ),
      {
        message: 'the scroll-to-bottom button ends its fade and slide in',
        timeout: 5000,
      },
    )
    .toBe(0);
  return button;
}

test('the crossing bounces the composer once, and the scroll-to-bottom button moves with it', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  const button = await showScrollButton(chat.composer);
  await traceDock(page, chat.composer, button);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: 120},
      {x: rows.x, y: rows.inComposer},
      {durationMs: 300, restMs: 600},
    ),
  );
  await expect(chat.editable).not.toBeFocused();
  // It ends with the composer back where it started.
  await expect
    .poll(async () => (await dockTrace(page)).bounce?.isAtRest, {
      message: 'the bounce ends with the composer back where it started',
      timeout: 5000,
    })
    .toBe(true);
  const {bounce, others} = await dockTrace(page);
  // One transform moves both. The bounce layer's own animation is the only
  // one in the dock's subtree that moves anything. At every frame of it, the
  // two are offset alike.
  expect(bounce?.count).toBe(1);
  expect(bounce?.isLayers).toBe(true);
  expect(others).toBe(0);
  const samples = bounce?.samples ?? [];
  // Presence first: the composer moves.
  expect(Math.max(...samples.map(sample => sample.composer))).toBeGreaterThan(
    0,
  );
  expect(
    samples.filter(sample => Math.abs(sample.composer - sample.button) > 0.01),
  ).toEqual([]);
  // One bounce: the composer leaves rest once.
  const departures = samples.filter(
    (sample, index) =>
      index > 0 && sample.composer > 0 && samples[index - 1].composer <= 0,
  );
  expect(departures).toHaveLength(1);
});

test('under Reduce Motion the crossing blurs the text and moves nothing', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  const button = await showScrollButton(chat.composer);
  await traceDock(page, chat.composer, button);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: 120},
      {x: rows.x, y: rows.inComposer},
      {durationMs: 300, restMs: 600},
    ),
  );
  await expect(chat.editable).not.toBeFocused();
  const {bounce, frames} = await dockTrace(page);
  const moved = offsets(frames);
  expect(moved.length).toBeGreaterThan(20);
  expect(moved.filter(offset => offset !== 0)).toEqual([]);
  expect(bounce).toBeNull();
});

test('a drag down that starts on the composer blurs its text and scrolls nothing under the keyboard', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  await recordInput(page, chat);
  const before = await transcriptScroll(chat.composer);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: rows.inComposer},
      {x: rows.x, y: rows.inComposer + 30},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).not.toBeFocused();
  const {composerMoves} = await inputLog(page);
  expect(composerMoves.length).toBeGreaterThan(0);
  expect(composerMoves, 'defaultPrevented of each move').not.toContain(false);
  if (driver.drivesNativeGestures) {
    expect(await transcriptScroll(chat.composer)).toBe(before);
  }
});

test('a drag up that starts on the composer keeps the keyboard and scrolls nothing under it', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  await recordInput(page, chat);
  const before = await transcriptScroll(chat.composer);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: rows.inComposer + 30},
      {x: rows.x, y: rows.inComposer - 60},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).toBeFocused();
  const {composerMoves} = await inputLog(page);
  expect(composerMoves.length).toBeGreaterThan(0);
  expect(composerMoves, 'defaultPrevented of each move').not.toContain(false);
  if (driver.drivesNativeGestures) {
    expect(await transcriptScroll(chat.composer)).toBe(before);
  }
});

/** Puts a strip of attachments wider than the composer at its top. */
async function addAttachmentStrip(composer: Locator) {
  await composer.evaluate(box => {
    const strip = document.createElement('div');
    strip.dataset.testid = 'attachment-strip';
    strip.style.cssText = 'overflow-x: auto; white-space: nowrap; height: 40px';
    for (let i = 0; i < 12; i++) {
      const item = document.createElement('span');
      item.style.cssText = 'display: inline-block; width: 80px; height: 36px';
      item.textContent = `File ${i}`;
      strip.append(item);
    }
    box.prepend(strip);
  });
}

test('a part of the composer that scrolls sideways keeps its swipe while the keyboard is up', async ({
  page,
}) => {
  const chat = await openChat(page);
  // A strip of attachments wider than the composer, as a caller can put there.
  await addAttachmentStrip(chat.composer);
  await keyboardUp(page, chat);
  await recordInput(page, chat);
  const strip = page.getByTestId('attachment-strip');
  const stripBox = await strip.boundingBox();
  if (stripBox == null) {
    throw new Error('The strip has no box.');
  }
  const y = stripBox.y + stripBox.height / 2;
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: stripBox.x + stripBox.width - 20, y},
      {x: stripBox.x + 20, y},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).toBeFocused();
  const {composerMoves} = await inputLog(page);
  expect(composerMoves.length).toBeGreaterThan(0);
  expect(composerMoves, 'defaultPrevented of each move').not.toContain(true);
  if (driver.drivesNativeGestures) {
    expect(await strip.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  }
});

test('a drag up that drifts sideways on that strip scrolls nothing under the keyboard', async ({
  page,
}) => {
  const chat = await openChat(page);
  await addAttachmentStrip(chat.composer);
  await keyboardUp(page, chat);
  await recordInput(page, chat);
  const strip = page.getByTestId('attachment-strip');
  const stripBox = await strip.boundingBox();
  if (stripBox == null) {
    throw new Error('The strip has no box.');
  }
  const from = {
    x: stripBox.x + stripBox.width - 40,
    y: stripBox.y + stripBox.height / 2,
  };
  const before = await transcriptScroll(chat.composer);
  const driver = await touchDriver(page);
  // Mostly up, with the hand's drift to the side: the browser locks it to
  // the vertical axis, which the strip cannot scroll.
  await driver.play(
    drag(from, {x: from.x - 24, y: from.y - 120}, {durationMs: 300}),
  );
  await expect(chat.editable).toBeFocused();
  const {composerMoves} = await inputLog(page);
  expect(composerMoves.length).toBeGreaterThan(0);
  expect(composerMoves, 'defaultPrevented of each move').not.toContain(false);
  if (driver.drivesNativeGestures) {
    expect(await transcriptScroll(chat.composer)).toBe(before);
  }
});

test('a two-finger pinch that starts on the composer stays the browser’s (spec:AST-094 FR10)', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  await recordInput(page, chat);
  const driver = await touchDriver(page);
  await driver.play(
    pinch({
      center: {x: rows.x, y: rows.inComposer + 8},
      fromDistance: 40,
      toDistance: 140,
      durationMs: 300,
    }),
  );
  const {pinchMoves} = await inputLog(page);
  expect(pinchMoves.length).toBeGreaterThan(0);
  expect(pinchMoves, 'defaultPrevented of each two-finger move').not.toContain(
    true,
  );
});

test('ten drags in a row, alternating ends on the composer and above it, each dismiss or keep as they reach it', async ({
  page,
}) => {
  const chat = await openChat(page);
  const driver = await touchDriver(page);
  for (let cycle = 0; cycle < 10; cycle++) {
    const rows = await keyboardUp(page, chat);
    const reaches = cycle % 3 !== 1;
    await driver.play(
      drag(
        {x: rows.x, y: 120},
        {x: rows.x, y: reaches ? rows.inComposer : rows.aboveComposer},
        {durationMs: 300},
      ),
    );
    if (reaches) {
      await expect(chat.editable).not.toBeFocused();
    } else {
      await expect(chat.editable).toBeFocused();
    }
  }
});

test.describe('a finger where the primary pointer is fine, as on a touch-screen laptop', () => {
  test.use({hasTouch: true, isMobile: false});
  test.beforeEach(async ({page}) => {
    // The primary pointer reads fine while touch input is present.
    await page.addInitScript(() => {
      const matchMedia = window.matchMedia.bind(window);
      window.matchMedia = query =>
        /\(pointer:\s*coarse\)/.test(query)
          ? matchMedia('(min-width: 100000px)')
          : /\(pointer:\s*fine\)/.test(query)
            ? matchMedia('(min-width: 0px)')
            : matchMedia(query);
    });
  });

  test('a drag that reaches the composer dismisses the keyboard (spec:AST-094 FR19, FR43)', async ({
    page,
  }) => {
    const chat = await openChat(page);
    expect(
      await page.evaluate(() => window.matchMedia('(pointer: fine)').matches),
    ).toBe(true);
    const rows = await keyboardUp(page, chat);
    const driver = await touchDriver(page);
    await driver.play(
      drag(
        {x: rows.x, y: 120},
        {x: rows.x, y: rows.inComposer},
        {durationMs: 300},
      ),
    );
    await expect(chat.editable).not.toBeFocused();
  });
});

/**
 * A line of the transcript's text above the composer: the box of a text node
 * outside the composer and any button.
 */
async function transcriptLine(page: Page, composer: Locator) {
  const composerBox = await composer.boundingBox();
  if (composerBox == null) {
    throw new Error('The composer has no box.');
  }
  const line = await page.evaluate(top => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    for (let node = walker.nextNode(); node != null; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (
        parent == null ||
        (node.textContent ?? '').trim().length < 20 ||
        parent.closest('[contenteditable], button, a') != null
      ) {
        continue;
      }
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = range.getClientRects()[0];
      if (
        rect != null &&
        rect.width > 120 &&
        rect.top > 40 &&
        rect.bottom < top - 20
      ) {
        return {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        };
      }
    }
    return null;
  }, composerBox.y);
  if (line == null) {
    throw new Error('The transcript shows no line of text above the composer.');
  }
  return line;
}

test.describe('a mouse drag in a desktop browser', () => {
  // The primary pointer is fine (the projects emulate a phone).
  test.use({hasTouch: false, isMobile: false});

  test('selects the transcript’s text as without the dismissal: nothing is prevented or captured (spec:AST-094 FR43)', async ({
    page,
  }) => {
    const chat = await openChat(page);
    const rows = await keyboardUp(page, chat);
    const line = await transcriptLine(page, chat.composer);
    await page.evaluate(() => {
      const seen = {prevented: [] as string[], captured: [] as string[]};
      (window as unknown as {__seen: typeof seen}).__seen = seen;
      // The window's bubble phase, added last, runs after every other
      // listener of the page.
      for (const type of [
        'pointerdown',
        'mousedown',
        'pointermove',
        'mousemove',
        'pointerup',
        'mouseup',
        'selectstart',
        'dragstart',
      ]) {
        window.addEventListener(type, event => {
          if (event.defaultPrevented) {
            seen.prevented.push(type);
          }
        });
      }
      window.addEventListener(
        'gotpointercapture',
        event => seen.captured.push((event.target as Element).tagName),
        true,
      );
    });
    const y = line.y + line.height / 2;
    // The browser's own press focuses the nearest focusable ancestor of the
    // pressed text, or the page.
    await page.evaluate(
      ({x, y: pointY}) => {
        const pressed = document.elementFromPoint(x, pointY);
        const target =
          pressed?.closest(
            '[tabindex], a[href], button, input, select, textarea, [contenteditable="true"]',
          ) ?? document.body;
        target.setAttribute('data-press-focus', '');
      },
      {x: line.x + 4, y},
    );
    await page.mouse.move(line.x + 4, y);
    await page.mouse.down();
    await page.mouse.move(line.x + line.width - 4, y, {steps: 12});
    // On past the composer's top, where a finger's drag would dismiss.
    await page.mouse.move(line.x + line.width - 4, rows.inComposer, {
      steps: 12,
    });
    await page.mouse.up();
    const result = await page.evaluate(() => ({
      selected: window.getSelection()?.toString() ?? '',
      seen: (
        window as unknown as {
          __seen: {prevented: string[]; captured: string[]};
        }
      ).__seen,
      focusedThePressTarget:
        document.activeElement?.hasAttribute('data-press-focus') ?? false,
    }));
    expect(result.selected.trim().length).toBeGreaterThan(10);
    expect(result.seen.prevented).toEqual([]);
    expect(result.seen.captured).toEqual([]);
    // Focus goes where the browser's own press puts it, as it does without
    // the dismissal.
    expect(result.focusedThePressTarget).toBe(true);
    await expect(chat.editable).not.toBeFocused();
  });

  test('a pen drag reported as pointer events ends with the composer blurred and nothing prevented', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'pen input is dispatched through the Chrome DevTools Protocol',
    );
    const chat = await openChat(page);
    const rows = await keyboardUp(page, chat);
    await page.evaluate(() => {
      const seen = {types: [] as string[], prevented: [] as string[]};
      (window as unknown as {__pen: typeof seen}).__pen = seen;
      window.addEventListener(
        'pointerdown',
        event => seen.types.push(event.pointerType),
        true,
      );
      for (const type of ['pointerdown', 'pointermove', 'pointerup']) {
        window.addEventListener(type, event => {
          if (event.defaultPrevented) {
            seen.prevented.push(type);
          }
        });
      }
    });
    const client = await page.context().newCDPSession(page);
    const pen = async (
      type: 'mousePressed' | 'mouseMoved' | 'mouseReleased',
      y: number,
    ) =>
      client.send('Input.dispatchMouseEvent', {
        type,
        x: rows.x,
        y,
        button: 'left',
        buttons: type === 'mouseReleased' ? 0 : 1,
        clickCount: 1,
        pointerType: 'pen',
      });
    await pen('mousePressed', 120);
    for (let step = 1; step <= 12; step += 1) {
      await pen('mouseMoved', 120 + ((rows.inComposer - 120) * step) / 12);
    }
    await pen('mouseReleased', rows.inComposer);
    await expect(chat.editable).not.toBeFocused();
    expect(
      await page.evaluate(
        () =>
          (window as unknown as {__pen: {types: string[]; prevented: string[]}})
            .__pen,
      ),
    ).toEqual({types: ['pen'], prevented: []});
  });
});

test.describe('Chrome on Android, where the dock rides the keyboard', () => {
  test.use({hasTouch: true, isMobile: true});
  test.skip(
    ({browserName}) => browserName !== 'chromium',
    'Chrome’s keyboard profile needs the VirtualKeyboard API',
  );

  test('the crossing’s bounce and the ride down are one motion: the composer never jumps, dips past its rest and rests with no lift or translate left', async ({
    page,
  }) => {
    const chat = await openChat(page, {android: true});
    const rest = await chat.editable.evaluate(
      el => el.getBoundingClientRect().top,
    );
    const rows = await keyboardUp(page, chat);
    // The dock, the sticky container around the composer: whether anything
    // in it still moves, and the translate and lift it holds.
    const dockState = async () =>
      chat.editable.evaluate(element => {
        let el: HTMLElement | null = element as HTMLElement;
        while (el != null && getComputedStyle(el).position !== 'sticky') {
          el = el.parentElement;
        }
        if (el == null) {
          throw new Error('no sticky dock');
        }
        const style = getComputedStyle(el);
        return {
          moving: el
            .getAnimations({subtree: true})
            .filter(animation => animation.playState === 'running').length,
          translate: style.translate,
          bottom: parseFloat(style.bottom) || 0,
        };
      });
    // The ride up has ended, and the layout holds the lift.
    await expect
      .poll(async () => (await dockState()).moving, {
        message: 'the dock ends its ride up on the keyboard',
        timeout: 5000,
      })
      .toBe(0);
    const lift = (await dockState()).bottom;
    expect(lift).toBeGreaterThan(100);
    // The composer's bottom padding bounds the bounce's depth.
    const depth = await chat.editable.evaluate(element => {
      const group = element.closest('[role="group"]');
      return parseFloat(getComputedStyle(group ?? element).paddingBottom) || 0;
    });
    // Every frame's composer top, and the keyboard's hide reported in the
    // task that blurred the text, so Gboard's slide down starts with the
    // bounce.
    await chat.editable.evaluate(element => {
      const record = {on: true, frames: [] as {t: number; top: number}[]};
      (window as unknown as {__ride: typeof record}).__ride = record;
      const tick = (t: number) => {
        if (!record.on) {
          return;
        }
        record.frames.push({t, top: element.getBoundingClientRect().top});
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      element.addEventListener(
        'focusout',
        () =>
          queueMicrotask(() =>
            (
              window as unknown as {__keyboard: (cover: number) => void}
            ).__keyboard(0),
          ),
        {once: true},
      );
    });
    const driver = await touchDriver(page);
    await driver.play(
      drag(
        {x: rows.x, y: 120},
        {x: rows.x, y: rows.inComposer},
        {durationMs: 300, restMs: 200},
      ),
    );
    await expect(chat.editable).not.toBeFocused();
    await expect
      .poll(
        async () => {
          const state = await dockState();
          return state.moving === 0 && state.bottom === 0;
        },
        {
          message: 'the dock rests with no lift and nothing moving',
          timeout: 5000,
        },
      )
      .toBe(true);
    // Six more drawn frames, so the record ends with frames at rest. A
    // starved page draws them late, but it draws them.
    await page.evaluate(
      async () =>
        new Promise<void>(resolve => {
          let left = 6;
          const tick = () => {
            left -= 1;
            if (left === 0) {
              resolve();
            } else {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }),
    );
    const frames = await page.evaluate(() => {
      const record = (
        window as unknown as {
          __ride: {on: boolean; frames: {t: number; top: number}[]};
        }
      ).__ride;
      record.on = false;
      return record.frames;
    });
    const tops = frames.map(frame => frame.top);
    // Focus rests on the composer's group, and the dock holds no lift and no
    // translate.
    expect(
      await chat.editable.evaluate(
        element =>
          document.activeElement?.getAttribute('role') === 'group' &&
          document.activeElement.contains(element),
      ),
    ).toBe(true);
    const settled = await dockState();
    expect(settled.translate).toBe('none');
    expect(settled.bottom).toBe(0);
    // The composer rests where it was before the keyboard showed.
    expect(tops.at(-1)).toBeCloseTo(rest, 0);
    const detail = JSON.stringify({lift, depth, tops: tops.map(Math.round)});
    // No frame jumps. A step moves no farther than Gboard's slide down and
    // the bounce can in that frame's time. Only the first moving frame can
    // also show the slide of Chrome's report lag, from a ride dated back.
    const ease = cubicBezier(ANDROID_KEYBOARD.hideCurve);
    let steepest = 0;
    for (let i = 1; i <= 1000; i++) {
      steepest = Math.max(
        steepest,
        (ease(i / 1000) - ease((i - 1) / 1000)) * 1000,
      );
    }
    const slide = (ms: number) =>
      (lift * steepest * ms) / ANDROID_KEYBOARD.hideMs + depth;
    let isMoving = false;
    const jumps = frames.slice(1).flatMap((frame, index) => {
      const step = frame.top - frames[index].top;
      const gapMs = frame.t - frames[index].t;
      const allowed = isMoving
        ? slide(gapMs)
        : slide(gapMs + ANDROID_KEYBOARD.hideReportLagMs);
      isMoving ||= Math.abs(step) > 0.5;
      return Math.abs(step) > allowed
        ? [`${index + 1}: ${step.toFixed(1)} px in ${gapMs.toFixed(0)} ms`]
        : [];
    });
    expect(jumps, detail).toEqual([]);
    // It never moves up by more than the bounce's own return.
    const steps = tops.slice(1).map((top, index) => top - tops[index]);
    expect(
      steps.filter(step => step < -(depth + 1)),
      detail,
    ).toEqual([]);
    // The bounce shows: the composer dips past its rest and comes back.
    const lowest = Math.max(...tops);
    expect(lowest, detail).toBeGreaterThan(rest + 0.5);
    expect(lowest, detail).toBeLessThanOrEqual(rest + depth + 0.5);
  });
});
