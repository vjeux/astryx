// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file busy.unjudged.test.ts
 * @input busy.ts
 * @output Unit tests of the predicted-move rule: a frame predicted to move
 *   under one cast step is too little to judge, every other frame must show a
 *   new position, and a window it cannot predict fails by name
 * @position Harness unit tests, beside busy.control.test.ts
 */

import {describe, expect, it} from 'vitest';

import {BusyPredictionError, busyWindowProof, type BlockedWindow} from './busy';
import {ZOOM_CASTS, type RecordedZoomCast} from './busy.unjudged.fixture';
import {FrameStarvationError, type TrackedFrame} from './frames';

const FROM = 1_000_000;
const FRAME = 1000 / 60;
/** 60 frames from 100 ms before the block to its end. */
const TIMES = Array.from({length: 60}, (_, i) => FROM - 100 + i * FRAME);

/** A curve that moves `pace(t)` px per 60 Hz frame, from 200 px at the block. */
function curve(pace: (t: number) => number): (t: number) => number {
  const samples: Array<[number, number]> = [];
  let y = 200;
  for (let t = FROM - 300; t <= FROM + 1300; t += 2) {
    samples.push([t, y]);
    if (t >= FROM) {
      y -= (pace(t) * 2) / FRAME;
    }
  }
  return t => {
    const i = Math.min(
      Math.max(Math.round((t - samples[0][0]) / 2), 0),
      samples.length - 1,
    );
    return samples[i][1];
  };
}

function window(at: (t: number) => number): BlockedWindow {
  const geometry: Array<[number, number, number, number, number]> = [];
  for (let t = FROM - 250; t <= FROM + 1250; t += 2) {
    geometry.push([t, 0, at(t), 100, 100]);
  }
  return {
    from: FROM,
    to: FROM + 900,
    spanMs: 900,
    animation: {from: FROM, to: FROM + 2000, holds: true, geometry},
  };
}

/** The component's frames: its curve as the cast reads it, in whole px. */
function frames(
  at: (t: number) => number,
  shown: (t: number, y: number) => number = (_t, y) => y,
): TrackedFrame[] {
  return TIMES.map(t => ({
    t,
    box: {x: 0, y: Math.round(shown(t, at(t))), width: 100, height: 100},
    pixels: 1,
    step: {x: 1, y: 1},
  }));
}

/** When the control started: it crosses 240 px and back every 800 ms. */
const CONTROL_START = FROM - 100;
const control: TrackedFrame[] = TIMES.map(t => {
  const phase = ((t - CONTROL_START) % 800) / 400;
  const x = Math.round(240 * (phase < 1 ? phase : 2 - phase));
  return {t, box: {x, y: 0, width: 12, height: 12}, pixels: 144};
});
const options = {
  axis: 'y',
  control,
  controlStarts: [CONTROL_START],
} as const;

/** A recorded cast's frames, its window with or without the replay, and its options. */
function replay(cast: RecordedZoomCast, withReplay: boolean) {
  const at = (t: number) => cast.block.from + t;
  const tracked: TrackedFrame[] = cast.frames.map(([t, y, h]) => ({
    t: at(t),
    box: y == null || h == null ? null : {x: 0, y, width: 100, height: h},
    pixels: 1,
    step: {x: 1, y: 1},
    engine: 'chromium',
  }));
  const series = (rows: RecordedZoomCast['control'], top: number) =>
    rows.map(([t, x]): TrackedFrame => ({
      t: at(t),
      box: x == null ? null : {x, y: top, width: 12, height: 12},
      pixels: x == null ? 0 : 144,
      engine: 'chromium',
    }));
  const window: BlockedWindow = withReplay
    ? {
        ...cast.block,
        animation: {
          ...cast.animation,
          geometry: cast.geometry.map(([t, y]) => [t, 0, y, 0, 0] as const),
        },
      }
    : {
        ...cast.block,
        animation: {
          from: cast.animation.from,
          to: cast.animation.to,
          holds: cast.animation.holds,
        },
      };
  return {
    tracked,
    window,
    options: {
      axis: 'y' as const,
      settledWithin: 24,
      control: series(cast.control, 0),
      ...(withReplay
        ? {ahead: series(cast.ahead, 16), controlStarts: cast.controlStarts}
        : {}),
    },
  };
}

describe('busyWindowProof on recorded Lightbox zoom casts', () => {
  it('reds the first cast by the cast-step rule: a frame under a step reads as a miss', () => {
    const {tracked, window, options} = replay(ZOOM_CASTS[0], false);
    expect(
      busyWindowProof(tracked, window, options).verdict.failures.join(' '),
    ).toMatch(/moved on 34 of the 35 frames/);
  });

  it('excuses a frame of the second cast as under a step, which the zoom spec rejects', () => {
    const {tracked, window, options} = replay(ZOOM_CASTS[1], false);
    expect(busyWindowProof(tracked, window, options).control?.belowStep).toBe(
      1,
    );
  });

  for (const [name, offset] of [
    ['moves a quarter less', (y: number, y0: number) => y0 + 0.75 * (y - y0)],
    [
      'sits a quarter of its travel off',
      (y: number, y0: number, travel: number) => y + travel / 4,
    ],
  ] as const) {
    it(`never predicts with a replay that ${name}: the cast-step rule judges, and the notes say why`, () => {
      const cast = ZOOM_CASTS[1];
      const y0 = cast.geometry[0][1];
      const travel = cast.geometry.at(-1)![1] - y0;
      const {tracked, window, options} = replay(
        {
          ...cast,
          geometry: cast.geometry.map(
            ([t, y]) => [t, offset(y, y0, travel)] as const,
          ),
        },
        true,
      );
      const proof = busyWindowProof(tracked, window, options);
      expect(proof.notes.join(' ')).toMatch(
        /no prediction: .* so the cast-step rule judges each frame/,
      );
      expect(proof.unjudged).toEqual([]);
      expect(proof.control?.belowStep).toBe(1);
      // A proof without a control is not dated, and falls back the same way.
      const alone = busyWindowProof(tracked, window, {
        axis: 'y',
        settledWithin: 24,
      });
      expect(alone.notes.join(' ')).toMatch(/no prediction: /);
    });
  }

  for (const [n, cast] of ZOOM_CASTS.entries()) {
    it(`judges cast ${n + 1} on the replay: frames under a step are named, the rest move`, () => {
      const {tracked, window, options} = replay(cast, true);
      const proof = busyWindowProof(tracked, window, options);
      expect(proof.verdict.failures).toEqual([]);
      expect(proof.control?.belowStep).toBe(0);
      expect(proof.unjudged.some(u => u.why === 'step')).toBe(true);
      expect(proof.control?.moved).toBeGreaterThanOrEqual(26);
    });
  }
});

describe('busyWindowProof with a predicted move', () => {
  it('names a frame predicted to move under one cast step, and judges the rest', () => {
    // Slow at first (0.4 px a frame), then 3 px a frame.
    const at = curve(t => (t < FROM + 100 ? 0.4 : 3));
    const proof = busyWindowProof(frames(at), window(at), options);
    expect(proof.verdict.failures).toEqual([]);
    const steps = proof.unjudged.filter(u => u.why === 'step');
    expect(steps.length).toBeGreaterThan(0);
    expect(steps.every(u => u.predictedPx < 1)).toBe(true);
    expect(proof.summary).toContain('too little to judge');
    expect(proof.control?.belowStep).toBe(0);
  });

  it('fails a frame predicted to move a full step that shows none', () => {
    const at = curve(() => 3);
    const proof = busyWindowProof(
      frames(at, (t, y) =>
        Math.abs(t - (FROM + 400)) < 1 ? at(t - FRAME) : y,
      ),
      window(at),
      options,
    );
    expect(proof.verdict.failures.join(' ')).toMatch(/moved on \d+ of the \d+/);
  });

  it('fails a frozen component in a fast part', () => {
    const at = curve(() => 3);
    const proof = busyWindowProof(
      frames(at, (t, y) =>
        t > FROM + 200 && t < FROM + 500 ? at(FROM + 200) : y,
      ),
      window(at),
      options,
    );
    expect(proof.verdict.failures.length).toBeGreaterThan(0);
  });

  it('fails a component that shows a new position on every other frame', () => {
    const at = curve(() => 2);
    const proof = busyWindowProof(
      frames(at, (t, y) =>
        Math.round((t - TIMES[0]) / FRAME) % 2 === 1 ? at(t - FRAME) : y,
      ),
      window(at),
      options,
    );
    expect(proof.verdict.failures.join(' ')).toMatch(/moved on \d+ of the \d+/);
  });

  it('throws named starvation when too few frames are left to judge', () => {
    const at = curve(() => 0.3);
    expect(() => busyWindowProof(frames(at), window(at), options)).toThrow(
      FrameStarvationError,
    );
  });

  it('fails by name a window it cannot predict', () => {
    const at = curve(() => 3);
    const unpredictable = {
      ...window(at),
      animation: {
        from: FROM,
        to: FROM + 2000,
        holds: true,
        unpredictable: 'an ancestor of the element moves too',
      },
    };
    expect(() => busyWindowProof(frames(at), unpredictable, options)).toThrow(
      BusyPredictionError,
    );
  });

  it('fails by name a replay that drifted from the element', () => {
    const at = curve(() => 3);
    const drifted = {
      ...window(at),
      animation: {
        ...window(at).animation!,
        check: {predicted: [0, 100, 100, 100], actual: [0, 104, 100, 100]},
      },
    } as BlockedWindow;
    expect(() => busyWindowProof(frames(at), drifted, options)).toThrow(
      BusyPredictionError,
    );
  });

  it('keeps the cast-step rule for a window with no replay', () => {
    const at = curve(t => (t < FROM + 100 ? 0.4 : 3));
    const {animation: _animation, ...plain} = window(at);
    const proof = busyWindowProof(frames(at), plain, options);
    expect(proof.unjudged).toEqual([]);
    expect(proof.control?.belowStep).toBeGreaterThan(0);
  });
});
