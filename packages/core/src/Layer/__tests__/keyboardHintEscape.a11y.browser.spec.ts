// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardHintEscape.a11y.browser.spec.ts
 * @input Uses Playwright, a built Storybook, the LayerDismissal stories
 * @output Real-Chromium and real-WebKit proof of what one Escape press does
 *   while the arrow-key hint shows. In a Popover, the Popover closes, focus
 *   returns to its trigger, and the hint goes with it. On the page, only the
 *   hint closes.
 * @position High-fidelity lane. The hint shows on keyboard focus only
 *   (`:focus-visible`), which a real engine decides. Cross-browser because
 *   focus-visible and focus return differ between engines.
 *
 * SYNC: The story this reads is KeyboardHintInPopover in
 *   apps/storybook/stories/LayerDismissal.stories.tsx.
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';
import {holdMotionStill} from '@astryxdesign/a11y-spec/chromium';

let storybook: StaticServer;

test.beforeAll(async () => {
  storybook = await serveStorybook(
    process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
  );
});

test.afterAll(async () => {
  await storybook?.close();
});

const STORY = 'core-layer-dismissal--keyboard-hint-in-popover';

async function openStory(page: Page): Promise<void> {
  await page.goto(
    `${storybook.origin}/iframe.html?id=${STORY}&viewMode=story`,
    {waitUntil: 'load'},
  );
  await holdMotionStill(page);
}

/**
 * The arrow-key hint, while it shows. A Popover's own top-layer element holds
 * its SegmentedControl's hint, shown or not, so only a top-layer element with
 * none inside it counts.
 */
function hint(page: Page): Locator {
  return page
    .locator('[popover]:popover-open')
    .filter({hasText: 'to navigate'})
    .filter({hasNot: page.locator('[popover]')});
}

/** Presses Tab until `target` has focus, as a keyboard user reaches it. */
async function tabTo(page: Page, target: Locator): Promise<void> {
  for (let press = 0; press < 12; press++) {
    if (await target.evaluate(el => el === el.ownerDocument.activeElement)) {
      return;
    }
    await page.keyboard.press('Tab');
  }
  throw new Error('Tab never reached the target');
}

function button(page: Page, name: string): Locator {
  return page.getByRole('button', {name, exact: true});
}

function group(page: Page, name: string): Locator {
  return page.getByRole('radiogroup', {name, exact: true});
}

test('one Escape closes a Popover opened from the keyboard onto a SegmentedControl while its arrow-key hint shows, and focus returns to the trigger', async ({
  page,
}) => {
  await openStory(page);
  await tabTo(page, button(page, 'Open popover'));
  await page.keyboard.press('Enter');
  const view = group(page, 'Calendar view');
  await expect(view.getByRole('radio', {name: 'Day'})).toBeFocused();
  await expect(hint(page)).toHaveCount(1);

  await page.keyboard.press('Escape');

  await expect(view).toBeHidden();
  await expect(button(page, 'Open popover')).toBeFocused();
  await expect(hint(page)).toHaveCount(0);
});

test('on the page, Escape closes only the arrow-key hint and leaves focus on its segment', async ({
  page,
}) => {
  await openStory(page);
  const day = group(page, 'Page view').getByRole('radio', {name: 'Day'});
  await tabTo(page, day);
  await expect(hint(page)).toHaveCount(1);

  await page.keyboard.press('Escape');

  await expect(hint(page)).toHaveCount(0);
  await expect(day).toBeFocused();
});

test('an arrow press in the Popover hides the arrow-key hint and leaves the Popover open', async ({
  page,
}) => {
  await openStory(page);
  await tabTo(page, button(page, 'Open popover'));
  await page.keyboard.press('Enter');
  const view = group(page, 'Calendar view');
  await expect(hint(page)).toHaveCount(1);

  await page.keyboard.press('ArrowRight');

  await expect(hint(page)).toHaveCount(0);
  await expect(view.getByRole('radio', {name: 'Week'})).toBeFocused();
  await expect(view).toBeVisible();
});

test('a Popover inside the Popover takes the first Escape: it closes, the outer one stays, and focus returns to its trigger', async ({
  page,
}) => {
  await openStory(page);
  await button(page, 'Open popover').click();
  const view = group(page, 'Calendar view');
  await expect(view).toBeVisible();
  await button(page, 'More').click();
  const density = group(page, 'Density');
  await expect(density).toBeVisible();
  // Opened with a pointer, neither SegmentedControl shows its hint.
  await expect(hint(page)).toHaveCount(0);

  await page.keyboard.press('Escape');

  await expect(density).toBeHidden();
  await expect(view).toBeVisible();
  await expect(button(page, 'More')).toBeFocused();
});

test('with the arrow-key hint showing in a Popover inside the Popover, one Escape closes that inner Popover and the outer one stays', async ({
  page,
}) => {
  await openStory(page);
  await tabTo(page, button(page, 'Open popover'));
  await page.keyboard.press('Enter');
  const view = group(page, 'Calendar view');
  await expect(view.getByRole('radio', {name: 'Day'})).toBeFocused();
  await tabTo(page, button(page, 'More'));
  await page.keyboard.press('Enter');
  const density = group(page, 'Density');
  await expect(density.getByRole('radio', {name: 'Compact'})).toBeFocused();
  await expect(hint(page)).toHaveCount(1);

  await page.keyboard.press('Escape');

  await expect(density).toBeHidden();
  await expect(view).toBeVisible();
  await expect(button(page, 'More')).toBeFocused();
});
