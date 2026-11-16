// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file uikitKeyboardSchedule.ts
 * @input The UIKit table's keyboard frame spring (`KEYBOARD_SPRING`) and the
 *   duration its notifications report (`timing.keyboardNotificationMs`). The
 *   layout guide's field checks
 * @output uikitKeyboardSchedule: when and how the keyboard moves in Safari on
 *   iOS, with the spring's progress and the focus rules the guide applies there
 * @position Part of the touch runtime (utils/touchRuntimeModules.tsx), which
 *   registers it with the keyboard layout guide once the page has loaded it.
 *   A page that never loads the runtime carries none of it.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import {KEYBOARD_SPRING} from '../motion/uikit/springs';
import {timing} from '../motion/uikit/timing';
import {deepActiveElement} from '../utils/flatTree';
import {
  bringsUpKeyboard,
  hidesField,
  type KeyboardFocusRules,
  type UIKitKeyboardSchedule,
} from './keyboardLayoutGuide';
import type {KeyboardProgressCurve} from './keyboardModel';

// The part of the way a spring released at rest has still to go, `t` seconds
// after its release.
function springFromRest({
  mass = 1,
  stiffness,
  damping,
}: {
  readonly mass?: number;
  readonly stiffness: number;
  readonly damping: number;
}): (t: number) => number {
  const omega = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (Math.abs(zeta - 1) < 1e-6) {
    return t => (1 + omega * t) * Math.exp(-omega * t);
  }
  if (zeta < 1) {
    const omegaD = omega * Math.sqrt(1 - zeta * zeta);
    return t =>
      Math.exp(-zeta * omega * t) *
      (Math.cos(omegaD * t) + ((zeta * omega) / omegaD) * Math.sin(omegaD * t));
  }
  const root = omega * Math.sqrt(zeta * zeta - 1);
  const slow = -zeta * omega + root;
  const fast = -zeta * omega - root;
  return t =>
    (fast * Math.exp(slow * t) - slow * Math.exp(fast * t)) / (fast - slow);
}

const span = timing.keyboardNotificationMs / 1000;
const left = springFromRest(KEYBOARD_SPRING);

// UIKit's keyboard moves on one spring, up and down. Core Animation cuts it at
// the duration the keyboard notifications report, so it lands there.
const slide: KeyboardProgressCurve = {
  durationMs: timing.keyboardNotificationMs,
  progress: t => (t <= 0 ? 0 : t >= span ? 1 : 1 - left(t)),
};

// Only WebKit on iOS and iPadOS supports `-webkit-touch-callout`, and its
// keyboard is UIKit's. The check reads a capability, never the user agent.
function hasUIKitKeyboard(win: Window): boolean {
  const css = (win as Window & {readonly CSS?: Partial<typeof CSS>}).CSS;
  return (
    typeof css?.supports === 'function' &&
    css.supports('-webkit-touch-callout', 'none')
  );
}

function isElement(target: EventTarget | null): target is Element {
  return target != null && (target as Node).nodeType === 1;
}

// Safari keeps the keyboard up for a field inside a frame, a custom element or
// an open shadow root. When focus moves to one of these, the guide waits for
// focus to settle there. It decides about the hide at the focus event, or on
// the next task.
function uikitFocusRules(
  win: Window,
  hide: (blurAt: number) => void,
): KeyboardFocusRules {
  let pendingAt: number | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  // Whether the focused element, read inside open shadow roots, may keep a
  // keyboard up.
  const mayKeepKeyboard = (): boolean => {
    const target = deepActiveElement(win.document);
    return target != null && (bringsUpKeyboard(target) || hidesField(target));
  };
  const settle = () => {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
    const blurAt = pendingAt;
    pendingAt = null;
    if (blurAt != null && !mayKeepKeyboard()) {
      hide(blurAt);
    }
  };
  return {
    focused: () => {
      settle();
      return mayKeepKeyboard();
    },
    blurred: (next, blurAt) => {
      if (!isElement(next) || !hidesField(next)) {
        return false;
      }
      pendingAt = blurAt;
      timer = setTimeout(settle, 0);
      return true;
    },
    dispose: () => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
      pendingAt = null;
    },
  };
}

/**
 * Safari on iOS reports the keyboard's show once, as UIKit's keyboard starts
 * up, and its hide only once the keyboard is down. So content rides UIKit's
 * keyboard spring from the show's report, and from the blur that takes the
 * keyboard down, as a prediction that Safari's later report confirms. A hide
 * nothing predicted rides from the report. Safari reports the keyboard with
 * its accessory bar in one height.
 */
export const uikitKeyboardSchedule: UIKitKeyboardSchedule = {
  curve: slide,
  showReportLagMs: 0,
  hideReportLagMs: 0,
  hideAfterBlurMs: 0,
  appliesTo: hasUIKitKeyboard,
  focusRules: uikitFocusRules,
};
