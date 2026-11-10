// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file wheelOptions.ts
 * @input Nothing; types, the row height and pure functions
 * @output WheelOption, WheelProps, WheelHandle, WHEEL_ROW_HEIGHT, canSpinTo,
 *   nearestEnabledIndex, steppedIndex, endIndex, and the looping wheel's
 *   wrapIndex, loopStep, restingStep and loopedStep: what both wheels share
 * @position Internal; read by Wheel.tsx (which re-exports all of it) and
 *   PickerWheel.tsx
 *
 * SYNC: When modified, update:
 * - /packages/core/src/DateInput/Wheel.tsx
 * - /packages/core/src/DateInput/PickerWheel.tsx
 */

import type {Ref} from 'react';

/**
 * The row height, px (`dateInputTouchSizes.wheelItemSize`): the pitch of both
 * columns' rows, and the unit of the touch wheel's offset.
 */
export const WHEEL_ROW_HEIGHT = 28;

export interface WheelOption {
  /** Stable numeric identity of the row (a month 1-12, or a year). */
  value: number;
  /** Row text. */
  label: string;
  /**
   * Rows outside min/max stay visible but cannot be committed: a wheel that
   * stops on one travels on to the nearest enabled row.
   */
  isDisabled?: boolean;
  /**
   * Where the row falls when a key steps the wheel; without it, rows step in
   * list order. A 12-hour hour column sets the full hour, so 12 PM comes before
   * 1 PM.
   */
  order?: number;
}

/** What a Wheel's `ref` exposes. */
export interface WheelHandle {
  /**
   * Turn the wheel onto `index` (an index into `options`) on the tap spin, then
   * commit it as a rest would. Resolves true once that row is the committed
   * one, false if a finger or another turn interrupted it or the wheel went
   * away first. An index outside `options` or a disabled row resolves false at
   * once, and nothing turns. Under a fine pointer the row commits at once. The
   * column then scrolls to it as for any new value, on the same rule.
   */
  spinTo(index: number): Promise<boolean>;
}

export interface WheelProps {
  /** Accessible name for the column, e.g. "Month". */
  label: string;
  /** Rows, top to bottom. */
  options: ReadonlyArray<WheelOption>;
  /** Committed value; must match one option's `value`. */
  value: number;
  /**
   * Fired when the wheel comes to rest on a different, enabled row. On a
   * looping wheel, `wraps` counts the laps a person's move passed the seam,
   * forward positive, when it passed it at all.
   */
  onChange: (value: number, wraps?: number) => void;
  /**
   * False while the wheel is hidden. The scrolling column then waits to listen
   * and scroll, because a hidden scroller's offsets mean nothing. The touch
   * wheel turns its gestures off, and shows a value set from outside without
   * motion.
   */
  isActive?: boolean;
  /** Programmatic turns: `spinTo(index)`. */
  ref?: Ref<WheelHandle>;
  /**
   * Under a finger the rows repeat without end, as UIDatePicker's minutes and
   * hours do: the last row is followed by the first. A list shorter than the
   * column repeats down all of it. A single row never loops. The scrolling
   * column does not loop.
   */
  isLooping?: boolean;
}

/** The row that a looping wheel of `count` rows shows at `position`. */
export function wrapIndex(position: number, count: number): number {
  if (count <= 0) {
    return 0;
  }
  return ((position % count) + count) % count;
}

/**
 * The shorter signed number of rows from row `from` to row `to` around a loop
 * of `count` rows. Exactly half a turn goes forward.
 */
export function loopStep(from: number, to: number, count: number): number {
  const ahead = wrapIndex(to - from, count);
  return ahead <= count / 2 ? ahead : ahead - count;
}

/**
 * Whether `spinTo(index)` may turn onto `index`: an enabled row of `options`.
 * The touch wheel and the scrolling column answer a spin by the same rule.
 */
export function canSpinTo(
  options: ReadonlyArray<WheelOption>,
  index: number,
): boolean {
  const option = options[index];
  return option != null && !option.isDisabled;
}

/**
 * The enabled row nearest `index`: `index` itself when it is enabled,
 * otherwise the closest enabled row on either side. A tie goes to the side of
 * `towardIndex` (the committed row), and a wheel with no enabled row stays on
 * `towardIndex`.
 *
 * @example
 * ```
 * // Hours 0-23 with 09:00-17:00 bounds: stopping on 7 rests on 9.
 * nearestEnabledIndex(hourOptions, 7, 10); // 9
 * ```
 */
export function nearestEnabledIndex(
  options: ReadonlyArray<WheelOption>,
  index: number,
  towardIndex: number,
): number {
  const isEnabled = (i: number) =>
    i >= 0 && i < options.length && !options[i].isDisabled;
  if (isEnabled(index)) {
    return index;
  }
  for (let distance = 1; distance < options.length; distance++) {
    const below = index - distance;
    const above = index + distance;
    const isBelowEnabled = isEnabled(below);
    const isAboveEnabled = isEnabled(above);
    if (isBelowEnabled && isAboveEnabled) {
      return towardIndex < index ? below : above;
    }
    if (isBelowEnabled) {
      return below;
    }
    if (isAboveEnabled) {
      return above;
    }
  }
  return towardIndex;
}

/**
 * How many rows, signed, a wheel resting on row `index` travels to the nearest
 * enabled row: 0 when `index` is enabled. A tie goes toward `towardIndex` (the
 * committed row). On a looping wheel the distance runs around the seam. So a
 * rest beside the seam turns the shorter way round, never the long way across
 * the list. A wheel with no enabled row travels to `towardIndex`.
 *
 * @example
 * ```
 * // Months, looping, with only January and February enabled: a rest on
 * // December turns one row on to January, not ten back to February.
 * restingStep(monthOptions, 11, 0, true); // 1
 * ```
 */
export function restingStep(
  options: ReadonlyArray<WheelOption>,
  index: number,
  towardIndex: number,
  isLooping: boolean = false,
): number {
  const count = options.length;
  if (!isLooping || count === 0) {
    return nearestEnabledIndex(options, index, towardIndex) - index;
  }
  const isEnabled = (i: number) => !options[wrapIndex(i, count)].isDisabled;
  if (isEnabled(index)) {
    return 0;
  }
  const toward = loopStep(index, towardIndex, count);
  for (let distance = 1; distance <= count / 2; distance++) {
    const isBelowEnabled = isEnabled(index - distance);
    const isAboveEnabled = isEnabled(index + distance);
    if (isBelowEnabled && isAboveEnabled) {
      return toward < 0 ? -distance : distance;
    }
    if (isBelowEnabled) {
      return -distance;
    }
    if (isAboveEnabled) {
      return distance;
    }
  }
  return toward;
}

/** The rows' indices in the order keys step them: by `order`, else list order. */
function inKeyOrder(options: ReadonlyArray<WheelOption>): number[] {
  const indices = options.map((_, index) => index);
  if (options.every(option => option.order == null)) {
    return indices;
  }
  return indices.sort(
    (a, b) => (options[a].order ?? a) - (options[b].order ?? b),
  );
}

/**
 * The row a key moves a wheel to from `from` by `delta` rows, in key order. It
 * is the next enabled row from the target in the key's direction. Past the
 * last enabled row, it is the last enabled row before the target. Null when no
 * enabled row lies in that direction, so the key commits nothing.
 */
export function steppedIndex(
  options: ReadonlyArray<WheelOption>,
  from: number,
  delta: number,
): number | null {
  const count = options.length;
  if (count === 0 || delta === 0) {
    return null;
  }
  const rows = inKeyOrder(options);
  const start = Math.max(0, rows.indexOf(from));
  const isEnabled = (position: number) => !options[rows[position]].isDisabled;
  const step = Math.sign(delta);
  const target = Math.min(count - 1, Math.max(0, start + delta));
  for (
    let position = target;
    position >= 0 && position < count;
    position += step
  ) {
    if (isEnabled(position)) {
      return position === start ? null : rows[position];
    }
  }
  for (let position = target; position !== start; position -= step) {
    if (isEnabled(position)) {
      return rows[position];
    }
  }
  return null;
}

/**
 * How many rows, signed, a key moves a looping wheel from row `from` by `delta`
 * rows in key order. The key takes the next enabled row from its target in its
 * own direction, across the seam. The search stops half a turn from `from`:
 * past it a row is nearer the other way round. Failing that, the key takes the
 * enabled row nearest its target on the way back. The wheel travels in the
 * key's own direction, always less than one turn. Null when the key finds no
 * other row, so it commits nothing.
 *
 * @example
 * ```
 * // Minutes 00-59, looping: ArrowDown on :59 moves one row on, to :00.
 * loopedStep(minuteOptions, 59, 1); // 1
 * ```
 */
export function loopedStep(
  options: ReadonlyArray<WheelOption>,
  from: number,
  delta: number,
): number | null {
  const count = options.length;
  if (count < 2 || delta === 0) {
    return null;
  }
  const rows = inKeyOrder(options);
  const start = Math.max(0, rows.indexOf(from));
  const isEnabled = (position: number) =>
    !options[rows[wrapIndex(position, count)]].isDisabled;
  const step = Math.sign(delta);
  const reach = Math.max(Math.abs(delta), Math.floor(count / 2));
  let found: number | null = null;
  for (
    let position = start + delta;
    Math.abs(position - start) <= reach;
    position += step
  ) {
    if (isEnabled(position)) {
      found = position;
      break;
    }
  }
  for (
    let position = start + delta - step;
    found == null && position !== start;
    position -= step
  ) {
    if (isEnabled(position)) {
      found = position;
    }
  }
  if (found == null) {
    return null;
  }
  const ahead = wrapIndex((rows[wrapIndex(found, count)] - from) * step, count);
  return ahead === 0 ? null : ahead * step;
}

/** The first or the last enabled row in key order: where Home or End moves a wheel. */
export function endIndex(
  options: ReadonlyArray<WheelOption>,
  end: 'first' | 'last',
): number | null {
  const enabled = inKeyOrder(options).filter(
    index => !options[index].isDisabled,
  );
  return (end === 'first' ? enabled[0] : enabled[enabled.length - 1]) ?? null;
}
