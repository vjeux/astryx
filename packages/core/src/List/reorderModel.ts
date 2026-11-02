// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file reorderModel.ts
 * @input A list's row geometry (layout tops and heights inside the list) and
 *   the reorder values of the UIKit constants table (motion/uikit/reorder.ts)
 * @output Pure functions of a reorder's drag: the position a dragged row proposes
 *   (where the insertion cue goes), from the measured rows or from an attached
 *   container's measured slots, the movable range that a fixed row at either
 *   end of the list bounds, the autoscroll step and the tracking clamp; and
 *   shift feedback's candidate (the midpoint rule) and the offsets that open
 *   its gap (spec:AST-103 FR9)
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
  rows: ReadonlyArray<Pick<ReorderRow, 'isFixed'>>,
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
  const slots = columnSlots(geometry, dragged);
  const {start, end} = movableRange(geometry.rows, dragged);
  let position = start;
  let distance = Math.abs(slots[start].y - center);
  for (let index = start + 1; index <= end; index += 1) {
    const next = Math.abs(slots[index].y - center);
    if (next < distance) {
      position = index;
      distance = next;
    }
  }
  return position;
}

/**
 * A column's slot centres for `dragged`: where its centre would rest at each
 * position, on the column's one axis (`x` 0). Before the row at a position
 * above its place, its top on that row's top; past the row at a position
 * below, its bottom on that row's bottom. `dropPosition` and shift feedback's
 * midpoint rule (`shiftCandidate`) both read them.
 */
export function columnSlots(
  geometry: ReorderGeometry,
  dragged: number,
): ReorderSlot[] {
  const {rows} = geometry;
  const height = rows[dragged].height;
  return rows.map((row, index) => ({
    x: 0,
    y:
      index <= dragged
        ? row.top + height / 2
        : row.top + row.height - height / 2,
  }));
}

/** A slot's centre: px from the top-left corner of the collection's container box. */
export interface ReorderSlot {
  readonly x: number;
  readonly y: number;
}

/**
 * The drop position a dragged item proposes among `slots`: the slot within
 * its movable range whose centre is nearest the item's centre (spec:AST-103
 * FR1); the first of equally near slots.
 */
export function nearestSlot(
  slots: ReadonlyArray<ReorderSlot>,
  items: ReadonlyArray<Pick<ReorderRow, 'isFixed'>>,
  dragged: number,
  center: ReorderSlot,
): number {
  const {start, end} = movableRange(items, dragged);
  let nearest = start;
  let nearestDistance = Infinity;
  for (let index = start; index <= end; index += 1) {
    const distance = Math.hypot(
      slots[index].x - center.x,
      slots[index].y - center.y,
    );
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  }
  return nearest;
}

/**
 * Shift feedback's candidate, the midpoint rule (spec:AST-103 FR9,
 * design:ordered-collection-reordering DEC-2): the candidate moves from
 * `current` to another slot only once the dragged item's centre has passed
 * that slot's centre, measured along the line from the current slot's centre
 * to it; of the slots it has passed, the one nearest its centre wins. In a
 * column a slot's centre is a neighbour's midpoint once that neighbour has
 * moved aside, so a centre resting near a boundary moves nothing. Slots
 * outside the drop range never qualify.
 */
export function shiftCandidate(
  slots: ReadonlyArray<ReorderSlot>,
  items: ReadonlyArray<Pick<ReorderRow, 'isFixed'>>,
  dragged: number,
  current: number,
  center: ReorderSlot,
): number {
  const {start, end} = movableRange(items, dragged);
  const from = slots[current];
  let candidate = current;
  let candidateDistance = Infinity;
  for (let index = start; index <= end; index += 1) {
    const dx = slots[index].x - from.x;
    const dy = slots[index].y - from.y;
    const length = dx * dx + dy * dy;
    if (index === current || length === 0) {
      continue;
    }
    // How far along the line from the current slot's centre to this one the
    // item's centre is: 1 at this slot's centre.
    const along =
      ((center.x - from.x) * dx + (center.y - from.y) * dy) / length;
    if (along < 1) {
      continue;
    }
    const distance = Math.hypot(
      slots[index].x - center.x,
      slots[index].y - center.y,
    );
    if (distance < candidateDistance) {
      candidate = index;
      candidateDistance = distance;
    }
  }
  return candidate;
}

/**
 * Each row's offset while shift feedback opens the gap at `position` in a
 * column (spec:AST-103 FR9): the rows between the dragged row's place and the
 * gap move one place toward its place, by its height and the list's gap. The
 * dragged row, which rides the pointer, and every other row stay at 0.
 */
export function shiftOffsets(
  geometry: ReorderGeometry,
  dragged: number,
  position: number,
): number[] {
  const step = geometry.rows[dragged].height + geometry.gap;
  return geometry.rows.map((_, index) => {
    if (position > dragged && index > dragged && index <= position) {
      return -step;
    }
    if (position < dragged && index >= position && index < dragged) {
      return step;
    }
    return 0;
  });
}

/**
 * The same in a slot layout (spec:AST-103 FR9): each item between the
 * dragged item's slot and the gap moves to its neighbour's slot, one place
 * toward the dragged item's; every other item stays.
 */
export function slotShiftOffsets(
  slots: ReadonlyArray<ReorderSlot>,
  dragged: number,
  position: number,
): ReorderSlot[] {
  return slots.map((slot, index) => {
    const to =
      position > dragged && index > dragged && index <= position
        ? index - 1
        : position < dragged && index >= position && index < dragged
          ? index + 1
          : index;
    return {x: slots[to].x - slot.x, y: slots[to].y - slot.y};
  });
}

/** An insertion cue: a line centred on `x, y`, `length` long, at `angle`°. */
export interface ReorderLine {
  readonly x: number;
  readonly y: number;
  readonly length: number;
  /** Clockwise from the horizontal, within (-90, 90]. */
  readonly angle: number;
}

/** The size of the item a cue marks the place of, unturned. */
export interface ReorderSize {
  readonly width: number;
  readonly height: number;
}

/**
 * A line between slot centres `a` and `b`: through their midpoint,
 * perpendicular to the step from one to the other, as long as `size` is
 * across it. Null when they coincide.
 */
function lineAcross(
  a: ReorderSlot,
  b: ReorderSlot,
  size: ReorderSize,
): ReorderLine | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy);
  if (distance === 0) {
    return null;
  }
  // The line runs along (-dy, dx): perpendicular to the step.
  const ux = -dy / distance;
  const uy = dx / distance;
  let angle = (Math.atan2(uy, ux) * 180) / Math.PI;
  // A line has no direction.
  if (angle > 90) {
    angle -= 180;
  } else if (angle <= -90) {
    angle += 180;
  }
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    length: size.width * Math.abs(ux) + size.height * Math.abs(uy),
    angle,
  };
}

/**
 * Whether slots `a` and `b` are neighbours along a row or a column for an
 * item of `size`: a row's centres sit within half an item's height (a fanned
 * hand's too), a column's within half its width. A step that wraps rows is
 * neither.
 */
function isAdjacent(
  a: ReorderSlot,
  b: ReorderSlot,
  size: ReorderSize,
): boolean {
  return (
    Math.abs(a.y - b.y) < Math.max(1, size.height / 2) ||
    Math.abs(a.x - b.x) < Math.max(1, size.width / 2)
  );
}

/**
 * The insertion cue of a drag in a slot layout (an attached container's
 * measured slots): a list's line, turned to lie between
 * the target slot and the next slot along the drag, which is where the item
 * lands in the order. Where the next slot is on another row (a row's end in
 * a wrapping grid) or there is none, half a step beyond the target slot
 * along its own row or column. None at the item's own place. (Proposed for
 * design:ordered-collection-reordering OQ2.)
 */
export function slotLine(
  slots: ReadonlyArray<ReorderSlot>,
  dragged: number,
  position: number,
  size: ReorderSize,
): ReorderLine | null {
  if (position === dragged) {
    return null;
  }
  const forward = position > dragged;
  const at = slots[position];
  const next = slots[forward ? position + 1 : position - 1];
  if (next != null && isAdjacent(at, next, size)) {
    return lineAcross(at, next, size);
  }
  const back = slots[forward ? position - 1 : position + 1];
  if (back != null && isAdjacent(at, back, size)) {
    return lineAcross(at, {x: 2 * at.x - back.x, y: 2 * at.y - back.y}, size);
  }
  // Alone on its row and column: at its edge along the reading order.
  const side = forward ? size.width : -size.width;
  return lineAcross(at, {x: at.x + side, y: at.y}, size);
}

/**
 * Reorder mode's cue after a key move from slot `from` to slot `to`: the
 * leading edge of the new slot along the move, half a step beyond it, as a
 * list's line marks the edge its row came in through. A move that wraps rows
 * is marked along the new slot's row, as a drag's cue is, so the line stays
 * inside the layout.
 */
export function stepLine(
  slots: ReadonlyArray<ReorderSlot>,
  from: number,
  to: number,
  size: ReorderSize,
): ReorderLine | null {
  const a = slots[from];
  const b = slots[to];
  if (a == null || b == null) {
    return null;
  }
  if (!isAdjacent(a, b, size)) {
    return slotLine(slots, from, to, size);
  }
  return lineAcross(b, {x: 2 * b.x - a.x, y: 2 * b.y - a.y}, size);
}

/**
 * A layout's rows in reading order, from its slots: each row lists its
 * items' indices from the reading start (the left, or the right in
 * right-to-left). Slots whose centres are within `tolerance` px vertically
 * share a row.
 */
export function gridOf(
  slots: ReadonlyArray<ReorderSlot>,
  isRtl: boolean,
  tolerance = 1,
): number[][] {
  const byY = slots
    .map((slot, index) => ({slot, index}))
    .sort((a, b) => a.slot.y - b.slot.y || a.index - b.index);
  const rows: {slot: ReorderSlot; index: number}[][] = [];
  for (const item of byY) {
    const row = rows[rows.length - 1];
    if (row != null && Math.abs(item.slot.y - row[0].slot.y) <= tolerance) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows.map(row =>
    row
      .sort((a, b) => (isRtl ? b.slot.x - a.slot.x : a.slot.x - b.slot.x))
      .map(({index}) => index),
  );
}

/** An arrow key reorder mode reads (spec:AST-103 FR4). */
export type ReorderArrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

/**
 * Where an arrow moves the item at `index` in a layout of `rows` (gridOf's),
 * as an index in the order; null when the arrow does not move along the
 * layout's axis or leaves it. A column moves with Up and Down, a row with
 * Left and Right (mirrored in right-to-left), and a grid with all four: Left
 * and Right to the previous and next position in reading order, Up and Down
 * to the same column in the previous or next row, or that row's last
 * position when it is shorter.
 */
export function arrowTarget(
  rows: ReadonlyArray<ReadonlyArray<number>>,
  index: number,
  arrow: ReorderArrow,
  isRtl: boolean,
): number | null {
  const count = rows.reduce((sum, row) => sum + row.length, 0);
  const isColumn = rows.every(row => row.length === 1);
  const isRow = rows.length === 1;
  const along = (delta: number) => {
    const to = index + delta;
    return to < 0 || to >= count ? null : to;
  };
  if (arrow === 'ArrowUp' || arrow === 'ArrowDown') {
    if (isRow) {
      return null;
    }
    if (isColumn) {
      return along(arrow === 'ArrowUp' ? -1 : 1);
    }
    const r = rows.findIndex(row => row.includes(index));
    const c = rows[r].indexOf(index);
    const next = rows[r + (arrow === 'ArrowUp' ? -1 : 1)];
    return next == null ? null : next[Math.min(c, next.length - 1)];
  }
  if (isColumn) {
    return null;
  }
  const forward = (arrow === 'ArrowRight') !== isRtl;
  return along(forward ? 1 : -1);
}

/** The 1-based row and column of the slot at `index` in `rows`. */
export function cellOf(
  rows: ReadonlyArray<ReadonlyArray<number>>,
  index: number,
): {row: number; column: number} {
  const r = rows.findIndex(row => row.includes(index));
  return {row: r + 1, column: rows[r].indexOf(index) + 1};
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
