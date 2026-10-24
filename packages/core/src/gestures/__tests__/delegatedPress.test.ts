// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file delegatedPress.test.ts
 * @input installPressAttribute on the jsdom document, and touch, pointer and
 *   scroll events with explicit timestamps
 * @output Delegated press tracking: the paint contract (on, fading, removed),
 *   innermost and disabled surfaces, the mouse left to CSS, cancellation by
 *   a recognizer, the scroll brake, counted installs, no per-row listeners
 * @position jsdom tests of packages/core/src/gestures/delegatedPress.ts
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {UIKIT_GESTURES} from '../../motion/uikit/gestures';
import {PRESS_FADE_MS} from '../../utils/pressGesture';
import {installPressAttribute} from '../delegatedPress';
import {getGestureHost} from '../GestureHost';
import {PanGestureRecognizer} from '../PanGestureRecognizer';

interface Contact {
  id: number;
  x: number;
  y: number;
}

function touch(
  type: 'touchstart' | 'touchmove' | 'touchend',
  target: EventTarget,
  contact: Contact,
  time: number,
): Event {
  const event = new Event(type, {bubbles: true, cancelable: true});
  const entry = {
    identifier: contact.id,
    clientX: contact.x,
    clientY: contact.y,
    target,
  };
  Object.defineProperty(event, 'changedTouches', {value: [entry]});
  Object.defineProperty(event, 'touches', {
    value: type === 'touchend' ? [] : [entry],
  });
  Object.defineProperty(event, 'timeStamp', {value: time});
  target.dispatchEvent(event);
  return event;
}

function mount(html: string): Record<string, HTMLElement> {
  document.body.innerHTML = html;
  const elements: Record<string, HTMLElement> = {};
  for (const element of document.querySelectorAll<HTMLElement>('[id]')) {
    elements[element.id] = element;
  }
  return elements;
}

let release: () => void = () => {};

beforeEach(() => {
  vi.useFakeTimers();
  release = installPressAttribute(document);
});

afterEach(() => {
  release();
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('installPressAttribute', () => {
  it('paints on in the same frame, fades on release, then clears', () => {
    const {row} = mount('<div id="row" data-astryx-pressable>Row</div>');
    touch('touchstart', row, {id: 1, x: 5, y: 5}, 0);
    expect(row.getAttribute('data-astryx-press')).toBe('on');
    touch('touchend', row, {id: 1, x: 5, y: 5}, 80);
    expect(row.getAttribute('data-astryx-press')).toBe('fading');
    vi.advanceTimersByTime(PRESS_FADE_MS);
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
  });

  it('lets the innermost surface take the press, and a disabled one paint nothing', () => {
    const {row, button, off} = mount(
      `<div id="row" data-astryx-pressable>
         <button id="button" data-astryx-pressable>Go</button>
         <button id="off" data-astryx-pressable disabled>No</button>
       </div>`,
    );
    touch('touchstart', button, {id: 1, x: 5, y: 5}, 0);
    expect(button.getAttribute('data-astryx-press')).toBe('on');
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
    touch('touchend', button, {id: 1, x: 5, y: 5}, 50);

    touch('touchstart', off, {id: 2, x: 5, y: 5}, 1000);
    expect(off.hasAttribute('data-astryx-press')).toBe(false);
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
    touch('touchend', off, {id: 2, x: 5, y: 5}, 1050);
  });

  it('leaves a mouse press to CSS :active', () => {
    const {row} = mount('<div id="row" data-astryx-pressable>Row</div>');
    row.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        pointerType: 'mouse',
        button: 0,
      }),
    );
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
  });

  it('removes the paint at once, with no fade, when a recognizer takes the touch', () => {
    const {row} = mount('<div id="row" data-astryx-pressable>Row</div>');
    const detach = getGestureHost(document).attach(
      row,
      new PanGestureRecognizer({direction: 'horizontal'}),
    );
    touch('touchstart', row, {id: 1, x: 5, y: 5}, 0);
    expect(row.getAttribute('data-astryx-press')).toBe('on');
    touch('touchmove', row, {id: 1, x: 40, y: 6}, 16);
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
    touch('touchend', row, {id: 1, x: 40, y: 6}, 32);
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
    detach();
  });

  it('paints nothing for a touch that brakes a list the finger set moving', () => {
    const {list, row} = mount(
      '<div id="list"><div id="row" data-astryx-pressable>Row</div></div>',
    );
    // A finger flicks the list, lifts; the list is still gliding.
    touch('touchstart', row, {id: 1, x: 5, y: 300}, 0);
    touch('touchend', row, {id: 1, x: 5, y: 100}, 60);
    vi.advanceTimersByTime(PRESS_FADE_MS);
    const scroll = new Event('scroll');
    Object.defineProperty(scroll, 'timeStamp', {value: 200});
    list.dispatchEvent(scroll);
    // The next touch, within the brake window, stops it and presses nothing.
    const brake = 200 + UIKIT_GESTURES.press.scrollBrake.value - 10;
    touch('touchstart', row, {id: 2, x: 5, y: 200}, brake);
    expect(row.hasAttribute('data-astryx-press')).toBe(false);
    touch('touchend', row, {id: 2, x: 5, y: 200}, brake + 50);
    // Past the window, a touch presses again.
    touch('touchstart', row, {id: 3, x: 5, y: 200}, brake + 1000);
    expect(row.getAttribute('data-astryx-press')).toBe('on');
    touch('touchend', row, {id: 3, x: 5, y: 200}, brake + 1050);
  });

  it('counts installs and adds no listener to the marked elements', () => {
    const second = installPressAttribute(document);
    const {row} = mount('<div id="row" data-astryx-pressable>Row</div>');
    const add = vi.spyOn(row, 'addEventListener');
    release();
    release = second;
    touch('touchstart', row, {id: 1, x: 5, y: 5}, 0);
    // Still installed: one install remains.
    expect(row.getAttribute('data-astryx-press')).toBe('on');
    touch('touchend', row, {id: 1, x: 5, y: 5}, 40);
    // The only listeners a touch adds are the finger's own, removed with it.
    const types = add.mock.calls.map(call => call[0]);
    expect(types.every(type => type.startsWith('touch'))).toBe(true);
  });
});
