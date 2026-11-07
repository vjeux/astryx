// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: the cost of the List's clip during a reorder drop's glide.
// Chromium: a trace of the glide (paints per frame, raster time). Both
// engines: the page's frame intervals during the glide.

import {test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {drag, openStory, touchDriver, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const STORY = 'core-list--reorder-in-clipped-card';
const WINDOW_MS = 800;

async function arm(page: Page) {
  await page.evaluate(WINDOW_MS => {
    const rec: {lift: number | null; frames: number[]} = {lift: null, frames: []};
    (window as unknown as {__cost: typeof rec}).__cost = rec;
    addEventListener(
      'touchend',
      () => {
        rec.lift = performance.now();
        console.timeStamp('cost-lift');
        const tick = (t: number) => {
          rec.frames.push(t);
          if (t - rec.lift! < WINDOW_MS) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      {capture: true, once: true},
    );
  }, WINDOW_MS);
}

test('cost', async ({page, browserName}) => {
  await openStory(page, storybook(), STORY);
  const rows = page.locator('#storybook-root ul > li');
  const handle = rows.nth(2).locator('button[data-astryx-list-reorder]');
  const box = await handle.boundingBox();
  const r2 = await rows.nth(2).boundingBox();
  const r3 = await rows.nth(3).boundingBox();
  if (!box || !r2 || !r3) throw new Error('no handle');
  const pitch = r3.y - r2.y;
  const from = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  const to = {x: from.x, y: from.y + 6.4 * pitch};
  const order = async () =>
    page.$$eval('#storybook-root ul > li', els => els.map(e => e.getAttribute('data-astryx-item-key')).join(','));
  const before = await order();
  await arm(page);
  const events: {name: string; ts: number; dur?: number; ph?: string; args?: any; cat?: string}[] = [];
  let cdp: Awaited<ReturnType<ReturnType<Page['context']>['newCDPSession']>> | null = null;
  let done: Promise<unknown> | null = null;
  if (browserName === 'chromium') {
    cdp = await page.context().newCDPSession(page);
    cdp.on('Tracing.dataCollected', e => events.push(...(e.value as typeof events)));
    done = new Promise(resolve => cdp!.once('Tracing.tracingComplete', resolve));
    await cdp.send('Tracing.start', {
      traceConfig: {
        includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'disabled-by-default-devtools.timeline.frame', 'cc', 'gpu'],
      },
      transferMode: 'ReportEvents',
    });
  }
  const driver = await touchDriver(page);
  await driver.play(drag(from, to, {durationMs: 1600, hz: 60, holdMs: 600, restMs: 300}));
  await page.waitForTimeout(WINDOW_MS + 600);
  const after = await order();
  const rec = await page.evaluate(() => (window as unknown as {__cost: {lift: number; frames: number[]}}).__cost);
  const intervals = rec.frames.slice(1).map((t, i) => t - rec.frames[i]);
  const sorted = [...intervals].sort((a, b) => a - b);
  const pct = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? null;
  const out: Record<string, unknown> = {
    engine: browserName, sb: process.env.ASTRYX_STORYBOOK_DIR?.split('/').pop(), moved: before !== after,
    frames: rec.frames.length, meanMs: intervals.reduce((s, x) => s + x, 0) / Math.max(1, intervals.length),
    p95Ms: pct(0.95), maxMs: sorted.at(-1) ?? null, over20: intervals.filter(x => x > 20).length,
  };
  if (cdp) {
    await cdp.send('Tracing.end');
    await done;
    const mark = events.find(e => e.name === 'TimeStamp' && e.args?.data?.message === 'cost-lift');
    if (!mark) throw new Error('no lift mark');
    const inWin = (e: {ts: number}) => e.ts >= mark.ts && e.ts <= mark.ts + WINDOW_MS * 1000;
    const sum = (list: typeof events) => list.reduce((s, e) => s + (e.dur ?? 0), 0) / 1000;
    const paints = events.filter(e => e.name === 'Paint' && inWin(e));
    const raster = events.filter(e => e.name === 'RasterTask' && inWin(e));
    const draws = events.filter(e => e.name === 'DrawFrame' && inWin(e));
    const layerize = events.filter(e => (e.name === 'Layerize' || e.name === 'UpdateLayer' || e.name === 'UpdateLayerTree') && inWin(e));
    const composite = events.filter(e => e.name === 'CompositeLayers' && inWin(e));
    Object.assign(out, {
      paints: paints.length, paintMs: sum(paints), raster: raster.length, rasterMs: sum(raster),
      drawFrames: draws.length, paintsPerFrame: paints.length / Math.max(1, rec.frames.length),
      layerTree: layerize.length, layerTreeMs: sum(layerize), composite: composite.length,
    });
  }
  console.log(`COSTDATA ${JSON.stringify(out)}`);
});
