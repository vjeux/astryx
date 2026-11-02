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
 */

// iOS Safari sends no `contextmenu` event on a long press. So a long press is
// the only touch way to open a surface at the press point.
//
// A caller can spread the touch handlers, or call `start`, `moveTo` and
// `cancel` from its own pointer events. Both ways use the hold time, movement
// tolerance and timer of longPressDetector, which createMenuPress also drives
// for a menu trigger, so a long press means the same thing on a context menu
// and on a menu trigger.
//
// The defaults come from the long-press recognizer. The recognizer measures
// its tolerance as a distance, as UIKit does. This hook measures it on each
// axis. The context menu's own movement allowance is a guess and is not
// measured yet (AST-094).

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
  // The public start takes only the point. A per-press tolerance stays
  // internal to its core caller.
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
  // One detector for the component's life. It reads the latest options at each
  // start, move and fire.
  const [detector] = useState(() => longPressDetector(options));
  detector.setOptions(options);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) {
        return;
      }
      if (e.touches.length !== 1) {
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
        detector.cancel();
        return;
      }
      const touch = e.touches[0];
      detector.moveTo({x: touch.clientX, y: touch.clientY});
    },
    [detector],
  );

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
