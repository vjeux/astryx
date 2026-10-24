// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ButtonTouch.ts
 * @input A button element
 * @output attachButtonTouch: a finger's press scales the button on UIKit's
 *   default spring and lets go on release
 * @position Button's touch layer (spike). Reached only through
 *   `#touch/Button/ButtonTouch`, and only behind the touch presentation, so a
 *   desktop build resolves it to a no-op stub and never ships the animator.
 */

import {animatorFor} from '../motion/animator';
import {springs} from '../motion/uikit/springs';

/** Scales the button while a finger holds it. Returns the detach. */
export function attachButtonTouch(element: HTMLElement): () => void {
  const animator = animatorFor(element);
  const down = (event: PointerEvent) => {
    if (event.pointerType === 'touch') {
      animator.animate({scale: 0.97}, {spring: springs.uikitDefault});
    }
  };
  const up = () => {
    animator.animate({scale: 1}, {spring: springs.uikitDefault});
  };
  element.addEventListener('pointerdown', down);
  element.addEventListener('pointerup', up);
  element.addEventListener('pointercancel', up);
  return () => {
    element.removeEventListener('pointerdown', down);
    element.removeEventListener('pointerup', up);
    element.removeEventListener('pointercancel', up);
  };
}
