// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file scrollView.ts
 * @input An element and its computed styles
 * @output Exports parseTouchAction, touchActionAllowsPan, rootOverflow,
 *   SCROLLABLE_OVERFLOW and isInsideScrollView: whether a touch on the
 *   element lands inside a box the browser can scroll
 * @position The one definition of "inside a scroll view", shared by the
 *   press feedback controller (utils/pressFeedback.ts), the gesture core's
 *   native-scroll probe (gestures/nativeScroll.ts) and Layer's outside-press
 *   watch, so Core's main entry can ask it without the gesture core
 */

import {parentAcrossShadow} from './flatTree';
import {isElement} from './nodeType';

/** Overflow values that let a box scroll. */
export const SCROLLABLE_OVERFLOW: ReadonlySet<string> = new Set([
  'auto',
  'scroll',
  'overlay',
]);

/** How far a box must overflow, in px, before it counts as scrolling. */
const OVERFLOW_TOLERANCE_PX = 1;

export interface AllowedPans {
  readonly x: boolean;
  readonly y: boolean;
}

/** Which pans a `touch-action` value lets the browser perform. */
export function parseTouchAction(value: string): AllowedPans {
  const tokens = value.trim().split(/\s+/);
  if (tokens.includes('auto') || tokens.includes('manipulation')) {
    return {x: true, y: true};
  }
  if (tokens.includes('none')) {
    return {x: false, y: false};
  }
  return {
    x: tokens.some(
      token =>
        token === 'pan-x' || token === 'pan-left' || token === 'pan-right',
    ),
    y: tokens.some(
      token => token === 'pan-y' || token === 'pan-up' || token === 'pan-down',
    ),
  };
}

/**
 * Whether `touch-action` on `element` and on every box above it leaves a pan
 * on `axis` to the browser.
 */
export function touchActionAllowsPan(
  element: Element,
  axis: keyof AllowedPans,
): boolean {
  const view = element.ownerDocument.defaultView;
  if (view == null) {
    return false;
  }
  for (
    let node: Node | null = element;
    node != null;
    node = parentAcrossShadow(node)
  ) {
    if (
      isElement(node) &&
      !parseTouchAction(view.getComputedStyle(node).touchAction || 'auto')[axis]
    ) {
      return false;
    }
  }
  return true;
}

/**
 * The viewport's overflow on an axis. It scrolls unless the root or the body
 * clips it, as a scroll lock does with `overflow: hidden`.
 */
export function rootOverflow(doc: Document, axis: 'x' | 'y'): string {
  const view = doc.defaultView;
  if (view == null) {
    return 'hidden';
  }
  for (const element of [doc.documentElement, doc.body]) {
    if (element == null) {
      continue;
    }
    const style = view.getComputedStyle(element);
    const value = axis === 'x' ? style.overflowX : style.overflowY;
    if (value === 'hidden' || value === 'clip') {
      return 'hidden';
    }
  }
  return 'auto';
}

function overflows(element: Element, axis: 'x' | 'y'): boolean {
  return axis === 'y'
    ? element.scrollHeight - element.clientHeight > OVERFLOW_TOLERANCE_PX
    : element.scrollWidth - element.clientWidth > OVERFLOW_TOLERANCE_PX;
}

/**
 * Whether a scroll can take a touch on `axis` in a box whose overflow lets it
 * scroll: it has room to scroll, or a drag past its content can still
 * overscroll it or pull to refresh. With `overscroll-behavior: none` on that
 * axis and no room, no scroll can take the touch.
 */
function canTakeTouch(
  element: Element,
  style: CSSStyleDeclaration,
  axis: 'x' | 'y',
): boolean {
  const behavior =
    axis === 'y' ? style.overscrollBehaviorY : style.overscrollBehaviorX;
  return behavior !== 'none' || overflows(element, axis);
}

/**
 * Whether a touch on `element` lands inside a scroll view, UIKit's question
 * for a touch: a box above it, the page included, overflows on an axis it
 * scrolls, and `touch-action` on the way up leaves that axis to the browser.
 * A `position: fixed` box ends the walk, because it does not move with any
 * scroller above it. A wheel scrolls whatever `touch-action` says, so a
 * wheel's question passes `readsTouchAction: false`.
 */
export function isInsideScrollView(
  element: Element,
  {readsTouchAction = true}: {readsTouchAction?: boolean} = {},
): boolean {
  const doc = element.ownerDocument;
  const view = doc.defaultView;
  if (view == null) {
    return false;
  }
  const root = doc.scrollingElement ?? doc.documentElement;
  let panX = true;
  let panY = true;
  for (let node: Node | null = element; node != null;) {
    if (isElement(node)) {
      const style = view.getComputedStyle(node);
      if (readsTouchAction) {
        const pans = parseTouchAction(style.touchAction || 'auto');
        panX &&= pans.x;
        panY &&= pans.y;
      }
      if (node === root || node === doc.documentElement) {
        break;
      }
      if (
        (panY &&
          SCROLLABLE_OVERFLOW.has(style.overflowY) &&
          canTakeTouch(node, style, 'y')) ||
        (panX &&
          SCROLLABLE_OVERFLOW.has(style.overflowX) &&
          canTakeTouch(node, style, 'x'))
      ) {
        return true;
      }
      if (style.position === 'fixed') {
        return false;
      }
    }
    node = parentAcrossShadow(node);
  }
  const rootStyle = view.getComputedStyle(doc.documentElement);
  return (
    (panY &&
      SCROLLABLE_OVERFLOW.has(rootOverflow(doc, 'y')) &&
      canTakeTouch(root, rootStyle, 'y')) ||
    (panX &&
      SCROLLABLE_OVERFLOW.has(rootOverflow(doc, 'x')) &&
      canTakeTouch(root, rootStyle, 'x'))
  );
}
