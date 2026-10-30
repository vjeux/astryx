// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file LayerWebKitLayout.interaction.browser.spec.ts
 * @input The "Open layers over a carousel scroll" Layer story
 * @output WebKit's own Timeline across a wheel scroll of the carousel
 * @position Proof for the layer runtime's placement by `anchor()` insets
 *   (architecture:layer-runtime, Positioning)
 *
 * While any element on a page is placed by `position-area`, WebKit lays out
 * the whole document on every style change. The story holds every kind of
 * anchored layer at once: an open Popover, a shown Tooltip, and the carousel's
 * own edge-button cover. A wheel scroll of the carousel lays out the page no
 * more than twice. (The scroll itself repaints the carousel's content every
 * frame in this engine whatever is anchored, so paint is not what this
 * judges.)
 */

import {expect, test} from '@playwright/test';
import {
  openStory,
  recordWebKitTimeline,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

test('in WebKit, a carousel scrolled under an open popover and a shown tooltip lays out the page at most twice', async ({
  browser,
  browserName,
}) => {
  test.skip(
    browserName !== 'webkit',
    "WebKit's own Timeline; the per-frame layout is WebKit's",
  );
  // A trackpad's wheel scrolls it: WebKit's phone emulation takes no wheel,
  // and a synthetic touch does not scroll natively in WebKit.
  const context = await browser.newContext({
    viewport: {width: 402, height: 874},
    deviceScaleFactor: 3,
    isMobile: false,
    hasTouch: false,
  });
  try {
    const page = await context.newPage();
    await openStory(
      page,
      storybook(),
      'core-layer--open-layers-over-a-carousel-scroll',
    );
    await expect(
      page.getByRole('dialog', {name: 'Open popover'}),
    ).toBeVisible();
    await page.getByRole('button', {name: 'Tooltip'}).click();
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible();
    // Shown and settled: its entrance has finished.
    await tooltip.evaluate(async element => {
      await Promise.all(
        element
          .getAnimations({subtree: true})
          .map(async animation => animation.finished),
      );
    });
    const carousel = page.getByRole('region', {name: 'Swatches'});
    const box = await carousel.boundingBox();
    if (box == null) {
      throw new Error('no carousel');
    }
    const firstSlide = carousel.getByRole('group').first();
    const before = await firstSlide.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const timeline = await recordWebKitTimeline(
      page,
      async () => {
        for (let step = 0; step < 24; step += 1) {
          await page.mouse.wheel(24, 0);
          await page.waitForTimeout(16);
        }
        // Until the scroll has settled.
        await page.waitForTimeout(400);
      },
      {sentinel: true},
    );
    const after = await firstSlide.boundingBox();
    if (before == null || after == null) {
      throw new Error('no first slide');
    }
    // The carousel did scroll.
    expect(before.x - after.x).toBeGreaterThan(200);
    expect(
      timeline.counts.Layout ?? 0,
      JSON.stringify(timeline.counts),
    ).toBeLessThanOrEqual(2);
  } finally {
    await context.close();
  }
});
