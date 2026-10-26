// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PopoverSheetLoad.test.tsx
 * @input vitest (jsdom), Testing Library, Popover, a stand-in matchMedia and
 *   jsdom stubs for <dialog>
 * @output Popover's sheet is part of its import: a phone mounts the closed
 *   sheet in the render that resolves the presentation, and a tap presents it
 *   in the render that opens it, with no load in between
 * @position Testing for Popover.tsx (the sheet's loading)
 */

import {act, fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {Button} from '../Button';
import {DEFAULT_COMPACT_DEFINITION} from '../theme/themeAdaptations';
import {Popover, type PopoverPresentation} from './Popover';

// Compact as spec:AST-012 FR9 defines it, with a coarse pointer.
const COMPACT_TOUCH_QUERY = DEFAULT_COMPACT_DEFINITION.coarsePointerQuery;
let isCompactTouch = false;

beforeEach(() => {
  isCompactTouch = false;
  // jsdom implements no <dialog> open/close.
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  });
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query === COMPACT_TOUCH_QUERY ? isCompactTouch : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  window.scrollTo = vi.fn();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function Filters({presentation}: {presentation: PopoverPresentation}) {
  return (
    <Popover
      label="Filters"
      presentation={presentation}
      content={<button type="button">Apply</button>}>
      <Button label="Filter">Filter</Button>
    </Popover>
  );
}

const sheetDialog = () =>
  document.querySelector<HTMLDialogElement>('dialog[aria-label="Filters"]');

describe('Popover sheet loading', () => {
  // First in the file: the first sheet this module renders.
  it('mounts the closed sheet on a phone in the render that chooses it, with no load in between', () => {
    isCompactTouch = true;
    render(<Filters presentation="adaptive" />);
    expect(sheetDialog()).not.toBeNull();
  });

  it('presents the sheet in the render that opens it', () => {
    render(<Filters presentation="bottom-sheet" />);
    act(() => {
      fireEvent.click(screen.getByRole('button', {name: 'Filter'}));
    });
    expect(sheetDialog()).toHaveAttribute('open');
  });
});
