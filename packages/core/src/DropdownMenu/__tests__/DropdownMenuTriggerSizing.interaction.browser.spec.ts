// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuTriggerSizing.interaction.browser.spec.ts
 * @input The built TriggerSizing DropdownMenu story on a desktop profile
 * @output Proof that the default trigger sizes as a Button does, inside the
 *   box that the menu anchors to. A trigger with `width: '100%'` fills its
 *   container. A long label truncates in a narrow container. In a narrow row,
 *   the trigger stays inside the row and leaves its sibling the room a plain
 *   Button would.
 * @position A browser proof that DropdownMenu's default trigger sizes as a
 *   Button does
 */

import {expect, test, type Locator} from '@astryxdesign/a11y-spec/playwright';
import {openStory, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

test.use({
  viewport: {width: 1280, height: 800},
  isMobile: false,
  hasTouch: false,
});

/** How far two edges may differ before they count as apart: rounding. */
const EDGE_PX = 0.5;

async function boxOf(locator: Locator) {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('the element has no rendered box');
  }
  return box;
}

/** Whether the text in `label` is cut off: its content is wider than its box. */
async function isTruncated(label: Locator): Promise<boolean> {
  return label.evaluate(element => element.scrollWidth > element.clientWidth);
}

test('a trigger with width 100% fills its container, as a Button does', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-dropdownmenu--trigger-sizing');
  const sized = await boxOf(page.getByTestId('sized'));
  const full = await boxOf(page.getByRole('button', {name: 'Full width'}));
  expect(
    Math.abs(full.width - sized.width),
    `the full-width trigger is ${full.width} px wide in a ${sized.width} px container`,
  ).toBeLessThanOrEqual(EDGE_PX);
});

test('a long label truncates inside a narrow container, as a Button’s does', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-dropdownmenu--trigger-sizing');
  const narrow = await boxOf(page.getByTestId('narrow'));
  const long = page.getByRole('button', {
    name: 'A long label that has to truncate',
  });
  const longBox = await boxOf(long);
  expect(
    longBox.x + longBox.width,
    'the long trigger ends inside its container',
  ).toBeLessThanOrEqual(narrow.x + narrow.width + EDGE_PX);
  expect(
    await isTruncated(long.getByText('A long label that has to truncate')),
    'the long label truncates',
  ).toBe(true);
});

test('in a narrow row, the trigger stays inside the row and leaves its sibling the room a Button would', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-dropdownmenu--trigger-sizing');
  // In a narrow row, the trigger ends inside the row. Its sibling keeps at
  // least the width it has beside a plain Button with the same label. Flex
  // shrink scales with the content box. The box has no padding of its own,
  // so the row shrinks it a little more than a Button.
  const row = page.getByTestId('row');
  const reference = page.getByTestId('reference-row');
  const rowBox = await boxOf(row);
  const more = await boxOf(
    row.getByRole('button', {name: 'More actions for this draft'}),
  );
  expect(
    more.x + more.width,
    'the trigger ends inside its row',
  ).toBeLessThanOrEqual(rowBox.x + rowBox.width + EDGE_PX);
  const save = (await boxOf(row.getByRole('button', {name: 'Save'}))).width;
  const saveAsButtons = (
    await boxOf(reference.getByRole('button', {name: 'Save'}))
  ).width;
  expect(
    save + EDGE_PX,
    `"Save" is ${save} px wide beside the trigger and ${saveAsButtons} px beside a Button`,
  ).toBeGreaterThanOrEqual(saveAsButtons);
});
