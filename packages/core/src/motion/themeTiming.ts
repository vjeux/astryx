// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiming.ts
 * @input An element and the theme tokens that time one motion
 * @output readThemeTiming: the duration and the eased progress that the
 *   theme gives those tokens where the element is
 * @position Motion foundation, internal to core. A touch presentation reads
 *   it for motion that a tap, a key or the program starts.
 *
 * SYNC: When modified, update /packages/core/src/motion/themeTiming.test.ts
 */

import {cubicBezier} from './bezier';
import {parseCssEasing, parseMotionRoleValue} from './roles';
import {
  durationDefaults,
  easeDefaults,
  type DurationVarName,
  type EaseVarName,
} from '../theme/tokens.stylex';

/**
 * The theme tokens that time one motion. The duration tokens are a fallback
 * chain, and the last one always has a default.
 */
export interface ThemeTimingTokens {
  readonly durations: readonly [...string[], DurationVarName];
  readonly easing: EaseVarName;
}

/** Progress over time on the theme's tokens. */
export interface ThemeTiming {
  /** Length, s. */
  readonly duration: number;
  /** Eased progress `t` seconds after the start, from 0 to 1. */
  progress(t: number): number;
}

/**
 * Reads the tokens where the element is, so a theme scope and the theme's
 * tempo apply. An explicit zero duration means no motion. An unset, empty
 * or unparseable duration falls back to the next token in the chain. The
 * last token falls back to its default, so a bad value never means no
 * motion. An unset or unparseable easing gets its default.
 */
export function readThemeTiming(
  element: Element,
  {durations, easing}: ThemeTimingTokens,
): ThemeTiming {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  const read = (name: string) => style?.getPropertyValue(name) ?? '';
  let durationMs: number | null = null;
  for (const name of durations) {
    durationMs = parseMotionRoleValue('duration', read(name));
    if (durationMs != null) {
      break;
    }
  }
  const last = durations[durations.length - 1] as DurationVarName;
  durationMs ??= parseMotionRoleValue('duration', durationDefaults[last]) ?? 0;
  const points = parseCssEasing(read(easing)) ??
    parseCssEasing(easeDefaults[easing]) ?? [0, 0, 1, 1];
  const ease = cubicBezier(points);
  const duration = durationMs / 1000;
  return {
    duration,
    progress: t =>
      duration <= 0 || t >= duration ? 1 : ease(Math.max(0, t) / duration),
  };
}
