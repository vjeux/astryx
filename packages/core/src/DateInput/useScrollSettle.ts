// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useScrollSettle.ts
 * @input A scroll container ref, a settle callback, and optionally whether a
 *   mouse drag holds it (usePointerDragScroll's `isDraggingRef`) and where
 *   the caller's own scroll goes
 * @output Calls back once, after scrolling (including momentum) stops
 * @position Internal behavior hook; consumed by Wheel.tsx and MonthScroller.tsx
 *
 * A snap scroller commits its value when it comes to rest, so it needs a
 * "scrolling stopped" signal. `scrollend` is that signal, but it is recent
 * enough that mobile Safari below 26 does not have it — and it is exactly the
 * browser this component targets. So: listen for `scrollend` where it exists,
 * and fall back to a quiet-period timer everywhere else. The same
 * belt-and-braces pattern is in core's `useScrollSpy`.
 *
 * ## The two things the timer must not mistake for rest
 *
 * A quiet period is a guess, and on iOS it guesses wrong twice unless it is
 * told otherwise. Both mistakes were behind the same bug: opening the
 * month/year wheels, flicking to an earlier month, and watching the month
 * climb on its own afterwards — on real iOS and the simulator, never in
 * Chrome.
 *
 * 1. **A finger resting mid-drag is not rest.** Hold a wheel still for a
 *    moment without lifting and the scroll events stop, so the timer fires
 *    and the value commits to whatever is under the band. Chrome hides this
 *    because it has `scrollend`, which does not fire until the touch is
 *    released. A mouse drag (usePointerDragScroll) is held the same way, and
 *    there Chrome gives no cover at all: each `scrollTop` the drag assigns
 *    ends in its own `scrollend`, so the settle waits for the drag's
 *    `pointerup` as it waits for `touchend`.
 *
 * 2. **Momentum is not rest either.** iOS momentum runs on the UI thread and
 *    keeps going for a second or more after the finger is gone, and its scroll
 *    events arrive irregularly — the gaps in the slow tail routinely exceed
 *    any sane quiet period. Chrome's compositor-driven momentum fires evenly,
 *    so the same timer never trips there.
 *
 * A premature settle is not just a wrong value; it feeds back. The commit
 * moves the value, the value moves the scroller back onto the committed row,
 * that programmatic scroll does not stop the momentum still running
 * underneath, and the fresh scroll events start the next premature settle —
 * each one landing a row further along, which is why the month climbed.
 *
 * So: the settle waits for the touch or the mouse drag to end, and then for a quiet period
 * measured from the LAST scroll event, which is what makes it outlast
 * momentum however long it runs. {@link useScrollSettle} also reports whether
 * the scroller is at rest, so a caller can refuse to reposition one that is
 * still moving.
 *
 * ## A scroll the caller starts rests only where it goes
 *
 * A wheel's key step is its own smooth `scrollTo`. A busy page or a slow
 * device can draw no frame of it for longer than the quiet period. A settle
 * then reads the row the step is leaving and commits it, and the wheel turns
 * back there. So while the caller's own scroll is under way, a quiet period
 * is not rest: only `scrollend`, or a frame at its target, is. A touch, a
 * wheel or trackpad, or a pointer press ends that wait. A scroll a person
 * makes rests after the quiet period, as before.
 *
 * A step can also stop short of its target, as when a layout change moves
 * the snap points. A target past the scroll range counts as reached at the
 * range's end. For any other stop, the hook counts drawn frames once a quiet
 * period passes short of the target. After {@link STEER_WAIT_FRAMES} of them
 * the scroll rests where it is. A starved page draws no frame, so it cannot
 * rest early. That bounds the wait where `scrollend` is missing.
 *
 * SYNC: When modified, update DateInputTouch.test.tsx.
 */

import {useEffect, useRef} from 'react';

/**
 * How long the scroller must be quiet before a settle is assumed. Long enough
 * to outlast the browser's own snap animation (~150-300ms after the finger
 * lifts), or a wheel would commit to whichever option it was passing rather
 * than the one it settles on.
 */
export const SCROLL_QUIET_MS = 220;

/**
 * How many drawn frames the caller's own scroll may stay short of its target
 * after a quiet period. Then it rests where it is. That is about one second
 * at 60 Hz.
 */
export const STEER_WAIT_FRAMES = 60;

/** What {@link useScrollSettle} reports back about the scroller's state. */
export type ScrollSettleState = {
  /**
   * False from the first touch until the scroller has genuinely stopped —
   * momentum included. Read it before repositioning the scroller: doing that
   * mid-flight fights the platform and, on iOS, restarts the cycle described
   * in the file header.
   */
  isAtRestRef: React.RefObject<boolean>;
};

/**
 * Run `onSettle` when `ref`'s element stops scrolling.
 *
 * @param ref - the scroll container
 * @param onSettle - called with the settled element; may change every render
 * @param isEnabled - skip attaching while false (e.g. a hidden panel)
 * @param isHeldRef - true while a mouse drag holds the scroller
 *   (usePointerDragScroll's `isDraggingRef`): not rest, however quiet
 * @param steerRef - where the caller's own scroll (its `scrollTo`) goes, as
 *   `{top}`: a new object for each scroll it starts, or null. Until a frame
 *   reaches `top`, `scrollend` fires or a person takes the scroller, a quiet
 *   period is not rest. A target past the scroll range counts as reached at its
 *   end, and a scroll that stops short rests after {@link STEER_WAIT_FRAMES}
 *   drawn frames.
 */
export function useScrollSettle(
  ref: React.RefObject<HTMLElement | null>,
  onSettle: (element: HTMLElement) => void,
  isEnabled: boolean = true,
  isHeldRef?: React.RefObject<boolean>,
  steerRef?: React.RefObject<{top: number} | null>,
): ScrollSettleState {
  // The callback closes over render-fresh values (the option list, the current
  // value); keeping it in a ref means the listeners attach once instead of
  // re-attaching mid-scroll, which would drop an in-flight settle.
  const onSettleRef = useRef(onSettle);
  onSettleRef.current = onSettle;

  const isAtRestRef = useRef(true);

  // Syncs scroll, touch, wheel and pointer listeners with `isEnabled`. They
  // find when scrolling stops.
  useEffect(() => {
    const element = ref.current;
    if (element == null || !isEnabled) {
      isAtRestRef.current = true;
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let hasSettled = false;
    let isTouching = false;
    // Whether a mouse drag held this gesture, so its release re-arms the
    // settle; a plain click does not.
    let wasHeld = false;

    const settle = () => {
      // A finger still on the glass, or a mouse button still holding a drag,
      // is not rest, however quiet the scroller has gone. The release re-arms
      // this.
      if (isHeldRef?.current) {
        wasHeld = true;
      }
      if (hasSettled || isTouching || isHeldRef?.current) {
        return;
      }
      hasSettled = true;
      isAtRestRef.current = true;
      clearTimeout(timer);
      onSettleRef.current(element);
    };

    // The frame that counts while the caller's own scroll stays short of its
    // target, and the frames drawn so far for that scroll.
    let waitFrame: number | undefined;
    let waitedSteer: {top: number} | null = null;
    let framesWaited = 0;
    const stopWaiting = () => {
      if (waitFrame != null) {
        cancelAnimationFrame(waitFrame);
        waitFrame = undefined;
      }
    };

    // The caller's own scroll whose wait has ended: it reached its target,
    // it ended, or a person took the scroller. A scroll that started before
    // these listeners attached has no wait left.
    let released = steerRef?.current ?? null;
    const release = () => {
      released = steerRef?.current ?? null;
      stopWaiting();
    };

    // Whether the scroller is at the steer's target, clamped to the scroll
    // range where the scroller has one.
    const isAtTarget = (steer: {top: number}) => {
      const max = element.scrollHeight - element.clientHeight;
      const top = max > 0 ? Math.min(Math.max(steer.top, 0), max) : steer.top;
      return Math.abs(element.scrollTop - top) < 1;
    };

    // Counts the frames drawn while the caller's own scroll stays short of
    // its target, and rests it after STEER_WAIT_FRAMES of them. A scroll that
    // moves stops the count until its next quiet period. The count carries on
    // for the same scroll, so a step that keeps stopping short still ends. A
    // starved page draws no frame, so it cannot rest early.
    const waitForSteer = (steer: {top: number}) => {
      stopWaiting();
      if (steer !== waitedSteer) {
        waitedSteer = steer;
        framesWaited = 0;
      }
      const tick = () => {
        waitFrame = undefined;
        framesWaited += 1;
        if (framesWaited >= STEER_WAIT_FRAMES) {
          release();
          settle();
          return;
        }
        waitFrame = requestAnimationFrame(tick);
      };
      waitFrame = requestAnimationFrame(tick);
    };

    // A quiet period is rest unless the caller's own scroll has not reached
    // its target. Then the page may be starved of frames mid-step, or the
    // scroll may have stopped short: drawn frames tell which.
    const settleWhenQuiet = () => {
      const steer = steerRef?.current ?? null;
      if (steer != null && steer !== released && !isAtTarget(steer)) {
        waitForSteer(steer);
        return;
      }
      release();
      settle();
    };

    const onScrollEnd = () => {
      release();
      settle();
    };

    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(settleWhenQuiet, SCROLL_QUIET_MS);
    };

    const onScroll = () => {
      // A fresh scroll re-opens the window: whatever we settle on now is
      // stale, and the settle that matters is the one after this gesture.
      // Momentum keeps arriving here, so the quiet period is measured from
      // the last of it however long it runs. A scroll that moves has not
      // stopped short either.
      stopWaiting();
      hasSettled = false;
      isAtRestRef.current = false;
      if (isHeldRef?.current) {
        wasHeld = true;
      }
      arm();
    };

    const onTouchStart = () => {
      release();
      isTouching = true;
      hasSettled = false;
      isAtRestRef.current = false;
      clearTimeout(timer);
    };

    const onTouchEnd = () => {
      isTouching = false;
      // Momentum may carry on from here and will re-arm this on its own; the
      // timer covers the case where the finger lifted without a fling, which
      // produces no further scroll events at all.
      arm();
    };

    const onPointerEnd = () => {
      // The drag's release: its glide to the nearest row re-arms this on its
      // own, and the timer covers a release already on a row, which scrolls
      // no further.
      if (wasHeld) {
        wasHeld = false;
        arm();
      }
    };

    element.addEventListener('scroll', onScroll, {passive: true});
    element.addEventListener('scrollend', onScrollEnd);
    element.addEventListener('touchstart', onTouchStart, {passive: true});
    element.addEventListener('touchend', onTouchEnd, {passive: true});
    element.addEventListener('touchcancel', onTouchEnd, {passive: true});
    element.addEventListener('wheel', release, {passive: true});
    element.addEventListener('pointerdown', release);
    element.addEventListener('pointerup', onPointerEnd);
    element.addEventListener('pointercancel', onPointerEnd);

    return () => {
      clearTimeout(timer);
      stopWaiting();
      element.removeEventListener('scroll', onScroll);
      element.removeEventListener('scrollend', onScrollEnd);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchend', onTouchEnd);
      element.removeEventListener('touchcancel', onTouchEnd);
      element.removeEventListener('wheel', release);
      element.removeEventListener('pointerdown', release);
      element.removeEventListener('pointerup', onPointerEnd);
      element.removeEventListener('pointercancel', onPointerEnd);
    };
  }, [ref, isEnabled, isHeldRef, steerRef]);

  return {isAtRestRef};
}
