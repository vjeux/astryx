// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useReorderSession.ts
 * @input A reorderable object made by createReorderable, and the element
 *   whose children are the rows
 * @output `useReorderSession`, the reorder session over those rows with the
 *   object's options, and `useReorderCommit`, which applies a drop's new
 *   order after each commit
 * @position Internal to core. List.tsx and List/ListReorderScope.tsx run the
 *   reorder session through these. List calls `useReorderCommit` after its
 *   layout updates, so a drop's commit is the reorder's.
 */

import {useMemo, useRef} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import type {Reorderable} from '../reorderable/createReorderable';
import {
  REORDER_ENGINE,
  type ListReorderOptions,
  type ListReorderSession,
  type ReorderableInternals,
} from './listReorderContext';

/** A reorder session and the options of the object that runs it. */
export interface ReorderSessionOf {
  readonly session: ListReorderSession | null;
  readonly options: ListReorderOptions | null;
}

/**
 * The reorder session over the children of the element `getList` returns,
 * run by `reorderable`'s engine. Both fields are null without an object.
 * `hintId` names the handles' instructions. The object may be made on every
 * render: the session lasts as long as its engine and reads the object's
 * latest callbacks.
 */
export function useReorderSession(
  reorderable: Reorderable | undefined,
  getList: () => HTMLElement | null,
  hintId: string,
): ReorderSessionOf {
  const reorder = reorderable as ReorderableInternals | undefined;
  const engine = reorder?.[REORDER_ENGINE];
  const getListRef = useRef(getList);
  getListRef.current = getList;
  const session = useMemo(
    () => engine?.createSession(() => getListRef.current(), hintId) ?? null,
    [engine, hintId],
  );
  return {session, options: reorder?.options ?? null};
}

/**
 * Applies a drop's new order after each commit. A caller with layout updates
 * calls it after them, so a drop's commit is the reorder's.
 */
export function useReorderCommit(session: ListReorderSession | null): void {
  // Syncs the reorder session, which lives outside React, after each commit.
  useIsomorphicLayoutEffect(() => {
    session?.commit();
  });
}
