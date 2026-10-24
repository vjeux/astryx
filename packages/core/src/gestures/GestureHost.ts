// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file GestureHost.ts
 * @input DOM touch, pointer, click, contextmenu, scroll and focus events of
 *   one document; elements with recognizers and consumers attached
 * @output Exports GestureHost (the DOM side of the gesture system) and
 *   getGestureHost (one host per document)
 * @position Browser adapter of packages/core/src/gestures: turns real events
 *   into GestureArena input, and carries out what the arena decides
 *
 * INPUT CHANNELS
 *
 * - Fingers begin and end with Touch Events: they are the only cancelable
 *   channel (a pointer event's preventDefault cannot stop a scroll or a
 *   click), they keep arriving after the browser takes a pan (which a scroll
 *   handoff needs), and every event lists all the fingers at once. A
 *   finger's movement comes from BOTH its `touchmove`s and its
 *   `pointermove`s (paired at touchstart by target and position), the echo
 *   of one in the other dropped: Chromium sends no `touchmove` until a
 *   finger has travelled about 16 px, while a tap fails and a pan begins at
 *   10.
 * - Mice and pens come from Pointer Events, with coalesced samples for
 *   velocity. A pen on an iPad also produces `stylus` touches; those are left
 *   to the pointer path.
 * - `pointercancel` on a finger is the browser saying it took that finger
 *   for its own pan or zoom; so is a `touchmove` that can no longer be
 *   cancelled where `touch-action` let the browser pan, and a scroll above
 *   the touch.
 *
 * WHAT THE BROWSER IS TOLD
 *
 * - Each element gets the `touch-action` its recognizers leave the browser
 *   (touchAction.ts), set inline when they attach and restored when they
 *   detach.
 * - Each element with touch recognizers gets a NON-passive `touchmove`
 *   listener that cancels the event only while a recognizer owns one of its
 *   touches. Nothing else is ever cancelled, so a touch nobody claims scrolls
 *   exactly as it would without the system; only touches that begin on such
 *   an element wait for the main thread before scrolling.
 * - A lift whose click must not happen cancels its `touchend` (no click, no
 *   compatibility mouse events) and arms a one-shot swallower for the next
 *   trusted click; a click held for a recognizer that may still recognize is
 *   replayed if they all fail. Keyboard and assistive-technology clicks
 *   (`detail === 0`) always pass.
 * - A `contextmenu` while a recognizer owns a touch is cancelled, so a long
 *   press never also opens the browser's menu.
 *
 * SSR-safe: nothing touches `window` or `document` until an element attaches.
 *
 * SYNC: When modified, update GestureHost.test.ts and README.md.
 */

import {UIKIT_GESTURES} from '../motion/uikit/gestures';
import {
  browserClock,
  GestureArena,
  type ArenaBeganInput,
  type ClickDisposition,
  type GestureArenaOptions,
  type GestureClock,
} from './GestureArena';
import type {GestureRecognizer} from './GestureRecognizer';
import {HAPTIC_SWITCH_ATTRIBUTE} from './haptics';
import {HoverGestureRecognizer} from './HoverGestureRecognizer';
import {createNativeScrollProbe, parentAcrossShadow} from './nativeScroll';
import {gestureHostStyle, type GestureHostStyle} from './touchAction';
import type {
  GestureEnvironment,
  GestureTouch,
  PointerKind,
  TouchConsumer,
  TouchInput,
  TouchSample,
} from './types';

interface Registration {
  readonly recognizers: GestureRecognizer[];
  readonly hovers: HoverGestureRecognizer[];
  consumer: TouchConsumer | null;
  touchMoveListener: EventListener | null;
  /** Inline values the host replaced, to restore on detach. */
  readonly savedStyle: Map<string, string>;
  manageStyle: boolean;
}

export interface GestureHostOptions {
  /** The arena's clock; tests pass a manual one. */
  clock?: GestureClock;
  /**
   * Where fingers come from: Touch Events where the browser has them
   * (`auto`), or Pointer Events only.
   */
  inputMode?: 'auto' | 'pointer-events';
  /** Every recognizer transition, for debugging and tests. */
  onTransition?: GestureArenaOptions['onTransition'];
}

export interface AttachOptions {
  /** Let the host set touch-action (and long-press callout) styles. @default true */
  manageStyle?: boolean;
}

const STYLE_PROPERTIES: Record<keyof GestureHostStyle, string> = {
  touchAction: 'touch-action',
  WebkitTouchCallout: '-webkit-touch-callout',
  WebkitUserSelect: '-webkit-user-select',
  userSelect: 'user-select',
};

const PASSIVE_CAPTURE = {capture: true, passive: true} as const;
const ACTIVE_CAPTURE = {capture: true, passive: false} as const;

type StylusTouch = Touch & {touchType?: string};

interface PlacedContact {
  readonly x: number;
  readonly y: number;
  readonly target: unknown;
}

/** A touchstart and a pointerdown describe one finger: same target, same spot. */
function isSamePlace(a: PlacedContact, b: PlacedContact): boolean {
  return (
    a.target === b.target &&
    Math.abs(a.x - b.x) <= 1 &&
    Math.abs(a.y - b.y) <= 1
  );
}

function isPointerKind(type: string): type is PointerKind {
  return type === 'touch' || type === 'mouse' || type === 'pen';
}

export class GestureHost {
  readonly arena: GestureArena;
  private readonly doc: Document;
  private readonly registry = new Map<Element, Registration>();
  /** Touch.identifier → arena id, for live fingers. */
  private readonly touchIds = new Map<number, number>();
  /** pointerId → arena id, for live mouse and pen contacts. */
  private readonly pointerIds = new Map<number, number>();
  /**
   * A finger's pointerId → its arena id, once its pointerdown and its
   * touchstart are paired. Chromium sends no `touchmove` until a finger has
   * travelled its slop (about 16 px), but sends every `pointermove`, so the
   * finger's movement comes from both channels; and its `pointercancel` is
   * the browser's claim of exactly that finger.
   */
  private readonly fingerPointers = new Map<number, number>();
  /** Finger pointerdowns still waiting for their touchstart. */
  private readonly pendingPointers = new Map<number, PlacedContact>();
  /** Fingers still waiting for their pointerdown, by arena id. */
  private readonly unpairedTouches = new Map<number, PlacedContact>();
  /** The last position fed per contact, so one channel's echo is dropped. */
  private readonly lastFed = new Map<number, TouchSample>();
  private readonly hovered = new Map<number, Set<HoverGestureRecognizer>>();
  private nextId = 1;
  private isInstalled = false;
  private readonly inputMode: 'auto' | 'pointer-events';
  private usesTouchEvents = true;
  private swallowDeadline = Number.NEGATIVE_INFINITY;

  constructor(doc: Document, options: GestureHostOptions = {}) {
    this.doc = doc;
    this.inputMode = options.inputMode ?? 'auto';
    const environment: GestureEnvironment = {
      viewportSize: () => ({
        width: doc.defaultView?.innerWidth ?? 0,
        height: doc.defaultView?.innerHeight ?? 0,
      }),
      isRtl: view =>
        view instanceof Element &&
        doc.defaultView?.getComputedStyle(view).direction === 'rtl',
    };
    this.arena = new GestureArena({
      clock: options.clock ?? browserClock,
      environment,
      onDeferredClick: (touch, allowed) => this.replayClick(touch, allowed),
      onTransition: options.onTransition,
    });
  }

  // --- Attachment ------------------------------------------------------------

  /** Attach a recognizer to an element. Returns the detach function. */
  attach(
    element: Element,
    recognizer: GestureRecognizer,
    options: AttachOptions = {},
  ): () => void {
    const registration = this.registrationFor(element);
    registration.manageStyle = options.manageStyle ?? registration.manageStyle;
    recognizer.view = element;
    if (recognizer instanceof HoverGestureRecognizer) {
      registration.hovers.push(recognizer);
    } else {
      registration.recognizers.push(recognizer);
    }
    this.refresh(element, registration);
    this.install();
    return () => {
      const index = registration.recognizers.indexOf(recognizer);
      if (index >= 0) {
        registration.recognizers.splice(index, 1);
      }
      if (recognizer instanceof HoverGestureRecognizer) {
        const hoverIndex = registration.hovers.indexOf(recognizer);
        if (hoverIndex >= 0) {
          registration.hovers.splice(hoverIndex, 1);
        }
        recognizer.hoverExited();
      }
      if (recognizer.state !== 'possible') {
        recognizer.cancel();
      }
      this.refresh(element, registration);
      this.cleanup(element, registration);
    };
  }

  /** Attach the view-level touch consumer of an element (a pressable control). */
  attachConsumer(element: Element, consumer: TouchConsumer): () => void {
    const registration = this.registrationFor(element);
    registration.consumer = consumer;
    this.install();
    return () => {
      if (registration.consumer === consumer) {
        registration.consumer = null;
      }
      this.cleanup(element, registration);
    };
  }

  /** Re-derive an element's styles after its recognizers' options changed. */
  update(element: Element): void {
    const registration = this.registry.get(element);
    if (registration != null) {
      this.refresh(element, registration);
    }
  }

  private registrationFor(element: Element): Registration {
    let registration = this.registry.get(element);
    if (registration == null) {
      registration = {
        recognizers: [],
        hovers: [],
        consumer: null,
        touchMoveListener: null,
        savedStyle: new Map(),
        manageStyle: true,
      };
      this.registry.set(element, registration);
    }
    return registration;
  }

  private refresh(element: Element, registration: Registration): void {
    if (registration.manageStyle && element instanceof HTMLElement) {
      this.applyStyle(element, registration);
    }
    const needsListener = registration.recognizers.some(
      recognizer => recognizer.acceptsTouchInput,
    );
    if (needsListener && registration.touchMoveListener == null) {
      const listener: EventListener = event =>
        this.onHostTouchMove(event as TouchEvent);
      registration.touchMoveListener = listener;
      element.addEventListener('touchmove', listener, {passive: false});
    } else if (!needsListener && registration.touchMoveListener != null) {
      element.removeEventListener('touchmove', registration.touchMoveListener);
      registration.touchMoveListener = null;
    }
  }

  private applyStyle(element: HTMLElement, registration: Registration): void {
    const style = gestureHostStyle(registration.recognizers);
    for (const key of Object.keys(
      STYLE_PROPERTIES,
    ) as (keyof GestureHostStyle)[]) {
      const property = STYLE_PROPERTIES[key];
      const value = style[key];
      if (value != null) {
        if (!registration.savedStyle.has(property)) {
          registration.savedStyle.set(
            property,
            element.style.getPropertyValue(property),
          );
        }
        element.style.setProperty(property, value);
      } else if (registration.savedStyle.has(property)) {
        const saved = registration.savedStyle.get(property) ?? '';
        registration.savedStyle.delete(property);
        if (saved === '') {
          element.style.removeProperty(property);
        } else {
          element.style.setProperty(property, saved);
        }
      }
    }
  }

  private cleanup(element: Element, registration: Registration): void {
    if (
      registration.recognizers.length > 0 ||
      registration.hovers.length > 0 ||
      registration.consumer != null
    ) {
      return;
    }
    if (registration.touchMoveListener != null) {
      element.removeEventListener('touchmove', registration.touchMoveListener);
    }
    this.registry.delete(element);
    if (this.registry.size === 0) {
      this.uninstall();
    }
  }

  // --- Listeners -------------------------------------------------------------

  private install(): void {
    if (this.isInstalled) {
      return;
    }
    const view = this.doc.defaultView;
    this.isInstalled = true;
    this.usesTouchEvents =
      this.inputMode === 'auto' && view != null && 'ontouchstart' in view;
    const doc = this.doc;
    doc.addEventListener('touchstart', this.onTouchStart, PASSIVE_CAPTURE);
    doc.addEventListener('touchmove', this.onTouchMove, PASSIVE_CAPTURE);
    doc.addEventListener('touchend', this.onTouchEnd, ACTIVE_CAPTURE);
    doc.addEventListener('touchcancel', this.onTouchCancel, PASSIVE_CAPTURE);
    doc.addEventListener('pointerdown', this.onPointerDown, PASSIVE_CAPTURE);
    doc.addEventListener('pointermove', this.onPointerMove, PASSIVE_CAPTURE);
    doc.addEventListener('pointerup', this.onPointerUp, PASSIVE_CAPTURE);
    doc.addEventListener(
      'pointercancel',
      this.onPointerCancel,
      PASSIVE_CAPTURE,
    );
    doc.addEventListener('pointerout', this.onPointerOut, PASSIVE_CAPTURE);
    doc.addEventListener('contextmenu', this.onContextMenu, ACTIVE_CAPTURE);
    doc.addEventListener('scroll', this.onScroll, PASSIVE_CAPTURE);
    doc.addEventListener('visibilitychange', this.onVisibilityChange);
    view?.addEventListener('click', this.onClick, ACTIVE_CAPTURE);
    view?.addEventListener('blur', this.onBlur);
  }

  private uninstall(): void {
    if (!this.isInstalled) {
      return;
    }
    this.isInstalled = false;
    const doc = this.doc;
    const view = doc.defaultView;
    doc.removeEventListener('touchstart', this.onTouchStart, PASSIVE_CAPTURE);
    doc.removeEventListener('touchmove', this.onTouchMove, PASSIVE_CAPTURE);
    doc.removeEventListener('touchend', this.onTouchEnd, ACTIVE_CAPTURE);
    doc.removeEventListener('touchcancel', this.onTouchCancel, PASSIVE_CAPTURE);
    doc.removeEventListener('pointerdown', this.onPointerDown, PASSIVE_CAPTURE);
    doc.removeEventListener('pointermove', this.onPointerMove, PASSIVE_CAPTURE);
    doc.removeEventListener('pointerup', this.onPointerUp, PASSIVE_CAPTURE);
    doc.removeEventListener(
      'pointercancel',
      this.onPointerCancel,
      PASSIVE_CAPTURE,
    );
    doc.removeEventListener('pointerout', this.onPointerOut, PASSIVE_CAPTURE);
    doc.removeEventListener('contextmenu', this.onContextMenu, ACTIVE_CAPTURE);
    doc.removeEventListener('scroll', this.onScroll, PASSIVE_CAPTURE);
    doc.removeEventListener('visibilitychange', this.onVisibilityChange);
    view?.removeEventListener('click', this.onClick, ACTIVE_CAPTURE);
    view?.removeEventListener('blur', this.onBlur);
    this.cancelEverything(this.arena.now());
  }

  // --- Hit path --------------------------------------------------------------

  private participantsAt(target: unknown): {
    recognizers: GestureRecognizer[];
    consumer: TouchConsumer | null;
    hovers: HoverGestureRecognizer[];
  } {
    const recognizers: GestureRecognizer[] = [];
    const hovers: HoverGestureRecognizer[] = [];
    let consumer: TouchConsumer | null = null;
    for (
      let node: Node | null = target instanceof Node ? target : null;
      node != null;
      node = parentAcrossShadow(node)
    ) {
      if (!(node instanceof Element)) {
        continue;
      }
      const registration = this.registry.get(node);
      if (registration == null) {
        continue;
      }
      recognizers.push(...registration.recognizers);
      hovers.push(...registration.hovers);
      consumer ??= registration.consumer;
    }
    return {recognizers, consumer, hovers};
  }

  // --- Touch events ----------------------------------------------------------

  private readonly onTouchStart = (event: TouchEvent): void => {
    const inputs: ArenaBeganInput[] = [];
    for (const touch of Array.from(event.changedTouches)) {
      if ((touch as StylusTouch).touchType === 'stylus') {
        continue;
      }
      const target = touch.target instanceof Node ? touch.target : event.target;
      const {recognizers, consumer} = this.participantsAt(target);
      if (recognizers.length === 0 && consumer == null) {
        continue;
      }
      const id = this.nextId++;
      this.touchIds.set(touch.identifier, id);
      this.lastFed.set(id, {
        x: touch.clientX,
        y: touch.clientY,
        time: event.timeStamp,
      });
      this.pairTouch(id, {x: touch.clientX, y: touch.clientY, target});
      inputs.push({
        id,
        x: touch.clientX,
        y: touch.clientY,
        time: event.timeStamp,
        pointerType: 'touch',
        target,
        scroll: createNativeScrollProbe(target),
        recognizers,
        consumer,
      });
    }
    this.arena.began(inputs);
  };

  private pairTouch(id: number, place: PlacedContact): void {
    for (const [pointerId, pending] of this.pendingPointers) {
      if (isSamePlace(pending, place)) {
        this.pendingPointers.delete(pointerId);
        this.fingerPointers.set(pointerId, id);
        return;
      }
    }
    this.unpairedTouches.set(id, place);
  }

  private pairPointer(pointerId: number, place: PlacedContact): void {
    for (const [id, unpaired] of this.unpairedTouches) {
      if (isSamePlace(unpaired, place)) {
        this.unpairedTouches.delete(id);
        this.fingerPointers.set(pointerId, id);
        return;
      }
    }
    this.pendingPointers.set(pointerId, place);
  }

  /** Feed moves, dropping the echo of a move the other channel delivered. */
  private feedMoves(inputs: ReadonlyArray<TouchInput>): void {
    const fresh = inputs.filter(input => {
      const last = this.lastFed.get(input.id);
      if (
        last != null &&
        (input.time < last.time ||
          (input.time === last.time &&
            input.x === last.x &&
            input.y === last.y))
      ) {
        return false;
      }
      this.lastFed.set(input.id, {x: input.x, y: input.y, time: input.time});
      return true;
    });
    if (fresh.length > 0) {
      this.arena.moved(fresh);
    }
  }

  /** Forget a contact's pairing and echo state. */
  private forgetContact(id: number): void {
    this.lastFed.delete(id);
    this.unpairedTouches.delete(id);
    for (const [pointerId, paired] of this.fingerPointers) {
      if (paired === id) {
        this.fingerPointers.delete(pointerId);
      }
    }
  }

  private readonly onTouchMove = (event: TouchEvent): void => {
    const ids: number[] = [];
    const inputs = [];
    for (const touch of Array.from(event.changedTouches)) {
      const id = this.touchIds.get(touch.identifier);
      if (id == null) {
        continue;
      }
      ids.push(id);
      inputs.push({
        id,
        x: touch.clientX,
        y: touch.clientY,
        time: event.timeStamp,
      });
    }
    if (inputs.length === 0) {
      return;
    }
    if (!event.cancelable) {
      // The browser is panning or zooming with these fingers and no longer
      // asks the page; take that as its claim before the move is read.
      const taken = ids.filter(id => {
        const touch = this.arena.getTouch(id);
        return (
          touch != null &&
          !touch.takenByBrowser &&
          !this.arena.isClaimed(id) &&
          touch.scroll?.allowsNativePan !== false
        );
      });
      if (taken.length > 0) {
        this.arena.browserTookOver(taken, event.timeStamp);
      }
    }
    this.feedMoves(inputs);
  };

  /** The per-element listener: cancel only while a recognizer owns a touch. */
  private onHostTouchMove(event: TouchEvent): void {
    if (!event.cancelable || event.defaultPrevented) {
      return;
    }
    for (const touch of Array.from(event.touches)) {
      const id = this.touchIds.get(touch.identifier);
      if (id != null && this.arena.isClaimed(id)) {
        event.preventDefault();
        return;
      }
    }
    for (const id of this.pointerIds.values()) {
      if (this.arena.isClaimed(id)) {
        // A pen whose pointer a recognizer owns: its stylus touches too.
        event.preventDefault();
        return;
      }
    }
  }

  private readonly onTouchEnd = (event: TouchEvent): void => {
    const inputs = [];
    for (const touch of Array.from(event.changedTouches)) {
      const id = this.touchIds.get(touch.identifier);
      if (id == null) {
        continue;
      }
      this.touchIds.delete(touch.identifier);
      this.forgetContact(id);
      inputs.push({
        id,
        x: touch.clientX,
        y: touch.clientY,
        time: event.timeStamp,
      });
    }
    if (inputs.length === 0) {
      return;
    }
    const dispositions = this.arena.ended(inputs);
    if (needsSuppression(dispositions)) {
      if (event.cancelable) {
        event.preventDefault();
      }
      this.armSwallower();
    }
  };

  private readonly onTouchCancel = (event: TouchEvent): void => {
    const ids: number[] = [];
    for (const touch of Array.from(event.changedTouches)) {
      const id = this.touchIds.get(touch.identifier);
      if (id != null) {
        this.touchIds.delete(touch.identifier);
        this.forgetContact(id);
        ids.push(id);
      }
    }
    if (ids.length > 0) {
      this.arena.cancelled(ids, event.timeStamp);
    }
  };

  // --- Pointer events --------------------------------------------------------

  private readonly onPointerDown = (event: PointerEvent): void => {
    // A new press: whatever click is still owed to the last one is not this.
    this.disarmSwallower();
    if (!isPointerKind(event.pointerType)) {
      return;
    }
    this.exitHover(event.pointerId);
    if (event.pointerType === 'touch' && this.usesTouchEvents) {
      this.pairPointer(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        target: event.target,
      });
      return;
    }
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    const {recognizers, consumer} = this.participantsAt(event.target);
    if (recognizers.length === 0 && consumer == null) {
      return;
    }
    const id = this.nextId++;
    this.pointerIds.set(event.pointerId, id);
    this.arena.began([
      {
        id,
        x: event.clientX,
        y: event.clientY,
        time: event.timeStamp,
        pointerType: event.pointerType,
        target: event.target,
        scroll: createNativeScrollProbe(event.target),
        recognizers,
        consumer,
      },
    ]);
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' && this.usesTouchEvents) {
      const id = this.fingerPointers.get(event.pointerId);
      if (id != null) {
        this.feedMoves([
          {
            id,
            x: event.clientX,
            y: event.clientY,
            time: event.timeStamp,
            history: coalescedHistory(event),
          },
        ]);
      }
      return;
    }
    const id = this.pointerIds.get(event.pointerId);
    if (id != null) {
      this.arena.moved([
        {
          id,
          x: event.clientX,
          y: event.clientY,
          time: event.timeStamp,
          history: coalescedHistory(event),
        },
      ]);
      return;
    }
    if (event.pointerType !== 'touch' && event.buttons === 0) {
      this.updateHover(event);
    }
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' && this.usesTouchEvents) {
      // The lift itself is the touchend's: it alone can cancel the click.
      this.fingerPointers.delete(event.pointerId);
      this.pendingPointers.delete(event.pointerId);
      return;
    }
    const id = this.pointerIds.get(event.pointerId);
    if (id == null) {
      return;
    }
    this.pointerIds.delete(event.pointerId);
    const dispositions = this.arena.ended([
      {id, x: event.clientX, y: event.clientY, time: event.timeStamp},
    ]);
    if (needsSuppression(dispositions)) {
      this.armSwallower();
    }
  };

  private readonly onPointerCancel = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' && this.usesTouchEvents) {
      const id =
        this.fingerPointers.get(event.pointerId) ??
        this.touchForCancelledPointer(event);
      this.fingerPointers.delete(event.pointerId);
      this.pendingPointers.delete(event.pointerId);
      if (id != null) {
        this.arena.browserTookOver([id], event.timeStamp);
      }
      return;
    }
    const id = this.pointerIds.get(event.pointerId);
    if (id != null) {
      this.pointerIds.delete(event.pointerId);
      this.arena.cancelled([id], event.timeStamp);
    }
  };

  /**
   * Which live finger a touch `pointercancel` is about. The pointer keeps
   * the target the finger landed on (implicit capture), as the Touch does;
   * among fingers on that target, the nearest. WebKit also numbers the
   * pointer like the Touch, which settles what position cannot.
   */
  private touchForCancelledPointer(event: PointerEvent): number | null {
    let best: GestureTouch | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const touch of this.arena.touches) {
      if (
        touch.pointerType !== 'touch' ||
        touch.phase === 'ended' ||
        touch.phase === 'cancelled' ||
        touch.target !== event.target
      ) {
        continue;
      }
      const d = Math.hypot(touch.x - event.clientX, touch.y - event.clientY);
      if (d < bestDistance) {
        best = touch;
        bestDistance = d;
      }
    }
    if (best != null) {
      return best.id;
    }
    return this.touchIds.get(event.pointerId) ?? null;
  }

  // --- Hover -------------------------------------------------------------------

  private updateHover(event: PointerEvent): void {
    if (!isPointerKind(event.pointerType)) {
      return;
    }
    const {hovers} = this.participantsAt(event.target);
    const next = new Set(hovers.filter(hover => hover.isEnabled));
    const previous = this.hovered.get(event.pointerId) ?? new Set();
    if (next.size === 0 && previous.size === 0) {
      return;
    }
    const point = {x: event.clientX, y: event.clientY};
    for (const hover of previous) {
      if (!next.has(hover)) {
        hover.hoverExited(point);
      }
    }
    for (const hover of next) {
      if (previous.has(hover)) {
        hover.hoverMoved(point);
      } else {
        hover.hoverEntered(point, event.pointerType);
      }
    }
    if (next.size === 0) {
      this.hovered.delete(event.pointerId);
    } else {
      this.hovered.set(event.pointerId, next);
    }
  }

  private exitHover(pointerId: number): void {
    const hovers = this.hovered.get(pointerId);
    if (hovers == null) {
      return;
    }
    this.hovered.delete(pointerId);
    for (const hover of hovers) {
      hover.hoverExited();
    }
  }

  private readonly onPointerOut = (event: PointerEvent): void => {
    if (event.relatedTarget == null) {
      this.exitHover(event.pointerId);
    }
  };

  // --- Clicks, menus, scrolls, focus -----------------------------------------

  private armSwallower(): void {
    this.swallowDeadline =
      browserClock.now() + UIKIT_GESTURES.click.strayClickWindow.value;
  }

  private disarmSwallower(): void {
    this.swallowDeadline = Number.NEGATIVE_INFINITY;
  }

  private readonly onClick = (event: MouseEvent): void => {
    if (browserClock.now() > this.swallowDeadline) {
      return;
    }
    if (!event.isTrusted || event.detail === 0) {
      return;
    }
    if (
      event.target instanceof Element &&
      event.target.hasAttribute(HAPTIC_SWITCH_ATTRIBUTE)
    ) {
      return;
    }
    this.disarmSwallower();
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  private replayClick(touch: GestureTouch, allowed: boolean): void {
    if (!allowed) {
      return;
    }
    // The browser's own click was swallowed while recognizers decided; they
    // all failed, so the click the touch earned is delivered now.
    this.disarmSwallower();
    const target = touch.target;
    const view = this.doc.defaultView;
    if (!(target instanceof Element) || !target.isConnected || view == null) {
      return;
    }
    target.dispatchEvent(
      new view.MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: 1,
        clientX: touch.x,
        clientY: touch.y,
      }),
    );
  }

  private readonly onContextMenu = (event: MouseEvent): void => {
    for (const touch of this.arena.touches) {
      if (this.arena.isClaimed(touch.id)) {
        event.preventDefault();
        return;
      }
    }
  };

  private readonly onScroll = (event: Event): void => {
    const scroller = event.target;
    const taken: number[] = [];
    for (const touch of this.arena.touches) {
      if (
        touch.takenByBrowser ||
        touch.phase === 'ended' ||
        touch.phase === 'cancelled' ||
        touch.pointerType !== 'touch' ||
        this.arena.isClaimed(touch.id)
      ) {
        continue;
      }
      const reaches =
        scroller === this.doc ||
        (scroller instanceof Node &&
          touch.target instanceof Node &&
          scroller.contains(touch.target));
      if (reaches) {
        taken.push(touch.id);
      }
    }
    if (taken.length > 0) {
      this.arena.browserTookOver(taken, event.timeStamp);
    }
  };

  private readonly onVisibilityChange = (): void => {
    if (this.doc.visibilityState === 'hidden') {
      this.cancelEverything(this.arena.now());
    }
  };

  private readonly onBlur = (): void => {
    this.cancelEverything(this.arena.now());
  };

  /** The app lost focus: UIKit cancels every touch in flight. */
  private cancelEverything(time: number): void {
    const ids = [...this.touchIds.values(), ...this.pointerIds.values()];
    this.touchIds.clear();
    this.pointerIds.clear();
    this.fingerPointers.clear();
    this.pendingPointers.clear();
    this.unpairedTouches.clear();
    this.lastFed.clear();
    if (ids.length > 0) {
      this.arena.cancelled(ids, time);
    }
    for (const pointerId of [...this.hovered.keys()]) {
      this.exitHover(pointerId);
    }
  }
}

function needsSuppression(
  dispositions: Map<number, ClickDisposition>,
): boolean {
  for (const disposition of dispositions.values()) {
    if (disposition !== 'allow') {
      return true;
    }
  }
  return false;
}

function coalescedHistory(event: PointerEvent): TouchSample[] {
  if (typeof event.getCoalescedEvents !== 'function') {
    return [];
  }
  const coalesced = event.getCoalescedEvents();
  return coalesced.slice(0, -1).map(sample => ({
    x: sample.clientX,
    y: sample.clientY,
    time: sample.timeStamp,
  }));
}

const hosts = new WeakMap<Document, GestureHost>();

/** The gesture host of a document, created on first use. */
export function getGestureHost(doc: Document): GestureHost {
  let host = hosts.get(doc);
  if (host == null) {
    host = new GestureHost(doc);
    hosts.set(doc, host);
  }
  return host;
}
