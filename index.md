# TableActivation stills at 08b91e77df4142a9a3771fc797427183479d24f0

#8861 at 08b91e77df4142a9a3771fc797427183479d24f0, on main 1d99135a69253b5155964b84811451a41ab3507d. It adds the `useTableActivation` plugin. All numbers are test measurements.

Story: `core-tableactivation--master-detail` (Core/TableActivation, MasterDetail). The second row, "Search index", is active when the story loads. The story is new in this pull request, so there is no main frame to compare.

## How the frames were taken

- Storybook was built from this head. Chromium 149.0.7827.55 rendered it, through Playwright.
- Viewport 1280 × 800 CSS px at device scale 2, with reduced motion.
- A frame was taken after three identical viewport shots in a row. Every frame was looked at.
- The theme, color mode and direction come from the Storybook globals `astryxTheme`, `colorMode` and `direction`.
- The forced-colors frame uses Playwright's `forcedColors: 'active'`.

## How the marker was read

- The DOM gives each row's `aria-current` and `data-active`, and the first cell's computed `box-shadow` and `outline`.
- The pixels give the marker's width, its offset from the leading edge and its colour. Left is the leading edge in LTR, right in RTL.
- The cell colour is read 8–10 CSS px inside the leading edge.
- Contrast is the WCAG contrast ratio of the marker colour against that cell colour.
- A second reader, with separate code, read the same PNGs again. It gives the same marker widths, colours and contrasts in all 17 frames.

## Readings

| Frame | Marker | Edge, offset | Marker / cell | Contrast | Rows with `aria-current` |
|---|---|---|---|---|---|
| Neutral, light, LTR | 3 px | left, 0 | #1B1B1B / #FFFFFF | 17.22:1 | 1 |
| Neutral, light, RTL | 3 px | right, 0 | #1B1B1B / #FFFFFF | 17.22:1 | 1 |
| Neutral, dark, LTR | 3 px | left, 0 | #F1F1F1 / #262626 | 13.40:1 | 1 |
| Neutral, dark, RTL | 3 px | right, 0 | #F1F1F1 / #262626 | 13.40:1 | 1 |
| Stone, light, LTR | 3 px | left, 0 | #25252A / #FFFFFF | 15.25:1 | 1 |
| Stone, light, RTL | 3 px | right, 0 | #25252A / #FFFFFF | 15.25:1 | 1 |
| Stone, dark, LTR | 3 px | left, 0 | #F0F0F9 / #1B1B21 | 15.13:1 | 1 |
| Stone, dark, RTL | 3 px | right, 0 | #F0F0F9 / #1B1B21 | 15.13:1 | 1 |
| Gothic, light, LTR | 3 px | left, 0 | #E8F1F6 / #101314 | 16.30:1 | 1 |
| Gothic, light, RTL | 3 px | right, 0 | #E8F1F6 / #101314 | 16.30:1 | 1 |
| Gothic, dark, LTR | 3 px | left, 0 | #E8F1F6 / #101314 | 16.30:1 | 1 |
| Gothic, dark, RTL | 3 px | right, 0 | #E8F1F6 / #101314 | 16.30:1 | 1 |
| Matcha, light, LTR | 3 px | left, 0 | #3E481D / #FFFFFF | 9.77:1 | 1 |
| Matcha, light, RTL | 3 px | right, 0 | #3E481D / #FFFFFF | 9.77:1 | 1 |
| Matcha, dark, LTR | 3 px | left, 0 | #C0CBA9 / #1A1C14 | 10.13:1 | 1 |
| Matcha, dark, RTL | 3 px | right, 0 | #C0CBA9 / #1A1C14 | 10.13:1 | 1 |
| Forced colors (Neutral, light, LTR) | 3 px outline, all four edges | inset 3 px | #000000 / #FFFFFF | 21:1 | 1 |

## What the readings show

- In every frame, the active row has `aria-current="true"` and `data-active="true"`. No other row has either.
- The marker is an inset box-shadow on the active row's first cell: `3px 0 0 0 inset` in LTR and `-3px 0 0 0 inset` in RTL.
- The marker is 3 CSS px (6 device px) wide, at offset 0 from the leading edge.
- It covers the cell's height except its two divider pixel rows: 88 of 90 rows, or 120 of 122 in Matcha.
- Every contrast is at least 9.77:1. A non-text cue needs 3:1.
- The first cell of a row that is not active has no marker (width 0).
- Under forced colors, the marker is a 3 px solid outline in the system text colour, inset 3 px. It shows on all four edges of the first cell.

## Fill

- No active fill colour is drawn. The active first cell's computed background is transparent, the same as on other rows.
- The plugin's source says the table's row paint owns the active fill, so the plugin writes no background or row overlay.
- The active row skips the zebra stripe. This story is striped, and the active row is the second body row, which is an even row.
- Its colour equals the odd rows' colour. The fourth body row, also even, keeps the stripe.
- This head adds `:not([data-active="true"])` to the stripe selector in TableRow.

Cell colour at the leading edge, 10 CSS px in, at each row's vertical centre:

| Theme and mode | Active row (2nd, even) | 4th row (even, not active) | Odd rows |
|---|---|---|---|
| Neutral, light | #FFFFFF | #F1F1F1 | #FFFFFF |
| Neutral, dark | #262626 | #1B1B1B | #262626 |
| Stone, light | #FFFFFF | #E2E2E8 | #FFFFFF |
| Stone, dark | #1B1B21 | #3A3A42 | #1B1B21 |
| Gothic, light and dark | #101314 | #24292D | #101314 |
| Matcha, light | #FFFFFF | #F0F0E0 | #FFFFFF |
| Matcha, dark | #1A1C14 | #12140E | #1A1C14 |

## Other observations, not about the marker

- Gothic draws the same story colours in light and dark mode. Only the page below the story changes.
- In Matcha, the 110 px actions column truncates the "Open" button label: "Op…" in LTR and "…en" in RTL.
- In RTL, the detail pane's English sentence shows its full stop at the start of the line. This is normal bidirectional ordering for an LTR sentence in an RTL block.

## Files

- 16 frames named `<theme>--<mode>--<direction>.png`, and `forced-colors--neutral--light--ltr.png`.
- `readings.json` holds every reading above, per frame, with each PNG's SHA-256.
- `measurements.json` holds the second reading, the stripe colours, and the numbers this page uses.
