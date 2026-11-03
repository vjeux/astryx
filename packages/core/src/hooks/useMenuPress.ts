// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useMenuPress.ts
 * @input The menu's ref, and createMenuPress's options with the trigger as a
 *   ref
 * @output Exports useMenuPress, createMenuPress's React form, and re-exports
 *   the marker attributes, the press constants and the activation mark
 * @position Core hook; a thin wrapper over createMenuPress, in its ref form
 *   for ContextMenu, DropdownMenuSubMenu, MenuBottomSheetActionList, Selector
 *   and TabMenu. The options form, which returns props to spread, stays with
 *   DropdownMenu (its trigger's props), BreadcrumbItem, NavHeadingMenu,
 *   TopNavMenu, and the SideNav and TopNav heading menus.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/hooks/useMenuPress.doc.mjs
 * - /packages/core/src/hooks/useMenuPress.test.tsx
 * - /packages/core/src/hooks/useMenuPress.factory.test.tsx
 * - /packages/core/src/hooks/createMenuPress.ts
 */

import {useEffect, useMemo, useRef, useState, type RefObject} from 'react';
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect';
import {
  createMenuPress,
  createMenuPressCore,
  MENU_PRESS_MARKER,
  type CreateMenuPressOptions,
  type CreateMenuPressReturn,
  type MenuPressCore,
} from './createMenuPress';
import type {MenuPressPointerType} from './menuPressGesture';
import {useInteractionModalityTrackingFor} from '../utils/interactionModality';

export {
  MENU_PRESS_MARKER,
  MENU_PRESS_SURFACE_ATTR,
  MENU_PRESS_STRAY_CLICK_MS,
  MENU_PRESS_LONG_PRESS_MS,
  MENU_PRESS_TRIGGER_DRIFT_PX,
  MENU_PRESS_AUTOSCROLL_ZONE_PX,
  isMenuPressActivation,
  __resetMenuPressForTest,
} from './createMenuPress';

// =============================================================================
// Options
// =============================================================================

/** The ref form's options: createMenuPress's, with the trigger as a ref. */
export interface UseMenuPressRefOptions extends Omit<
  CreateMenuPressOptions,
  'trigger'
> {
  /**
   * The control that opens the menu, when the press may start there. It gets
   * the press only while the menu element is mounted.
   */
  triggerRef?: RefObject<HTMLElement | null>;
}

/** What the ref form returns: the press's reads; the hook owns its life. */
export type UseMenuPressRefReturn = Pick<
  CreateMenuPressReturn,
  | 'isTriggerClickFromPress'
  | 'cancel'
  | 'handleTriggerPointerDown'
  | 'handleTriggerContextMenu'
>;

/**
 * The options form's options: the menu and the trigger as refs.
 * @deprecated Use the ref form, `useMenuPress(menuRef, options)`. The options
 *   form goes at the next minor.
 */
export interface UseMenuPressOptions {
  /** The menu (or listbox) root: the surface whose rows the press picks from. */
  menuRef: RefObject<HTMLElement | null>;
  /** The control that opens the menu, when the press may start there. */
  triggerRef?: RefObject<HTMLElement | null>;
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
   * by {@link UseMenuPressReturn.isTriggerClickFromPress} so the caller can
   * leave it alone.
   */
  onTriggerPress?: (pointerType: MenuPressPointerType) => boolean;
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

/**
 * What the options form returns: props to spread on the menu and the trigger.
 * @deprecated Use the ref form, `useMenuPress(menuRef, options)`. The options
 *   form goes at the next minor.
 */
export interface UseMenuPressReturn {
  /** Spread onto the menu root: claims presses that begin inside it. */
  menuProps: {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
    [MENU_PRESS_MARKER]: '';
  };
  /** Spread onto the trigger: a mouse press opens; a held finger opens. */
  triggerProps: {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
    onContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
  };
  /**
   * Whether the click reaching the trigger belongs to the gesture that just
   * pressed it — the press already opened or closed the menu, so the click
   * must neither toggle nor reopen it.
   */
  isTriggerClickFromPress: () => boolean;
  /** End the gesture in flight with nothing acting (the menu closed). */
  cancel: () => void;
}

/** The factory's options, from the hook's: the trigger read from its ref. */
function factoryOptionsOf(
  options: UseMenuPressRefOptions,
): CreateMenuPressOptions {
  const {triggerRef, ...rest} = options;
  return {...rest, trigger: triggerRef?.current ?? null};
}

/**
 * The press model for a menu: the row under the release acts, the highlight
 * follows a held pointer, a mouse opens on press. createMenuPress on the
 * element behind `menuRef`; see createMenuPress.ts. The press attaches when the
 * calling component commits, so a menu that a child mounts in a later commit
 * attaches at the caller's next commit. While the menu element is unmounted,
 * there is no press, not even on the trigger. So a menu that opens on a press
 * of its trigger keeps its element mounted while it is closed.
 *
 * @example
 * ```
 * const menuPress = useMenuPress(listRef, {
 *   triggerRef: buttonRef,
 *   itemSelector: MENU_ITEM_SELECTOR,
 *   onTriggerPress: () => openMenu(),
 *   onDismiss: closeMenu,
 * });
 * <button ref={buttonRef} onClick={e => {
 *   if (menuPress.isTriggerClickFromPress()) return;
 *   toggle();
 * }} />
 * <div ref={listRef} role="menu">…</div>
 * ```
 */
export function useMenuPress(
  menuRef: RefObject<HTMLElement | null>,
  options: UseMenuPressRefOptions,
): UseMenuPressRefReturn;
/**
 * The options form: props to spread on the menu root and the trigger. The ref
 * form above listens on both itself, so nothing is spread.
 * @deprecated Use the ref form, `useMenuPress(menuRef, options)`. The options
 *   form goes at the next minor.
 */
export function useMenuPress(options: UseMenuPressOptions): UseMenuPressReturn;
export function useMenuPress(
  first: RefObject<HTMLElement | null> | UseMenuPressOptions,
  second?: UseMenuPressRefOptions,
): UseMenuPressRefReturn | UseMenuPressReturn {
  // A call site keeps one form for its life, so both take the same hooks.
  const isRefForm = second !== undefined;
  const menuRef = isRefForm
    ? (first as RefObject<HTMLElement | null>)
    : (first as UseMenuPressOptions).menuRef;
  const options: UseMenuPressRefOptions = isRefForm
    ? second
    : (first as UseMenuPressOptions);
  const latestRef = useRef({menuRef, options});
  // The press reads the committed render's options at event time: a render
  // that React discards never reaches it.
  useIsomorphicLayoutEffect(() => {
    latestRef.current = {menuRef, options};
  });

  // The ref form: createMenuPress on the element behind the ref. A new menu or
  // document creates a new factory. Every other change reaches it through
  // update() at commit, so a render that React discards never reaches it.
  const attachedRef = useRef<{
    menu: HTMLElement;
    ownerDocument: Document;
    press: CreateMenuPressReturn;
  } | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!isRefForm) {
      return;
    }
    const {menuRef: ref, options: latest} = latestRef.current;
    const menu = ref.current;
    const attached = attachedRef.current;
    if (
      attached != null &&
      attached.menu === menu &&
      attached.ownerDocument === menu.ownerDocument
    ) {
      attached.press.update(factoryOptionsOf(latest));
      return;
    }
    attached?.press.destroy();
    attachedRef.current =
      menu == null
        ? null
        : {
            menu,
            ownerDocument: menu.ownerDocument,
            press: createMenuPress(menu, factoryOptionsOf(latest)),
          };
  });
  useIsomorphicLayoutEffect(
    () => () => {
      attachedRef.current?.press.destroy();
      attachedRef.current = null;
    },
    [],
  );

  // The options form: the same core, driven by the props it returns.
  const [core] = useState<MenuPressCore | null>(() =>
    isRefForm
      ? null
      : createMenuPressCore({
          getMenu: () => latestRef.current.menuRef.current,
          getTrigger: () =>
            latestRef.current.options.triggerRef?.current ?? null,
          getOptions: () => latestRef.current.options,
        }),
  );
  useEffect(() => core?.connect(), [core]);
  // The options form holds the document the menu is in after every commit; the
  // ref form's factory holds its menu's document itself. The page's tracking
  // starts here at mount either way, before a menu mounted at its first open
  // exists.
  useInteractionModalityTrackingFor(menuRef, !isRefForm);

  return useMemo<UseMenuPressRefReturn | UseMenuPressReturn>(() => {
    if (core == null) {
      return {
        isTriggerClickFromPress: () =>
          attachedRef.current?.press.isTriggerClickFromPress() ?? false,
        cancel: () => attachedRef.current?.press.cancel(),
        handleTriggerPointerDown: event =>
          attachedRef.current?.press.handleTriggerPointerDown(event),
        handleTriggerContextMenu: event =>
          attachedRef.current?.press.handleTriggerContextMenu(event),
      };
    }
    return {
      menuProps: {
        onPointerDown: core.handleMenuPointerDown,
        [MENU_PRESS_MARKER]: '',
      },
      triggerProps: {
        onPointerDown: core.handleTriggerPointerDown,
        onContextMenu: core.handleTriggerContextMenu,
      },
      isTriggerClickFromPress: core.isTriggerClickFromPress,
      cancel: core.cancel,
    };
  }, [core]);
}
