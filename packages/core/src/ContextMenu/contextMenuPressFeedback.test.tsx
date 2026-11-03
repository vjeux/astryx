// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file contextMenuPressFeedback.test.tsx
 * @input useContextMenuPressFeedback on a trigger, with the animator replaced
 * @output Checks that the growth starts at the press machine's "on", keeps
 *   going when the press machine lets the press go, and returns when
 *   ContextMenu's recognizer ends the press with no menu, both on the theme's
 *   duration and move easing tokens
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
  play: vi.fn(() => ({finished: new Promise<boolean>(() => {})})),
  animate: vi.fn(() => ({finished: new Promise<boolean>(() => {})})),
  stop: vi.fn(),
  dispose: vi.fn(),
  get: vi.fn(() => 1),
  getVelocity: vi.fn(() => 0),
  reducedMotion: vi.fn(() => 'off'),
}));

vi.mock('../motion/animator', () => ({
  createAnimator: (element: HTMLElement) => {
    animator.element = element;
    return animator;
  },
}));

let feedback: ContextMenuPressFeedback | null = null;

function Trigger() {
  const ref = useRef<HTMLDivElement>(null);
  feedback = useContextMenuPressFeedback(ref, true);
  return <div ref={ref} data-testid="trigger" />;
}

/** Lets the shared mutation observer deliver its records. */
const flush = async () =>
  new Promise(resolve => {
    setTimeout(resolve, 0);
  });

describe('useContextMenuPressFeedback', () => {
  afterEach(() => {
    vi.clearAllMocks();
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
