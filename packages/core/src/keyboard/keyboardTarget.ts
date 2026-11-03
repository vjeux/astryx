// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardTarget.ts
 * @input The keyboard module's reports and focus claim, the layout guide,
 *   rideKeyboard and the shared animator
 * @output The keyboard targets: their registry, followKeyboard for a docked
 *   or scrolling target, and keepFieldAboveKeyboard, a covered field's path
 * @position Keyboard module, internal to core. useMobileKeyboard calls it.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import {animatorFor, type Animator} from '../motion/animator';
import {isCoarsePointer} from '../utils/coarsePointer';
import {subscribeInput} from '../utils/inputStream';
import {layoutViewportHeight} from '../utils/layoutViewport';
import {
  KEYBOARD_EPSILON,
  claimTapFocus,
  findTextEntryControl,
  focusAtPoint,
  getKeyboardHeight,
  isKeyboardMeasurable,
  isTextEntryControl,
  refuseFocusReveal,
  subscribeKeyboardHeight,
  watchRevealPan,
} from './keyboardHeight';
import {getKeyboardLayoutGuide, keyboardProfileOf} from './keyboardLayoutGuide';
import type {KeyboardTransition} from './keyboardModel';
import {distanceIntoBand} from './revealBand';
import {rideKeyboard} from './rideKeyboard';

/**
 * How a target keeps a focused field above the keyboard: `'reveal'` scrolls
 * the field into place, and `'ride'` moves the target with the keyboard.
 */
export type KeyboardMove = 'reveal' | 'ride';

/**
 * The gap a field keeps above the keyboard, CSS px. UIKit's bottom search
 * field keeps 17 pt above it (iOS 26.2).
 */
export const FIELD_OFFSET = 17;

// Targets that keep their own fields above the keyboard. A field inside one
// moves nothing itself, so nothing moves twice.
const targets = new WeakSet<Element>();

/** Registers `element` as a keyboard target until the returned call. */
export function registerKeyboardTarget(element: Element): () => void {
  targets.add(element);
  return () => {
    targets.delete(element);
  };
}

/** Whether a registered target holds `element`. */
export function isInsideKeyboardTarget(element: Element): boolean {
  for (
    let node = element.parentElement;
    node != null;
    node = node.parentElement
  ) {
    if (targets.has(node)) {
      return true;
    }
  }
  return false;
}

const SCROLLING_OVERFLOW = new Set(['auto', 'scroll', 'overlay']);

/**
 * The element that scrolls `element` into view: its nearest ancestor that
 * scrolls on the block axis, or else the document's scroller.
 */
export function nearestScroller(element: Element): Element {
  const doc = element.ownerDocument;
  const view = doc.defaultView;
  for (
    let node = element.parentElement;
    node != null && node !== doc.body && node !== doc.documentElement;
    node = node.parentElement
  ) {
    if (
      view != null &&
      SCROLLING_OVERFLOW.has(view.getComputedStyle(node).overflowY) &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
  }
  return doc.scrollingElement ?? doc.documentElement;
}

// The element's bottom edge where layout puts it, without the ride's move.
function restingBottom(element: Element, animator: Animator): number {
  return element.getBoundingClientRect().bottom - animator.get('y');
}

/**
 * How far a ride has moved `element` from where its layout puts it, as the
 * page draws it now, CSS px. Reading the style creates no animator.
 */
export function drawnOffsetOf(element: Element): number {
  const view = element.ownerDocument.defaultView;
  const translate = view?.getComputedStyle(element).translate ?? '';
  return parseFloat(translate.split(' ')[1] ?? '') || 0;
}

/** Where an element sits among fixed containers (see fixedContainerOf). */
export type FixedContainer = {docked: HTMLElement} | 'fills-viewport' | null;

/**
 * The nearest fixed-position ancestor of `element` that decides how it meets
 * the keyboard: one docked to the layout viewport's bottom edge (its bottom
 * sits at the viewport's bottom), or one that fills the viewport, such as a
 * dialog's. Null when neither holds it, as in page content.
 */
export function fixedContainerOf(element: Element): FixedContainer {
  const view = element.ownerDocument.defaultView;
  if (view == null) {
    return null;
  }
  const viewportBottom = layoutViewportHeight(view);
  for (
    let node = element.parentElement;
    node != null;
    node = node.parentElement
  ) {
    if (view.getComputedStyle(node).position !== 'fixed') {
      continue;
    }
    const box = node.getBoundingClientRect();
    if (box.height >= viewportBottom - KEYBOARD_EPSILON) {
      return 'fills-viewport';
    }
    const bottom = box.bottom - drawnOffsetOf(node);
    if (Math.abs(viewportBottom - bottom) <= KEYBOARD_EPSILON) {
      return {docked: node};
    }
  }
  return null;
}

/**
 * The fixed container docked at the viewport's bottom edge that holds
 * `element`, or null. A container that fills the viewport is never one.
 */
export function dockedAncestor(element: Element): HTMLElement | null {
  const container = fixedContainerOf(element);
  return container != null && container !== 'fills-viewport'
    ? container.docked
    : null;
}

/**
 * How far a bottom edge at `bottom` sits under the keyboard's top, plus
 * `offset`, CSS px; 0 when it clears it. An overlap under one CSS px is the
 * viewport's rounding, not an obstruction.
 */
export function coveredBy(
  bottom: number,
  height: number,
  offset: number,
  win: Window,
): number {
  const covered = bottom + offset - (layoutViewportHeight(win) - height);
  return height > 0 && covered > KEYBOARD_EPSILON ? covered : 0;
}

// The lift of a ridden target. With a focused field inside, the target clears
// the keyboard and the field keeps `offset` above it. On an app's element the
// module moves only that field's fixed ancestor docked at the viewport's
// bottom, so `isHostOwned` false lifts the target only while it is one. When
// a field outside has focus, the target rests under the keyboard, so it never
// covers that field. When focus left for nothing, a lifted target rides down
// with the keyboard, and one at rest stays there.
function liftFor(
  target: HTMLElement,
  animator: Animator,
  height: number,
  offset: number,
  win: Window,
  isHostOwned: boolean,
): number {
  const targetCovered = coveredBy(
    restingBottom(target, animator),
    height,
    0,
    win,
  );
  const field = focusedFieldIn(target);
  if (field != null) {
    if (!isHostOwned && dockedAncestor(field) !== target) {
      return 0;
    }
    const fieldCovered = coveredBy(
      restingBottom(field, animator),
      height,
      offset,
      win,
    );
    return Math.max(targetCovered, fieldCovered);
  }
  if (isTextEntryControl(target.ownerDocument.activeElement)) {
    return 0;
  }
  return animator.get('y') < 0 ? targetCovered : 0;
}

// Scrolls `scroller` by up to `distance` px, up or down, at once, and returns
// how far it went. A smooth scroll would leave the field covered when Chrome
// checks it.
function scrollAlong(scroller: Element, distance: number, win: Window): number {
  const doc = scroller.ownerDocument;
  if (scroller === (doc.scrollingElement ?? doc.documentElement)) {
    const before = win.scrollY;
    win.scrollBy({top: distance, behavior: 'instant'});
    return win.scrollY - before;
  }
  const before = scroller.scrollTop;
  scroller.scrollTop = before + distance;
  return scroller.scrollTop - before;
}

// How far `field` sits outside the band it must be in: inside its scroller's
// box and the viewport, and `offset` above the keyboard while one shows.
function revealDistance(
  field: Element,
  scroller: Element,
  height: number,
  offset: number,
  win: Window,
): number {
  const doc = field.ownerDocument;
  const keyboardTop = layoutViewportHeight(win) - height;
  let safeTop = 0;
  let safeBottom =
    height > KEYBOARD_EPSILON ? keyboardTop - offset : keyboardTop;
  if (scroller !== (doc.scrollingElement ?? doc.documentElement)) {
    const box = scroller.getBoundingClientRect();
    safeTop = Math.max(safeTop, box.top);
    safeBottom = Math.min(safeBottom, box.bottom);
  }
  const box = field.getBoundingClientRect();
  return distanceIntoBand(box.top, box.bottom, safeTop, safeBottom);
}

// Scrolls until `field` sits in its band: its nearest scroller first, then
// each scroller around it for what that one could not scroll, the document
// last.
function reveal(
  field: Element,
  scroller: Element,
  height: number,
  offset: number,
  win: Window,
): void {
  const doc = field.ownerDocument;
  const documentScroller = doc.scrollingElement ?? doc.documentElement;
  let distance = revealDistance(field, scroller, height, offset, win);
  let at: Element | null = scroller;
  while (at != null && Math.abs(distance) > KEYBOARD_EPSILON) {
    distance -= scrollAlong(at, distance, win);
    at = at === documentScroller ? null : nearestScroller(at);
  }
}

// Focuses the tapped field without the browser's reveal, then raises the
// tap's click. The claimed tap's cancelled `touchend` raises none, and a
// caller's `onClick` still runs once. The click is synthetic: its `isTrusted`
// is false. Like a real tap's click in Chrome and Safari, it is a touch
// `PointerEvent`, or a `MouseEvent` where no `PointerEvent` exists.
function deliverTap(
  control: HTMLElement,
  x: number,
  y: number,
  touch: {screenX: number; screenY: number; identifier: number},
): void {
  focusAtPoint(control, x, y);
  // The field's own window's constructors, as a click in a frame has.
  const view = control.ownerDocument.defaultView;
  const init: MouseEventInit = {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: 1,
    clientX: x,
    clientY: y,
    screenX: touch.screenX,
    screenY: touch.screenY,
  };
  const PointerClick = view?.PointerEvent;
  const click =
    typeof PointerClick === 'function'
      ? new PointerClick('click', {
          ...init,
          pointerType: 'touch',
          isPrimary: true,
          pointerId: touch.identifier,
        })
      : new (view?.MouseEvent ?? MouseEvent)('click', init);
  control.dispatchEvent(click);
}

// Puts back a pan the browser makes on its own after a keyboard report, as
// after a focus no claim saw: a script's `focus()` while nothing has focus.
// The field sits in place already, so the pan only displaces the page.
function watchPans(win: Window, owns: (focused: Element) => boolean) {
  const watch = watchRevealPan(win, {owns});
  let lastHeight = getKeyboardHeight(win);
  return {
    report(height: number): void {
      if (height !== lastHeight) {
        lastHeight = height;
        watch.report();
      } else if (watch.isRevealPan(height)) {
        watch.putBack();
      }
    },
    stop: () => watch.stop(),
  };
}

function focusedFieldIn(target: Element): HTMLElement | null {
  const active = target.ownerDocument.activeElement;
  return active != null &&
    active !== target &&
    target.contains(active) &&
    isTextEntryControl(active)
    ? active
    : null;
}

// Whether this window keeps fields above a keyboard at all: a top-level
// document whose visual viewport shrinks for the keyboard, under a finger.
function followsKeyboard(win: Window | null): win is Window {
  return win != null && isKeyboardMeasurable(win) && isCoarsePointer(win);
}

/** How followKeyboard moves its target. */
export interface FollowKeyboardOptions {
  move: KeyboardMove;
  /** The gap kept between the focused field and the keyboard, CSS px. */
  offset: number;
}

/**
 * Keeps the focused field inside `target` above the keyboard until the
 * returned call. `'ride'` moves `target` with the keyboard, on its slide
 * where the browser reports one. `'reveal'` scrolls the field into place in
 * `target`, a scroller. The target claims focus moves into its fields, so the
 * browser never pans the page to them, and it registers as a keyboard target.
 *
 * @example
 * ```
 * const stop = followKeyboard(dock, {move: 'ride', offset: FIELD_OFFSET});
 * ```
 */
export function followKeyboard(
  target: HTMLElement,
  {move, offset}: FollowKeyboardOptions,
): () => void {
  const doc = target.ownerDocument;
  const win = doc.defaultView;
  if (!followsKeyboard(win)) {
    return () => {};
  }
  const unregister = registerKeyboardTarget(target);
  const stopClaim = refuseFocusReveal(doc, {
    claim: destination =>
      destination instanceof win.HTMLElement &&
      destination !== target &&
      target.contains(destination) &&
      isTextEntryControl(destination)
        ? destination
        : null,
  });
  // A first tap moves focus from nothing, so no blur claims it. The tap
  // route focuses the field itself, without the browser's reveal.
  const stopTaps = claimTapFocus(target, {
    claim: touched => {
      const control = findTextEntryControl(touched, target);
      return control != null && control !== doc.activeElement ? control : null;
    },
    deliver: deliverTap,
  });
  const stopMoving: (isFinal?: boolean) => void =
    move === 'ride'
      ? rideWithKeyboard(target, offset, win, true)
      : revealWithKeyboard(
          target,
          () => focusedFieldIn(target),
          target,
          offset,
          win,
        );
  return () => {
    stopMoving(true);
    stopTaps();
    stopClaim();
    unregister();
  };
}

// Reveals the focused field `field()` returns through `scroller` at each
// keyboard report, now, and when focus moves into `region` with the keyboard
// already up. Returns the call that stops it.
function revealWithKeyboard(
  region: Element,
  field: () => Element | null,
  scroller: Element,
  offset: number,
  win: Window,
): () => void {
  const revealNow = (height: number) => {
    const focused = field();
    if (focused != null) {
      reveal(focused, scroller, height, offset, win);
    }
  };
  const pans = watchPans(win, focused => focused === field());
  const stopReports = subscribeKeyboardHeight(win, event => {
    if (event.type === 'viewport') {
      revealNow(event.height);
      pans.report(event.height);
    }
  });
  const onFocusIn = () => revealNow(getKeyboardHeight(win));
  region.addEventListener('focusin', onFocusIn);
  revealNow(getKeyboardHeight(win));
  return () => {
    stopReports();
    pans.stop();
    region.removeEventListener('focusin', onFocusIn);
  };
}

// The ride that moves each target. A new ride on the same target takes over,
// whether the old one still rides or waits for the keyboard to go, so two
// never move one target, and the one taken over never moves it again.
const currentRides = new WeakMap<HTMLElement, () => void>();

// Rides `target` with the keyboard until the returned call, keeping its
// focused field `offset` above it. `isHostOwned` is true for a Core host's
// own element, and false for an app's docked container. Where the guide
// publishes the keyboard's slide, the target moves on it; elsewhere it takes
// each report's place at once. A blur's stop waits for the keyboard to go, so
// the target never drops under a keyboard still showing. A final stop, on
// detach, returns it at once.
function rideWithKeyboard(
  target: HTMLElement,
  offset: number,
  win: Window,
  isHostOwned: boolean,
): (isFinal?: boolean) => void {
  currentRides.get(target)?.();
  const animator = animatorFor(target);
  const guide =
    keyboardProfileOf(win) === 'chromium' ? getKeyboardLayoutGuide(win) : null;
  // A ride moves the target while it rides or waits for the keyboard to go.
  // Once it ends, by itself or by a takeover, it never moves the target.
  let state: 'riding' | 'waiting' | 'ended' = 'riding';
  let stopReports: (() => void) | null = null;
  let stopGuide: (() => void) | null = null;
  const pans = watchPans(win, focused => target.contains(focused));
  const end = () => {
    state = 'ended';
    stopReports?.();
    stopGuide?.();
    stopReports = null;
    stopGuide = null;
    pans.stop();
    stopFocusIns();
    if (currentRides.get(target) === end) {
      currentRides.delete(target);
    }
  };
  currentRides.set(target, end);
  const place = (height: number, transition: KeyboardTransition | null) => {
    if (state === 'ended') {
      return;
    }
    const lift = liftFor(target, animator, height, offset, win, isHostOwned);
    // Rest is y 0, never -0, so the animator releases its translate there.
    const y = lift > 0 ? -lift : 0;
    if (transition == null) {
      animator.set({y});
    } else {
      rideKeyboard(animator, {y}, transition);
    }
    // The target is now at rest, or rides there on the keyboard's slide, so
    // a stopped ride only stops listening. A set here would cut the slide.
    if (state === 'waiting' && height <= KEYBOARD_EPSILON) {
      end();
    }
  };
  if (guide != null) {
    stopGuide = guide.subscribe(transition => place(transition.to, transition));
  } else {
    stopReports = subscribeKeyboardHeight(win, event => {
      if (event.type === 'viewport') {
        place(event.height, null);
        pans.report(event.height);
      }
    });
  }
  // A field gaining focus with the keyboard up places the target at once. A
  // blur to nothing waits for the keyboard's own report or slide, so the
  // target rides down from where it is.
  function onFocusIn() {
    place(guide?.inset ?? getKeyboardHeight(win), null);
  }
  const stopFocusIns = subscribeInput(win, 'focusin', onFocusIn);
  onFocusIn();
  return (isFinal = false) => {
    if (state === 'ended') {
      return;
    }
    if (isFinal || getKeyboardHeight(win) <= KEYBOARD_EPSILON) {
      end();
      animator.set({y: 0});
    } else {
      state = 'waiting';
    }
  };
}

/** How keepFieldAboveKeyboard keeps its field clear. */
export interface KeepFieldAboveKeyboardOptions {
  /** The gap kept between the field and the keyboard, CSS px. */
  offset?: number;
}

// How the field path places `field` when it gains focus: a ride of its docked
// container, or a reveal by its scrollers. Null where the browser's own reveal
// stays: inside a keyboard target, which places the field itself, or inside a
// fixed container that fills the viewport, such as a dialog.
function placementOf(
  field: HTMLElement,
): {ride: HTMLElement} | {reveal: Element} | null {
  if (isInsideKeyboardTarget(field)) {
    return null;
  }
  const container = fixedContainerOf(field);
  if (container === 'fills-viewport') {
    return null;
  }
  return container != null
    ? {ride: container.docked}
    : {reveal: nearestScroller(field)};
}

/**
 * A field's own path until the returned call. When the field gains focus, it
 * decides where it is: docked at the viewport's bottom, it rides its fixed
 * container; in page content, its scrollers bring it into view, the document
 * last, above the keyboard while one shows. A focus move or a tap into the
 * field arrives without the browser's reveal there, so the page never pans
 * for it. Inside a keyboard target, or a fixed container that fills the
 * viewport, the path does nothing and the browser's own reveal stays.
 *
 * @example
 * ```
 * const stop = keepFieldAboveKeyboard(input);
 * ```
 */
export function keepFieldAboveKeyboard(
  field: HTMLElement,
  {offset = FIELD_OFFSET}: KeepFieldAboveKeyboardOptions = {},
): () => void {
  const doc = field.ownerDocument;
  const win = doc.defaultView;
  if (!followsKeyboard(win)) {
    return () => {};
  }
  const stopClaim = refuseFocusReveal(doc, {
    claim: destination =>
      destination === field && placementOf(field) != null ? field : null,
  });
  // A first tap moves focus from nothing, so no blur claims it.
  const stopTaps = claimTapFocus(field, {
    claim: () =>
      doc.activeElement !== field && placementOf(field) != null ? field : null,
    deliver: deliverTap,
  });
  let stopSession: ((isFinal?: boolean) => void) | null = null;
  // A ride a blur stopped can still wait for the keyboard to go; a detach
  // ends it at once.
  let stoppedSession: ((isFinal?: boolean) => void) | null = null;
  const onFocus = () => {
    // A claimed focus move raises a second focus event; the session stands.
    if (stopSession != null) {
      return;
    }
    const placement = placementOf(field);
    if (placement == null) {
      return;
    }
    stopSession =
      'ride' in placement
        ? rideWithKeyboard(placement.ride, offset, win, false)
        : revealWithKeyboard(
            field,
            () => (doc.activeElement === field ? field : null),
            placement.reveal,
            offset,
            win,
          );
  };
  const onBlur = () => {
    stopSession?.();
    stoppedSession = stopSession ?? stoppedSession;
    stopSession = null;
  };
  field.addEventListener('focus', onFocus);
  field.addEventListener('blur', onBlur);
  return () => {
    field.removeEventListener('focus', onFocus);
    field.removeEventListener('blur', onBlur);
    stopSession?.(true);
    stoppedSession?.(true);
    stopSession = null;
    stoppedSession = null;
    stopTaps();
    stopClaim();
  };
}
