// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file usePopoverSurfaceMotion.ts
 * @input React, the shared touch resolver, the layer runtime's presentation
 *   hold, the shared module loader and popoverSurfaceMotion, which it loads
 * @output Exports `usePopoverSurfaceMotion`, the calls Popover makes as it
 *   opens and as it starts to close. Under a finger they present and dismiss
 *   the popover the UIKit way; a mouse keeps the layer's own entrance.
 * @position Internal to Popover; glue between the component and
 *   popoverSurfaceMotion.ts
 *
 * The shared touch resolver decides as the popover opens. Under a finger (a
 * coarse primary pointer, on any touch device) the popover grows out of its
 * source. When the layer runtime reports that it starts to close, it shrinks
 * back into it. A fine primary pointer keeps the layer's own entrance. The
 * growth plays on the surface, the box that paints the popover, and not on
 * the layer. The layer is anchored, and Chromium lays an anchored element out
 * again each time it restyles it, as when an animation on it starts. The
 * motion is created for the surface the first time the popover opens and
 * follows it if the surface is replaced.
 *
 * The motion, with the input hold and the exit copy it uses, loads after the
 * page's first paint where the primary pointer is coarse, or after the next
 * paint once it turns coarse. A fine primary pointer never presents this
 * way, so it loads none of it, and the shared touch runtime does not carry
 * it. Until the motion has loaded, a popover presents as under a fine
 * pointer.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Popover/Popover.tsx
 * - /packages/core/src/Popover/usePopoverSurfaceMotion.test.tsx
 */

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPresentationHold} from '../Layer/presentationHold';
import {isCoarsePointer, watchCoarsePointer} from '../utils/coarsePointer';
import {createModuleLoader} from '../utils/moduleLoader';
import {scheduleAfterPaint} from '../utils/touchRuntime';
import type {
  PopoverSurfaceMotion,
  PopoverSurfaceRect,
} from './popoverSurfaceMotion';

const surfaceMotionModule = createModuleLoader(
  async () => import('./popoverSurfaceMotion'),
);

type SurfaceMotionModule = Awaited<ReturnType<typeof surfaceMotionModule.load>>;

/** The touch motion once the page has loaded it, else null. */
let surfaceMotion: SurfaceMotionModule | null = null;
let isLoadScheduled = false;

/**
 * Schedules the page's one load of the touch motion, on the touch runtime's
 * wait: after `view`'s next paint, at idle. Later calls do nothing.
 */
function scheduleSurfaceMotionLoad(view: Window): void {
  if (isLoadScheduled || surfaceMotion != null) {
    return;
  }
  isLoadScheduled = true;
  scheduleAfterPaint(view, () => {
    surfaceMotionModule.load().then(
      loaded => {
        surfaceMotion = loaded;
      },
      () => {
        // A chunk that fails to load leaves popovers on the fine-pointer
        // presentation. The next mount, or the pointer turning coarse,
        // asks the loader again.
        isLoadScheduled = false;
      },
    );
  });
}

// The growth needs where the surface ends and where its source is. Both
// boxes are read once, in the frame that starts it, before that frame writes.
function boxOf(element: Element): PopoverSurfaceRect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

export interface PopoverSurfaceMotionCalls {
  /**
   * Call as the popover opens, right after the browser shows it and before
   * it paints. `entrance` is the surface that carries the pointer
   * presentation's CSS entrance; the touch presentation turns it off there
   * and plays its growth on it.
   */
  present: (
    layer: HTMLElement | null,
    source: HTMLElement | null,
    entrance?: HTMLElement | null,
  ) => void;
  /** Call as the popover starts to close, while the browser still shows it. */
  closeStart: () => void;
}

export function usePopoverSurfaceMotion(): PopoverSurfaceMotionCalls {
  const motionRef = useRef<{
    element: HTMLElement;
    entrance: HTMLElement | null;
    motion: PopoverSurfaceMotion;
  } | null>(null);
  // Whether the presentation in progress is the touch one, held from the
  // open until its close begins (Layer/presentationHold).
  const [touchHold] = useState(() => createPresentationHold<boolean>());

  const release = useCallback(() => {
    motionRef.current?.motion.dispose();
    motionRef.current = null;
  }, []);

  // Syncs the touch motion's load with the primary pointer: scheduled at
  // mount where it is coarse, else once it turns coarse.
  useEffect(() => {
    const view = window;
    if (isCoarsePointer(view)) {
      scheduleSurfaceMotionLoad(view);
      return undefined;
    }
    return watchCoarsePointer(view, isCoarse => {
      if (isCoarse) {
        scheduleSurfaceMotionLoad(view);
      }
    });
  }, []);
  const motionFor = useCallback(
    (element: HTMLElement, entrance: HTMLElement | null) => {
      const current = motionRef.current;
      if (current?.element === element && current.entrance === entrance) {
        return current.motion;
      }
      const createMotion = surfaceMotion?.createPopoverSurfaceMotion;
      if (createMotion == null) {
        return null;
      }
      current?.motion.dispose();
      const motion = createMotion(element, {entrance});
      motionRef.current = {element, entrance, motion};
      return motion;
    },
    [],
  );

  // Releases the motion's compositor animations, and any exit copy still on
  // screen, at unmount.
  useEffect(() => release, [release]);

  const present = useCallback(
    (
      layer: HTMLElement | null,
      source: HTMLElement | null,
      entrance: HTMLElement | null = null,
    ) => {
      if (layer == null) {
        return;
      }
      const isTouch =
        source != null &&
        isCoarsePointer(layer.ownerDocument.defaultView) &&
        surfaceMotion != null;
      touchHold.take(isTouch);
      if (!isTouch || source == null) {
        // A fine pointer animates nothing here, so nothing is created for
        // it, and nothing is promoted to the compositor. A motion this layer
        // already has (the pointer changed, or a touch presentation is on
        // screen) is released.
        release();
        return;
      }
      const surface = entrance ?? layer;
      motionFor(surface, entrance)?.enter(() => ({
        surface: boxOf(surface),
        source: boxOf(source),
      }));
    },
    [motionFor, release, touchHold],
  );

  const closeStart = useCallback(() => {
    if (touchHold.current() === true) {
      motionRef.current?.motion.exit();
    }
    touchHold.release();
  }, [touchHold]);

  return useMemo(() => ({present, closeStart}), [present, closeStart]);
}

/** Test only: loads the touch motion now, as a coarse page does after paint. */
export async function __loadPopoverSurfaceMotionForTest(): Promise<void> {
  surfaceMotion = await surfaceMotionModule.load();
  isLoadScheduled = true;
}

/** Test only: forgets the loaded touch motion and any scheduled load. */
export function __resetPopoverSurfaceMotionForTest(): void {
  surfaceMotion = null;
  isLoadScheduled = false;
}
