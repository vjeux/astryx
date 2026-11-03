// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useGroupPressTracking.ts
 * @input A group's root ref and whether the group tracks presses: under the
 *   touch presentation only
 * @output useGroupPressTracking: the press tracking that ButtonGroup and
 *   ToggleButtonGroup share; GROUP_PRESS_POINTERS, the pointers it follows
 * @position Internal hook, not exported from the hooks entry. It drives
 *   useActionGroupTracking and the shared hit area for a group's members.
 *   Each group applies groupHitAreaStyles (utils/groupHitArea.stylex.ts).
 *   AlertDialog's tracking follows GROUP_PRESS_POINTERS too.
 *
 * SYNC: When modified, update ButtonGroupTracking.test.tsx and
 * ToggleButtonGroupTracking.test.tsx.
 */

import {useCallback, useState, type RefCallback, type RefObject} from 'react';
import type {GestureTouch} from '../gestures/types';
import {isPressGroupItem} from '../privateAttributes/pressGroupItem.stylex';
import {groupGrowth, watchHitArea, writeHitInsets} from '../utils/hitArea';
import {DISABLED_SELECTOR, type ActionGroupTarget} from './actionGroupTracker';
import {
  measureNeighbours,
  resolveNearestAction,
  useActionGroupTracking,
} from './useActionGroupTracking';

/** What a member Button renders. The tracker keeps the marked ones. */
const MEMBER_ELEMENTS = 'button, a[href]';

/**
 * Whether `member` has a box. A hidden member's box is empty, at the
 * viewport's corner, so it neither tracks a press nor grows a target.
 */
function hasBox(member: Element): boolean {
  const {width, height} = member.getBoundingClientRect();
  return width > 0 && height > 0;
}

/** Whether the group tracks `member`, read without its box. */
function isTrackedMember(member: Element): boolean {
  return isPressGroupItem(member) && !member.matches(DISABLED_SELECTOR);
}

/** The tracked, enabled members with a box, each box read once. */
function trackedTargets(group: HTMLElement): ActionGroupTarget[] {
  const targets: ActionGroupTarget[] = [];
  for (const element of group.querySelectorAll<HTMLElement>(MEMBER_ELEMENTS)) {
    if (isTrackedMember(element)) {
      const {left, top, right, bottom} = element.getBoundingClientRect();
      if (right > left && bottom > top) {
        targets.push({element, left, top, right, bottom});
      }
    }
  }
  return targets;
}

/**
 * Whether the group takes `touch`'s press. It takes one on an enabled tracked
 * member. A press on a disabled member keeps its click, so its tooltip can
 * open. It takes a finger's press on its own box or hit layer only where a
 * member's grown target holds it. Any other press keeps its own click, so a
 * tap beside the members of a wide group reaches the page. A member the group
 * does not track, such as a menu trigger, keeps its own press. A group with
 * no box takes none.
 */
function takesPress(group: HTMLElement | null, touch: GestureTouch): boolean {
  const {target} = touch;
  // A node check, not `instanceof`: the group may render in another window.
  if (group == null || (target as Node | null)?.nodeType !== 1) {
    return false;
  }
  const box = group.getBoundingClientRect();
  if (box.width <= 0 || box.height <= 0) {
    return false;
  }
  if (target !== group) {
    const member = (target as Element).closest(MEMBER_ELEMENTS);
    return member != null && group.contains(member) && isTrackedMember(member);
  }
  return (
    touch.pointerType === 'touch' &&
    resolveNearestAction(
      touch.startX,
      touch.startY,
      trackedTargets(group),
      // The tracked members are read once above, so the neighbour test reads
      // only the others.
      measureNeighbours(group, {
        itemSelector: MEMBER_ELEMENTS,
        isItem: isTrackedMember,
      }),
    ) != null
  );
}

export interface GroupPressTracking {
  /** Merge into the group's root: it keeps the hit layer's insets live. */
  readonly hitAreaRef: RefCallback<HTMLElement>;
  /**
   * Apply `groupHitAreaStyles.hitArea` to the root. True only while the
   * group's watch grows a member's target, under a coarse primary pointer, so
   * a desktop root keeps its stacking.
   */
  readonly hasHitLayer: boolean;
}

/** The pointers a group's press slides for: a finger and a pen. */
export const GROUP_PRESS_POINTERS = ['touch', 'pen'] as const;

/**
 * Track a held finger or pen across the marked members of the group behind
 * `ref`, while `isEnabled`. The member under it highlights at once, and the
 * lift runs it through its own click. A finger picks the nearest member whose
 * grown target holds it.
 */
export function useGroupPressTracking(
  ref: RefObject<HTMLElement | null>,
  isEnabled: boolean,
): GroupPressTracking {
  useActionGroupTracking(ref, {
    itemSelector: MEMBER_ELEMENTS,
    // A disabled member is the tracker's neighbour, measured once per press.
    isItem: member => isTrackedMember(member) && hasBox(member),
    pointerTypes: GROUP_PRESS_POINTERS,
    highlightOnsetMs: 0,
    highlightExpansion: 0,
    resolveTarget: resolveNearestAction,
    shouldTrack: touch => takesPress(ref.current, touch),
    isEnabled,
  });
  // A finger's target grows toward 44 px through the hit layer, not the
  // members. The watch shares the page's one `(pointer: coarse)` listener
  // and grows a target only under a coarse primary pointer, so the layer
  // exists only then.
  const [isGrowing, setIsGrowing] = useState(false);
  const hitAreaRef = useCallback(
    (element: HTMLElement | null) => {
      if (!isEnabled || element == null) {
        return;
      }
      const stop = watchHitArea(
        element,
        insets => {
          writeHitInsets(element, insets);
          setIsGrowing(
            insets.top > 0 ||
              insets.right > 0 ||
              insets.bottom > 0 ||
              insets.left > 0,
          );
        },
        {
          // Each side grows as far as the members on that edge would.
          growth: box => groupGrowth(box, trackedTargets(element)),
          // The tracker reads the group's own members when a press begins.
          // So a press reads nothing else on the page.
          checkAtPress: false,
        },
      );
      return () => {
        stop();
        setIsGrowing(false);
      };
    },
    [isEnabled],
  );
  return {hitAreaRef, hasHitLayer: isEnabled && isGrowing};
}
