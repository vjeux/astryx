// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardUIKit.test.ts
 * @input vitest, jsdom, getKeyboardLayoutGuide, a stand-in visual viewport,
 *   a stand-in CSS.supports
 * @output Tests the guide in Safari on iOS. A keyboard coming up rides from
 *   Safari's one report on UIKit's keyboard spring. A hide rides down from
 *   the blur, as a prediction that Safari's later report confirms. Focus that
 *   moves between fields, to a picker in the keyboard's place, or to a field
 *   the page cannot see, moves nothing.
 * @position Unit tests for the iOS part of keyboard/keyboardLayoutGuide.ts
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {KEYBOARD_SPRING} from '../motion/uikit/springs';
import {timing as uikitTiming} from '../motion/uikit/timing';
import {getKeyboardLayoutGuide, keyboardProfileOf} from './keyboardLayoutGuide';
import type {KeyboardTransition} from './keyboardModel';

let view: EventTarget & {height: number; offsetTop: number; scale: number};
let a: HTMLInputElement;
let b: HTMLInputElement;
let date: HTMLInputElement;
let button: HTMLButtonElement;
const seen: KeyboardTransition[] = [];
let unsubscribe: () => void = () => {};
const uikitSpring = {
  durationMs: uikitTiming.keyboardNotificationMs,
  spring: KEYBOARD_SPRING,
};

const report = (cover: number) => {
  view.height = window.innerHeight - cover;
  view.dispatchEvent(new Event('resize'));
};

describe('the keyboard layout guide in Safari on iOS', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // One clock for event times and the guide's own reads, as in a browser.
    vi.spyOn(window.performance, 'now').mockImplementation(() => Date.now());
    view = Object.assign(new EventTarget(), {
      height: window.innerHeight,
      offsetTop: 0,
      scale: 1,
    });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: view,
    });
    // WebKit on iOS: the one engine that supports -webkit-touch-callout.
    vi.stubGlobal('CSS', {
      supports: (property: string, value: string) =>
        property === '-webkit-touch-callout' && value === 'none',
    });
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({
          matches: query === '(pointer: coarse)',
          media: query,
        }) as unknown as MediaQueryList,
    );
    document.body.innerHTML =
      '<input id="a"><button id="go">Go</button><input id="b"><input id="date" type="date">';
    a = document.getElementById('a') as HTMLInputElement;
    b = document.getElementById('b') as HTMLInputElement;
    date = document.getElementById('date') as HTMLInputElement;
    button = document.getElementById('go') as HTMLButtonElement;
    seen.length = 0;
    unsubscribe = getKeyboardLayoutGuide(window).subscribe(t => seen.push(t));
  });

  afterEach(() => {
    unsubscribe();
    (document.activeElement as HTMLElement | null)?.blur();
    document.body.innerHTML = '';
    Reflect.deleteProperty(window, 'visualViewport');
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('reads UIKit’s keyboard schedule from the engine’s capability, never the user agent', () => {
    expect(keyboardProfileOf(window)).toBe('uikit');
    expect(getKeyboardLayoutGuide(window).profile).toBe('uikit');
  });

  it('rides a keyboard coming up from Safari’s one report, on UIKit’s keyboard spring', () => {
    a.focus();
    let reportAt = 0;
    view.addEventListener(
      'resize',
      event => {
        reportAt = event.timeStamp;
      },
      {once: true},
    );
    report(336);
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatchObject({
      kind: 'show',
      to: 336,
      animated: true,
      predicted: false,
    });
    expect(seen[0]?.start).toBeCloseTo(reportAt, 6);
    expect(seen[0]?.curve).toEqual(uikitSpring);
  });

  it('rides a hide down from the blur on the same spring, and keeps it until Safari reports the keyboard down', () => {
    a.focus();
    report(336);
    vi.advanceTimersByTime(1000);
    let blurAt = 0;
    a.addEventListener(
      'focusout',
      event => {
        blurAt = event.timeStamp;
      },
      {once: true},
    );
    button.focus();
    const hide = seen.at(-1);
    expect(hide).toMatchObject({
      kind: 'hide',
      to: 0,
      animated: true,
      predicted: true,
    });
    expect(hide?.start).toBeCloseTo(blurAt, 6);
    expect(hide?.curve).toEqual(uikitSpring);
    // Safari still reads the keyboard up once the spring ends: the hide
    // stands, with nothing turned back.
    vi.advanceTimersByTime(uikitTiming.keyboardNotificationMs + 200);
    expect(seen.at(-1)).toBe(hide);
    // Safari's report of the keyboard down confirms it.
    report(0);
    expect(seen.at(-1)).toBe(hide);
    expect(getKeyboardLayoutGuide(window).transition.predicted).toBe(false);
  });

  it('predicts no hide when focus moves into a frame, whose own field can keep the keyboard up', () => {
    const frame = document.createElement('iframe');
    document.body.append(frame);
    a.focus();
    report(336);
    seen.length = 0;
    frame.focus();
    vi.advanceTimersByTime(0);
    expect(document.activeElement).toBe(frame);
    expect(seen).toHaveLength(0);
  });

  it('decides once focus settles inside an open shadow root: a field there keeps the keyboard, a plain button takes it down', () => {
    const host = document.createElement('x-editor');
    const root = host.attachShadow({mode: 'open'});
    const inner = root.appendChild(document.createElement('input'));
    const plain = root.appendChild(document.createElement('button'));
    document.body.append(host);
    a.focus();
    report(336);
    seen.length = 0;
    inner.focus();
    vi.advanceTimersByTime(0);
    expect(seen).toHaveLength(0);
    a.focus();
    plain.focus();
    vi.advanceTimersByTime(0);
    expect(seen.at(-1)).toMatchObject({
      kind: 'hide',
      to: 0,
      predicted: true,
    });
  });

  it('turns a predicted hide back up when focus moves into a frame before the keyboard is down', () => {
    const frame = document.createElement('iframe');
    document.body.append(frame);
    a.focus();
    report(336);
    vi.advanceTimersByTime(1000);
    button.focus();
    expect(seen.at(-1)).toMatchObject({kind: 'hide', predicted: true});
    vi.advanceTimersByTime(100);
    frame.focus();
    expect(seen.at(-1)).toMatchObject({kind: 'show', to: 336});
    expect(seen.at(-1)?.curve).toEqual(uikitSpring);
  });

  it('moves nothing while focus moves between fields, or to a date field whose picker takes the keyboard’s place', () => {
    a.focus();
    report(336);
    seen.length = 0;
    b.focus();
    date.focus();
    expect(seen).toHaveLength(0);
  });
});
