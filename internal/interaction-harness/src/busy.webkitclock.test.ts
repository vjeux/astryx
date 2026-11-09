// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file busy.webkitclock.test.ts
 * @input Synthetic WebKit casts and two recorded ones (no browser)
 * @output A WebKit busy proof with a control judges each frame at its time on
 *   the controls' clock, at display rate. A frame stamped late after a
 *   delivery gap passes, and so does a pair drawn 7 ms apart. A half-rate
 *   fade and a frozen one still fail. A late frame near the control's turn
 *   keeps its skew and fails, unless the control ahead dates it. Chromium
 *   casts and casts with no control get the proof of their stamps.
 * @position Unit test of ./busy's busyWindowProof and pooledBusyProof on
 *   WebKit casts
 */

import {describe, expect, it} from 'vitest';
import {busyWindowProof, type BusyRun, pooledBusyProof} from './busy';
import {WEBKIT_LATE_STAMPS} from './busy.webkitlatestamps.fixture';
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
 * A delivery gap after frame `k`, as WebKit's cast shows one. The compositor
 * draws a frame 10 ms after frame `k`, and the cast stamps it 67 ms late.
 * Nothing is drawn for 77 ms. The frame after that is stamped 7 ms late, and
 * the frames after it are one interval apart.
 */
function lateAfterGap(k: number): Shot[] {
  const shots = onTime().slice(0, k + 1);
  const drawn = shots[k].at + 10;
  shots.push({at: drawn, stamp: drawn + 67});
  const resumed = drawn + 77;
  shots.push({at: resumed, stamp: resumed + 7});
  return [...shots, ...onTime(resumed + FRAME)];
}

/**
 * The frames as the busy proof gets them. The component's value is on x, as
 * is each control's position: the first one's, and the one half a leg ahead.
 */
function cast(
  shots: readonly Shot[],
  value: (at: number) => number,
  engine?: 'chromium' | 'webkit',
): {tracked: TrackedFrame[]; control: TrackedFrame[]; ahead: TrackedFrame[]} {
  const frame = (stamp: number, x: number, side: number): TrackedFrame => ({
    t: stamp,
    box: {x: Math.round(x), y: 0, width: side, height: side},
    pixels: side * side,
    ...(engine == null ? {} : {engine}),
  });
  return {
    tracked: shots.map(({at, stamp}) => frame(stamp, value(at), 1)),
    control: shots.map(({at, stamp}) => frame(stamp, xAt(at), 12)),
    ahead: shots.map(({at, stamp}) => frame(stamp, xAt(at + 200), 12)),
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
function failures(
  frames: ReturnType<typeof cast>,
  options: {control?: boolean; ahead?: boolean} = {control: true},
): readonly string[] {
  return busyWindowProof(frames.tracked, BLOCK, {
    axis: 'x',
    control: options.control === true ? frames.control : undefined,
    ahead: options.ahead === true ? frames.ahead : undefined,
  }).verdict.failures;
}

describe('busyWindowProof on a WebKit cast with a control', () => {
  it("judges a frame stamped late after a delivery gap at its time on the control's clock", () => {
    const shots = lateAfterGap(38);
    // On its stamps, the frame drawn 10 ms after the one before reads as a
    // stall of 77 ms. The fade shows no step there.
    expect(failures(cast(shots, fade(0.6))).join('\n')).toMatch(
      /longest stall 94\.0 ms, longer than the control's 77\.0 ms/,
    );
    expect(failures(cast(shots, fade(0.6), 'webkit'))).toEqual([]);
  });

  it('keeps the latest frame of each display interval: frames drawn 6.6 and 8.4 ms apart pass', () => {
    const shots: Shot[] = [];
    const intervals = [FRAME, FRAME, 6.6, 8.4, FRAME];
    for (let at = 800, i = 0; at <= 1900; i += 1) {
      shots.push({at, stamp: at});
      at += intervals[i % intervals.length];
    }
    // A slow fade shows no step between two frames 7 ms apart.
    expect(failures(cast(shots, fade(0.6))).join('\n')).toMatch(
      /moved on 39 of the 51 frames the control moved/,
    );
    expect(failures(cast(shots, fade(0.6), 'webkit'))).toEqual([]);
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

  it('still fails a fade that freezes', () => {
    const frozen = (at: number) => fade(2)(Math.min(at, 1300));
    expect(failures(cast(onTime(), frozen, 'webkit')).join('\n')).toMatch(
      /moved on 17 of the 39 frames the control moved.*\n.*longest stall 380\.0 ms, longer than the control's 16\.7 ms/,
    );
  });

  it("keeps the skew of a late frame near the control's turn, where it has no reading, and still fails it; the control ahead dates it", () => {
    // The frame drawn 10 ms after frame 20 shows the control at 206 px, within
    // 36 px of its turn. It keeps its stamp's distance from its nearest dated
    // neighbour, the frame after the gap, so it stays late.
    const frames = cast(lateAfterGap(20), fade(0.6), 'webkit');
    expect(failures(frames).join('\n')).toMatch(
      /longest stall 103\.3 ms, longer than the control's 76\.7 ms/,
    );
    // The control ahead is mid-leg there, so it gives that frame its time.
    expect(failures(frames, {control: true, ahead: true})).toEqual([]);
  });

  it("dates the frames from the controls' starts as from the origin their stamps agree with", () => {
    const frames = cast(lateAfterGap(38), fade(0.6), 'webkit');
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
    const shots = lateAfterGap(38);
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

describe('pooledBusyProof on two recorded WebKit casts', () => {
  /** A Switch's track-colour proof (its red level on x), as it ran. */
  const FADE_PROOF = {
    axis: 'x',
    settledWithin: 16,
    minRunFrames: 2,
    minJudgedRuns: 2,
  } as const;

  const run = (
    recorded: (typeof WEBKIT_LATE_STAMPS)[number][number],
    engine?: 'webkit',
  ): BusyRun => ({
    tracked: recorded.colour.map(([t, red]) => ({
      t,
      box: {x: red, y: 0, width: 1, height: 1},
      pixels: 1,
      ...(engine == null ? {} : {engine}),
    })),
    control: recorded.control.map(([t, x]) => ({
      t,
      box: x == null ? null : {x, y: 0, width: 12, height: 12},
      pixels: x == null ? 0 : 144,
      ...(engine == null ? {} : {engine}),
    })),
    window: recorded.window,
  });

  it("fails each cast on its stamps, as it did live, and passes each on the control's clock", () => {
    WEBKIT_LATE_STAMPS.forEach((recorded, i) => {
      expect(
        pooledBusyProof(
          recorded.map(r => run(r)),
          FADE_PROOF,
        ).verdict.failures,
        `cast ${i + 1}, on its stamps`,
      ).not.toEqual([]);
      const proof = pooledBusyProof(
        recorded.map(r => run(r, 'webkit')),
        FADE_PROOF,
      );
      expect(proof.verdict.failures, `cast ${i + 1}: ${proof.summary}`).toEqual(
        [],
      );
    });
  });
});
