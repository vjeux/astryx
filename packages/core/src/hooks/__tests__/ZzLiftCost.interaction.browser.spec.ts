// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzLiftCost.interaction.browser.spec.ts (NOT FOR LANDING)
 * @input The snap-paging three-up story, a flick, CDP CPU throttling and a
 *   timeline trace
 * @output The lift's task time (the touchend dispatch) for 9 and 30 items at
 *   1x and 4x CPU
 * @position Measurement probe only
 */

import {test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

type Ev = {
  name: string;
  ts: number;
  dur?: number;
  tdur?: number;
  pid: number;
  tid: number;
  ph: string;
  args?: Record<string, unknown>;
};

async function liftMs(page: Page, count: number, rate: number) {
  await openStory(page, storybook(), 'core-carousel--snap-paging-three-up', {
    mode: 'paging',
  });
  const scroller = page.getByRole('region').getByRole('group').first();
  await scroller.evaluate((el, n) => {
    const items = Array.from(el.children);
    for (let i = items.length; i < n; i++) {
      el.appendChild(items[i % items.length].cloneNode(true));
    }
  }, count);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', {rate});
  const events: Ev[] = [];
  cdp.on('Tracing.dataCollected', ({value}) => {
    events.push(...(value as unknown as Ev[]));
  });
  const complete = new Promise<void>(resolve =>
    cdp.once('Tracing.tracingComplete', () => resolve()),
  );
  await cdp.send('Tracing.start', {
    transferMode: 'ReportEvents',
    traceConfig: {
      includedCategories: [
        'devtools.timeline',
        'disabled-by-default-devtools.timeline',
        'blink.user_timing',
        'toplevel',
      ],
      excludedCategories: ['*'],
    },
  });
  await page.evaluate(() => performance.mark('zz-start'));
  const box = await scroller.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  const y = box.y + box.height / 2;
  const from = {x: box.x + box.width / 2 + 40, y};
  const driver = await touchDriver(page);
  await driver.play(drag(from, {x: from.x - 80, y}, {durationMs: 80}));
  await page.waitForTimeout(1200);
  await cdp.send('Tracing.end');
  await complete;
  await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
  const mark = events.find(e => e.name === 'zz-start');
  if (mark == null) {
    throw new Error('no mark');
  }
  const main = events.filter(
    e => e.pid === mark.pid && e.tid === mark.tid && e.ph === 'X',
  );
  const lift = main
    .filter(
      e =>
        e.name === 'EventDispatch' &&
        (e.args?.data as {type?: unknown} | undefined)?.type === 'touchend',
    )
    .sort((a, b) => (b.dur ?? 0) - (a.dur ?? 0))[0];
  const animated = await scroller.evaluate(
    el => Array.from(el.children).length,
  );
  return {
    wall: (lift?.dur ?? NaN) / 1000,
    thread: (lift?.tdur ?? lift?.dur ?? NaN) / 1000,
    items: animated,
  };
}

for (const count of [9, 30]) {
  for (const rate of [1, 4]) {
    test(`lift cost, ${count} items, ${rate}x`, async ({page}) => {
      const {wall, thread, items} = await liftMs(page, count, rate);
      console.log(
        `LIFTCOST ${JSON.stringify({count, rate, items, wall: Math.round(wall * 100) / 100, thread: Math.round(thread * 100) / 100})}`,
      );
    });
  }
}
