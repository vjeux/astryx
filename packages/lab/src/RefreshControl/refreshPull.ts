// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file refreshPull.ts
 * @input The pull values (refreshValues.ts), and the rubber band and the
 *   cubic Bézier (Core's internal touch entry)
 * @output Exports the pull mapping (finger travel → overscroll) and its
 *   inverse, the trigger distance, the reveal, a refresh's release and end
 *   targets, and the end's timing from the theme's tokens
 * @position Pure math for useRefreshControl; no DOM, no React
 *
 * SYNC: When modified, update:
 * - /packages/lab/src/RefreshControl/refreshPull.test.ts
 */

// UIKit's refresh pull, as measured: the first `height` of overscroll tracks
// the finger one to one, after the pan's hysteresis. Past it, the scroll
// view's rubber band applies to the excess. The trigger distance grows with
// the scroll view's height. After a trigger within twice the height, the
// overscroll steps back onto the finger. It stays one to one up to twice the
// height, with resistance past that.

import {cubicBezier} from '@astryxdesign/core/internal/touch';
import {rubberBand, rubberBandInverse} from '@astryxdesign/core/internal/touch';
import {refreshControl} from './refreshValues';

/** The refreshing inset and one-to-one stretch, pt. */
export const REFRESH_HEIGHT: number = refreshControl.height;

/**
 * Which mapping a pull follows.
 * - `reveal`: before the trigger. One to one up to `height`, then the rubber
 *   band on the excess.
 * - `band`: after a trigger within twice the height, and for a pull from the
 *   refreshing inset. One to one up to twice the height, then the rubber band.
 */
export type PullMode = 'reveal' | 'band';

function linearStretch(mode: PullMode): number {
  return mode === 'band'
    ? refreshControl.height * refreshControl.postTriggerLinearHeights
    : refreshControl.height;
}

/**
 * Overscroll shown for `travel` px of pull (the pan's translation, which
 * already leaves out its hysteresis). `dimension` is the scroll owner's
 * height, the rubber band's dimension.
 */
export function pullOverscroll(
  travel: number,
  dimension: number,
  mode: PullMode,
): number {
  if (!(travel > 0)) {
    return 0;
  }
  const linear = linearStretch(mode);
  if (travel <= linear) {
    return travel;
  }
  return linear + rubberBand(travel - linear, dimension);
}

/**
 * The travel that shows `overscroll`: where a finger landing on content
 * already pulled (a re-grab mid-settle) resumes without a jump.
 */
export function pullTravel(
  overscroll: number,
  dimension: number,
  mode: PullMode,
): number {
  if (!(overscroll > 0)) {
    return 0;
  }
  const linear = linearStretch(mode);
  if (overscroll <= linear) {
    return overscroll;
  }
  return linear + rubberBandInverse(overscroll - linear, dimension);
}

/**
 * The mapping after a trigger at `travel`. It is the one-to-one band when the
 * trigger falls within it, and the next frame steps onto the finger. Otherwise
 * it is the reveal mapping, as when a tall scroll view triggers past the band.
 */
export function modeAfterTrigger(travel: number): PullMode {
  return travel <= linearStretch('band') ? 'band' : 'reveal';
}

/**
 * The overscroll at which a pull triggers, for a scroll owner `dimension`
 * tall: a fraction of its height, never below the minimum.
 */
export function triggerDistance(dimension: number): number {
  return Math.max(
    refreshControl.triggerMinimum,
    refreshControl.triggerHeightFraction * Math.max(0, dimension),
  );
}

/** How much of the indicator a pull reveals, 0 to 1 (linear in the pull). */
export function revealFraction(overscroll: number, dimension: number): number {
  return Math.min(1, Math.max(0, overscroll / triggerDistance(dimension)));
}

const revealEasing = cubicBezier(refreshControl.revealCurve);

/** The reveal fraction on UIKit's reveal curve: the indicator's opacity. */
export function revealProgress(overscroll: number, dimension: number): number {
  return revealEasing(revealFraction(overscroll, dimension));
}

/**
 * Where the content comes to rest when the finger lifts: on the refreshing
 * inset while refreshing, back at the top otherwise.
 */
export function releaseTarget(isRefreshing: boolean): number {
  return isRefreshing ? refreshControl.height : 0;
}

/**
 * How the end of a refresh moves the content. `scrolled` (≥ 0) is how far the
 * scroll owner is scrolled with the inset still in place. While the gap
 * shows, the content slides up until the gap closes: the inset animates from
 * `height` to `scrolled`. Then the inset and the scroll offset drop together
 * with no visible change. Scrolled past the gap, nothing moves, and the inset
 * and the offset drop at once.
 */
export function endMotion(scrolled: number): {
  animateTo: number | null;
  scrollBy: number;
} {
  const height = refreshControl.height;
  const offset = Math.max(0, scrolled);
  if (offset >= height) {
    return {animateTo: null, scrollBy: -height};
  }
  return {animateTo: offset, scrollBy: -offset};
}

/** Cubic-bézier control points. */
export type CurvePoints = readonly [number, number, number, number];

/** A CSS time, such as `300ms` or `0.3s`, in ms. Null for anything else. */
export function parseCssTimeMs(value: string): number | null {
  const match = /^\s*(\d*\.?\d+)(ms|s)\s*$/i.exec(value);
  if (match == null) {
    return null;
  }
  const amount = Number(match[1]);
  return match[2].toLowerCase() === 's' ? amount * 1000 : amount;
}

const KEYWORD_EASINGS: Record<string, CurvePoints> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};

/**
 * A CSS easing as cubic-bézier control points. Null for an easing that has
 * none, such as `steps()`.
 */
export function parseCssEasing(value: string): CurvePoints | null {
  const text = value.trim().toLowerCase();
  if (Object.hasOwn(KEYWORD_EASINGS, text)) {
    return KEYWORD_EASINGS[text];
  }
  const match = /^cubic-bezier\(([^)]*)\)$/.exec(text);
  const points = match?.[1].split(',').map(part => Number(part.trim()));
  if (
    points == null ||
    points.length !== 4 ||
    points.some(point => !Number.isFinite(point))
  ) {
    return null;
  }
  const [x1, y1, x2, y2] = points;
  // CSS limits the x control points to 0–1.
  if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
    return null;
  }
  return [x1, y1, x2, y2];
}

/**
 * The end's duration and curve: the theme tokens that `refreshControl` names,
 * as the end's element computes them. Null when either token is missing or
 * in a form it cannot read, such as `calc()`, `var()` or `steps()`.
 */
export function endTiming(
  style: Pick<CSSStyleDeclaration, 'getPropertyValue'>,
): {ms: number; points: CurvePoints} | null {
  const ms = parseCssTimeMs(
    style.getPropertyValue(refreshControl.endDurationToken),
  );
  const points = parseCssEasing(
    style.getPropertyValue(refreshControl.endEasingToken),
  );
  return ms == null || points == null ? null : {ms, points};
}
