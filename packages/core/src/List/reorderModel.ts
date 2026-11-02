// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file reorderModel.ts
 * @input A list's row geometry (layout tops and heights inside the list) and
 *   the reorder values of the UIKit constants table (motion/uikit/reorder.ts)
 * @output Pure functions of a reorder's drag: the position a dragged row proposes
 *   (where the insertion cue goes), the movable range that a fixed row at
 *   either end of the list bounds, the autoscroll step and the tracking clamp
 * @position List internals; List/listReorderEngine.tsx drives a drag with
 *   them. No DOM, no React: unit tested, and replayed against the UIKit lab
 *   drag
 *
 * The rows stay still during a drag while an insertion cue marks the
 * drop position (design:ordered-collection-reordering DR3), so the model
 * proposes drop positions and moves no row. The rule is spec:AST-103 FR1's:
 * the drop position whose slot centre is nearest the dragged row's centre,
 * with no hysteresis. For equal rows it changes places after half a row, as
 * UIKit does (iOS 26.2); for unequal rows it departs from UIKit's measured
 * crossing (motion/MEASUREMENTS.md, Reorder), where a 44 pt row passes an
 * 88 pt row below it only once its centre is past the tall row's height.
 * Autoscroll moves a whole number of points per tick, more the deeper the
 * dragged row's edge is past the scroll view's edge (measured).
 */

import {reorder} from '../motion/uikit/reorder';

/** One row: its layout top inside the list, its height, and whether it stays put. */
export interface ReorderRow {
  readonly top: number;
  readonly height: number;
  /**
   * A row with no handle, so no drag starts from it: a run of them at either
   * end of the list bounds a drag, and one in the middle is passed over
   * (spec:AST-103 FR1).
   */
  readonly isFixed: boolean;
}

export interface ReorderGeometry {
  readonly rows: ReadonlyArray<ReorderRow>;
  /** The space between two consecutive rows. */
  readonly gap: number;
}

/**
 * The positions `dragged` can take: all of them but those of the fixed rows that
 * end the list. A run of fixed rows at either end bounds the range; a fixed row
 * in the middle is passed over, as reorder mode's keys pass it
 * (spec:AST-103 FR1, FR4).
 */
export function movableRange(
  rows: ReadonlyArray<ReorderRow>,
  dragged: number,
): {start: number; end: number} {
  let start = 0;
  while (start < dragged && rows[start].isFixed) {
    start += 1;
  }
  let end = rows.length - 1;
  while (end > dragged && rows[end].isFixed) {
    end -= 1;
  }
  return {start, end};
}

/**
 * The position the dragged row proposes, in list coordinates: where the
 * insertion cue goes. Each position's slot centre is where the dragged row's
 * centre would rest there: before the row at a position above its place, its
 * top on that row's top; past the row at a position below, its bottom on that
 * row's bottom. The proposal is the position within the movable range whose
 * slot centre is nearest the dragged row's centre (spec:AST-103 FR1); at a
 * midpoint the lower position wins. For equal rows that is half a row, as
 * UIKit's crossing rule; for unequal rows it departs from UIKit, which keeps a
 * 44 pt row before an 88 pt row below it until its centre passes the tall
 * row's height (measured).
 */
export function dropPosition(
  geometry: ReorderGeometry,
  dragged: number,
  center: number,
): number {
  const {rows} = geometry;
  const height = rows[dragged].height;
  const slotCenter = (index: number): number => {
    const row = rows[index];
    return index <= dragged
      ? row.top + height / 2
      : row.top + row.height - height / 2;
  };
  const {start, end} = movableRange(rows, dragged);
  let position = start;
  let distance = Math.abs(slotCenter(start) - center);
  for (let index = start + 1; index <= end; index += 1) {
    const next = Math.abs(slotCenter(index) - center);
    if (next < distance) {
      position = index;
      distance = next;
    }
  }
  return position;
}

/**
 * Points per autoscroll tick with the dragged row's edge `depth` points past
 * the scroll edge (negative inside): none further inside than the start
 * inset, then UIKit's measured steps, interpolated and rounded.
 */
export function autoscrollStep(depth: number): number {
  const {depths, stepsPt, startInset} = reorder.autoscroll;
  if (depth < -startInset) {
    return 0;
  }
  if (depth <= depths[0]) {
    return stepsPt[0];
  }
  const last = depths.length - 1;
  if (depth >= depths[last]) {
    return stepsPt[last];
  }
  let index = 1;
  while (depths[index] < depth) {
    index += 1;
  }
  const d0 = depths[index - 1];
  const d1 = depths[index];
  const s0 = stepsPt[index - 1];
  const s1 = stepsPt[index];
  return Math.round(s0 + ((s1 - s0) * (depth - d0)) / (d1 - d0));
}

/** Where a dragged row may go: the scroller's visible edges and the list's ends. */
export interface ReorderBounds {
  /** The scroller's visible top and bottom. */
  readonly scrollTop: number;
  readonly scrollBottom: number;
  /** The list's first row top and last row bottom. */
  readonly listTop: number;
  readonly listBottom: number;
}

/**
 * The dragged row's top. At the scroller's visible edge the row stops with its
 * centre on the edge, as UIKit stops a row on the table's edge; at the list's
 * own end it stops with its edge there, so a row never hangs over the content
 * after an embedded list (a TransferList's next panel, a page footer).
 */
export function clampTop(
  top: number,
  height: number,
  bounds: ReorderBounds,
): number {
  const min = Math.max(bounds.scrollTop - height / 2, bounds.listTop);
  const max = Math.min(
    bounds.scrollBottom - height / 2,
    bounds.listBottom - height,
  );
  return Math.min(max, Math.max(min, top));
}
