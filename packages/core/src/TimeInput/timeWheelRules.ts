// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file timeWheelRules.ts
 * @input A time of day, the hour format and the bounds
 * @output Pure rules of UIDatePicker's time wheels: the columns' rows, the
 *   time a turned column makes, and which other columns turn with it
 * @position Internal helper of the TimeInput and DateTimeInput touch sheets;
 *   consumed by TimeWheels.tsx
 *
 * The columns do not loop. Each rule follows a leaf of motion/uikit/
 * datePicker.ts `wheels`. Pure functions keep the rules testable without a
 * layout engine.
 *
 * SYNC: When modified, update timeWheelRules.test.ts and TimeWheels.tsx.
 */

/** A time of day, 24-hour. */
export interface TimeParts {
  hour: number;
  minute: number;
  second: number;
}

/** A time wheel column. */
export type TimeColumn = 'hour' | 'minute' | 'second' | 'meridiem';

/** One row of a column: the value it stands for and its label. */
export interface TimeRow {
  value: number;
  label: string;
  isDisabled: boolean;
}

/** Inclusive bounds in seconds since midnight; `null` is unbounded. */
export interface TimeBounds {
  min: number | null;
  max: number | null;
}

const SECONDS_PER_DAY = 24 * 3600;

/** Whether the hour falls in the PM half (1) or the AM half (0). */
export function meridiemOf(hour: number): 0 | 1 {
  return hour < 12 ? 0 : 1;
}

/** The 12-hour clock's label for a 24-hour hour: 0 → 12, 13 → 1. */
export function hour12Of(hour: number): number {
  const h = hour % 12;
  return h === 0 ? 12 : h;
}

function partsOf(seconds: number): TimeParts {
  const s = ((seconds % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY;
  return {
    hour: Math.floor(s / 3600),
    minute: Math.floor((s % 3600) / 60),
    second: s % 60,
  };
}

/** Whether [start, end] (seconds) overlaps the bounds. */
function overlaps(start: number, end: number, bounds: TimeBounds): boolean {
  return (
    (bounds.min == null || end >= bounds.min) &&
    (bounds.max == null || start <= bounds.max)
  );
}

/**
 * `time` on the nearest whole minute, its seconds dropped, for a picker with no
 * seconds column. The minute stays inside the day and inside `bounds`. A minute
 * past midnight or past a bound becomes the nearest minute on the near side.
 */
function roundedToMinute(time: TimeParts, bounds: TimeBounds): TimeParts {
  const minutes = time.hour * 60 + time.minute + time.second / 60;
  const lastMinute = 24 * 60 - 1;
  const allowed = (minute: number) => {
    const at = minute * 60;
    return (
      minute >= 0 &&
      minute <= lastMinute &&
      (bounds.min == null || at >= bounds.min) &&
      (bounds.max == null || at <= bounds.max)
    );
  };
  const nearest = Math.round(minutes);
  const below = Math.floor(minutes);
  const minute =
    [nearest, below, below + 1].find(allowed) ?? Math.min(nearest, lastMinute);
  return {...partsOf(minute * 60), second: 0};
}

/**
 * The time the wheels show for `time`: its seconds kept when the picker has a
 * seconds column and dropped when it has none. A time outside the bounds is
 * shown as it is, on its disabled rows: opening the sheet never moves an
 * untouched value.
 */
export function displayedTime(time: TimeParts, hasSeconds: boolean): TimeParts {
  return {...time, second: hasSeconds ? time.second : 0};
}

/**
 * The time a column's rest commits when it would make `time`: the nearest
 * time inside the bounds that the columns have a row for. Past a bound, that
 * is the bound itself, or, with no seconds column, the nearest whole minute
 * inside it (a 16:55:30 maximum: 16:55). Inside the bounds, `time` itself.
 */
export function restingTime(
  time: TimeParts,
  hasSeconds: boolean,
  bounds: TimeBounds,
): TimeParts {
  const clamped = clampToBounds(time, bounds);
  return hasSeconds ? clamped : roundedToMinute(clamped, bounds);
}

/**
 * The hour the hour column makes when it comes to rest on `row` from the row
 * that showed `from` (24-hour). In 24-hour time the row is the hour. In 12-hour
 * time the half of the day changes only when the move passes between 11 and 12.
 * The column (1 … 12) does not loop, so 12 counts as next to 1. A move between
 * 12 and 1 to 6 keeps the half of the day. A move between 12 and 7 to 11
 * changes it.
 *
 * @example
 * ```
 * hourAfterTurn(11, 12, '12h'); // 12: 11 AM → 12 PM
 * hourAfterTurn(12, 1, '12h'); // 13: 12 PM → 1 PM
 * hourAfterTurn(13, 9, '12h'); // 21: 1 PM → 9 PM
 * ```
 */
export function hourAfterTurn(
  from: number,
  row: number,
  hourFormat: '12h' | '24h',
): number {
  if (hourFormat === '24h') {
    return row;
  }
  const shown = hour12Of(from);
  if (row === shown) {
    return from;
  }
  const half = from < 12 ? 0 : 12;
  const passes11And12 =
    (shown === 12 && row >= 7) || (row === 12 && shown >= 7);
  return (row % 12) + (passes11And12 ? 12 - half : half);
}

/**
 * The hour column. 24-hour time: 00 … 23. 12-hour time: 1 … 12, each row
 * standing for the hour a turn onto it from `from` makes
 * (`hourAfterTurn`). A row is disabled when no minute of that hour is inside
 * the bounds.
 */
export function hourRows(
  from: number,
  hourFormat: '12h' | '24h',
  bounds: TimeBounds,
): TimeRow[] {
  const hourAt = (row: number) => hourAfterTurn(from, row, hourFormat);
  const rows =
    hourFormat === '24h'
      ? Array.from({length: 24}, (_, hour) => hour)
      : Array.from({length: 12}, (_, index) => index + 1);
  return rows.map(row => {
    const hour = hourAt(row);
    return {
      value: row,
      label: hourFormat === '24h' ? String(row).padStart(2, '0') : String(row),
      isDisabled: !overlaps(hour * 3600, hour * 3600 + 3599, bounds),
    };
  });
}

/**
 * The minute column for `hour`: every minute. A row is disabled when it is
 * outside the bounds (its whole minute, when the picker shows seconds).
 */
export function minuteRows(
  hour: number,
  hasSeconds: boolean,
  bounds: TimeBounds,
): TimeRow[] {
  return Array.from({length: 60}, (_, minute): TimeRow => {
    const start = hour * 3600 + minute * 60;
    return {
      value: minute,
      label: String(minute).padStart(2, '0'),
      isDisabled: !overlaps(start, start + (hasSeconds ? 59 : 0), bounds),
    };
  });
}

/** The second column for `hour`:`minute`. */
export function secondRows(
  hour: number,
  minute: number,
  bounds: TimeBounds,
): TimeRow[] {
  return Array.from({length: 60}, (_, second): TimeRow => {
    const at = hour * 3600 + minute * 60 + second;
    return {
      value: second,
      label: String(second).padStart(2, '0'),
      isDisabled: !overlaps(at, at, bounds),
    };
  });
}

/** The AM/PM column: a half is disabled when none of its hours is in bounds. */
export function meridiemRows(
  labels: {am: string; pm: string},
  bounds: TimeBounds,
): TimeRow[] {
  return [
    {
      value: 0,
      label: labels.am,
      isDisabled: !overlaps(0, 12 * 3600 - 1, bounds),
    },
    {
      value: 1,
      label: labels.pm,
      isDisabled: !overlaps(12 * 3600, SECONDS_PER_DAY - 1, bounds),
    },
  ];
}

/**
 * The time made by turning `column` to `value` (its row's value) from `from`
 * (the time the wheels show). Only that column changes, and the AM/PM column
 * moves the hour by twelve.
 */
export function turnColumn(
  from: TimeParts,
  column: TimeColumn,
  value: number,
  hourFormat: '12h' | '24h',
): TimeParts {
  switch (column) {
    case 'hour':
      return {...from, hour: hourAfterTurn(from.hour, value, hourFormat)};
    case 'minute':
      return {...from, minute: value};
    case 'second':
      return {...from, second: value};
    case 'meridiem':
      return {...from, hour: (from.hour % 12) + 12 * value};
  }
}

/** `time` brought inside the bounds: past a bound, onto it. */
export function clampToBounds(time: TimeParts, bounds: TimeBounds): TimeParts {
  const seconds = time.hour * 3600 + time.minute * 60 + time.second;
  if (bounds.min != null && seconds < bounds.min) {
    return partsOf(bounds.min);
  }
  if (bounds.max != null && seconds > bounds.max) {
    return partsOf(bounds.max);
  }
  return time;
}

/** What a column shows for a time: its row's value. */
export function columnValue(
  time: TimeParts,
  column: TimeColumn,
  hourFormat: '12h' | '24h',
): number {
  switch (column) {
    case 'hour':
      return hourFormat === '24h' ? time.hour : hour12Of(time.hour);
    case 'minute':
      return time.minute;
    case 'second':
      return time.second;
    case 'meridiem':
      return meridiemOf(time.hour);
  }
}

/**
 * The columns that must turn after `column` came to rest on `value`. That is
 * every column whose row for the committed time differs from the row it shows
 * now. The column that moved shows `value`; the others show `from`. An hour
 * that crossed 11 ↔ 12 turns the AM/PM column; a time brought back onto a bound
 * turns every column whose row changed.
 */
export function columnsToTurn(
  from: TimeParts,
  column: TimeColumn,
  value: number,
  committed: TimeParts,
  options: {hourFormat: '12h' | '24h'; hasSeconds: boolean},
): {column: TimeColumn; value: number}[] {
  const columns: TimeColumn[] = ['hour', 'minute'];
  if (options.hasSeconds) {
    columns.push('second');
  }
  if (options.hourFormat === '12h') {
    columns.push('meridiem');
  }
  const turns: {column: TimeColumn; value: number}[] = [];
  for (const each of columns) {
    const shown =
      each === column ? value : columnValue(from, each, options.hourFormat);
    const target = columnValue(committed, each, options.hourFormat);
    if (shown !== target) {
      turns.push({column: each, value: target});
    }
  }
  return turns;
}
