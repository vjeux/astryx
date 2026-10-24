// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file scrollLatencyFixture.ts
 * @input Nothing: bundled by esbuild and injected into a blank page (or built
 *   into a standalone page by build-fixture.mjs with this entry)
 * @output A full-screen vertical list whose rows carry different gesture
 *   setups, a main-thread block that can be scheduled on demand, and a log of
 *   touches, scroll positions and the block on `window.__latency`
 * @position Measurement fixture of scrollLatency.browser.spec.ts; test-only.
 *   It answers one question: does a native scroll that BEGINS on an element
 *   carrying recognizers wait for a blocked main thread?
 *
 * Rows, top to bottom (each 72 px):
 * - `plain`: no recognizer (the gesture host is installed on the document);
 * - `press`: a delegated pressable row (`data-astryx-pressable`);
 * - `swipe`: a horizontal pan (swipe actions): `pan-y pinch-zoom` and the
 *   host's non-passive `touchmove` listener;
 * - `switch`: a switch-sized control with a tap and a horizontal pan;
 * - `swipePassive`, `switchPassive`: the same with the host's `touchmove`
 *   listener forced passive (the candidate fix);
 * - `swipeDynamic`: the same pan, but its non-passive listener is only added
 *   when a touch starts on it (a second candidate).
 */

import {getGestureHost} from '../../GestureHost';
import type {GestureRecognizer} from '../../GestureRecognizer';
import {PanGestureRecognizer} from '../../PanGestureRecognizer';
import {PressTracker} from '../../PressTracker';
import {TapGestureRecognizer} from '../../TapGestureRecognizer';

interface LatencyLog {
  block: {start: number; end: number; scrollAtUnblock: number} | null;
  scrolls: {t: number; top: number}[];
  touches: {
    type: string;
    t: number;
    ts: number;
    cancelable: boolean;
    target: string;
  }[];
  states: {name: string; state: string; t: number}[];
}

declare global {
  interface Window {
    __latency: LatencyLog;
    __reset: () => void;
    __block: (ms: number) => void;
    __rect: (id: string) => {x: number; y: number; w: number; h: number};
  }
}

const log: LatencyLog = {block: null, scrolls: [], touches: [], states: []};
window.__latency = log;

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

const banner = document.createElement('div');
banner.id = 'banner';
banner.style.cssText =
  'position:fixed;left:0;right:0;top:0;height:24px;z-index:2;background:#16a34a;color:#fff;font:12px/24px system-ui;text-align:center';
banner.textContent = 'idle';
document.body.append(banner);

// A compositor-only animation, so a video shows frames during the block.
const spinner = document.createElement('div');
spinner.style.cssText =
  'position:fixed;right:4px;top:2px;width:20px;height:20px;z-index:3;border-radius:50%;border:3px solid #fff;border-top-color:transparent;animation:spin 0.5s linear infinite';
document.body.append(spinner);
const style = document.createElement('style');
style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.append(style);

const list = document.createElement('div');
list.id = 'list';
list.style.cssText =
  'position:fixed;left:0;right:0;top:24px;bottom:0;overflow-y:auto;background:#fff';
document.body.append(list);

function row(id: string, label: string): HTMLElement {
  const element = document.createElement('div');
  element.id = id;
  element.style.cssText =
    'height:72px;box-sizing:border-box;border-bottom:1px solid #ddd;display:flex;align-items:center;padding:0 16px;font:16px system-ui;background:#fafafa';
  element.textContent = label;
  list.append(element);
  return element;
}

function filler(n: number) {
  for (let i = 0; i < n; i++) {
    row(`filler${i}`, `Row ${i}`);
  }
}

function track(recognizer: GestureRecognizer) {
  recognizer.addTransitionListener(r => {
    log.states.push({name: r.name, state: r.state, t: performance.now()});
  });
}

/**
 * The host's claim listener on `element` (the `touchmove` listener added when
 * a recognizer attaches) becomes passive. Listeners added later, while a
 * touch is down, keep their options.
 */
function forcePassiveTouchMove(element: Element) {
  const original = element.addEventListener.bind(element);
  let forced = false;
  element.addEventListener = ((
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => {
    if (type === 'touchmove' && !forced) {
      forced = true;
      original(type, listener, {passive: true});
      return;
    }
    original(type, listener, options);
  }) as typeof element.addEventListener;
}

/** The host's touchmove listener on `element` is added only on touchstart. */
function deferTouchMove(element: Element) {
  const original = element.addEventListener.bind(element);
  const removeOriginal = element.removeEventListener.bind(element);
  let pending: EventListenerOrEventListenerObject | null = null;
  element.addEventListener = ((
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => {
    if (type === 'touchmove' && pending == null) {
      pending = listener;
      return;
    }
    original(type, listener, options);
  }) as typeof element.addEventListener;
  original(
    'touchstart',
    () => {
      if (pending != null) {
        original('touchmove', pending, {passive: false});
      }
    },
    {passive: true},
  );
  original(
    'touchend',
    () => {
      if (pending != null) {
        removeOriginal('touchmove', pending);
      }
    },
    {passive: true},
  );
}

function switchControl(parent: HTMLElement, id: string): HTMLElement {
  const control = document.createElement('div');
  control.id = id;
  control.style.cssText =
    'margin-left:auto;width:64px;height:40px;border-radius:20px;background:#34c759';
  parent.append(control);
  return control;
}

/** A baseline page: the same list with no gesture host at all. */
const bare = (window as {__bare?: boolean}).__bare === true;

filler(1);
row('plain', 'Plain row');
if (!bare) {
  setUpGestureRows();
}
filler(40);

function setUpGestureRows() {
  const host = getGestureHost(document);
  const press = row('press', 'Pressable row');
  press.setAttribute('data-astryx-pressable', '');
  // The delegated press consumer, as installPressAttribute registers it (its
  // paint module needs the StyleX compiler, which this bundle does not run).
  host.addDelegatedConsumer({
    attribute: 'data-astryx-pressable',
    create: element =>
      new PressTracker({
        view: element,
        getBounds: () => element.getBoundingClientRect(),
        isBraking: () => host.isScrollBraking(element),
        onHighlightChange: isOn => {
          (element as HTMLElement).style.background = isOn ? '#ddd' : '#fafafa';
        },
      }),
  });

  const swipe = row('swipe', 'Swipe row (pan-y + non-passive)');
  const swipePan = new PanGestureRecognizer({
    name: 'swipe',
    direction: 'horizontal',
  });
  track(swipePan);
  host.attach(swipe, swipePan);

  const switchRow = row('switchRow', 'Switch');
  const switchEl = switchControl(switchRow, 'switch');
  const switchTap = new TapGestureRecognizer({name: 'switchTap'});
  const switchPan = new PanGestureRecognizer({
    name: 'switchPan',
    direction: 'horizontal',
  });
  track(switchTap);
  track(switchPan);
  host.attach(switchEl, switchTap);
  host.attach(switchEl, switchPan);

  const swipePassive = row('swipePassive', 'Swipe row (passive)');
  forcePassiveTouchMove(swipePassive);
  const swipePassivePan = new PanGestureRecognizer({
    name: 'swipePassive',
    direction: 'horizontal',
  });
  track(swipePassivePan);
  host.attach(swipePassive, swipePassivePan);

  const switchPassiveRow = row('switchPassiveRow', 'Switch (passive)');
  const switchPassiveEl = switchControl(switchPassiveRow, 'switchPassive');
  forcePassiveTouchMove(switchPassiveEl);
  const switchPassiveTap = new TapGestureRecognizer({name: 'switchPassiveTap'});
  const switchPassivePan = new PanGestureRecognizer({
    name: 'switchPassivePan',
    direction: 'horizontal',
  });
  track(switchPassiveTap);
  track(switchPassivePan);
  host.attach(switchPassiveEl, switchPassiveTap);
  host.attach(switchPassiveEl, switchPassivePan);

  const swipeDynamic = row(
    'swipeDynamic',
    'Swipe row (listener on touchstart)',
  );
  deferTouchMove(swipeDynamic);
  const swipeDynamicPan = new PanGestureRecognizer({
    name: 'swipeDynamic',
    direction: 'horizontal',
  });
  track(swipeDynamicPan);
  host.attach(swipeDynamic, swipeDynamicPan);
}

list.addEventListener(
  'scroll',
  () => log.scrolls.push({t: performance.now(), top: list.scrollTop}),
  {passive: true},
);

for (const type of ['touchstart', 'touchmove', 'touchend', 'touchcancel']) {
  document.addEventListener(
    type,
    event => {
      const target = (event.target as Element | null)?.closest('[id]');
      log.touches.push({
        type,
        t: performance.now(),
        ts: event.timeStamp,
        cancelable: event.cancelable,
        target: target?.id ?? '',
      });
    },
    {capture: true, passive: true},
  );
}

window.__reset = () => {
  list.scrollTop = 0;
  log.block = null;
  log.scrolls = [];
  log.touches = [];
  log.states = [];
};

window.__block = (ms: number) => {
  banner.style.background = '#dc2626';
  banner.textContent = `main thread blocked ${ms} ms`;
  // Two frames so the red banner is on screen before the block starts.
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      setTimeout(() => {
        const start = performance.now();
        while (performance.now() - start < ms) {
          // Busy: the main thread runs nothing else.
        }
        const end = performance.now();
        log.block = {start, end, scrollAtUnblock: list.scrollTop};
        banner.style.background = '#16a34a';
        banner.textContent = 'idle';
      }, 0),
    ),
  );
};

window.__rect = (id: string) => {
  const rect = document.getElementById(id)!.getBoundingClientRect();
  return {x: rect.left, y: rect.top, w: rect.width, h: rect.height};
};
