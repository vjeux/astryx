// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useTreeExpansionMotion.test.tsx
 * @input vitest, TreeList, a stubbed pointer (a coarse primary pointer, or a
 *   mouse), a stubbed theme timing and a recording animator
 * @output Unit tests for the expansion's presence and slide rules: who
 *   slides, on which timing, and what never moves
 * @position Beside TreeList/useTreeExpansionMotion.ts. The motion itself is
 *   proven in a real engine by
 *   TreeList/__tests__/TreeListExpand.interaction.browser.spec.ts.
 */

import {useRef} from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {TreeList} from './TreeList';
import {useAnimatedLayout} from '../hooks/useAnimatedLayout';
import type {TreeListItemData} from './TreeListTypes';
import type * as AnimatorModule from '../motion/animator';
import type {MotionCurve} from '../motion/animator';
import {cubicBezier} from '../motion/bezier';
import {parseCssEasing, parseMotionRoleValue} from '../motion/roles';
import * as themeTiming from '../motion/themeTiming';
import {durationDefaults, easeDefaults} from '../theme/tokens.stylex';

/** The theme's timing in this test: the duration and easing tokens read. */
const TIMING = {seconds: 0.175, ease: (progress: number) => progress};

/** Every curve played through the shared animators, by element. */
const plays = vi.hoisted(
  () =>
    [] as {
      element: HTMLElement;
      property: string;
      from: number;
      to: number;
      seconds: number;
      curve: MotionCurve;
    }[],
);
/** The elements whose timing the expansion read. */
const timed = vi.hoisted(() => [] as Element[]);

vi.mock('../motion/animator', async importOriginal => {
  const actual = await importOriginal<typeof AnimatorModule>();
  return {
    ...actual,
    animatorFor: (element: HTMLElement) => {
      const animator = actual.animatorFor(element);
      const play = animator.play.bind(animator);
      animator.play = (curves, options) => {
        for (const [property, curve] of Object.entries(curves)) {
          if (curve != null) {
            plays.push({
              element,
              property,
              from: curve.at(0),
              to: curve.at(curve.duration),
              seconds: curve.duration,
              curve,
            });
          }
        }
        return play(curves, options);
      };
      return animator;
    },
  };
});

/** The tokens the expansion read its timing from. */
const tokens = vi.hoisted(() => [] as unknown[]);

vi.mock('../motion/themeTiming', async importOriginal => {
  const actual = await importOriginal<typeof themeTiming>();
  return {
    ...actual,
    readThemeTiming: (
      element: Element,
      read: Parameters<typeof actual.readThemeTiming>[1],
    ) => {
      timed.push(element);
      tokens.push(read);
      return actual.easedProgress(TIMING.seconds, TIMING.ease);
    },
  };
});

/** Whether a curve was played on `element`. */
const played = (element: Element | null) =>
  element != null && plays.some(entry => entry.element === element);

/** Each group's height in the stubbed layout. */
const GROUP_HEIGHT = 40;

/**
 * jsdom lays nothing out. So an element sits one group's height lower for
 * each laid-out group before it in the document. A `pinned` element never
 * moves, like a footer held at the bottom of its column.
 */
function stubLayout() {
  vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(
    function (this: HTMLElement) {
      if (this.hasAttribute('data-pinned')) {
        return 500;
      }
      let top = 0;
      for (const laid of document.querySelectorAll<HTMLElement>(
        '[role="group"]',
      )) {
        if (
          laid.style.display !== 'none' &&
          !laid.contains(this) &&
          (laid.compareDocumentPosition(this) &
            Node.DOCUMENT_POSITION_FOLLOWING) !==
            0
        ) {
          top += GROUP_HEIGHT;
        }
      }
      return top;
    },
  );
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(
    function (this: HTMLElement) {
      return this.getAttribute('role') === 'group' ? GROUP_HEIGHT : 0;
    },
  );
}

const items: TreeListItemData[] = [
  {
    id: 'components',
    label: 'components',
    isExpanded: true,
    children: [
      {id: 'button', label: 'Button.tsx'},
      {id: 'card', label: 'Card.tsx'},
    ],
  },
  {id: 'app', label: 'App.tsx'},
];

/**
 * The page under a finger (a coarse primary pointer: one touch model) or a
 * mouse.
 */
function stubPointer(pointer: 'touch' | 'mouse') {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: pointer === 'touch' && query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  plays.length = 0;
  timed.length = 0;
  tokens.length = 0;
});

const row = (id: string) =>
  document.querySelector<HTMLElement>(`[data-tree-id="${id}"]`);
const group = () =>
  row('components')?.querySelector<HTMLElement>(':scope > [role="group"]') ??
  null;
const toggle = () =>
  row('components')?.querySelector<HTMLElement>(
    ':scope > :not([role="group"]) [data-tree-toggle]',
  ) ?? null;

describe('the touch presentation, read once per tree', () => {
  it('adds no touch observer per row: a tree of many rows listens as one of few', () => {
    const listeners = {count: 0};
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {
          listeners.count += 1;
        },
        removeEventListener: () => undefined,
        addListener: () => {
          listeners.count += 1;
        },
        removeListener: () => undefined,
        dispatchEvent: () => false,
      })),
    );
    const many = Array.from({length: 30}, (_, index) => ({
      id: `row-${index}`,
      label: `Row ${index}`,
    }));
    const {unmount} = render(<TreeList items={many.slice(0, 2)} />);
    const few = listeners.count;
    unmount();
    listeners.count = 0;
    render(<TreeList items={many} />);
    expect(listeners.count).toBe(few);
  });
});

const collapsed: TreeListItemData[] = [
  {
    id: 'components',
    label: 'components',
    children: [
      {id: 'button', label: 'Button.tsx'},
      {id: 'card', label: 'Card.tsx'},
    ],
  },
  {id: 'app', label: 'App.tsx'},
];

function Page() {
  return (
    <div>
      <TreeList items={collapsed} />
      <p data-testid="below">Below the tree</p>
    </div>
  );
}

describe('TreeList expansion', () => {
  it('under a finger, an expand slides each of the group’s rows down from the group’s height above, on the theme’s timing, inside the group’s clip', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Present first: the group and both of its rows.
    expect(group()).not.toBeNull();
    const button = row('button') as HTMLElement;
    const card = row('card') as HTMLElement;
    expect(button).not.toBeNull();
    expect(card).not.toBeNull();
    // The timing is the theme's, read where the group is.
    expect(timed).toContain(group());
    for (const child of [button, card]) {
      expect(
        plays
          .filter(entry => entry.element === child)
          .map(({curve: _curve, ...entry}) => entry),
        child.textContent ?? '',
      ).toEqual([
        {
          element: child,
          property: 'y',
          from: -GROUP_HEIGHT,
          to: 0,
          seconds: TIMING.seconds,
        },
      ]);
    }
    expect(group()?.style.overflow).toBe('clip');
  });

  it('under a finger, the chevron takes no motion of its own: it turns on its CSS transition', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    const chevron = toggle()?.querySelector('svg') ?? null;
    // Present first: the chevron, and the slide that did play.
    expect(chevron).not.toBeNull();
    expect(played(row('button'))).toBe(true);
    expect(played(chevron)).toBe(false);
    fireEvent.click(toggle() as HTMLElement);
    expect(played(chevron)).toBe(false);
  });

  it('with a mouse, an expand and a collapse show and remove the children at once', async () => {
    stubPointer('mouse');
    expect(matchMedia('(pointer: coarse)').matches).toBe(false);
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Present first: the group a mouse expanded at once.
    expect(group()).not.toBeNull();
    expect(row('button')).not.toBeNull();
    expect(plays).toEqual([]);
    fireEvent.click(toggle() as HTMLElement);
    expect(group()).toBeNull();
  });

  it('under a finger, a collapse removes the children at the tap, so the rows after take their places at once', async () => {
    stubPointer('touch');
    render(<TreeList items={items} />);
    await act(async () => undefined);
    // Present first: the expanded group and its rows.
    expect(group()).not.toBeNull();
    expect(row('button')).not.toBeNull();
    expect(row('card')).not.toBeNull();
    fireEvent.click(toggle() as HTMLElement);
    expect(row('components')).toHaveAttribute('aria-expanded', 'false');
    // Gone at the tap: nothing holds the rows after the group in place.
    expect(group()).toBeNull();
    const components = row('components') as HTMLElement;
    components.focus();
    fireEvent.keyDown(components, {key: 'ArrowDown'});
    expect(document.activeElement).toBe(row('app'));
  });

  it('under a finger, a collapse mid-expand removes the children at once', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Expanding: the group is there, its block sliding out.
    expect(row('components')).toHaveAttribute('aria-expanded', 'true');
    expect(group()).not.toBeNull();
    expect(played(row('button'))).toBe(true);
    fireEvent.click(toggle() as HTMLElement);
    expect(row('components')).toHaveAttribute('aria-expanded', 'false');
    expect(group()).toBeNull();
    expect(screen.queryByText('Card.tsx')).toBeNull();
  });

  it('reads the chevron’s tokens: the slide plays their duration and easing, as the chevron’s transition does', async () => {
    stubPointer('touch');
    stubLayout();
    const actual = await vi.importActual<typeof themeTiming>(
      '../motion/themeTiming',
    );
    vi.spyOn(themeTiming, 'readThemeTiming').mockImplementation(
      (element, read) => {
        tokens.push(read);
        return actual.readThemeTiming(element, read);
      },
    );
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    expect(tokens).toEqual([
      {durations: ['--duration-fast'], easing: '--ease-standard'},
    ]);
    // jsdom sets no theme, so the tokens give their defaults.
    const ms = parseMotionRoleValue(
      'duration',
      durationDefaults['--duration-fast'],
    );
    const points = parseCssEasing(easeDefaults['--ease-standard']);
    if (ms == null || points == null) {
      throw new Error('unreadable token defaults');
    }
    const ease = cubicBezier(points);
    const slide = plays.find(entry => entry.element === row('button'));
    expect(slide?.seconds).toBeCloseTo(ms / 1000, 6);
    for (const t of [0.25, 0.5, 0.75]) {
      expect(slide?.curve.at((t * ms) / 1000)).toBeCloseTo(
        -GROUP_HEIGHT * (1 - ease(t)),
        6,
      );
    }
  });

  it('plays no slide when the theme sets a zero duration', async () => {
    stubPointer('touch');
    stubLayout();
    vi.spyOn(themeTiming, 'readThemeTiming').mockImplementation(() =>
      themeTiming.easedProgress(0, progress => progress),
    );
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Present first: the group, shown at once.
    expect(group()).not.toBeNull();
    expect(row('button')).not.toBeNull();
    expect(plays).toEqual([]);
    expect(group()?.style.overflow).toBe('');
  });
});

describe('with an animated-layout handle', () => {
  function WithHandle() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animatedLayout = useAnimatedLayout({containerRef});
    return (
      <div ref={containerRef}>
        <TreeList items={collapsed} animatedLayout={animatedLayout} />
      </div>
    );
  }

  it('under a finger, the row plays no slide of its own: the handle plays the group under every pointer', async () => {
    stubPointer('touch');
    stubLayout();
    render(<WithHandle />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Present first: the expanded group and its rows.
    expect(group()).not.toBeNull();
    expect(row('button')).not.toBeNull();
    expect(timed).toEqual([]);
    expect(played(row('button'))).toBe(false);
  });
});

describe('content after the tree', () => {
  it('is never moved by an expansion, nor are the rows after the group: they take their places by layout', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Present first: the group's row, the row after the group and the
    // content after the tree.
    expect(row('button')).not.toBeNull();
    expect(row('app')).not.toBeNull();
    const below = screen.getByTestId('below');
    expect(below).toBeInTheDocument();
    expect(played(row('button'))).toBe(true);
    // With no animated layout handle the row after the group takes its new
    // place at once. Only the group's own rows move.
    expect(played(below)).toBe(false);
    expect(below.style.translate).toBe('');
    expect(played(row('app'))).toBe(false);
    expect((row('app') as HTMLElement).style.translate).toBe('');
  });

  it('is never moved by a collapse either', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    // Present first: the expanded group's row.
    expect(row('button')).not.toBeNull();
    const before = plays.length;
    expect(before).toBeGreaterThan(0);
    fireEvent.click(toggle() as HTMLElement);
    const below = screen.getByTestId('below');
    expect(below).toBeInTheDocument();
    expect(row('app')).not.toBeNull();
    // The group leaves at the tap, and nothing after it moves.
    expect(row('button')).toBeNull();
    expect(plays.length).toBe(before);
    expect((row('app') as HTMLElement).style.translate).toBe('');
    expect(below.style.translate).toBe('');
  });

  it('releases the group’s clip and its rows’ translate once the slide arrives', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    const child = row('button') as HTMLElement;
    // Moved: its slide plays.
    expect(played(child)).toBe(true);
    expect(group()?.style.overflow).toBe('clip');
    await waitFor(
      () => {
        expect(group()?.style.overflow).toBe('');
        expect(child.style.translate).toBe('');
      },
      {timeout: 3000},
    );
  });

  it('leaves nothing moved when the tree unmounts mid-expand', async () => {
    stubPointer('touch');
    stubLayout();
    const {rerender} = render(<Page />);
    await act(async () => undefined);
    // Expand, and take the tree away while it runs: the row after the group
    // was never moved, and nothing is left moving.
    fireEvent.click(toggle() as HTMLElement);
    expect(row('app')).not.toBeNull();
    expect(row('button')).not.toBeNull();
    const app = row('app') as HTMLElement;
    expect(played(row('button'))).toBe(true);
    expect(played(app)).toBe(false);
    rerender(
      <div>
        <p data-testid="below">Below the tree</p>
      </div>,
    );
    expect(app.style.translate).toBe('');
    expect(played(app)).toBe(false);
  });
});
