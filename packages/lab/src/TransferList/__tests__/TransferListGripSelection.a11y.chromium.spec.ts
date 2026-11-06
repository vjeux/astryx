// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TransferListGripSelection.a11y.chromium.spec.ts
 * @input The checked-in Lab/TransferList › Default story, a built Storybook and
 *   real Chromium touch input (CDP) on a phone viewport
 * @output Browser evidence that a finger held on a selected row's reorder grip
 *   starts no text selection in the list until it lifts
 * @position Chromium proof for TransferList's selection lock under a held
 *   finger (iOS starts a selection under a still finger)
 */

import {
  expect,
  test,
  type CDPSession,
} from '@astryxdesign/a11y-spec/playwright';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';

let storybook: StaticServer;
test.beforeAll(async () => {
  storybook = await serveStorybook(
    process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
  );
});
test.afterAll(async () => {
  await storybook?.close();
});

test.use({
  hasTouch: true,
  isMobile: true,
  viewport: {width: 390, height: 844},
  deviceScaleFactor: 3,
});

const sleep = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

type Point = {x: number; y: number};

async function touch(
  cdp: CDPSession,
  type: 'touchStart' | 'touchEnd',
  points: Point[],
) {
  await cdp.send('Input.dispatchTouchEvent', {
    type,
    touchPoints: points.map((point, index) => ({...point, id: index + 1})),
  });
}

const ROW = '[data-transfer-list-row]:not([data-transfer-list-row=""])';

test('a finger held on a reorder grip starts no text selection in the list until it lifts', async ({
  page,
}) => {
  await page.goto(
    `${storybook.origin}/iframe.html?id=lab-transferlist--default&viewMode=story`,
  );
  const grip = page.locator(`${ROW} button[aria-pressed]`).first();
  await expect(grip).toBeVisible();
  // A selection starts on a row's label unless the list refuses it.
  const selects = async () =>
    page
      .locator(ROW)
      .nth(1)
      .evaluate(row => {
        const text = Array.from(row.querySelectorAll('*')).find(
          element =>
            element.childElementCount === 0 &&
            (element.textContent ?? '').trim() !== '',
        );
        const event = new Event('selectstart', {
          bubbles: true,
          cancelable: true,
        });
        (text ?? row).dispatchEvent(event);
        return !event.defaultPrevented;
      });
  expect(await selects()).toBe(true);
  const box = (await grip.boundingBox()) as {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  const cdp = await page.context().newCDPSession(page);
  await touch(cdp, 'touchStart', [
    {x: box.x + box.width / 2, y: box.y + box.height / 2},
  ]);
  await sleep(300);
  expect(await selects()).toBe(false);
  await touch(cdp, 'touchEnd', []);
  await sleep(100);
  expect(await selects()).toBe(true);
});
