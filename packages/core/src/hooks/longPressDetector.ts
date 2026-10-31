// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file longPressDetector.ts
 * @input The long-press numbers (motion/uikit/longPress.ts)
 * @output longPressDetector(): a press held for the delay, cancelled by a move
 *   past its tolerance, with no React
 * @position Internal; the one long-press detector of the system: the core of
 *   useLongPress and useLongPressDetector (useLongPress.ts) and of
 *   createMenuPress's held finger on a trigger. Not in the hooks entry.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/useLongPress.ts
 * - /packages/core/src/hooks/createMenuPress.ts
 */

import {
  LONG_PRESS_ALLOWABLE_MOVEMENT_PX,
  LONG_PRESS_DURATION_MS,
} from '../motion/uikit/longPress';

// The long-press numbers have one source, shared with the gesture
// recognizers (motion/uikit/longPress.ts).
const DEFAULT_DELAY_MS = LONG_PRESS_DURATION_MS;
const DEFAULT_MOVE_CANCEL_PX = LONG_PRESS_ALLOWABLE_MOVEMENT_PX;

/** @internal What a detector reads at each start, move and fire. */
export interface LongPressDetectorOptions {
  /** Fired with the start point once the press is held for `delayMs`. */
  onLongPress: (point: {x: number; y: number}) => void;
  /** When true, a start does nothing. */
  disabled?: boolean;
  /** Hold duration before the press fires, in ms. Defaults to 500. */
  delayMs?: number;
  /** Movement past this distance (px, either axis) cancels the press. Defaults to 10. */
  moveCancelPx?: number;
}

/**
 * @internal A press's own movement tolerance, for a caller that decides it as
 * the press starts (createMenuPress's trigger).
 */
export interface LongPressTolerance {
  moveCancelPx?: number;
}

/** @internal One detector: start a press, report its moves, or drop it. */
export interface LongPressDetector {
  /** Begin detection at a point, dropping any press still pending. */
  start: (
    point: {x: number; y: number},
    tolerance?: LongPressTolerance,
  ) => void;
  /**
   * Report the pointer's new position. Past the tolerance the press is off.
   * Returns whether a press is still pending.
   */
  moveTo: (point: {x: number; y: number}) => boolean;
  /** Drop any pending press (a lift, a cancel, or the gesture moving on). */
  cancel: () => void;
  /** Whether a press is in progress (started and not dropped). */
  isPending: () => boolean;
  /** The options the next start, move and fire read. */
  setOptions: (options: LongPressDetectorOptions) => void;
}

/** @internal A long-press detector with no React (see LongPressDetector). */
export function longPressDetector(
  initial: LongPressDetectorOptions,
): LongPressDetector {
  let options = initial;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let from: {x: number; y: number} | null = null;
  // The press in progress's tolerance, when its caller chose one at start.
  let pressTolerance: LongPressTolerance | null = null;

  const cancel = () => {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
    from = null;
  };

  return {
    start(point, tolerance) {
      if (options.disabled === true) {
        return;
      }
      // Clear any stale timer first, THEN record the start point — clearing
      // also forgets the start, so order matters.
      cancel();
      from = {x: point.x, y: point.y};
      pressTolerance = tolerance ?? null;
      timer = setTimeout(() => {
        const at = from;
        if (at == null) {
          return;
        }
        options.onLongPress({x: at.x, y: at.y});
      }, options.delayMs ?? DEFAULT_DELAY_MS);
    },
    moveTo(point) {
      const at = from;
      if (at == null) {
        return false;
      }
      // This press's own tolerance when its caller chose one, on either axis.
      const limit =
        pressTolerance?.moveCancelPx ??
        options.moveCancelPx ??
        DEFAULT_MOVE_CANCEL_PX;
      if (
        Math.abs(point.x - at.x) > limit ||
        Math.abs(point.y - at.y) > limit
      ) {
        // Treat as a scroll/drag, not a long-press.
        cancel();
        return false;
      }
      return true;
    },
    cancel,
    isPending: () => from != null,
    setOptions(next) {
      options = next;
    },
  };
}
