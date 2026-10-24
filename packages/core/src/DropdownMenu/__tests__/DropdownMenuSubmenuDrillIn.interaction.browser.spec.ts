// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuSubmenuDrillIn.interaction.browser.spec.ts
 * @input The built Submenu DropdownMenu story on a phone, real touch input
 *   (Chromium CDP / WebKit's input command), the interaction harness, and
 *   UIMenu's sub-menu values from the UIKit constants table
 * @output Interaction proofs for a sub-menu opening in place on a phone, as
 *   UIMenu's does (iOS 26.2): the box grows from its anchored edge on three
 *   slices that leave once it settles; the parent stays behind as an inert
 *   copy at UIMenu's scale and drop; the sub-menu's header shows the row's
 *   label with its chevron turned down and is named for going back; back
 *   removes the card and the sub-menu's exit copy and restores the parent;
 *   Reduce Motion cross-fades with nothing moving; a storyboard
 * @position Evidence for menuDrillInMotion.ts as DropdownMenu drives it
 */

import {expect, test, type Page} from '@playwright/test';
import {
  openStory,
  Storyboard,
  touchDriver,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';
import {menu} from '../../motion/uikit/menu';

const storybook = withStorybook(test);

const POPOVER = '[popover]:has([role="menu"])';
const PARENT = '[data-astryx-menu-parent]';
const SLICES = '[data-astryx-menu-box]';
const SUBMENU_COPY = '[data-astryx-menu-submenu-exit]';

async function center(page: Page, name: string) {
  const box = await page.getByRole('menuitem', {name}).boundingBox();
  if (box == null) {
    throw new Error(`no row ${name}`);
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

/** Open the Submenu story's menu with a tap and let it settle. */
async function openMenu(page: Page) {
  await openStory(page, storybook(), 'core-dropdownmenu--submenu');
  const driver = await touchDriver(page);
  const trigger = page.getByRole('button', {name: 'Actions'});
  const box = await trigger.boundingBox();
  if (box == null) {
    throw new Error('no trigger');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await waitForRest(page.locator(POPOVER).first());
  return driver;
}

/** Wait until nothing in the page animates any more. */
async function settled(page: Page) {
  await expect
    .poll(async () =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(animation => animation.playState === 'running').length,
      ),
    )
    .toBe(0);
}

const popoverBox = async (page: Page) =>
  page
    .locator(POPOVER)
    .first()
    .evaluate(el => {
      const r = el.getBoundingClientRect();
      return {top: r.top, bottom: r.bottom, height: r.height};
    });

test('a sub-menu opens in place: the box grows from its anchored edge, the parent stays behind as UIMenu\u2019s card', async ({
  page,
}) => {
  const driver = await openMenu(page);
  const before = await popoverBox(page);
  await driver.tap(await center(page, 'Move to'));
  // The slices draw the box while it grows.
  await expect(page.locator(SLICES)).toHaveCount(3);
  await settled(page);
  await expect(page.locator(SLICES)).toHaveCount(0);
  const after = await popoverBox(page);
  // The box kept one edge: its top when it opened downward, else its bottom.
  const keptTop = Math.abs(after.top - before.top) < 1;
  const keptBottom = Math.abs(after.bottom - before.bottom) < 1;
  expect(keptTop || keptBottom).toBe(true);
  // The parent behind: inert, unnamed, at UIMenu's scale and drop.
  const card = page.locator(PARENT);
  await expect(card).toHaveCount(1);
  const state = await card.evaluate(el => ({
    scale: getComputedStyle(el).scale,
    translate: getComputedStyle(el).translate,
    hidden: el.getAttribute('aria-hidden'),
    inert: el.hasAttribute('inert'),
    roles: el.querySelectorAll('[role]').length,
  }));
  expect(state.scale).toBe(`${menu.submenuParentScale}`);
  expect(state.translate).toBe(`0px ${menu.submenuParentDropPx}px`);
  expect(state.hidden).toBe('true');
  expect(state.inert).toBe(true);
  expect(state.roles).toBe(0);
  // The header: the row's label, its chevron down, named for going back.
  const header = page.getByRole('menuitem', {name: 'Back to Actions'});
  await expect(header).toHaveText('Move to');
  const turn = await header
    .locator('[data-astryx-menu-submenu-chevron]')
    .evaluate(el => getComputedStyle(el).rotate);
  expect(turn).toBe('90deg');
  // The popover paints itself again.
  const paint = await page
    .locator(POPOVER)
    .first()
    .evaluate(el => ({
      background: el.style.background,
      shadow: el.style.boxShadow,
    }));
  expect(paint).toEqual({background: '', shadow: ''});
});

test('back removes the card and the sub-menu\u2019s exit copy and restores the parent rows', async ({
  page,
}) => {
  const driver = await openMenu(page);
  await driver.tap(await center(page, 'Move to'));
  await settled(page);
  await driver.tap(await center(page, 'Back to Actions'));
  await expect(page.locator(SUBMENU_COPY)).toHaveCount(1);
  await settled(page);
  await expect(page.locator(PARENT)).toHaveCount(0);
  await expect(page.locator(SUBMENU_COPY)).toHaveCount(0);
  await expect(page.locator(SLICES)).toHaveCount(0);
  await expect(page.getByRole('menuitem', {name: 'Move to'})).toBeVisible();
  const list = await page
    .getByRole('menu', {name: 'Actions'})
    .evaluate(el => getComputedStyle(el).scale);
  expect(['none', '1']).toContain(list);
});

test('under Reduce Motion the views cross-fade and nothing moves', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const driver = await openMenu(page);
  await driver.tap(await center(page, 'Move to'));
  await expect(page.locator(SLICES)).toHaveCount(0);
  const moving = await page.evaluate(
    () =>
      document
        .getAnimations()
        .map(animation => (animation.effect as KeyframeEffect).getKeyframes())
        .filter(frames =>
          frames.some(
            frame =>
              frame.translate != null ||
              frame.scale != null ||
              frame.rotate != null,
          ),
        ).length,
  );
  expect(moving).toBe(0);
  await settled(page);
  await expect(
    page.getByRole('menuitem', {name: 'Back to Actions'}),
  ).toBeVisible();
});

test(
  'storyboard: open a sub-menu in place and go back',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const driver = await openMenu(page);
    const viewport = page.viewportSize() ?? {width: 402, height: 714};
    const board = new Storyboard(page, {
      name: 'dropdownmenu-submenu-drill-in',
      clip: {x: 0, y: 0, width: viewport.width, height: viewport.height},
      columns: 6,
      cellScale: 0.35,
    });
    const shoot = async (label: string, t: number) =>
      board.capture(label, t, {
        slices: await page.locator(SLICES).count(),
        card: await page.locator(PARENT).count(),
      });
    await shoot('open', 0);
    await driver.tap(await center(page, 'Move to'));
    for (const t of [16, 66, 133, 233, 400]) {
      await page.waitForTimeout(t === 16 ? 16 : 50);
      await shoot(`drill +${t}ms`, t);
    }
    await settled(page);
    await shoot('drilled', 600);
    await driver.tap(await center(page, 'Back to Actions'));
    for (const t of [16, 100, 250, 500]) {
      await page.waitForTimeout(t === 16 ? 16 : 80);
      await shoot(`back +${t}ms`, 700 + t);
    }
    await settled(page);
    await shoot('back', 1400);
    await board.write(testInfo);
    expect(board.frames.some(frame => frame.data.slices === 3)).toBe(true);
    expect(board.frames.at(-1)?.data.card).toBe(0);
  },
);
