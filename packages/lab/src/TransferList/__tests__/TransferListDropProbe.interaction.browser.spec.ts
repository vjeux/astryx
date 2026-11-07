// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: a measurement probe. Every frame after a TransferList
// reorder drop: each selected row's box, transform and animations, and a
// trace of what invalidated layout and style.

import {test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const STORIES = [
  {id: 'lab-transferlist--searchable', opens: false},
  {id: 'lab-transferlistselector--large-pool', opens: true},
];
const FRAMES = 45;

interface Sample {
  t: number;
  rows: Record<string, {top: number; height: number; transform: string; anims: string[]}>;
  docAnims: string[];
  listScroll: number;
}

async function arm(page: Page) {
  await page.evaluate(FRAMES => {
    const rec: {samples: Sample[]; dropAt: number | null} = {samples: [], dropAt: null};
    (window as unknown as {__probe: typeof rec}).__probe = rec;
    const describe = (a: Animation) => {
      const target = (a.effect as KeyframeEffect | null)?.target as Element | null;
      const name =
        (a as CSSTransition).transitionProperty ??
        (a as CSSAnimation).animationName ??
        (a.effect as KeyframeEffect | null)?.getKeyframes().map(k => Object.keys(k).filter(x => !['offset', 'easing', 'composite', 'computedOffset'].includes(x)).join('+')).join('|');
      const where = target
        ? `${target.tagName.toLowerCase()}${target.getAttribute('data-transfer-list-row') ? `[row=${target.getAttribute('data-transfer-list-row')}]` : ''}${(target as HTMLElement).className && typeof (target as HTMLElement).className === 'string' ? '.' + (target as HTMLElement).className.split(' ')[0] : ''}`
        : '?';
      return `${a.constructor.name}:${name}@${where}:${a.playState}`;
    };
    const sample = () => {
      const rows: Sample['rows'] = {};
      const list = document.querySelector('[data-transfer-list-row]')?.parentElement ?? null;
      const listTop = list?.getBoundingClientRect().top ?? 0;
      let scroller: Element | null = list;
      while (scroller && !/auto|scroll/.test(getComputedStyle(scroller).overflowY)) scroller = scroller.parentElement;
      for (const row of document.querySelectorAll<HTMLElement>('[data-transfer-list-row]')) {
        const value = row.getAttribute('data-transfer-list-row');
        if (!value) continue;
        const r = row.getBoundingClientRect();
        rows[value] = {
          top: Math.round((r.top - listTop) * 1000) / 1000,
          height: Math.round(r.height * 1000) / 1000,
          transform: `${getComputedStyle(row).transform}|${getComputedStyle(row).translate}`,
          anims: row.getAnimations({subtree: true}).map(describe),
        };
      }
      rec.samples.push({
        t: performance.now() - (rec.dropAt ?? performance.now()),
        rows,
        docAnims: document.getAnimations().filter(a => a.playState === 'running').map(describe),
        listScroll: scroller?.scrollTop ?? -1,
      });
    };
    addEventListener(
      'pointerup',
      () => {
        rec.dropAt = performance.now();
        console.timeStamp('probe-drop');
        sample();
        let n = 0;
        const tick = () => {
          sample();
          console.timeStamp(`probe-frame-${++n}`);
          if (n < FRAMES) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      {capture: true, once: true},
    );
  }, FRAMES);
}

async function boxOf(page: Page, selector: string) {
  const box = await page.locator(selector).first().boundingBox();
  if (box == null) throw new Error(`no box for ${selector}`);
  return box;
}

const MOVES = [
  {name: 'last-to-top', from: 'field-12', to: 'field-1', edge: 'top' as const},
  {name: 'top-to-last', from: 'field-1', to: 'field-12', edge: 'bottom' as const},
];

for (const story of STORIES) {
for (const move of MOVES) {
  for (const input of ['touch', 'mouse'] as const) {
    test(`probe ${story.id} ${move.name} ${input}`, async ({page, browserName}) => {
      await openStory(page, storybook(), story.id);
      if (story.opens) {
        await page.getByText(/12 report fields/).first().click();
        await page.locator('[data-transfer-list-row="field-12"]').first().waitFor();
        await page.waitForTimeout(800);
      }
      const grip = await boxOf(page, `[data-transfer-list-row="${move.from}"] button[aria-pressed]`);
      const target = await boxOf(page, `[data-transfer-list-row="${move.to}"]`);
      const from = {x: grip.x + grip.width / 2, y: grip.y + grip.height / 2};
      const to = {
        x: from.x,
        y: move.edge === 'top' ? target.y + 4 : target.y + target.height - 4,
      };
      const order = async () =>
        page.$$eval('[data-transfer-list-row]', rows =>
          rows.map(r => r.getAttribute('data-transfer-list-row')).filter(Boolean).join(','),
        );
      const before = await order();
      let cdp = null as Awaited<ReturnType<ReturnType<Page['context']>['newCDPSession']>> | null;
      const events: {name: string; ts: number; dur?: number; ph?: string; args?: any}[] = [];
      let done: Promise<unknown> | null = null;
      if (browserName === 'chromium') {
        cdp = await page.context().newCDPSession(page);
        cdp.on('Tracing.dataCollected', e => events.push(...(e.value as typeof events)));
        done = new Promise(resolve => cdp!.once('Tracing.tracingComplete', resolve));
        await cdp.send('Tracing.start', {
          traceConfig: {
            includedCategories: [
              'devtools.timeline',
              'disabled-by-default-devtools.timeline',
              'disabled-by-default-devtools.timeline.stack',
            ],
          },
          transferMode: 'ReportEvents',
        });
      }
      await arm(page);
      if (input === 'touch') {
        const driver = await touchDriver(page);
        await driver.play(drag(from, to, {durationMs: 600, hz: 60, holdMs: 0, restMs: 120}));
      } else {
        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        for (let k = 1; k <= 36; k++) {
          await page.mouse.move(from.x, from.y + ((to.y - from.y) * k) / 36);
          await page.waitForTimeout(16);
        }
        await page.waitForTimeout(120);
        await page.mouse.up();
      }
      await page.waitForTimeout(FRAMES * 17 + 300);
      const rec = await page.evaluate(
        () => (window as unknown as {__probe: {samples: Sample[]; dropAt: number | null}}).__probe,
      );
      const after = await order();
      if (cdp) {
        await cdp.send('Tracing.end');
        await done;
      }
      // Rows whose top differs from their final top in any post-drop frame.
      const last = rec.samples[rec.samples.length - 1];
      const off: Record<string, {frame: number; t: number; dy: number}[]> = {};
      rec.samples.forEach((s, k) => {
        for (const [value, row] of Object.entries(s.rows)) {
          const fin = last.rows[value];
          if (fin && Math.abs(row.top - fin.top) > 0.01) (off[value] ??= []).push({frame: k, t: Math.round(s.t), dy: Math.round((row.top - fin.top) * 1000) / 1000});
        }
      });
      const firstAnims = rec.samples.slice(0, 20).map((s, k) => `${k}:${s.docAnims.length ? s.docAnims.join(';') : '-'}`);
      const scrolls = [...new Set(rec.samples.map(s => s.listScroll))];
      // Trace: what invalidated layout and style after the drop.
      let traceSummary: unknown = null;
      if (events.length) {
        const drop = events.find(e => e.name === 'TimeStamp' && e.args?.data?.message === 'probe-drop');
        const t0 = drop?.ts ?? 0;
        const frameMarks = events.filter(e => e.name === 'TimeStamp' && /^probe-frame-/.test(e.args?.data?.message ?? '')).map(e => ({n: Number(e.args.data.message.slice(12)), ms: Math.round((e.ts - t0) / 100) / 10}));
        const interesting = events
          .filter(e => e.ts >= t0 && ['InvalidateLayout', 'ScheduleStyleRecalculation', 'Layout', 'UpdateLayoutTree', 'StyleRecalcInvalidationTracking', 'LayoutInvalidationTracking', 'ScrollLayer', 'UpdateLayer'].includes(e.name))
          .map(e => {
            const st = e.args?.data?.stackTrace ?? e.args?.beginData?.stackTrace ?? e.args?.data?.stack;
            const top = Array.isArray(st) ? st.slice(0, 3).map((f: any) => `${f.functionName || '(anon)'}@${(f.url || '').split('/').pop()}:${f.lineNumber}`).join(' < ') : '';
            return `${Math.round((e.ts - t0) / 100) / 10}ms ${e.name}${e.args?.data?.reason ? ` reason=${e.args.data.reason}` : ''}${e.args?.data?.nodeName ? ` node=${e.args.data.nodeName}` : ''}${top ? ` <- ${top}` : ''}`;
          });
        traceSummary = {frameMarks: frameMarks.slice(0, 25), interesting: interesting.slice(0, 120)};
      }
      console.log(`PROBEDATA ${JSON.stringify({engine: browserName, story: story.id, move: move.name, input, before, after, frames: rec.samples.length, off, scrolls, firstAnims, traceSummary})}`);
    });
  }
}
}
