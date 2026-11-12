// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file A memo key for a list of values, compared by identity.
 * @input Values: objects and functions by identity, others by value.
 * @output A string that changes exactly when a value, the count or the
 *   order changes.
 * @position Private to Table: keys the column and plugin memos.
 */

// Each object's number, given the first time a key meets it. The map holds
// objects weakly, and it only adds an entry for an object it has not met. So
// a render React discards changes no key that a later render computes.
const objectIds = new WeakMap<object, number>();
let lastObjectId = 0;

/**
 * Returns a key for `values`: equal for two lists that hold the same values
 * in the same order, objects and functions compared by identity.
 */
export function identityKey(values: ReadonlyArray<unknown>): string {
  let key = '';
  for (const value of values) {
    if (
      (typeof value === 'object' && value !== null) ||
      typeof value === 'function'
    ) {
      let id = objectIds.get(value);
      if (id === undefined) {
        lastObjectId += 1;
        id = lastObjectId;
        objectIds.set(value, id);
      }
      key += `o${id},`;
    } else {
      key += `${typeof value}:${String(value)},`;
    }
  }
  return key;
}
