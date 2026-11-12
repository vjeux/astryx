// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/pressWaits.stylex.ts
 * @input A pressable surface, and whether a touch on it can become its own
 *   drag
 * @output setPressWaits, which marks or frees such a surface, and
 *   pressWaitsForDrag, which the press controller reads
 * @position Owner module of the private press-waits attribute: the only file
 *   that writes its name. The swipe runtime marks a row that can swipe
 *   (Swipe/useSwipeAction.ts), and the press controller reads the mark
 *   (utils/pressFeedback.ts). No package entry exports it.
 */

const PRESS_WAITS = 'data-astryx-press-waits';

/** Marks a surface whose touch can become its own drag, or frees it. */
export function setPressWaits(surface: Element, waits: boolean): void {
  surface.toggleAttribute(PRESS_WAITS, waits);
}

/**
 * Whether a finger's press on `surface` waits the content-touch delay, as it
 * does inside a scroll view. The surface, or a row around it, can turn the
 * touch into its own drag, so a press that paints at once would flash.
 */
export function pressWaitsForDrag(surface: Element): boolean {
  return surface.closest(`[${PRESS_WAITS}]`) != null;
}
