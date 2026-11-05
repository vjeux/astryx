// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiming.ts
 * @input An element, and optionally the theme tokens that time one motion
 * @output readThemeTiming: the eased progress from 0 to 1 that times a motion,
 *   as one timed MotionCurve. It reads the element's own transition, or
 *   tokens where the element is. easedProgress: that curve for a length and an
 *   easing already read.
 * @position Motion foundation, internal to core. Motion that a tap, a key or
 *   the program starts reads its duration and easing from the theme with it.
 *
 * SYNC: When modified, update /packages/core/src/motion/themeTiming.test.ts
 *   and /packages/core/src/motion/__tests__/themeTiming.interaction.browser.spec.ts
 */

import type {MotionCurve} from './animator';
import {cubicBezier} from './bezier';
import {parseCssEasing, parseMotionRoleValue} from './roles';
import {
  durationDefaults,
  easeDefaults,
  type DurationVarName,
  type EaseVarName,
} from '../theme/tokens.stylex';

/** The theme tokens that time one motion. */
export interface ThemeTimingTokens {
  readonly duration: DurationVarName;
  readonly easing: EaseVarName;
}

/**
 * The eased progress from 0 to 1 over `seconds`, as a MotionCurve whose
 * velocity is in progress per second. A curve of no length is at its end.
 */
export function easedProgress(
  seconds: number,
  ease: (x: number) => number,
): MotionCurve {
  const at = (t: number) =>
    seconds <= 0 || t >= seconds ? 1 : ease(Math.max(0, t) / seconds);
  // A central difference, one step inside the curve at either end.
  const step = Math.min(1e-3, seconds / 100);
  return {
    duration: seconds,
    at,
    velocity: t => {
      if (seconds <= 0 || t >= seconds) {
        return 0;
      }
      const before = Math.max(0, t - step);
      const after = Math.min(seconds, t + step);
      return (at(after) - at(before)) / (after - before);
    },
  };
}

/** The first transition's duration and easing in a computed style. */
function transitionProgress(style: CSSStyleDeclaration): MotionCurve | null {
  const ms = parseMotionRoleValue(
    'duration',
    style.transitionDuration.split(',')[0] ?? '',
  );
  const points = parseCssEasing(
    style.transitionTimingFunction.split(/,(?![^(]*\))/)[0] ?? '',
  );
  if (ms == null || ms <= 0 || points == null) {
    return null;
  }
  return easedProgress(ms / 1000, cubicBezier(points));
}

/**
 * The eased progress from 0 to 1 that times a motion of `element`, as a
 * MotionCurve whose velocity is in progress per second. A computed transition
 * gives the values, so the browser resolves `var()` and `calc()`, a theme
 * scope and the theme's tempo. With no tokens, it reads the element's own
 * transition, where its stylesheet applies the theme's tokens. With tokens,
 * it reads them where the element is, and resolves them on a probe's
 * transition. A token with no value there reads the default core declares.
 * Null when the duration is not a positive length or the easing does not
 * parse: the caller decides what that motion does.
 */
export function readThemeTiming(
  element: Element,
  tokens?: ThemeTimingTokens,
): MotionCurve | null {
  const view = element.ownerDocument.defaultView;
  if (view == null) {
    return null;
  }
  const style = view.getComputedStyle(element);
  if (tokens == null) {
    return transitionProgress(style);
  }
  const read = (name: string, declared: string) =>
    style.getPropertyValue(name).trim() || declared;
  const doc = element.ownerDocument;
  const probe = doc.createElement('span');
  // A computed value needs no layout, so the probe never renders.
  probe.style.setProperty('display', 'none', 'important');
  probe.style.setProperty(
    'transition-duration',
    read(tokens.duration, durationDefaults[tokens.duration]),
    'important',
  );
  probe.style.setProperty(
    'transition-timing-function',
    read(tokens.easing, easeDefaults[tokens.easing]),
    'important',
  );
  (doc.body ?? doc.documentElement).append(probe);
  try {
    return transitionProgress(view.getComputedStyle(probe));
  } finally {
    probe.remove();
  }
}
