// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzC08MoveCost.interaction.browser.spec.ts (NOT FOR LANDING)
 * @input Carousel's three-up snap paging story in paging mode, harness touch
 *   flicks and a press, a per-frame sampler and a record of each button
 *   change
 * @output Proves the edge scroll buttons follow the row as shown while snap
 *   paging holds it. Each button comes back within two frames of the row
 *   leaving its edge, no later than the settle's hand-back. After a press on
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

/**
 * An edge button's change, whether the paging held the row then, and the
 * observer batch it came in: one batch per task.
 */
interface Flip {
  readonly button: 'start' | 'end';
  readonly disabled: boolean;
  readonly held: boolean;
  readonly batch: number;
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


// NOT FOR LANDING: the page's own handler time per touch and pointer event
// during a drag on the snap paging row, at 1x and 4x CPU.
type Ev = {name: string; ts: number; dur?: number; tdur?: number; pid: number; tid: number; ph: string; args?: Record<string, unknown>};
for (const rate of [1, 4]) {
  test(`handler time per move (${rate}x)`, async ({page}) => {
    const {scroller} = await open(page);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', {rate});
    const events: Ev[] = [];
    cdp.on('Tracing.dataCollected', ({value}) => { events.push(...(value as unknown as Ev[])); });
    const complete = new Promise<void>(r => cdp.once('Tracing.tracingComplete', () => r()));
    await cdp.send('Tracing.start', {transferMode: 'ReportEvents', traceConfig: {includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'blink.user_timing', 'toplevel'], excludedCategories: ['*']}});
    await page.evaluate(() => performance.mark('zz-start'));
    const box = await scroller.boundingBox();
    if (box == null) throw new Error('no box');
    const y = box.y + box.height / 2;
    const from = {x: box.x + box.width * 0.7, y};
    const to = {x: box.x + box.width * 0.3, y};
    const driver = await touchDriver(page);
    // A slow drag: many moves, the finger kept down.
    await driver.play(drag(from, to, {durationMs: 600}));
    await page.waitForTimeout(800);
    await page.evaluate(() => performance.mark('zz-end'));
    await cdp.send('Tracing.end');
    await complete;
    await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
    const mark = events.find(e => e.name === 'zz-start');
    if (mark == null) throw new Error('no mark');
    const main = events.filter(e => e.pid === mark.pid && e.tid === mark.tid && e.ph === 'X');
    const dispatches = main.filter(e => e.name === 'EventDispatch');
    const by: Record<string, {n: number; wall: number[]; thread: number[]; layouts: number; styles: number}> = {};
    for (const d of dispatches) {
      const type = String((d.args?.data as {type?: unknown} | undefined)?.type ?? '?');
      if (!/^(touch|pointer)/.test(type)) continue;
      const end = d.ts + (d.dur ?? 0);
      const inside = main.filter(e => e !== d && e.ts >= d.ts && e.ts <= end);
      const slot = (by[type] ??= {n: 0, wall: [], thread: [], layouts: 0, styles: 0});
      slot.n += 1;
      slot.wall.push((d.dur ?? 0) / 1000);
      slot.thread.push(((d.tdur ?? d.dur) ?? 0) / 1000);
      slot.layouts += inside.filter(e => e.name === 'Layout').length;
      slot.styles += inside.filter(e => e.name === 'UpdateLayoutTree').length;
    }
    const q = (xs: number[], p: number) => { const s = [...xs].sort((a, b) => a - b); return Math.round((s[Math.min(s.length - 1, Math.floor(p * (s.length - 1)))] ?? 0) * 100) / 100; };
    const out = Object.fromEntries(Object.entries(by).map(([type, v]) => [type, {n: v.n, wallMed: q(v.wall, 0.5), wallP90: q(v.wall, 0.9), wallMax: q(v.wall, 1), threadMed: q(v.thread, 0.5), threadMax: q(v.thread, 1), layouts: v.layouts, styleRecalcs: v.styles}]));
    // Per-frame tasks with page script during the drag.
    const tasks = main.filter(e => e.name === 'RunTask' || e.name === 'ThreadControllerImpl::RunTask');
    const longest = Math.round(Math.max(0, ...tasks.filter(t => t.ts >= mark.ts).map(t => (t.dur ?? 0) / 1000)) * 10) / 10;
    console.log(`MOVECOST ${rate}x ${JSON.stringify({out, longestTaskMs: longest})}`);
  });
}
