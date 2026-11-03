// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TextInput.keyboard.test.tsx
 * @input TextInput, the keyboard module's test double, stubbed boxes
 * @output Proves the focused input stays above the on-screen keyboard with no
 *   prop: its scroller reveals it in the keyboard's report, a fixed bar at the
 *   viewport's bottom rides with it, and nothing attaches under a mouse
 * @position Keyboard tests of TextInput.tsx
 */

import {afterEach, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import {TextInput} from './TextInput';
import {animatorFor} from '../motion/animator';
import {FIELD_OFFSET} from '../keyboard/keyboardTarget';
import {
  installKeyboardTestDouble,
  type KeyboardTestDouble,
} from '../keyboard/__tests__/keyboardTestDouble';

let keyboard: KeyboardTestDouble | null = null;

afterEach(() => {
  keyboard?.restore();
  keyboard = null;
  vi.restoreAllMocks();
});

// A box at `top`, moved by the bar's ride as a browser draws it.
function boxAt(element: Element, top: number, height: number) {
  vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => {
    const bar = element.closest<HTMLElement>('[data-bar]');
    const match = /^\S+\s+(-?[\d.]+)px/.exec(bar?.style.translate ?? '');
    const y = match == null ? 0 : Number(match[1]);
    return new DOMRect(0, top + y, 300, height);
  });
}

it('scrolls the page in the keyboard report until the focused input sits above it', () => {
  keyboard = installKeyboardTestDouble();
  const scrollBy = vi.fn();
  vi.stubGlobal('scrollBy', scrollBy);
  render(<TextInput label="Notes" value="" onChange={() => {}} />);
  const field = screen.getByRole('textbox');
  boxAt(field, 660, 40);
  act(() => field.focus());
  keyboard.show(300);
  expect(scrollBy).toHaveBeenCalledWith({
    top: 700 + FIELD_OFFSET - (window.innerHeight - 300),
    behavior: 'instant',
  });
});

it("rides an app's fixed bar at the viewport's bottom with the focused input, and brings it back once the keyboard goes", () => {
  keyboard = installKeyboardTestDouble();
  const bottom = window.innerHeight;
  render(
    <div data-bar="" style={{position: 'fixed'}}>
      <TextInput label="Notes" value="" onChange={() => {}} />
    </div>,
  );
  const bar = document.querySelector<HTMLElement>('[data-bar]')!;
  boxAt(bar, bottom - 72, 72);
  const field = screen.getByRole('textbox');
  boxAt(field, bottom - 56, 40);
  act(() => field.focus());
  keyboard.show(300);
  // The bar moves up by the part of it the keyboard covered, and no more.
  expect(animatorFor(bar).get('y')).toBe(-300);
  act(() => field.blur());
  keyboard.hide();
  expect(animatorFor(bar).get('y')).toBe(0);
});

it("runs the caller's onClick once for the tap that focuses the field, and a listener above it too", () => {
  keyboard = installKeyboardTestDouble();
  const onClick = vi.fn();
  const onWrapperClick = vi.fn();
  render(
    <div onClick={onWrapperClick}>
      <TextInput label="Notes" value="" onChange={() => {}} onClick={onClick} />
    </div>,
  );
  const field = screen.getByRole('textbox');
  boxAt(field, 660, 40);
  const touch = (type: string) => {
    const event = new Event(type, {bubbles: true, cancelable: true});
    const point = {
      identifier: 0,
      clientX: 40,
      clientY: 680,
      screenX: 40,
      screenY: 742,
    };
    Object.assign(event, {
      touches: type === 'touchend' ? [] : [point],
      changedTouches: [point],
    });
    return event;
  };
  act(() => {
    field.dispatchEvent(touch('touchstart'));
  });
  const end = touch('touchend');
  act(() => {
    field.dispatchEvent(end);
  });
  // The tap is claimed, so the browser neither focuses nor reveals: the field
  // takes focus itself, and its click still reaches the caller once.
  expect(end.defaultPrevented).toBe(true);
  expect(document.activeElement).toBe(field);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onWrapperClick).toHaveBeenCalledTimes(1);
  // Like a real tap's click: a touch pointer event, made by the field.
  const click = onClick.mock.calls[0][0] as {nativeEvent: PointerEvent};
  expect(click.nativeEvent.pointerType).toBe('touch');
  expect(click.nativeEvent.isTrusted).toBe(false);
});

it('attaches nothing under a mouse or a trackpad', () => {
  keyboard = installKeyboardTestDouble({coarse: false});
  const scrollBy = vi.fn();
  vi.stubGlobal('scrollBy', scrollBy);
  render(<TextInput label="Notes" value="" onChange={() => {}} />);
  const field = screen.getByRole('textbox');
  boxAt(field, 660, 40);
  act(() => field.focus());
  keyboard.show(300);
  expect(scrollBy).not.toHaveBeenCalled();
});
