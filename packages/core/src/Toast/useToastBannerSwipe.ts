// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useToastBannerSwipe.ts
 * @input The card's root ref, its edge direction, the timer and dismissal
 *   callbacks, enabled state, the interactive-descendant policy,
 *   motion/uikit/toast, the gesture system and the compositor animator
 * @output Attaches a PanGestureRecognizer and a compositor animator to the
 *   card for the notification presentation's swipe; returns `retract`, the
 *   exit every dismissal plays there, and `rest`
 * @position Toast's touch layer, imported only by Toast.tsx. It is live in the
 *   notification presentation and inert where useToastGesture runs.
 *
 * SYNC: When modified, update toastSwipe.ts, Toast.doc.mjs and the finger swipe
 *   tests in ToastViewport.test.tsx and
 *   __tests__/ToastSwipe.interaction.browser.spec.ts.
 */

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {RefObject} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
import {useGestureRecognizer} from '../gestures/useGestureRecognizer';
import {createAnimator, type MotionHandle} from '../motion/animator';
import {SETTLE_SPRING} from '../motion/uikit/springs';
import {toast} from '../motion/uikit/toast';
import {
  followOffset,
  isDismissRelease,
  retractCurve,
  retractTarget,
} from './toastSwipe';
import type {ToastGestureDirection} from './useToastGesture';

interface SwipeSession {
  pausedTimer: boolean;
  /** Where the card is now, px from rest toward the edge. */
  offset: number;
  /**
   * A finger's swipe. Only a finger's release is a touch release, which
   * cross-fades under Reduce Motion on any primary pointer. A mouse's or a
   * pen's release cross-fades where the primary pointer is coarse, and
   * completes at once otherwise.
   */
  isFinger: boolean;
}

/** A dismissing release, for the retract it starts. */
interface DismissingRelease {
  /** The card's speed toward its edge (px/s). */
  velocity: number;
  /** A finger's release (see SwipeSession.isFinger). */
  isFinger: boolean;
}

export interface UseToastBannerSwipeOptions {
  /** The Toast card. */
  rootRef: RefObject<HTMLDivElement | null>;
  /**
   * The notification presentation, under a finger or with
   * `presentation="notification"`: this hook owns the swipe and the exit.
   */
  isNotification: boolean;
  /**
   * The notification presentation on every device (`presentation=
   * "notification"`): the gesture host listens where the primary pointer is
   * fine too.
   */
  isForced: boolean;
  direction: ToastGestureDirection;
  enabled: boolean;
  canPauseTimer: boolean;
  isTimerPaused: () => boolean;
  pauseTimer: () => void;
  resumeTimer: () => void;
  dismiss: () => void;
  /** Called when the card starts to retract: its row must not clip it. */
  onRetract?: () => void;
  shouldIgnoreTarget: (
    target: EventTarget | null,
    root: HTMLElement,
  ) => boolean;
}

/** What the Toast asks of its card under a finger. */
export interface ToastBannerSwipeHandle {
  /** Slides the card past its edge; resolves when it is gone. */
  retract: () => Promise<void>;
  /** Puts a retracted card back at rest, ready to leave again. */
  rest: () => void;
}

function panDirection(direction: ToastGestureDirection): 'down' | 'up' {
  return direction === 1 ? 'down' : 'up';
}

export function useToastBannerSwipe(
  options: UseToastBannerSwipeOptions,
): ToastBannerSwipeHandle {
  const {rootRef, isNotification} = options;
  const sessionRef = useRef<SwipeSession | null>(null);
  const settlingRef = useRef<MotionHandle | null>(null);
  const retractingRef = useRef<Promise<void> | null>(null);
  /** The dismissing release the next retract follows, if any. */
  const releaseRef = useRef<DismissingRelease | null>(null);
  const optionsRef = useRef(options);
  // Synchronizes the pan recognizer's callbacks (`shouldReceiveTouch` and
  // the transition listener below) and the retract with the latest options.
  // They read them when input or a dismissal arrives. It acquires nothing.
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  });
  const [animator] = useState(() => createAnimator(null));
  // Attaches the swipe's compositor animator to the card in the notification
  // presentation. It does not follow `enabled`: a swiped card keeps its
  // translation through the exit. It also gives the card its own layer, since
  // the card moves by `translate` every frame. The cleanup detaches both.
  useIsomorphicLayoutEffect(() => {
    const root = isNotification ? rootRef.current : null;
    animator.attach(root);
    root?.style.setProperty('will-change', 'translate');
    return () => {
      animator.attach(null);
      root?.style.removeProperty('will-change');
    };
  }, [animator, isNotification, rootRef]);

  const pan = useGestureRecognizer(
    rootRef,
    () =>
      new PanGestureRecognizer({
        // The published name app code relates to (gesture delegates).
        name: 'Toast.swipe',
        direction: panDirection(options.direction),
        // Every pointer: a finger, a pen and a mouse.
        axisRatio: toast.axisRatio,
        // A second finger before the swipe begins fails it, so two fingers
        // stay the page's pinch. One after it begins leaves the swipe going.
        maximumNumberOfTouches: 1,
        shouldReceiveTouch: (_recognizer, touch) => {
          const root = rootRef.current;
          const current = optionsRef.current;
          // A card that settles back or leaves takes no touch: the touch goes
          // to the page, as the banner's does.
          if (
            root == null ||
            settlingRef.current != null ||
            retractingRef.current != null ||
            current.shouldIgnoreTarget(touch.target as EventTarget, root)
          ) {
            return false;
          }
          if (sessionRef.current == null) {
            // Touch-down: hold the auto-hide timer while the contact is on
            // the card.
            const pausedTimer =
              current.canPauseTimer && !current.isTimerPaused();
            if (pausedTimer) {
              current.pauseTimer();
            }
            sessionRef.current = {
              pausedTimer,
              offset: 0,
              isFinger: touch.pointerType === 'touch',
            };
          }
          return true;
        },
      }),
    undefined,
    {
      isEnabled: isNotification && options.enabled,
      // One setting per element, shared with useToastGesture's pan.
      manageStyle: true,
      perEventPointer: options.isForced,
    },
  );

  // Synchronizes the pan recognizer's direction with the toast's edge. It
  // acquires nothing and is idempotent.
  useIsomorphicLayoutEffect(() => {
    pan.setDirection(panDirection(options.direction));
  }, [pan, options.direction]);

  // Subscribes to the pan recognizer's state transitions, which move the card
  // with the contact and release it. The cleanup removes the listener.
  useEffect(
    () =>
      pan.addTransitionListener((recognizer, _from, to) => {
        const session = sessionRef.current;
        if (session == null) {
          return;
        }
        const {direction, dismiss, resumeTimer} = optionsRef.current;
        // Finger travel toward the edge since touch-down, hysteresis
        // included: the card's dead zone counts from where the finger landed.
        const fingerTravel = recognizer.totalTranslation().y * direction;
        if (to === 'began' || to === 'changed') {
          session.offset = followOffset(fingerTravel);
          animator.set({y: session.offset * direction});
          return;
        }
        if (to !== 'ended' && to !== 'cancelled' && to !== 'failed') {
          return;
        }
        sessionRef.current = null;
        const fingerVelocity = recognizer.velocity().y * direction;
        if (
          to === 'ended' &&
          isDismissRelease(session.offset, fingerVelocity)
        ) {
          // The retract starts in this call and continues the card's speed:
          // the follow ratio of the finger's.
          releaseRef.current = {
            velocity: fingerVelocity * toast.followRatio,
            isFinger: session.isFinger,
          };
          dismiss();
          releaseRef.current = null;
          return;
        }
        if (session.offset !== 0) {
          // The card moves at the follow ratio of the finger, so it hands on
          // that share of the finger's speed. It hands on none if the browser
          // took the touch away.
          const velocity =
            to === 'ended' ? fingerVelocity * toast.followRatio : 0;
          // Under reduced motion the animator replaces the spring with a
          // cross-fade where the primary pointer is coarse or a finger let go.
          // The card lands at rest and fades in. Otherwise the animator puts
          // the card at rest at once.
          const handle = animator.animate(
            {y: 0},
            {spring: SETTLE_SPRING, velocity: {y: velocity * direction}},
            {crossfadeAs: 'entrance', touchRelease: session.isFinger},
          );
          settlingRef.current = handle;
          void handle.finished.then(() => {
            if (settlingRef.current === handle) {
              settlingRef.current = null;
            }
          });
        }
        if (session.pausedTimer) {
          resumeTimer();
        }
      }),
    [animator, pan],
  );

  // Everything before the first await runs in the call, so the retract starts
  // in the input event or the timer that asked for it.
  const retract = useCallback(async (): Promise<void> => {
    if (retractingRef.current != null) {
      await retractingRef.current;
      return;
    }
    const root = rootRef.current;
    // The untranslated box: the card's wrapper never moves with it.
    const box = root?.parentElement?.getBoundingClientRect();
    const view = root?.ownerDocument.defaultView;
    if (root == null || box == null || view == null) {
      return;
    }
    settlingRef.current = null;
    const from = animator.get('y');
    const to = retractTarget(
      box,
      view.innerHeight,
      optionsRef.current.direction,
    );
    optionsRef.current.onRetract?.();
    // Under reduced motion the animator replaces the slide with a cross-fade
    // where the primary pointer is coarse or a finger let go. The card fades
    // out where it is. Otherwise the animator removes the card at once.
    const release = releaseRef.current;
    const handle = animator.play(
      {
        y: retractCurve(
          from,
          to,
          toast.exitMs,
          toast.exitCurve,
          // After a dismissing release: the card's speed toward its edge.
          release == null
            ? undefined
            : release.velocity * optionsRef.current.direction,
        ),
      },
      {crossfadeAs: 'exit', touchRelease: release?.isFinger === true},
    );
    retractingRef.current = handle.finished.then(() => undefined);
    await retractingRef.current;
  }, [animator, rootRef]);

  const rest = useCallback(() => {
    retractingRef.current = null;
    animator.set({y: 0, opacity: 1});
  }, [animator]);

  return useMemo(() => ({retract, rest}), [retract, rest]);
}
