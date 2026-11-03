// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useToastGesture.ts
 * @input Uses a resolved Toast edge direction, timer pause/resume hooks,
 *   dismissal callback, enabled state, and interactive-descendant policy
 * @output Returns the Toast card root ref; the swipe is a pan on the shared
 *   gesture host
 * @position Internal Toast gesture unit; attached to the Toast card root.
 *   Toast's own swipe, wherever the banner swipe does not apply: a fine
 *   primary pointer, or `presentation="toast"`.
 */

import {useEffect, useRef} from 'react';
import type {RefObject} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
import {useGestureRecognizer} from '../gestures/useGestureRecognizer';

const SWIPE_DISMISS_RATIO = 0.4;
/** The dismiss distance of a card too short for its height ratio to reach it. */
const SWIPE_DISMISS_MIN_DISTANCE = 48;
/** Speed toward the edge, px/ms, at which a release dismisses whatever its travel. */
const FLICK_VELOCITY = 1.2;
/** How much more vertical than horizontal a drag must be to swipe the card. */
const VERTICAL_INTENT_RATIO = 1.2;
const SWIPE_EXIT_DISTANCE = '120%';
const SWIPE_ACTIVE_FADE_MAX = 0.4;
const SWIPE_ACTIVE_SCALE_MAX = 0.02;
/** The card's layer while a swipe moves it: each move only recomposites. */
const SWIPE_LAYER = 'transform, opacity';
/** How long the layer outlives a release, ms: past the settle or exit transition. */
const SWIPE_LAYER_RELEASE_MS = 500;

export type ToastGestureDirection = 1 | -1;

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

/** One contact on the card, from touch-down to its release. */
interface SwipeSession {
  pausedTimer: boolean;
  surfaceSize: number;
  dismissThreshold: number;
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

function panDirection(direction: ToastGestureDirection): 'down' | 'up' {
  return direction === 1 ? 'down' : 'up';
}

export function useToastGesture(
  options: UseToastGestureOptions,
): UseToastGestureResult {
  const rootRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(options);
  // Synchronizes the pan recognizer's callbacks (`shouldReceiveTouch` and
  // the transition listener below) with the latest options, which they read
  // when input arrives. It acquires nothing.
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  });
  const sessionRef = useRef<SwipeSession | null>(null);
  /** The card holding the swipe's layer, and the timer that ends it. */
  const layerElementRef = useRef<HTMLElement | null>(null);
  const layerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pan = useGestureRecognizer(
    rootRef,
    () =>
      new PanGestureRecognizer({
        // The published name app code relates to (gesture delegates); the
        // banner swipe carries it where that presentation applies.
        name: 'Toast.swipe',
        direction: panDirection(options.direction),
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
            // Touch-down: hold the auto-hide timer while the contact is on
            // the card.
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
                SWIPE_DISMISS_MIN_DISTANCE,
              ),
            };
          }
          return true;
        },
      }),
    undefined,
    // The host writes the card's touch-action for the enabled pan, for a
    // touch screen's finger. Each element has one setting, shared with the
    // banner swipe.
    {isEnabled: options.enabled, manageStyle: true},
  );

  // Synchronizes the pan recognizer's direction with the toast's edge. It
  // acquires nothing and is idempotent.
  useIsomorphicLayoutEffect(() => {
    pan.setDirection(panDirection(options.direction));
  }, [pan, options.direction]);

  // Subscribes to the pan recognizer's state transitions, which move and
  // release the card. It holds the card's layer while a swipe moves it. The
  // cleanup removes the listener and ends the layer.
  useEffect(() => {
    const endLayer = () => {
      if (layerTimerRef.current != null) {
        clearTimeout(layerTimerRef.current);
        layerTimerRef.current = null;
      }
      const element = layerElementRef.current;
      layerElementRef.current = null;
      if (element?.style.getPropertyValue('will-change') === SWIPE_LAYER) {
        element.style.removeProperty('will-change');
      }
    };
    const removeListener = pan.addTransitionListener(
      (recognizer, _from, to) => {
        const session = sessionRef.current;
        const root = rootRef.current;
        if (session == null || root == null) {
          return;
        }
        const {direction, dismiss, resumeTimer} = optionsRef.current;
        // Travel toward the edge since touch-down, the pan's 10 pt included.
        const travel = Math.max(0, recognizer.totalTranslation().y * direction);
        if (to === 'began' || to === 'changed') {
          if (to === 'began') {
            root.style.setProperty('transition-duration', '0s');
            // Its own layer for the swipe: a move then only recomposites
            // the card, with no layout or repaint. Both engines repaint a
            // moving card without one.
            if (layerTimerRef.current != null) {
              clearTimeout(layerTimerRef.current);
              layerTimerRef.current = null;
            }
            root.style.setProperty('will-change', SWIPE_LAYER);
            layerElementRef.current = root;
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
        // Toward the edge, px/ms, read at the lift. A contact that rested
        // longer than the stillness interval before lifting reads no speed.
        // A flick needs no travel floor: the swipe passed the pan's
        // hysteresis toward the edge before it began.
        const velocity = (recognizer.velocity().y * direction) / 1000;
        clearTransientStyles(root);
        // The settle or the exit is a transform and opacity transition: the
        // layer stays until it has run.
        if (layerTimerRef.current == null) {
          layerTimerRef.current = setTimeout(endLayer, SWIPE_LAYER_RELEASE_MS);
        }
        if (
          to === 'ended' &&
          (travel >= session.dismissThreshold || velocity > FLICK_VELOCITY)
        ) {
          // The exit animation owns the final translation. The live-drag
          // transform, fade and scale go first, so a standalone Toast does
          // not stay partly moved or faded after its dismiss callback.
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
      },
    );
    return () => {
      removeListener();
      endLayer();
    };
  }, [pan]);

  return {rootRef};
}
