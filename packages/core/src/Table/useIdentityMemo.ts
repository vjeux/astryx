// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file useIdentityMemo.ts
 * @input Objects compared by identity and strings compared by value, and a
 *   function that computes from them.
 * @output Exports useIdentityMemo, a memo keyed on those values, and
 *   identityKey, the key it uses.
 * @position Private to Table: holds the column and plugin caches.
 */

import {useMemo} from 'react';

// Each object's number, given the first time a key meets it. The map holds
// objects weakly, and it only adds an entry for an object it has not met. So
// a render React discards changes no key that a later render computes.
const objectIds = new WeakMap<object, number>();
let lastObjectId = 0;

/**
 * Returns a key for `values`. Two lists get the same key exactly when they
 * hold the same objects and strings in the same order.
 */
export function identityKey(values: ReadonlyArray<object | string>): string {
  let key = '';
  for (const value of values) {
    if (typeof value === 'string') {
      // The length keeps a string that holds the separator from matching two.
      key += `s${value.length}:${value},`;
      continue;
    }
    let id = objectIds.get(value);
    if (id === undefined) {
      lastObjectId += 1;
      id = lastObjectId;
      objectIds.set(value, id);
    }
    key += `o${id},`;
  }
  return key;
}

/**
 * Returns the last committed result of `compute` while `values` hold the same
 * objects and strings, in order, and computes again when they change. A render
 * React discards cannot replace it, and no state or ref is written during
 * render.
 */
export function useIdentityMemo<R>(
  values: ReadonlyArray<object | string>,
  compute: () => R,
): R {
  const key = identityKey(values);
  return useMemo(
    () => compute(),
    // eslint-disable-next-line @eslint-react/exhaustive-deps -- keyed by the values, not by `compute`, which is new on every render
    [key],
  );
}
