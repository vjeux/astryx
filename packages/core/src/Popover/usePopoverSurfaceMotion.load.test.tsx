// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file usePopoverSurfaceMotion.load.test.tsx
 * @input vitest (jsdom), React Testing Library, a stubbed pointer query whose
 *   answer can change, a recording stand-in for the motion, and a stand-in for
 *   the shared touch runtime that counts its loads
 * @output Checks when Popover's touch motion loads: after the page's first
 *   paint under a coarse primary pointer, after the next paint once a fine one
 *   turns coarse, and never under a fine one. The shared touch runtime does
 *   not bring it, and a popover does not load the runtime
 * @position Testing; the hook's open and close calls are in
 *   usePopoverSurfaceMotion.test.tsx
 */

import {renderHook} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {TOUCH_QUERY} from '../utils/touchPresentation';

vi.mock('./popoverSurfaceMotion', () => ({
  createPopoverSurfaceMotion: vi.fn(() => ({
    enter: vi.fn(),
    exit: vi.fn(),
    reset: vi.fn(),
    dispose: vi.fn(),
  })),
}));

// The shared touch runtime, as a stand-in that counts its loads. It offers
// the motion too, so a popover that took the motion from it would grow.
let runtimeLoads = 0;
vi.mock('../utils/touchRuntimeModules', async () => {
  runtimeLoads += 1;
  const {createPopoverSurfaceMotion} = await import('./popoverSurfaceMotion');
  return {touchRuntime: {createPopoverSurfaceMotion}};
});

let isTouch = false;
let pointerChange: (() => void) | null = null;

beforeEach(() => {
  // Each case starts on a fresh page: nothing loaded, nothing scheduled.
  vi.resetModules();
  runtimeLoads = 0;
  isTouch = false;
  pointerChange = null;
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      get matches() {
        return query === TOUCH_QUERY ? isTouch : false;
      },
      media: query,
      addEventListener: (_type: string, listener: () => void) => {
        if (query === TOUCH_QUERY) {
          pointerChange = listener;
        }
      },
      removeEventListener: () => {
        if (query === TOUCH_QUERY) {
          pointerChange = null;
        }
      },
    })),
  );
  // A frame callback runs in the next task, as it does before a paint.
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
    setTimeout(() => callback(performance.now()), 0),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

/** Lets a paint, the idle wait after it, and any load they start finish. */
async function settle(): Promise<void> {
  for (let turn = 0; turn < 20; turn++) {
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

async function freshPage() {
  const {usePopoverSurfaceMotion} = await import('./usePopoverSurfaceMotion');
  const {createPopoverSurfaceMotion} = await import('./popoverSurfaceMotion');
  const {getTouchRuntime} = await import('../utils/touchRuntime');
  const layer = document.createElement('div');
  layer.setAttribute('popover', 'auto');
  const trigger = document.createElement('button');
  document.body.append(layer, trigger);
  const {result} = renderHook(() => usePopoverSurfaceMotion());
  /** Opens under the pointer the query reports now; true if it grew. */
  const openGrows = () => {
    const before = vi.mocked(createPopoverSurfaceMotion).mock.calls.length;
    result.current.present(layer, trigger);
    result.current.closeStart();
    return vi.mocked(createPopoverSurfaceMotion).mock.calls.length > before;
  };
  return {getTouchRuntime, openGrows};
}

describe('usePopoverSurfaceMotion loading', () => {
  it('under a fine primary pointer, loads neither its touch motion nor the shared touch runtime', async () => {
    const page = await freshPage();
    await settle();
    expect(runtimeLoads).toBe(0);
    expect(page.getTouchRuntime()).toBeNull();
    // A coarse open with nothing loaded presents as under a fine pointer.
    isTouch = true;
    expect(page.openGrows()).toBe(false);
  });

  it('under a coarse primary pointer, loads its touch motion after first paint, without the shared touch runtime', async () => {
    isTouch = true;
    const page = await freshPage();
    // Before the first paint, an open presents as under a fine pointer.
    expect(page.openGrows()).toBe(false);
    await settle();
    expect(page.openGrows()).toBe(true);
    expect(runtimeLoads).toBe(0);
    expect(page.getTouchRuntime()).toBeNull();
  });

  it('loads its touch motion after the next paint once a fine primary pointer turns coarse', async () => {
    const page = await freshPage();
    await settle();
    // The pointer turns coarse (a tablet's keyboard detached): until the
    // motion loads, an open still presents as under a fine pointer.
    isTouch = true;
    expect(page.openGrows()).toBe(false);
    pointerChange?.();
    await settle();
    expect(page.openGrows()).toBe(true);
    expect(runtimeLoads).toBe(0);
    expect(page.getTouchRuntime()).toBeNull();
  });
});
