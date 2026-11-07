// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file privateAttributes/alertExit.stylex.ts
 * @input A closing alert's dialog element, and the global hosts it holds
 * @output placeAlertExitCopy, which places the layer runtime's exit copy of
 *   a closing alert, marked as an alert's, and findAlertExitCopy, which finds
 *   that copy
 * @position Owner module of the private alert-exit attribute: the only file
 *   that writes its name. AlertDialog's touch close plays on the copy it
 *   places. No package entry exports it.
 */

import {placeLayerExitCopy} from '../Layer/layerExitCopy';
import {modalOutletHosts} from '../Layer/modalOutlet';

const ALERT_EXIT = 'data-astryx-alert-exit';

/** The child indexes that lead from `root` down to `node`. */
function pathTo(root: Element, node: Element): number[] {
  const path: number[] = [];
  for (let at = node; at !== root;) {
    const parent = at.parentElement;
    if (parent == null) {
      break;
    }
    path.unshift([...parent.children].indexOf(at));
    at = parent;
  }
  return path;
}

/** The element at `path` under `root`, if there is one. */
function elementAt(root: Element, path: ReadonlyArray<number>): Element | null {
  let at: Element | null = root;
  for (const index of path) {
    at = at?.children[index] ?? null;
  }
  return at;
}

/**
 * Places the layer runtime's exit copy of a closing alert, marked as an
 * alert's. A global host the open alert holds, such as the toast viewport,
 * stays out of the copy. It goes back to the page as the alert closes, and
 * stays live there. Returns null where there is no top layer to show it in:
 * the close is then immediate.
 */
export function placeAlertExitCopy(element: HTMLElement): HTMLElement | null {
  const hostPaths = modalOutletHosts()
    .filter(host => host !== element && element.contains(host))
    .map(host => pathTo(element, host));
  const copy = placeLayerExitCopy(element, ALERT_EXIT);
  if (copy != null) {
    // Found before any removal, which would move the later paths.
    const hostCopies = hostPaths.map(path => elementAt(copy, path));
    for (const hostCopy of hostCopies) {
      hostCopy?.remove();
    }
  }
  return copy;
}

/** The exit copy of a closing alert under `root`, if one is on screen. */
export function findAlertExitCopy(root: ParentNode): HTMLElement | null {
  return root.querySelector<HTMLElement>(`[${ALERT_EXIT}]`);
}
