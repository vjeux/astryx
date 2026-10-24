// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file trace.ts
 * @input Page events
 * @output window.__trace: what the page saw and did, on the page clock
 * @position Spike only
 *
 * Everything is in ms on the page clock (performance.now()); add
 * timeOrigin for epoch ms. The page can only log while its main thread
 * runs, so a gap in the log during a busy block is expected: the video is
 * the ground truth for what was on screen.
 */

export interface TraceEvent {
  /** performance.now() when logged. */
  t: number;
  type: string;
  [key: string]: unknown;
}

export interface Trace {
  meta: Record<string, unknown>;
  timeOrigin: number;
  events: TraceEvent[];
  /** [eventTimeStamp, scrollTop] per scroll event (hybrid). */
  scroll: number[][];
  /** [eventTimeStamp, clientY, logged performance.now()] per touch/pointer move. */
  moves: number[][];
}

export interface Tracer {
  trace: Trace;
  log(type: string, data?: Record<string, unknown>): void;
  scroll(timeStamp: number, s: number): void;
  move(timeStamp: number, y: number): void;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function createTracer(meta: Record<string, unknown>): Tracer {
  const trace: Trace = {
    meta,
    timeOrigin: performance.timeOrigin,
    events: [],
    scroll: [],
    moves: [],
  };
  (window as unknown as {__trace: Trace}).__trace = trace;
  return {
    trace,
    log(type, data = {}) {
      trace.events.push({t: r1(performance.now()), type, ...data});
    },
    scroll(timeStamp, s) {
      trace.scroll.push([r1(timeStamp), r1(s)]);
    },
    move(timeStamp, y) {
      trace.moves.push([r1(timeStamp), r1(y), r1(performance.now())]);
    },
  };
}
