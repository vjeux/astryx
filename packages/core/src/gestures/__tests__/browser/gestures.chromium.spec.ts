// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file gestures.chromium.spec.ts
 * @input The gesture fixture bundled with esbuild, a phone-emulated Chromium,
 *   and real touch input dispatched through CDP with explicit timestamps
 * @output Browser proof of the negotiation the unit tests cannot see:
 *   touch-action per element, touchmove cancelled exactly while a recognizer
 *   owns the finger, native scrolling untouched otherwise, click suppression
 *   with no ghost click, scroll handoff at the content's edge, pinch-zoom
 *   left to the browser, a second finger that never breaks the first, and
 *   timing taken from event timestamps under a blocked main thread
 * @position Browser tests of packages/core/src/gestures (see
 *   playwright.config.ts beside this file)
 */

import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {expect, test, type CDPSession, type Page} from '@playwright/test';

interface Entry {
  name: string;
  state: string;
  time: number;
  x?: number;
  y?: number;
  scale?: number;
  handoff?: boolean;
  beganAt?: number | null;
  startedAt?: number;
}

let bundle = '';

test.beforeAll(async () => {
  const result = await build({
    entryPoints: [
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixture.ts'),
    ],
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
    target: 'es2022',
  });
  bundle = result.outputFiles[0].text;
});

type Point = {x: number; y: number};

/** Touch input with timestamps on the page's own clock. */
class Fingers {
  private base = 0;
  constructor(
    private readonly cdp: CDPSession,
    private readonly origin: number,
  ) {}

  /** Start a gesture clock at the page's current time (plus a margin). */
  async begin(page: Page): Promise<number> {
    this.base = Math.ceil(await page.evaluate(() => performance.now())) + 50;
    return this.base;
  }

  private stamp(t: number): number {
    return (this.origin + this.base + t) / 1000;
  }

  async send(
    type: 'touchStart' | 'touchMove' | 'touchEnd' | 'touchCancel',
    points: (Point & {id: number})[],
    t: number,
  ): Promise<void> {
    await this.cdp.send('Input.dispatchTouchEvent', {
      type,
      touchPoints: points.map(point => ({
        x: point.x,
        y: point.y,
        id: point.id,
      })),
      timestamp: this.stamp(t),
    });
  }

  /** One finger from `from` to `to` in `steps` frames of 16 ms, then lift. */
  async drag(
    from: Point,
    to: Point,
    {steps = 12, lift = true}: {steps?: number; lift?: boolean} = {},
  ): Promise<number> {
    await this.send('touchStart', [{...from, id: 1}], 0);
    let t = 0;
    for (let i = 1; i <= steps; i++) {
      t = i * 16;
      const k = i / steps;
      await this.send(
        'touchMove',
        [
          {
            x: from.x + (to.x - from.x) * k,
            y: from.y + (to.y - from.y) * k,
            id: 1,
          },
        ],
        t,
      );
    }
    if (lift) {
      t += 16;
      await this.send('touchEnd', [], t);
    }
    return t;
  }

  async tap(at: Point, duration = 60): Promise<void> {
    await this.send('touchStart', [{...at, id: 1}], 0);
    await this.send('touchEnd', [], duration);
  }
}

async function open(page: Page): Promise<{fingers: Fingers; cdp: CDPSession}> {
  // A real navigation first: touch emulation exposes the Touch Events API
  // to documents it creates.
  await page.goto('about:blank');
  await page.setContent(
    '<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><body></body>',
  );
  await page.addScriptTag({content: bundle});
  const cdp = await page.context().newCDPSession(page);
  const origin = await page.evaluate(() => performance.timeOrigin);
  return {fingers: new Fingers(cdp, origin), cdp};
}

async function center(page: Page, id: string): Promise<Point> {
  const box = await page.locator(`#${id}`).boundingBox();
  if (box == null) {
    throw new Error(`#${id} has no box`);
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

async function log(page: Page): Promise<Entry[]> {
  await page.waitForTimeout(50);
  return page.evaluate(() => window.__gestures);
}

async function scrollTop(page: Page, id: string): Promise<number> {
  return page.evaluate(
    target => document.getElementById(target)?.scrollTop ?? -1,
    id,
  );
}

const states = (entries: Entry[], name: string) =>
  entries.filter(entry => entry.name === name).map(entry => entry.state);

test('derives touch-action per element from its recognizers', async ({
  page,
}) => {
  await open(page);
  const actions = await page.evaluate(() =>
    Object.fromEntries(
      ['hpan', 'tapper', 'presser', 'pinchable', 'sheetBody'].map(id => [
        id,
        getComputedStyle(document.getElementById(id) as HTMLElement)
          .touchAction,
      ]),
    ),
  );
  expect(actions).toEqual({
    hpan: 'pan-y pinch-zoom',
    tapper: 'manipulation',
    presser: 'manipulation',
    pinchable: 'none',
    sheetBody: 'manipulation',
  });
});

test('a horizontal drag on a pan-y element is the recognizer’s: nothing scrolls and no click fires', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const start = await center(page, 'hbutton');
  await fingers.begin(page);
  // A 4:1 drag, the shape WebKit would otherwise pan natively.
  await fingers.drag(start, {x: start.x + 120, y: start.y + 30});
  const entries = await log(page);
  expect(states(entries, 'hpan')).toEqual([
    'began',
    ...Array(states(entries, 'hpan').length - 3).fill('changed'),
    'ended',
    'possible',
  ]);
  const last = entries
    .filter(entry => entry.name === 'hpan' && entry.state === 'changed')
    .at(-1);
  expect(last?.x).toBeCloseTo(120, 0);
  expect(await scrollTop(page, 'scroller')).toBe(0);
  expect(entries.some(entry => entry.name.startsWith('click:'))).toBe(false);
  expect(entries.some(entry => entry.name.startsWith('mousedown:'))).toBe(
    false,
  );
});

test('a vertical drag on the same element scrolls natively and fails the pan', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const start = await center(page, 'hpan');
  await fingers.begin(page);
  await fingers.drag(start, {x: start.x + 4, y: start.y - 120});
  const entries = await log(page);
  expect(states(entries, 'hpan')).toEqual(['failed', 'possible']);
  expect(await scrollTop(page, 'scroller')).toBeGreaterThan(60);
  expect(entries.some(entry => entry.name.startsWith('click:'))).toBe(false);
});

test('a tap recognizer replaces the click: no ghost click, no compatibility mouse events', async ({
  page,
}) => {
  const {fingers} = await open(page);
  await fingers.begin(page);
  await fingers.tap(await center(page, 'tapper'));
  let entries = await log(page);
  expect(states(entries, 'tap')).toEqual(['ended', 'possible']);
  expect(entries.filter(entry => entry.state === 'dom')).toEqual([]);

  // A tap the pan does not take keeps its click (exactly one).
  await fingers.begin(page);
  await fingers.tap(await center(page, 'hbutton'));
  entries = await log(page);
  expect(entries.filter(entry => entry.name === 'click:hbutton')).toHaveLength(
    1,
  );
});

test('scroll handoff: at the top the pull is the sheet’s at once', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const start = await center(page, 'sheetBody');
  await fingers.begin(page);
  await fingers.drag(start, {x: start.x, y: start.y + 96});
  const entries = await log(page);
  const sheet = entries.filter(entry => entry.name === 'sheet');
  expect(sheet[0]?.state).toBe('began');
  expect(sheet[0]?.handoff).toBe(false);
  expect(
    sheet.filter(entry => entry.state === 'changed').at(-1)?.y,
  ).toBeCloseTo(96, 0);
  expect(await scrollTop(page, 'sheetBody')).toBe(0);
});

test('scroll handoff: mid-content the browser scrolls first and the sheet takes the rest', async ({
  page,
}) => {
  const {fingers} = await open(page);
  await page.evaluate(() => {
    (document.getElementById('sheetBody') as HTMLElement).scrollTop = 60;
  });
  const start = await center(page, 'sheetBody');
  start.y -= 60;
  await fingers.begin(page);
  await fingers.drag(start, {x: start.x, y: start.y + 200}, {steps: 25});
  const entries = await log(page);
  const sheet = entries.filter(entry => entry.name === 'sheet');
  expect(await scrollTop(page, 'sheetBody')).toBe(0);
  expect(sheet[0]?.state).toBe('began');
  expect(sheet[0]?.handoff).toBe(true);
  // The content took the first 60 px (and the browser its touch slop); the
  // sheet got the rest of the finger's travel.
  const final = sheet.filter(entry => entry.state === 'changed').at(-1)?.y ?? 0;
  expect(final).toBeGreaterThan(200 - 60 - 24);
  expect(final).toBeLessThanOrEqual(200 - 60 + 1);
});

test('pinch-zoom stays the browser’s on an element without a pinch recognizer', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const at = await center(page, 'tapper');
  await fingers.begin(page);
  await fingers.send('touchStart', [{x: at.x - 20, y: at.y, id: 1}], 0);
  await fingers.send(
    'touchStart',
    [
      {x: at.x - 20, y: at.y, id: 1},
      {x: at.x + 20, y: at.y, id: 2},
    ],
    30,
  );
  for (let i = 1; i <= 12; i++) {
    const spread = 20 + i * 8;
    await fingers.send(
      'touchMove',
      [
        {x: at.x - spread, y: at.y, id: 1},
        {x: at.x + spread, y: at.y, id: 2},
      ],
      30 + i * 16,
    );
  }
  await fingers.send('touchEnd', [], 30 + 13 * 16);
  await page.waitForTimeout(400);
  expect(
    await page.evaluate(() => window.visualViewport?.scale ?? 1),
  ).toBeGreaterThan(1.2);
  expect(states(await log(page), 'tap')).not.toContain('ended');
});

test('a pinch recognizer takes the two-finger gesture on its element only, alongside its pan', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const at = await center(page, 'pinchable');
  await fingers.begin(page);
  await fingers.send('touchStart', [{x: at.x - 20, y: at.y, id: 1}], 0);
  await fingers.send(
    'touchStart',
    [
      {x: at.x - 20, y: at.y, id: 1},
      {x: at.x + 20, y: at.y, id: 2},
    ],
    20,
  );
  for (let i = 1; i <= 10; i++) {
    const spread = 20 + i * 4;
    await fingers.send(
      'touchMove',
      [
        {x: at.x - spread + i, y: at.y, id: 1},
        {x: at.x + spread + i, y: at.y, id: 2},
      ],
      20 + i * 16,
    );
  }
  await fingers.send('touchEnd', [], 20 + 11 * 16);
  const entries = await log(page);
  expect(states(entries, 'pinch')[0]).toBe('began');
  const scale = entries
    .filter(entry => entry.name === 'pinch' && entry.state === 'changed')
    .at(-1)?.scale;
  expect(scale).toBeCloseTo(60 / 20, 1);
  expect(states(entries, 'pinchPan')).toContain('began');
  expect(await page.evaluate(() => window.visualViewport?.scale ?? 1)).toBe(1);
});

test('a second finger never breaks a claimed one-finger pan', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const start = await center(page, 'hbutton');
  const other = await center(page, 'tapper');
  await fingers.begin(page);
  await fingers.send('touchStart', [{...start, id: 1}], 0);
  for (let i = 1; i <= 4; i++) {
    await fingers.send(
      'touchMove',
      [{x: start.x + i * 10, y: start.y, id: 1}],
      i * 16,
    );
  }
  const first = {x: start.x + 40, y: start.y, id: 1};
  await fingers.send('touchStart', [first, {...other, id: 2}], 80);
  for (let i = 1; i <= 6; i++) {
    await fingers.send(
      'touchMove',
      [
        {x: first.x + i * 5, y: first.y, id: 1},
        {x: other.x + i * 15, y: other.y + i * 15, id: 2},
      ],
      80 + i * 16,
    );
  }
  await fingers.send('touchEnd', [{x: first.x + 30, y: first.y, id: 1}], 200);
  await fingers.send('touchEnd', [], 216);
  const entries = await log(page);
  const hpan = entries.filter(entry => entry.name === 'hpan');
  expect(hpan.map(entry => entry.state)).not.toContain('cancelled');
  expect(hpan.filter(entry => entry.state === 'changed').at(-1)?.x).toBeCloseTo(
    70,
    0,
  );
  expect(await page.evaluate(() => window.visualViewport?.scale ?? 1)).toBe(1);
});

test('a long press begins at touch-down + 500 ms on the event clock, even when the main thread was blocked', async ({
  page,
}) => {
  const {fingers} = await open(page);
  const at = await center(page, 'presser');
  const base = await fingers.begin(page);
  await fingers.send('touchStart', [{...at, id: 1}], 0);
  // Block the main thread well past the press duration.
  await page.evaluate(() => {
    const end = performance.now() + 800;
    while (performance.now() < end) {
      // busy
    }
  });
  await page.waitForTimeout(100);
  await fingers.send('touchEnd', [], 1000);
  const entries = await log(page);
  const began = entries.find(
    entry => entry.name === 'press' && entry.state === 'began',
  );
  // The touch carries the timestamp CDP gave it (to the browser's 0.1 ms
  // timestamp precision), and the press began exactly 500 ms after it.
  expect(Math.abs((began?.startedAt ?? 0) - base)).toBeLessThan(0.5);
  expect((began?.beganAt ?? 0) - (began?.startedAt ?? 0)).toBeCloseTo(500, 6);
  expect(states(entries, 'press')).toEqual(['began', 'ended', 'possible']);
  expect(entries.some(entry => entry.name.startsWith('click:'))).toBe(false);
});
