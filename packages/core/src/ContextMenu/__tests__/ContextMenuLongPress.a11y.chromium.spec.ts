// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ContextMenuLongPress.a11y.chromium.spec.ts
 * @input The `Core/ContextMenu` Default and popover-presentation touch stories
 *   in a built Storybook, and CDP touch input.
 * @output Real-engine proof that the long press that opens a context menu
 *   does not close it as the finger lifts, under the touch model (the lift
 *   sends no click) and under today's long press (its click acts on nothing),
 *   and that a tap outside still closes it.
 * @position Run with `pnpm test:a11y-contract`; jsdom cannot produce the
 *   compatibility mouse events a real browser sends after a touch.
 */

import {
  expect,
  test,
  type CDPSession,
  type Page,
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

const STORY = 'core-contextmenu--default';
// A finger keeps today's long press under `presentation="popover"`.
const POPOVER_STORY = 'core-contextmenu--touch-long-press-popover';

async function touchCdp(page: Page): Promise<CDPSession> {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled', {
    enabled: true,
    maxTouchPoints: 1,
  });
  return cdp;
}

async function triggerCenter(
  page: Page,
  label = 'Right-click this area',
): Promise<{x: number; y: number}> {
  const box = await page.getByText(label).boundingBox();
  if (box == null) {
    throw new Error('the trigger area has no rendered bounds');
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

/**
 * Resolves once the browser has delivered the `click` that follows a touch
 * (the last of its compatibility mouse events) and two frames have run, so
 * anything that event closes has closed.
 */
async function armCompatClick(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as {__compatClick?: Promise<void>};
    w.__compatClick = new Promise(resolve => {
      document.addEventListener(
        'click',
        () =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        {once: true, capture: true},
      );
    });
  });
}

async function compatClickDelivered(page: Page): Promise<void> {
  await page.evaluate(
    async () =>
      (window as unknown as {__compatClick?: Promise<void>}).__compatClick,
  );
}

/**
 * Counts the `click` events the page gets until 300 ms after it handles the
 * touch's lift. A browser sends a touch's compatibility mouse events and its
 * click well within that time.
 */
async function armLift(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as {__liftClicks?: Promise<number>};
    let clicks = 0;
    document.addEventListener(
      'click',
      () => {
        clicks += 1;
      },
      {capture: true},
    );
    w.__liftClicks = new Promise(resolve => {
      document.addEventListener(
        'touchend',
        () => setTimeout(() => resolve(clicks), 300),
        {once: true, capture: true},
      );
    });
  });
}

/** The clicks that `armLift` counted after the lift. */
async function clicksAfterLift(page: Page): Promise<number> {
  return page.evaluate(
    async () =>
      (await (window as unknown as {__liftClicks?: Promise<number>})
        .__liftClicks) ?? -1,
  );
}

test('the long press that opens the menu leaves it open as the finger lifts, and the lift sends no click', async ({
  page,
}) => {
  await page.goto(`${storybook.origin}/iframe.html?id=${STORY}&viewMode=story`);
  // Touch emulation makes the primary pointer coarse: the touch model.
  const cdp = await touchCdp(page);
  const center = await triggerCenter(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x: center.x, y: center.y, id: 1}],
  });
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible({timeout: 2000});
  await armLift(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  expect(await clicksAfterLift(page)).toBe(0);
  await expect(menu).toBeVisible();

  // A tap outside still closes it.
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x: 5, y: 5, id: 2}],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect(menu).toBeHidden();
});

test('with presentation="popover", the click that follows the long press acts on nothing, and the menu stays open', async ({
  page,
}) => {
  await page.goto(
    `${storybook.origin}/iframe.html?id=${POPOVER_STORY}&viewMode=story`,
  );
  const cdp = await touchCdp(page);
  const center = await triggerCenter(page, 'Hold for actions');
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x: center.x, y: center.y, id: 1}],
  });
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible({timeout: 2000});
  await armCompatClick(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await compatClickDelivered(page);
  await expect(menu).toBeVisible();

  // A tap outside still closes it.
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x: 5, y: 5, id: 2}],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect(menu).toBeHidden();
});

test('a mouse press outside closes a right-click menu', async ({page}) => {
  await page.goto(`${storybook.origin}/iframe.html?id=${STORY}&viewMode=story`);
  const center = await triggerCenter(page);
  await page.mouse.click(center.x, center.y, {button: 'right'});
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(menu).toBeHidden();
});
