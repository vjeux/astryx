// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file BottomSheetDragExit.test.tsx
 * @input BottomSheet, with the shared animator replaced by a recorder
 * @output Unit tests for the exit a drag's close plays: the close spring from
 *   where the finger left the sheet, and a reopen during it
 * @position The jsdom side of the drag exit; the Chromium release spec reads
 *   the curve the browser plays.
 */

import {act, fireEvent, render, screen} from '@testing-library/react';
import {useState} from 'react';
import {afterEach, beforeEach, expect, it, vi} from 'vitest';
import type * as AnimatorModule from '../motion/animator';
import {BottomSheet} from './BottomSheet';
import {resetBottomSheetStackForTests} from './bottomSheetStack';

interface RecordedExit {
  values: Record<string, number>;
  finish: () => void;
  retarget: ReturnType<typeof vi.fn>;
}

const exits: RecordedExit[] = [];

// The sheet's open height reaches it through a resize observer. A touch
// release lands by that geometry, so each test lays the sheet out.
const observers: {callback: ResizeObserverCallback; observed: Set<Element>}[] =
  [];
class ResizeObserverMock {
  callback: ResizeObserverCallback;
  observed = new Set<Element>();
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }
  observe(target: Element) {
    this.observed.add(target);
  }
  unobserve(target: Element) {
    this.observed.delete(target);
  }
  disconnect() {
    this.observed.clear();
  }
}

/** Lays the sheet out 400 px tall, as the browser's resize observer would. */
function layOutSheet() {
  const sheet = document.querySelector<HTMLElement>(
    'dialog[aria-label="Sheet"] .astryx-bottom-sheet',
  );
  const observer = observers.find(
    instance => sheet != null && instance.observed.has(sheet),
  );
  const entry: Partial<ResizeObserverEntry> = {
    borderBoxSize: [{blockSize: 400, inlineSize: 100}],
    contentRect: {height: 400} as DOMRectReadOnly,
  };
  act(() => {
    observer?.callback(
      [entry as ResizeObserverEntry],
      observer as unknown as ResizeObserver,
    );
  });
}

vi.mock('../motion/animator', async importOriginal => {
  const actual = await importOriginal<typeof AnimatorModule>();
  return {
    ...actual,
    animatorFor: () => ({
      animate: (values: Record<string, number>) => {
        let finish = () => {};
        const finished = new Promise<boolean>(resolve => {
          finish = () => resolve(true);
        });
        const exit = {values, finish, retarget: vi.fn(), finished};
        exits.push(exit);
        return exit;
      },
      set: vi.fn(),
    }),
  };
});

beforeEach(() => {
  exits.length = 0;
  observers.length = 0;
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  resetBottomSheetStackForTests();
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  }
  // The exit plays only where Web Animations exist.
  Element.prototype.animate = vi.fn();
  window.scrollTo = vi.fn();
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  );
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn((callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    }),
  );
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});

afterEach(() => {
  Reflect.deleteProperty(Element.prototype, 'animate');
  vi.unstubAllGlobals();
});

function Host() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Reopen
      </button>
      <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Sheet">
        Content
      </BottomSheet>
    </>
  );
}

function getHandle(): HTMLElement {
  const handle = document
    .querySelector('dialog[aria-label="Sheet"] .astryx-bottom-sheet')
    ?.querySelector<HTMLElement>('[aria-hidden="true"]');
  if (handle == null) {
    throw new Error('grab handle not found');
  }
  return handle;
}

/** A fast downward touch drag on the handle: a flick, which closes the sheet. */
function flickDown() {
  const handle = getHandle();
  fireEvent.pointerDown(handle, {
    pointerId: 1,
    pointerType: 'touch',
    clientY: 0,
    button: 0,
    isPrimary: true,
  });
  fireEvent.pointerMove(handle, {pointerId: 1, clientY: 40});
  fireEvent.pointerMove(handle, {pointerId: 1, clientY: 120});
  fireEvent.pointerUp(handle, {pointerId: 1, clientY: 120});
}

it('plays the close spring when a drag closes the sheet', () => {
  render(<Host />);
  layOutSheet();
  flickDown();
  expect(exits).toHaveLength(1);
  expect(exits[0].values.y).toBeGreaterThan(0);
});

it('takes the sheet back to rest when it reopens during a drag exit', () => {
  render(<Host />);
  layOutSheet();
  flickDown();
  expect(exits).toHaveLength(1);
  act(() => {
    fireEvent.click(screen.getByRole('button', {name: 'Reopen'}));
  });
  expect(exits[0].retarget).toHaveBeenCalledWith({y: 0});
});

it('leaves a finished exit where it ended', async () => {
  render(<Host />);
  layOutSheet();
  flickDown();
  await act(async () => {
    exits[0].finish();
  });
  expect(exits[0].retarget).not.toHaveBeenCalled();
});
