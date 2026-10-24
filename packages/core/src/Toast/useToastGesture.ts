// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useToastGesture.ts
 * @input Uses a resolved Toast edge direction, timer pause/resume hooks,
 *   dismissal callback, enabled state, and interactive-descendant policy
 * @output Returns the Toast card root ref; a PanGestureRecognizer attached to
 *   it drives swipe-to-dismiss
 * @position Internal Toast gesture unit; attached to the Toast card root
 *
 * The swipe is a one-way pan toward the Toast's edge, for touch and pen (a
 * mouse keeps text selection), on the shared gesture system
 * (../gestures):
 *
 * - it begins once the drag passes an 8 px slop on either axis and is 1.2
 *   times more vertical than horizontal; a horizontal drag, or one away
 *   from the edge, fails it and leaves the browser the touch;
 * - once it began, a second finger is ignored and the first keeps the swipe;
 *   a second finger before that fails it;
 * - touching down pauses the auto-hide timer; anything but a dismissal
 *   resumes it;
 * - while dragging, the card follows the finger from where it landed, fading
 *   to 0.6 and scaling to 0.98 over its height, with transitions off;
 * - a release dismisses past max(40% of the height, 48 px), or past 48 px
 *   with a release velocity over 1200 px/s (the recognizer's velocity, read
 *   the way UIKit reads it).
 */

import {useEffect, useRef} from 'react';
import type {RefObject} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
import {useGestureRecognizer} from '../gestures/useGestureRecognizer';

const DRAG_PROMOTION_SLOP = 8;
const SWIPE_DISMISS_RATIO = 0.4;
const FLICK_MIN_DISTANCE = 48;
/** Release velocity that dismisses past the flick distance: 1.2 px/ms. */
const FLICK_VELOCITY = 1200;
const VERTICAL_INTENT_RATIO = 1.2;
const SWIPE_EXIT_DISTANCE = '120%';
const SWIPE_ACTIVE_FADE_MAX = 0.4;
const SWIPE_ACTIVE_SCALE_MAX = 0.02;

export type ToastGestureDirection = 1 | -1;

interface SwipeSession {
  pausedTimer: boolean;
  surfaceSize: number;
  dismissThreshold: number;
}

interface UseToastGestureOptions {
  direction: ToastGestureDirection;
  enabled: boolean;
  canPauseTimer: boolean;
  isTimerPaused: () => boolean;
  pauseTimer: () => void;
  resumeTimer: () => void;
  dismiss: () => void;
  shouldIgnoreTarget: (
    target: EventTarget | null,
    root: HTMLElement,
  ) => boolean;
}

interface UseToastGestureResult {
  rootRef: RefObject<HTMLDivElement | null>;
}

function panDirection(direction: ToastGestureDirection): 'down' | 'up' {
  return direction === 1 ? 'down' : 'up';
}

function swipeProgressValue(travel: number, surfaceSize: number): number {
  return Math.min(Math.max(travel / surfaceSize, 0), 1);
}

function clearTransientStyles(root: HTMLElement): void {
  root.style.removeProperty('transition-duration');
  root.style.removeProperty('--_toast-swipe-y');
  root.style.removeProperty('--_toast-swipe-exit-y');
  root.style.removeProperty('--_toast-swipe-opacity');
  root.style.removeProperty('--_toast-swipe-scale');
}

export function useToastGesture(
  options: UseToastGestureOptions,
): UseToastGestureResult {
  const rootRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<SwipeSession | null>(null);
  const optionsRef = useRef(options);
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  });

  const pan = useGestureRecognizer(
    rootRef,
    () =>
      new PanGestureRecognizer({
        direction: panDirection(options.direction),
        allowedPointerTypes: ['touch', 'pen'],
        hysteresis: DRAG_PROMOTION_SLOP,
        axisRatio: VERTICAL_INTENT_RATIO,
        maximumNumberOfTouches: 1,
        shouldReceiveTouch: (_recognizer, touch) => {
          const root = rootRef.current;
          const current = optionsRef.current;
          if (
            root == null ||
            current.shouldIgnoreTarget(touch.target as EventTarget, root)
          ) {
            return false;
          }
          if (sessionRef.current == null) {
            // Touch-down: hold the auto-hide timer while the finger is on
            // the card, and measure it once for the whole swipe.
            const pausedTimer =
              current.canPauseTimer && !current.isTimerPaused();
            if (pausedTimer) {
              current.pauseTimer();
            }
            const surfaceSize = Math.max(
              root.getBoundingClientRect().height,
              1,
            );
            sessionRef.current = {
              pausedTimer,
              surfaceSize,
              dismissThreshold: Math.max(
                surfaceSize * SWIPE_DISMISS_RATIO,
                FLICK_MIN_DISTANCE,
              ),
            };
          }
          return true;
        },
      }),
    undefined,
    {isEnabled: options.enabled},
  );

  useIsomorphicLayoutEffect(() => {
    pan.setDirection(panDirection(options.direction));
  }, [pan, options.direction]);

  useEffect(
    () =>
      pan.addTransitionListener((recognizer, _from, to) => {
        const root = rootRef.current;
        const session = sessionRef.current;
        if (root == null || session == null) {
          return;
        }
        const {direction, dismiss, resumeTimer} = optionsRef.current;
        // From where the finger landed, slop included.
        const travel = Math.max(0, recognizer.totalTranslation().y * direction);
        if (to === 'began' || to === 'changed') {
          if (to === 'began') {
            root.style.setProperty('transition-duration', '0s');
          }
          const progress = swipeProgressValue(travel, session.surfaceSize);
          root.style.setProperty('--_toast-swipe-y', `${travel * direction}px`);
          root.style.setProperty(
            '--_toast-swipe-opacity',
            (1 - progress * SWIPE_ACTIVE_FADE_MAX).toFixed(3),
          );
          root.style.setProperty(
            '--_toast-swipe-scale',
            (1 - progress * SWIPE_ACTIVE_SCALE_MAX).toFixed(3),
          );
          return;
        }
        if (to !== 'ended' && to !== 'cancelled' && to !== 'failed') {
          return;
        }
        sessionRef.current = null;
        const isDismissed =
          to === 'ended' &&
          (travel >= session.dismissThreshold ||
            (travel >= FLICK_MIN_DISTANCE &&
              recognizer.velocity().y * direction > FLICK_VELOCITY));
        // The exit animation owns the final translation. Clear the live-drag
        // transform/fade/scale first so a standalone Toast does not remain
        // partially translated or faded after its dismiss callback fires.
        clearTransientStyles(root);
        if (isDismissed) {
          root.style.setProperty(
            '--_toast-swipe-exit-y',
            direction === 1
              ? SWIPE_EXIT_DISTANCE
              : `calc(-1 * ${SWIPE_EXIT_DISTANCE})`,
          );
          dismiss();
          return;
        }
        if (session.pausedTimer) {
          resumeTimer();
        }
      }),
    [pan],
  );

  return {rootRef};
}
