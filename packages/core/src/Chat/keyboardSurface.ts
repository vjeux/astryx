// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file keyboardSurface.ts
 * @input React context, the touch query (utils/touchPresentation.ts), where
 *   the keyboard is measured (keyboard/keyboardHeight.ts)
 * @output Exports KeyboardSurfaceContext and focusInKeyboardSurface: whether
 *   a composer sits in ChatLayout's keyboard-aware composer region, and the
 *   focus its routes deliver there
 * @position Internal to Chat: ChatLayout provides it around its composer;
 *   ChatComposer and ChatComposerInput read it. Not exported from the package
 *
 * Under a finger, every route into the composer's text skips the browser's
 * reveal, which on iOS scrolls the whole page. The surface keeps the field in
 * view itself. This holds only where the keyboard is measured: a top-level
 * document with a visual viewport. Under a mouse, the browser's own focus
 * applies. The pointer is read at each focus, so a tablet that docks a mouse
 * follows it.
 *
 * SYNC: When modified, update ChatLayout.tsx, ChatComposer.tsx and
 * ChatComposerInput.tsx
 */

import {createContext} from 'react';
import {isKeyboardMeasurable} from '../keyboard/keyboardHeight';
import {TOUCH_QUERY} from '../utils/touchPresentation';

export const KeyboardSurfaceContext = createContext(false);
KeyboardSurfaceContext.displayName = 'KeyboardSurfaceContext';

/** Focuses `element` the way its surface wants (see the file header). */
export function focusInKeyboardSurface(
  element: HTMLElement,
  isKeyboardSurface: boolean,
): void {
  if (isKeyboardSurface && isMeasuredTouchScreen(element)) {
    element.focus({preventScroll: true});
  } else {
    element.focus();
  }
}

function isMeasuredTouchScreen(element: HTMLElement): boolean {
  const win = element.ownerDocument.defaultView;
  return (
    win != null &&
    isKeyboardMeasurable(win) &&
    typeof win.matchMedia === 'function' &&
    win.matchMedia(TOUCH_QUERY).matches
  );
}
