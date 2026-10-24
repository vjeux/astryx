// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file delegatedPress.ts
 * @input A document and the attribute that marks pressable surfaces
 * @output Exports installPressAttribute and usePressAttribute: UIControl press
 *   tracking for every marked element in the document, found when a finger
 *   lands, with no per-element listener, state or render
 * @position Delegated consumer type of packages/core/src/gestures for
 *   pressable rows, cards and buttons
 *
 * A list of a thousand rows cannot pay for a hook and four listeners per
 * row. Here the document's gesture host finds the innermost marked element
 * under a touch and creates one PressTracker for that touch alone. The press
 * is painted as an attribute on the element, with the contract the existing
 * pressable styles read (`data-astryx-press`: `on` while pressed, `fading`
 * for the release, removed at once on a cancel):
 *
 * - the highlight comes on in the same frame, or after UIScrollView's
 *   content-touch delay inside a scroller, where a flick paints nothing;
 * - a finger dragged off the control keeps it pressed inside the expanded
 *   tracking bounds, and un-presses past them;
 * - a touch that brakes a list the finger set moving paints nothing;
 * - a recognizer that takes the touch, or the browser taking it to scroll,
 *   removes the paint with no fade;
 * - a disabled control takes the press and paints nothing, so the row around
 *   it does not light.
 *
 * Install it once per attribute (installs are counted, and the first one's
 * options hold); do not install it on the same attribute as the older
 * document press controller (utils/pressFeedback.ts).
 *
 * SYNC: When modified, update __tests__/delegatedPress.test.ts and README.md.
 */

import {useEffect, useState} from 'react';
import {PRESSABLE_ATTRIBUTE, PRESSED_ATTRIBUTE} from '../utils/pressFeedback';
import {PRESS_FADE_MS} from '../utils/pressGesture';
import {getGestureHost} from './GestureHost';
import {PressTracker, type ControlEvent} from './PressTracker';
import type {GestureTouch, PointerKind} from './types';

export interface PressAttributeOptions {
  /** Marks a pressable surface. @default 'data-astryx-pressable' */
  attribute?: string;
  /** Written on the pressed surface. @default 'data-astryx-press' */
  pressedAttribute?: string;
  /** How long the release's `fading` value stays, ms. @default the press fade */
  fadeMs?: number;
  /** A matching surface takes the press and paints nothing. */
  disabledSelector?: string;
  /** Contacts that press; a mouse keeps CSS `:active`. @default touch and pen */
  pointerTypes?: ReadonlyArray<PointerKind>;
  /** UIControl's expanded tracking bounds, px. */
  trackingExpansion?: number;
  /** Every UIControl event, for a caller that acts on them. */
  onControlEvent?: (
    element: Element,
    event: ControlEvent,
    touch: GestureTouch,
  ) => void;
}

const DISABLED = ':disabled, [aria-disabled="true"]';

interface Install {
  count: number;
  remove: () => void;
}

const installs = new WeakMap<Document, Map<string, Install>>();

/**
 * Track presses on every element carrying `attribute` in `doc`. Returns a
 * release function; the tracking stops when the last install is released.
 */
export function installPressAttribute(
  doc: Document,
  options: PressAttributeOptions = {},
): () => void {
  const attribute = options.attribute ?? PRESSABLE_ATTRIBUTE;
  let byAttribute = installs.get(doc);
  if (byAttribute == null) {
    byAttribute = new Map();
    installs.set(doc, byAttribute);
  }
  let install = byAttribute.get(attribute);
  if (install == null) {
    install = {count: 0, remove: addPressType(doc, attribute, options)};
    byAttribute.set(attribute, install);
  }
  install.count += 1;
  const owned = install;
  const table = byAttribute;
  let isReleased = false;
  return () => {
    if (isReleased) {
      return;
    }
    isReleased = true;
    owned.count -= 1;
    if (owned.count === 0) {
      owned.remove();
      table.delete(attribute);
    }
  };
}

function addPressType(
  doc: Document,
  attribute: string,
  options: PressAttributeOptions,
): () => void {
  const host = getGestureHost(doc);
  const pressed = options.pressedAttribute ?? PRESSED_ATTRIBUTE;
  const fadeMs = options.fadeMs ?? PRESS_FADE_MS;
  const disabled = options.disabledSelector ?? DISABLED;
  const pointerTypes = options.pointerTypes ?? ['touch', 'pen'];
  const fades = new WeakMap<Element, ReturnType<typeof setTimeout>>();

  const paint = (
    element: Element,
    isOn: boolean,
    last: ControlEvent | null,
  ): void => {
    const fade = fades.get(element);
    if (fade != null) {
      clearTimeout(fade);
      fades.delete(element);
    }
    if (isOn) {
      element.setAttribute(pressed, 'on');
      return;
    }
    if (last === 'touchUpInside' || last === 'touchUpOutside') {
      // A release fades; a cancel or a drag off the control does not.
      element.setAttribute(pressed, 'fading');
      fades.set(
        element,
        setTimeout(() => {
          fades.delete(element);
          element.removeAttribute(pressed);
        }, fadeMs),
      );
      return;
    }
    element.removeAttribute(pressed);
  };

  return host.addDelegatedConsumer({
    attribute,
    create(element, pointerType) {
      if (!pointerTypes.includes(pointerType) || element.matches(disabled)) {
        return null;
      }
      let last: ControlEvent | null = null;
      return new PressTracker({
        view: element,
        getBounds: () => element.getBoundingClientRect(),
        trackingExpansion: options.trackingExpansion,
        isBraking: () => host.isScrollBraking(element),
        onControlEvent: (event, touch) => {
          last = event;
          options.onControlEvent?.(element, event, touch);
        },
        onHighlightChange: isOn => paint(element, isOn, last),
      });
    },
  });
}

/**
 * Install delegated press tracking for the component's document while it is
 * mounted. Every component that paints a press can call it: installs are
 * counted, so the document holds one.
 */
export function usePressAttribute(options: PressAttributeOptions = {}): void {
  // Installs are counted per attribute and the first one's options hold, so
  // later option changes are not reinstalled.
  const [initial] = useState(options);
  const {attribute} = options;
  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    return installPressAttribute(document, {...initial, attribute});
  }, [attribute, initial]);
}
