// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file SearchFieldTouch.ts
 * @input Core's internal touch entry, the search table and searchFieldModel.ts
 * @output useSearchFieldMotion, SearchField's touch layer: the parts' places
 *   and UIKit's activation and cancel under a finger
 * @position Only SearchField.tsx imports it, so a desktop build can swap it
 *   and the size report can measure it.
 *
 * SYNC: When modified, update SearchField.tsx and searchFieldModel.ts.
 */

import {useCallback, useLayoutEffect, useRef, type RefObject} from 'react';
import {
  isRtlElement,
  useTouchPresentation,
  type AnimateOptions,
  type MotionCurve,
  type MotionEngine,
  type MotionHandle,
} from '@astryxdesign/core/internal/touch';
import {observeResize} from '@astryxdesign/core/utils';
import {
  activationTiming,
  easedCurve,
  heldCurve,
  poseFor,
  type SearchFieldGeometry,
  type SearchFieldPose,
} from './searchFieldModel';
import {useMotionEngine} from '../internal/useMotionEngine';
import {search} from '../internal/searchMotion';

/** The refs SearchField puts on the parts the touch layer moves. */
export interface SearchFieldMotion {
  rootRef: (element: HTMLElement | null) => void;
  /** The field box: the touch layer scales its ::after, the middle. */
  middleRef: (element: HTMLElement | null) => void;
  endRef: (element: HTMLElement | null) => void;
  closeRef: (element: HTMLElement | null) => void;
}

/**
 * SearchField's touch layer: the parts' poses, and UIKit's activation under
 * a finger (a coarse primary pointer, on every touch device). Reduced motion
 * is the motion engine's: under a finger it turns the travel into a
 * cross-fade.
 */
export function useSearchFieldMotion({
  fieldRef,
  isActive,
  lift,
}: {
  fieldRef: RefObject<HTMLDivElement | null>;
  isActive: boolean;
  lift: number;
}): SearchFieldMotion {
  const rootAnimator = useMotionEngine();
  // The middle is a pseudo-element, being decoration: the field's ::after.
  const middleAnimator = useMotionEngine({pseudoElement: '::after'});
  const endAnimator = useMotionEngine();
  const closeAnimator = useMotionEngine();
  const {isTouch} = useTouchPresentation();

  const fieldHeight = search.stacked.fieldHeight;
  const geometry = useCallback((): SearchFieldGeometry => {
    const field = fieldRef.current;
    return {
      restWidth: field?.getBoundingClientRect().width ?? 0,
      height: fieldHeight,
      lift,
      isRtl: isRtlElement(field),
    };
  }, [fieldRef, fieldHeight, lift]);

  const presented = useCallback(
    (): SearchFieldPose => ({
      y: rootAnimator.animator.get('y'),
      middleScale: middleAnimator.animator.get('scaleX'),
      endX: endAnimator.animator.get('x'),
      closeX: closeAnimator.animator.get('x'),
      closeOpacity: closeAnimator.animator.get('opacity'),
    }),
    [rootAnimator, middleAnimator, endAnimator, closeAnimator],
  );

  const place = useCallback(
    (pose: SearchFieldPose) => {
      rootAnimator.animator.set({y: pose.y});
      middleAnimator.animator.set({scaleX: pose.middleScale});
      endAnimator.animator.set({x: pose.endX});
      closeAnimator.animator.set({x: pose.closeX, opacity: pose.closeOpacity});
    },
    [rootAnimator, middleAnimator, endAnimator, closeAnimator],
  );

  // `settledRef` is null until the first layout places the parts.
  const settledRef = useRef<boolean | null>(null);
  const isAnimating = useRef(false);
  const latestMove = useRef(0);
  // Syncs the parts' compositor animations (the animator) with `isActive`.
  useLayoutEffect(() => {
    const target = isActive;
    if (settledRef.current === null || !isTouch) {
      // First layout, or a mouse or trackpad: take the places at once.
      settledRef.current = target;
      place(poseFor(target, geometry()));
      // The parts now hold their places: the CSS form of the active pose
      // (for a server render) steps aside in the same task.
      rootAnimator.animator.element?.setAttribute(
        'data-search-field-placed',
        '',
      );
      return;
    }
    if (settledRef.current === target && !isAnimating.current) {
      place(poseFor(target, geometry()));
      return;
    }
    settledRef.current = target;
    const continuesMotion = isAnimating.current;
    isAnimating.current = true;
    const move = ++latestMove.current;
    const shape = geometry();
    const to = poseFor(target, shape);
    const current = presented();
    // UIKit's clock and curve, the search table's.
    const timing = activationTiming();
    const duration = timing.seconds;
    // From rest the move waits for the frame that presents the parts at rest
    // (`start: 'presented'`). Mobile Safari shows no frame for ~150 ms after
    // the focus, while the keyboard comes up. A motion made before that stall
    // would jump a third of the way when frames resume. A host that moves
    // with the field, like a navigation bar, starts the same way in the same
    // task, so both start together. A change of mind mid-move adds the turn
    // to the curve on screen (`additive`), as UIKit's animations do. The old
    // curve carries the rest of its travel, and the added one runs the whole
    // clock. So the turn keeps its velocity however late WebKit applies it.
    // Under reduced motion the animator plays its cross-fade for these.
    const options = continuesMotion
      ? {additive: true}
      : {start: 'presented' as const};
    const handles = [
      play(
        rootAnimator.animator,
        {y: easedCurve(current.y, to.y, duration, timing.ease)},
        options,
      ),
      play(
        middleAnimator.animator,
        {
          scaleX: easedCurve(
            current.middleScale,
            to.middleScale,
            duration,
            timing.ease,
          ),
        },
        options,
      ),
      play(
        endAnimator.animator,
        {x: easedCurve(current.endX, to.endX, duration, timing.ease)},
        options,
      ),
      play(
        closeAnimator.animator,
        {
          x: easedCurve(current.closeX, to.closeX, duration, timing.ease),
          // Cancel slides the close button out at the opacity it has and
          // removes it at the end, as UIKit does.
          opacity: target
            ? easedCurve(
                current.closeOpacity,
                to.closeOpacity,
                duration,
                timing.ease,
              )
            : easedCurve(
                heldCurve(current.closeOpacity, to.closeOpacity, duration).at(0),
                to.closeOpacity,
                duration,
                timing.ease,
              ),
        },
        options,
      ),
    ];
    const playing = handles.filter(
      (handle): handle is MotionHandle => handle != null,
    );
    // When the latest move ends, finished or stopped, the next move starts
    // from rest.
    void Promise.all(playing.map(handle => handle.finished)).then(() => {
      if (latestMove.current === move) {
        isAnimating.current = false;
      }
    });
    // `geometry` changes with `lift`; a lift change while settled re-places
    // the field through the same path.
  }, [
    isActive,
    isTouch,
    geometry,
    place,
    presented,
    rootAnimator,
    middleAnimator,
    endAnimator,
    closeAnimator,
  ]);

  // A resize while settled (the window turning, a host relaying out) moves
  // the narrowed end to the new width at once.
  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (field == null) {
      return;
    }
    return observeResize(field, () => {
      if (isAnimating.current || settledRef.current === null) {
        return;
      }
      place(poseFor(settledRef.current, geometry()));
    });
  }, [fieldRef, geometry, place]);

  return {
    rootRef: rootAnimator.ref,
    middleRef: middleAnimator.ref,
    endRef: endAnimator.ref,
    closeRef: closeAnimator.ref,
  };
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Plays the given curves. A curve that does not move is put in place instead
 * (`set`). That also ends whatever the property was still playing. For
 * example, a re-activation keeps a cancel's held opacity at 1, which would
 * otherwise drop to 0 when the cancel's clock ends. In Chromium, an animation
 * with no visible change would also run on the main thread.
 */
function play(
  animator: MotionEngine,
  curves: Partial<
    Record<'x' | 'y' | 'scale' | 'scaleX' | 'scaleY' | 'opacity', MotionCurve>
  >,
  options: AnimateOptions,
): MotionHandle | null {
  const moving: typeof curves = {};
  for (const [key, curve] of Object.entries(curves) as [
    keyof typeof curves,
    MotionCurve,
  ][]) {
    const first = curve.at(0);
    // A curve can leave its value and come back (the bottom field's swell),
    // so look along it, not only at its ends.
    const moves = Array.from({length: 33}, (_, i) =>
      curve.at((curve.duration * i) / 32),
    ).some(value => Math.abs(value - first) > 1e-6);
    if (moves) {
      moving[key] = curve;
    } else {
      animator.set({[key]: first});
    }
  }
  if (Object.keys(moving).length === 0) {
    return null;
  }
  return animator.play(moving, options);
}
