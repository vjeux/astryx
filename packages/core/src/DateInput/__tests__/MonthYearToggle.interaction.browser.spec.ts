// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file MonthYearToggle.interaction.browser.spec.ts
 * @input The built "Bottom Sheet Calendar" DateInput story, real touch input
 *   and the interaction harness
 * @output Interaction proofs for the calendar's month/year toggle on
 *   UIDatePicker's clock (motion/uikit/datePicker.ts
 *   `calendar.monthYearToggle`): the wheels fade in on UIKit's 0.25 s
 *   ease-in-ease-out and the title's chevron turns a quarter turn on the same
 *   curve; a tapped day takes its selection with no transition; a storyboard
 *   of the toggle
 * @position Interaction tests of TouchDateField.tsx and MonthScroller.tsx
 *   (`*.interaction.browser.spec.ts`, run by `pnpm test:interaction`)
 */

import {expect, test, type Page} from '@playwright/test';
import {
  animationStoryboard,
  compareCurve,
  cubicBezier,
  curveOf,
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
} from '@astryxdesign/interaction-harness';
import {datePicker} from '../../motion/uikit/datePicker';
import {timing} from '../../motion/uikit/timing';

const storybook = withStorybook(test);

const TOGGLE_MS = datePicker.calendar.monthYearToggle.fadeMs;
const ease = cubicBezier(...timing.curves.easeInOut);

async function openCalendar(page: Page) {
  await openStory(page, storybook(), 'core-dateinput--bottom-sheet-calendar');
  const driver = await touchDriver(page);
  const opener = page.getByRole('button', {name: /calendar/i}).first();
  const box = await opener.boundingBox();
  if (box == null) {
    throw new Error('no opener');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  const sheet = page
    .getByRole('dialog')
    .locator('.astryx-bottom-sheet')
    .first();
  await waitForRest(sheet);
  const title = page.locator('[data-title="month-year"]');
  const titleBox = await title.boundingBox();
  if (titleBox == null) {
    throw new Error('no title');
  }
  return {
    driver,
    sheet,
    wheels: page.locator('[data-panel="wheels"]').first(),
    titleAt: {
      x: titleBox.x + titleBox.width / 2,
      y: titleBox.y + titleBox.height / 2,
    },
  };
}

test('the wheels fade in and the chevron turns on UIKit’s 0.25 s ease-in-ease-out', async ({
  page,
}) => {
  const {driver, wheels, titleAt} = await openCalendar(page);
  await driver.tap(titleAt);
  await waitForAnimation(wheels);
  await holdAnimations(page);
  const times = timeline(TOGGLE_MS, 1000 / 60);
  const fade = curveOf(await sampleCurve(wheels, times), 'opacity');
  const fit = compareCurve(fade, t => ease(Math.min(1, t / TOGGLE_MS)), 0.02);
  const chevron = page
    .locator('[data-title="month-year"] .astryx-icon')
    .first();
  const turn = curveOf(await sampleCurve(chevron, times), 'rotate');
  const turnFit = compareCurve(
    turn,
    t => 90 * ease(Math.min(1, t / TOGGLE_MS)),
    2,
  );
  await releaseAnimations(page, {finish: true});
  expect(fit.pass, JSON.stringify(fit.worst)).toBe(true);
  expect(turnFit.pass, JSON.stringify(turnFit.worst)).toBe(true);
});

test('a tapped day takes its selection at once', async ({page}) => {
  const {driver} = await openCalendar(page);
  const day = page.getByRole('button', {name: /October 20, 2026/});
  const box = await day.boundingBox();
  if (box == null) {
    throw new Error('no day');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  // No transition on the day: nothing is animating once the tap is handled.
  const running = await day.evaluate(
    element => element.getAnimations({subtree: true}).length,
  );
  expect(running).toBe(0);
  await expect(page.getByRole('gridcell', {selected: true})).toContainText(
    '20',
  );
});

test(
  'storyboard: the month/year toggle',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, sheet, wheels, titleAt} = await openCalendar(page);
    await installTimerGate(page);
    await driver.tap(titleAt);
    await waitForAnimation(wheels);
    await freezeTimers(page);
    const {storyboard} = await animationStoryboard(page, {
      name: 'month-year-toggle',
      clip: sheet,
      times: timeline(TOGGLE_MS, 1000 / 30),
      columns: 5,
      cellScale: 0.35,
      measure: async () => ({
        opacity: +(
          await wheels.evaluate(el => Number(getComputedStyle(el).opacity))
        ).toFixed(3),
      }),
    });
    await storyboard.write(testInfo);
    await releaseAnimations(page, {finish: true});
    await thawTimers(page);
  },
);
