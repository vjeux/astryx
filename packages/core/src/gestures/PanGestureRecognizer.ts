// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PanGestureRecognizer.ts
 * @input Touches from a GestureArena, each with a probe of the native
 *   scrollers under it
 * @output Exports PanGestureRecognizer (UIPanGestureRecognizer), its options
 *   and direction type
 * @position Continuous recognizer of packages/core/src/gestures; the base of
 *   ScreenEdgePanGestureRecognizer
 *
 * Begins once the touches' centroid has travelled `hysteresis` px with
 * between `minimumNumberOfTouches` and `maximumNumberOfTouches` fingers down,
 * in the allowed `direction`. `translation()` is measured from where the
 * fingers landed, as UIKit's is; `beganTranslation` is its value at the
 * moment the pan began, for a surface that should not jump by the threshold.
 * Adding or lifting a finger never jumps the translation: the centroid is
 * re-based so the gesture continues where it was. Once moving, fingers past
 * the maximum are ignored, so a second finger never breaks a one-finger pan.
 *
 * NATIVE SCROLL COORDINATION, for a pan over content the browser scrolls
 * (a sheet over its own list):
 *
 * - `scrollEdge`: the pan begins only if no scroller under the touch could
 *   scroll for that movement — the finger landed at the edge and pulls away
 *   from it. The browser has not committed yet, so beginning claims the
 *   touch and the browser never scrolls.
 * - `scrollHandoff` (with a one-way direction): when the browser took the
 *   touch to scroll, keep watching it. Once the content runs out in the
 *   pan's direction, the travel beyond that point becomes the pan, after
 *   `contentEndHandoffSlop`; if the finger comes back, the translation
 *   clamps at zero while the content scrolls again, and a later pull past the
 *   end resumes the pan. The browser's events are no longer cancelable then,
 *   and nothing needs cancelling: the scroller is clamped at its end.
 */

import {UIKIT_GESTURES} from '../motion/uikit/gestures';
import {centroid} from './geometry';
import {
  GestureRecognizer,
  isActive,
  MANIPULATION,
  type GestureRecognizerOptions,
  type NativeTouchBehavior,
} from './GestureRecognizer';
import type {GestureEventContext, GestureTouch, Point} from './types';
import {VelocityTracker, type VelocityStrategy} from './VelocityTracker';

export type PanDirection =
  'any' | 'horizontal' | 'vertical' | 'left' | 'right' | 'up' | 'down';

export interface PanGestureRecognizerOptions extends GestureRecognizerOptions<PanGestureRecognizer> {
  /** @default 1 */
  minimumNumberOfTouches?: number;
  /** @default Infinity */
  maximumNumberOfTouches?: number;
  hysteresis?: number;
  /** Movement that may begin the pan; anything else fails it. @default 'any' */
  direction?: PanDirection;
  /**
   * With `direction: 'any'`, report movement along the axis that dominated
   * at the start only (UIScrollView's directional lock).
   */
  lockAxis?: boolean;
  /** Begin only when the native scrollers under the touch are at the edge. */
  scrollEdge?: boolean;
  /** Take over a native scroll at its edge (one-way directions only). */
  scrollHandoff?: boolean;
  /** @default 'lsq2' */
  velocityStrategy?: VelocityStrategy;
}

const ZERO: Point = {x: 0, y: 0};

const DIRECTION_VECTORS: Partial<Record<PanDirection, Point>> = {
  left: {x: -1, y: 0},
  right: {x: 1, y: 0},
  up: {x: 0, y: -1},
  down: {x: 0, y: 1},
};

export class PanGestureRecognizer extends GestureRecognizer {
  minimumNumberOfTouches: number;
  maximumNumberOfTouches: number;
  hysteresis: number;
  direction: PanDirection;
  lockAxis: boolean;
  scrollEdge: boolean;
  scrollHandoff: boolean;
  /** The axis a `lockAxis` pan locked to when it began. */
  lockedAxis: 'x' | 'y' | null = null;
  /** The translation at the moment the pan began. */
  beganTranslation: Point = ZERO;
  /** Whether this pan is driving the rest of a gesture the browser was scrolling. */
  isHandoff = false;

  private readonly tracker: VelocityTracker;
  /** The centroid where the gesture started, in client px. */
  private origin: Point = ZERO;
  /** Re-basing that keeps the translation continuous across finger changes. */
  private adjust: Point = ZERO;
  /** Translation since touch-down, before `setTranslation` offsets. */
  private raw: Point = ZERO;
  private offset: Point = ZERO;
  private virtual: Point = ZERO;
  private velocityTime = 0;
  private isObserving = false;
  private anchor: Point | null = null;
  private predictedAnchor: Point | null = null;

  constructor(options: PanGestureRecognizerOptions = {}) {
    super(options);
    this.minimumNumberOfTouches = options.minimumNumberOfTouches ?? 1;
    this.maximumNumberOfTouches =
      options.maximumNumberOfTouches ?? Number.POSITIVE_INFINITY;
    this.hysteresis = options.hysteresis ?? UIKIT_GESTURES.pan.hysteresis.value;
    this.direction = options.direction ?? 'any';
    this.lockAxis = options.lockAxis ?? false;
    this.scrollEdge = options.scrollEdge ?? false;
    this.scrollHandoff = options.scrollHandoff ?? false;
    this.tracker = new VelocityTracker({
      strategy: options.velocityStrategy ?? 'lsq2',
    });
  }

  /** Movement since the fingers landed (or since `setTranslation`), client px. */
  translation(): Point {
    const base = this.isHandoff ? this.handoffTravel() : this.raw;
    const value = {x: base.x + this.offset.x, y: base.y + this.offset.y};
    return this.locked(value);
  }

  /** UIKit's `setTranslation(_:in:)`: make the current translation read `value`. */
  setTranslation(value: Point): void {
    const base = this.isHandoff ? this.handoffTravel() : this.raw;
    this.offset = {x: value.x - base.x, y: value.y - base.y};
  }

  /** Release velocity in px/s, zero if the fingers rested before the last event. */
  velocity(): Point {
    return this.locked(this.tracker.velocity(this.velocityTime));
  }

  /**
   * The browser keeps the axis this pan does not use; a pan that coordinates
   * with native scrolling keeps its own axis too, since the browser scrolls
   * the content until the edge. Pinch-zoom stays the browser's.
   */
  override get nativeTouchBehavior(): NativeTouchBehavior {
    if (this.scrollEdge || this.scrollHandoff) {
      return MANIPULATION;
    }
    const horizontal =
      this.direction === 'horizontal' ||
      this.direction === 'left' ||
      this.direction === 'right';
    const vertical =
      this.direction === 'vertical' ||
      this.direction === 'up' ||
      this.direction === 'down';
    return {
      panX: vertical,
      panY: horizontal,
      pinchZoom: true,
      doubleTapZoom: false,
    };
  }

  protected override acceptsTouch(touch: GestureTouch): boolean {
    if (this.isObserving) {
      return false;
    }
    if (
      isActive(this.state) &&
      this.numberOfTouches >= this.maximumNumberOfTouches
    ) {
      return false;
    }
    return super.acceptsTouch(touch);
  }

  protected override touchesBegan(
    touches: ReadonlyArray<GestureTouch>,
    event: GestureEventContext,
  ): void {
    if (this.numberOfTouches === touches.length) {
      this.origin = centroid(this.touches.values());
      this.adjust = ZERO;
      this.raw = ZERO;
      this.offset = ZERO;
      this.virtual = this.origin;
      this.tracker.reset();
      this.tracker.add(this.origin.x, this.origin.y, event.time);
      this.velocityTime = event.time;
    } else {
      this.rebase(new Set(touches.map(touch => touch.id)), 'added');
    }
    if (
      this.state === 'possible' &&
      this.numberOfTouches > this.maximumNumberOfTouches
    ) {
      this.setState('failed');
    }
  }

  protected override touchesMoved(
    touches: ReadonlyArray<GestureTouch>,
    event: GestureEventContext,
  ): void {
    this.track(touches, event.time, false);
    if (this.isObserving) {
      this.observeNativeScroll();
      return;
    }
    if (this.state === 'possible') {
      this.tryBegin();
    } else if (isActive(this.state)) {
      this.setState('changed');
    }
  }

  protected override touchesEnded(
    touches: ReadonlyArray<GestureTouch>,
    event: GestureEventContext,
  ): void {
    this.track(touches, event.time, true);
    const remaining = this.numberOfTouches - touches.length;
    if (isActive(this.state)) {
      if (remaining < this.minimumNumberOfTouches) {
        this.setState('ended');
        return;
      }
      this.rebase(new Set(touches.map(touch => touch.id)), 'removed');
      return;
    }
    if (remaining === 0 || remaining < this.minimumNumberOfTouches) {
      this.setState('failed');
      return;
    }
    this.rebase(new Set(touches.map(touch => touch.id)), 'removed');
  }

  protected override touchesTakenByBrowser(
    touches: ReadonlyArray<GestureTouch>,
    event: GestureEventContext,
  ): boolean {
    if (
      this.scrollHandoff &&
      DIRECTION_VECTORS[this.direction] != null &&
      this.state === 'possible' &&
      this.pending == null
    ) {
      this.isObserving = true;
      this.anchor = null;
      return true;
    }
    return super.touchesTakenByBrowser(touches, event);
  }

  protected override reset(): void {
    this.lockedAxis = null;
    this.beganTranslation = ZERO;
    this.isHandoff = false;
    this.isObserving = false;
    this.anchor = null;
    this.predictedAnchor = null;
    this.origin = ZERO;
    this.adjust = ZERO;
    this.raw = ZERO;
    this.offset = ZERO;
    this.virtual = ZERO;
    this.tracker.reset();
  }

  /** Whether the touch landed where this pan may start. ScreenEdgePan narrows it. */
  protected matchesDirection(translation: Point): boolean {
    const ax = Math.abs(translation.x);
    const ay = Math.abs(translation.y);
    switch (this.direction) {
      case 'any':
        return true;
      case 'horizontal':
        return ax > ay;
      case 'vertical':
        return ay > ax;
      case 'left':
        return ax > ay && translation.x < 0;
      case 'right':
        return ax > ay && translation.x > 0;
      case 'up':
        return ay > ax && translation.y < 0;
      case 'down':
        return ay > ax && translation.y > 0;
    }
  }

  private tryBegin(): void {
    const count = this.numberOfTouches;
    if (count < this.minimumNumberOfTouches) {
      return;
    }
    if (count > this.maximumNumberOfTouches) {
      this.setState('failed');
      return;
    }
    const moved = this.raw;
    if (Math.hypot(moved.x, moved.y) < this.hysteresis) {
      return;
    }
    if (!this.matchesDirection(moved)) {
      this.setState('failed');
      return;
    }
    if (this.scrollEdge && this.nativeCanScroll(moved.x, moved.y)) {
      // The content under the finger still scrolls this way: it is a
      // scroll. A handoff pan waits for the browser to take it and watches;
      // any other pan leaves it alone.
      if (!this.scrollHandoff) {
        this.setState('failed');
      }
      return;
    }
    if (this.lockAxis && this.direction === 'any') {
      this.lockedAxis = Math.abs(moved.x) >= Math.abs(moved.y) ? 'x' : 'y';
    }
    this.beganTranslation = this.translation();
    this.setState('began');
  }

  /** After the browser took the touch: take over once the content runs out. */
  private observeNativeScroll(): void {
    const direction = DIRECTION_VECTORS[this.direction];
    if (direction == null) {
      return;
    }
    // While the pan drives the surface past the edge, the scroller is
    // clamped at its end: nothing can scroll, so skip the scroll read.
    const isPastEdge =
      this.isHandoff && dot(this.handoffTravel(), direction) > 0;
    if (!isPastEdge && this.nativeCanScroll(direction.x, direction.y)) {
      // The content still scrolls this way: it has the finger, and the
      // surface sits at zero until the content runs out again. Native touch
      // scrolling tracks the finger one to one, so the content will run out
      // after exactly the distance it has left.
      const left = this.nativeDistanceToEdge(direction.x, direction.y);
      this.anchor = null;
      this.predictedAnchor =
        left == null
          ? null
          : {
              x: this.virtual.x + direction.x * left,
              y: this.virtual.y + direction.y * left,
            };
      if (this.isHandoff) {
        this.setState('changed');
      }
      return;
    }
    // Where the content ran out: predicted from the distance it had left
    // when it last could scroll, else the first position seen at the edge.
    if (this.anchor == null) {
      const predicted = this.predictedAnchor;
      this.anchor =
        predicted != null &&
        dot(
          {x: predicted.x - this.virtual.x, y: predicted.y - this.virtual.y},
          direction,
        ) <= 0
          ? predicted
          : this.virtual;
      this.predictedAnchor = null;
    }
    if (this.isHandoff) {
      this.setState('changed');
      return;
    }
    if (
      dot(this.handoffTravel(), direction) >=
      UIKIT_GESTURES.scroll.contentEndHandoffSlop.value
    ) {
      this.isHandoff = true;
      this.beganTranslation = this.translation();
      this.setState('began');
    }
  }

  /** Travel past the content's end, along the pan's direction, never negative. */
  private handoffTravel(): Point {
    const direction = DIRECTION_VECTORS[this.direction];
    if (direction == null || this.anchor == null) {
      return ZERO;
    }
    const along = Math.max(
      0,
      dot(
        {x: this.virtual.x - this.anchor.x, y: this.virtual.y - this.anchor.y},
        direction,
      ),
    );
    return {x: direction.x * along, y: direction.y * along};
  }

  private nativeDistanceToEdge(dx: number, dy: number): number | null {
    for (const touch of this.touches.values()) {
      const left = touch.scroll?.distanceToEdge?.(dx, dy);
      if (left != null) {
        return left;
      }
    }
    return null;
  }

  private nativeCanScroll(dx: number, dy: number): boolean {
    for (const touch of this.touches.values()) {
      if (touch.scroll?.canScroll(dx, dy) === true) {
        return true;
      }
    }
    return false;
  }

  private track(
    touches: ReadonlyArray<GestureTouch>,
    time: number,
    isEnd: boolean,
  ): void {
    const current = centroid(this.touches.values());
    const virtual = {
      x: current.x + this.adjust.x,
      y: current.y + this.adjust.y,
    };
    const last = this.tracker.lastSample;
    const hasMoved =
      last == null || last.x !== virtual.x || last.y !== virtual.y;
    if (this.numberOfTouches === 1 && touches.length === 1 && !isEnd) {
      for (const sample of touches[0].samples) {
        this.tracker.add(
          sample.x + this.adjust.x,
          sample.y + this.adjust.y,
          sample.time,
        );
      }
    } else if (hasMoved) {
      // A lift reports the last known position: adding it again with a
      // later time would read as the finger slowing down (Android's
      // VelocityTracker skips the up event for the same reason).
      this.tracker.add(virtual.x, virtual.y, time);
    }
    this.virtual = virtual;
    this.raw = {x: virtual.x - this.origin.x, y: virtual.y - this.origin.y};
    this.velocityTime = time;
  }

  /** Keep the translation continuous when fingers join or leave. */
  private rebase(
    changedIds: ReadonlySet<number>,
    kind: 'added' | 'removed',
  ): void {
    const all = centroid(this.touches.values());
    const others = centroid(this.touches.values(), changedIds);
    const [before, after] = kind === 'added' ? [others, all] : [all, others];
    this.adjust = {
      x: this.adjust.x + before.x - after.x,
      y: this.adjust.y + before.y - after.y,
    };
  }

  private locked(value: Point): Point {
    if (this.lockedAxis === 'x') {
      return {x: value.x, y: 0};
    }
    if (this.lockedAxis === 'y') {
      return {x: 0, y: value.y};
    }
    return value;
  }
}

function dot(a: Point, b: Point): number {
  return a.x * b.x + a.y * b.y;
}
