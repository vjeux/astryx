// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useTreeExpansionMotion.test.tsx
 * @input vitest, TreeList, a stubbed pointer (a coarse primary pointer, or
 *   a mouse)
 * @output Unit tests for the expansion's presence rules: a collapse removes
 *   the children at the tap under every pointer, so the rows after the group
 *   take their places at once (`spec:AST-105` FR2), and under a coarse
 *   primary pointer the chevron still turns back on its spring, mid-expand
 *   too; with no animated layout handle nothing outside the group moves,
 *   neither the rows after it in the tree nor the page content after the tree
 *   (both take their places by layout); the group's rows release their
 *   translate at their own arrival and are left at rest when the tree
 *   unmounts mid-expand
 * @position Beside TreeList/useTreeExpansionMotion.ts; the motion itself is
 *   proven in a real engine by
 *   TreeList/__tests__/TreeListExpand.interaction.browser.spec.ts
 */

import {useRef} from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {TreeList} from './TreeList';
import {useAnimatedLayout} from '../hooks/useAnimatedLayout';
import type {TreeListItemData} from './TreeListTypes';
import {motionOf} from '../utils/rowMotion';

/** Each group's height in the stubbed layout. */
const GROUP_HEIGHT = 40;

/**
 * jsdom lays nothing out: an element sits one group's height lower for each
 * laid-out group before it in the document (`pinned` elements never move,
 * like a footer held at the bottom of its column).
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

describe('the touch presentation, read once per tree (spec:AST-094 FR24)', () => {
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

describe('TreeList expansion presence', () => {
  it('with a mouse, a collapse removes the children at once', () => {
    stubPointer('mouse');
    expect(matchMedia('(pointer: coarse)').matches).toBe(false);
    render(<TreeList items={items} />);
    expect(group()).not.toBeNull();
    fireEvent.click(toggle() as HTMLElement);
    expect(group()).toBeNull();
  });

  it('under a finger, a collapse removes the children at the tap, so the rows after take their places at once (spec:AST-105 FR2), and the chevron turns back', async () => {
    stubPointer('touch');
    render(<TreeList items={items} />);
    // Let the touch presentation settle after mount.
    await act(async () => undefined);
    const chevron = row('components')?.querySelector<HTMLElement>(
      '[data-tree-chevron]',
    ) as HTMLElement;
    fireEvent.click(toggle() as HTMLElement);
    expect(row('components')).toHaveAttribute('aria-expanded', 'false');
    // Gone at the tap: nothing holds the rows after the group in place.
    expect(group()).toBeNull();
    const components = row('components') as HTMLElement;
    components.focus();
    fireEvent.keyDown(components, {key: 'ArrowDown'});
    expect(document.activeElement).toBe(row('app'));
    // The chevron turns back on its own spring.
    expect(motionOf(chevron)).toBeDefined();
  });

  it('under a finger, a collapse mid-expand removes the children at once and turns the chevron back from its angle', async () => {
    stubPointer('touch');
    render(<TreeList items={items} />);
    await act(async () => undefined);
    const chevron = row('components')?.querySelector<HTMLElement>(
      '[data-tree-chevron]',
    ) as HTMLElement;
    fireEvent.click(toggle() as HTMLElement);
    fireEvent.click(toggle() as HTMLElement);
    // Expanding: the group is back, its block sliding out.
    expect(row('components')).toHaveAttribute('aria-expanded', 'true');
    expect(group()).not.toBeNull();
    expect(motionOf(row('button') as HTMLElement)).toBeDefined();
    fireEvent.click(toggle() as HTMLElement);
    expect(row('components')).toHaveAttribute('aria-expanded', 'false');
    expect(group()).toBeNull();
    expect(motionOf(chevron)).toBeDefined();
    expect(screen.queryByText('Card.tsx')).toBeNull();
  });
});

describe('with an animated-layout handle', () => {
  function WithHandle() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animatedLayout = useAnimatedLayout({containerRef});
    return (
      <div ref={containerRef}>
        <TreeList items={items} animatedLayout={animatedLayout} />
      </div>
    );
  }

  it('under a finger, the row plays no slide of its own: the handle plays the group under every pointer', async () => {
    stubPointer('touch');
    render(<WithHandle />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    expect(row('components')).toHaveAttribute('aria-expanded', 'false');
    // jsdom has no layout, so the handle holds no exit: the group goes at
    // once instead of staying for the row's own slide.
    expect(group()).toBeNull();
  });
});

describe('content after the tree', () => {
  const collapsed: TreeListItemData[] = [
    {
      id: 'components',
      label: 'components',
      children: [{id: 'button', label: 'Button.tsx'}],
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

  it('is never moved by an expansion, nor are the rows after the group: they take their places by layout', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    const below = screen.getByTestId('below');
    expect(motionOf(below)).toBeUndefined();
    expect(below.style.translate).toBe('');
    // With no animated layout handle the row after the group takes its new
    // place at once (`spec:AST-105` FR2); only the group's own rows move.
    const app = row('app') as HTMLElement;
    expect(motionOf(app)).toBeUndefined();
    expect(app.style.translate).toBe('');
    expect(motionOf(row('button') as HTMLElement)).toBeDefined();
  });

  it('is never moved by a collapse either', async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    await waitFor(
      () => expect(motionOf(row('button') as HTMLElement)).toBeUndefined(),
      {timeout: 3000},
    );
    fireEvent.click(toggle() as HTMLElement);
    const below = screen.getByTestId('below');
    // The group leaves at the tap, and nothing after it moves.
    expect(row('button')).toBeNull();
    expect(motionOf(row('app') as HTMLElement)).toBeUndefined();
    expect((row('app') as HTMLElement).style.translate).toBe('');
    expect(motionOf(below)).toBeUndefined();
    expect(below.style.translate).toBe('');
  });

  it("releases each of the group's rows' translate when its own spring arrives", async () => {
    stubPointer('touch');
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    const child = row('button') as HTMLElement;
    // Moved: its spring starts when the browser commits it.
    expect(motionOf(child)).toBeDefined();
    await waitFor(() => expect(child.style.translate).toBe(''), {
      timeout: 3000,
    });
  });

  it('leaves nothing moved when the tree unmounts mid-expand', async () => {
    stubPointer('touch');
    stubLayout();
    const {rerender} = render(<Page />);
    await act(async () => undefined);
    // Expand, and take the tree away while it runs: the row after the
    // group was never moved, and nothing is left moving.
    fireEvent.click(toggle() as HTMLElement);
    const app = row('app') as HTMLElement;
    const child = row('button') as HTMLElement;
    expect(motionOf(child)).toBeDefined();
    expect(motionOf(app)).toBeUndefined();
    rerender(
      <div>
        <p data-testid="below">Below the tree</p>
      </div>,
    );
    expect(app.style.translate).toBe('');
    expect(motionOf(app)).toBeUndefined();
  });

  it('stays still with a mouse, where nothing moves', async () => {
    stubPointer('mouse');
    expect(matchMedia('(pointer: coarse)').matches).toBe(false);
    stubLayout();
    render(<Page />);
    await act(async () => undefined);
    fireEvent.click(toggle() as HTMLElement);
    expect(motionOf(screen.getByTestId('below'))).toBeUndefined();
    expect(motionOf(row('app') as HTMLElement)).toBeUndefined();
  });
});
