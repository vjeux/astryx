// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TimeWheels.interaction.browser.spec.ts
 * @input The built "Bottom Sheet Wheels" and "Bottom Sheet With Increment"
 *   TimeInput stories, real touch input and the interaction harness
 * @output Interaction proofs for the sheet's time wheels following
 *   UIDatePicker: a drag of the hour from 11 to 12 turns AM to PM, the AM/PM
 *   column turning on UIDatePicker's own curve (`datePicker.wheels.columnTurn`:
 *   0.3 s on a sinusoid) after the hour commits; the minute column steps by the
 *   increment; a storyboard of the AM/PM column's turn.
 * @position Interaction tests of TimeWheels.tsx (`*.interaction.browser.spec.ts`,
 *   run by `pnpm test:interaction`)
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  animationStoryboard,
  compareCurve,
  curveOf,
  drag,
  freezeTimers,
  holdAnimations,
  installTimerGate,
  openStory,
  releaseAnimations,
  sampleCurve,
  thawTimers,
  timeline,
  touchDriver,
  waitForAnimation,
  waitForRest,
  withStorybook,
  type TouchDriver,
} from '@astryxdesign/interaction-harness';
import {datePicker} from '../../motion/uikit/datePicker';

const storybook = withStorybook(test);

const TURN_MS = datePicker.wheels.columnTurn.durationMs;
/** The column turn's oracle: ½ − ½ cos(πt), independent of the bézier. */
const sinusoid = (t: number) =>
  t >= TURN_MS ? 1 : 0.5 - 0.5 * Math.cos((Math.PI * Math.max(t, 0)) / TURN_MS);

interface OpenWheels {
  driver: TouchDriver;
  sheet: Locator;
  hour: Locator;
  meridiem: Locator;
}

async function openWheels(page: Page, story: string): Promise<OpenWheels> {
  await openStory(page, storybook(), story);
  const driver = await touchDriver(page);
  const opener = page.getByRole('button', {name: /^Open /}).first();
  const box = await opener.boundingBox();
  if (box == null) {
    throw new Error('no field');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  const hour = page.getByRole('listbox', {name: 'Hour'});
  await expect(hour).toBeVisible();
  const sheet = page.getByRole('dialog').first();
  await waitForRest(sheet);
  return {
    driver,
    sheet,
    hour,
    meridiem: page.getByRole('listbox', {name: 'AM/PM'}),
  };
}

/** The label of the row at rest under the band. */
async function restingLabel(column: Locator): Promise<string | null> {
  return column.evaluate(element => {
    const id = element.getAttribute('aria-activedescendant');
    return id == null
      ? null
      : (document.getElementById(id)?.textContent ?? null);
  });
}

/** A slow drag that rests before the lift: one row up, no fling. */
async function turnOneRowDown(driver: TouchDriver, column: Locator) {
  const box = await column.boundingBox();
  if (box == null) {
    throw new Error('no column');
  }
  const from = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  // One 32 px row plus the pan's hysteresis.
  await driver.play(
    drag(from, {x: from.x, y: from.y - 42}, {durationMs: 300, restMs: 150}),
  );
}

/** The strip of the band's copy moves by one row pitch per row. */
const stripOf = (column: Locator) => column.locator('[data-wheel-strip]');

test('the AM/PM column follows the hour from 11 to 12 on UIDatePicker’s turn', async ({
  page,
}) => {
  const {driver, hour, meridiem} = await openWheels(
    page,
    'core-timeinput--bottom-sheet-wheels',
  );
  expect(await restingLabel(hour)).toBe('11');
  expect(await restingLabel(meridiem)).toBe('AM');

  // The Wheel ends a turn from a timer at the curve's duration: hold it with
  // the animations while they are sampled.
  await installTimerGate(page);
  await turnOneRowDown(driver, hour);
  // The hour commits at rest; the AM/PM column then turns by itself.
  await waitForAnimation(stripOf(meridiem));
  await freezeTimers(page);
  const held = await holdAnimations(page, meridiem);
  expect(held.length).toBeGreaterThan(0);
  const times = timeline(TURN_MS, 1000 / 60);
  const samples = await sampleCurve(stripOf(meridiem), times);
  const ys = curveOf(samples, 'translateY');
  const start = ys[0].value;
  const end = ys[ys.length - 1].value;
  expect(Math.abs(end - start)).toBeCloseTo(32, 0);
  const progress = ys.map(({t, value}) => ({
    t,
    value: (value - start) / (end - start),
  }));
  const fit = compareCurve(progress, sinusoid, 0.02);
  expect(fit.pass, JSON.stringify(fit.worst)).toBe(true);
  await releaseAnimations(page);
  await thawTimers(page);
  await waitForRest(meridiem);

  await expect.poll(async () => restingLabel(hour)).toBe('12');
  await expect.poll(async () => restingLabel(meridiem)).toBe('PM');
  await expect(page.getByRole('dialog').first()).toBeVisible();
});

test('the minute column steps by the increment', async ({page}) => {
  await openWheels(page, 'core-timeinput--bottom-sheet-with-increment');
  const minutes = page.getByRole('listbox', {name: 'Minute'});
  await expect(minutes.getByRole('option')).toHaveText([
    '00',
    '15',
    '30',
    '45',
  ]);
});

test(
  'storyboard: the AM/PM column turns after the hour',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, sheet, hour, meridiem} = await openWheels(
      page,
      'core-timeinput--bottom-sheet-wheels',
    );
    await installTimerGate(page);
    await turnOneRowDown(driver, hour);
    await waitForAnimation(stripOf(meridiem));
    await freezeTimers(page);
    const clip = (await sheet.boundingBox()) ?? undefined;
    const {storyboard} = await animationStoryboard(page, {
      name: 'timewheels-meridiem-follows-hour',
      clip,
      scope: meridiem,
      times: timeline(TURN_MS, 1000 / 30),
      columns: 6,
      cellScale: 0.4,
      measure: async () => ({
        y: await stripOf(meridiem).evaluate(element =>
          Number(
            new DOMMatrixReadOnly(
              getComputedStyle(element).transform,
            ).m42.toFixed(2),
          ),
        ),
      }),
    });
    await storyboard.write(testInfo);
    await releaseAnimations(page, {finish: true});
    await thawTimers(page);
  },
);
