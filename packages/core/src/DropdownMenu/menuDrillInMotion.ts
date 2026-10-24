// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file menuDrillInMotion.ts
 * @input The menu's popover surface and its role="menu" list, the layer
 *   runtime's exit copy, the motion animator, and UIMenu's sub-menu values
 *   from the UIKit constants table
 * @output Exports createMenuDrillInMotion and MenuDrillInMotion: UIMenu's
 *   in-place sub-menu, played around DropdownMenu's drill-in (push and pop of
 *   a view), and the attributes of the copies it places
 * @position Touch presentation of DropdownMenu's drilled-in sub-menus; driven
 *   by useMenuDrillIn (capture before the view changes, play after)
 *
 * On a phone UIMenu opens a sub-menu in place (iOS 26.2): the menu's box grows
 * to fit the sub-menu, keeping the edge it is anchored by, on
 * `menu.submenuOpenSpring`; the sub-menu rides with that edge; the parent
 * stays behind as a card scaled to `menu.submenuParentScale` and
 * `menu.submenuParentDropPx` lower, its tapped row faded out. Back reverses
 * it on `menu.submenuBackSpring`.
 *
 * The page renders one menu box, so the parent behind is a copy of the
 * popover taken as the view is pushed (the layer runtime's exit copy: inert,
 * hidden from assistive technology, outside the top layer, so behind the live
 * popover). The live box's growth is drawn by three slices inside the popover
 * — top cap, middle, bottom cap — whose transforms move its anchored edge
 * without stretching its corners; the popover's own background and shadow
 * step aside while they move. Back plays the sub-menu on a copy placed
 * inside the popover, above the parent rows that the live list scales back
 * up. Everything that moves is a transform or an opacity; nothing runs on the
 * main thread per frame. Under Reduce Motion each change cross-fades
 * (`springs.menuReducedMotion`).
 *
 * SYNC: When modified, update menuDrillInMotion.test.ts and
 * useMenuDrillIn.tsx
 */

import {
  createAnimator,
  type Animator,
  type AnimatorOptions,
  type MotionHandle,
} from '../motion/animator';
import type {SpringDescription} from '../motion/spring';
import {menu, springs} from '../motion/uikit';
import {placeLayerExitCopy} from '../Layer/layerExitCopy';

/** Marks the copy of the parent menu that stays behind an open sub-menu. */
export const MENU_PARENT_COPY_ATTRIBUTE = 'data-astryx-menu-parent';
/** Marks the copy of a sub-menu that plays the way back. */
export const MENU_SUBMENU_COPY_ATTRIBUTE = 'data-astryx-menu-submenu-exit';
/** Marks the slices that draw the menu's box while it grows or shrinks. */
export const MENU_BOX_SLICE_ATTRIBUTE = 'data-astryx-menu-box';

const ROW_SELECTOR = '[role^="menuitem"]';
/** The chevron of a drilled-in view's header (it points down there). */
const HEADER_CHEVRON_SELECTOR =
  '[data-astryx-menu-submenu-header] [data-astryx-menu-submenu-chevron]';

/** The row's chevron points ahead: right, or left in a right-to-left menu. */
const aheadAngle = (element: Element): number =>
  getComputedStyle(element).direction === 'rtl' ? 180 : 0;
const REDUCED_MOTION = {crossfade: springs.menuReducedMotion} as const;

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Captured {
  kind: 'push' | 'pop';
  surface: Box;
  /** The row the sub-menu opens from (push) or returns to (pop). */
  row: HTMLElement | null;
  /** Its index among the rows shown at capture (push: the parent's). */
  rowIndex: number;
  /** Push: where the row stood, in viewport px; the header starts there. */
  rowTop: number | null;
  /**
   * Pop: the copy of the sub-menu taken as it stood before the view went
   * (the view hides with the pop), where it stood, and the rows under its
   * header.
   */
  leaving: {
    copy: HTMLElement;
    top: number;
    below: HTMLElement[];
    chevron: HTMLElement | null;
  } | null;
}

export interface MenuDrillInMotion {
  /**
   * Read the layout before the view changes: `push` as a sub-menu opens from
   * `row`, `pop` as it goes back to it.
   */
  capture(kind: 'push' | 'pop', row: HTMLElement | null): void;
  /** Play from the captured layout once the view has changed. */
  play(): void;
  /** Stop and remove everything at once (the menu closes, or unmounts). */
  reset(): void;
  dispose(): void;
}

export interface MenuDrillInElements {
  /** The popover: the menu's box, with its background and shadow. */
  surface: HTMLElement | null;
  /** The role="menu" element holding the rows and the drilled-in views. */
  list: HTMLElement | null;
}

function defaultPrefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

const boxOf = (element: Element): Box => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
};

/** What makes an element read as something to anything that queries it. */
const SEMANTIC_ATTRIBUTES = [
  'role',
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
] as const;

/**
 * A decorative copy exposes nothing: it is already hidden from assistive
 * technology, and its rows and fields must not read as rows or fields with
 * names to anything that queries roles.
 */
function stripSemantics(copy: HTMLElement): void {
  for (const node of [copy, ...copy.querySelectorAll<HTMLElement>('*')]) {
    for (const attribute of SEMANTIC_ATTRIBUTES) {
      node.removeAttribute(attribute);
    }
  }
}

/**
 * The element that paints the menu's box (its background, radius and
 * shadow): the popover itself, or the frame inside it that holds the list.
 */
function paintOf(surface: HTMLElement, list: HTMLElement): HTMLElement {
  for (
    let element: HTMLElement | null = list;
    element != null && element !== surface.parentElement;
    element = element.parentElement
  ) {
    const style = getComputedStyle(element);
    // A computed colour with a zero alpha, in any notation, paints nothing.
    const painted =
      style.backgroundColor !== '' &&
      style.backgroundColor !== 'transparent' &&
      !/[,/]\s*0\)$/.test(style.backgroundColor);
    const shadowed = !['', 'none'].includes(style.boxShadow);
    if (painted || shadowed) {
      return element;
    }
  }
  return surface;
}

/** The rows of the view showing in `list`: the drilled-in one, else the root's. */
function shownRows(list: HTMLElement): HTMLElement[] {
  return [...list.querySelectorAll<HTMLElement>(ROW_SELECTOR)].filter(
    row => row.getClientRects().length > 0,
  );
}

/** The innermost list of the view showing: the drilled-in one's, if any. */
function shownSubmenuList(list: HTMLElement): HTMLElement | null {
  const rows = shownRows(list);
  const owner = rows[0]?.parentElement ?? null;
  return owner != null && owner !== list ? owner : null;
}

/**
 * Create the motion. `getElements` is read on each call, so a component can
 * pass refs that are filled after the menu mounts.
 */
export function createMenuDrillInMotion(
  getElements: () => MenuDrillInElements,
  options: Pick<AnimatorOptions, 'now' | 'prefersReducedMotion'> = {},
): MenuDrillInMotion {
  const prefersReducedMotion =
    options.prefersReducedMotion ?? defaultPrefersReducedMotion;
  const animatorOptions = {now: options.now, prefersReducedMotion};

  let captured: Captured | null = null;
  // The parent card behind an open sub-menu, and its tapped row.
  let parent: {
    card: HTMLElement;
    animator: Animator;
    row: HTMLElement | null;
    rowAnimator: Animator | null;
  } | null = null;
  // Everything the transition in flight placed or moved, undone at its end.
  let transition: {
    animators: Animator[];
    nodes: HTMLElement[];
    /** The element whose paint stepped aside for the slices. */
    surface: HTMLElement;
    handles: MotionHandle[];
  } | null = null;

  const endTransition = () => {
    if (transition == null) {
      return;
    }
    for (const animator of transition.animators) {
      animator.dispose();
    }
    for (const node of transition.nodes) {
      node.remove();
    }
    transition.surface.style.removeProperty('background');
    transition.surface.style.removeProperty('box-shadow');
    transition.surface.style.removeProperty('position');
    transition = null;
  };

  const removeParent = () => {
    if (parent == null) {
      return;
    }
    parent.rowAnimator?.dispose();
    parent.animator.dispose();
    parent.card.remove();
    parent = null;
  };

  /**
   * Draw the box from `from` to `to` with three slices inside the surface,
   * moving the edge that is not anchored. Returns the slices' animators.
   */
  const playBox = (
    surface: HTMLElement,
    from: Box,
    to: Box,
    spring: SpringDescription,
  ): {animators: Animator[]; nodes: HTMLElement[]} => {
    const computed = getComputedStyle(surface);
    if (computed.position === 'static') {
      // The slices stand in the painted box itself.
      surface.style.setProperty('position', 'relative');
    }
    const radius = Math.min(
      parseFloat(computed.borderTopLeftRadius) || 0,
      to.height / 2,
      from.height / 2,
    );
    const anchoredBottom =
      Math.abs(from.top + from.height - (to.top + to.height)) <=
      Math.abs(from.top - to.top);
    const middleFrom = Math.max(from.height - 2 * radius, 0);
    const middleTo = Math.max(to.height - 2 * radius, 1);
    const make = (part: 'top' | 'middle' | 'bottom') => {
      const slice = surface.ownerDocument.createElement('div');
      slice.setAttribute(MENU_BOX_SLICE_ATTRIBUTE, part);
      slice.setAttribute('aria-hidden', 'true');
      const {style} = slice;
      style.setProperty('position', 'absolute');
      style.setProperty('left', '0');
      style.setProperty('right', '0');
      style.setProperty('pointer-events', 'none');
      style.setProperty('z-index', '-1');
      style.setProperty('background', computed.backgroundColor);
      if (part === 'top') {
        style.setProperty('top', '0');
        style.setProperty('height', `${radius}px`);
        style.setProperty('border-radius', `${radius}px ${radius}px 0 0`);
      } else if (part === 'bottom') {
        style.setProperty('bottom', '0');
        style.setProperty('height', `${radius}px`);
        style.setProperty('border-radius', `0 0 ${radius}px ${radius}px`);
      } else {
        style.setProperty('top', `${radius}px`);
        style.setProperty('bottom', `${radius}px`);
        style.setProperty(
          'transform-origin',
          anchoredBottom ? '50% 100%' : '50% 0%',
        );
      }
      surface.prepend(slice);
      return slice;
    };
    const top = make('top');
    const middle = make('middle');
    const bottom = make('bottom');
    const shift = anchoredBottom
      ? from.top - to.top
      : from.top + from.height - (to.top + to.height);
    const moving = anchoredBottom ? top : bottom;
    const edge = createAnimator(moving, animatorOptions);
    edge.set({y: shift});
    const body = createAnimator(middle, animatorOptions);
    body.set({scaleY: middleFrom / middleTo});
    // The surface's own paint steps aside while the slices draw it.
    surface.style.setProperty('background', 'transparent');
    surface.style.setProperty('box-shadow', 'none');
    const handles = [
      edge.animate({y: 0}, {spring}, REDUCED_MOTION),
      body.animate({scaleY: 1}, {spring}, REDUCED_MOTION),
    ];
    if (transition != null) {
      transition.handles.push(...handles);
    }
    return {animators: [edge, body], nodes: [top, middle, bottom]};
  };

  // A capture whose play never came leaves nothing behind.
  const dropCaptured = () => {
    captured?.leaving?.copy.remove();
    captured = null;
  };

  const capture: MenuDrillInMotion['capture'] = (kind, row) => {
    const {surface, list} = getElements();
    dropCaptured();
    endTransition();
    if (surface == null || list == null) {
      captured = null;
      return;
    }
    const rows = shownRows(list);
    const paint = paintOf(surface, list);
    captured = {
      kind,
      surface: boxOf(paint),
      row,
      rowIndex: row == null ? -1 : rows.indexOf(row),
      rowTop: kind === 'push' && row != null ? boxOf(row).top : null,
      leaving: null,
    };
    if (kind === 'pop') {
      // The sub-menu leaves on a copy above the parent rows, taken now: the
      // view hides as the stack pops.
      const submenu = shownSubmenuList(list);
      const submenuBox = submenu == null ? null : boxOf(submenu);
      if (submenu != null && submenuBox != null && submenuBox.height > 0) {
        const copy = placeLayerExitCopy(
          submenu,
          submenuBox,
          MENU_SUBMENU_COPY_ATTRIBUTE,
        );
        // Out of the view's list (which hides), still inside the popover.
        list.after(copy);
        const [header, ...below] = [
          ...copy.querySelectorAll<HTMLElement>(ROW_SELECTOR),
        ];
        // The header is opaque, as UIMenu's: it covers the parent row it
        // rides down onto, and lands on it exactly as that row looks.
        header?.style.setProperty(
          'background-color',
          getComputedStyle(paint).backgroundColor,
        );
        const chevron = copy.querySelector<HTMLElement>(
          HEADER_CHEVRON_SELECTOR,
        );
        stripSemantics(copy);
        captured.leaving = {copy, top: submenuBox.top, below, chevron};
      }
    }
    if (kind === 'push') {
      // The parent card behind: the popover as it stands now.
      removeParent();
      const card = placeLayerExitCopy(
        surface,
        captured.surface,
        MENU_PARENT_COPY_ATTRIBUTE,
      );
      // Behind the live popover (which is in the top layer), above the page.
      card.style.setProperty('transform-origin', '50% 50%');
      const cardRows = [
        ...card.querySelectorAll<HTMLElement>(ROW_SELECTOR),
      ].filter(candidate => !candidate.closest('[hidden]'));
      const cardRow =
        captured.rowIndex >= 0 ? (cardRows[captured.rowIndex] ?? null) : null;
      stripSemantics(card);
      parent = {
        card,
        animator: createAnimator(card, animatorOptions),
        row: cardRow,
        rowAnimator:
          cardRow == null ? null : createAnimator(cardRow, animatorOptions),
      };
    }
  };

  const play = () => {
    const {surface, list} = getElements();
    const from = captured;
    captured = null;
    if (from == null || surface == null || list == null) {
      return;
    }
    const paint = paintOf(surface, list);
    const to = boxOf(paint);
    transition = {animators: [], nodes: [], surface: paint, handles: []};
    const current = transition;
    if (prefersReducedMotion()) {
      // Reduce Motion: the views cross-fade; nothing travels or grows.
      const spring = springs.menuReducedMotion;
      if (from.kind === 'push') {
        if (parent != null) {
          current.handles.push(parent.animator.animate({opacity: 0}, {spring}));
        }
        const submenu = shownSubmenuList(list);
        if (submenu != null) {
          const fade = createAnimator(submenu, animatorOptions);
          fade.set({opacity: 0});
          current.animators.push(fade);
          current.handles.push(fade.animate({opacity: 1}, {spring}));
        }
      } else {
        removeParent();
        const fade = createAnimator(list, animatorOptions);
        fade.set({opacity: 0});
        current.animators.push(fade);
        current.handles.push(fade.animate({opacity: 1}, {spring}));
        if (from.leaving != null) {
          current.nodes.push(from.leaving.copy);
          const out = createAnimator(from.leaving.copy, animatorOptions);
          current.animators.push(out);
          current.handles.push(out.animate({opacity: 0}, {spring}));
        }
      }
    } else if (from.kind === 'push') {
      const spring = menu.submenuOpenSpring;
      if (parent != null) {
        current.handles.push(
          parent.animator.animate(
            {
              scaleX: menu.submenuParentScale,
              scaleY: menu.submenuParentScale,
              y: menu.submenuParentDropPx,
            },
            {spring},
            REDUCED_MOTION,
          ),
        );
        if (parent.rowAnimator != null) {
          current.handles.push(
            parent.rowAnimator.animate({opacity: 0}, {spring}, REDUCED_MOTION),
          );
        }
      }
      const box = playBox(paint, from.surface, to, spring);
      current.animators.push(...box.animators);
      current.nodes.push(...box.nodes);
      // The sub-menu's header rides from the tapped row to the top, the
      // sub-menu with it; its rows below the header fade in as the box
      // reveals them.
      const submenu = shownSubmenuList(list);
      if (submenu != null) {
        const rides = createAnimator(submenu, animatorOptions);
        rides.set({
          y:
            from.rowTop != null
              ? from.rowTop - boxOf(submenu).top
              : from.surface.top - to.top,
        });
        current.animators.push(rides);
        current.handles.push(rides.animate({y: 0}, {spring}, REDUCED_MOTION));
        // The header's chevron turns from the row's (pointing ahead) to down.
        const chevron = submenu.querySelector<HTMLElement>(
          HEADER_CHEVRON_SELECTOR,
        );
        if (chevron != null) {
          const turns = createAnimator(chevron, animatorOptions);
          turns.set({rotate: aheadAngle(chevron)});
          current.animators.push(turns);
          current.handles.push(
            turns.animate({rotate: 90}, {spring}, REDUCED_MOTION),
          );
        }
        const [, ...below] = shownRows(submenu);
        for (const row of below) {
          const fade = createAnimator(row, animatorOptions);
          fade.set({opacity: 0});
          current.animators.push(fade);
          current.handles.push(
            fade.animate({opacity: 1}, {spring}, REDUCED_MOTION),
          );
        }
      }
    } else {
      const spring = menu.submenuBackSpring;
      // The parent card hands over to the live parent rows, which grow back
      // from where the card stood.
      removeParent();
      // …and come forward: they fade in as the sub-menu's rows fade out.
      const grows = createAnimator(list, animatorOptions);
      grows.set({
        scaleX: menu.submenuParentScale,
        scaleY: menu.submenuParentScale,
        y: menu.submenuParentDropPx,
        opacity: 0,
      });
      current.animators.push(grows);
      current.handles.push(
        grows.animate(
          {scaleX: 1, scaleY: 1, y: 0, opacity: 1},
          {spring},
          REDUCED_MOTION,
        ),
      );
      const returning =
        from.row != null && from.row.getClientRects().length > 0
          ? from.row
          : null;
      if (returning != null) {
        const fade = createAnimator(returning, animatorOptions);
        fade.set({opacity: 0});
        current.animators.push(fade);
        current.handles.push(
          fade.animate({opacity: 1}, {spring}, REDUCED_MOTION),
        );
      }
      const box = playBox(paint, from.surface, to, spring);
      current.animators.push(...box.animators);
      current.nodes.push(...box.nodes);
      // The sub-menu leaves on its copy: its header rides down onto the row
      // it returns to, its chevron turning back and its rows fading.
      const leaving = from.leaving;
      if (leaving != null) {
        current.nodes.push(leaving.copy);
        const rides = createAnimator(leaving.copy, animatorOptions);
        current.animators.push(rides);
        const landing =
          returning != null
            ? boxOf(returning).top - leaving.top
            : to.top - from.surface.top;
        current.handles.push(
          rides.animate({y: landing}, {spring}, REDUCED_MOTION),
        );
        if (leaving.chevron != null) {
          const turns = createAnimator(leaving.chevron, animatorOptions);
          turns.set({rotate: 90});
          current.animators.push(turns);
          current.handles.push(
            turns.animate(
              {rotate: aheadAngle(leaving.chevron)},
              {spring},
              REDUCED_MOTION,
            ),
          );
        }
        for (const row of leaving.below) {
          const fade = createAnimator(row, animatorOptions);
          current.animators.push(fade);
          current.handles.push(
            fade.animate({opacity: 0}, {spring}, REDUCED_MOTION),
          );
        }
      }
    }
    void Promise.all(current.handles.map(async handle => handle.finished)).then(
      () => {
        if (transition === current) {
          endTransition();
        }
      },
    );
  };

  const reset = () => {
    dropCaptured();
    endTransition();
    removeParent();
  };

  return {
    capture,
    play,
    reset,
    dispose: reset,
  };
}
