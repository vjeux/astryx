// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file recognizers.test.ts
 * @input The recognizers and a GestureArena driven by synthetic touches with
 *   explicit timestamps
 * @output Each recognizer's state machine: when it begins, changes, ends,
 *   fails and resets, to the millisecond and the pixel
 * @position Unit tests of packages/core/src/gestures
 */

import {describe, expect, it} from 'vitest';
import {UIKIT_GESTURES} from '../../motion/uikit/gestures';
import {HoverGestureRecognizer} from '../HoverGestureRecognizer';
import {LongPressGestureRecognizer} from '../LongPressGestureRecognizer';
import {PanGestureRecognizer} from '../PanGestureRecognizer';
import {PinchGestureRecognizer} from '../PinchGestureRecognizer';
import {RotationGestureRecognizer} from '../RotationGestureRecognizer';
import {ScreenEdgePanGestureRecognizer} from '../ScreenEdgePanGestureRecognizer';
import {SwipeGestureRecognizer} from '../SwipeGestureRecognizer';
import {TapGestureRecognizer} from '../TapGestureRecognizer';
import {createHarness} from './harness';

describe('TapGestureRecognizer', () => {
  it('recognizes a single tap at the lift', () => {
    const h = createHarness();
    const tap = new TapGestureRecognizer({name: 'tap'});
    const actions: string[] = [];
    tap.addListener(r => actions.push(`${r.state}@${h.arena.now()}`));
    h.finger(1)
      .down(100, 100, 0, {recognizers: [tap]})
      .move(103, 101, 40);
    expect(tap.state).toBe('possible');
    h.finger(1).up(80, 103, 101);
    expect(actions).toEqual(['ended@80']);
    expect(h.log).toEqual(['tap:ended@80', 'tap:possible@80']);
    expect(tap.location()).toEqual({x: 103, y: 101});
  });

  it('fails once a finger travels past the allowable movement', () => {
    const h = createHarness();
    const tap = new TapGestureRecognizer({name: 'tap'});
    const allowed = UIKIT_GESTURES.tap.allowableMovement.value;
    h.finger(1)
      .down(0, 0, 0, {recognizers: [tap]})
      .move(allowed, 0, 16);
    expect(tap.state).toBe('possible');
    h.finger(1).move(allowed + 0.5, 0, 32);
    expect(tap.state).toBe('failed');
    h.finger(1).up(48);
    expect(h.log).toEqual(['tap:failed@32', 'tap:possible@48']);
  });

  it('fails when more fingers land than required, and taps with two', () => {
    const h = createHarness();
    const one = new TapGestureRecognizer({name: 'one'});
    const two = new TapGestureRecognizer({
      name: 'two',
      numberOfTouchesRequired: 2,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [one, two]});
    h.finger(2).down(40, 0, 20, {recognizers: [one, two]});
    expect(one.state).toBe('failed');
    h.finger(1).up(60);
    expect(two.state).toBe('possible');
    h.finger(2).up(70);
    expect(h.log).toEqual([
      'one:failed@20',
      'two:ended@70',
      'one:possible@70',
      'two:possible@70',
    ]);
  });

  it('recognizes a double tap inside the interval and fails outside it', () => {
    const interval = UIKIT_GESTURES.tap.maximumIntervalBetweenTaps.value;
    const h = createHarness();
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [double]});
    h.finger(1).up(60);
    expect(double.state).toBe('possible');
    expect(double.completedTaps).toBe(1);
    h.finger(2).down(4, 2, 60 + interval - 1, {recognizers: [double]});
    h.finger(2).up(60 + interval + 50);
    expect(h.log).toEqual([
      `double:ended@${60 + interval + 50}`,
      `double:possible@${60 + interval + 50}`,
    ]);

    const late = createHarness();
    const slow = new TapGestureRecognizer({
      name: 'slow',
      numberOfTapsRequired: 2,
    });
    late.finger(1).down(0, 0, 0, {recognizers: [slow]});
    late.finger(1).up(60);
    late.finger(2).down(0, 0, 60 + interval + 1, {recognizers: [slow]});
    // The interval timer fired at its own deadline, before the late touch.
    expect(late.log[0]).toBe(`slow:failed@${60 + interval}`);
  });

  it('fails a second tap that lands too far from the first', () => {
    const h = createHarness();
    const double = new TapGestureRecognizer({
      name: 'double',
      numberOfTapsRequired: 2,
    });
    const separation = UIKIT_GESTURES.tap.allowableSeparation.value;
    h.finger(1).down(0, 0, 0, {recognizers: [double]});
    h.finger(1).up(50);
    h.finger(2).down(separation + 1, 0, 100, {recognizers: [double]});
    expect(double.state).toBe('failed');
  });

  it('fails a hold past a finite maximum tap duration', () => {
    const h = createHarness();
    const tap = new TapGestureRecognizer({
      name: 'tap',
      maximumTapDuration: 400,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [tap]});
    h.advance(399);
    expect(tap.state).toBe('possible');
    h.advance(400);
    expect(tap.state).toBe('failed');
  });
});

describe('LongPressGestureRecognizer', () => {
  it('begins at exactly touch-down + 500 ms even when the next input is late', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({name: 'press'});
    h.finger(1).down(50, 50, 1000, {recognizers: [press]});
    // The main thread was blocked: the next thing processed is a move at
    // t = 1900. The press began at 1500, before that move.
    h.finger(1).move(80, 50, 1900);
    expect(press.beganAt).toBe(1500);
    expect(h.log).toEqual(['press:began@1500', 'press:changed@1900']);
    h.finger(1).up(2000);
    expect(h.log.slice(2)).toEqual(['press:ended@2000', 'press:possible@2000']);
  });

  it('uses UIKit defaults and allows unlimited movement after it began', () => {
    const press = new LongPressGestureRecognizer();
    expect(press.minimumPressDuration).toBe(500);
    expect(press.allowableMovement).toBe(10);
    const h = createHarness();
    h.finger(1).down(0, 0, 0, {recognizers: [press]});
    h.advance(500);
    expect(press.state).toBe('began');
    h.finger(1).move(300, 300, 600);
    expect(press.state).toBe('changed');
    expect(press.location()).toEqual({x: 300, y: 300});
  });

  it('measures the movement tolerance as a distance, not per axis', () => {
    const inside = createHarness();
    const a = new LongPressGestureRecognizer({name: 'a'});
    inside
      .finger(1)
      .down(0, 0, 0, {recognizers: [a]})
      .move(7, 7, 100);
    expect(a.state).toBe('possible');
    const outside = createHarness();
    const b = new LongPressGestureRecognizer({name: 'b'});
    outside
      .finger(1)
      .down(0, 0, 0, {recognizers: [b]})
      .move(7.2, 7.2, 100);
    expect(b.state).toBe('failed');
  });

  it('fails on a lift before the duration', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({name: 'press'});
    h.finger(1).down(0, 0, 0, {recognizers: [press]});
    h.finger(1).up(499);
    expect(h.log).toEqual(['press:failed@499', 'press:possible@499']);
    h.advance(600);
    expect(h.log).toHaveLength(2);
  });

  it('supports a tap before the press (numberOfTapsRequired)', () => {
    const h = createHarness();
    const press = new LongPressGestureRecognizer({
      name: 'press',
      numberOfTapsRequired: 1,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [press]});
    h.finger(1).up(80);
    h.finger(2).down(2, 0, 200, {recognizers: [press]});
    h.advance(700);
    expect(press.state).toBe('began');
  });
});

describe('PanGestureRecognizer', () => {
  it('begins past the hysteresis with the translation since touch-down', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    const hysteresis = UIKIT_GESTURES.pan.hysteresis.value;
    h.finger(1).down(100, 100, 0, {recognizers: [pan]});
    h.finger(1).move(100 + hysteresis - 0.1, 100, 16);
    expect(pan.state).toBe('possible');
    h.finger(1).move(100 + hysteresis + 2, 100, 32);
    expect(pan.state).toBe('began');
    expect(pan.translation()).toEqual({x: hysteresis + 2, y: 0});
    expect(pan.beganTranslation).toEqual({x: hysteresis + 2, y: 0});
    h.finger(1).move(150, 120, 48);
    expect(pan.state).toBe('changed');
    expect(pan.translation()).toEqual({x: 50, y: 20});
  });

  it('ends with the release velocity in px/s', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    let releaseVelocity = {x: 0, y: 0};
    pan.addListener(r => {
      if (r.state === 'ended') {
        releaseVelocity = r.velocity();
      }
    });
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [pan]});
    // 1 px/ms = 1000 px/s, sampled every 8 ms.
    for (let t = 8; t <= 160; t += 8) {
      finger.move(t, 0, t);
    }
    finger.up(168);
    expect(releaseVelocity.x).toBeCloseTo(1000, 0);
    expect(releaseVelocity.y).toBeCloseTo(0, 5);
  });

  it('reports no velocity when the finger rested before lifting', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    let releaseVelocity = {x: -1, y: -1};
    pan.addListener(r => {
      if (r.state === 'ended') {
        releaseVelocity = r.velocity();
      }
    });
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [pan]});
    finger.drag(200, 0, 100, 10);
    finger.up(100 + UIKIT_GESTURES.velocity.assumeStopped.value + 1);
    expect(releaseVelocity).toEqual({x: 0, y: 0});
  });

  it('fails a drag against its direction', () => {
    const vertical = createHarness();
    const horizontal = new PanGestureRecognizer({
      name: 'h',
      direction: 'horizontal',
    });
    vertical
      .finger(1)
      .down(0, 0, 0, {recognizers: [horizontal]})
      .drag(3, 20, 50);
    expect(horizontal.state).toBe('failed');

    const up = createHarness();
    const down = new PanGestureRecognizer({name: 'down', direction: 'down'});
    up.finger(1)
      .down(0, 100, 0, {recognizers: [down]})
      .drag(0, -30, 50);
    expect(down.state).toBe('failed');
  });

  it('waits between the lines of an axisRatio above 1, and fails past the diagonal', () => {
    const begin = createHarness();
    const pan = new PanGestureRecognizer({
      name: 'pan',
      direction: 'vertical',
      axisRatio: 2,
    });
    begin
      .finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(8, 12, 16);
    expect(pan.state).toBe('possible'); // 12 is not more than 2 x 8
    begin.finger(1).move(8, 17, 32);
    expect(pan.state).toBe('began'); // 17 > 16

    const diagonal = createHarness();
    const side = new PanGestureRecognizer({
      name: 'side',
      direction: 'vertical',
      axisRatio: 2,
    });
    diagonal
      .finger(1)
      .down(0, 0, 0, {recognizers: [side]})
      .move(10, 9, 16);
    expect(side.state).toBe('failed'); // more across than along
  });

  it('claims drags up to atan(1 / axisRatio) off its axis below 1', () => {
    const steep = createHarness();
    const pan = new PanGestureRecognizer({
      name: 'pan',
      direction: 'horizontal',
      axisRatio: 0.5,
    });
    // 60 degrees off horizontal: 10 across 17 along y; 10 > 0.5 x 17.
    steep
      .finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(10, 17, 16);
    expect(pan.state).toBe('began');

    const steeper = createHarness();
    const other = new PanGestureRecognizer({
      name: 'other',
      direction: 'horizontal',
      axisRatio: 0.5,
    });
    // 68 degrees: 8 < 0.5 x 20.
    steeper
      .finger(1)
      .down(0, 0, 0, {recognizers: [other]})
      .move(8, 20, 16);
    expect(other.state).toBe('failed');
  });

  it('decides the sign of a one-way pan once its axis is decided', () => {
    const h = createHarness();
    const down = new PanGestureRecognizer({
      name: 'down',
      direction: 'down',
      axisRatio: 1.2,
    });
    // 9 along, 8 across: not 1.2 times more, not less either: wait.
    h.finger(1)
      .down(0, 100, 0, {recognizers: [down]})
      .move(8, 109, 16);
    expect(down.state).toBe('possible');
    // The axis is now clearly vertical, and the movement is up.
    h.finger(1).move(8, 70, 32);
    expect(down.state).toBe('failed');
  });

  it('locks to the dominant axis when asked', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan', lockAxis: true});
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(12, 4, 16)
      .move(40, 30, 32);
    expect(pan.lockedAxis).toBe('x');
    expect(pan.translation()).toEqual({x: 40, y: 0});
  });

  it('ignores a second finger once moving, so it never breaks the first', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({
      name: 'pan',
      maximumNumberOfTouches: 1,
    });
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(20, 0, 16);
    expect(pan.state).toBe('began');
    h.finger(2).down(200, 200, 30, {recognizers: [pan]});
    expect(pan.numberOfTouches).toBe(1);
    h.finger(2).move(260, 260, 40);
    h.finger(1).move(30, 0, 48);
    expect(pan.translation()).toEqual({x: 30, y: 0});
    h.finger(2).up(60);
    expect(pan.state).toBe('changed');
    h.finger(1).up(70);
    expect(pan.state).toBe('possible');
    expect(h.log).toContain('pan:ended@70');
  });

  it('fails when a second finger lands before it began', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({
      name: 'pan',
      maximumNumberOfTouches: 1,
    });
    h.finger(1).down(0, 0, 0, {recognizers: [pan]});
    h.finger(2).down(50, 0, 10, {recognizers: [pan]});
    expect(pan.state).toBe('failed');
  });

  it('keeps the translation continuous when fingers join and leave', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(30, 0, 16);
    expect(pan.translation()).toEqual({x: 30, y: 0});
    // A second finger far away moves the centroid by 100 px: no jump.
    h.finger(2).down(230, 0, 20, {recognizers: [pan]});
    expect(pan.translation()).toEqual({x: 30, y: 0});
    h.finger(1).move(40, 0, 32);
    h.finger(2).move(240, 0, 32);
    expect(pan.translation()).toEqual({x: 40, y: 0});
    h.finger(2).up(40);
    expect(pan.translation()).toEqual({x: 40, y: 0});
    h.finger(1).move(50, 0, 48);
    expect(pan.translation()).toEqual({x: 50, y: 0});
  });

  it('waits for the minimum number of touches', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({
      name: 'pan',
      minimumNumberOfTouches: 2,
    });
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(40, 0, 16);
    expect(pan.state).toBe('possible');
    h.finger(2).down(100, 0, 20, {recognizers: [pan]});
    h.finger(1).move(60, 0, 32);
    expect(pan.state).toBe('began');
    expect(h.log).toEqual(['pan:began@32']);
  });

  it('can re-base its translation (setTranslation)', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(30, 0, 16);
    pan.setTranslation({x: 0, y: 0});
    h.finger(1).move(35, 2, 32);
    expect(pan.translation()).toEqual({x: 5, y: 2});
  });

  it('is cancelled by the system', () => {
    const h = createHarness();
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1)
      .down(0, 0, 0, {recognizers: [pan]})
      .move(30, 0, 16);
    h.finger(1).cancel(32);
    expect(h.log).toEqual([
      'pan:began@16',
      'pan:cancelled@32',
      'pan:possible@32',
    ]);
  });
});

describe('SwipeGestureRecognizer', () => {
  it('is recognized during the motion, once the distance is covered', () => {
    const h = createHarness();
    const swipe = new SwipeGestureRecognizer({name: 'swipe'});
    const finger = h.finger(1).down(0, 0, 0, {recognizers: [swipe]});
    finger.move(30, 2, 30);
    expect(swipe.state).toBe('possible');
    finger.move(50, 4, 50);
    expect(swipe.recognizedDirection).toBe('right');
    expect(h.log[0]).toBe('swipe:ended@50');
  });

  it('fails when too slow, off-axis, or the wrong way', () => {
    const slow = createHarness();
    const a = new SwipeGestureRecognizer({name: 'a'});
    slow
      .finger(1)
      .down(0, 0, 0, {recognizers: [a]})
      .move(30, 0, 400);
    slow.advance(500);
    expect(a.state).toBe('failed');

    const diagonal = createHarness();
    const b = new SwipeGestureRecognizer({name: 'b'});
    diagonal
      .finger(1)
      .down(0, 0, 0, {recognizers: [b]})
      .move(45, 40, 60);
    expect(b.state).toBe('failed');

    const wrong = createHarness();
    const c = new SwipeGestureRecognizer({name: 'c', direction: 'left'});
    wrong
      .finger(1)
      .down(100, 0, 0, {recognizers: [c]})
      .move(160, 0, 60);
    expect(c.state).toBe('failed');
  });

  it('takes several directions and fingers', () => {
    const h = createHarness();
    const swipe = new SwipeGestureRecognizer({
      name: 'swipe',
      direction: ['up', 'down'],
      numberOfTouchesRequired: 2,
    });
    h.finger(1).down(0, 200, 0, {recognizers: [swipe]});
    h.finger(2).down(40, 200, 5, {recognizers: [swipe]});
    h.finger(1).move(0, 140, 50);
    h.finger(2).move(40, 140, 50);
    expect(swipe.recognizedDirection).toBe('up');
  });
});

describe('PinchGestureRecognizer', () => {
  it('begins after the hysteresis and reports scale and velocity', () => {
    const h = createHarness();
    const pinch = new PinchGestureRecognizer({name: 'pinch'});
    h.finger(1).down(100, 100, 0, {recognizers: [pinch]});
    h.finger(2).down(200, 100, 0, {recognizers: [pinch]});
    h.finger(2).move(205, 100, 16);
    expect(pinch.state).toBe('possible');
    h.finger(2).move(210, 100, 32);
    expect(pinch.state).toBe('began');
    expect(pinch.scale).toBeCloseTo(1.1, 5);
    for (let t = 48; t <= 160; t += 16) {
      h.finger(2).move(210 + (t - 32) * 0.1, 100, t);
    }
    expect(pinch.velocity).toBeCloseTo(1, 1); // 0.1 px/ms over 100 px
    h.finger(1).up(170);
    expect(h.log).toContain('pinch:ended@170');
  });

  it('ignores a third finger and can be re-based', () => {
    const h = createHarness();
    const pinch = new PinchGestureRecognizer({name: 'pinch'});
    h.finger(1).down(0, 0, 0, {recognizers: [pinch]});
    h.finger(2).down(100, 0, 0, {recognizers: [pinch]});
    h.finger(3).down(50, 50, 5, {recognizers: [pinch]});
    expect(pinch.numberOfTouches).toBe(2);
    h.finger(2).move(150, 0, 16);
    pinch.scale = 1;
    h.finger(2).move(300, 0, 32);
    expect(pinch.scale).toBeCloseTo(2, 5);
  });
});

describe('RotationGestureRecognizer', () => {
  it('begins after the hysteresis and unwraps past half a turn', () => {
    const h = createHarness();
    const rotation = new RotationGestureRecognizer({name: 'rotation'});
    h.finger(1).down(0, 0, 0, {recognizers: [rotation]});
    h.finger(2).down(100, 0, 0, {recognizers: [rotation]});
    const at = (angle: number, time: number) =>
      h.finger(2).move(100 * Math.cos(angle), 100 * Math.sin(angle), time);
    at((3 * Math.PI) / 180, 16);
    expect(rotation.state).toBe('possible');
    at((6 * Math.PI) / 180, 32);
    expect(rotation.state).toBe('began');
    let time = 32;
    for (let degrees = 30; degrees <= 270; degrees += 30) {
      time += 16;
      at((degrees * Math.PI) / 180, time);
    }
    expect(rotation.rotation).toBeCloseTo((270 * Math.PI) / 180, 5);
    expect(rotation.velocity).toBeGreaterThan(0);
  });
});

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
});

describe('HoverGestureRecognizer', () => {
  it('begins on enter, changes on move and ends on exit', () => {
    const hover = new HoverGestureRecognizer();
    const states: string[] = [];
    hover.addListener(r => states.push(r.state));
    hover.hoverEntered({x: 1, y: 1}, 'mouse');
    hover.hoverMoved({x: 2, y: 2});
    hover.hoverExited({x: 3, y: 3});
    expect(states).toEqual(['began', 'changed', 'ended']);
    expect(hover.state).toBe('possible');
    expect(hover.claimsTouches).toBe(false);
  });
});
