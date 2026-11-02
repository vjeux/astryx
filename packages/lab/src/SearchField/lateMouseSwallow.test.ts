// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file lateMouseSwallow.test.ts
 * @input vitest, armLateMouseSwallow and Core's shared window input listener
 * @output Proofs that a claimed tap's late mouse events are swallowed until
 *   their click, that a key's click passes, and that the swallow lets go as
 *   soon as the click guard takes the click
 * @position Testing; validates lateMouseSwallow.ts in jsdom
 */

import {afterEach, beforeEach, expect, it} from 'vitest';
import {subscribeInput} from '@astryxdesign/core/internal/touch';
import {armLateMouseSwallow} from './lateMouseSwallow';

const MOUSE = ['mousedown', 'mouseup', 'click'] as const;

/** What reaches the page's own listeners. */
let seen: string[];
const record = (event: Event) => seen.push(event.type);

beforeEach(() => {
  seen = [];
  for (const type of MOUSE) {
    document.body.addEventListener(type, record);
  }
});

afterEach(() => {
  for (const type of MOUSE) {
    document.body.removeEventListener(type, record);
  }
});

/** A held tap's late mouse event, aimed at the page. */
function late(type: string, detail = 1) {
  document.body.dispatchEvent(
    new MouseEvent(type, {bubbles: true, cancelable: true, detail}),
  );
}

it('swallows the late mousedown, mouseup and click, then lets the next ones through', () => {
  const swallow = armLateMouseSwallow(document);
  for (const type of MOUSE) {
    late(type);
  }
  expect(seen).toEqual([]);
  expect(swallow.isArmed()).toBe(false);
  for (const type of MOUSE) {
    late(type);
  }
  expect(seen).toEqual(['mousedown', 'mouseup', 'click']);
});

it('lets a click with no press behind it pass, as a key’s click', () => {
  const swallow = armLateMouseSwallow(document);
  late('click', 0);
  expect(seen).toEqual(['click']);
  expect(swallow.isArmed()).toBe(true);
  swallow.disarm();
  expect(swallow.isArmed()).toBe(false);
});

it('lets go as soon as the click guard takes the late click', () => {
  const swallow = armLateMouseSwallow(document);
  // The gesture host's click guard, armed at the same lift: a subscriber on
  // Core's shared window listener that takes the click.
  const stopGuard = subscribeInput(
    window,
    'click',
    event => {
      event.preventDefault();
      event.stopImmediatePropagation();
    },
    {cancels: true},
  );
  for (const type of MOUSE) {
    late(type);
  }
  stopGuard();
  expect(seen).toEqual([]);
  expect(swallow.isArmed()).toBe(false);
});

it('lets go at the next touch, pointer press or key', () => {
  for (const type of ['touchstart', 'pointerdown', 'keydown']) {
    const swallow = armLateMouseSwallow(document);
    document.body.dispatchEvent(new Event(type, {bubbles: true}));
    expect(swallow.isArmed(), type).toBe(false);
  }
});
