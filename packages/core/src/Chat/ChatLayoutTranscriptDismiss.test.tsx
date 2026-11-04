// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ChatLayoutTranscriptDismiss.test.tsx
 * @input vitest, jsdom, ChatLayout, the gesture host, a stand-in visual
 *   viewport and timestamped touch and pointer events
 * @output Tests that ChatLayout loads the drag-to-dismiss when a software
 *   keyboard first shows, and attaches it to its root. A touch or pen drag
 *   lifted at or past the composer's top blurs the field, and a mouse drag
 *   changes nothing. It covers a replaced row and the listeners it adds.
 * @position Unit tests for ChatLayout's use of Chat/transcriptDismissLoader.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import {pointerQuery} from '../gestures/__tests__/pointerQuery';
import {ChatLayout} from './ChatLayout';

type FakeViewport = EventTarget & {
  height: number;
  offsetTop: number;
  scale: number;
};

const COVER = 300;
// The gesture host's clock never runs back, so each case starts later.
let clock = 0;
let viewport: FakeViewport;
let restorePointer: () => void = () => {};

function primaryPointer(kind: 'coarse' | 'fine') {
  restorePointer = pointerQuery(kind === 'coarse').restore;
}

function renderLayout() {
  render(
    <ChatLayout composer={<textarea aria-label="Message" />}>
      <p>Hello</p>
      <p>
        <span>Replaced</span>
      </p>
    </ChatLayout>,
  );
  const field = screen.getByRole('textbox', {name: 'Message'});
  // The composer's box: the field's container's container.
  const composer = field.parentElement?.parentElement as HTMLElement;
  const line = window.innerHeight - COVER - 60;
  composer.getBoundingClientRect = () => new DOMRect(0, line, 400, 60);
  return {field, composer, line, transcript: screen.getByText('Hello')};
}

// Focuses the field and shows the keyboard, then waits for the dismissal's
// gesture code to load.
async function showKeyboard(field: HTMLElement) {
  act(() => field.focus());
  viewport.height = window.innerHeight - COVER;
  act(() => {
    viewport.dispatchEvent(new Event('resize'));
  });
  await act(async () => {
    await vi.dynamicImportSettled();
  });
}

// One finger on `target`, as a touch event at `time` ms into the case.
function finger(
  target: EventTarget,
  type: 'touchstart' | 'touchmove' | 'touchend',
  clientY: number,
  time: number,
) {
  const point = {identifier: 0, clientX: 100, clientY, target};
  const event = new Event(type, {bubbles: true, cancelable: true});
  Object.defineProperty(event, 'changedTouches', {value: [point]});
  Object.defineProperty(event, 'touches', {
    value: type === 'touchend' ? [] : [point],
  });
  Object.defineProperty(event, 'timeStamp', {value: clock + time});
  act(() => {
    target.dispatchEvent(event);
  });
}

// A finger's drag from `from` to `to`, a sample per 60 Hz frame: returns the
// time of the last sample.
function fingerDrag(target: EventTarget, from: number, to: number): number {
  finger(target, 'touchstart', from, 0);
  const steps = Math.max(1, Math.ceil(Math.abs(to - from) / 8));
  let time = 0;
  for (let i = 1; i <= steps; i++) {
    time = i * 16;
    finger(target, 'touchmove', from + ((to - from) * i) / steps, time);
  }
  return time;
}

// A mouse's or a pen's pointer event; returns it, to read what it prevented.
function pointer(
  target: EventTarget,
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  pointerType: 'mouse' | 'pen',
  clientY: number,
  time: number,
): Event {
  const event = new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    pointerId: 7,
    isPrimary: true,
    pointerType,
    clientX: 100,
    clientY,
    button: type === 'pointermove' ? -1 : 0,
    buttons: type === 'pointerup' ? 0 : 1,
  });
  Object.defineProperty(event, 'timeStamp', {value: clock + time});
  act(() => {
    target.dispatchEvent(event);
  });
  return event;
}

// A mouse's or a pen's drag, ending with its release: returns every event.
function pointerDrag(
  target: EventTarget,
  pointerType: 'mouse' | 'pen',
  from: number,
  to: number,
): Event[] {
  const events = [pointer(target, 'pointerdown', pointerType, from, 0)];
  const steps = Math.max(1, Math.ceil(Math.abs(to - from) / 8));
  let time = 0;
  for (let i = 1; i <= steps; i++) {
    time = i * 16;
    const y = from + ((to - from) * i) / steps;
    events.push(pointer(target, 'pointermove', pointerType, y, time));
  }
  events.push(pointer(target, 'pointerup', pointerType, to, time + 100));
  return events;
}

describe('ChatLayout dismisses the keyboard from a transcript drag (FR10)', () => {
  beforeEach(() => {
    clock += 100_000;
    viewport = Object.assign(new EventTarget(), {
      height: window.innerHeight,
      offsetTop: 0,
      scale: 1,
    });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: viewport,
    });
    // A touch screen: the dismissal loads only where touch or pen input is.
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      configurable: true,
      value: 5,
    });
  });

  afterEach(() => {
    restorePointer();
    restorePointer = () => {};
    Reflect.deleteProperty(window, 'visualViewport');
    Reflect.deleteProperty(window.navigator, 'maxTouchPoints');
    vi.restoreAllMocks();
  });

  it('blurs the composer when a finger’s drag lifts at the composer’s top, and moves focus nowhere else', async () => {
    primaryPointer('coarse');
    const {field, line, transcript} = renderLayout();
    await showKeyboard(field);
    const last = fingerDrag(transcript, 100, line);
    // The drag decides at the lift (spec:AST-094 FR36).
    expect(document.activeElement).toBe(field);
    finger(transcript, 'touchend', line, last + 100);
    expect(document.activeElement).toBe(document.body);
  });

  it('keeps the keyboard when the drag lifts above the composer', async () => {
    primaryPointer('coarse');
    const {field, line, transcript} = renderLayout();
    await showKeyboard(field);
    const last = fingerDrag(transcript, 100, line - 1);
    finger(transcript, 'touchend', line - 1, last + 100);
    expect(document.activeElement).toBe(field);
  });

  it('reads the line from where the page draws the composer, after the browser pans to the field', async () => {
    primaryPointer('coarse');
    const {field, composer, transcript} = renderLayout();
    // Mobile Safari's own pan: the composer keeps its place at the layout
    // viewport's bottom, drawn just above the keyboard.
    const top = window.innerHeight - 60;
    composer.getBoundingClientRect = () => new DOMRect(0, top, 400, 60);
    viewport.offsetTop = COVER;
    await showKeyboard(field);
    let last = fingerDrag(transcript, 300, top - 1);
    finger(transcript, 'touchend', top - 1, last + 100);
    expect(document.activeElement).toBe(field);
    clock += 10_000;
    last = fingerDrag(transcript, 300, top + 4);
    finger(transcript, 'touchend', top + 4, last + 100);
    expect(document.activeElement).toBe(document.body);
  });

  it('dismisses when the finger moves back up, then rests before lifting past the composer’s top', async () => {
    // After a still rest the release velocity is 0, as every pan reads it.
    primaryPointer('coarse');
    const {field, line, transcript} = renderLayout();
    await showKeyboard(field);
    let last = fingerDrag(transcript, 100, line + 80);
    for (let y = line + 72; y >= line + 40; y -= 8) {
      last += 16;
      finger(transcript, 'touchmove', y, last);
    }
    finger(transcript, 'touchend', line + 40, last + 100);
    expect(document.activeElement).toBe(document.body);
  });

  it('starts no drag from the lift alone: moves under the 10 px hysteresis keep the keyboard', async () => {
    primaryPointer('coarse');
    const {field, line, transcript} = renderLayout();
    await showKeyboard(field);
    finger(transcript, 'touchstart', line - 6, 0);
    finger(transcript, 'touchmove', line + 2, 16);
    // The lift reports 10 px of travel; the pan reads no travel from it.
    finger(transcript, 'touchend', line + 4, 116);
    expect(document.activeElement).toBe(field);
  });

  it('follows a drag whose row the transcript replaces before the lift', async () => {
    // The browser keeps sending a touch's events to the node it began on,
    // even once that node leaves the page.
    primaryPointer('coarse');
    const {field, line} = renderLayout();
    await showKeyboard(field);
    const row = screen.getByText('Replaced');
    finger(row, 'touchstart', 100, 0);
    finger(row, 'touchmove', 140, 16);
    act(() => row.replaceWith(document.createElement('span')));
    let time = 16;
    for (let y = 148; y <= line + 8; y += 8) {
      time += 16;
      finger(row, 'touchmove', y, time);
    }
    finger(row, 'touchend', line + 8, time + 100);
    expect(document.activeElement).toBe(document.body);
  });

  it('dismisses from a finger’s drag where the primary pointer is fine, as on a touch-screen laptop (spec:AST-094 FR43)', async () => {
    primaryPointer('fine');
    const {field, line, transcript} = renderLayout();
    await showKeyboard(field);
    // Such a finger sends each pointer event before its touch event.
    const both = (
      type: 'start' | 'move' | 'end',
      clientY: number,
      time: number,
    ) => {
      const pointerType = {start: 'down', move: 'move', end: 'up'}[type];
      const event = new PointerEvent(`pointer${pointerType}`, {
        bubbles: true,
        cancelable: true,
        pointerId: 3,
        isPrimary: true,
        pointerType: 'touch',
        clientX: 100,
        clientY,
        buttons: type === 'end' ? 0 : 1,
      });
      Object.defineProperty(event, 'timeStamp', {value: clock + time});
      act(() => {
        transcript.dispatchEvent(event);
      });
      finger(transcript, `touch${type}`, clientY, time);
    };
    both('start', 100, 0);
    let time = 0;
    for (let y = 108; y <= line; y += 8) {
      time += 16;
      both('move', y, time);
    }
    both('end', line, time + 100);
    expect(document.activeElement).toBe(document.body);
  });

  it('dismisses from a pen’s drag reported as pointer events (spec:AST-094 FR43)', async () => {
    primaryPointer('coarse');
    const {field, line, transcript} = renderLayout();
    await showKeyboard(field);
    pointerDrag(transcript, 'pen', 100, line + 20);
    expect(document.activeElement).toBe(document.body);
  });

  it('leaves a mouse drag to the browser: it keeps focus, prevents nothing and captures no pointer', async () => {
    // A desktop browser: the press itself moves focus, so main's behavior is
    // the browser's, and the dismissal adds nothing to it.
    primaryPointer('fine');
    // jsdom has no pointer capture: record every call to it.
    const capture = vi.fn();
    Object.defineProperty(Element.prototype, 'setPointerCapture', {
      configurable: true,
      value: capture,
    });
    try {
      const {field, line, transcript} = renderLayout();
      await showKeyboard(field);
      const events = pointerDrag(transcript, 'mouse', 100, line + 20);
      expect(events.map(event => event.defaultPrevented)).not.toContain(true);
      expect(capture).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(field);
    } finally {
      Reflect.deleteProperty(Element.prototype, 'setPointerCapture');
    }
  });

  it('adds nothing until a software keyboard shows, then one passive pointerdown on the layout’s root where the primary pointer is fine (spec:AST-094 FR24)', async () => {
    primaryPointer('fine');
    const added: {target: EventTarget; type: string; options: unknown}[] = [];
    const add = EventTarget.prototype.addEventListener;
    vi.spyOn(EventTarget.prototype, 'addEventListener').mockImplementation(
      function (this: EventTarget, ...args) {
        added.push({target: this, type: args[0], options: args[2]});
        return add.apply(this, args);
      },
    );
    const {composer, field, transcript} = renderLayout();
    const root = transcript.closest('[data-density]') as HTMLElement;
    const inputOn = (target: EventTarget) =>
      added.filter(
        entry =>
          entry.target === target &&
          (entry.type.startsWith('touch') || entry.type.startsWith('pointer')),
      );
    expect(inputOn(root)).toEqual([]);
    await showKeyboard(field);
    expect(inputOn(root).map(entry => entry.type)).toEqual(['pointerdown']);
    expect(inputOn(root)[0]?.options).toMatchObject({passive: true});
    expect(inputOn(composer)).toEqual([]);
    expect(inputOn(window)).toEqual([]);
    expect(inputOn(document)).toEqual([]);
  });

  it('never loads the dismissal in a window with no touch or pen input', async () => {
    primaryPointer('fine');
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      configurable: true,
      value: 0,
    });
    const subscribe = vi.spyOn(viewport, 'addEventListener');
    const {field, transcript} = renderLayout();
    const root = transcript.closest('[data-density]') as HTMLElement;
    const rootAdd = vi.spyOn(root, 'addEventListener');
    await showKeyboard(field);
    expect(subscribe).not.toHaveBeenCalled();
    expect(rootAdd).not.toHaveBeenCalled();
  });

  it('shares one window listener per touch event between two layouts where the primary pointer is coarse (spec:AST-094 FR24)', async () => {
    primaryPointer('coarse');
    const windowAdd = vi.spyOn(window, 'addEventListener');
    render(
      <>
        <ChatLayout composer={<textarea aria-label="First" />}>
          <p>One</p>
        </ChatLayout>
        <ChatLayout composer={<textarea aria-label="Second" />}>
          <p>Two</p>
        </ChatLayout>
      </>,
    );
    await showKeyboard(screen.getByRole('textbox', {name: 'First'}));
    const touchTypes = windowAdd.mock.calls
      .map(([type]) => type)
      .filter(type => type.startsWith('touch'));
    expect(touchTypes.filter(type => type === 'touchstart')).toHaveLength(1);
  });
});

describe('what the drag-to-dismiss loads', () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const read = (file: string) => fs.readFileSync(path.join(here, file), 'utf8');

  it('goes through the gesture system’s pan, with no listener of its own', () => {
    const dismissal = read('transcriptDismiss.ts');
    expect(dismissal.match(/from '\.\.\/gestures\/[^']*'/g)).toEqual([
      "from '../gestures/GestureHost'",
      "from '../gestures/PanGestureRecognizer'",
      "from '../gestures/types'",
    ]);
    expect(dismissal).not.toMatch(/addEventListener|subscribeInput/);
  });

  it('loads the gesture code only through the loader’s dynamic import', () => {
    expect(read('ChatLayout.tsx')).not.toMatch(
      /from '\.\/transcriptDismiss'|gestures\//,
    );
    const loader = read('transcriptDismissLoader.ts');
    expect(loader).toMatch(/import\('\.\/transcriptDismiss'\)/);
    expect(loader).not.toMatch(/from '\.\.\/gestures\//);
  });
});
