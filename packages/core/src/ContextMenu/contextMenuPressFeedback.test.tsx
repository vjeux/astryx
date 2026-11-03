// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file contextMenuPressFeedback.test.tsx
 * @input useContextMenuPressFeedback on a trigger, with the animator replaced
 * @output Checks that the growth starts at the press machine's "on" and
 *   keeps going when the machine lets the press go. It returns when
 *   ContextMenu's recognizer ends the press with no menu. Both play the
 *   theme's duration and move easing tokens
 * @position Unit tests of packages/core/src/ContextMenu/contextMenuPressFeedback.ts
 */

import {render} from '@testing-library/react';
import {useRef} from 'react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import type {MotionCurve} from '../motion/animator';
import {contextMenu} from '../motion/uikit/contextMenu';
import {PRESSED_ATTRIBUTE} from '../utils/pressFeedback';
import {
  useContextMenuPressFeedback,
  type ContextMenuPressFeedback,
} from './contextMenuPressFeedback';

const animator = vi.hoisted(() => ({
  element: null as HTMLElement | null,
  /** The element each play ran on, in order. */
  played: [] as HTMLElement[],
  play: vi.fn((..._args: unknown[]) => ({
    finished: new Promise<boolean>(() => {}),
  })),
  animate: vi.fn(() => ({finished: new Promise<boolean>(() => {})})),
  stop: vi.fn(),
  dispose: vi.fn(),
  get: vi.fn(() => 1),
  getVelocity: vi.fn(() => 0),
  reducedMotion: vi.fn(() => 'off'),
}));

vi.mock('../motion/animator', () => ({
  createMotionAnimator: (element: HTMLElement) => {
    animator.element = element;
    return {
      ...animator,
      play: (...args: unknown[]) => {
        animator.played.push(element);
        return animator.play(...args);
      },
    };
  },
}));

let feedback: ContextMenuPressFeedback | null = null;

function Trigger() {
  const ref = useRef<HTMLDivElement>(null);
  feedback = useContextMenuPressFeedback(ref, true);
  return <div ref={ref} data-testid="trigger" />;
}

/** A trigger whose content is a pressable control, as a Button is. */
function TriggerWithControl() {
  const ref = useRef<HTMLDivElement>(null);
  feedback = useContextMenuPressFeedback(ref, true);
  return (
    <div ref={ref} data-testid="trigger">
      <button type="button" data-testid="control">
        Open
      </button>
    </div>
  );
}

/** A trigger inside another trigger, beside a plain control of the outer one. */
function NestedTriggers({isInnerShown = true}: {isInnerShown?: boolean}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useContextMenuPressFeedback(outerRef, true);
  useContextMenuPressFeedback(innerRef, isInnerShown);
  return (
    <div ref={outerRef} data-testid="outer">
      <button type="button" data-testid="outer-control">
        Outer
      </button>
      <div ref={innerRef} data-testid="inner" />
    </div>
  );
}

/** Lets the shared mutation observer deliver its records. */
const flush = async () =>
  new Promise(resolve => {
    setTimeout(resolve, 0);
  });

describe('useContextMenuPressFeedback', () => {
  afterEach(() => {
    vi.clearAllMocks();
    animator.played.length = 0;
    feedback = null;
  });

  it('keeps growing when the press machine lets the press go, and springs back when the recognizer ends it', async () => {
    const {getByTestId} = render(<Trigger />);
    const trigger = getByTestId('trigger');
    trigger.setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    expect(animator.play).toHaveBeenCalledOnce();
    // The press machine's slop is shorter than the recognizer's tolerance.
    trigger.removeAttribute(PRESSED_ATTRIBUTE);
    await flush();
    expect(animator.play).toHaveBeenCalledOnce();
    feedback?.end(performance.now());
    expect(animator.play).toHaveBeenCalledTimes(2);
  });

  it('grows when the press machine marks a pressable control inside the trigger, the innermost surface it marks', async () => {
    const {getByTestId} = render(<TriggerWithControl />);
    getByTestId('control').setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    expect(animator.play).toHaveBeenCalledOnce();
    getByTestId('control').removeAttribute(PRESSED_ATTRIBUTE);
    await flush();
    expect(animator.play).toHaveBeenCalledOnce();
  });

  it('grows only the innermost trigger when one trigger sits inside another', async () => {
    const {getByTestId} = render(<NestedTriggers />);
    getByTestId('inner').setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    expect(animator.played).toEqual([getByTestId('inner')]);
    getByTestId('inner').removeAttribute(PRESSED_ATTRIBUTE);
    await flush();
    getByTestId('outer-control').setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    expect(animator.played).toEqual([
      getByTestId('inner'),
      getByTestId('outer'),
    ]);
  });

  it('grows no outer trigger for a press on a nested trigger that shows no growth', async () => {
    const {getByTestId} = render(<NestedTriggers isInnerShown={false} />);
    getByTestId('inner').setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    expect(animator.played).toEqual([]);
  });

  it('grows toward the held scale over the theme’s medium duration and move easing', async () => {
    const {getByTestId} = render(<Trigger />);
    const trigger = getByTestId('trigger');
    trigger.style.setProperty('--duration-medium', '600ms');
    trigger.style.setProperty('--ease-move', 'linear');
    trigger.setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    const [curves] = animator.play.mock.lastCall as unknown as [
      {scale: MotionCurve},
    ];
    const held = contextMenu.press.heldScale;
    expect(curves.scale.duration).toBeCloseTo(0.6);
    expect(curves.scale.at(0.3)).toBeCloseTo(1 + (held - 1) / 2);
    expect(curves.scale.at(0.6)).toBeCloseTo(held);
  });

  it('returns over the theme’s fast duration and move easing, at the time the recognizer ended the press', async () => {
    const {getByTestId} = render(<Trigger />);
    const trigger = getByTestId('trigger');
    trigger.style.setProperty('--duration-fast', '200ms');
    trigger.style.setProperty('--ease-move', 'linear');
    trigger.setAttribute(PRESSED_ATTRIBUTE, 'on');
    await flush();
    feedback?.end(1000);
    const [curves, options] = animator.play.mock.lastCall as unknown as [
      {scale: MotionCurve},
      {at: number},
    ];
    expect(options).toEqual({at: 1000});
    expect(curves.scale.duration).toBeCloseTo(0.2);
    expect(curves.scale.at(0.2)).toBeCloseTo(1);
  });
});
