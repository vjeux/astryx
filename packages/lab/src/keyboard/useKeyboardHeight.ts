// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useKeyboardHeight.ts
 * @input React and the page's visual viewport
 * @output useKeyboardHeight: the software keyboard's height as of its last
 *   report, measured as spec:AST-099 FR2 defines it, in every browser
 *   (DEC-4); also keyboardCoversPage and keyboardInsetOf
 * @position Lab-internal, not exported from `@astryxdesign/lab`: lab's one
 *   keyboard listener (architecture:react-component-runtime INV11 keeps lab
 *   on its own), shared by
 *   SearchField's bottom placement and the tab bar's search field. A lab
 *   surface lays out from the height, committed at once on each report, and
 *   never rides the keyboard (FR8)
 *
 * SYNC: When modified, update useKeyboardHeight.test.tsx and the surfaces
 * that read it (SearchField/SearchFieldTouch.ts).
 */

import {useEffect, useState, type RefObject} from 'react';

/**
 * Whether a software keyboard would cover the page rather than resize it
 * (spec:AST-099 FR6): a visual viewport, in the top-level document (FR7).
 * Chrome on Android counts too: its visual viewport shrinks for the keyboard
 * as Mobile Safari's does, and the page never takes the keyboard's own report
 * or overlays it (DEC-2, DEC-4).
 */
export function keyboardCoversPage(win: Window): boolean {
  return win.visualViewport != null && win === win.top;
}

/**
 * The software keyboard's height as spec:AST-099 FR2 defines it:
 * `innerHeight − visualViewport.height × scale` where it covers the page;
 * 0 otherwise.
 */
export function keyboardInsetOf(win: Window): number {
  const viewport = win.visualViewport;
  if (viewport == null || !keyboardCoversPage(win)) {
    return 0;
  }
  return Math.max(0, win.innerHeight - viewport.height * (viewport.scale ?? 1));
}

/**
 * The software keyboard's height as of its last report, while `enabled`
 * (spec:AST-099 FR1), with no ride and no prediction (FR8): FR2's
 * measurement on each visual-viewport resize, in every browser (DEC-4).
 * `focusRoot` is the surface whose text controls bring the keyboard up (a
 * field's input, or the host that holds it).
 */
export function useKeyboardHeight(
  enabled: boolean,
  focusRoot: RefObject<HTMLElement | null>,
): number {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const win = focusRoot.current?.ownerDocument.defaultView;
    if (!enabled || win == null) {
      return;
    }
    const viewport = win.visualViewport;
    const onResize = () => setHeight(keyboardInsetOf(win));
    onResize();
    viewport?.addEventListener('resize', onResize);
    win.addEventListener('resize', onResize);
    return () => {
      viewport?.removeEventListener('resize', onResize);
      win.removeEventListener('resize', onResize);
    };
  }, [enabled, focusRoot]);
  return enabled ? height : 0;
}
