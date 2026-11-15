// Copyright (c) Meta Platforms, Inc. and affiliates.

import {act, render} from '@testing-library/react';
import {createRef} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {MonthScroller, type MonthScrollerHandle} from './MonthScroller';
import {createMonthModel} from './monthGeometry';

/**
 * Reduced Motion with a mouse or trackpad as the primary pointer: the
 * policy's queries (motion/reducedMotion.ts) match, and the coarse pointer
 * does not. A coarse primary pointer gets MonthPager, not this scroller.
 */
function stubReducedMotionFinePointer(): void {
  vi.stubGlobal('matchMedia', (query: string) => {
    // A query that needs a coarse pointer fails. Its negation passes.
    const needsCoarse = /\(pointer:\s*coarse\)/.test(
      query.replace(/not\s*\(pointer:\s*coarse\)/g, ''),
    );
    return {
      matches: !needsCoarse && query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  });
}

class FakeResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  observe() {
    this.callback([], this);
  }
  unobserve() {}
  disconnect() {}
}

describe('MonthScroller under Reduced Motion with a mouse or trackpad', () => {
  const scrollTo = vi.fn();
  const animate = vi.fn();
  beforeEach(() => {
    vi.useFakeTimers();
    stubReducedMotionFinePointer();
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(300);
    Element.prototype.scrollTo = scrollTo;
    Element.prototype.animate = animate;
    // mockReset, not mockClear: a test's implementation must not outlive it.
    scrollTo.mockReset();
    animate.mockReset();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function renderScroller({
    onVisibleMonthChange = () => {},
  }: {onVisibleMonthChange?: (monthIndex: number) => void} = {}) {
    const handleRef = createRef<MonthScrollerHandle>();
    const view = render(
      <MonthScroller
        handleRef={handleRef}
        monthModel={createMonthModel('gregory')}
        minMonthIndex={0}
        maxMonthIndex={23}
        initialMonthIndex={9}
        onVisibleMonthChange={onVisibleMonthChange}
        selectedDate={null}
        today={{year: 2026, month: 10, day: 15}}
        isDateDisabled={() => false}
        weekStartsOn={0}
        onSelect={() => {}}
      />,
    );
    scrollTo.mockClear();
    return {handleRef, ...view};
  }

  it('lands a step at once, with no travel and no animation', () => {
    const {handleRef} = renderScroller();
    act(() => handleRef.current?.scrollToMonth(10));
    expect(scrollTo.mock.calls).toEqual([[{left: 10 * 300, behavior: 'auto'}]]);
    expect(animate).not.toHaveBeenCalled();
  });

  it('reports a trackpad scroll after a step lands, even with an earlier steer that never arrived', () => {
    const onVisibleMonthChange = vi.fn();
    const {handleRef, container} = renderScroller({onVisibleMonthChange});
    const scroller = container.querySelector<HTMLElement>(
      '[data-scroller="months"]',
    );
    if (scroller == null) {
      throw new Error('no scroller');
    }
    // The re-assert when the wheels close: a steer to the month already in
    // view, whose scroll never arrives.
    act(() => handleRef.current?.scrollToMonth(9, 'auto'));
    // A step lands at once.
    act(() => handleRef.current?.scrollToMonth(10));
    // A trackpad scroll on to the next month: no touch ends the steer.
    act(() => {
      scroller.scrollLeft = 11 * 300;
      scroller.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(50);
    });
    expect(onVisibleMonthChange).toHaveBeenLastCalledWith(11);
  });
});
