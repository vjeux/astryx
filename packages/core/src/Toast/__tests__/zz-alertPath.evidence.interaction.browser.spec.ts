// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file zz-alertPath.evidence.interaction.browser.spec.ts
 * @input AlertDialog's "Alert over a toast" story, recorded frame by frame
 * @output Evidence only, not for landing: the toast the alert's action raises
 *   enters once while the alert fades out under a finger and closes
 * @position Run against a build of the AlertDialog touch-motion change, with
 *   and without the Toast fix
 */

import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  openStory,
  touchDriver,
  waitForRest,
  withStorybook,
  type Point,
} from '@astryxdesign/interaction-harness';
import type {Locator} from '@astryxdesign/a11y-spec/playwright';

const storybook = withStorybook(test);

const MESSAGE = 'Item deleted.';

/** The toast's card on one frame. */
interface Frame {
  opacity: number;
  /** Whether the card was inside a dialog, the viewport's modal outlet. */
  isInDialog: boolean;
}

/** What the recorder saw of the toast's card. */
interface Recording {
  /** The card on each frame it was in the page. */
  frames: Frame[];
  /** The opacity transitions the card ran: one for each entrance. */
  entrances: number;
}

interface Recorder {
  frames: Frame[];
  transitions: Set<Animation>;
  isRecording: boolean;
}

/** Records the toast card's opacity and its opacity transitions on each frame. */
async function startRecording(page: Page): Promise<void> {
  await page.evaluate(() => {
    const recorder: Recorder = {
      frames: [],
      transitions: new Set(),
      isRecording: true,
    };
    (window as unknown as {__toastRecorder: Recorder}).__toastRecorder =
      recorder;
    const record = () => {
      const card = document.querySelector('[data-toast-id] .astryx-toast');
      if (card != null) {
        recorder.frames.push({
          opacity: Number(getComputedStyle(card).opacity),
          isInDialog: card.closest('dialog') != null,
        });
        for (const animation of card.getAnimations()) {
          if (
            animation instanceof CSSTransition &&
            animation.transitionProperty === 'opacity'
          ) {
            recorder.transitions.add(animation);
          }
        }
      }
      if (recorder.isRecording) {
        requestAnimationFrame(record);
      }
    };
    requestAnimationFrame(record);
  });
}

async function stopRecording(page: Page): Promise<Recording> {
  return page.evaluate(() => {
    const recorder = (window as unknown as {__toastRecorder: Recorder})
      .__toastRecorder;
    recorder.isRecording = false;
    return {
      frames: recorder.frames,
      entrances: recorder.transitions.size,
    };
  });
}

/** How many frames the recorder has seen the card in a dialog so far. */
async function framesInDialog(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      (
        window as unknown as {__toastRecorder: Recorder}
      ).__toastRecorder.frames.filter(frame => frame.isInDialog).length,
  );
}

/** How many frames the recorder has seen the card so far. */
async function frameCount(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      (window as unknown as {__toastRecorder: Recorder}).__toastRecorder.frames
        .length,
  );
}

/** The card's places in frame order, each run once: `['dialog', 'page']`. */
function placesOf(frames: Frame[]): string[] {
  const places: string[] = [];
  for (const {isInDialog} of frames) {
    const place = isInDialog ? 'dialog' : 'page';
    if (places.at(-1) !== place) {
      places.push(place);
    }
  }
  return places;
}

/** Whether the card faded back out after it had shown: a second entrance. */
function fadesBack(frames: Frame[]): boolean {
  let hasShown = false;
  for (const {opacity} of frames) {
    if (opacity > 0.9) {
      hasShown = true;
    } else if (hasShown && opacity < 0.3) {
      return true;
    }
  }
  return false;
}

async function openDialog(page: Page) {
  await page.getByRole('button', {name: 'Open dialog'}).click();
  const dialog = page.getByRole('dialog');
  await waitForRest(dialog);
  return dialog;
}

const toastRow = (page: Page) => page.locator('[data-toast-id]');

/** The message in the toast's row, not in the viewport's live region. */
const toastText = (page: Page) => toastRow(page).getByText(MESSAGE);

/** The row is shown, with a height, after the move. */
async function expectRowShown(page: Page) {
  await expect(toastRow(page)).toBeVisible();
  const box = await toastRow(page).boundingBox();
  expect(box?.height ?? 0).toBeGreaterThan(0);
}

const opacitiesOf = (frames: Frame[]) => frames.map(frame => frame.opacity);

const centerOf = async (locator: Locator): Promise<Point> => {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
};

test.describe('under a finger', () => {
  test.use({
    viewport: {width: 390, height: 844},
    hasTouch: true,
    isMobile: true,
  });

  test('the toast the action raises enters once while the alert fades out and closes', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-alertdialog--alert-over-a-toast');
    const driver = await touchDriver(page);
    const dialog = page.getByRole('alertdialog', {name: 'Delete item?'});
    await driver.tap(
      await centerOf(page.getByRole('button', {name: 'Delete item'})),
    );
    await waitForRest(dialog);
    await startRecording(page);
    await driver.tap(
      await centerOf(dialog.getByRole('button', {name: 'Delete'})),
    );
    await expect(dialog).toBeHidden();
    await expect(toastText(page)).toBeVisible();
    await waitForRest(toastRow(page));
    const {frames, entrances} = await stopRecording(page);
    await expectRowShown(page);
    expect(placesOf(frames)).toEqual(['dialog', 'page']);
    expect(fadesBack(frames)).toBe(false);
    expect(entrances).toBe(1);
  });
});
