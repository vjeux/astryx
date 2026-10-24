// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file usePopoverSurfaceMotion.ts
 * @input React, the shared touch resolver and popoverSurfaceMotion
 * @output Exports `usePopoverSurfaceMotion`: the call Popover makes as it
 *   opens, which presents the popover the UIKit way under a finger and
 *   leaves the layer's own entrance to a mouse
 * @position Internal to Popover; glue between the component and
 *   popoverSurfaceMotion.ts
 *
 * The decision is taken as the popover opens, from the shared touch resolver
 * (the primary pointer is coarse). Under a finger the popover grows out of
 * its source and, when it closes (its `beforetoggle` to closed, while it is
 * still shown), shrinks back into it; under a mouse it keeps the layer's
 * entrance and the theme's motion tokens (D-01). The motion is created for
 * the popover element the first time it opens and follows it if the element
 * is replaced.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Popover/Popover.tsx
 * - /packages/core/src/Popover/Popover.test.tsx
 */

import {useCallback, useEffect, useRef} from 'react';
import {readTouchPresentation} from '../utils/touchPresentation';
import {
  createPopoverSurfaceMotion,
  type PopoverSurfaceMotion,
  type PopoverSurfaceRect,
} from './popoverSurfaceMotion';

function boxOf(element: Element): PopoverSurfaceRect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Returns `present(layer, source)`, to call as the popover opens (right after
 * the browser shows it, before it paints).
 */
export function usePopoverSurfaceMotion(): (
  layer: HTMLElement | null,
  source: HTMLElement | null,
) => void {
  const motionRef = useRef<{
    element: HTMLElement;
    motion: PopoverSurfaceMotion;
    detach: () => void;
  } | null>(null);
  // Whether the presentation in progress is the touch one.
  const isTouchPresentationRef = useRef(false);

  const motionFor = useCallback((element: HTMLElement) => {
    const current = motionRef.current;
    if (current?.element === element) {
      return current.motion;
    }
    current?.detach();
    const motion = createPopoverSurfaceMotion(element);
    const handleBeforeToggle = (event: Event) => {
      if (
        (event as ToggleEvent).newState === 'closed' &&
        isTouchPresentationRef.current
      ) {
        motion.exit();
      }
    };
    element.addEventListener('beforetoggle', handleBeforeToggle);
    motionRef.current = {
      element,
      motion,
      detach: () => {
        element.removeEventListener('beforetoggle', handleBeforeToggle);
        motion.dispose();
      },
    };
    return motion;
  }, []);

  useEffect(
    () => () => {
      motionRef.current?.detach();
      motionRef.current = null;
    },
    [],
  );

  return useCallback(
    (layer: HTMLElement | null, source: HTMLElement | null) => {
      if (layer == null) {
        return;
      }
      const isTouch =
        source != null &&
        readTouchPresentation(layer.ownerDocument.defaultView).isTouch;
      isTouchPresentationRef.current = isTouch;
      const motion = motionFor(layer);
      if (!isTouch || source == null) {
        motion.reset();
        return;
      }
      motion.enter(() => ({surface: boxOf(layer), source: boxOf(source)}));
    },
    [motionFor],
  );
}
