// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useChatKeyboard.ts
 * @input React refs, the keyboard module's reports and focus claims, the
 *   keyboard layout guide, observeKeyboardDismiss, the animator, the touch
 *   query and the layout viewport's height
 * @output useChatKeyboard: the lift ChatLayout lays its dock and message area
 *   out with, and the refs for its dock, message area and composer region
 * @position ChatLayout's keyboard behavior (Chat/ChatLayout.tsx). It is
 *   internal to core.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Chat/ChatLayout.tsx and ChatLayout.doc.mjs
 * - /packages/core/src/keyboard/README.md (consumers)
 */

import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from 'react';
import {createMotionAnimator, type Animator} from '../motion/animator';
import {
  KEYBOARD_EPSILON,
  claimTapFocus,
  findTextEntryControl,
  getKeyboardHeight,
  isKeyboardMeasurable,
  refuseFocusReveal,
  subscribeKeyboardHeight,
  watchRevealPan,
} from '../keyboard/keyboardHeight';
import {
  bringsUpKeyboard,
  getKeyboardLayoutGuide,
  keyboardProfileOf,
} from '../keyboard/keyboardLayoutGuide';
import {rideKeyboard} from '../keyboard/rideKeyboard';
import type {KeyboardTransition} from '../keyboard/keyboardModel';
import {KEYBOARD_SPRING} from '../motion/uikit/springs';
import {timing} from '../motion/uikit/timing';
import {isDismissing, observeKeyboardDismiss} from './transcriptDismiss';
import {layoutViewportHeight} from '../utils/layoutViewport';
import {TOUCH_QUERY, useTouchPresentation} from '../utils/touchPresentation';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';

// A cancelled animation's `finished` rejects with an AbortError: the animation
// is over, which is all a wait for it needs. Any other error is real and
// propagates.
function cancelledIsOver(error: unknown): void {
  if (!(error instanceof DOMException && error.name === 'AbortError')) {
    throw error;
  }
}

/** A stable animator and the callback ref that binds it to an element. */
function useAnimator(): {
  readonly ref: (element: HTMLElement | null) => void;
  readonly animator: Animator;
} {
  const [result] = useState(() => {
    const animator = createMotionAnimator(null);
    return {
      animator,
      ref: (element: HTMLElement | null) => animator.attach(element),
    };
  });
  return result;
}
// The keyboard height, CSS px, re-rendering when a report changes it. 0
// during server render and before hydration reads a viewport. One
// subscription serves the component's life, per window: a subscribe made anew
// each render would resubscribe on every render.
function useKeyboardHeightOf(win: Window | null | undefined): number {
  const target = win ?? (typeof window === 'undefined' ? null : window);
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (target == null) {
        return () => {};
      }
      let last = getKeyboardHeight(target);
      return subscribeKeyboardHeight(target, event => {
        if (event.type === 'viewport' && event.height !== last) {
          last = event.height;
          onChange();
        }
      });
    },
    [target],
  );
  const getSnapshot = useCallback(
    () => (target == null ? 0 : getKeyboardHeight(target)),
    [target],
  );
  return useSyncExternalStore(subscribe, getSnapshot, getServerKeyboardHeight);
}

// The keyboard height during server render and hydration.
function getServerKeyboardHeight(): number {
  return 0;
}

export interface UseChatKeyboardOptions {
  /** ChatLayout's root. */
  rootRef: RefObject<HTMLElement | null>;
  /** The element that scrolls the transcript (the root, or an outer one). */
  scrollRef: RefObject<HTMLElement | null>;
  /**
   * Whether the root scrolls itself (a sticky dock at its bottom) rather
   * than an outer scroller (a fixed dock at the layout viewport's bottom).
   */
  isSelfScrolling: boolean;
}

export interface UseChatKeyboardResult {
  /**
   * The part of the keyboard over the dock, CSS px: the dock's offset from
   * its bottom and the room the message area's end padding adds.
   */
  lift: number;
  /** Callback ref for the dock container. */
  dockRef: (element: HTMLElement | null) => void;
  /** Callback ref for the message area. */
  messagesRef: (element: HTMLElement | null) => void;
  /** Ref for the composer region whose text taps are claimed. */
  composerRef: RefObject<HTMLDivElement | null>;
  /**
   * Whether the touch presentation is on. Only then is the composer region
   * a named group, the target of Done's park. Under a fine pointer it is a
   * plain container.
   */
  isTouch: boolean;
}

// A transcript within this many px of its end counts as at its newest message.
const AT_END_SLOP = 2;
// Extra time after a hide ridden down from a blur would end before the
// keyboard's report must have confirmed it. Safari reports a hide 417 to
// 453 ms after the blur, inside the keyboard notification's span and this.
const VERIFY_SLACK_MS = 150;
// How long the transcript must stay still after the finger lifts before a
// layout that waited for the scroll to end shrinks.
const SCROLL_SETTLE_MS = 150;

// The lift the layout shows: a store the ride's end and keyboard reports
// write, and render reads.
function createLiftStore() {
  let value = 0;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set: (next: number) => {
      if (next !== value) {
        value = next;
        for (const listener of listeners) {
          listener();
        }
      }
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// Controls inside the composer's text (a token's button or link, an island
// that is not editable) keep their own taps, as ChatComposer's click-to-focus
// leaves them.
const OWN_TAPS =
  '[contenteditable="false"], button, a, [role="button"], [data-astryx-token]';

/**
 * The composer's text a touch landed in, when tapping it would bring up the
 * keyboard and the text lacks focus. It is contenteditable text, or a text
 * control (`<textarea>`, `<input>`) passed as the composer's input. The
 * browser would reveal a text control's own tap focus by scrolling the page
 * just the same. Exported for its tests.
 */
export function editableToClaim(target: unknown): HTMLElement | null {
  let node = target as Node | null;
  if (node != null && node.nodeType !== 1) {
    node = node.parentNode;
  }
  const element = node as HTMLElement | null;
  if (element == null || typeof element.closest !== 'function') {
    return null;
  }
  if (isTextControl(element)) {
    return bringsUpKeyboard(element) &&
      element.ownerDocument.activeElement !== element
      ? element
      : null;
  }
  const editable = element.closest<HTMLElement>(
    '[contenteditable]:not([contenteditable="false"])',
  );
  if (editable == null || !bringsUpKeyboard(editable)) {
    return null;
  }
  const own = element.closest(OWN_TAPS);
  if (own != null && editable.contains(own)) {
    return null;
  }
  const active = editable.ownerDocument.activeElement;
  return active === editable || editable.contains(active) ? null : editable;
}

/**
 * The collapsed caret at (x, y): the standard `caretPositionFromPoint`
 * (Firefox has only this one), or WebKit's `caretRangeFromPoint`.
 */
function caretRangeAt(doc: Document, x: number, y: number): Range | null {
  const position = doc.caretPositionFromPoint?.(x, y);
  if (position != null) {
    const range = doc.createRange();
    range.setStart(position.offsetNode, position.offset);
    range.collapse(true);
    return range;
  }
  return doc.caretRangeFromPoint?.(x, y) ?? null;
}

function isTextControl(
  element: Element,
): element is HTMLTextAreaElement | HTMLInputElement {
  return (
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLInputElement
  );
}

/**
 * A text control's caret for a tap at (x, y). It is where the standard
 * `caretPositionFromPoint` maps the point inside the control. Where the
 * browser maps none, it is after the text, the composer's convention for a
 * focus without a point. A control with no text selection stays as it is.
 */
function placeTextControlCaret(
  control: HTMLTextAreaElement | HTMLInputElement,
  x: number,
  y: number,
) {
  if (control.selectionStart == null) {
    return;
  }
  const position = control.ownerDocument.caretPositionFromPoint?.(x, y);
  const offset =
    position != null && position.offsetNode === control
      ? position.offset
      : control.value.length;
  control.setSelectionRange(offset, offset);
}

/**
 * Focuses without Safari's reveal and puts the caret under the finger.
 * Exported for its tests.
 */
export function focusAtPoint(editable: HTMLElement, x: number, y: number) {
  editable.focus({preventScroll: true});
  if (isTextControl(editable)) {
    placeTextControlCaret(editable, x, y);
    return;
  }
  const doc = editable.ownerDocument;
  const range = caretRangeAt(doc, x, y);
  if (
    range != null &&
    editable.isContentEditable &&
    editable.contains(range.startContainer)
  ) {
    const selection = doc.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}

/**
 * Done's park: focus rests on the composer region, which takes focus for the
 * park alone. So a click or a tap beside the composer never focuses it. The
 * region gives the focus stop up as soon as focus leaves it.
 */
function parkFocus(region: HTMLElement): void {
  region.setAttribute('tabindex', '-1');
  region.addEventListener(
    'blur',
    () => {
      region.removeAttribute('tabindex');
    },
    {once: true},
  );
  region.focus({preventScroll: true});
}

/**
 * Messages on iOS keeps its entry field on top of the keyboard. The field
 * rises and falls with the keyboard on the keyboard's own spring. The
 * transcript's scrollable area ends above the field, and a transcript at its
 * newest message stays there. ChatLayout does the same:
 *
 * - Layout follows the keyboard height. The dock rests `lift` px up from its
 *   bottom, the part of the keyboard that covers it. The message area's end
 *   padding grows by the same height, so the newest message can scroll above
 *   the lifted composer. ChatLayout applies `lift` through functional styles,
 *   so the layout is right with no animation.
 * - The ride is polish on top, and the keyboard layout guide times it. The
 *   dock moves on the compositor on the curve the guide publishes, from the
 *   keyboard's own start. So it is where the keyboard is from its first
 *   frame. That curve is the keyboard's own motion: `keyboard.spring` on iOS
 *   and Gboard's slides in Chrome on Android. A transcript at its newest
 *   message rides with it. The layout catches up once the ride ends, and the
 *   translate goes back in the same frame. Under Reduce Motion nothing
 *   travels.
 * - A layout that shrinks waits until no finger scrolls the transcript.
 *   Shrinking mid-scroll would put the end of the messages inside the
 *   scrollport until the scroll caught up. Safari puts that off while the
 *   finger is down, and the sticky dock would leave the bottom.
 * - A drag down the transcript to the composer dismisses the keyboard when
 *   it lifts there, as Messages' `interactive` mode does
 *   (keyboard/keyboardDismiss.ts). The composer is the bar on the keyboard,
 *   so its height is the dismiss padding. It attaches for every pointer. In a
 *   desktop browser, a mouse or pen press takes focus off the composer
 *   itself. The dismissal only blurs the focused field and moves focus
 *   nowhere else.
 * - A tap on the composer's text while it lacks focus focuses it without
 *   Safari's reveal (`preventScroll`) and puts the caret where the finger
 *   lifted. Safari's reveal would scroll the whole page up to show a field
 *   that the keyboard is about to cover. The tap route (claimTapFocus)
 *   attaches only under a finger. Taps on anything else in the composer, and
 *   taps once the text has focus, are the browser's.
 * - The keyboard module's focus takeover (refuseFocusReveal) delivers every
 *   other move into the composer's text the same way. It acts under a
 *   finger, where the module measures the keyboard. Such moves are the
 *   keyboard's previous and next buttons, Tab, and a script's focus from
 *   another element. The keyboard's Done moves focus to the composer region
 *   ChatLayout names. That region is no tab stop and takes focus only for
 *   that park. A script's focus() while nothing has focus raises no event
 *   before Safari reveals the field, so nothing can take that move over. The
 *   composer's own focus routes pass `preventScroll` in this region
 *   (keyboardSurface.ts).
 */
export function useChatKeyboard({
  rootRef,
  scrollRef,
  isSelfScrolling,
}: UseChatKeyboardOptions): UseChatKeyboardResult {
  const dock = useAnimator();
  const messages = useAnimator();
  const composerRef = useRef<HTMLDivElement>(null);
  const keyboardHeight = useKeyboardHeightOf(
    rootRef.current?.ownerDocument.defaultView,
  );
  // The lift the layout shows (read in render, so styles carry it) and its
  // mirror for the handlers below.
  const [liftStore] = useState(createLiftStore);
  const lift = useSyncExternalStore(
    liftStore.subscribe,
    liftStore.get,
    liftStore.get,
  );
  const liftRef = useRef(0);
  // Set while the guide's ride is under way: the layout waits for it. Each
  // ride's number, so only the latest one hands its translate back.
  const ridingRef = useRef(false);
  const rideRef = useRef(0);
  // Where the last ride took the dock's and the transcript's translates
  // (null: the transcript did not ride), until the layout takes them over.
  const dockTargetRef = useRef<number | null>(null);
  const messagesTargetRef = useRef<number | null>(null);
  // Whether the transcript was at its newest message, and where it was
  // scrolled, just before the layout's last change.
  const atEndRef = useRef(false);
  const scrollBeforeRef = useRef(0);
  const commitRef = useRef<() => void>(() => {});
  // Whether the keyboard's changes ride UIKit's keyboard spring: under a
  // finger, where the guide publishes no slide (Safari on iOS, Firefox for
  // Android).
  const springsRef = useRef(false);
  // The touch presentation. Under a coarse primary pointer, three things
  // attach. They are the ride on the keyboard's own motion, the settle that
  // waits for a scrolling finger, and the composer's touch routes. Under a
  // fine one, none of them does.
  // The drag-to-dismiss below attaches for every pointer.
  const touchPresentation = useTouchPresentation();
  const isTouch = touchPresentation.isTouch;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const win = root?.ownerDocument.defaultView;
    if (root == null || win == null) {
      return undefined;
    }
    // A sticky dock rests at the root's bottom edge, which may sit above or
    // below the layout viewport's; a fixed dock rests at the viewport's.
    // While a keyboard is up the dock rises until it clears the keyboard's
    // cover; without one it rests where the layout puts it.
    const liftFor = (inset: number) => {
      if (inset <= 0) {
        return 0;
      }
      // In layout px, as the root's rect is, under a pinch zoom too.
      const viewportBottom = layoutViewportHeight(win);
      const bottom = isSelfScrolling
        ? root.getBoundingClientRect().bottom
        : viewportBottom;
      return Math.max(0, bottom - (viewportBottom - inset));
    };
    const isAtEnd = () => {
      const scroller = scrollRef.current;
      return (
        scroller != null &&
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <
          AT_END_SLOP
      );
    };
    // Fingers on the transcript, and a scroll that has not settled since the
    // last one lifted: a shrinking layout waits for both.
    let touches = 0;
    let settled = true;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      settled = false;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        settled = true;
        commit();
      }, SCROLL_SETTLE_MS);
    };
    const onTouches = (event: TouchEvent) => {
      touches = event.touches.length;
      if (touches === 0) {
        settle();
      }
    };
    const onScroll = () => {
      if (touches === 0 && !settled) {
        settle();
      }
    };

    // The layout takes the keyboard height's lift once no ride is under way.
    // Without the guide, the lift the dock is drawn at, and whether it rode
    // down from a blur that the keyboard's report has not yet confirmed.
    let drawn = liftRef.current;
    let isHiding = false;
    let verifyTimer: ReturnType<typeof setTimeout> | undefined;

    const commit = () => {
      if (ridingRef.current) {
        return;
      }
      const height = getKeyboardHeight(win);
      if (isHiding && height > KEYBOARD_EPSILON) {
        return;
      }
      isHiding = false;
      const next = liftFor(height);
      if (springsRef.current && Math.abs(next - drawn) >= 0.5) {
        rideSpring(next);
        return;
      }
      if (Math.abs(next - liftRef.current) < 0.5) {
        return;
      }
      if (next < liftRef.current && (touches > 0 || !settled)) {
        return;
      }
      atEndRef.current = isAtEnd();
      scrollBeforeRef.current = scrollRef.current?.scrollTop ?? 0;
      drawn = next;
      liftStore.set(next);
    };
    commitRef.current = commit;

    // Hands the layout back once a ride's presented animations are over too.
    // Then a paused animation, from an inspector or a test holding the clock,
    // never stays on top of the new layout.
    const handBack = (rides: Promise<boolean>[], ride: number) => {
      void Promise.all(rides).then(async done => {
        // A newer ride took over: it commits when it ends.
        if (!done.every(Boolean) || ride !== rideRef.current) {
          return;
        }
        const element = dock.animator.element;
        await Promise.all(
          (element?.getAnimations?.() ?? []).map(async animation =>
            animation.finished.catch(cancelledIsOver),
          ),
        );
        if (ride === rideRef.current) {
          ridingRef.current = false;
          commit();
        }
      });
    };

    // Without the guide, nothing publishes the keyboard's slide. The dock,
    // and a transcript at its newest message, ride to the lift `next` on
    // UIKit's keyboard spring, from now, relative to the layout they rest in.
    // The layout waits for the ride, as for the guide's.
    const rideSpring = (next: number) => {
      const target = liftRef.current - next;
      const atEnd = isAtEnd();
      dockTargetRef.current = target;
      messagesTargetRef.current = atEnd ? target : null;
      drawn = next;
      ridingRef.current = true;
      rideRef.current += 1;
      const rides = [
        dock.animator.animate({y: target}, {spring: KEYBOARD_SPRING}).finished,
      ];
      if (atEnd) {
        rides.push(
          messages.animator.animate({y: target}, {spring: KEYBOARD_SPRING})
            .finished,
        );
      }
      handBack(rides, rideRef.current);
    };

    // A composer field that loses focus to nothing, or to a control that
    // brings up no keyboard, takes the keyboard down. A focus handed over
    // inside the blur, as the module's claim does, already rests on a field. Safari on iOS reports
    // that about half a second later. So without the guide the dock rides
    // down from the blur, on the keyboard's spring, as the keyboard does.
    // Focus that returns to a field first rides it back up.
    // A hide the keyboard's report never confirms gives way to what the
    // viewport reports: the keyboard stayed, and the dock rides back up.
    const verifyHide = () => {
      if (isHiding && getKeyboardHeight(win) > KEYBOARD_EPSILON) {
        isHiding = false;
        ridingRef.current = false;
        commit();
      }
    };
    const onFocusOut = (event: FocusEvent) => {
      if (
        !springsRef.current ||
        getKeyboardHeight(win) <= KEYBOARD_EPSILON ||
        !bringsUpKeyboard(event.target) ||
        bringsUpKeyboard(event.relatedTarget) ||
        bringsUpKeyboard(root.ownerDocument.activeElement)
      ) {
        return;
      }
      isHiding = true;
      rideSpring(0);
      clearTimeout(verifyTimer);
      verifyTimer = setTimeout(
        verifyHide,
        timing.keyboardNotificationMs + VERIFY_SLACK_MS,
      );
    };
    const onFocusIn = (event: FocusEvent) => {
      if (isHiding && bringsUpKeyboard(event.target)) {
        clearTimeout(verifyTimer);
        isHiding = false;
        ridingRef.current = false;
        commit();
      }
    };

    // The ride plays the curve the guide publishes with each transition. It is
    // the keyboard's own motion, UIKit's spring or Gboard's slides in Chrome.
    // These are values, not motion roles, because the system moves the
    // keyboard on them whatever the page does.
    const follow = (transition: KeyboardTransition) => {
      // The ride: the dock goes where the guide says the keyboard will be,
      // from the keyboard's start, relative to the layout it rests in now.
      const target = liftRef.current - liftFor(transition.to);
      const atEnd = isAtEnd();
      dockTargetRef.current = target;
      messagesTargetRef.current = atEnd ? target : null;
      if (!transition.animated) {
        rideRef.current += 1;
        ridingRef.current = false;
        dock.animator.set({y: target});
        if (atEnd) {
          messages.animator.set({y: target});
        }
        commit();
        return;
      }
      // Under Reduce Motion the animator's default applies. Nothing travels,
      // and a touch screen gets a cross-fade.
      const shown = {y: target};
      ridingRef.current = true;
      rideRef.current += 1;
      const ride = rideRef.current;
      // On the keyboard's own motion: UIKit's spring, or Gboard's slide.
      const rides = [
        rideKeyboard(dock.animator, shown, transition)?.finished ??
          Promise.resolve(true),
      ];
      if (atEnd) {
        rides.push(
          rideKeyboard(messages.animator, shown, transition)?.finished ??
            Promise.resolve(true),
        );
      }
      handBack(rides, ride);
    };
    const passive = {passive: true} as const;
    // Fingers count, and the hook waits out a finger's scroll, only where they
    // can hold the layout. Under a fine pointer, no touch-only listener
    // attaches.
    const followsFingers = isTouch && isKeyboardMeasurable(win);
    const isGuided = keyboardProfileOf(win) === 'chromium';
    springsRef.current = followsFingers && !isGuided;
    const scrollTarget: EventTarget | null = !followsFingers
      ? null
      : isSelfScrolling
        ? root
        : scrollRef.current === root.ownerDocument.documentElement
          ? win
          : scrollRef.current;
    if (followsFingers) {
      root.addEventListener('touchstart', onTouches, passive);
      root.addEventListener('touchend', onTouches, passive);
      root.addEventListener('touchcancel', onTouches, passive);
    }
    scrollTarget?.addEventListener('scroll', onScroll, passive);
    // The ride on the keyboard's own motion attaches only under a coarse
    // primary pointer; under a fine one the layout follows the height alone.
    const unsubscribe =
      isTouch && isGuided
        ? getKeyboardLayoutGuide(win).subscribe(follow)
        : undefined;
    if (springsRef.current) {
      root.addEventListener('focusout', onFocusOut);
      root.addEventListener('focusin', onFocusIn);
    }
    // Mounted under a keyboard that is already up: take its place at once.
    commit();
    return () => {
      unsubscribe?.();
      ridingRef.current = false;
      clearTimeout(settleTimer);
      root.removeEventListener('touchstart', onTouches);
      root.removeEventListener('touchend', onTouches);
      root.removeEventListener('touchcancel', onTouches);
      scrollTarget?.removeEventListener('scroll', onScroll);
      root.removeEventListener('focusout', onFocusOut);
      root.removeEventListener('focusin', onFocusIn);
      clearTimeout(verifyTimer);
    };
  }, [
    rootRef,
    scrollRef,
    isSelfScrolling,
    isTouch,
    dock.animator,
    messages.animator,
    liftStore,
  ]);

  // Synchronizes the layout with the keyboard module's height when the guide
  // had no ride for it, as after a resize or a rotation. `commit` measures
  // the root against the layout viewport and sets the lift store. It
  // acquires nothing and is idempotent. It sets the lift only on a change of
  // half a pixel or more, and not during a ride. So a replay or a rerender
  // changes nothing.
  useIsomorphicLayoutEffect(() => {
    commitRef.current();
  }, [keyboardHeight]);

  // The layout just moved by the lift's change. The dock's translate takes
  // the difference, and so does a transcript's at its end, so nothing moves
  // on screen. The newest message stays in view.
  useIsomorphicLayoutEffect(() => {
    const moved = lift - liftRef.current;
    if (Math.abs(moved) < 0.5) {
      return;
    }
    liftRef.current = lift;
    const dockTarget = dockTargetRef.current;
    const messagesTarget = messagesTargetRef.current;
    dockTargetRef.current = null;
    messagesTargetRef.current = null;
    // A ride that ended hands its translate (its target) to the layout; a
    // change no ride covered (a resize) is the layout's alone.
    if (dockTarget != null) {
      dock.animator.set({y: dockTarget + moved});
    }
    const scroller = scrollRef.current;
    if (scroller == null) {
      return;
    }
    // A translated transcript extends the scroller's range, as WebKit counts
    // it. So its ride translate goes before the scroll changes. Otherwise the
    // scroll can stop past the content's end, and the sticky dock rises to
    // meet it.
    if (messagesTarget != null) {
      messages.animator.set({y: 0});
    }
    if (atEndRef.current) {
      // eslint-disable-next-line react-compiler/react-compiler -- imperative DOM: keeping the newest message in view
      scroller.scrollTop = scroller.scrollHeight - scroller.clientHeight;
    }
    // The padding's change may have clamped the scroll already: measure from
    // where it was before the layout changed.
    const shifted = scroller.scrollTop - scrollBeforeRef.current;
    if (messagesTarget != null && Math.abs(messagesTarget + shifted) >= 0.5) {
      messages.animator.set({y: messagesTarget + shifted});
    }
  }, [lift, scrollRef, dock.animator, messages.animator]);

  // Synchronizes the transcript's drags with the software keyboard: a drag
  // lifted at the composer dismisses it. It works under every pointer, a
  // finger, a pen or a mouse, wherever the module measures a keyboard. It
  // listens on the layout's own root, and on the document only while a
  // button is down.
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const win = root?.ownerDocument.defaultView;
    if (root == null || win == null || !isKeyboardMeasurable(win)) {
      return undefined;
    }
    return observeKeyboardDismiss(root, {
      mode: 'interactive',
      // From the keyboard's top edge up to the composer's.
      dismissPadding: () => {
        const composer = composerRef.current;
        return composer == null
          ? 0
          : layoutViewportHeight(win) -
              getKeyboardHeight(win) -
              composer.getBoundingClientRect().top;
      },
    });
  }, [rootRef]);

  // A tap on the composer's text that would bring up the keyboard takes the
  // keyboard module's tap route. The hook focuses the text without Safari's
  // reveal, with the caret where the finger lifted. This needs a finger:
  // under a fine primary pointer, no touch listener attaches. It also needs a
  // measured keyboard, so nothing changes inside an iframe.
  useIsomorphicLayoutEffect(() => {
    const composer = composerRef.current;
    const win = composer?.ownerDocument.defaultView;
    if (
      !touchPresentation.isTouch ||
      composer == null ||
      win == null ||
      !isKeyboardMeasurable(win)
    ) {
      return undefined;
    }
    return claimTapFocus(composer, {
      claim: editableToClaim,
      deliver: focusAtPoint,
    });
  }, [touchPresentation.isTouch]);

  // A browser that reveals the composer itself pans the visual viewport after
  // the keyboard's report, while the composer still rides up. Chrome 124 on
  // Android pans by the keyboard's whole height. The keyboard module's
  // reveal-pan watch puts the pan back, so the composer rests on the keyboard
  // and the page stays still. It synchronizes the module's reports, under a
  // finger only.
  useIsomorphicLayoutEffect(() => {
    const composer = composerRef.current;
    const win = composer?.ownerDocument.defaultView;
    if (
      !isTouch ||
      composer == null ||
      win == null ||
      !isKeyboardMeasurable(win)
    ) {
      return undefined;
    }
    const watch = watchRevealPan(win, {
      owns: focused => composer.contains(focused),
    });
    let reportedHeight = getKeyboardHeight(win);
    const unsubscribe = subscribeKeyboardHeight(win, event => {
      if (event.type !== 'viewport') {
        return;
      }
      if (event.height !== reportedHeight) {
        reportedHeight = event.height;
        watch.report();
      } else if (watch.isRevealPan(event.height)) {
        watch.putBack();
      }
    });
    return () => {
      unsubscribe();
      watch.stop();
    };
  }, [isTouch]);

  // The keyboard module's focus takeover handles every other move into the
  // composer's text. It acts where the module measures the keyboard, and
  // only under a finger, so a desktop browser keeps its own focus. The
  // takeover follows the touch presentation, and it reads the pointer again
  // on every blur, so a tablet that docks a mouse drops it. When the
  // keyboard's Done ends entry, focus leaves the composer's text for nothing.
  // It moves to the composer region, a named group that is no tab stop, so
  // the next tap or Tab starts from the composer.
  useIsomorphicLayoutEffect(() => {
    const composer = composerRef.current;
    const win = composer?.ownerDocument.defaultView;
    if (
      !touchPresentation.isTouch ||
      composer == null ||
      win == null ||
      !isKeyboardMeasurable(win)
    ) {
      return undefined;
    }
    return refuseFocusReveal(composer.ownerDocument, {
      isActive: () =>
        typeof win.matchMedia === 'function' &&
        win.matchMedia(TOUCH_QUERY).matches,
      claim: destination => findTextEntryControl(destination, composer),
      park: origin => {
        // A transcript drag's dismissal leaves the focus where its blur puts
        // it.
        if (
          !isDismissing(composer.ownerDocument) &&
          findTextEntryControl(origin, composer) != null
        ) {
          parkFocus(composer);
        }
      },
    });
  }, [touchPresentation.isTouch]);

  return {
    lift,
    dockRef: dock.ref,
    messagesRef: messages.ref,
    composerRef,
    isTouch,
  };
}
