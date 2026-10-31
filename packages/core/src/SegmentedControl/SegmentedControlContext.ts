// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file SegmentedControlContext.ts
 * @input Layer-scoped React context, use
 * @output Exports SegmentedControlContext, useSegmentedControlContext
 * @position Context provider; consumed by SegmentedControlItem.tsx
 *
 * SYNC: When modified, update /packages/core/src/SegmentedControl/SegmentedControl.doc.mjs
 */

import {use} from 'react';
import {createLayerScopedContext as createContext} from '../Layer/layerScopedContext';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlLayout = 'hug' | 'fill';

/** A segment as SegmentedControl knows it, for the group's Tab stop. */
export interface SegmentedControlSegment {
  readonly value: string;
  /** Disabled by its own `isDisabled`, not by the group. */
  readonly isDisabled: boolean;
  readonly element: HTMLElement;
}

export interface SegmentedControlContextValue {
  value: string;
  onChange: (value: string) => void;
  size: SegmentedControlSize;
  layout: SegmentedControlLayout;
  isDisabled: boolean;
  /**
   * The value of the segment that holds the group's one Tab stop
   * (`spec:AST-085` FR1): the segment that has focus while focus is in the
   * group, else the selected segment, disabled or not, else, for a value no
   * segment carries, the first segment not disabled by its own `isDisabled`,
   * else the first segment.
   */
  tabStopValue: string;
  /**
   * The id of the disabled-reason tooltip while the whole control is disabled
   * with a `disabledMessage`. It describes the Tab stop's segment, the
   * element that takes focus (`spec:AST-085` FR5).
   */
  disabledReasonId?: string;
  /** Records a mounted segment; returns the function that forgets it. */
  registerSegment: (segment: SegmentedControlSegment) => () => void;
}

export const SegmentedControlContext =
  createContext<SegmentedControlContextValue | null>(null);
SegmentedControlContext.displayName = 'SegmentedControlContext';

export function useSegmentedControlContext(): SegmentedControlContextValue {
  const ctx = use(SegmentedControlContext);
  if (ctx == null) {
    throw new Error(
      'useSegmentedControlContext must be used within SegmentedControl. ' +
        'Wrap your SegmentedControlItem in <SegmentedControl>.',
    );
  }
  return ctx;
}
