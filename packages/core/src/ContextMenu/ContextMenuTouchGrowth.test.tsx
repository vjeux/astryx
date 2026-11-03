// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ContextMenuTouchGrowth.test.tsx
 * @input ContextMenu under a finger in jsdom, with the compositor animator
 *   replaced
 * @output Checks that the trigger grows only while ContextMenu's recognizer
 *   follows a finger, and springs back when the recognizer fails
 * @position Unit tests of the press feedback's start and end in
 *   packages/core/src/ContextMenu/ContextMenuTouchLayer.tsx
 */

import {act, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import type {MotionCurve} from '../motion/animator';
import {PRESSED_ATTRIBUTE} from '../utils/pressFeedback';
import {ContextMenu} from './ContextMenu';

const animator = vi.hoisted(() => ({
  elements: [] as HTMLElement[],
  play: vi.fn(),
  animate: vi.fn(),
}));

vi.mock('../motion/animator', async importOriginal => {
  const original = await importOriginal<object>();
  return {
    ...original,
    createMotionAnimator: (element: HTMLElement) => {
      animator.elements.push(element);
      const pending = () => ({finished: new Promise<boolean>(() => {})});
      return {
        element,
        play: (...args: unknown[]) => {
          animator.play(element, ...args);
          return pending();
        },
        animate: (...args: unknown[]) => {
          animator.animate(element, ...args);
          return pending();
        },
        stop: () => {},
        dispose: () => {},
        get: () => 1,
        getVelocity: () => 0,
        reducedMotion: () => 'off',
      };
    },
  };
});

interface Contact {
  id: number;
  x: number;
  y: number;
}

function dispatchTouch(
  type: 'touchstart' | 'touchend',
  target: EventTarget,
  changed: Contact[],
  all: Contact[],
) {
  const event = new Event(type, {bubbles: true, cancelable: true});
  const toTouch = (contact: Contact) => ({
    identifier: contact.id,
    clientX: contact.x,
    clientY: contact.y,
    target,
  });
  Object.defineProperty(event, 'changedTouches', {value: changed.map(toTouch)});
  Object.defineProperty(event, 'touches', {value: all.map(toTouch)});
  Object.defineProperty(event, 'timeStamp', {value: performance.now()});
  target.dispatchEvent(event);
}

const advance = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

/** The press machine's "on", as core's press machine writes it. */
async function pressMachineOn(trigger: HTMLElement) {
  trigger.setAttribute(PRESSED_ATTRIBUTE, 'on');
  await act(async () => {});
}

// The gesture host remembers the latest event time, and each install of fake
// timers restarts `performance.now()` near 0. So every case moves the clock on.
let clockEpoch = 0;

describe('ContextMenu’s growth under a finger', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === '(pointer: coarse)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'performance',
        'Date',
      ],
    });
    clockEpoch += 100_000;
    vi.advanceTimersByTime(clockEpoch);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    animator.elements.length = 0;
  });

  function renderMenu() {
    render(
      <ContextMenu items={[{label: 'Item 1'}]} data-testid="ctx">
        <div>Hold me</div>
      </ContextMenu>,
    );
    return screen.getByTestId('ctx');
  }

  const scaleBack = (trigger: HTMLElement) =>
    animator.play.mock.calls.filter(([element, curves]) => {
      const scale = (curves as {scale?: MotionCurve}).scale;
      return element === trigger && scale?.at(scale.duration) === 1;
    });

  it('springs a grown trigger back when the finger lifts before the commit', async () => {
    const trigger = renderMenu();
    const contact = {id: 1, x: 20, y: 20};
    dispatchTouch('touchstart', trigger, [contact], [contact]);
    advance(150);
    await pressMachineOn(trigger);
    expect(animator.play.mock.calls.some(([e]) => e === trigger)).toBe(true);
    advance(100);
    dispatchTouch('touchend', trigger, [contact], []);
    expect(scaleBack(trigger)).toHaveLength(1);
  });

  it('does not grow the trigger for a press its recognizer does not follow, such as a mouse', async () => {
    const trigger = renderMenu();
    await pressMachineOn(trigger);
    expect(animator.play.mock.calls.some(([e]) => e === trigger)).toBe(false);
  });
});
