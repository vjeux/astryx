// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PopoverFocusReturn.interaction.browser.spec.ts
 * @input The built Controlled Focused Row Popover story (a controlled
 *   popover with auto focus whose rows render on focus), real keyboard
 *   input and the interaction harness
 * @output Proofs that a controlled popover opened from the keyboard returns
 *   focus to its trigger when it closes, by Escape and by a pick
 * @position Browser proofs for Popover/usePopover.tsx's focus return
 *   (`component:Popover` AR4)
 */

import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {openStory, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

/** Opens the story's popover from its focused trigger. */
async function openFromKeyboard(page: Page) {
  await openStory(page, storybook(), 'core-popover--controlled-focused-row');
  const trigger = page.getByRole('button', {name: 'Row actions'});
  await trigger.focus();
  await page.keyboard.press('Enter');
  // Initial focus moves to the first row.
  await expect(page.getByRole('button', {name: 'Rename'})).toBeFocused();
  return trigger;
}

test('a controlled popover opened from the keyboard returns focus to its trigger on Escape', async ({
  page,
}) => {
  const trigger = await openFromKeyboard(page);
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('a controlled popover opened from the keyboard returns focus to its trigger after a pick', async ({
  page,
}) => {
  const trigger = await openFromKeyboard(page);
  // The focused row's action closes the popover.
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});
