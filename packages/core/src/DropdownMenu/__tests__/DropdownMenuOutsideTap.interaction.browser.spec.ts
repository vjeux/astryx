// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuOutsideTap.interaction.browser.spec.ts
 * @input The built Submenu DropdownMenu story on a phone, real touch input
 *   (Chromium CDP, WebKit's tap path), a mouse, and the interaction harness
 * @output A finger's tap outside the open menu closes it, and no mouse event
 *   or click reaches the control under the finger. A mouse's click outside
 *   closes the menu and keeps its click.
 * @position Real-engine half of ../DropdownMenuOutsideTap.test.tsx
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

const STORY = 'core-dropdownmenu--submenu';

async function center(locator: Locator): Promise<{x: number; y: number}> {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('center: the element has no box');
  }
  // WebKit's touch command takes whole pixels.
  return {
    x: Math.round(box.x + box.width / 2),
    y: Math.round(box.y + box.height / 2),
  };
}

/**
 * Adds a control in the page's bottom corner, outside the menu. It logs the
 * mouse events and click that the browser sends it, and whether its
 * touchend was cancelled, once every listener has run.
 */
async function addControlBeneath(page: Page): Promise<Locator> {
  await page.evaluate(() => {
    const log: string[] = [];
    (window as unknown as {outsideLog: string[]}).outsideLog = log;
    const control = document.createElement('button');
    control.type = 'button';
    control.textContent = 'Beneath';
    control.style.cssText =
      'position:fixed;right:8px;bottom:8px;width:96px;height:48px;margin:0';
    for (const type of ['mousedown', 'mouseup', 'click']) {
      control.addEventListener(type, event => {
        if (event.isTrusted) {
          log.push(`beneath ${type}`);
        }
      });
    }
    control.addEventListener('touchend', event => {
      queueMicrotask(() => {
        log.push(
          event.defaultPrevented
            ? 'touchend cancelled'
            : 'touchend not cancelled',
        );
      });
    });
    document.body.append(control);
  });
  return page.getByRole('button', {name: 'Beneath'});
}

async function outsideLog(page: Page): Promise<string[]> {
  return page.evaluate(
    () => (window as unknown as {outsideLog: string[]}).outsideLog,
  );
}

test.describe('a tap outside the open menu (spec:AST-094 FR32)', () => {
  test("a finger's tap closes the menu, and no mouse event or click reaches the control beneath", async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    const beneath = await addControlBeneath(page);
    const driver = await touchDriver(page);
    const trigger = page.getByRole('button', {name: 'Actions'}).first();
    await driver.tap(await center(trigger));
    await expect(page.getByRole('menuitem', {name: 'Move to'})).toBeVisible();
    // Past the entrance, whose hold would take the next tap.
    await page.waitForTimeout(600);
    await driver.tap(await center(beneath));
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await page.waitForTimeout(800);
    expect(await outsideLog(page)).toEqual(['touchend cancelled']);
  });

  test("a mouse's click closes the menu and keeps its click", async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    const beneath = await addControlBeneath(page);
    const trigger = page.getByRole('button', {name: 'Actions'}).first();
    await trigger.click();
    await expect(page.getByRole('menuitem', {name: 'Move to'})).toBeVisible();
    await page.waitForTimeout(600);
    await beneath.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(await outsideLog(page)).toEqual([
      'beneath mousedown',
      'beneath mouseup',
      'beneath click',
    ]);
  });
});
