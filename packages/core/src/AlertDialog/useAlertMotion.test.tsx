// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useAlertMotion.test.tsx
 * @input A component using useAlertMotion, with the dialog's CSS animations
 *   replaced by stand-ins that end when the test says so
 * @output The hook's state contract: the touch look's styles, the start
 *   scale, touches refused until the entrance ends, an exit that keeps the
 *   alert presented until its end or closes at once at 0 ms, the backstop, a
 *   reopen mid-exit, and a disabled hook that follows the caller
 * @position jsdom tests of packages/core/src/AlertDialog/useAlertMotion.ts
 */

import {act, render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  SCALE_FROM_PROPERTY,
  useAlertMotion,
  type AlertMotion,
} from './useAlertMotion';

/** A CSS animation stand-in that ends when `end` runs. */
interface StandIn {
  animation: Animation;
  end: () => void;
}

function standIn(endTime: number): StandIn {
  let end: () => void = () => {};
  const finished = new Promise<Animation>(resolve => {
    end = () => resolve(animation);
  });
  const animation = {
    finished,
    effect: {getComputedTiming: () => ({endTime})},
  } as unknown as Animation;
  return {animation, end};
}

/** What the dialog's `getAnimations()` returns next. */
let running: StandIn[] = [];
let latest: AlertMotion | null = null;

function Alert({isOpen, isEnabled}: {isOpen: boolean; isEnabled: boolean}) {
  const motion = useAlertMotion({isOpen, isEnabled});
  latest = motion;
  return (
    <div
      ref={element => {
        if (element != null) {
          element.getAnimations = () => running.map(r => r.animation);
          Object.defineProperty(element, 'offsetWidth', {
            configurable: true,
            value: 320,
          });
        }
        motion.ref(element);
      }}
      data-testid="alert"
    />
  );
}

const motion = (): AlertMotion => {
  if (latest == null) {
    throw new Error('not rendered');
  }
  return latest;
};

/** Lets the stand-ins' ends reach the hook. */
const settle = async () => {
  await act(async () => {});
};

beforeEach(() => {
  running = [];
  latest = null;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useAlertMotion', () => {
  it('takes the touch entrance when it opens, from a start scale that stays inside the viewport', () => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 360,
    });
    const view = render(<Alert isOpen isEnabled />);
    expect(motion().look).toBe('entrance');
    expect(motion().isPresented).toBe(true);
    // 360 / 320: the 1.2 start would pass the viewport's edges.
    expect(
      view.getByTestId('alert').style.getPropertyValue(SCALE_FROM_PROPERTY),
    ).toBe(String(360 / 320));
  });

  it('refuses touches until the entrance ends', async () => {
    const entrance = standIn(550);
    running = [entrance];
    render(<Alert isOpen isEnabled />);
    expect(motion().acceptsTouches()).toBe(false);
    entrance.end();
    await settle();
    expect(motion().acceptsTouches()).toBe(true);
  });

  it('takes touches at once when the page runs no entrance', async () => {
    render(<Alert isOpen isEnabled />);
    await settle();
    expect(motion().acceptsTouches()).toBe(true);
  });

  it('closes at once when the exit is 0 ms', async () => {
    running = [];
    const view = render(<Alert isOpen isEnabled />);
    await settle();
    running = [standIn(0)];
    view.rerender(<Alert isOpen={false} isEnabled />);
    expect(motion().isPresented).toBe(false);
    expect(motion().isLeaving).toBe(false);
  });

  it('stays presented while the exit plays, refuses touches, and closes at its end', async () => {
    const view = render(<Alert isOpen isEnabled />);
    await settle();
    const exit = standIn(300);
    running = [exit];
    view.rerender(<Alert isOpen={false} isEnabled />);
    expect(motion().look).toBe('exit');
    expect(motion().isLeaving).toBe(true);
    expect(motion().isPresented).toBe(true);
    expect(motion().acceptsTouches()).toBe(false);
    exit.end();
    await settle();
    expect(motion().isPresented).toBe(false);
  });

  it('closes once the exit has had its time when its end is never reported', async () => {
    vi.useFakeTimers();
    const view = render(<Alert isOpen isEnabled />);
    await settle();
    running = [standIn(300)];
    view.rerender(<Alert isOpen={false} isEnabled />);
    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(motion().isPresented).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(motion().isPresented).toBe(false);
  });

  it('returns to rest at once when reopened mid-exit, and takes touches', async () => {
    const view = render(<Alert isOpen isEnabled />);
    await settle();
    running = [standIn(300)];
    view.rerender(<Alert isOpen={false} isEnabled />);
    view.rerender(<Alert isOpen isEnabled />);
    expect(motion().look).toBe('settled');
    expect(motion().isLeaving).toBe(false);
    expect(motion().acceptsTouches()).toBe(true);
  });

  it('does nothing when disabled: no touch style, touches at once, and it closes with the caller', () => {
    running = [standIn(550)];
    const view = render(<Alert isOpen isEnabled={false} />);
    expect(motion().look).toBe('none');
    expect(motion().acceptsTouches()).toBe(true);
    view.rerender(<Alert isOpen={false} isEnabled={false} />);
    expect(motion().isPresented).toBe(false);
  });

  it('leaves no timer behind when unmounted mid-exit', async () => {
    vi.useFakeTimers();
    const view = render(<Alert isOpen isEnabled />);
    await settle();
    running = [standIn(300)];
    view.rerender(<Alert isOpen={false} isEnabled />);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
