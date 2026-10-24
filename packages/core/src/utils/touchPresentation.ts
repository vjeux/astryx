// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file touchPresentation.ts
 * @input Uses the SSR-safe useMediaQuery hook and window.matchMedia
 * @output The one definition of when a component presents itself the touch
 *   (UIKit) way: TOUCH_QUERY, COMPACT_QUERY, COMPACT_TOUCH_QUERY; the hooks
 *   useTouchPresentation and useMotionPresentation; readTouchPresentation for
 *   a decision taken at one moment
 * @position Internal shared resolver beside interactionModality.ts; its StyleX
 *   twin is touchPresentation.stylex.ts
 *
 * Three questions, answered once:
 *
 * - TOUCH behaviours (the press model, gesture recognizers, UIKit springs and
 *   timings) key on the PRIMARY pointer being coarse: a finger. A touchscreen
 *   laptop reports its trackpad (fine) and keeps pointer behaviours; a tablet
 *   reports coarse and gets touch ones at any width. Not `hover: none` (some
 *   touch browsers report hover) and not `any-pointer` (a laptop's touch
 *   screen is not how it is driven).
 * - LAYOUT behaviours key on the available width: compact at 768 px and
 *   below, whatever the pointer.
 * - A presentation that needs both (a bottom sheet in place of a popover, a
 *   drilled-in sub-menu in place of a flyout) asks for both.
 *
 * A component with no interaction to infer from (a spinner, a progress bar)
 * reads the touch answer to choose its timing: UIKit's on touch, the theme's
 * duration and easing tokens otherwise (`useMotionPresentation`).
 *
 * CSS first: a style that changes with these conditions uses the media keys
 * of touchPresentation.stylex.ts, so the right rule paints before hydration.
 * The hooks are for behaviour. They answer the server default (not touch,
 * not compact) until hydrated unless the caller passes a server hint, and
 * follow the conditions when they change (a tablet docking a mouse).
 *
 * SYNC: When modified, update touchPresentation.stylex.ts (the same queries as
 * media keys) and touchPresentation.test.ts.
 */

import {useMemo} from 'react';
import {useMediaQuery} from '../hooks/useMediaQuery';

/** The primary pointer is coarse: touch behaviours and UIKit motion. */
export const TOUCH_QUERY = '(pointer: coarse)';

/** The viewport is compact: layout behaviours. */
export const COMPACT_QUERY = '(max-width: 768px)';

/** Both: presentations such as a sheet in place of a popover. */
export const COMPACT_TOUCH_QUERY = `${COMPACT_QUERY} and ${TOUCH_QUERY}`;

export interface TouchPresentation {
  /** The primary pointer is coarse (a finger). */
  readonly isTouch: boolean;
  /** The viewport is compact. */
  readonly isCompact: boolean;
  /** Both. */
  readonly isCompactTouch: boolean;
}

/** Which motion a presentation runs: UIKit's table or the theme's tokens. */
export type MotionPresentation = 'uikit' | 'theme';

/**
 * The touch presentation now. SSR-safe: hooks render the server default and
 * update after hydration.
 */
export function useTouchPresentation(
  serverDefault: Partial<Omit<TouchPresentation, 'isCompactTouch'>> = {},
): TouchPresentation {
  const isTouch = useMediaQuery(TOUCH_QUERY, serverDefault.isTouch ?? false);
  const isCompact = useMediaQuery(
    COMPACT_QUERY,
    serverDefault.isCompact ?? false,
  );
  return useMemo(
    () => ({isTouch, isCompact, isCompactTouch: isTouch && isCompact}),
    [isTouch, isCompact],
  );
}

/**
 * The motion a presentation runs (D-01): UIKit's springs and timings under a
 * finger, the theme's duration and easing tokens under a mouse.
 */
export function useMotionPresentation(
  serverDefault = false,
): MotionPresentation {
  return useMediaQuery(TOUCH_QUERY, serverDefault) ? 'uikit' : 'theme';
}

/**
 * The touch presentation at this moment, for a decision taken once (a menu
 * deciding how it presents as it opens). Not touch and not compact where
 * there is no window.
 */
export function readTouchPresentation(
  view: Window | null = typeof window === 'undefined' ? null : window,
): TouchPresentation {
  if (view == null || typeof view.matchMedia !== 'function') {
    return {isTouch: false, isCompact: false, isCompactTouch: false};
  }
  const isTouch = view.matchMedia(TOUCH_QUERY).matches;
  const isCompact = view.matchMedia(COMPACT_QUERY).matches;
  return {isTouch, isCompact, isCompactTouch: isTouch && isCompact};
}
