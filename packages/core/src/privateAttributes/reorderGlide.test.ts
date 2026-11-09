// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file reorderGlide.test.ts
 * @input The reorder-glide mark's writers and promises that stand for glides
 * @output Tests that a glide marks the list until each of its motions ends.
 *   An earlier glide's end leaves a later mark, and a drag clears the mark at
 *   once. A swiped row keeps the list unmarked
 */

import {describe, expect, it} from 'vitest';
import {clearReorderGlide, markReorderGlide} from './reorderGlide.stylex';

const MARK = 'data-astryx-reorder-glide';

/** A glide's motion that ends when the test says so. */
function motion() {
  let arrive: (arrived: boolean) => void = () => {};
  let fail: (error: Error) => void = () => {};
  const finished = new Promise<boolean>((resolve, reject) => {
    arrive = resolve;
    fail = reject;
  });
  return {finished, arrive, fail};
}

/** Lets every settled promise's reactions run. */
const flush = async () => {
  await new Promise(resolve => setTimeout(resolve, 0));
};

describe('the reorder-glide mark', () => {
  it('marks the list until each of its glides has ended', async () => {
    const list = document.createElement('ul');
    const first = motion();
    const second = motion();
    markReorderGlide(list, [first.finished, second.finished]);
    expect(list.hasAttribute(MARK)).toBe(true);
    first.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(true);
    second.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(false);
  });

  it('marks nothing when no row glides', () => {
    const list = document.createElement('ul');
    markReorderGlide(list, []);
    expect(list.hasAttribute(MARK)).toBe(false);
  });

  it('marks nothing while a row of the list is swiped', () => {
    const list = document.createElement('ul');
    const row = document.createElement('li');
    row.style.setProperty('--_item-swipe-travel', '-80px');
    list.append(row);
    markReorderGlide(list, [motion().finished]);
    expect(list.hasAttribute(MARK)).toBe(false);
  });

  it("leaves a later glide's mark in place when an earlier glide ends", async () => {
    const list = document.createElement('ul');
    const earlier = motion();
    const later = motion();
    markReorderGlide(list, [earlier.finished]);
    markReorderGlide(list, [later.finished]);
    earlier.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(true);
    later.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(false);
  });

  it('ends the mark when a glide is stopped or fails', async () => {
    const list = document.createElement('ul');
    const stopped = motion();
    const failed = motion();
    markReorderGlide(list, [stopped.finished, failed.finished]);
    stopped.arrive(false);
    failed.fail(new Error('the animation was cancelled'));
    await flush();
    expect(list.hasAttribute(MARK)).toBe(false);
  });

  it('clears the mark at once as a drag starts, and the glide that marked it leaves it clear', async () => {
    const list = document.createElement('ul');
    const glide = motion();
    markReorderGlide(list, [glide.finished]);
    clearReorderGlide(list);
    expect(list.hasAttribute(MARK)).toBe(false);
    glide.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(false);
  });

  it("keeps a glide's mark after a drag clears an earlier one", async () => {
    const list = document.createElement('ul');
    const earlier = motion();
    markReorderGlide(list, [earlier.finished]);
    clearReorderGlide(list);
    const later = motion();
    markReorderGlide(list, [later.finished]);
    earlier.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(true);
    later.arrive(true);
    await flush();
    expect(list.hasAttribute(MARK)).toBe(false);
  });
});
