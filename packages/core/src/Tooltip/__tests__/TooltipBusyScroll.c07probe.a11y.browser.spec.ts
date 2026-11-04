// Copyright (c) Meta Platforms, Inc. and affiliates.

// NOT FOR LANDING. A probe of what an open, switched tall tooltip paints while
// a scroll carries its trigger, on main and with the layer runtime's
// anchor-clear re-pick switched off at run time. C07_ARM picks the arm:
// `main` (the build as it is), `nomove` (a move report asks for no re-read) or
// `off` (no anchor-clear read at all). C07_OUT names the output directory.

import fs from 'node:fs';
import path from 'node:path';
import {
  castStoryboard,
  startScreencast,
  trackMarker,
  type CastFrame,
} from '@astryxdesign/interaction-harness';
import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {holdMotionStill} from '@astryxdesign/a11y-spec/chromium';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';

const ARM = process.env.C07_ARM ?? 'main';
// Set after the tooltip has opened and switched lists, before the scroll.
const LATE_ARM = process.env.C07_LATE_ARM ?? '';
const TAG = LATE_ARM ? `${ARM}-then-${LATE_ARM}` : ARM;
const OUT = process.env.C07_OUT ?? path.join(process.cwd(), 'c07-layer-trace');
const TRIGGER = '#storybook-root button';
const TOOLTIP = '[role="tooltip"]';
const MAGENTA = [255, 0, 255] as const;
const CYAN = [0, 255, 255] as const;
const VIEWPORT = {width: 390, height: 700};

let storybook: StaticServer;

test.beforeAll(async () => {
  storybook = await serveStorybook(
    process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
  );
  fs.mkdirSync(OUT, {recursive: true});
});

test.afterAll(async () => {
  await storybook?.close();
});

interface Box {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface State {
  trigger: Box | null;
  tooltip: Box | null;
  switched: boolean;
  scrollY: number;
}

async function readState(page: Page): Promise<State> {
  return page.evaluate(
    ([sel, tip]) => {
      const box = (el: Element | null) => {
        if (el == null) {
          return null;
        }
        const r = el.getBoundingClientRect();
        return {top: r.top, bottom: r.bottom, left: r.left, right: r.right};
      };
      const t = document.querySelector(tip);
      return {
        trigger: box(document.querySelector(sel)),
        tooltip: box(t),
        switched: t?.hasAttribute('data-astryx-clears-anchor') ?? false,
        scrollY: window.scrollY,
      };
    },
    [TRIGGER, TOOLTIP],
  );
}

/** The held-open 60-line tooltip on a phone, its trigger's centre at `y`. */
async function open(page: Page, y: number): Promise<State> {
  await page.addInitScript(arm => {
    const g = globalThis as Record<string, unknown>;
    if (arm !== 'main') {
      g.__astryxLayerProbe = arm;
    }
    g.__astryxLayerLog = [];
  }, ARM);
  await page.setViewportSize(VIEWPORT);
  await page.goto(
    `${storybook.origin}/iframe.html?id=core-tooltip--tall-content&viewMode=story&args=isOpen:!true`,
  );
  await holdMotionStill(page);
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.addStyleTag({
    content: [
      `${TOOLTIP}, ${TOOLTIP} * {background: rgb(255, 0, 255) !important; color: rgb(255, 0, 255) !important; border-color: rgb(255, 0, 255) !important; box-shadow: none !important; outline: none !important; text-shadow: none !important}`,
      `${TRIGGER}, ${TRIGGER} * {background: rgb(0, 255, 255) !important; color: rgb(0, 255, 255) !important; border-color: rgb(0, 255, 255) !important; box-shadow: none !important; outline: none !important}`,
    ].join('\n'),
  });
  await page.evaluate(
    ([sel, target]) => {
      const el = document.querySelector(sel as string) as HTMLElement;
      const r = el.getBoundingClientRect();
      window.scrollBy(0, r.top + r.height / 2 - (target as number));
    },
    [TRIGGER, y],
  );
  await page.waitForTimeout(400);
  if (LATE_ARM) {
    await page.evaluate(arm => {
      (globalThis as Record<string, unknown>).__astryxLayerProbe = arm;
    }, LATE_ARM);
  }
  return readState(page);
}

async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const frame = async () =>
      new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    let last = Number.NaN;
    let still = 0;
    while (still < 8) {
      await frame();
      still = window.scrollY === last ? still + 1 : 0;
      last = window.scrollY;
    }
  });
  await page.waitForTimeout(300);
}

async function track(page: Page, frames: CastFrame[]) {
  const tooltip = await trackMarker(page, frames, {rgb: MAGENTA});
  const trigger = await trackMarker(page, frames, {rgb: CYAN});
  return frames.map((frame, i) => ({
    t: frame.t,
    tooltip: tooltip[i].box,
    tooltipPixels: tooltip[i].pixels,
    trigger: trigger[i].box,
    triggerPixels: trigger[i].pixels,
  }));
}

function save(name: string, data: unknown) {
  fs.writeFileSync(
    path.join(OUT, `${TAG}-${name}.json`),
    JSON.stringify(data, null, 1),
  );
}

for (const run of [1, 2, 3]) {
  test(`instant 240 px scroll under a switched tooltip above its trigger, run ${run}`, async ({
    page,
  }, testInfo) => {
    const opened = await open(page, 150);
    await page.evaluate(() => window.scrollBy({top: -440, behavior: 'smooth'}));
    await settle(page);
    const before = await readState(page);
    const cast = await startScreencast(page);
    await expect.poll(() => cast.frameCount()).toBeGreaterThan(0);
    const sampled = await page.evaluate(
      async ([sel, tip]) => {
        const box = (el: Element | null) => {
          if (el == null) {
            return null;
          }
          const r = el.getBoundingClientRect();
          return {top: r.top, bottom: r.bottom, left: r.left, right: r.right};
        };
        const afterPaint = async () =>
          new Promise<void>(resolve => {
            requestAnimationFrame(() => {
              const channel = new MessageChannel();
              channel.port1.onmessage = () => resolve();
              channel.port2.postMessage(null);
            });
          });
        const start = performance.timeOrigin + performance.now();
        window.scrollBy(0, 240);
        const frames = [];
        for (let i = 0; i < 10; i++) {
          await afterPaint();
          const t = document.querySelector(tip);
          frames.push({
            t: performance.timeOrigin + performance.now(),
            tooltip: box(t),
            trigger: box(document.querySelector(sel)),
            switched: t?.hasAttribute('data-astryx-clears-anchor') ?? false,
          });
        }
        return {start, frames};
      },
      [TRIGGER, TOOLTIP],
    );
    await page.waitForTimeout(600);
    const after = await readState(page);
    const frames = await cast.stop();
    const log = await page.evaluate(
      () => (globalThis as Record<string, unknown>).__astryxLayerLog,
    );
    const origin = await page.evaluate(() => performance.timeOrigin);
    const sheet = await castStoryboard(page, frames, {
      name: `c07-${TAG}-instant-${run}`,
      zero: sampled.start,
      from: sampled.start - 40,
      to: sampled.start + 250,
      columns: 10,
      cellScale: 0.4,
    });
    const sheetFiles = await sheet.write(testInfo);
    save(`instant-${run}-sheet`, sheetFiles);
    save(`instant-${run}`, {
      arm: TAG,
      opened,
      before,
      sampled,
      after,
      origin,
      log,
      cast: await track(page, frames),
    });
  });

  test(`smooth 440 px scroll under a switched tooltip below its trigger, main thread blocked 1 s mid-scroll, run ${run}`, async ({
    page,
  }, testInfo) => {
    const opened = await open(page, 150);
    const cast = await startScreencast(page);
    await expect.poll(() => cast.frameCount()).toBeGreaterThan(0);
    await page.waitForTimeout(200);
    const block = await page.evaluate(async ms => {
      window.scrollBy({top: -440, behavior: 'smooth'});
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
      const start = performance.timeOrigin + performance.now();
      const scrollAtStart = window.scrollY;
      const until = performance.now() + ms;
      while (performance.now() < until) {
        // A busy page.
      }
      return {
        start,
        end: performance.timeOrigin + performance.now(),
        scrollAtStart,
      };
    }, 1000);
    await page.waitForTimeout(1500);
    const after = await readState(page);
    const frames = await cast.stop();
    const log = await page.evaluate(
      () => (globalThis as Record<string, unknown>).__astryxLayerLog,
    );
    const origin = await page.evaluate(() => performance.timeOrigin);
    const sheet = await castStoryboard(page, frames, {
      name: `c07-${TAG}-busy-${run}`,
      zero: block.start,
      from: block.start - 40,
      to: block.end + 120,
      columns: 12,
      cellScale: 0.35,
    });
    const sheetFiles = await sheet.write(testInfo);
    save(`busy-${run}-sheet`, sheetFiles);
    save(`busy-${run}`, {
      arm: TAG,
      opened,
      block,
      after,
      origin,
      log,
      cast: await track(page, frames),
    });
  });
}
