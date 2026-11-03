// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useAlertMotion.ts
 * @input Whether the alert is open, whether it takes the touch look, and the
 *   dialog element's CSS animations
 * @output Exports useAlertMotion and AlertMotion: whether the Dialog is
 *   presented (it stays open while the alert fades out), which touch style
 *   applies, the dialog's callback ref, and whether a touch may act now
 * @position Internal hook of AlertDialog; the touch presentation's motion.
 *   AlertDialog's styles play it on the theme's dialog entrance and exit.
 *
 * SYNC: When modified, update useAlertMotion.test.tsx and
 * __tests__/AlertDialog.motion.interaction.browser.spec.ts
 */

import {useCallback, useRef, useState} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {alertController} from '../motion/uikit/alert';

/** A dialog that misses its exit's end still closes this long after it. */
const EXIT_BACKSTOP_MS = 100;

/** Carries the presentation's starting scale to AlertDialog's keyframes. */
export const SCALE_FROM_PROPERTY = '--_alert-scale-from';

/**
 * UIKit's 1.2 start, never wider than the viewport: an alert wider than
 * UIKit's 320 pt would otherwise start past the screen's edges. One layout
 * read, as the alert opens.
 */
function presentScaleFrom(element: HTMLElement): number {
  const {scaleFrom} = alertController.present;
  const width = element.offsetWidth;
  const viewport = element.ownerDocument.documentElement.clientWidth;
  return width > 0 && viewport > 0
    ? Math.max(1, Math.min(scaleFrom, viewport / width))
    : scaleFrom;
}

/** The dialog's own CSS animations: its entrance or its exit. */
function animationsOf(element: HTMLElement | null): Animation[] {
  return typeof element?.getAnimations === 'function'
    ? element.getAnimations()
    : [];
}

/** When the last of `animations` ends, in ms from its start; 0 for none. */
function lengthOf(animations: ReadonlyArray<Animation>): number {
  return Math.max(
    0,
    ...animations.map(animation =>
      Number(animation.effect?.getComputedTiming().endTime ?? 0),
    ),
  );
}

/** Settles when every animation has ended or was cancelled. */
async function allEnded(animations: ReadonlyArray<Animation>): Promise<void> {
  await Promise.all(
    animations.map(async animation =>
      animation.finished.catch(() => animation),
    ),
  );
}

/**
 * The touch style the alert takes: its entrance; settled, when it reopens
 * while it leaves; or its exit.
 */
export type AlertLook = 'none' | 'entrance' | 'settled' | 'exit';

export interface AlertMotionOptions {
  /** The caller's open state. */
  isOpen: boolean;
  /** Take UIKit's look (under a finger: a coarse primary pointer). */
  isEnabled: boolean;
}

export interface AlertMotion {
  /** Whether the Dialog is open: true while the alert is shown or leaving. */
  readonly isPresented: boolean;
  /** True while the alert fades out: it takes no input. */
  readonly isLeaving: boolean;
  /** Which touch style AlertDialog applies. */
  readonly look: AlertLook;
  /** Callback ref for the dialog element. */
  readonly ref: (element: HTMLElement | null) => void;
  /** Whether a touch landing now may act (false while it appears). */
  readonly acceptsTouches: () => boolean;
}

export function useAlertMotion({
  isOpen,
  isEnabled,
}: AlertMotionOptions): AlertMotion {
  // The open state the Dialog sees: the alert stays presented while it
  // leaves. Adjusted while rendering, so the Dialog never commits a close
  // the exit has not finished.
  const [isLeaving, setIsLeaving] = useState(false);
  const [isReopened, setIsReopened] = useState(false);
  const [lastIsOpen, setLastIsOpen] = useState(isOpen);
  if (lastIsOpen !== isOpen) {
    setLastIsOpen(isOpen);
    setIsReopened(isOpen && isLeaving);
    setIsLeaving(!isOpen && isEnabled);
  }
  const isPresented = isOpen || isLeaving;
  const look: AlertLook = !isEnabled
    ? 'none'
    : isLeaving
      ? 'exit'
      : isReopened
        ? 'settled'
        : 'entrance';

  const elementRef = useRef<HTMLElement | null>(null);
  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  // Touches come back when the entrance ends. Each opening gets a new
  // number, so a late end of an earlier one changes nothing.
  const enteringRef = useRef<number | null>(null);
  const openingRef = useRef(0);
  const acceptsTouches = useCallback(
    () => !isEnabled || (isOpen && enteringRef.current == null),
    [isEnabled, isOpen],
  );

  // Synchronizes the dialog's touch entrance with an opening: its start
  // scale, then the end of its CSS animations, which gives touches back.
  // Dialog styles an open dialog in this commit, before its effect shows the
  // modal. So the box and the entrance exist before the first paint.
  const wasPresentedRef = useRef(false);
  useIsomorphicLayoutEffect(() => {
    const opened = isPresented && !wasPresentedRef.current;
    wasPresentedRef.current = isPresented;
    const element = elementRef.current;
    if (!opened || !isEnabled || element == null) {
      return;
    }
    element.style.setProperty(
      SCALE_FROM_PROPERTY,
      String(presentScaleFrom(element)),
    );
    const opening = ++openingRef.current;
    enteringRef.current = opening;
    void allEnded(animationsOf(element)).then(() => {
      if (enteringRef.current === opening) {
        enteringRef.current = null;
      }
    });
  }, [isEnabled, isPresented]);

  // Synchronizes the dialog's close with the end of its exit animation. An
  // exit of 0 ms, which a theme may set, closes at once, before anything
  // paints.
  useIsomorphicLayoutEffect(() => {
    if (!isLeaving) {
      return;
    }
    enteringRef.current = null;
    const exit = animationsOf(elementRef.current);
    const length = lengthOf(exit);
    if (length <= 0) {
      setIsLeaving(false);
      return;
    }
    let isCurrent = true;
    void allEnded(exit).then(() => {
      if (isCurrent) {
        setIsLeaving(false);
      }
    });
    // An exit whose end is never reported (a detached element, a page that
    // disables animations) still closes once its length has passed.
    const backstop = setTimeout(() => {
      setIsLeaving(false);
    }, length + EXIT_BACKSTOP_MS);
    return () => {
      isCurrent = false;
      clearTimeout(backstop);
    };
  }, [isLeaving]);

  return {isPresented, isLeaving, look, ref, acceptsTouches};
}
