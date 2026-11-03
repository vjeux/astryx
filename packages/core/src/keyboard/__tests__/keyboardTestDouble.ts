// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardTestDouble.ts
 * @input vitest, the window's visual viewport and matchMedia
 * @output installKeyboardTestDouble: a stand-in on-screen keyboard that a
 *   field's keyboard test drives with one call per keyboard change
 * @position Test helper for the keyboard module and the fields it covers
 */

import {vi} from 'vitest';
import {act} from '@testing-library/react';
import {__resetLayoutViewportForTest} from '../../utils/layoutViewport';

/** A stand-in keyboard over the window's layout viewport. */
export interface KeyboardTestDouble {
  /** The keyboard now covers `cover` px of the layout viewport's bottom. */
  show(cover: number): void;
  /** The keyboard has gone. */
  hide(): void;
  /** Puts the window back as it was. */
  restore(): void;
}

/**
 * Installs a visual viewport that shrinks for the keyboard, as Mobile Safari
 * and Chrome on Android do, and a coarse primary pointer unless `coarse` is
 * false. Each change reports in the visual viewport's own `resize`.
 */
export function installKeyboardTestDouble({
  coarse = true,
}: {coarse?: boolean} = {}): KeyboardTestDouble {
  const viewport = Object.assign(new EventTarget(), {
    height: window.innerHeight,
    offsetTop: 0,
    scale: 1,
  });
  Object.defineProperty(window, 'visualViewport', {
    configurable: true,
    value: viewport,
  });
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('pointer: coarse') ? coarse : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  const report = (height: number) => {
    viewport.height = height;
    act(() => {
      viewport.dispatchEvent(new Event('resize'));
    });
  };
  return {
    show: cover => report(window.innerHeight - cover),
    hide: () => report(window.innerHeight),
    restore: () => {
      Reflect.deleteProperty(window, 'visualViewport');
      __resetLayoutViewportForTest();
      vi.unstubAllGlobals();
    },
  };
}
