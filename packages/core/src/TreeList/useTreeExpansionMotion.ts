// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useTreeExpansionMotion.ts
 * @input A tree row's expanded state, the tree's touch presentation (read
 *   once per tree in TreeList.tsx, utils/touchPresentation.ts), the motion
 *   foundation's animator and the outline spring from the UIKit constants
 *   table (motion/uikit/list.ts)
 * @output `useTreeExpansionMotion`: whether a row renders its children, the
 *   ref its group attaches, and, under a coarse primary pointer, the expand
 *   played the way a UIKit outline list plays it and the chevron's turn both
 *   ways; with a mouse the children come and go in one frame, as before
 * @position TreeList internals; TreeListItem calls it for every row with
 *   children
 *
 * UIKit's reference (iOS 26.2, a UICollectionView list with outline
 * disclosure): on expand, the children slide down out from under the parent
 * as one block; the disclosure chevron turns 90°; both on one critically
 * damped spring (`list.update.outlineSpring`, an internal constant), with no
 * fade. A collapse removes the group at the tap and the chevron turns back on
 * the same spring. (UIKit slides the children back up while the rows after
 * the group wait; that wait is a stagger `spec:AST-105` does not have.)
 *
 * HOW IT RUNS, compositor only. The group keeps its final layout; it clips its
 * own box for the length of the motion, so its top edge (the parent row's
 * bottom) is the clip's edge, and its children translate as one block from
 * the group's height above it. The chevron turns by an additive `rotate`
 * over its final CSS transform. Both are played by the animator on the
 * compositor, retargeted from the value on screen when the row is toggled
 * again mid-motion, and each releases its inline value when its own spring
 * arrives. From rest, the block and the chevron start together when the
 * browser commits them, on one clock (`spec:AST-108` FR4a). A collapse
 * removes the group at its commit, mid-expand too; the chevron turns back
 * from its angle on screen.
 *
 * Nothing outside the group moves: with no animated layout handle, the rows
 * after the group and the content after the tree take their new places at
 * once, by layout, at the commit that inserts or removes the group
 * (`spec:AST-105` FR2; `spec:AST-094` FR5 forbids animating layout). An
 * unmount mid-motion leaves nothing moved.
 *
 * Under reduced motion nothing travels (`design:reduced-motion`): every part
 * takes the animator's own Reduced Motion handling, so the children fade in
 * where they land and the chevron cross-fades into place.
 *
 * One touch model: every coarse primary pointer gets the same motion. With a
 * mouse (the theme's presentation) nothing moves: the children appear and
 * leave at once, as before.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/TreeList/TreeListItem.tsx
 * - /packages/core/src/TreeList/__tests__/TreeListExpand.interaction.browser.spec.ts
 */

import {useCallback, useRef} from 'react';
import {isRtlElement} from '../hooks/isRtlElement';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {list} from '../motion/uikit/list';
import {motionNow, releaseMotion, springHome} from '../utils/rowMotion';

const SPRING = list.update.outlineSpring;
/** The chevron turns a quarter turn between collapsed and expanded. */
const QUARTER_TURN = 90;

export interface TreeExpansionMotion {
  /** Render the children: the row is expanded. */
  readonly showsChildren: boolean;
  /** For the children's group (`ul[role="group"]`). */
  readonly groupRef: (element: HTMLUListElement | null) => void;
}

/** The row's own chevron glyph (`data-tree-chevron`), beside its group. */
function chevronOf(item: HTMLElement | null): HTMLElement | null {
  return (
    item?.querySelector<HTMLElement>(
      ':scope > :not([role="group"]) [data-tree-chevron]',
    ) ?? null
  );
}

export function useTreeExpansionMotion(
  isExpanded: boolean,
  {
    isEnabled = true,
    isTouch = false,
  }: {
    isEnabled?: boolean;
    /**
     * Under a finger: the tree reads its touch presentation once, for every
     * row (`spec:AST-094` FR24: a repeated row adds no touch observer).
     */
    isTouch?: boolean;
  } = {},
): TreeExpansionMotion {
  // Off while the tree holds an animated-layout handle: the handle then
  // plays the group's motion under every pointer (`component:TreeList` FR8).
  const animates = isTouch && isEnabled;

  const groupElementRef = useRef<HTMLUListElement | null>(null);
  /**
   * The item the group renders in: it keeps the row's chevron, which turns
   * back after a collapse has taken the group away.
   */
  const itemElementRef = useRef<HTMLElement | null>(null);
  const previousRef = useRef(isExpanded);
  /** The motion in flight; a newer one makes an older one's ending moot. */
  const generationRef = useRef(0);
  // External system (`architecture:react-component-runtime` INV3): the shared
  // motion animators (utils/rowMotion.ts) of the group's rows and of the
  // chevron. A toggle starts them and a toggle mid-motion retargets the
  // chevron's; the commit that removes the children takes the group's rows
  // with it.
  useIsomorphicLayoutEffect(() => {
    const wasExpanded = previousRef.current;
    previousRef.current = isExpanded;
    if (wasExpanded === isExpanded || !animates) {
      return;
    }
    const at = motionNow();
    const mine = ++generationRef.current;

    const glyph = chevronOf(itemElementRef.current);
    if (glyph?.isConnected === true) {
      // The class switch just turned the glyph's CSS transform a quarter
      // turn; start the additive turn from where it was and spring it home.
      const sign = isRtlElement(glyph) ? -1 : 1;
      void springHome(
        glyph,
        'rotate',
        (isExpanded ? -QUARTER_TURN : QUARTER_TURN) * sign,
        SPRING,
        at,
      ).then(arrived => {
        if (arrived && generationRef.current === mine) {
          releaseMotion(glyph, 'rotate');
        }
      });
    }

    // A collapse took the group away at this commit: only the chevron turns.
    const element = groupElementRef.current;
    if (!isExpanded || element == null) {
      return;
    }
    const height = element.offsetHeight;
    const children = Array.from(element.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    // The clip: the group's own box, whose top edge is the parent row's
    // bottom, for the length of the motion.
    element.style.overflow = 'clip';
    // Out from under the parent: the block starts its own height up, and
    // each child releases its inline `translate` when its own spring
    // arrives. Under reduced motion the children fade in where they land.
    const block = children.map(async child => {
      const arrived = await springHome(
        child,
        'y',
        -height,
        SPRING,
        at,
        'entrance',
      );
      if (arrived && generationRef.current === mine) {
        releaseMotion(child, 'translate');
      }
      return arrived;
    });
    void Promise.all(block).then(results => {
      if (generationRef.current !== mine || results.some(done => !done)) {
        return;
      }
      element.style.removeProperty('overflow');
    });
  }, [isExpanded, animates]);

  // External system (`architecture:react-component-runtime` INV3): the
  // group's clip, which the effect above sets on an element this row renders.
  // An unmount mid-motion clears it and makes any pending arrival moot.
  useIsomorphicLayoutEffect(
    () => () => {
      generationRef.current += 1;
      groupElementRef.current?.style.removeProperty('overflow');
    },
    [],
  );

  const groupRef = useCallback((element: HTMLUListElement | null) => {
    groupElementRef.current = element;
    if (element?.parentElement != null) {
      itemElementRef.current = element.parentElement;
    }
  }, []);
  return {showsChildren: isExpanded, groupRef};
}
