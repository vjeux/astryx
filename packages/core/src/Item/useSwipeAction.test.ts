// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useSwipeAction.test.ts
 * @input vitest; the pure geometry of useSwipeAction
 * @output Each side's physical edge in both writing directions (the parts'
 *   geometry is ItemSwipeLayer's styles, proved in the interaction spec)
 * @position Unit tests of packages/core/src/Item/useSwipeAction.ts; the hook
 *   itself is tested through Item.test.tsx and the interaction spec
 */

import {describe, expect, it} from 'vitest';
import {physicalSign} from './useSwipeAction';

describe('physicalSign', () => {
  it('puts a side on the physical edge its direction names', () => {
    // Leading sits at the inline start: the left in LTR, the right in RTL.
    expect(physicalSign('leading', 1)).toBe(1);
    expect(physicalSign('trailing', 1)).toBe(-1);
    expect(physicalSign('leading', -1)).toBe(-1);
    expect(physicalSign('trailing', -1)).toBe(1);
  });
});
