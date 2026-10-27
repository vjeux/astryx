// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file inputHold.ts
 * @input A layer's root element, what ends the hold (a promise, or an
 *   animator handle's `finished`), and its scope; the gesture host's touch
 *   gates
 * @output holdInput, useInputHold, isInHeldLayer and
 *   isInputShield: input held away from a layer while its
 *   presentation runs
 * @position The Layer module's one input hold, for every component
 *   whose layer presents or dismisses under a finger
 *
 * UIKit delivers no touch while a presentation runs: until it completes, a
 * tap reaches nothing, and a dismissal drops every input until it ends
 * (measured on iOS 26.2 with UIAlertController: taps 400 ms into its
 * presentation ignored, 450 ms in handled). A hold covers one layer root
 * until what ends it settles:
 *
 * - `scope: 'viewport'` (a presentation): a touch, a pointer press or a
 *   click anywhere reaches nothing. A transparent shield inside the layer
 *   covers the viewport from the top layer, so a tap on it lands inside the
 *   layer (a light-dismissing layer stays open) and starts no pan (iOS
 *   drops that input too while it presents), while a pinch on it still
 *   zooms the page, which stays the browser's (spec:AST-094 FR10, FR18,
 *   FR35; WCAG 1.4.4); the gesture host holds
 *   the layer's touches away from every recognizer. Keys and assistive
 *   technology stay live, as on iOS.
 * - `scope: 'layer'` (a dismissal, an inert bar): the same shield, and the
 *   layer's content is inert (no focus, key or assistive-technology
 *   activation; a focused element inside it is blurred, since one that turns
 *   inert keeps its key activation). The layer element itself stays live, so
 *   the shield inside
 *   it still catches every hit: an inert subtree is no hit target, and a tap
 *   on it would otherwise land on whatever lies beneath. A modal dialog
 *   still receives its own `cancel` (Escape): the caller ignores it while
 *   held.
 *
 * The shield sets its own `pointer-events` and `visibility`, so a layer root
 * that takes no hits itself (its content or a backdrop child opts back in)
 * is held all the same. A hit test that must see past held input (a press
 * the finger that opened the layer continues, captured before the hold
 * began) skips shields and nothing else: the first element of
 * `elementsFromPoint` for which `isInputShield` is false, so an
 * overlay really above the layer still wins. The shield is a manual
 * popover, so its `toggle` events reach a document listener that logs
 * every popover's: such a log keeps to its own popovers.
 *
 * A touch that lands during a hold is the hold's to its end (FR35): if it is
 * still down when the hold ends, the shield stays, taking no new hit
 * (`pointer-events: none`), until that touch and its pointer end, so their
 * end lands on the shield, swallowed and held from the host like the rest of
 * the touch. A shield removed mid-touch would send that touch's end to a
 * detached node, which reaches no listener, and the browser then drops the
 * next tap's click.
 *
 * One hold per layer: holds on a held layer stack, and the layer comes back
 * when the last one ends (when what ends it settles, resolved or rejected;
 * when its release runs; on unmount, for the hook). Nothing is written to
 * the DOM but the shield and the content's `inert` attribute; the host
 * learns through one touch gate per document that asks `isInHeldLayer`,
 * walking the flat tree as it does (a slotted node to its slot, a shadow
 * root to its host).
 *
 * SYNC: When modified, update inputHold.test.tsx,
 * __tests__/inputHold.interaction.browser.spec.ts and the components
 * that hold their layer (holdInput and useInputHold callers).
 */

import {useEffect, type RefObject} from 'react';
import {getGestureHost} from '../gestures/GestureHost';
import {parentAcrossShadow} from '../gestures/nativeScroll';

/** What a hold covers: the whole viewport, or the layer alone. */
export type InputHoldScope = 'viewport' | 'layer';

/** What ends a hold: a promise, or an animator handle (its `finished`). */
export type InputHoldEnd =
  PromiseLike<unknown> | {readonly finished: PromiseLike<unknown>};

export interface InputHoldOptions {
  /** The hold ends when this settles. */
  until: InputHoldEnd;
  /** `'viewport'` while presenting, `'layer'` while dismissing. */
  scope: InputHoldScope;
}

interface HeldLayer {
  viewport: number;
  layer: number;
  shield: HTMLElement | null;
  /** The content a dismissal made inert, and whether each was already. */
  inertContent: Map<Element, boolean> | null;
}

const held = new WeakMap<Element, HeldLayer>();
const gatedDocuments = new WeakSet<Document>();
const liveShields = new WeakSet<Node>();
/** Shields kept after their hold for a touch that landed on them. */
const lingeringShields = new WeakSet<Node>();

/** The pointers and touches down on a shield, and how it stops watching. */
interface ShieldPresses {
  down: Set<string>;
  stop: () => void;
}
const shieldPresses = new WeakMap<Node, ShieldPresses>();

/**
 * Whether `node` is the shield of a live hold. A hit test that must see past
 * held input takes the first element of `elementsFromPoint` that is not one.
 */
export function isInputShield(node: Node | null): boolean {
  return node != null && liveShields.has(node);
}

/**
 * Whether `target` is inside a held layer, walking the flat tree as the
 * gesture host does (parentAcrossShadow: a slotted node to its slot, a
 * shadow root to its host), or is a shield kept for a touch that landed
 * during its hold.
 */
export function isInHeldLayer(target: Node | null): boolean {
  for (
    let node: Node | null = target;
    node != null;
    node = parentAcrossShadow(node)
  ) {
    if (
      lingeringShields.has(node) ||
      (node instanceof Element && held.has(node))
    ) {
      return true;
    }
  }
  return false;
}

/** One gate per document: the host holds a held layer's touches away. */
function gate(doc: Document): void {
  if (gatedDocuments.has(doc)) {
    return;
  }
  gatedDocuments.add(doc);
  getGestureHost(doc).addTouchGate(isInHeldLayer);
}

const SWALLOWED = [
  'pointerdown',
  'pointerup',
  'touchstart',
  'touchend',
  'mousedown',
  'mouseup',
  'click',
  'contextmenu',
] as const;

const swallow = (event: Event) => {
  // A touch's start stays uncancelled: cancelling it would cancel the page's
  // pinch-zoom too. The shield's `touch-action: pinch-zoom` keeps a finger
  // from panning, and a tap's mouse events and click land on the shield,
  // which swallows them.
  if (event.cancelable && event.type !== 'touchstart') {
    event.preventDefault();
  }
  event.stopPropagation();
};

/** A transparent top-layer cover of the viewport, inside `layer`. */
function addShield(layer: Element): HTMLElement {
  const shield = layer.ownerDocument.createElement('div');
  shield.setAttribute('popover', 'manual');
  shield.setAttribute('aria-hidden', 'true');
  Object.assign(shield.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    maxHeight: 'none',
    margin: '0',
    padding: '0',
    border: '0',
    background: 'transparent',
    overflow: 'hidden',
    touchAction: 'pinch-zoom',
    // The two inherited properties that decide hit-testing, set here so the
    // shield takes hits whatever its layer root opts out of (a full-viewport
    // layer that is `pointer-events: none` and lets a backdrop child take the
    // hits): inherited, they would let a held tap fall through to the page.
    pointerEvents: 'auto',
    visibility: 'visible',
  });
  for (const type of SWALLOWED) {
    shield.addEventListener(type, swallow, {capture: true, passive: false});
  }
  watchPresses(shield);
  layer.append(shield);
  liveShields.add(shield);
  if (typeof shield.showPopover === 'function') {
    try {
      shield.showPopover();
    } catch {
      // Not connected, or popovers unsupported: the shield still covers
      // what it can as a fixed element.
    }
  }
  return shield;
}

const PRESS_STARTS = ['pointerdown', 'touchstart'] as const;
const PRESS_ENDS = [
  'pointerup',
  'pointercancel',
  'touchend',
  'touchcancel',
] as const;

/** The pointer and touch keys an event starts or ends. */
function pressKeys(event: Event): string[] {
  const keys: string[] = [];
  const {pointerId, changedTouches} = event as Event & {
    pointerId?: number;
    changedTouches?: ArrayLike<{identifier: number}>;
  };
  if (typeof pointerId === 'number') {
    keys.push(`pointer:${pointerId}`);
  }
  if (changedTouches != null) {
    for (let i = 0; i < changedTouches.length; i++) {
      keys.push(`touch:${changedTouches[i].identifier}`);
    }
  }
  return keys;
}

/**
 * Records the pointers and touches that land on `shield`, and their ends
 * anywhere in its document (a mouse's release lands where the mouse is),
 * so a shield kept after its hold goes when the last of them ends.
 */
function watchPresses(shield: HTMLElement): void {
  const doc = shield.ownerDocument;
  const down = new Set<string>();
  const onStart = (event: Event) => {
    for (const key of pressKeys(event)) {
      down.add(key);
    }
  };
  const onEnd = (event: Event) => {
    if (down.size === 0) {
      return;
    }
    for (const key of pressKeys(event)) {
      down.delete(key);
    }
    if (down.size === 0 && lingeringShields.has(shield)) {
      removeShield(shield);
    }
  };
  for (const type of PRESS_STARTS) {
    shield.addEventListener(type, onStart, {capture: true, passive: true});
  }
  for (const type of PRESS_ENDS) {
    doc.addEventListener(type, onEnd, {capture: true, passive: true});
  }
  shieldPresses.set(shield, {
    down,
    stop: () => {
      for (const type of PRESS_ENDS) {
        doc.removeEventListener(type, onEnd, {capture: true});
      }
    },
  });
}

function removeShield(shield: HTMLElement): void {
  lingeringShields.delete(shield);
  shieldPresses.get(shield)?.stop();
  shield.remove();
}

/**
 * Ends a shield's hold: it goes, or, while a touch that landed on it is
 * still down, it stays for that touch alone, taking no new hit.
 */
function retireShield(shield: HTMLElement): void {
  liveShields.delete(shield);
  if ((shieldPresses.get(shield)?.down.size ?? 0) === 0) {
    removeShield(shield);
    return;
  }
  shield.style.pointerEvents = 'none';
  lingeringShields.add(shield);
}

/**
 * Holds input away from `layer` until `until` settles. Returns the release
 * (idempotent), for a hold that ends early.
 */
export function holdInput(
  layer: Element,
  {until, scope}: InputHoldOptions,
): () => void {
  gate(layer.ownerDocument);
  let state = held.get(layer);
  if (state == null) {
    state = {viewport: 0, layer: 0, shield: null, inertContent: null};
    held.set(layer, state);
  }
  if (state.shield == null) {
    state.shield = addShield(layer);
  }
  if (scope === 'viewport') {
    state.viewport += 1;
  } else {
    state.layer += 1;
    if (state.layer === 1) {
      state.inertContent = makeContentInert(layer, state.shield);
    }
  }
  let isReleased = false;
  const release = () => {
    if (isReleased) {
      return;
    }
    isReleased = true;
    const current = held.get(layer);
    if (current == null) {
      return;
    }
    if (scope === 'viewport') {
      current.viewport -= 1;
    } else {
      current.layer -= 1;
      if (current.layer === 0 && current.inertContent != null) {
        restoreInert(current.inertContent);
        current.inertContent = null;
      }
    }
    if (current.viewport === 0 && current.layer === 0) {
      if (current.shield != null) {
        retireShield(current.shield);
      }
      held.delete(layer);
    }
  };
  const end = 'finished' in until ? until.finished : until;
  void Promise.resolve(end).then(release, release);
  return release;
}

/**
 * Makes the layer's content inert, the shield aside, and moves focus out of
 * it: an element that turns inert while focused keeps its focus, and with it
 * its key activation (Enter and Space still click a focused button), until
 * the engine's focus fixup runs, if it runs at all (measured in Chromium and
 * WebKit). Blurring it leaves focus on the document, as that fixup does.
 */
function makeContentInert(
  layer: Element,
  shield: Element,
): Map<Element, boolean> {
  const content = new Map<Element, boolean>();
  for (const child of layer.children) {
    if (child !== shield) {
      content.set(child, child.hasAttribute('inert'));
      child.setAttribute('inert', '');
    }
  }
  const focused = deepActiveElement(layer.ownerDocument);
  if (
    focused instanceof HTMLElement &&
    [...content.keys()].some(child => isInFlatTree(child, focused))
  ) {
    focused.blur();
  }
  return content;
}

/** The focused element, inside any shadow roots on the way down. */
function deepActiveElement(doc: Document): Element | null {
  let active = doc.activeElement;
  while (active?.shadowRoot?.activeElement != null) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/** Whether `node` is `root` or inside it, walking the flat tree. */
function isInFlatTree(root: Node, node: Node): boolean {
  for (
    let current: Node | null = node;
    current != null;
    current = parentAcrossShadow(current)
  ) {
    if (current === root) {
      return true;
    }
  }
  return false;
}

function restoreInert(content: Map<Element, boolean>): void {
  for (const [element, wasInert] of content) {
    if (!wasInert) {
      element.removeAttribute('inert');
    }
  }
}

/**
 * Holds input away from the layer behind `ref` while `isHeld` is true (an
 * inert bar, a presentation driven by state); released when `isHeld` turns
 * false or the component unmounts.
 */
export function useInputHold(
  ref: RefObject<Element | null>,
  {isHeld, scope}: {isHeld: boolean; scope: InputHoldScope},
): void {
  useEffect(() => {
    const layer = ref.current;
    if (!isHeld || layer == null) {
      return;
    }
    // Released by the cleanup alone.
    return holdInput(layer, {
      until: new Promise<never>(() => {}),
      scope,
    });
  }, [ref, isHeld, scope]);
}
