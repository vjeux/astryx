// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiming.test.ts
 * @input vitest and an element with an inline CSS transition
 * @output Unit tests for themeTiming.ts: the timing read from an element's
 *   transition, and the curve played on it
 * @position Beside motion/themeTiming.ts
 */

import {afterEach, describe, expect, it} from 'vitest';
import {themeTimingOf, timedCurve, type ThemeTiming} from './themeTiming';

function withTransition(duration: string, easing: string): HTMLElement {
  const element = document.createElement('div');
  element.style.transitionProperty = 'none';
  element.style.transitionDuration = duration;
  element.style.transitionTimingFunction = easing;
  document.body.append(element);
  return element;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('themeTimingOf', () => {
  it('reads the duration and easing of the first transition entry, in ms or s', () => {
    const ms = themeTimingOf(
      withTransition('175ms, 2s', 'cubic-bezier(0.24, 1, 0.4, 1), linear'),
    );
    expect(ms).not.toBeNull();
    expect(ms?.seconds).toBeCloseTo(0.175, 6);
    expect(ms?.ease(0)).toBeCloseTo(0, 6);
    expect(ms?.ease(1)).toBeCloseTo(1, 6);
    // The token curve is front-loaded: past half its travel at a quarter.
    expect(ms?.ease(0.25)).toBeGreaterThan(0.5);
    const seconds = themeTimingOf(withTransition('0.41s', 'ease-out'));
    expect(seconds?.seconds).toBeCloseTo(0.41, 6);
  });

  it('gives no timing when the theme gives no duration', () => {
    // Present first: the same element with a duration does give one.
    expect(themeTimingOf(withTransition('175ms', 'ease'))).not.toBeNull();
    expect(themeTimingOf(withTransition('0s', 'ease'))).toBeNull();
  });
});

describe('timedCurve', () => {
  const timing: ThemeTiming = {seconds: 0.2, ease: progress => progress};

  it('runs from its start to its end over the timing, holding the end after', () => {
    const curve = timedCurve(-40, 0, timing);
    expect(curve.duration).toBeCloseTo(0.2, 6);
    expect(curve.at(0)).toBeCloseTo(-40, 6);
    expect(curve.at(0.1)).toBeCloseTo(-20, 6);
    expect(curve.at(0.2)).toBeCloseTo(0, 6);
    expect(curve.at(0.3)).toBeCloseTo(0, 6);
  });

  it('reports the velocity of its travel, in units per second', () => {
    const curve = timedCurve(-40, 0, timing);
    expect(curve.velocity(0.1)).toBeCloseTo(200, 3);
  });
});
