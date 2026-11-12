// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file privateAttributes/pressHeld.stylex.ts
 * @input A pressable surface, and how its owner holds its press
 * @output setPressHeld, which holds a surface's press, makes it wait or frees
 *   it, and isPressHeld and pressWaitsForDrag, which the press controller reads
 * @position Owner module of the private press-held attribute: the only
 *   file that writes its name. The swipe runtime writes it on a row that can
 *   swipe (Swipe/useSwipeAction.ts), and the press controller reads it
 *   (utils/pressFeedback.ts). No package entry exports it.
 *
 * A surface whose owner holds its press (an open swipe row) takes a press and
 * paints nothing, as a disabled one does. The surface around it does not light
 * either. A pressable inside it keeps its own press, and a touch on it still
 * counts for the brake. The code that holds it writes it on the pressable
 * surface itself, and frees it again; the surface stays pressable. An open
 * swipe row's root carries it, so a tap on its content only closes the row.
 * A closed row that can swipe carries it as `waits`. A touch on that row can
 * become its drag, so a finger's press there waits, as in a scroll view.
 */

const PRESS_HELD = 'data-astryx-press-held';

/**
 * How an owner holds a surface's press. `held` paints no press, and `waits`
 * paints a finger's press after the content-touch delay. Null frees it.
 */
export type PressHold = 'held' | 'waits' | null;

/** Holds a surface's press, makes it wait, or frees it. */
export function setPressHeld(surface: Element, hold: PressHold): void {
  if (hold == null) {
    surface.removeAttribute(PRESS_HELD);
  } else {
    surface.setAttribute(PRESS_HELD, hold);
  }
}

/** Whether a surface's owner holds its press. */
export function isPressHeld(surface: Element): boolean {
  return surface.getAttribute(PRESS_HELD) === 'held';
}

/**
 * Whether a finger's press on `surface` waits the content-touch delay, as it
 * does inside a scroll view. The surface, or a row around it, can turn the
 * touch into its own drag, so a press that paints at once would flash.
 */
export function pressWaitsForDrag(surface: Element): boolean {
  return surface.closest(`[${PRESS_HELD}]`) != null;
}
