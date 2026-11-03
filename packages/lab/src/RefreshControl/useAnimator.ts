// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useAnimator.ts
 * @input Core's animator (internal/touch)
 * @output useAnimator: one animator for a component's lifetime, and the ref
 *   that attaches it to an element
 * @position Internal to RefreshControl; refreshTouchController calls it
 */

import {useState} from 'react';
import {
  createMotionAnimator,
  type MotionAnimator,
  type MotionAnimatorOptions,
} from '@astryxdesign/core/internal/touch';

export interface UseAnimatorResult {
  readonly ref: (element: HTMLElement | null) => void;
  readonly animator: MotionAnimator;
}

/** One animator for the component's lifetime, attached through `ref`. */
export function useAnimator(
  options?: MotionAnimatorOptions,
): UseAnimatorResult {
  const [result] = useState<UseAnimatorResult>(() => {
    const animator = createMotionAnimator(null, options);
    return {animator, ref: element => animator.attach(element)};
  });
  return result;
}
