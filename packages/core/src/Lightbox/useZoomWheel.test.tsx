// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useZoomWheel.test.tsx
 * @input Uses vitest, @testing-library/react, useZoomWheel over a stand-in
 *   zoom core
 * @output Proof of the Lightbox-local wheel path (component:Lightbox FR11): a
 *   trackpad pinch or ctrl-wheel zooms about the pointer and settles, or
 *   closes the viewer below the fitted size; a plain wheel pans a zoomed
 *   photo; over a fitted photo a plain wheel stays the page's
 * @position Unit tests beside useZoomWheel
 */

import {describe, it, expect, vi, afterEach} from 'vitest';
import {render} from '@testing-library/react';
import {useRef, type ReactElement} from 'react';
import {useZoomWheel} from './useZoomWheel';
import type {ZoomCore} from './useZoomCore';
import {
  doubleTapScaleFor,
  IDENTITY,
  maxScaleFor,
  type ZoomGeometry,
  type ZoomTransform,
} from './zoomStage';

afterEach(() => {
  vi.useRealTimers();
});

function geometry(): ZoomGeometry {
  const doubleTapScale = doubleTapScaleFor(402, 874, 402, 268);
  return {
    width: 402,
    height: 874,
    fit: {x: 0, y: (874 - 268) / 2, width: 402, height: 268},
    minScale: 1,
    maxScale: maxScaleFor(3000, 402, 3, doubleTapScale),
    doubleTapScale,
  };
}

/** A zoom core that only records what the wheel asks of it. */
function fakeCore(start: ZoomTransform = IDENTITY) {
  let shown = start;
  const zoomedRef = {current: start.scale > 1.001};
  const core = {
    geometryRef: {current: geometry()},
    zoomedRef,
    animator: {stop: vi.fn()},
    measure: () => geometry(),
    toStage: (point: {x: number; y: number}) => point,
    current: () => shown,
    write: vi.fn((next: ZoomTransform) => {
      shown = next;
    }),
    setTarget: vi.fn(),
    setZoomed: vi.fn((next: boolean) => {
      zoomedRef.current = next;
    }),
    settleTo: vi.fn(),
  };
  return {core: core as unknown as ZoomCore, spies: core, shown: () => shown};
}

function Surface({
  core,
  onPinchClose,
}: {
  core: ZoomCore;
  onPinchClose: () => void;
}): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  useZoomWheel(core, ref, {isEnabled: true, onPinchClose});
  return <div ref={ref} data-testid="surface" />;
}

function wheel(
  target: Element,
  init: WheelEventInit & {ctrlKey?: boolean},
): WheelEvent {
  const event = new WheelEvent('wheel', {
    bubbles: true,
    cancelable: true,
    clientX: 201,
    clientY: 437,
    ...init,
  });
  target.dispatchEvent(event);
  return event;
}

describe('useZoomWheel (component:Lightbox FR11)', () => {
  it('a trackpad pinch zooms about the pointer, then settles into the limits', () => {
    vi.useFakeTimers();
    const {core, spies, shown} = fakeCore();
    const {getByTestId} = render(
      <Surface core={core} onPinchClose={() => {}} />,
    );
    const event = wheel(getByTestId('surface'), {deltaY: -50, ctrlKey: true});
    expect(event.defaultPrevented).toBe(true);
    expect(shown().scale).toBeGreaterThan(1.5);
    expect(spies.setZoomed).toHaveBeenLastCalledWith(true);
    expect(spies.settleTo).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(spies.settleTo).toHaveBeenCalledTimes(1);
  });

  it('a pinch that ends well below the fitted size closes the viewer', () => {
    vi.useFakeTimers();
    const onPinchClose = vi.fn();
    const {core, spies} = fakeCore();
    const {getByTestId} = render(
      <Surface core={core} onPinchClose={onPinchClose} />,
    );
    wheel(getByTestId('surface'), {deltaY: 60, ctrlKey: true});
    vi.advanceTimersByTime(200);
    expect(onPinchClose).toHaveBeenCalledTimes(1);
    expect(spies.settleTo).not.toHaveBeenCalled();
  });

  it('a plain wheel pans a zoomed photo, directly and inside the stage', () => {
    const {core, shown} = fakeCore({x: 0, y: 0, scale: 3});
    const {getByTestId} = render(
      <Surface core={core} onPinchClose={() => {}} />,
    );
    const event = wheel(getByTestId('surface'), {deltaX: 40, deltaY: 0});
    expect(event.defaultPrevented).toBe(true);
    expect(shown().x).toBeLessThan(0);
    expect(shown().scale).toBe(3);
  });

  it('over a fitted photo a plain wheel is left to the page', () => {
    const {core, spies} = fakeCore();
    const {getByTestId} = render(
      <Surface core={core} onPinchClose={() => {}} />,
    );
    const event = wheel(getByTestId('surface'), {deltaY: 40});
    expect(event.defaultPrevented).toBe(false);
    expect(spies.write).not.toHaveBeenCalled();
  });
});
