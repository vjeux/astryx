// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzLiftProfile.interaction.browser.spec.ts (NOT FOR LANDING)
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


// NOT FOR LANDING: a CPU profile of a drag and its lift at 4x, split into the
// takeover move and the lift by the trace's event dispatches.
type Ev = {name: string; ts: number; dur?: number; pid: number; tid: number; ph: string; args?: Record<string, unknown>};
test('profile of the takeover and the lift (4x)', async ({page}) => {
  const {scroller} = await open(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', {rate: 4});
  await cdp.send('Profiler.enable');
  await cdp.send('Profiler.setSamplingInterval', {interval: 50});
  const events: Ev[] = [];
  cdp.on('Tracing.dataCollected', ({value}) => { events.push(...(value as unknown as Ev[])); });
  const complete = new Promise<void>(r => cdp.once('Tracing.tracingComplete', () => r()));
  await cdp.send('Tracing.start', {transferMode: 'ReportEvents', traceConfig: {includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'blink.user_timing', 'toplevel'], excludedCategories: ['*']}});
  await page.evaluate(() => performance.mark('zz-start'));
  await cdp.send('Profiler.start');
  const box = await scroller.boundingBox();
  if (box == null) throw new Error('no box');
  const y = box.y + box.height / 2;
  const driver = await touchDriver(page);
  await driver.play(drag({x: box.x + box.width * 0.7, y}, {x: box.x + box.width * 0.45, y}, {durationMs: 160}));
  await page.waitForTimeout(900);
  const {profile} = await cdp.send('Profiler.stop');
  await cdp.send('Tracing.end');
  await complete;
  await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
  const mark = events.find(e => e.name === 'zz-start');
  if (mark == null) throw new Error('no mark');
  const main = events.filter(e => e.pid === mark.pid && e.tid === mark.tid && e.ph === 'X');
  const dispatch = main.filter(e => e.name === 'EventDispatch');
  const typeOf = (e: Ev) => String((e.args?.data as {type?: unknown} | undefined)?.type ?? '?');
  const lift = dispatch.filter(e => typeOf(e) === 'touchend').sort((a, b) => (b.dur ?? 0) - (a.dur ?? 0))[0];
  const take = dispatch.filter(e => typeOf(e) === 'pointermove').sort((a, b) => (b.dur ?? 0) - (a.dur ?? 0))[0];
  const byId = new Map(profile.nodes.map(n => [n.id, n]));
  const parent = new Map<number, number>();
  for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
  let t = profile.startTime;
  const stamps = (profile.timeDeltas ?? []).map(d => (t += d));
  const bucketOf = (id: number) => {
    // Walk up for the first frame whose script tells the module.
    let cur: number | undefined = id; const names: string[] = [];
    while (cur != null) { const n = byId.get(cur); if (n == null) break; const f = n.callFrame; const file = String(f.url).split('/').pop() ?? ''; names.push(`${f.functionName}@${file}`); cur = parent.get(cur); }
    const self = byId.get(id)?.callFrame; const selfFile = String(self?.url ?? '').split('/').pop() ?? '';
    const native = self?.url === '' ? self?.functionName : null;
    const stack = names.join(' < ');
    const area = /client-|react-dom/.test(stack) && /performWork|commitRoot|renderRoot|beginWork|flushSync/.test(stack) ? 'react render' : /animator-/.test(stack) ? 'motion engine' : /snapPaging|SnapPaging|pager|scrollView/.test(stack) ? 'paging' : /gestures|gesture/.test(stack) ? 'gestures' : 'other';
    return {area, self: native ? `native ${native}` : `${self?.functionName || '(anon)'}@${selfFile}:${self?.lineNumber}:${self?.columnNumber}`};
  };
  const split = (win: Ev | undefined, label: string) => {
    if (win == null) return {label, none: true};
    const from = win.ts, to = win.ts + (win.dur ?? 0);
    const areas: Record<string, number> = {}; const selfs = new Map<string, number>();
    (profile.samples ?? []).forEach((id, k) => {
      const ts = stamps[k]; if (ts < from || ts > to) return;
      const ms = ((profile.timeDeltas ?? [])[k] ?? 0) / 1000;
      const {area, self} = bucketOf(id);
      if (self.startsWith('(idle)') || self.startsWith('(program)') || self.startsWith('(garbage')) { areas[self.split('@')[0]] = (areas[self.split('@')[0]] ?? 0) + ms; return; }
      areas[area] = (areas[area] ?? 0) + ms;
      selfs.set(`${area}: ${self}`, (selfs.get(`${area}: ${self}`) ?? 0) + ms);
    });
    const inside = main.filter(e => e.ts >= from && e.ts <= to);
    return {label, ms: Math.round((win.dur ?? 0) / 100) / 10, areas: Object.fromEntries(Object.entries(areas).map(([k, v]) => [k, Math.round(v * 10) / 10])), styleRecalcs: inside.filter(e => e.name === 'UpdateLayoutTree').length, layouts: inside.filter(e => e.name === 'Layout').length, top: [...selfs].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([n, v]) => `${Math.round(v * 10) / 10} ${n}`)};
  };
  console.log('LIFTPROFILE ' + JSON.stringify([split(take, 'takeover move'), split(lift, 'lift')]));
});
