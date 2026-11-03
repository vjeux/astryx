// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file keyboardHeight.ts
 * @input The visual viewport, focus events, React refs and effects, the
 *   Reduce Motion and touch queries, and the layout viewport's height
 * @output The on-screen keyboard module: measureKeyboardHeight,
 *   isKeyboardMeasurable, subscribeKeyboardHeight, getKeyboardHeight,
 *   isTextEntryControl, findTextEntryControl, refuseFocusReveal,
 *   watchRevealPan, and BottomSheet's useSheetKeyboard hook
 * @position Core's one source for the on-screen keyboard. It is internal to
 *   core and never exported from the package.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import {useMediaQuery} from '../hooks/useMediaQuery';
import {TOUCH_QUERY} from '../utils/touchPresentation';
import {animatorFor, type Animator} from '../motion/animator';
import {getKeyboardLayoutGuide, keyboardProfileOf} from './keyboardLayoutGuide';
import {rideKeyboard} from './rideKeyboard';
import type {KeyboardTransition} from './keyboardModel';
import {useEffect, useRef, useState, type RefObject} from 'react';
import {flushSync} from 'react-dom';
import {layoutViewportHeight} from '../utils/layoutViewport';

// A shortfall smaller than this is rounding, not a keyboard.
const KEYBOARD_EPSILON = 1;
const NON_TEXT_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
]);

/**
 * Whether this window measures the keyboard: a top-level document with a
 * visual viewport. Capabilities decide it, never the user agent or the
 * pointer. The module measures a browser with its own keyboard geometry API,
 * such as Chrome on Android with the VirtualKeyboard API, the same way.
 * Its visual viewport shrinks for the keyboard while the layout viewport keeps
 * its height, as everywhere else. A desktop browser's visual viewport never
 * shrinks for a keyboard, so it reads 0. Where the app sets
 * `interactive-widget=resizes-content`, Chrome shrinks the layout viewport
 * with the keyboard. The height is then 0 too, and nothing rides, because the
 * browser has made the room itself.
 */
export function isKeyboardMeasurable(win: Window): boolean {
  return win.visualViewport != null && win.self === win.top;
}

/**
 * The on-screen keyboard's height over the layout viewport, CSS px. It is 0
 * when none is shown, also while pinch-zoomed, and wherever
 * `isKeyboardMeasurable` is false.
 */
export function measureKeyboardHeight(win: Window): number {
  const viewport = win.visualViewport;
  if (viewport == null || !isKeyboardMeasurable(win)) {
    return 0;
  }
  const height =
    layoutViewportHeight(win) - viewport.height * (viewport.scale ?? 1);
  return height > KEYBOARD_EPSILON ? Math.round(height * 100) / 100 : 0;
}

/** A report from the keyboard module, in the order the window raised them. */
export type KeyboardHeightEvent =
  | {
      /** The visual viewport or the window changed size or position. */
      type: 'viewport';
      /** The keyboard height after this report. */
      height: number;
      /** The report's event time (the document timeline). */
      timeStamp: number;
    }
  | {
      /** Focus moved into (`focusin`) or out of (`focusout`) `target`. */
      type: 'focusin' | 'focusout';
      height: number;
      timeStamp: number;
      target: EventTarget | null;
      relatedTarget: EventTarget | null;
    };

interface KeyboardStore {
  height: number;
  listeners: Set<(event: KeyboardHeightEvent) => void>;
  /** The subscribers that asked for focus moves too (the layout guide). */
  focusListeners: Set<(event: KeyboardHeightEvent) => void>;
  detach: (() => void) | null;
  detachFocus: (() => void) | null;
}

const stores = new WeakMap<Window, KeyboardStore>();

function storeOf(win: Window): KeyboardStore {
  let store = stores.get(win);
  if (store == null) {
    store = {
      height: 0,
      listeners: new Set(),
      focusListeners: new Set(),
      detach: null,
      detachFocus: null,
    };
    stores.set(win, store);
  }
  return store;
}

function attach(win: Window, store: KeyboardStore): () => void {
  const viewport = win.visualViewport;
  store.height = measureKeyboardHeight(win);
  const onViewport = (event: Event) => {
    store.height = measureKeyboardHeight(win);
    const report: KeyboardHeightEvent = {
      type: 'viewport',
      height: store.height,
      timeStamp: event.timeStamp,
    };
    for (const listener of [...store.listeners]) {
      listener(report);
    }
  };
  viewport?.addEventListener('resize', onViewport);
  viewport?.addEventListener('scroll', onViewport);
  win.addEventListener('resize', onViewport);
  return () => {
    viewport?.removeEventListener('resize', onViewport);
    viewport?.removeEventListener('scroll', onViewport);
    win.removeEventListener('resize', onViewport);
  };
}

// Focus moves are heard only while a subscriber asks for them. A viewport
// reader, such as a Tall BottomSheet's hook under any pointer, adds no
// document listener.
function attachFocus(win: Window, store: KeyboardStore): () => void {
  const doc = win.document;
  const onFocus = (event: FocusEvent) => {
    const report: KeyboardHeightEvent = {
      type: event.type === 'focusin' ? 'focusin' : 'focusout',
      height: store.height,
      timeStamp: event.timeStamp,
      target: event.target,
      relatedTarget: event.relatedTarget,
    };
    for (const listener of [...store.focusListeners]) {
      listener(report);
    }
  };
  doc.addEventListener('focusin', onFocus, true);
  doc.addEventListener('focusout', onFocus, true);
  return () => {
    doc.removeEventListener('focusin', onFocus, true);
    doc.removeEventListener('focusout', onFocus, true);
  };
}

/**
 * Calls `listener` with every report of `win`'s keyboard until the caller
 * runs the returned function. It reports the viewport's changes, and focus
 * moves too when the caller sets `focus`. All subscribers of a window share one set of listeners,
 * and the document's focus listeners exist only while a subscriber asks for
 * focus moves.
 *
 * @example
 * ```
 * const stop = subscribeKeyboardHeight(window, event => {
 *   if (event.type === 'viewport') layout(event.height);
 * });
 * ```
 */
export function subscribeKeyboardHeight(
  win: Window,
  listener: (event: KeyboardHeightEvent) => void,
  {focus = false}: {focus?: boolean} = {},
): () => void {
  const store = storeOf(win);
  store.listeners.add(listener);
  if (store.detach == null) {
    store.detach = attach(win, store);
  }
  if (focus) {
    store.focusListeners.add(listener);
    if (store.detachFocus == null) {
      store.detachFocus = attachFocus(win, store);
    }
  }
  return () => {
    store.listeners.delete(listener);
    if (focus) {
      store.focusListeners.delete(listener);
      if (store.focusListeners.size === 0 && store.detachFocus != null) {
        store.detachFocus();
        store.detachFocus = null;
      }
    }
    if (store.listeners.size === 0 && store.detach != null) {
      store.detach();
      store.detach = null;
    }
  };
}

/**
 * `win`'s keyboard height. While the module listens, it is the height
 * measured at the last report. Every reader of a keyboard change, such as
 * each component's hook, shares that one layout read. Every change of the
 * visual viewport or the window is a report, so a reader between two reports
 * sees the current height. With nothing listening yet, the call measures the
 * height now.
 */
export function getKeyboardHeight(win: Window): number {
  const store = stores.get(win);
  return store?.detach != null ? store.height : measureKeyboardHeight(win);
}

/**
 * Whether focusing `element` brings up a keyboard for typing text. A control
 * with `inputmode="none"` brings up none.
 */
export function isTextEntryControl(
  element: Element | null,
): element is HTMLElement {
  if (
    element instanceof HTMLElement &&
    element.getAttribute('inputmode') === 'none'
  ) {
    return false;
  }
  if (element instanceof HTMLTextAreaElement) {
    return !element.disabled && !element.readOnly;
  }
  if (element instanceof HTMLInputElement) {
    return (
      !element.disabled &&
      !element.readOnly &&
      !NON_TEXT_INPUT_TYPES.has(
        (element.getAttribute('type') ?? 'text').toLowerCase(),
      )
    );
  }
  return (
    element instanceof HTMLElement &&
    element.matches('[contenteditable]:not([contenteditable="false"])')
  );
}

/** The text-entry control inside `container` that `target` is or labels. */
export function findTextEntryControl(
  target: EventTarget | null,
  container: HTMLElement,
): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const direct = target.closest(
    'input, textarea, [contenteditable]:not([contenteditable="false"])',
  );
  if (container.contains(direct) && isTextEntryControl(direct)) {
    return direct;
  }

  const label = target.closest('label');
  const control = label instanceof HTMLLabelElement ? label.control : null;
  return container.contains(control) && isTextEntryControl(control)
    ? control
    : null;
}

/** The caller's rules for refuseFocusReveal. */
export interface RefuseFocusRevealOptions {
  /** Whether to claim at all just now, checked on every blur. */
  isActive?: () => boolean;
  /** The control a focus move is heading to, when this caller claims it. */
  claim: (destination: EventTarget | null) => HTMLElement | null;
  /** Focus left `origin` for nothing (the keyboard's Done): park it, if at all. */
  park?: (origin: EventTarget | null) => void;
}

/**
 * Delivers the focus moves `claim` accepts with `preventScroll`, so the
 * browser never reveals their destination itself. It stops when the caller
 * runs the returned function.
 *
 * The browser dispatches `blur` in the capture phase ahead of its own focus
 * step, and `blur` names the destination in `relatedTarget`. Focusing it there
 * with preventScroll settles the change. The browser's step then finds the
 * element already active, so it dispatches nothing further and reveals
 * nothing.
 *
 * @example
 * ```
 * const stop = refuseFocusReveal(document, {
 *   claim: target => findTextEntryControl(target, body),
 *   park: () => sheet.focus({preventScroll: true}),
 * });
 * ```
 */
// One capture-phase `blur` listener per document serves every caller of
// refuseFocusReveal in it, so document listeners do not grow with the number
// of instances. The first caller adds it, and the last removes it.
const focusTakeovers = new WeakMap<
  Document,
  {
    listener: (event: FocusEvent) => void;
    callers: Set<(event: FocusEvent) => void>;
  }
>();

export function refuseFocusReveal(
  doc: Document,
  {isActive, claim, park}: RefuseFocusRevealOptions,
): () => void {
  const onBlur = (event: FocusEvent) => {
    if (isActive != null && !isActive()) {
      return;
    }
    const destination = claim(event.relatedTarget);
    if (destination != null) {
      if (destination !== doc.activeElement) {
        destination.focus({preventScroll: true});
      }
      return;
    }
    if (event.relatedTarget == null) {
      park?.(event.target);
    }
  };
  let shared = focusTakeovers.get(doc);
  if (shared == null) {
    const callers = new Set<(event: FocusEvent) => void>();
    // Callers hear each blur in the order they came, as separate listeners
    // would; one that stopped during this blur no longer hears it.
    const listener = (event: FocusEvent) => {
      for (const caller of [...callers]) {
        if (callers.has(caller)) {
          caller(event);
        }
      }
    };
    // `blur` does not bubble: only the capture phase hears every one, and it
    // runs before the browser's own focus step.
    doc.addEventListener('blur', listener, true);
    shared = {listener, callers};
    focusTakeovers.set(doc, shared);
  }
  shared.callers.add(onBlur);
  return () => {
    const current = focusTakeovers.get(doc);
    if (current == null || !current.callers.delete(onBlur)) {
      return;
    }
    if (current.callers.size === 0) {
      doc.removeEventListener('blur', current.listener, true);
      focusTakeovers.delete(doc);
    }
  };
}

/**
 * Test-only: how many callers refuse the focus reveal in `doc`, through its
 * one shared listener. Not part of the runtime API.
 *
 * @internal
 */
export function __focusTakeoverCallersForTest(doc: Document): number {
  return focusTakeovers.get(doc)?.callers.size ?? 0;
}

/** The caller's rules for watchRevealPan. */
export interface WatchRevealPanOptions {
  /** Whether the focused field is the caller's to keep in view. */
  owns: (focused: HTMLElement) => boolean;
  /** Called on every touch start, which ends the watch for the report. */
  onTouch?: () => void;
}

/** A watch for the browser's own reveal pan (see watchRevealPan). */
export interface RevealPanWatch {
  /** A report changed the keyboard's height: remember where everything sat. */
  report: () => void;
  /** Whether the visual viewport has since moved down as a reveal pan. */
  isRevealPan: (height: number) => boolean;
  /**
   * Pans the visual viewport back to where it sat at the report, without
   * scrolling the document. It scrolls `anchor` into view, an element fixed at
   * the layout viewport's top, or else a probe fixed where the viewport sat.
   */
  putBack: (anchor?: Element | null) => void;
  /** Ends the watch; the document's touch listener goes with its last watch. */
  stop: () => void;
}

/**
 * Some browsers reveal a focused field themselves, after the keyboard's
 * report, by panning the visual viewport to it while the keyboard still
 * covers it. Firefox for Android pans 54 to 143 ms after the report. Chrome
 * 124 on Android animates a pan of the keyboard's whole height from about
 * 150 ms after it. Such a pan moves the visual viewport down within the
 * layout viewport. Since the report there is no touch, document scroll or
 * zoom, and a text field the caller owns has focus. The watch reads the
 * behavior, never the user agent. The caller lands its field itself and
 * puts the pan back. Every keyboard-aware surface can use it, as BottomSheet's
 * hook below does.
 *
 * @example
 * ```
 * const watch = watchRevealPan(window, {owns: field => region.contains(field)});
 * // On a report that changes the height: watch.report();
 * // On any later report: if (watch.isRevealPan(height)) watch.putBack();
 * ```
 */
// One capture-phase touch listener per document serves every reveal-pan
// watch in it, so no instance adds a document listener. The first watch adds
// it, and the last removes it.
const touchStartWatches = new WeakMap<
  Document,
  {listener: () => void; watches: Set<() => void>}
>();

function watchTouchStarts(doc: Document, onTouchStart: () => void): () => void {
  let shared = touchStartWatches.get(doc);
  if (shared == null) {
    const watches = new Set<() => void>();
    const listener = () => {
      for (const watch of [...watches]) {
        watch();
      }
    };
    doc.addEventListener('touchstart', listener, {
      capture: true,
      passive: true,
    });
    shared = {listener, watches};
    touchStartWatches.set(doc, shared);
  }
  shared.watches.add(onTouchStart);
  return () => {
    const current = touchStartWatches.get(doc);
    if (current == null || !current.watches.delete(onTouchStart)) {
      return;
    }
    if (current.watches.size === 0) {
      doc.removeEventListener('touchstart', current.listener, true);
      touchStartWatches.delete(doc);
    }
  };
}

export function watchRevealPan(
  win: Window,
  {owns, onTouch}: WatchRevealPanOptions,
): RevealPanWatch {
  const doc = win.document;
  let atReport: {x: number; y: number; top: number; scale: number} | null =
    null;
  let touchedSinceReport = false;
  const stopTouchStarts = watchTouchStarts(doc, () => {
    touchedSinceReport = true;
    onTouch?.();
  });
  return {
    report: () => {
      const viewport = win.visualViewport;
      atReport =
        viewport == null
          ? null
          : {
              x: win.scrollX,
              y: win.scrollY,
              top: viewport.offsetTop,
              scale: viewport.scale,
            };
      touchedSinceReport = false;
    },
    isRevealPan: height => {
      const viewport = win.visualViewport;
      const focused = doc.activeElement;
      return (
        viewport != null &&
        atReport != null &&
        !touchedSinceReport &&
        height > 0 &&
        viewport.offsetTop > atReport.top &&
        viewport.scale === atReport.scale &&
        win.scrollX === atReport.x &&
        win.scrollY === atReport.y &&
        focused instanceof HTMLElement &&
        isTextEntryControl(focused) &&
        owns(focused)
      );
    },
    putBack: anchor => {
      const options: ScrollIntoViewOptions = {
        block: 'start',
        inline: 'nearest',
        behavior: 'instant',
      };
      if (anchor != null) {
        anchor.scrollIntoView(options);
        return;
      }
      // A fixed element sits in the layout viewport, which the pan does not
      // move: scrolling its top into view pans the visual viewport back.
      const probe = doc.createElement('div');
      probe.style.position = 'fixed';
      probe.style.left = '0';
      probe.style.top = `${atReport?.top ?? 0}px`;
      probe.style.width = '1px';
      probe.style.height = '1px';
      probe.style.visibility = 'hidden';
      probe.style.pointerEvents = 'none';
      (doc.body ?? doc.documentElement).append(probe);
      probe.scrollIntoView(options);
      probe.remove();
    },
    stop: stopTouchStarts,
  };
}

interface UseSheetKeyboardOptions {
  bodyRef: RefObject<HTMLElement | null>;
  bottomClearance: number;
  isEnabled: boolean;
  isFullyExpanded: boolean;
  isPageScrollLocked: boolean;
  isSheetTraveling: boolean;
  isOpen: boolean;
  isPresented: boolean;
  sheetRef: RefObject<HTMLDivElement | null>;
}

interface KeyboardGeometry {
  bodyBottom: number;
}

function getObstructionTop(): number {
  return layoutViewportHeight(window) - getKeyboardHeight(window);
}

// Windows whose browser revealed a focused field itself right after the
// keyboard's report, by panning the visual viewport to it. Firefox for
// Android does so 54 to 143 ms after the report while the field is under the
// keyboard. The module learns this from the behavior, never from the user
// agent.
// From then on, a sheet there reveals its field at once, in the report's own
// frame.
let revealsAtReport = new WeakSet<Window>();

/** Forgets every window's recorded reveal, for tests. */
export function __resetRevealsAtReportForTest(): void {
  revealsAtReport = new WeakSet<Window>();
}

// How far the body runs under the keyboard's top, CSS px. The keyboard's top
// comes from `innerHeight`, a whole number of CSS px, but the visual viewport
// and element rects are fractional. On the Android emulator, Chrome's visual
// viewport is 754.3 px over a 754 px layout viewport. A sheet sized to it
// then ends 0.3 px below `innerHeight` with no keyboard up. So an overlap
// under one CSS px is `innerHeight`'s precision, not an obstruction.
function overlapOf(bodyBottom: number, obstructionTop: number): number {
  const overlap = bodyBottom - obstructionTop;
  return overlap > KEYBOARD_EPSILON ? overlap : 0;
}

// Under half a pixel is rounding, not a keyboard.
function isVisualViewportRecovered(): boolean {
  return getKeyboardHeight(window) <= 0.5;
}

/**
 * BottomSheet's use of the keyboard: a Tall sheet's scroll range, its focus
 * moves and its dismissal (see README.md). Returns the room the keyboard
 * takes at the end of the body, CSS px, or 0 without a keyboard.
 */
export function useSheetKeyboard({
  bodyRef,
  bottomClearance,
  isEnabled,
  isFullyExpanded,
  isPageScrollLocked,
  isSheetTraveling,
  isOpen,
  isPresented,
  sheetRef,
}: UseSheetKeyboardOptions): number {
  // The room the keyboard takes at the end of the body, CSS px. The sheet
  // lays it out through a functional style on its own body.
  const [keyboardInset, setKeyboardInset] = useState(0);
  const hasKeyboardLayoutRef = useRef(false);
  const retainKeyboardLayoutRef = useRef(false);
  const isFullyExpandedRef = useRef(isFullyExpanded);
  const isOpenRef = useRef(isOpen);
  isFullyExpandedRef.current = isFullyExpanded;
  isOpenRef.current = isOpen;
  // Touch-only work, the ride and the reveal-pan watch, attaches only under a
  // coarse primary pointer (the touch query). Under a fine one, the hook
  // registers no touch listener.
  const isTouch = useMediaQuery(TOUCH_QUERY, false);

  useEffect(() => {
    if (!isEnabled || !isSheetTraveling) {
      return;
    }
    const sheet = sheetRef.current;
    const activeElement = document.activeElement;
    if (
      sheet &&
      activeElement instanceof HTMLElement &&
      activeElement !== sheet &&
      sheet.contains(activeElement)
    ) {
      // Keep the current keyboard scroll range while focusing the sheet
      // dismisses the keyboard. Viewport resize events unwind that layout as
      // the visual viewport recovers, avoiding a content jump on the first
      // drag frame.
      retainKeyboardLayoutRef.current = hasKeyboardLayoutRef.current;
      sheet.focus({preventScroll: true});
    }
  }, [isEnabled, isSheetTraveling, sheetRef]);

  useEffect(() => {
    if (!isEnabled || !isPresented || isOpen) {
      return;
    }
    const sheet = sheetRef.current;
    const activeElement = document.activeElement;
    if (
      sheet &&
      activeElement instanceof HTMLElement &&
      activeElement !== sheet &&
      sheet.contains(activeElement)
    ) {
      retainKeyboardLayoutRef.current = hasKeyboardLayoutRef.current;
      activeElement.blur();
    }
  }, [isEnabled, isOpen, isPresented, sheetRef]);

  useEffect(() => {
    const body = bodyRef.current;
    const sheet = sheetRef.current;
    if (!isEnabled || !isPresented || !body) {
      return;
    }

    let keyboardGeometry: KeyboardGeometry | null = null;
    // Where a smooth reveal under way is taking the body's scrollTop.
    let smoothTarget: number | null = null;
    // The room laid out at the end of the body, CSS px, and the scroll range
    // it adds there. The room's drop takes that range back. The two can
    // differ: Chrome 124 added 344 px of range for a 360 px room.
    let room = 0;
    let roomRange = 0;
    // Where the keyboard layout guide publishes the keyboard's own slide, as
    // Gboard's in Chrome on Android, the sheet's content rides it. This needs
    // a coarse primary pointer and Chrome's schedule. Under a fine pointer
    // nothing of the ride attaches. In a browser without the VirtualKeyboard
    // API, such as iOS Safari or Firefox for Android, the guide never starts.
    // There the room follows the reports. The hook subscribes to the guide
    // before the keyboard module below, so the guide publishes a report's
    // transition before the reveal reads it.
    const guide =
      isTouch && keyboardProfileOf(window) === 'chromium'
        ? getKeyboardLayoutGuide(window)
        : null;
    const contentAnimator = (): Animator | null => {
      const content = body.firstElementChild;
      return guide != null && content instanceof HTMLElement
        ? animatorFor(content)
        : null;
    };
    // How far a ride has moved the content from where its layout puts it, as
    // the page draws it now. The reveal reads a control's rect in the same
    // frame.
    const rideOffset = () => {
      const content = body.firstElementChild;
      if (!(content instanceof HTMLElement)) {
        return 0;
      }
      const translate = getComputedStyle(content).translate;
      return parseFloat(translate.split(' ')[1] ?? '') || 0;
    };
    // The keyboard's show the guide plays on its slide right now, if any.
    const showOnSlide = (): KeyboardTransition | null => {
      const transition = guide?.transition;
      return transition != null &&
        transition.kind === 'show' &&
        transition.animated &&
        transition.curve != null &&
        performance.now() < transition.start + transition.curve.durationMs
        ? transition
        : null;
    };
    // A hide the hook holds the room through (see holdRoomThrough).
    let heldHide: {readonly release: () => void} | null = null;
    let documentScrollAtKeyboard: {x: number; y: number} | null = null;
    // The keyboard's top and the body's scroll when the keyboard came up. A
    // keyboard that closes puts the body back at that scroll.
    let keyboardObstructionTop: number | null = null;
    let bodyScrollTopAtKeyboard: number | null = null;
    // The hook takes focus moves over where this window measures the
    // keyboard, never by user agent, and only under a coarse primary pointer.
    // Under a fine one, it registers no touch-only listener.
    // Desktop Safari and Firefox measure too, but show no on-screen keyboard
    // and keep the browser's own focus. The effect runs again when the
    // pointer changes, so a tablet that docks a mouse drops the claim.
    const ownsFocusTransitions = isTouch && isKeyboardMeasurable(window);

    // Lays the inset out before anything measures or scrolls the body: the
    // reveal scrolls into the room it adds in the same frame.
    const writeInset = (inset: number) => {
      const changes = inset !== room;
      const rangeBefore = changes ? body.scrollHeight : 0;
      room = inset;
      // eslint-disable-next-line @eslint-react/dom-no-flush-sync -- the reveal scrolls into this room in the same frame, so it must be laid out before the reveal measures
      flushSync(() => setKeyboardInset(inset));
      if (changes) {
        roomRange =
          inset === 0
            ? 0
            : Math.max(0, roomRange + body.scrollHeight - rangeBefore);
      }
    };

    const clearKeyboardLayout = () => {
      writeInset(0);
      if (bodyScrollTopAtKeyboard != null) {
        smoothTarget = null;
        body.scrollTop = bodyScrollTopAtKeyboard;
      }
      keyboardGeometry = null;
      keyboardObstructionTop = null;
      bodyScrollTopAtKeyboard = null;
      documentScrollAtKeyboard = null;
      hasKeyboardLayoutRef.current = false;
      retainKeyboardLayoutRef.current = false;
    };

    const scrollBodyBy = (
      distance: number,
      smoothly: boolean,
      ride: KeyboardTransition | null = null,
    ) => {
      smoothTarget = null;
      const animator = ride == null ? null : contentAnimator();
      if (ride != null && animator != null) {
        // The body lands at once, and its content rides the keyboard's slide
        // up from where it was, from the slide's start. Content that joins
        // the slide late is where the keyboard is (rideKeyboard). A further
        // scroll during the slide adds to the same ride.
        const before = body.scrollTop;
        body.scrollTop = before + distance;
        const moved = body.scrollTop - before;
        // Only what the body actually scrolled rides. A remainder under the
        // scroll position's precision moves nothing, so the ride under way
        // stays on its curve.
        if (moved !== 0) {
          animator.set({y: animator.get('y', ride.start) + moved});
          rideKeyboard(animator, {y: 0}, ride);
        }
        return;
      }
      if (typeof body.scrollBy !== 'function') {
        body.scrollTop += distance;
        return;
      }
      // Reduce Motion applies on any pointer.
      const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior = smoothly && !reduceMotion ? 'smooth' : 'instant';
      if (behavior === 'smooth') {
        smoothTarget = body.scrollTop + distance;
      }
      body.scrollBy({
        top: distance,
        // Not 'auto', which defers to the element's computed
        // `scroll-behavior`. A consumer's `scroll-behavior: smooth` would then
        // animate a scroll this hook needs to land in the same frame.
        behavior,
      });
    };

    // The distance a smooth reveal under way has still to scroll, as far as
    // the body can scroll. It is 0 once it has landed, or with none under way.
    const smoothDistanceLeft = () => {
      if (smoothTarget == null) {
        return 0;
      }
      const maxScroll = Math.max(
        body.scrollTop,
        body.scrollHeight - body.clientHeight,
      );
      const target = Math.min(smoothTarget, maxScroll);
      const left = target - body.scrollTop;
      return Math.abs(left) < 1 ? 0 : left;
    };

    // Scroll `control` into the part of the body the keyboard leaves visible,
    // reading live geometry each time.
    const scrollControlIntoSafeArea = (
      control: HTMLElement,
      smoothly: boolean,
      ride: KeyboardTransition | null = null,
    ) => {
      const measuredBodyRect = body.getBoundingClientRect();
      const measuredControlRect = control.getBoundingClientRect();
      const obstructionTop = getObstructionTop();
      // Under a pixel of overhang is `innerHeight`'s precision, not a
      // keyboard: no suggestion clearance then (overlapOf).
      const overlap = overlapOf(measuredBodyRect.bottom, obstructionTop);
      const clearance = overlap > 0 ? bottomClearance : 0;
      const safeTop = measuredBodyRect.top;
      const safeBottom = Math.min(
        measuredBodyRect.bottom,
        obstructionTop - clearance,
      );
      if (safeBottom <= safeTop) {
        return;
      }

      // Where the control will be once a smooth reveal under way lands. If
      // that lands the control, a second scroll would overshoot in Firefox.
      // Firefox keeps adding a smooth scrollBy's distance after another
      // scroll. A ride's translate is not where the layout puts the control
      // either.
      const pending = smoothDistanceLeft() + rideOffset();
      const controlBottom = measuredControlRect.bottom - pending;
      const controlTop = measuredControlRect.top - pending;
      if (controlBottom > safeBottom) {
        scrollBodyBy(controlBottom - safeBottom, smoothly, ride);
      } else if (controlTop < safeTop) {
        scrollBodyBy(controlTop - safeTop, smoothly, ride);
      }
    };

    const applyKeyboardGeometry = (geometry: KeyboardGeometry) => {
      const obstructionTop = getObstructionTop();
      // A collapsed detent can extend the body below the layout viewport even
      // after the keyboard closes, so body overlap alone cannot identify
      // recovery. Once the visual viewport is full height again, release the
      // retained keyboard layout unconditionally.
      if (isVisualViewportRecovered()) {
        clearKeyboardLayout();
        return;
      }
      const overlap = overlapOf(geometry.bodyBottom, obstructionTop);
      if (overlap === 0) {
        clearKeyboardLayout();
        return;
      }

      const inset = Math.max(
        0,
        geometry.bodyBottom - (obstructionTop - bottomClearance),
      );
      writeInset(inset);
    };

    // Take every focus move into a field over before the browser performs it
    // (refuseFocusReveal). That handler does not reveal the field. Focusing
    // it raises focusin, and the viewport report that follows the keyboard
    // raises another. Both schedule the reveal below, which knows the safe
    // area and scrolls only the sheet's own body.
    //
    // The keyboard's Done button parks focus on the body. The handler parks
    // focus that leaves for nothing on the sheet instead. Then a second tap on
    // the same field is still a move the handler sees. Left on the body, the field
    // is already `document.activeElement` on the next tap. Then no blur fires,
    // and the browser reveals the field its own way. This applies only while
    // the sheet is open. Closing blurs the field too, and no next tap needs a
    // claim. The host restores focus to whatever opened the sheet.
    const claimFocusTransitions = () =>
      refuseFocusReveal(document, {
        isActive: () => isFullyExpandedRef.current,
        claim: destination => findTextEntryControl(destination, body),
        park: origin => {
          if (isOpenRef.current && findTextEntryControl(origin, body)) {
            sheet?.focus({preventScroll: true});
          }
        },
      });

    const revealFocusedControl = () => {
      // Through a hide the sheet rides, its layout holds until the end.
      if (heldHide != null) {
        return;
      }
      const obstructionTop = getObstructionTop();
      const activeElement = document.activeElement;
      const focusedControl =
        activeElement instanceof HTMLElement &&
        body.contains(activeElement) &&
        isTextEntryControl(activeElement)
          ? activeElement
          : null;
      // The keyboard can close while its field keeps focus, as a downward
      // dismissal does on iOS. The full clear puts back the room and the
      // body's scroll. The hook then reveals the field still focused in the
      // restored body, because it may not be the field that opened the
      // keyboard.
      if (hasKeyboardLayoutRef.current && isVisualViewportRecovered()) {
        clearKeyboardLayout();
        if (isFullyExpandedRef.current && focusedControl != null) {
          scrollControlIntoSafeArea(focusedControl, false);
        }
        return;
      }
      if (!isFullyExpandedRef.current || focusedControl == null) {
        if (retainKeyboardLayoutRef.current && keyboardGeometry) {
          applyKeyboardGeometry(keyboardGeometry);
          return;
        }
        clearKeyboardLayout();
        return;
      }

      // An iOS keyboard dismissed by a drag can leave its accessory bar, so
      // the visual viewport grows short of full height. The body goes back
      // to its scroll from before the keyboard as soon as that starts. The
      // reveal below still clears what covers a low field. The new top is
      // kept, so a later content change does not repeat this.
      if (
        hasKeyboardLayoutRef.current &&
        keyboardObstructionTop != null &&
        obstructionTop > keyboardObstructionTop + 0.5 &&
        bodyScrollTopAtKeyboard != null
      ) {
        smoothTarget = null;
        body.scrollTop = bodyScrollTopAtKeyboard;
        keyboardObstructionTop = obstructionTop;
      }

      retainKeyboardLayoutRef.current = false;

      const measuredBodyRect = body.getBoundingClientRect();
      const overlap = overlapOf(measuredBodyRect.bottom, obstructionTop);
      // The extra clearance leaves room for mobile suggestion UI, but only
      // while the visual viewport actually overlaps the sheet. With no
      // obstruction, ordinary desktop and hardware-keyboard focus must not
      // shift an already visible control.
      const clearance = overlap > 0 ? bottomClearance : 0;
      keyboardGeometry =
        overlap > 0
          ? {
              bodyBottom: measuredBodyRect.bottom,
            }
          : null;
      // Where the document sits with the keyboard up and nothing yet shifted:
      // the position handleDocumentScroll returns to. Captured on the
      // transition only — a reveal that runs after the browser has already
      // scrolled would otherwise record the shifted position as correct.
      if (overlap > 0 && !hasKeyboardLayoutRef.current) {
        keyboardObstructionTop = obstructionTop;
        bodyScrollTopAtKeyboard = body.scrollTop;
        if (isPageScrollLocked) {
          documentScrollAtKeyboard = {x: window.scrollX, y: window.scrollY};
        }
      }
      hasKeyboardLayoutRef.current = overlap > 0;

      const inset =
        overlap > 0
          ? Math.max(0, measuredBodyRect.bottom - (obstructionTop - clearance))
          : 0;
      writeInset(inset);

      scrollControlIntoSafeArea(
        focusedControl,
        overlap > 0 && !revealsAtReport.has(window),
        overlap > 0 ? showOnSlide() : null,
      );
    };

    // Where the body's scroll rests once the keyboard is gone, as
    // revealFocusedControl leaves it. The clear puts back the scroll from
    // before the keyboard, within the range left once the room drops. The
    // reveal then brings a field that keeps focus into the body's view.
    const restingScrollTop = (): number => {
      const scrollTop = body.scrollTop;
      const maxAtRest = Math.max(
        0,
        body.scrollHeight - roomRange - body.clientHeight,
      );
      let resting = Math.min(maxAtRest, bodyScrollTopAtKeyboard ?? scrollTop);
      const active = document.activeElement;
      if (
        isFullyExpandedRef.current &&
        active instanceof HTMLElement &&
        body.contains(active) &&
        isTextEntryControl(active)
      ) {
        const bodyRect = body.getBoundingClientRect();
        const rect = active.getBoundingClientRect();
        // Where the layout puts the control at the resting scroll.
        const shift = scrollTop - resting - rideOffset();
        if (rect.bottom + shift > bodyRect.bottom) {
          resting += rect.bottom + shift - bodyRect.bottom;
        } else if (rect.top + shift < bodyRect.top) {
          resting += rect.top + shift - bodyRect.top;
        }
        resting = Math.min(maxAtRest, Math.max(0, resting));
      }
      return resting;
    };

    // Through a hide on the keyboard's slide, the room stays, so nothing
    // drops while the keyboard still covers the sheet's bottom. The content
    // rides down on the hide's curve by the scroll the body drops at rest. At
    // rest, the room drops, the scroll goes back, and the translate clears in
    // one commit.
    const holdRoomThrough = (transition: KeyboardTransition) => {
      heldHide?.release();
      const animator = contentAnimator();
      const drop = body.scrollTop - restingScrollTop();
      const handle =
        animator != null && drop !== 0
          ? rideKeyboard(animator, {y: drop}, transition)
          : null;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const hold = {
        release: () => {
          clearTimeout(timer);
          if (heldHide === hold) {
            heldHide = null;
          }
        },
      };
      heldHide = hold;
      const commit = () => {
        if (heldHide !== hold) {
          return;
        }
        heldHide = null;
        revealFocusedControl();
        animator?.set({y: 0});
      };
      if (handle == null) {
        const end = transition.start + (transition.curve?.durationMs ?? 0);
        timer = setTimeout(commit, Math.max(0, end - performance.now()));
      } else {
        void handle.finished.then(commit);
      }
    };
    const unsubscribeGuide = guide?.subscribe(transition => {
      // A jump lands with the reports: only a slide rides.
      if (transition.curve == null) {
        return;
      }
      if (transition.kind === 'hide') {
        if (hasKeyboardLayoutRef.current && transition.animated) {
          holdRoomThrough(transition);
        }
        return;
      }
      if (heldHide != null) {
        // The keyboard comes back before it is down (focus returns): the
        // room never left, so the content rides back to its place with it.
        heldHide.release();
        const animator = contentAnimator();
        if (animator != null) {
          rideKeyboard(animator, {y: 0}, transition);
        }
      }
    });

    let animationFrame = 0;
    const scheduleReveal = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(revealFocusedControl);
    };

    // Resuming the app re-reveals the focused field with no focus event to
    // claim. The reveal above never runs, and the document scrolls with the
    // fixed sheet. Put that scroll back on the event that reports it, and
    // reveal again inside the sheet.
    //
    // This applies only while the page is locked. Only then can a document
    // scroll not be the user's own. Behind a non-modal sheet the page stays
    // scrollable, and a revert there would fight the user.
    const handleDocumentScroll = () => {
      const expected = documentScrollAtKeyboard;
      if (
        expected == null ||
        (window.scrollX === expected.x && window.scrollY === expected.y)
      ) {
        return;
      }
      window.scrollTo(expected.x, expected.y);
      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLElement &&
        body.contains(activeElement) &&
        isTextEntryControl(activeElement)
      ) {
        scrollControlIntoSafeArea(activeElement, false);
      }
    };

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(scheduleReveal);
    const refreshObservedLayout = () => {
      if (!resizeObserver) {
        return;
      }
      resizeObserver.disconnect();

      // Body and sheet box changes include public height and xstyle updates.
      // The inset pseudo-element is the content box's last box. Where the
      // content grows with it, the observation runs the reveal again. The
      // reveal computes the same inset from the body's unchanged box, so
      // nothing feeds back into the sheet's geometry.
      const targets = new Set<Element>([body]);
      if (sheet) {
        targets.add(sheet);
      }
      for (const child of body.children) {
        targets.add(child);
      }
      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLElement &&
        body.contains(activeElement)
      ) {
        for (
          let element: HTMLElement | null = activeElement;
          element && element !== body;
          element = element.parentElement
        ) {
          targets.add(element);
        }
      }
      for (const target of targets) {
        resizeObserver.observe(target);
      }
    };
    const mutationObserver =
      typeof MutationObserver === 'undefined'
        ? null
        : new MutationObserver(records => {
            // Skip the sheet's own attribute writes on the body. Consumer
            // DOM, text, class, style, or visibility changes can all move the
            // focused control without a viewport event. The room's write on
            // the content box schedules one more reveal, which finds the same
            // room and settles.
            if (
              records.every(
                record =>
                  record.type === 'attributes' && record.target === body,
              )
            ) {
              return;
            }
            refreshObservedLayout();
            scheduleReveal();
          });
    const handleFocusIn = () => {
      refreshObservedLayout();
      scheduleReveal();
    };
    const handleFocusOut = () => {
      // Keep the added scroll range while the keyboard animates away. A focus
      // transition to another text-entry control cancels this in focusin.
      retainKeyboardLayoutRef.current = hasKeyboardLayoutRef.current;
      scheduleReveal();
    };
    const handleSheetTransitionEnd = (event: TransitionEvent) => {
      if (event.target === sheet && event.propertyName === 'transform') {
        scheduleReveal();
      }
    };

    const stopClaiming = ownsFocusTransitions ? claimFocusTransitions() : null;
    // The hook reveals a keyboard report in its own frame, not the next. A browser
    // that reveals a focused field itself pans the visual viewport to it a few
    // frames after the report. It does so if the keyboard still covers the
    // field. Such a pan moves the visual viewport down within the layout
    // viewport, with no touch, document scroll or zoom since the report. Once
    // the sheet lands the field itself, the hook puts the pan back: it scrolls
    // the full-viewport dialog's top into view. On every later report, the field
    // lands at once.
    let lastHeight = getKeyboardHeight(window);
    // Under a coarse primary pointer only: the watch reads touches, and an
    // on-screen keyboard's pan comes with a touch screen.
    const revealPan = isTouch
      ? watchRevealPan(window, {
          owns: focused =>
            hasKeyboardLayoutRef.current && body.contains(focused),
          // The reader's own scroll may stop a smooth reveal short: forget
          // where it was going.
          onTouch: () => {
            smoothTarget = null;
          },
        })
      : null;
    // Every keyboard report reaches the reveal through the keyboard module's
    // one set of listeners.
    const unsubscribe = subscribeKeyboardHeight(window, event => {
      if (event.type !== 'viewport') {
        return;
      }
      if (event.height !== lastHeight) {
        lastHeight = event.height;
        revealPan?.report();
        cancelAnimationFrame(animationFrame);
        revealFocusedControl();
        return;
      }
      if (revealPan?.isRevealPan(event.height) === true) {
        revealsAtReport.add(window);
        cancelAnimationFrame(animationFrame);
        // A smooth reveal still under way lands the field where it is going.
        // Another scroll on top of it would overshoot in Firefox, which keeps
        // adding a smooth scrollBy's distance after an instant scroll. The
        // field ended 244 px too high there. With none under way, the field
        // lands at once.
        const distanceLeft = smoothDistanceLeft();
        if (distanceLeft === 0) {
          revealFocusedControl();
        }
        // The hook puts the pan back only if the sheet holds the field above
        // the keyboard with its own scroller. Rects are in layout-viewport
        // coordinates, which the pan does not move. A ride still draws the
        // field lower than its layout, so its offset does not count. A field
        // the sheet cannot bring up keeps the browser's reveal.
        const activeElement = document.activeElement;
        const dialog = sheet?.closest('dialog');
        if (
          dialog != null &&
          activeElement instanceof HTMLElement &&
          activeElement.getBoundingClientRect().bottom -
            rideOffset() -
            distanceLeft <=
            getObstructionTop()
        ) {
          // The full-viewport dialog is fixed at the layout viewport's top.
          revealPan?.putBack(dialog);
        }
        return;
      }
      scheduleReveal();
    });
    body.addEventListener('focusin', handleFocusIn);
    body.addEventListener('focusout', handleFocusOut);
    sheet?.addEventListener('transitionend', handleSheetTransitionEnd);
    window.addEventListener('scroll', handleDocumentScroll);
    mutationObserver?.observe(body, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
    refreshObservedLayout();
    // The dialog enters the top layer in a later effect. Wait until the next
    // frame so flex geometry is final before measuring the body.
    scheduleReveal();

    return () => {
      cancelAnimationFrame(animationFrame);
      stopClaiming?.();
      unsubscribe();
      unsubscribeGuide?.();
      heldHide?.release();
      contentAnimator()?.set({y: 0});
      revealPan?.stop();
      body.removeEventListener('focusin', handleFocusIn);
      body.removeEventListener('focusout', handleFocusOut);
      sheet?.removeEventListener('transitionend', handleSheetTransitionEnd);
      window.removeEventListener('scroll', handleDocumentScroll);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      setKeyboardInset(0);
      hasKeyboardLayoutRef.current = false;
      retainKeyboardLayoutRef.current = false;
    };
  }, [
    bodyRef,
    bottomClearance,
    isEnabled,
    isPageScrollLocked,
    isPresented,
    isTouch,
    sheetRef,
  ]);
  return keyboardInset;
}
