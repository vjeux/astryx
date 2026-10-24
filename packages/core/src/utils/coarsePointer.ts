// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file coarsePointer.ts
 * @input A window, and React for the hook
 * @output Exports isCoarsePointer, watchCoarsePointer and useIsCoarsePointer:
 *   whether the primary pointer is coarse (TOUCH_QUERY), and when it changes
 * @position The coarse-pointer gate of packages/core/src/gestures, of the
 *   press controller (pressFeedback.ts) and of components: touch-only work
 *   registers only while it holds
 *
 * Under a coarse primary pointer, a phone's touch work stays registered: the
 * gesture host's page listeners, the page hold and the finger scroll. Under a
 * fine one, recognizers still attach, and the host listens on the page only
 * during a press (AST-094). The answer can change while the page is open (a
 * tablet docking a mouse), so a holder watches it. Every useIsCoarsePointer
 * reader shares one watch.
 *
 * SYNC: When modified, update coarsePointer.test.ts.
 */

import {useSyncExternalStore} from 'react';
import {TOUCH_QUERY} from './touchQueries';

/** Whether the primary pointer of `view` is coarse now. */
export function isCoarsePointer(view: Window | null | undefined): boolean {
  return (
    typeof view?.matchMedia === 'function' &&
    view.matchMedia(TOUCH_QUERY).matches
  );
}

/**
 * Call `listener` with the new answer each time the primary pointer of
 * `view` turns coarse or fine, until the returned function is called.
 */
export function watchCoarsePointer(
  view: Window | null | undefined,
  listener: (isCoarse: boolean) => void,
): () => void {
  if (typeof view?.matchMedia !== 'function') {
    return () => {};
  }
  const query = view.matchMedia(TOUCH_QUERY);
  const onChange = (): void => listener(query.matches);
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }
  // Safari before 14 only has the older pair.
  query.addListener(onChange);
  return () => query.removeListener(onChange);
}

/** Every mounted useIsCoarsePointer reader's change callback. */
const readers = new Set<() => void>();
/** Stops the one shared watch; null while no reader is mounted. */
let stopWatching: (() => void) | null = null;
/** The shared answer while a reader is mounted; null otherwise. */
let current: boolean | null = null;

function clientWindow(): Window | undefined {
  return typeof window === 'undefined' ? undefined : window;
}

function subscribe(reader: () => void): () => void {
  readers.add(reader);
  if (stopWatching == null) {
    current = isCoarsePointer(clientWindow());
    stopWatching = watchCoarsePointer(clientWindow(), isCoarse => {
      current = isCoarse;
      for (const each of Array.from(readers)) {
        each();
      }
    });
  }
  return () => {
    readers.delete(reader);
    if (readers.size === 0) {
      stopWatching?.();
      stopWatching = null;
      current = null;
    }
  };
}

function readCoarsePointer(): boolean {
  return current ?? isCoarsePointer(clientWindow());
}

function readServerCoarsePointer(): boolean {
  return false;
}

/**
 * Whether the primary pointer is coarse (a finger), for a component. Every
 * reader shares one watch, so a long list adds no listener per row. The
 * server and the hydrating render read false.
 */
export function useIsCoarsePointer(): boolean {
  return useSyncExternalStore(
    subscribe,
    readCoarsePointer,
    readServerCoarsePointer,
  );
}
