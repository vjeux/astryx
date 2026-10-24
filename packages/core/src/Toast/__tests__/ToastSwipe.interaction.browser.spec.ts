// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ToastSwipe.interaction.browser.spec.ts
 * @input The built "Mobile situations / Swipe to dismiss" Toast story, real
 *   touch input (Chromium CDP / WebKit's input command), the interaction
 *   harness and the Toast constants of the UIKit table
 * @output Interaction and animation proofs for swiping a Toast toward its
 *   edge: the card stays still for the follow distance and then follows at
 *   the follow ratio, with no jump; a release short of the dismiss travel
 *   springs back on the settle spring (sampled frame by frame against the
 *   spring); a slow long drag and a quick short flick dismiss, the exit
 *   starting where the finger left the card; a horizontal drag leaves the
 *   card alone; a touch during the spring-back passes through; the settle
 *   keeps advancing through a blocked main thread and does no Layout or
 *   Paint; storyboards of the drag, the settle and the exit.
 * @position Toast's interaction spec, shaped after the harness exemplar
 *   (BottomSheetDetent.interaction.browser.spec.ts)
 *
 * The story places its toast at the top, so a swipe toward the edge moves the
 * finger up and the card's offsets from rest are negative.
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  animationStoryboard,
  blockMainThread,
  busyWindowProof,
  castStoryboard,
  compareCurve,
  countBetween,
  drag,
  flick,
  frames,
  freezeTimers,
  holdAnimations,
  installLongTaskLog,
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
  withStorybook,
  writeEvidence,
  type ActiveAnimation,
  type TouchDriver,
} from '@astryxdesign/interaction-harness';
import {toast as TOAST} from '../../motion/uikit/toast';

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
 * lift: release velocity ~0 (UIKit's estimator keeps a stopped finger's
 * last speed, so the finger must slow down, not just stop).
 */
function restingDrag(from: {x: number; y: number}, travel: number) {
  return drag(
    from,
    {x: from.x, y: from.y - travel},
    {durationMs: 600, hz: 60, restMs: 150, easing: p => 1 - (1 - p) ** 3},
  );
}

/**
 * When a settle's curve reaches its end value, on the page clock: the
 * animator holds the end state long after (through main-thread blocks), so
 * the animation's active interval runs past the motion.
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
  // Monotonic toward the edge, still through the dead zone, and never a step
  // larger than two finger samples' worth (no jump when it starts to follow).
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
  expect(await readLongTasks(page, {from: started, to: Date.now()})).toEqual(
    [],
  );
});

test('a release short of the dismiss travel springs back on the settle spring', async ({
  page,
}, testInfo) => {
  const {driver, card, from} = await openToast(page);
  const travel = 36;
  await driver.play(restingDrag(from, travel));
  const [settle] = await waitForAnimation(card);
  const held = await holdAnimations(page, card);
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
          response: TOAST.settle.response,
          dampingFraction: TOAST.settle.dampingRatio,
        },
        t,
      ));
  const result = compareCurve(samples, expected, 0.5);
  await writeEvidence(
    'curves/toast-settle',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {settle, spring, comparison: result, samples},
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
  expect(tops.every(top => top <= atLift + 0.5)).toBe(true);
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

test('the settle keeps advancing every frame while the main thread is blocked', async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'chromium',
    'screencast frame evidence is Chromium-only in Playwright (WebKit: the iOS simulator rig)',
  );
  const {driver, card, from} = await openToast(page);
  await markElement(card);
  const cast = await startScreencast(page);
  await driver.play(restingDrag(from, 38));
  const [settle] = await waitForAnimation(card, {minProgressMs: 16});
  const block = await blockMainThread(page, 400);
  await page.waitForTimeout(150);
  const castFrames = await cast.stop();
  const tracked = await trackMarker(page, castFrames);
  const moving = {from: block.from, to: Math.min(block.to, curveEnd(settle))};
  // The marker resolves whole CSS pixels, and the last pixels of a settle
  // this small move under a pixel per frame: judge until 3 px from rest.
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
  expect(proof.medianFrameMs).toBeLessThan(20);
  expect(proof.frames).toBeGreaterThanOrEqual(proof.expectedFrames - 2);
  expect(proof.changed).toBeGreaterThanOrEqual(proof.frames - 3);
  expect(proof.longestStallMs).toBeLessThan(40);
  expect(proof.monotonic).toBe(true);
});

test('the settle does no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver, card, from} = await openToast(page);
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
  // touch point once as the card moves away from under it (a hover update),
  // which may land inside the window as one Layout and one Paint.
  expect(during.Layout ?? 0, JSON.stringify(during)).toBeLessThanOrEqual(2);
  expect(during.Paint ?? 0, JSON.stringify(during)).toBeLessThanOrEqual(1);
  expect(trace.longTasks).toEqual([]);
});

test('the drag does no Layout or Paint per move', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver, from} = await openToast(page);
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
    await waitForAnimation(card);
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

    // Swipe it away: the ordinary exit plays from where the finger left it.
    const exitMeasure = async () =>
      (await card.count()) === 0
        ? {top: null, opacity: null}
        : card.evaluate(el => ({
            top: el.getBoundingClientRect().y,
            opacity: Number(getComputedStyle(el).opacity),
          }));
    await driver.play(
      drag(from, {x: from.x, y: from.y - 60}, {durationMs: 1000, hz: 60}),
    );
    await waitForAnimation(card);
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
    // The last frame may already show the row gone (null).
    const exitOpacity = exitBoard.frames.map(
      f => (f.data.opacity as number | null) ?? 0,
    );
    expect(exitOpacity.at(-1)).toBeLessThan(0.05);
  },
);
