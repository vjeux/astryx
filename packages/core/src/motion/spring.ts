// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file spring.ts
 * @input Spring parameters in any of the four vocabularies Apple uses
 * @output Exports the `Spring` model, conversions between SwiftUI
 *   (duration, bounce), SwiftUI/WWDC (response, damping ratio),
 *   CASpringAnimation (mass, stiffness, damping) and UIKit's legacy
 *   `usingSpringWithDamping:initialSpringVelocity:` parameters, the closed-form
 *   solution of the spring (`solveSpring`), and `settlingDuration`
 * @position Pure math under the motion animator; no DOM, no React
 *
 * One model, the damped harmonic oscillator m·x″ + c·x′ + k·x = 0, solved in
 * closed form for its three regimes (under-, critically and over-damped). It
 * is the model behind SwiftUI's `Spring`, `CASpringAnimation` and UIKit's
 * spring timing parameters, so a curve computed here is the curve UIKit
 * computes for the same parameters.
 *
 * Units: time in seconds, velocity in units per second (the units of the
 * animated value: px for a translation, 1 for a scale or an opacity), the
 * same units SwiftUI and Core Animation use.
 *
 * Conversions, with their sources:
 * - (duration, bounce) → (mass, stiffness, damping): the three equations of
 *   WWDC23 "Animate with springs" (session 10158):
 *     mass = 1, stiffness = (2π ÷ duration)²,
 *     damping = (1 − bounce) × 4π ÷ duration          for bounce ≥ 0,
 *     damping = 4π ÷ (duration × (1 + bounce))        for bounce < 0.
 * - (response, dampingRatio) → physics: WWDC18 "Designing Fluid Interfaces"
 *   (session 803) defines the response as the period of the undamped spring,
 *   so ω₀ = 2π ÷ response; damping ratio ζ = c ÷ (2·√(k·m)) as stated in
 *   https://developer.apple.com/documentation/uikit/uispringtimingparameters/init(mass:stiffness:damping:initialvelocity:)
 * - UIKit's relative initial velocity: "A value of 1 corresponds to the total
 *   animation distance traversed in one second"
 *   (https://developer.apple.com/documentation/uikit/uiview/animate(withduration:delay:usingspringwithdamping:initialspringvelocity:options:animations:completion:)).
 *
 * Settling duration follows `CASpringAnimation.settlingDuration`: the time
 * after which the displacement from the target, for a unit move, stays below
 * ε = 0.001 (the epsilon SwiftUI documents for `Spring.settlingDuration`),
 * bounded by the decaying envelope |A| + |B| of A·cos + B·sin. That bound
 * reproduces every published reference value: Apple's CASpringAnimation
 * documentation example (stiffness 100, damping 5 → "approximately 2.85
 * seconds"; damping 15 → "just over 1 second") and WebKit's iOS switch
 * durations, which are the settling durations of its UIKit-matched springs
 * (0.4880138408543766 s and 0.5073965509413827 s in
 * Source/WebCore/rendering/ios/RenderThemeIOS.h). See spring.test.ts.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/spring.test.ts
 * - /packages/core/src/motion/README.md
 */

const TAU = 2 * Math.PI;

/**
 * A spring, in Core Animation's physical vocabulary. Every other way of
 * describing a spring converts to this one.
 */
export interface Spring {
  /** Mass m of the attached object (`CASpringAnimation.mass`). */
  readonly mass: number;
  /** Stiffness k (`CASpringAnimation.stiffness`). */
  readonly stiffness: number;
  /** Viscous damping coefficient c (`CASpringAnimation.damping`). */
  readonly damping: number;
}

/** SwiftUI's two-parameter description: `Spring(duration:bounce:)`. */
export interface DurationBounce {
  /**
   * Perceptual duration in seconds: the period of the undamped spring, "the
   * pace of the spring".
   */
  readonly duration: number;
  /**
   * 0 is critically damped (no overshoot), up to 1 (undamped oscillation);
   * negative values, down to −1, are overdamped ("flattened") springs.
   */
  readonly bounce: number;
}

/** WWDC18's design-friendly description: response and damping ratio. */
export interface ResponseDamping {
  /** Period of the undamped spring in seconds. */
  readonly response: number;
  /**
   * Damping as a fraction of critical damping (SwiftUI's `dampingFraction`):
   * 1 settles without overshoot, values toward 0 oscillate longer.
   */
  readonly dampingRatio: number;
}

function assertPositiveFinite(name: string, value: number): void {
  if (!(Number.isFinite(value) && value > 0)) {
    throw new RangeError(
      `spring: ${name} must be a positive number, got ${value}`,
    );
  }
}

/**
 * SwiftUI's `Spring(duration:bounce:)` and UIKit's
 * `UIView.animate(springDuration:bounce:…)`: the WWDC23 equations. Bounce is
 * clamped to SwiftUI's documented range (−1, 1].
 *
 * @example
 * ```
 * springFromDurationBounce({duration: 0.5, bounce: 0}); // SwiftUI .smooth
 * ```
 */
export function springFromDurationBounce({
  duration,
  bounce,
}: DurationBounce): Spring {
  assertPositiveFinite('duration', duration);
  if (!Number.isFinite(bounce)) {
    throw new RangeError(`spring: bounce must be finite, got ${bounce}`);
  }
  // −1 itself would be infinite damping.
  const b = Math.min(1, Math.max(-0.999999, bounce));
  const stiffness = (TAU / duration) ** 2;
  const damping =
    b >= 0 ? ((1 - b) * 2 * TAU) / duration : (2 * TAU) / (duration * (1 + b));
  return {mass: 1, stiffness, damping};
}

/**
 * SwiftUI's `Spring(response:dampingRatio:)` and
 * `Animation.spring(response:dampingFraction:)`. Overdamping (ratio > 1) is
 * kept, as SwiftUI keeps it for this initializer.
 */
export function springFromResponse({
  response,
  dampingRatio,
}: ResponseDamping): Spring {
  assertPositiveFinite('response', response);
  if (!(Number.isFinite(dampingRatio) && dampingRatio >= 0)) {
    throw new RangeError(
      `spring: dampingRatio must be ≥ 0, got ${dampingRatio}`,
    );
  }
  const omega = TAU / response;
  return {mass: 1, stiffness: omega * omega, damping: 2 * dampingRatio * omega};
}

/**
 * `CASpringAnimation` / `UISpringTimingParameters(mass:stiffness:damping:)`
 * / SwiftUI `Spring(mass:stiffness:damping:allowOverDamping:)`. Like SwiftUI,
 * an overdamped spring is treated as critically damped unless
 * `allowOverdamping` is set: "a value of false specifies that such cases
 * should instead be treated as critically damped".
 */
export function springFromPhysics({
  mass = 1,
  stiffness,
  damping,
  allowOverdamping = false,
}: {
  mass?: number;
  stiffness: number;
  damping: number;
  allowOverdamping?: boolean;
}): Spring {
  assertPositiveFinite('mass', mass);
  assertPositiveFinite('stiffness', stiffness);
  if (!(Number.isFinite(damping) && damping >= 0)) {
    throw new RangeError(`spring: damping must be ≥ 0, got ${damping}`);
  }
  const critical = 2 * Math.sqrt(stiffness * mass);
  return {
    mass,
    stiffness,
    damping: allowOverdamping ? damping : Math.min(damping, critical),
  };
}

/** Undamped angular frequency ω₀ = √(k/m), rad/s. */
export function naturalFrequency(spring: Spring): number {
  return Math.sqrt(spring.stiffness / spring.mass);
}

/** Damping ratio ζ = c / (2·√(k·m)). */
export function dampingRatioOf(spring: Spring): number {
  return spring.damping / (2 * Math.sqrt(spring.stiffness * spring.mass));
}

/** Response (period of the undamped spring), seconds. */
export function responseOf(spring: Spring): number {
  return TAU / naturalFrequency(spring);
}

/** The spring as SwiftUI's (duration, bounce), inverting the WWDC23 equations. */
export function durationBounceOf(spring: Spring): DurationBounce {
  const zeta = dampingRatioOf(spring);
  return {
    duration: responseOf(spring),
    bounce: zeta <= 1 ? 1 - zeta : 1 / zeta - 1,
  };
}

/** The spring as (response, dampingRatio). */
export function responseDampingOf(spring: Spring): ResponseDamping {
  return {response: responseOf(spring), dampingRatio: dampingRatioOf(spring)};
}

/**
 * A spring in any of the vocabularies the constants table uses: physical
 * (mass, stiffness, damping), SwiftUI (duration, bounce) or WWDC18
 * (response, dampingRatio). Tables keep the vocabulary of their source so a
 * value reads exactly as it was published.
 */
export type SpringDescription =
  | {
      readonly mass?: number;
      readonly stiffness: number;
      readonly damping: number;
    }
  | DurationBounce
  | ResponseDamping;

/**
 * Normalizes a description to the physical `Spring`. A physical description
 * gets `springFromPhysics`' treatment: overdamping is clamped to critical, as
 * SwiftUI and Core Animation do by default.
 */
export function toSpring(description: SpringDescription): Spring {
  if ('stiffness' in description) {
    return springFromPhysics(description);
  }
  if ('bounce' in description) {
    return springFromDurationBounce(description);
  }
  return springFromResponse(description);
}

/**
 * UIKit's relative initial spring velocity for a move from `from` to `to`
 * at `velocity` units/s: 1 means the whole distance in one second. Undefined
 * (±Infinity) when `from === to`; animate in absolute units instead
 * (`solveSpring` takes an absolute velocity).
 */
export function relativeVelocity(
  velocity: number,
  from: number,
  to: number,
): number {
  return velocity / (to - from);
}

/** Inverse of `relativeVelocity`: absolute units/s. */
export function absoluteVelocity(
  relative: number,
  from: number,
  to: number,
): number {
  return relative * (to - from);
}

/** A spring released from a value with a velocity, heading for a target. */
export interface SpringCurve {
  readonly spring: Spring;
  readonly from: number;
  readonly to: number;
  /** Initial velocity, units/s. */
  readonly initialVelocity: number;
  /** Value at `t` seconds after release. */
  value(t: number): number;
  /** Velocity at `t` seconds after release, units/s. */
  velocity(t: number): number;
  /**
   * The time after which |value(t) − to| stays below `threshold` (in the
   * value's own units) for good: the envelope bound used by
   * `settlingDuration`, applied in absolute units. 0 when already within.
   * Infinity for an undamped spring that is displaced or moving.
   */
  settleTime(threshold: number): number;
}

// |ζ − 1| below this is solved as critically damped: the under/overdamped
// forms lose precision as ωd or the root gap goes to zero, and the critical
// form differs from them by O(|ζ − 1|) there.
const CRITICAL_TOLERANCE = 1e-6;

/**
 * Closed-form solution of the spring released at `from` with
 * `initialVelocity` (units/s), heading for `to`.
 *
 * @example
 * ```
 * const curve = solveSpring(springFromDurationBounce({duration: 0.5, bounce: 0}), {from: 0, to: 300});
 * curve.value(0.1); // px after 100 ms
 * ```
 */
export function solveSpring(
  spring: Spring,
  {
    from,
    to,
    velocity: initialVelocity = 0,
  }: {from: number; to: number; velocity?: number},
): SpringCurve {
  const omega0 = naturalFrequency(spring);
  const zeta = dampingRatioOf(spring);
  // Displacement from the target; the ODE is solved for x(t) = value − to.
  const x0 = from - to;
  const v0 = initialVelocity;
  let displacement: (t: number) => number;
  let speed: (t: number) => number;
  let envelope: (t: number) => number;
  // Where the envelope peaks (critically damped only; elsewhere 0).
  let envelopePeak = 0;

  if (zeta < 1 - CRITICAL_TOLERANCE) {
    const decay = zeta * omega0;
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const a = x0;
    const b = (v0 + decay * x0) / omegaD;
    const bv = (decay * v0 + omega0 * omega0 * x0) / omegaD;
    displacement = t =>
      Math.exp(-decay * t) *
      (a * Math.cos(omegaD * t) + b * Math.sin(omegaD * t));
    speed = t =>
      Math.exp(-decay * t) *
      (v0 * Math.cos(omegaD * t) - bv * Math.sin(omegaD * t));
    const amplitude = Math.abs(a) + Math.abs(b);
    envelope = t => amplitude * Math.exp(-decay * t);
  } else if (zeta <= 1 + CRITICAL_TOLERANCE) {
    const b = v0 + omega0 * x0;
    displacement = t => (x0 + b * t) * Math.exp(-omega0 * t);
    speed = t => (v0 - omega0 * b * t) * Math.exp(-omega0 * t);
    const absA = Math.abs(x0);
    const absB = Math.abs(b);
    envelope = t => (absA + absB * t) * Math.exp(-omega0 * t);
    // (|A| + |B|·t)·e^(−ω₀t) rises until t = 1/ω₀ − |A|/|B|, then decays.
    envelopePeak = absB > 0 ? Math.max(0, 1 / omega0 - absA / absB) : 0;
  } else {
    const root = omega0 * Math.sqrt(zeta * zeta - 1);
    const r1 = -zeta * omega0 + root; // slow root
    const r2 = -zeta * omega0 - root; // fast root
    const c1 = (v0 - r2 * x0) / (r1 - r2);
    const c2 = x0 - c1;
    displacement = t => c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t);
    speed = t => r1 * c1 * Math.exp(r1 * t) + r2 * c2 * Math.exp(r2 * t);
    const absC1 = Math.abs(c1);
    const absC2 = Math.abs(c2);
    envelope = t => absC1 * Math.exp(r1 * t) + absC2 * Math.exp(r2 * t);
  }

  const settleTime = (threshold: number): number => {
    if (!(threshold > 0)) {
      return Infinity;
    }
    if (zeta === 0) {
      return x0 === 0 && v0 === 0 ? 0 : Infinity;
    }
    const start = envelopePeak;
    if (envelope(start) <= threshold) {
      // `start` is where the bound peaks (0 when it only decays), so the
      // bound is within the threshold everywhere.
      return 0;
    }
    if (zeta < 1 - CRITICAL_TOLERANCE) {
      // Closed form: amplitude · e^(−ζω₀t) = threshold.
      const amplitude = envelope(0);
      return Math.log(amplitude / threshold) / (zeta * omega0);
    }
    // Monotone decreasing after `start`: bracket, then bisect.
    let lo = start;
    let hi = Math.max(start, 1 / omega0);
    while (envelope(hi) > threshold) {
      lo = hi;
      hi *= 2;
      if (hi > 1e6) {
        return Infinity;
      }
    }
    for (let i = 0; i < 100 && hi - lo > 1e-12; i++) {
      const mid = (lo + hi) / 2;
      if (envelope(mid) > threshold) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return hi;
  };

  return {
    spring,
    from,
    to,
    initialVelocity,
    value: t => to + displacement(t),
    velocity: t => speed(t),
    settleTime,
  };
}

/** Core Animation's settling epsilon (documented for SwiftUI's Spring). */
export const SETTLING_EPSILON = 0.001;

/**
 * `CASpringAnimation.settlingDuration` / SwiftUI `Spring.settlingDuration`:
 * seconds until a unit move (target 1) stays within `epsilon` of its target.
 * `initialVelocity` is UIKit's relative velocity (distance fractions per
 * second, positive toward the target), 0 by default as in SwiftUI.
 */
export function settlingDuration(
  spring: Spring,
  {
    initialVelocity = 0,
    epsilon = SETTLING_EPSILON,
  }: {initialVelocity?: number; epsilon?: number} = {},
): number {
  return solveSpring(spring, {
    from: 0,
    to: 1,
    velocity: initialVelocity,
  }).settleTime(epsilon);
}

/**
 * UIKit's legacy `animate(withDuration:delay:usingSpringWithDamping:
 * initialSpringVelocity:…)`: the caller fixes the total duration and the
 * damping ratio, and UIKit derives the spring. Modeled as unit mass with the
 * stiffness whose settling duration (above) equals `duration`.
 *
 * GUESS: UIKit does not document how it derives the stiffness; this is the
 * hypothesis that its spring settles exactly at the given duration.
 * Measurement task M-K1 (see motion/README.md) reads the CASpringAnimation
 * UIKit attaches to a layer to confirm or replace it.
 */
export function springFromUIKitDampingDuration({
  duration,
  dampingRatio,
  initialSpringVelocity = 0,
}: {
  duration: number;
  dampingRatio: number;
  initialSpringVelocity?: number;
}): Spring {
  assertPositiveFinite('duration', duration);
  // UIKit's ratio is clamped to (0, 1]: it has no overdamped springs.
  const zeta = Math.min(1, Math.max(1e-3, dampingRatio));
  const settleFor = (omega0: number) =>
    settlingDuration(
      {mass: 1, stiffness: omega0 * omega0, damping: 2 * zeta * omega0},
      {initialVelocity: initialSpringVelocity},
    );
  // Settling time falls monotonically as ω₀ grows; bisect in log space.
  let lo = 1e-3;
  let hi = 1e5;
  for (let i = 0; i < 200; i++) {
    const mid = Math.sqrt(lo * hi);
    if (settleFor(mid) > duration) {
      lo = mid;
    } else {
      hi = mid;
    }
    if (hi / lo < 1 + 1e-12) {
      break;
    }
  }
  const omega0 = Math.sqrt(lo * hi);
  return {mass: 1, stiffness: omega0 * omega0, damping: 2 * zeta * omega0};
}
