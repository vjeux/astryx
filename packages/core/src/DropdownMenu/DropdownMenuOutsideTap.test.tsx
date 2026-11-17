// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuOutsideTap.test.tsx
 * @input An open DropdownMenu above a control, a coarse primary pointer, and
 *   a tap, a pan or a mouse press outside the menu as pointer, touch and
 *   mouse events in jsdom
 * @output Under the touch presentation, a finger's or a pen's tap outside
 *   the open menu closes it at the lift. The touch's touchend is cancelled,
 *   so no click or compatibility mouse event reaches the control beneath,
 *   also when the touchstart was not cancelable. A mouse press outside, a
 *   pan outside and `presentation="popover"` keep their behavior.
 * @position Unit evidence for the menu press model's outside tap. The
 *   browser half is
 *   __tests__/DropdownMenuOutsideTap.interaction.browser.spec.ts
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {useState} from 'react';
import {DropdownMenu} from './DropdownMenu';
import {DropdownMenuItem} from './DropdownMenuItem';
import {__resetMenuPressForTest} from '../hooks/useMenuPress';
import {TOUCH_QUERY} from '../utils/touchPresentation';

/** A touch event at `target` whose one changed touch has `identifier`. */
function fireTouch(
  target: Element,
  type: 'touchstart' | 'touchmove' | 'touchend',
  identifier: number,
  cancelable = true,
): Event {
  const event = new Event(type, {bubbles: true, cancelable});
  Object.defineProperty(event, 'changedTouches', {
    value: [{identifier, target}],
  });
  target.dispatchEvent(event);
  return event;
}

/** A finger's tap or a pen's at `target`, up to its lift. */
function tapAt(
  target: Element,
  pointerType: 'touch' | 'pen',
  touchStartCancelable = true,
): void {
  const pointer = {pointerType, pointerId: 9, isPrimary: true};
  fireEvent.pointerDown(target, pointer);
  if (pointerType === 'touch') {
    fireTouch(target, 'touchstart', 9, touchStartCancelable);
  }
  fireEvent.pointerUp(target, pointer);
}

/** The browser's click for a touch: only after a touchend nothing cancelled. */
function browserClickAfter(touchEnd: Event, target: Element): void {
  if (!touchEnd.defaultPrevented) {
    target.dispatchEvent(
      new MouseEvent('click', {bubbles: true, cancelable: true, detail: 1}),
    );
  }
}

/** Dispatches mouse events at `target`; returns each one. */
function mouseEvents(
  target: Element,
  types: ReadonlyArray<'mousedown' | 'mouseup' | 'click'>,
): MouseEvent[] {
  return types.map(type => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });
    target.dispatchEvent(event);
    return event;
  });
}

/** Renders a menu above a control and opens it. */
async function openMenuOver(presentation?: 'popover') {
  const onBeneath = vi.fn();
  render(
    <>
      <button type="button" onClick={onBeneath}>
        Beneath
      </button>
      <DropdownMenu button={{label: 'Actions'}} presentation={presentation}>
        <DropdownMenuItem label="Rename" onClick={() => {}} />
        <DropdownMenuItem label="Delete" onClick={() => {}} />
      </DropdownMenu>
    </>,
  );
  const trigger = screen.getByRole('button', {name: /Actions/});
  fireEvent.click(trigger);
  await waitFor(() => {
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
  return {
    onBeneath,
    trigger,
    beneath: screen.getByRole('button', {name: 'Beneath'}),
  };
}

/** A menu whose open state its caller owns. */
function ControlledMenu({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu
      button={{label: 'Actions'}}
      isMenuOpen={isOpen}
      onOpenChange={next => {
        onOpenChange(next);
        setIsOpen(next);
      }}>
      <DropdownMenuItem label="Rename" onClick={() => {}} />
    </DropdownMenu>
  );
}

describe('DropdownMenu: a tap outside the open menu (spec:AST-094 FR32)', () => {
  beforeEach(() => {
    __resetMenuPressForTest();
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === TOUCH_QUERY || query === '(pointer: coarse)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("a finger's tap closes the menu at its lift; its touchend is cancelled, so no click reaches the control beneath (FR21)", async () => {
    const {onBeneath, trigger, beneath} = await openMenuOver();
    tapAt(beneath, 'touch');
    const touchEnd = fireTouch(beneath, 'touchend', 9);
    expect(touchEnd.defaultPrevented).toBe(true);
    browserClickAfter(touchEnd, beneath);
    expect(onBeneath).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('after a touchstart that was not cancelable, the compatibility mouse events and click that follow the cancelled touchend reach nothing beneath', async () => {
    const {onBeneath, trigger, beneath} = await openMenuOver();
    vi.useFakeTimers();
    tapAt(beneath, 'touch', false);
    const touchEnd = fireTouch(beneath, 'touchend', 9);
    expect(touchEnd.defaultPrevented).toBe(true);
    vi.advanceTimersByTime(20);
    const late = mouseEvents(beneath, ['mousedown', 'mouseup', 'click']);
    expect(late.map(event => event.defaultPrevented)).toEqual([
      true,
      true,
      true,
    ]);
    expect(onBeneath).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it("a pen's tap closes the menu at its lift, and its click reaches nothing beneath", async () => {
    const {onBeneath, trigger, beneath} = await openMenuOver();
    tapAt(beneath, 'pen');
    const [mouseUp, click] = mouseEvents(beneath, ['mouseup', 'click']);
    expect(mouseUp.defaultPrevented).toBe(true);
    expect(click.defaultPrevented).toBe(true);
    expect(onBeneath).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it("a mouse's press outside keeps its click: the layer's light dismiss closes the menu", async () => {
    const {onBeneath, beneath} = await openMenuOver();
    const mouse = {pointerType: 'mouse', pointerId: 1, isPrimary: true};
    fireEvent.pointerDown(beneath, mouse);
    fireEvent.pointerUp(beneath, mouse);
    const events = mouseEvents(beneath, ['mousedown', 'mouseup', 'click']);
    expect(events.map(event => event.defaultPrevented)).toEqual([
      false,
      false,
      false,
    ]);
    expect(onBeneath).toHaveBeenCalledTimes(1);
  });

  it('a pan outside, which the browser takes as a scroll, cancels nothing and closes nothing', async () => {
    const {onBeneath, trigger, beneath} = await openMenuOver();
    const touch = {pointerType: 'touch', pointerId: 9, isPrimary: true};
    fireEvent.pointerDown(beneath, touch);
    fireTouch(beneath, 'touchstart', 9);
    expect(fireTouch(beneath, 'touchmove', 9).defaultPrevented).toBe(false);
    fireEvent.pointerCancel(beneath, touch);
    const touchEnd = fireTouch(beneath, 'touchend', 9, false);
    expect(touchEnd.defaultPrevented).toBe(false);
    expect(onBeneath).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('with presentation="popover", a finger\'s tap keeps its touchend and its click (FR25)', async () => {
    const {onBeneath, beneath} = await openMenuOver('popover');
    tapAt(beneath, 'touch');
    const touchEnd = fireTouch(beneath, 'touchend', 9);
    expect(touchEnd.defaultPrevented).toBe(false);
    browserClickAfter(touchEnd, beneath);
    expect(onBeneath).toHaveBeenCalledTimes(1);
  });

  it("a finger's tap on the trigger is the trigger's own: its touchend is not cancelled, and the menu does not close at its lift", async () => {
    const {trigger} = await openMenuOver();
    tapAt(trigger, 'touch');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const touchEnd = fireTouch(trigger, 'touchend', 9);
    expect(touchEnd.defaultPrevented).toBe(false);
  });

  it("a finger's tap on a control in the menu's header is inside: the menu stays open, and the control gets its click", async () => {
    const onFilter = vi.fn();
    render(
      <DropdownMenu
        button={{label: 'Actions'}}
        header={
          <button type="button" onClick={onFilter}>
            Filter
          </button>
        }>
        <DropdownMenuItem label="Rename" onClick={() => {}} />
      </DropdownMenu>,
    );
    const trigger = screen.getByRole('button', {name: /Actions/});
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
    const filter = screen.getByRole('button', {name: 'Filter', hidden: true});
    tapAt(filter, 'touch');
    const touchEnd = fireTouch(filter, 'touchend', 9);
    expect(touchEnd.defaultPrevented).toBe(false);
    browserClickAfter(touchEnd, filter);
    expect(onFilter).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it("a controlled menu: a finger's tap outside asks its caller to close it, and its click reaches nothing beneath", async () => {
    const onOpenChange = vi.fn();
    const onBeneath = vi.fn();
    render(
      <>
        <button type="button" onClick={onBeneath}>
          Beneath
        </button>
        <ControlledMenu onOpenChange={onOpenChange} />
      </>,
    );
    const trigger = screen.getByRole('button', {name: /Actions/});
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
    const beneath = screen.getByRole('button', {name: 'Beneath'});
    tapAt(beneath, 'touch');
    const touchEnd = fireTouch(beneath, 'touchend', 9);
    expect(touchEnd.defaultPrevented).toBe(true);
    browserClickAfter(touchEnd, beneath);
    expect(onBeneath).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
