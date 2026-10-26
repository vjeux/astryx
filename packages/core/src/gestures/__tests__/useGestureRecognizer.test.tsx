// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useGestureRecognizer.test.tsx
 * @input React components using useGestureRecognizer / usePressTracker, and
 *   touch events dispatched on their elements
 * @output The hooks keep one recognizer per component, attach before the
 *   first touch, run the latest listener without rendering per move, and
 *   detach on unmount
 * @position jsdom tests of packages/core/src/gestures/useGestureRecognizer.ts
 */

import {act, render} from '@testing-library/react';
import {useRef} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {getGestureHost} from '../GestureHost';
import {PanGestureRecognizer} from '../PanGestureRecognizer';
import type {ControlEvent} from '../PressTracker';
import {useGestureRecognizer, usePressTracker} from '../useGestureRecognizer';
import {coarsePrimaryPointer} from './harness';

function touch(
  type: string,
  target: EventTarget,
  contact: {id: number; x: number; y: number},
  time: number,
  isLift = false,
): void {
  const event = new Event(type, {bubbles: true, cancelable: true});
  const entry = {
    identifier: contact.id,
    clientX: contact.x,
    clientY: contact.y,
    target,
  };
  Object.defineProperty(event, 'changedTouches', {value: [entry]});
  Object.defineProperty(event, 'touches', {value: isLift ? [] : [entry]});
  Object.defineProperty(event, 'timeStamp', {value: time});
  target.dispatchEvent(event);
}

let renders = 0;

function Draggable({
  onPan,
  onRecognizer,
  isEnabled = true,
}: {
  onPan: (recognizer: PanGestureRecognizer) => void;
  onRecognizer?: (recognizer: PanGestureRecognizer) => void;
  isEnabled?: boolean;
}) {
  renders += 1;
  const ref = useRef<HTMLDivElement>(null);
  const pan = useGestureRecognizer(
    ref,
    () => new PanGestureRecognizer({direction: 'horizontal'}),
    onPan,
    {isEnabled},
  );
  onRecognizer?.(pan);
  return <div data-testid="surface" ref={ref} />;
}

// A phone: the document's host listens only where the pointer is coarse.
let restorePointer: () => void = () => {};
beforeEach(() => {
  restorePointer = coarsePrimaryPointer();
});
afterEach(() => {
  restorePointer();
});

describe('useGestureRecognizer', () => {
  afterEach(() => {
    renders = 0;
  });

  it('drives the latest listener with no render per move', () => {
    const seen: string[] = [];
    const {getByTestId} = render(
      <Draggable
        onPan={recognizer => {
          seen.push(`${recognizer.state}:${recognizer.translation().x}`);
        }}
      />,
    );
    const surface = getByTestId('surface');
    expect(renders).toBe(1);
    touch('touchstart', surface, {id: 1, x: 0, y: 0}, 0);
    for (let x = 6; x <= 36; x += 6) {
      touch('touchmove', surface, {id: 1, x, y: 0}, x * 2);
    }
    touch('touchend', surface, {id: 1, x: 36, y: 0}, 80, true);
    // The 10 px hysteresis is left out of the translation, as in UIKit.
    expect(seen).toEqual([
      'began:2',
      'changed:8',
      'changed:14',
      'changed:20',
      'changed:26',
      'ended:26',
    ]);
    expect(renders).toBe(1);
  });

  it('keeps one recognizer across renders and reads the newest listener', () => {
    const identities = new Set<PanGestureRecognizer>();
    const first = vi.fn();
    const second = vi.fn();
    const {getByTestId, rerender} = render(
      <Draggable onPan={first} onRecognizer={r => identities.add(r)} />,
    );
    rerender(
      <Draggable onPan={second} onRecognizer={r => identities.add(r)} />,
    );
    expect(identities.size).toBe(1);
    const surface = getByTestId('surface');
    touch('touchstart', surface, {id: 2, x: 0, y: 0}, 0);
    touch('touchmove', surface, {id: 2, x: 30, y: 0}, 16);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    touch('touchend', surface, {id: 2, x: 30, y: 0}, 32, true);
  });

  it('cancels a gesture in flight when it is disabled', () => {
    const states: string[] = [];
    const {getByTestId, rerender} = render(
      <Draggable onPan={r => states.push(r.state)} />,
    );
    const surface = getByTestId('surface');
    touch('touchstart', surface, {id: 3, x: 0, y: 0}, 0);
    touch('touchmove', surface, {id: 3, x: 30, y: 0}, 16);
    act(() => {
      rerender(
        <Draggable onPan={r => states.push(r.state)} isEnabled={false} />,
      );
    });
    expect(states).toEqual(['began', 'cancelled']);
    touch('touchend', surface, {id: 3, x: 30, y: 0}, 32, true);
  });

  it('attaches nothing while disabled: no touch-action, no gesture (FR24)', () => {
    const states: string[] = [];
    const {getByTestId, rerender} = render(
      <Draggable onPan={r => states.push(r.state)} />,
    );
    const surface = getByTestId('surface');
    const remove = vi.spyOn(surface.style, 'removeProperty');
    act(() => {
      rerender(
        <Draggable onPan={r => states.push(r.state)} isEnabled={false} />,
      );
    });
    // Disabling detaches: the host gives the element its touch-action back.
    expect(remove).toHaveBeenCalledWith('touch-action');
    touch('touchstart', surface, {id: 6, x: 0, y: 0}, 0);
    touch('touchmove', surface, {id: 6, x: 30, y: 0}, 16);
    touch('touchend', surface, {id: 6, x: 30, y: 0}, 32, true);
    expect(states).toEqual([]);
    act(() => {
      rerender(<Draggable onPan={r => states.push(r.state)} />);
    });
    touch('touchstart', surface, {id: 8, x: 0, y: 0}, 100);
    touch('touchmove', surface, {id: 8, x: 30, y: 0}, 116);
    expect(states).toContain('began');
    touch('touchend', surface, {id: 8, x: 30, y: 0}, 132, true);
  });

  it('follows the element behind the ref when it is replaced (INV6)', () => {
    const states: string[] = [];
    function Swapped({id}: {id: string}) {
      const ref = useRef<HTMLDivElement>(null);
      useGestureRecognizer(
        ref,
        () => new PanGestureRecognizer({direction: 'horizontal'}),
        r => states.push(r.state),
      );
      return <div key={id} data-testid={id} ref={ref} />;
    }
    const {getByTestId, rerender} = render(<Swapped id="first" />);
    act(() => {
      rerender(<Swapped id="second" />);
    });
    const second = getByTestId('second');
    touch('touchstart', second, {id: 9, x: 0, y: 0}, 0);
    touch('touchmove', second, {id: 9, x: 30, y: 0}, 16);
    expect(states).toContain('began');
    touch('touchend', second, {id: 9, x: 30, y: 0}, 32, true);
  });

  it('calls nothing back when the element unmounts mid-gesture: the cancel runs in an Effect cleanup (react-component-runtime INV2, INV3)', () => {
    const states: string[] = [];
    // A listener of the recognizer's own, outside the hook, hears the cancel.
    const heard: string[] = [];
    const {getByTestId, unmount} = render(
      <Draggable
        onPan={r => states.push(r.state)}
        onRecognizer={r => {
          if (heard.length === 0) {
            heard.push('attached');
            r.addListener(current => heard.push(current.state));
          }
        }}
      />,
    );
    const surface = getByTestId('surface');
    touch('touchstart', surface, {id: 9, x: 0, y: 0}, 0);
    touch('touchmove', surface, {id: 9, x: 30, y: 0}, 16);
    expect(states).toEqual(['began']);
    unmount();
    expect(heard).toContain('cancelled');
    expect(states).toEqual(['began']);
  });

  it('detaches on unmount', () => {
    const onPan = vi.fn();
    const {getByTestId, unmount} = render(<Draggable onPan={onPan} />);
    const surface = getByTestId('surface');
    const remove = vi.spyOn(surface.style, 'removeProperty');
    unmount();
    expect(remove).toHaveBeenCalledWith('touch-action');
    touch('touchstart', surface, {id: 4, x: 0, y: 0}, 0);
    touch('touchmove', surface, {id: 4, x: 30, y: 0}, 16);
    expect(onPan).not.toHaveBeenCalled();
  });
});

function Button({
  onEvent,
  isDisabled = false,
}: {
  onEvent: (event: ControlEvent) => void;
  isDisabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  usePressTracker(ref, {
    onControlEvent: event => onEvent(event),
    isEnabled: () => !isDisabled,
  });
  return (
    <button data-testid="button" ref={ref} type="button">
      Go
    </button>
  );
}

describe('usePressTracker', () => {
  it('gives the host no listener while the control is disabled (FR24)', () => {
    const add = vi.spyOn(document, 'addEventListener');
    const remove = vi.spyOn(document, 'removeEventListener');
    const {rerender, unmount} = render(
      <Button onEvent={() => {}} isDisabled />,
    );
    const added = () =>
      add.mock.calls.filter(([type]) => type === 'touchstart').length;
    expect(added()).toBe(0);
    rerender(<Button onEvent={() => {}} />);
    expect(added()).toBe(1);
    rerender(<Button onEvent={() => {}} isDisabled />);
    expect(
      remove.mock.calls.filter(([type]) => type === 'touchstart').length,
    ).toBe(1);
    unmount();
    add.mockRestore();
    remove.mockRestore();
  });

  it('reports UIControl events for a tap', () => {
    const events: ControlEvent[] = [];
    const {getByTestId} = render(
      <Button onEvent={event => events.push(event)} />,
    );
    const button = getByTestId('button');
    touch('touchstart', button, {id: 5, x: 1, y: 1}, 0);
    touch('touchend', button, {id: 5, x: 1, y: 1}, 50, true);
    expect(events).toEqual(['touchDown', 'touchUpInside']);
  });

  it('tracks the element behind the ref when it is replaced (INV6)', () => {
    const events: ControlEvent[] = [];
    function Swapped({id}: {id: string}) {
      const ref = useRef<HTMLButtonElement>(null);
      usePressTracker(ref, {onControlEvent: event => events.push(event)});
      return <button key={id} data-testid={id} ref={ref} type="button" />;
    }
    const {getByTestId, rerender} = render(<Swapped id="first" />);
    act(() => {
      rerender(<Swapped id="second" />);
    });
    const second = getByTestId('second');
    touch('touchstart', second, {id: 10, x: 1, y: 1}, 0);
    touch('touchend', second, {id: 10, x: 1, y: 1}, 50, true);
    expect(events).toEqual(['touchDown', 'touchUpInside']);
  });

  it('applies option changes from its next read, keeping the press in progress', () => {
    const events: ControlEvent[] = [];
    function Tracked({
      cancelTravel,
      trackingExpansion,
    }: {
      cancelTravel?: number;
      trackingExpansion?: number;
    }) {
      const ref = useRef<HTMLButtonElement>(null);
      usePressTracker(ref, {
        onControlEvent: event => events.push(event),
        cancelTravel,
        trackingExpansion,
      });
      return (
        <button data-testid="tracked" ref={ref} type="button">
          Go
        </button>
      );
    }
    // jsdom lays the button out at 0 by 0: the expansion alone is "inside".
    const {getByTestId, rerender} = render(<Tracked trackingExpansion={70} />);
    const button = getByTestId('tracked');
    touch('touchstart', button, {id: 10, x: 1, y: 1}, 0);
    expect(events).toEqual(['touchDown']);
    // A smaller expansion mid-press: the next move is judged against it.
    rerender(<Tracked trackingExpansion={0} />);
    touch('touchmove', button, {id: 10, x: 30, y: 30}, 16);
    expect(events).toContain('touchDragExit');
    touch('touchend', button, {id: 10, x: 30, y: 30}, 32, true);
    // A travel limit set after mount cancels the next press that passes it.
    events.length = 0;
    rerender(<Tracked trackingExpansion={70} cancelTravel={5} />);
    touch('touchstart', button, {id: 11, x: 1, y: 1}, 100);
    touch('touchmove', button, {id: 11, x: 1, y: 20}, 116);
    expect(events).toContain('touchCancel');
    touch('touchend', button, {id: 11, x: 1, y: 20}, 132, true);
  });

  it('presses nothing for a touch that brakes a scroll', () => {
    const events: ControlEvent[] = [];
    const {getByTestId} = render(
      <Button onEvent={event => events.push(event)} />,
    );
    const button = getByTestId('button');
    const brake = vi
      .spyOn(getGestureHost(document), 'isScrollBraking')
      .mockReturnValue(true);
    touch('touchstart', button, {id: 7, x: 1, y: 1}, 0);
    touch('touchend', button, {id: 7, x: 1, y: 1}, 50, true);
    expect(events).toEqual([]);
    brake.mockRestore();
  });
});
