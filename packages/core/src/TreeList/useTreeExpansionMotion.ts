// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useTreeExpansionMotion.ts
 * @input A tree row's expanded state, the tree's touch presentation, the
 *   motion foundation's animator and the theme's timing tokens
 * @output `useTreeExpansionMotion`: the ref the row's group attaches, and,
 *   under a coarse primary pointer, the expand's slide
 * @position TreeList internals. TreeListItem calls it for every row with
 *   children.
 *
 * SYNC: When modified, update /packages/core/src/TreeList/TreeListItem.tsx and
 * /packages/core/src/TreeList/__tests__/TreeListExpand.interaction.browser.spec.ts.
 */

// Under a finger an expand slides the children out from under the parent as
// one block, as a UIKit outline list does, with no fade. A tap starts it, so
// it follows the theme's timing, not a gesture's spring. The group carries the
// same duration and easing tokens as the chevron's turn, so both move
// together. The group keeps its final layout and clips its own box for the
// slide. So its top edge, the parent row's bottom, is the clip's edge. The
// children translate as one block from the group's height above.
// The animator plays the slide on the compositor, from the browser's commit.
//
// A collapse removes the group at the tap, mid-expand too, so the rows after
// take their places at once. The chevron turns back on its own transition.
// With an animated layout handle the handle plays the group's motion instead.
// With a mouse the children come and go at once. Under Reduce Motion the
// animator's policy replaces the travel, so the children fade in where they
// land. An unmount mid-slide leaves nothing moved.

import {useCallback, useRef} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {animatorFor} from '../motion/animator';
import {themeTimingOf, timedCurve} from '../motion/themeTiming';

export interface TreeExpansionMotion {
  /** For the children's group (`ul[role="group"]`). */
  readonly groupRef: (element: HTMLUListElement | null) => void;
}

export function useTreeExpansionMotion(
  isExpanded: boolean,
  {
    isEnabled = true,
    isTouch = false,
  }: {
    isEnabled?: boolean;
    /** Under a finger. The tree reads its touch presentation once. */
    isTouch?: boolean;
  } = {},
): TreeExpansionMotion {
  const animates = isTouch && isEnabled;
  const groupElementRef = useRef<HTMLUListElement | null>(null);
  const previousRef = useRef(isExpanded);
  /** The slide in flight. A newer one makes an older one's ending moot. */
  const generationRef = useRef(0);

  // Syncs with external systems: the shared animators of the group's rows,
  // and the clip on the group. An expand starts them, and the commit of a
  // collapse takes the group away with them.
  useIsomorphicLayoutEffect(() => {
    const wasExpanded = previousRef.current;
    previousRef.current = isExpanded;
    const group = groupElementRef.current;
    if (wasExpanded || !isExpanded || !animates || group == null) {
      return;
    }
    const timing = themeTimingOf(group);
    if (timing == null) {
      return;
    }
    const mine = ++generationRef.current;
    const height = group.offsetHeight;
    const children = Array.from(group.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    group.style.overflow = 'clip';
    const slides = children.map(
      async child =>
        animatorFor(child).play(
          {y: timedCurve(-height, 0, timing)},
          {crossfadeAs: 'entrance'},
        ).finished,
    );
    void Promise.all(slides).then(arrivals => {
      if (generationRef.current !== mine || arrivals.some(done => !done)) {
        return;
      }
      group.style.removeProperty('overflow');
      // A resting row carries no `translate`: a transform would make it a
      // containing block for fixed descendants.
      for (const child of children) {
        child.style.removeProperty('translate');
        child.style.removeProperty('opacity');
      }
    });
  }, [isExpanded, animates]);

  // An unmount mid-slide clears the clip and makes a pending arrival moot.
  useIsomorphicLayoutEffect(
    () => () => {
      generationRef.current += 1;
      groupElementRef.current?.style.removeProperty('overflow');
    },
    [],
  );

  const groupRef = useCallback((element: HTMLUListElement | null) => {
    groupElementRef.current = element;
  }, []);
  return {groupRef};
}
