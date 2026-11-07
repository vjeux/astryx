// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file CarouselSnapPagingEdges.interaction.browser.spec.ts
 * @input Carousel's three-up snap paging story in paging mode, harness touch
 *   flicks and a press, a per-frame sampler and a record of each button
 *   change
 * @output Proves the edge scroll buttons follow the row as shown while snap
 *   paging holds it. Each button comes back within two frames of the row
 *   leaving its edge, before the settle hands the row back. After a press on
 *   the end button, the start button comes back the same way.
 * @position Interaction proofs for Carousel's edge buttons under snap paging,
 *   run in Chromium and WebKit
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

interface Sample {
  readonly shown: number;
  readonly travel: number;
  readonly startDisabled: boolean;
  readonly endDisabled: boolean;
  readonly held: boolean;
}

/** An edge button's change, and whether the paging held the row then. */
interface Flip {
  readonly button: 'start' | 'end';
  readonly disabled: boolean;
  readonly held: boolean;
}

async function open(page: Page) {
  await openStory(page, storybook(), 'core-carousel--snap-paging-three-up', {
    mode: 'paging',
  });
  const scroller = page.getByRole('region').getByRole('group').first();
  const start = page.getByRole('button', {
    name: 'Scroll left',
    includeHidden: true,
  });
  const end = page.getByRole('button', {
    name: 'Scroll right',
    includeHidden: true,
  });
  await expect(scroller).toBeVisible();
  return {scroller, start, end};
}

// Samples on every frame. It records where the row is shown (its scroll
// offset less the lead item's translate). It also records whether each edge
// button is disabled and whether the paging holds the row. A frame's sample
// can come before that frame's change to a button. So each change is also
// recorded as it happens, with whether the paging holds the row then.
async function startSampling(
  scroller: Locator,
  start: Locator,
  end: Locator,
): Promise<void> {
  const startHandle = await start.elementHandle();
  const endHandle = await end.elementHandle();
  await scroller.evaluate(
    (row, [startButton, endButton]) => {
      const samples: Sample[] = [];
      (window as unknown as {__edgeSamples: Sample[]}).__edgeSamples = samples;
      const flips: Flip[] = [];
      (window as unknown as {__edgeFlips: Flip[]}).__edgeFlips = flips;
      const translateX = (el: Element) =>
        Number.parseFloat(getComputedStyle(el).translate.split(' ')[0]) || 0;
      const isHeld = () =>
        Array.from(row.children).some(
          child => (child as HTMLElement).style.translate !== '',
        );
      const observer = new MutationObserver(records => {
        for (const record of records) {
          const button = record.target as HTMLButtonElement;
          flips.push({
            button: button === startButton ? 'start' : 'end',
            disabled: button.getAttribute('aria-disabled') === 'true',
            held: isHeld(),
          });
        }
      });
      for (const button of [startButton, endButton]) {
        if (button != null) {
          observer.observe(button, {attributeFilter: ['aria-disabled']});
        }
      }
      const tick = () => {
        const lead = row.children[0];
        const held = isHeld();
        samples.push({
          shown:
            Math.abs(row.scrollLeft) - (lead == null ? 0 : translateX(lead)),
          travel: row.scrollWidth - row.clientWidth,
          startDisabled:
            (startButton as HTMLButtonElement).getAttribute('aria-disabled') ===
            'true',
          endDisabled:
            (endButton as HTMLButtonElement).getAttribute('aria-disabled') ===
            'true',
          held,
        });
        if (samples.length < 600) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    },
    [startHandle, endHandle] as const,
  );
}

async function samplesOf(page: Page): Promise<Sample[]> {
  return page.evaluate(
    () => (window as unknown as {__edgeSamples: Sample[]}).__edgeSamples,
  );
}

// The first change that brings `button` back, as it happened.
async function comeBack(page: Page, button: Flip['button']) {
  const flips = await page.evaluate(
    () => (window as unknown as {__edgeFlips: Flip[]}).__edgeFlips,
  );
  return {
    flip: flips.find(flip => flip.button === button && !flip.disabled),
    flips: JSON.stringify(flips),
  };
}

// A flick of 80 px in 80 ms, toward the end of the row or back.
async function flick(
  page: Page,
  scroller: Locator,
  {back = false}: {back?: boolean} = {},
): Promise<void> {
  const box = await scroller.boundingBox();
  if (box == null) {
    throw new Error('no scroller');
  }
  const y = box.y + box.height / 2;
  const from = {x: box.x + box.width / 2 + (back ? -40 : 40), y};
  const to = {x: from.x + (back ? 80 : -80), y};
  const driver = await touchDriver(page);
  await driver.play(drag(from, to, {durationMs: 80}));
}

async function settled(scroller: Locator): Promise<void> {
  await expect
    .poll(async () =>
      scroller.evaluate(row =>
        Array.from(row.children).some(
          child => (child as HTMLElement).style.translate !== '',
        ),
      ),
    )
    .toBe(false);
}

test('the start button comes back within two frames of the held row leaving the start', async ({
  page,
}) => {
  const {scroller, start, end} = await open(page);
  await expect(start).toBeDisabled();
  await startSampling(scroller, start, end);
  await flick(page, scroller);
  await settled(scroller);
  await expect(start).toBeEnabled();
  const samples = await samplesOf(page);
  const detail = JSON.stringify(samples.slice(0, 40));
  const left = samples.findIndex(sample => sample.shown > 1);
  const back = samples.findIndex(sample => !sample.startDisabled);
  test.info().annotations.push({
    type: 'frames from leaving the start to the start button',
    description: String(back - left),
  });
  expect(left, detail).toBeGreaterThanOrEqual(0);
  expect(back - left, detail).toBeLessThanOrEqual(2);
  // While the paging still holds the row: before the settle hands it back.
  const {flip, flips} = await comeBack(page, 'start');
  expect(flip?.held, flips).toBe(true);
});

test('the end button comes back within two frames of the held row leaving the end', async ({
  page,
}) => {
  const {scroller, start, end} = await open(page);
  // Two views on: the end of the row.
  await flick(page, scroller);
  await settled(scroller);
  await flick(page, scroller);
  await settled(scroller);
  await expect(end).toBeDisabled();
  await startSampling(scroller, start, end);
  await flick(page, scroller, {back: true});
  await settled(scroller);
  await expect(end).toBeEnabled();
  const samples = await samplesOf(page);
  const detail = JSON.stringify(samples.slice(0, 40));
  // The travel at rest: a held row's translate can widen its overflow.
  const {travel} = samples[0];
  const left = samples.findIndex(sample => sample.shown < travel - 1);
  const back = samples.findIndex(sample => !sample.endDisabled);
  test.info().annotations.push({
    type: 'frames from leaving the end to the end button',
    description: String(back - left),
  });
  expect(left, detail).toBeGreaterThanOrEqual(0);
  expect(back - left, detail).toBeLessThanOrEqual(2);
  const {flip, flips} = await comeBack(page, 'end');
  expect(flip?.held, flips).toBe(true);
});

test('after a press on the end button, the start button comes back within two frames of the held row leaving the start', async ({
  page,
}) => {
  const {scroller, start, end} = await open(page);
  await expect(start).toBeDisabled();
  await startSampling(scroller, start, end);
  await end.click();
  await settled(scroller);
  await expect(start).toBeEnabled();
  // The button can change after its frame's sample, so wait for a sample
  // that shows it back.
  await expect
    .poll(async () =>
      (await samplesOf(page)).some(sample => !sample.startDisabled),
    )
    .toBe(true);
  const samples = await samplesOf(page);
  const detail = JSON.stringify(samples.slice(0, 40));
  const left = samples.findIndex(sample => sample.shown > 1);
  const back = samples.findIndex(sample => !sample.startDisabled);
  test.info().annotations.push({
    type: 'frames from leaving the start to the start button, after a press',
    description: String(back - left),
  });
  expect(left, detail).toBeGreaterThanOrEqual(0);
  expect(back, detail).toBeGreaterThanOrEqual(left);
  expect(back - left, detail).toBeLessThanOrEqual(2);
  // The press moves the row through the paging, so the paging still holds
  // the row when the button comes back.
  const {flip, flips} = await comeBack(page, 'start');
  expect(flip?.held, flips).toBe(true);
});
