// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file animator.compositor.spec.ts
 * @input The motion source (animator, springs, spring math) bundled with
 *   esbuild, a blank page in Chromium with phone emulation, the DevTools
 *   protocol's screencast and trace
 * @output Proof that the animator's animations run on the compositor (law
 *   M1): a spring keeps advancing frame by frame while the main thread is
 *   blocked for a full second; no Layout or Paint runs while it animates; and
 *   the curve the engine plays, seeked to fixed times, is the analytic curve
 * @position Browser proof for animator.ts; jsdom runs no animations. Run with
 *   `pnpm exec playwright test --config packages/core/src/motion/__tests__/playwright.config.ts`
 */

import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {
  chromium,
  expect,
  test,
  type Browser,
  type Page,
  type TestInfo,
} from '@playwright/test';
import {build} from 'esbuild';
// @ts-expect-error -- pngjs ships no declarations; runtime support is pinned.
import {PNG} from 'pngjs';
import type {Animator} from '../animator';
import type * as MotionBundle from './motionBundle';

let script = '';

test.beforeAll(async () => {
  const result = await build({
    entryPoints: [fileURLToPath(new URL('./motionBundle.ts', import.meta.url))],
    bundle: true,
    write: false,
    format: 'iife',
    globalName: 'Motion',
    target: 'es2022',
  });
  script = result.outputFiles[0].text;
});

/** The box's color: unique on the page, found per frame by scanning a row. */
const BOX: [number, number, number] = [255, 0, 128];
const BOX_TOP = 20;
const BOX_SIZE = 40;
/** A slow, critically damped spring: still moving through the whole block. */
const SLOW = {response: 1, dampingRatio: 1};
const TRAVEL = 300;
/** Painted by the main thread: blue while it is blocked (WebKit video proof). */
const BEACON_TOP = 90;

async function open(page: Page) {
  await page.setContent(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  html, body { margin: 0; background: #fff; }
  #box { position: absolute; top: ${BOX_TOP}px; left: 0; width: ${BOX_SIZE}px; height: ${BOX_SIZE}px;
    background: rgb(${BOX.join(',')}); will-change: translate, opacity; }
  #beacon { position: absolute; top: ${BEACON_TOP}px; left: 0; width: ${BOX_SIZE}px; height: ${BOX_SIZE}px;
    background: rgb(128, 128, 128); }
</style>
<div id="box"></div>
<div id="beacon"></div>
<script>${script}</script>
<script>
  window.block = ms => { const end = performance.now() + ms; while (performance.now() < end) {} };
  window.animator = Motion.createAnimator(document.getElementById('box'));
</script>`,
  );
}

function boxLeft(png: {width: number; data: Uint8Array}, row: number): number {
  for (let x = 0; x < png.width; x++) {
    const i = (png.width * row + x) * 4;
    if (
      Math.abs(png.data[i] - BOX[0]) < 40 &&
      Math.abs(png.data[i + 1] - BOX[1]) < 40 &&
      Math.abs(png.data[i + 2] - BOX[2]) < 40
    ) {
      return x;
    }
  }
  return -1;
}

test('a spring keeps advancing every frame while the main thread is blocked for 1 s', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'the screencast is a Chromium protocol',
  );
  await open(page);
  const viewport = page.viewportSize() ?? {width: 412, height: 915};
  const cdp = await page.context().newCDPSession(page);
  const frames: {ts: number; data: string}[] = [];
  cdp.on('Page.screencastFrame', frame => {
    frames.push({ts: frame.metadata.timestamp ?? 0, data: frame.data});
    void cdp
      .send('Page.screencastFrameAck', {sessionId: frame.sessionId})
      .catch(() => {});
  });
  // Frames scaled to CSS pixels.
  await cdp.send('Page.startScreencast', {
    format: 'png',
    everyNthFrame: 1,
    maxWidth: viewport.width,
    maxHeight: viewport.height,
  });
  await page.waitForTimeout(300);

  const run = await page.evaluate(
    async ({spring, travel}) =>
      new Promise<{
        start: number;
        origin: number;
        blockStart: number;
        blockEnd: number;
      }>(resolve => {
        const start = performance.now();
        window.animator.animate({x: travel}, {spring});
        setTimeout(() => {
          const blockStart = performance.now();
          window.block(1000);
          resolve({
            start,
            origin: performance.timeOrigin,
            blockStart,
            blockEnd: performance.now(),
          });
        }, 50);
      }),
    {spring: SLOW, travel: TRAVEL},
  );
  await page.waitForTimeout(1200);
  await cdp.send('Page.stopScreencast');

  const curve = await page.evaluate(
    ({spring, travel, start, times}) => {
      const solved = Motion.solveSpring(Motion.toSpring(spring), {
        from: 0,
        to: travel,
      });
      return times.map(t => solved.value((t - start) / 1000));
    },
    {
      spring: SLOW,
      travel: TRAVEL,
      start: run.start,
      times: frames.map(f => f.ts * 1000 - run.origin),
    },
  );
  const samples = frames.map((frame, i) => {
    const png = PNG.sync.read(Buffer.from(frame.data, 'base64'));
    return {
      time: frame.ts * 1000 - run.origin,
      x: boxLeft(png, BOX_TOP + BOX_SIZE / 2),
      expected: curve[i],
    };
  });
  // Frames composited while the main thread was blocked (margin at both
  // ends for frames already in flight).
  const blocked = samples.filter(
    s => s.time > run.blockStart + 30 && s.time < run.blockEnd - 30,
  );
  // Evidence in the report: per frame, time since start: position (curve).
  test.info().annotations.push({
    type: 'frames during the block',
    description:
      `block ${Math.round(run.blockEnd - run.blockStart)} ms; ${blocked.length} frames: ` +
      blocked
        .map(
          s =>
            `${Math.round(s.time - run.start)}ms:${s.x}(${s.expected.toFixed(1)})`,
        )
        .join(' '),
  });
  expect(run.blockEnd - run.blockStart).toBeGreaterThanOrEqual(1000);
  // Display rate: at 60 Hz a 940 ms window holds ~56 frames.
  expect(blocked.length).toBeGreaterThanOrEqual(45);
  // Every frame moved forward (the spring is critically damped: monotone).
  // Positions are whole pixels, so a frame may repeat once the curve moves
  // less than a pixel per frame; while it moves more, every frame advances.
  for (let i = 1; i < blocked.length; i++) {
    expect(blocked[i].x).toBeGreaterThanOrEqual(blocked[i - 1].x);
    if (blocked[i].expected - blocked[i - 1].expected > 1.5) {
      expect(blocked[i].x).toBeGreaterThan(blocked[i - 1].x);
    }
  }
  // And it is the spring: each frame within 2 px of the analytic curve at
  // the frame's timestamp (whole-pixel detection plus timestamp jitter).
  for (const sample of blocked) {
    expect(Math.abs(sample.x - sample.expected)).toBeLessThanOrEqual(2);
  }
});

test('no Layout or Paint runs while it animates', async ({
  page,
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'tracing is a Chromium protocol');
  await open(page);
  await page.waitForTimeout(200);
  await browser.startTracing(page, {
    categories: [
      'devtools.timeline',
      'disabled-by-default-devtools.timeline',
      'blink.animations',
      'blink.user_timing',
    ],
  });
  await page.evaluate(spring => {
    performance.mark('motion:start');
    window.animator.animate({x: 300, opacity: 0.5}, {spring});
  }, SLOW);
  await page.waitForTimeout(1900);
  await page.evaluate(() => performance.mark('motion:end'));
  const trace = JSON.parse((await browser.stopTracing()).toString()) as {
    traceEvents: {
      name: string;
      ts: number;
      args?: {data?: {compositeFailed?: number}};
    }[];
  };
  const events = trace.traceEvents;
  const mark = (name: string) => events.find(e => e.name === name)?.ts ?? NaN;
  const start = mark('motion:start');
  const end = mark('motion:end');
  expect(Number.isFinite(start) && Number.isFinite(end)).toBe(true);
  // After the frame that starts the animation (50 ms of slack).
  const during = events.filter(e => e.ts > start + 50_000 && e.ts < end);
  const count = (name: string) => during.filter(e => e.name === name).length;
  test.info().annotations.push({
    type: 'main-thread work during the animation',
    description:
      `${Math.round((end - start) / 1000)} ms: Layout ${count('Layout')}, Paint ${count('Paint')}, ` +
      `UpdateLayoutTree ${count('UpdateLayoutTree')}, PrePaint ${count('PrePaint')}`,
  });
  expect(count('Layout')).toBe(0);
  expect(count('Paint')).toBe(0);
  // Chromium reports why an animation could not run on the compositor;
  // 0 means it did.
  const reports = events.filter(
    e => e.name === 'Animation' && e.args?.data?.compositeFailed !== undefined,
  );
  expect(reports.length).toBeGreaterThan(0);
  for (const report of reports) {
    expect(report.args?.data?.compositeFailed).toBe(0);
  }
});

test('the engine plays the analytic curve, all channels on one clock', async ({
  page,
}) => {
  await open(page);
  const result = await page.evaluate(() => {
    const spring = Motion.springs.snappy;
    window.animator.animate({x: 300, opacity: 0.4}, {spring});
    const animations = document.getAnimations();
    const starts = animations.map(a => Number(a.startTime));
    const start = starts[0];
    const box = document.getElementById('box') as HTMLElement;
    let worstX = 0;
    let worstOpacity = 0;
    const duration = Math.max(
      ...animations.map(a => Number(a.effect?.getComputedTiming().endTime)),
    );
    for (const a of animations) {
      a.pause();
    }
    for (let t = 0; t <= duration; t += 4) {
      for (const a of animations) {
        a.currentTime = t;
      }
      const style = getComputedStyle(box);
      const x = Number.parseFloat(style.translate || '0');
      const opacity = Number.parseFloat(style.opacity);
      worstX = Math.max(
        worstX,
        Math.abs(x - window.animator.get('x', start + t)),
      );
      worstOpacity = Math.max(
        worstOpacity,
        Math.abs(opacity - window.animator.get('opacity', start + t)),
      );
    }
    return {count: animations.length, starts, worstX, worstOpacity, duration};
  });
  test.info().annotations.push({
    type: 'seeked curve',
    description: JSON.stringify(result),
  });
  expect(result.count).toBe(2);
  expect(new Set(result.starts).size).toBe(1);
  expect(result.worstX).toBeLessThan(0.06);
  expect(result.worstOpacity).toBeLessThan(0.003);
});

declare global {
  interface Window {
    block: (ms: number) => void;
    animator: Animator;
  }
  const Motion: typeof MotionBundle;
}

/**
 * WebKit has no screencast protocol: record a video of a spring started just
 * before a 1 s main-thread block, then decode it frame by frame in Chromium.
 * The beacon (painted by the main thread) marks the frames inside the block.
 */
async function recordBlockedRun(
  browser: Browser,
  testInfo: TestInfo,
  spring: {response: number; dampingRatio: number},
): Promise<{t: number; x: number; beacon: string}[]> {
  const size = {width: 390, height: 160};
  const context = await browser.newContext({
    viewport: size,
    recordVideo: {dir: testInfo.outputPath('video'), size},
  });
  const page = await context.newPage();
  await open(page);
  await page.waitForTimeout(500);
  await page.evaluate(
    async ({spring, travel}) =>
      new Promise<void>(resolve => {
        const beacon = document.getElementById('beacon') as HTMLElement;
        window.animator.animate({x: travel}, {spring});
        setTimeout(() => {
          // Paint the beacon blue, let two frames commit it, then block.
          beacon.style.background = 'rgb(0, 0, 255)';
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              window.block(1000);
              beacon.style.background = 'rgb(0, 200, 0)';
              resolve();
            }),
          );
        }, 50);
      }),
    {spring, travel: TRAVEL},
  );
  await page.waitForTimeout(1000);
  const video = page.video();
  await context.close();
  const path = await video?.path();
  expect(path).toBeTruthy();

  // Decode the recording frame by frame in a Chromium <video> (from a blob:
  // a file:// video would taint the canvas the pixels are read from).
  const bytes = (await readFile(path as string)).toString('base64');
  const decoder = await chromium.launch();
  try {
    const player = await decoder.newPage();
    const frames = await player.evaluate(
      async ({boxRow, beaconRow, box, webm}) => {
        const video = document.createElement('video');
        video.muted = true;
        video.src = URL.createObjectURL(
          new Blob([Uint8Array.from(atob(webm), c => c.charCodeAt(0))], {
            type: 'video/webm',
          }),
        );
        document.body.append(video);
        if (video.readyState < 1) {
          await new Promise(r =>
            video.addEventListener('loadedmetadata', r, {once: true}),
          );
        }
        video.pause();
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context2d = canvas.getContext('2d', {
          willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        const out: {t: number; x: number; beacon: string}[] = [];
        const duration = Number.isFinite(video.duration) ? video.duration : 10;
        for (let t = 0; t < duration; t += 0.02) {
          video.currentTime = t;
          await new Promise(r =>
            video.addEventListener('seeked', r, {once: true}),
          );
          context2d.drawImage(video, 0, 0);
          const row = context2d.getImageData(0, boxRow, canvas.width, 1).data;
          let x = -1;
          for (let i = 0; i < canvas.width; i++) {
            if (
              Math.abs(row[i * 4] - box[0]) < 60 &&
              Math.abs(row[i * 4 + 1] - box[1]) < 60 &&
              Math.abs(row[i * 4 + 2] - box[2]) < 60
            ) {
              x = i;
              break;
            }
          }
          const b = context2d.getImageData(10, beaconRow, 1, 1).data;
          const beacon =
            b[2] > 180 && b[0] < 80
              ? 'blocked'
              : b[1] > 150 && b[2] < 80
                ? 'after'
                : 'before';
          out.push({t, x, beacon});
        }
        return out;
      },
      {
        boxRow: BOX_TOP + BOX_SIZE / 2,
        beaconRow: BEACON_TOP + BOX_SIZE / 2,
        box: BOX,
        webm: bytes,
      },
    );
    return frames;
  } finally {
    await decoder.close();
  }
}

test('WebKit: a spring keeps advancing while the main thread is blocked for 1 s (video)', async ({
  browser,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'webkit',
    'the Chromium screencast test covers Chromium',
  );
  const frames = await recordBlockedRun(browser, testInfo, SLOW);
  // Distinct recorded frames while the beacon showed the block.
  const blocked = frames.filter(f => f.beacon === 'blocked' && f.x >= 0);
  const positions = blocked
    .map(f => f.x)
    .filter((x, i, all) => i === 0 || x !== all[i - 1]);
  testInfo.annotations.push({
    type: 'WebKit frames during the block',
    description: `${blocked.length} samples, positions: ${positions.join(' ')}`,
  });
  expect(blocked.length).toBeGreaterThan(0);
  // The box kept moving: many distinct positions while the main thread
  // could not run, never going back.
  expect(positions.length).toBeGreaterThanOrEqual(8);
  for (let i = 1; i < positions.length; i++) {
    expect(positions[i]).toBeGreaterThan(positions[i - 1]);
  }
});

test('WebKit: a spring that ends inside the block stays at its end (video)', async ({
  browser,
  browserName,
}, testInfo) => {
  test.skip(browserName !== 'webkit', 'a WebKit compositor case');
  // Settles about 450 ms into the block.
  const frames = await recordBlockedRun(browser, testInfo, {
    response: 0.25,
    dampingRatio: 1,
  });
  const blocked = frames.filter(f => f.beacon === 'blocked' && f.x >= 0);
  const landed = blocked.findIndex(f => f.x >= TRAVEL - 1);
  testInfo.annotations.push({
    type: 'WebKit frames during the block',
    description: blocked.map(f => f.x).join(' '),
  });
  expect(landed).toBeGreaterThan(0);
  expect(landed).toBeLessThan(blocked.length - 5);
  // Every frame after the curve ends shows the end state, until the main
  // thread runs again.
  for (const frame of blocked.slice(landed)) {
    expect(frame.x).toBeGreaterThanOrEqual(TRAVEL - 1);
  }
});
