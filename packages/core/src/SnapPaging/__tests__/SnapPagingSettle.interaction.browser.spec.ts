// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file SnapPagingSettle.interaction.browser.spec.ts
 * @input The built Carousel snap-paging stories, real touch input and edge
 *   presses through the interaction harness. A count of the animations the
 *   page starts, and a per-frame read of each item's translate
 * @output Proof that a settle samples its curve once. The animator bakes one
 *   animation, on the lead item, and the other items play copies of it. In
 *   every frame, each item in view has the lead's translate. That holds
 *   through a settle across pages, a touch that catches one, a second press,
 *   and a row resized under a held finger. An item out of view through the
 *   whole settle gets no animation
 * @position Browser proof for snap paging's settle, run by
 *   `pnpm test:interaction`
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
  requireFrames,
  tap,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

async function open(page: Page, args: Record<string, string> = {}) {
  await openStory(page, storybook(), 'core-carousel--snap-paging-three-up', {
    mode: 'paging',
    ...args,
  });
  const scroller = page.getByRole('region').getByRole('group').first();
  return {scroller};
}

/** Whether any item still carries the paging's translate. */
const isTakenOver = async (scroller: Locator) =>
  scroller.evaluate(el =>
    Array.from(el.children).some(
      child => (child as HTMLElement).style.translate !== '',
    ),
  );

async function settled(scroller: Locator) {
  await expect.poll(async () => isTakenOver(scroller)).toBe(false);
}

/** A flick toward the row's end: 80 px over 80 ms. */
async function flick(page: Page, scroller: Locator) {
  const box = await scroller.boundingBox();
  if (box == null) {
    throw new Error('no scroller');
  }
  const y = box.y + box.height / 2;
  const from = {x: box.x + box.width / 2 + 40, y};
  const driver = await touchDriver(page);
  await driver.play(drag(from, {x: from.x - 80, y}, {durationMs: 80}));
}

/**
 * Counts the animations `Element.animate` starts on each item from now on,
 * by item index.
 */
async function countAnimates(scroller: Locator) {
  await scroller.evaluate(el => {
    const counts = new Map<number, number>();
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (this: Element, ...args) {
      const index = Array.prototype.indexOf.call(el.children, this);
      if (index >= 0) {
        counts.set(index, (counts.get(index) ?? 0) + 1);
      }
      return animate.apply(this, args);
    };
    (window as unknown as {__animates: Map<number, number>}).__animates =
      counts;
  });
  return async () =>
    scroller.evaluate(() => [
      ...(window as unknown as {__animates: Map<number, number>}).__animates,
    ]);
}

type Frame = {
  readonly t: number;
  readonly kept: boolean;
  readonly position: number;
  readonly running: boolean;
};

type Watch = {
  frames: Frame[];
  apart: {frame: number; item: number; x: number; lead: number}[];
  animated: number[] | null;
  touch: {start: number | null; end: number | null};
};

/**
 * Watches every frame until the row is handed back. It records each item in
 * the row's view, as the lead places it, whose translate is not the lead's.
 * Each frame records where the row shows and whether the lead's settle runs.
 * It also records which items had an animation on the settle's first frame,
 * and when a touch went down and lifted.
 */
async function watchShown(scroller: Locator) {
  await scroller.evaluate(el => {
    const log: Watch = {
      frames: [],
      apart: [],
      animated: null,
      touch: {start: null, end: null},
    };
    (window as unknown as {__shown: Watch}).__shown = log;
    el.addEventListener(
      'touchstart',
      () => {
        log.touch.start ??= performance.now();
      },
      {capture: true, passive: true},
    );
    el.addEventListener(
      'touchend',
      () => {
        log.touch.end = performance.now();
      },
      {capture: true, passive: true},
    );
    const xOf = (child: Element) =>
      Number.parseFloat(getComputedStyle(child).translate) || 0;
    const sample = () => {
      const items = Array.from(el.children);
      const isHeld = items.some(
        child => (child as HTMLElement).style.translate !== '',
      );
      if (isHeld) {
        // WebKit reads an accelerated animation at the time of each read, so
        // the lead is read before and after the items. A frame whose lead
        // moved between its two reads is not kept. Every translate is read
        // before any box.
        const before = xOf(items[0]);
        const xs = items.map(xOf);
        const lead = xOf(items[0]);
        const box = el.getBoundingClientRect();
        const kept = Math.abs(lead - before) <= 0.01;
        log.frames.push({
          t: performance.now(),
          kept,
          position: Math.abs(el.scrollLeft) - lead,
          running: items[0]
            .getAnimations()
            .some(animation => animation.playState === 'running'),
        });
        items.forEach((child, item) => {
          const rect = child.getBoundingClientRect();
          const x = xs[item];
          // Where the item shows if it moves with the lead.
          const left = rect.left + lead - x;
          const isInView = left + rect.width > box.left && left < box.right;
          if (kept && isInView && Math.abs(x - lead) > 0.01) {
            log.apart.push({frame: log.frames.length, item, x, lead});
          }
        });
        if (
          log.animated == null &&
          items[0].getAnimations().some(a => a.playState === 'running')
        ) {
          log.animated = items.flatMap((child, item) =>
            child.getAnimations().length > 0 ? [item] : [],
          );
        }
      }
      if (isHeld || log.frames.length === 0) {
        requestAnimationFrame(sample);
      }
    };
    requestAnimationFrame(sample);
  });
  return async () =>
    scroller.evaluate(() => (window as unknown as {__shown: Watch}).__shown);
}

/**
 * Resolves on the first frame where the lead item's settle runs, or false
 * after 2 s.
 */
async function settleRuns(scroller: Locator) {
  return scroller.evaluate(
    async el =>
      new Promise<boolean>(resolve => {
        const lead = el.firstElementChild as HTMLElement;
        const timer = setTimeout(() => resolve(false), 2000);
        const check = () => {
          if (lead.getAnimations().some(a => a.playState === 'running')) {
            clearTimeout(timer);
            resolve(true);
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      }),
  );
}

/**
 * Resizes the row's frame by `by` px at the first touch move after the row is
 * held. The returned read says whether the resize ran.
 */
async function resizeWhenHeld(scroller: Locator, by: number) {
  await scroller.evaluate((el, px) => {
    const frame = el.closest('[role="region"]')?.parentElement;
    if (frame == null) {
      throw new Error('no frame');
    }
    const record = window as unknown as {__resized: boolean};
    record.__resized = false;
    el.addEventListener(
      'touchmove',
      () => {
        const isHeld = Array.from(el.children).some(
          child => (child as HTMLElement).style.translate !== '',
        );
        if (isHeld && !record.__resized) {
          record.__resized = true;
          frame.style.width = `${frame.clientWidth + px}px`;
        }
      },
      {passive: true},
    );
  }, by);
  return async () =>
    scroller.evaluate(
      () => (window as unknown as {__resized: boolean}).__resized,
    );
}

/** A slow drag of `px` toward the row's end, held still before the lift. */
async function hold(page: Page, scroller: Locator, px: number) {
  const box = await scroller.boundingBox();
  if (box == null) {
    throw new Error('no scroller');
  }
  const y = box.y + box.height / 2;
  const from = {x: box.x + box.width / 2 + px / 2, y};
  const driver = await touchDriver(page);
  await driver.play(
    drag(from, {x: from.x - px, y}, {durationMs: 200, restMs: 150}),
  );
}

test('a settle bakes its curve once: the lead item animates, and the rest play copies', async ({
  page,
}) => {
  const {scroller} = await open(page);
  const animates = await countAnimates(scroller);
  await flick(page, scroller);
  await settled(scroller);
  // The animator starts one animation, on the lead item. The other items'
  // motion copies it, so none of them calls `animate`.
  expect(await animates()).toEqual([[0, 1]]);
});

test('every item the row shows moves with the lead through a one-view settle, and an item out of view gets no animation', async ({
  page,
}) => {
  const {scroller} = await open(page);
  const shown = await watchShown(scroller);
  await flick(page, scroller);
  await settled(scroller);
  const log = await shown();
  requireFrames(log.frames, {
    min: 3,
    during: 'the settle',
    where: frame => frame.kept,
  });
  expect(log.apart, JSON.stringify(log.apart.slice(0, 8))).toEqual([]);
  // One view on from the start: items 0 to 5 can show; 6 to 8 stay out.
  expect(log.animated).toEqual([0, 1, 2, 3, 4, 5]);
});

test('a press past the last page goes back to the first: every item it sweeps through the view moves with the lead', async ({
  page,
}) => {
  const {scroller} = await open(page, {hasLoop: '!true'});
  const next = page.getByRole('button', {name: 'Scroll right'});
  // Edge presses step about one view each, until the row reaches its end.
  const atEnd = async () =>
    scroller.evaluate(
      el => Math.abs(el.scrollLeft) >= el.scrollWidth - el.clientWidth - 1,
    );
  for (let i = 0; i < 6 && !(await atEnd()); i++) {
    await next.click();
    await settled(scroller);
  }
  expect(await atEnd()).toBe(true);
  const shown = await watchShown(scroller);
  // At the end, the press wraps to the start. Items 3 to 5 show only on the
  // way.
  await next.click();
  await settled(scroller);
  expect(await scroller.evaluate(el => Math.abs(el.scrollLeft))).toBeLessThan(
    1,
  );
  const log = await shown();
  requireFrames(log.frames, {
    min: 3,
    during: 'the settle',
    where: frame => frame.kept,
  });
  expect(log.apart, JSON.stringify(log.apart.slice(0, 8))).toEqual([]);
  expect(log.animated).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test('a touch that catches the settle stops every item where the lead shows it', async ({
  page,
}) => {
  const {scroller} = await open(page);
  const box = await scroller.boundingBox();
  if (box == null) {
    throw new Error('no scroller');
  }
  const offset = async () => scroller.evaluate(el => Math.abs(el.scrollLeft));
  const next = page.getByRole('button', {name: 'Scroll right'});
  // A press that nothing catches shows where the press's settle ends.
  await next.click();
  await settled(scroller);
  const end = await offset();
  await page.getByRole('button', {name: 'Scroll left'}).click();
  await settled(scroller);
  expect(await offset()).toBeLessThan(1);
  const shown = await watchShown(scroller);
  await next.click();
  expect(await settleRuns(scroller), 'the press starts its settle').toBe(true);
  // A still touch stops the move where it shows, by the pager's catch time
  // at the latest. Its lift settles the row on a stop.
  const driver = await touchDriver(page);
  await driver.play(
    tap({x: box.x + box.width / 2, y: box.y + box.height / 2}, {holdMs: 250}),
  );
  await settled(scroller);
  const log = await shown();
  requireFrames(log.frames, {
    min: 3,
    during: 'the settle',
    where: frame => frame.kept,
  });
  expect(log.apart, JSON.stringify(log.apart.slice(0, 8))).toEqual([]);
  // From the catch to the lift, the settle is cancelled. The row stays where
  // the touch stopped it, between the settle's start and its end.
  const {start, end: lift} = log.touch;
  if (start == null || lift == null) {
    throw new Error('the page saw no touch');
  }
  const before = log.frames.filter(frame => frame.t < start).at(-1);
  expect(before?.running, 'the touch lands while the settle runs').toBe(true);
  const held = requireFrames(log.frames, {
    min: 2,
    during: 'the hold after the catch',
    where: frame => frame.t > start + 120 && frame.t < lift,
  });
  for (const frame of held) {
    expect(frame.running, 'the catch cancels the settle').toBe(false);
    expect(frame.position).toBeGreaterThan(1);
    expect(frame.position).toBeLessThan(end - 1);
  }
  expect(
    new Set(held.map(frame => frame.position.toFixed(2))).size,
    'the row holds still under the touch',
  ).toBe(1);
});

test('a second press in a settle moves every item with the lead', async ({
  page,
}) => {
  const {scroller} = await open(page);
  const next = page.getByRole('button', {name: 'Scroll right'});
  const shown = await watchShown(scroller);
  await next.click();
  expect(await settleRuns(scroller), 'the first press starts its settle').toBe(
    true,
  );
  await next.click();
  await settled(scroller);
  const log = await shown();
  requireFrames(log.frames, {
    min: 3,
    during: 'the two presses',
    where: frame => frame.kept,
  });
  expect(log.apart, JSON.stringify(log.apart.slice(0, 8))).toEqual([]);
});

test('a row widened under a held finger: its settle moves every item the wider row shows', async ({
  page,
}) => {
  const {scroller} = await open(page);
  // 90 px wider, the row shows item 4 near the start, which the takeover's
  // view could not.
  const resized = await resizeWhenHeld(scroller, 90);
  const shown = await watchShown(scroller);
  await hold(page, scroller, 80);
  await settled(scroller);
  expect(await resized(), 'the row widens while the finger holds it').toBe(
    true,
  );
  const log = await shown();
  requireFrames(log.frames, {
    min: 3,
    during: 'the hold and its settle',
    where: frame => frame.kept,
  });
  expect(log.apart, JSON.stringify(log.apart.slice(0, 8))).toEqual([]);
  expect(log.animated).toContain(4);
});

test('a row narrowed under a held finger, its items a share of its width: its settle moves every item it shows', async ({
  page,
}) => {
  const {scroller} = await open(page);
  // Items 40 % of the row wide: the narrowing moves every item's start, and
  // item 2 comes into view near the start.
  await scroller.evaluate(el => {
    for (const child of Array.from(el.children)) {
      (child as HTMLElement).style.width = '40%';
    }
  });
  const resized = await resizeWhenHeld(scroller, -100);
  const shown = await watchShown(scroller);
  await hold(page, scroller, 40);
  await settled(scroller);
  expect(await resized(), 'the row narrows while the finger holds it').toBe(
    true,
  );
  const log = await shown();
  requireFrames(log.frames, {
    min: 3,
    during: 'the hold and its settle',
    where: frame => frame.kept,
  });
  expect(log.apart, JSON.stringify(log.apart.slice(0, 8))).toEqual([]);
  expect(log.animated).toContain(2);
});
