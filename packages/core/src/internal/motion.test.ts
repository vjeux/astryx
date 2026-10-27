// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file motion.test.ts
 * @input The internal `internal/motion` entry, the animator and the UIKit
 *   tuning table index
 * @output The entry re-exports the animator's plans by name, `animatorFor`
 *   included, and every export of the table index, each the same value a Core
 *   component imports by path, so a table added to motion/uikit reaches Lab
 *   with no edit to the entry
 * @position Unit tests of packages/core/src/internal/motion.ts
 *   (architecture:react-component-runtime INV13)
 */

import {describe, expect, it} from 'vitest';

describe('internal/motion', () => {
  it('re-exports the animator by name, animatorFor included, the same values Core imports by path', async () => {
    const entry: Record<string, unknown> = await import('./motion');
    const animator: Record<string, unknown> =
      await import('../motion/animator');
    for (const name of ['animatorFor', 'createAnimator'] as const) {
      expect(typeof animator[name], name).toBe('function');
      expect(entry[name], name).toBe(animator[name]);
    }
  });

  it('re-exports every export of the UIKit table index, the same values Core imports by path', async () => {
    const entry: Record<string, unknown> = await import('./motion');
    const index: Record<string, unknown> = await import('../motion/uikit');
    const names = Object.keys(index);
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(entry[name], name).toBe(index[name]);
    }
    // Each table is its own export: no gathering object a component would
    // carry whole (architecture:component-style-authoring INV6).
    expect(entry).not.toHaveProperty('uikit');
  });
});
