// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file boxHold.ts
 * @input A finger's or a pen's contact that the shared press controller
 *   (utils/pressFeedback.ts) follows, and the marked box it starts on. A long
 *   press that fires claims the contact (utils/pressClaim.ts).
 * @output registerBoxHold, which installs the box hold into the controller,
 *   and lockPressedRow
 * @position CheckboxInput and RadioListItem call registerBoxHold as they
 *   load and mark their boxes with pressBoxProps; Switch's tracker takes
 *   lockPressedRow. Builds on utils/selectionLock.ts and
 *   utils/browserClickWait.ts.
 */

import {LONG_PRESS_DURATION_MS} from '../motion/uikit/longPress';
import {pressBoxAt} from '../privateAttributes/pressBox.stylex';
import {awaitBrowserClick, clickForLift} from './browserClickWait';
import {subscribeInput} from './inputStream';
import {watchPressClaims} from './pressClaim';
import {installBoxHold, PRESSABLE_ATTRIBUTE} from './pressFeedback';
import {lockSelection} from './selectionLock';

/** The wait for the browser's click after a box's still lift, per box. */
const waits = new Map<HTMLElement, () => void>();

/** The lifts that claimed holds still have to take. */
const takers = new Set<() => void>();

/**
 * Takes the lift of a press whose long press acted. The touchend is
 * cancelled, so the browser sends the box no click. With no selection, iOS
 * clicks after a long hold. A new press, or a cancelled touch, ends the take.
 */
function takeLift(view: Window): void {
  const stop = () => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
    takers.delete(stop);
  };
  const unsubscribes = [
    subscribeInput(
      view,
      'touchend',
      event => {
        if (event.cancelable) {
          event.preventDefault();
        }
        stop();
      },
      {cancels: true},
    ),
    subscribeInput(view, 'touchcancel', stop),
    subscribeInput(view, 'pointerdown', stop),
  ];
  takers.add(stop);
}

/**
 * The selection lock for a finger or a pen on a control's box. A lock on the
 * box alone lets iOS select a word beside it, so the lock also covers the
 * pressable row around each element.
 */
export function lockPressedRow(
  elements: Iterable<Element>,
  target: EventTarget | null,
): () => void {
  const held = new Set<Element>();
  for (const element of elements) {
    held.add(element);
    held.add(element.closest(`[${PRESSABLE_ATTRIBUTE}]`) ?? element);
  }
  return lockSelection(held, target);
}

/**
 * Starts the hold of a contact on a marked box in `surface`. The box and the
 * surface refuse a selection until the contact ends. Returns the call for the
 * contact's end, or null when the contact is not on a box.
 */
function holdBox(
  surface: HTMLElement,
  target: EventTarget | null,
): ((isStillLift: boolean) => void) | null {
  const box = pressBoxAt(target, surface);
  if (box == null) {
    return null;
  }
  const release = lockSelection([surface, box], target);
  const startedAt = performance.now();
  const view = box.ownerDocument.defaultView;
  let isClaimed = false;
  const stopWatching = watchPressClaims(() => {
    // A long press that acted, such as a context menu's or a row's own, is
    // what the hold did. The box gets no click, the browser's or its own.
    if (!isClaimed && view != null) {
      takeLift(view);
    }
    isClaimed = true;
  });
  return isStillLift => {
    release();
    stopWatching();
    // A tap's activation stays the browser's own: only a long press may need
    // a stand-in for the click.
    if (
      !isStillLift ||
      performance.now() - startedAt < LONG_PRESS_DURATION_MS
    ) {
      return;
    }
    if (!isClaimed) {
      waitForClick(box);
    }
  };
}

/**
 * Some engines send no click after a long hold, such as Chromium's own long
 * press, as on Android. So a still lift waits for the browser's own click,
 * and the control clicks its input only if none comes. Nothing clicks for a
 * lift that another element took: its handler cancelled the touchend.
 */
function waitForClick(box: HTMLElement): void {
  waits.get(box)?.();
  const view = box.ownerDocument.defaultView;
  if (view == null) {
    return;
  }
  // The lift's own touchend. A new press's touchend is not this lift's.
  let lift: Event | null = null;
  const stopLift = subscribeInput(view, 'touchend', event => {
    lift ??= event;
  });
  const stopListening = [
    stopLift,
    subscribeInput(view, 'pointerdown', stopLift),
  ];
  let stopWaiting: (() => void) | null = null;
  const end = () => {
    for (const stop of stopListening) {
      stop();
    }
    stopWaiting?.();
    stopWaiting = null;
    if (waits.get(box) === end) {
      waits.delete(box);
    }
  };
  waits.set(box, end);
  stopWaiting = awaitBrowserClick(box, {
    onClicked: () => {
      stopWaiting = null;
      end();
    },
    onNoClick: () => {
      stopWaiting = null;
      end();
      // Read once every handler has run.
      if (lift?.defaultPrevented === true) {
        return;
      }
      const input = box.querySelector('input');
      if (input != null && input.isConnected) {
        clickForLift(input);
      }
    },
  });
}

/** Ends every wait and take still running: the controller is going away. */
function endBoxWaits(): void {
  for (const end of [...waits.values(), ...takers]) {
    end();
  }
}

/**
 * Installs the box hold into the shared press controller. A box component
 * calls it as its module loads, so a page with no box carries none of it.
 */
export function registerBoxHold(): void {
  installBoxHold({start: holdBox, endWaits: endBoxWaits});
}
