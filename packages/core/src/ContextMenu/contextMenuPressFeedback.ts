// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file contextMenuPressFeedback.ts
 * @input The theme's motion timing, the context-menu constants, the
 *   compositor animator, and the press state core's press machine writes
 * @output useContextMenuPressFeedback: hold and release, from ContextMenu's
 *   menu; the growth itself follows the press machine
 * @position The press feedback of ContextMenu's touch invocation
 *
 * SYNC: When modified, update /packages/core/src/ContextMenu/ContextMenu.tsx
 */

// The trigger is a pressable surface of the press machine. Its "on" starts
// the growth while the recognizer follows a finger, and only the recognizer's
// failure or cancel returns it. The theme's duration and move easing tokens
// time both, and the compositor plays them, so a busy main thread does not
// stall them. Once the menu opens, the trigger holds its size until the menu
// closes. Then it returns on the theme's exit duration and easing. An inline
// trigger and Reduce Motion show no growth.

import {useCallback, useRef, type RefObject} from 'react';
import {useAttachment} from '../hooks/useAttachment';
import {usePressFeedback} from '../hooks/usePressFeedback';
import {PRESSED_ATTRIBUTE, type pressableProps} from '../utils/pressFeedback';
import {observeMutations} from '../utils/sharedMutationObserver';
import {
  createMotionEngine,
  type Animator,
  type MotionCurve,
} from '../motion/animator';
import {mapProgress, mapRange} from '../motion/progress';
import {readThemeTiming, type ThemeTimingTokens} from '../motion/themeTiming';
import {contextMenu} from '../motion/uikit/contextMenu';

const {heldScale} = contextMenu.press;

/** The growth under a held finger. */
const GROWTH: ThemeTimingTokens = {
  durations: ['--duration-medium'],
  easing: '--ease-move',
};

/** The return after a lift before the commit. */
const EARLY_RETURN: ThemeTimingTokens = {
  durations: ['--duration-fast'],
  easing: '--ease-move',
};

/** The return as the menu closes, part of the menu's exit. */
const EXIT_RETURN: ThemeTimingTokens = {
  durations: ['--duration-exit', '--duration-fast'],
  easing: '--ease-exit',
};

/** A curve from `from` to `to` on the theme's timing where `element` is. */
function themeCurve(
  element: Element,
  from: number,
  to: number,
  tokens: ThemeTimingTokens,
): MotionCurve {
  return mapProgress(
    readThemeTiming(element, tokens),
    mapRange([0, 1], [from, to], {clamp: false}),
  );
}

export interface ContextMenuPressFeedback {
  /**
   * The trigger's marker for core's press machine (utils/pressFeedback.ts):
   * spread on the trigger; the growth follows the pressed state it writes.
   */
  pressable: typeof pressableProps;
  /** The menu the press opened closed: return on the theme's exit timing. */
  release(): void;
  /**
   * The recognizer ended the press with no menu, at `time`: return over the
   * theme's fast duration.
   */
  end(time: number): void;
  /**
   * The menu showed: the feedback stops where it is. The menu's cursor anchor
   * sits inside the trigger, and anchor positioning follows its transformed
   * box. So a trigger that still grows would carry the open menu with it.
   */
  hold(): void;
}

/** A press feedback with no recognizer to ask grows at every "on". */
const ALWAYS_FOLLOWED: RefObject<() => boolean> = {current: () => true};

// The triggers a press mark belongs to: every mounted trigger, whether it
// shows growth or not. A mark inside a trigger belongs to the nearest of them
// at or above it. So a press on a nested trigger grows no outer trigger.
const pressMarkOwners = new WeakSet<Element>();

function pressMarkOwnerOf(marked: Element): Element | null {
  for (
    let node: Element | null = marked;
    node != null;
    node = node.parentElement
  ) {
    if (pressMarkOwners.has(node)) {
      return node;
    }
  }
  return null;
}

/**
 * The press feedback of a ContextMenu trigger. `isShown` is read at each
 * press: false for an inline trigger. It follows the element behind
 * `triggerRef`, so a replaced trigger (`triggerAs`) is followed too. The
 * `isFollowed` ref says whether ContextMenu's recognizer follows a finger or
 * a pen now: the growth starts only then.
 */
export function useContextMenuPressFeedback(
  triggerRef: RefObject<HTMLElement | null>,
  isShown: boolean,
  isFollowed: RefObject<() => boolean> = ALWAYS_FOLLOWED,
): ContextMenuPressFeedback {
  const pressable = usePressFeedback();
  const animatorRef = useRef<Animator | null>(null);
  const isShownRef = useRef(isShown);
  isShownRef.current = isShown;
  // Whether the trigger carries a scale of ours (to put back and clear).
  const isGrownRef = useRef(false);
  // The menu the press opened is up: the growth holds until it closes.
  const isHeldRef = useRef(false);

  // The compositor animator lives with the trigger it follows. A replaced
  // trigger, or a feedback that goes while the trigger stays, takes the
  // animation and the scale of ours with it.
  useAttachment(
    triggerRef,
    element => () => {
      animatorRef.current?.dispose();
      animatorRef.current = null;
      if (isGrownRef.current) {
        isGrownRef.current = false;
        element.style.removeProperty('scale');
      }
    },
    null,
  );

  const animatorFor = useCallback((): Animator | null => {
    const element = triggerRef.current;
    if (element == null) {
      return null;
    }
    animatorRef.current ??= createMotionEngine(element);
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
      if (!isShownRef.current || isHeldRef.current || !isFollowed.current()) {
        return;
      }
      const animator = animatorFor();
      const element = animator?.element;
      // Under Reduce Motion the view does not grow (UIKit's
      // `reducedMotionFeedback`), and no fade stands in for it.
      if (
        animator == null ||
        element == null ||
        (animator.reducedMotion() !== 'off' &&
          !contextMenu.reducedMotionFeedback)
      ) {
        return;
      }
      isGrownRef.current = true;
      // `time` is the onset, the press machine's "on".
      animator.play(
        {
          scale: themeCurve(
            element,
            animator.get('scaleX', time),
            heldScale,
            GROWTH,
          ),
        },
        {at: time},
      );
    },
    [animatorFor, isFollowed],
  );

  const end = useCallback(
    (time: number) => {
      const animator = animatorRef.current;
      const element = animator?.element;
      if (
        animator == null ||
        element == null ||
        !isGrownRef.current ||
        isHeldRef.current
      ) {
        return;
      }
      settleBack(
        animator.play(
          {
            scale: themeCurve(
              element,
              animator.get('scaleX', time),
              1,
              EARLY_RETURN,
            ),
          },
          {at: time},
        ).finished,
      );
    },
    [settleBack],
  );

  const release = useCallback(() => {
    isHeldRef.current = false;
    const animator = animatorRef.current;
    const element = animator?.element;
    if (animator == null || element == null || !isGrownRef.current) {
      return;
    }
    settleBack(
      animator.play({
        scale: themeCurve(element, animator.get('scaleX'), 1, EXIT_RETURN),
      }).finished,
    );
  }, [settleBack]);

  const hold = useCallback(() => {
    isHeldRef.current = true;
    if (isGrownRef.current) {
      animatorRef.current?.stop(['scale']);
    }
  }, []);

  // Grow from the press machine's "on". The machine marks the innermost
  // pressable surface, so a control inside the trigger can carry the mark.
  // The machine lets a press go at a shorter travel than the recognizer's
  // tolerance, so only the recognizer ends the growth (`end`).
  useAttachment(
    triggerRef,
    element => {
      pressMarkOwners.add(element);
      if (!isShown) {
        return () => {
          pressMarkOwners.delete(element);
        };
      }
      const isMarkedOn = () =>
        element.getAttribute(PRESSED_ATTRIBUTE) === 'on' ||
        [...element.querySelectorAll(`[${PRESSED_ATTRIBUTE}="on"]`)].some(
          marked => pressMarkOwnerOf(marked) === element,
        );
      let isPressed = isMarkedOn();
      const stopObserving = observeMutations(
        element,
        {attributes: true, attributeFilter: [PRESSED_ATTRIBUTE], subtree: true},
        () => {
          const next = isMarkedOn();
          if (next !== isPressed) {
            isPressed = next;
            if (next) {
              start(performance.now());
            }
          }
        },
      );
      return () => {
        stopObserving();
        pressMarkOwners.delete(element);
      };
    },
    isShown,
  );

  return {pressable, release, end, hold};
}
