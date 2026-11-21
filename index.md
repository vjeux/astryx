# TableActivation stripe spot-check at 5ab9da230149f6d2445aa12383040423dcc35fba

#8861 at 5ab9da230149f6d2445aa12383040423dcc35fba, on main 1d99135a69253b5155964b84811451a41ab3507d. All numbers are test measurements.

Story: `core-tableactivation--master-detail` (Core/TableActivation, MasterDetail). The table is striped. The second body row, "Search index", is active when the story loads, and it is an even row. The story is new in this pull request, so there is no main frame to compare.

## What changed since 08b91e77

One commit, in two files:

- `packages/core/src/Table/TableRow.tsx`: the stripe selector is `:nth-child(even of :not([data-expansion-panel]))` again, the same as on main. It no longer skips rows with `data-active="true"`.
- `packages/core/src/Table/plugins/rowExpansion/useTableRowExpansion.test.tsx`: the stripe-rule test asserts only `of :not([data-expansion-panel])`.

## How the frames were taken

- Storybook was built from this head. Chromium 149.0.7827.55 rendered it through Playwright, at 1280 × 800 CSS px, device scale 2, with reduced motion.
- Globals: `astryxTheme: neutral`, `colorMode: light`, `direction: ltr` or `rtl`.
- The forced-colors frame uses Playwright's `forcedColors: 'active'`.
- A frame was taken after three identical viewport shots in a row. Every frame was looked at.
- A second reader, with separate code, read the same PNGs again. It gives the same marker widths, colours and contrasts in all 3 frames.

## Readings

| Frame | Active row cell | 4th row (even, not active) | Odd rows | Marker | Edge, offset | Contrast | Rows with `aria-current` |
|---|---|---|---|---|---|---|---|
| Neutral, light, LTR | #F1F1F1 | #F1F1F1 | #FFFFFF | 3 px, #1B1B1B | left, 0 | 15.25:1 | 1 |
| Neutral, light, RTL | #F1F1F1 | #F1F1F1 | #FFFFFF | 3 px, #1B1B1B | right, 0 | 15.25:1 | 1 |
| Forced colors (Neutral, light, LTR) | #FFFFFF | #FFFFFF | #FFFFFF | 3 px outline, #000000 | all four edges, inset 3 px | 21:1 | 1 |

Cell colours are read 10 CSS px inside each row's leading edge, at the row's vertical centre. Contrast is the WCAG ratio of the marker colour against the active cell's colour.

## What the readings show

- The active even row keeps its zebra stripe. Its cell colour equals the other even row's colour (#F1F1F1 in Neutral light).
- The active row also shows the marker: an inset box-shadow, 3 CSS px wide, on its first cell. It is `3px 0 0 0 inset` in LTR and `-3px 0 0 0 inset` in RTL.
- The marker sits at offset 0 from the leading edge. It covers 88 of the cell's 90 pixel rows; the other two are the row dividers.
- Against the striped cell, the marker's contrast is 15.25:1. A non-text cue needs 3:1.
- The active row has `aria-current="true"` and `data-active="true"`. No other row has either.
- The first cell of a row that is not active has no marker.
- Forced colors removes the stripes. There the marker is a 3 px solid outline in the system text colour, on all four edges of the first cell.

## Against the take at 08b91e77

- At 08b91e77, the same active row read #FFFFFF, the unstriped colour, while the 4th row read #F1F1F1. That take's index is commit a020be58.
- Against its frames, only the active row changed here: 123496 device px differ in LTR and 123533 in RTL, all inside that row.
- The forced-colors frame is byte-identical to that take's.

## Files

- `neutral--light--ltr.png`, `neutral--light--rtl.png` and `forced-colors--neutral--light--ltr.png`.
- `readings.json` holds every reading per frame, with each PNG's SHA-256.
- `measurements.json` holds the second reading, the comparison with 08b91e77, and the numbers this page uses.
