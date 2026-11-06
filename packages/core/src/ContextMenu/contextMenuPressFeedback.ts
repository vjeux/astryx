// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file contextMenuPressFeedback.ts
 * @input UIKit's context-menu springs, the context-menu constants, the
 *   compositor animator, the trigger's touches, and the press state core's
 *   press machine writes
 * @output useContextMenuPressFeedback: hold and release, from ContextMenu's
 *   menu; the growth follows the recognizer's finger, or a pen's press mark
 * @position The press feedback of ContextMenu's touch invocation
 *
 * SYNC: When modified, update /packages/core/src/ContextMenu/ContextMenu.tsx
 */

// The growth starts at the onset, 150 ms after a finger lands, while the
// recognizer follows that finger. The finger's own landing arms it; a
// pointer-only pen's press waits for the press machine's "on". Only the
// recognizer's failure or cancel returns it. A long press is a gesture, so the
// growth plays UIKit's lift spring and each return its dismissal spring. The
// compositor plays them, so a busy main thread does not stall them. Once the
// menu opens, the trigger holds its size until the menu closes. Then it returns
// on the dismissal spring. An inline trigger and Reduce Motion show no growth.

import {useCallback, useRef, type RefObject} from 'react';
import {useAttachment} from '../hooks/useAttachment';
import {usePressFeedback} from '../hooks/usePressFeedback';
import {isElement} from '../utils/nodeType';
import {PRESSED_ATTRIBUTE} from '../utils/pressFeedback';
import {PRESS_ONSET_MS} from '../utils/pressGesture';
import {observeMutations} from '../utils/sharedMutationObserver';
import {createMotionEngine, type Animator} from '../motion/animator';
import {contextMenu} from '../motion/uikit/contextMenu';
import {
  CONTEXT_MENU_DISMISS_SPRING,
  CONTEXT_MENU_LIFT_SPRING,
} from '../motion/uikit/springs';

const {heldScale} = contextMenu.press;

export interface ContextMenuPressFeedback {
  /** The menu the press opened closed: return on the dismissal spring. */
  release(): void;
  /**
   * The recognizer ended the press with no menu, at `time`: return on the
   * dismissal spring.
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

/** With no recognizer to ask, the onset is the "on" itself. */
const NO_LANDING: RefObject<() => number | null> = {current: () => null};

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
 * a pen now: the growth starts only then. The `landedAt` ref gives the time
 * that finger landed, so the growth starts at its onset.
 */
export function useContextMenuPressFeedback(
  triggerRef: RefObject<HTMLElement | null>,
  isShown: boolean,
  isFollowed: RefObject<() => boolean> = ALWAYS_FOLLOWED,
  landedAt: RefObject<() => number | null> = NO_LANDING,
): ContextMenuPressFeedback {
  // The press machine's document listener, while this feedback is mounted.
  usePressFeedback();
  const animatorRef = useRef<Animator | null>(null);
  const isShownRef = useRef(isShown);
  isShownRef.current = isShown;
  // Whether the trigger carries a scale of ours (to put back and clear).
  const isGrownRef = useRef(false);
  // The menu the press opened is up: the growth holds until it closes.
  const isHeldRef = useRef(false);
  // A finger armed the onset. The end of its press clears it, so a lift that
  // never reaches the trigger cannot hold a later pen's press back.
  const isFingerArmedRef = useRef(false);

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
      // `time` is the onset: 150 ms after the finger lands, or a later mark.
      animator.animate(
        {scale: heldScale},
        {spring: CONTEXT_MENU_LIFT_SPRING},
        {at: time},
      );
    },
    [animatorFor, isFollowed],
  );

  const end = useCallback(
    (time: number) => {
      isFingerArmedRef.current = false;
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
        animator.animate(
          {scale: 1},
          {spring: CONTEXT_MENU_DISMISS_SPRING},
          {at: time},
        ).finished,
      );
    },
    [settleBack],
  );

  const release = useCallback(() => {
    isHeldRef.current = false;
    isFingerArmedRef.current = false;
    const animator = animatorRef.current;
    const element = animator?.element;
    if (animator == null || element == null || !isGrownRef.current) {
      return;
    }
    settleBack(
      animator.animate({scale: 1}, {spring: CONTEXT_MENU_DISMISS_SPRING})
        .finished,
    );
  }, [settleBack]);

  const hold = useCallback(() => {
    isHeldRef.current = true;
    if (isGrownRef.current) {
      animatorRef.current?.stop(['scale']);
    }
  }, []);

  // Grow at the onset, 150 ms after the finger lands. A finger arms it from its
  // own landing, whether or not the press machine marks the press. Inside a
  // scroll view the machine marks late, and it never marks a press that travels
  // past 10 px first. A pointer-only pen's onset waits for the mark. The
  // machine marks the innermost pressable surface, so a control inside the
  // trigger can carry the mark. A press the recognizer does not follow yet is
  // read again after that input. Only the recognizer ends the growth (`end`).
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
      let markedAt = 0;
      let armedAt = 0;
      let onsetTimer: ReturnType<typeof setTimeout> | undefined;
      const growAtOnset = (isRetry: boolean) => {
        if (!isFollowed.current()) {
          if (isRetry) {
            // The recognizer never took this press: nothing will end it.
            isFingerArmedRef.current = false;
          } else {
            onsetTimer = setTimeout(() => growAtOnset(true), 0);
          }
          return;
        }
        const landed = landedAt.current();
        const fromLanding = landed == null ? null : landed + PRESS_ONSET_MS;
        // Without a landing time, a finger's onset counts from its touch's
        // own time.
        const onsetAt = isFingerArmedRef.current
          ? (fromLanding ?? armedAt + PRESS_ONSET_MS)
          : Math.max(markedAt, fromLanding ?? markedAt);
        const wait = onsetAt - performance.now();
        if (wait > 0) {
          onsetTimer = setTimeout(() => start(onsetAt), wait);
        } else {
          start(onsetAt);
        }
      };
      // A touch on a nested trigger arms only that trigger.
      const onTouchStart = (event: TouchEvent) => {
        if (
          !isElement(event.target) ||
          pressMarkOwnerOf(event.target) !== element
        ) {
          return;
        }
        clearTimeout(onsetTimer);
        isFingerArmedRef.current = true;
        // The touch's own time, on the page clock. An epoch or future stamp,
        // as in some DOM emulators, counts as now.
        const now = performance.now();
        armedAt =
          event.timeStamp > 0 && event.timeStamp <= now ? event.timeStamp : now;
        growAtOnset(false);
      };
      element.addEventListener('touchstart', onTouchStart, {passive: true});
      const stopObserving = observeMutations(
        element,
        {attributes: true, attributeFilter: [PRESSED_ATTRIBUTE], subtree: true},
        () => {
          const next = isMarkedOn();
          if (next !== isPressed) {
            isPressed = next;
            if (next) {
              if (!isFingerArmedRef.current) {
                clearTimeout(onsetTimer);
                markedAt = performance.now();
                growAtOnset(false);
              }
            } else if (!isFollowed.current()) {
              // A finger the recognizer still follows keeps its onset, past
              // the machine's shorter travel.
              clearTimeout(onsetTimer);
            }
          }
        },
      );
      return () => {
        clearTimeout(onsetTimer);
        stopObserving();
        element.removeEventListener('touchstart', onTouchStart);
        pressMarkOwners.delete(element);
      };
    },
    isShown,
  );

  return {release, end, hold};
}
