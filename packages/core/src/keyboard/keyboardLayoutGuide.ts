// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardLayoutGuide.ts
 * @input The keyboard module's reports (subscribeKeyboardHeight),
 *   createKeyboardModel and the keyboard notifications' duration
 * @output getKeyboardLayoutGuide (a window's one guide), bringsUpKeyboard and
 *   the KeyboardLayoutGuide type
 * @position The web's UIKeyboardLayoutGuide: where the software keyboard
 *   covers the layout viewport and how it moves. ChatLayout's composer and a
 *   Tall BottomSheet read it to keep content above the keyboard. It is
 *   internal to core.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import {keyboardNotification} from '../motion/uikit/timing';
import {
  getKeyboardHeight,
  isTextEntryControl,
  subscribeKeyboardHeight,
  type KeyboardHeightEvent,
} from './keyboardHeight';
import {
  createKeyboardModel,
  type KeyboardModel,
  type KeyboardProfile,
  type KeyboardTransition,
} from './keyboardModel';

/**
 * Whose keyboard schedule the guide reads: `chromium` where the browser has
 * the VirtualKeyboard API, and `webkit`, Mobile Safari's, everywhere else.
 * Chrome reports the keyboard as each slide starts. The profile is a
 * capability, never the user agent. motion/uikit/keyboard.ts and
 * motion/android/keyboard.ts hold the measured timing.
 */
export function keyboardProfileOf(win: Window): KeyboardProfile {
  return 'virtualKeyboard' in win.navigator ? 'chromium' : 'webkit';
}

/** A window's keyboard layout guide. */
export interface KeyboardLayoutGuide {
  /** The inset the keyboard rests at (or is heading to), CSS px. */
  readonly inset: number;
  /** The latest transition. */
  readonly transition: KeyboardTransition;
  /** The inset presented at `time` (default now), CSS px. */
  presentation(time?: number): number;
  /**
   * Calls `listener` with every transition, inside the event that revealed
   * it, until the caller runs the returned function.
   */
  subscribe(listener: (transition: KeyboardTransition) => void): () => void;
  /** Whose keyboard schedule the guide reads (keyboardProfileOf). */
  readonly profile: KeyboardProfile;
}

// Extra time after a predicted transition's end before checking it.
const VERIFY_SLACK_MS = 150;
// How long after a focus the guide watches frames for a keyboard to rise.
const FRAME_WATCH_MS = 1000;
// How long after a field gains focus Chrome may still report the keyboard
// gone for a moment (measured: back within 50 ms of the move).
const FOCUS_HANDOFF_MS = 150;

// Controls whose picker Chrome on Android opens over the page while the
// keyboard goes away; on iOS the picker takes the keyboard's place.
const PICKER_INPUT_TYPES = new Set([
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
]);

/**
 * Whether focusing `target` brings up a software keyboard (or another input
 * view in its place, as a select's picker does).
 */
export function bringsUpKeyboard(target: EventTarget | null): boolean {
  const element = target instanceof Element ? target : null;
  return (
    isTextEntryControl(element) ||
    (element instanceof HTMLSelectElement && !element.disabled)
  );
}

// Whether `target` is a select, or a date or time field, which Chrome on
// Android edits in a picker over the page.
function opensPickerOverPage(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (element == null || element.nodeType !== 1) {
    return false;
  }
  return (
    element.tagName === 'SELECT' ||
    (element.tagName === 'INPUT' &&
      PICKER_INPUT_TYPES.has((element as HTMLInputElement).type))
  );
}

const guides = new WeakMap<Window, KeyboardLayoutGuide>();

/**
 * The window's keyboard layout guide, created on first use.
 *
 * One guide serves each window. It subscribes to the keyboard module only
 * while something subscribes to it. It owns no listener and measures nothing.
 * It feeds the model the module's reports, the keyboard height and the focus
 * changes that start a hide. It hands each transition to its subscribers.
 * What it adds is timing: when a show started, a hide predicted from the
 * blur, and the motion in between. Layout follows the keyboard height
 * itself, and the guide's transitions only time the optional ride on top.
 *
 * Two browsers report the keyboard on different schedules, so the model reads
 * two measured profiles. Mobile Safari reports a show after the keyboard
 * starts to move, and a hide only once it is down. Chrome reports each slide
 * just after it starts. A browser with the VirtualKeyboard API reports the
 * keyboard itself, as Chrome does. Every other browser reads Safari's
 * profile. Focus can move from one field to another through
 * something that brings no keyboard, such as a popover's container. Chrome
 * then reports the keyboard gone for a moment and then back. So a hide
 * reported while a field that just got focus still has it waits until the
 * move settles.
 *
 * @example
 * ```
 * const guide = getKeyboardLayoutGuide(window);
 * const unsubscribe = guide.subscribe(t => {
 *   animator.animate({y: -t.to}, {spring: keyboard.spring}, {at: t.start});
 * });
 * ```
 */
export function getKeyboardLayoutGuide(win: Window): KeyboardLayoutGuide {
  let guide = guides.get(win);
  if (guide == null) {
    guide = createGuide(win);
    guides.set(win, guide);
  }
  return guide;
}

function createGuide(win: Window): KeyboardLayoutGuide {
  const listeners = new Set<(transition: KeyboardTransition) => void>();
  let profile = keyboardProfileOf(win);
  let model: KeyboardModel = createKeyboardModel(getKeyboardHeight(win), {
    profile,
  });
  let verifyTimer: ReturnType<typeof setTimeout> | null = null;
  let detach: (() => void) | null = null;
  // The last animation frame the page rendered while a keyboard may be about
  // to rise. Then a control that brings one up has focus, and none is up. A busy
  // main thread holds the viewport's report back, and the keyboard then
  // started at about that frame.
  let lastFrame: number | undefined;
  let frameRequest: number | null = null;
  let watchUntil = 0;
  // True while requestAnimationFrame runs. A callback that comes back inside
  // it, as a test stub that calls back at once does, is one frame that ends
  // the watch. Requesting the next frame from inside the request would
  // recurse until the stack overflows.
  let requesting = false;
  let calledBackInRequest = false;
  const onFrame = (time: number) => {
    lastFrame = time;
    frameRequest = null;
    if (requesting) {
      calledBackInRequest = true;
      return;
    }
    if (time < watchUntil) {
      requestFrame();
    }
  };
  const requestFrame = () => {
    requesting = true;
    calledBackInRequest = false;
    const request = win.requestAnimationFrame(onFrame);
    requesting = false;
    frameRequest = calledBackInRequest ? null : request;
  };
  const watchFrames = () => {
    watchUntil = win.performance.now() + FRAME_WATCH_MS;
    if (frameRequest != null) {
      return;
    }
    requestFrame();
  };
  const stopWatchingFrames = () => {
    if (frameRequest != null) {
      win.cancelAnimationFrame(frameRequest);
      frameRequest = null;
    }
    lastFrame = undefined;
  };

  const publish = (transition: KeyboardTransition | null) => {
    if (transition == null) {
      return;
    }
    if (transition.predicted) {
      scheduleVerify(transition);
    }
    for (const listener of [...listeners]) {
      listener(transition);
    }
  };
  const scheduleVerify = (transition: KeyboardTransition) => {
    if (verifyTimer != null) {
      clearTimeout(verifyTimer);
    }
    const due =
      transition.start +
      (transition.curve?.durationMs ?? keyboardNotification.durationMs) +
      VERIFY_SLACK_MS;
    verifyTimer = setTimeout(
      () => {
        verifyTimer = null;
        publish(model.verify(getKeyboardHeight(win), win.performance.now()));
      },
      Math.max(0, due - win.performance.now()),
    );
  };

  const attach = () => {
    profile = keyboardProfileOf(win);
    model = createKeyboardModel(getKeyboardHeight(win), {profile});
    // Whether focusing `target` keeps an input view where the keyboard is. On
    // iOS, a select's picker or a date or time field's picker takes the
    // keyboard's place. Chrome on Android opens it over the page, and the
    // keyboard goes away.
    const keepsInputView = (target: EventTarget | null): boolean =>
      bringsUpKeyboard(target) &&
      !(profile === 'chromium' && opensPickerOverPage(target));
    // When a field that brings up a keyboard last gained focus.
    let keyboardFocusAt = -Infinity;
    let handoffTimer: ReturnType<typeof setTimeout> | null = null;
    const report = (
      height: number,
      time: number,
      frameBefore?: number,
    ): KeyboardTransition | null => {
      if (handoffTimer != null) {
        clearTimeout(handoffTimer);
        handoffTimer = null;
      }
      const settled = keyboardFocusAt + FOCUS_HANDOFF_MS;
      if (
        profile === 'chromium' &&
        height < 0.5 &&
        model.inset >= 0.5 &&
        time < settled &&
        keepsInputView(win.document.activeElement)
      ) {
        // Focus just moved to another field: Chrome reports the keyboard
        // gone before it reports it back. Hold the hide until the move
        // settles, then believe whatever the keyboard is doing.
        handoffTimer = setTimeout(() => {
          handoffTimer = null;
          publish(model.report(getKeyboardHeight(win), settled));
        }, settled - time);
        return null;
      }
      return model.report(height, time, frameBefore);
    };
    const onReport = (event: KeyboardHeightEvent) => {
      if (event.type === 'viewport') {
        const transition = report(event.height, event.timeStamp, lastFrame);
        if (transition?.kind === 'show') {
          stopWatchingFrames();
        }
        publish(transition);
      } else if (event.type === 'focusin') {
        if (keepsInputView(event.target)) {
          keyboardFocusAt = event.timeStamp;
          // Safari holds a show's report back behind a busy main thread;
          // Chrome's arrives as the slide starts.
          if (profile === 'webkit' && model.inset <= 0) {
            watchFrames();
          }
          publish(model.focused(event.timeStamp));
        }
      } else if (
        keepsInputView(event.target) &&
        !keepsInputView(event.relatedTarget)
      ) {
        publish(model.blurred(event.timeStamp));
      }
    };
    const unsubscribe = subscribeKeyboardHeight(win, onReport, {focus: true});
    return () => {
      unsubscribe();
      stopWatchingFrames();
      if (handoffTimer != null) {
        clearTimeout(handoffTimer);
        handoffTimer = null;
      }
      if (verifyTimer != null) {
        clearTimeout(verifyTimer);
        verifyTimer = null;
      }
    };
  };

  return {
    get profile() {
      return profile;
    },
    get inset() {
      return model.inset;
    },
    get transition() {
      return model.transition;
    },
    presentation(time = win.performance.now()) {
      return model.presentation(time);
    },
    subscribe(listener) {
      listeners.add(listener);
      if (detach == null) {
        detach = attach();
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && detach != null) {
          detach();
          detach = null;
        }
      };
    },
  };
}
