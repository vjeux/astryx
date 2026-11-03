// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardScrollBack.ts
 * @input Each scroll Core makes to keep a focused field above the keyboard,
 *   the keyboard module's reports, and focus and touches from the window's
 *   input stream
 * @output noteKeyboardScroll, which records such a scroll, and scrollTopOf
 * @position Keyboard module, internal to core. keyboardTarget.ts records each
 *   scroll of a reveal. When the keyboard goes, each scroller Core moved goes
 *   back to where it was before.
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import {cubicBezier} from '../motion/bezier';
import {subscribeInput} from '../utils/inputStream';
import {
  KEYBOARD_EPSILON,
  getKeyboardHeight,
  subscribeKeyboardHeight,
} from './keyboardHeight';
import {bringsUpKeyboard} from './keyboardLayoutGuide';

// UIKit's scroll back when the keyboard goes: the keyboard's 0.383 s, on
// ease-in-out, from the moment the keyboard starts to go.
const SCROLL_BACK_MS = 383;
const SCROLL_BACK_EASE = cubicBezier([0.42, 0, 0.58, 1]);

interface AddedScroll {
  /** Where the scroller was before Core's first scroll. */
  from: number;
  /** Where Core left it, or null once anyone else scrolled it. */
  at: number | null;
}

const addedScrolls = new WeakMap<Window, Map<Element, AddedScroll>>();
const stopsOf = new WeakMap<Window, () => void>();
const claimants = new WeakMap<Window, number>();

/**
 * Counts a field that keeps itself above `win`'s keyboard until the returned
 * call. Once no such field is left, nothing is put back: its page is gone.
 */
export function claimKeyboardScrollBack(win: Window): () => void {
  claimants.set(win, (claimants.get(win) ?? 0) + 1);
  let isClaimed = true;
  return () => {
    if (!isClaimed) {
      return;
    }
    isClaimed = false;
    const left = (claimants.get(win) ?? 1) - 1;
    claimants.set(win, left);
    if (left === 0) {
      stopsOf.get(win)?.();
    }
  };
}

function isRoot(scroller: Element): boolean {
  const doc = scroller.ownerDocument;
  return scroller === (doc.scrollingElement ?? doc.documentElement);
}

/** How far `scroller` is scrolled; for the root, the document's scroll. */
export function scrollTopOf(scroller: Element, win: Window): number {
  return isRoot(scroller) ? win.scrollY : scroller.scrollTop;
}

function scrollTopTo(scroller: Element, top: number, win: Window): void {
  if (isRoot(scroller)) {
    win.scrollBy({top: top - win.scrollY, behavior: 'instant'});
  } else {
    scroller.scrollTop = top;
  }
}

/**
 * Records that Core scrolled `scroller` from `before` to where it is now, to
 * keep a field above the keyboard. When the keyboard goes, the scroller goes
 * back to where it was before Core's first scroll. A scroller anyone else
 * scrolls meanwhile keeps that scroll.
 */
export function noteKeyboardScroll(
  scroller: Element,
  before: number,
  win: Window,
): void {
  const now = scrollTopOf(scroller, win);
  const added = addedScrolls.get(win)?.get(scroller);
  if (added == null) {
    if (Math.abs(now - before) >= 0.5) {
      const scrolls = addedScrolls.get(win) ?? watchKeyboardGo(win);
      scrolls.set(scroller, {from: before, at: now});
    }
  } else if (
    added.at != null &&
    Math.abs(before - added.at) <= KEYBOARD_EPSILON
  ) {
    added.at = now;
  } else {
    added.at = null;
  }
}

// The keyboard goes on a blur that moves focus to nothing that brings up a
// keyboard, as Done and a tap elsewhere do. Back keeps the focus in Chrome,
// so the keyboard's report of no height counts too.
function watchKeyboardGo(win: Window): Map<Element, AddedScroll> {
  const scrolls = new Map<Element, AddedScroll>();
  let stopBack: (() => void) | null = null;
  const go = () => {
    stopBack ??= scrollBack(win, scrolls, stop);
  };
  // A field that brings the keyboard back keeps the rest of Core's scroll.
  const keep = () => {
    stopBack?.();
    stopBack = null;
  };
  // A report at the same height, as Safari sends for a scroll while its
  // keyboard goes, is no keyboard coming back.
  let shown = getKeyboardHeight(win);
  const stops = [
    subscribeKeyboardHeight(win, event => {
      if (event.type !== 'viewport') {
        return;
      }
      if (event.height <= KEYBOARD_EPSILON) {
        go();
      } else if (event.height > shown + KEYBOARD_EPSILON) {
        keep();
      }
      shown = event.height;
    }),
    subscribeInput(win, 'focusout', event => {
      if (!bringsUpKeyboard(event.relatedTarget)) {
        go();
      }
    }),
    subscribeInput(win, 'focusin', event => {
      if (bringsUpKeyboard(event.target)) {
        keep();
      }
    }),
  ];
  function stop() {
    stopBack?.();
    stopBack = null;
    for (const stopOne of stops) {
      stopOne();
    }
    addedScrolls.delete(win);
    stopsOf.delete(win);
  }
  addedScrolls.set(win, scrolls);
  stopsOf.set(win, stop);
  return scrolls;
}

// Scrolls each scroller still where Core left it back to where it was before,
// on UIKit's curve, then calls `done`. A touch or a wheel turn stops it where
// it is. The returned call stops it too, and keeps the rest of each scroll to
// put back when the keyboard goes again.
function scrollBack(
  win: Window,
  scrolls: Map<Element, AddedScroll>,
  done: () => void,
): () => void {
  const rides: {
    scroller: Element;
    from: number;
    to: number;
    at: number;
    isKept: boolean;
  }[] = [];
  for (const [scroller, added] of scrolls) {
    const top = scrollTopOf(scroller, win);
    if (
      added.at != null &&
      scroller.isConnected &&
      Math.abs(top - added.at) <= KEYBOARD_EPSILON
    ) {
      rides.push({scroller, from: top, to: added.from, at: top, isKept: false});
    }
  }
  scrolls.clear();
  let frame = 0;
  const stopInput = () => {
    win.cancelAnimationFrame(frame);
    stopTouch();
    stopWheel();
  };
  const interrupt = () => {
    stopInput();
    done();
  };
  const stopTouch = subscribeInput(win, 'pointerdown', interrupt);
  const stopWheel = subscribeInput(win, 'wheel', interrupt);
  // Under Reduce Motion nothing travels: the scroll lands at once.
  const isInstant =
    win.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const start = win.performance.now();
  const step = (time: number) => {
    const elapsed = Math.max(0, time - start);
    const progress = isInstant
      ? 1
      : SCROLL_BACK_EASE(Math.min(1, elapsed / SCROLL_BACK_MS));
    for (const ride of rides) {
      // Someone else scrolled it during the ride: their scroll stands.
      ride.isKept ||=
        Math.abs(scrollTopOf(ride.scroller, win) - ride.at) > KEYBOARD_EPSILON;
      if (ride.isKept) {
        continue;
      }
      scrollTopTo(
        ride.scroller,
        ride.from + (ride.to - ride.from) * progress,
        win,
      );
      ride.at = scrollTopOf(ride.scroller, win);
    }
    if (progress < 1) {
      frame = win.requestAnimationFrame(step);
    } else {
      interrupt();
    }
  };
  frame = win.requestAnimationFrame(step);
  return () => {
    stopInput();
    for (const ride of rides) {
      if (!ride.isKept) {
        scrolls.set(ride.scroller, {from: ride.to, at: ride.at});
      }
    }
  };
}
