// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ScreenEdgePanGestureRecognizer.test.ts
 * @input Synthetic touches with explicit timestamps through a GestureArena
 * @output ScreenEdgePanGestureRecognizer's state machine (the edge band, RTL edges, inward movement) and its edge-zone touch-action
 * @position Unit tests of packages/core/src/gestures/ScreenEdgePanGestureRecognizer.ts
 */

import {afterEach, describe, expect, it, vi} from 'vitest';
import {UIKIT_SCREEN_EDGE_PAN} from '../../motion/uikit/gestures';
import {ALL_NATIVE_TOUCH} from '../GestureRecognizer';
import {ScreenEdgePanGestureRecognizer} from '../ScreenEdgePanGestureRecognizer';
import {createHarness} from './harness';

describe('ScreenEdgePanGestureRecognizer', () => {
  it('begins from the leading band and fails elsewhere at touch-down', () => {
    const h = createHarness();
    const edge = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    h.finger(1)
      .down(10, 300, 0, {recognizers: [edge]})
      .drag(40, 4, 50);
    expect(h.log[0]).toMatch(/^edge:began@/);
    expect(edge.activeEdge).toBe('left');

    const middle = createHarness();
    const miss = new ScreenEdgePanGestureRecognizer({name: 'miss'});
    middle.finger(1).down(60, 300, 0, {recognizers: [miss]});
    expect(middle.log).toEqual(['miss:failed@0']);
  });

  it('resolves the leading edge under RTL and requires inward movement', () => {
    const h = createHarness();
    h.environment.rtl = true;
    const edge = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    h.finger(1)
      .down(385, 300, 0, {recognizers: [edge]})
      .drag(-40, 2, 50);
    expect(edge.activeEdge).toBe('right');
    expect(h.log[0]).toMatch(/^edge:began@/);

    const outward = createHarness();
    const back = new ScreenEdgePanGestureRecognizer({name: 'back'});
    outward
      .finger(1)
      .down(10, 300, 0, {recognizers: [back]})
      .drag(-8, 30, 50);
    expect(back.state).toBe('failed');
  });

  it('a drag 5 pt inward and then down the edge is the page\u2019s scroll: it fails and claims nothing (spec:AST-094 FR19)', () => {
    const h = createHarness();
    const edge = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    h.finger(1)
      .down(10, 300, 0, {recognizers: [edge]})
      .drag(5, 0, 30)
      .drag(0, 20, 50);
    expect(edge.state).toBe('failed');
    expect(h.claims).toEqual([]);
  });

  it('leaves a view wider than the edge zone every touch behavior, so its scrolling is untouched (spec:AST-094 FR18)', () => {
    const resizes = watchResizes();
    expect(new ScreenEdgePanGestureRecognizer().nativeTouchBehavior).toEqual(
      ALL_NATIVE_TOUCH,
    );
    const page = new ScreenEdgePanGestureRecognizer();
    resizes.place(page, 390, 844);
    expect(page.nativeTouchBehavior).toEqual(ALL_NATIVE_TOUCH);
    // A pan from several edges too, off their zones.
    expect(
      new ScreenEdgePanGestureRecognizer({edges: ['left', 'right']})
        .nativeTouchBehavior,
    ).toEqual(ALL_NATIVE_TOUCH);
  });

  it('takes the axis across its edge in the edge zone, a view no wider than the edge region (spec:AST-094 FR18)', () => {
    const resizes = watchResizes();
    const leading = new ScreenEdgePanGestureRecognizer();
    resizes.place(leading, leading.edgeRegion, 844);
    expect(leading.nativeTouchBehavior).toEqual({
      panX: false,
      panY: true,
      pinchZoom: true,
      doubleTapZoom: false,
    });
    const bottom = new ScreenEdgePanGestureRecognizer({edges: ['bottom']});
    resizes.place(bottom, 390, 12);
    expect(bottom.nativeTouchBehavior).toEqual({
      panX: true,
      panY: false,
      pinchZoom: true,
      doubleTapZoom: false,
    });
    // One pixel wider than the band is not the edge zone.
    const wide = new ScreenEdgePanGestureRecognizer();
    resizes.place(wide, wide.edgeRegion + 1, 844);
    expect(wide.nativeTouchBehavior).toEqual(ALL_NATIVE_TOUCH);
  });

  it('tells its edge band without forcing a layout: attaching it and reading its touch behavior measure nothing (spec:AST-094 FR18, DEC-13)', () => {
    const measure = vi.spyOn(Element.prototype, 'getBoundingClientRect');
    const edge = new ScreenEdgePanGestureRecognizer();
    edge.view = document.createElement('div');
    expect(edge.nativeTouchBehavior).toEqual(ALL_NATIVE_TOUCH);
    expect(measure).not.toHaveBeenCalled();
  });

  it('re-derives as its view resizes into and out of the edge band, says so each time, and stops watching a view it left (spec:AST-094 FR18, DEC-13)', () => {
    const resizes = watchResizes();
    const edge = new ScreenEdgePanGestureRecognizer();
    let changes = 0;
    edge.onNativeTouchBehaviorChange = () => changes++;
    const view = document.createElement('div');
    edge.view = view;
    // Wide until a layout gives the view a size.
    expect(edge.nativeTouchBehavior).toEqual(ALL_NATIVE_TOUCH);
    resizes.to(view, edge.edgeRegion, 844);
    expect(edge.nativeTouchBehavior).toEqual({
      panX: false,
      panY: true,
      pinchZoom: true,
      doubleTapZoom: false,
    });
    expect(changes).toBe(1);
    resizes.to(view, 300, 844);
    expect(edge.nativeTouchBehavior).toEqual(ALL_NATIVE_TOUCH);
    expect(changes).toBe(2);
    // Still wider than the band: the touch behavior did not change.
    resizes.to(view, 320, 844);
    expect(changes).toBe(2);
    edge.view = null;
    resizes.to(view, 10, 844);
    expect(changes).toBe(2);
    expect(resizes.watched(view)).toBe(false);
  });

  it('in the edge zone, still decides at its hysteresis', () => {
    const h = createHarness();
    const edge = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    h.environment.view = {width: edge.edgeRegion, height: 844};
    const hysteresis = UIKIT_SCREEN_EDGE_PAN.hysteresis.value;
    h.finger(1)
      .down(10, 300, 0, {recognizers: [edge]})
      .drag(hysteresis - 1, 0, 30);
    expect(edge.state).toBe('possible');
    h.finger(1).drag(2, 0, 50);
    expect(h.log[0]).toMatch(/^edge:began@/);
  });
});

describe('off the edge zone', () => {
  it('decides at 10 px, before the browser commits to a scroll (spec:AST-094 FR19)', () => {
    const h = createHarness();
    const edge = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    h.environment.view = {width: 390, height: 844};
    h.finger(1)
      .down(10, 300, 0, {recognizers: [edge]})
      .drag(9, 0, 30, 9);
    expect(edge.state).toBe('possible');
    h.finger(1).drag(1, 0, 10, 1);
    expect(h.log[0]).toMatch(/^edge:began@/);
  });

  it('from several edges, also decides at 10 px off their zones', () => {
    const h = createHarness();
    const edge = new ScreenEdgePanGestureRecognizer({
      name: 'edge',
      edges: ['left', 'right'],
    });
    h.environment.view = {width: 390, height: 844};
    h.finger(1)
      .down(10, 300, 0, {recognizers: [edge]})
      .drag(10, 0, 30, 10);
    expect(h.log[0]).toMatch(/^edge:began@/);
  });
});

describe('a pan from several edges (spec:AST-094 FR18)', () => {
  it('outside every edge zone leaves the browser every touch behavior', () => {
    const resizes = watchResizes();
    const edge = new ScreenEdgePanGestureRecognizer({
      edges: ['left', 'bottom'],
    });
    resizes.place(edge, 390, 844);
    expect(edge.nativeTouchBehavior).toEqual(ALL_NATIVE_TOUCH);
  });

  it('inside a side edge zone claims pan-x only', () => {
    const resizes = watchResizes();
    const edge = new ScreenEdgePanGestureRecognizer({
      edges: ['left', 'bottom'],
    });
    resizes.place(edge, edge.edgeRegion, 844);
    expect(edge.nativeTouchBehavior).toEqual({
      panX: false,
      panY: true,
      pinchZoom: true,
      doubleTapZoom: false,
    });
  });

  it('inside a bottom edge zone claims pan-y only', () => {
    const resizes = watchResizes();
    const edge = new ScreenEdgePanGestureRecognizer({
      edges: ['left', 'bottom'],
    });
    resizes.place(edge, 390, edge.edgeRegion);
    expect(edge.nativeTouchBehavior).toEqual({
      panX: true,
      panY: false,
      pinchZoom: true,
      doubleTapZoom: false,
    });
  });
});

const realResizeObserver = globalThis.ResizeObserver;

afterEach(() => {
  vi.restoreAllMocks();
  globalThis.ResizeObserver = realResizeObserver;
});

/**
 * A ResizeObserver jsdom lacks: `to` gives a watched element a box and runs
 * its observers' callbacks, as a layout would.
 */
function watchResizes() {
  const observers = new Set<{
    callback: ResizeObserverCallback;
    targets: Set<Element>;
  }>();
  globalThis.ResizeObserver = class {
    private readonly record: {
      callback: ResizeObserverCallback;
      targets: Set<Element>;
    };
    constructor(callback: ResizeObserverCallback) {
      this.record = {callback, targets: new Set()};
      observers.add(this.record);
    }
    observe(target: Element): void {
      this.record.targets.add(target);
    }
    unobserve(target: Element): void {
      this.record.targets.delete(target);
    }
    disconnect(): void {
      this.record.targets.clear();
    }
  };
  return {
    to(view: HTMLElement, width: number, height: number): void {
      view.getBoundingClientRect = () =>
        ({
          width,
          height,
          top: 0,
          left: 0,
          right: width,
          bottom: height,
        }) as DOMRect;
      for (const {callback, targets} of observers) {
        if (targets.has(view)) {
          callback(
            [{target: view} as unknown as ResizeObserverEntry],
            {} as ResizeObserver,
          );
        }
      }
    },
    /** Attach `recognizer` to a new view that lays out at that size. */
    place(
      recognizer: ScreenEdgePanGestureRecognizer,
      width: number,
      height: number,
    ): void {
      const view = document.createElement('div');
      recognizer.view = view;
      this.to(view, width, height);
    },
    watched(view: Element): boolean {
      return [...observers].some(({targets}) => targets.has(view));
    },
  };
}
