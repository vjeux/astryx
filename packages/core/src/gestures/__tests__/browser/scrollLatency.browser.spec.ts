// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file scrollLatency.browser.spec.ts
 * @input scrollLatencyFixture.ts bundled with esbuild, a phone-sized touch
 *   screen, and Chromium's touch input through CDP
 * @output A measurement, printed as JSON: for a vertical scroll that begins
 *   on each kind of row while the main thread is blocked for 500 ms, how long
 *   each touch event's dispatch waited and whether the list moved before the
 *   main thread was free; and, with the main thread free, who gets 2:1 and
 *   1:2 drags on the swipe rows
 * @position Measurement, not a gate: run on demand with
 *   `pnpm exec playwright test --config packages/core/src/gestures/__tests__/browser/playwright.config.ts scrollLatency --project chromium`
 */

import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {test, type CDPSession, type Page} from '@playwright/test';

let bundle = '';

// PW_CHANNEL=chromium runs full Chromium's new headless mode (threaded
// compositing) instead of the headless shell.
if (process.env.PW_CHANNEL != null) {
  test.use({channel: process.env.PW_CHANNEL});
}

test.beforeAll(async () => {
  const result = await build({
    entryPoints: [
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'scrollLatencyFixture.ts',
      ),
    ],
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
    target: 'es2022',
  });
  bundle = result.outputFiles[0].text;
});

const sleep = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

async function open(page: Page, bare = false): Promise<CDPSession> {
  page.on('pageerror', error => console.log(`PAGE-ERROR ${error.message}`));
  await page.goto('about:blank');
  await page.setContent(
    `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><body></body>${bare ? '<script>window.__bare = true</script>' : ''}`,
  );
  await page.addScriptTag({content: bundle});
  await sleep(200);
  return page.context().newCDPSession(page);
}

async function touch(
  cdp: CDPSession,
  type: 'touchStart' | 'touchMove' | 'touchEnd',
  x: number,
  y: number,
): Promise<number> {
  const before = Date.now();
  await cdp.send('Input.dispatchTouchEvent', {
    type,
    touchPoints: type === 'touchEnd' ? [] : [{x, y, id: 1}],
    timestamp: before / 1000,
  });
  return Date.now() - before;
}

/** A drag of `steps` equal moves, `stepMs` apart, from (x, y) by (dx, dy). */
async function drag(
  cdp: CDPSession,
  x: number,
  y: number,
  dx: number,
  dy: number,
  steps = 10,
  stepMs = 16,
): Promise<number[]> {
  const waits = [await touch(cdp, 'touchStart', x, y)];
  for (let i = 1; i <= steps; i++) {
    await sleep(stepMs);
    waits.push(
      await touch(cdp, 'touchMove', x + (dx * i) / steps, y + (dy * i) / steps),
    );
  }
  waits.push(await touch(cdp, 'touchEnd', x + dx, y + dy));
  return waits;
}

async function centerOf(page: Page, id: string) {
  const rect = await page.evaluate(target => window.__rect(target), id);
  return {x: rect.x + rect.w / 2, y: rect.y + rect.h / 2};
}

for (const bare of [true, false]) {
  test(`a vertical scroll that begins on each row while the main thread is blocked${bare ? ' (no gesture host)' : ''}`, async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'CDP touch input');
    const cdp = await open(page, bare);
    const cases = bare
      ? ['plain']
      : [
          'plain',
          'press',
          'swipe',
          'switch',
          'swipePassive',
          'switchPassive',
          'swipeDynamic',
        ];
    const results = [];
    for (const id of cases) {
      for (const blocked of [true, false]) {
        await page.evaluate(() => window.__reset());
        await sleep(150);
        const {x, y} = await centerOf(page, id);
        if (blocked) {
          await page.evaluate(() => window.__block(500));
          // Two frames and a task: the block is running after ~50 ms.
          await sleep(120);
        }
        const waits = await drag(cdp, x, y, 0, -120);
        await sleep(blocked ? 700 : 300);
        const log = await page.evaluate(() => window.__latency);
        const start = log.touches.find(entry => entry.type === 'touchstart');
        const firstMoveScroll = log.scrolls.find(entry => entry.top > 0);
        results.push({
          id,
          blocked,
          // Dispatch waits (ms) for touchStart, the 10 moves and touchEnd.
          waits,
          touchStartTs: start != null ? Math.round(start.ts) : null,
          block:
            log.block != null
              ? {
                  start: Math.round(log.block.start),
                  end: Math.round(log.block.end),
                  scrollAtUnblock: log.block.scrollAtUnblock,
                }
              : null,
          firstScroll:
            firstMoveScroll != null
              ? {t: Math.round(firstMoveScroll.t), top: firstMoveScroll.top}
              : null,
          finalTop: log.scrolls.at(-1)?.top ?? 0,
          cancelableMoves: log.touches.filter(
            entry => entry.type === 'touchmove' && entry.cancelable,
          ).length,
          moves: log.touches.filter(entry => entry.type === 'touchmove').length,
          states: log.states.map(entry => `${entry.name}:${entry.state}`),
        });
      }
    }
    console.log(
      `SCROLL-LATENCY${bare ? '-BARE' : ''} ${JSON.stringify(results)}`,
    );
  });
}

test('who gets a 2:1 and a 1:2 drag on the swipe rows, main thread free', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'CDP touch input');
  const cdp = await open(page);
  const results = [];
  for (const id of ['swipe', 'swipePassive', 'swipeDynamic']) {
    for (const [label, dx, dy] of [
      ['3:1', 90, -30],
      ['2:1', 80, -40],
      ['1.5:1', 72, -48],
      ['1:1', 60, -60],
      ['1:2', 40, -80],
    ] as const) {
      await page.evaluate(() => window.__reset());
      await sleep(150);
      const {x, y} = await centerOf(page, id);
      await drag(cdp, x - 60, y, dx, dy);
      await sleep(300);
      const log = await page.evaluate(() => window.__latency);
      results.push({
        id,
        drag: label,
        scrolled: log.scrolls.at(-1)?.top ?? 0,
        states: log.states
          .map(entry => entry.state)
          .filter(state => state !== 'possible'),
      });
    }
  }
  console.log(`PARITY ${JSON.stringify(results)}`);
});

for (const bare of [true, false]) {
  test(`a synthesized touch scroll on each row while the main thread is blocked${bare ? ' (no gesture host)' : ''}`, async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'CDP synthesized gestures');
    const cdp = await open(page, bare);
    const cases = bare
      ? ['plain']
      : [
          'plain',
          'press',
          'swipe',
          'switch',
          'swipePassive',
          'switchPassive',
          'swipeDynamic',
        ];
    const results = [];
    for (const id of cases) {
      for (const blocked of [true, false]) {
        await page.evaluate(() => window.__reset());
        await sleep(150);
        const {x, y} = await centerOf(page, id);
        if (blocked) {
          await page.evaluate(() => window.__block(500));
          await sleep(120);
        }
        const before = Date.now();
        // Synthesized at the browser's input router, as real touch input is.
        await cdp.send('Input.synthesizeScrollGesture', {
          x,
          y,
          xDistance: 0,
          yDistance: -150,
          gestureSourceType: 'touch',
          speed: 1500,
        });
        const took = Date.now() - before;
        await sleep(blocked ? 700 : 300);
        const log = await page.evaluate(() => window.__latency);
        const start = log.touches.find(entry => entry.type === 'touchstart');
        results.push({
          id,
          blocked,
          took,
          touchStartTs: start != null ? Math.round(start.ts) : null,
          block:
            log.block != null
              ? {
                  start: Math.round(log.block.start),
                  end: Math.round(log.block.end),
                  scrollAtUnblock: log.block.scrollAtUnblock,
                }
              : null,
          finalTop: log.scrolls.at(-1)?.top ?? 0,
          states: log.states.map(entry => `${entry.name}:${entry.state}`),
        });
      }
    }
    console.log(`SYNTH${bare ? '-BARE' : ''} ${JSON.stringify(results)}`);
  });
}
