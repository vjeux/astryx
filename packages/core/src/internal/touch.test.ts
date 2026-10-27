// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file touch.test.ts
 * @input The internal `internal/touch` entry and the gesture core
 * @output INV13's entry checks: the entry re-exports the gesture core's
 *   primitives by name, the same values a Core component imports by path, and
 *   no gathering object; importing it attaches no window or document
 *   listeners, so a page with only a fine pointer runs none (`spec:AST-094`
 *   FR19, FR24)
 * @position Unit tests of packages/core/src/internal/touch.ts
 *   (architecture:react-component-runtime INV13)
 */

import {afterEach, describe, expect, it, vi} from 'vitest';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('internal/touch', () => {
  it('re-exports the gesture core by name, the same values Core imports by path', async () => {
    const entry: Record<string, unknown> = await import('./touch');
    const arena = await import('../gestures/GestureArena');
    const recognizer = await import('../gestures/GestureRecognizer');
    expect(entry.GestureArena).toBe(arena.GestureArena);
    expect(entry.GestureRecognizer).toBe(recognizer.GestureRecognizer);
    for (const name of ['TapGestureRecognizer', 'LongPressGestureRecognizer']) {
      expect(typeof entry[name], name).toBe('function');
    }
    // Named re-exports only: no gathering object a component would carry
    // whole (architecture:component-style-authoring INV6).
    expect(entry).not.toHaveProperty('touchModule');
  });

  it('re-exports the pan recognizer and the touch queries Lab builds on by name', async () => {
    const entry: Record<string, unknown> = await import('./touch');
    const pan = await import('../gestures/PanGestureRecognizer');
    const presentation = await import('../utils/touchPresentation');
    expect(entry.PanGestureRecognizer).toBe(pan.PanGestureRecognizer);
    for (const name of [
      'useTouchPresentation',
      'readTouchPresentation',
      'useCompactDefinition',
      'TOUCH_QUERY',
      'COMPACT_QUERY',
      'COMPACT_TOUCH_QUERY',
    ] as const) {
      expect(entry[name], name).toBe(presentation[name]);
    }
  });

  it('re-exports the gesture host, the other recognizers and the gesture hooks by name, the same values the gestures module exports', async () => {
    const entry: Record<string, unknown> = await import('./touch');
    const gestures: Record<string, unknown> = await import('../gestures');
    for (const name of [
      'GestureHost',
      'getGestureHost',
      'HoverGestureRecognizer',
      'PinchGestureRecognizer',
      'RotationGestureRecognizer',
      'ScreenEdgePanGestureRecognizer',
      'SwipeGestureRecognizer',
      'PressTracker',
      'PRESS_PROFILES',
      'VelocityTracker',
      'deriveTouchAction',
      'gestureHostStyle',
      'createNativeScrollProbe',
      'parseTouchAction',
      'playHaptic',
      'useGestureRecognizer',
      'usePressTracker',
    ]) {
      expect(entry[name], name).toBeDefined();
      expect(entry[name], name).toBe(gestures[name]);
    }
  });

  it('attaches no window or document listeners when it loads', async () => {
    vi.resetModules();
    const onWindow = vi.spyOn(window, 'addEventListener');
    const onDocument = vi.spyOn(document, 'addEventListener');
    await import('./touch');
    expect(onWindow).not.toHaveBeenCalled();
    expect(onDocument).not.toHaveBeenCalled();
  });
});
