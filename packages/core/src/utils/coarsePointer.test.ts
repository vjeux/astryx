// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file coarsePointer.test.ts
 * @input coarsePointer.ts and the gestures' pointer test helper
 * @output The gate reads and follows the primary pointer, and every hook
 *   reader shares one listener
 * @position Unit tests of packages/core/src/utils/coarsePointer.ts
 */

import {afterEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {
  isCoarsePointer,
  useIsCoarsePointer,
  watchCoarsePointer,
} from './coarsePointer';
import {pointerQuery} from '../gestures/__tests__/pointerQuery';

describe('coarsePointer', () => {
  it('reads the primary pointer, and follows it until stopped', () => {
    const pointer = pointerQuery(false);
    try {
      expect(isCoarsePointer(window)).toBe(false);
      const seen: boolean[] = [];
      const stop = watchCoarsePointer(window, isCoarse => seen.push(isCoarse));
      pointer.set(true);
      expect(isCoarsePointer(window)).toBe(true);
      pointer.set(false);
      stop();
      pointer.set(true);
      expect(seen).toEqual([true, false]);
    } finally {
      pointer.restore();
    }
  });

  it('answers fine without a window', () => {
    expect(isCoarsePointer(null)).toBe(false);
    expect(watchCoarsePointer(null, () => {})).toBeTypeOf('function');
  });
});

/** A touch query whose answer the test sets, counting its live listeners. */
function stubTouchQuery(initial: boolean) {
  let matches = initial;
  const handlers = new Set<() => void>();
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      get matches() {
        return query.includes('pointer: coarse') ? matches : false;
      },
      media: query,
      onchange: null,
      addEventListener: (_type: string, handler: () => void) => {
        if (query.includes('pointer: coarse')) {
          handlers.add(handler);
        }
      },
      removeEventListener: (_type: string, handler: () => void) => {
        handlers.delete(handler);
      },
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })),
  );
  return {
    live: () => handlers.size,
    change: (next: boolean) => {
      matches = next;
      for (const handler of Array.from(handlers)) {
        handler();
      }
    },
  };
}

describe('useIsCoarsePointer', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('holds one listener for every reader and none after the last unmounts', () => {
    const query = stubTouchQuery(false);
    const readers = [0, 1, 2].map(() =>
      renderHook(() => useIsCoarsePointer()),
    );
    expect(query.live()).toBe(1);
    for (const reader of readers) {
      reader.unmount();
    }
    expect(query.live()).toBe(0);
  });

  it('moves every reader when the primary pointer changes', () => {
    const query = stubTouchQuery(false);
    const a = renderHook(() => useIsCoarsePointer());
    const b = renderHook(() => useIsCoarsePointer());
    expect([a.result.current, b.result.current]).toEqual([false, false]);
    act(() => query.change(true));
    expect([a.result.current, b.result.current]).toEqual([true, true]);
  });

  it('answers a coarse primary pointer on the first client render', () => {
    stubTouchQuery(true);
    expect(renderHook(() => useIsCoarsePointer()).result.current).toBe(true);
  });
});
