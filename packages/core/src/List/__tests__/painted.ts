// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file painted.ts
 * @input A Playwright locator and how many elements it should match
 * @output `expectPainted`: the elements a still-motion, layout or reach proof
 *   is about are on screen, that many of them, each with a nonzero box
 * @position Shared by the List and reorderable browser specs. A proof that
 *   rows did not move, or that a target stays inside its list, first proves
 *   its subject is there: with nothing on screen those claims hold trivially.
 */

import {expect, type Locator} from '@playwright/test';

/**
 * Expects `elements` to match `count` elements, each painted with a nonzero
 * box. Call it before a claim that something stayed still, did not overlap,
 * or did not reach too far.
 */
export async function expectPainted(
  elements: Locator,
  count: number,
): Promise<void> {
  await expect(elements).toHaveCount(count);
  const painted = await elements.evaluateAll(list =>
    list.map(element => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0;
    }),
  );
  expect(painted, 'every element has a nonzero box').toEqual(
    Array.from({length: count}, () => true),
  );
}
