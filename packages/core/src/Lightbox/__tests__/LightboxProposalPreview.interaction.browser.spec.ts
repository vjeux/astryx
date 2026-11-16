// Throwaway check for the Lightbox proposal preview; not committed.

import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  frames,
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const OUT = process.env.C20_SHOTS ?? '/tmp';

async function open(page: Page, id: string) {
  await openStory(page, storybook(), id);
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await frames(page, 6);
  return {driver: await touchDriver(page), dialog};
}

async function boxOf(locator: ReturnType<Page['locator']>) {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  return box;
}

test('custom items page and close by drag; their own drags stay theirs', async ({
  page,
}) => {
  page.on('console', message => {
    if (message.text().startsWith('C20')) {
      console.log(message.text());
    }
  });
  const {driver, dialog} = await open(
    page,
    'core-lightbox-proposal-preview--custom-items',
  );
  await expect(dialog).toHaveAttribute('aria-label', 'Forest path');
  await driver.play(drag({x: 330, y: 330}, {x: 60, y: 330}, {durationMs: 250}));
  await expect(dialog).toHaveAttribute('aria-label', 'Before and after');
  await frames(page, 30);
  await page.screenshot({path: `${OUT}/custom-before-after.png`});
  // A swipe on the custom item's frame pages on.
  await driver.play(drag({x: 330, y: 330}, {x: 60, y: 330}, {durationMs: 250}));
  await expect(dialog).toHaveAttribute('aria-label', 'Notes with a field');
  await frames(page, 30);
  // A drag that starts on its field stays the field's.
  const input = dialog.locator('[data-current] input');
  const field = await boxOf(input);
  const hit = await page.evaluate(
    ({x, y}) => {
      const element = document.elementFromPoint(x, y);
      return element == null ? 'none' : element.outerHTML.slice(0, 160);
    },
    {x: field.x + field.width - 10, y: field.y + field.height / 2},
  );
  console.log('C20 field box', JSON.stringify(field), 'hit:', hit);
  await driver.play(
    drag(
      {x: field.x + field.width - 10, y: field.y + field.height / 2},
      {x: field.x + 10, y: field.y + field.height / 2},
      {durationMs: 250},
    ),
  );
  await frames(page, 30);
  await expect(dialog).toHaveAttribute('aria-label', 'Notes with a field');
  // A drag down in the scrolled list does not close.
  const list = dialog.locator('[data-current] [data-lightbox-custom] > div');
  await list.evaluate(el => {
    el.scrollTop = 200;
  });
  const listBox = await boxOf(list);
  const x = listBox.x + listBox.width / 2;
  await driver.play(
    drag({x, y: listBox.y + 120}, {x, y: listBox.y + 330}, {durationMs: 300}),
  );
  await frames(page, 40);
  await expect(dialog).toBeVisible();
  await page.screenshot({path: `${OUT}/custom-notes-scrolled.png`});
  // From the list's top, a drag down that starts on its text closes.
  await list.evaluate(el => {
    el.scrollTop = 0;
  });
  await driver.play(
    drag({x, y: listBox.y + 200}, {x, y: listBox.y + 520}, {durationMs: 250}),
  );
  await expect(dialog).toBeHidden({timeout: 4000});
});

test('a custom item closes by a drag down on its frame', async ({page}) => {
  const {driver, dialog} = await open(
    page,
    'core-lightbox-proposal-preview--custom-items',
  );
  await driver.play(drag({x: 330, y: 330}, {x: 60, y: 330}, {durationMs: 250}));
  await expect(dialog).toHaveAttribute('aria-label', 'Before and after');
  await frames(page, 30);
  await driver.play(drag({x: 200, y: 300}, {x: 200, y: 620}, {durationMs: 250}));
  await expect(dialog).toBeHidden({timeout: 4000});
});

test('the title names the dialog, and a filmstrip pick moves', async ({
  page,
}) => {
  const {driver, dialog} = await open(
    page,
    'core-lightbox-proposal-preview--title-actions-and-filmstrip',
  );
  await expect(dialog).toHaveAttribute('aria-label', 'forest.jpg');
  await expect(dialog.getByText('From Trip')).toBeVisible();
  await expect(dialog.getByRole('button', {name: 'Download'})).toBeVisible();
  await expect(dialog.getByRole('button', {name: 'Open source'})).toBeVisible();
  await page.screenshot({path: `${OUT}/filmstrip.png`});
  const tile = await boxOf(
    dialog.getByRole('button', {name: 'Before and after'}),
  );
  await driver.tap({x: tile.x + tile.width / 2, y: tile.y + tile.height / 2});
  await expect(dialog).toHaveAttribute('aria-label', 'Before and after');
  await frames(page, 30);
  await page.screenshot({path: `${OUT}/filmstrip-picked.png`});
});

test('the zoom control zooms the photo and reads its level', async ({page}) => {
  const {driver, dialog} = await open(
    page,
    'core-lightbox-proposal-preview--zoom-control',
  );
  await expect(dialog.getByText('100%', {exact: true})).toBeVisible();
  const zoomIn = await boxOf(dialog.getByRole('button', {name: 'Zoom in'}));
  await driver.tap({
    x: zoomIn.x + zoomIn.width / 2,
    y: zoomIn.y + zoomIn.height / 2,
  });
  await expect(dialog.getByText('100%', {exact: true})).toBeHidden({
    timeout: 4000,
  });
  await frames(page, 30);
  await page.screenshot({path: `${OUT}/zoomed.png`});
  const fit = await boxOf(dialog.getByRole('button', {name: 'Fit'}));
  await driver.tap({x: fit.x + fit.width / 2, y: fit.y + fit.height / 2});
  await expect(dialog.getByText('100%', {exact: true})).toBeVisible({
    timeout: 4000,
  });
});
