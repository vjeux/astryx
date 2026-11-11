// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file swipePan.ts (B prototype: a swipe off the gesture arena)
 * @input A row root; a touch's or a pen's pointer events on it
 * @output createSwipePan: the pan a swipe row runs with no gesture arena
 * @position Scratch prototype for the A/B size study; never shipped
 */

// 'scroll' is never produced: the prototype has no trackpad path, and keeps the swipe's trackpad branches unused.
export type SwipePanInput = 'touch' | 'pen' | 'scroll';

export interface SwipePanEvent {
  state: 'began' | 'changed' | 'ended' | 'cancelled';
  translation: {x: number; y: number};
  totalTranslation: {x: number; y: number};
  velocity: {x: number; y: number};
  input: SwipePanInput;
}

/** What `shouldBegin` reads of the pan. */
export interface SwipePanView {
  totalTranslation(): {x: number; y: number};
  fingersDown(): number;
}

export interface SwipePanOptions {
  hysteresis?: number;
  allowedPointerTypes?: ReadonlyArray<string>;
  selectionLock?: (elements: Iterable<Element>, target: EventTarget | null) => () => void;
  shouldBegin?: (pan: SwipePanView) => boolean;
  [option: string]: unknown;
}

const VELOCITY_WINDOW_MS = 100;

export function createSwipePan(
  element: HTMLElement,
  {
    recognizer = {},
    onPan,
  }: {
    axis?: 'x' | 'y';
    recognizer?: SwipePanOptions;
    onPan: (event: SwipePanEvent) => void;
  },
): {destroy(): void; fingersDown(): number} {
  const hysteresis = recognizer.hysteresis ?? 10;
  const types = recognizer.allowedPointerTypes ?? ['touch', 'pen'];
  const down = new Set<number>();
  let id: number | null = null;
  let input: SwipePanInput = 'touch';
  let origin = {x: 0, y: 0};
  let claim = {x: 0, y: 0};
  let began = false;
  let samples: {t: number; x: number; y: number}[] = [];
  let unlock: (() => void) | null = null;
  let downTarget: EventTarget | null = null;
  element.style.touchAction = 'pan-y pinch-zoom';
  const view: SwipePanView = {
    totalTranslation: () => {
      const last = samples.at(-1) ?? {x: origin.x, y: origin.y};
      return {x: last.x - origin.x, y: last.y - origin.y};
    },
    fingersDown: () => down.size,
  };
  const velocity = () => {
    const last = samples.at(-1);
    const first = samples.find(s => last != null && last.t - s.t <= VELOCITY_WINDOW_MS);
    if (last == null || first == null || last.t === first.t) {
      return {x: 0, y: 0};
    }
    const dt = (last.t - first.t) / 1000;
    return {x: (last.x - first.x) / dt, y: (last.y - first.y) / dt};
  };
  const report = (state: SwipePanEvent['state']) => {
    const total = view.totalTranslation();
    onPan({
      state,
      translation: {x: total.x - claim.x, y: total.y - claim.y},
      totalTranslation: total,
      velocity: state === 'cancelled' ? {x: 0, y: 0} : velocity(),
      input,
    });
  };
  const end = (state: 'ended' | 'cancelled') => {
    if (began) {
      report(state);
    }
    unlock?.();
    unlock = null;
    id = null;
    began = false;
    samples = [];
  };
  const onDown = (event: PointerEvent) => {
    if (!types.includes(event.pointerType)) {
      return;
    }
    down.add(event.pointerId);
    if (down.size > 1) {
      // A second finger is a pinch: the page zooms.
      end('cancelled');
      return;
    }
    id = event.pointerId;
    input = event.pointerType === 'pen' ? 'pen' : 'touch';
    origin = {x: event.clientX, y: event.clientY};
    downTarget = event.target;
    samples = [{t: event.timeStamp, x: event.clientX, y: event.clientY}];
  };
  const onMove = (event: PointerEvent) => {
    if (event.pointerId !== id) {
      return;
    }
    samples.push({t: event.timeStamp, x: event.clientX, y: event.clientY});
    if (samples.length > 32) {
      samples.shift();
    }
    const total = view.totalTranslation();
    if (!began) {
      if (Math.abs(total.y) >= hysteresis && Math.abs(total.y) > Math.abs(total.x)) {
        // Mostly vertical: the browser scrolls (touch-action: pan-y).
        id = null;
        return;
      }
      if (Math.abs(total.x) < hysteresis || recognizer.shouldBegin?.(view) === false) {
        return;
      }
      began = true;
      claim = total;
      element.setPointerCapture?.(event.pointerId);
      unlock = recognizer.selectionLock?.([element], downTarget) ?? null;
      report('began');
      return;
    }
    report('changed');
  };
  const onUp = (event: PointerEvent) => {
    down.delete(event.pointerId);
    if (event.pointerId === id) {
      end(event.type === 'pointercancel' ? 'cancelled' : 'ended');
    }
  };
  element.addEventListener('pointerdown', onDown);
  element.addEventListener('pointermove', onMove);
  element.addEventListener('pointerup', onUp);
  element.addEventListener('pointercancel', onUp);
  return {
    fingersDown: () => down.size,
    destroy() {
      end('cancelled');
      element.removeEventListener('pointerdown', onDown);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerup', onUp);
      element.removeEventListener('pointercancel', onUp);
      element.style.removeProperty('touch-action');
    },
  };
}
