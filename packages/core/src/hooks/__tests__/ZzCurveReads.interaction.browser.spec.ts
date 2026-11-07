// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzCurveReads.interaction.browser.spec.ts (NOT FOR LANDING)
 * @input A build whose SnapPaging counts every read of the settle's curve,
 *   the three-up story with 9 or 30 items, and a flick
 * @output How many times one settle reads its curve, and how many keyframe
 *   sets it bakes
 * @position Measurement probe only
 */

import { test } from "@astryxdesign/a11y-spec/playwright";
import {
  drag,
  openStory,
  touchDriver,
  withStorybook,
} from "@astryxdesign/interaction-harness";

const storybook = withStorybook(test);

for (const count of [9, 30]) {
  test(`curve reads per settle, ${count} items`, async ({ page }) => {
    await openStory(page, storybook(), "core-carousel--snap-paging-three-up", {
      mode: "paging",
    });
    const scroller = page.getByRole("region").getByRole("group").first();
    await scroller.evaluate((el, n) => {
      const items = Array.from(el.children);
      for (let i = items.length; i < n; i++) {
        el.appendChild(items[i % items.length].cloneNode(true));
      }
      const record = window as unknown as {
        __curveAt?: number;
        __animates: number;
      };
      record.__curveAt = 0;
      record.__animates = 0;
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (this: Element, ...args) {
        if (this.parentElement === el) {
          record.__animates += 1;
        }
        return animate.apply(this, args);
      };
    }, count);
    const box = await scroller.boundingBox();
    if (box == null) {
      throw new Error("no box");
    }
    const y = box.y + box.height / 2;
    const from = { x: box.x + box.width / 2 + 40, y };
    const driver = await touchDriver(page);
    await driver.play(drag(from, { x: from.x - 80, y }, { durationMs: 80 }));
    await page.waitForTimeout(1200);
    const result = await page.evaluate(() => {
      const record = window as unknown as {
        __curveAt?: number;
        __animates: number;
      };
      return { reads: record.__curveAt ?? 0, bakes: record.__animates };
    });
    console.log(`CURVEREADS ${JSON.stringify({ count, ...result })}`);
  });
}
