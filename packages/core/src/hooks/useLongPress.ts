// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useLongPress.ts
 * @input Long-press options: onLongPress callback, disabled, delayMs, moveCancelPx
 * @output Touch handlers to spread onto an element, plus the same detection
 *   driven by hand for a caller already observing pointer events
 * @position Core hook for long-press invocation; used by ContextMenu. Its
 *   detector (longPressDetector.ts) also times createMenuPress's held finger
 *   on a menu trigger
 *
 * SYNC: When modified, update the hooks barrel /packages/core/src/hooks/index.ts
 * and the detector it wraps, /packages/core/src/hooks/longPressDetector.ts
 *
 * Detects a single-finger long-press: fires `onLongPress` with the press
 * start point after `delayMs`. Cancels if the finger moves past
 * `moveCancelPx` on either axis (treated as a scroll/drag), lifts, or the
 * touch is cancelled. The pending timer is also cleared on unmount. The
 * default duration and tolerance are the long-press recognizer's
 * (motion/uikit/longPress.ts); the recognizer measures its tolerance as a
 * distance, as UIKit does, and this hook on each axis: the released rule
 * that ContextMenu's hold and the menu trigger keep. GUESS (`spec:AST-094`
 * FR2): the context menu's own movement allowance and press thresholds are
 * not measured yet (motion/MEASUREMENTS.md M-CM3, M-CM6).
 *
 * Two ways in, one detector. Spread the touch handlers onto an element, or —
 * when the caller already runs its own pointer-event machine — call `start`,
 * `moveTo` and `cancel` from it. Either way the hold duration, the movement
 * tolerance and the timer are longPressDetector's, which createMenuPress
 * drives for a menu trigger too, so a long press cannot come to mean one
 * thing on a context menu and another on a menu trigger.
 *
 * Motivation: iOS Safari never synthesizes a `contextmenu` event on
 * long-press, so long-press is the only touch affordance for opening
 * cursor-positioned surfaces.
 */

import {useCallback, useEffect, useState} from 'react';
import {longPressDetector, type LongPressTolerance} from './longPressDetector';

export type {LongPressTolerance} from './longPressDetector';

export interface UseLongPressOptions {
  /** Fired with the touch start point once the press is held for `delayMs`. */
  onLongPress: (point: {x: number; y: number}) => void;
  /** When true, touch handlers are inert. */
  disabled?: boolean;
  /** Hold duration before the press fires, in ms. Defaults to 500. */
  delayMs?: number;
  /** Movement past this distance (px, either axis) cancels the press. Defaults to 10. */
  moveCancelPx?: number;
}

export interface UseLongPressHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
  /**
   * Begin detection at a point, for a caller driving this from its own
   * pointer events rather than the touch handlers above.
   */
  start: (point: {x: number; y: number}) => void;
  /**
   * Report the pointer's new position. Past `moveCancelPx` the press is off.
   * Returns whether a press is still pending, so a caller running its own
   * state machine can react to the cancellation in the same step.
   */
  moveTo: (point: {x: number; y: number}) => boolean;
  /** Drop any pending press (a lift, a cancel, or the gesture moving on). */
  cancel: () => void;
}

/**
 * @internal The handlers with a per-press tolerance on `start`, for a core
 * caller that decides it as the press starts. Not in the hooks entry: the
 * public `useLongPress` takes its tolerance from `moveCancelPx`.
 */
export interface LongPressDetectorHandlers extends Omit<
  UseLongPressHandlers,
  'start'
> {
  start: (
    point: {x: number; y: number},
    tolerance?: LongPressTolerance,
  ) => void;
}

export function useLongPress(
  options: UseLongPressOptions,
): UseLongPressHandlers {
  const {start, ...handlers} = useLongPressDetector(options);
  // The public start takes the point only: a per-press tolerance stays
  // internal to its core caller (architecture:public-component-api INV12).
  const startAt = useCallback(
    (point: {x: number; y: number}) => start(point),
    [start],
  );
  return {...handlers, start: startAt};
}

/** @internal useLongPress with a per-press tolerance (LongPressDetectorHandlers). */
export function useLongPressDetector(
  options: UseLongPressOptions,
): LongPressDetectorHandlers {
  const disabled = options.disabled ?? false;
  // One detector for the component's life; it reads the latest options at
  // each start, move and fire, so the handlers need not be re-created.
  const [detector] = useState(() => longPressDetector(options));
  detector.setOptions(options);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) {
        return;
      }
      if (e.touches.length !== 1) {
        // Multi-touch cancels any pending long-press.
        detector.cancel();
        return;
      }
      const touch = e.touches[0];
      detector.start({x: touch.clientX, y: touch.clientY});
    },
    [disabled, detector],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!detector.isPending()) {
        return;
      }
      if (e.touches.length !== 1) {
        // Multi-touch cancels the pending long-press.
        detector.cancel();
        return;
      }
      const touch = e.touches[0];
      detector.moveTo({x: touch.clientX, y: touch.clientY});
    },
    [detector],
  );

  // Cancel any pending long-press timer on unmount.
  useEffect(() => detector.cancel, [detector]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd: detector.cancel,
    onTouchCancel: detector.cancel,
    start: detector.start,
    moveTo: detector.moveTo,
    cancel: detector.cancel,
  };
}
