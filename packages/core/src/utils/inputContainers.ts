// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file inputContainers.ts
 * @input An input container and the control it gives focus to
 * @output A registry from each mounted input container to its control, shared
 *   by every copy of Core
 * @position Written by useInputContainer and read by the keyboard module, so
 *   a tap on a field's container counts as a tap on its control
 */

import {sharedWeakMap} from './sharedRealm';

const controls = sharedWeakMap<Element, HTMLElement>(
  'utils/input-containers/controls',
  1,
);

/**
 * Registers `container` as the input container of `control` until the
 * returned call.
 *
 * @example
 * ```
 * const stop = registerInputContainer(wrapper, input);
 * ```
 */
export function registerInputContainer(
  container: Element,
  control: HTMLElement,
): () => void {
  controls.set(container, control);
  return () => {
    if (controls.get(container) === control) {
      controls.delete(container);
    }
  };
}

/** The control `container` gives focus to, when it is an input container. */
export function inputContainerControl(container: Element): HTMLElement | null {
  return controls.get(container) ?? null;
}
