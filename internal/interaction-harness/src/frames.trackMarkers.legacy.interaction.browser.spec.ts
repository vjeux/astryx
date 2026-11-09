// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file frames.trackMarkers.legacy.interaction.browser.spec.ts
 * @input Real Chromium/WebKit in the interaction projects
 * @output NOT FOR LANDING: main's `trackMarkers`, copied verbatim, against
 *   this change's `trackMarker`, `trackControl` and one-decode
 *   `trackMarkers` on one recorded cast.
 * @position Evidence that the reads are unchanged, old code against new.
 */

import type {Page} from '@playwright/test';
import {expect, test} from '@astryxdesign/a11y-spec/playwright';
import {
  AHEAD_CONTROL_RGB,
  colorBlockPx,
  CONTROL_RGB,
  CONTROL_SIDE,
  controlColor,
  markElement,
  MARKER_RGB,
  startBusyControl,
  startScreencast,
  SUBPIXEL_STEP_PX,
  trackControl,
  trackMarker,
  trackMarkers,
  type Box,
  type CastFrame,
  type TrackedFrame,
} from './index';

// main's trackMarkers at 1d1d9ad960, verbatim but for its name.
async function legacyTrackMarkers(
  page: Page,
  frames: readonly CastFrame[],
  {
    colors,
    tolerance = 40,
    region,
    subpixel = false,
  }: {
    colors: readonly (readonly [number, number, number])[];
    tolerance?: number;
    region?: Box;
    subpixel?: boolean;
  },
): Promise<TrackedFrame[][]> {
  if (subpixel && frames.some(f => f.format !== 'png')) {
    throw new Error(
      "trackMarkers: subpixel needs a PNG cast; a JPEG frame's chroma blocks hide the marker's edges",
    );
  }
  const isDefaultMarker = colors.map(rgb =>
    rgb.every((value, i) => value === MARKER_RGB[i]),
  );
  const scratch = await page.context().newPage();
  try {
    const out: TrackedFrame[][] = colors.map(() => []);
    // Batches keep each evaluate payload moderate.
    for (let i = 0; i < frames.length; i += 12) {
      const batch = frames.slice(i, i + 12);
      const results = await scratch.evaluate(
        async ({batch: items, palette, tol, area, sub}) => {
          const found: {
            boxes: ({
              x: number;
              y: number;
              width: number;
              height: number;
            } | null)[];
            pixels: number[];
            scale: number;
          }[] = [];
          for (const item of items) {
            const blob = await (
              await fetch(`data:image/${item.format};base64,${item.data}`)
            ).blob();
            const bitmap = await createImageBitmap(blob);
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const context = canvas.getContext('2d');
            if (context == null) {
              throw new Error('no 2d context');
            }
            context.drawImage(bitmap, 0, 0);
            const scale = bitmap.width / item.viewportWidth;
            const left = area == null ? 0 : Math.floor(area.x * scale);
            const top = area == null ? 0 : Math.floor(area.y * scale);
            const right =
              area == null
                ? bitmap.width
                : Math.min(
                    bitmap.width,
                    Math.ceil((area.x + area.width) * scale),
                  );
            const bottom =
              area == null
                ? bitmap.height
                : Math.min(
                    bitmap.height,
                    Math.ceil((area.y + area.height) * scale),
                  );
            const {data, width, height} = context.getImageData(
              left,
              top,
              right - left,
              bottom - top,
            );
            const minX = palette.map(() => Infinity);
            const minY = palette.map(() => Infinity);
            const maxX = palette.map(() => -Infinity);
            const maxY = palette.map(() => -Infinity);
            const pixels = palette.map(() => 0);
            for (let y = 0; y < height; y += 1) {
              for (let x = 0; x < width; x += 1) {
                const o = (y * width + x) * 4;
                for (let c = 0; c < palette.length; c += 1) {
                  const color = palette[c];
                  if (
                    Math.abs(data[o] - color[0]) <= tol &&
                    Math.abs(data[o + 1] - color[1]) <= tol &&
                    Math.abs(data[o + 2] - color[2]) <= tol
                  ) {
                    pixels[c] += 1;
                    if (x < minX[c]) {
                      minX[c] = x;
                    }
                    if (x > maxX[c]) {
                      maxX[c] = x;
                    }
                    if (y < minY[c]) {
                      minY[c] = y;
                    }
                    if (y > maxY[c]) {
                      maxY[c] = y;
                    }
                  }
                }
              }
            }
            // The marker's box from its anti-aliased edges: each pixel counts
            // by its color's share of the way from the background to the
            // marker's. The background is the median of a ring 2 px out.
            const fine = (c: number) => {
              const x0 = Math.max(0, minX[c] - 2);
              const x1 = Math.min(width - 1, maxX[c] + 2);
              const y0 = Math.max(0, minY[c] - 2);
              const y1 = Math.min(height - 1, maxY[c] + 2);
              const ring: number[][] = [[], [], []];
              for (let y = y0; y <= y1; y += 1) {
                for (let x = x0; x <= x1; x += 1) {
                  if (x === x0 || x === x1 || y === y0 || y === y1) {
                    const o = (y * width + x) * 4;
                    for (let k = 0; k < 3; k += 1) {
                      ring[k].push(data[o + k]);
                    }
                  }
                }
              }
              const background = ring.map(values => {
                const sorted = values.sort((a, b) => a - b);
                return sorted[Math.floor(sorted.length / 2)];
              });
              const toward = palette[c].map((v, k) => v - background[k]);
              const span = toward.reduce((sum, v) => sum + v * v, 0);
              if (span < 30 * 30) {
                throw new Error(
                  `trackMarkers: the marker's color lies within ${Math.sqrt(span).toFixed(0)} of its background, too close to read under a pixel`,
                );
              }
              let total = 0;
              let sumX = 0;
              let sumY = 0;
              const rows: number[] = [];
              const columns = new Array<number>(x1 - x0 + 1).fill(0);
              for (let y = y0; y <= y1; y += 1) {
                let row = 0;
                for (let x = x0; x <= x1; x += 1) {
                  const o = (y * width + x) * 4;
                  let dot = 0;
                  for (let k = 0; k < 3; k += 1) {
                    dot += (data[o + k] - background[k]) * toward[k];
                  }
                  const weight = Math.min(1, Math.max(0, dot / span));
                  total += weight;
                  sumX += weight * (x + 0.5);
                  sumY += weight * (y + 0.5);
                  row += weight;
                  columns[x - x0] += weight;
                }
                if (y > minY[c] && y < maxY[c]) {
                  rows.push(row);
                }
              }
              const median = (values: number[], fallback: number) => {
                if (values.length === 0) {
                  return fallback;
                }
                const sorted = [...values].sort((a, b) => a - b);
                return sorted[Math.floor(sorted.length / 2)];
              };
              const markerWidth = median(rows, maxX[c] - minX[c] + 1);
              const markerHeight = median(
                columns.filter((_, i) => x0 + i > minX[c] && x0 + i < maxX[c]),
                maxY[c] - minY[c] + 1,
              );
              return {
                x: (left + sumX / total - markerWidth / 2) / scale,
                y: (top + sumY / total - markerHeight / 2) / scale,
                width: markerWidth / scale,
                height: markerHeight / scale,
              };
            };
            found.push({
              boxes: palette.map((_, c) =>
                pixels[c] === 0
                  ? null
                  : sub
                    ? fine(c)
                    : {
                        x: (left + minX[c]) / scale,
                        y: (top + minY[c]) / scale,
                        width: (maxX[c] - minX[c] + 1) / scale,
                        height: (maxY[c] - minY[c] + 1) / scale,
                      },
              ),
              pixels,
              scale,
            });
          }
          return found;
        },
        {
          batch: batch.map(f => ({
            data: f.data,
            format: f.format,
            viewportWidth: f.viewportWidth,
          })),
          palette: colors.map(rgb => [...rgb]),
          tol: tolerance,
          area: region ?? null,
          sub: subpixel,
        },
      );
      results.forEach((result, k) => {
        const block = isDefaultMarker.some(Boolean)
          ? colorBlockPx(batch[k].data, batch[k].format)
          : null;
        const {engine} = batch[k];
        colors.forEach((_, c) => {
          out[c].push({
            ...(subpixel
              ? {
                  t: batch[k].t,
                  box: result.boxes[c],
                  pixels: result.pixels[c],
                  step: {x: SUBPIXEL_STEP_PX, y: SUBPIXEL_STEP_PX},
                }
              : isDefaultMarker[c] && block != null
                ? {
                    t: batch[k].t,
                    box: result.boxes[c],
                    pixels: result.pixels[c],
                    step: {
                      x: block.x / result.scale,
                      y: block.y / result.scale,
                    },
                  }
                : {
                    t: batch[k].t,
                    box: result.boxes[c],
                    pixels: result.pixels[c],
                  }),
            ...(engine == null ? {} : {engine}),
          });
        });
      });
    }
    return out;
  } finally {
    await scratch.close();
  }
}

// main's trackControl searched this strip (CONTROL_TRAVEL is 240 px).
const LEGACY_STRIP = {
  x: 0,
  y: 0,
  width: CONTROL_SIDE + 240 + 4,
  height: CONTROL_SIDE + 4,
};
const LEGACY_AHEAD_STRIP = {...LEGACY_STRIP, y: CONTROL_SIDE + 4 - 2};

test('NOT FOR LANDING: main trackMarkers against this change on one recorded cast', async ({
  page,
}) => {
  await page.setContent(
    '<meta name=viewport content="width=device-width,initial-scale=1"><style>body{margin:0;background:#fff}</style><div id="subject" style="position:fixed;left:20px;top:60px;width:200px;height:60px;background:#fff"></div>',
  );
  const subject = page.locator('#subject');
  await markElement(subject);
  const first = await startBusyControl(page);
  const ahead = await startBusyControl(page, {ahead: true});
  await subject.evaluate(element => {
    element.animate(
      [{transform: 'translateX(0)'}, {transform: 'translateX(160px)'}],
      {duration: 600, iterations: Infinity, direction: 'alternate'},
    );
  });
  const cast = await startScreencast(page);
  await page.waitForTimeout(800);
  const frames = await cast.stop();
  await first.remove();
  await ahead.remove();
  expect(controlColor().region).toEqual(LEGACY_STRIP);
  expect(controlColor({ahead: true}).region).toEqual(LEGACY_AHEAD_STRIP);
  const [oldMarker] = await legacyTrackMarkers(page, [...frames], {
    colors: [MARKER_RGB],
  });
  const [oldControl] = await legacyTrackMarkers(page, [...frames], {
    colors: [CONTROL_RGB],
    region: LEGACY_STRIP,
  });
  const [oldAhead] = await legacyTrackMarkers(page, [...frames], {
    colors: [AHEAD_CONTROL_RGB],
    region: LEGACY_AHEAD_STRIP,
  });
  expect(await trackMarker(page, [...frames])).toEqual(oldMarker);
  expect(await trackControl(page, [...frames])).toEqual(oldControl);
  expect(await trackControl(page, [...frames], {ahead: true})).toEqual(
    oldAhead,
  );
  expect(
    await trackMarkers(page, [...frames], {
      colors: [MARKER_RGB, controlColor(), controlColor({ahead: true})],
    }),
  ).toEqual([oldMarker, oldControl, oldAhead]);
  for (const track of [oldMarker, oldControl, oldAhead]) {
    expect(track.filter(f => f.box != null).length).toBeGreaterThan(
      frames.length / 2,
    );
  }
  console.log(
    `LEGACY-EQUAL frames=${frames.length} found=${[oldMarker, oldControl, oldAhead].map(t => t.filter(f => f.box != null).length).join('/')}`,
  );
});
