// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ChatLayoutTranscriptDismiss.test.tsx
 * @input vitest, jsdom, ChatLayout, a stand-in visual viewport and
 *   timestamped touch streams
 * @output Tests that ChatLayout opts its transcript into the drag-to-dismiss.
 *   A drag lifted at or past the composer's top blurs the field, and focus
 *   moves nowhere else. A drag lifted above it keeps the keyboard.
 * @position Unit tests for ChatLayout's installer of Chat/transcriptDismiss.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import {ChatLayout} from './ChatLayout';

type FakeViewport = EventTarget & {
  height: number;
  offsetTop: number;
  scale: number;
  width?: number;
};

const COVER = 300;
let viewport: FakeViewport;

function primaryPointer(kind: 'coarse' | 'fine') {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === `(pointer: ${kind})`,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
}

function renderLayout() {
  render(
    <ChatLayout composer={<textarea aria-label="Message" />}>
      <p>Hello</p>
    </ChatLayout>,
  );
  const field = screen.getByRole('textbox', {name: 'Message'});
  // The composer's box: the field's container's container.
  const composer = field.parentElement?.parentElement as HTMLElement;
  return {field, composer, transcript: screen.getByText('Hello')};
}

function showKeyboard() {
  viewport.height = window.innerHeight - COVER;
  act(() => {
    viewport.dispatchEvent(new Event('resize'));
  });
}

// One finger on `target`: a sample per call, at `time`.
function finger(target: Element, type: string, clientY: number, time: number) {
  const point = {identifier: 0, clientX: 100, clientY};
  const event = new Event(type, {bubbles: true});
  Object.assign(event, {
    touches: type === 'touchend' ? [] : [point],
    changedTouches: [point],
  });
  Object.defineProperty(event, 'timeStamp', {value: time});
  act(() => {
    target.dispatchEvent(event);
  });
}

describe('ChatLayout dismisses the keyboard from a transcript drag (FR10)', () => {
  beforeEach(() => {
    viewport = Object.assign(new EventTarget(), {
      height: window.innerHeight,
      offsetTop: 0,
      scale: 1,
    });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: viewport,
    });
  });

  afterEach(() => {
    Reflect.deleteProperty(window, 'visualViewport');
    vi.unstubAllGlobals();
  });

  it('blurs the composer when a drag lifts at the composer’s top, and moves focus nowhere else', () => {
    primaryPointer('coarse');
    const {field, composer, transcript} = renderLayout();
    composer.getBoundingClientRect = () =>
      new DOMRect(0, window.innerHeight - COVER - 60, 400, 60);
    act(() => field.focus());
    showKeyboard();
    const line = window.innerHeight - COVER - 60;
    finger(transcript, 'touchstart', 100, 0);
    finger(transcript, 'touchmove', line, 16);
    // The drag decides at the lift (spec:AST-094 FR36).
    expect(document.activeElement).toBe(field);
    finger(transcript, 'touchend', line, 116);
    expect(document.activeElement).toBe(document.body);
  });

  it('keeps the keyboard when the drag lifts above the composer', () => {
    primaryPointer('coarse');
    const {field, composer, transcript} = renderLayout();
    composer.getBoundingClientRect = () =>
      new DOMRect(0, window.innerHeight - COVER - 60, 400, 60);
    act(() => field.focus());
    showKeyboard();
    const line = window.innerHeight - COVER - 60;
    finger(transcript, 'touchstart', 100, 0);
    finger(transcript, 'touchmove', line - 1, 16);
    finger(transcript, 'touchend', line - 1, 116);
    expect(document.activeElement).toBe(field);
  });

  it('reads the line from where the page draws the composer, after the browser pans to the field', () => {
    primaryPointer('coarse');
    const {field, composer, transcript} = renderLayout();
    // Mobile Safari's own pan: the composer keeps its place at the layout
    // viewport's bottom, drawn just above the keyboard.
    const top = window.innerHeight - 60;
    composer.getBoundingClientRect = () => new DOMRect(0, top, 400, 60);
    act(() => field.focus());
    viewport.offsetTop = COVER;
    showKeyboard();
    finger(transcript, 'touchstart', 300, 0);
    finger(transcript, 'touchmove', top - 1, 16);
    finger(transcript, 'touchend', top - 1, 116);
    expect(document.activeElement).toBe(field);
    finger(transcript, 'touchstart', 300, 1000);
    finger(transcript, 'touchmove', top + 4, 1016);
    finger(transcript, 'touchend', top + 4, 1116);
    expect(document.activeElement).toBe(document.body);
  });

  it('dismisses from a finger’s drag where the primary pointer is fine, as on a touch-screen laptop (spec:AST-094 FR43)', () => {
    primaryPointer('fine');
    const {field, composer, transcript} = renderLayout();
    composer.getBoundingClientRect = () =>
      new DOMRect(0, window.innerHeight - COVER - 60, 400, 60);
    act(() => field.focus());
    showKeyboard();
    const line = window.innerHeight - COVER - 60;
    finger(transcript, 'touchstart', 100, 0);
    finger(transcript, 'touchmove', line, 16);
    finger(transcript, 'touchend', line, 116);
    expect(document.activeElement).toBe(document.body);
  });

  it('listens on the layout’s root only: one listener of each kind, and none on the composer (spec:AST-094 FR24)', () => {
    primaryPointer('fine');
    const added: {target: EventTarget; type: string}[] = [];
    const add = EventTarget.prototype.addEventListener;
    vi.spyOn(EventTarget.prototype, 'addEventListener').mockImplementation(
      function (this: EventTarget, ...args) {
        added.push({target: this, type: args[0]});
        return add.apply(this, args);
      },
    );
    const {composer, transcript} = renderLayout();
    const root = transcript.closest('[data-density]') as HTMLElement;
    const on = (target: EventTarget) =>
      added
        .filter(entry => entry.target === target)
        .map(entry => entry.type)
        .filter(type => type.startsWith('touch') || type === 'pointerdown');
    expect(on(root)).toEqual([
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'pointerdown',
    ]);
    expect(on(composer)).toEqual([]);
  });

  it('attaches nothing in a frame, where the keyboard module measures nothing', () => {
    const frame = document.createElement('iframe');
    document.body.append(frame);
    try {
      const frameWindow = frame.contentWindow as Window & typeof globalThis;
      const added: {target: EventTarget; type: string}[] = [];
      const add = frameWindow.EventTarget.prototype.addEventListener;
      frameWindow.EventTarget.prototype.addEventListener = function (
        this: EventTarget,
        ...args: Parameters<EventTarget['addEventListener']>
      ) {
        added.push({target: this, type: args[0]});
        return add.apply(this, args);
      };
      const container = frameWindow.document.body.appendChild(
        frameWindow.document.createElement('div'),
      );
      const {unmount} = render(
        <ChatLayout composer={<textarea aria-label="Message" />}>
          <p>Hello</p>
        </ChatLayout>,
        {container},
      );
      // React's own listeners sit on the container. The layout's root takes
      // only its auto-follow's scroll listeners.
      const root = container.firstElementChild as HTMLElement;
      expect(
        added
          .filter(entry => entry.target === root)
          .map(entry => entry.type)
          .filter(type => type.startsWith('touch') || type === 'pointerdown'),
      ).toEqual([]);
      unmount();
    } finally {
      frame.remove();
    }
  });
});

describe('what the drag-to-dismiss loads', () => {
  it('reads only the shared velocity tracker from the gestures module', () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const dismissal = fs.readFileSync(
      path.join(here, 'transcriptDismiss.ts'),
      'utf8',
    );
    expect(dismissal.match(/from '\.\.\/gestures\/[^']*'/g)).toEqual([
      "from '../gestures/VelocityTracker'",
    ]);
  });
});
