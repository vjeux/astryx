// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file gestureCounter.test.ts
 * @input claimPress and claimContextMenuPress with a stubbed layer box,
 *   stubbed pointer capture, and a layer inside an open shadow root
 * @output The claim compares the pointer with the layer's box read once (no
 *   hit test or layout read per move), lets go over the layer, and ends when
 *   the layer closes while the button is still down. A primary press's claim
 *   ends at its release and runs once per press and layer. The context-menu
 *   claim takes only a press that fired `contextmenu`
 * @position Unit test of packages/core/src/Layer/gestureCounter.ts
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  claimContextMenuPress,
  claimPress,
  currentGesture,
  isPressInFlight,
} from './gestureCounter';

/** A pointer event of `type` for `pointerId`, which jsdom's events lack. */
function pointerEvent(
  type: string,
  pointerId: number,
  {button = 0, x = 0, y = 0} = {},
): Event {
  return Object.assign(
    new MouseEvent(type, {
      bubbles: true,
      composed: true,
      button,
      clientX: x,
      clientY: y,
    }),
    {pointerId},
  );
}

describe('claimContextMenuPress', () => {
  let captured: number[];
  let released: number[];
  let isCaptured: boolean;

  beforeEach(() => {
    captured = [];
    released = [];
    isCaptured = false;
    HTMLElement.prototype.setPointerCapture = (pointerId: number) => {
      captured.push(pointerId);
      isCaptured = true;
    };
    HTMLElement.prototype.hasPointerCapture = () => isCaptured;
    HTMLElement.prototype.releasePointerCapture = (pointerId: number) => {
      released.push(pointerId);
      isCaptured = false;
    };
  });

  afterEach(() => {
    document.dispatchEvent(pointerEvent('pointerup', 7));
    document.body.replaceChildren();
    vi.restoreAllMocks();
    delete (HTMLElement.prototype as Partial<HTMLElement>).setPointerCapture;
    delete (HTMLElement.prototype as Partial<HTMLElement>).hasPointerCapture;
    delete (HTMLElement.prototype as Partial<HTMLElement>)
      .releasePointerCapture;
  });

  /** Presses the right button on `zone` and claims the press for `layer`. */
  function openFromRightClick(zone: Element, layer: HTMLElement) {
    // Reading the gesture installs its listeners before the press.
    currentGesture();
    zone.dispatchEvent(pointerEvent('pointerdown', 7, {button: 2}));
    zone.dispatchEvent(
      new MouseEvent('contextmenu', {bubbles: true, composed: true}),
    );
    claimContextMenuPress(layer);
  }

  function stubLayerBox(layer: HTMLElement) {
    return vi.spyOn(layer, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON() {
        return this;
      },
    });
  }

  it('lets go over the layer and holds outside it, reading the layer box once', () => {
    const zone = document.createElement('div');
    const layer = document.createElement('div');
    document.body.append(zone, layer);
    const box = stubLayerBox(layer);

    openFromRightClick(zone, layer);
    expect(captured).toEqual([7]);

    layer.dispatchEvent(pointerEvent('pointermove', 7, {x: 150, y: 150}));
    expect(released).toEqual([7]);
    zone.dispatchEvent(pointerEvent('pointermove', 7, {x: 20, y: 20}));
    expect(captured).toEqual([7, 7]);
    layer.dispatchEvent(pointerEvent('pointermove', 7, {x: 120, y: 180}));
    expect(released).toEqual([7, 7]);
    expect(box).toHaveBeenCalledTimes(1);
  });

  it('works for a layer inside an open shadow root', () => {
    const host = document.createElement('div');
    document.body.append(host);
    const shadow = host.attachShadow({mode: 'open'});
    const zone = document.createElement('div');
    const layer = document.createElement('div');
    shadow.append(zone, layer);
    stubLayerBox(layer);

    openFromRightClick(zone, layer);
    expect(captured).toEqual([7]);
    layer.dispatchEvent(pointerEvent('pointermove', 7, {x: 150, y: 150}));
    expect(released).toEqual([7]);
  });

  it('lets the pointer go when the layer closes while the button is still down', () => {
    const zone = document.createElement('div');
    const layer = document.createElement('div');
    document.body.append(zone, layer);
    stubLayerBox(layer);

    openFromRightClick(zone, layer);
    expect(captured).toEqual([7]);

    // Escape closes the layer before the release.
    layer.dispatchEvent(
      Object.assign(new Event('toggle'), {newState: 'closed'}),
    );
    expect(released).toEqual([7]);

    // The claim has ended: a later move outside captures nothing.
    zone.dispatchEvent(pointerEvent('pointermove', 7, {x: 20, y: 20}));
    expect(captured).toEqual([7]);
  });
});

describe('claimPress', () => {
  let captured: number[];
  let released: number[];

  beforeEach(() => {
    captured = [];
    released = [];
    HTMLElement.prototype.setPointerCapture = (pointerId: number) => {
      captured.push(pointerId);
    };
    HTMLElement.prototype.hasPointerCapture = () => true;
    HTMLElement.prototype.releasePointerCapture = (pointerId: number) => {
      released.push(pointerId);
    };
  });

  afterEach(() => {
    document.dispatchEvent(pointerEvent('pointerup', 7));
    document.body.replaceChildren();
    vi.restoreAllMocks();
    delete (HTMLElement.prototype as Partial<HTMLElement>).setPointerCapture;
    delete (HTMLElement.prototype as Partial<HTMLElement>).hasPointerCapture;
    delete (HTMLElement.prototype as Partial<HTMLElement>)
      .releasePointerCapture;
  });

  /** A trigger and a layer whose box spans 100 to 200 on both axes. */
  function mountLayer() {
    const trigger = document.createElement('button');
    const layer = document.createElement('div');
    document.body.append(trigger, layer);
    vi.spyOn(layer, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(100, 100, 100, 100),
    );
    // Reading the gesture installs its listeners before the press.
    currentGesture();
    return {trigger, layer};
  }

  it('captures a primary press outside the layer, lets go over it, and ends at the release', () => {
    const {trigger, layer} = mountLayer();
    trigger.dispatchEvent(pointerEvent('pointerdown', 7));
    expect(isPressInFlight()).toBe(true);
    claimPress(layer);
    expect(captured).toEqual([7]);

    layer.dispatchEvent(pointerEvent('pointermove', 7, {x: 150, y: 150}));
    expect(released).toEqual([7]);
    trigger.dispatchEvent(pointerEvent('pointermove', 7, {x: 20, y: 20}));
    expect(captured).toEqual([7, 7]);

    trigger.dispatchEvent(pointerEvent('pointerup', 7, {x: 20, y: 20}));
    expect(isPressInFlight()).toBe(false);
    // The claim ended with its press.
    trigger.dispatchEvent(pointerEvent('pointermove', 7, {x: 20, y: 20}));
    expect(captured).toEqual([7, 7]);
  });

  it('claims a press once for a layer', () => {
    const {trigger, layer} = mountLayer();
    trigger.dispatchEvent(pointerEvent('pointerdown', 7));
    claimPress(layer);
    claimPress(layer);
    expect(captured).toEqual([7]);
    // One claim follows the pointer, not two.
    trigger.dispatchEvent(pointerEvent('pointermove', 7, {x: 20, y: 20}));
    expect(captured).toEqual([7, 7]);
  });

  it('claims nothing when no press is down', () => {
    const {trigger, layer} = mountLayer();
    trigger.dispatchEvent(pointerEvent('pointerdown', 7));
    trigger.dispatchEvent(pointerEvent('pointerup', 7));
    claimPress(layer);
    expect(captured).toEqual([]);
  });

  it('claims a press for the context menu only once that press fired contextmenu', () => {
    const {trigger, layer} = mountLayer();
    trigger.dispatchEvent(pointerEvent('pointerdown', 7));
    claimContextMenuPress(layer);
    expect(captured).toEqual([]);
    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {bubbles: true, composed: true}),
    );
    claimContextMenuPress(layer);
    expect(captured).toEqual([7]);
  });
});
