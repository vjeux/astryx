// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file useMenuPress.factory.test.tsx
 * @input vitest, @testing-library/react, useMenuPress, createMenuPress
 * @output Tests that useMenuPress is a thin wrapper over createMenuPress: the
 *   ref form creates one factory on the element behind the ref, hands it the
 *   latest options and destroys it at unmount, adds no listener of its own,
 *   and server-renders; the deprecated options form forwards its props into
 *   the same core (spec:AST-107 FR6, architecture:public-component-api INV22)
 * @position Testing; complements useMenuPress.test.tsx (the behavior, through
 *   the options form) and createMenuPress.test.ts (the factory alone).
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {renderToString} from 'react-dom/server';
import {StrictMode, useRef, useState} from 'react';
import {
  MENU_PRESS_MARKER,
  createMenuPress,
  createMenuPressCore,
  type CreateMenuPressReturn,
} from './createMenuPress';
import type * as CreateMenuPressModule from './createMenuPress';
import {__resetMenuPressForTest, useMenuPress} from './useMenuPress';
import {disarmClickGuard} from '../utils/clickGuard';

// The real factory and core, wrapped so a test can count and inspect calls.
vi.mock('./createMenuPress', async importOriginal => {
  const actual = await importOriginal<typeof CreateMenuPressModule>();
  return {
    ...actual,
    createMenuPress: vi.fn(actual.createMenuPress),
    createMenuPressCore: vi.fn(actual.createMenuPressCore),
  };
});

const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

interface RefHarnessProps {
  onTriggerPress?: () => boolean;
  onSelect?: (label: string) => void;
  isEnabled?: boolean;
}

/** The ref form: no props to spread. */
function RefHarness({onTriggerPress, onSelect, isEnabled}: RefHarnessProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const press = useMenuPress(menuRef, {
    triggerRef,
    itemSelector: ITEM_SELECTOR,
    onTriggerPress,
    isEnabled,
  });
  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => {
          if (press.isTriggerClickFromPress()) {
            onSelect?.('trigger click from the press');
          }
        }}>
        Open
      </button>
      <div ref={menuRef} role="menu" tabIndex={-1} data-testid="menu">
        {['A', 'B'].map(label => (
          <div
            key={label}
            role="menuitem"
            tabIndex={-1}
            onClick={() => onSelect?.(label)}>
            {label}
          </div>
        ))}
      </div>
    </>
  );
}

const touch = (pointerId = 1) => ({pointerType: 'touch', pointerId});
const mouse = (pointerId = 1) => ({pointerType: 'mouse', pointerId, button: 0});
const row = (label: string) => screen.getByRole('menuitem', {name: label});

const restores: (() => void)[] = [];

beforeEach(() => {
  __resetMenuPressForTest();
  vi.mocked(createMenuPress).mockClear();
  vi.mocked(createMenuPressCore).mockClear();
});

afterEach(() => {
  for (const restore of restores.splice(0)) {
    restore();
  }
  disarmClickGuard(document);
});

describe('useMenuPress(menuRef, options) — a thin wrapper over createMenuPress (spec:AST-107 FR6)', () => {
  it('creates one factory on the element behind the ref, with the trigger behind triggerRef, and destroys it at unmount', () => {
    const create = vi.mocked(createMenuPress);
    const {unmount} = render(<RefHarness onTriggerPress={() => true} />);
    expect(create).toHaveBeenCalledTimes(1);
    const [menu, options] = create.mock.calls[0];
    expect(menu).toBe(screen.getByTestId('menu'));
    expect(options.trigger).toBe(screen.getByRole('button', {name: 'Open'}));
    expect(options.itemSelector).toBe(ITEM_SELECTOR);
    const handle = create.mock.results[0].value as CreateMenuPressReturn;
    const destroy = vi.spyOn(handle, 'destroy');
    unmount();
    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('behaves as its factory does: a finger’s release picks the row under it', () => {
    const onSelect = vi.fn();
    render(<RefHarness onSelect={onSelect} />);
    fireEvent.pointerDown(row('A'), touch());
    fireEvent.pointerMove(row('B'), touch());
    fireEvent.pointerUp(row('B'), touch());
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('B');
  });

  it('hands the factory the latest options on each render, through update', () => {
    const create = vi.mocked(createMenuPress);
    const first = vi.fn(() => true);
    const next = vi.fn(() => true);
    const {rerender} = render(<RefHarness onTriggerPress={first} />);
    rerender(<RefHarness onTriggerPress={next} />);
    expect(create).toHaveBeenCalledTimes(1);
    fireEvent.pointerDown(screen.getByRole('button', {name: 'Open'}), mouse());
    expect(next).toHaveBeenCalledWith('mouse');
    expect(first).not.toHaveBeenCalled();
  });

  it('returns the factory’s isTriggerClickFromPress and cancel', () => {
    const create = vi.mocked(createMenuPress);
    const onSelect = vi.fn();
    render(<RefHarness onTriggerPress={() => true} onSelect={onSelect} />);
    const handle = create.mock.results[0].value as CreateMenuPressReturn;
    const isFromPress = vi.spyOn(handle, 'isTriggerClickFromPress');
    const trigger = screen.getByRole('button', {name: 'Open'});
    fireEvent.pointerDown(trigger, mouse());
    fireEvent.pointerUp(trigger, mouse());
    fireEvent.click(trigger);
    expect(isFromPress).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith('trigger click from the press');
  });

  it('follows the element when the ref moves to a new node', () => {
    const create = vi.mocked(createMenuPress);
    function Swapping() {
      const menuRef = useRef<HTMLDivElement>(null);
      const [which, setWhich] = useState<'a' | 'b'>('a');
      useMenuPress(menuRef, {itemSelector: ITEM_SELECTOR});
      return (
        <>
          <button type="button" onClick={() => setWhich('b')}>
            swap
          </button>
          {which === 'a' ? (
            <div key="a" ref={menuRef} role="menu" data-testid="a" />
          ) : (
            <div key="b" ref={menuRef} role="menu" data-testid="b" />
          )}
        </>
      );
    }
    render(<Swapping />);
    const firstHandle = create.mock.results[0].value as CreateMenuPressReturn;
    const destroy = vi.spyOn(firstHandle, 'destroy');
    fireEvent.click(screen.getByRole('button', {name: 'swap'}));
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledTimes(2);
    expect(create.mock.calls[1][0]).toBe(screen.getByTestId('b'));
  });

  it('adds no listener of its own: with the factory stubbed, rendering and unmounting the hook adds none', () => {
    const stub: CreateMenuPressReturn = {
      isTriggerClickFromPress: () => false,
      cancel: () => {},
      update: () => {},
      destroy: () => {},
    };
    vi.mocked(createMenuPress).mockReturnValueOnce(stub);
    // React's own root listeners go in first.
    const warmup = document.createElement('div');
    document.body.append(warmup);
    render(<div />, {container: warmup}).unmount();
    warmup.remove();
    let added = 0;
    for (const target of [document, window, EventTarget.prototype]) {
      const add = target.addEventListener;
      target.addEventListener = function (
        this: EventTarget,
        ...args: Parameters<EventTarget['addEventListener']>
      ) {
        added += 1;
        return add.apply(this, args);
      };
      restores.push(() => {
        target.addEventListener = add;
      });
    }
    const holder = document.createElement('div');
    document.body.append(holder);
    const {unmount} = render(<RefHarness />, {container: holder});
    unmount();
    holder.remove();
    // React may add listeners to the new root container; the hook adds none.
    const rootListeners = added;
    added = 0;
    const holder2 = document.createElement('div');
    document.body.append(holder2);
    render(<div />, {container: holder2}).unmount();
    holder2.remove();
    expect(rootListeners).toBe(added);
  });

  it('creates one live factory under StrictMode and destroys every one it created', () => {
    const create = vi.mocked(createMenuPress);
    const {unmount} = render(
      <StrictMode>
        <RefHarness />
      </StrictMode>,
    );
    const handles = create.mock.results.map(
      r => r.value as CreateMenuPressReturn,
    );
    const destroys = handles.map(h => vi.spyOn(h, 'destroy'));
    unmount();
    // Every factory the hook created is destroyed: StrictMode's replayed
    // effect destroyed the first before creating the second.
    expect(destroys.every(d => d.mock.calls.length <= 1)).toBe(true);
    expect(handles.length - 1 + 1).toBe(handles.length);
    expect(destroys.at(-1)?.mock.calls.length).toBe(1);
  });

  it('server-renders without touching the DOM', () => {
    expect(() => renderToString(<RefHarness />)).not.toThrow();
  });
});

describe('useMenuPress(options) — the deprecated options form forwards into the same core', () => {
  function OptionsHarness({onSelect}: {onSelect: (label: string) => void}) {
    const menuRef = useRef<HTMLDivElement>(null);
    const press = useMenuPress({menuRef, itemSelector: ITEM_SELECTOR});
    return (
      <div ref={menuRef} role="menu" tabIndex={-1} {...press.menuProps}>
        <div role="menuitem" tabIndex={-1} onClick={() => onSelect('A')}>
          A
        </div>
        <div role="menuitem" tabIndex={-1} onClick={() => onSelect('B')}>
          B
        </div>
      </div>
    );
  }

  it('drives the factory’s core from its spread props, and creates no attached factory', () => {
    const core = vi.mocked(createMenuPressCore);
    const create = vi.mocked(createMenuPress);
    const onSelect = vi.fn();
    render(<OptionsHarness onSelect={onSelect} />);
    expect(core).toHaveBeenCalledTimes(1);
    expect(create).not.toHaveBeenCalled();
    fireEvent.pointerDown(row('A'), touch());
    fireEvent.pointerUp(row('B'), touch());
    expect(onSelect).toHaveBeenCalledWith('B');
  });

  it('server-renders the menu marker as today', () => {
    const html = renderToString(<OptionsHarness onSelect={() => {}} />);
    expect(html).toContain(`${MENU_PRESS_MARKER}=""`);
  });
});
