// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file popoverSurfaceMotion.ts
 * @input A Popover's layer element, the source it hangs off, the motion
 *   foundation (compositor animator, spring math), the UIKit table and the
 *   layer runtime's exit copy and input hold
 * @output Exports `popoverCollapsedState` (where the popover meets its source
 *   and the shape it grows from), `popoverFrame` (the transform and opacity
 *   at a progress of the spring), `POPOVER_EXIT_COPY_ATTRIBUTE`,
 *   `createPopoverSurfaceMotion` (the touch
 *   presentation's present and dismiss)
 * @position Internal to Popover: under a finger the popover is presented
 *   and dismissed the way UIPopoverPresentationController does it
 *
 * On iOS 26.2 a popover grows out of the point where it meets its source: the
 * bottom centre of the source for a popover below it. Its scale (from
 * `popover.collapsedScale`), its length away from the source (from
 * `popover.collapsedLengthPx` to its own) and its opacity run on one spring,
 * `POPOVER_PRESENT_SPRING`, with the edge that meets the source held in
 * place. The dismissal runs the same path back into that point on
 * `POPOVER_DISMISS_SPRING`.
 *
 * That is the rect morph's `edgeGrowPath` (motion/rectMorph.ts): across the
 * source's edge the scale is s = s₀ + (1 − s₀)·p; along the axis away from
 * the source it is s·f with f = f₀ + (1 − f₀)·p, the length's share of the
 * full length, which is UIKit's box growing while it scales. The morph plays
 * it on the compositor (law M1), and a dismissal during the presentation (or
 * a presentation during the dismissal) continues from the frame on screen,
 * in the same scale and length, with its velocity (M2, M3).
 *
 * Measured for a popover below its source; one above or beside it runs the
 * same motion turned toward its source (M-PO1 confirms it). The point it
 * grows out of is the source's centre on that edge, kept on the popover.
 *
 * A presentation writes and reads nothing until the next animation frame,
 * which runs before that frame paints: as the popover opens, the element's
 * style and the boxes would lay the page out inside the task that opened it.
 * The layer's own CSS entrance, started meanwhile, is turned off in that
 * frame, before anything paints.
 *
 * The dismissal outlives the popover: the browser hides a popover as it
 * closes, so it plays on the layer runtime's exit copy (`placeLayerExitCopy`),
 * removed when its motion ends.
 *
 * Under Reduce Motion the animator's policy applies (design:reduced-motion):
 * on a coarse pointer the popover neither grows nor springs, it lands at its
 * full size and cross-fades in, and out where it stands, opacity only, in
 * `timing.reducedMotionCrossFadeMs`; on any other pointer it changes at once.
 * UIKit itself fades a popover on its presentation springs, about half a
 * second; the current record caps a touch cross-fade at 200 ms.
 *
 * UIKit ignores every touch while the popover is presented: a tap outside
 * 60 ms in neither dismisses it nor reaches what is under it, and the
 * presentation finishes. The browser's light dismiss cannot be cancelled from
 * an event, so the presentation runs under the layer runtime's own hold
 * (`holdInput`, scope `viewport`), the one the Layer module places for
 * every component whose layer presents under a finger: its shield covers the
 * viewport from inside the layer until the present spring settles, so a tap
 * on it is a tap inside the popover, which the browser leaves open, and a
 * pinch on it still zooms the page.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Popover/popoverSurfaceFrame.ts
 * - /packages/core/src/Popover/popoverSurfaceMotion.test.ts
 * - /packages/core/src/Popover/Popover.tsx
 */

import type {AnimatorOptions, MotionHandle} from '../motion/animator';
import {
  createRectMorph,
  edgeGrowPath,
  type MorphPath,
} from '../motion/rectMorph';
import {
  POPOVER_DISMISS_SPRING,
  POPOVER_PRESENT_SPRING,
} from '../motion/uikit/springs';
import {placeLayerExitCopy} from '../Layer/layerExitCopy';
import {holdInput} from '../Layer/inputHold';
import {
  popoverCollapsedState,
  type PopoverCollapsedState,
  type PopoverSurfaceGeometry,
  type PopoverSurfaceRect,
} from './popoverSurfaceFrame';

export {popoverCollapsedState, popoverFrame} from './popoverSurfaceFrame';
export type {
  PopoverCollapsedState,
  PopoverFrame,
  PopoverSurfaceGeometry,
  PopoverSurfaceRect,
} from './popoverSurfaceFrame';

/** Marks the static copy the dismissal plays on. */
export const POPOVER_EXIT_COPY_ATTRIBUTE = 'data-astryx-popover-exit';

/** The presentation's path: UIKit's edge growth on the surface's box. */
function pathOf(
  surface: PopoverSurfaceRect,
  state: PopoverCollapsedState,
): MorphPath {
  return edgeGrowPath({
    box: {
      x: surface.left,
      y: surface.top,
      width: surface.width,
      height: surface.height,
    },
    origin: {x: state.originX, y: state.originY},
    axis: state.axis,
    collapsedScale: state.scale,
    collapsedLength: state.length,
  });
}

export interface PopoverSurfaceMotion {
  /**
   * The popover has just been shown in its touch presentation: grow it out
   * of its source, from the next animation frame, before it paints:
   * `measure` reads the geometry there, with the element at its full size.
   * During a dismissal, the popover grows back from where the dismissal has
   * it, about the same point, at once (it reads nothing).
   */
  enter(measure: () => PopoverSurfaceGeometry): void;
  /**
   * The popover is closing (its `beforetoggle` to closed, while it is still
   * shown): shrink it back into its source. Does nothing unless the last
   * presentation was a touch one.
   */
  exit(): void;
  /**
   * The popover opened in a presentation that does not use this motion:
   * leave the element exactly as the component styles it.
   */
  reset(): void;
  /** Cancels everything and restores the element. */
  dispose(): void;
}

export function createPopoverSurfaceMotion(
  element: HTMLElement,
  {
    requestFrame,
    cancelFrame,
    ...options
  }: Pick<AnimatorOptions, 'now'> & {
    /** Schedules the presentation's read (default: the element's window's animation frame). */
    requestFrame?: (callback: () => void) => number;
    /** Cancels a read `requestFrame` scheduled. */
    cancelFrame?: (handle: number) => void;
  } = {},
): PopoverSurfaceMotion {
  // The popover's two springs are this component's measured values, not
  // motion roles (touch motion stays internal, spec:AST-094 DEC-11): they
  // play as given, so no table is registered and no other row is bundled.
  const morph = createRectMorph(element, options);
  const view = element.ownerDocument.defaultView;
  const scheduleFrame =
    requestFrame ??
    ((callback: () => void) =>
      typeof view?.requestAnimationFrame === 'function'
        ? view.requestAnimationFrame(() => callback())
        : (callback(), 0));
  const unscheduleFrame =
    cancelFrame ??
    ((handle: number) => {
      if (typeof view?.cancelAnimationFrame === 'function') {
        view.cancelAnimationFrame(handle);
      }
    });
  // The frame a fresh presentation waits for to read its geometry.
  let pendingFrame: number | null = null;
  const cancelPending = () => {
    if (pendingFrame != null) {
      unscheduleFrame(pendingFrame);
      pendingFrame = null;
    }
  };
  // The presentation in progress or last played, and the geometry it
  // measured; null while the popover is in a presentation this motion does
  // not drive.
  let collapsed: PopoverCollapsedState | null = null;
  let measured: PopoverSurfaceGeometry | null = null;
  let presentHandle: MotionHandle | null = null;
  let dismissHandle: MotionHandle | null = null;
  // Releases the hold that takes every touch while the presentation runs.
  let holdRelease: (() => void) | null = null;

  const releaseHold = () => {
    holdRelease?.();
    holdRelease = null;
  };

  const reset = () => {
    cancelPending();
    collapsed = null;
    measured = null;
    presentHandle = null;
    dismissHandle = null;
    releaseHold();
    morph.reset();
    element.style.removeProperty('animation-name');
  };

  const present = (
    geometry: PopoverSurfaceGeometry,
    state: PopoverCollapsedState,
  ) => {
    measured = geometry;
    collapsed = state;
    // The layer's own CSS entrance belongs to the pointer presentation.
    element.style.setProperty('animation-name', 'none');
    // Under Reduce Motion the animator lands the growth at once and fades
    // the opacity in (design:reduced-motion).
    const handle = morph.present(
      pathOf(geometry.surface, state),
      POPOVER_PRESENT_SPRING,
    );
    dismissHandle = null;
    presentHandle = handle;
    // No touch reaches the page, or dismisses the popover, until it is in.
    releaseHold();
    holdRelease = holdInput(element, {until: handle, scope: 'viewport'});
    void handle.finished.then(() => {
      if (presentHandle === handle) {
        presentHandle = null;
        releaseHold();
      }
    });
  };

  const enter = (measure: () => PopoverSurfaceGeometry) => {
    cancelPending();
    // Presented again during the dismissal: the morph continues from the
    // copy's frame on screen, about the same point.
    if (dismissHandle != null && collapsed != null && measured != null) {
      present(measured, collapsed);
      return;
    }
    // A fresh presentation writes and reads nothing until the next frame,
    // which runs before that frame paints: here, the element's style and
    // the boxes would lay the page out inside the task that opened the
    // popover. The layer's own CSS entrance, started meanwhile, is turned
    // off before anything paints.
    // The input hold starts with the presentation too, in that frame: a touch
    // that starts in the one frame between the open and it (about 16 ms after
    // the opening tap lifts) reaches the page, though its tap does not
    // dismiss, since its lift lands on the hold. Holding from the open would
    // cost two forced layouts in every touch opening (a top-layer cover's
    // `showPopover()` lays the page out), the work this frame keeps out of
    // the opening task.
    pendingFrame = scheduleFrame(() => {
      pendingFrame = null;
      // At full size for the read: no transform left from the last
      // dismissal, nor the first keyframe of the layer's CSS entrance (which
      // belongs to the pointer presentation). Nothing paints before the
      // present below replaces it.
      element.style.setProperty('animation-name', 'none');
      morph.reset();
      const geometry = measure();
      present(geometry, popoverCollapsedState(geometry));
    });
  };

  const exit = () => {
    releaseHold();
    if (pendingFrame != null) {
      // Closed before the frame that would have presented it: nothing is on
      // screen to dismiss, and nothing was written to the element, which is
      // hidden now and stays as the component styles it, with no compositing
      // layer and no timer to end one.
      cancelPending();
      collapsed = null;
      measured = null;
      presentHandle = null;
      return;
    }
    const state = collapsed;
    if (state == null || measured == null || dismissHandle != null) {
      return;
    }
    // The surface at full size where it stands: the presentation's own
    // measurement while it runs, the element's box once it has settled.
    let box: PopoverSurfaceRect = measured.surface;
    if (presentHandle == null) {
      // Settled: the element stands as laid out, maybe moved since.
      morph.reset();
      const rect = element.getBoundingClientRect();
      box = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
    presentHandle = null;
    // The copy stands where the surface is drawn, the morph's frame included
    // (the layer runtime's shared exit copy, INV14).
    const copy = placeLayerExitCopy(element, POPOVER_EXIT_COPY_ATTRIBUTE);
    if (copy == null) {
      // No top layer for a copy: the close is immediate.
      morph.reset();
      return;
    }
    // Under Reduce Motion the copy fades out where it stands, then lands.
    // The morph takes the copy away when its motion ends.
    const handle = morph.dismiss(pathOf(box, state), POPOVER_DISMISS_SPRING, {
      target: copy,
    });
    dismissHandle = handle;
    void handle.finished.then(() => {
      if (dismissHandle === handle) {
        dismissHandle = null;
      }
    });
  };

  return {
    enter,
    exit,
    reset,
    dispose() {
      reset();
      morph.dispose();
    },
  };
}
