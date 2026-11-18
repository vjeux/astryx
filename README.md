# Reset date and time field heights on iOS: CSS variants

One page, `pages/7524-ios-variants.html`, with the reset from the date and time fields pull request (head 6efb2174e5) inlined byte for byte.

Each row holds a text field, an empty date field, a date field and a time field, styled alike: `font: 16px/1.5`, `padding: 7px 11px`, `border: 1px solid`. Only the date and time fields take each row's extra rules. No row sets `appearance`, so every field keeps the browser's native look.

| Row | Extra rules on the date and time fields |
| --- | --- |
| v0 | none: the reset alone |
| v1 | `box-sizing: border-box` |
| v2 | `height: auto; min-height: 0` |
| v3 | v1 and v2 together |
| v4 | v3 with `!important` |
| v5 | v3, plus `height: 1lh` on `::-webkit-date-and-time-value` |
| v6 | v1, plus `height: 40px; min-height: 0` |

In Chrome 149 every field in every row is 40px tall.

## Round 2: `pages/7524-ios-variants-2.html`

The same fields and reset. The grid now uses `align-items: start` and two 160px columns, so no field stretches to its row and every field fits a 402px viewport. The rules target `input:is([type="date"], [type="time"], [type="datetime-local"], [type="month"], [type="week"])`.

| Row | Extra rules on the date and time fields | Chrome 149 |
| --- | --- | --- |
| v0 | none: the reset alone | 40px, 160px wide |
| v6 | `box-sizing: border-box; height: 40px; min-height: 0` (round 1) | 40px |
| v7 | `height: 1lh` | 24px: Chrome keeps the reset's `border-box` |
| v8 | `box-sizing: content-box; height: 1lh` | 40px, but 184px wide in a 160px column |
| v9 | `height: 1lh` inside `@supports (-webkit-touch-callout: none)` | 40px: the query is false in Chrome |
