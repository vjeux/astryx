// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TreeListExpand.interaction.browser.spec.ts
 * @input The built TreeList stories, real touch input, the interaction
 *   harness, and the theme's timing tokens as the page computes them
 * @output Proofs for a TreeList row's expand and collapse under a finger. They
 *   cover the theme's timing, the collapse, a busy main thread, Reduce Motion,
 *   right to left, and frame cost.
 * @position Interaction evidence for TreeList/useTreeExpansionMotion.ts, with
 *   an Android case and a mouse case
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  animationStoryboard,
  armHold,
  blockMainThread,
  busyWindowProof,
  compareCurve,
  countBetween,
  cubicBezier,
  holdAnimations,
  MARKER_RGB,
  openStory,
  releaseAnimations,
  seekAnimations,
  startScreencast,
  timeline,
  touchDriver,
  traceRendering,
  trackMarker,
  waitForAnimation,
  withStorybook,
  writeEvidence,
  type HeldAnimation,
} from '@astryxdesign/interaction-harness';
import {expectReducedMotionCrossFade} from '../../List/__tests__/reducedMotion';
import {
  blockBehindBeacon,
  installBeacon,
  sampleVideoPoints,
} from '../../List/__tests__/rowPixels';

const storybook = withStorybook(test);

const STORY = 'core-treelist--basic';

/** CSS easing keywords, as cubic-bézier control points. */
const KEYWORDS: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};

/** The theme's timing for the expand, as the page computes it. */
interface Timing {
  readonly ms: number;
  readonly easing: string;
  /** Progress (0 → 1) `t` ms after the start. */
  readonly progress: (t: number) => number;
  /** The fastest progress, as a share of the travel per ms. */
  readonly peakRate: number;
}

/**
 * The chevron's transition: the theme's duration and easing tokens, which the
 * group's slide reads too.
 */
async function themeTiming(page: Page): Promise<Timing> {
  const {duration, easing} = await parts(page).chevron.evaluate(el => {
    const style = getComputedStyle(el);
    return {
      duration: style.transitionDuration.split(',')[0]?.trim() ?? '',
      easing:
        style.transitionTimingFunction.split(/,(?![^(]*\))/)[0]?.trim() ?? '',
    };
  });
  const ms = duration.endsWith('ms')
    ? Number.parseFloat(duration)
    : Number.parseFloat(duration) * 1000;
  const points =
    KEYWORDS[easing] ??
    /cubic-bezier\(([^)]+)\)/.exec(easing)?.[1].split(',').map(Number);
  if (!(ms > 0) || points == null || points.length !== 4) {
    throw new Error(`no theme timing: ${duration} ${easing}`);
  }
  const [x1, y1, x2, y2] = points;
  const ease = cubicBezier(x1, y1, x2, y2);
  const progress = (t: number) => ease(Math.min(1, Math.max(0, t / ms)));
  let peakRate = 0;
  for (let t = 0; t < ms; t += 1) {
    peakRate = Math.max(peakRate, Math.abs(progress(t + 1) - progress(t)));
  }
  return {ms, easing, progress, peakRate};
}

/** A tree row by its item id (an ancestor row contains its label too). */
const treeItem = (page: Page, id: string) =>
  page.locator(`[role="treeitem"][data-tree-id="${id}"]`);

/** The group's last row: the first part of the sliding block to show. */
const lastChild = (page: Page) =>
  treeItem(page, 'components')
    .locator(':scope > [role="group"] > [role="treeitem"]')
    .last();

/** The toggle of the "components" folder, its group, a child and a row below. */
function parts(page: Page) {
  const parent = treeItem(page, 'components');
  return {
    parent,
    // Its own toggle, group and chevron: not a descendant row's.
    toggle: parent.locator(':scope > :not([role="group"]) [data-tree-toggle]'),
    group: parent.locator(':scope > [role="group"]'),
    // The chevron's Icon, which turns: its own target, around the glyph.
    chevron: parent.locator(
      ':scope > :not([role="group"]) [data-tree-toggle] .astryx-icon',
    ),
    child: treeItem(page, 'button'),
    below: treeItem(page, 'app'),
  };
}

/** How many tree rows and chevron parts show at less than full opacity. */
const hiddenParts = async (page: Page) =>
  page.evaluate(
    () =>
      [
        ...document.querySelectorAll(
          '[role="treeitem"], [data-tree-toggle] svg, [data-tree-toggle] svg *',
        ),
      ].filter(element => getComputedStyle(element).opacity !== '1').length,
  );

/**
 * Holds the expansion's own motion: the group's slide and the chevron's turn.
 * A tap on the row also plays the row's press release. A hold of the whole
 * page takes it too, and seeks then count from its earlier start.
 */
async function holdExpansion(page: Page) {
  const {group, chevron} = parts(page);
  return [
    ...(await holdAnimations(page, group)),
    ...(await holdAnimations(page, chevron)),
  ];
}

/**
 * Arms the page to hold the expansion as soon as it runs. Under the folder,
 * it holds the group's slide, the chevron's turn and the row's press release.
 * A hold the test sends once the slide runs lands later on a busy machine,
 * and the short slide can end first. Two animations running means the
 * expansion runs: the press release can start a frame before it.
 */
async function armExpansionHold(parent: Locator) {
  return armHold(parent.page(), parent, {count: 2});
}

/**
 * How far each part's motion starts after the held origin, ms: the slide is
 * a script animation, and the chevron's turn a CSS transition. A seek to t
 * moves each to its own t minus this offset.
 */
function startsOf(held: ReadonlyArray<HeldAnimation>) {
  const offset = (kind: string) =>
    held.find(animation => animation.kind === kind)?.offsetMs ?? 0;
  return {slide: offset('Animation'), turn: offset('CSSTransition')};
}

/**
 * Marks the group's last row with the harness's chip as the commit inserts
 * it, so the marker shows from the slide's first frame. A mark the test sends
 * after the tap can land after a block the page has started. Returns the
 * call that removes it.
 */
async function markLastChildOnInsert(page: Page): Promise<() => Promise<void>> {
  await treeItem(page, 'components').evaluate(
    (folder, rgb) => {
      const observer = new MutationObserver(() => {
        const last = folder.querySelector<HTMLElement>(
          ':scope > [role="group"] > [role="treeitem"]:last-child',
        );
        if (last == null) {
          return;
        }
        observer.disconnect();
        // The chip markElement draws: 16 px, 8 px in from the row's corner.
        last.style.position = 'relative';
        const chip = document.createElement('div');
        chip.setAttribute('data-harness-marker-chip', 'tree-last');
        chip.setAttribute('aria-hidden', 'true');
        chip.style.cssText = `position:absolute;top:8px;left:8px;width:16px;height:16px;background:rgb(${rgb.join(',')});z-index:2147483647;pointer-events:none;`;
        last.append(chip);
      });
      observer.observe(folder, {childList: true, subtree: true});
    },
    [...MARKER_RGB],
  );
  return async () => {
    await page.evaluate(() =>
      document
        .querySelector('[data-harness-marker-chip="tree-last"]')
        ?.remove(),
    );
  };
}

/** The `y` of an element's `translate`, as the engine presents it. */
const translateY = async (element: Locator) =>
  element.evaluate(el => {
    const value = getComputedStyle(el).translate;
    if (value === 'none' || value === '') {
      return 0;
    }
    const [, y = '0px'] = value.split(' ');
    return Number.parseFloat(y);
  });

/**
 * The chevron's angle on screen, degrees, read from its transform. The angle
 * of `b` over `d` reads the same with the right-to-left mirror.
 */
const rotation = async (element: Locator) =>
  element.evaluate(el => {
    const matrix = /matrix\(([^)]+)\)/.exec(getComputedStyle(el).transform);
    const [, b = 0, , d = 1] =
      matrix == null ? [] : matrix[1].split(',').map(Number);
    return (Math.atan2(b, d) * 180) / Math.PI;
  });

async function tapToggle(page: Page) {
  const {toggle} = parts(page);
  const box = await toggle.boundingBox();
  if (box == null) {
    throw new Error('no toggle');
  }
  const driver = await touchDriver(page);
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
}

async function open(page: Page) {
  await openStory(page, storybook(), STORY);
  const touch = await page.evaluate(
    () => matchMedia('(pointer: coarse)').matches,
  );
  test.skip(!touch, 'the expansion moves under a finger only');
  await expect(parts(page).below).toBeVisible();
}

test('a busy first frame delays the expand instead of skipping into it', async ({
  page,
}, testInfo) => {
  await open(page);
  const {toggle, parent} = parts(page);
  // The toggle's handler commits the expand and starts its slide. Then 150 ms
  // of script hold the main thread before the first frame. The slide starts
  // when the browser commits it. So the first frame after the block shows the
  // child near where it started, a group's height up from its place.
  const result = await parent.evaluate(
    async (folder, toggleButton) =>
      new Promise<{
        first: number;
        pending: boolean;
        startedAfterBlock: boolean;
      }>(resolve => {
        // The expand's commit inserts the group; this observer runs right
        // after it, in the same task, before any frame.
        const observer = new MutationObserver(() => {
          observer.disconnect();
          const row = folder.querySelector<HTMLElement>(
            '[data-tree-id="button"]',
          );
          if (row == null) {
            throw new Error('no child');
          }
          // The product's part: the motions it just started carry no start
          // of their own; the browser sets it when it commits them.
          const motions = row.getAnimations();
          const pending =
            motions.length > 0 &&
            motions.every(animation => animation.startTime == null);
          const until = performance.now() + 150;
          while (performance.now() < until) {
            // Busy: the main thread is held.
          }
          // The first frame due after the block: a frame scheduled before
          // it runs with that earlier time.
          const read = () => {
            if ((document.timeline.currentTime as number) < until) {
              requestAnimationFrame(read);
              return;
            }
            const value = getComputedStyle(row).translate;
            const [, y = '0px'] =
              value === 'none' || value === '' ? ['0px'] : value.split(' ');
            resolve({
              first: Number.parseFloat(y),
              pending,
              // Where the browser put the start: after the block, or (a
              // frame stamped when it was due, motion/animator.ts, known
              // limits) inside it.
              startedAfterBlock: motions.every(
                animation => Number(animation.startTime) >= until - 1,
              ),
            });
          };
          requestAnimationFrame(read);
        });
        const tree = folder.closest('[role="tree"]');
        if (tree != null) {
          observer.observe(tree, {childList: true, subtree: true});
        }
        (toggleButton as HTMLElement).click();
      }),
    await toggle.elementHandle(),
  );
  const height = await parts(page).group.evaluate(
    el => el.getBoundingClientRect().height,
  );
  expect(result.pending).toBe(true);
  const timing = await themeTiming(page);
  if (result.startedAfterBlock) {
    // At most two frames into the theme's curve. A start pinned before the
    // block would show the slide nearly done.
    expect(result.first).toBeLessThan(-(1 - timing.progress(34)) * height);
  } else {
    // This browser stamped the frame that started the motions with a time
    // inside the block. So no first frame can show the start that the commit
    // would set. What the component controls is asserted above. WebKit does
    // this (motion/animator.ts, known limits).
    testInfo.annotations.push({
      type: 'start stamped inside the block',
      description: `first frame at ${result.first.toFixed(1)} px of ${(-height).toFixed(1)} px`,
    });
  }
  await expect.poll(async () => translateY(parts(page).child)).toBe(0);
});

test('a collapse from rest removes the group at its commit, and the chevron’s turn back starts after a busy first frame instead of skipping into it', async ({
  page,
}) => {
  await open(page);
  const {toggle, parent, child, chevron} = parts(page);
  const timing = await themeTiming(page);
  await tapToggle(page);
  await expect(child).toBeVisible();
  await expect.poll(async () => translateY(child)).toBe(0);
  await expect.poll(async () => rotation(chevron)).toBeCloseTo(90, 1);
  // The collapse's commit removes the group. Then 150 ms of script hold the
  // main thread before the first frame. The chevron's turn back starts when
  // the browser styles it, so the first frame after the block shows it near
  // the expanded angle.
  const result = await parent.evaluate(
    async (folder, toggleButton) =>
      new Promise<{rows: number; angle: number}>(resolve => {
        const observer = new MutationObserver(() => {
          if (folder.getAttribute('aria-expanded') !== 'false') {
            return;
          }
          observer.disconnect();
          const rows = folder.querySelectorAll(
            ':scope > [role="group"] > [role="treeitem"]',
          ).length;
          const until = performance.now() + 150;
          while (performance.now() < until) {
            // Busy: the main thread is held.
          }
          const read = () => {
            if ((document.timeline.currentTime as number) < until) {
              requestAnimationFrame(read);
              return;
            }
            const glyph = folder.querySelector<HTMLElement>(
              ':scope > :not([role="group"]) [data-tree-toggle] .astryx-icon',
            );
            const matrix = /matrix\(([^)]+)\)/.exec(
              glyph == null ? '' : getComputedStyle(glyph).transform,
            );
            const [, b = 0, , d = 1] =
              matrix == null ? [] : matrix[1].split(',').map(Number);
            resolve({rows, angle: (Math.atan2(b, d) * 180) / Math.PI});
          };
          requestAnimationFrame(read);
        });
        observer.observe(folder, {attributes: true, subtree: true});
        (toggleButton as HTMLElement).click();
      }),
    await toggle.elementHandle(),
  );
  expect(result.rows, JSON.stringify(result)).toBe(0);
  // At most two frames into the turn back.
  expect(result.angle, JSON.stringify(result)).toBeGreaterThan(
    90 * (1 - timing.progress(34)),
  );
  await expect.poll(async () => rotation(chevron)).toBeCloseTo(0, 1);
});

test('a toggle mid-expand removes the group at once and turns the chevron around from its angle on screen', async ({
  page,
}) => {
  await open(page);
  const {chevron} = parts(page);
  const timing = await themeTiming(page);
  // Every frame's chevron turn, and the child's offset while it exists,
  // from the first tap on, with the frame's time. On the first frame the
  // block has come a quarter of its way and the chevron has turned, the page
  // toggles the row again. So the chevron's turn around shows.
  await page.evaluate(() => {
    const samples: {t: number; y: number | null; turn: number}[] = [];
    const w = window as unknown as {samples: typeof samples; turnedAt: number};
    w.samples = samples;
    w.turnedAt = -1;
    const read = (t: number) => {
      const row = document.querySelector<HTMLElement>(
        '[data-tree-id="button"]',
      );
      const glyph = document.querySelector<HTMLElement>(
        '[data-tree-id="components"] > :not([role="group"]) [data-tree-toggle] .astryx-icon',
      );
      if (glyph != null) {
        let y: number | null = null;
        if (row != null) {
          const translate = getComputedStyle(row).translate;
          const [, value = '0px'] =
            translate === 'none' || translate === ''
              ? ['0px']
              : translate.split(' ');
          y = Number.parseFloat(value);
        }
        // The chevron's angle on screen, from its transform.
        const matrix = /matrix\(([^)]+)\)/.exec(
          getComputedStyle(glyph).transform,
        );
        const [, b = 0, , d = 1] =
          matrix == null ? [] : matrix[1].split(',').map(Number);
        const turn = (Math.atan2(b, d) * 180) / Math.PI;
        samples.push({t, y, turn});
        const height =
          row?.closest('[role="group"]')?.getBoundingClientRect().height ?? 0;
        if (
          w.turnedAt < 0 &&
          y != null &&
          y > -0.75 * height &&
          y < 0 &&
          turn > 1
        ) {
          w.turnedAt = samples.length - 1;
          document
            .querySelector<HTMLElement>(
              '[data-tree-id="components"] > :not([role="group"]) [data-tree-toggle]',
            )
            ?.click();
        }
      }
      requestAnimationFrame(read);
    };
    requestAnimationFrame(read);
  });
  await tapToggle(page);
  // The page turned it around mid-expand: the group is gone, and the chevron
  // comes back to rest.
  await expect(parts(page).group).toHaveCount(0, {timeout: 3000});
  await expect.poll(async () => rotation(chevron), {timeout: 3000}).toBe(0);
  const {samples, turnedAt} = await page.evaluate(() => {
    const w = window as unknown as {
      samples: {t: number; y: number | null; turn: number}[];
      turnedAt: number;
    };
    return {samples: [...w.samples], turnedAt: w.turnedAt};
  });
  expect(turnedAt, JSON.stringify(samples.slice(0, 6))).toBeGreaterThan(0);
  // Frames came after the toggle, so the check below reads something.
  expect(samples.length, JSON.stringify(samples.slice(-4))).toBeGreaterThan(
    turnedAt + 1,
  );
  // The group left at the toggle: no frame after it shows a child.
  expect(
    samples.slice(turnedAt + 1).every(sample => sample.y == null),
    JSON.stringify(samples.slice(turnedAt, turnedAt + 4)),
  ).toBe(true);
  // No jump: the chevron's turn around continues from the angle on screen,
  // with no restart from either end. It is judged against the time between
  // frames, so a frame that the browser delays may carry more travel. Between
  // two frames it turns at most twice the curve's peak speed, plus a degree.
  for (let i = 1; i < samples.length; i++) {
    const elapsed = samples[i].t - samples[i - 1].t;
    const context = `frame ${i}: ${JSON.stringify(samples.slice(Math.max(0, i - 2), i + 2))}`;
    expect(
      Math.abs(samples[i].turn - samples[i - 1].turn),
      context,
    ).toBeLessThan(2 * timing.peakRate * 90 * elapsed + 1);
  }
  // It did turn around: toward the expanded angle, then back to rest.
  const start = samples[0].turn;
  const farthest = Math.max(
    ...samples.map(sample => Math.abs(sample.turn - start)),
  );
  expect(farthest, JSON.stringify(samples.slice(0, 8))).toBeGreaterThan(0.5);
  expect(Math.abs((samples.at(-1)?.turn ?? start) - start)).toBeLessThan(0.5);
});

/**
 * Expands the Animated layout story's "Photos" folder, whose TreeList takes
 * the story's handle. One frame later it reports what each running animation
 * moves: rows of the expanded group, other rows of the tree, or content after
 * the tree.
 */
async function expandWithHandle(page: Page) {
  await openStory(page, storybook(), 'core-animated-layout--animated-layout');
  const folder = page.locator('[role="treeitem"][data-tree-id="photos"]');
  const toggle = folder.locator(
    ':scope > :not([role="group"]) [data-tree-toggle]',
  );
  return folder.evaluate(
    async (row, button) => {
      (button as HTMLElement).click();
      await new Promise(requestAnimationFrame);
      const tree = row.closest('[role="tree"]');
      const group = row.querySelector(':scope > [role="group"]');
      return document.getAnimations().map(animation => {
        const effect = animation.effect as KeyframeEffect | null;
        const target = effect?.target ?? null;
        const moves = [
          ...new Set(
            (effect?.getKeyframes() ?? []).flatMap(frame =>
              Object.keys(frame).filter(
                key =>
                  !['offset', 'computedOffset', 'easing', 'composite'].includes(
                    key,
                  ),
              ),
            ),
          ),
        ];
        const where =
          target == null
            ? 'none'
            : group?.contains(target)
              ? 'group'
              : tree?.contains(target)
                ? 'tree'
                : 'after';
        return {where, moves};
      });
    },
    await toggle.elementHandle(),
  );
}

test('with an animatedLayout handle, expanding a folder glides what follows it under a finger and with a mouse, and its rows play no slide of their own', async ({
  page,
  browser,
}) => {
  const isSlide = (animation: {where: string; moves: string[]}) =>
    animation.where === 'group' && animation.moves.includes('translate');
  const isGlide = (animation: {where: string; moves: string[]}) =>
    animation.where !== 'group' &&
    animation.moves.some(move => move === 'translate' || move === 'transform');
  const touch = await expandWithHandle(page);
  expect(touch.some(isGlide), JSON.stringify(touch)).toBe(true);
  expect(touch.filter(isSlide), JSON.stringify(touch)).toEqual([]);
  const context = await browser.newContext({
    hasTouch: false,
    isMobile: false,
    viewport: {width: 900, height: 900},
  });
  try {
    const mouse = await expandWithHandle(await context.newPage());
    expect(mouse.some(isGlide), JSON.stringify(mouse)).toBe(true);
    expect(mouse.filter(isSlide), JSON.stringify(mouse)).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Android: a tap expands with the same motion (one touch model)', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Android is Chromium');
  await openStory(page, storybook(), STORY);
  const {child, below} = parts(page);
  await expect(below).toBeVisible();
  await tapToggle(page);
  await expect(child).toBeVisible();
  // The block slides out from under the parent, as on iOS.
  expect(await child.evaluate(el => el.getAnimations().length)).toBeGreaterThan(
    0,
  );
  await expect.poll(async () => translateY(child)).toBe(0);
});

test('a mouse: a click expands and collapses in one frame, as before', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: false,
    isMobile: false,
    viewport: {width: 900, height: 700},
  });
  const page = await context.newPage();
  try {
    await openStory(page, storybook(), STORY);
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    const {group, child, below, toggle} = parts(page);
    await expect(below).toBeVisible();
    await toggle.click();
    await expect(child).toBeVisible();
    // No motion: the row below is already in place, nothing animating it.
    expect(await translateY(below)).toBe(0);
    expect(await below.evaluate(el => el.getAnimations().length)).toBe(0);
    await toggle.click();
    // The children leave with the click's own commit.
    await page.evaluate(
      async () =>
        new Promise<void>(resolve => requestAnimationFrame(() => resolve())),
    );
    expect(await group.count()).toBe(0);
    expect(await translateY(below)).toBe(0);
  } finally {
    await context.close();
  }
});

test('a mouse under reduced motion: the group comes and goes at once, and the chevron turns on its own transition', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: false,
    isMobile: false,
    reducedMotion: 'reduce',
    viewport: {width: 900, height: 700},
  });
  const page = await context.newPage();
  try {
    await openStory(page, storybook(), STORY);
    expect(
      await page.evaluate(() => [
        matchMedia('(pointer: coarse)').matches,
        matchMedia('(prefers-reduced-motion: reduce)').matches,
      ]),
    ).toEqual([false, true]);
    const {group, child, toggle, chevron} = parts(page);
    await expect(parts(page).below).toBeVisible();
    // The page holds the chevron's turn as soon as it runs.
    const turn = await armHold(page, chevron);
    await toggle.click();
    await expect(child).toBeVisible();
    const held = await turn.held();
    expect(
      held.map(animation => animation.kind),
      JSON.stringify(held),
    ).toContain('CSSTransition');
    // Nothing in the group moves or fades.
    expect(
      await group.evaluate(el => el.getAnimations({subtree: true}).length),
    ).toBe(0);
    await releaseAnimations(page, {finish: true});
    await expect.poll(async () => rotation(chevron)).toBeCloseTo(90, 1);
    await toggle.click();
    await page.evaluate(
      async () =>
        new Promise<void>(resolve => requestAnimationFrame(() => resolve())),
    );
    expect(await group.count()).toBe(0);
  } finally {
    await context.close();
  }
});

test('the expand follows the theme’s timing tokens: a theme that lengthens them lengthens the slide and the turn', async ({
  page,
}) => {
  await open(page);
  // A theme sets its tokens on an ancestor. A longer duration on the tree
  // times both the slide and the chevron's turn.
  await page
    .locator('[role="tree"]')
    .evaluate(tree =>
      (tree as HTMLElement).style.setProperty('--duration-fast', '600ms'),
    );
  const timing = await themeTiming(page);
  expect(timing.ms).toBe(600);
  const {parent, group, child, chevron} = parts(page);
  const hold = await armExpansionHold(parent);
  await tapToggle(page);
  await expect(child).toBeVisible();
  const starts = startsOf(await hold.held());
  const height = await group.evaluate(el => (el as HTMLElement).offsetHeight);
  for (const t of [150, 300, 450]) {
    await seekAnimations(page, t);
    expect(await translateY(child)).toBeCloseTo(
      -height * (1 - timing.progress(t - starts.slide)),
      0,
    );
    expect(await rotation(chevron)).toBeCloseTo(
      90 * timing.progress(t - starts.turn),
      0,
    );
  }
  await releaseAnimations(page, {finish: true});
  await expect.poll(async () => translateY(child)).toBe(0);
});

test('under reduced motion an expand cross-fades, opacity only, within 200 ms, the chevron lands at once, and a collapse removes the group at once', async ({
  page,
}) => {
  // Reduce Motion under a finger: nothing travels or turns. The children fade
  // in where they land, and the chevron lands at its new angle.
  await page.emulateMedia({reducedMotion: 'reduce'});
  await open(page);
  const {child, chevron} = parts(page);
  await tapToggle(page);
  await expect(child).toBeVisible();
  expectReducedMotionCrossFade(await holdExpansion(page));
  expect(await rotation(chevron)).toBeCloseTo(90, 1);
  await releaseAnimations(page);
  await expect.poll(async () => translateY(child)).toBe(0);
  await expect.poll(async () => hiddenParts(page)).toBe(0);
  await tapToggle(page);
  // The collapse removes the group at the tap, and the chevron does not turn.
  const held = await holdAnimations(page, chevron);
  await expect(child).toHaveCount(0);
  expect(held, JSON.stringify(held)).toEqual([]);
  expect(await rotation(chevron)).toBeCloseTo(0, 1);
  await releaseAnimations(page, {finish: true});
  await expect.poll(async () => hiddenParts(page)).toBe(0);
});

test("right to left: the chevron's quarter turn mirrors, and the children slide the same way", async ({
  page,
}) => {
  // Storybook's direction toolbar (a global, not an arg).
  await page.goto(
    `${storybook()}/iframe.html?id=${STORY}&viewMode=story&globals=direction:rtl`,
  );
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  const touch = await page.evaluate(
    () => matchMedia('(pointer: coarse)').matches,
  );
  test.skip(!touch, 'the expansion moves under a finger only');
  const {parent, group, child, chevron} = parts(page);
  await expect(parts(page).below).toBeVisible();
  expect(await chevron.evaluate(el => getComputedStyle(el).direction)).toBe(
    'rtl',
  );
  const timing = await themeTiming(page);
  const hold = await armExpansionHold(parent);
  await tapToggle(page);
  await expect(child).toBeVisible();
  const starts = startsOf(await hold.held());
  const height = await group.evaluate(el => (el as HTMLElement).offsetHeight);
  for (const t of [0, timing.ms / 4, timing.ms / 2]) {
    await seekAnimations(page, t);
    // The mirror lives in the chevron's transform: its horizontal scale is
    // negative, while its angle turns as it does left to right.
    expect(
      await chevron.evaluate(el =>
        Number(/matrix\(([^,]+)/.exec(getComputedStyle(el).transform)?.[1]),
      ),
    ).toBeLessThan(0);
    expect(await rotation(chevron)).toBeCloseTo(
      90 * timing.progress(t - starts.turn),
      0,
    );
    expect(await translateY(child)).toBeCloseTo(
      -height * (1 - timing.progress(t - starts.slide)),
      0,
    );
  }
  await releaseAnimations(page, {finish: true});
  await expect.poll(async () => rotation(chevron)).toBeCloseTo(90, 1);
});

test('expand: the children slide out from under the parent and the chevron turns, on the theme’s timing, while the rows below take their places at once', async ({
  page,
}, testInfo) => {
  await open(page);
  const {parent, group, child, below, chevron} = parts(page);
  const timing = await themeTiming(page);
  const belowBefore = (await below.boundingBox())?.y ?? 0;
  const hold = await armExpansionHold(parent);
  await tapToggle(page);
  await expect(child).toBeVisible();
  const held = await hold.held();
  expect(held.length, JSON.stringify(held)).toBeGreaterThan(0);
  // The slide and the turn start in the same frame.
  const starts = startsOf(held);
  expect(
    Math.abs(starts.turn - starts.slide),
    JSON.stringify(held),
  ).toBeLessThan(1000 / 60);
  const height = await group.evaluate(el => (el as HTMLElement).offsetHeight);
  expect(await group.evaluate(el => getComputedStyle(el).overflow)).toBe(
    'clip',
  );
  // The slide and the chevron's turn end together: the theme's tokens. The
  // slide holds its end value past its curve.
  const lengthOf = (kind: string) =>
    held.find(animation => animation.kind === kind)?.curveEndMs;
  expect(lengthOf('Animation')).toBeCloseTo(timing.ms, 0);
  expect(lengthOf('CSSTransition')).toBeCloseTo(timing.ms, 0);
  // With no animated layout handle the row below is in
  // its new place from the first frame, a group's height lower, with nothing
  // animating it.
  expect(await below.evaluate(el => el.getAnimations().length)).toBe(0);
  expect(((await below.boundingBox())?.y ?? 0) - belowBefore).toBeCloseTo(
    height,
    0,
  );
  const samples: {t: number; child: number; below: number; chevron: number}[] =
    [];
  for (const t of timeline(timing.ms)) {
    await seekAnimations(page, t);
    samples.push({
      t,
      child: await translateY(child),
      below: await translateY(below),
      chevron: await rotation(chevron),
    });
  }
  await releaseAnimations(page, {finish: true});
  // The block travels the group's height and the chevron turns the quarter
  // turn, on one timing. The row below never moves.
  const offset = (t: number) =>
    -height * (1 - timing.progress(t - starts.slide));
  const turn = (t: number) => 90 * timing.progress(t - starts.turn);
  const childCurve = compareCurve(
    samples.map(s => ({t: s.t, value: s.child})),
    offset,
    0.5,
  );
  const chevronCurve = compareCurve(
    samples.map(s => ({t: s.t, value: s.chevron})),
    turn,
    0.5,
  );
  await writeEvidence(
    'curves/tree-list-expand',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {
          timing: {ms: timing.ms, easing: timing.easing},
          height,
          samples,
          childCurve,
          chevronCurve,
        },
        null,
        2,
      ),
    },
    testInfo,
  );
  expect(samples[0].child).toBeCloseTo(-height, 0);
  expect(childCurve.maxError, JSON.stringify(childCurve.worst)).toBeLessThan(
    0.5,
  );
  expect(samples.every(sample => sample.below === 0)).toBe(true);
  expect(
    chevronCurve.maxError,
    JSON.stringify(chevronCurve.worst),
  ).toBeLessThan(0.5);
  // At rest: the clip is gone, nothing is translated, the row below still
  // sits a group's height lower than before.
  await expect
    .poll(async () => group.evaluate(el => getComputedStyle(el).overflow))
    .not.toBe('clip');
  expect(await translateY(below)).toBe(0);
  expect(((await below.boundingBox())?.y ?? 0) - belowBefore).toBeCloseTo(
    height,
    0,
  );
});

test('collapse: the group leaves at the tap and the rows below take their places on that frame, while the chevron turns back', async ({
  page,
}) => {
  await open(page);
  const {group, child, below, chevron, parent} = parts(page);
  const belowCollapsed = (await below.boundingBox())?.y ?? 0;
  await tapToggle(page);
  await expect(child).toBeVisible();
  await expect.poll(async () => translateY(child)).toBe(0);
  await expect
    .poll(async () => group.evaluate(el => getComputedStyle(el).overflow))
    .not.toBe('clip');
  // The collapse's commit, read in the same task: the group is gone. The row
  // below already sits where it sat before the expand, by layout, with
  // nothing animating it. In the next frame the chevron's turn back runs.
  const atCommit = parent.evaluate(
    async folder =>
      new Promise<{
        group: boolean;
        belowTop: number;
        belowMotions: number;
        chevronMotions: number;
      }>(resolve => {
        const observer = new MutationObserver(() => {
          // The tap's press feedback writes first; the collapse's commit is
          // the mutation that marks the row collapsed.
          if (folder.getAttribute('aria-expanded') !== 'false') {
            return;
          }
          observer.disconnect();
          const row = document.querySelector<HTMLElement>(
            '[data-tree-id="app"]',
          );
          const glyph = folder.querySelector<HTMLElement>(
            ':scope > :not([role="group"]) [data-tree-toggle] .astryx-icon',
          );
          const atCommit = {
            group: folder.querySelector(':scope > [role="group"]') != null,
            belowTop: row?.getBoundingClientRect().top ?? Number.NaN,
            belowMotions: row?.getAnimations().length ?? -1,
          };
          // The chevron's transition starts when the browser styles it, in
          // the next frame.
          requestAnimationFrame(() =>
            resolve({
              ...atCommit,
              chevronMotions: glyph?.getAnimations().length ?? -1,
            }),
          );
        });
        observer.observe(folder, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }),
  );
  await tapToggle(page);
  const commit = await atCommit;
  expect(commit.group, JSON.stringify(commit)).toBe(false);
  expect(commit.belowTop, JSON.stringify(commit)).toBeCloseTo(
    belowCollapsed,
    0,
  );
  expect(commit.belowMotions, JSON.stringify(commit)).toBe(0);
  expect(commit.chevronMotions, JSON.stringify(commit)).toBeGreaterThan(0);
  // The chevron comes to rest, and the row below never moved again.
  await expect.poll(async () => rotation(chevron)).toBeCloseTo(0, 1);
  expect(await translateY(below)).toBe(0);
  expect((await below.boundingBox())?.y ?? 0).toBeCloseTo(belowCollapsed, 0);
});

test('content after the tree takes its place by layout at once, with no translate, and a fixed element inside it stays fixed', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-treelist--with-content-below');
  const touch = await page.evaluate(
    () => matchMedia('(pointer: coarse)').matches,
  );
  test.skip(!touch, 'the expansion moves under a finger only');
  const button = page.getByRole('button', {name: 'Open folder'});
  const {group, below} = parts(page);
  await expect(button).toBeVisible();
  // More content after the tree, holding a position: fixed element, which
  // stays where the viewport puts it as long as nothing transforms its
  // ancestors.
  await button.evaluate(el => {
    const after = document.createElement('div');
    after.style.height = '20px';
    const fixed = document.createElement('div');
    fixed.setAttribute('data-test-fixed', '');
    fixed.style.cssText =
      'position: fixed; top: 10px; left: 10px; width: 8px; height: 8px;';
    after.append(fixed);
    el.insertAdjacentElement('afterend', after);
  });
  const fixedTop = async () =>
    page
      .locator('[data-test-fixed]')
      .evaluate(el => el.getBoundingClientRect().top);
  const rest = (await button.boundingBox())?.y ?? 0;

  await tapToggle(page);
  await holdExpansion(page);
  await seekAnimations(page, 0);
  const height = await group.evaluate(el => (el as HTMLElement).offsetHeight);
  // Its new layout at once, one group height down, with nothing on it.
  expect(await button.evaluate(el => getComputedStyle(el).translate)).toBe(
    'none',
  );
  expect(((await button.boundingBox())?.y ?? 0) - rest).toBeCloseTo(height, 0);
  expect(await fixedTop()).toBeCloseTo(10, 0);
  // So does the row after the group inside the tree: no animated layout
  // handle.
  expect(await translateY(below)).toBe(0);
  await releaseAnimations(page, {finish: true});

  // A collapse: the group leaves at the tap, and the content after the tree
  // takes its place at once, never translated.
  await tapToggle(page);
  await expect(group).toHaveCount(0);
  expect(await button.evaluate(el => getComputedStyle(el).translate)).toBe(
    'none',
  );
  expect((await button.boundingBox())?.y ?? 0).toBeCloseTo(rest, 0);
  expect(await fixedTop()).toBeCloseTo(10, 0);
});

test('the children keep moving on every frame while the main thread is blocked', async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'chromium',
    'screencast frame evidence is Chromium-only in Playwright',
  );
  await open(page);
  // A long slide, so the block spans many frames.
  await page
    .locator('[role="tree"]')
    .evaluate(tree =>
      (tree as HTMLElement).style.setProperty('--duration-fast', '600ms'),
    );
  const cast = await startScreencast(page);
  await page.waitForTimeout(100);
  // The group's last row, the first part of the block to show, carries the
  // marker from the commit that inserts it.
  const unmark = await markLastChildOnInsert(page);
  // The page starts the block itself, a frame into the chevron's turn, which
  // starts with the slide. A block the test sends once the slide runs lands
  // later on a busy machine, and the short slide can end first.
  const [block] = await Promise.all([
    blockMainThread(page, 300, {during: parts(page).chevron}),
    tapToggle(page),
  ]);
  await page.waitForTimeout(200);
  const frames = await cast.stop();
  await unmark();
  const tracked = await trackMarker(page, frames);
  const proof = busyWindowProof(tracked, block, {
    axis: 'y',
    settledWithin: 1,
  });
  await writeEvidence(
    'busy-main-thread/tree-list-expand',
    {[`${testInfo.project.name}.json`]: JSON.stringify(proof, null, 1)},
    testInfo,
  );
  // Frames kept coming through the block, each one further down.
  expect(proof.changed, JSON.stringify(proof)).toBeGreaterThanOrEqual(3);
  expect(proof.monotonic, JSON.stringify(proof)).toBe(true);
  expect(proof.longestStallMs, JSON.stringify(proof)).toBeLessThan(40);
});

test('WebKit: the children keep moving while the main thread is blocked (video)', async ({
  browser,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'webkit',
    'the Chromium screencast test covers Chromium',
  );
  const size = {width: 402, height: 714};
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    recordVideo: {dir: testInfo.outputPath('video'), size},
  });
  const page = await context.newPage();
  await open(page);
  // A long slide, so the block spans many of the recording's frames.
  await page
    .locator('[role="tree"]')
    .evaluate(tree =>
      (tree as HTMLElement).style.setProperty('--duration-fast', '600ms'),
    );
  const {group, chevron} = parts(page);
  // Where the block's last row, the first part of it to show, comes to rest,
  // and how far it travels. Expand once, read both, and collapse again.
  const unmark = await markLastChildOnInsert(page);
  await tapToggle(page);
  await expect.poll(async () => translateY(lastChild(page))).toBe(0);
  const height = await group.evaluate(el => (el as HTMLElement).offsetHeight);
  const chip = await page.evaluate(() => {
    const el = document.querySelector('[data-harness-marker-chip]');
    const box = el?.getBoundingClientRect();
    return box == null
      ? null
      : {x: box.x + box.width / 2, y: box.y + box.height / 2};
  });
  await unmark();
  if (chip == null) {
    throw new Error('no marker chip');
  }
  await tapToggle(page);
  await expect(group).toHaveCount(0);
  // The chevron's turn back ends first, so the block below waits for the
  // expand's turn.
  await expect.poll(async () => rotation(chevron)).toBe(0);
  // Probes every 4 px along the chip's path, from a group's height up to where
  // it rests. They read where the chip is in each recorded frame. They run
  // 4 px right of the chip's center, because the tree's indent line crosses
  // its center.
  const probes = Array.from({length: Math.floor(height / 4) + 1}, (_, k) => ({
    x: Math.round(chip.x + 4),
    y: Math.round(chip.y - height + k * 4),
  }));
  await installBeacon(page);
  await page.waitForTimeout(300);
  // The last row carries the chip from the commit that inserts it, and the
  // page starts the block a frame into the chevron's turn.
  await markLastChildOnInsert(page);
  await Promise.all([
    blockBehindBeacon(page, 300, {during: chevron}),
    tapToggle(page),
  ]);
  await page.waitForTimeout(700);
  const video = page.video();
  await context.close();
  const path = await video?.path();
  expect(path).toBeTruthy();
  const samples = await sampleVideoPoints(path as string, probes, size);
  /** Where the chip is: the mean probe index it covers, in px down its path. */
  const position = (marker: ReadonlyArray<boolean>) => {
    const hits = marker.flatMap((hit, k) => (hit ? [k] : []));
    return hits.length === 0
      ? null
      : (hits.reduce((a, b) => a + b, 0) / hits.length) * 4;
  };
  const blocked = samples
    .filter(s => s.beacon === 'blocked')
    .map(s => ({t: s.t, y: position(s.marker)}))
    .filter((s): s is {t: number; y: number} => s.y != null);
  const distinct = blocked
    .map(s => Math.round(s.y))
    .filter((v, i, all) => i === 0 || v !== all[i - 1]);
  await writeEvidence(
    'busy-main-thread/tree-list-expand-webkit',
    {'webkit.json': JSON.stringify({height, blocked, distinct}, null, 1)},
    testInfo,
  );
  // The block kept moving down while script could not run.
  expect(distinct.length, JSON.stringify(distinct)).toBeGreaterThanOrEqual(3);
  for (let i = 1; i < distinct.length; i++) {
    expect(distinct[i]).toBeGreaterThan(distinct[i - 1]);
  }
});

test('the expand does no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  await open(page);
  const {parent, child} = parts(page);
  // Expanded from the keyboard (an iPad's): the same motion, with no press
  // feedback of the toggle's own in the trace.
  await parent.focus();
  const timing = await themeTiming(page);
  let window = {from: 0, to: 0};
  const trace = await traceRendering(page, async () => {
    await page.keyboard.press('ArrowRight');
    const [started] = await waitForAnimation(child);
    window = {from: started.from, to: started.from + timing.ms};
    await page.waitForTimeout(timing.ms + 100);
  });
  const during = countBetween(trace, window.from + 30, window.to - 30);
  expect(during.Layout ?? 0, JSON.stringify(during)).toBe(0);
  expect(during.Paint ?? 0, JSON.stringify(during)).toBe(0);
});

test('a collapse lays out once, at its commit, and the chevron’s turn back does no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  await open(page);
  const {parent, child, chevron} = parts(page);
  const timing = await themeTiming(page);
  await parent.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(async () => translateY(child)).toBe(0);
  await page.waitForTimeout(timing.ms);
  let window = {from: 0, to: 0};
  const trace = await traceRendering(page, async () => {
    await page.keyboard.press('ArrowLeft');
    const [started] = await waitForAnimation(chevron);
    window = {from: started.from, to: started.from + timing.ms};
    await page.waitForTimeout(timing.ms + 100);
  });
  const during = countBetween(trace, window.from + 30, window.to - 30);
  expect(during.Layout ?? 0, JSON.stringify(during)).toBe(0);
  expect(during.Paint ?? 0, JSON.stringify(during)).toBe(0);
});

test(
  'storyboard: a TreeList row expanding on iOS under a finger',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    await open(page);
    const timing = await themeTiming(page);
    await tapToggle(page);
    const {storyboard} = await animationStoryboard(page, {
      name: 'tree-list-expand',
      clip: {x: 0, y: 0, width: 402, height: 340},
      times: [0, 1, 2, 3, 4, 5, 6, 7].map(k => Math.round((k * timing.ms) / 7)),
      columns: 8,
      cellScale: 0.45,
    });
    await releaseAnimations(page, {finish: true});
    await storyboard.write(testInfo);
  },
);
