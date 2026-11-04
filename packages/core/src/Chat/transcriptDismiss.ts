// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file transcriptDismiss.ts
 * @input The gesture system's pan recognizer, the keyboard module's height,
 *   bringsUpKeyboard and the line where a release dismisses
 * @output createKeyboardDismissPan, dismissKeyboardAtRelease and
 *   attachKeyboardDismiss: a touch or pen drag down a transcript to its
 *   composer dismisses the software keyboard, as UIScrollView's interactive
 *   `keyboardDismissMode` does
 * @position Internal to Chat. transcriptDismissLoader.ts loads it and
 *   attaches the pan to ChatLayout's root, with its composer's top as the line.
 *
 * SYNC: When modified, update /packages/core/src/Chat/ChatLayout.tsx
 */

import {getGestureHost} from '../gestures/GestureHost';
import {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
import type {GestureTouch} from '../gestures/types';
import {bringsUpKeyboard} from '../keyboard/keyboardLayoutGuide';
import {getKeyboardHeight} from '../keyboard/keyboardHeight';

/** What a followed drag decides against, read as it starts. */
interface DismissDrag {
  readonly doc: Document;
  /** The line, as a `clientY`. */
  readonly line: number;
}

// The drag that each pan follows. A pan follows one drag at a time.
const drags = new WeakMap<PanGestureRecognizer, DismissDrag>();

/** The focused element, when it is one that brings up the keyboard. */
function focusedEditable(doc: Document): HTMLElement | null {
  let active = doc.activeElement as HTMLElement | null;
  // Focus inside a shadow root shows as its host.
  while (active?.shadowRoot?.activeElement != null) {
    active = active.shadowRoot.activeElement as HTMLElement;
  }
  return active != null && bringsUpKeyboard(active) ? active : null;
}

/** The node that a contact began on, from any window. */
function nodeOf(target: unknown): Node | null {
  return target != null &&
    typeof target === 'object' &&
    typeof (target as Node).nodeType === 'number'
    ? (target as Node)
    : null;
}

/**
 * The drag to follow for a contact, or null. A field that brings up the
 * keyboard has focus, and a software keyboard is up. A hardware keyboard on a
 * touch screen shows none. The contact starts outside the field, above the
 * line.
 */
function startsDismissDrag(
  touch: GestureTouch,
  dismissLine: () => number,
): DismissDrag | null {
  const node = nodeOf(touch.target);
  const doc = node?.ownerDocument;
  const win = doc?.defaultView;
  if (node == null || doc == null || win == null) {
    return null;
  }
  const editable = focusedEditable(doc);
  if (editable == null || editable.contains(node)) {
    return null;
  }
  // 0 with no software keyboard up, and wherever nothing is measured.
  if (getKeyboardHeight(win) <= 0) {
    return null;
  }
  const line = dismissLine();
  return touch.startY < line ? {doc, line} : null;
}

/**
 * A pan for a transcript: a drag down it dismisses the software keyboard, as
 * UIScrollView's interactive `keyboardDismissMode` does. Attach it to the
 * transcript, with `dismissKeyboardAtRelease` as its action.
 *
 * In UIKit the keyboard follows the finger down once the finger reaches its
 * top. A page cannot move the system keyboard, so the drag decides once,
 * when it ends. The keyboard goes if the drag ends at or past `dismissLine`,
 * the top of what sits on the keyboard. Otherwise it stays. Nothing projects
 * the release: a flick that ends above the line keeps the keyboard, however
 * fast. A release that moves back up keeps it, however far the drag went.
 *
 * @source measured: UIKit lab, iOS 26.2 simulator, Oct 25 2026, drags on a
 *   full-screen UIScrollView in `.interactive` mode. A field had focus, with
 *   and without a 50 pt accessory bar. The drags lifted above, at and into
 *   the input views, at rest, slowly, fast and moving back up. Nothing above
 *   the top dismissed, however fast. At or past it, every release dismissed,
 *   but one that moved up restored.
 *
 * The pan follows only a drag that starts above the line, outside the
 * focused field, while a software keyboard is up. A drag in the bar or in the
 * text, or with only a hardware keyboard, never dismisses. It takes a finger
 * and a pen. A mouse never reaches it, so a mouse drag keeps the browser's
 * text selection and focus. The pan never claims a touch or delays the
 * scroll. It follows a touch that the browser scrolls with until the lift.
 * It begins at the pan's hysteresis, so a tap that drifts across the line
 * never dismisses. Its release velocity is the one that every pan reads.
 *
 * @example
 * ```
 * const detach = attachKeyboardDismiss(
 *   transcript,
 *   () => composer.getBoundingClientRect().top,
 * );
 * ```
 */
export function createKeyboardDismissPan(
  dismissLine: () => number,
): PanGestureRecognizer {
  return new PanGestureRecognizer({
    name: 'keyboard-dismiss',
    claimsTouches: false,
    maximumNumberOfTouches: 1,
    allowedPointerTypes: ['touch', 'pen'],
    shouldReceiveTouch: (pan, touch) => {
      const drag = startsDismissDrag(touch, dismissLine);
      if (drag == null) {
        return false;
      }
      drags.set(pan, drag);
      return true;
    },
  });
}

/**
 * The action of a pan from `createKeyboardDismissPan`. When the drag ends at
 * or past its line, and does not move back up, it blurs the focused field.
 * Focus moves nowhere else.
 */
export function dismissKeyboardAtRelease(pan: PanGestureRecognizer): void {
  const drag = drags.get(pan);
  if (pan.state !== 'ended' || drag == null) {
    return;
  }
  drags.delete(pan);
  const win = drag.doc.defaultView;
  if (win == null || getKeyboardHeight(win) <= 0 || pan.velocity().y < 0) {
    return;
  }
  // Where the drag lifts decides, with no projection.
  if (pan.location().y >= drag.line) {
    focusedEditable(drag.doc)?.blur();
  }
}

/**
 * Attaches a pan from `createKeyboardDismissPan` to `root` through the
 * gesture host, with `dismissKeyboardAtRelease` as its action. Returns the
 * detach.
 */
export function attachKeyboardDismiss(
  root: Element,
  dismissLine: () => number,
): () => void {
  const pan = createKeyboardDismissPan(dismissLine);
  const stopListening = pan.addListener(() => dismissKeyboardAtRelease(pan));
  const detach = getGestureHost(root.ownerDocument).attach(root, pan);
  return () => {
    detach();
    stopListening();
  };
}
