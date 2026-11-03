// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file lazyToastSwipeClaim.ts
 * @input Uses React lazy and Suspense, useIsHydrating and ToastSwipeClaim
 * @output Exports `ToastSwipeClaim`, which loads its module on its first
 *   render
 * @position Internal to Toast: the claim of its swipe
 *
 * The claim brings in the gesture host, so it loads when the first toast
 * shows and stays out of pages that show none, as Popover's sheet does
 * (Popover/lazyPopoverBottomSheet.ts). It renders nothing until the module
 * loads, and nothing on the server or in the render that hydrates server HTML.
 */

import {
  createElement,
  lazy,
  Suspense,
  type ComponentProps,
  type ReactElement,
} from 'react';
import type {ToastSwipeClaim as EagerToastSwipeClaim} from './ToastSwipeClaim';
import {useIsHydrating} from '../hooks/useIsHydrating';

const loadToastSwipeClaim = async () => import('./ToastSwipeClaim');

const LazyToastSwipeClaim = lazy(async () =>
  loadToastSwipeClaim().then(module => ({
    default: module.ToastSwipeClaim,
  })),
);

export function ToastSwipeClaim(
  props: ComponentProps<typeof EagerToastSwipeClaim>,
): ReactElement | null {
  if (useIsHydrating()) {
    return null;
  }
  return createElement(
    Suspense,
    {fallback: null},
    createElement(LazyToastSwipeClaim, props),
  );
}
