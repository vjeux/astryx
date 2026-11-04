// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file transcriptDismissLoader.ts
 * @input The keyboard module's height and subscription, and a dynamic import
 *   of transcriptDismiss.ts
 * @output attachKeyboardDismissOnFirstKeyboard: loads the drag-to-dismiss
 *   once a software keyboard first shows, then attaches it
 * @position Internal to Chat. ChatLayout calls it on its root, so a page
 *   that never shows a software keyboard never loads the gesture system.
 */

import {
  getKeyboardHeight,
  isKeyboardMeasurable,
  subscribeKeyboardHeight,
} from '../keyboard/keyboardHeight';

/**
 * Loads the drag-to-dismiss once a software keyboard first shows over
 * `root`'s window, and then attaches it to `root`. The load starts at the
 * keyboard's first report, before a drag can reach the composer. A window
 * with no touch or pen input never loads it. Returns the release.
 */
export function attachKeyboardDismissOnFirstKeyboard(
  root: Element,
  dismissLine: () => number,
): () => void {
  const win = root.ownerDocument.defaultView;
  if (
    win == null ||
    !(win.navigator.maxTouchPoints > 0) ||
    !isKeyboardMeasurable(win)
  ) {
    return () => {};
  }
  let isReleased = false;
  let detach = () => {};
  let stopWatching = () => {};
  const load = () => {
    stopWatching();
    void import('./transcriptDismiss').then(({attachKeyboardDismiss}) => {
      if (!isReleased) {
        detach = attachKeyboardDismiss(root, dismissLine);
      }
    });
  };
  if (getKeyboardHeight(win) > 0) {
    load();
  } else {
    stopWatching = subscribeKeyboardHeight(win, event => {
      if (event.type === 'viewport' && event.height > 0) {
        load();
      }
    });
  }
  return () => {
    isReleased = true;
    stopWatching();
    detach();
  };
}
