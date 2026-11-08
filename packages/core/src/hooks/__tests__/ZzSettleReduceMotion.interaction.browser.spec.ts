// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzSettleReduceMotion.interaction.browser.spec.ts (NOT FOR LANDING)
 * @input The built Carousel snap-paging stories, real touch input and edge
 *   presses through the interaction harness. A count of the animations the
 *   page starts, and a per-frame read of each item's translate
 * @output Proof that a settle samples its curve once. The animator bakes one
 *   animation, on the lead item, and the other items play copies of it. In
 *   every frame, each item in view has the lead's translate. That holds
 *   through a settle across pages and a touch that catches one. An item out
 *   of view through the whole settle gets no animation
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

/**
 * Watches every frame until the row is handed back. It records each item in
 * the row's view, as the lead places it, whose translate is not the lead's.
 * It counts the frames it drops, and records which items had an animation on
 * the settle's first frame.
 */
async function watchShown(scroller: Locator) {
  await scroller.evaluate(el => {
    const log = {
      frames: 0,
      dropped: 0,
      apart: [] as {frame: number; item: number; x: number; lead: number}[],
      animated: null as number[] | null,
    };
    (window as unknown as {__shown: typeof log}).__shown = log;
    const xOf = (child: Element) =>
      Number.parseFloat(getComputedStyle(child).translate) || 0;
    const sample = () => {
      const items = Array.from(el.children);
      const isHeld = items.some(
        child => (child as HTMLElement).style.translate !== '',
      );
      if (isHeld) {
        log.frames += 1;
        // WebKit reads an accelerated animation at the time of each read, so
        // the lead is read before and after the items. A frame whose lead
        // moved between its two reads is dropped. Every translate is read
        // before any box.
        const before = xOf(items[0]);
        const xs = items.map(xOf);
        const lead = xOf(items[0]);
        const box = el.getBoundingClientRect();
        if (Math.abs(lead - before) > 0.01) {
          log.dropped += 1;
        }
        items.forEach((child, item) => {
          const rect = child.getBoundingClientRect();
          const x = xs[item];
          // Where the item shows if it moves with the lead.
          const left = rect.left + lead - x;
          const isInView = left + rect.width > box.left && left < box.right;
          if (
            Math.abs(lead - before) <= 0.01 &&
            isInView &&
            Math.abs(x - lead) > 0.01
          ) {
            log.apart.push({frame: log.frames, item, x, lead});
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
      if (isHeld || log.frames === 0) {
        requestAnimationFrame(sample);
      }
    };
    requestAnimationFrame(sample);
  });
  return async () =>
    scroller.evaluate(
      () =>
        (
          window as unknown as {
            __shown: {
              frames: number;
              dropped: number;
              apart: {frame: number; item: number; x: number; lead: number}[];
              animated: number[] | null;
            };
          }
        ).__shown,
    );
}


test('reduce motion settle', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {scroller} = await open(page);
  const animates = await countAnimates(scroller);
  await flick(page, scroller);
  await settled(scroller);
  const at = await scroller.evaluate(el => Math.abs(el.scrollLeft));
  const stops = await scroller.evaluate(el => {
    const box = el.getBoundingClientRect();
    return Array.from(el.children).map(child => Math.round(child.getBoundingClientRect().left - box.left + Math.abs(el.scrollLeft)));
  });
  console.log('ZZRM ' + JSON.stringify({at: Math.round(at), stop3: stops[3], animates: await animates()}));
});
