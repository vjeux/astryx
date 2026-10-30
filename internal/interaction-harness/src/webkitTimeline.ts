// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file webkitTimeline.ts
 * @input A WebKit `Page` from a locally launched browser (Playwright's
 *   in-process server), and a body to record
 * @output `recordWebKitTimeline` (what WebKit's main thread did while the body
 *   ran: how many records of each kind, their total time, and the rect of
 *   every paint) and `summarizeWebKitTimeline` (the same from raw records)
 * @position WebKit's counterpart of a Chromium rendering trace: a proof that a
 *   compositor-only motion repaints nothing per frame can check WebKit too,
 *   where a property it does not composite, or a layer it does not promote,
 *   repaints what Chromium only moves
 *
 * The records come from WebKit's own inspector Timeline, the one its Web
 * Inspector shows. A Paint record is the main thread recording the content
 * of an area; rasterizing it happens off the main thread, so a Paint costs
 * the main thread little, while on a machine without a GPU the raster of a
 * large area at three device pixels per CSS px can still hold up the next
 * frame, and the touch events that wait for it.
 */

import type {Page} from '@playwright/test';

/** One record of WebKit's Timeline, as the inspector protocol sends it. */
export interface WebKitTimelineRecord {
  readonly type: string;
  /** Seconds, on the inspector's clock. */
  readonly startTime?: number;
  readonly endTime?: number;
  /** A Paint record's `clip` is the painted quad: x1, y1 … x4, y4. */
  readonly data?: {readonly clip?: readonly number[]};
  readonly children?: readonly WebKitTimelineRecord[];
}

/**
 * A painted area: when, and where on screen, in CSS px times the page's
 * scale (a page with `width=device-width` has scale 1).
 */
export interface WebKitPaint {
  /** Ms after the recording's first record began. */
  readonly t: number;
  readonly rect: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
}

export interface WebKitTimeline {
  /** How many records of each type, nested ones included. */
  readonly counts: Readonly<Record<string, number>>;
  /** Their total duration per type, ms (nested records overlap their parent). */
  readonly totalMs: Readonly<Record<string, number>>;
  /** Every Paint, in order. */
  readonly paints: readonly WebKitPaint[];
}

/** Counts, durations and paint rects of a list of Timeline records. */
export function summarizeWebKitTimeline(
  records: readonly WebKitTimelineRecord[],
): WebKitTimeline {
  const counts: Record<string, number> = {};
  const totalMs: Record<string, number> = {};
  const paints: WebKitPaint[] = [];
  const origin = Math.min(
    ...records.map(record => record.startTime ?? Number.POSITIVE_INFINITY),
  );
  const visit = (record: WebKitTimelineRecord) => {
    counts[record.type] = (counts[record.type] ?? 0) + 1;
    if (record.startTime != null && record.endTime != null) {
      totalMs[record.type] =
        (totalMs[record.type] ?? 0) +
        (record.endTime - record.startTime) * 1000;
    }
    const clip = record.data?.clip;
    if (record.type === 'Paint' && clip != null && clip.length >= 8) {
      const xs = [clip[0], clip[2], clip[4], clip[6]];
      const ys = [clip[1], clip[3], clip[5], clip[7]];
      const x = Math.min(...xs);
      const y = Math.min(...ys);
      paints.push({
        t: ((record.startTime ?? origin) - origin) * 1000,
        rect: {x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y},
      });
    }
    for (const child of record.children ?? []) {
      visit(child);
    }
  };
  for (const record of records) {
    visit(record);
  }
  paints.sort((a, b) => a.t - b.t);
  return {counts, totalMs, paints};
}

interface WebKitTargetSession {
  send(method: string, params?: Record<string, unknown>): Promise<unknown>;
  on(event: string, listener: (payload: unknown) => void): unknown;
  removeListener(event: string, listener: (payload: unknown) => void): unknown;
}

/** Playwright's server-side session for the page's WebKit target. */
function webkitTargetSession(page: Page): WebKitTargetSession {
  const connection = (
    page as unknown as {_connection?: {toImpl?: (o: unknown) => unknown}}
  )._connection;
  const impl = connection?.toImpl?.(page) as
    {delegate?: {_session?: WebKitTargetSession}} | undefined;
  const session = impl?.delegate?._session;
  if (session == null || typeof session.send !== 'function') {
    throw new Error(
      "recordWebKitTimeline needs WebKit and Playwright's in-process server (a locally launched browser); this page has neither.",
    );
  }
  return session;
}

/**
 * Records WebKit's Timeline while `body` runs and summarizes it: how many
 * records of each type (Paint, Composite, Layout, RecalculateStyles, …), their
 * total time, and every painted rect. WebKit only; Chromium's counterpart is a
 * rendering trace.
 *
 * What to read: paint during a motion, frame after frame, is the defect.
 * Where an element starts or stops animating on the compositor, WebKit paints
 * it and the area of the layer it leaves or rejoins (its block; on a story
 * page with nothing composited, the whole viewport, as the page enters and
 * leaves compositing mode). `{sentinel: true}` composites a sentinel first,
 * which takes the viewport-wide ones away on a story page.
 */
export async function recordWebKitTimeline(
  page: Page,
  body: () => Promise<void>,
  {
    sentinel = false,
  }: {
    /**
     * Composites a 4 px transparent sentinel for the recording, so the page is
     * in compositing mode before the body runs. Without one, a story page
     * with nothing composited repaints its whole viewport where its first
     * compositor animation starts and again where it ends, as it enters and
     * leaves compositing mode (4 such paints in 4 of 4 runs; none with it).
     */
    sentinel?: boolean;
  } = {},
): Promise<WebKitTimeline> {
  const session = webkitTargetSession(page);
  if (sentinel) {
    // Added two frames before the recording, so entering compositing mode
    // lands outside it; removed after it.
    await page.evaluate(
      () =>
        new Promise<void>(resolve => {
          const element = document.createElement('div');
          element.setAttribute('data-harness-composite-sentinel', '');
          element.setAttribute('aria-hidden', 'true');
          element.style.cssText =
            'position:fixed;left:0;top:0;width:4px;height:4px;will-change:transform;pointer-events:none';
          document.body.append(element);
          const frame =
            (
              window as unknown as {
                __harnessTimerGate?: {frame?: typeof requestAnimationFrame};
              }
            ).__harnessTimerGate?.frame ??
            window.requestAnimationFrame.bind(window);
          frame(() => frame(() => resolve()));
        }),
    );
  }
  try {
    return await recordTimeline(session, body);
  } finally {
    if (sentinel) {
      await page.evaluate(() =>
        document.querySelector('[data-harness-composite-sentinel]')?.remove(),
      );
    }
  }
}

async function recordTimeline(
  session: WebKitTargetSession,
  body: () => Promise<void>,
): Promise<WebKitTimeline> {
  const records: WebKitTimelineRecord[] = [];
  const onRecord = (payload: unknown) => {
    const record = (payload as {record?: WebKitTimelineRecord}).record;
    if (record != null) {
      records.push(record);
    }
  };
  let onStopped: (() => void) | null = null;
  const stopped = new Promise<void>(resolve => {
    onStopped = resolve;
  });
  const stop = () => onStopped?.();
  session.on('Timeline.eventRecorded', onRecord);
  session.on('Timeline.recordingStopped', stop);
  try {
    await session.send('Timeline.setInstruments', {instruments: ['Timeline']});
    await session.send('Timeline.start', {maxCallStackDepth: 0});
    try {
      await body();
    } finally {
      await session.send('Timeline.stop');
      // The records still in flight arrive before WebKit says it stopped.
      await stopped;
    }
  } finally {
    session.removeListener('Timeline.eventRecorded', onRecord);
    session.removeListener('Timeline.recordingStopped', stop);
  }
  return summarizeWebKitTimeline(records);
}
