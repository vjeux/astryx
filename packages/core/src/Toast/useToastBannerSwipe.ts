// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useToastBannerSwipe.ts
 * @input Uses the Toast card's root ref, a resolved Toast edge direction,
 *   timer pause/resume hooks, dismissal callback, enabled state,
 *   interactive-descendant policy, the UIKit constants table
 *   (motion/uikit/toast), the shared gesture system and the compositor
 *   animator
 * @output Attaches a PanGestureRecognizer to the card that drives
 *   swipe-to-dismiss and an animator that moves the card; returns
 *   `retract`, the exit every dismissal under a finger plays, and `rest`
 * @position Toast's touch layer: its one module of touch-only work (the
 *   gesture system, the compositor animator, the motion table), imported
 *   only by Toast.tsx; live under a coarse primary pointer
 *   (useTouchPresentation), inert with a fine pointer, where useToastGesture
 *   runs
 *
 * Under a finger (a coarse primary pointer, on every touch device, iOS and
 * Android alike), the swipe follows iOS's notification banner. The values and
 * their sources are in motion/uikit/toast.ts. With a fine pointer Toast keeps
 * its own swipe (useToastGesture).
 *
 * - The swipe is a one-way pan toward the Toast's edge, for touch and pen, on
 *   the shared gesture system (../gestures). A mouse keeps text selection.
 *   The pan decides on the touch's first move, as the browser does. A first
 *   move toward the edge, `toast.axisRatio` times more vertical than
 *   horizontal, holds the touch from that move. Any other first move fails
 *   the pan and leaves the browser the touch. The swipe begins at UIKit's pan
 *   hysteresis. Once it began, the touch stays the toast's: a second finger
 *   that lands anywhere leaves the swipe going. A second finger before it
 *   began fails it, so two fingers stay the page's pinch zoom.
 * - The card stays still for the first `toast.followFrom` px of finger
 *   travel. Then it follows at `toast.followRatio` of the finger, and only
 *   its translation is written (no render, no layout read). A drag that turns
 *   back away from the edge stretches the card that way too, as the banner
 *   does. Its release always springs the card back.
 * - A release dismisses (`isDismissRelease`) when the card is
 *   `toast.dismissOffset` out. It also dismisses when the card is at or past
 *   rest and the finger moved toward the edge at `toast.flickVelocity` as it
 *   lifted. The
 *   speed is the shared release filter's. A release moving back toward rest
 *   always springs back. A card stretched away from the edge always springs
 *   back. Otherwise the card springs back to rest on the compositor, with its
 *   release velocity. The spring is `springs.settle`, which the banner's
 *   measured settle matches.
 * - `retract` is how the card leaves, whatever dismissed it: a release, the
 *   close button or the timeout. From where it is, the card slides past its
 *   edge on the compositor over `toast.exitMs` on `toast.exitCurve`, without
 *   fading, as the banner retracts. After a dismissing release it starts at
 *   the card's release velocity. It starts in the call (an input event or the
 *   timer), so no render can delay it. It calls `onRetract`, so the row stops
 *   clipping the card, and resolves when the card is gone. `rest` brings back
 *   a card that its owner kept on screen after the dismissal.
 * - Under reduced motion the animator replaces travel with its cross-fade (a
 *   release is a touch release). The spring-back lands at rest and fades in,
 *   and the retract fades out in place.
 * - While the card springs back or retracts, touches pass through to the
 *   page: the banner never catches a card that settles or leaves.
 * - A touch-down pauses the auto-hide timer. Anything but a dismissal resumes
 *   it.
 *
 * With a fine pointer the recognizer takes no touches and nothing here moves
 * the card, so it is useToastGesture's alone.
 *
 * SYNC: When modified, update toastSwipe.ts, Toast.doc.mjs and the finger swipe
 *   tests in ToastViewport.test.tsx and
 *   __tests__/ToastSwipe.interaction.browser.spec.ts.
 */

import {useCallback, useEffect, useMemo, useRef} from 'react';
import type {RefObject} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
import {useGestureRecognizer} from '../gestures/useGestureRecognizer';
import {animatorFor, type MotionHandle} from '../motion/animator';
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
}

export interface UseToastBannerSwipeOptions {
  /** The Toast card. */
  rootRef: RefObject<HTMLDivElement | null>;
  /** Under a finger (a coarse primary pointer): this hook owns the swipe and the exit. */
  isNotification: boolean;
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
  /** The next retract follows a release (a touch release, for Reduced Motion). */
  const releasedRef = useRef(false);
  /** The card's speed toward its edge at a dismissing release (px/s). */
  const releaseVelocityRef = useRef(0);
  const optionsRef = useRef(options);
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  });
  // The card's one animator, shared with anything else that moves it. Only
  // this hook calls it, and only under a finger, so with a fine pointer the
  // card is useToastGesture's alone.
  const cardAnimator = useCallback(() => {
    const root = rootRef.current;
    return root == null ? null : animatorFor(root);
  }, [rootRef]);
  useIsomorphicLayoutEffect(() => {
    // Under a finger the card moves by `translate` on every frame of a drag,
    // so it keeps its own layer and no move repaints it.
    const root = isNotification ? rootRef.current : null;
    root?.style.setProperty('will-change', 'translate');
    return () => {
      root?.style.removeProperty('will-change');
    };
  }, [isNotification, rootRef]);

  const pan = useGestureRecognizer(
    rootRef,
    () =>
      new PanGestureRecognizer({
        // The published name app code relates to (gesture delegates).
        name: 'Toast.swipe',
        direction: panDirection(options.direction),
        allowedPointerTypes: ['touch', 'pen'],
        axisRatio: toast.axisRatio,
        // The browser decides a touch on its first move, so the pan decides
        // there too.
        firstMoveDecides: true,
        maximumNumberOfTouches: 1,
        shouldReceiveTouch: (_recognizer, touch) => {
          const root = rootRef.current;
          const current = optionsRef.current;
          if (
            root == null ||
            settlingRef.current != null ||
            retractingRef.current != null ||
            current.shouldIgnoreTarget(touch.target as EventTarget, root)
          ) {
            return false;
          }
          if (sessionRef.current == null) {
            // Touch-down: hold the auto-hide timer while the finger is on
            // the card.
            const pausedTimer =
              current.canPauseTimer && !current.isTimerPaused();
            if (pausedTimer) {
              current.pauseTimer();
            }
            sessionRef.current = {pausedTimer, offset: 0};
          }
          return true;
        },
      }),
    undefined,
    {
      isEnabled: isNotification && options.enabled,
      manageStyle: isNotification,
    },
  );

  useIsomorphicLayoutEffect(() => {
    pan.setDirection(panDirection(options.direction));
  }, [pan, options.direction]);

  useEffect(
    () =>
      pan.addTransitionListener((recognizer, _from, to) => {
        const session = sessionRef.current;
        if (session == null) {
          return;
        }
        const {direction, dismiss, resumeTimer} = optionsRef.current;
        // Finger travel toward the edge since touch-down, hysteresis
        // included: the card's dead zone is measured from where it landed.
        const fingerTravel = recognizer.totalTranslation().y * direction;
        if (to === 'began' || to === 'changed') {
          session.offset = followOffset(fingerTravel);
          cardAnimator()?.set({y: session.offset * direction});
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
          // The retract starts in this call and continues the card's speed,
          // the follow ratio of the finger's.
          releasedRef.current = true;
          releaseVelocityRef.current = fingerVelocity * toast.followRatio;
          dismiss();
          releasedRef.current = false;
          return;
        }
        if (session.offset !== 0) {
          // The card moves at the follow ratio of the finger, so it hands on
          // that share of the finger's speed. A touch taken away hands on none.
          const velocity =
            to === 'ended' ? fingerVelocity * toast.followRatio : 0;
          // Under reduced motion the animator replaces the spring with a
          // cross-fade (a touch release): the card lands at rest and fades in.
          const handle = cardAnimator()?.animate(
            {y: 0},
            {spring: SETTLE_SPRING, velocity: {y: velocity * direction}},
            {crossfadeAs: 'entrance', touchRelease: true},
          );
          if (handle != null) {
            settlingRef.current = handle;
            void handle.finished.then(() => {
              if (settlingRef.current === handle) {
                settlingRef.current = null;
              }
            });
          }
        }
        if (session.pausedTimer) {
          resumeTimer();
        }
      }),
    [cardAnimator, pan],
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
    const animator = animatorFor(root);
    const from = animator.get('y');
    const to = retractTarget(
      box,
      view.innerHeight,
      optionsRef.current.direction,
    );
    optionsRef.current.onRetract?.();
    // Under reduced motion the animator replaces the slide with a cross-fade:
    // the card fades out where it is.
    const touchRelease = releasedRef.current;
    const handle = animator.play(
      {
        y: retractCurve(
          from,
          to,
          toast.exitMs,
          toast.exitCurve,
          // After a dismissing release: the card's speed toward its edge.
          touchRelease
            ? releaseVelocityRef.current * optionsRef.current.direction
            : undefined,
        ),
      },
      {crossfadeAs: 'exit', touchRelease},
    );
    retractingRef.current = handle.finished.then(() => undefined);
    await retractingRef.current;
  }, [rootRef]);

  const rest = useCallback(() => {
    retractingRef.current = null;
    cardAnimator()?.set({y: 0, opacity: 1});
  }, [cardAnimator]);

  return useMemo(() => ({retract, rest}), [retract, rest]);
}
