// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file AlertDialog.toastFrame.evidence.interaction.browser.spec.ts
 * @input Uses the interaction harness's touch driver and screencast
 * @output Evidence only, not for landing: counts presented frames without the
 *   toast after an alert closes over the toast its action raised
 * @position Reproduces a test-environment frame in Playwright's Linux WebKit
 *   build. Apple's WebKit (iOS Simulator, Mobile Safari) and Chromium show none.
 */
import {expect, test, type Locator} from '@astryxdesign/a11y-spec/playwright';
import {
  frames,
  openStory,
  startScreencast,
  touchDriver,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

async function centerOf(locator: Locator) {
  const box = await locator.boundingBox();
  if (box == null) throw new Error('no box');
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

test.describe('under a finger', () => {
  test.use({
    viewport: {width: 390, height: 844},
    hasTouch: true,
    isMobile: true,
  });

  test('every presented frame after the close shows the toast', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-alertdialog--alert-over-a-toast');
    const driver = await touchDriver(page);
    const dialog = page.getByRole('alertdialog', {name: 'Delete item?'});
    await driver.tap(
      await centerOf(page.getByRole('button', {name: 'Delete item'})),
    );
    await waitForRest(dialog);
    const deleteAt = await centerOf(
      dialog.getByRole('button', {name: 'Delete'}),
    );
    // Reads the card's opacity and its ancestors' on every frame, as a frame
    // recorder does. The missing frame shows far more often with it running.
    await page.evaluate(() => {
      const tick = () => {
        const card = document.querySelector('[data-toast-id] .astryx-toast');
        for (
          let node: Element | null = card;
          node != null;
          node = node.parentElement
        ) {
          void getComputedStyle(node).opacity;
        }
        card?.getBoundingClientRect();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    const cast = await startScreencast(page);
    const tapAt = await page.evaluate(() => performance.now());
    await driver.tap(deleteAt);
    await expect(dialog).toBeHidden();
    const row = page.locator('[data-toast-id]');
    await waitForRest(row);
    await frames(page, 10);
    const presented = await cast.stop();
    const origin = await page.evaluate(() => performance.timeOrigin);
    // The card's fill, away from its text.
    const box = (await row.locator('.astryx-toast').boundingBox())!;
    const region = {
      x: box.x + 16,
      y: box.y + 10,
      w: Math.max(8, box.width * 0.4),
      h: 4,
    };
    const lums: {t: number; lum: number}[] = [];
    for (const frame of presented) {
      const t = Math.round(frame.t - origin - tapAt);
      const lum = await page.evaluate(
        async ({data, vw, region}) => {
          const image = new Image();
          image.src = `data:image/png;base64,${data}`;
          await image.decode();
          const k = image.width / vw;
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(region.w * k));
          canvas.height = Math.max(1, Math.round(region.h * k));
          const context = canvas.getContext('2d')!;
          context.drawImage(
            image,
            region.x * k,
            region.y * k,
            region.w * k,
            region.h * k,
            0,
            0,
            canvas.width,
            canvas.height,
          );
          const px = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          ).data;
          let sum = 0;
          for (let i = 0; i < px.length; i += 4)
            sum += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
          return Math.round(sum / (px.length / 4));
        },
        {data: frame.data, vw: frame.viewportWidth, region},
      );
      lums.push({t, lum});
    }
    // Once the toast has shown (its dark fill), a bright frame lacks it.
    const shownAt = lums.findIndex(frame => frame.lum < 60);
    expect(shownAt).toBeGreaterThanOrEqual(0);
    const missing = lums.slice(shownAt).filter(frame => frame.lum > 200);
    console.log(
      `presented frames (ms after the tap: luminance): ${lums.map(f => `${f.t}:${f.lum}`).join(' ')}`,
    );
    expect(missing).toEqual([]);
  });
});
