// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * NOT FOR LANDING: X1's probe of the Popover touch presentation's first
 * frame. It counts the style recalcs and layouts that run inside that frame's
 * callbacks (forced by script), and records what the growth plays: its
 * transform origin, start frame and keyframes.
 */

import {test} from '@astryxdesign/a11y-spec/playwright';
import {
  installLongTaskLog,
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const RUNS = Number(process.env.X1_RUNS ?? '5');

interface Ev {
  args?: {beginData?: {stackTrace?: Array<{functionName: string; url: string; lineNumber: number}>}; data?: {stackTrace?: Array<{functionName: string; url: string; lineNumber: number}>}};
  name: string;
  ph: string;
  ts: number;
  dur?: number;
  tid: number;
  pid: number;
}

for (let run = 0; run < RUNS; run++) {
  test(`popover first frame #${run}`, async ({page, browserName}) => {
    test.skip(browserName !== 'chromium', 'CDP tracing');
    await installLongTaskLog(page);
    await openStory(page, storybook(), 'core-popover--default');
    const driver = await touchDriver(page);
    const trigger = page.getByRole('button', {name: 'Settings'});
    const box = await trigger.boundingBox();
    if (box == null) throw new Error('no trigger');
    const cdp = await page.context().newCDPSession(page);
    const events: Ev[] = [];
    cdp.on('Tracing.dataCollected', ({value}) => {
      events.push(...(value as unknown as Ev[]));
    });
    const done = new Promise<void>(r => cdp.once('Tracing.tracingComplete', () => r()));
    await cdp.send('Tracing.start', {
      categories: 'devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.stack',
      transferMode: 'ReportEvents',
    });
    await page.evaluate(() => console.timeStamp('x1-start'));
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await page.waitForFunction(() => {
      const layer = document.querySelector('[popover]:has([role="dialog"])');
      return layer != null && layer.getAnimations().length > 0;
    });
    const played = await page.evaluate(() => {
      const layer = document.querySelector('[popover]:has([role="dialog"])') as HTMLElement;
      return {
        origin: layer.style.transformOrigin,
        animations: layer.getAnimations().map(a => {
          const e = a.effect as KeyframeEffect;
          const t = e.getTiming();
          return {
            keyframes: e.getKeyframes().map(k => ({...k, computedOffset: undefined})),
            duration: t.duration,
            easing: t.easing,
            fill: t.fill,
          };
        }),
      };
    });
    await page.waitForTimeout(600);
    await cdp.send('Tracing.end');
    await done;
    // The renderer main thread: the one that ran the page's console.timeStamp.
    const mark = events.find(e => e.name === 'TimeStamp' && JSON.stringify(e).includes('x1-start'));
    if (mark == null) throw new Error('no start mark');
    const onMain = events.filter(e => e.pid === mark.pid && e.tid === mark.tid && e.ts >= mark.ts);
    const frames = onMain.filter(e => e.name === 'FireAnimationFrame' && e.ph === 'X');
    const work = onMain.filter(e => (e.name === 'UpdateLayoutTree' || e.name === 'Layout') && (e.ph === 'X' || e.ph === 'B'));
    const perFrame = frames
      .map(f => {
        const inside = work.filter(w => w.ts >= f.ts && w.ts <= f.ts + (f.dur ?? 0));
        const stacks = inside.map(w => {
          const st = w.args?.beginData?.stackTrace ?? w.args?.data?.stackTrace ?? [];
          return `${w.name}: ${st.slice(0, 6).map(fr => `${fr.functionName || '?'}@${(fr.url.split('/').pop() ?? '').split('?')[0]}:${fr.lineNumber}`).join(' < ')}`;
        });
        return {
          stacks,
          at: Math.round((f.ts - mark.ts) / 1000),
          style: inside.filter(w => w.name === 'UpdateLayoutTree').length,
          layout: inside.filter(w => w.name === 'Layout').length,
        };
      })
      .filter(f => f.style + f.layout > 0);
    console.log(`X1FRAME ${JSON.stringify({run, perFrame, played})}`);
  });
}
