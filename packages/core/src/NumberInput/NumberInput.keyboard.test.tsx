// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file NumberInput.keyboard.test.tsx
 * @input NumberInput, the keyboard module's test double, stubbed boxes
 * @output Proves the focused number input stays above the on-screen keyboard with no
 *   prop: its scroller reveals it in the keyboard's report, a fixed bar at the
 *   viewport's bottom rides with it, and nothing attaches under a mouse
 * @position Keyboard tests of NumberInput.tsx
 */

import {afterEach, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import {NumberInput} from './NumberInput';
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

it('scrolls the page in the keyboard report until the focused number input sits above it', () => {
  keyboard = installKeyboardTestDouble();
  const scrollBy = vi.fn();
  vi.stubGlobal('scrollBy', scrollBy);
  render(<NumberInput label="Count" value={null} onChange={() => {}} />);
  const field = screen.getByRole('spinbutton');
  boxAt(field, 660, 40);
  act(() => field.focus());
  keyboard.show(300);
  expect(scrollBy).toHaveBeenCalledWith({
    top: 700 + FIELD_OFFSET - (window.innerHeight - 300),
    behavior: 'instant',
  });
});

it("rides an app's fixed bar at the viewport's bottom with the focused number input, and brings it back once the keyboard goes", () => {
  keyboard = installKeyboardTestDouble();
  const bottom = window.innerHeight;
  render(
    <div data-bar="" style={{position: 'fixed'}}>
      <NumberInput label="Count" value={null} onChange={() => {}} />
    </div>,
  );
  const bar = document.querySelector<HTMLElement>('[data-bar]')!;
  boxAt(bar, bottom - 72, 72);
  const field = screen.getByRole('spinbutton');
  boxAt(field, bottom - 56, 40);
  act(() => field.focus());
  keyboard.show(300);
  expect(animatorFor(bar).get('y')).toBe(
    -(bottom - 16 + FIELD_OFFSET - (bottom - 300)),
  );
  act(() => field.blur());
  keyboard.hide();
  expect(animatorFor(bar).get('y')).toBe(0);
});

it('attaches nothing under a mouse or a trackpad', () => {
  keyboard = installKeyboardTestDouble({coarse: false});
  const scrollBy = vi.fn();
  vi.stubGlobal('scrollBy', scrollBy);
  render(<NumberInput label="Count" value={null} onChange={() => {}} />);
  const field = screen.getByRole('spinbutton');
  boxAt(field, 660, 40);
  act(() => field.focus());
  keyboard.show(300);
  expect(scrollBy).not.toHaveBeenCalled();
});
