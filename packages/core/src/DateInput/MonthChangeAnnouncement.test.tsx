// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file MonthChangeAnnouncement.test.tsx
 * @input MonthChangeAnnouncement inside a modal BottomSheet, jsdom dialogs
 *   stubbed as modal, fake timers
 * @output Unit tests: a new month is announced into the open sheet once it
 *   holds for the scroll's quiet period. The first month, the months a burst
 *   passes and a month that changed while hidden are not announced.
 * @position Colocated test of MonthChangeAnnouncement.tsx
 */

import {act, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {BottomSheet} from '../BottomSheet/BottomSheet';
import {__resetLiveRegionsForTest} from '../hooks/useAnnounce';
import {MonthChangeAnnouncement} from './MonthChangeAnnouncement';
import {SCROLL_QUIET_MS} from './useScrollSettle';

/** jsdom has no showModal(); stand in for a dialog opened modally. */
function stubDialogs() {
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute('open', '');
    this.dataset.modal = 'true';
  });
  HTMLDialogElement.prototype.show = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
    delete this.dataset.modal;
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    delete this.dataset.modal;
    this.dispatchEvent(new Event('close'));
  });
  const matches = Element.prototype.matches;
  vi.spyOn(Element.prototype, 'matches').mockImplementation(function (
    this: Element,
    selector: string,
  ) {
    return selector === ':modal'
      ? this instanceof HTMLDialogElement &&
          this.open &&
          this.dataset.modal === 'true'
      : matches.call(this, selector);
  });
}

function Sheet({label, isShown}: {label: string; isShown: boolean}) {
  return (
    <BottomSheet isOpen onOpenChange={() => {}} label="Date">
      <MonthChangeAnnouncement label={label} isShown={isShown} />
    </BottomSheet>
  );
}

/** What the open sheet's polite region exposes. */
function announced(): string {
  const dialog = screen.getByRole('dialog', {name: 'Date'});
  return (
    dialog.querySelector(':scope > [data-astryx-modal-live-region="polite"]')
      ?.textContent ?? ''
  );
}

/** Moves the clock, frames included. */
function wait(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  __resetLiveRegionsForTest();
  stubDialogs();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('MonthChangeAnnouncement', () => {
  it('announces nothing for the month the sheet opens on', () => {
    render(<Sheet label="March 2026" isShown />);
    wait(SCROLL_QUIET_MS + 50);
    expect(announced()).toBe('');
  });

  it('announces a new month into the open sheet once it holds for the quiet period', () => {
    const {rerender} = render(<Sheet label="March 2026" isShown />);
    rerender(<Sheet label="April 2026" isShown />);
    wait(SCROLL_QUIET_MS - 20);
    expect(announced()).toBe('');
    wait(40);
    expect(announced()).toBe('April 2026');
  });

  it('announces only the month a burst stops on', () => {
    const {rerender} = render(<Sheet label="March 2026" isShown />);
    for (const month of ['April', 'May', 'June']) {
      rerender(<Sheet label={`${month} 2026`} isShown />);
      wait(SCROLL_QUIET_MS / 2);
      // The months it passes are not announced.
      expect(announced()).toBe('');
    }
    wait(SCROLL_QUIET_MS);
    expect(announced()).toBe('June 2026');
  });

  it('announces nothing when a month changes back before the quiet period ends', () => {
    const {rerender} = render(<Sheet label="March 2026" isShown />);
    rerender(<Sheet label="April 2026" isShown />);
    wait(SCROLL_QUIET_MS / 2);
    rerender(<Sheet label="March 2026" isShown />);
    wait(SCROLL_QUIET_MS + 50);
    expect(announced()).toBe('');
  });

  it('announces nothing for a month that changed while the calendar was hidden', () => {
    const {rerender} = render(<Sheet label="March 2026" isShown />);
    // The wheels cover the calendar and move it on.
    rerender(<Sheet label="March 2026" isShown={false} />);
    rerender(<Sheet label="July 2026" isShown={false} />);
    rerender(<Sheet label="July 2026" isShown />);
    wait(SCROLL_QUIET_MS + 50);
    expect(announced()).toBe('');
  });

  it('announces nothing for the first month known after an empty one', () => {
    const {rerender} = render(<Sheet label="" isShown />);
    rerender(<Sheet label="March 2026" isShown />);
    wait(SCROLL_QUIET_MS + 50);
    expect(announced()).toBe('');
  });
});
