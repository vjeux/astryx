// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuTriggerSizing.interaction.browser.spec.ts
 * @input The built TriggerSizing DropdownMenu story on a desktop profile
 * @output Proof that the default trigger sizes as a Button does, inside the
 *   box that the menu anchors to. A trigger with `width: '100%'` fills its
 *   container. A long label truncates in a narrow container. In a narrow row,
 *   the trigger stays inside the row and leaves its sibling the room a plain
 *   Button would. In a stack, a tall row and a grid cell, the trigger fills
 *   its anchor box and takes the place a plain Button takes.
 * @position A browser proof that DropdownMenu's default trigger sizes as a
 *   Button does
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
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

/**
 * The trigger fills the box that the menu anchors to, and it takes the place
 * that a plain Button takes in the same parent.
 */
async function expectFillsItsBox(
  page: Page,
  testId: string,
  name: string,
  reference: string,
  side: 'width' | 'height',
) {
  await openStory(page, storybook(), 'core-dropdownmenu--trigger-sizing');
  const scope = page.getByTestId(testId);
  const trigger = scope.getByRole('button', {name});
  const triggerBox = await boxOf(trigger);
  const anchorBox = await trigger.evaluate(element => {
    const r = (element.parentElement as HTMLElement).getBoundingClientRect();
    return {x: r.x, y: r.y, width: r.width, height: r.height};
  });
  for (const edge of ['x', 'y', 'width', 'height'] as const) {
    expect(
      Math.abs(anchorBox[edge] - triggerBox[edge]),
      `the anchor box's ${edge} is ${anchorBox[edge]}, the trigger's ${triggerBox[edge]}`,
    ).toBeLessThanOrEqual(EDGE_PX);
  }
  const plain = await boxOf(scope.getByRole('button', {name: reference}));
  expect(
    Math.abs(triggerBox[side] - plain[side]),
    `the trigger's ${side} is ${triggerBox[side]}, a plain Button's ${plain[side]}`,
  ).toBeLessThanOrEqual(EDGE_PX);
}

test('in a stack, the trigger fills its anchor box and the stack’s width, as a Button does', async ({
  page,
}) => {
  await expectFillsItsBox(
    page,
    'stack',
    'In a stack',
    'Stack reference',
    'width',
  );
});

test('in a tall row, the anchor box keeps the trigger’s height, as a Button keeps its own', async ({
  page,
}) => {
  await expectFillsItsBox(
    page,
    'tall-row',
    'In a tall row',
    'Row reference',
    'height',
  );
});

test('in a grid cell, the trigger fills its anchor box and the cell’s width, as a Button does', async ({
  page,
}) => {
  await expectFillsItsBox(
    page,
    'grid',
    'In a grid cell',
    'Grid reference',
    'width',
  );
});
