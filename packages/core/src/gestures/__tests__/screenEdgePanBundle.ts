// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file screenEdgePanBundle.ts
 * @input GestureArena and ScreenEdgePanGestureRecognizer
 * @output `mountEdgePan(view, edges)`: the recognizer on `view`, the view's
 *   `touch-action` written from its `nativeTouchBehavior`, the view's real
 *   touches fed to an arena, and a log of what each touch event left
 * @position Test-only page glue for screenEdgePan.interaction.browser.spec.ts,
 *   which bundles it with esbuild. It stands in for the gesture host, which
 *   this layer does not have, doing what the host does with a view: it writes
 *   the touch-action the recognizer leaves the browser, feeds the arena every
 *   touch, cancels the default of a claimed touch's moves, and reads an
 *   uncancelable move as the browser taking the touch for a scroll.
 */

import {GestureArena} from '../GestureArena';
import type {NativeTouchBehavior} from '../GestureRecognizer';
import {
  ScreenEdgePanGestureRecognizer,
  type ScreenEdge,
} from '../ScreenEdgePanGestureRecognizer';

/** The CSS `touch-action` that leaves the browser exactly `behavior`. */
export function touchActionFor(behavior: NativeTouchBehavior): string {
  const {panX, panY, pinchZoom, doubleTapZoom} = behavior;
  if (panX && panY && pinchZoom) {
    return doubleTapZoom ? 'auto' : 'manipulation';
  }
  const kept = [
    panX ? 'pan-x' : null,
    panY ? 'pan-y' : null,
    pinchZoom ? 'pinch-zoom' : null,
  ].filter(value => value != null);
  return kept.length > 0 ? kept.join(' ') : 'none';
}

export interface EdgePanEntry {
  readonly type: 'down' | 'move' | 'up' | 'cancel';
  /** How far the touch is from where it landed, px. */
  readonly travel: number;
  /** The pan's state once the arena has taken the event. */
  readonly state: string;
  /** False once the browser scrolls with the touch. */
  readonly cancelable: boolean;
}

export interface MountedEdgePan {
  readonly log: EdgePanEntry[];
  readonly touchAction: string;
}

export function mountEdgePan(
  view: HTMLElement,
  edges: ScreenEdge[],
): MountedEdgePan {
  const log: EdgePanEntry[] = [];
  const claimed = new Set<number>();
  const arena = new GestureArena({
    onClaim: ids => {
      for (const id of ids) {
        claimed.add(id);
      }
    },
  });
  const pan = new ScreenEdgePanGestureRecognizer({edges});
  pan.view = view;
  view.style.touchAction = touchActionFor(pan.nativeTouchBehavior);
  let start = {x: 0, y: 0};
  const inputs = (event: TouchEvent) =>
    [...event.changedTouches].map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      time: event.timeStamp,
    }));
  const record = (type: EdgePanEntry['type'], event: TouchEvent) => {
    const touch = event.changedTouches[0];
    log.push({
      type,
      travel: Math.hypot(touch.clientX - start.x, touch.clientY - start.y),
      state: pan.state,
      cancelable: event.cancelable,
    });
  };
  view.addEventListener(
    'touchstart',
    event => {
      const touch = event.changedTouches[0];
      start = {x: touch.clientX, y: touch.clientY};
      arena.began(
        inputs(event).map(input => ({
          ...input,
          pointerType: 'touch' as const,
          target: event.target,
          scroll: null,
          recognizers: [pan],
          consumer: null,
        })),
      );
      record('down', event);
    },
    {passive: false},
  );
  view.addEventListener(
    'touchmove',
    event => {
      const ids = [...event.changedTouches].map(touch => touch.identifier);
      if (event.cancelable) {
        arena.moved(inputs(event));
        if (ids.some(id => claimed.has(id))) {
          event.preventDefault();
        }
      } else {
        arena.browserTookOver(ids, event.timeStamp);
      }
      record('move', event);
    },
    {passive: false},
  );
  view.addEventListener('touchend', event => {
    arena.ended(inputs(event));
    record('up', event);
  });
  view.addEventListener('touchcancel', event => {
    arena.cancelled(
      [...event.changedTouches].map(touch => touch.identifier),
      event.timeStamp,
    );
    record('cancel', event);
  });
  return {log, touchAction: view.style.touchAction};
}
