// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ItemSwipeActions.interaction.browser.spec.ts
 * @input The built "Swipe Actions" Item story, real touch input (Chromium
 *   CDP / WebKit's input command), the interaction harness and the UIKit
 *   constants table (motion/uikit/swipeActions.ts)
 * @output Interaction and animation proofs for a row's swipe actions: the row
 *   trails the finger on UIKit's tracking spring and catches up when it
 *   stops; the settle after a held release is UIKit's spring, frame by frame
 *   as the gesture writes it, with the panel's window, track and entries
 *   drawn in step with the row at every frame; a flick hands the row's
 *   velocity to the settle; a finger that lands on a settling row catches
 *   it without a jump; a close a blocked main thread holds back starts from
 *   where the row was; the drag and the settle do no Layout or Paint per
 *   frame; a tap on a resting row's own content closes it and clicks
 *   nothing, and a scroll that starts on it closes it; storyboards. Under
 *   Reduce Motion a release and that tap land with no travel at the bottom
 *   of an opacity dip (design:reduced-motion DR2).
 * @position Interaction proofs of Item's swipeActions (the shape of
 *   BottomSheetDetent.interaction.browser.spec.ts, the harness exemplar). The
 *   gesture writes the row's travel as a custom property on its root every
 *   frame and each part's transform reads it (`spec:AST-057` FR2), so curves
 *   are read from a log of the frames it writes, and positions from each
 *   part's computed `transform`. The swipe reads each touch's pointer, the
 *   same on every device; the project's touchscreen gives Chromium and WebKit
 *   a phone's (a coarse primary pointer).
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  castStoryboard,
  compareCurve,
  countBetween,
  drag,
  flick,
  installLongTaskLog,
  markElement,
  openStory,
  readLongTasks,
  retakeOnTouchPacing,
  sampleRects,
  springStep,
  startScreencast,
  tap,
  toTouchEvents,
  touchDriver,
  touchStoryboard,
  traceRendering,
  trackMarker,
  waitForRest,
  withStorybook,
  writeEvidence,
  type TouchDriver,
} from '@astryxdesign/interaction-harness';
import {swipeActions} from '../../motion/uikit/swipeActions';

const storybook = withStorybook(test);

/**
 * The tracking and settle spring, as Core Animation renders it: overdamped on
 * paper (mass 2, stiffness 200, damping 100), critically damped in effect at
 * ω₀ = √(stiffness ÷ mass).
 */
const OMEGA = Math.sqrt(
  swipeActions.settle.stiffness / swipeActions.settle.mass,
);
const SPRING = {response: (2 * Math.PI) / OMEGA, dampingFraction: 1};

interface OpenRow {
  driver: TouchDriver;
  row: Locator;
  panel: Locator;
  track: Locator;
  entries: Locator;
  /** The row's resting box. */
  rest: {x: number; y: number; width: number; height: number};
  /** Where a finger lands to drag toward the trailing side (leftward). */
  start: {x: number; y: number};
}

async function openRow(page: Page): Promise<OpenRow> {
  await installLongTaskLog(page);
  await openStory(page, storybook(), 'core-item--swipe-actions');
  const driver = await touchDriver(page);
  const row = page.locator('.astryx-item').first();
  const panel = row.locator('[data-swipe-panel="trailing"]');
  // The gesture arrives with the swipe layer.
  await expect(panel).toBeAttached();
  const track = panel.locator(':scope > div').first();
  // The entries are the track's children, each its own moving element.
  const entries = track;
  const rest = await row.boundingBox();
  if (rest == null) {
    throw new Error('no row');
  }
  return {
    driver,
    row,
    panel,
    track,
    entries,
    rest,
    start: {x: rest.x + rest.width - 24, y: rest.y + rest.height / 2},
  };
}

/** How far the row opens: the entries' natural widths together. */
const openWidthOf = async (track: Locator) =>
  track.evaluate(node =>
    Array.from(node.children).reduce(
      (width, entry) => width + entry.getBoundingClientRect().width,
      0,
    ),
  );

/** The x an element is drawn at: its computed transform's (0 at none). */
const xOf = async (locator: Locator) =>
  locator.evaluate(
    node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41,
  );

/** One travel the gesture wrote on the row, and how the engine drew it. */
interface Frame {
  /** The frame it was written for: the document timeline's time (ms). */
  t: number;
  /** When it was written (ms, `performance.now()`). */
  at: number;
  /** The travel (physical px). */
  x: number;
  /** The row's opacity then (Reduce Motion's dip). */
  opacity: number;
  /** Where the row and each part of the trailing panel were drawn then. */
  parts: {root: number; panel: number; track: number; entries: number};
}

/**
 * Logs every travel the gesture writes on the row (`spec:AST-057` FR2: a
 * custom property on the root, written every frame while the row moves),
 * with the time of the frame it was written for (inside an animation frame
 * the document timeline reads that frame's time), the row's opacity, and
 * where the engine draws the row and each part of the trailing panel for it.
 */
async function recordFrames(row: Locator): Promise<void> {
  await row.evaluate(node => {
    const frames: unknown[] = [];
    const x = (el: Element | null) =>
      el == null
        ? Number.NaN
        : new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;
    const panel = node.querySelector('[data-swipe-panel="trailing"]');
    const track = panel?.firstElementChild ?? null;
    new MutationObserver(() => {
      const value = (node as HTMLElement).style.getPropertyValue(
        '--_item-swipe-travel',
      );
      if (value === '') {
        return;
      }
      frames.push({
        t: Number(document.timeline.currentTime),
        at: performance.now(),
        x: parseFloat(value),
        opacity: Number(getComputedStyle(node).opacity),
        parts: {
          root: x(node),
          panel: x(panel),
          track: x(track),
          entries: x(track?.firstElementChild ?? null),
        },
      });
    }).observe(node, {attributes: true, attributeFilter: ['style']});
    Object.assign(window, {__swipeFrames: frames});
  });
}

const framesOf = async (page: Page): Promise<Frame[]> =>
  page.evaluate(
    () => (window as unknown as {__swipeFrames: Frame[]}).__swipeFrames,
  );

/** Records when the finger first lifts (its pointerup or its touchend). */
async function recordLift(page: Page): Promise<void> {
  await page.evaluate(() => {
    const lift = {at: Number.NaN};
    const onLift = () => {
      if (Number.isNaN(lift.at)) {
        lift.at = performance.now();
      }
    };
    addEventListener('pointerup', onLift, {capture: true});
    addEventListener('touchend', onLift, {capture: true});
    Object.assign(window, {__swipeLift: lift});
  });
}

const liftOf = async (page: Page): Promise<number> =>
  page.evaluate(
    () => (window as unknown as {__swipeLift: {at: number}}).__swipeLift.at,
  );

/** The frames the gesture wrote once the finger had lifted: the settle's. */
const settleOf = async (page: Page): Promise<Frame[]> => {
  const lift = await liftOf(page);
  expect(Number.isNaN(lift)).toBe(false);
  return (await framesOf(page)).filter(frame => frame.at >= lift);
};

/**
 * A slow drag by `dx` (negative: toward the trailing side) that comes to rest
 * before the lift:
 * the finger creeps a tenth of a pixel a frame for its last 20 frames, so
 * UIKit's velocity filter (which never decays on its own) reads nearly zero,
 * and the row has caught up with the finger when it lifts.
 */
/**
 * `design:reduced-motion` DR1 and DR2 for a change of the row under Reduce
 * Motion that `act` starts with a lift: no travel (the gesture writes the
 * travel once after the lift, in one step, while the row is transparent) and
 * an opacity-only cross-fade of the row that dips and is over within 200 ms.
 * Then the row is at `to`, fully opaque.
 */
async function expectCrossFade(
  page: Page,
  row: Locator,
  to: number,
  act: () => Promise<void>,
): Promise<void> {
  await recordFrames(row);
  await recordLift(page);
  // The row's opacity at every frame from now on.
  await row.evaluate(node => {
    const opacity: {at: number; value: number}[] = [];
    const sample = () => {
      opacity.push({
        at: performance.now(),
        value: Number(getComputedStyle(node).opacity),
      });
      if (opacity.length < 600) {
        requestAnimationFrame(sample);
      }
    };
    requestAnimationFrame(sample);
    Object.assign(window, {__swipeOpacity: opacity});
  });
  await act();
  await page.waitForTimeout(400);
  const lift = await liftOf(page);
  const landing = await settleOf(page);
  // One write after the lift, while nothing showed.
  expect(landing.length, JSON.stringify(landing)).toBe(1);
  expect(landing[0].x).toBeCloseTo(to, 0);
  expect(landing[0].opacity).toBeLessThan(0.05);
  const opacity = (
    await page.evaluate(
      () =>
        (window as unknown as {__swipeOpacity: {at: number; value: number}[]})
          .__swipeOpacity,
    )
  ).filter(sample => sample.at >= lift);
  const dip = opacity.findIndex(sample => sample.value < 1);
  expect(dip, JSON.stringify(opacity)).toBeGreaterThanOrEqual(0);
  expect(Math.min(...opacity.map(sample => sample.value))).toBeLessThan(0.05);
  const back = opacity.findIndex((sample, k) => k > dip && sample.value === 1);
  expect(back, JSON.stringify(opacity)).toBeGreaterThan(dip);
  // Over within 200 ms of its first frame, give or take the frame that shows
  // it is over.
  expect(opacity[back].at - opacity[dip].at).toBeLessThanOrEqual(200 + 20);
  expect(await xOf(row)).toBeCloseTo(to, 0);
  expect(
    await row.evaluate(node => Number(getComputedStyle(node).opacity)),
  ).toBe(1);
}

function heldDrag(from: {x: number; y: number}, dx: number) {
  const moving = drag(
    from,
    {x: from.x + dx, y: from.y},
    {durationMs: 400, hz: 60},
  );
  const lift = moving[moving.length - 1];
  const last = moving[moving.length - 2];
  const frames = moving.slice(0, -1);
  for (let i = 1; i <= 20; i += 1) {
    frames.push({
      t: last.t + i * (1000 / 60),
      fingers: [{id: 0, x: from.x + dx + (Math.sign(dx) * i) / 10, y: from.y}],
    });
  }
  // Hold still a while longer, so the tracking spring has settled too.
  frames.push({t: frames[frames.length - 1].t + 900, fingers: lift.fingers});
  return frames;
}

test('the row trails the finger on the tracking spring and catches up when it stops', async ({
  page,
  browserName,
}) => {
  const {driver, row, start} = await openRow(page);
  const dx = 140;
  const script = drag(
    start,
    {x: start.x - dx, y: start.y},
    {durationMs: 400, hz: 60, restMs: 1100},
  );
  const moves = toTouchEvents(script).filter(e => e.type === 'touchMove');
  const lastMove = moves.length - 1;
  const samples: {finger: number; row: number}[] = [];
  let caughtUp = NaN;
  let index = 0;
  const started = Date.now();
  await driver.play(script, {
    onEvent: async step => {
      if (step.type !== 'touchMove') {
        return;
      }
      const finger = start.x - (step.fingers[0]?.x ?? start.x);
      samples.push({finger, row: -(await xOf(row))});
      if (index++ === lastMove) {
        // The finger has stopped: give the spring most of the rest (within
        // 0.05 px of the finger after a second).
        await page.waitForTimeout(1000);
        caughtUp = -(await xOf(row));
      }
    },
  });
  // The swipe is the finger's travel past UIKit's 25 px threshold. While
  // the finger moves the row trails it, never ahead and never backwards...
  const swipe = (finger: number) =>
    Math.max(0, finger - swipeActions.hysteresis);
  expect(samples.every(s => s.row <= swipe(s.finger) + 0.5)).toBe(true);
  expect(
    samples.every((s, i) => i === 0 || s.row >= samples[i - 1].row - 0.5),
  ).toBe(true);
  // ...visibly: a 1:1 drag would never be this far behind.
  expect(samples.some(s => swipe(s.finger) - s.row > 10)).toBe(true);
  // When the finger stops, the row catches up with it.
  expect(caughtUp).toBeCloseTo(swipe(dx), 0);
  await waitForRest(row);
  // No long task on the page while it tracked: the Long Tasks API is
  // Chromium-only, so WebKit runs the rest of the case.
  if (browserName === 'chromium') {
    expect(await readLongTasks(page, {from: started, to: Date.now()})).toEqual(
      [],
    );
  }
});

test('the settle after a held release is UIKit’s spring, frame by frame, with the panel in step', async ({
  page,
}, testInfo) => {
  const {driver, row, entries, start} = await openRow(page);
  const openWidth = await openWidthOf(entries);
  // The panel is there, with entries that have widths.
  expect(await entries.locator(':scope > *').count()).toBeGreaterThan(0);
  expect(openWidth).toBeGreaterThan(0);
  await recordFrames(row);
  await recordLift(page);
  // 105 px of swipe, held: past half the panel, so the row settles open.
  await driver.play(heldDrag(start, -130));
  await waitForRest(row);
  const lift = await liftOf(page);
  const frames = await framesOf(page);
  const samples = frames.filter(frame => frame.at >= lift);
  expect(samples.length).toBeGreaterThan(10);
  // Released at rest (the tracking spring had settled): the settle starts
  // from the row's place at zero velocity toward the open width, at the
  // frame that first runs it, and every frame writes the spring at that
  // frame's time. That first frame writes the place the row already had, so
  // it changes nothing on the row and is not logged: the start is read back
  // from the first frame logged, and must be the frame before it.
  const from = frames.filter(frame => frame.at < lift).at(-1)?.x ?? 0;
  const to = -openWidth;
  const progress = (samples[0].x - from) / (to - from);
  let lo = 0;
  let hi = 100;
  for (let i = 0; i < 60; i += 1) {
    const mid = (lo + hi) / 2;
    if (springStep(SPRING, mid) < progress) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const t0 = samples[0].t - (lo + hi) / 2;
  expect(samples[0].t - t0).toBeGreaterThan(10);
  expect(samples[0].t - t0).toBeLessThan(25);
  const expected = (t: number) =>
    from + (to - from) * springStep(SPRING, t - t0);
  const result = compareCurve(
    samples.map(s => ({t: s.t, value: s.x})),
    expected,
    0.25,
  );
  await writeEvidence(
    'curves/item-swipe-settle',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {spring: SPRING, openWidth, from, t0, comparison: result, samples},
        null,
        1,
      ),
    },
    testInfo,
  );
  // The frame times are the timeline's, to a tenth of a millisecond.
  expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(
    0.25,
  );
  expect(samples.at(-1)?.x).toBeCloseTo(to, 0);
  // Every part drawn from that one travel: the row moves by it, the window
  // cancels the row, the track moves with it, the entries stay pinned.
  const pinned = samples[0].parts.track + samples[0].parts.entries;
  for (const {x, parts} of samples) {
    expect(Math.abs(parts.root - x)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(parts.root + parts.panel)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(parts.track - parts.root)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(parts.track + parts.entries - pinned)).toBeLessThanOrEqual(
      0.01,
    );
  }
});

test('a flick hands the row’s velocity to the settle', async ({
  page,
}, testInfo) => {
  // A quick throw toward the trailing side: about 55 px of swipe, short of
  // half the panel, still moving at 1000 px/s when it lifts. The release
  // goes the way it moves, so the row opens; the settle starts with the
  // row's own velocity, which the tracking spring had built up, not from
  // rest. WebKit stamps a touch event when it dispatches it, so a stall on a
  // busy machine between the last move and the lift reads as a finger that
  // rested (`spec:AST-100` FR2: the release velocity is 0) and the throw no
  // longer flicks: the harness takes a throw the page received off its
  // pacing once more (retakeOnTouchPacing).
  await retakeOnTouchPacing(testInfo, async () => {
    const {driver, row, entries, start} = await openRow(page);
    const openWidth = await openWidthOf(entries);
    expect(openWidth).toBeGreaterThan(0);
    await recordFrames(row);
    await recordLift(page);
    await driver.play(
      flick(start, {velocity: {x: -1000, y: 0}, durationMs: 80, hz: 120}),
      {checkPacing: true},
    );
    await waitForRest(row);
    const lift = await liftOf(page);
    const frames = await framesOf(page);
    const tracking = frames.filter(frame => frame.at < lift);
    const settle = frames.filter(frame => frame.at >= lift);
    expect(tracking.length).toBeGreaterThan(2);
    expect(settle.length).toBeGreaterThan(10);
    const target = -openWidth;
    // The critically damped family, timed from the lift: x(t) = target +
    // (A + B·s)·e^(−ωs), with A the distance left at the lift and
    // B = v0 + ω·A. Fit A and B to the frames the settle wrote, by least
    // squares.
    let saa = 0;
    let sab = 0;
    let sbb = 0;
    let sya = 0;
    let syb = 0;
    for (const {t, x} of settle) {
      const s = (t - lift) / 1000;
      const a = Math.exp(-OMEGA * s);
      const b = s * a;
      const y = x - target;
      saa += a * a;
      sab += a * b;
      sbb += b * b;
      sya += y * a;
      syb += y * b;
    }
    const det = saa * sbb - sab * sab;
    const d0 = (sya * sbb - syb * sab) / det;
    const slope = (syb * saa - sya * sab) / det;
    const v0 = slope - OMEGA * d0;
    const fitted = (t: number) => {
      const s = (t - lift) / 1000;
      return target + (d0 + slope * s) * Math.exp(-OMEGA * s);
    };
    const result = compareCurve(
      settle.map(({t, x}) => ({t, value: x})),
      fitted,
      0.5,
    );
    // How fast the row was moving as the finger lifted: the parabola
    // through its last three frames, at the lift.
    const [p0, p1, p2] = tracking.slice(-3);
    const s1 = (p1.t - p0.t) / 1000;
    const s2 = (p2.t - p0.t) / 1000;
    const sl = (lift - p0.t) / 1000;
    const c2 = ((p2.x - p0.x) / s2 - (p1.x - p0.x) / s1) / (s2 - s1);
    const c1 = (p1.x - p0.x) / s1 - c2 * s1;
    const rowVelocity = c1 + 2 * c2 * sl;
    await writeEvidence(
      'curves/item-swipe-flick-settle',
      {
        [`${testInfo.project.name}.json`]: JSON.stringify(
          {
            omega: OMEGA,
            v0,
            d0,
            rowVelocity,
            target,
            comparison: result,
            frames,
          },
          null,
          1,
        ),
      },
      testInfo,
    );
    // The whole settle is that spring...
    expect(result.maxError, JSON.stringify(result.worst)).toBeLessThanOrEqual(
      0.5,
    );
    // ...starting with the velocity the row had as the finger lifted (UIKit
    // hands the presentation velocity to the settle; from rest it would
    // start at 0, and the finger's own is several times faster). The row's
    // velocity is read from frames 17 ms apart on a curve that bends, hence
    // the slack.
    expect(rowVelocity).toBeLessThan(-50);
    expect(
      Math.abs(v0 - rowVelocity),
      `v0 ${v0}, row ${rowVelocity}`,
    ).toBeLessThan(Math.abs(rowVelocity) * 0.2);
    expect(settle.at(-1)?.x).toBeCloseTo(target, 0);
  });
});

test('under Reduce Motion a held release lands open with no travel: the row steps there at the bottom of an opacity dip', async ({
  page,
}) => {
  // design:reduced-motion: the finger's own drag is direct manipulation, but
  // what its release starts never travels or springs, and cross-fades (DR2).
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver, row, entries, start} = await openRow(page);
  const openWidth = await openWidthOf(entries);
  expect(openWidth).toBeGreaterThan(0);
  await expectCrossFade(page, row, -openWidth, async () => {
    await driver.play(heldDrag(start, -130));
  });
});

test('a close the main thread holds back plays from its start after the block, skipping no travel', async ({
  page,
}) => {
  const {driver, row, entries, start} = await openRow(page);
  const openWidth = await openWidthOf(entries);
  expect(openWidth).toBeGreaterThan(0);
  await driver.play(heldDrag(start, -130));
  await waitForRest(row);
  // The task that closes the row then blocks for 800 ms, as a frame held back
  // does (iOS holds them during a smooth scroll).
  await page.evaluate(() => {
    window.addEventListener(
      'keydown',
      () => {
        const until = performance.now() + 800;
        while (performance.now() < until) {
          // Busy: the frame that would start the close is held back.
        }
      },
      {once: true},
    );
  });
  await entries.getByRole('button').first().focus();
  await page.keyboard.press('Escape');
  const firstFrame = await row.evaluate(
    async node =>
      new Promise<number>(resolve => {
        requestAnimationFrame(() => {
          resolve(new DOMMatrix(getComputedStyle(node).transform).e);
        });
      }),
  );
  // The close starts at the first frame after the block, not at the
  // keydown: that frame draws the row where it rested, not most of the way
  // home.
  expect(firstFrame).toBeLessThan(-openWidth * 0.9);
  await waitForRest(row);
  expect(await xOf(row)).toBeCloseTo(0, 0);
});

test('a finger that lands on a settling row catches it where it is', async ({
  page,
}) => {
  const {driver, row, start} = await openRow(page);
  await driver.play(
    flick(start, {velocity: {x: -1000, y: 0}, durationMs: 80, hz: 120}),
  );
  // The settle is under way.
  await expect.poll(async () => xOf(row)).toBeLessThan(-10);
  // Watch every frame while a second touch lands on the moving row and
  // drags it back toward closed.
  const from = {x: start.x - 80, y: start.y};
  const [rects] = await Promise.all([
    sampleRects(row, 700),
    driver.play(
      drag(from, {x: from.x + 120, y: from.y}, {durationMs: 300, hz: 60}),
    ),
  ]);
  const xs = rects.map(r => r.box?.x ?? NaN);
  const steps = xs.slice(1).map((x, i) => Math.abs(x - xs[i]));
  // The row is caught from where it was presented: no frame jumps, and none
  // moves faster than the settle itself did (about 1000 px/s, 17 px a frame
  // at 60 Hz, with a frame of slack).
  expect(Math.max(...steps)).toBeLessThan(35);
  await waitForRest(row);
});

/** A held drag on `open`'s row past half its panel: it rests open. Resolves with the open width. */
async function restOpen({driver, row, entries, start}: OpenRow) {
  const openWidth = await openWidthOf(entries);
  // The panel is there, with entries that have widths.
  expect(openWidth).toBeGreaterThan(0);
  await driver.play(heldDrag(start, -130));
  await expect.poll(async () => xOf(row)).toBeCloseTo(-openWidth, 0);
  return openWidth;
}

/**
 * A tap through the engine's own tap path where clicks are concerned: WebKit's
 * Linux build synthesises a click only from its tap gesture, not from injected
 * touch events (the gesture system's browser tests note the same).
 */
async function engineTap(
  page: Page,
  browserName: string,
  driver: TouchDriver,
  at: {x: number; y: number},
) {
  if (browserName === 'webkit') {
    await page.touchscreen.tap(Math.round(at.x), Math.round(at.y));
  } else {
    await driver.play(tap(at));
  }
}

/**
 * Records every press paint (`data-astryx-press`) written on `row` or inside
 * it from now on; returns how many there have been.
 */
async function recordPresses(row: Locator) {
  await row.evaluate(node => {
    const log: string[] = [];
    Object.assign(window, {__rowPresses: log});
    new MutationObserver(records => {
      for (const record of records) {
        const value = (record.target as Element).getAttribute(
          'data-astryx-press',
        );
        if (value != null) {
          log.push(value);
        }
      }
    }).observe(node, {
      attributes: true,
      attributeFilter: ['data-astryx-press'],
      subtree: true,
    });
  });
  return async () =>
    row
      .page()
      .evaluate(
        () =>
          (window as unknown as {__rowPresses: string[]}).__rowPresses.length,
      );
}

/** Counts the clicks that reach `row` (capture, before the row's own handlers). */
async function countClicks(row: Locator) {
  await row.evaluate(node => {
    const counter = {clicks: 0};
    Object.assign(window, {__rowClicks: counter});
    node.addEventListener(
      'click',
      () => {
        counter.clicks += 1;
      },
      true,
    );
  });
  return async () =>
    row
      .page()
      .evaluate(
        () =>
          (window as unknown as {__rowClicks: {clicks: number}}).__rowClicks
            .clicks,
      );
}

test('a tap on the resting row’s own content closes it, with no press paint, and no click reaches the row', async ({
  page,
  browserName,
}) => {
  const open = await openRow(page);
  const {driver, row, rest} = open;
  await restOpen(open);
  const clicks = await countClicks(row);
  const presses = await recordPresses(row);
  // On the row's own content, clear of the open panel at its trailing end.
  const content = {x: rest.x + 60, y: rest.y + rest.height / 2};
  await engineTap(page, browserName, driver, content);
  await expect.poll(async () => xOf(row)).toBeCloseTo(0, 0);
  await page.waitForTimeout(400);
  expect(await clicks()).toBe(0);
  // UIKit's cell never sees that touch: nothing highlighted the row.
  expect(await presses()).toBe(0);
  // The same tap on the closed row is the row's own, and paints its press.
  await engineTap(page, browserName, driver, content);
  await expect.poll(clicks).toBe(1);
  await expect.poll(presses).toBeGreaterThan(0);
});

test('Enter on the open row’s focused content activates the row and leaves it open, as a screen reader’s activation does (spec:AST-057 AR3)', async ({
  page,
}) => {
  const open = await openRow(page);
  const {row} = open;
  const openWidth = await restOpen(open);
  const clicks = await countClicks(row);
  // The row's own primary: its first button outside the swipe panels.
  const primary = row.locator('button:not([data-swipe-panel] *)').first();
  await primary.focus();
  await page.keyboard.press('Enter');
  await expect.poll(clicks).toBe(1);
  // Only a touch tap on the content closes the row (FR7); a click with no
  // touch before it, the keyboard's or VoiceOver's and TalkBack's, leaves the
  // row open.
  await page.waitForTimeout(400);
  expect(await xOf(row)).toBeCloseTo(-openWidth, 0);
});

test('under Reduce Motion a tap on the resting row’s content closes it with no travel, at the bottom of an opacity dip', async ({
  page,
  browserName,
}) => {
  // design:reduced-motion: on a coarse primary pointer a close cross-fades
  // (DR2), opacity only.
  await page.emulateMedia({reducedMotion: 'reduce'});
  const open = await openRow(page);
  const {driver, row, rest} = open;
  await restOpen(open);
  await waitForRest(row);
  const content = {x: rest.x + 60, y: rest.y + rest.height / 2};
  await expectCrossFade(page, row, 0, async () => {
    await engineTap(page, browserName, driver, content);
  });
});

test('a scroll that starts on the resting row closes it', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === 'webkit',
    'WebKit’s Linux build cannot scroll from injected touches; Mobile Safari on the simulator covers it',
  );
  await openStory(page, storybook(), 'core-item--swipe-actions');
  const driver = await touchDriver(page);
  // A row low on the page, and room below the list to scroll into.
  await page.evaluate(() => {
    document.body.style.minHeight = '3000px';
  });
  const row = page.locator('.astryx-item').nth(4);
  await expect(row.locator('[data-swipe-panel="trailing"]')).toBeAttached();
  const entries = row.locator('[data-swipe-panel="trailing"] > div');
  const rest = await row.boundingBox();
  if (rest == null) {
    throw new Error('no row');
  }
  await restOpen({
    driver,
    row,
    entries,
    panel: row.locator('[data-swipe-panel="trailing"]'),
    track: row.locator('[data-swipe-panel="trailing"] > div'),
    rest,
    start: {x: rest.x + rest.width - 24, y: rest.y + rest.height / 2},
  });
  // Up from the row's own content: the page scrolls, and the row closes.
  const from = {x: rest.x + 60, y: rest.y + rest.height / 2};
  await driver.play(
    drag(from, {x: from.x, y: from.y - 200}, {durationMs: 300, hz: 60}),
  );
  await expect
    .poll(async () => page.evaluate(() => scrollY))
    .toBeGreaterThan(50);
  await expect.poll(async () => xOf(row)).toBeCloseTo(0, 0);
});

test('the drag and the settle do no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver, row, start} = await openRow(page);
  await recordFrames(row);
  await recordLift(page);
  let dragWindow = {from: 0, to: 0};
  const trace = await traceRendering(page, async () => {
    const begun = Date.now();
    await driver.play(heldDrag(start, -130));
    dragWindow = {from: begun + 250, to: begun + 450};
    // The settle writes the travel every frame for about a second; the
    // trace runs past it.
    await page.waitForTimeout(1500);
  });
  const settle = await settleOf(page);
  expect(settle.length).toBeGreaterThan(10);
  const origin = await page.evaluate(() => performance.timeOrigin);
  // The steady part of the drag (after the claim) and of the settle: their
  // first and last frames may commit, and the row lands (one render) when
  // the settle ends.
  const during = countBetween(
    trace,
    origin + settle[0].t + 50,
    origin + (settle.at(-1)?.t ?? 0) - 50,
  );
  expect(during.Layout ?? 0, JSON.stringify(during)).toBe(0);
  expect(during.Paint ?? 0, JSON.stringify(during)).toBe(0);
  const dragging = countBetween(trace, dragWindow.from, dragWindow.to);
  expect(dragging.Layout ?? 0, JSON.stringify(dragging)).toBe(0);
  expect(trace.longTasks).toEqual([]);
});

/**
 * A filmstrip of the frames the screen presented while the row settled
 * (Chromium's screencast), each labelled with the travel the gesture had
 * written for it: the settle is written frame by frame on the main thread,
 * so there are no animations to seek.
 */
async function settleFilm(
  page: Page,
  frames: Awaited<
    ReturnType<Awaited<ReturnType<typeof startScreencast>>['stop']>
  >,
  settle: Frame[],
  name: string,
) {
  const origin = await page.evaluate(() => performance.timeOrigin);
  const from = origin + settle[0].t;
  const to = origin + (settle.at(-1)?.t ?? 0) + 50;
  return castStoryboard(page, frames, {
    name,
    zero: from,
    from,
    to,
    columns: 6,
    cellScale: 0.35,
    data: t => ({
      x: settle.filter(frame => origin + frame.t <= t).at(-1)?.x ?? settle[0].x,
    }),
  });
}

test(
  'storyboard: drag the row open and let it settle',
  {tag: '@storyboard'},
  async ({page, browserName}, testInfo) => {
    const {driver, row, start, rest} = await openRow(page);
    const clip = {
      x: 0,
      y: Math.max(0, rest.y - 8),
      width: page.viewportSize()?.width ?? 402,
      height: rest.height + 16,
    };
    await recordFrames(row);
    await recordLift(page);
    const cast =
      browserName === 'chromium' ? await startScreencast(page) : null;
    const measure = async () => ({x: await xOf(row)});
    const dragBoard = await touchStoryboard(
      page,
      driver,
      drag(
        start,
        {x: start.x - 130, y: start.y},
        {durationMs: 200, hz: 30, restMs: 150},
      ),
      {
        name: 'item-swipe-drag',
        clip,
        measure,
        columns: 4,
        cellScale: 0.6,
      },
    );
    await waitForRest(row);
    const castFrames = await cast?.stop();
    await dragBoard.write(testInfo);
    const settle = await settleOf(page);
    expect(settle.length).toBeGreaterThan(10);
    if (castFrames != null) {
      const film = await settleFilm(
        page,
        castFrames,
        settle,
        'item-swipe-settle',
      );
      await film.write(testInfo);
    }
    // The trace is the assertion; the sheets are the evidence.
    const dragXs = dragBoard.frames.map(f => f.data.x as number);
    expect(dragXs.every((x, i) => i === 0 || x <= dragXs[i - 1] + 0.5)).toBe(
      true,
    );
    expect(settle.at(-1)?.x).toBeLessThan(-60);
  },
);

test(
  'storyboard: a short drag springs back',
  {tag: '@storyboard'},
  async ({page, browserName}, testInfo) => {
    const {driver, row, rest} = await openRow(page);
    await recordFrames(row);
    await recordLift(page);
    const cast =
      browserName === 'chromium' ? await startScreencast(page) : null;
    // 30 px of swipe toward the leading side, come to rest: short of half
    // the panel, so the row springs back.
    await driver.play(
      heldDrag({x: rest.x + 24, y: rest.y + rest.height / 2}, 55),
    );
    await waitForRest(row);
    const castFrames = await cast?.stop();
    const settle = await settleOf(page);
    expect(settle.length).toBeGreaterThan(10);
    if (castFrames != null) {
      const film = await settleFilm(
        page,
        castFrames,
        settle,
        'item-swipe-spring-back',
      );
      await film.write(testInfo);
    }
    const xs = settle.map(frame => frame.x);
    expect(xs[0]).toBeGreaterThan(20);
    expect(xs.every((x, i) => i === 0 || x <= xs[i - 1] + 0.5)).toBe(true);
    expect(xs.at(-1)).toBeCloseTo(0, 0);
  },
);

test(
  'storyboard: a tap on the open row’s content closes it',
  {tag: '@storyboard'},
  async ({page, browserName}, testInfo) => {
    const open = await openRow(page);
    const {driver, row, rest} = open;
    await restOpen(open);
    await waitForRest(row);
    await recordFrames(row);
    await recordLift(page);
    const cast =
      browserName === 'chromium' ? await startScreencast(page) : null;
    await engineTap(page, browserName, driver, {
      x: rest.x + 60,
      y: rest.y + rest.height / 2,
    });
    await waitForRest(row);
    const castFrames = await cast?.stop();
    const settle = await settleOf(page);
    expect(settle.length).toBeGreaterThan(10);
    if (castFrames != null) {
      const film = await settleFilm(
        page,
        castFrames,
        settle,
        'item-swipe-tap-closes',
      );
      await film.write(testInfo);
    }
    const xs = settle.map(frame => frame.x);
    // From open to closed without a step back: the settle spring, from rest.
    expect(xs[0]).toBeLessThan(-100);
    expect(xs.every((x, i) => i === 0 || x >= xs[i - 1] - 0.5)).toBe(true);
    expect(xs.at(-1)).toBeCloseTo(0, 0);
  },
);

test(
  'storyboard: a flick opens the row and a finger catches it mid-settle',
  {tag: '@storyboard'},
  async ({page, browserName}, testInfo) => {
    test.skip(
      browserName !== 'chromium',
      'screencast frames are Chromium-only in Playwright',
    );
    const {driver, row, start} = await openRow(page);
    await markElement(row, {mode: 'outline'});
    const cast = await startScreencast(page);
    const began = Date.now();
    await driver.play(
      flick(start, {velocity: {x: -1000, y: 0}, durationMs: 80, hz: 120}),
    );
    // The settle is under way.
    await expect.poll(async () => xOf(row)).toBeLessThan(-10);
    const from = {x: start.x - 80, y: start.y};
    await driver.play(
      drag(from, {x: from.x + 120, y: from.y}, {durationMs: 300, hz: 60}),
    );
    await waitForRest(row);
    const castFrames = await cast.stop();
    const tracked = await trackMarker(page, castFrames);
    const film = await castStoryboard(page, castFrames, {
      name: 'item-swipe-flick-and-catch',
      zero: began,
      from: began,
      to: Date.now(),
      columns: 8,
      cellScale: 0.35,
      data: t => ({x: tracked.find(f => f.t === t)?.box?.x ?? -1}),
    });
    await film.write(testInfo);
    // The trace is the assertion: no frame jumps across the catch.
    const xs = tracked
      .filter(f => f.t >= began && f.box != null)
      .map(f => f.box?.x as number);
    const steps = xs.slice(1).map((x, i) => Math.abs(x - xs[i]));
    expect(xs.length).toBeGreaterThan(10);
    expect(Math.max(...steps)).toBeLessThan(35);
  },
);
