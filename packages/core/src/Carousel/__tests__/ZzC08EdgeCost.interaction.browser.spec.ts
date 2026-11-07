// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzC08EdgeCost.interaction.browser.spec.ts (NOT FOR LANDING)
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


// NOT FOR LANDING: the main-thread time of the frame the start button changes
// in, after a press on the end button, at 1x and 4x CPU.
type Ev = {name: string; ts: number; dur?: number; pid: number; tid: number; ph: string; args?: Record<string, unknown>};
for (const rate of [1, 4]) {
  test(`cost of the leave frame (${rate}x)`, async ({page}) => {
    const {scroller, start, end} = await open(page);
    await expect(start).toBeDisabled();
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', {rate});
    await start.evaluate(button => {
      new MutationObserver(() => {
        if (button.getAttribute('aria-disabled') !== 'true') performance.mark('zz-flip');
      }).observe(button, {attributeFilter: ['aria-disabled']});
    });
    const events: Ev[] = [];
    cdp.on('Tracing.dataCollected', ({value}) => { events.push(...(value as unknown as Ev[])); });
    const complete = new Promise<void>(r => cdp.once('Tracing.tracingComplete', () => r()));
    await cdp.send('Tracing.start', {transferMode: 'ReportEvents', traceConfig: {includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'blink.user_timing', 'toplevel'], excludedCategories: ['*']}});
    await page.evaluate(() => performance.mark('zz-start'));
    await end.click();
    await settled(scroller);
    await page.waitForTimeout(100);
    await cdp.send('Tracing.end');
    await complete;
    await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
    await cdp.detach();
    const flip = events.find(e => e.name === 'zz-flip');
    const mark = events.find(e => e.name === 'zz-start');
    if (flip == null || mark == null) throw new Error('no flip');
    const main = events.filter(e => e.pid === mark.pid && e.tid === mark.tid && e.ph === 'X');
    const tasks = main.filter(e => e.name === 'RunTask' || e.name === 'ThreadControllerImpl::RunTask');
    const task = tasks.find(t => t.ts <= flip.ts && t.ts + (t.dur ?? 0) >= flip.ts);
    const frames = main.filter(e => e.name === 'BeginMainThreadFrame' || e.name === 'AnimationFrame' || e.name === 'FireAnimationFrame').map(e => e.ts).sort((a, b) => a - b);
    const frameStart = [...frames].reverse().find(t => t <= flip.ts) ?? flip.ts;
    const frameEnd = frames.find(t => t > flip.ts) ?? flip.ts + 16700;
    const busy = tasks.filter(t => t.ts >= frameStart && t.ts < frameEnd).reduce((sum, t) => sum + (t.dur ?? 0), 0);
    const renders = main.filter(e => e.name === 'FunctionCall' && e.ts >= mark.ts).length;
    const inside: Record<string, number> = {};
    if (task != null) {
      for (const e of main) {
        if (e === task || e.ts < task.ts || e.ts > task.ts + (task.dur ?? 0)) continue;
        if (['FunctionCall', 'UpdateLayoutTree', 'Layout', 'FireAnimationFrame', 'TimerFire', 'EventDispatch', 'RunMicrotasks', 'v8.run', 'MajorGC', 'MinorGC', 'V8.GC_SCAVENGER', 'Paint', 'PrePaint', 'HitTest'].includes(e.name)) {
          inside[e.name] = Math.round(((inside[e.name] ?? 0) + (e.dur ?? 0) / 1000) * 10) / 10;
        }
      }
    }
    console.log(`COST ${rate}x ${JSON.stringify({flipTaskMs: task == null ? null : Math.round((task.dur ?? 0) / 100) / 10, inside})}`);
  });
}
