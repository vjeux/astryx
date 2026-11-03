// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardDismiss.ts
 * @input A scroller element, the keyboard module's height and dismissal blur,
 *   the layout viewport's height, bringsUpKeyboard and the shared release
 *   velocity
 * @output observeKeyboardDismiss and KeyboardDismissMode: a drag on a
 *   scroller dismisses the software keyboard, as UIScrollView's
 *   `keyboardDismissMode` does
 * @position Keyboard module, internal to core. ChatLayout opts its
 *   transcript in through Chat/useChatKeyboard.ts.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md and the
 * consumers it lists.
 */

import {VelocityTracker} from '../gestures/VelocityTracker';
import {UIKIT_PAN} from '../motion/uikit/gestures';
import {bringsUpKeyboard} from './keyboardLayoutGuide';
import {blurAsDismissal, getKeyboardHeight} from './keyboardHeight';
import {layoutViewportHeight} from '../utils/layoutViewport';

/** UIScrollView's `keyboardDismissMode`, the modes that decide at a release. */
export type KeyboardDismissMode = 'none' | 'interactive';

export interface KeyboardDismissOptions {
  readonly mode: KeyboardDismissMode;
  /**
   * For `interactive`: px above the keyboard's top edge where dismissal
   * begins, read when each touch starts (a bar on the keyboard passes its
   * height). Default 0.
   */
  readonly dismissPadding?: () => number;
}

/** The focused element, when it is one that brings up the keyboard. */
function focusedEditable(doc: Document): HTMLElement | null {
  let active = doc.activeElement as HTMLElement | null;
  // Focus inside a shadow root shows as its host.
  while (active?.shadowRoot?.activeElement != null) {
    active = active.shadowRoot.activeElement as HTMLElement;
  }
  return active != null && bringsUpKeyboard(active) ? active : null;
}

/**
 * Dismisses the software keyboard from drags that start on `scroller`.
 * Returns a cleanup.
 *
 * UIKit's modes, per scroller, default `none`:
 *
 * - `none`: dragging the scroller leaves the keyboard up.
 * - `interactive`: in UIKit the keyboard follows the finger down once the
 *   finger reaches its top. A page cannot move the system keyboard, so the
 *   drag decides once, when the finger lifts. The keyboard goes if the
 *   finger lifts at or past the keyboard's top edge, less `dismissPadding`
 *   for a bar on the keyboard. Otherwise it stays. Nothing projects the
 *   release: a flick that lifts above that line keeps the keyboard, however
 *   fast. A release that moves back up cancels, however far the finger went.
 *   The release velocity is the one every gesture reads.
 *
 * The UIKit lab measured this on the iOS 26.2 simulator. It used a
 * full-screen UIScrollView in `.interactive` mode with a focused field, with
 * and without a 50 pt accessory bar. Drags lifted above, at and into the
 * input views, at rest, slowly, fast and moving back up. Nothing above the
 * top dismissed, however fast. At or past it, every release dismissed, but
 * one that moved up restored.
 *
 * UIKit's `onDrag`, which dismisses as a drag begins, is absent here: a drag
 * that dismisses the keyboard decides at its release.
 *
 * A press is a drag only once it travels UIKit's pan hysteresis, 10 px on
 * either axis, as UIScrollView's drag begins with its pan. So a tap that
 * lands just above the line and drifts across it never dismisses.
 *
 * The module follows only a drag that starts above that line, outside the
 * focused field, while a software keyboard is up. A drag in the bar or in
 * the text, or with only a hardware keyboard, never dismisses. Every pointer
 * drags. A finger, and a pen that the browser reports as touches, use touch
 * listeners on the scroller. A mouse, and a pen that the browser reports as
 * a pointer only, use a `pointerdown` on the scroller. Document listeners
 * then live only while the button is down. In a desktop browser such a
 * press takes focus off the field itself. So that path decides only where a
 * press leaves the field focused. Every listener is passive: dismissal never
 * claims the touch or delays the scroll. It blurs the focused field, and the
 * keyboard layout guide reports the hide from the blur. So content on the
 * keyboard rides it down.
 *
 * @example
 * ```
 * const stop = observeKeyboardDismiss(transcript, {
 *   mode: 'interactive',
 *   dismissPadding: () => composer.offsetHeight,
 * });
 * ```
 */
export function observeKeyboardDismiss(
  scroller: HTMLElement,
  {mode, dismissPadding}: KeyboardDismissOptions,
): () => void {
  if (mode === 'none') {
    return () => {};
  }
  const doc = scroller.ownerDocument;
  const win = doc.defaultView;
  if (win == null) {
    return () => {};
  }
  // The keyboard's height over the layout viewport: 0 with no software
  // keyboard up (a hardware keyboard), or where nothing is measured.
  const keyboardHeight = () => getKeyboardHeight(win);
  // The touch the module follows: only one, the first finger down while a
  // field that brings up the keyboard has focus. It is null between touches.
  let touchId: number | null = null;
  let padding = 0;
  const tracker = new VelocityTracker();
  // Where the followed press started, and whether it has travelled the pan
  // hysteresis yet: until then it is a tap, and its lift decides nothing.
  let startX = 0;
  let startY = 0;
  let dragging = false;
  const begin = (clientX: number, clientY: number) => {
    startX = clientX;
    startY = clientY;
    dragging = false;
  };
  const travel = (clientX: number, clientY: number) => {
    const hysteresis = UIKIT_PAN.hysteresis.value;
    if (
      Math.abs(clientX - startX) >= hysteresis ||
      Math.abs(clientY - startY) >= hysteresis
    ) {
      dragging = true;
    }
  };

  // Where an interactive dismissal commits, in the layout viewport's
  // coordinates, which clientY and the keyboard height share. It reads layout
  // px under a pinch zoom too.
  const triggerLine = () =>
    layoutViewportHeight(win) - keyboardHeight() - padding;

  // Whether to follow a drag that starts at `clientY` on `target`. A field
  // that brings up the keyboard has focus, and a software keyboard is up. A
  // hardware keyboard on a touch screen shows none, whatever the mode. The
  // drag also starts outside the field, above the line.
  const startsDismissDrag = (target: EventTarget | null, clientY: number) => {
    const editable = focusedEditable(doc);
    if (editable == null || keyboardHeight() <= 0) {
      return false;
    }
    if (target instanceof win.Node && editable.contains(target)) {
      return false;
    }
    padding = Math.max(0, dismissPadding?.() ?? 0);
    return clientY < triggerLine();
  };

  // The one decision, at the release.
  const decide = (clientY: number, timeStamp: number) => {
    // px per second, 0 after a still pause before the lift.
    const velocity = tracker.velocity(timeStamp).y;
    if (velocity < 0 || keyboardHeight() <= 0) {
      return;
    }
    // Where it lifts decides, with no projection.
    if (clientY < triggerLine()) {
      return;
    }
    // The keyboard module's dismissal: no surface parks the focus it leaves.
    const editable = focusedEditable(doc);
    if (editable != null) {
      blurAsDismissal(editable);
    }
  };

  // A mouse or a pen reported as a pointer only, followed while its button
  // is down; null between drags.
  let pointerId: number | null = null;

  const onTouchStart = (event: TouchEvent) => {
    // The module follows a pen that the browser also reports as touches as a
    // touch.
    stopPointer();
    if (touchId != null || event.touches.length !== 1) {
      // A second finger: not a scroll drag to follow.
      touchId = null;
      return;
    }
    const touch = event.changedTouches[0];
    if (touch == null || !startsDismissDrag(event.target, touch.clientY)) {
      return;
    }
    touchId = touch.identifier;
    begin(touch.clientX, touch.clientY);
    tracker.reset();
    tracker.add(touch.clientX, touch.clientY, event.timeStamp);
  };

  const followed = (event: TouchEvent): Touch | null => {
    if (touchId == null) {
      return null;
    }
    for (const touch of Array.from(event.changedTouches)) {
      if (touch.identifier === touchId) {
        return touch;
      }
    }
    return null;
  };

  const onTouchMove = (event: TouchEvent) => {
    const touch = followed(event);
    if (touch != null) {
      travel(touch.clientX, touch.clientY);
      tracker.add(touch.clientX, touch.clientY, event.timeStamp);
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    const touch = followed(event);
    if (touch == null) {
      return;
    }
    touchId = null;
    travel(touch.clientX, touch.clientY);
    tracker.add(touch.clientX, touch.clientY, event.timeStamp);
    if (dragging) {
      decide(touch.clientY, event.timeStamp);
    }
  };

  // The browser cancelled the touch: no release, no decision.
  const onTouchCancel = (event: TouchEvent) => {
    if (followed(event) != null) {
      touchId = null;
    }
  };

  const passive = {passive: true} as const;
  const capture = {capture: true, passive: true} as const;

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId === pointerId) {
      travel(event.clientX, event.clientY);
      tracker.add(event.clientX, event.clientY, event.timeStamp);
    }
  };
  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) {
      return;
    }
    stopPointer();
    travel(event.clientX, event.clientY);
    tracker.add(event.clientX, event.clientY, event.timeStamp);
    if (dragging) {
      decide(event.clientY, event.timeStamp);
    }
  };
  // The browser took the pointer (a pen's scroll): no release, no decision.
  const onPointerCancel = (event: PointerEvent) => {
    if (event.pointerId === pointerId) {
      stopPointer();
    }
  };
  function stopPointer() {
    if (pointerId == null) {
      return;
    }
    pointerId = null;
    doc.removeEventListener('pointermove', onPointerMove, true);
    doc.removeEventListener('pointerup', onPointerUp, true);
    doc.removeEventListener('pointercancel', onPointerCancel, true);
  }
  const onPointerDown = (event: PointerEvent) => {
    // A finger takes the touch listeners; only the primary button drags.
    if (
      event.pointerType === 'touch' ||
      !event.isPrimary ||
      event.button !== 0 ||
      touchId != null ||
      pointerId != null ||
      !startsDismissDrag(event.target, event.clientY)
    ) {
      return;
    }
    pointerId = event.pointerId;
    begin(event.clientX, event.clientY);
    tracker.reset();
    tracker.add(event.clientX, event.clientY, event.timeStamp);
    // On the document while the button is down, so the module hears a
    // release past the scroller, on the composer. The release removes them.
    doc.addEventListener('pointermove', onPointerMove, capture);
    doc.addEventListener('pointerup', onPointerUp, capture);
    doc.addEventListener('pointercancel', onPointerCancel, capture);
  };

  scroller.addEventListener('touchstart', onTouchStart, passive);
  scroller.addEventListener('touchmove', onTouchMove, passive);
  scroller.addEventListener('touchend', onTouchEnd, passive);
  scroller.addEventListener('touchcancel', onTouchCancel, passive);
  scroller.addEventListener('pointerdown', onPointerDown, passive);
  return () => {
    stopPointer();
    scroller.removeEventListener('touchstart', onTouchStart);
    scroller.removeEventListener('touchmove', onTouchMove);
    scroller.removeEventListener('touchend', onTouchEnd);
    scroller.removeEventListener('touchcancel', onTouchCancel);
    scroller.removeEventListener('pointerdown', onPointerDown);
  };
}
