// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file MonthChangeAnnouncement.tsx
 * @input The month the touch calendar shows, as its title reads it, and
 *   whether the calendar is shown
 * @output Exports MonthChangeAnnouncement, which announces a new month once
 *   the calendar rests on it; it renders nothing
 * @position Internal to TouchDateField.tsx and TouchDateTimeField.tsx. It
 *   renders inside the sheet, so its announcement reaches the open dialog
 *   (useAnnounce).
 */

import {useEffect, useRef} from 'react';
import {useAnnounce} from '../hooks/useAnnounce';
import {SCROLL_QUIET_MS} from './useScrollSettle';

export interface MonthChangeAnnouncementProps {
  /** The month the calendar shows, as its title reads it. */
  label: string;
  /** Whether the calendar is shown: the sheet is open and the wheels closed. */
  isShown: boolean;
}

/**
 * Announces the month the touch calendar shows, politely, as the pointer
 * Calendar announces its month. A new month is announced once it has held
 * for the scroll's quiet period, so a scroll through several months is
 * announced where it stops. A month that changed while the calendar was
 * hidden, as the wheels move it, is not announced when the calendar shows
 * again.
 */
export function MonthChangeAnnouncement({
  label,
  isShown,
}: MonthChangeAnnouncementProps): null {
  const announce = useAnnounce({hasReplace: true});
  // The month the screen reader already knows: announced, or current while
  // the calendar was hidden. Empty until today is known.
  const knownRef = useRef(label);
  // Syncs the screen reader with the month the calendar shows.
  useEffect(() => {
    if (!isShown || label === '' || knownRef.current === '') {
      knownRef.current = label;
      return;
    }
    if (label === knownRef.current) {
      return;
    }
    const timer = setTimeout(() => {
      knownRef.current = label;
      announce(label);
    }, SCROLL_QUIET_MS);
    return () => clearTimeout(timer);
  }, [label, isShown, announce]);
  return null;
}
