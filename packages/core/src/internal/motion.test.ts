// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file motion.test.ts
 * @input The internal motion entry
 * @output Proof that the entry re-exports the motion foundation's hooks, role
 *   resolution and Reduce Motion helpers by name, as the values Core imports
 *   by path
 * @position Guards packages/core/src/internal/motion.ts
 */

import {describe, expect, it} from 'vitest';

describe('internal/motion', () => {
  it('re-exports the animator hook, role resolution and the Reduce Motion fade by name, the same values Core imports by path', async () => {
    const entry: Record<string, unknown> = await import('./motion');
    const useAnimator = await import('../motion/useAnimator');
    const resolveMotion = await import('../motion/resolveMotion');
    const reducedMotion = await import('../motion/reducedMotion');
    expect(entry.useAnimator).toBe(useAnimator.useAnimator);
    expect(entry.resolveMotion).toBe(resolveMotion.resolveMotion);
    for (const name of [
      'reducedMotionFade',
      'REDUCED_MOTION_FADE_QUERY',
      'REDUCED_MOTION_INSTANT_QUERY',
    ] as const) {
      expect(entry[name], name).toBe(reducedMotion[name]);
    }
  });
});
