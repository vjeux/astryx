// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file datePicker.ts
 * @input Nothing; data only
 * @output Exports `datePicker`, the UIDatePicker constants the touch pickers
 *   follow: how a day tap selects, the title following a drag of the month
 *   grid, the chevron's retarget, the month/year toggle's fade and chevron
 *   turn, the month/year wheels changing the date, and the wheels' rules
 *   (the AM/PM column following the hour, the turn back onto a bound, the
 *   day clamped to the month)
 * @position The date picker domain of the UIKit constants table
 *   (motion/uikit); read by the DateInput, DateTimeInput and TimeInput touch
 *   surfaces
 *
 * The inline calendar's month grid is a paging UICollectionView
 * (`isPagingEnabled`, `decelerationRate` 0.998), whose drag, release and
 * settle are UIScrollView paging's, and its wheels are UIPickerView's
 * (`picker`). This file holds what UIDatePicker adds on top.
 *
 * Every leaf carries one or more `@source` (apple-docs | wwdc | webkit |
 * measured | GUESS); webkit and GUESS values also carry the `@measure` task
 * that will confirm or replace them (motion/MEASUREMENTS.md). uikit.test.ts
 * enforces both. Times are in ms.
 *
 * The measurements are `UIDatePicker`s (`.date` `.inline`, `.time` and
 * `.date` `.wheels`), en_US, Gregorian, America/Los_Angeles, in an
 * instrumented host app on the iOS 26.2 simulator (iPhone 17 Pro), driven by
 * real HID touches: per-frame offsets, the animations UIKit attached, the
 * gesture recognizers' states and the `valueChanged` events, Oct 23 2026.
 *
 * One leaf is motion: the month/year toggle's fade. It equals a motion role
 * `spec:AST-094` FR4 names, so a surface plays that role, not the leaf: the
 * toggle's fade and its chevron's turn run `timing.stateChangeMs` on
 * `timing.curves.move`. No surface plays a bare literal. The rest are rules.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/MEASUREMENTS.md (measurement tasks)
 * - /packages/core/src/motion/README.md (the table's file list)
 */

export const datePicker = {
  calendar: {
    selection: {
      /**
       * A tap on a day selects it at once: the new day's circle and numeral
       * take their style in the frame of the lift, the old day's go, with no
       * animation; `valueChanged` fires at the lift (81–95 ms after
       * touch-down for a quick tap).
       * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.inline`,
       *   taps on two days with every CAAnimation logged (none on the day
       *   cells) and `valueChanged` timestamps, Oct 23 2026
       */
      tapAnimates: false,
    },
    pager: {
      /**
       * While a finger drags the month grid, the header's title names the
       * month nearest the content offset: it changes when the content
       * crosses half a page, during the drag (and during a settle), not at
       * the lift.
       * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.inline`,
       *   a slow drag released at 70 % of a page: the title turned to the
       *   next month at 51 % (offset 1124 of a 320 pt page from 960), 560 ms
       *   before the lift, Oct 23 2026
       */
      titleFollows: 'nearestPage',
    },
    chevron: {
      /**
       * A second tap while the grid is still scrolling names the month after
       * that at once and starts a new 0.3 s sinusoid toward it from where the
       * grid is, from rest (the first motion's velocity is not kept).
       * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.inline`,
       *   two taps on Next 150 ms apart: the title jumped two months, the
       *   offset held one frame at 1092.33 and then ran to 1600 on a fresh
       *   0.3 s sinusoid (4, 59.33, 253.67, 448.33, 503.67 pt at 17, 67, 150,
       *   233, 283 ms), Oct 23 2026
       */
      retarget: 'fromPresentation',
    },
    monthYearToggle: {
      /**
       * Tapping the title fades the month and year wheels in while the day
       * grid, the weekday row and both chevrons fade out, all at once; a
       * second tap reverses it. Each is a 0.25 s opacity animation from
       * `UIView.animate(withDuration: 0.25, options: .beginFromCurrentState)`
       * (no curve option: UIKit's default ease-in-ease-out,
       * `timing.curves.move`).
       * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.inline`,
       *   title taps opening and closing the wheels: five CABasicAnimation
       *   opacity 0.25 s (`_UICalendarMonthYearSelector`, the
       *   `UICollectionView`, `_UICalendarWeekdayView`, both buttons) under
       *   one `UIView.animate` 0.25 s with options 4, Oct 23 2026
       */
      fadeMs: 250,
      /**
       * The title's chevron turns a quarter turn with them: it points along
       * the reading direction while the calendar shows and down while the
       * wheels show, a 0.25 s transform animation each way (the same
       * `UIView.animate` curve as the fades).
       * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.inline`,
       *   the title's UIImageView: CABasicAnimation transform 0.25 s from a
       *   −90° rotation on opening and from +90° on closing, to identity,
       *   Oct 23 2026
       */
      chevronTurnDegrees: 90,
    },
    monthYearWheels: {
      /**
       * Turning the month or year wheel changes the picker's date, keeping
       * the day, and fires `valueChanged`.
       * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.inline`,
       *   October 15 → May 15 after the month wheel's fling, with a
       *   `valueChanged` carrying May 15, Oct 23 2026
       */
      changesDate: true,
    },
  },
  wheels: {
    /**
     * In 12-hour time the AM/PM column follows the hour: turning the hour
     * from 11 to 12 turns the time from AM to PM (and back the other way),
     * while 12 to 1 keeps it.
     * @source measured: UIKit lab, iOS 26.2 simulator, `.time` `.wheels`,
     *   en_US: 11:58 AM, hour wheel +1 row → `valueChanged` 12:58 PM; +1
     *   again → 1:02 PM, Oct 23 2026
     */
    meridiemFollowsHour: true,
    /**
     * A column that comes to rest past `minimumDate` or `maximumDate`
     * turns back onto the bound, and `valueChanged` already carries the
     * bound (the hour of 10:00 dragged to 7 with bounds 9:00–17:00: the
     * date reads 9:00 at rest and the hour column turns 64 pt, two rows,
     * back to 9).
     * @source measured: UIKit lab, iOS 26.2 simulator, `.time` `.wheels`
     *   with bounds 9:00–17:00 and `minuteInterval` 15, per-frame hour
     *   offsets after the rest (0.4, 2, 7.4, 16, 26.4, 37.7, 48.3, 56.7,
     *   62, 64 pt at 33 ms steps) and the `valueChanged` time, Oct 23 2026
     */
    restPastBound: 'turnToBound',
    /**
     * In `.date` wheels a day the month does not have clamps to the month's
     * last day (January 30, month +1 → February 28).
     * @source measured: UIKit lab, iOS 26.2 simulator, `.date` `.wheels`
     *   with bounds Jun 1 2026 – Mar 15 2027, Oct 23 2026
     */
    dayClampsToMonth: true,
  },
} as const;
