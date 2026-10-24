// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useRefreshControl.test.tsx
 * @input vitest (jsdom), useRefreshControl on a minimal structure (content,
 *   indicator, spinner), touch events dispatched on its content, a
 *   matchMedia stand-in for a touch screen
 * @output Covers the pull (UIKit's mapping, trigger with the finger down,
 *   release onto the inset or back to the top), the end, controlled and
 *   programmatic refreshes, the announcement, the touch-only gate, the
 *   disabled state, the scroll-lock stand-down and the top-edge overscroll
 *   policy on the page and on a scroll container
 * @position Testing; colocated with useRefreshControl.ts. Motion itself is
 *   checked in a real browser (the RefreshControl interaction spec and its
 *   storyboards)
 */

import type {ReactNode} from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import {useScrollLock} from '@astryxdesign/core/hooks';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  useRefreshControl,
  type UseRefreshControlOptions,
} from './useRefreshControl';

/** The structure the hook drives: pulled content, an indicator, a spinner. */
function Refreshable({
  children,
  'data-testid': testId,
  ...options
}: UseRefreshControlOptions & {children: ReactNode; 'data-testid'?: string}) {
  const control = useRefreshControl(options);
  return (
    <div
      data-testid={testId}
      ref={control.contentRef}
      aria-busy={control.isRefreshing || undefined}>
      <div ref={control.indicatorRef} aria-hidden>
        <span ref={control.spinnerRef} />
      </div>
      {children}
    </div>
  );
}

const COARSE = /\(\s*pointer\s*:\s*coarse\s*\)/;
let originalMatchMedia: typeof window.matchMedia;
let originalInnerHeight: number;

function useTouchScreen(isTouch: boolean): void {
  window.matchMedia = (query: string) =>
    ({
      matches: isTouch && COARSE.test(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

let clock = 0;
function touch(
  type: string,
  target: EventTarget,
  y: number,
  isLift = false,
): void {
  clock += 16;
  const event = new Event(type, {bubbles: true, cancelable: true});
  const entry = {identifier: 1, clientX: 100, clientY: y, target};
  Object.defineProperty(event, 'changedTouches', {value: [entry]});
  Object.defineProperty(event, 'touches', {value: isLift ? [] : [entry]});
  Object.defineProperty(event, 'timeStamp', {value: clock});
  act(() => {
    target.dispatchEvent(event);
  });
}

/** A one-finger drag from y 100 down by each step in turn. */
function pull(target: EventTarget, steps: number[], lift = true): void {
  let y = 100;
  touch('touchstart', target, y);
  for (const step of steps) {
    y += step;
    touch('touchmove', target, y);
  }
  if (lift) {
    touch('touchend', target, y, true);
  }
}

function translateY(element: HTMLElement): number {
  const value = element.style.getPropertyValue('translate');
  if (value === '' || value === 'none') {
    return 0;
  }
  const parts = value.trim().split(/\s+/);
  return parseFloat(parts[1] ?? '0');
}

function content(): HTMLElement {
  return screen.getByTestId('refresh');
}

describe('useRefreshControl', () => {
  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    originalInnerHeight = window.innerHeight;
    useTouchScreen(true);
    // The page as tall as the scroll view UIKit's frames were measured on:
    // the trigger distance is then UIKit's floor, 73 px of overscroll.
    Object.defineProperty(window, 'innerHeight', {
      value: 334,
      configurable: true,
    });
    clock = 0;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true,
    });
    document.documentElement.style.overscrollBehaviorY = '';
  });

  it('pulls the content as UIKit does: one to one past the hysteresis, up to the height', () => {
    render(
      <Refreshable data-testid="refresh" onRefresh={() => {}}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [12, 8, 20], false);
    // 40 px of finger travel, 10 of them the pan's hysteresis.
    expect(translateY(content())).toBeCloseTo(30, 5);
    touch('touchmove', content(), 170);
    expect(translateY(content())).toBeCloseTo(60, 5);
    touch('touchend', content(), 170, true);
  });

  it('triggers with the finger still down, then settles onto the refreshing inset', async () => {
    const onRefresh = vi.fn(() => new Promise<void>(() => {}));
    render(
      <Refreshable data-testid="refresh" onRefresh={onRefresh}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [20, 20, 20, 20], false);
    expect(onRefresh).not.toHaveBeenCalled();
    // 105 px of travel: past the trigger (73 px of overscroll).
    touch('touchmove', content(), 205);
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(content()).toHaveAttribute('aria-busy', 'true');
    expect(translateY(content())).toBeGreaterThan(74);
    expect(translateY(content())).toBeLessThan(95);
    // The next frame snaps to one to one with the finger, as UIKit does.
    touch('touchmove', content(), 210);
    expect(translateY(content())).toBeCloseTo(100, 5);
    touch('touchend', content(), 210, true);
    // jsdom has no compositor: the settle lands on its target at once.
    expect(translateY(content())).toBeCloseTo(60, 5);
    await waitFor(() => expect(document.body).toHaveTextContent('Refreshing'));
  });

  it('gives the content its own layer while it can move, and takes it back at rest', async () => {
    let resolve: () => void = () => {};
    render(
      <Refreshable
        data-testid="refresh"
        onRefresh={() =>
          new Promise<void>(done => {
            resolve = done;
          })
        }>
        <p>Inbox</p>
      </Refreshable>,
    );
    const willChange = () => content().style.willChange;
    // A tap at the top: promoted on the touch, demoted when no pull follows.
    touch('touchstart', content(), 100);
    expect(willChange()).toBe('translate');
    touch('touchend', content(), 100, true);
    expect(willChange()).toBe('');
    // A pull that refreshes keeps the layer until the end has run.
    pull(content(), [30, 30, 30, 30]);
    expect(willChange()).toBe('translate');
    await act(async () => {
      resolve();
    });
    await waitFor(() => expect(willChange()).toBe(''));
  });

  it('turns the spinner at the trigger, never the indicator holding it', () => {
    render(
      <Refreshable
        data-testid="refresh"
        onRefresh={() => new Promise<void>(() => {})}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [30, 30, 30, 30]);
    const indicator = content().firstElementChild as HTMLElement;
    const spinner = indicator.firstElementChild as HTMLElement;
    expect(spinner.style.getPropertyValue('rotate')).not.toBe('');
    expect(indicator.style.getPropertyValue('rotate')).toBe('');
  });

  it('turns text selection off on the content while a finger pulls, then restores it', () => {
    render(
      <Refreshable data-testid="refresh" onRefresh={() => {}}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [20, 20], false);
    expect(content().style.getPropertyValue('user-select')).toBe('none');
    touch('touchend', content(), 140, true);
    expect(content().style.getPropertyValue('user-select')).toBe('');
  });

  it('settles back to the top without refreshing below the trigger', () => {
    const onRefresh = vi.fn();
    render(
      <Refreshable data-testid="refresh" onRefresh={onRefresh}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [20, 20, 20, 10]);
    expect(onRefresh).not.toHaveBeenCalled();
    expect(translateY(content())).toBe(0);
    expect(content()).not.toHaveAttribute('aria-busy');
  });

  it('ends when the promise from onRefresh settles, and removes the inset', async () => {
    let resolve: () => void = () => {};
    const onRefresh = vi.fn(
      () =>
        new Promise<void>(done => {
          resolve = done;
        }),
    );
    render(
      <Refreshable data-testid="refresh" onRefresh={onRefresh}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [30, 30, 30, 30]);
    expect(content()).toHaveAttribute('aria-busy', 'true');
    await act(async () => {
      resolve();
    });
    expect(content()).not.toHaveAttribute('aria-busy');
    expect(translateY(content())).toBe(0);
  });

  it('ends after a rejected refresh as well', async () => {
    let reject: () => void = () => {};
    render(
      <Refreshable
        data-testid="refresh"
        onRefresh={() =>
          new Promise<void>((_, fail) => {
            reject = () => fail(new Error('offline'));
          })
        }>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [30, 30, 30, 30]);
    await act(async () => {
      reject();
    });
    expect(content()).not.toHaveAttribute('aria-busy');
  });

  it('follows a controlled isRefreshing without calling onRefresh for it', () => {
    const onRefresh = vi.fn();
    const {rerender} = render(
      <Refreshable
        data-testid="refresh"
        onRefresh={onRefresh}
        isRefreshing={false}>
        <p>Inbox</p>
      </Refreshable>,
    );
    rerender(
      <Refreshable data-testid="refresh" onRefresh={onRefresh} isRefreshing>
        <p>Inbox</p>
      </Refreshable>,
    );
    expect(content()).toHaveAttribute('aria-busy', 'true');
    expect(onRefresh).not.toHaveBeenCalled();
    rerender(
      <Refreshable
        data-testid="refresh"
        onRefresh={onRefresh}
        isRefreshing={false}>
        <p>Inbox</p>
      </Refreshable>,
    );
    expect(content()).not.toHaveAttribute('aria-busy');
  });

  it('keeps a controlled refresh running until the app ends it', () => {
    const onRefresh = vi.fn();
    render(
      <Refreshable
        data-testid="refresh"
        onRefresh={onRefresh}
        isRefreshing={false}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [30, 30, 30, 30]);
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(content()).toHaveAttribute('aria-busy', 'true');
  });

  it('does not pull under a mouse or trackpad', () => {
    useTouchScreen(false);
    const onRefresh = vi.fn();
    render(
      <Refreshable data-testid="refresh" onRefresh={onRefresh}>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [30, 30, 30, 30]);
    expect(onRefresh).not.toHaveBeenCalled();
    expect(translateY(content())).toBe(0);
    expect(document.documentElement.style.overscrollBehaviorY).toBe('');
  });

  it('does not pull while disabled', () => {
    const onRefresh = vi.fn();
    render(
      <Refreshable data-testid="refresh" onRefresh={onRefresh} isDisabled>
        <p>Inbox</p>
      </Refreshable>,
    );
    pull(content(), [30, 30, 30, 30]);
    expect(onRefresh).not.toHaveBeenCalled();
    expect(translateY(content())).toBe(0);
  });

  it('stands down while a scroll lock holds the page', () => {
    const onRefresh = vi.fn();
    function Locked({isLocked}: {isLocked: boolean}) {
      useScrollLock(isLocked);
      return null;
    }
    const {rerender} = render(
      <>
        <Locked isLocked={false} />
        <Refreshable data-testid="refresh" onRefresh={onRefresh}>
          <p>Inbox</p>
        </Refreshable>
      </>,
    );
    expect(document.documentElement.style.overscrollBehaviorY).toBe('none');
    rerender(
      <>
        <Locked isLocked />
        <Refreshable data-testid="refresh" onRefresh={onRefresh}>
          <p>Inbox</p>
        </Refreshable>
      </>,
    );
    expect(document.documentElement.style.overscrollBehaviorY).toBe('');
    pull(content(), [30, 30, 30, 30]);
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('owns the page’s top edge while mounted on a touch screen, then gives it back', () => {
    document.documentElement.style.overscrollBehaviorY = 'auto';
    const {unmount} = render(
      <Refreshable data-testid="refresh" onRefresh={() => {}}>
        <p>Inbox</p>
      </Refreshable>,
    );
    expect(document.documentElement.style.overscrollBehaviorY).toBe('none');
    unmount();
    expect(document.documentElement.style.overscrollBehaviorY).toBe('auto');
  });

  it('owns the top edge of the scroll container it sits in, not the page’s', () => {
    const {unmount} = render(
      <div
        data-testid="scroller"
        style={{overflowY: 'auto', overscrollBehaviorY: 'contain'}}>
        <Refreshable data-testid="refresh" onRefresh={() => {}}>
          <p>Inbox</p>
        </Refreshable>
      </div>,
    );
    const scroller = screen.getByTestId('scroller');
    expect(scroller.style.overscrollBehaviorY).toBe('none');
    expect(document.documentElement.style.overscrollBehaviorY).toBe('');
    unmount();
  });

  it('restores the scroll container’s own value when it unmounts', () => {
    function Host({hasControl}: {hasControl: boolean}) {
      return (
        <div data-testid="scroller" style={{overflowY: 'auto'}}>
          {hasControl ? (
            <Refreshable data-testid="refresh" onRefresh={() => {}}>
              <p>Inbox</p>
            </Refreshable>
          ) : (
            <p>Inbox</p>
          )}
        </div>
      );
    }
    const {rerender} = render(<Host hasControl />);
    const scroller = screen.getByTestId('scroller');
    expect(scroller.style.overscrollBehaviorY).toBe('none');
    rerender(<Host hasControl={false} />);
    expect(scroller.style.overscrollBehaviorY).toBe('');
  });
});
