// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file arena.test.ts
 * @input GestureArena with competing recognizers, consumers and scroll
 *   probes, driven by synthetic touches with explicit timestamps
 * @output The conflict matrix (who wins, when, and what the loser sees),
 *   delivery to the view, click dispositions, claims, cancellation, and
 *   multi-finger behavior
 * @position Unit tests of packages/core/src/gestures
 */

import {describe, expect, it} from 'vitest';
import {UIKIT_GESTURES} from '../../motion/uikit/gestures';
import {LongPressGestureRecognizer} from '../LongPressGestureRecognizer';
import {PanGestureRecognizer} from '../PanGestureRecognizer';
import {PinchGestureRecognizer} from '../PinchGestureRecognizer';
import {PressTracker} from '../PressTracker';
import {ScreenEdgePanGestureRecognizer} from '../ScreenEdgePanGestureRecognizer';
import {SwipeGestureRecognizer} from '../SwipeGestureRecognizer';
import {TapGestureRecognizer} from '../TapGestureRecognizer';
import {createHarness, RecordingConsumer, scrollProbe} from './harness';

const INTERVAL = UIKIT_GESTURES.tap.maximumIntervalBetweenTaps.value;

describe('conflict matrix', () => {
  it('tap vs double tap, single requires double to fail: the single waits out the interval', () => {
    const h = createHarness();
    const single = new TapGestureRecognizer({name: 'single'});
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    single.requireToFail(double);
    h.finger(1).down(0, 0, 0, {recognizers: [single, double]});
    h.finger(1).up(80);
    expect(single.state).toBe('possible');
    expect(single.pending).toBe('ended');
    h.advance(80 + INTERVAL);
    expect(h.log).toEqual([
      `double:failed@${80 + INTERVAL}`,
      `single:ended@${80 + INTERVAL}`,
      `single:possible@${80 + INTERVAL}`,
      `double:possible@${80 + INTERVAL}`,
    ]);
  });

  it('tap vs double tap, single requires double to fail: a double tap fails the single', () => {
    const h = createHarness();
    const single = new TapGestureRecognizer({name: 'single'});
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    single.requireToFail(double);
    h.finger(1).down(0, 0, 0, {recognizers: [single, double]});
    h.finger(1).up(80);
    h.finger(2).down(2, 2, 200, {recognizers: [single, double]});
    h.finger(2).up(260);
    expect(h.log).toEqual([
      'double:ended@260',
      'single:failed@260',
      'single:possible@260',
      'double:possible@260',
    ]);
  });

  it('tap vs double tap with no requirement: the single wins at once and fails the double', () => {
    const h = createHarness();
    const single = new TapGestureRecognizer({name: 'single'});
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [single, double]});
    h.finger(1).up(80);
    expect(h.log.slice(0, 2)).toEqual(['single:ended@80', 'double:failed@80']);
  });

  it('pan vs native scroll: the browser taking the touch fails a possible pan', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan', direction: 'vertical'});
    h.finger(1)
      .down(0, 100, 0, {recognizers: [pan]})
      .move(0, 105, 16);
    h.finger(1).takenByBrowser(24);
    // The touch is gone from the pan, so it is ready for the next one.
    expect(h.log).toEqual(['pan:failed@24', 'pan:possible@24']);
    expect(h.claims).toEqual([]);
  });

  it('pan at a scroll edge (scrollEdge): begins and claims when the content cannot scroll that way', () => {
    const atTop = createHarness();
    const sheet = new PanGestureRecognizer({
      name: 'sheet',
      direction: 'down',
      scrollEdge: true,
    });
    // Content at its top: a finger moving down scrolls nothing.
    const probe = scrollProbe((_dx, dy) => dy < 0);
    atTop.finger(1).down(0, 100, 0, {recognizers: [sheet], scroll: probe});
    atTop.finger(1).drag(0, 30, 50, 5);
    expect(atTop.log[0]).toBe('sheet:began@20');
    expect(atTop.claims).toEqual([1]);

    const midContent = createHarness();
    const scrolled = new PanGestureRecognizer({
      name: 'sheet',
      direction: 'down',
      scrollEdge: true,
    });
    const canScrollUp = scrollProbe(() => true);
    midContent.finger(1).down(0, 100, 0, {
      recognizers: [scrolled],
      scroll: canScrollUp,
    });
    midContent.finger(1).drag(0, 30, 50, 5);
    expect(midContent.log).toEqual(['sheet:failed@20']);
  });

  it('pan with scrollHandoff takes over a native scroll where the content runs out, and gives it back', () => {
    const h = createHarness();
    const sheet = new PanGestureRecognizer({
      name: 'sheet',
      direction: 'down',
      scrollEdge: true,
      scrollHandoff: true,
    });
    let scrollTop = 30;
    const probe = {
      ...scrollProbe((_dx, dy) => (dy > 0 ? scrollTop > 0 : true)),
      distanceToEdge: (_dx: number, dy: number) => (dy > 0 ? scrollTop : 100),
    };
    const finger = h.finger(1).down(0, 100, 0, {
      recognizers: [sheet],
      scroll: probe,
    });
    finger.move(0, 112, 16);
    expect(sheet.state).toBe('possible');
    finger.takenByBrowser(20);
    expect(sheet.state).toBe('possible');
    // The browser scrolls the content to its top as the finger moves down.
    scrollTop = 10;
    finger.move(0, 120, 32);
    scrollTop = 0;
    finger.move(0, 130, 48); // content ran out at y = 130
    finger.move(0, 133, 64); // 3 px past: under the handoff slop
    expect(sheet.state).toBe('possible');
    finger.move(0, 140, 80); // 10 px past: the sheet takes the rest
    expect(sheet.state).toBe('began');
    expect(sheet.isHandoff).toBe(true);
    expect(sheet.translation()).toEqual({x: 0, y: 10});
    finger.move(0, 170, 96);
    expect(sheet.translation()).toEqual({x: 0, y: 40});
    // The finger comes back past the point: the translation clamps at zero
    // while the content scrolls again.
    finger.move(0, 125, 112);
    expect(sheet.translation()).toEqual({x: 0, y: 0});
    scrollTop = 5;
    finger.move(0, 120, 128);
    expect(sheet.translation()).toEqual({x: 0, y: 0});
    scrollTop = 0;
    // 5 px of content were left at y = 120, so they ran out at y = 125.
    finger.move(0, 150, 144);
    expect(sheet.translation()).toEqual({x: 0, y: 25});
    finger.up(160);
    expect(h.log.at(-2)).toBe('sheet:ended@160');
  });

  it('long press vs pan: holding still wins for the long press', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({name: 'press'});
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1).down(0, 0, 0, {recognizers: [press, pan]});
    h.advance(500);
    expect(h.log).toEqual(['press:began@500', 'pan:failed@500']);
    h.finger(1).move(80, 0, 600);
    expect(press.state).toBe('changed');
    expect(pan.state).toBe('failed');
    expect(h.claims).toEqual([1]);
  });

  it('long press vs pan: moving first wins for the pan', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({name: 'press'});
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1).down(0, 0, 0, {recognizers: [press, pan]});
    h.finger(1).move(5, 0, 100).move(12, 0, 120);
    expect(h.log).toEqual(['press:failed@120', 'pan:began@120']);
    h.advance(600);
    expect(press.state).toBe('failed');
  });

  it('pinch + pan recognize simultaneously when allowed', () => {
    const h = createHarness();
    const pinch = new PinchGestureRecognizer({name: 'pinch'});
    const pan = new PanGestureRecognizer({name: 'pan'});
    pinch.recognizeSimultaneouslyWith(pan);
    h.finger(1).down(100, 100, 0, {recognizers: [pinch, pan]});
    h.finger(2).down(200, 100, 0, {recognizers: [pinch, pan]});
    h.finger(1).move(80, 120, 16);
    h.finger(2).move(240, 120, 16);
    expect(h.log.slice(0, 2)).toEqual(['pinch:began@16', 'pan:began@16']);
    expect(pinch.scale).toBeCloseTo(1.6, 5);
    expect(pan.translation()).toEqual({x: 10, y: 20});
  });

  it('pinch vs pan without permission: the first to recognize wins', () => {
    const h = createHarness();
    const pinch = new PinchGestureRecognizer({name: 'pinch'});
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1).down(100, 100, 0, {recognizers: [pinch, pan]});
    h.finger(2).down(200, 100, 0, {recognizers: [pinch, pan]});
    h.finger(1).move(80, 120, 16);
    h.finger(2).move(240, 120, 16);
    expect(h.log.slice(0, 2)).toEqual(['pinch:began@16', 'pan:failed@16']);
  });

  it('edge pan vs inner pan: in the band the edge pan wins, elsewhere the inner pan runs undelayed', () => {
    const band = createHarness();
    const edge = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    const inner = new PanGestureRecognizer({
      name: 'inner',
      direction: 'horizontal',
    });
    inner.requireToFail(edge);
    band.finger(1).down(8, 300, 0, {recognizers: [inner, edge]});
    band.finger(1).drag(60, 2, 60, 6);
    expect(band.log.slice(0, 2)).toEqual(['edge:began@10', 'inner:failed@10']);

    const middle = createHarness();
    const edge2 = new ScreenEdgePanGestureRecognizer({name: 'edge'});
    const inner2 = new PanGestureRecognizer({
      name: 'inner',
      direction: 'horizontal',
    });
    inner2.requireToFail(edge2);
    middle.finger(1).down(150, 300, 0, {recognizers: [inner2, edge2]});
    // Failed at touch-down, before any movement: nothing waits on it.
    expect(middle.log).toEqual(['edge:failed@0']);
    middle.finger(1).drag(60, 2, 60, 6);
    expect(middle.log[1]).toBe('inner:began@10');
  });

  it('swipe vs pan: the pan wins by default, the swipe when the pan requires it to fail', () => {
    const plain = createHarness();
    const swipe = new SwipeGestureRecognizer({name: 'swipe'});
    const pan = new PanGestureRecognizer({name: 'pan'});
    plain
      .finger(1)
      .down(0, 0, 0, {recognizers: [swipe, pan]})
      .drag(80, 0, 60, 6);
    expect(plain.log.slice(0, 2)).toEqual(['pan:began@10', 'swipe:failed@10']);

    const ordered = createHarness();
    const swipe2 = new SwipeGestureRecognizer({name: 'swipe'});
    const pan2 = new PanGestureRecognizer({name: 'pan'});
    pan2.requireToFail(swipe2);
    ordered
      .finger(1)
      .down(0, 0, 0, {recognizers: [swipe2, pan2]})
      .drag(80, 0, 60, 8);
    expect(ordered.log.slice(0, 2)).toEqual([
      'swipe:ended@37.5',
      'pan:failed@37.5',
    ]);

    const slow = createHarness();
    const swipe3 = new SwipeGestureRecognizer({name: 'swipe'});
    const pan3 = new PanGestureRecognizer({name: 'pan'});
    pan3.requireToFail(swipe3);
    slow
      .finger(1)
      .down(0, 0, 0, {recognizers: [swipe3, pan3]})
      .drag(30, 0, 300, 3);
    expect(pan3.state).toBe('possible');
    slow.advance(500);
    // The swipe ran out of time; the waiting pan begins with what it has.
    expect(slow.log.slice(0, 2)).toEqual(['swipe:failed@500', 'pan:began@500']);
  });

  it('nested pans that both qualify on the same move: the innermost wins', () => {
    const h = createHarness();
    const inner = new PanGestureRecognizer({name: 'inner'});
    const outer = new PanGestureRecognizer({name: 'outer'});
    h.finger(1)
      .down(0, 0, 0, {recognizers: [inner, outer]})
      .move(20, 0, 16);
    expect(h.log).toEqual(['inner:began@16', 'outer:failed@16']);
  });

  it('a recognizer that is not involved holds nothing up', () => {
    const h = createHarness();
    const idle = new TapGestureRecognizer({name: 'idle'});
    const tap = new TapGestureRecognizer({name: 'tap'});
    tap.requireToFail(idle);
    h.finger(1).down(0, 0, 0, {recognizers: [tap]});
    h.finger(1).up(50);
    expect(h.log[0]).toBe('tap:ended@50');
  });

  it('honors shouldBegin and shouldReceiveTouch', () => {
    const h = createHarness();
    const refused = new PanGestureRecognizer({
      name: 'refused',
      shouldBegin: () => false,
    });
    const blind = new TapGestureRecognizer({
      name: 'blind',
      shouldReceiveTouch: () => false,
    });
    h.finger(1)
      .down(0, 0, 0, {recognizers: [refused, blind]})
      .move(30, 0, 16);
    expect(h.log).toEqual(['refused:failed@16']);
    expect(blind.numberOfTouches).toBe(0);
  });

  it('honors delegate failure requirements', () => {
    const h = createHarness();
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    const single = new TapGestureRecognizer({
      name: 'single',
      shouldRequireFailureOf: (_self, other) => other === double,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [single, double]});
    h.finger(1).up(50);
    expect(single.pending).toBe('ended');
  });

  it('two fingers on two unrelated views drive two pans at once', () => {
    const h = createHarness();
    const left = new PanGestureRecognizer({name: 'left'});
    const right = new PanGestureRecognizer({name: 'right'});
    h.finger(1).down(50, 300, 0, {recognizers: [left]});
    h.finger(2).down(300, 300, 0, {recognizers: [right]});
    h.finger(1).move(50, 340, 16);
    h.finger(2).move(300, 260, 16);
    expect(left.state).toBe('began');
    expect(right.state).toBe('began');
  });
});

describe('delivery to the view', () => {
  it('delivers an unclaimed touch to the consumer and allows its click', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const pan = new PanGestureRecognizer({name: 'pan'});
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [pan], consumer});
    finger.move(3, 0, 16);
    expect(finger.up(60)).toBe('allow');
    expect(consumer.events).toEqual(['began:1', 'moved:1', 'ended:1']);
  });

  it('cancels the view and swallows the click when a recognizer takes the touch', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const pan = new PanGestureRecognizer({name: 'pan'});
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [pan], consumer});
    finger.move(30, 0, 16).move(40, 0, 32);
    expect(consumer.events).toEqual(['began:1', 'cancelled:1']);
    expect(finger.up(60)).toBe('suppress');
  });

  it('keeps the view and the click with cancelsTouchesInView off', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const pan = new PanGestureRecognizer({
      name: 'pan',
      cancelsTouchesInView: false,
    });
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [pan], consumer});
    finger.move(30, 0, 16);
    expect(finger.up(60)).toBe('allow');
    expect(consumer.events).toEqual(['began:1', 'moved:1', 'ended:1']);
  });

  it('holds the began with delaysTouchesBegan until the recognizer fails', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const swipe = new SwipeGestureRecognizer({
      name: 'swipe',
      delaysTouchesBegan: true,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [swipe], consumer});
    expect(consumer.events).toEqual([]);
    h.advance(UIKIT_GESTURES.swipe.maximumDuration.value);
    expect(consumer.events).toEqual(['began:1']);
  });

  it('defers the click of a tap a double tap may still claim, then replays it', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [double], consumer});
    expect(finger.up(70)).toBe('defer');
    expect(consumer.events).toEqual(['began:1']);
    h.advance(70 + INTERVAL);
    expect(consumer.events).toEqual(['began:1', 'ended:1']);
    expect(h.deferredClicks).toEqual([
      {id: 1, allowed: true, time: 70 + INTERVAL},
    ]);
  });

  it('drops the deferred click when the double tap is recognized', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [double], consumer});
    h.finger(1).up(70);
    h.finger(2).down(1, 1, 150, {recognizers: [double], consumer});
    expect(h.finger(2).up(210)).toBe('suppress');
    expect(h.deferredClicks).toEqual([{id: 1, allowed: false, time: 210}]);
    expect(consumer.events).toEqual([
      'began:1',
      'began:2',
      'cancelled:1',
      'cancelled:2',
    ]);
  });

  it('cancels the view when the browser takes the touch', () => {
    const h = createHarness();
    const consumer = new RecordingConsumer();
    const tap = new TapGestureRecognizer({name: 'tap'});
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [tap], consumer});
    finger.takenByBrowser(30);
    expect(consumer.events).toEqual(['began:1', 'cancelled:1']);
    expect(h.log).toEqual(['tap:failed@30', 'tap:possible@30']);
  });

  it("lets a control veto an ancestor's single tap (UIControl's rule)", () => {
    const h = createHarness();
    const button = new PressTracker({getBounds: () => null, view: 'button'});
    const tap = new TapGestureRecognizer({name: 'tap'});
    tap.view = 'row';
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    double.view = 'row';
    h.finger(1).down(0, 0, 0, {recognizers: [tap, double], consumer: button});
    expect(h.finger(1).up(50)).toBe('defer');
    expect(h.log[0]).toBe('tap:failed@50');
    expect(double.state).toBe('possible');
  });
});

describe('cancellation', () => {
  it('a system cancel cancels an active gesture and fails a possible one', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({name: 'press'});
    const tap = new TapGestureRecognizer({name: 'tap'});
    h.finger(1).down(0, 0, 0, {recognizers: [press]});
    h.advance(500);
    h.finger(2).down(100, 0, 600, {recognizers: [tap]});
    h.arena.cancelled([1, 2], 650);
    expect(h.log).toEqual([
      'press:began@500',
      'press:cancelled@650',
      'tap:failed@650',
      'press:possible@650',
      'tap:possible@650',
    ]);
  });

  it('a long press cancelled before its duration never begins', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({name: 'press'});
    h.finger(1).down(0, 0, 0, {recognizers: [press]});
    h.finger(1).cancel(200);
    h.advance(1000);
    expect(h.log).toEqual(['press:failed@200', 'press:possible@200']);
  });

  it('stop() cancels an active recognizer from code', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(30, 0, 16);
    pan.cancel();
    expect(pan.state).toBe('cancelled');
    h.finger(1).move(60, 0, 32);
    expect(pan.state).toBe('cancelled');
    h.finger(1).up(48);
    expect(pan.state).toBe('possible');
  });

  it('never moves the event clock backwards', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1).down(0, 0, 100, {recognizers: [pan]});
    h.finger(1).move(30, 0, 90);
    expect(h.log).toEqual(['pan:began@100']);
  });
});
