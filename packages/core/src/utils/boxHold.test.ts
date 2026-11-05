// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file boxHold.test.ts
 * @input The box hold that registerBoxHold installs, and lockPressedRow. It
 *   runs in jsdom, with pointer and touch events built by hand and fake
 *   timers.
 * @output Checks that a finger held on a marked box locks its row's
 *   selection until the lift. A still lift that gets no browser click clicks
 *   the input once, after the wait, and a later browser click is swallowed.
 *   Each box keeps its own wait. A tap gets no stand-in click. A press that
 *   travels, is cancelled, gets a second finger or has its touchend cancelled
 *   clicks nothing. A hold whose long press acted gets no click at all: its
 *   lift's touchend is cancelled. A scroll or a brake keeps the lock until the
 *   lift and clicks nothing. A press on the
 *   label or a mouse's takes no lock. The last unmount ends a wait.
 * @position Unit layer of utils/boxHold.ts; the component layer is
 *   Indicator/boxHold.test.tsx
 */

import {act, render, screen} from '@testing-library/react';
import {createElement} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {usePressFeedback} from '../hooks/usePressFeedback';
import {pressBoxProps} from '../privateAttributes/pressBox.stylex';
import {lockPressedRow, registerBoxHold} from './boxHold';
import {BROWSER_CLICK_WAIT_MS} from './browserClickWait';
import {claimPress} from './pressClaim';
import {PRESS_SLOP_PX} from './pressGesture';

/** Dispatches a pointer event as a finger, a pen or a mouse sends it. */
function press(
  target: Element,
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel',
  at = {x: 1, y: 1},
  pointerType = 'touch',
  pointerId = 1,
): void {
  const event = new Event(type, {bubbles: true, cancelable: true});
  Object.assign(event, {
    button: 0,
    clientX: at.x,
    clientY: at.y,
    pointerId,
    pointerType,
  });
  target.dispatchEvent(event);
}

/** A finger held for longer than a long press on `target`, then lifted. */
function hold(target: Element): void {
  press(target, 'pointerdown');
  act(() => {
    vi.advanceTimersByTime(900);
  });
  press(target, 'pointerup');
}

/** Dispatches the touchend that follows a finger's pointerup; returns it. */
function touchEnd(target: Element): Event {
  const event = new Event('touchend', {bubbles: true, cancelable: true});
  Object.defineProperty(event, 'changedTouches', {value: []});
  Object.defineProperty(event, 'touches', {value: []});
  target.dispatchEvent(event);
  return event;
}

/** Whether a selection that starts on `target` is refused. */
function refuses(target: Element): boolean {
  const event = new Event('selectstart', {bubbles: true, cancelable: true});
  target.dispatchEvent(event);
  return event.defaultPrevented;
}

/** Runs out the lift's wait for the browser's click. */
function waitForNoClick() {
  act(() => {
    vi.advanceTimersByTime(BROWSER_CLICK_WAIT_MS);
  });
}

/** Makes `CSS.supports` answer as iOS WebKit does for its touch callout. */
function asIosWebKit(): () => void {
  const original = globalThis.CSS;
  Object.defineProperty(globalThis, 'CSS', {
    configurable: true,
    value: {
      ...original,
      supports: (query: string) => query === '(-webkit-touch-callout: none)',
    },
  });
  return () => {
    Object.defineProperty(globalThis, 'CSS', {
      configurable: true,
      value: original,
    });
  };
}

// As a box component does when its module loads.
registerBoxHold();

function Row({onClick, name = ''}: {onClick: () => void; name?: string}) {
  const pressable = usePressFeedback();
  return createElement(
    'div',
    {...pressable, 'data-testid': `row${name}`},
    createElement(
      'div',
      {...pressBoxProps, 'data-testid': `box${name}`},
      createElement('input', {
        type: 'checkbox',
        'data-testid': `input${name}`,
        onClick,
      }),
    ),
    createElement('span', {'data-testid': `label${name}`}, 'Accept terms'),
  );
}

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('the box hold', () => {
  it('refuses a selection of the row a finger holds on the box, until the lift', () => {
    render(createElement(Row, {onClick: () => {}}));
    const input = screen.getByTestId('input');
    const label = screen.getByTestId('label');
    expect(refuses(label)).toBe(false);
    press(input, 'pointerdown');
    expect(refuses(label)).toBe(true);
    press(input, 'pointerup');
    expect(refuses(label)).toBe(false);
  });

  it('clicks the input once when a still lift gets no browser click, after the wait', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId<HTMLInputElement>('input');
    press(input, 'pointerdown');
    act(() => {
      vi.advanceTimersByTime(900);
    });
    press(input, 'pointerup');
    act(() => {
      vi.advanceTimersByTime(BROWSER_CLICK_WAIT_MS - 1);
    });
    expect(onClick).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(true);
    waitForNoClick();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('swallows a browser click that comes after its own click: the lift activates once', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId<HTMLInputElement>('input');
    hold(input);
    act(() => {
      vi.advanceTimersByTime(BROWSER_CLICK_WAIT_MS + 50);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    // A busy main thread can hold the browser's own click past the wait.
    act(() => {
      input.dispatchEvent(
        new MouseEvent('click', {bubbles: true, cancelable: true, detail: 1}),
      );
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(true);
  });

  it('keeps one wait per box: a tap on another box inside the wait leaves the held box’s activation in place', () => {
    const onA = vi.fn();
    const onB = vi.fn();
    render(
      createElement(
        'div',
        null,
        createElement(Row, {onClick: onA, name: 'A'}),
        createElement(Row, {onClick: onB, name: 'B'}),
      ),
    );
    const inputA = screen.getByTestId('inputA');
    const inputB = screen.getByTestId('inputB');
    press(inputA, 'pointerdown');
    act(() => {
      vi.advanceTimersByTime(900);
    });
    press(inputA, 'pointerup');
    touchEnd(inputA);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    // A tap's activation is the browser's click, which jsdom does not make.
    press(inputB, 'pointerdown', undefined, 'touch', 2);
    press(inputB, 'pointerup', undefined, 'touch', 2);
    touchEnd(inputB);
    act(() => {
      vi.advanceTimersByTime(BROWSER_CLICK_WAIT_MS);
    });
    expect(onA).toHaveBeenCalledTimes(1);
    expect(onB).not.toHaveBeenCalled();
  });

  it('clicks nothing for a lift whose touchend a handler cancelled: the handler took it', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    const takeLift = (event: Event) => event.preventDefault();
    input.addEventListener('touchend', takeLift);
    press(input, 'pointerdown');
    act(() => {
      vi.advanceTimersByTime(900);
    });
    press(input, 'pointerup');
    expect(touchEnd(input).defaultPrevented).toBe(true);
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
    input.removeEventListener('touchend', takeLift);
  });

  it('gives a tap no stand-in click: its activation stays the browser’s own', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown');
    act(() => {
      vi.advanceTimersByTime(300);
    });
    press(input, 'pointerup');
    touchEnd(input);
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('takes the lift of a hold whose long press acted, such as a row’s own: its touchend is cancelled and nothing clicks', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown');
    act(() => {
      vi.advanceTimersByTime(500);
    });
    claimPress();
    act(() => {
      vi.advanceTimersByTime(400);
    });
    press(input, 'pointerup');
    expect(touchEnd(input).defaultPrevented).toBe(true);
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('gives a pen hold whose long press acted no stand-in click: a pen sends no touchend to take', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown', undefined, 'pen');
    act(() => {
      vi.advanceTimersByTime(600);
    });
    claimPress();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    press(input, 'pointerup', undefined, 'pen');
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('takes only the claimed hold’s lift: the next press’s touchend is not cancelled', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown');
    act(() => {
      vi.advanceTimersByTime(600);
    });
    claimPress();
    // The touch is cancelled, so its lift never comes.
    press(input, 'pointercancel');
    const cancel = new Event('touchcancel', {bubbles: true});
    input.dispatchEvent(cancel);
    press(input, 'pointerdown');
    press(input, 'pointerup');
    expect(touchEnd(input).defaultPrevented).toBe(false);
  });

  it('still clicks after a claim that came before the hold', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    claimPress();
    hold(input);
    touchEnd(input);
    waitForNoClick();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('clicks nothing when a second finger lands during the press', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown');
    press(input, 'pointerdown', {x: 40, y: 1}, 'touch', 2);
    press(input, 'pointerup');
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('clicks nothing for a press that travels past the slop', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown');
    press(input, 'pointermove', {x: 1, y: 2 + PRESS_SLOP_PX});
    press(input, 'pointerup', {x: 1, y: 2 + PRESS_SLOP_PX});
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('clicks nothing for a cancelled press, and releases its lock', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    press(input, 'pointerdown');
    press(input, 'pointercancel');
    expect(refuses(screen.getByTestId('label'))).toBe(false);
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps the lock through a scroll until the lift, and clicks nothing', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    const label = screen.getByTestId('label');
    press(input, 'pointerdown');
    // iOS delivers the stopped scroll's last events after the finger lands.
    document.dispatchEvent(new Event('scroll'));
    expect(refuses(label)).toBe(true);
    press(input, 'pointerup');
    expect(refuses(label)).toBe(false);
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('locks the row for a finger that brakes a scroll, and clicks nothing', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    const label = screen.getByTestId('label');
    press(input, 'pointerdown');
    press(input, 'pointerup');
    waitForNoClick();
    onClick.mockClear();
    // A scroll that finger drove: the next touch is a brake, not a press.
    document.dispatchEvent(new Event('scroll'));
    press(input, 'pointerdown');
    expect(refuses(label)).toBe(true);
    press(input, 'pointerup');
    expect(refuses(label)).toBe(false);
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('takes no lock and clicks nothing for a press on the label or a mouse’s press', () => {
    const onClick = vi.fn();
    render(createElement(Row, {onClick}));
    const label = screen.getByTestId('label');
    const input = screen.getByTestId('input');
    press(label, 'pointerdown');
    expect(refuses(label)).toBe(false);
    press(label, 'pointerup');
    press(input, 'pointerdown', undefined, 'mouse');
    expect(refuses(label)).toBe(false);
    press(input, 'pointerup', undefined, 'mouse');
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('ends the wait when the last pressable unmounts: no click comes later', () => {
    const onClick = vi.fn();
    const {unmount} = render(createElement(Row, {onClick}));
    const input = screen.getByTestId('input');
    hold(input);
    unmount();
    waitForNoClick();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('lockPressedRow', () => {
  it('locks the pressed row around an element as well as the element', () => {
    document.body.innerHTML =
      '<div data-astryx-pressable><div id="box"><input id="input" type="checkbox"></div><span id="label">Accept</span></div>';
    const box = document.getElementById('box') as HTMLElement;
    const label = document.getElementById('label') as HTMLElement;
    const release = lockPressedRow([box], document.getElementById('input'));
    expect(refuses(label)).toBe(true);
    release();
    expect(refuses(label)).toBe(false);
    document.body.innerHTML = '';
  });

  it('on iOS, locks the row and the input with styles, and restores them', () => {
    const restore = asIosWebKit();
    try {
      document.body.innerHTML =
        '<div id="row" data-astryx-pressable><div id="box"><input id="input" type="checkbox"></div></div>';
      const row = document.getElementById('row') as HTMLElement;
      const input = document.getElementById('input') as HTMLElement;
      const set = vi.spyOn(row.style, 'setProperty');
      const inputSet = vi.spyOn(input.style, 'setProperty');
      const remove = vi.spyOn(row.style, 'removeProperty');
      const release = lockPressedRow(
        [document.getElementById('box') as HTMLElement],
        input,
      );
      for (const name of [
        '-webkit-touch-callout',
        '-webkit-user-select',
        'user-select',
      ]) {
        expect(set).toHaveBeenCalledWith(name, 'none');
        expect(inputSet).toHaveBeenCalledWith(name, 'none');
      }
      release();
      expect(remove).toHaveBeenCalledWith('user-select');
      document.body.innerHTML = '';
    } finally {
      restore();
      vi.restoreAllMocks();
    }
  });
});
