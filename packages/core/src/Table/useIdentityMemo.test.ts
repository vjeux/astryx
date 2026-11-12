// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, expect, it} from 'vitest';
import {identityKey} from './useIdentityMemo';

describe('identityKey', () => {
  it('gives the same key to the same objects and strings in the same order', () => {
    const a = {};
    const b = () => {};

    expect(identityKey([a, 'name', b])).toBe(identityKey([a, 'name', b]));
  });

  it('gives another key when an object is a new one with the same contents', () => {
    expect(identityKey([{key: 'id'}])).not.toBe(identityKey([{key: 'id'}]));
  });

  it('gives another key when the order or the count changes', () => {
    const a = {};
    const b = {};

    expect(identityKey([a, b])).not.toBe(identityKey([b, a]));
    expect(identityKey([a])).not.toBe(identityKey([a, a]));
  });

  it('keeps a string holding the separator apart from two strings', () => {
    expect(identityKey(['a,s1:b'])).not.toBe(identityKey(['a', 'b']));
    expect(identityKey(['a,string:b'])).not.toBe(identityKey(['a', 'b']));
  });
});
