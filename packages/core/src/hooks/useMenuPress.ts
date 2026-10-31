// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useMenuPress.ts
 * @input The menu's ref, and createMenuPress's options with the trigger as a
 *   ref
 * @output Exports useMenuPress, createMenuPress's React form, and re-exports
 *   the marker attributes, the press constants and the activation mark
 * @position Core hook; a thin wrapper over createMenuPress (spec:AST-107 FR6,
 *   architecture:public-component-api INV22), mounted in its ref form by
 *   ContextMenu, DropdownMenuSubMenu, MenuBottomSheetActionList, Selector and
 *   TabMenu. Until the next minor the deprecated options form stays with
 *   DropdownMenu (its trigger's props) and with the menus that track only
 *   presses on their items: BreadcrumbItem, NavHeadingMenu, TopNavMenu, and
 *   the SideNav and TopNav heading menus. The model itself lives in
 *   createMenuPress.ts; the pure transition table in menuPressGesture.ts.
 *
 * Two forms, one model:
 *
 * - `useMenuPress(menuRef, options)` creates createMenuPress on the element
 *   behind the ref, with the trigger behind `options.triggerRef`. It hands
 *   the factory the latest options at each commit, re-creates it when the
 *   ref moves to a new element, and destroys it at unmount. Nothing to
 *   spread: the factory listens on the menu and the trigger itself.
 * - `useMenuPress({menuRef, …})` (deprecated, removed at the next minor)
 *   returns props to spread instead. They forward into the same press core
 *   with the timing React gives them, so its callers behave as before.
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
  /** The control that opens the menu, when the press may start there. */
  triggerRef?: RefObject<HTMLElement | null>;
}

/** What the ref form returns: the press's reads; the hook owns its life. */
export type UseMenuPressRefReturn = Pick<
  CreateMenuPressReturn,
  'isTriggerClickFromPress' | 'cancel'
>;

/**
 * The deprecated options form's options.
 * @deprecated Use {@link UseMenuPressRefOptions} with
 * `useMenuPress(menuRef, options)`.
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
 * What the deprecated options form returns.
 * @deprecated Use `useMenuPress(menuRef, options)`, which returns
 * {@link UseMenuPressRefReturn} and needs nothing spread.
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

// =============================================================================
// Hook
// =============================================================================

/**
 * The press model for a menu: the row under the release acts, the highlight
 * follows a held pointer, a mouse opens on press. createMenuPress on the
 * element behind `menuRef`; see createMenuPress.ts.
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
 * @deprecated Pass the menu's ref first:
 * `useMenuPress(menuRef, {triggerRef, …})` listens on the menu and its trigger
 * itself, so there are no `menuProps` or `triggerProps` to spread. This form
 * is removed at the next minor.
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
  // The latest options, read by the press at event time, as they always were.
  const latestRef = useRef({menuRef, options});
  latestRef.current = {menuRef, options};

  // The ref form: createMenuPress on the element behind the ref.
  const attachedRef = useRef<{
    menu: HTMLElement;
    press: CreateMenuPressReturn;
  } | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!isRefForm) {
      return;
    }
    const {menuRef: ref, options: latest} = latestRef.current;
    const menu = ref.current;
    const {triggerRef, ...rest} = latest;
    const factoryOptions: CreateMenuPressOptions = {
      ...rest,
      trigger: triggerRef?.current ?? null,
    };
    const attached = attachedRef.current;
    if (attached != null && attached.menu === menu) {
      attached.press.update(factoryOptions);
      return;
    }
    attached?.press.destroy();
    attachedRef.current =
      menu == null
        ? null
        : {menu, press: createMenuPress(menu, factoryOptions)};
  });
  useIsomorphicLayoutEffect(
    () => () => {
      attachedRef.current?.press.destroy();
      attachedRef.current = null;
    },
    [],
  );

  // The deprecated options form: the same core, driven by the props it returns.
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

  return useMemo<UseMenuPressRefReturn | UseMenuPressReturn>(() => {
    if (core == null) {
      return {
        isTriggerClickFromPress: () =>
          attachedRef.current?.press.isTriggerClickFromPress() ?? false,
        cancel: () => attachedRef.current?.press.cancel(),
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
