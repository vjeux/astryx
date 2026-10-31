// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useZoomWheel.ts
 * @input The zoom core (useZoomCore.ts), the surface the wheel lands on, and
 *   how to close the viewer
 * @output useZoomWheel: a wheel or trackpad over the photo zooms and pans it
 *   (component:Lightbox FR11), with no gesture host support for wheels
 * @position Lightbox-local; the path for a mouse wheel and a trackpad when the
 *   shared gesture host takes no wheel input
 *
 * A trackpad pinch arrives as `wheel` events with `ctrlKey` set, and so does a
 * ctrl-wheel: each zooms the photo about the pointer, live, and when the
 * events stop it settles into the zoom limits, or closes the viewer when it
 * ended well below the fitted size (FR9's close by pinching in). A plain
 * wheel over a zoomed photo pans it, directly, kept inside the stage. Nothing
 * else: over a fitted photo a plain wheel does nothing here and the page
 * keeps it.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Lightbox/useZoomWheel.test.tsx
 */

import {useEffect, useRef, type RefObject} from 'react';
import {zoomMedia} from '../motion/uikit/zoomMedia';
import type {ZoomCore} from './useZoomCore';
import {
  isZoomed,
  restingTransform,
  transformKeepingPoint,
  type ZoomTransform,
} from './zoomStage';

/** How long the wheel must be quiet before a wheel zoom settles (ms). */
const WHEEL_SETTLE_MS = 150;
/** Zoom per wheel pixel: a trackpad pinch's own pace. */
const ZOOM_PER_PIXEL = 0.01;
/** A line of a line-mode wheel, in pixels. */
const LINE_PX = 16;

/** The wheel's travel in pixels, whatever its delta mode. */
function wheelPixels(event: WheelEvent, delta: number): number {
  if (event.deltaMode === 1) {
    return delta * LINE_PX;
  }
  if (event.deltaMode === 2) {
    return (
      delta *
      (event.currentTarget instanceof Element
        ? event.currentTarget.clientHeight
        : 800)
    );
  }
  return delta;
}

export interface UseZoomWheelOptions {
  /** Whether the photo takes the wheel (a zoomable photo, viewer open). */
  isEnabled: boolean;
  /** Closes the viewer: a wheel pinch that ended well below the fitted size. */
  onPinchClose: () => void;
}

export function useZoomWheel(
  core: ZoomCore,
  surfaceRef: RefObject<HTMLElement | null>,
  {isEnabled, onPinchClose}: UseZoomWheelOptions,
): void {
  const optionsRef = useRef({onPinchClose});
  optionsRef.current = {onPinchClose};

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!isEnabled || surface == null) {
      return;
    }
    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    const settle = () => {
      settleTimer = null;
      const geometry = core.geometryRef.current ?? core.measure();
      if (geometry == null) {
        return;
      }
      const shown = core.current();
      if (shown.scale < geometry.minScale * zoomMedia.pinchClose.closeScale) {
        optionsRef.current.onPinchClose();
        return;
      }
      core.settleTo(geometry, restingTransform(geometry, shown));
    };

    const onWheel = (event: WheelEvent) => {
      const geometry = core.measure();
      if (geometry == null) {
        return;
      }
      const from: ZoomTransform = core.current();
      if (event.ctrlKey) {
        // A trackpad pinch or a ctrl-wheel: zoom about the pointer, live.
        event.preventDefault();
        core.animator.stop();
        const factor = Math.exp(
          -wheelPixels(event, event.deltaY) * ZOOM_PER_PIXEL,
        );
        const scale = Math.min(
          geometry.maxScale * 1.5,
          Math.max(geometry.minScale * 0.5, from.scale * factor),
        );
        const point = core.toStage({x: event.clientX, y: event.clientY});
        const next = transformKeepingPoint(geometry, from, point, point, scale);
        core.write(next);
        core.setTarget(next);
        core.setZoomed(isZoomed(geometry, next));
        if (settleTimer != null) {
          clearTimeout(settleTimer);
        }
        settleTimer = setTimeout(settle, WHEEL_SETTLE_MS);
        return;
      }
      if (!core.zoomedRef.current) {
        // Over a fitted photo a plain wheel is the page's.
        return;
      }
      // A zoomed photo pans directly, kept inside the stage.
      event.preventDefault();
      core.animator.stop();
      const next = restingTransform(geometry, {
        ...from,
        x: from.x - wheelPixels(event, event.deltaX),
        y: from.y - wheelPixels(event, event.deltaY),
      });
      core.write(next);
      core.setTarget(next);
    };

    surface.addEventListener('wheel', onWheel, {passive: false});
    return () => {
      surface.removeEventListener('wheel', onWheel);
      if (settleTimer != null) {
        clearTimeout(settleTimer);
      }
    };
  }, [core, surfaceRef, isEnabled]);
}
