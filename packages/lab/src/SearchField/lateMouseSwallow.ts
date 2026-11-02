// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file lateMouseSwallow.ts
 * @input A document, and Core's shared window input listener
 * @output armLateMouseSwallow and the LateMouseSwallow type
 * @position SearchField's touch layer (SearchFieldTouch.ts) arms it when it
 *   claims a tap.
 *
 * SYNC: When modified, update lateMouseSwallow.test.ts and SearchFieldTouch.ts.
 */

import {subscribeInput} from '@astryxdesign/core/internal/touch';

/** One armed swallow. */
export interface LateMouseSwallow {
  /** Whether the swallow still listens. */
  readonly isArmed: () => boolean;
  /** Stops listening; idempotent. */
  readonly disarm: () => void;
}

/**
 * Swallows a claimed tap's late mouse events on `doc`. A tap held a while
 * still gets its mouse events a few ms after its cancelled touchend. They aim
 * at whatever is under the finger by then. The swallow lasts until that
 * click, the next touch, pointer press or key, or `disarm`. A click with no
 * press behind it (`detail` 0, from a key) passes. The swallow listens
 * through Core's shared window listener, beside the click guard. So it also
 * sees a click that the guard takes, and lets go then.
 */
export function armLateMouseSwallow(doc: Document): LateMouseSwallow {
  const view = doc.defaultView;
  const stops: Array<() => void> = [];
  let armed = view != null;
  const disarm = () => {
    armed = false;
    for (const stop of stops.splice(0)) {
      stop();
    }
  };
  if (view == null) {
    return {isArmed: () => armed, disarm};
  }
  const swallow = (event: Event) => {
    if (event.type === 'click' && (event as MouseEvent).detail === 0) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'click') {
      disarm();
    }
  };
  for (const type of ['mousedown', 'mouseup', 'click'] as const) {
    stops.push(subscribeInput(view, type, swallow, {cancels: true}));
  }
  for (const type of ['touchstart', 'pointerdown', 'keydown'] as const) {
    stops.push(subscribeInput(view, type, disarm));
  }
  return {isArmed: () => armed, disarm};
}
