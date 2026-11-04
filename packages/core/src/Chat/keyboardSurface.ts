// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file keyboardSurface.ts
 * @input React context, the touch query and whether the keyboard module
 *   measures the keyboard
 * @output KeyboardSurfaceContext and focusInKeyboardSurface: whether a
 *   composer sits in ChatLayout's keyboard-aware region, and the focus its
 *   routes deliver there
 * @position Internal to Chat. ChatLayout provides it around its composer,
 *   and ChatComposer and ChatComposerInput read it. The package entry exports
 *   nothing here.
 *
 * SYNC: When modified, update ChatLayout.tsx, ChatComposer.tsx and
 * ChatComposerInput.tsx
 */

import {createContext} from 'react';
import {isKeyboardMeasurable} from '../keyboard/keyboardHeight';
import {TOUCH_QUERY} from '../utils/touchPresentation';

// Inside a keyboard-aware surface, under a finger, every route into the
// composer's text skips the browser's reveal, which on iOS scrolls the whole
// page. Those routes are a tap, the shell's empty-space tap and a script's
// focus(). The surface keeps the field in view itself. This holds where the
// module measures the keyboard: a top-level document with a visual viewport.
// Inside an iframe nothing changes. Under a mouse, and outside a surface, the
// browser's own focus applies. Each focus reads the primary pointer again, so
// a tablet that docks a mouse follows it.
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
