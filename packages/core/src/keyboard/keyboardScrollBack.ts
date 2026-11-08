// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardScrollBack.ts
 * @input Each scroll Core makes to keep a focused field above the keyboard,
 *   and the keyboard module's reports
 * @output noteKeyboardScroll, which records such a scroll; scrollTopOf; and
 *   claimKeyboardScrollBack, which counts the fields that keep themselves up
 * @position Keyboard module, internal to core. keyboardTarget.ts records each
 *   scroll of a reveal. When the keyboard goes, each scroller Core moved goes
 *   back to where it was before.
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import {reducesMotion} from '../motion/reducedMotion';
import {KEYBOARD_EPSILON, subscribeKeyboardHeight} from './keyboardHeight';

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

function scrollTopTo(
  scroller: Element,
  top: number,
  behavior: ScrollBehavior,
  win: Window,
): void {
  if (isRoot(scroller)) {
    win.scrollTo({top, behavior});
  } else if (typeof scroller.scrollTo === 'function') {
    scroller.scrollTo({top, behavior});
  } else {
    scroller.scrollTop = top;
  }
}

/**
 * Records that Core scrolled `scroller` from `before` to `after`, to keep a
 * field above the keyboard. `after` is where a smooth scroll is headed, and
 * where the scroller is now for any other. When the keyboard goes, the
 * scroller goes back to where it was before Core's first scroll. A scroller
 * anyone else scrolls meanwhile keeps that scroll.
 */
export function noteKeyboardScroll(
  scroller: Element,
  before: number,
  win: Window,
  after = scrollTopOf(scroller, win),
): void {
  const now = after;
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

/**
 * Where Core's own scroll of `scroller` is headed, while the scroller lies on
 * its way there, as during a smooth rise. Null for a scroller Core did not
 * scroll, or one moved off that way.
 */
export function keyboardScrollTarget(
  scroller: Element,
  win: Window,
): number | null {
  const added = addedScrolls.get(win)?.get(scroller);
  if (added?.at == null) {
    return null;
  }
  const now = scrollTopOf(scroller, win);
  const low = Math.min(added.from, added.at) - KEYBOARD_EPSILON;
  const high = Math.max(added.from, added.at) + KEYBOARD_EPSILON;
  return now >= low && now <= high ? added.at : null;
}

// The scroll back starts at the keyboard's report that it has gone. Safari
// holds the visual viewport while its keyboard slides down. A scroll then
// shows only at the slide's end, in one jump.
function watchKeyboardGo(win: Window): Map<Element, AddedScroll> {
  const scrolls = new Map<Element, AddedScroll>();
  const stop = subscribeKeyboardHeight(win, event => {
    if (event.type === 'viewport' && event.height <= KEYBOARD_EPSILON) {
      scrollBack(win, scrolls);
      end();
    }
  });
  function end() {
    stop();
    addedScrolls.delete(win);
    stopsOf.delete(win);
  }
  addedScrolls.set(win, scrolls);
  stopsOf.set(win, end);
  return scrolls;
}

// The browser's own smooth scroll carries the scroll back. iOS Safari applies
// a scripted scroll a frame late, so a scroll set each frame jitters there. A
// touch stops that scroll, so a person's scroll stands. Under Reduce Motion, or
// in a theme that reduces motion for everyone, the scroll lands at once.
function scrollBack(win: Window, scrolls: Map<Element, AddedScroll>): void {
  for (const [scroller, added] of scrolls) {
    if (
      added.at != null &&
      scroller.isConnected &&
      Math.abs(scrollTopOf(scroller, win) - added.at) <= KEYBOARD_EPSILON
    ) {
      const behavior = reducesMotion(scroller) ? 'smooth' : 'smooth';
      scrollTopTo(scroller, added.from, behavior, win);
    }
  }
  scrolls.clear();
}
