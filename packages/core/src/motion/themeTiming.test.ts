// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiming.test.ts
 * @input vitest (jsdom), readThemeTiming and easedProgress, the theme's
 *   duration and easing defaults
 * @output Checks how a motion reads its timing: from the element's own
 *   transition, and from tokens set where the element is or at their
 *   defaults. Also checks the values that give no curve, the progress velocity
 *   and easedProgress's curve. jsdom resolves no `calc()`; the browser proof
 *   covers it.
 * @position Testing; validates themeTiming.ts
 */

import {afterEach, describe, expect, it} from 'vitest';
import {cubicBezier} from './bezier';
import {parseCssEasing} from './roles';
import {
  easedProgress,
  readThemeTiming,
  type ThemeTimingTokens,
} from './themeTiming';
import {easeDefaults} from '../theme/tokens.stylex';

const FAST: ThemeTimingTokens = {
  duration: '--duration-fast',
  easing: '--ease-standard',
};

const standardEase = cubicBezier(
  parseCssEasing(easeDefaults['--ease-standard'])!,
);

function element(styles: Record<string, string> = {}): HTMLElement {
  const node = document.createElement('div');
  for (const [name, value] of Object.entries(styles)) {
    node.style.setProperty(name, value);
  }
  document.body.appendChild(node);
  return node;
}

describe('readThemeTiming', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('reads the element\u2019s own transition with no tokens', () => {
    const timing = readThemeTiming(
      element({
        'transition-duration': '0.3s, 1s',
        'transition-timing-function': 'linear, ease-in',
      }),
    )!;
    expect(timing.duration).toBeCloseTo(0.3, 6);
    expect(timing.at(0.15)).toBeCloseTo(0.5, 6);
    expect(readThemeTiming(element())).toBe(null);
  });

  it('reads tokens set where the element is, in ms or s', () => {
    const seconds = readThemeTiming(
      element({'--duration-fast': '0.3s', '--ease-standard': 'linear'}),
      FAST,
    )!;
    expect(seconds.duration).toBeCloseTo(0.3, 6);
    expect(seconds.at(0.15)).toBeCloseTo(0.5, 6);
    const ms = readThemeTiming(element({'--duration-fast': '250ms'}), FAST)!;
    expect(ms.duration).toBeCloseTo(0.25, 6);
    expect(document.body.children).toHaveLength(2);
  });

  it('reads a token with no value on the element at the default core declares', () => {
    const timing = readThemeTiming(element(), FAST)!;
    expect(timing.duration).toBeCloseTo(0.175, 6);
    expect(timing.at(0.0875)).toBeCloseTo(standardEase(0.5), 6);
    expect(timing.at(0.175)).toBe(1);
  });

  it('gives the progress velocity per second, and none once the motion ends', () => {
    const timing = readThemeTiming(
      element({'--duration-fast': '0.3s', '--ease-standard': 'linear'}),
      FAST,
    )!;
    expect(timing.velocity(0)).toBeCloseTo(1 / 0.3, 4);
    expect(timing.velocity(0.15)).toBeCloseTo(1 / 0.3, 4);
    expect(timing.velocity(0.3)).toBe(0);
    const eased = readThemeTiming(element(), {
      duration: '--duration-fast',
      easing: '--ease-exit',
    })!;
    const t = 0.05;
    const h = 1e-6;
    expect(eased.velocity(t)).toBeCloseTo(
      (eased.at(t + h) - eased.at(t - h)) / (2 * h),
      3,
    );
  });

  it('returns no curve for a duration that is not a positive length, or an easing it does not read', () => {
    expect(readThemeTiming(element({'--duration-fast': '0ms'}), FAST)).toBe(
      null,
    );
    expect(readThemeTiming(element({'--duration-fast': 'fast'}), FAST)).toBe(
      null,
    );
    expect(
      readThemeTiming(element({'--ease-standard': 'steps(4)'}), FAST),
    ).toBe(null);
    expect(readThemeTiming(element({'transition-duration': '0s'}))).toBe(null);
  });
});

describe('easedProgress', () => {
  it('eases from 0 to 1 over its length, and a curve of no length is at its end', () => {
    const curve = easedProgress(0.2, x => x * x);
    expect(curve.duration).toBe(0.2);
    expect(curve.at(0)).toBe(0);
    expect(curve.at(0.1)).toBeCloseTo(0.25, 6);
    expect(curve.at(0.2)).toBe(1);
    expect(curve.velocity(0.1)).toBeCloseTo(5, 3);
    expect(curve.velocity(0.2)).toBe(0);
    const none = easedProgress(0, x => x);
    expect(none.at(0)).toBe(1);
    expect(none.velocity(0)).toBe(0);
  });
});
