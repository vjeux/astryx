// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file NumberInputTouch.tsx
 * @input NumberInput's stepping state and its stepper buttons; the gesture
 *   system's press tracker and selection lock, stepperTracking.ts and the
 *   click guard's window
 * @output useStepperTouch: the steppers' press layer, for every pointer
 * @position NumberInput's one touch module, imported only by NumberInput.tsx
 *
 * SYNC: Keep in step with NumberInput.tsx (its stepper clicks ask
 * `takeClick`) and NumberInput.stepperTouch.test.tsx.
 */

import {useEffect, useRef, useState, type RefObject} from 'react';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {browserClock} from '../gestures/GestureArena';
import type {PressTracker} from '../gestures/PressTracker';
import {
  usePressTracker,
  type UsePressTrackerOptions,
} from '../gestures/usePressTracker';
import {lockSelection} from '../gestures/selectionLock';
import {CLICK_GUARD_WINDOW_MS} from '../utils/clickGuard';
import {PRESSED_ATTRIBUTE} from '../utils/pressFeedback';
import {StepperTracking, type StepperHalf} from './stepperTracking';

/** What the press layer reads from NumberInput, current at every render. */
export interface StepperTouchState {
  /** The value a press steps from: the committed value, or the draft's. */
  valueForStepping: number | null;
  /** One step from `current` toward `direction`; `current` at a bound. */
  stepFrom: (current: number | null, direction: 1 | -1) => number | null;
  /** Shows `value` in the field while a press lasts; null: the committed value. */
  showPressValue: (value: number | null) => void;
  /** Commits a press's final value: `onChange`, once. */
  commitValue: (value: number) => void;
  isDisabled: boolean;
  isReadOnly: boolean;
  /** Whether the steppers are shown (`hasNumberSteppers`). */
  hasSteppers: boolean;
}

/** What a stepper click steps: a half, nothing, or its own half. */
export type StepperClick = StepperHalf | 'none' | 'own';

export interface StepperTouch {
  /**
   * What a stepper click does. After a tap's lift, its click steps the half
   * the press lifted on. After a held press or a lift outside, it steps
   * nothing ('none'). Any other click is its own ('own'): a key's, assistive
   * technology's, or one long after the lift. Every click ends the wait.
   */
  takeClick: (click: MouseEvent) => StepperClick;
}

/**
 * Tracks a press on the steppers by any pointer, through the column's press
 * tracker. A tap steps on the browser's click after its lift. A held half
 * repeats, the field shows each step, and the release commits once. Inside
 * the column a slide carries the press to the other half. Outside the column
 * the half stays the same, and past the tracking area the repeat pauses. A
 * held press selects no text and opens no callout. A press that the system
 * takes, or that the field turns disabled or read-only under, commits nothing.
 */
export function useStepperTouch(
  state: StepperTouchState,
  incrementRef: RefObject<HTMLButtonElement | null>,
  decrementRef: RefObject<HTMLButtonElement | null>,
  columnRef: RefObject<HTMLDivElement | null>,
): StepperTouch {
  // The column's tracker, for the paint its control events read.
  const trackerRef = useRef<PressTracker | null>(null);
  // The last lift a click may follow: when, and the half a tap's click steps
  // (null: its click steps nothing). Null while no click is owed.
  const liftRef = useRef<{at: number; tap: StepperHalf | null} | null>(null);
  // The value the press has stepped to; null before its first step.
  const pressValueRef = useRef<number | null>(null);
  const pressRef = useRef<{
    /**
     * Client y where the decrement half begins, read once at touch-down;
     * null with no layout (nothing is laid out to tell the halves apart).
     */
    split: number | null;
    /** The column's client box, read with `split`. */
    box: DOMRect | null;
    /** The half the press landed on. */
    landedOn: StepperHalf;
    /** The last half the press was on, kept while the pointer is away. */
    lastHalf: StepperHalf;
    /** The half under the pointer, kept through the lift for a quick tap's flash. */
    half: StepperHalf | null;
    /** Let go of because the field turned disabled or read-only mid-press. */
    isReleased: boolean;
  }>({
    split: null,
    box: null,
    landedOn: 'increment',
    lastHalf: 'increment',
    half: null,
    isReleased: false,
  });
  const latestRef = useRef(state);
  // Syncs latestRef with the newest render; the press and its timer read it.
  useIsomorphicLayoutEffect(() => {
    latestRef.current = state;
  });
  const [tracking] = useState(
    () =>
      new StepperTracking({
        step: half => {
          const latest = latestRef.current;
          if (latest.isDisabled || latest.isReadOnly) {
            return false;
          }
          const current = pressValueRef.current ?? latest.valueForStepping;
          const next = latest.stepFrom(current, half === 'increment' ? 1 : -1);
          if (next == null || next === current) {
            return false;
          }
          pressValueRef.current = next;
          latest.showPressValue(next);
          return true;
        },
      }),
  );
  // Stops the repeat timer when the field unmounts.
  useEffect(() => () => tracking.dispose(), [tracking]);

  const halfOf = (target: unknown): StepperHalf | null => {
    if (!(target instanceof Node)) {
      return null;
    }
    if (incrementRef.current?.contains(target) === true) {
      return 'increment';
    }
    return decrementRef.current?.contains(target) === true ? 'decrement' : null;
  };

  // Over the column, the half above or below the split. Outside the column
  // the half stays the same, so a press never crosses into the other button
  // there. With no layout, the half the press landed on.
  const halfAt = (x: number, y: number): StepperHalf => {
    const {split, box, landedOn, lastHalf} = pressRef.current;
    if (split == null || box == null) {
      return landedOn;
    }
    const isOverColumn =
      x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    if (!isOverColumn) {
      return lastHalf;
    }
    return y < split ? 'increment' : 'decrement';
  };

  // The layout reads of a press, made once at touch-down.
  const readLayout = () => {
    const decrementBox = decrementRef.current?.getBoundingClientRect();
    const split =
      decrementBox == null || decrementBox.height === 0
        ? null
        : decrementBox.top;
    return {split, box: columnRef.current?.getBoundingClientRect() ?? null};
  };

  // The pressed half paints at once and clears at once, with no fade.
  const paint = (half: StepperHalf | null) => {
    for (const [own, button] of [
      ['increment', incrementRef.current],
      ['decrement', decrementRef.current],
    ] as const) {
      const isOn = half === own;
      // Only real changes are written: an unchanged write still restyles.
      if (
        button != null &&
        isOn !== (button.getAttribute(PRESSED_ATTRIBUTE) === 'on')
      ) {
        if (isOn) {
          button.setAttribute(PRESSED_ATTRIBUTE, 'on');
        } else {
          button.removeAttribute(PRESSED_ATTRIBUTE);
        }
      }
    }
  };

  // The press ended with its lift: what it stepped to is committed, once.
  const commit = () => {
    const value = pressValueRef.current;
    pressValueRef.current = null;
    if (value != null) {
      latestRef.current.commitValue(value);
    }
    latestRef.current.showPressValue(null);
  };

  // The press was taken away: what it stepped to is dropped.
  const discard = () => {
    pressValueRef.current = null;
    latestRef.current.showPressValue(null);
  };

  // A field that turns disabled or read-only during a press lets go of it at
  // once. PressTracker reads isEnabled only when a touch begins. So nothing
  // paints beside aria-disabled, repeats or commits until the next press.
  const wasBlockedRef = useRef(false);
  useIsomorphicLayoutEffect(() => {
    const isBlocked = state.isDisabled || state.isReadOnly;
    if (isBlocked && !wasBlockedRef.current && tracking.isTracking) {
      const press = pressRef.current;
      press.isReleased = true;
      press.half = null;
      tracking.cancel();
      paint(null);
      discard();
    }
    wasBlockedRef.current = isBlocked;
  });

  const options: UsePressTrackerOptions = {
    // No trackingExpansion of its own: the press tracks within every
    // control's area (`UIKIT_CONTROL.trackingExpansion`), so a pointer that
    // trembles over the edge stays on the press. UIStepper tracks within its
    // frame only.
    //
    // A delivered press keeps its touch, as a scroll view never cancels a
    // tracking UIControl. A slide onto the other half is not the page's pan.
    keepsTouch: true,
    // A held press repeats, so it selects no text and opens no callout, for
    // that press only.
    selectionLock: lockSelection,
    isEnabled: () =>
      !latestRef.current.isDisabled && !latestRef.current.isReadOnly,
    onControlEvent: (event, touch) => {
      const press = pressRef.current;
      if (event === 'touchDown') {
        press.isReleased = false;
        liftRef.current = null;
        pressValueRef.current = null;
        const layout = readLayout();
        press.split = layout.split;
        press.box = layout.box;
        // The half the press landed on; a press on the column itself (its
        // border) takes the half above or below the split.
        press.landedOn = halfOf(touch.target) ?? halfAt(touch.x, touch.y);
        press.lastHalf = press.landedOn;
        press.half = press.landedOn;
        tracking.begin(press.half);
        return;
      }
      const isLift = event === 'touchUpInside' || event === 'touchUpOutside';
      if (press.isReleased) {
        // Let go of when the field turned disabled or read-only: nothing
        // tracks, paints or commits until the next press.
        liftRef.current = isLift ? {at: browserClock.now(), tap: null} : null;
        return;
      }
      const isInside =
        event === 'touchDragInside' ||
        event === 'touchDragEnter' ||
        event === 'touchUpInside';
      const half: StepperHalf | null = isInside
        ? halfAt(touch.x, touch.y)
        : null;
      if (half != null) {
        press.lastHalf = half;
      }
      if (event === 'touchCancel') {
        // No click follows a touch a scroll or the system took.
        liftRef.current = null;
        tracking.cancel();
        press.half = null;
        discard();
      } else if (isLift) {
        press.half = half;
        // A tap steps on the click that follows; the lift only names the
        // half.
        liftRef.current = {at: browserClock.now(), tap: tracking.end(half)};
        commit();
      } else {
        press.half = half;
        tracking.move(half);
      }
      paint(trackerRef.current?.isHighlighted === true ? press.half : null);
    },
    onHighlightChange: isHighlighted => {
      const press = pressRef.current;
      if (press.isReleased) {
        return;
      }
      if (isHighlighted) {
        // The press reaches the stepper when it lights: at once, or after a
        // scroll view's content-touch delay. The hold's clock starts then, on
        // the page's clock as the paint is, so input latency cannot shorten it.
        tracking.deliver(browserClock.now());
      }
      paint(isHighlighted ? press.half : null);
    },
  };

  const takeClick = (click: MouseEvent): StepperClick => {
    const lift = liftRef.current;
    liftRef.current = null;
    // A click a pointer sent. Where clicks are pointer events, the engine
    // names the pointer: Chrome names a tap's click 'touch' (detail 0), and
    // Safari names it 'mouse' (detail 1). Elsewhere, detail > 0. A screen
    // reader's activation, a key or click() names no pointer and has detail 0.
    const clickPointer =
      'pointerType' in click && typeof click.pointerType === 'string'
        ? click.pointerType
        : undefined;
    const isFromPointer =
      clickPointer === undefined ? click.detail > 0 : clickPointer !== '';
    // A press's click follows its lift at once. One that comes later (after
    // a hold, which the engine sends no click for) is a press of its own.
    if (
      !isFromPointer ||
      lift == null ||
      browserClock.now() - lift.at > CLICK_GUARD_WINDOW_MS
    ) {
      return 'own';
    }
    return lift.tap ?? 'none';
  };

  // A press whose steppers go away mid-hold lets go at once, as a disabled
  // field's does. The unmount detaches the press tracker, which then sends
  // no end, so nothing else would stop the repeat.
  const hadSteppersRef = useRef(state.hasSteppers);
  useIsomorphicLayoutEffect(() => {
    if (state.hasSteppers !== hadSteppersRef.current && tracking.isTracking) {
      const press = pressRef.current;
      press.isReleased = true;
      press.half = null;
      liftRef.current = null;
      tracking.cancel();
      paint(null);
      discard();
    }
    hadSteppersRef.current = state.hasSteppers;
  });

  // The tracker attaches whenever the column is mounted, for every pointer:
  // `hasNumberSteppers` can turn on after the field mounts.
  const tracker = usePressTracker(columnRef, options);
  // Syncs trackerRef with the newest tracker; the press events read its paint.
  useIsomorphicLayoutEffect(() => {
    trackerRef.current = tracker;
  });

  return {takeClick};
}
