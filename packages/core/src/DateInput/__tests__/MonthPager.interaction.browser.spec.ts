// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file MonthPager.interaction.browser.spec.ts
 * @input The built "Bottom Sheet Calendar" DateInput story, real touch input
 *   and the interaction harness
 * @output Interaction proofs for the sheet's calendar paging like
 *   UIDatePicker: slow releases before and past half a month, a flick that
 *   pages exactly one month, the title following the drag at half a page,
 *   the arrows' 0.3 s sinusoid and its retarget, the arrow step advancing
 *   through a blocked main thread, a drag decided between the grid and the
 *   sheet as UIKit decides it (once it has moved 10 px either way), the
 *   rubber band past the range's first and last months, RTL paging,
 *   Reduced Motion cross-fading instead of travelling, and storyboards of the
 *   arrow step and a release, and a drag after the month and year wheels
 *   close still paging. They run under a finger in Chromium (as on
 *   Android) and WebKit alike; with a mouse the calendar keeps today's native
 *   scroller.
 * @position Interaction tests of MonthPager.tsx (`*.interaction.browser.spec.ts`,
 *   run by `pnpm test:interaction`)
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  blockMainThread,
  busyWindowProof,
  compareCurve,
  drag,
  flick,
  freezeTimers,
  installTimerGate,
  markElement,
  openStory,
  startCompositorTrace,
  startScreencast,
  Storyboard,
  thawTimers,
  timeline,
  touchDriver,
  trackMarker,
  waitForRest,
  withStorybook,
  writeEvidence,
  type TouchDriver,
} from '@astryxdesign/interaction-harness';
import {paging} from '../../motion/uikit/paging';

const storybook = withStorybook(test);

const STEP_MS = paging.animatedScroll.durationMs;
/** `setContentOffset(_:animated:)`'s curve: ½ − ½ cos(πt). */
const sinusoid = (t: number) =>
  t >= STEP_MS ? 1 : 0.5 - 0.5 * Math.cos((Math.PI * Math.max(t, 0)) / STEP_MS);

interface OpenCalendar {
  driver: TouchDriver;
  sheet: Locator;
  viewport: Locator;
  track: Locator;
  title: Locator;
  width: number;
  center: {x: number; y: number};
}

const STORY = 'core-dateinput--bottom-sheet-calendar';

async function openCalendar(
  page: Page,
  {rtl = false}: {rtl?: boolean} = {},
): Promise<OpenCalendar> {
  if (rtl) {
    // The Storybook toolbar's direction global, as the URL sets it.
    await page.goto(
      `${storybook()}/iframe.html?id=${STORY}&viewMode=story&globals=direction:rtl`,
    );
    await page
      .locator('#storybook-root > *')
      .first()
      .waitFor({state: 'attached'});
    await page.evaluate(async () => document.fonts.ready);
  } else {
    await openStory(page, storybook(), STORY);
  }
  // Every touch as the page receives it, for the real-time cases' messages.
  await page.evaluate(() => {
    const log: [string, number][] = [];
    (window as unknown as {touchLog: typeof log}).touchLog = log;
    for (const type of ['touchstart', 'touchmove', 'touchend']) {
      window.addEventListener(
        type,
        event => log.push([type, event.timeStamp]),
        {capture: true, passive: true},
      );
    }
  });
  const driver = await touchDriver(page);
  const opener = page.getByRole('button', {name: /calendar/i}).first();
  const box = await opener.boundingBox();
  if (box == null) {
    throw new Error('no opener');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  const viewport = page.locator('[data-scroller="months"]');
  await expect(viewport).toBeVisible();
  // The sliding surface: the dialog element itself does not move.
  const sheet = page
    .getByRole('dialog')
    .locator('.astryx-bottom-sheet')
    .first();
  await waitForRest(sheet);
  const rect = await viewport.boundingBox();
  if (rect == null) {
    throw new Error('no viewport');
  }
  return {
    driver,
    sheet,
    viewport,
    track: page.locator('[data-month-track]'),
    title: page.locator('[data-title="month-year"]'),
    width: rect.width,
    center: {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2},
  };
}

/** The content offset in months: 0 at January in this story. */
async function monthsIn(viewport: Locator): Promise<number> {
  return viewport.evaluate(element => {
    const track = element.querySelector('[data-month-track]');
    if (track == null) {
      return NaN;
    }
    const offset =
      element.getBoundingClientRect().left - track.getBoundingClientRect().left;
    return offset / element.getBoundingClientRect().width;
  });
}

/** A drag that rests before the lift, so the release velocity is 0. */
function slowDrag(from: {x: number; y: number}, dx: number, dy = 0) {
  return drag(
    from,
    {x: from.x + dx, y: from.y + dy},
    {durationMs: 500, restMs: 150},
  );
}

test.describe('with a mouse', () => {
  test.use({hasTouch: false, isMobile: false});

  test('the calendar keeps today’s native scroller', async ({page}) => {
    await openStory(page, storybook(), STORY);
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    await page
      .getByRole('button', {name: /calendar/i})
      .first()
      .click();
    const viewport = page.locator('[data-scroller="months"]');
    await expect(viewport).toBeVisible();
    expect(await page.locator('[data-month-track]').count()).toBe(0);
    expect(
      await viewport.evaluate(
        element => getComputedStyle(element).scrollSnapType,
      ),
    ).toContain('mandatory');
  });
});

test('a slow release before half a month returns; past it, the next month', async ({
  page,
}) => {
  const {driver, viewport, track, title, width, center} =
    await openCalendar(page);
  expect(await monthsIn(viewport)).toBeCloseTo(9, 2);
  await expect(title).toHaveText('October 2026');

  // 30 % of a page (finger travel; the pan's hysteresis comes off it).
  await driver.play(slowDrag(center, -0.3 * width));
  await waitForRest(track);
  expect(await monthsIn(viewport), await lastGestureTiming(page)).toBeCloseTo(
    9,
    2,
  );
  await expect(title).toHaveText('October 2026');

  // 70 %: the next month.
  await driver.play(slowDrag(center, -0.7 * width));
  await waitForRest(track);
  expect(await monthsIn(viewport), await lastGestureTiming(page)).toBeCloseTo(
    10,
    2,
  );
  await expect(title).toHaveText('November 2026');
});

test('after the month and year wheels close, a drag past half a month still pages', async ({
  page,
}) => {
  const {driver, viewport, track, title, width, center} =
    await openCalendar(page);
  const toggle = page.getByRole('button', {name: /choose month and year/i});
  const wheels = page.locator('[data-panel="wheels"]');
  const tapToggle = async () => {
    const box = await toggle.boundingBox();
    if (box == null) {
      throw new Error('no month and year toggle');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  };
  await tapToggle();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  // Closing re-asserts the month shown, which the pager is already on.
  await tapToggle();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect
    .poll(async () =>
      wheels.evaluate(element => getComputedStyle(element).opacity),
    )
    .toBe('0');

  await driver.play(slowDrag(center, -0.7 * width));
  await waitForRest(track);
  expect(await monthsIn(viewport)).toBeCloseTo(10, 2);
  await expect(title).toHaveText('November 2026');
});

test('the title follows the drag, changing at half a month', async ({page}) => {
  const {driver, viewport, title, width, center} = await openCalendar(page);
  const script = slowDrag(center, -0.7 * width);
  const seen: {months: number; title: string}[] = [];
  await driver.play(script, {
    onEvent: async step => {
      if (step.type === 'touchMove') {
        seen.push({
          months: await monthsIn(viewport),
          title: (await title.textContent()) ?? '',
        });
      }
    },
  });
  const before = seen.filter(s => s.months < 9.45);
  const after = seen.filter(s => s.months > 9.55);
  expect(before.length).toBeGreaterThan(0);
  expect(after.length).toBeGreaterThan(0);
  // A move is reported a frame later than it is read, so judge each side
  // away from the crossing.
  expect(before.slice(0, -1).every(s => s.title === 'October 2026')).toBe(true);
  expect(after.slice(1).every(s => s.title === 'November 2026')).toBe(true);
});

test('a flick released before half a month turns the title as the settle crosses half, not at the lift', async ({
  page,
}) => {
  const {driver, track, title, center, width} = await openCalendar(page);
  await installTimerGate(page);
  // About a fifth of a month, fast: the release pages, short of half.
  await driver.play(
    flick(center, {
      velocity: {x: -0.2 * width * 12.5, y: 0},
      durationMs: 80,
      hz: 120,
    }),
  );
  // Hold the page's frames right after the lift: the title must not have
  // changed at the lift itself (UIDatePicker's title follows the content).
  await freezeTimers(page);
  await page.waitForTimeout(80);
  expect(await title.textContent()).toBe('October 2026');
  await thawTimers(page);
  await waitForRest(track);
  await expect(title, await lastGestureTiming(page)).toHaveText(
    'November 2026',
  );
});

test('a horizontal trackpad swipe pages one month per gesture', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === 'webkit',
    'Playwright cannot send wheel events to mobile WebKit',
  );
  const {track, title, center} = await openCalendar(page);
  await installTimerGate(page);
  await page.mouse.move(center.x, center.y);
  // One gesture: its momentum keeps sending wheel events. (The phone's
  // device pixel ratio of 3 divides the deltas the page sees.) A gesture ends
  // after 120 ms without a wheel event, on a timer; a trackpad sends its
  // momentum every frame, but the harness sends each event after a round
  // trip, and on a loaded machine those came more than 120 ms apart: the
  // burst read as two gestures and paged twice. The gated timers are held
  // through the burst, so its gaps cannot end it.
  await freezeTimers(page);
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(60, 0);
  }
  await thawTimers(page);
  await waitForRest(track);
  await expect(title).toHaveText('November 2026');
  // A new gesture, after a pause, pages again.
  await page.waitForTimeout(300);
  await page.mouse.wheel(150, 0);
  await waitForRest(track);
  await expect(title).toHaveText('December 2026');
});

test('a flick pages exactly one month', async ({page}) => {
  const {driver, viewport, track, title, center} = await openCalendar(page);
  await driver.play(
    flick(center, {velocity: {x: -2500, y: 0}, durationMs: 80, hz: 120}),
  );
  await waitForRest(track);
  expect(await monthsIn(viewport)).toBeCloseTo(10, 2);
  await expect(title).toHaveText('November 2026');
});

test('the arrow names the month at the tap and scrolls on the 0.3 s sinusoid', async ({
  page,
}) => {
  const {driver, viewport, track, title, width} = await openCalendar(page);
  await installTimerGate(page);
  const next = page.getByRole('button', {name: 'Next month'});
  const box = await next.boundingBox();
  if (box == null) {
    throw new Error('no arrow');
  }
  // Caught as it is created, so a late harness still samples the 0.3 s step
  // from its start: waited for and held from the harness instead, it had
  // ended on a loaded machine.
  const caught = await catchNextAnimation(track);
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  await caught();
  await expect(title).toHaveText('November 2026');
  const samples: {t: number; value: number}[] = [];
  for (const t of timeline(STEP_MS, 1000 / 60)) {
    samples.push({
      t,
      value: await seekCaught(page, t, 'trackX'),
    });
  }
  const start = samples[0].value;
  const end = samples[samples.length - 1].value;
  expect(Math.abs(end - start)).toBeCloseTo(width, 0);
  const progress = samples.map(({t, value}) => ({
    t,
    value: (value - start) / (end - start),
  }));
  const fit = compareCurve(progress, sinusoid, 0.02);
  await finishCaught(page);
  await thawTimers(page);
  expect(fit.pass, JSON.stringify(fit.worst)).toBe(true);
  await waitForRest(track);
  expect(await monthsIn(viewport)).toBeCloseTo(10, 2);
});

/** Taps a header arrow through the touch driver. */
async function tapArrow(
  page: Page,
  driver: TouchDriver,
  name: 'Next month' | 'Previous month',
) {
  const box = await page.getByRole('button', {name}).boundingBox();
  if (box == null) {
    throw new Error(`no ${name} arrow`);
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
}

test('an arrow tapped right after a release keeps the title on the month it named', async ({
  page,
}) => {
  // The release settles towards November; Next, tapped before that settle
  // ends, names December. The title goes October, November, December and
  // stays, instead of falling back to November while the content is still
  // nearest it.
  const {driver, title, track, center} = await openCalendar(page);
  await title.evaluate(element => {
    const seen: string[] = [element.textContent ?? ''];
    (window as unknown as {titles: string[]}).titles = seen;
    new MutationObserver(() => {
      const text = element.textContent ?? '';
      if (seen[seen.length - 1] !== text) {
        seen.push(text);
      }
    }).observe(element, {subtree: true, characterData: true, childList: true});
  });
  await driver.play(
    drag(center, {x: center.x - 260, y: center.y}, {durationMs: 200}),
  );
  await tapArrow(page, driver, 'Next month');
  await waitForRest(track);
  const titles = await page.evaluate(
    () => (window as unknown as {titles: string[]}).titles,
  );
  const order = ['October', 'November', 'December'];
  const months = titles.map(text =>
    order.findIndex(month => text.includes(month)),
  );
  expect(months.at(-1), titles.join(' → ')).toBe(2);
  for (let index = 1; index < months.length; index += 1) {
    expect(months[index], titles.join(' → ')).toBeGreaterThanOrEqual(
      months[index - 1],
    );
  }
});

/** The track's farthest offset in months, logged every frame from now. */
async function startOffsetLog(viewport: Locator) {
  await viewport.evaluate(element => {
    const log: number[] = [];
    (window as unknown as {offsets: number[]}).offsets = log;
    const track = element.querySelector('[data-month-track]');
    const t0 = performance.now();
    const tick = () => {
      if (track != null) {
        log.push(
          (element.getBoundingClientRect().left -
            track.getBoundingClientRect().left) /
            element.getBoundingClientRect().width,
        );
      }
      if (performance.now() - t0 < 2000) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
}

test('past the range’s last and first months the calendar rubber-bands, then returns', async ({
  page,
}) => {
  const {driver, viewport, track, title, width, center} =
    await openCalendar(page);
  // October to December, the story's last month.
  for (const month of ['November 2026', 'December 2026']) {
    await tapArrow(page, driver, 'Next month');
    await expect(title).toHaveText(month);
    await waitForRest(track);
  }
  expect(await monthsIn(viewport)).toBeCloseTo(11, 2);
  await startOffsetLog(viewport);
  await driver.play(slowDrag(center, -120));
  await waitForRest(track);
  let offsets = await page.evaluate(
    () => (window as unknown as {offsets: number[]}).offsets,
  );
  const past = (Math.max(...offsets) - 11) * width;
  // It gives under the finger, less than the finger moved, then comes back.
  expect(past).toBeGreaterThan(5);
  expect(past).toBeLessThan(0.6 * 120);
  expect(await monthsIn(viewport)).toBeCloseTo(11, 2);
  await expect(title).toHaveText('December 2026');

  // January, the first month, by PageUp from a focused day (a year back
  // would leave the range).
  const day = page.getByRole('button', {name: /December 15, 2026/});
  const dayBox = await day.boundingBox();
  if (dayBox == null) {
    throw new Error('no day');
  }
  await driver.tap({
    x: dayBox.x + dayBox.width / 2,
    y: dayBox.y + dayBox.height / 2,
  });
  for (let month = 0; month < 11; month += 1) {
    await page.keyboard.press('PageUp');
  }
  await expect(title).toHaveText('January 2026');
  await waitForRest(track);
  expect(await monthsIn(viewport)).toBeCloseTo(0, 2);
  await startOffsetLog(viewport);
  await driver.play(slowDrag(center, 120));
  await waitForRest(track);
  offsets = await page.evaluate(
    () => (window as unknown as {offsets: number[]}).offsets,
  );
  const before = -Math.min(...offsets) * width;
  expect(before).toBeGreaterThan(5);
  expect(before).toBeLessThan(0.6 * 120);
  expect(await monthsIn(viewport)).toBeCloseTo(0, 2);
  await expect(title).toHaveText('January 2026');
});

test('in RTL a drag to the right pages to the next month, and the arrows follow the reading direction', async ({
  page,
}) => {
  const {driver, track, title, width, center} = await openCalendar(page, {
    rtl: true,
  });
  await expect(page.locator('[dir="rtl"]').first()).toBeAttached();
  await expect(title).toHaveText('October 2026');
  // 70 % of a page toward the inline start's opposite: the next month.
  await driver.play(slowDrag(center, 0.7 * width));
  await waitForRest(track);
  await expect(title).toHaveText('November 2026');
  // And back the other way.
  await driver.play(slowDrag(center, -0.7 * width));
  await waitForRest(track);
  await expect(title).toHaveText('October 2026');
  await tapArrow(page, driver, 'Next month');
  await expect(title).toHaveText('November 2026');
  await waitForRest(track);
});

/** Every running animation under `root`: its animated properties and its duration. */
/**
 * Every running animation under `root`: its animated properties and its
 * active length, the time at which its last keyframe change lands (an
 * animation may hold its end value for the rest of its span).
 */
/**
 * The last gesture's touches as the page received them, for a real-time
 * case's failure message: WebKit's injected touches carry no timestamps, so
 * how they reached the page decides the release's velocity.
 *
 * Under a 3-CPU cap with 16 workers (a report-only profile), they reached the
 * page in bursts: up to 18 of a drag's 30 moves within 2 ms of the previous
 * one, with gaps of 60 to 100 ms between bursts. The release then reads a
 * velocity the script never gave: the slow release paged in 8 of 10 runs, the
 * fast flick stayed on its month in 5 of 10, and the fast 55° drag in the
 * sheet in 2 of 10. That is a limit of WebKit's real-time input. The required
 * CI WebKit profile, the same cap with 1 worker, and Chromium pass.
 */
async function lastGestureTiming(page: Page): Promise<string> {
  const log = await page.evaluate(
    () => (window as unknown as {touchLog: [string, number][]}).touchLog,
  );
  const start = log.map(([type]) => type).lastIndexOf('touchstart');
  const gesture = log.slice(Math.max(0, start));
  const moves = gesture
    .filter(([type]) => type === 'touchmove')
    .map(([, t]) => t);
  const end = gesture.find(([type]) => type === 'touchend')?.[1];
  const gaps = moves.slice(1).map((t, k) => t - moves[k]);
  return `last gesture as the page received it: ${moves.length} moves, longest gap ${Math.round(Math.max(0, ...gaps))} ms, ${gaps.filter(g => g <= 2).length} moves within 2 ms of the previous one, lift ${end == null || moves.length === 0 ? '?' : Math.round(end - moves[moves.length - 1])} ms after the last move`;
}

/**
 * Arms the page to catch the next animation created inside `root`: in the
 * task that creates it, the page holds the gated timers and pauses it (and
 * any created with it), so a harness that looks late still finds it at its
 * start. Armed (awaited) before the action, since an injected tap can reach
 * the page before a script sent ahead of it; the returned function waits for
 * the catch. Needs installTimerGate first. Seek the caught animations with
 * seekCaught; finish them with finishCaught.
 */
async function catchNextAnimation(root: Locator): Promise<() => Promise<void>> {
  await root.evaluate(element => {
    const w = window as unknown as {
      __harnessTimerGate?: {frozen: boolean};
      caughtAnimations?: Animation[];
      caughtDone?: Promise<void>;
    };
    const gate = w.__harnessTimerGate;
    if (gate == null) {
      throw new Error('catchNextAnimation: call installTimerGate first');
    }
    const caught: Animation[] = [];
    w.caughtAnimations = caught;
    w.caughtDone = new Promise<void>(resolve => {
      const original = Element.prototype.animate;
      Element.prototype.animate = function (
        this: Element,
        ...args: Parameters<Element['animate']>
      ) {
        const animation = original.apply(this, args);
        if (this === element || element.contains(this)) {
          animation.pause();
          caught.push(animation);
          if (!gate.frozen) {
            gate.frozen = true;
            // The rest of the task's animations, then the catch is done.
            queueMicrotask(() => {
              Element.prototype.animate = original;
              for (const other of element.getAnimations({subtree: true})) {
                if (!caught.includes(other)) {
                  other.pause();
                  caught.push(other);
                }
              }
              resolve();
            });
          }
        }
        return animation;
      };
    });
  });
  return async () => {
    await root
      .page()
      .evaluate(
        async () =>
          (window as unknown as {caughtDone: Promise<void>}).caughtDone,
      );
  };
}

/**
 * Seeks the caught animations to `t` ms and reads, in the page, the track's
 * translateX (`trackX`) or where the month grid rests in months (`months`).
 */
async function seekCaught(
  page: Page,
  t: number,
  measure: 'trackX' | 'months',
): Promise<number> {
  return page.evaluate(
    ({time, kind}) => {
      for (const animation of (
        window as unknown as {caughtAnimations: Animation[]}
      ).caughtAnimations) {
        animation.currentTime = time;
      }
      const viewport = document.querySelector('[data-scroller="months"]');
      const track = viewport?.querySelector('[data-month-track]');
      if (viewport == null || track == null) {
        return NaN;
      }
      const box = viewport.getBoundingClientRect();
      if (kind === 'trackX') {
        // The animator writes the individual `translate` property, which
        // `transform` does not include; the box shows both.
        return track.getBoundingClientRect().left - box.left;
      }
      return (box.left - track.getBoundingClientRect().left) / box.width;
    },
    {time: t, kind: measure},
  );
}

/**
 * When the caught animations' motion ends, ms: the last keyframe that
 * changes a value (a settle holds its end value for a long tail after).
 */
async function caughtMotionEnd(page: Page): Promise<number> {
  return page.evaluate(() => {
    let end = 0;
    for (const animation of (
      window as unknown as {caughtAnimations: Animation[]}
    ).caughtAnimations) {
      const effect = animation.effect as KeyframeEffect | null;
      if (effect == null) {
        continue;
      }
      const frames = effect.getKeyframes();
      const keys = (frame: ComputedKeyframe) =>
        Object.keys(frame).filter(
          key =>
            !['offset', 'easing', 'composite', 'computedOffset'].includes(key),
        );
      for (let index = 1; index < frames.length; index += 1) {
        if (
          keys(frames[index]).some(
            key => frames[index][key] !== frames[index - 1][key],
          )
        ) {
          end = Math.max(
            end,
            frames[index].computedOffset * Number(effect.getTiming().duration),
          );
        }
      }
    }
    return end;
  });
}

/** Finishes the caught animations, as their own end would have. */
async function finishCaught(page: Page): Promise<void> {
  await page.evaluate(() => {
    for (const animation of (
      window as unknown as {caughtAnimations: Animation[]}
    ).caughtAnimations) {
      animation.finish();
    }
  });
}

/**
 * Records, as they are created, the animations made inside `root`: what each
 * animates and when its last change lands, ms (a run holds its end value
 * after). Read at creation, a run that the animator cancels at its end (a
 * reduced-motion dip of 200 ms or less) is still read on a loaded machine,
 * where it had ended by the time the harness looked; the harness's watch
 * counts only runs that finished, not ones cancelled at their end.
 */
async function recordCreatedRuns(root: Locator): Promise<void> {
  await root.evaluate(element => {
    const runs: {properties: string[]; duration: number}[] = [];
    (window as unknown as {createdRuns: typeof runs}).createdRuns = runs;
    const original = Element.prototype.animate;
    Element.prototype.animate = function (
      this: Element,
      ...args: Parameters<Element['animate']>
    ) {
      const animation = original.apply(this, args);
      if (this === element || element.contains(this)) {
        const effect = animation.effect as KeyframeEffect;
        const frames = effect.getKeyframes();
        const keys = (frame: ComputedKeyframe) =>
          Object.keys(frame).filter(
            key =>
              !['offset', 'easing', 'composite', 'computedOffset'].includes(
                key,
              ),
          );
        const properties = [...new Set(frames.flatMap(keys))];
        let lastChange = 0;
        for (let index = 1; index < frames.length; index += 1) {
          if (
            properties.some(
              key => frames[index][key] !== frames[index - 1][key],
            )
          ) {
            lastChange = frames[index].computedOffset;
          }
        }
        runs.push({
          properties,
          duration: lastChange * Number(effect.getTiming().duration),
        });
      }
      return animation;
    };
  });
}

/**
 * Waits for the runs an action created inside the recorded root
 * (recordCreatedRuns), and takes them.
 */
async function takeCreatedRuns(
  page: Page,
): Promise<{properties: string[]; duration: number}[]> {
  return page.evaluate(
    async () =>
      new Promise<{properties: string[]; duration: number}[]>(resolve => {
        const runs = (
          window as unknown as {
            createdRuns: {properties: string[]; duration: number}[];
          }
        ).createdRuns;
        const check = () => {
          if (runs.length > 0) {
            resolve(runs.splice(0));
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      }),
  );
}

test('Reduced Motion: a release and the arrow step change the month through an opacity dip, without travel', async ({
  page,
}) => {
  // design:reduced-motion DR2: a transition a touch release or a tap starts
  // changes opacity only, in at most 200 ms. The settle and the step come
  // from usePager's animator default (C23's #8146 on F1's #8076).
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver, viewport, title, width, center} = await openCalendar(page);
  // Read as each run is created (recordCreatedRuns), so a dip of 200 ms or
  // less that has ended by the time a loaded machine's harness looks is still
  // read, and present: read after the fact, the step's dip had ended.
  await recordCreatedRuns(viewport);
  await driver.play(slowDrag(center, -0.7 * width));
  const settle = await takeCreatedRuns(page);
  expect(settle.length).toBeGreaterThan(0);
  for (const animation of settle) {
    expect(animation.properties).toEqual(['opacity']);
    expect(animation.duration).toBeLessThanOrEqual(200);
  }
  await expect(title).toHaveText('November 2026');
  await page.waitForTimeout(400);
  expect(await monthsIn(viewport)).toBeCloseTo(10, 2);
  await tapArrow(page, driver, 'Next month');
  const step = await takeCreatedRuns(page);
  expect(step.length).toBeGreaterThan(0);
  for (const animation of step) {
    expect(animation.properties).toEqual(['opacity']);
    expect(animation.duration).toBeLessThanOrEqual(200);
  }
  await expect(title).toHaveText('December 2026');
  await page.waitForTimeout(400);
  expect(await monthsIn(viewport)).toBeCloseTo(11, 2);
});

test('a second tap mid-scroll goes on to the month after', async ({page}) => {
  const {driver, viewport, track, title} = await openCalendar(page);
  const next = page.getByRole('button', {name: 'Next month'});
  const box = await next.boundingBox();
  if (box == null) {
    throw new Error('no arrow');
  }
  const at = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  await driver.tap(at);
  await page.waitForTimeout(120);
  await driver.tap(at);
  await expect(title).toHaveText('December 2026');
  await waitForRest(track);
  expect(await monthsIn(viewport)).toBeCloseTo(11, 2);
});

/** The busy proof's step speed: a quarter, so its whole block lies inside the step. */
const STEP_RATE = 0.25;
/** The busy proof's block, ms. */
const BLOCK_MS = 800;

test('the arrow step keeps advancing every frame through a blocked main thread', async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName === 'webkit',
    "WebKit's screencast clock is not the page's (frames arrive ~100 ms off), so a 0.3 s motion cannot be placed inside the block; Mobile Safari on the iOS simulator is this proof's WebKit evidence",
  );
  await openCalendar(page);
  // The incoming month, whose chip shows as soon as its edge slides in.
  const incoming = page.getByRole('grid', {name: 'November 2026'});
  await markElement(incoming, {inset: 8});
  const cast = await startScreencast(page);
  // When the compositor presented each frame: a frame the screencast skipped
  // while the compositor presented it is a recorder skip, not a stall (on a
  // loaded machine the screencast skipped up to 139 ms of frames the
  // compositor presented, every one of them moved).
  const compositor = await startCompositorTrace(page);
  await page.waitForTimeout(300);
  // The page waits for the step to run 32 ms, then blocks the main thread
  // from a task after that frame's rendering update (blockMainThread), armed
  // before the tap. The step is slowed to a quarter of its speed as it
  // starts, from the page: at full speed the 0.3 s step left 110 to 125 ms of
  // itself inside the block, too few frames to judge once a loaded machine's
  // screencast delivered one every 30 ms; slowed, the whole block lies inside
  // it. Blocked from a timer 90 ms after the tap instead, the block began
  // mid-frame, and on a loaded machine nothing was presented for 66 to 189 ms
  // at its start. The step's own 0.3 s and its curve are other cases'
  // proofs.
  const blocked = blockMainThread(page, BLOCK_MS, {
    during: page.locator('[data-month-track]'),
    minProgressMs: 32,
  });
  const started = await page.evaluate(rate => {
    document
      .querySelector<HTMLButtonElement>('button[aria-label="Next month"]')
      ?.click();
    for (const animation of document.getAnimations()) {
      const target = (animation.effect as KeyframeEffect | null)?.target;
      if (target?.querySelector('[role="grid"]') != null) {
        animation.playbackRate = rate;
      }
    }
    return performance.timeOrigin + performance.now();
  }, STEP_RATE);
  const busy = await blocked;
  // Past the step's end, so the last frames show where it rests.
  await page.waitForTimeout(STEP_MS / STEP_RATE);
  const presented = await compositor.stop();
  const tracked = await trackMarker(page, await cast.stop());
  const spanned = {
    ...busy,
    to: Math.min(busy.to, started + STEP_MS / STEP_RATE),
  };
  expect(spanned.to - spanned.from).toBeGreaterThan(BLOCK_MS - 100);
  const proof = busyWindowProof(tracked, spanned, {
    axis: 'x',
    settledWithin: 1,
    presented,
  });
  await writeEvidence(
    'busy-main-thread/month-pager-arrow-step',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {
          busy,
          proof,
          frames: tracked.map(f => ({
            t: +(f.t - started).toFixed(1),
            x: f.box?.x ?? null,
          })),
        },
        null,
        1,
      ),
    },
    testInfo,
  );
  testInfo.annotations.push({
    type: 'busy-main-thread',
    description: proof.summary,
  });
  expect(proof.verdict.failures, proof.summary).toEqual([]);
});

/**
 * UIKit's split in a sheet (motion/MEASUREMENTS.md M-DP01): a drag on the
 * grid is decided on the first move where either axis has travelled 10 px,
 * the grid's when its sideways travel has reached 10 px there and the
 * sheet's otherwise. At 60 Hz a slow drag steps a few px per move, so its
 * angle decides; a fast one's first move can land 10 px sideways however
 * steep it is.
 */
test('in the sheet, a drag is decided once it has moved 10 px either way: slow 35° and fast 55° drags are the grid’s, a slow 60° drag the sheet’s', async ({
  page,
}) => {
  const {driver, sheet, viewport, track, center} = await openCalendar(page);
  const sheetTop = async () =>
    sheet.evaluate(el => el.getBoundingClientRect().y);
  const topBefore = await sheetTop();
  const along = (degrees: number, length: number) => ({
    x: center.x - length * Math.cos((degrees * Math.PI) / 180),
    y: center.y + length * Math.sin((degrees * Math.PI) / 180),
  });
  /**
   * Plays `script`, recording the sheet's drop and the grid's offset in the
   * page on every frame from the touch to a frame after the lift. Sampled
   * from the harness after each move instead, the round trips delayed the
   * next event in real time (WebKit's injected touches carry no timestamps),
   * and on a loaded machine the lift came more than the 40 ms stillness
   * interval after the last move, so the fast flick released at 0 px/s.
   */
  const play = async (script: Parameters<typeof driver.play>[0]) => {
    await page.evaluate(
      ([element, sheetElement, top]) => {
        if (element == null || sheetElement == null) {
          throw new Error('no month scroller or sheet');
        }
        const seen = {sheetDrop: 0, monthsMin: Infinity, monthsMax: -Infinity};
        const record = () => {
          seen.sheetDrop = Math.max(
            seen.sheetDrop,
            Math.abs(sheetElement.getBoundingClientRect().y - top),
          );
          const track = element.querySelector('[data-month-track]');
          if (track != null) {
            const box = element.getBoundingClientRect();
            const months =
              (box.left - track.getBoundingClientRect().left) / box.width;
            seen.monthsMin = Math.min(seen.monthsMin, months);
            seen.monthsMax = Math.max(seen.monthsMax, months);
          }
        };
        let touching = false;
        let frame = 0;
        const tick = () => {
          record();
          frame = touching ? requestAnimationFrame(tick) : 0;
        };
        const options = {capture: true, passive: true};
        const onStart = () => {
          touching = true;
          frame ||= requestAnimationFrame(tick);
        };
        // One more frame after the lift, with its effect applied.
        const onEnd = () => {
          touching = false;
        };
        window.addEventListener('touchstart', onStart, options);
        window.addEventListener('touchend', onEnd, options);
        (window as unknown as {dragSeen: () => typeof seen}).dragSeen = () => {
          window.removeEventListener('touchstart', onStart, options);
          window.removeEventListener('touchend', onEnd, options);
          cancelAnimationFrame(frame);
          return seen;
        };
      },
      [
        await viewport.elementHandle(),
        await sheet.elementHandle(),
        topBefore,
      ] as const,
    );
    await driver.play(script);
    // The frame after the lift has run.
    await page.evaluate(
      () => new Promise(resolve => requestAnimationFrame(() => resolve(null))),
    );
    return page.evaluate(() =>
      (
        window as unknown as {
          dragSeen: () => {
            sheetDrop: number;
            monthsMin: number;
            monthsMax: number;
          };
        }
      ).dragSeen(),
    );
  };

  // 35°, slow (4 px steps): the sideways travel reaches 10 px first. The
  // grid follows the finger, the sheet stays, and the slow release settles
  // back on September.
  const shallow = await play(
    drag(center, along(35, 145), {durationMs: 500, restMs: 150}),
  );
  expect(shallow.sheetDrop).toBeLessThan(1);
  expect(shallow.monthsMax - 9).toBeGreaterThan(0.2);
  await waitForRest(track);
  expect(await monthsIn(viewport), await lastGestureTiming(page)).toBeCloseTo(
    9,
    2,
  );

  // 55°, fast (25 px steps, ~1500 px/s): the first move lands 14 px
  // sideways, so the grid takes the drag and the flick pages to October;
  // the sheet never moves.
  const fast = await play(drag(center, along(55, 150), {durationMs: 100}));
  expect(fast.sheetDrop).toBeLessThan(1);
  await waitForRest(track);
  expect(await monthsIn(viewport), await lastGestureTiming(page)).toBeCloseTo(
    10,
    2,
  );

  // 60°, slow (3.3 px steps): the vertical travel reaches 10 px first, so
  // the sheet takes the drag and the grid never moves.
  const steep = await play(
    drag(center, along(60, 120), {durationMs: 600, restMs: 150}),
  );
  expect(steep.sheetDrop).toBeGreaterThan(20);
  expect(steep.monthsMax - steep.monthsMin).toBeLessThan(0.01);
  // On October throughout the sheet's drag. What the sheet does on the
  // release is its own: read after it, WebKit's real-time pacing could close
  // up the rest before the lift on a loaded machine, and the sheet then took
  // the release as a fling and closed.
  expect(steep.monthsMin).toBeCloseTo(10, 2);
});

test(
  'storyboard: the arrow step',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, viewport, track} = await openCalendar(page);
    await installTimerGate(page);
    const next = page.getByRole('button', {name: 'Next month'});
    const box = await next.boundingBox();
    if (box == null) {
      throw new Error('no arrow');
    }
    const caught = await catchNextAnimation(track);
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await caught();
    const storyboard = new Storyboard(page, {
      name: 'month-pager-arrow-step',
      clip: viewport,
      columns: 6,
      cellScale: 0.4,
    });
    for (const t of timeline(STEP_MS, 1000 / 30)) {
      const months = await seekCaught(page, t, 'months');
      await storyboard.capture(`t=${+t.toFixed(1)} ms`, t, {
        months: +months.toFixed(3),
      });
    }
    await storyboard.write(testInfo);
    await finishCaught(page);
    await thawTimers(page);
  },
);

test(
  'storyboard: a release past half a month settles on the next',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, viewport, track, width, center} = await openCalendar(page);
    await installTimerGate(page);
    const caught = await catchNextAnimation(track);
    await driver.play(slowDrag(center, -0.7 * width));
    await caught();
    const storyboard = new Storyboard(page, {
      name: 'month-pager-release-settle',
      clip: viewport,
      columns: 6,
      cellScale: 0.4,
    });
    for (const t of timeline(await caughtMotionEnd(page), 1000 / 60)) {
      const months = await seekCaught(page, t, 'months');
      await storyboard.capture(`t=${+t.toFixed(1)} ms`, t, {
        months: +months.toFixed(3),
      });
    }
    await storyboard.write(testInfo);
    await finishCaught(page);
    await thawTimers(page);
  },
);
