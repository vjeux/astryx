// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file composerBounce.test.ts
 * @input vitest, jsdom, a recorded animator and bounceComposer
 * @output Tests the bounce's curve: one dip down and back to rest on the
 *   keyboard's spring, played through the layer's animator. The dip is never
 *   faster than the finger and no deeper than its bound, and a second bounce
 *   starts where the layer is drawn. Nothing moves under Reduce Motion, the
 *   person's setting or a theme's mark.
 * @position Unit tests for Chat/composerBounce.ts
 */

import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import type {
  AnimateOptions,
  Animator,
  MotionCurve,
  MotionProperty,
} from '../motion/animator';
import {reducedMotionMarkProps} from '../privateAttributes/reducedMotion.stylex';
import {bounceComposer} from './composerBounce';

interface Played {
  curve: MotionCurve;
  options: AnimateOptions | undefined;
}

let played: Played[];
let dock: HTMLElement;
// Where the recorded animator reports the layer drawn.
let drawnAt: number;

/** An animator that records each `play` of `y` and reports `drawnAt`. */
function recordingAnimator(): Animator {
  return {
    get: (property: MotionProperty) => (property === 'y' ? drawnAt : 0),
    play: (
      curves: Partial<Record<MotionProperty | 'scale', MotionCurve>>,
      options?: AnimateOptions,
    ) => {
      if (curves.y != null) {
        played.push({curve: curves.y, options});
      }
      return {} as ReturnType<Animator['play']>;
    },
  } as unknown as Animator;
}

// The curve sampled every 60 Hz frame and at its end, as [ms, px] pairs.
function curveOf({curve}: Played): [number, number][] {
  const samples: [number, number][] = [];
  for (let t = 0; t < curve.duration; t += 1 / 60) {
    samples.push([t * 1000, curve.at(t)]);
  }
  samples.push([curve.duration * 1000, curve.at(curve.duration)]);
  return samples;
}

describe('bounceComposer', () => {
  beforeEach(() => {
    played = [];
    drawnAt = 0;
    dock = document.createElement('div');
    document.body.append(dock);
    // jsdom has no Web Animations; the layer needs `animate` to bounce.
    Object.defineProperty(dock, 'animate', {
      configurable: true,
      value: () => ({}) as Animation,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('dips once, down and back to rest, played as a touch release', () => {
    bounceComposer(dock, 500, 12, recordingAnimator());
    expect(played).toHaveLength(1);
    expect(played[0].options?.touchRelease).toBe(true);
    const curve = curveOf(played[0]);
    expect(curve[0]).toEqual([0, 0]);
    expect(curve.at(-1)?.[1]).toBe(0);
    const depths = curve.map(([, y]) => y);
    const turn = depths.indexOf(Math.max(...depths));
    expect(depths.slice(0, turn + 1)).toEqual(
      [...depths.slice(0, turn + 1)].sort((a, b) => a - b),
    );
    expect(depths.slice(turn)).toEqual(
      [...depths.slice(turn)].sort((a, b) => b - a),
    );
  });

  it('never moves faster than the finger', () => {
    for (const fingerSpeed of [100, 500, 2000]) {
      played = [];
      bounceComposer(dock, fingerSpeed, 12, recordingAnimator());
      const curve = curveOf(played[0]);
      for (let i = 1; i < curve.length; i++) {
        const [t0, y0] = curve[i - 1];
        const [t1, y1] = curve[i];
        expect(Math.abs(y1 - y0) / ((t1 - t0) / 1000)).toBeLessThanOrEqual(
          fingerSpeed,
        );
      }
    }
  });

  it('goes as deep as a slow finger takes it, and a fast one no deeper than its bound', () => {
    bounceComposer(dock, 100, 12, recordingAnimator());
    const slow = Math.max(...curveOf(played[0]).map(([, y]) => y));
    expect(slow).toBeGreaterThan(0);
    expect(slow).toBeLessThan(12);
    played = [];
    bounceComposer(dock, 5000, 12, recordingAnimator());
    const fast = Math.max(...curveOf(played[0]).map(([, y]) => y));
    expect(fast).toBeLessThanOrEqual(12);
    expect(fast).toBeGreaterThan(11);
  });

  it('starts a second bounce where the layer is drawn, so it never jumps', () => {
    drawnAt = 5;
    bounceComposer(dock, 500, 12, recordingAnimator());
    const curve = curveOf(played[0]);
    expect(curve[0]).toEqual([0, 5]);
    expect(curve.at(-1)?.[1]).toBe(0);
  });

  it('plays nothing for a finger at rest, with no depth to go, or under Reduce Motion', () => {
    bounceComposer(dock, 0, 12, recordingAnimator());
    bounceComposer(dock, 500, 0, recordingAnimator());
    const matchMedia = window.matchMedia;
    window.matchMedia = (query: string) =>
      ({
        matches: /prefers-reduced-motion:\s*reduce/.test(query),
        media: query,
      }) as MediaQueryList;
    try {
      bounceComposer(dock, 500, 12, recordingAnimator());
    } finally {
      window.matchMedia = matchMedia;
    }
    expect(played).toEqual([]);
  });

  it('plays nothing inside a theme that reduces motion for everyone', () => {
    const theme = document.createElement('div');
    for (const [name, value] of Object.entries(reducedMotionMarkProps(true))) {
      theme.setAttribute(name, value);
    }
    theme.append(dock);
    document.body.append(theme);
    bounceComposer(dock, 500, 12, recordingAnimator());
    expect(played).toEqual([]);
  });
});
