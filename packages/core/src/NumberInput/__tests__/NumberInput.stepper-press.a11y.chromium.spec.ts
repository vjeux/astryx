// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * Real-browser proof that every pointer presses a number stepper where the
 * steppers show. The page's primary pointer is fine, with a mouse, a pen and
 * a finger on a touch screen. A held press selects no text and keeps
 * stepping. The column takes `touch-action: manipulation`, so a scroll that
 * starts on a stepper still scrolls the page and steps nothing.
 */

import {expect, test, type CDPSession, type Page} from '@playwright/test';
import {holdMotionStill} from '@astryxdesign/a11y-spec/chromium';
import {PEN_SKIP, webInputDriver} from '@astryxdesign/interaction-harness';
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

test.afterAll(async () => storybook?.close());

// No touch screen in the context, so the primary pointer is fine and the
// steppers show. Touches come through the engine's own input, as a finger
// on a touchscreen laptop.
test.use({
  viewport: {width: 1024, height: 768},
  hasTouch: false,
  isMobile: false,
});

async function open(page: Page): Promise<void> {
  await page.goto(
    `${storybook.origin}/iframe.html?id=core-numberinput--with-number-steppers&viewMode=story`,
  );
  await holdMotionStill(page);
  await page.getByRole('spinbutton', {name: 'Quantity'}).waitFor();
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(false);
}

/** The center of the increment half, client px. */
async function plusCenter(page: Page): Promise<{x: number; y: number}> {
  const box = await page
    .getByRole('button', {name: 'Increment Quantity'})
    .boundingBox();
  if (box == null) {
    throw new Error('the increment half is not laid out');
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

/** A finger through the engine's input pipeline. */
async function fingerAt(page: Page): Promise<CDPSession> {
  return page.context().newCDPSession(page);
}

const valueNow = async (page: Page) =>
  Number(
    await page
      .getByRole('spinbutton', {name: 'Quantity'})
      .getAttribute('aria-valuenow'),
  );

test('the stepper column takes touch-action manipulation for its press, and the field stays pannable', async ({
  page,
}) => {
  await open(page);
  const column = page
    .getByRole('button', {name: 'Increment Quantity'})
    .locator('..');
  await expect(column).toHaveCSS('touch-action', 'manipulation');
  await expect(page.getByRole('spinbutton', {name: 'Quantity'})).toHaveCSS(
    'touch-action',
    'auto',
  );
});

test('a held finger refuses text selection on the stepper column for that press only', async ({
  page,
}) => {
  await open(page);
  const column = page
    .getByRole('button', {name: 'Increment Quantity'})
    .locator('..');
  // Away from iOS WebKit the lock cancels `selectstart` while a finger is
  // down. It writes no style, so nothing repaints.
  const refuses = async () =>
    column.evaluate(el => {
      const event = new Event('selectstart', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
      return event.defaultPrevented;
    });
  const style = async () =>
    column.evaluate(el =>
      (el as HTMLElement).style.getPropertyValue('user-select'),
    );
  expect(await refuses()).toBe(false);
  const cdp = await fingerAt(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [await plusCenter(page)],
  });
  await expect.poll(refuses).toBe(true);
  expect(await style()).toBe('');
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect.poll(refuses).toBe(false);
});

test('a pen presses a stepper as a mouse does: a tap steps once and focuses the field, a hold repeats and commits once', async ({
  page,
}) => {
  await open(page);
  // Trusted pen input through the engine, paced on the wall clock.
  const driver = await webInputDriver(page);
  test.skip(!driver.pens, PEN_SKIP);
  const input = page.getByRole('spinbutton', {name: 'Quantity'});
  const at = await plusCenter(page);
  const before = await valueNow(page);
  await driver.pen([
    {...at, t: 0},
    {...at, t: 80},
  ]);
  await expect.poll(async () => valueNow(page)).toBe(before + 1);
  await expect(input).toBeFocused();
  // Held, the pen repeats from 0.5 s and commits once, at the lift.
  await driver.pen([
    {...at, t: 0},
    {...at, t: 1300},
  ]);
  await expect.poll(async () => valueNow(page)).toBeGreaterThan(before + 3);
});

test('a finger tap on a stepper steps the value once', async ({page}) => {
  await open(page);
  const before = await valueNow(page);
  const cdp = await fingerAt(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [await plusCenter(page)],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect.poll(async () => valueNow(page)).toBe(before + 1);
});

test('a vertical drag that starts on a stepper scrolls the page and steps nothing', async ({
  page,
}) => {
  await open(page);
  await page.evaluate(() => {
    document.body.style.minHeight = '3000px';
  });
  const before = await valueNow(page);
  const {x, y} = await plusCenter(page);
  const cdp = await fingerAt(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x, y}],
  });
  for (let step = 1; step <= 12; step += 1) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{x, y: y - 8 * step}],
    });
  }
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect
    .poll(async () => page.evaluate(() => scrollY))
    .toBeGreaterThan(0);
  expect(await valueNow(page)).toBe(before);
});

test('a finger held past a long press selects nothing and keeps stepping', async ({
  page,
}) => {
  await open(page);
  const input = page.getByRole('spinbutton', {name: 'Quantity'});
  const cdp = await fingerAt(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [await plusCenter(page)],
  });
  // From 2, the field shows 7 at the hold's fifth step, 1.36 s in: well past
  // a long press.
  await expect
    .poll(async () => Number(await input.inputValue()))
    .toBeGreaterThanOrEqual(7);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  // One commit, at the lift.
  await expect.poll(async () => valueNow(page)).toBeGreaterThanOrEqual(7);
  expect(await page.evaluate(() => String(getSelection()))).toBe('');
});
