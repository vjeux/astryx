// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuOpeningRelease.interaction.browser.spec.ts
 * @input The built Default and LabSelectableSizes DropdownMenu stories on a
 *   desktop profile, with a real mouse in Chromium and WebKit
 * @output Proof that the release of the press that opens a menu does what the
 *   press model decides, and that the browser's light dismiss does not undo
 *   it: a release before the settle time leaves the menu open, also off the
 *   trigger or after the trigger moved away, and also when the show waited
 *   for another popover operation. A settled release outside still closes
 *   the menu, and a later press outside dismisses it.
 * @position Evidence for useMenuPress FR8's opening release with native light
 *   dismiss; the press model's own states are in menuPressGesture.test.ts
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  frames,
  openStory,
  withStorybook,
} from '@astryxdesign/interaction-harness';
import {MENU_PRESS_SETTLE_MS} from '../../hooks/menuPressGesture';

const storybook = withStorybook(test);

test.use({
  viewport: {width: 1280, height: 800},
  isMobile: false,
  hasTouch: false,
});

// A press this close to the settle time cannot be judged: the page's clock
// and the press model's clock can differ by this much.
const SETTLE_MARGIN_MS = 10;

/** The element's rendered box; a missing one fails the spec. */
async function boxOf(locator: Locator) {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('the element has no rendered box');
  }
  return box;
}

function centerOf(box: {x: number; y: number; width: number; height: number}) {
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

// The press model times a press with `Date.now()` in its handlers. The page
// reads the same clock as the press starts and as it ends.
async function installPressClock(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as {__press: {down: number; up: number}};
    w.__press = {down: 0, up: 0};
    addEventListener(
      'pointerdown',
      () => {
        w.__press = {down: Date.now(), up: 0};
      },
      true,
    );
    addEventListener(
      'pointerup',
      () => {
        w.__press.up = Date.now();
      },
      true,
    );
  });
}

async function menuState(page: Page, trigger: Locator) {
  return {
    expanded: await trigger.getAttribute('aria-expanded'),
    open: await page.locator('[data-layer-anchored]:popover-open').count(),
  };
}

// The menu must be in the state the press model decides for this release.
// A release outside the menu before the settle time leaves it open; after
// the settle time it closes it.
async function expectModelOutcome(page: Page, trigger: Locator) {
  const {down, up} = await page.evaluate(
    () => (window as unknown as {__press: {down: number; up: number}}).__press,
  );
  expect(down, 'the press start was seen').toBeGreaterThan(0);
  expect(up, 'the press end was seen').toBeGreaterThan(0);
  const lasted = up - down;
  if (Math.abs(lasted - MENU_PRESS_SETTLE_MS) <= SETTLE_MARGIN_MS) {
    throw new Error(
      `The press lasted ${lasted} ms, within ${SETTLE_MARGIN_MS} ms of the ${MENU_PRESS_SETTLE_MS} ms settle time, so its outcome cannot be judged`,
    );
  }
  const isSettled = lasted > MENU_PRESS_SETTLE_MS;
  expect(
    await menuState(page, trigger),
    `a press of ${lasted} ms released outside the menu`,
  ).toEqual(
    isSettled ? {expanded: 'false', open: 0} : {expanded: 'true', open: 1},
  );
  return isSettled;
}

test('a quick drag off the trigger, released on the page, leaves the menu open', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-dropdownmenu--default');
  await installPressClock(page);
  const trigger = page.getByRole('button', {name: 'Actions'});
  const start = centerOf(await boxOf(trigger));
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x - 200, start.y, {steps: 2});
  await page.mouse.up();
  await frames(page, 2);
  const isSettled = await expectModelOutcome(page, trigger);
  if (!isSettled) {
    // The press is over, and its claim with it: a later press outside
    // dismisses the menu.
    await page.mouse.click(start.x - 200, start.y + 200);
    await frames(page, 2);
    expect(await menuState(page, trigger)).toEqual({
      expanded: 'false',
      open: 0,
    });
  }
});

test('the trigger moving away under a still pointer before the release leaves the menu open', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-dropdownmenu--default');
  await installPressClock(page);
  const trigger = page.getByRole('button', {name: 'Actions'});
  const start = centerOf(await boxOf(trigger));
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  // The panel that holds the trigger moves 120 px, and the pointer stays.
  const under = await page.evaluate(({x, y}) => {
    const panel = document.querySelector('#storybook-root') as HTMLElement;
    panel.style.translate = '-120px 0';
    const element = document.elementFromPoint(x, y);
    return {
      isOnTrigger: element?.closest('button') != null,
      isInMenu: element?.closest('[popover]') != null,
    };
  }, start);
  expect(under, 'the release point is off the trigger and the menu').toEqual({
    isOnTrigger: false,
    isInMenu: false,
  });
  await page.mouse.up();
  await frames(page, 2);
  await expectModelOutcome(page, trigger);
});

test('a press held past the settle time and released on the page closes the menu', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-dropdownmenu--default');
  await installPressClock(page);
  const trigger = page.getByRole('button', {name: 'Actions'});
  const start = centerOf(await boxOf(trigger));
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x - 200, start.y, {steps: 2});
  // The input itself: the press lasts past the settle time.
  await page.waitForTimeout(MENU_PRESS_SETTLE_MS + 150);
  await page.mouse.up();
  await frames(page, 2);
  expect(await expectModelOutcome(page, trigger), 'the press settled').toBe(
    true,
  );
});

test('FORCED DEFERRAL: a show that waits for another popover operation still leaves the menu open at the release', async ({
  page,
}) => {
  // The condition is forced, not natural: another menu's hide is in flight as
  // the press starts, and the browser refuses the first show. The layer
  // runtime then replays the show once that hide ends, during the press.
  await openStory(page, storybook(), 'core-dropdownmenu--lab-selectable-sizes');
  const other = page.getByRole('button', {name: 'Small menu'});
  const trigger = page.getByRole('button', {name: 'Large menu'});
  await other.click();
  await expect(other).toHaveAttribute('aria-expanded', 'true');
  await frames(page, 2);
  await page.evaluate(() => {
    const otherLayer = document.querySelector(
      '[data-layer-anchored]:popover-open',
    ) as HTMLElement;
    const w = window as unknown as {__refused: number};
    w.__refused = 0;
    addEventListener(
      'pointerdown',
      () => {
        otherLayer.hidePopover();
      },
      {capture: true, once: true},
    );
    const show = HTMLElement.prototype.showPopover;
    HTMLElement.prototype.showPopover = function (
      this: HTMLElement,
      ...args: Parameters<HTMLElement['showPopover']>
    ) {
      if (this !== otherLayer && w.__refused === 0) {
        w.__refused += 1;
        throw new DOMException('refused once by the test', 'InvalidStateError');
      }
      show.apply(this, args);
    };
  });
  const start = centerOf(await boxOf(trigger));
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(
    await page.evaluate(
      () => (window as unknown as {__refused: number}).__refused,
    ),
    'the first show was refused, so the open was a replay',
  ).toBe(1);
  await page.mouse.up();
  await frames(page, 2);
  expect(await menuState(page, trigger)).toEqual({expanded: 'true', open: 1});
});
