// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: the page's scroll extent while a row is swiped, held and
// resting open, in both directions, LTR and RTL.
import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {drag, touchDriver, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

async function measure(page: Page) {
  return page.evaluate(() => {
    const se = document.scrollingElement!;
    const row = document.querySelectorAll<HTMLElement>('#storybook-root .astryx-item')[1];
    const m = new DOMMatrix(getComputedStyle(row).transform);
    return {shift: Math.round(m.e), scrollWidth: se.scrollWidth, clientWidth: se.clientWidth, dir: `${document.documentElement.dir}/${getComputedStyle(row).direction}`, scrollLeftMin: (() => { const before = se.scrollLeft; se.scrollLeft = -10000; const min = se.scrollLeft; se.scrollLeft = 10000; const max = se.scrollLeft; se.scrollLeft = before; return [min, max]; })()};
  });
}

for (const direction of ['ltr', 'rtl'] as const) {
  for (const swipe of ['left', 'right'] as const) {
    test(`${direction} swipe ${swipe}`, async ({page}) => {
      await page.goto(`${storybook()}/iframe.html?id=core-item--swipe-actions&viewMode=story&globals=direction:${direction}`);
      // Storybook sets the direction on the story's wrapper; the document's
      // own direction decides which side of the page can scroll.
      await page.evaluate(d => { document.documentElement.dir = d; }, direction);
      const row = page.locator('#storybook-root .astryx-item').nth(1);
      await expect(row).toBeVisible();
      await expect(row.locator('[data-swipe-panel="trailing"]')).toBeAttached();
      await expect(row.locator('[data-swipe-panel="leading"]')).toBeAttached();
      const box = await row.boundingBox();
      if (!box) throw new Error('no row');
      const y = box.y + box.height / 2;
      const sign = swipe === 'left' ? -1 : 1;
      const startX = swipe === 'left' ? box.x + box.width - 24 : box.x + 24;
      const rest = await measure(page);
      let held: Awaited<ReturnType<typeof measure>> | null = null;
      const driver = await touchDriver(page);
      const script = drag({x: startX, y}, {x: startX + sign * 120, y}, {durationMs: 600, hz: 60, restMs: 300});
      let moves = 0;
      const total = script.length - 2;
      await driver.play(script, {
        releaseUnread: true,
        onEvent: async step => {
          if (step.type === 'touchMove' && ++moves === total) held = await measure(page);
        },
      });
      await page.waitForTimeout(900);
      const after = await measure(page);
      console.log(`EXTENT ${JSON.stringify({sb: process.env.ASTRYX_STORYBOOK_DIR?.split('/').pop(), direction, swipe, rest, held, after})}`);
    });
  }
}
