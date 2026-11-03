// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboardTarget.test.ts
 * @input keyboardTarget.ts, a stand-in visual viewport, stubbed boxes and a
 *   coarse pointer
 * @output Tests for the keyboard targets: where a field is, the reveal by its
 *   scroller, the docked ride, the stand-down inside a target and the claim
 * @position Keyboard module tests
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act} from '@testing-library/react';
import {animatorFor} from '../motion/animator';
import {__resetLayoutViewportForTest} from '../utils/layoutViewport';
import {
  FIELD_OFFSET,
  coveredBy,
  dockedAncestor,
  followKeyboard,
  keepFieldAboveKeyboard,
  nearestScroller,
  registerKeyboardTarget,
} from './keyboardTarget';

type FakeViewport = EventTarget & {
  height: number;
  offsetTop: number;
  scale: number;
};

let viewport: FakeViewport;
let isCoarse = true;
const stops: (() => void)[] = [];

/** The keyboard now covers `cover` px of the layout viewport's bottom. */
function keyboard(cover: number) {
  viewport.height = window.innerHeight - cover;
  act(() => {
    viewport.dispatchEvent(new Event('resize'));
  });
}

// A box laid out from `data-top` and `data-height`, moved by its own inline
// translate and its ancestors', as a browser draws a ridden element.
function translateY(element: Element | null): number {
  let y = 0;
  for (
    let node = element;
    node instanceof HTMLElement;
    node = node.parentElement
  ) {
    const match = /^\S+\s+(-?[\d.]+)px/.exec(node.style.translate);
    y += match == null ? 0 : Number(match[1]);
  }
  return y;
}

// How far the element's scrolling ancestors have scrolled it up.
function scrolledBy(element: Element): number {
  let y = 0;
  for (
    let node = element.parentElement;
    node != null;
    node = node.parentElement
  ) {
    if (node.hasAttribute('data-top')) {
      y += node.scrollTop;
    }
  }
  return y;
}

function boxOf(element: Element): DOMRect {
  const top = Number(element.getAttribute('data-top') ?? 0);
  const height = Number(element.getAttribute('data-height') ?? 0);
  const y = top + translateY(element) - scrolledBy(element);
  return new DOMRect(0, y, 300, height);
}

function element(
  tag: string,
  box: {top: number; height: number} | null,
  style: Partial<CSSStyleDeclaration> = {},
): HTMLElement {
  const node = document.createElement(tag);
  if (box != null) {
    node.setAttribute('data-top', String(box.top));
    node.setAttribute('data-height', String(box.height));
  }
  Object.assign(node.style, style);
  return node;
}

function track(stop: () => void) {
  stops.push(stop);
  return stop;
}

beforeEach(() => {
  isCoarse = true;
  viewport = Object.assign(new EventTarget(), {
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
      matches: query.includes('pointer: coarse') ? isCoarse : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
    function (this: Element) {
      return boxOf(this);
    },
  );
});

afterEach(() => {
  for (const stop of stops.splice(0)) {
    stop();
  }
  document.body.innerHTML = '';
  Reflect.deleteProperty(window, 'visualViewport');
  __resetLayoutViewportForTest();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('where a field is', () => {
  it('finds its nearest scroller, or else the document', () => {
    const list = element('div', {top: 0, height: 400}, {overflowY: 'auto'});
    const input = element('input', {top: 100, height: 40});
    list.append(input);
    document.body.append(list);
    Object.defineProperty(list, 'scrollHeight', {value: 900});
    Object.defineProperty(list, 'clientHeight', {value: 400});
    expect(nearestScroller(input)).toBe(list);

    const loose = element('input', {top: 100, height: 40});
    document.body.append(loose);
    expect(nearestScroller(loose)).toBe(
      document.scrollingElement ?? document.documentElement,
    );
  });

  it("counts a fixed bar whose bottom sits at the viewport's bottom as docked, and not one floating above it", () => {
    const bottom = window.innerHeight;
    const bar = element(
      'div',
      {top: bottom - 60, height: 60},
      {position: 'fixed'},
    );
    const input = element('input', {top: bottom - 50, height: 40});
    bar.append(input);
    document.body.append(bar);
    expect(dockedAncestor(input)).toBe(bar);

    const floating = element(
      'div',
      {top: bottom - 70, height: 50},
      {position: 'fixed'},
    );
    const inner = element('input', {top: bottom - 65, height: 40});
    floating.append(inner);
    document.body.append(floating);
    expect(dockedAncestor(inner)).toBeNull();
  });

  it('never counts a container that fills the viewport, or a fixed header at the top, as docked', () => {
    const dialog = element(
      'div',
      {top: 0, height: window.innerHeight},
      {position: 'fixed'},
    );
    const field = element('input', {top: 600, height: 40});
    dialog.append(field);
    const header = element('div', {top: 0, height: 60}, {position: 'fixed'});
    const search = element('input', {top: 10, height: 40});
    header.append(search);
    document.body.append(dialog, header);
    expect(dockedAncestor(field)).toBeNull();
    expect(dockedAncestor(search)).toBeNull();
  });

  it('measures how far an edge sits under the keyboard, with the offset, and nothing without a keyboard', () => {
    const top = window.innerHeight - 300;
    expect(coveredBy(top + 10, 300, 0, window)).toBe(10);
    expect(coveredBy(top - 30, 300, FIELD_OFFSET, window)).toBe(0);
    expect(coveredBy(top, 300, FIELD_OFFSET, window)).toBe(FIELD_OFFSET);
    expect(coveredBy(window.innerHeight, 0, FIELD_OFFSET, window)).toBe(0);
  });
});

describe('keepFieldAboveKeyboard', () => {
  it('scrolls the page until a field in it sits the offset above the keyboard, in the report itself', () => {
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const input = element('input', {top: 660, height: 40});
    document.body.append(input);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(300);
    const keyboardTop = window.innerHeight - 300;
    expect(scrollBy).toHaveBeenCalledTimes(1);
    expect(scrollBy).toHaveBeenCalledWith({
      top: 700 + FIELD_OFFSET - keyboardTop,
      behavior: 'instant',
    });
  });

  it('scrolls its own scroller when it sits in one, and leaves the page alone', () => {
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const list = element('div', {top: 0, height: 760}, {overflowY: 'auto'});
    Object.defineProperty(list, 'scrollHeight', {value: 2000});
    Object.defineProperty(list, 'clientHeight', {value: 760});
    const input = element('input', {top: 600, height: 40});
    list.append(input);
    document.body.append(list);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(300);
    expect(list.scrollTop).toBe(
      640 + FIELD_OFFSET - (window.innerHeight - 300),
    );
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('scrolls the scrollers around its own for what that one cannot scroll, the document last', () => {
    let pageY = 0;
    const scrollYDescriptor = Object.getOwnPropertyDescriptor(
      window,
      'scrollY',
    );
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => pageY,
    });
    const scrollBy = vi.fn(({top}: {top: number}) => {
      pageY += top;
    });
    vi.stubGlobal('scrollBy', scrollBy);
    const list = element('div', {top: 0, height: 760}, {overflowY: 'auto'});
    Object.defineProperty(list, 'scrollHeight', {value: 900});
    Object.defineProperty(list, 'clientHeight', {value: 760});
    // The list has 140 px of range left.
    let listTop = 0;
    Object.defineProperty(list, 'scrollTop', {
      configurable: true,
      get: () => listTop,
      set: (value: number) => {
        listTop = Math.max(0, Math.min(140, value));
      },
    });
    const input = element('input', {top: 660, height: 40});
    list.append(input);
    document.body.append(list);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(300);
    const distance = 700 + FIELD_OFFSET - (window.innerHeight - 300);
    expect(list.scrollTop).toBe(140);
    expect(scrollBy).toHaveBeenCalledWith({
      top: distance - 140,
      behavior: 'instant',
    });
    if (scrollYDescriptor == null) {
      Reflect.deleteProperty(window, 'scrollY');
    } else {
      Object.defineProperty(window, 'scrollY', scrollYDescriptor);
    }
  });

  it('rides its docked bar above the keyboard and brings it back once the keyboard has gone', () => {
    const bottom = window.innerHeight;
    const bar = element(
      'div',
      {top: bottom - 60, height: 60},
      {position: 'fixed'},
    );
    const input = element('input', {top: bottom - 50, height: 40});
    bar.append(input);
    document.body.append(bar);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(300);
    // The field's bottom edge (bottom - 10) ends the offset above the
    // keyboard's top, which also clears the bar's own bottom edge.
    const lift = bottom - 10 + FIELD_OFFSET - (bottom - 300);
    expect(animatorFor(bar).get('y')).toBe(-lift);
    // Leaving the field for nothing while the keyboard still shows moves
    // nothing until the keyboard goes.
    act(() => input.blur());
    expect(animatorFor(bar).get('y')).toBe(-lift);
    keyboard(0);
    expect(animatorFor(bar).get('y')).toBe(0);
    // At rest the ridden bar carries no translate of its own.
    expect(['', 'none']).toContain(bar.style.translate);
  });

  it("keeps the bar up when focus moves to another field in it, even as the first field's path detaches", () => {
    const bottom = window.innerHeight;
    const bar = element(
      'div',
      {top: bottom - 60, height: 60},
      {position: 'fixed'},
    );
    const first = element('input', {top: bottom - 50, height: 40});
    const second = element('input', {top: bottom - 50, height: 40});
    bar.append(first, second);
    document.body.append(bar);
    const stopFirst = keepFieldAboveKeyboard(first);
    track(keepFieldAboveKeyboard(second));
    act(() => first.focus());
    keyboard(300);
    const lift = bottom - 10 + FIELD_OFFSET - (bottom - 300);
    expect(animatorFor(bar).get('y')).toBe(-lift);
    act(() => second.focus());
    expect(animatorFor(bar).get('y')).toBe(-lift);
    stopFirst();
    expect(animatorFor(bar).get('y')).toBe(-lift);
  });

  it("leaves a field in a container that fills the viewport to the browser's own reveal, and never moves the container", () => {
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const dialog = element(
      'div',
      {top: 0, height: window.innerHeight},
      {position: 'fixed'},
    );
    const body = element(
      'div',
      {top: 0, height: window.innerHeight},
      {overflowY: 'auto'},
    );
    Object.defineProperty(body, 'scrollHeight', {value: 1600});
    Object.defineProperty(body, 'clientHeight', {value: window.innerHeight});
    const other = element('input', {top: 10, height: 40});
    const input = element('input', {top: 640, height: 40});
    body.append(other, input);
    dialog.append(body);
    document.body.append(dialog);
    track(keepFieldAboveKeyboard(input));
    act(() => other.focus());
    const focus = vi.spyOn(input, 'focus');
    act(() => input.focus());
    // The focus move is not claimed: the browser's own focus step runs.
    expect(focus).not.toHaveBeenCalledWith({preventScroll: true});
    keyboard(300);
    expect(body.scrollTop).toBe(0);
    expect(scrollBy).not.toHaveBeenCalled();
    expect(animatorFor(dialog).get('y')).toBe(0);
  });

  it('scrolls a field above the view down into it when it gains focus', () => {
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const input = element('input', {top: -200, height: 40});
    document.body.append(input);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    expect(scrollBy).toHaveBeenCalledWith({top: -200, behavior: 'instant'});
  });

  it('scrolls a field below the view into it with no keyboard up, as a hardware Tab reaches it', () => {
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const input = element('input', {top: window.innerHeight + 100, height: 40});
    document.body.append(input);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    expect(scrollBy).toHaveBeenCalledWith({top: 140, behavior: 'instant'});
  });

  it("raises the tap's click once after a claimed tap, so a listener on the field or an ancestor still runs", () => {
    const wrapper = element('div', null);
    const input = element('input', {top: 660, height: 40});
    wrapper.append(input);
    document.body.append(wrapper);
    const onField = vi.fn();
    const onAncestor = vi.fn();
    input.addEventListener('click', onField);
    wrapper.addEventListener('click', onAncestor);
    track(keepFieldAboveKeyboard(input));
    const touch = (type: string) => {
      const event = new Event(type, {bubbles: true, cancelable: true});
      const point = {
        identifier: 0,
        clientX: 40,
        clientY: 680,
        screenX: 41,
        screenY: 742,
      };
      Object.assign(event, {
        touches: type === 'touchend' ? [] : [point],
        changedTouches: [point],
      });
      return event;
    };
    act(() => {
      input.dispatchEvent(touch('touchstart'));
    });
    act(() => {
      input.dispatchEvent(touch('touchend'));
    });
    expect(document.activeElement).toBe(input);
    expect(onField).toHaveBeenCalledTimes(1);
    expect(onAncestor).toHaveBeenCalledTimes(1);
    const click = onField.mock.calls[0][0] as PointerEvent;
    expect(click.isTrusted).toBe(false);
    expect(click.pointerType).toBe('touch');
    expect([
      click.clientX,
      click.clientY,
      click.screenX,
      click.screenY,
      click.detail,
    ]).toEqual([40, 680, 41, 742, 1]);
  });

  it('puts back a pan the browser makes on its own after a focus no claim saw', () => {
    vi.stubGlobal('scrollBy', vi.fn());
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    const input = element('input', {top: 300, height: 40});
    document.body.append(input);
    track(keepFieldAboveKeyboard(input));
    // A script focuses the field while nothing has focus: no blur, no tap.
    act(() => input.focus());
    keyboard(300);
    expect(scrollIntoView).not.toHaveBeenCalled();
    // The browser pans the visual viewport down to the field by itself.
    viewport.offsetTop = 120;
    act(() => {
      viewport.dispatchEvent(new Event('scroll'));
    });
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
  });

  it('moves nothing inside a keyboard target, which keeps its own fields clear', () => {
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const sheet = element('div', {top: 300, height: 468});
    const input = element('input', {top: 700, height: 40});
    sheet.append(input);
    document.body.append(sheet);
    track(registerKeyboardTarget(sheet));
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(300);
    expect(scrollBy).not.toHaveBeenCalled();
    expect(animatorFor(sheet).get('y')).toBe(0);
  });

  it('takes a focus move into the field without the browser reveal', () => {
    const other = element('input', {top: 10, height: 40});
    const input = element('input', {top: 660, height: 40});
    document.body.append(other, input);
    track(keepFieldAboveKeyboard(input));
    act(() => other.focus());
    const focus = vi.spyOn(input, 'focus');
    act(() => input.focus());
    expect(focus).toHaveBeenCalledWith({preventScroll: true});
    expect(document.activeElement).toBe(input);
  });

  it("takes a first tap on the field itself, so the browser's tap focus cannot pan the page", () => {
    const input = element('input', {top: 660, height: 40});
    document.body.append(input);
    track(keepFieldAboveKeyboard(input));
    const focus = vi.spyOn(input, 'focus');
    const touch = (type: string) => {
      const event = new Event(type, {bubbles: true, cancelable: true});
      const points =
        type === 'touchend' ? [] : [{identifier: 0, clientX: 40, clientY: 680}];
      Object.assign(event, {
        touches: points,
        changedTouches: [{identifier: 0, clientX: 40, clientY: 680}],
      });
      return event;
    };
    act(() => {
      input.dispatchEvent(touch('touchstart'));
    });
    const end = touch('touchend');
    act(() => {
      input.dispatchEvent(end);
    });
    expect(end.defaultPrevented).toBe(true);
    expect(focus).toHaveBeenCalledWith({preventScroll: true});
    expect(document.activeElement).toBe(input);
  });

  it('attaches nothing under a mouse or a trackpad', () => {
    isCoarse = false;
    const scrollBy = vi.fn();
    vi.stubGlobal('scrollBy', scrollBy);
    const input = element('input', {top: 660, height: 40});
    document.body.append(input);
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(300);
    expect(scrollBy).not.toHaveBeenCalled();
  });
});

describe('followKeyboard', () => {
  it("rides a docked target with its focused field and registers it, so the field's own path stands down", () => {
    const bottom = window.innerHeight;
    const dock = element(
      'div',
      {top: bottom - 80, height: 80},
      {position: 'fixed'},
    );
    const input = element('textarea', {top: bottom - 64, height: 48});
    dock.append(input);
    document.body.append(dock);
    track(followKeyboard(dock, {move: 'ride', offset: 8}));
    track(keepFieldAboveKeyboard(input));
    act(() => input.focus());
    keyboard(320);
    // The dock's bottom edge reaches the keyboard's top; the field already
    // keeps 8 px above it.
    expect(animatorFor(dock).get('y')).toBe(-320);
  });

  it("moves nothing but the focused field's fixed ancestor docked at the viewport's bottom", () => {
    const bottom = window.innerHeight;
    // A sticky target is no fixed container: it never moves.
    const sticky = element(
      'div',
      {top: bottom - 80, height: 80},
      {position: 'sticky'},
    );
    const inSticky = element('textarea', {top: bottom - 64, height: 48});
    sticky.append(inSticky);
    // A fixed bar floating above the bottom edge is not docked: it never moves.
    const floating = element(
      'div',
      {top: bottom - 140, height: 60},
      {position: 'fixed'},
    );
    const inFloating = element('input', {top: bottom - 130, height: 40});
    floating.append(inFloating);
    // The docked bar moves, and only it: not its page wrapper.
    const wrapper = element('div', null);
    const docked = element(
      'div',
      {top: bottom - 60, height: 60},
      {position: 'fixed'},
    );
    const inDocked = element('input', {top: bottom - 50, height: 40});
    docked.append(inDocked);
    wrapper.append(docked);
    document.body.append(sticky, floating, wrapper);
    track(followKeyboard(sticky, {move: 'ride', offset: 8}));
    track(followKeyboard(floating, {move: 'ride', offset: 8}));
    track(keepFieldAboveKeyboard(inDocked));
    act(() => inSticky.focus());
    keyboard(300);
    expect(animatorFor(sticky).get('y')).toBe(0);
    act(() => inFloating.focus());
    expect(animatorFor(floating).get('y')).toBe(0);
    act(() => inDocked.focus());
    expect(animatorFor(docked).get('y')).toBeLessThan(0);
    const moved = [...document.querySelectorAll<HTMLElement>('*')].filter(
      node => node.style.translate !== '' && node.style.translate !== 'none',
    );
    expect(moved).toEqual([docked]);
  });

  it('reveals the next field at once when focus moves with the keyboard up, with no new report', () => {
    const list = element('div', {top: 0, height: 760}, {overflowY: 'auto'});
    Object.defineProperty(list, 'scrollHeight', {value: 2000});
    Object.defineProperty(list, 'clientHeight', {value: 760});
    const first = element('input', {top: 100, height: 40});
    const next = element('input', {top: 640, height: 40});
    list.append(first, next);
    document.body.append(list);
    track(followKeyboard(list, {move: 'reveal', offset: FIELD_OFFSET}));
    act(() => first.focus());
    keyboard(300);
    expect(list.scrollTop).toBe(0);
    act(() => next.focus());
    expect(list.scrollTop).toBe(
      680 + FIELD_OFFSET - (window.innerHeight - 300),
    );
  });

  it('lifts a ridden target only while focus is inside it, so it never covers a field outside', () => {
    const bottom = window.innerHeight;
    const page = element('input', {top: 300, height: 40});
    const dock = element(
      'div',
      {top: bottom - 80, height: 80},
      {position: 'fixed'},
    );
    const input = element('textarea', {top: bottom - 64, height: 48});
    dock.append(input);
    document.body.append(page, dock);
    track(followKeyboard(dock, {move: 'ride', offset: 8}));
    act(() => page.focus());
    keyboard(320);
    expect(animatorFor(dock).get('y')).toBe(0);
    act(() => input.focus());
    expect(animatorFor(dock).get('y')).toBe(-320);
    act(() => page.focus());
    expect(animatorFor(dock).get('y')).toBe(0);
  });

  it('keeps a ridden target on the keyboard as it goes when focus leaves for nothing', () => {
    const bottom = window.innerHeight;
    const dock = element(
      'div',
      {top: bottom - 80, height: 80},
      {position: 'fixed'},
    );
    const input = element('textarea', {top: bottom - 64, height: 48});
    dock.append(input);
    document.body.append(dock);
    track(followKeyboard(dock, {move: 'ride', offset: 8}));
    act(() => input.focus());
    keyboard(320);
    expect(animatorFor(dock).get('y')).toBe(-320);
    act(() => input.blur());
    expect(animatorFor(dock).get('y')).toBe(-320);
    keyboard(120);
    expect(animatorFor(dock).get('y')).toBe(-120);
    keyboard(0);
    expect(animatorFor(dock).get('y')).toBe(0);
  });

  it('reveals the focused field inside a scrolling target', () => {
    const list = element('div', {top: 0, height: 760}, {overflowY: 'auto'});
    Object.defineProperty(list, 'scrollHeight', {value: 2000});
    Object.defineProperty(list, 'clientHeight', {value: 760});
    const input = element('input', {top: 620, height: 40});
    list.append(input);
    document.body.append(list);
    track(followKeyboard(list, {move: 'reveal', offset: FIELD_OFFSET}));
    act(() => input.focus());
    keyboard(300);
    expect(list.scrollTop).toBe(
      660 + FIELD_OFFSET - (window.innerHeight - 300),
    );
  });
});
