// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ToastSwipe.interaction.browser.spec.ts
 * @input The built Toast stories, real touch input (Chromium CDP and WebKit's
 *   input command), the interaction harness and the UIKit table's Toast rows
 * @output Interaction and animation proofs for swiping a Toast toward its
 *   edge, in both presentations and under Reduce Motion
 * @position Toast's interaction spec, shaped after the harness exemplar
 *   (BottomSheetDetent.interaction.browser.spec.ts). The banner swipe runs
 *   under a finger on every engine, so the touch cases need no emulation. The
 *   story places its toast at the top, so the card's offsets from rest are
 *   negative.
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  animationStoryboard,
  armHold,
  blockMainThread,
  busyWindowProof,
  castStoryboard,
  compareCurve,
  countBetween,
  drag,
  flick,
  frames,
  freezeTimers,
  installLongTaskLog,
  merge,
  installTimerGate,
  markElement,
  openStory,
  path,
  readLongTasks,
  releaseAnimations,
  releaseVelocity,
  springStep,
  startScreencast,
  thawTimers,
  timeline,
  touchDriver,
  touchStoryboard,
  traceRendering,
  trackMarker,
  waitForAnimation,
  waitForRest,
  watchAnimations,
  withStorybook,
  writeEvidence,
  type ActiveAnimation,
  type ArmedHold,
  type HeldAnimation,
  type TouchDriver,
  type TouchFrame,
  type TouchScript,
} from '@astryxdesign/interaction-harness';
import {toast as TOAST} from '../../motion/uikit/toast';
import {responseDampingOf, toSpring} from '../../motion/spring';
import {springs} from '../../motion/uikit/springs';
import {reducedMotionCrossFade} from '../../motion/uikit/timing';
import {VelocityTracker} from '../../gestures/VelocityTracker';
import {retractCurve, retractTarget} from '../toastSwipe';

/** The settle spring Toast plays (springs.settle), as response and damping. */
const SETTLE = responseDampingOf(toSpring(springs.settle));

const storybook = withStorybook(test);

interface OpenToast {
  driver: TouchDriver;
  card: Locator;
  /** Where the finger lands: the card's start side, clear of its close button. */
  from: {x: number; y: number};
}

async function openToast(page: Page): Promise<OpenToast> {
  await installLongTaskLog(page);
  await openStory(page, storybook(), 'core-toast--mobile-swipe-to-dismiss');
  // A finger: a coarse primary pointer, whatever the engine.
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(true);
  const driver = await touchDriver(page);
  const trigger = page.getByRole('button', {name: 'Show toast'});
  const box = await trigger.boundingBox();
  if (box == null) {
    throw new Error('no trigger');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await waitForRest(card);
  // Under a finger the banner swipe gives the card its own layer when it
  // attaches.
  await expect
    .poll(async () => card.evaluate(el => el.style.willChange))
    .toBe('translate');
  const rect = await card.boundingBox();
  if (rect == null) {
    throw new Error('no toast');
  }
  return {
    driver,
    card,
    from: {x: Math.round(rect.x + 40), y: Math.round(rect.y + rect.height / 2)},
  };
}

/** The card's offset from rest: its `translate`, which the swipe animator writes. */
const cardOffset = async (card: Locator) =>
  card.evaluate(el => {
    const value = getComputedStyle(el).translate;
    if (value === 'none' || value === '') {
      return 0;
    }
    const [, y = '0px'] = value.split(' ');
    return Number.parseFloat(y);
  });

/** Under Toast's own swipe (a fine pointer): the card's transform and opacity. */
const ownSwipe = async (card: Locator) =>
  card.evaluate(el => {
    const style = getComputedStyle(el);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {y: matrix.f, scale: matrix.a, opacity: Number(style.opacity)};
  });

/** What a held animation changes: its keyframes' properties. */
const heldProperties = (animation: HeldAnimation) => [
  ...new Set(
    animation.keyframes.flatMap(frame =>
      Object.keys(frame).filter(
        key =>
          !['offset', 'computedOffset', 'easing', 'composite'].includes(key),
      ),
    ),
  ),
];

/**
 * The row's collapse: its grid-template-rows and padding transitions. Under
 * Reduce Motion they wait for the card's fade.
 */
const isRowCollapse = (animation: HeldAnimation) =>
  heldProperties(animation).every(
    key => key === 'gridTemplateRows' || key.startsWith('padding'),
  );

/**
 * The held animations seeked every 4 ms from their start: the card's opacity
 * and its row's height at each time.
 */
async function heldCardFrames(
  card: Locator,
): Promise<{t: number; opacity: number; row: number}[]> {
  return card.evaluate(element => {
    const held =
      (window as unknown as {__harnessHeld?: Animation[]}).__harnessHeld ?? [];
    const row = element.closest('[data-toast-id]');
    const frames = [];
    for (let t = 0; t <= 1000; t += 4) {
      for (const animation of held) {
        const last = Number(
          animation.effect?.getComputedTiming().endTime ?? Infinity,
        );
        animation.currentTime = Math.min(t, last - 0.5);
      }
      frames.push({
        t,
        opacity: Number(getComputedStyle(element).opacity),
        row: row?.getBoundingClientRect().height ?? 0,
      });
    }
    return frames;
  });
}

/** When the card's opacity stops changing, in ms from the held start. */
const fadeEndOf = (frames: {t: number; opacity: number}[]) => {
  const final = frames.at(-1)?.opacity ?? 1;
  return frames.reduce(
    (end, frame) =>
      Math.abs(frame.opacity - final) > 0.005 ? frame.t + 4 : end,
    0,
  );
};

/**
 * Under Reduce Motion a touch screen's change is an opacity-only cross-fade of
 * 200 ms or less, not a jump. The page holds the fade as soon as it runs, so
 * the test reads its length from the presented opacity on any machine.
 */
async function expectReducedMotionFade(
  page: Page,
  card: Locator,
  hold: ArmedHold,
) {
  const held = await hold.held();
  const why = JSON.stringify(held);
  const fades = held.filter(animation => !isRowCollapse(animation));
  expect(
    fades.length,
    `a cross-fade, not an instant change: ${why}`,
  ).toBeGreaterThan(0);
  for (const animation of fades) {
    expect(heldProperties(animation), why).toEqual(['opacity']);
  }
  const end = fadeEndOf(await heldCardFrames(card));
  await releaseAnimations(page);
  expect(end, why).toBeGreaterThan(0);
  expect(end, why).toBeLessThanOrEqual(200);
}

/**
 * Points on the card's first line of text. A mouse or pen drag from a
 * character of it selects the text and is no swipe; one from beside it, midway
 * between the card's start edge and the text, is the swipe's.
 */
async function textPoints(card: Locator) {
  return card.evaluate(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node != null && (node.textContent ?? '').trim() === '') {
      node = walker.nextNode();
    }
    if (node == null) {
      throw new Error('no text in the card');
    }
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 1);
    const glyph = range.getBoundingClientRect();
    const card = element.getBoundingClientRect();
    const y = Math.round(glyph.top + glyph.height / 2);
    return {
      onText: {x: Math.round(glyph.left + glyph.width / 2), y},
      besideText: {x: Math.round((card.left + glyph.left) / 2), y},
    };
  });
}

/** The card's untranslated box: its wrapper's, which never moves with it. */
const cardBox = async (card: Locator) =>
  card.evaluate(el => {
    const rect = (el.parentElement as HTMLElement).getBoundingClientRect();
    return {top: rect.top, bottom: rect.bottom};
  });

/**
 * The retract held at each of its times: the card's translate y, and its
 * opacity at the end (it slides out without fading). The page holds it as
 * soon as it runs, through a hold armed before the action.
 */
async function sampleRetract(page: Page, card: Locator, hold: ArmedHold) {
  await hold.held();
  const times = Array.from({length: 9}, (_, i) => (i * TOAST.exitMs) / 8);
  const samples = await sampleTranslateY(card, times);
  const opacity = await card.evaluate(el =>
    Number(getComputedStyle(el).opacity),
  );
  await releaseAnimations(page);
  return {samples, opacity};
}

/**
 * The card's list, its row's parent, outlives the card: a hold on it catches
 * an exit that removes the card. A test attribute names it, since the
 * viewport's role and label leave with its last toast.
 */
async function cardList(page: Page, card: Locator): Promise<Locator> {
  await card.evaluate(el => {
    el.closest('[data-toast-id]')?.parentElement?.setAttribute(
      'data-test-toast-list',
      '',
    );
  });
  return page.locator('[data-test-toast-list]');
}

interface CardFrame {
  t: number;
  opacity: number | null;
  offset: number | null;
  /** The card's bottom edge on screen: at or above 0, it is off screen. */
  bottom: number | null;
}

/**
 * Records the card's opacity, offset and bottom edge now and on every frame
 * after, until read. The test then checks every frame the page drew while the
 * card showed, however few a busy page draws.
 */
async function recordCardFrames(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as {
      __cardFrames: CardFrame[];
      __cardFramesOn: boolean;
    };
    w.__cardFrames = [];
    w.__cardFramesOn = true;
    const start = performance.now();
    const read = () => {
      const el = document.querySelector('.astryx-toast');
      let offset: number | null = null;
      if (el != null) {
        const value = getComputedStyle(el).translate;
        offset =
          value === 'none' || value === ''
            ? 0
            : Number.parseFloat(value.split(' ')[1] ?? '0px');
      }
      w.__cardFrames.push({
        t: performance.now() - start,
        opacity: el == null ? null : Number(getComputedStyle(el).opacity),
        offset,
        bottom: el == null ? null : el.getBoundingClientRect().bottom,
      });
      if (w.__cardFramesOn) {
        requestAnimationFrame(read);
      }
    };
    read();
  });
}

/** On screen and not transparent. */
const isShown = (frame: CardFrame) =>
  frame.opacity != null &&
  frame.opacity > 0.01 &&
  frame.bottom != null &&
  frame.bottom > 0;

async function readCardFrames(page: Page): Promise<CardFrame[]> {
  return page.evaluate(() => {
    const w = window as unknown as {
      __cardFrames: CardFrame[];
      __cardFramesOn: boolean;
    };
    w.__cardFramesOn = false;
    return w.__cardFrames;
  });
}

/**
 * The card was on screen at rest when recording began, and on every frame
 * `isFading` picks it sat at rest.
 */
function expectAtRestWhile(
  frames: ReadonlyArray<CardFrame>,
  isFading: (frame: CardFrame) => boolean,
) {
  const why = JSON.stringify(frames);
  expect(frames[0]?.opacity, why).toBe(1);
  expect(frames[0]?.offset, why).toBe(0);
  expect(frames[0]?.bottom ?? 0, why).toBeGreaterThan(0);
  for (const frame of frames) {
    if (isFading(frame)) {
      expect(frame.offset, why).toBe(0);
    }
  }
}

interface FingerSample {
  type: string;
  x: number;
  y: number;
  t: number;
}

/**
 * Start recording the finger as the gesture host reads it: one sample per
 * pointer event, at the event's own time. That is the pointerdown, each
 * pointermove, then the pointerup's time. WebKit's injected touches carry only
 * their real dispatch time, which a busy page bunches or stretches. So the
 * test measures a release speed from what the page received, not the script.
 */
async function recordFinger(page: Page): Promise<void> {
  await page.evaluate(() => {
    const samples: FingerSample[] = [];
    (window as unknown as {__fingerSamples: FingerSample[]}).__fingerSamples =
      samples;
    const record = (event: Event) => {
      const pointer = event as PointerEvent;
      if (pointer.pointerType !== 'touch') {
        return;
      }
      // The host's clock: page time in ms, as its eventTime() reads it.
      const t =
        pointer.timeStamp > 1e12
          ? pointer.timeStamp - performance.timeOrigin
          : pointer.timeStamp;
      samples.push({
        type: pointer.type,
        x: pointer.clientX,
        y: pointer.clientY,
        t,
      });
    };
    for (const type of ['pointerdown', 'pointermove', 'pointerup']) {
      window.addEventListener(type, record, {capture: true, passive: true});
    }
  });
}

/**
 * The finger's release speed (px/s) as the page measured it. The shared
 * VelocityTracker, UIKit's pan filter, reads it from the recorded samples at
 * the lift.
 */
async function fingerRelease(
  page: Page,
): Promise<{y: number; moves: number; samples: FingerSample[]}> {
  const samples = await page.evaluate(
    () =>
      (window as unknown as {__fingerSamples: FingerSample[]}).__fingerSamples,
  );
  const down = samples.find(sample => sample.type === 'pointerdown');
  const up = samples.find(sample => sample.type === 'pointerup');
  if (down == null || up == null) {
    throw new Error(`no finger recorded: ${JSON.stringify(samples)}`);
  }
  const moves = samples.filter(
    sample =>
      sample.type === 'pointermove' && sample.t >= down.t && sample.t <= up.t,
  );
  const tracker = new VelocityTracker();
  tracker.add(down.x, down.y, down.t);
  for (const move of moves) {
    tracker.add(move.x, move.y, move.t);
  }
  return {y: tracker.velocity(up.t).y, moves: moves.length, samples};
}

/** Where the card's box sits on screen, read without layout-dependent APIs that wait. */
const cardTop = async (card: Locator) =>
  card.evaluate(el => el.getBoundingClientRect().y);

/**
 * The held animations' presented `translate` y at each time (ms from their
 * start). The harness's `sampleCurve` reads `transform`; the animator drives
 * the individual `translate` property.
 */
async function sampleTranslateY(
  card: Locator,
  times: ReadonlyArray<number>,
): Promise<{t: number; value: number}[]> {
  return card.evaluate((element, ts) => {
    const held =
      (window as unknown as {__harnessHeld?: Animation[]}).__harnessHeld ?? [];
    if (held.length === 0) {
      throw new Error('no held animations');
    }
    return ts.map(t => {
      for (const animation of held) {
        const end = Number(
          animation.effect?.getComputedTiming().endTime ?? Infinity,
        );
        animation.currentTime = Math.min(t, end - 0.5);
      }
      const value = getComputedStyle(element).translate;
      const [, y = '0px'] = value === 'none' ? [] : value.split(' ');
      return {t, value: Number.parseFloat(y)};
    });
  }, times);
}

/**
 * Expected offset (page px, negative = up) for a finger that travelled
 * `travel` px toward this top toast's edge (negative: back away from it).
 */
const follow = (travel: number) =>
  -Math.sign(travel) *
  TOAST.followRatio *
  Math.max(0, Math.abs(travel) - TOAST.followFrom);

/**
 * A slow drag toward the edge that eases to a stop and rests before the
 * lift: release velocity about 0. UIKit's estimator keeps a stopped finger's
 * last speed, so the finger must slow down, not just stop.
 */
function restingDrag(from: {x: number; y: number}, travel: number) {
  return drag(
    from,
    {x: from.x, y: from.y - travel},
    {durationMs: 600, hz: 60, restMs: 150, easing: p => 1 - (1 - p) ** 3},
  );
}

/**
 * When a settle's curve reaches its end value, on the page clock. The
 * animator holds the end state long after, through main-thread blocks. So the
 * animation's active interval runs past the motion.
 */
function curveEnd(animation: ActiveAnimation): number {
  const frames = animation.keyframes;
  const last = frames.at(-1)?.translate;
  const arrived = frames.find(k => k.translate === last);
  const offset = Number(arrived?.offset ?? 1);
  return animation.from + offset * (animation.to - animation.from);
}

test('the card stays still for the follow distance, then follows the finger at the follow ratio', async ({
  page,
  browserName,
}) => {
  const {driver, card, from} = await openToast(page);
  const travel = 36;
  const reads: {finger: number; offset: number}[] = [];
  let resting = NaN;
  const started = Date.now();
  await driver.play(restingDrag(from, travel), {
    onEvent: async step => {
      if (step.type !== 'touchMove') {
        return;
      }
      const finger = from.y - step.fingers[0].y;
      reads.push({finger, offset: await cardOffset(card)});
      if (Math.abs(finger - travel) < 0.01) {
        await frames(page, 1);
        resting = await cardOffset(card);
      }
    },
  });
  // Monotonic toward the edge and still through the dead zone. No step is
  // larger than two finger samples' worth, so it does not jump when it starts
  // to follow.
  expect(
    reads.every((r, i) => i === 0 || r.offset <= reads[i - 1].offset + 0.25),
  ).toBe(true);
  expect(
    reads
      .filter(r => r.finger <= TOAST.followFrom - 2)
      .every(r => r.offset === 0),
  ).toBe(true);
  const step = travel / reads.length;
  expect(
    reads.every(
      (r, i) =>
        i === 0 ||
        Math.abs(r.offset - reads[i - 1].offset) <=
          2 * step * TOAST.followRatio + 0.5,
    ),
  ).toBe(true);
  expect(resting).toBeCloseTo(follow(travel), 0);
  // Released at rest, short of the dismiss travel: it springs back.
  await waitForRest(card);
  expect(await cardOffset(card)).toBeCloseTo(0, 1);
  await expect(card).toBeVisible();
  // No long task while the card followed: the Long Tasks API is Chromium's,
  // and the log refuses to answer in WebKit rather than report nothing.
  if (browserName === 'chromium') {
    expect(await readLongTasks(page, {from: started, to: Date.now()})).toEqual(
      [],
    );
  }
});

test('a release short of the dismiss travel springs back on the settle spring', async ({
  page,
}, testInfo) => {
  const {driver, card, from} = await openToast(page);
  const travel = 36;
  const hold = await armHold(page, card);
  await driver.play(restingDrag(from, travel));
  const held = await hold.held();
  const spring = held.find(a => a.durationMs > 0) ?? held[0];
  const samples = await sampleTranslateY(card, timeline(spring.durationMs));
  await releaseAnimations(page);
  const start = follow(travel);
  // Released at rest: the spring starts with no velocity.
  const expected = (t: number) =>
    start *
    (1 -
      springStep(
        {
          response: SETTLE.response,
          dampingFraction: SETTLE.dampingRatio,
        },
        t,
      ));
  const result = compareCurve(samples, expected, 0.5);
  await writeEvidence(
    'curves/toast-settle',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {held, spring, comparison: result, samples},
        null,
        2,
      ),
    },
    testInfo,
  );
  expect(samples[0].value).toBeCloseTo(start, 0);
  expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(
    0.5,
  );
  expect(samples.at(-1)?.value).toBeCloseTo(0, 1);
});

test('under Reduce Motion a release cross-fades the card to rest, with no travel', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver, card, from} = await openToast(page);
  const hold = await armHold(page, card);
  await recordCardFrames(page);
  await driver.play(restingDrag(from, 36));
  await expectReducedMotionFade(page, card, hold);
  await waitForRest(card);
  // At rest from the first frame of the fade: it lands, then fades in.
  expectAtRestWhile(
    await readCardFrames(page),
    frame => frame.opacity != null && frame.opacity < 0.99,
  );
  expect(await cardOffset(card)).toBe(0);
  await expect(page.locator('.astryx-toast')).toHaveCount(1);
});

test('under Reduce Motion the close button fades the card out where it is', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver, card} = await openToast(page);
  const close = await card
    .getByRole('button', {name: 'Dismiss notification'})
    .boundingBox();
  if (close == null) {
    throw new Error('no close button');
  }
  const hold = await armHold(page, await cardList(page, card));
  await recordCardFrames(page);
  await driver.tap({
    x: close.x + close.width / 2,
    y: close.y + close.height / 2,
  });
  await expectReducedMotionFade(page, card, hold);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
  // Where it is whenever it shows: it fades out in place. Then it lands past
  // the top edge, off screen, where the animator gives it back its opacity.
  expectAtRestWhile(await readCardFrames(page), isShown);
});

/** Taps the story's Reset button: the app's own `dismiss()` for its toast. */
async function dismissFromApp(page: Page, driver: OpenToast['driver']) {
  const reset = await page.getByRole('button', {name: 'Reset'}).boundingBox();
  if (reset == null) {
    throw new Error('no Reset button');
  }
  await driver.tap({
    x: reset.x + reset.width / 2,
    y: reset.y + reset.height / 2,
  });
}

test("the app's dismiss retracts the card while its row stays open", async ({
  page,
}) => {
  const {driver, card} = await openToast(page);
  const row = page.locator('[data-toast-id]').first();
  const rowHeight = await row.evaluate(el => el.getBoundingClientRect().height);
  // The row's height and the card's bottom edge on screen, every frame.
  await page.evaluate(() => {
    const w = window as unknown as {__rows: number[][]};
    w.__rows = [];
    const tick = () => {
      const rowEl = document.querySelector('[data-toast-id]');
      const cardEl = document.querySelector('.astryx-toast');
      if (rowEl != null && cardEl != null) {
        w.__rows.push([
          rowEl.getBoundingClientRect().height,
          cardEl.getBoundingClientRect().bottom,
        ]);
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
  await dismissFromApp(page, driver);
  await expect(card).toHaveCount(0);
  const rows = await page.evaluate(
    () => (window as unknown as {__rows: number[][]}).__rows,
  );
  // Until the card has left past the top edge, its row keeps its height: the
  // row collapses only after the retract.
  const onScreen = rows.filter(([, bottom]) => bottom > 0);
  expect(onScreen.length).toBeGreaterThan(2);
  for (const [height] of onScreen) {
    expect(height).toBeCloseTo(rowHeight, 0);
  }
});

test("under Reduce Motion the app's dismiss fades the card out where it is", async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver, card} = await openToast(page);
  const hold = await armHold(page, await cardList(page, card));
  await recordCardFrames(page);
  await dismissFromApp(page, driver);
  await expectReducedMotionFade(page, card, hold);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
  // Where it is whenever it shows.
  expectAtRestWhile(await readCardFrames(page), isShown);
});

/** Rings at every finger, drawn by the test page for the video (passive listeners). */
const FINGER_RINGS = `(() => {
  const rings = new Map();
  const draw = e => {
    const live = new Set();
    for (const t of e.touches) {
      live.add(t.identifier);
      let el = rings.get(t.identifier);
      if (el == null) {
        el = document.createElement('div');
        el.style.cssText = 'position:fixed;left:0;top:0;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;background:rgba(255,59,48,0.28);border:2px solid rgba(255,59,48,0.95);box-sizing:border-box;z-index:2147483647;pointer-events:none;';
        document.documentElement.append(el);
        rings.set(t.identifier, el);
      }
      el.style.transform = 'translate(' + t.clientX + 'px,' + t.clientY + 'px)';
    }
    for (const [id, el] of rings) {
      if (!live.has(id)) {
        el.remove();
        rings.delete(id);
      }
    }
  };
  for (const type of ['touchstart', 'touchmove', 'touchend', 'touchcancel']) {
    addEventListener(type, draw, {capture: true, passive: true});
  }
  return true;
})()`;

test("a second finger keeps the one-finger swipe, and the first finger's lift dismisses", async ({
  page,
  browserName,
}) => {
  const {driver, from} = await openToast(page);
  // The iOS simulator injects one finger, so the video of this path comes
  // from Chromium's screencast.
  const isChromium = browserName === 'chromium';
  if (isChromium) {
    await page.evaluate(FINGER_RINGS);
  }
  const cast = isChromium ? await startScreencast(page) : null;
  // Finger 0 drags 90 px up over 900 ms. Finger 1 lands on the card at
  // 300 ms and stays down until after finger 0 lifts.
  const first = drag(
    from,
    {x: from.x, y: from.y - 90},
    {durationMs: 900, hz: 60},
  );
  const lift = first[first.length - 1].t;
  const held: TouchFrame[] = [];
  // Finger 1 lifts 140 ms after finger 0, while the card retracts: still
  // mounted, so the video's rings stay true to the fingers.
  for (let t = 300; t <= lift + 120; t += 1000 / 60) {
    held.push({
      t: +t.toFixed(3),
      fingers: [{id: 1, x: from.x + 160, y: from.y}],
    });
  }
  const second: TouchScript = [...held, {t: lift + 140, fingers: []}];
  // The card's offset every frame, read in the page so the script plays in
  // real time (a read per move would slow it down).
  await page.evaluate(() => {
    const w = window as unknown as {__offsets: number[]};
    w.__offsets = [];
    const tick = () => {
      const el = document.querySelector('.astryx-toast');
      if (el != null) {
        const value = getComputedStyle(el).translate;
        const [, y = '0px'] = value === 'none' ? [] : value.split(' ');
        w.__offsets.push(Number.parseFloat(y));
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  let leavingWhileHeld = false;
  await driver.play(merge(first, second), {
    onEvent: async step => {
      if (step.type === 'touchEnd' && step.changed.some(f => f.id === 0)) {
        // Finger 1 is still down: the card is already retracting past the
        // top edge, well beyond where the finger left it.
        await page.waitForTimeout(100);
        leavingWhileHeld =
          step.fingers.some(f => f.id === 1) &&
          (await page.evaluate(() => {
            const el = document.querySelector('.astryx-toast');
            if (el == null) {
              return true;
            }
            const [, y = '0px'] = getComputedStyle(el).translate.split(' ');
            return Number.parseFloat(y) < -60;
          }));
      }
    },
  });
  const farthest = Math.min(
    ...(await page.evaluate(
      () => (window as unknown as {__offsets: number[]}).__offsets,
    )),
  );
  // It kept following finger 0 (no jump to the two fingers' midpoint) and
  // left when finger 0 lifted, with finger 1 still down.
  expect(farthest).toBeLessThan(follow(80));
  expect(leavingWhileHeld).toBe(true);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
  if (cast != null) {
    const frames = await cast.stop();
    await writeEvidence('video/toast-second-finger', {
      'frames.json': JSON.stringify(
        frames.map((f, i) => ({i, t: f.t, format: f.format})),
      ),
      ...Object.fromEntries(
        frames.map((f, i) => [
          `frame-${String(i).padStart(4, '0')}.${f.format}`,
          Buffer.from(f.data, 'base64'),
        ]),
      ),
    });
  }
});

test('a dismissing release retracts the card past the top edge on the banner’s curve, without fading', async ({
  page,
}) => {
  const {driver, card, from} = await openToast(page);
  const box = await cardBox(card);
  const viewportHeight = await page.evaluate(() => innerHeight);
  // 60 px: the card is 25.3 px out, past the dismiss offset. The finger rests
  // before the lift, so the retract starts at that release velocity, 0.
  const hold = await armHold(page, card);
  await driver.play(restingDrag(from, 60));
  const {samples, opacity} = await sampleRetract(page, card, hold);
  const start = follow(60);
  const curve = retractCurve(
    start,
    retractTarget(box, viewportHeight, -1),
    TOAST.exitMs,
    TOAST.exitCurve,
    0,
  );
  const result = compareCurve(samples, t => curve.at(t / 1000), 1);
  expect(samples[0].value).toBeCloseTo(start, 0);
  expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(1);
  expect(samples.at(-1)?.value).toBeLessThan(-box.bottom);
  expect(opacity).toBe(1);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test('the close button retracts the card the same way', async ({page}) => {
  const {driver, card} = await openToast(page);
  const box = await cardBox(card);
  const viewportHeight = await page.evaluate(() => innerHeight);
  const close = await page
    .getByRole('button', {name: 'Dismiss notification'})
    .boundingBox();
  if (close == null) {
    throw new Error('no close button');
  }
  // The close button's own press feedback is not the motion under test: as a
  // harness control, its transition never starts the hold.
  await page
    .getByRole('button', {name: 'Dismiss notification'})
    .evaluate(el => el.setAttribute('data-harness-control', ''));
  const hold = await armHold(page, card);
  await driver.tap({
    x: close.x + close.width / 2,
    y: close.y + close.height / 2,
  });
  const {samples, opacity} = await sampleRetract(page, card, hold);
  const curve = retractCurve(
    0,
    retractTarget(box, viewportHeight, -1),
    TOAST.exitMs,
    TOAST.exitCurve,
  );
  const result = compareCurve(samples, t => curve.at(t / 1000), 1);
  expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(1);
  expect(opacity).toBe(1);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test('the timeout retracts the card the same way', async ({page}) => {
  await openStory(page, storybook(), 'core-toast--mobile-timed-toast');
  const driver = await touchDriver(page);
  const trigger = await page
    .getByRole('button', {name: 'Show toast'})
    .boundingBox();
  if (trigger == null) {
    throw new Error('no trigger');
  }
  await driver.tap({
    x: trigger.x + trigger.width / 2,
    y: trigger.y + trigger.height / 2,
  });
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await waitForRest(card);
  const box = await cardBox(card);
  const viewportHeight = await page.evaluate(() => innerHeight);
  // The story's toast times out three seconds after it appears.
  const hold = await armHold(page, card, {timeout: 8_000});
  const {samples, opacity} = await sampleRetract(page, card, hold);
  const curve = retractCurve(
    0,
    retractTarget(box, viewportHeight, -1),
    TOAST.exitMs,
    TOAST.exitCurve,
  );
  const result = compareCurve(samples, t => curve.at(t / 1000), 1);
  expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(1);
  expect(opacity).toBe(1);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test('a slow long drag dismisses, leaving from where the finger left the card', async ({
  page,
}) => {
  const {driver, card, from} = await openToast(page);
  const restTop = await cardTop(card);
  // 60 px at 60 px/s, lifted while still moving.
  await driver.play(
    drag(from, {x: from.x, y: from.y - 60}, {durationMs: 1000, hz: 60}),
  );
  const atLift = await cardTop(card);
  expect(atLift).toBeLessThan(restTop - 15);
  // Never back toward rest on the way out. One page read per frame: the
  // card may unmount between two locator calls.
  const tops: number[] = [];
  for (let i = 0; i < 6; i++) {
    await frames(page, 1);
    const top = await page.evaluate(
      () =>
        document.querySelector('.astryx-toast')?.getBoundingClientRect().y ??
        null,
    );
    if (top == null) {
      break;
    }
    tops.push(top);
  }
  expect(
    tops.every(top => top <= atLift + 0.5),
    JSON.stringify({restTop, atLift, tops}),
  ).toBe(true);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test('a quick short flick dismisses on its velocity alone', async ({page}) => {
  const {driver, from} = await openToast(page);
  // 15 px in 25 ms: barely past the follow distance.
  const script = flick(from, {
    velocity: {x: 0, y: -600},
    durationMs: 25,
    hz: 120,
  });
  expect(releaseVelocity(script).y).toBeCloseTo(-600, -1);
  await driver.play(script);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test('a drag that turns back away from the edge stretches the card and springs it back', async ({
  page,
}) => {
  const {driver, card, from} = await openToast(page);
  // Up 20 px (the swipe begins), then 100 px back down past the start.
  const script = path(
    p =>
      p < 0.2
        ? {x: from.x, y: from.y - 100 * p}
        : {x: from.x, y: from.y - 20 + 100 * ((p - 0.2) / 0.8)},
    {durationMs: 800, hz: 60, restMs: 150},
  );
  let lowest = 0;
  await driver.play(script, {
    onEvent: async step => {
      if (step.type === 'touchMove') {
        lowest = Math.max(lowest, await cardOffset(card));
      }
    },
  });
  // The finger ended 80 px below where it landed.
  expect(lowest).toBeCloseTo(follow(-80), 0);
  await waitForRest(card);
  expect(await cardOffset(card)).toBeCloseTo(0, 1);
  await expect(card).toBeVisible();
});

test('under Reduce Motion a turn-back still stretches the card, and its release cross-fades it to rest', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver, card, from} = await openToast(page);
  const script = path(
    p =>
      p < 0.2
        ? {x: from.x, y: from.y - 100 * p}
        : {x: from.x, y: from.y - 20 + 100 * ((p - 0.2) / 0.8)},
    {durationMs: 800, hz: 60, restMs: 150},
  );
  let lowest = 0;
  const hold = await armHold(page, card);
  await recordCardFrames(page);
  await driver.play(script, {
    onEvent: async step => {
      if (step.type === 'touchMove') {
        lowest = Math.max(lowest, await cardOffset(card));
      }
    },
  });
  // The stretch follows the finger (direct manipulation, not a transition).
  expect(lowest).toBeCloseTo(follow(-80), 0);
  // The release is a transition: the shared cross-fade, at rest at once.
  await expectReducedMotionFade(page, card, hold);
  await waitForRest(card);
  expectAtRestWhile(
    await readCardFrames(page),
    frame => frame.opacity != null && frame.opacity < 0.99,
  );
  expect(await cardOffset(card)).toBe(0);
  await expect(card).toBeVisible();
});

test("a flick's retract continues at the card's release velocity (spec:AST-094 FR38)", async ({
  page,
}) => {
  const {driver, card, from} = await openToast(page);
  const box = await cardBox(card);
  const viewportHeight = await page.evaluate(() => innerHeight);
  // 15 px in 25 ms at 600 px/s: the card hands on the follow ratio of it.
  const script = flick(from, {
    velocity: {x: 0, y: -600},
    durationMs: 25,
    hz: 120,
  });
  await recordFinger(page);
  const hold = await armHold(page, card);
  await driver.play(script);
  const {samples} = await sampleRetract(page, card, hold);
  // The speed the finger let go at, as the page measured it. WebKit delivers
  // the script's 600 px/s at its real dispatch times, which a busy page
  // bunches. So the card does not get the script's own speed.
  const released = await fingerRelease(page);
  const scripted = releaseVelocity(script).y;
  const why = JSON.stringify({released: released.y, scripted, ...released});
  expect(released.moves, why).toBeGreaterThanOrEqual(2);
  expect(released.y, why).toBeLessThan(-TOAST.flickVelocity);
  const handedOn = released.y * TOAST.followRatio;
  const curve = retractCurve(
    samples[0].value,
    retractTarget(box, viewportHeight, -1),
    TOAST.exitMs,
    TOAST.exitCurve,
    handedOn,
  );
  // The retract the card plays starts at the speed of its release.
  expect(Math.abs(curve.velocity(0) - handedOn)).toBeLessThanOrEqual(
    Math.abs(handedOn) * 0.05,
  );
  const result = compareCurve(samples, t => curve.at(t / 1000), 1);
  expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(1);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test('a horizontal drag leaves the card where it is', async ({page}) => {
  const {driver, card, from} = await openToast(page);
  const offsets: number[] = [];
  await driver.play(
    drag(from, {x: from.x + 80, y: from.y - 10}, {durationMs: 300, hz: 60}),
    {
      onEvent: async step => {
        if (step.type === 'touchMove') {
          offsets.push(await cardOffset(card));
        }
      },
    },
  );
  expect(offsets.every(offset => offset === 0)).toBe(true);
  await expect(card).toBeVisible();
});

test('a touch while the card springs back passes through to the page', async ({
  page,
}) => {
  const {driver, card, from} = await openToast(page);
  await driver.play(restingDrag(from, 36));
  await waitForAnimation(card);
  // A long swipe during the spring-back neither catches nor dismisses it.
  await driver.play(
    drag(from, {x: from.x, y: from.y - 60}, {durationMs: 150, hz: 60}),
  );
  await expect(card).toBeVisible();
  await waitForRest(card);
  // Back at rest, it takes swipes again.
  await driver.play(
    drag(from, {x: from.x, y: from.y - 60}, {durationMs: 150, hz: 60}),
  );
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});

test.describe('with a fine pointer', () => {
  test.use({hasTouch: false, isMobile: false});

  test('touch work costs nothing: no layer, and the close button keeps Toast’s fade', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-toast--mobile-swipe-to-dismiss');
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    await page.getByRole('button', {name: 'Show toast'}).click();
    const card = page.locator('.astryx-toast').first();
    await expect(card).toBeVisible();
    await waitForRest(card);
    const box = await card.boundingBox();
    if (box == null) {
      throw new Error('no toast');
    }
    expect(await ownSwipe(card)).toEqual({y: 0, scale: 1, opacity: 1});
    expect(await cardOffset(card)).toBe(0);
    expect(await card.evaluate(el => el.style.willChange)).toBe('');
    await card.getByRole('button', {name: 'Dismiss notification'}).click();
    const fading = await waitForAnimation(card);
    expect(fading.length).toBeGreaterThan(0);
    expect(await cardOffset(card)).toBe(0);
    await expect(page.locator('.astryx-toast')).toHaveCount(0);
  });

  test('the own swipe composites its drag: a mouse drag does no Layout or Paint per move', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
    await openStory(page, storybook(), 'core-toast--mobile-swipe-to-dismiss');
    await page.getByRole('button', {name: 'Show toast'}).click();
    const card = page.locator('.astryx-toast').first();
    await expect(card).toBeVisible();
    await waitForRest(card);
    const {x, y} = (await textPoints(card)).besideText;
    await page.mouse.move(x, y);
    await page.mouse.down();
    // Past the pan's 10 pt start: the swipe has begun and the card follows.
    await page.mouse.move(x, y - 12, {steps: 4});
    // The card under test is on screen and painted, and the swipe has it.
    await expect(card).toHaveCount(1);
    const box = await card.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThan(0);
    const before = (await ownSwipe(card)).y;
    expect(before).toBeLessThan(0);
    const trace = await traceRendering(page, async () => {
      for (let i = 1; i <= 30; i += 1) {
        await page.mouse.move(x, y - 12 - i);
        await frames(page, 1);
      }
    });
    // The 30 moves moved the card (1:1 with the pointer), so the counts
    // below are of a card in motion.
    expect((await ownSwipe(card)).y).toBeLessThan(before - 20);
    await page.mouse.up();
    // One move per frame, 30 frames: the card moves and fades on its own
    // layer, so no move lays out or repaints it.
    expect(trace.layout, JSON.stringify(trace.counts)).toBe(0);
    expect(trace.paint, JSON.stringify(trace.counts)).toBe(0);
  });

  test('a mouse drag from beside the toast’s text swipes it away, and one from the text selects it (spec:AST-094 FR41, FR43)', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-toast--mobile-swipe-to-dismiss');
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    await page.getByRole('button', {name: 'Show toast'}).click();
    const card = page.locator('.astryx-toast').first();
    await expect(card).toBeVisible();
    await waitForRest(card);
    const {onText, besideText} = await textPoints(card);
    // From a character of the text: the browser's selection, not a swipe.
    await page.mouse.move(onText.x, onText.y);
    await page.mouse.down();
    await page.mouse.move(onText.x + 12, onText.y - 40, {steps: 8});
    await page.mouse.up();
    expect((await ownSwipe(card)).y).toBe(0);
    expect(
      await page.evaluate(() => getSelection()?.toString() ?? ''),
    ).not.toBe('');
    await expect(page.locator('.astryx-toast')).toHaveCount(1);
    // A press inside a selection drags the selection, as the browser does, so
    // the selection goes before the second drag.
    await page.evaluate(() => getSelection()?.removeAllRanges());
    // From beside the text, up toward the top edge and a little across it.
    const {x, y} = besideText;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 12, y - 40, {steps: 8});
    // The swipe has the drag: the card follows.
    expect((await ownSwipe(card)).y).toBeLessThan(-20);
    await page.mouse.move(x + 24, y - 80, {steps: 8});
    await page.mouse.up();
    await expect(page.locator('.astryx-toast')).toHaveCount(0);
  });
  test('under Reduce Motion, presentation="notification" settles and leaves at once after a mouse release (spec:AST-094 FR43, design:reduced-motion DR3)', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStory(
      page,
      storybook(),
      'core-toast--mobile-notification-presentation',
    );
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    await page.getByRole('button', {name: 'Show toast'}).click();
    const card = page.locator('.astryx-toast').first();
    await expect(card).toBeVisible();
    await waitForRest(card);
    const {x, y} = (await textPoints(card)).besideText;
    // Every frame from the release: the card's opacity, while it is there.
    const logFrames = async () =>
      card.evaluate(el => {
        const w = window as unknown as {__opacities: number[]};
        w.__opacities = [];
        const start = performance.now();
        const sample = () => {
          if (!el.isConnected || performance.now() - start > 600) {
            return;
          }
          w.__opacities.push(Number(getComputedStyle(el).opacity));
          requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      });
    const fadedFrames = async () =>
      page.evaluate(() =>
        (window as unknown as {__opacities: number[]}).__opacities.filter(
          opacity => opacity > 0 && opacity < 1,
        ),
      );

    // 30 px toward the edge, rested before the release: short of dismissing.
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y - 30, {steps: 10});
    await page.waitForTimeout(150);
    await logFrames();
    await page.mouse.up();
    await page.waitForTimeout(400);
    expect(await cardOffset(card)).toBe(0);
    expect(await fadedFrames()).toEqual([]);

    // 90 px, rested: the release dismisses, and the card leaves at once.
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y - 90, {steps: 15});
    await page.waitForTimeout(150);
    await logFrames();
    await page.mouse.up();
    await expect(page.locator('.astryx-toast')).toHaveCount(0);
    expect(await fadedFrames()).toEqual([]);
  });

  /**
   * A real pen stroke through Chromium's input pipeline, with explicit
   * timestamps. A slow 12 px start, then a 35 px throw at 2.3 px/ms: 47 px in
   * all. That is short of the 48 px dismiss distance and slow on average. The
   * pen lifts after `restMs` still.
   */
  async function penThrow(
    page: Page,
    from: {x: number; y: number},
    restMs: number,
  ) {
    const cdp = await page.context().newCDPSession(page);
    const base = Date.now() / 1000;
    const steps: ReadonlyArray<readonly [number, number]> = [
      [0, 0],
      [300, -10],
      [600, -12],
      [603, -19],
      [606, -26],
      [609, -33],
      [612, -40],
      [615, -47],
    ];
    for (const [index, [t, dy]] of steps.entries()) {
      await cdp.send('Input.dispatchMouseEvent', {
        type: index === 0 ? 'mousePressed' : 'mouseMoved',
        x: from.x,
        y: from.y + dy,
        button: 'left',
        buttons: 1,
        clickCount: index === 0 ? 1 : 0,
        pointerType: 'pen',
        timestamp: base + t / 1000,
      });
    }
    const [t, dy] = steps[steps.length - 1];
    await cdp.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: from.x,
      y: from.y + dy,
      button: 'left',
      buttons: 0,
      clickCount: 1,
      pointerType: 'pen',
      timestamp: base + (t + restMs) / 1000,
    });
    await cdp.detach();
  }

  async function openFinePointerToast(page: Page) {
    await openStory(page, storybook(), 'core-toast--mobile-swipe-to-dismiss');
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    await page.getByRole('button', {name: 'Show toast'}).click();
    const card = page.locator('.astryx-toast').first();
    await expect(card).toBeVisible();
    await waitForRest(card);
    return {card, from: (await textPoints(card)).besideText};
  }

  test('a pen flick dismisses on the speed it lifts at, from the shared release filter', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'pen input is Chromium-only (CDP)');
    const {from} = await openFinePointerToast(page);
    await penThrow(page, from, 0);
    await expect(page.locator('.astryx-toast')).toHaveCount(0);
  });

  test('a pen that rests past the stillness interval before lifting does not flick', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'pen input is Chromium-only (CDP)');
    const {card, from} = await openFinePointerToast(page);
    await penThrow(page, from, 41);
    await page.waitForTimeout(600);
    await expect(page.locator('.astryx-toast')).toHaveCount(1);
    expect(await ownSwipe(card)).toEqual({y: 0, scale: 1, opacity: 1});
  });
});

test('under Reduce Motion on a touch screen, presentation="toast" fades the card out before its row closes', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await openStory(page, storybook(), 'core-toast--mobile-toast-presentation');
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(true);
  const driver = await touchDriver(page);
  const trigger = await page
    .getByRole('button', {name: 'Show toast'})
    .boundingBox();
  if (trigger == null) {
    throw new Error('no trigger');
  }
  await driver.tap({
    x: trigger.x + trigger.width / 2,
    y: trigger.y + trigger.height / 2,
  });
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await waitForRest(card);
  const close = await card
    .getByRole('button', {name: 'Dismiss notification'})
    .boundingBox();
  if (close == null) {
    throw new Error('no close button');
  }
  const openRow = await card.evaluate(
    el => el.closest('[data-toast-id]')?.getBoundingClientRect().height ?? 0,
  );
  // The page holds the card's fade and its row's delayed collapse together,
  // on the card's list, as soon as the fade runs. The test reads both at the
  // same times.
  const hold = await armHold(page, await cardList(page, card));
  await driver.tap({
    x: close.x + close.width / 2,
    y: close.y + close.height / 2,
  });
  const held = await hold.held();
  const frames = await heldCardFrames(card);
  await releaseAnimations(page);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
  const why = JSON.stringify({held, frames});
  // The card under test was on screen, painted, when the tap landed.
  expect(frames[0]?.opacity, why).toBe(1);
  expect(frames[0]?.row ?? 0, why).toBeCloseTo(openRow, 0);
  // It fades where it is: opacity alone, over the shared cross-fade's duration.
  const fades = held.filter(animation => !isRowCollapse(animation));
  expect(fades.length, why).toBeGreaterThan(0);
  for (const animation of fades) {
    expect(heldProperties(animation), why).toEqual(['opacity']);
    expect(animation.durationMs, why).toBe(reducedMotionCrossFade.durationMs);
  }
  const end = fadeEndOf(frames);
  expect(end, why).toBeGreaterThan(0);
  expect(end, why).toBeLessThanOrEqual(200);
  // It presents part-way faded, not removed at once.
  expect(
    frames.some(f => f.opacity < 0.99 && f.opacity > 0.01),
    why,
  ).toBe(true);
  // Its row stays open while it is visible.
  for (const f of frames) {
    if (f.opacity > 0.01) {
      expect(f.row, why).toBeCloseTo(openRow, 0);
    }
  }
});

test('under Reduce Motion on a touch screen a toast fades in where it lands', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await openStory(page, storybook(), 'core-toast--mobile-swipe-to-dismiss');
  const driver = await touchDriver(page);
  const trigger = await page
    .getByRole('button', {name: 'Show toast'})
    .boundingBox();
  if (trigger == null) {
    throw new Error('no trigger');
  }
  // A first toast finds the viewport, which stays after its last toast
  // leaves. The hold covers only the viewport, so the trigger's own feedback
  // never starts it.
  await driver.tap({
    x: trigger.x + trigger.width / 2,
    y: trigger.y + trigger.height / 2,
  });
  const first = page.locator('.astryx-toast').first();
  await expect(first).toBeVisible();
  const list = await cardList(page, first);
  const close = await first
    .getByRole('button', {name: 'Dismiss notification'})
    .boundingBox();
  if (close == null) {
    throw new Error('no close button');
  }
  await driver.tap({
    x: close.x + close.width / 2,
    y: close.y + close.height / 2,
  });
  await expect(page.locator('[data-toast-id]')).toHaveCount(0);
  const again = await page
    .getByRole('button', {name: 'Show toast'})
    .boundingBox();
  if (again == null) {
    throw new Error('no trigger');
  }
  const hold = await armHold(page, list, {newOnly: true});
  await driver.tap({
    x: again.x + again.width / 2,
    y: again.y + again.height / 2,
  });
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await expectReducedMotionFade(page, card, hold);
  expect((await ownSwipe(card)).y).toBe(0);
});

test('the settle keeps advancing every frame while the main thread is blocked', async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'chromium',
    'screencast frame evidence is Chromium-only in Playwright',
  );
  const {driver, card, from} = await openToast(page);
  await markElement(card);
  const cast = await startScreencast(page);
  // Recorded from before the release, so a settle that ends during the block
  // is still read.
  const settleWatch = await watchAnimations(card);
  // The page blocks itself once the settle has run a frame. A block sent from
  // the test would start later the busier the machine is.
  const blocked = blockMainThread(page, 400, {during: card});
  await driver.play(restingDrag(from, 38));
  const block = await blocked;
  const [settle] = await settleWatch.started();
  await page.waitForTimeout(150);
  const castFrames = await cast.stop();
  const tracked = await trackMarker(page, castFrames);
  const moving = {from: block.from, to: Math.min(block.to, curveEnd(settle))};
  // The marker resolves whole CSS pixels. The last pixels of a settle this
  // small move under a pixel per frame, so judge until 3 px from rest.
  const proof = busyWindowProof(tracked, moving, {settledWithin: 3});
  await writeEvidence(
    'busy-main-thread/toast-settle',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {
          block,
          settle,
          proof,
          frames: tracked.map(f => ({
            t: +(f.t - block.from).toFixed(1),
            y: f.box?.y ?? null,
          })),
        },
        null,
        1,
      ),
    },
    testInfo,
  );
  const film = await castStoryboard(page, castFrames, {
    name: 'toast-settle-busy-main-thread',
    zero: block.from,
    from: block.from - 40,
    to: moving.to + 40,
    columns: 8,
    cellScale: 0.5,
    data: t => ({y: tracked.find(f => f.t === t)?.box?.y ?? -1}),
  });
  await film.write(testInfo, {block, settle});
  expect(proof.frames).toBeGreaterThanOrEqual(proof.expectedFrames - 2);
  expect(proof.changed).toBeGreaterThanOrEqual(proof.frames - 3);
  expect(proof.monotonic).toBe(true);
});

test('the settle does no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver, card, from} = await openToast(page);
  // The card under test is on screen, painted, before the count starts.
  await expect(card).toHaveCount(1);
  const box = await cardBox(card);
  expect(box.bottom - box.top).toBeGreaterThan(0);
  let settle: ActiveAnimation | undefined;
  const trace = await traceRendering(page, async () => {
    await driver.play(restingDrag(from, 38));
    [settle] = await waitForAnimation(card);
    await waitForRest(card);
  });
  if (settle == null) {
    throw new Error('no settle');
  }
  const during = countBetween(trace, settle.from + 50, curveEnd(settle) - 50);
  // No work per frame (about 30 frames here). Chromium hit-tests the last
  // touch point once as the card moves away from under it, as a hover update.
  // That may land inside the window as one Layout and one Paint.
  expect(during.Layout ?? 0, JSON.stringify(during)).toBeLessThanOrEqual(2);
  expect(during.Paint ?? 0, JSON.stringify(during)).toBeLessThanOrEqual(1);
  expect(trace.longTasks).toEqual([]);
});

test('the drag does no Layout or Paint per move', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver, card, from} = await openToast(page);
  // The card under test is on screen, painted, before the count starts.
  await expect(card).toHaveCount(1);
  const box = await cardBox(card);
  expect(box.bottom - box.top).toBeGreaterThan(0);
  let window = {from: 0, to: 0};
  const trace = await traceRendering(page, async () => {
    const started = await page.evaluate(
      () => performance.timeOrigin + performance.now(),
    );
    await driver.play(
      drag(
        from,
        {x: from.x, y: from.y - 40},
        {durationMs: 600, hz: 60, restMs: 0},
      ),
    );
    window = {
      from: started,
      to: await page.evaluate(() => performance.timeOrigin + performance.now()),
    };
  });
  // The drag moved the card: released short of dismissing, it springs back,
  // which a card left at rest never does.
  const [settle] = await waitForAnimation(card);
  expect(settle, 'no spring-back: the drag never moved the card').toBeDefined();
  // The steady middle of the drag: once the card follows (past 14 px).
  const during = countBetween(trace, window.from + 300, window.to - 50);
  expect(during.Layout ?? 0, JSON.stringify(during)).toBe(0);
  expect(during.Paint ?? 0, JSON.stringify(during)).toBe(0);
});

test(
  'storyboard: drag, spring back, then swipe away',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, card, from} = await openToast(page);
    await installTimerGate(page);
    const viewport = page.viewportSize() ?? {width: 402, height: 714};
    const clip = {x: 0, y: 0, width: viewport.width, height: 220};
    const measure = async () => ({
      offset: (await card.count()) === 0 ? null : await cardOffset(card),
    });
    const settleWatch = await watchAnimations(card);
    const dragBoard = await touchStoryboard(
      page,
      driver,
      drag(
        from,
        {x: from.x, y: from.y - 38},
        {durationMs: 600, hz: 30, restMs: 150, easing: p => 1 - (1 - p) ** 3},
      ),
      {name: 'toast-drag', clip, measure, columns: 6, cellScale: 0.5},
    );
    await settleWatch.started();
    await freezeTimers(page);
    const {storyboard: settleBoard} = await animationStoryboard(page, {
      name: 'toast-settle',
      clip,
      scope: card,
      measure,
      columns: 8,
      cellScale: 0.5,
    });
    await releaseAnimations(page, {finish: true});
    await thawTimers(page);
    await waitForRest(card);
    await dragBoard.write(testInfo);
    await settleBoard.write(testInfo);
    // One frame per scripted event; the last is the lift, after which the
    // card has started back.
    const dragOffsets = dragBoard.frames
      .slice(0, -1)
      .map(f => f.data.offset as number);
    expect(
      dragOffsets.every((o, i) => i === 0 || o <= dragOffsets[i - 1] + 0.25),
    ).toBe(true);
    expect(dragOffsets.at(-1)).toBeCloseTo(follow(38), 0);
    const settleOffsets = settleBoard.frames.map(f => f.data.offset as number);
    expect(
      settleOffsets.every(
        (o, i) => i === 0 || o >= settleOffsets[i - 1] - 0.25,
      ),
    ).toBe(true);
    expect(settleOffsets.at(-1)).toBeCloseTo(0, 0);

    // Swipe it away: it retracts past the top edge from where the finger left
    // it, without fading.
    const exitMeasure = async () =>
      (await card.count()) === 0
        ? {top: null, bottom: null, opacity: null}
        : card.evaluate(el => ({
            top: el.getBoundingClientRect().y,
            bottom: el.getBoundingClientRect().bottom,
            opacity: Number(getComputedStyle(el).opacity),
          }));
    const exitWatch = await watchAnimations(await cardList(page, card));
    await driver.play(
      drag(from, {x: from.x, y: from.y - 60}, {durationMs: 1000, hz: 60}),
    );
    await exitWatch.started();
    await freezeTimers(page);
    const {storyboard: exitBoard} = await animationStoryboard(page, {
      name: 'toast-swipe-exit',
      clip,
      scope: card,
      measure: exitMeasure,
      columns: 8,
      cellScale: 0.5,
    });
    await releaseAnimations(page, {finish: true});
    await thawTimers(page);
    await exitBoard.write(testInfo);
    const exitTops = exitBoard.frames
      .map(f => f.data.top as number | null)
      .filter((top): top is number => top != null);
    expect(
      exitTops.every((top, i) => i === 0 || top <= exitTops[i - 1] + 0.25),
    ).toBe(true);
    // It ends past the top edge, and never fades on the way.
    const exitBottoms = exitBoard.frames
      .map(f => f.data.bottom as number | null)
      .filter((bottom): bottom is number => bottom != null);
    expect(exitBottoms.at(-1)).toBeLessThanOrEqual(0);
    const exitOpacity = exitBoard.frames
      .map(f => f.data.opacity as number | null)
      .filter((opacity): opacity is number => opacity != null);
    expect(exitOpacity.every(opacity => opacity === 1)).toBe(true);
  },
);

test('presentation="toast" under a finger: Toast’s own swipe is the shared pan, so a drag away from the edge leaves the card and one toward it moves it and dismisses it (spec:AST-094 FR43)', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-toast--mobile-toast-presentation');
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(true);
  const driver = await touchDriver(page);
  const trigger = await page
    .getByRole('button', {name: 'Show toast'})
    .boundingBox();
  if (trigger == null) {
    throw new Error('no trigger');
  }
  await driver.tap({
    x: trigger.x + trigger.width / 2,
    y: trigger.y + trigger.height / 2,
  });
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await waitForRest(card);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const from = {
    x: Math.round(box.x + 40),
    y: Math.round(box.y + box.height / 2),
  };

  // Away from the top edge: the card stays where it is.
  await driver.play(
    drag(from, {x: from.x, y: from.y + 60}, {durationMs: 300, hz: 60}),
  );
  expect(await ownSwipe(card)).toEqual({y: 0, scale: 1, opacity: 1});
  await expect(page.locator('.astryx-toast')).toHaveCount(1);

  // Toward it: the card follows the finger 1:1, and the release dismisses it.
  let followed = 0;
  await driver.play(
    drag(from, {x: from.x, y: from.y - 80}, {durationMs: 300, hz: 60}),
    {
      onEvent: async step => {
        if (step.type === 'touchMove') {
          followed = Math.min(followed, (await ownSwipe(card)).y);
        }
      },
    },
  );
  expect(followed).toBeLessThan(-40);
  await expect(page.locator('.astryx-toast')).toHaveCount(0);
});
