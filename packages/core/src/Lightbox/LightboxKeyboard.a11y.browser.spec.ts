// Copyright (c) Meta Platforms, Inc. and affiliates.
// @pr-a11y always

/**
 * @file LightboxKeyboard.a11y.browser.spec.ts
 * @input Built Lightbox stories (LTR and the RTL story global) and real
 *   Chromium/WebKit keyboard input
 * @output Browser evidence that the gallery's Left/Right arrow keys move in
 *   the direction of the matching on-screen button, in both directions
 * @position Cross-browser proof for Lightbox's direction-aware gallery keys
 *   (design:bidirectionality DR6, DR11)
 */

import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
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

// Opens the gallery story at its second photo ("2 / 4").
async function openGallery(page: Page, direction: 'ltr' | 'rtl') {
  // The story's photos are remote; the keys do not need them to load.
  await page.route(/picsum\.photos/, async route => route.abort());
  await page.goto(
    `${storybook.origin}/iframe.html?id=core-lightbox--gallery&viewMode=story${
      direction === 'rtl' ? '&globals=direction:rtl' : ''
    }`,
  );
  await page.getByRole('img', {name: 'Mountain lake'}).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('2 / 4');
  const previous = page.getByRole('button', {name: 'Previous'});
  const next = page.getByRole('button', {name: 'Next'});
  return {dialog, previous, next};
}

async function centerX(locator: ReturnType<Page['getByRole']>) {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  return box.x + box.width / 2;
}

for (const direction of ['ltr', 'rtl'] as const) {
  test(`${direction}: each arrow key moves toward the button on its side`, async ({
    page,
  }) => {
    const {dialog, previous, next} = await openGallery(page, direction);
    const nextIsOnTheLeft = (await centerX(next)) < (await centerX(previous));
    // The buttons swap sides in RTL; the keys must follow them.
    expect(nextIsOnTheLeft).toBe(direction === 'rtl');
    const towardNext = nextIsOnTheLeft ? 'ArrowLeft' : 'ArrowRight';
    const towardPrevious = nextIsOnTheLeft ? 'ArrowRight' : 'ArrowLeft';

    await page.keyboard.press(towardNext);
    await expect(dialog).toContainText('3 / 4');
    await page.keyboard.press(towardPrevious);
    await page.keyboard.press(towardPrevious);
    await expect(dialog).toContainText('1 / 4');
    // At the start of the range the key toward Previous does nothing, like
    // the disabled button it matches.
    await page.keyboard.press(towardPrevious);
    await expect(dialog).toContainText('1 / 4');
  });
}

test('an arrow key pressed on "more" pages, and focus stays in the viewer for the next arrow', async ({
  page,
}) => {
  await page.route(/picsum\.photos/, async route => route.abort());
  await page.goto(
    `${storybook.origin}/iframe.html?id=core-lightbox--gallery-with-captions&viewMode=story`,
  );
  await page.getByRole('button', {name: 'Open gallery with captions'}).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('1 / 4');
  // The first caption runs past two lines, so its band shows "more".
  const more = dialog.getByRole('button', {name: 'more'});
  await more.focus();
  await expect(more).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText('2 / 4');
  // Paging took the toggle away; focus moved to a part of the viewer.
  const isFocusInViewer = await dialog.evaluate(
    element =>
      element.ownerDocument.activeElement !== element.ownerDocument.body &&
      element.contains(element.ownerDocument.activeElement),
  );
  expect(isFocusInViewer).toBe(true);
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText('3 / 4');
});
