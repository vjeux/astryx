// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PressTracker.ts
 * @input Touches the arena delivers to a pressable view (TouchConsumer)
 * @output Exports PressTracker (UIControl's touch tracking), its options and
 *   the control event type
 * @position View-level consumer of packages/core/src/gestures: what a
 *   UIControl does with the touches no gesture recognizer took
 *
 * UIControl semantics, event for event:
 *
 * - `touchDown` when the finger lands; the highlight comes on in the same
 *   frame, unless the control sits in a scroller, where it waits
 *   `contentTouchDelay` (UIScrollView.delaysContentTouches) so a flick
 *   paints nothing.
 * - `touchDragInside` / `touchDragOutside` on every move, `touchDragExit` /
 *   `touchDragEnter` when the finger crosses the control's bounds EXPANDED
 *   by `trackingExpansion` (a fingertip dragged a little off a button is
 *   still on it). The highlight follows inside / outside.
 * - `touchUpInside` / `touchUpOutside` at the lift. A tap quicker than the
 *   scroller delay shows the highlight at the lift for `quickTapFlash`.
 * - `touchCancel` when a recognizer took the touch (`cancelsTouchesInView`)
 *   or the browser took it to scroll: the highlight goes at once, with no
 *   release, one frame before the content moves.
 *
 * And UIControl's iOS 6 rule: a single-finger single tap recognizer on an
 * ANCESTOR does not beat the control's own action for a touch on it (the
 * default veto; `vetoesAncestorRecognizer` replaces it, as a slider vetoes a
 * pan along its track).
 *
 * The bounds are read once, when the finger lands; nothing reads layout
 * during the press. Activation stays the browser's click, which the arena
 * swallows for a touch a recognizer took.
 */

import {UIKIT_GESTURES} from '../motion/uikit/gestures';
import {travel} from './geometry';
import type {GestureRecognizer} from './GestureRecognizer';
import {TapGestureRecognizer} from './TapGestureRecognizer';
import type {GestureTouch, TouchConsumer} from './types';

export type ControlEvent =
  | 'touchDown'
  | 'touchDragInside'
  | 'touchDragOutside'
  | 'touchDragEnter'
  | 'touchDragExit'
  | 'touchUpInside'
  | 'touchUpOutside'
  | 'touchCancel';

export interface PressBounds {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

export interface PressTrackerOptions {
  /** The control's bounds in client px, read when a finger lands. */
  getBounds: () => PressBounds | null;
  /** The view the tracker belongs to; recognizers on it are not ancestors. */
  view?: unknown;
  onControlEvent?: (event: ControlEvent, touch: GestureTouch) => void;
  onHighlightChange?: (isHighlighted: boolean) => void;
  trackingExpansion?: number;
  /** Wait `contentTouchDelay` before highlighting inside a scroller. @default true */
  delaysHighlightInScrollers?: boolean;
  /** Which ancestor recognizers the control's own action beats. */
  vetoesAncestorRecognizer?: (recognizer: GestureRecognizer) => boolean;
  /** @default () => true */
  isEnabled?: () => boolean;
  /**
   * Whether this touch is braking a scroll the finger set moving (see
   * GestureHost.isScrollBraking): a native list highlights nothing for one,
   * and the control does not track it at all.
   */
  isBraking?: (touch: GestureTouch) => boolean;
}

const PRESS = UIKIT_GESTURES.press;

/** UIButton's rule: an ancestor's single-finger single tap. */
function vetoesSingleTap(recognizer: GestureRecognizer): boolean {
  return (
    recognizer instanceof TapGestureRecognizer &&
    recognizer.numberOfTapsRequired === 1 &&
    recognizer.numberOfTouchesRequired === 1
  );
}

export class PressTracker implements TouchConsumer {
  isHighlighted = false;
  isTracking = false;
  isTouchInside = false;
  trackingExpansion: number;

  private readonly options: PressTrackerOptions;
  private touchId: number | null = null;
  private bounds: PressBounds | null = null;
  private highlightTimer: ReturnType<typeof setTimeout> | null = null;
  private flashTimer: ReturnType<typeof setTimeout> | null = null;
  /** A pending highlight whose finger travelled: it will never paint. */
  private isPendingDead = false;

  constructor(options: PressTrackerOptions) {
    this.options = options;
    this.trackingExpansion =
      options.trackingExpansion ??
      UIKIT_GESTURES.control.trackingExpansion.value;
  }

  touchBegan(touch: GestureTouch): void {
    if (
      this.touchId != null ||
      this.options.isEnabled?.() === false ||
      this.options.isBraking?.(touch) === true
    ) {
      return;
    }
    this.clearFlash();
    this.touchId = touch.id;
    this.bounds = this.options.getBounds();
    this.isTracking = true;
    this.isTouchInside = true;
    this.isPendingDead = false;
    this.emit('touchDown', touch);
    const delays =
      (this.options.delaysHighlightInScrollers ?? true) &&
      touch.pointerType === 'touch' &&
      touch.scroll?.isInsideScroller === true;
    if (delays) {
      this.highlightTimer = setTimeout(() => {
        this.highlightTimer = null;
        if (this.isTouchInside) {
          this.setHighlighted(true);
        }
      }, PRESS.contentTouchDelay.value);
    } else {
      this.setHighlighted(true);
    }
  }

  touchMoved(touch: GestureTouch): void {
    if (touch.id !== this.touchId) {
      return;
    }
    if (this.highlightTimer != null && travel(touch) > PRESS.slop.value) {
      // A finger travelling before the delay ran out is scrolling: the
      // press it began never paints, as a flick on a list paints nothing.
      clearTimeout(this.highlightTimer);
      this.highlightTimer = null;
      this.isPendingDead = true;
    }
    const inside = this.contains(touch);
    if (inside !== this.isTouchInside) {
      this.isTouchInside = inside;
      this.emit(inside ? 'touchDragEnter' : 'touchDragExit', touch);
      if (this.highlightTimer == null && !this.isPendingDead) {
        this.setHighlighted(inside);
      }
    }
    this.emit(inside ? 'touchDragInside' : 'touchDragOutside', touch);
  }

  touchEnded(touch: GestureTouch): void {
    if (touch.id !== this.touchId) {
      return;
    }
    const inside = this.contains(touch);
    const wasPending = this.highlightTimer != null;
    this.clearHighlightTimer();
    this.emit(inside ? 'touchUpInside' : 'touchUpOutside', touch);
    if (wasPending && inside) {
      // Quicker than the scroller's delay: the highlight shows at the lift.
      this.setHighlighted(true);
      this.flashTimer = setTimeout(() => {
        this.flashTimer = null;
        this.setHighlighted(false);
      }, PRESS.quickTapFlash.value);
    } else {
      this.setHighlighted(false);
    }
    this.finish();
  }

  touchCancelled(touch: GestureTouch): void {
    if (touch.id !== this.touchId) {
      return;
    }
    this.clearHighlightTimer();
    this.emit('touchCancel', touch);
    this.setHighlighted(false);
    this.finish();
  }

  allowsAncestorRecognizer(recognizer: unknown): boolean {
    const candidate = recognizer as GestureRecognizer;
    if (candidate.view != null && candidate.view === this.options.view) {
      return true;
    }
    const vetoes = this.options.vetoesAncestorRecognizer ?? vetoesSingleTap;
    return !vetoes(candidate);
  }

  /** Drop any highlight and timers (the control unmounted or was disabled). */
  dispose(): void {
    this.clearHighlightTimer();
    this.clearFlash();
    this.setHighlighted(false);
    this.finish();
  }

  private contains(touch: GestureTouch): boolean {
    const bounds = this.bounds;
    if (bounds == null) {
      return true;
    }
    const margin = this.trackingExpansion;
    return (
      touch.x >= bounds.left - margin &&
      touch.x <= bounds.right + margin &&
      touch.y >= bounds.top - margin &&
      touch.y <= bounds.bottom + margin
    );
  }

  private emit(event: ControlEvent, touch: GestureTouch): void {
    this.options.onControlEvent?.(event, touch);
  }

  private setHighlighted(value: boolean): void {
    if (this.isHighlighted === value) {
      return;
    }
    this.isHighlighted = value;
    this.options.onHighlightChange?.(value);
  }

  private clearHighlightTimer(): void {
    if (this.highlightTimer != null) {
      clearTimeout(this.highlightTimer);
      this.highlightTimer = null;
    }
  }

  private clearFlash(): void {
    if (this.flashTimer != null) {
      clearTimeout(this.flashTimer);
      this.flashTimer = null;
    }
  }

  private finish(): void {
    this.touchId = null;
    this.isTracking = false;
    this.isTouchInside = false;
    this.bounds = null;
  }
}
