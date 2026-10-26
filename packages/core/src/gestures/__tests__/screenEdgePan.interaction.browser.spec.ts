// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file screenEdgePan.interaction.browser.spec.ts
 * @input ScreenEdgePanGestureRecognizer and the gesture arena, bundled with
 *   esbuild (screenEdgePanBundle.ts) onto a fixture page whose content
 *   scrolls horizontally; real touch input from the interaction harness, in
 *   Chromium and WebKit on the phone profile
 * @output spec:AST-094 FR18's browser cases for DEC-13's edge band: a touch
 *   landing in the 40.2 px band holds the axis until the pan claims it at
 *   15 px of travel, not at 14, and the browser scrolls nothing from the
 *   band even when the pan fails; a touch landing at 41 px, outside the
 *   band, leaves the author's horizontal scroll untouched; on a view wider
 *   than the band, from one edge or two, the pan fails a touch landing at
 *   41 px at once, keeps one landing at 40 px, and the author's scroll there
 *   proceeds
 * @position Browser proof for ScreenEdgePanGestureRecognizer.ts, run by
 *   `pnpm test:interaction`; jsdom has no touch-action or native scrolling
 */

import {fileURLToPath} from 'node:url';
import {
  frames,
  touchDriver,
  type Point,
  type TouchScript,
} from '@astryxdesign/interaction-harness';
import {expect, test, type Page} from '@playwright/test';
import {build} from 'esbuild';
import type {ScreenEdge} from '../ScreenEdgePanGestureRecognizer';
import type {EdgePanEntry, MountedEdgePan} from './screenEdgePanBundle';

/**
 * Where a proof needs the browser's own scroll, which the harness's WebKit
 * touches never start (interaction harness README, engine limits).
 */
const NATIVE_SCROLL_SKIP =
  'injected WebKit touches start no native scroll (interaction harness README: engine limits); the iOS simulator shows the author\u2019s scroll';

/** Where the content starts scrolled to, so a drag to the right can scroll it. */
const SCROLLED = 400;
/** One pixel per step, each step in a frame of its own. */
const STEP_MS = 20;

let script = '';

test.beforeAll(async () => {
  const result = await build({
    entryPoints: [
      fileURLToPath(new URL('./screenEdgePanBundle.ts', import.meta.url)),
    ],
    bundle: true,
    write: false,
    format: 'iife',
    globalName: 'EdgePan',
    target: 'es2022',
  });
  script = result.outputFiles[0].text;
});

/**
 * A page whose content scrolls horizontally, already scrolled; with `band`,
 * a 40.2 px edge zone sits at the screen's left edge (UIKit's edge region on
 * a 402 px wide screen), inside the scrolling content as an app's would be.
 * The pan goes on the band, or on the whole scrolling view without one.
 */
async function open(
  page: Page,
  {band, edges}: {band: boolean; edges: ScreenEdge[]},
): Promise<void> {
  const html = `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  html, body { margin: 0; height: 100%; overflow: hidden; }
  #scroller { display: flex; width: 100vw; height: 100vh; overflow-x: auto; overflow-y: hidden; }
  #content { position: relative; flex: none; width: 1600px; height: 100%; background: repeating-linear-gradient(90deg, #eee 0 20px, #ddd 20px 40px); }
  #band { position: absolute; top: 0; left: ${SCROLLED}px; width: 40.2px; height: 100%; background: rgb(0 0 0 / 0.1); }
</style>
<div id="scroller"><div id="content">${band ? '<div id="band"></div>' : ''}</div></div>
<script>${script}</script>`;
  await page.route('http://edge-pan.test/', async route =>
    route.fulfill({contentType: 'text/html', body: html}),
  );
  await page.goto('http://edge-pan.test/');
  await page.evaluate(
    ({hasBand, edgeList, scrolled}) => {
      const scroller = document.getElementById('scroller') as HTMLElement;
      scroller.scrollLeft = scrolled;
      const view = hasBand
        ? (document.getElementById('band') as HTMLElement)
        : scroller;
      const bundle = (
        window as unknown as {
          EdgePan: {
            mountEdgePan: (
              element: HTMLElement,
              edgesToWatch: ScreenEdge[],
            ) => MountedEdgePan;
          };
        }
      ).EdgePan;
      (window as unknown as {edgePan: MountedEdgePan}).edgePan =
        bundle.mountEdgePan(view, edgeList);
    },
    {hasBand: band, edgeList: edges, scrolled: SCROLLED},
  );
  await frames(page);
}

/**
 * A finger landing at `from` and moving `dx` px along x, one pixel per
 * frame (right when positive), then lifting.
 */
function dragX(from: Point, dx: number): TouchScript {
  const steps = [];
  for (let px = 0; px <= Math.abs(dx); px++) {
    steps.push({
      t: px * STEP_MS,
      fingers: [{id: 1, x: from.x + Math.sign(dx) * px, y: from.y}],
    });
  }
  steps.push({t: (Math.abs(dx) + 1) * STEP_MS, fingers: []});
  return steps;
}

async function readLog(page: Page): Promise<EdgePanEntry[]> {
  return page.evaluate(
    () => (window as unknown as {edgePan: MountedEdgePan}).edgePan.log,
  );
}

async function scrollLeft(page: Page): Promise<number> {
  await frames(page, 3);
  return page.evaluate(
    () => (document.getElementById('scroller') as HTMLElement).scrollLeft,
  );
}

test.describe('a screen-edge pan in its 40.2 px edge band (spec:AST-094 FR18, DEC-13)', () => {
  test('a touch landing in the band holds the axis until the pan claims it at 15 px of travel, not at 14', async ({
    page,
  }) => {
    await open(page, {band: true, edges: ['left']});
    const driver = await touchDriver(page);
    await driver.play(dragX({x: 20, y: 300}, 30));
    const moves = (await readLog(page)).filter(entry => entry.type === 'move');
    // Every move reached the arena: the browser never took the touch.
    expect(moves.length).toBeGreaterThan(0);
    expect(moves.every(entry => entry.cancelable)).toBe(true);
    expect(
      moves.filter(entry => entry.travel < 15).map(entry => entry.state),
    ).toEqual(moves.filter(entry => entry.travel < 15).map(() => 'possible'));
    expect(moves.find(entry => entry.travel >= 15)?.state).toBe('began');
    if (driver.drivesNativeGestures) {
      // Chromium sends no move inside its own 15 px touch slop, so the pan
      // begins on the first move the page sees; the band took the
      // horizontal axis, so the content never scrolled.
      expect(await scrollLeft(page)).toBe(SCROLLED);
    } else {
      // WebKit sends every move: still possible at 14, began at 15.
      expect(
        moves.filter(entry => entry.travel === 14 || entry.travel === 15),
      ).toEqual([
        expect.objectContaining({travel: 14, state: 'possible'}),
        expect.objectContaining({travel: 15, state: 'began'}),
      ]);
    }
  });

  test('the browser scrolls nothing from the band, even for a drag toward the edge that fails the pan', async ({
    page,
  }) => {
    await open(page, {band: true, edges: ['left']});
    const driver = await touchDriver(page);
    test.skip(!driver.drivesNativeGestures, NATIVE_SCROLL_SKIP);
    await driver.play(dragX({x: 30, y: 300}, -25));
    // A drag toward its edge fails the pan; the band keeps the axis anyway.
    expect((await readLog(page)).map(entry => entry.state)).toContain('failed');
    expect(await scrollLeft(page)).toBe(SCROLLED);
  });

  test('a touch landing at 41 px, outside the band, leaves the author\u2019s horizontal scroll untouched', async ({
    page,
  }) => {
    await open(page, {band: true, edges: ['left']});
    const driver = await touchDriver(page);
    test.skip(!driver.drivesNativeGestures, NATIVE_SCROLL_SKIP);
    await driver.play(dragX({x: 41, y: 300}, 60));
    // The pan never saw it, and the content scrolled with the finger.
    expect(await readLog(page)).toEqual([]);
    expect(await scrollLeft(page)).toBeLessThan(SCROLLED);
  });
});

for (const edges of [['left'], ['left', 'right']] satisfies ScreenEdge[][]) {
  test.describe(`a screen-edge pan from ${edges.join(' and ')} on a view wider than its band (spec:AST-094 FR18, DEC-13)`, () => {
    test('fails a touch landing at 41 px at once, and keeps one landing at 40 px', async ({
      page,
    }) => {
      await open(page, {band: false, edges});
      const driver = await touchDriver(page);
      await driver.play(dragX({x: 41, y: 300}, 0));
      await driver.play(dragX({x: 40, y: 300}, 0));
      const downs = (await readLog(page)).filter(
        entry => entry.type === 'down',
      );
      expect(downs.map(entry => entry.state)).toEqual(['failed', 'possible']);
    });

    test('leaves the author\u2019s horizontal scroll there untouched', async ({
      page,
    }) => {
      await open(page, {band: false, edges});
      const driver = await touchDriver(page);
      test.skip(!driver.drivesNativeGestures, NATIVE_SCROLL_SKIP);
      expect(
        await page.evaluate(
          () =>
            (window as unknown as {edgePan: MountedEdgePan}).edgePan
              .touchAction,
        ),
      ).toBe('auto');
      await driver.play(dragX({x: 41, y: 300}, 60));
      expect(await scrollLeft(page)).toBeLessThan(SCROLLED);
    });
  });
}
