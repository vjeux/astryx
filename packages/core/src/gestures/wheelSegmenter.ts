// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file wheelSegmenter.ts
 * @input A wheel stream's deltas along one axis, with their event times
 * @output Exports WheelSegmenter and isBunched. WheelSegmenter splits the
 *   stream into gestures and reads a trackpad's lift (the onset of momentum).
 *   It keeps a trackpad's late or merged glide wheels in their flick.
 *   isBunched tells one stall's merge from a frame.
 * @position Read by GestureHost.ts's wheel input: the web reports no
 *   trackpad contact or phase, so both are inferred.
 */

export type WheelBoundary = 'first' | 'idle' | 'reversal' | 'jump' | 'gap';
export type WheelPhase = 'finger' | 'momentum';

export interface WheelSegment {
  /** Why this event starts a new gesture, or null when it continues one. */
  readonly boundary: WheelBoundary | null;
  readonly phase: WheelPhase;
  /** The gesture's number, counting from 1. */
  readonly gesture: number;
  /** This event is where the fingers lifted (momentum begins with it). */
  readonly liftNow: boolean;
  /** This event shrank, so it may be momentum: hold it until known. */
  readonly decaying: boolean;
  /** This event came so soon after the one before that it is a merge. */
  readonly bunched: boolean;
  /**
   * The signed travel of the late wheel before this one, with any wheel
   * merged with it. It is handed over when that wheel joined the glide and
   * this one grows into a new gesture; else 0.
   */
  readonly carried: number;
  /** The frames this event carries: more than one for a merge. */
  readonly steps: number;
  /** The stream's frame interval: the median of its last on-pace ones, ms. */
  readonly frameMs: number;
}

/** Momentum arrives at frame rate: a pause this long ends it. */
const MOMENTUM_GAP_MS = 50;
/**
 * A wheel this close to the one before, ms, is one stall's merge. Frames come
 * further apart at every display rate up to 500 Hz, which is 2 ms.
 */
const BUNCHED_MS = 1.5;
/** Shrinking deltas in a row before the lift is read. */
const LIFT_RUN = 4;
/** And how much of its size the run has lost by then. */
const LIFT_DECAY = 0.8;
/** How near a wheel must lie to a sum of the glide's next steps, px. */
const FIT_PX = 1;
/** Or as a share of that sum, when the share is larger. */
const FIT_SHARE = 0.25;
/** The most glide steps one wheel is read as carrying. */
const MAX_STEPS = 64;
/** How near a late or rising wheel must lie to the glide's sum, as a share. */
const LATE_FIT_SHARE = 0.15;
/**
 * How far a wheel may grow past the last unbunched one and still be the
 * glide, px.
 */
const RISE_PX = 0.5;
/** A stream's frame interval until it shows its own, ms. */
const FRAME_MS = 16;
/** The longest frame interval a trackpad reports at: 60 Hz, ms. */
const SLOWEST_FRAME_MS = 1000 / 60;
/** The intervals that set a gesture's frame before its window applies. */
const FIRST_PACES = 3;

/**
 * Whether a wheel `intervalMs` after the one before is one stall's merge, not
 * a frame. A stalled page receives the wheels it held back together, within
 * 1.5 ms of each other. The rule reads no history, so slow wheels never make
 * a real frame look like a merge.
 */
export function isBunched(intervalMs: number): boolean {
  return intervalMs <= BUNCHED_MS;
}

/**
 * A trackpad gesture has a finger phase and, after a fling, a momentum phase.
 * In the finger phase, deltas come while the fingers move, with pauses when
 * they move slowly. In the momentum phase, deltas come at frame rate and
 * shrink smoothly. The lift is the start of a run of shrinking deltas that
 * has lost a fifth of its size. In the finger phase, a pause of `idleMs`
 * ends the gesture. In the momentum phase, a reversal, a jump up against the
 * decay, or a pause of 50 ms starts a new gesture. A bunched wheel is never
 * a jump. The decay reads it by its last step. Momentum never pauses,
 * reverses or grows.
 *
 * A stalled page receives a trackpad's glide late, and the engine merges the
 * wheels it held. In momentum, a trackpad wheel that the glide's decay
 * explains stays in the flick. It may come after a pause, or rise after more
 * than a frame. It is at or below the next step, or near the sum of the next
 * steps its stall spans. After such a wheel, a trackpad wheel that grows
 * starts a new gesture and takes the late wheel's travel. The decay also
 * reads a trackpad merge in momentum, by its last step. It reads one in a
 * shrinking run too, by its nearest fit at its ratio or its decrement. That
 * fit must explain the merge at least as well as steady steps do. A trackpad
 * wheel within half a frame of the one before counts as a merge there. A
 * shrinking trackpad wheel counts each frame it merged toward the lift. A
 * merge read as steady steps at the run's onset is read again as the decay
 * when the next wheel continues it. Other wheels keep the rules above.
 */
export class WheelSegmenter {
  gesture = 0;
  phase: WheelPhase = 'finger';
  private last = -Infinity;
  private previous = 0;
  private sign = 0;
  private count = 0;
  private run = 0;
  private runStart = 0;
  /** The decay's step-to-step ratio, from the last two one-step wheels. */
  private ratio = 1;
  /** And its step-to-step decrease, px. */
  private decrement = 0;
  /** The gesture's last on-pace intervals, ms: their median is its frame. */
  private paces: number[] = [];
  /** The intervals in a row that came slower than the frame allows, ms. */
  private slower: number[] = [];
  /** The last intervals before the frame is set, ms. */
  private trial: number[] = [];
  /** When the gesture's last wheel within two frames of the one before came. */
  private onPace = -Infinity;
  /** The gesture's last wheel that was not bunched, px. */
  private paced = 0;
  /** A wheel joined the glide late: a later one that grows is the fingers'. */
  private resumed = false;
  /**
   * The signed travel of the last wheel that joined the glide late, with any
   * wheel merged with it.
   */
  private joined = 0;
  /**
   * A trackpad merge that the run's onset read as steady steps: its size, and
   * the steady step before it.
   */
  private onset: {size: number; steady: number} | null = null;

  /**
   * Reads one wheel. `continuous` is whether it carries a trackpad's
   * signature (`scrollTypeOf`). Only those wheels can join a glide late.
   */
  push(
    time: number,
    delta: number,
    idleMs: number,
    continuous = false,
  ): WheelSegment {
    const size = Math.abs(delta);
    const sign = Math.sign(delta);
    const gap = time - this.last;
    const bunched = this.count > 0 && isBunched(gap);
    const frame = this.frameMs();
    // A trackpad wheel within half a frame of the one before also merges
    // frames a stall held.
    const merged = bunched || (continuous && gap < frame / 2);
    let boundary: WheelBoundary | null = null;
    let carriedSteps: number | null = null;
    if (this.count === 0) {
      boundary = this.gesture === 0 ? 'first' : 'idle';
    } else if (this.phase === 'finger' && gap >= idleMs) {
      boundary = 'idle';
    } else if (this.phase === 'momentum') {
      // A late wheel carries the steps of its whole stall, which began at the
      // last wheel that came on pace.
      const frames = Math.round((time - this.onPace) / frame);
      const late = gap >= MOMENTUM_GAP_MS;
      const rises = !merged && size >= 2 && size > this.previous * 1.3 + 0.5;
      if (sign !== 0 && this.sign !== 0 && sign !== this.sign) {
        boundary = 'reversal';
      } else if (late || rises) {
        // A wheel that rises on pace is the fingers'. One that rises after a
        // skipped frame may carry the frames its stall held.
        if (continuous && sign === this.sign && (late || gap >= 1.5 * frame)) {
          carriedSteps = this.glideSteps(
            size,
            Math.max(1, frames),
            LATE_FIT_SHARE,
          );
        }
        if (carriedSteps == null) {
          boundary = late ? 'gap' : 'jump';
        }
      } else if (
        continuous &&
        this.resumed &&
        !merged &&
        size > FIT_PX &&
        size > this.paced + RISE_PX
      ) {
        // A glide only falls, so after a late wheel one that grows is the
        // fingers'. A whole-pixel glide repeats a step as it slows.
        boundary = 'jump';
      }
    }
    // Read by the decay's decrement, not its ratio.
    let byDecrement = false;
    if (carriedSteps == null && boundary == null && merged && continuous) {
      if (this.phase === 'momentum') {
        carriedSteps = this.glideSteps(size, MAX_STEPS);
      }
    }
    if (
      carriedSteps == null &&
      boundary == null &&
      merged &&
      continuous &&
      this.phase === 'finger' &&
      this.run > 0
    ) {
      // In a shrinking run, the decay reads a merge where it explains the
      // merge at least as well as steady steps do. It takes its nearest fit,
      // at its ratio or its decrement.
      const byRatio = this.nearestSteps(size, count => this.glideSum(count));
      const byLine = this.nearestSteps(size, count =>
        this.decrement > 0 && this.previous - count * this.decrement > 0
          ? this.lineSum(count)
          : null,
      );
      const ratioOff =
        byRatio == null ? Infinity : Math.abs(size - this.glideSum(byRatio));
      const lineOff =
        byLine == null ? Infinity : Math.abs(size - this.lineSum(byLine));
      const best = lineOff < ratioOff ? byLine : byRatio;
      if (best != null && Math.min(ratioOff, lineOff) <= this.steadyOff(size)) {
        carriedSteps = best;
        byDecrement = lineOff < ratioOff;
      }
    }
    // A bunched wheel carries the steps of the frames it merged. The decay
    // goes on from its last step, so the steps after it read as they are.
    // The wheel after an onset merge can show that the merge was the decay's
    // first steps, from the steady step on.
    if (
      continuous &&
      this.phase === 'finger' &&
      boundary == null &&
      !merged &&
      this.run === 0 &&
      this.onset != null
    ) {
      const reread = this.onsetSteps(this.onset, size);
      if (reread != null) {
        const last = this.onset.steady - reread.count * reread.decrement;
        this.runStart = this.onset.steady;
        this.run = reread.count;
        this.ratio = Math.min(
          1,
          Math.max(0.5, last / (last + reread.decrement)),
        );
        this.decrement = reread.decrement;
        this.previous = last;
      }
    }
    const steady = this.previous;
    const steps =
      carriedSteps ??
      (boundary == null && merged && this.previous > 0
        ? Math.max(1, Math.round(size / this.previous))
        : 1);
    // On the decay, a wheel of several steps ends at the decay's own step.
    const onDecay = carriedSteps != null && carriedSteps > 1;
    // A bunched wheel is read by its last step, as the decay goes on from it.
    const step = !onDecay
      ? size / steps
      : byDecrement
        ? this.previous - steps * this.decrement
        : this.previous * this.ratio ** steps;
    if (boundary != null) {
      this.gesture += 1;
      this.phase = 'finger';
      this.count = 0;
      this.run = 0;
      this.ratio = 1;
      this.decrement = 0;
      this.resumed = false;
      this.paces = [];
      this.slower = [];
      this.trial = [];
      this.onset = null;
    }
    // The late wheel was the fingers' when the next one grows: the new
    // gesture takes its travel.
    const carried = boundary === 'jump' ? this.joined : 0;
    const joinedLate = boundary == null && carriedSteps != null && !merged;
    if (joinedLate) {
      this.resumed = true;
    }
    // A wheel merged with the late one is the same dispatch: it adds to it.
    this.joined = joinedLate
      ? delta
      : merged && boundary == null && this.joined !== 0
        ? this.joined + delta
        : 0;
    if (!bunched) {
      this.paced = size;
    }
    let liftNow = false;
    let decaying = false;
    if (this.phase === 'finger' && this.count >= 3 && size > 0) {
      decaying = onDecay
        ? byDecrement || this.ratio <= 0.995
        : step <= this.previous * 0.995 && step >= this.previous * 0.5;
      if (decaying) {
        if (this.run === 0) {
          this.runStart = this.previous;
        }
        // A trackpad's coalesced wheel carries a delta for each frame it
        // merged.
        this.run += continuous ? steps : 1;
      } else {
        this.run = 0;
      }
      if (this.run >= LIFT_RUN && step <= this.runStart * LIFT_DECAY) {
        this.phase = 'momentum';
        liftNow = true;
      }
    }
    if (steps === 1 && this.count > 0 && this.previous > 0 && step > 0) {
      this.ratio = Math.min(1, Math.max(0.5, step / this.previous));
      this.decrement = this.previous - step;
    }
    if (!bunched && boundary == null && gap < MOMENTUM_GAP_MS) {
      this.notePace(gap, frame);
    }
    if (boundary != null || (!bunched && gap < 2 * frame)) {
      this.onPace = time;
    }
    this.onset =
      continuous &&
      merged &&
      boundary == null &&
      this.phase === 'finger' &&
      this.run === 0 &&
      carriedSteps == null &&
      steps > 1
        ? {size, steady}
        : null;
    this.count += 1;
    this.previous = step;
    if (sign !== 0) {
      this.sign = sign;
    }
    this.last = time;
    return {
      boundary,
      phase: this.phase,
      gesture: this.gesture,
      liftNow,
      decaying: decaying && !liftNow,
      bunched: boundary == null && bunched,
      carried,
      steps,
      frameMs: this.frameMs(),
    };
  }

  /**
   * Keep an interval for the frame. FIRST_PACES intervals in a row that agree
   * propose it, and one more that agrees confirms it. A squeeze at a stall's
   * start rarely runs that long, and a late interval breaks the run. After
   * that, only an interval within half a frame and one and a half frames
   * counts: a stall's squeezed wheels come faster. FIRST_PACES slower
   * intervals in a row set the frame again.
   */
  private notePace(gap: number, frame: number): void {
    if (this.paces.length === 0) {
      this.trial = [...this.trial.slice(-FIRST_PACES), gap];
      const agree = Math.max(...this.trial) <= 1.5 * Math.min(...this.trial);
      if (this.trial.length > FIRST_PACES && agree) {
        this.paces = this.trial;
        this.trial = [];
      }
      return;
    }
    const inWindow = gap >= 0.5 * frame && gap <= 1.5 * frame;
    if (inWindow) {
      this.paces = [...this.paces.slice(-7), gap];
      this.slower = [];
      return;
    }
    this.slower = gap > 1.5 * frame ? [...this.slower, gap] : [];
    if (this.slower.length >= FIRST_PACES) {
      this.paces = this.slower;
      this.slower = [];
    }
  }

  /**
   * The gesture's frame interval: the median of its last on-pace intervals,
   * or FRAME_MS before it shows one. A trackpad reports at 60 Hz or faster,
   * so a longer median is a stall's.
   */
  private frameMs(): number {
    if (this.paces.length === 0) {
      return FRAME_MS;
    }
    const sorted = [...this.paces].sort((a, b) => a - b);
    const middle = sorted.length >> 1;
    const median =
      sorted.length % 2 === 1
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2;
    return Math.min(median, SLOWEST_FRAME_MS);
  }

  /** The sum of the decay's next `count` steps from `previous`. */
  private glideSum(count: number): number {
    let next = this.previous * this.ratio;
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += next;
      next *= this.ratio;
    }
    return sum;
  }

  /**
   * Whether an onset merge was the decay's first steps. It returns the step
   * count and decrement whose steps from the steady step sum to the merge.
   * Their next step must lie within FIT_PX or FIT_SHARE of `next`. Null when
   * none does.
   */
  private onsetSteps(
    onset: {size: number; steady: number},
    next: number,
  ): {count: number; decrement: number} | null {
    let best: {count: number; decrement: number} | null = null;
    let bestOff = Infinity;
    for (let count = 2; count <= MAX_STEPS; count++) {
      const decrement =
        (count * onset.steady - onset.size) / ((count * (count + 1)) / 2);
      const predicted = onset.steady - (count + 1) * decrement;
      if (decrement <= 0 || predicted <= 0) {
        continue;
      }
      const off = Math.abs(next - predicted);
      if (off <= Math.max(FIT_PX, next * FIT_SHARE) && off < bestOff) {
        best = {count, decrement};
        bestOff = off;
      }
    }
    return best;
  }

  /**
   * The step count from two whose sum lies nearest a merge of `size`, within
   * FIT_PX or FIT_SHARE of it. `sumOf` gives a count's sum, or null once a
   * step reaches zero. Null when no sum lies that near.
   */
  private nearestSteps(
    size: number,
    sumOf: (count: number) => number | null,
  ): number | null {
    let nearest: number | null = null;
    let nearestOff = Infinity;
    for (let count = 2; count <= MAX_STEPS; count++) {
      const sum = sumOf(count);
      if (sum == null) {
        break;
      }
      const off = Math.abs(size - sum);
      const fits = off <= Math.max(FIT_PX, sum * FIT_SHARE);
      if (fits && off < nearestOff) {
        nearest = count;
        nearestOff = off;
      }
      if (!fits && sum > size) {
        break;
      }
    }
    return nearest;
  }

  /** The sum of the next `count` steps, each `decrement` smaller. */
  private lineSum(count: number): number {
    return count * this.previous - (this.decrement * count * (count + 1)) / 2;
  }

  /**
   * How far a merge of `size` lies from whole steps of the run's steady
   * size, or of its last step, whichever lies nearer.
   */
  private steadyOff(size: number): number {
    return Math.min(
      ...[this.runStart, this.previous]
        .filter(step => step > 0)
        .map(step =>
          Math.abs(size - Math.max(1, Math.round(size / step)) * step),
        ),
    );
  }

  /**
   * How many of the decay's next steps a trackpad wheel of `size` carries,
   * at most `most`. A wheel at or below the next step carries one. A larger
   * one carries the fewest steps whose sum lies within FIT_PX or `share` of
   * it. The decay goes on from `previous` at `ratio` a step. Null when
   * no sum lies that near.
   */
  private glideSteps(
    size: number,
    most: number,
    share = FIT_SHARE,
  ): number | null {
    if (this.previous <= 0 || size <= 0) {
      return null;
    }
    let next = this.previous * this.ratio;
    if (size <= next + FIT_PX) {
      return 1;
    }
    let sum = next;
    for (let count = 2; count <= Math.min(most, MAX_STEPS); count++) {
      next *= this.ratio;
      sum += next;
      if (Math.abs(size - sum) <= Math.max(FIT_PX, sum * share)) {
        return count;
      }
    }
    return null;
  }

  /** The gesture ended on its own (its timer): the next event starts one. */
  end(): void {
    this.count = 0;
  }
}
