// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file createMenuPress.ts
 * @input A menu root, its trigger, the enabled-row selector, and callbacks for
 *   opening, highlighting, activating and dismissing
 * @output Exports createMenuPress (the menu press model on any element, with
 *   no React), its option and handle types, the marker attributes, the press
 *   constants and the module-level activation mark
 * @position Core factory; useMenuPress is its React wrapper (spec:AST-107
 *   FR6, architecture:public-component-api INV22). The pure transition table
 *   lives in menuPressGesture.ts. Importing it does no DOM work.
 *
 * One press in a menu, from the trigger or from inside, owned end to end:
 *
 * - The pointer is tracked at DOCUMENT level by `pointerId`. A finger's
 *   pointer events stay with the element it landed on (implicit capture), so a
 *   menu container never sees a finger that slid onto it — the document does.
 * - The highlight follows the pointer (DOM focus with `preventScroll` in a
 *   menu, its indicator following the last input; a callback for a picker
 *   that highlights by index).
 * - The row under the RELEASE acts, the way its own click would, carrying the
 *   release's button and modifier keys.
 * - The browser's stray `click` for a tracked gesture is swallowed at the
 *   window in the capture phase, ahead of React's own listener. It arms at a
 *   tracked release and disarms at the next pointer press or after a short
 *   window; a click with `detail === 0` (a keyboard's or a screen reader's)
 *   always passes.
 * - A mouse press on the trigger opens the menu at once; a finger held on the
 *   trigger opens it after the long-press delay. The settle rule decides
 *   whether the opening gesture's release may act (see menuPressGesture.ts).
 * - `pointercancel`, a second pointer, or the window losing focus end the
 *   gesture with nothing acting; the model never re-implements scrolling.
 * - While a press is tracked in an overflowing menu, a pointer resting near
 *   the top or bottom edge scrolls the menu toward that edge (the shared
 *   timer of utils/edgeAutoscroll.ts).
 *
 * The menu root is marked `data-astryx-menu-press` so a nested flyout (a DOM
 * descendant of its parent menu) can tell which level owns a press, and so a
 * surface can be recognised as carrying this model. A menu the root renders
 * beside itself names the root with `data-astryx-menu-press-surface` and counts
 * as nested in it.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/hooks/useMenuPress.ts
 * - /packages/core/src/hooks/useMenuPress.doc.mjs
 * - /packages/core/src/hooks/createMenuPress.test.ts
 * - /packages/core/src/hooks/menuPressGesture.ts
 */

import {currentGesture} from '../Layer/gestureCounter';
import {
  IDLE_MENU_PRESS,
  menuPressStep,
  type MenuPressEffect,
  type MenuPressEvent,
  type MenuPressGesture,
} from './menuPressGesture';
import {longPressDetector, type LongPressTolerance} from './longPressDetector';
import {edgeAutoscroll} from '../utils/edgeAutoscroll';
import {focusForLastInput} from '../utils/focusReturn';
import {trackInteractionModalityIn} from '../utils/interactionModality';
import {LONG_PRESS_DURATION_MS} from '../motion/uikit/longPress';
import {
  __resetClickGuardForTest,
  armClickGuard,
  CLICK_GUARD_WINDOW_MS,
  withoutClickGuard,
} from '../utils/clickGuard';

/** Marks a menu root that carries this press model. */
export const MENU_PRESS_MARKER = 'data-astryx-menu-press';
const MENU_PRESS_ROOT_SELECTOR = `[${MENU_PRESS_MARKER}]`;
/**
 * Carried by a menu root that another root renders beside itself rather than
 * inside it, naming that root's `id`: the menu of a sub-menu with a header or
 * footer, in a dialog beside the root's menu, is nested in that root for the
 * press model, as a flyout inside the root's DOM is. Nothing else beside the
 * root carries it, so a picker placed in a header or footer stays its own root.
 */
export const MENU_PRESS_SURFACE_ATTR = 'data-astryx-menu-press-surface';

/**
 * How long after a tracked release the browser's click is still swallowed:
 * the shared click guard's window (utils/clickGuard.ts).
 */
export const MENU_PRESS_STRAY_CLICK_MS = CLICK_GUARD_WINDOW_MS;
/** How long a finger must rest on the trigger before the menu opens under it. */
export const MENU_PRESS_LONG_PRESS_MS = LONG_PRESS_DURATION_MS;
/**
 * How far a finger held on a DropdownMenu trigger may move before the open,
 * in CSS px, under every primary pointer: `spec:AST-094` FR29's drift
 * allowance (FR2's table: unmeasured, a 12 pt move still opened; useMenuPress
 * FR9, FR43). ContextMenu keeps the long press's own allowable movement.
 */
export const MENU_PRESS_TRIGGER_DRIFT_PX = 13;

/** A finger held on the trigger: FR29's drift allowance, the same under every primary pointer. */
const TRIGGER_TOLERANCE: LongPressTolerance = {
  moveCancelPx: MENU_PRESS_TRIGGER_DRIFT_PX,
};
/** Distance from a scrolling menu's edge within which a resting pointer scrolls. */
export const MENU_PRESS_AUTOSCROLL_ZONE_PX = 24;
const AUTOSCROLL_STEP_PX = 6;
const AUTOSCROLL_INTERVAL_MS = 16;

const FOCUSABLE_ROW_SELECTOR =
  '[tabindex], a[href], button, input, select, textarea, [contenteditable]';
const INNER_CONTROL_SELECTOR = 'a[href], button, [tabindex]';

// =============================================================================
// Module state: the activation mark (the stray-click swallower is the
// shared click guard, utils/clickGuard.ts)
// =============================================================================

let isModelActivation = false;

/**
 * Whether a menu row activation dispatched by the press model is in flight.
 * True for the synchronous extent of that dispatch, so a row that forwards
 * the activation to a control inside it (a link) can tell the model's click
 * from the browser's stray one.
 */
export function isMenuPressActivation(): boolean {
  return isModelActivation;
}

/** Test-only: forget an armed click guard between cases. */
export function __resetMenuPressForTest(): void {
  __resetClickGuardForTest();
}

// =============================================================================
// Options and handle
// =============================================================================

/** The pointer a press began with. */
type PressPointerType = 'mouse' | 'touch' | 'pen';

export interface CreateMenuPressOptions {
  /** The control that opens the menu, when the press may start there. */
  trigger?: HTMLElement | null;
  /**
   * Selector matching the ENABLED rows. A pointer over anything else inside
   * the menu — a divider, a heading, a disabled row — highlights nothing.
   */
  itemSelector: string;
  /**
   * A mouse pressed the trigger, or a finger has rested on it for the
   * long-press delay: open the menu under the held pointer. Return whether
   * it opened; a `false` (the press closed an open menu instead) ends the
   * gesture. The click the trigger receives for this same gesture is reported
   * by `isTriggerClickFromPress` so the caller can leave it alone.
   */
  onTriggerPress?: (pointerType: PressPointerType) => boolean;
  /**
   * Move the highlight. `null` clears it. Defaults to moving DOM focus with
   * `preventScroll` onto the row (or the control inside it), and onto the
   * menu root when there is no row — a picker that highlights through
   * `aria-activedescendant` supplies its own.
   */
  onHighlight?: (row: HTMLElement | null) => void;
  /**
   * Act on the row under the release. Defaults to dispatching a click on the
   * row that carries the release's button and modifier keys, so the row acts
   * exactly as its own click would.
   */
  onActivate?: (row: HTMLElement, release: PointerEvent) => void;
  /** A MOUSE was released outside the menu with nothing acting: close it. */
  onDismiss?: () => void;
  /**
   * The element to scroll while a tracked pointer rests near its edge.
   * Defaults to the menu root when it overflows; return `null` for none.
   */
  getScroller?: () => HTMLElement | null;
  /**
   * Resolve the element under a viewport point. Defaults to
   * `elementFromPoint` on the menu's own document or shadow root, falling back
   * to the event target where the document lacks it (jsdom). A test seam.
   */
  hitTest?: (x: number, y: number) => Element | null;
  /** @default 500 */
  longPressDelayMs?: number;
  /** Whether the model is live. @default true */
  isEnabled?: boolean;
}

export interface CreateMenuPressReturn {
  /**
   * Whether the click reaching the trigger belongs to the gesture that just
   * pressed it — the press already opened or closed the menu, so the click
   * must neither toggle nor reopen it.
   */
  isTriggerClickFromPress: () => boolean;
  /** End the gesture in flight with nothing acting (the menu closed). */
  cancel: () => void;
  /** Take new options: callbacks, the trigger, the row selector and the rest. */
  update: (options: CreateMenuPressOptions) => void;
  /**
   * Remove every listener the press added, end a press in flight with nothing
   * acting, and take the marker off the menu root. A second call does nothing.
   */
  destroy: () => void;
}

// =============================================================================
// The core: one press model reading its menu, trigger and options at event
// time. createMenuPress drives it from its own listeners; the deprecated
// options form of useMenuPress drives it from the props it returns.
// =============================================================================

/** @internal What the core reads at event time. */
export interface MenuPressSource {
  getMenu: () => HTMLElement | null;
  getTrigger: () => HTMLElement | null;
  getOptions: () => Omit<CreateMenuPressOptions, 'trigger'>;
}

/**
 * @internal A pointer press the core takes: a DOM `PointerEvent`, or a React
 * one, which carries the DOM event as `nativeEvent`.
 */
export interface MenuPressDownEvent {
  readonly pointerId: number;
  readonly pointerType: string;
  readonly button: number;
  readonly ctrlKey: boolean;
  readonly target: EventTarget | null;
  preventDefault: () => void;
  readonly nativeEvent?: PointerEvent;
}

/** @internal The press model's entry points (see createMenuPressCore). */
export interface MenuPressCore {
  /** A press that begins inside the menu. */
  handleMenuPointerDown: (event: MenuPressDownEvent) => void;
  /** A press on the trigger: a mouse opens; a held finger opens. */
  handleTriggerPointerDown: (event: MenuPressDownEvent) => void;
  /** The trigger's `contextmenu`: a held finger is opening the menu. */
  handleTriggerContextMenu: (event: {preventDefault: () => void}) => void;
  isTriggerClickFromPress: () => boolean;
  cancel: () => void;
  /**
   * Start what a press needs from the page (input modality, the gesture
   * counter); returns its end, which also ends a press in flight.
   */
  connect: () => () => void;
}

function normalizePointerType(type: string): PressPointerType | null {
  return type === 'mouse' || type === 'touch' || type === 'pen' ? type : null;
}

function isRowFocusable(row: HTMLElement): boolean {
  return row.matches(FOCUSABLE_ROW_SELECTOR);
}

/** The outermost marked root: a flyout is a DOM descendant of its parent menu. */
function getOutermostRoot(menu: HTMLElement): HTMLElement {
  let root = menu;
  for (;;) {
    const parent =
      root.parentElement?.closest<HTMLElement>(MENU_PRESS_ROOT_SELECTOR) ??
      getSurfaceOwner(root);
    if (parent == null || parent === root) {
      return root;
    }
    root = parent;
  }
}

/**
 * The menu root that renders `menu` beside itself, if any (see
 * `MENU_PRESS_SURFACE_ATTR`). Read off the menu itself, never an ancestor, so
 * a root placed in a region of that surface is not adopted.
 */
function getSurfaceOwner(menu: HTMLElement): HTMLElement | null {
  const ownerId = menu.getAttribute(MENU_PRESS_SURFACE_ATTR);
  if (!ownerId) {
    return null;
  }
  const owner = menu.ownerDocument.getElementById(ownerId);
  return owner?.matches(MENU_PRESS_ROOT_SELECTOR) === true ? owner : null;
}

/**
 * Whether `element` is inside the menu tree whose outermost root is `root`:
 * inside the root itself, or inside a menu nested in it through a surface
 * the root renders beside itself. Anything else in such a surface (a header
 * field, say) is outside the menu, as the root's own regions are.
 */
function isInMenuTree(element: Element, root: HTMLElement): boolean {
  if (root.contains(element)) {
    return true;
  }
  const owner = element.closest<HTMLElement>(MENU_PRESS_ROOT_SELECTOR);
  return owner != null && getOutermostRoot(owner) === root;
}

interface ResolvedPoint {
  row: HTMLElement | null;
  isInMenu: boolean;
  isOnTrigger: boolean;
}

/**
 * @internal The press model over a menu, a trigger and options read at event
 * time. createMenuPress and the deprecated options form of useMenuPress are
 * its two drivers; nothing else has behavior of its own.
 */
export function createMenuPressCore(source: MenuPressSource): MenuPressCore {
  let gesture: MenuPressGesture<HTMLElement> = IDLE_MENU_PRESS;
  let pointerId: number | null = null;
  let detach: (() => void) | null = null;
  let touchMovePreventer: (() => void) | null = null;
  // The edge autoscroll running now: its scroller, its direction, and the
  // re-read of the row under the resting pointer after each step.
  let running: {
    scroller: HTMLElement;
    direction: 1 | -1;
    reread: () => void;
  } | null = null;
  let lastPointerEvent: PointerEvent | null = null;
  let triggerGesture: number | null = null;
  // The second pointer that ended a gesture must not start the next one.
  let ignoredPointerId: number | null = null;

  const autoscroll = edgeAutoscroll({
    intervalMs: AUTOSCROLL_INTERVAL_MS,
    immediate: true,
    step: () => (running?.direction ?? 0) * AUTOSCROLL_STEP_PX,
    apply: delta => {
      const current = running;
      if (current == null) {
        return 0;
      }
      const before = current.scroller.scrollTop;
      current.scroller.scrollTop = before + delta;
      const moved = current.scroller.scrollTop - before;
      if (moved === 0) {
        // The edge is reached; nothing more to reveal.
        running = null;
        return 0;
      }
      current.reread();
      return moved;
    },
  });

  // The held finger is detected by the system's one long-press detector, the
  // one ContextMenu's useLongPress wraps, so the hold duration and the
  // movement tolerance have one home. Its delay is read as each press starts.
  const longPress = longPressDetector({onLongPress: () => fireLongPress()});

  function getDocument(): Document {
    return (
      source.getMenu()?.ownerDocument ??
      source.getTrigger()?.ownerDocument ??
      document
    );
  }

  function resolvePoint(event: PointerEvent): ResolvedPoint {
    const {itemSelector, hitTest} = source.getOptions();
    const menu = source.getMenu();
    const doc = getDocument();
    let element: Element | null;
    if (hitTest != null) {
      element = hitTest(event.clientX, event.clientY);
    } else if (typeof doc.elementFromPoint === 'function') {
      // Hit-test in the menu's own tree: inside a shadow root the document
      // answers with the shadow host, never the row under the pointer.
      const tree = menu?.getRootNode();
      const scope: Pick<Document, 'elementFromPoint'> =
        tree != null &&
        tree !== doc &&
        typeof (tree as ShadowRoot).elementFromPoint === 'function'
          ? (tree as ShadowRoot)
          : doc;
      element = scope.elementFromPoint(event.clientX, event.clientY);
    } else {
      element = event.target instanceof Element ? event.target : null;
    }
    const root = menu == null ? null : getOutermostRoot(menu);
    const isInMenu =
      root != null && element != null && isInMenuTree(element, root);
    const trigger = source.getTrigger();
    const isOnTrigger =
      trigger != null && element != null && trigger.contains(element);
    let row: HTMLElement | null = null;
    if (isInMenu && element != null) {
      row = element.closest<HTMLElement>(itemSelector);
      if (row != null && !isInMenuTree(row, root)) {
        row = null;
      }
    }
    return {row, isInMenu, isOnTrigger};
  }

  function stopAutoscroll(): void {
    autoscroll.stop();
    running = null;
  }

  function endGesture(): void {
    longPress.cancel();
    touchMovePreventer?.();
    touchMovePreventer = null;
    stopAutoscroll();
    detach?.();
    detach = null;
    pointerId = null;
    lastPointerEvent = null;
    gesture = IDLE_MENU_PRESS;
  }

  function highlight(row: HTMLElement | null): void {
    const {onHighlight} = source.getOptions();
    if (onHighlight != null) {
      onHighlight(row);
      return;
    }
    // In a menu the highlight IS focus. A row whose root takes no
    // focus is highlighted through the control inside it; over nothing,
    // the menu root holds focus so no row is lit. The focus follows the
    // last input (`architecture:interaction-modality` INV1): a held press
    // is pointer input, so the row does not match :focus-visible, which a
    // plain focus() would inherit from the focus before it.
    const target =
      row == null
        ? source.getMenu()
        : isRowFocusable(row)
          ? row
          : row.querySelector<HTMLElement>(INNER_CONTROL_SELECTOR);
    if (target != null && target !== getDocument().activeElement) {
      focusForLastInput(target, {preventScroll: true});
    }
  }

  function activate(row: HTMLElement, release: PointerEvent): void {
    // Every click this dispatches passes the shared click guard.
    withoutClickGuard(() => {
      const {onActivate} = source.getOptions();
      isModelActivation = true;
      try {
        if (onActivate != null) {
          onActivate(row, release);
          return;
        }
        // The row acts as its own click would. `detail: 0` marks a dispatched
        // activation, as a keyboard's does, so the click guard lets
        // it through; the button and modifiers are the release's.
        row.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: 0,
            button: release.button,
            clientX: release.clientX,
            clientY: release.clientY,
            screenX: release.screenX,
            screenY: release.screenY,
            ctrlKey: release.ctrlKey,
            shiftKey: release.shiftKey,
            altKey: release.altKey,
            metaKey: release.metaKey,
          }),
        );
      } finally {
        isModelActivation = false;
      }
    });
  }

  function applyEffect(
    effect: MenuPressEffect<HTMLElement>,
    next: MenuPressGesture<HTMLElement>,
    native: PointerEvent | undefined,
  ): void {
    const doc = getDocument();
    switch (effect.type) {
      case 'none':
        return;
      case 'open': {
        const pointerType = next.phase === 'open' ? next.pointerType : 'mouse';
        triggerGesture = currentGesture();
        const didOpen =
          source.getOptions().onTriggerPress?.(pointerType) ?? false;
        if (!didOpen) {
          endGesture();
        }
        return;
      }
      case 'highlight':
        highlight(effect.row);
        return;
      case 'clear':
        highlight(null);
        return;
      case 'act': {
        // Detach before acting: the activation usually closes the menu.
        endGesture();
        // The one swallower stays installed once armed (PR2).
        armClickGuard(doc, {staysInstalled: true});
        if (native != null) {
          activate(effect.row, native);
        }
        return;
      }
      case 'settle': {
        endGesture();
        if (effect.stray) {
          armClickGuard(doc, {staysInstalled: true});
        }
        if (effect.dismiss) {
          source.getOptions().onDismiss?.();
        }
        return;
      }
    }
  }

  function step(event: MenuPressEvent<HTMLElement>, native?: PointerEvent) {
    const result = menuPressStep(gesture, event);
    gesture = result.gesture;
    applyEffect(result.effect, result.gesture, native);
  }

  // --- Edge autoscroll -----------------------------------------------

  function getScroller(): HTMLElement | null {
    const {getScroller: custom} = source.getOptions();
    if (custom != null) {
      return custom();
    }
    const menu = source.getMenu();
    if (menu == null) {
      return null;
    }
    return menu.scrollHeight > menu.clientHeight + 1 ? menu : null;
  }

  function updateAutoscroll(event: PointerEvent): void {
    if (gesture.phase !== 'tracking') {
      stopAutoscroll();
      return;
    }
    const scroller = getScroller();
    if (scroller == null) {
      stopAutoscroll();
      return;
    }
    const rect = scroller.getBoundingClientRect();
    if (rect.height <= 0) {
      stopAutoscroll();
      return;
    }
    let direction: 1 | -1 | 0 = 0;
    if (event.clientY <= rect.top + MENU_PRESS_AUTOSCROLL_ZONE_PX) {
      direction = -1;
    } else if (event.clientY >= rect.bottom - MENU_PRESS_AUTOSCROLL_ZONE_PX) {
      direction = 1;
    }
    if (direction === 0) {
      stopAutoscroll();
      return;
    }
    if (running?.direction === direction) {
      return;
    }
    stopAutoscroll();
    running = {
      scroller,
      direction,
      // The rows moved under the resting pointer: re-read the row under it.
      reread: () => {
        const last = lastPointerEvent;
        if (last != null) {
          const point = resolvePoint(last);
          step(
            {
              type: 'move',
              row: point.row,
              isInMenu: point.isInMenu,
              time: Date.now(),
            },
            last,
          );
        }
      },
    };
    autoscroll.update();
  }

  // --- Document-level tracking ----------------------------------------------

  function attach(id: number): void {
    detach?.();
    const doc = getDocument();
    const view = doc.defaultView;
    pointerId = id;

    const onMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) {
        return;
      }
      lastPointerEvent = event;
      if (gesture.phase === 'triggerPress') {
        // A finger that travels past FR29's drift allowance is scrolling,
        // not holding.
        const isPending = longPress.moveTo({
          x: event.clientX,
          y: event.clientY,
        });
        if (!isPending) {
          step({type: 'cancel'});
        }
        return;
      }
      const point = resolvePoint(event);
      step(
        {
          type: 'move',
          row: point.row,
          isInMenu: point.isInMenu,
          time: Date.now(),
        },
        event,
      );
      updateAutoscroll(event);
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) {
        return;
      }
      const point = resolvePoint(event);
      step(
        {
          type: 'up',
          row: point.row,
          isInMenu: point.isInMenu,
          isOnTrigger: point.isOnTrigger,
          time: Date.now(),
        },
        event,
      );
    };
    const onCancel = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) {
        return;
      }
      step({type: 'cancel'});
    };
    const onOtherPointerDown = (event: PointerEvent) => {
      // A second pointer ends the gesture: two fingers are a pinch or a
      // scroll, never a pick.
      if (event.pointerId !== pointerId) {
        ignoredPointerId = event.pointerId;
        step({type: 'cancel'});
      }
    };
    const onBlur = () => {
      step({type: 'cancel'});
    };

    doc.addEventListener('pointermove', onMove, true);
    doc.addEventListener('pointerup', onUp, true);
    doc.addEventListener('pointercancel', onCancel, true);
    doc.addEventListener('pointerdown', onOtherPointerDown, true);
    view?.addEventListener('blur', onBlur);
    detach = () => {
      doc.removeEventListener('pointermove', onMove, true);
      doc.removeEventListener('pointerup', onUp, true);
      doc.removeEventListener('pointercancel', onCancel, true);
      doc.removeEventListener('pointerdown', onOtherPointerDown, true);
      view?.removeEventListener('blur', onBlur);
    };
  }

  // --- The held finger on the trigger ----------------------------

  function fireLongPress(): void {
    if (gesture.phase !== 'triggerPress') {
      return;
    }
    triggerGesture = currentGesture();
    const didOpen =
      source.getOptions().onTriggerPress?.(gesture.pointerType) ?? false;
    if (!didOpen) {
      step({type: 'cancel'});
      return;
    }
    // `touch-action` on the trigger was decided when the finger landed; the
    // page must not scroll under a finger that is now driving a menu.
    const doc = getDocument();
    const prevent = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }
    };
    doc.addEventListener('touchmove', prevent, {passive: false, capture: true});
    touchMovePreventer = () => {
      doc.removeEventListener('touchmove', prevent, true);
    };
    step({type: 'opened', time: Date.now()});
  }

  // --- Entry points ------------------------------------------------------------

  return {
    handleMenuPointerDown(event) {
      const {isEnabled = true} = source.getOptions();
      const menu = source.getMenu();
      if (!isEnabled || menu == null) {
        return;
      }
      if (event.pointerId === ignoredPointerId) {
        ignoredPointerId = null;
        return;
      }
      if (gesture.phase !== 'idle') {
        // A second pointer landed inside the menu.
        step({type: 'cancel'});
        return;
      }
      const pointerType = normalizePointerType(event.pointerType);
      if (pointerType == null) {
        return;
      }
      if (pointerType === 'mouse' && event.button !== 0) {
        return;
      }
      // The innermost model owns the press: a flyout is a DOM descendant of
      // its parent menu, and both would otherwise track the same pointer.
      const target = event.target as Element | null;
      if (target?.closest(MENU_PRESS_ROOT_SELECTOR) !== menu) {
        return;
      }
      if (pointerType !== 'mouse') {
        // Cancelling pointerdown suppresses the compatibility mouse events a
        // finger would otherwise fire at the row it LANDED on when it lifts —
        // the mousedown that would light the origin row a second time.
        // Scrolling is governed by touch-action and is unaffected.
        event.preventDefault();
      }
      const native = event.nativeEvent ?? (event as unknown as PointerEvent);
      attach(native.pointerId);
      lastPointerEvent = native;
      const point = resolvePoint(native);
      step(
        {
          type: 'down',
          target: 'menu',
          pointerType,
          row: point.row,
          time: Date.now(),
        },
        native,
      );
    },

    handleTriggerPointerDown(event) {
      const {isEnabled = true, longPressDelayMs} = source.getOptions();
      if (event.pointerId === ignoredPointerId) {
        ignoredPointerId = null;
        return;
      }
      if (!isEnabled || gesture.phase !== 'idle') {
        return;
      }
      const pointerType = normalizePointerType(event.pointerType);
      if (pointerType == null || event.button !== 0) {
        return;
      }
      if (pointerType === 'mouse' && event.ctrlKey) {
        // Control-click is the context menu's on macOS.
        return;
      }
      const native = event.nativeEvent ?? (event as unknown as PointerEvent);
      attach(native.pointerId);
      lastPointerEvent = native;
      if (pointerType !== 'mouse') {
        // The trigger's press takes FR29's drift allowance under every
        // primary pointer, so no menu, row or trigger reads the pointer query
        // (spec:AST-094 FR24, FR43).
        longPress.setOptions({
          onLongPress: () => fireLongPress(),
          delayMs: longPressDelayMs ?? MENU_PRESS_LONG_PRESS_MS,
        });
        longPress.start(
          {x: native.clientX, y: native.clientY},
          TRIGGER_TOLERANCE,
        );
      }
      step(
        {
          type: 'down',
          target: 'trigger',
          pointerType,
          row: null,
          time: Date.now(),
        },
        native,
      );
    },

    handleTriggerContextMenu(event) {
      // A finger held on the trigger is opening the menu, not asking for the
      // browser's own context menu.
      if (gesture.phase !== 'idle' && gesture.pointerType !== 'mouse') {
        event.preventDefault();
      }
    },

    isTriggerClickFromPress() {
      return triggerGesture != null && triggerGesture === currentGesture();
    },

    cancel() {
      if (gesture.phase !== 'idle') {
        step({type: 'cancel'});
      }
      endGesture();
    },

    connect() {
      // The highlight, and the hover focus of the rows in this menu, follow
      // the last input, which this tracks for the page and, while the menu
      // lives in another document (a same-origin iframe), for that one too.
      const releasePage = trackInteractionModalityIn(document);
      const own = getDocument();
      const releaseOwn =
        own === document ? () => {} : trackInteractionModalityIn(own);
      // Install the gesture counter's listeners before the first press.
      currentGesture();
      return () => {
        endGesture();
        releaseOwn();
        releasePage();
      };
    },
  };
}

// =============================================================================
// The factory
// =============================================================================

/**
 * Run the menu press model on `menu`, with no React: the row under a release
 * acts, the highlight follows a held pointer, a mouse press on `trigger`
 * opens the menu, and a finger held on it opens it after the long-press
 * delay. Destroy it to remove every listener it added.
 *
 * @example
 * ```
 * const press = createMenuPress(list, {
 *   trigger: button,
 *   itemSelector: '[role="menuitem"]:not([aria-disabled="true"])',
 *   onTriggerPress: () => {
 *     list.showPopover();
 *     return true;
 *   },
 *   onDismiss: () => list.hidePopover(),
 * });
 * button.addEventListener('click', () => {
 *   if (!press.isTriggerClickFromPress()) list.togglePopover();
 * });
 * // Later:
 * press.destroy();
 * ```
 */
export function createMenuPress(
  menu: HTMLElement,
  options: CreateMenuPressOptions,
): CreateMenuPressReturn {
  let current = options;
  let trigger: HTMLElement | null = null;
  let isDestroyed = false;
  const core = createMenuPressCore({
    getMenu: () => menu,
    getTrigger: () => trigger,
    getOptions: () => current,
  });
  const disconnect = core.connect();
  const hadMarker = menu.hasAttribute(MENU_PRESS_MARKER);
  menu.setAttribute(MENU_PRESS_MARKER, '');

  const onMenuPointerDown = (event: PointerEvent) =>
    core.handleMenuPointerDown(event);
  const onTriggerPointerDown = (event: PointerEvent) =>
    core.handleTriggerPointerDown(event);
  const onTriggerContextMenu = (event: MouseEvent) =>
    core.handleTriggerContextMenu(event);
  menu.addEventListener('pointerdown', onMenuPointerDown);

  const setTrigger = (next: HTMLElement | null) => {
    if (next === trigger) {
      return;
    }
    if (trigger != null) {
      trigger.removeEventListener('pointerdown', onTriggerPointerDown);
      trigger.removeEventListener('contextmenu', onTriggerContextMenu);
    }
    trigger = next;
    if (trigger != null) {
      trigger.addEventListener('pointerdown', onTriggerPointerDown);
      trigger.addEventListener('contextmenu', onTriggerContextMenu);
    }
  };
  setTrigger(options.trigger ?? null);

  return {
    isTriggerClickFromPress: () => core.isTriggerClickFromPress(),
    cancel: () => core.cancel(),
    update(next) {
      if (isDestroyed) {
        return;
      }
      current = next;
      setTrigger(next.trigger ?? null);
    },
    destroy() {
      if (isDestroyed) {
        return;
      }
      isDestroyed = true;
      disconnect();
      menu.removeEventListener('pointerdown', onMenuPointerDown);
      setTrigger(null);
      if (!hadMarker) {
        menu.removeAttribute(MENU_PRESS_MARKER);
      }
    },
  };
}
