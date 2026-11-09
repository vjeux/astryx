// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file busy.webkitclock.test.ts
 * @input Synthetic WebKit casts (no browser)
 * @output A WebKit busy proof with a control judges each frame at its time on
 *   the controls' clock. A frame stamped late after a delivery gap passes. A
 *   half-rate fade, on a full cast or a sparse one, and a frozen fade still
 *   fail. Near the first control's turn, the control ahead dates a late
 *   frame; without it, the frame keeps its lateness. Chromium casts and casts
 *   with no control get the proof of their stamps.
 * @position Unit test of ./busy's busyWindowProof on WebKit casts
 */

import {describe, expect, it} from 'vitest';
import {busyWindowProof} from './busy';
import type {TrackedFrame} from './frames';

const FRAME = 1000 / 60;
const BLOCK = {from: 1000, to: 1700};

/** The control's x at page time `ms`: 240 px one way every 400 ms, from 0. */
function xAt(ms: number): number {
  const phase = ((ms % 800) + 800) % 800;
  return phase < 400 ? (phase / 400) * 240 : 240 - ((phase - 400) / 400) * 240;
}

/** A frame the compositor drew at `at`, which the cast stamped at `stamp`. */
interface Shot {
  readonly at: number;
  readonly stamp: number;
}

/** Frames one display interval apart, each stamped when it was drawn. */
function onTime(from = 800, to = 1900): Shot[] {
  const shots: Shot[] = [];
  for (let i = 0; from + i * FRAME <= to; i += 1) {
    shots.push({at: from + i * FRAME, stamp: from + i * FRAME});
  }
  return shots;
}

/**
 * A delivery gap after frame `k + 1`, as WebKit's cast shows one. The frame
 * after frame `k` carries one frame of motion, and the cast stamps it 60 ms
 * late. Nothing is drawn for 77 ms. The frames after that are one interval
 * apart, each stamped when it was drawn.
 */
function lateAfterGap(k: number): Shot[] {
  const shots = onTime().slice(0, k + 1);
  const drawn = shots[k].at + FRAME;
  shots.push({at: drawn, stamp: drawn + 60});
  return [...shots, ...onTime(drawn + 77)];
}

/**
 * The frames as the busy proof gets them. The component's value is on x, as
 * is each control's position: the first one's, and the one half a leg ahead.
 */
function cast(
  shots: readonly Shot[],
  value: (at: number) => number,
  engine?: 'chromium' | 'webkit',
): {
  tracked: TrackedFrame[];
  control: TrackedFrame[];
  ahead: TrackedFrame[];
  carrying: TrackedFrame[];
} {
  const box = (x: number, side: number, y = 0) => ({
    x: Math.round(x),
    y,
    width: side,
    height: side,
  });
  const frame = (stamp: number, x: number, side: number): TrackedFrame => ({
    t: stamp,
    box: box(x, side),
    pixels: side * side,
    ...(engine == null ? {} : {engine}),
  });
  const control = shots.map(({at, stamp}) => frame(stamp, xAt(at), 12));
  return {
    tracked: shots.map(({at, stamp}) => frame(stamp, value(at), 1)),
    control,
    ahead: shots.map(({at, stamp}) => frame(stamp, xAt(at + 200), 12)),
    // The control's frames as `trackControl` reads them in WebKit.
    carrying: control.map((each, i) => ({
      ...each,
      controlAhead: box(xAt(shots[i].at + 200), 12, 16),
    })),
  };
}

/**
 * A fade from 212 by `perFrame` units each display interval. At 0.6 no frame
 * lands half-way between two whole units, so no rounding tie decides a step.
 */
const fade =
  (perFrame: number) =>
  (at: number): number =>
    212 - (perFrame * (at - 800)) / FRAME;

/** The busy proof's failures for these frames, on the x axis. */
function failures(frames: ReturnType<typeof cast>): readonly string[] {
  return busyWindowProof(frames.tracked, BLOCK, {
    axis: 'x',
    control: frames.control,
  }).verdict.failures;
}

describe('busyWindowProof on a WebKit cast with a control', () => {
  it("judges a frame stamped late after a delivery gap at its time on the control's clock", () => {
    // The late frame was drawn at the block's start, before the judged part.
    // On its stamps it falls 60 ms into the judged part, and the fade's step
    // there makes a stall that the control does not show.
    const shots = lateAfterGap(11);
    expect(failures(cast(shots, fade(0.6))).join('\n')).toMatch(
      /longest stall 57\.0 ms, longer than the control's 40\.0 ms/,
    );
    const webkit = cast(shots, fade(0.6), 'webkit');
    expect(failures(webkit)).toEqual([]);
    expect(
      busyWindowProof(webkit.tracked, BLOCK, {
        axis: 'x',
        control: webkit.carrying,
      }).verdict.failures,
    ).toEqual([]);
  });

  it('still fails a fade that changes every other frame', () => {
    // An ease-out over 1 s: its late steps are small, so a frame it holds is
    // not one cast step of motion.
    const eased = (at: number) => {
      const progress = Math.min(Math.max((at - 800) / 1000, 0), 1);
      return 212 - 120 * (1 - (1 - progress) ** 2);
    };
    const halfRate = (at: number) =>
      eased(800 + 2 * FRAME * Math.floor((at - 800) / (2 * FRAME) + 1e-6));
    expect(failures(cast(onTime(), eased, 'webkit'))).toEqual([]);
    expect(failures(cast(onTime(), halfRate, 'webkit')).join('\n')).toMatch(
      /moved on \d+ of the 39 frames the control moved.*\n.*longest stall 33\.3 ms, longer than the control's 16\.7 ms/,
    );
  });

  it('still fails a fade that changes every other frame on a sparse cast: pairs of frames 17 ms apart, 75 ms between pairs', () => {
    const sparse: Shot[] = [];
    for (let at = 800, i = 0; at <= 1900; i += 1) {
      sparse.push({at, stamp: at});
      at += i % 2 === 0 ? 17 : 75;
    }
    const halfRate = (at: number) =>
      212 - 6 * Math.floor((at - 800) / (2 * FRAME) + 1e-6);
    expect(failures(cast(sparse, fade(3), 'webkit'))).toEqual([]);
    for (const engine of [undefined, 'webkit'] as const) {
      expect(failures(cast(sparse, halfRate, engine)).join('\n')).toMatch(
        /moved on 10 of the 14 frames the control moved/,
      );
    }
  });

  it('still fails a fade that freezes', () => {
    const frozen = (at: number) => fade(2)(Math.min(at, 1300));
    expect(failures(cast(onTime(), frozen, 'webkit')).join('\n')).toMatch(
      /moved on 17 of the 39 frames the control moved.*\n.*longest stall 380\.0 ms, longer than the control's 16\.7 ms/,
    );
  });

  it("dates a late frame near the first control's turn by the control ahead, which the control's frames carry in WebKit; without it the frame keeps its lateness", () => {
    // After frame 21 the first control is at 220 px, within 36 px of its turn,
    // and gives the late frame no time. The control ahead is mid-leg there.
    const shots = lateAfterGap(21);
    const frames = cast(shots, (at: number) => fade(0.6)(at - 10), 'webkit');
    const summary = (control: TrackedFrame[], ahead?: TrackedFrame[]) =>
      busyWindowProof(frames.tracked, BLOCK, {axis: 'x', control, ahead})
        .summary;
    // Without it, the late frame keeps its stamp's distance from the frame
    // after the gap, its nearest dated neighbour: still 60 ms late.
    expect(summary(frames.control)).toMatch(/longest stall 93\.0 ms/);
    expect(summary(frames.control, frames.ahead)).toMatch(
      /longest stall 76\.7 ms/,
    );
    expect(summary(frames.carrying)).toBe(
      summary(frames.control, frames.ahead),
    );
  });

  it("dates a frame with no reading from a neighbour whose stamp agrees with its reading, so a late frame's stamp does not hide the gap after it", () => {
    // The frame after frame 41 is read at its time but stamped 60 ms late. The
    // frames after the 77 ms gap fall near the first control's turn, with no
    // reading. Dated from the late frame's stamp, the first of them would come
    // 17 ms after it, and the gap would not show.
    const frames = cast(lateAfterGap(41), fade(0.6), 'webkit');
    const proof = (control: TrackedFrame[]) =>
      busyWindowProof(frames.tracked, BLOCK, {axis: 'x', control});
    expect(proof(frames.control).summary).toBe(proof(frames.carrying).summary);
    expect(proof(frames.control).verdict.failures.join('\n')).toMatch(
      /longest stall 93\.3 ms, longer than the control's 76\.7 ms/,
    );
  });

  it("dates the frames from the controls' starts as from the origin their stamps agree with", () => {
    const frames = cast(lateAfterGap(11), fade(0.6), 'webkit');
    const proof = (controlStarts?: readonly [number, number?]) =>
      busyWindowProof(frames.tracked, BLOCK, {
        axis: 'x',
        control: frames.control,
        ahead: frames.ahead,
        controlStarts,
      });
    expect(proof([0, -200]).summary).toBe(proof().summary);
    expect(proof([0, -200]).verdict.failures).toEqual([]);
  });

  it('judges a Chromium cast and a WebKit cast with no control on their stamps, as before', () => {
    const shots = lateAfterGap(11);
    const stamped = cast(shots, fade(0.6));
    const chromium = cast(shots, fade(0.6), 'chromium');
    const webkit = cast(shots, fade(0.6), 'webkit');
    const proof = (frames: ReturnType<typeof cast>, control: boolean) =>
      busyWindowProof(frames.tracked, BLOCK, {
        axis: 'x',
        control: control ? frames.control : undefined,
      });
    expect(proof(chromium, true)).toEqual(proof(stamped, true));
    expect(proof(webkit, false)).toEqual(proof(stamped, false));
  });
});
