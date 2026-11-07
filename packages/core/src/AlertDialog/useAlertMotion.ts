// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useAlertMotion.ts
 * @input Uses React, the settled-open and hydration hooks, the Layer input
 *   hold, the alert's exit copy, alertController, utils/focusReturn and
 *   utils/nodeType
 * @output Exports useAlertMotion, AlertMotion, AlertMotionOptions, AlertLook
 *   and SCALE_FROM_PROPERTY
 * @position Internal hook of AlertDialog; the touch presentation's motion.
 *   AlertDialog's styles play it on the theme's dialog entrance and exit.
 *
 * SYNC: When modified, update useAlertMotion.test.tsx and
 * __tests__/AlertDialog.motion.interaction.browser.spec.ts
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import {useIsHydrating} from '../hooks/useIsHydrating';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {useSettledOpen} from '../hooks/useSettledOpen';
import {holdInput} from '../Layer/inputHold';
import {alertController} from '../motion/uikit/alert';
import {placeAlertExitCopy} from '../privateAttributes/alertExit.stylex';
import {returnFocusForLastInput} from '../utils/focusReturn';
import {isHTMLElement} from '../utils/nodeType';

/** A fade whose end is never reported still ends this long after it. */
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
 * while it leaves; or its exit, which its exit copy keeps.
 */
export type AlertLook = 'none' | 'entrance' | 'settled' | 'exit';

export interface AlertMotionOptions {
  /** The caller's open state. */
  isOpen: boolean;
  /** Take UIKit's look (under a finger: a coarse primary pointer). */
  isEnabled: boolean;
}

export interface AlertMotion {
  /**
   * Whether the Dialog is open: the caller's state, kept until the exit copy
   * is taken.
   */
  readonly isPresented: boolean;
  /** Which touch style AlertDialog applies. */
  readonly look: AlertLook;
  /** Callback ref for the dialog element. */
  readonly ref: (element: HTMLElement | null) => void;
}

/**
 * Where a touch close is: `copy` for the one commit that keeps the Dialog
 * open with its exit look while the copy is taken, then `fade` while the
 * copy fades out.
 */
type ExitPhase = 'none' | 'copy' | 'fade';

/** A placed exit copy and its fade. */
interface ExitCopy {
  copy: HTMLElement;
  fade: Animation[];
  length: number;
}

/**
 * Plays the alert's touch motion. Under a finger a copy of the alert fades
 * out with the dimming, and the Dialog closes before the fade's first frame.
 * Until the fade ends the page is inert and its input is held.
 */
export function useAlertMotion({
  isOpen,
  isEnabled,
}: AlertMotionOptions): AlertMotion {
  // Adjusted while rendering, so the commit that closes the alert styles it
  // with its exit, which the copy keeps.
  const [exit, setExit] = useState<ExitPhase>('none');
  const [isReopened, setIsReopened] = useState(false);
  const [lastIsOpen, setLastIsOpen] = useState(isOpen);
  if (lastIsOpen !== isOpen) {
    setLastIsOpen(isOpen);
    setIsReopened(false);
    setExit(!isOpen && isEnabled ? 'copy' : 'none');
  }
  // An alert open in the server markup was there on page load: after
  // hydration it opens at rest, as Dialog does, and later opens enter.
  const isHydrating = useIsHydrating();
  const [settledOpen] = useSettledOpen(isOpen, isOpen && !isHydrating, false);
  const look: AlertLook = !isEnabled
    ? 'none'
    : exit !== 'none'
      ? 'exit'
      : isReopened || (settledOpen && isOpen)
        ? 'settled'
        : 'entrance';

  const elementRef = useRef<HTMLElement | null>(null);
  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  // What had focus as the alert opened, and in the alert as it closed.
  const openerRef = useRef<HTMLElement | null>(null);
  const blurredRef = useRef<HTMLElement | null>(null);
  const exitCopyRef = useRef<ExitCopy | null>(null);
  // Whether a reopen cut the last fade short.
  const isCutShortRef = useRef(false);

  const wasOpenRef = useRef(false);
  // Synchronizes the dialog's touch entrance with an opening: its start
  // scale. Dialog styles an open dialog in this commit, before its effect
  // shows the modal. So the box and the entrance exist before the first
  // paint. Dialog holds a touch while the entrance plays. A reopen that cut
  // the fade short opens at rest instead.
  useIsomorphicLayoutEffect(() => {
    const opened = isOpen && !wasOpenRef.current;
    wasOpenRef.current = isOpen;
    const element = elementRef.current;
    if (!opened || element == null) {
      return;
    }
    // Dialog moves focus into the alert in a later effect.
    const focused = element.ownerDocument.activeElement;
    openerRef.current = isHTMLElement(focused) ? focused : null;
    const wasCutShort = isCutShortRef.current;
    isCutShortRef.current = false;
    if (!isEnabled) {
      return;
    }
    if (wasCutShort) {
      setIsReopened(true);
      return;
    }
    element.style.setProperty(
      SCALE_FROM_PROPERTY,
      String(presentScaleFrom(element)),
    );
  }, [isEnabled, isOpen]);

  // Synchronizes the exit copy with the close. Dialog styles only an open
  // dialog as shown, so the copy is taken while it is still open, with the
  // exit look, and the next commit closes it. Both commits run in the task
  // that closes the alert, before anything paints. An exit of 0 ms, which a
  // theme may set, places no copy.
  useIsomorphicLayoutEffect(() => {
    if (exit !== 'copy') {
      return;
    }
    const element = elementRef.current;
    const copy = element == null ? null : placeAlertExitCopy(element);
    if (element != null && copy != null) {
      const focused = element.ownerDocument.activeElement;
      blurredRef.current =
        isHTMLElement(focused) &&
        focused !== element &&
        element.contains(focused)
          ? focused
          : null;
      // The copy keeps the alert's exit look, so the fade plays on it.
      copy.style.removeProperty('animation-name');
      const fade =
        typeof copy.getAnimations === 'function'
          ? copy.getAnimations({subtree: true})
          : [];
      const length = lengthOf(fade);
      if (length > 0) {
        exitCopyRef.current = {copy, fade, length};
      } else {
        copy.remove();
      }
    }
    // eslint-disable-next-line @eslint-react/set-state-in-effect -- the copy exists only once this commit has styled the open alert with its exit
    setExit('fade');
  }, [exit]);

  // Synchronizes the page with the copy's fade. The Dialog closed in this
  // commit, and a toast it held went back to the page. Until the fade ends
  // the page is inert, global hosts such as the toast viewport aside, and
  // the hold's shield takes every press. Then focus returns to the opener.
  // So the fade's end runs no render: it only lets go.
  useIsomorphicLayoutEffect(() => {
    if (exit !== 'fade') {
      return;
    }
    const exitCopy = exitCopyRef.current;
    exitCopyRef.current = null;
    const element = elementRef.current;
    if (exitCopy == null || element == null) {
      exitCopy?.copy.remove();
      return;
    }
    const {copy, fade, length} = exitCopy;
    const doc = element.ownerDocument;
    const ended = allEnded(fade);
    const release = holdInput(doc.body, {until: ended, scope: 'layer'});
    const opener = openerRef.current;
    const returnFocus = () => {
      const active = doc.activeElement;
      if (
        opener?.isConnected === true &&
        (active == null || active === doc.body)
      ) {
        returnFocusForLastInput(opener);
      }
    };
    let isPlaying = true;
    // The backstop below, which `stop` clears.
    let backstop: ReturnType<typeof setTimeout> | undefined = undefined;
    const stop = () => {
      isPlaying = false;
      clearTimeout(backstop);
      release();
      copy.remove();
    };
    const end = () => {
      if (isPlaying) {
        stop();
        returnFocus();
      }
    };
    void ended.then(end);
    // A fade whose end is never reported (a page that disables animations)
    // still ends once its length has passed.
    backstop = setTimeout(end, length + EXIT_BACKSTOP_MS);
    return () => {
      isCutShortRef.current = isPlaying;
      if (isPlaying) {
        stop();
        // After the commit: a reopen has moved focus into the alert by then,
        // and an unmount leaves it on the page.
        queueMicrotask(returnFocus);
      }
    };
  }, [exit]);

  // Synchronizes focus with a reopen that cut the fade short. The action that
  // had focus as the alert closed takes it back from Dialog's initial focus,
  // unless focus has moved out of the alert since.
  useEffect(() => {
    if (!isReopened) {
      return;
    }
    const blurred = blurredRef.current;
    blurredRef.current = null;
    const element = elementRef.current;
    if (blurred?.isConnected !== true || element == null) {
      return;
    }
    const doc = blurred.ownerDocument;
    const active = doc.activeElement;
    if (active == null || active === doc.body || element.contains(active)) {
      blurred.focus({preventScroll: true});
    }
  }, [isReopened]);

  return {isPresented: isOpen || exit === 'copy', look, ref};
}
