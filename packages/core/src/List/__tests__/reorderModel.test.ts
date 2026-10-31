// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file reorderModel.test.ts
 * @input reorderModel.ts and the UIKit reorder values (motion/uikit/reorder.ts)
 * @output Unit proofs of the reorder model: the drop position whose slot
 *   centre is nearest the dragged row's centre (spec:AST-103 FR1), replayed
 *   against the UIKit lab drag (iOS 26.2 simulator, a table of 44 pt rows with
 *   rows 6 and 9 at 88 pt), the movable range that only the fixed rows ending
 *   a list bound, the autoscroll steps and the tracking clamp
 * @position Tests for List/reorderModel.ts
 */

import {describe, expect, it} from 'vitest';
import {reorder} from '../../motion/uikit/reorder';
import {
  autoscrollStep,
  clampTop,
  movableRange,
  dropPosition,
  type ReorderGeometry,
  type ReorderRow,
} from '../reorderModel';

function table(
  heights: ReadonlyArray<number>,
  {gap = 0, fixed = []}: {gap?: number; fixed?: ReadonlyArray<number>} = {},
): ReorderGeometry {
  let top = 0;
  const rows: ReorderRow[] = heights.map((height, index) => {
    const row = {top, height, isFixed: fixed.includes(index)};
    top += height + gap;
    return row;
  });
  return {rows, gap};
}

/** The measured table: 40 rows of 44 pt, rows 6 and 9 at 88 pt. */
const MEASURED = table(
  Array.from({length: 40}, (_, index) =>
    index === 6 || index === 9 ? 88 : 44,
  ),
);

describe('dropPosition', () => {
  it('replays the measured drag of row 3 down over the 88 pt row and back', () => {
    // Each proposal of the UIKit lab drag (table.proposed), with the dragged
    // row's centre (list coordinates) on the frame before it. Row 3's slot
    // centres from position 3 on are 154, 198, 242, 330 (the 88 pt row's
    // place), 374 and 418, so a position changes at the midpoints 176, 220,
    // 286, 352 and 396; at a midpoint the lower position wins.
    const replay: ReadonlyArray<[center: number, position: number]> = [
      [178, 4],
      [221, 5],
      [309, 6],
      [354, 7],
      [398, 8],
      [396, 7],
      [352, 6],
      // UIKit proposed 5 here: its crossing rule keeps a 44 pt row past an
      // 88 pt one only while the centre is beyond 308. The nearest slot centre
      // is 330, position 6.
      [306.8, 6],
    ];
    for (const [center, position] of replay) {
      expect(dropPosition(MEASURED, 3, center), `centre ${center}`).toBe(
        position,
      );
    }
  });

  it('changes places at the midpoint between two slot centres', () => {
    // Row 3's centre starts at 3 × 44 + 22 = 154; position 4's slot centre is
    // 198, so the midpoint is 176.
    expect(dropPosition(MEASURED, 3, 154)).toBe(3);
    expect(dropPosition(MEASURED, 3, 176)).toBe(3);
    expect(dropPosition(MEASURED, 3, 176.5)).toBe(4);
    expect(dropPosition(MEASURED, 3, 132)).toBe(2);
    // Position 5's slot centre is 242 and position 6's (the 88 pt row's place,
    // 264 to 352, less half the dragged row) is 330: the midpoint is 286.
    expect(dropPosition(MEASURED, 3, 221)).toBe(5);
    expect(dropPosition(MEASURED, 3, 286)).toBe(5);
    expect(dropPosition(MEASURED, 3, 286.5)).toBe(6);
  });

  it('moves a tall row past a short neighbour at the midpoint of their slots', () => {
    // Row 1 (88 pt) rests with its centre at 88. Past the 44 pt row below, its
    // slot centre is 132 + 44 - 44 = 132; the midpoint is 110.
    const geometry = table([44, 88, 44, 44]);
    expect(dropPosition(geometry, 1, 88)).toBe(1);
    expect(dropPosition(geometry, 1, 110)).toBe(1);
    expect(dropPosition(geometry, 1, 110.5)).toBe(2);
    // Up: before the 44 pt row above, its slot centre is 44; the midpoint is
    // 66.
    expect(dropPosition(geometry, 1, 66.5)).toBe(1);
    expect(dropPosition(geometry, 1, 66)).toBe(0);
  });

  it('never proposes a new position at rest, whatever the heights', () => {
    // More than twice the row below: a 100 pt row over 44 pt rows. Its slot
    // centres are 94 at rest and 138 past the next row: the midpoint is 116.
    const tall = table([44, 100, 44, 44]);
    expect(dropPosition(tall, 1, 44 + 50)).toBe(1);
    expect(dropPosition(tall, 1, 116)).toBe(1);
    expect(dropPosition(tall, 1, 116.5)).toBe(2);
    for (const heights of [
      [44, 100, 44, 44],
      [30, 120, 30, 30, 30],
      [88, 44, 88, 44],
      [44, 44, 200, 44],
    ]) {
      const geometry = table(heights, {gap: 4});
      for (const [index, row] of geometry.rows.entries()) {
        expect(
          dropPosition(geometry, index, row.top + row.height / 2),
          `${heights.join(',')} row ${index}`,
        ).toBe(index);
      }
    }
  });

  it('moves a short row up past a tall row above at the midpoint of their slots', () => {
    // Row 7 (44 pt) below row 6 (88 pt, 264 to 352): its slot centre is 374 at
    // rest and 264 + 22 = 286 before the tall row; the midpoint is 330.
    expect(dropPosition(MEASURED, 7, 374)).toBe(7);
    expect(dropPosition(MEASURED, 7, 330.5)).toBe(7);
    expect(dropPosition(MEASURED, 7, 330)).toBe(6);
  });

  it('puts the boundary in the middle of the gap between rows', () => {
    const geometry = table([40, 40, 40], {gap: 4});
    // Without row 0, row 1 sits at 0..40; its boundary is at 42.
    expect(dropPosition(geometry, 0, 42)).toBe(0);
    expect(dropPosition(geometry, 0, 42.5)).toBe(1);
  });

  it('stops at a fixed row that ends the list and passes one in the middle', () => {
    // spec:AST-103 FR1, FR4: only a rejected row at either end bounds the
    // drop range; one in the middle is passed over, as reorder mode's keys
    // pass it.
    const ends = table([44, 44, 44, 44, 44], {fixed: [0, 4]});
    expect(dropPosition(ends, 2, 1000)).toBe(3);
    expect(dropPosition(ends, 2, -1000)).toBe(1);
    const middle = table([44, 44, 44, 44, 44], {fixed: [2]});
    expect(dropPosition(middle, 0, 1000)).toBe(4);
    expect(dropPosition(middle, 4, -1000)).toBe(0);
  });
});

describe('movableRange', () => {
  it('is bounded only by the fixed rows that end the list', () => {
    // Runs of fixed rows at either end bound the range.
    const {rows} = table([44, 44, 44, 44, 44, 44], {fixed: [0, 1, 5]});
    expect(movableRange(rows, 3)).toEqual({start: 2, end: 4});
    // A fixed row in the middle is passed over (spec:AST-103 FR1, FR4).
    const middle = table([44, 44, 44, 44, 44, 44], {fixed: [1, 4]}).rows;
    expect(movableRange(middle, 2)).toEqual({start: 0, end: 5});
    expect(movableRange(middle, 0)).toEqual({start: 0, end: 5});
    expect(movableRange(middle, 5)).toEqual({start: 0, end: 5});
    expect(movableRange(table([44, 44, 44]).rows, 1)).toEqual({
      start: 0,
      end: 2,
    });
  });
});

describe('autoscrollStep', () => {
  it('follows the measured steps by edge depth', () => {
    expect(autoscrollStep(-12)).toBe(0);
    expect(autoscrollStep(-reorder.autoscroll.startInset - 0.5)).toBe(0);
    expect(autoscrollStep(-reorder.autoscroll.startInset)).toBe(2);
    expect(autoscrollStep(-3)).toBe(2);
    expect(autoscrollStep(6)).toBe(2);
    expect(autoscrollStep(8)).toBe(3);
    expect(autoscrollStep(10)).toBe(3);
    expect(autoscrollStep(12)).toBe(4);
    expect(autoscrollStep(16)).toBe(6);
    expect(autoscrollStep(20)).toBe(8);
    expect(autoscrollStep(22)).toBe(10);
    expect(autoscrollStep(40)).toBe(10);
  });

  it('interpolates whole points between samples', () => {
    expect(autoscrollStep(14)).toBe(5);
    expect(autoscrollStep(21)).toBe(9);
    for (let depth = -8; depth <= 30; depth += 0.25) {
      expect(Number.isInteger(autoscrollStep(depth))).toBe(true);
    }
  });
});

describe('clampTop', () => {
  it("stops the centre on the scroller's visible edges", () => {
    // The measured top clamp: a 44 pt row on a table starting at 62 stops at
    // a top of 40 (its centre on the edge).
    const bounds = {
      scrollTop: 62,
      scrollBottom: 800,
      listTop: 0,
      listBottom: 2000,
    };
    expect(clampTop(0, 44, bounds)).toBe(40);
    expect(clampTop(100, 44, bounds)).toBe(100);
    expect(clampTop(900, 44, bounds)).toBe(778);
  });

  it('stops the edges on the ends of a list inside the visible area', () => {
    // A list from 300 to 564 in a scroller showing 0–800: the row stays in it.
    const bounds = {
      scrollTop: 0,
      scrollBottom: 800,
      listTop: 300,
      listBottom: 564,
    };
    expect(clampTop(100, 44, bounds)).toBe(300);
    expect(clampTop(400, 44, bounds)).toBe(400);
    expect(clampTop(700, 44, bounds)).toBe(520);
  });

  it('takes whichever edge comes first', () => {
    // The list runs past the visible bottom: the scroll edge stops the centre.
    const bounds = {
      scrollTop: 0,
      scrollBottom: 800,
      listTop: 300,
      listBottom: 2000,
    };
    expect(clampTop(900, 44, bounds)).toBe(778);
  });
});
