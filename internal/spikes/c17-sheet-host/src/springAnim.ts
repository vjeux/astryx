// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file springAnim.ts
 * @input A UIKit spring (constants table vocabulary), a release state
 * @output The spring baked into Web Animations keyframes on the sheet's
 *   transform and the dim's opacity, run on the compositor, read back
 *   analytically (presentation value) for a re-grab
 * @position Spike only; the foundation animator replaces this
 *
 * The curve is the motion foundation's closed-form spring (motion/spring.ts). It is sampled at
 * 120 Hz into keyframes with linear interpolation between them, so the
 * compositor plays exactly that curve, from the release velocity, even while
 * the main thread is blocked. fill: forwards holds the final frame until the
 * page swaps it for the resting state, so a blocked main thread at the end
 * of the spring shows no jump either.
 */

import {
  solveSpring,
  toSpring,
  type SpringCurve,
  type SpringDescription,
} from '../../../../packages/core/src/motion/spring';

export interface SpringRun {
  anim: Animation;
  dimAnim: Animation | null;
  curve: SpringCurve;
  /** Seconds until within 0.5 px of the target for good. */
  settle: number;
  /** The analytic value at the animation's current time. */
  presentation(): number;
}

const SAMPLE_STEP_S = 1 / 120;
const SETTLE_THRESHOLD_PX = 0.5;

export function animateSpring({
  el,
  dimEl,
  from,
  to,
  velocity,
  spring,
  toTransform,
  toDim,
}: {
  el: HTMLElement;
  dimEl: HTMLElement | null;
  from: number;
  to: number;
  /** Units/s, in the same units as from/to. */
  velocity: number;
  spring: SpringDescription;
  toTransform: (value: number) => string;
  toDim: (value: number) => number;
}): SpringRun {
  const curve = solveSpring(toSpring(spring), {from, to, velocity});
  const settle = Math.min(
    3,
    Math.max(1 / 60, curve.settleTime(SETTLE_THRESHOLD_PX)),
  );
  const steps = Math.ceil(settle / SAMPLE_STEP_S);
  const frames: Keyframe[] = [];
  const dimFrames: Keyframe[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = Math.min(settle, i * SAMPLE_STEP_S);
    const value = i === steps ? to : curve.value(t);
    const offset = t / settle;
    frames.push({offset, transform: toTransform(value)});
    dimFrames.push({offset, opacity: String(toDim(value))});
  }
  const timing: KeyframeAnimationOptions = {
    duration: settle * 1000,
    easing: 'linear',
    fill: 'forwards',
  };
  const anim = el.animate(frames, timing);
  const dimAnim = dimEl == null ? null : dimEl.animate(dimFrames, timing);
  return {
    anim,
    dimAnim,
    curve,
    settle,
    presentation() {
      const elapsed = Number(anim.currentTime ?? 0) / 1000;
      return elapsed >= settle ? to : curve.value(Math.max(0, elapsed));
    },
  };
}
