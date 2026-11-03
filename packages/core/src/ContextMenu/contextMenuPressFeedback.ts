// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file contextMenuPressFeedback.ts
 * @input The press feedback's curve, the context-menu constants, the
 *   compositor animator, and the press state core's press machine writes
 * @output useContextMenuPressFeedback: hold and release, from ContextMenu's
 *   menu; the growth itself follows the press machine
 * @position The press feedback of ContextMenu's touch invocation
 *
 * SYNC: When modified, update /packages/core/src/ContextMenu/ContextMenu.tsx
 */

// On iOS 26.2, a finger that rests on a view with a context menu makes a copy
// of the view grow from its center. A finger that lifts or wanders before the
// commit sends the size back to 1 on the same spring. After the commit, the
// view stays grown while the menu is up. It returns on the dismissal spring,
// `springs.contextMenuDismiss`, when the menu closes.
//
// Here the trigger itself takes the scale, from its center, and the compositor
// animator plays it. The trigger is a pressable surface of core's press
// machine. The machine writes `data-astryx-press="on"` once it believes the
// press, and it takes the attribute away when the press ends. The growth
// starts at "on" and springs back when it goes, unless the menu opened. The
// whole held curve is known when it starts and sits on the document timeline.
// So it keeps advancing every frame while the main thread is busy. Nothing
// renders and nothing reads layout during the press. The machine's onset, 150
// ms on a timer, stands for UIKit's measured `feedbackOnsetMs`.
//
// An inline trigger (`triggerAs="span"`) shows no feedback, because a
// transform does not apply to it. Reduce Motion shows none either.

import {useCallback, useEffect, useRef, type RefObject} from 'react';
import {usePressFeedback} from '../hooks/usePressFeedback';
import {PRESSED_ATTRIBUTE, type pressableProps} from '../utils/pressFeedback';
import {observeMutations} from '../utils/sharedMutationObserver';
import {createAnimator, type Animator} from '../motion/animator';
import {resolveMotion} from '../motion/resolveMotion';
import {registerSpringsTable, springs} from '../motion/uikit/springs';
import {
  contextMenu,
  registerContextMenuTable,
} from '../motion/uikit/contextMenu';
import {pressFeedbackCurve, pressFeedbackMotion} from './contextMenuPressCurve';

const {feedbackSpring} = contextMenu.press;

export interface ContextMenuPressFeedback {
  /**
   * The trigger's marker for core's press machine (utils/pressFeedback.ts):
   * spread on the trigger; the growth follows the pressed state it writes.
   */
  pressable: typeof pressableProps;
  /** The menu the press opened closed: return on the dismissal spring. */
  release(): void;
  /**
   * The recognizer ended the press with no menu, at `time`: return on the
   * feedback spring.
   */
  end(time: number): void;
  /**
   * The menu showed: the feedback stops where it is. The menu's cursor anchor
   * sits inside the trigger, and anchor positioning follows its transformed
   * box. So a trigger that still grows would carry the open menu with it.
   */
  hold(): void;
}

/**
 * The press feedback of a ContextMenu trigger. `isShown` is read at each
 * press: false for an inline trigger. `triggerKey` changes when the trigger
 * element is replaced (`triggerAs`), so the new one is followed.
 */
export function useContextMenuPressFeedback(
  triggerRef: RefObject<HTMLElement | null>,
  isShown: boolean,
  triggerKey?: unknown,
): ContextMenuPressFeedback {
  const pressable = usePressFeedback();
  const animatorRef = useRef<Animator | null>(null);
  const isShownRef = useRef(isShown);
  isShownRef.current = isShown;
  // Whether the trigger carries a scale of ours (to put back and clear).
  const isGrownRef = useRef(false);
  // The menu the press opened is up: the growth holds until it closes.
  const isHeldRef = useRef(false);

  useEffect(
    () => () => {
      animatorRef.current?.dispose();
      animatorRef.current = null;
    },
    [],
  );

  const animatorFor = useCallback((): Animator | null => {
    const element = triggerRef.current;
    if (element == null) {
      return null;
    }
    // The feedback's springs are motion roles a theme may retune: register
    // their tables before the first motion (idempotent).
    registerContextMenuTable();
    registerSpringsTable();
    if (animatorRef.current?.element !== element) {
      animatorRef.current?.dispose();
      animatorRef.current = createAnimator(element);
    }
    return animatorRef.current;
  }, [triggerRef]);

  // Back at 1: drop the inline scale, which would otherwise leave the trigger
  // a stacking context and a containing block for fixed descendants.
  const settleBack = useCallback((finished: Promise<boolean>) => {
    void finished.then(isDone => {
      const element = animatorRef.current?.element;
      if (isDone && element != null && isGrownRef.current) {
        isGrownRef.current = false;
        element.style.removeProperty('scale');
      }
    });
  }, []);

  const start = useCallback(
    (time: number) => {
      if (!isShownRef.current || isHeldRef.current) {
        return;
      }
      const animator = animatorFor();
      // Under Reduce Motion the view does not grow (UIKit's
      // `reducedMotionFeedback`), and no fade stands in for it.
      if (
        animator == null ||
        (animator.reducedMotion() !== 'off' &&
          !contextMenu.reducedMotionFeedback)
      ) {
        return;
      }
      isGrownRef.current = true;
      // The spring and the latency are motion roles: the trigger's theme may
      // retune them. `time` is the onset (the press machine's "on").
      const motion = pressFeedbackMotion(animator.element);
      const at = time + motion.latencyMs;
      animator.play(
        {
          scale: pressFeedbackCurve({
            from: animator.get('scaleX', at),
            velocity: animator.getVelocity('scaleX', at),
            motion,
          }),
        },
        {at},
      );
    },
    [animatorFor],
  );

  const end = useCallback(
    (time: number) => {
      const animator = animatorRef.current;
      if (animator == null || !isGrownRef.current || isHeldRef.current) {
        return;
      }
      settleBack(
        animator.animate(
          {scale: 1},
          {spring: feedbackSpring},
          {
            at:
              time +
              resolveMotion(
                animator.element,
                contextMenu.press,
                'returnLatencyMs',
              ),
          },
        ).finished,
      );
    },
    [settleBack],
  );

  const release = useCallback(() => {
    isHeldRef.current = false;
    const animator = animatorRef.current;
    if (animator == null || !isGrownRef.current) {
      return;
    }
    settleBack(
      animator.animate({scale: 1}, {spring: springs.contextMenuDismiss})
        .finished,
    );
  }, [settleBack]);

  const hold = useCallback(() => {
    isHeldRef.current = true;
    if (isGrownRef.current) {
      animatorRef.current?.stop(['scale']);
    }
  }, []);

  // Grow from the press machine's "on". The press machine lets a press go at
  // a shorter travel than the recognizer's tolerance, so only the recognizer
  // ends the growth (`end`).
  useEffect(() => {
    void triggerKey;
    const element = triggerRef.current;
    if (element == null || !isShown) {
      return;
    }
    let isPressed = element.getAttribute(PRESSED_ATTRIBUTE) === 'on';
    return observeMutations(
      element,
      {attributes: true, attributeFilter: [PRESSED_ATTRIBUTE]},
      () => {
        const next = element.getAttribute(PRESSED_ATTRIBUTE) === 'on';
        if (next !== isPressed) {
          isPressed = next;
          if (next) {
            start(performance.now());
          }
        }
      },
    );
  }, [triggerRef, triggerKey, isShown, start]);

  return {pressable, release, end, hold};
}
