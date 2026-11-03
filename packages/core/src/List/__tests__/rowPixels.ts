// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file rowPixels.ts
 * @input Playwright pages and screencast frames from the interaction harness
 * @output WebKit's video evidence: `installBeacon`, `blockBehindBeacon` and
 *   `sampleVideoPoints`. The beacon marks the frames presented while script
 *   could not run.
 * @position Test helper for the List and TreeList interaction proofs.
 */

import {readFile} from 'node:fs/promises';
import {
  chromium,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';

/** The beacon's size, CSS px, in the viewport's bottom-right corner. */
const BEACON = 40;

/**
 * Adds the main-thread beacon: a corner square the page paints grey, blue
 * while it is about to block, and green once script runs again. A recorded
 * frame showing blue was presented while script could not run.
 */
export async function installBeacon(page: Page): Promise<void> {
  await page.evaluate(size => {
    const beacon = document.createElement('div');
    beacon.id = 'beacon';
    Object.assign(beacon.style, {
      position: 'fixed',
      right: '0',
      bottom: '0',
      width: `${size}px`,
      height: `${size}px`,
      background: 'rgb(128, 128, 128)',
      zIndex: '2147483647',
    });
    document.body.append(beacon);
  }, BEACON);
}

/**
 * Paints the beacon blue, lets two frames commit it, blocks the main thread
 * for `ms`, then paints it green. With `during`, the page starts all of this
 * itself, on the first frame an animation on that element runs. A block the
 * test sends once the motion runs lands later on a busy machine, and a short
 * motion can end first.
 */
export async function blockBehindBeacon(
  page: Page,
  ms: number,
  {during}: {during?: Locator} = {},
): Promise<void> {
  const target = during == null ? null : await during.elementHandle();
  await page.evaluate(
    async ([duration, element]) =>
      new Promise<void>(resolve => {
        const beacon = document.getElementById('beacon') as HTMLElement;
        const block = () => {
          beacon.style.background = 'rgb(0, 0, 255)';
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              const end = performance.now() + duration;
              while (performance.now() < end) {
                // blocked
              }
              beacon.style.background = 'rgb(0, 200, 0)';
              resolve();
            }),
          );
        };
        const wait = () => {
          if (
            element == null ||
            element
              .getAnimations()
              .some(animation => animation.playState === 'running')
          ) {
            block();
          } else {
            requestAnimationFrame(wait);
          }
        };
        wait();
      }),
    [ms, target] as const,
  );
}

export interface VideoPointsSample {
  /** Video time, s. */
  readonly t: number;
  /** Mean of the RGB channels at each probe, 0–255, in the probes' order. */
  readonly values: ReadonlyArray<number>;
  /** Whether each probe shows the harness marker colour (magenta). */
  readonly marker: ReadonlyArray<boolean>;
  readonly beacon: 'before' | 'blocked' | 'after';
}

/**
 * The probe points' values, the marker's place and the beacon's state every
 * 10 ms of a recorded video, decoded in a Chromium page. A marker moving
 * through the probes reads as the index of the probe it covers.
 */
export async function sampleVideoPoints(
  videoPath: string,
  probes: ReadonlyArray<{x: number; y: number}>,
  viewport: {width: number; height: number},
): Promise<VideoPointsSample[]> {
  const webm = (await readFile(videoPath)).toString('base64');
  const decoder = await chromium.launch();
  try {
    const player = await decoder.newPage();
    return await player.evaluate(
      async ({points, data, beaconAt}) => {
        const element = document.createElement('video');
        element.muted = true;
        element.src = URL.createObjectURL(
          new Blob([Uint8Array.from(atob(data), c => c.charCodeAt(0))], {
            type: 'video/webm',
          }),
        );
        document.body.append(element);
        if (element.readyState < 1) {
          await new Promise(r =>
            element.addEventListener('loadedmetadata', r, {once: true}),
          );
        }
        element.pause();
        const canvas = document.createElement('canvas');
        canvas.width = element.videoWidth;
        canvas.height = element.videoHeight;
        const context2d = canvas.getContext('2d', {
          willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        const out: {
          t: number;
          values: number[];
          marker: boolean[];
          beacon: 'before' | 'blocked' | 'after';
        }[] = [];
        const duration = Number.isFinite(element.duration)
          ? element.duration
          : 10;
        for (let t = 0; t < duration; t += 0.01) {
          element.currentTime = t;
          await new Promise(r =>
            element.addEventListener('seeked', r, {once: true}),
          );
          context2d.drawImage(element, 0, 0);
          const pixels = points.map(
            p => context2d.getImageData(p.x, p.y, 1, 1).data,
          );
          const b = context2d.getImageData(beaconAt.x, beaconAt.y, 1, 1).data;
          const beacon =
            b[2] > 180 && b[0] < 80
              ? 'blocked'
              : b[1] > 150 && b[2] < 80
                ? 'after'
                : 'before';
          out.push({
            t,
            values: pixels.map(px => (px[0] + px[1] + px[2]) / 3),
            marker: pixels.map(px => px[0] > 200 && px[1] < 80 && px[2] > 200),
            beacon,
          });
        }
        return out;
      },
      {
        points: probes,
        data: webm,
        beaconAt: {
          x: viewport.width - BEACON / 2,
          y: viewport.height - BEACON / 2,
        },
      },
    );
  } finally {
    await decoder.close();
  }
}
