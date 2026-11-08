// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file LightboxDismissCancel.interaction.browser.spec.ts
 * @input The built "Default" Lightbox story on the phone project, real
 *   touch input and the interaction harness
 * @output Proofs for the drags that do not dismiss, against Photos' measured
 *   cancel rule. The viewer stays open, the photo springs back on
 *   `springs.settle` and the backdrop and controls return. They also cover
 *   Reduce Motion, a blocked main thread and a storyboard.
 * @position Interaction tests for Lightbox (browser), beside
 *   LightboxDismiss.interaction.browser.spec.ts
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  type ActiveAnimation,
  blockMainThread,
  busyWindowProof,
  compareCurve,
  CONTROL_RGB,
  curveOf,
  drag,
  frames,
  holdAnimations,
  markElement,
  openStory,
  releaseAnimations,
  sampleCurve,
  startBusyControl,
  startScreencast,
  timeline,
  touchDriver,
  type TouchDriver,
  type TouchScript,
  touchStoryboard,
  trackMarker,
  waitForAnimation,
  waitForRest,
  withStorybook,
  writeEvidence,
} from '@astryxdesign/interaction-harness';
import {slowViewer} from './viewerTempo';

const storybook = withStorybook(test);

/** The pan's begin threshold: travel before it is the finger's alone. */
const THRESHOLD = 10;
/**
 * `springs.settle` (response 0.5 s, critically damped) as a stiffness at mass
 * 1: (2π / 0.5 s)².
 */
const SETTLE_K = ((2 * Math.PI) / 0.5) ** 2;

/**
 * A critically damped spring towards 0 from `from` with velocity `v0`
 * (units/s), at `ms` milliseconds.
 */
function criticallyDamped(stiffness: number, from: number, v0 = 0) {
  const omega = Math.sqrt(stiffness);
  return (ms: number) => {
    const t = ms / 1000;
    return (from + (v0 + omega * from) * t) * Math.exp(-omega * t);
  };
}

function photoSvg(width: number, height: number): string {
  let squares = '';
  for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      if ((x + y) % 100 === 0) {
        squares += `<rect x="${x}" y="${y}" width="50" height="50"/>`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges"><rect width="${width}" height="${height}" fill="#fff"/><g fill="#000">${squares}</g><circle cx="${width / 2}" cy="${height / 2}" r="${height / 8}" fill="#d22"/></svg>`;
}

interface Viewer {
  driver: TouchDriver;
  dialog: Locator;
  photo: Locator;
  centre: {x: number; y: number};
  photoState: () => Promise<{x: number; y: number; scale: number}>;
  backdropAlpha: () => Promise<number>;
  closeAlpha: () => Promise<number>;
}

async function openViewer(page: Page): Promise<Viewer> {
  await page.route('https://picsum.photos/**', async route =>
    route.fulfill({contentType: 'image/svg+xml', body: photoSvg(3000, 2000)}),
  );
  await openStory(page, storybook(), 'core-lightbox--default');
  const driver = await touchDriver(page);
  const trigger = page.getByRole('button', {name: 'Open lightbox'});
  const box = await trigger.boundingBox();
  if (box == null) {
    throw new Error('no trigger');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const photo = dialog.locator('img').first();
  await expect
    .poll(async () =>
      photo.evaluate(el => (el as HTMLImageElement).naturalWidth),
    )
    .toBe(3000);
  await waitForRest(photo);
  const rect = await photo.boundingBox();
  if (rect == null) {
    throw new Error('no photo');
  }
  return {
    driver,
    dialog,
    photo,
    centre: {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2},
    photoState: async () =>
      photo.evaluate(el => {
        const style = getComputedStyle(el);
        const [x = '0', y = '0'] =
          style.translate === 'none' ? [] : style.translate.split(' ');
        return {
          x: parseFloat(x),
          y: parseFloat(y),
          scale: style.scale === 'none' ? 1 : parseFloat(style.scale),
        };
      }),
    backdropAlpha: async () =>
      dialog.evaluate(el =>
        parseFloat(getComputedStyle(el, '::backdrop').opacity),
      ),
    closeAlpha: async () =>
      dialog
        .locator('[data-lightbox-chrome]')
        .first()
        .evaluate(el => parseFloat(getComputedStyle(el).opacity)),
  };
}

/** Down by `dy`, then quickly back up by `up`: released moving up. */
function pullThenFlickUp(
  from: {x: number; y: number},
  dy: number,
  up: number,
): TouchScript {
  const down = {x: from.x, y: from.y + dy};
  return drag(from, down, {durationMs: 400})
    .slice(0, -1)
    .concat(
      drag(down, {x: down.x, y: down.y - up}, {durationMs: 60})
        .slice(1)
        .map(f => ({...f, t: f.t + 420})),
    );
}

/** Down by `dy`, then back to `travel` past the pan's threshold, held still. */
function pullThenReturn(
  from: {x: number; y: number},
  dy: number,
  travel: number,
): TouchScript {
  const down = {x: from.x, y: from.y + dy};
  return drag(from, down, {durationMs: 300})
    .slice(0, -1)
    .concat(
      drag(
        down,
        {x: down.x, y: from.y + THRESHOLD + travel},
        {durationMs: 300, restMs: 150},
      )
        .slice(1)
        .map(f => ({...f, t: f.t + 320})),
    );
}

/**
 * The held return's translateY and scale curves, and how long it runs. The
 * hold judges the motions the test reads.
 */
async function heldReturn(
  page: Page,
  photo: Locator,
  judged: ReadonlyArray<'translate' | 'scale'>,
) {
  const held = await holdAnimations(page, photo, {
    judges: judged.map(property => ({target: photo, property})),
  });
  const duration = Math.max(...held.map(a => a.curveEndMs));
  const samples = await sampleCurve(photo, timeline(duration));
  await releaseAnimations(page);
  return {
    held,
    duration,
    y: curveOf(samples, 'translateY'),
    scale: curveOf(samples, 'scaleX'),
  };
}

/** The viewer stays open, the photo at rest at the fitted size, all faded back. */
async function expectRestored(v: Viewer) {
  await waitForRest(v.photo);
  await expect(v.dialog).toBeVisible();
  expect(await v.photoState()).toEqual({x: 0, y: 0, scale: 1});
  await expect.poll(v.backdropAlpha).toBeCloseTo(1, 2);
  await expect.poll(v.closeAlpha).toBeCloseTo(1, 2);
}

test('released moving up, the photo springs back on springs.settle and the viewer stays open', async ({
  page,
}, testInfo) => {
  const v = await openViewer(page);
  await v.driver.play(pullThenFlickUp(v.centre, 150, 60));
  const [ret] = await waitForAnimation(v.photo);
  const back = await heldReturn(page, v.photo, ['translate', 'scale']);
  // The size returns from rest. The position carries the finger's upward
  // velocity, read from the first two samples as one unknown. The rest of the
  // curve must follow springs.settle.
  const size = compareCurve(
    back.scale,
    t => 1 + criticallyDamped(SETTLE_K, back.scale[0].value - 1)(t),
    0.002,
  );
  const omega = Math.sqrt(SETTLE_K);
  const [s0, s1] = back.y;
  const t1 = (s1.t - s0.t) / 1000;
  const v0 =
    (s1.value * Math.exp(omega * t1) - s0.value) / t1 - omega * s0.value;
  const position = compareCurve(
    back.y,
    t => criticallyDamped(SETTLE_K, s0.value, v0)(t - s0.t),
    0.75,
  );
  await writeEvidence(
    'curves/lightbox-dismiss-cancel-up',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {ret, back, v0, size, position},
        null,
        1,
      ),
    },
    testInfo,
  );
  expect(back.y[0].value).toBeGreaterThan(40);
  expect(back.scale[0].value).toBeLessThan(0.99);
  expect(size.maxError, JSON.stringify(size.worst)).toBeLessThanOrEqual(0.002);
  expect(position.maxError, JSON.stringify(position.worst)).toBeLessThanOrEqual(
    0.75,
  );
  await expectRestored(v);
});

test('brought back within 10 pt of the start and held still, it springs back from rest', async ({
  page,
}, testInfo) => {
  const v = await openViewer(page);
  await v.driver.play(pullThenReturn(v.centre, 120, 4));
  const [ret] = await waitForAnimation(v.photo);
  const back = await heldReturn(page, v.photo, ['translate']);
  const position = compareCurve(
    back.y,
    criticallyDamped(SETTLE_K, back.y[0].value),
    0.25,
  );
  await writeEvidence(
    'curves/lightbox-dismiss-cancel-return',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {ret, back, position},
        null,
        1,
      ),
    },
    testInfo,
  );
  expect(back.y[0].value).toBeGreaterThan(2);
  expect(position.maxError, JSON.stringify(position.worst)).toBeLessThanOrEqual(
    0.25,
  );
  await expectRestored(v);
});

test('the backdrop keeps its blur at rest and fades without it while it moves', async ({
  page,
}) => {
  const v = await openViewer(page);
  const filter = async () =>
    v.dialog.evaluate(el => {
      const style = getComputedStyle(
        el,
        '::backdrop',
      ) as CSSStyleDeclaration & {webkitBackdropFilter?: string};
      return style.backdropFilter || style.webkitBackdropFilter || 'none';
    });
  expect(await filter()).toBe('blur(2px)');
  // On a 2-core limit a full-viewport blur repainted every frame of the fade
  // drops frames, so the drag fades the backdrop without it.
  let during: string | null = null;
  let moves = 0;
  await v.driver.play(pullThenReturn(v.centre, 120, 4), {
    onEvent: async step => {
      moves += step.type === 'touchMove' ? 1 : 0;
      if (step.type === 'touchMove' && moves === 10 && during == null) {
        during = await filter();
      }
    },
  });
  expect(during).toBe('none');
  await expectRestored(v);
  await expect.poll(filter).toBe('blur(2px)');
});

test('an 18 px flick down closes: its projected travel passes the commit point (FR36)', async ({
  page,
}) => {
  const v = await openViewer(page);
  // About 8 pt past the pan's threshold, quickly: short of the 10 pt commit
  // point, but the release velocity carries its projection past it.
  await v.driver.play(
    drag(
      v.centre,
      {x: v.centre.x, y: v.centre.y + 18},
      {durationMs: 40, restMs: 0},
    ),
  );
  await expect(v.dialog).toBeHidden();
});

test('without zoom, a dragged photo draws outside its own box', async ({
  page,
}) => {
  const v = await openViewer(page);
  let clipping: string[] | null = null;
  let moves = 0;
  await v.driver.play(
    drag(
      v.centre,
      {x: v.centre.x, y: v.centre.y + 120},
      {durationMs: 600, restMs: 150},
    ),
    {
      onEvent: async step => {
        moves += step.type === 'touchMove' ? 1 : 0;
        if (step.type === 'touchMove' && moves === 12 && clipping == null) {
          // Every box between the photo and the dialog (which clips at the
          // screen's edge) lets the moved photo show.
          clipping = await v.photo.evaluate(el => {
            const found: string[] = [];
            for (
              let box = el.parentElement;
              box != null && box.tagName !== 'DIALOG';
              box = box.parentElement
            ) {
              if (getComputedStyle(box).overflow !== 'visible') {
                found.push(box.className);
              }
            }
            return found;
          });
        }
      },
    },
  );
  expect(clipping).toEqual([]);
});

test('a slow short drag released below the threshold springs back', async ({
  page,
}, testInfo) => {
  const v = await openViewer(page);
  // 8 pt past the pan's threshold, slowly, held still: below the 10 pt a
  // release needs to dismiss.
  await v.driver.play(
    drag(
      v.centre,
      {x: v.centre.x, y: v.centre.y + THRESHOLD + 8},
      {durationMs: 600, restMs: 150},
    ),
  );
  const [ret] = await waitForAnimation(v.photo);
  const back = await heldReturn(page, v.photo, ['translate']);
  const position = compareCurve(
    back.y,
    criticallyDamped(SETTLE_K, back.y[0].value),
    0.25,
  );
  await writeEvidence(
    'curves/lightbox-dismiss-cancel-short',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {ret, back, position},
        null,
        1,
      ),
    },
    testInfo,
  );
  expect(back.y[0].value).toBeGreaterThan(4);
  expect(position.maxError, JSON.stringify(position.worst)).toBeLessThanOrEqual(
    0.25,
  );
  await expectRestored(v);
});

test('under Reduce Motion a cancelled drag returns by a fade of 200 ms or less, with no travel', async ({
  page,
}) => {
  // Under reduced motion, what a touch release starts fades in place. It never
  // moves or scales on its way back.
  await page.emulateMedia({reducedMotion: 'reduce'});
  const v = await openViewer(page);
  await v.driver.play(pullThenFlickUp(v.centre, 150, 60));
  await waitForAnimation(v.photo);
  const held = await holdAnimations(page, v.photo, {
    judges: {target: v.photo, property: 'opacity'},
  });
  const duration = Math.max(...held.map(a => a.curveEndMs));
  const samples = await sampleCurve(v.photo, timeline(duration));
  await releaseAnimations(page);
  expect(duration).toBeLessThanOrEqual(205);
  const ys = samples.map(s => s.transform.translateY);
  const from = ys[0];
  const to = ys.at(-1) ?? from;
  for (const y of ys) {
    expect(Math.min(Math.abs(y - from), Math.abs(y - to))).toBeLessThan(0.5);
  }
  await waitForRest(v.photo);
  await expect(v.dialog).toBeVisible();
  await expectRestored(v);
});

test('the cancel keeps moving every frame while the main thread is blocked', async ({
  page,
}, testInfo) => {
  const v = await openViewer(page);
  await markElement(v.photo, {mode: 'outline'});
  // A compositor-only control animation in the same window: what the
  // compositor presented while the main thread spun, on this machine.
  await startBusyControl(page);
  // The same return at the default tempo, to compare the slowed one with.
  // Pulled 300 px, so the return has travel to judge.
  await v.driver.play(pullThenFlickUp(v.centre, 300, 60));
  const atTempo1 = curvesByProperty(await waitForAnimation(v.photo));
  await waitForRest(v.photo);
  // With the main thread blocked, a loaded runner's compositor presents a
  // frame every 100 to 250 ms. The return moves for about half a second,
  // which leaves too few frames to judge. So it plays at a slow tempo.
  await slowViewer(page, CANCEL_TEMPO);
  const since = await page.evaluate(() => performance.now());
  const cast = await startScreencast(page);
  await v.driver.play(pullThenFlickUp(v.centre, 300, 60));
  // The page must read the drag as a cancel, so the photo returns. A drag
  // read as a dismissal sends the photo out of the dialog. Nothing then
  // returns to block on, so that fails here, by name.
  expectReturn(await waitForAnimation(v.photo, {since}));
  // Blocked inside the page once the return runs on the compositor. At this
  // tempo the return lasts seconds, so a block started a round trip late
  // still holds most of it. A wait armed before the drag would poll the page
  // through the drag, and a loaded runner then stalls the drag's touches.
  const block = await blockMainThread(page, CANCEL_BLOCK_MS, {
    during: v.photo,
    minProgressMs: 16,
  });
  // Lightbox's own return played at that tempo, and still runs after the
  // block. The size's curve starts at rest, so it is exactly that many times
  // as long as at tempo 1. The position's curve carries the flick, whose
  // speed the tempo leaves as it is, so it is a little less.
  const slowed = curvesByProperty(await waitForAnimation(v.photo, {since}));
  expect([...slowed.keys()].sort()).toEqual([...atTempo1.keys()].sort());
  const ratioOf = (property: string) =>
    (slowed.get(property)?.ms ?? Number.NaN) /
    (atTempo1.get(property)?.ms ?? Number.NaN);
  expect(ratioOf('scale')).toBeGreaterThan(CANCEL_TEMPO - 0.1);
  expect(ratioOf('scale')).toBeLessThan(CANCEL_TEMPO + 0.1);
  expect(ratioOf('translate')).toBeGreaterThan(CANCEL_TEMPO - 1);
  expect(ratioOf('translate')).toBeLessThan(CANCEL_TEMPO + 0.1);
  for (const [property, run] of slowed) {
    expect(run.isRunning, property).toBe(true);
  }
  // A few frames after the block, so the screencast holds its end.
  await frames(page, 6);
  const castFrames = await cast.stop();
  const tracked = await trackMarker(page, castFrames);
  const control = await trackMarker(page, castFrames, {rgb: CONTROL_RGB});
  const proof = busyWindowProof(tracked, block, {
    axis: 'y',
    settledWithinSteps: CANCEL_SETTLED_STEPS,
    control,
  });
  await writeEvidence(
    'busy-main-thread/lightbox-dismiss-cancel',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {block, proof, control},
        null,
        1,
      ),
    },
    testInfo,
  );
  // Judged against the control. A two-core runner's software compositor and
  // the screencast share the core the block spins on. So every compositor
  // animation presents fewer frames there, the control's too. The photo keeps
  // pace with the control, and a main-thread animation would not.
  expect(proof.verdict.failures).toEqual([]);
  expect(proof.monotonic).toBe(true);
  await expectRestored(v);
});

/**
 * The tempo the busy cancel proof plays the viewer at. Blocked, WebKit's
 * software compositor on a loaded runner presents a frame only every 190 to
 * 250 ms. At tempo 5 the return moves for over two seconds, so its judged
 * part holds enough such frames to judge.
 */
const CANCEL_TEMPO = 5;

/** How long the busy cancel proof blocks the main thread, ms. */
const CANCEL_BLOCK_MS = 2500;

/**
 * Where the busy cancel proof stops judging, in cast steps from the return's
 * end. Near the end, each 60 Hz frame moves the spring about 0.042 of what
 * remains (2π / 2.5 s, critically damped). So within about 23.9 cast steps
 * of its end a frame moves less than one step, and the cast shows plateaus
 * there.
 */
const CANCEL_SETTLED_STEPS = 24;

/**
 * Fails by name unless the photo's animations take it back to its place. A
 * drag read as a dismissal moves the photo off the screen instead.
 */
function expectReturn(runs: ReadonlyArray<ActiveAnimation>): void {
  const away = runs
    .flatMap(run => {
      const value = run.keyframes.at(-1)?.translate;
      return typeof value === 'string' ? [value] : [];
    })
    .find(
      value =>
        Math.abs(Number.parseFloat(value.trim().split(/\s+/)[1] ?? '0')) > 1,
    );
  if (away != null) {
    throw new Error(
      `The drag was read as a dismissal; the photo left the dialog (its move ends at translate ${away})`,
    );
  }
}

/** Each animated property's curve length, and whether it still runs. */
function curvesByProperty(runs: ReadonlyArray<ActiveAnimation>) {
  const meta = new Set(['offset', 'easing', 'composite', 'computedOffset']);
  return new Map(
    runs.map(run => [
      Object.keys(run.keyframes[0] ?? {})
        .filter(key => !meta.has(key))
        .sort()
        .join(','),
      {ms: run.to - run.from, isRunning: run.finishedAt == null},
    ]),
  );
}

test(
  'storyboard: a cancelled drag',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const v = await openViewer(page);
    const down = {x: v.centre.x, y: v.centre.y + 150};
    const script: TouchScript = drag(v.centre, down, {
      durationMs: 300,
      hz: 20,
    })
      .slice(0, -1)
      .concat(
        drag(down, {x: down.x, y: down.y - 120}, {durationMs: 150, hz: 20})
          .slice(1)
          .map(f => ({...f, t: f.t + 320})),
      );
    const board = await touchStoryboard(page, v.driver, script, {
      name: 'lightbox-drag-cancel',
      measure: async () => {
        const s = await v.photoState();
        return {
          y: +s.y.toFixed(1),
          scale: +s.scale.toFixed(3),
          backdrop: +(await v.backdropAlpha()).toFixed(2),
        };
      },
      columns: 5,
      cellScale: 0.35,
    });
    await board.write(testInfo);
  },
);
