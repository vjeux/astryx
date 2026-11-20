# Slider: a text value under theme fonts, main and head

Main: 9e40cf11fc33fac5da12ccc3df3b9060965dc2d1, also the head's merge base with main. Head: #12496 at 0191288efd21145a6dfd184593ae98a45eed9233, `pr` in file names.

## Answer

Each expectation, checked in 25 runs per slider: five font setups, each in five conditions. Numbers are at 1280 and 100% unless stated.

- Temperature = main at every value: met with neutral as served, y2k + Poppins. Not met with neutral + Figtree, gothic + Fustat, butter + Outfit.
- There the head's track differs by up to 4 px (Figtree), 7 px (Fustat), 4 px (Outfit).
- Quantity constant: met in all 25 runs. Never shorter than main: not met. The head's one length is shorter than main's shortest track in every run.
- That is by 0.98 px (as served), 4 px (Figtree), 6 px (Fustat), 5 px (Outfit), 6 px (Poppins).
- Price range constant: met in all 25 runs, in the head's own story too. Never shorter than main: not met.
- The head's track is shorter than main's shortest by 15 px (as served), 25 px (Figtree), 29 px (Fustat), 27 px (Outfit), 29 px (Poppins).
- Rating = main at every word: met with neutral as served, neutral + Figtree, y2k + Poppins. Not met with Fustat (6 px, up to 13 px in any condition) and Outfit (0 px, up to 1 px in any condition).
- Blend constant: met in all 25 runs. Its one length is shorter than main's shortest track, by 11 to 14 px.
- Opacity as main: met with neutral as served, y2k + Poppins. Not met with Figtree (3 px), Fustat (13 px), Outfit (3 px).
- No clipping or overlap: met. Over 19450 states, 0 are clipped and the overlap is 0 px. Nothing passes its row or the viewport, and no page scrolls sideways.

### Why

- The reserved width is wider than the widest end text. Each digit or space counts as 1ch, each other character as 1em, plus 1px.
- As served, Price range reserves 92.86 px, and its widest text, "1000 – 1000", is 77.86 px on main. Quantity reserves 24.36 px for "100", which is 23.36 px.
- The other differences come from the head's `font-variant-numeric: tabular-nums` and `font-kerning: none`. Main uses `normal` and `auto`.
- With both set back to main's values on the head's value text (harness only), every Temperature, Opacity and Rating difference is 0 px.
- With only the numeric setting set back, up to 2 px remain. Setting kerning back alone changes nothing.
- In Fustat, `tabular-nums` also widens the space and the period to a digit's width. So the head draws "0 . 8" and "1000  –  1000" (stills below).
- Fonts where `tabular-nums` changes no glyph width show no difference from main except the reserved width. Here those are Liberation Sans as served, whose digits already share one width, and Poppins.

## Builds

- Main: the production deploy of 9e40cf11fc, by its version.json (environment "production").
- Head: the preview deploy of 0191288efd, by its version.json (environment "preview"). No local build was used.

## Themes and fonts

- Theme switch: the Storybook global `astryxTheme` in the story URL (for example `globals=astryxTheme:gothic`), the global the toolbar sets.
- Storybook does not load the themes' `fonts.css`. As served, every theme's value text drew Liberation Sans, a system face, and `document.fonts` held none of the theme's faces.
- So the harness loads each theme's body font itself. It adds that family's `@font-face` rules from the theme's `fonts.css` to the page.
- Their woff2 files come from the repository as data URLs. The theme packages are the same in both commits.
- Proof on all 260 pages with a loaded font: Chromium's platform fonts for the value text name a web font of that family.
- Also, `document.fonts` lists the family's 400 face as loaded, and a sample string measures differently than in the fallback stack alone.

| Setup | Body family | Drawn face, as Chromium names the file | Sample width: theme stack / fallback only | Value text size | Digits, normal | Digits, `tabular-nums` |
| --- | --- | --- | --- | --- | --- | --- |
| neutral as served | Figtree, not loaded | Liberation Sans (system) | 187.578 / 187.578 px | 14px | all 7.787 px | all 7.787 px |
| neutral + Figtree | Figtree | Figtree Light (web font) | 194 / 187.578 px | 14px | 6–9 px | all 9 px |
| gothic + Fustat | Fustat | Fustat (web font) | 216 / 214.375 px | 16px | 5–10 px | all 10 px |
| butter + Outfit | Outfit | Outfit Thin (web font) | 190 / 187.578 px | 14px | 5–9 px | all 8 px |
| y2k + Poppins | Poppins | Poppins (web font) | 234 / 214.375 px | 16px | 5–11 px | 5–11 px |

- Digit widths: each digit ten times in the value text's font and size, at 1280 and 100%, kerning off.
- Chromium names the Figtree and Outfit files "Figtree Light" and "Outfit Thin". The value text's computed weight is 400 in every setup.
- Those are the names inside the themes' own 400-weight files, the faces `document.fonts` lists as loaded.
- No-tabular pick: y2k. In Poppins (y2k), Albert Sans (chocolate), DM Sans (matcha), `tabular-nums` changes no digit width in the shipped files.
- y2k was picked because its "4" is wider than its "0" (11 and 10 px at 16px), the hard case for 1ch per digit.

## Method

- Stories on both builds: `core-slider--with-format-value` (Temperature, 60°F to 90°F) and `core-slider--custom-step` (Quantity, 0 to 100 by 10).
- Main has no Text Value Widths story. So each build's own Slider gets the other sliders' props through Storybook's preview in the page, `__STORYBOOK_PREVIEW__.onUpdateArgs` (harness only):
  - Rating: With Format Value, label "Rating", 1 to 5, and `formatValue` giving "Bad", "Not good", "Okay", "Good", "Great";
  - Blend and Opacity: Custom Step, 0 to 0.8 and 0 to 1, step 0.1;
  - Price range: `core-slider--range`, 0 to 1000 by 10, `valueDisplay: 'text'`.
- The head's own `core-slider--text-value-widths` sliders equal these at every value, in every run (largest difference 0 px).
- Each slider: focus a thumb, press Home, then ArrowUp to the maximum, reading the track after each press. Two thumbs: the high thumb up first, then the low thumb.
- Track width: the bounding width of `.astryx-slider-control`, the box the head's own browser test reads. Value text: its box, its glyphs' box, and its overlap with the track.
- Root text 200%: `document.documentElement.style.fontSize = '200%'` after load. RTL: the Storybook global `direction:rtl`.
- Conditions: 1280 and 390, 100% and 200% text, left to right, plus 1280 at 100% right to left. Light mode.
- "Never shorter than main": the head's one length against main's shortest track, which is main at its widest text. Tables (2) and (3) also give the difference at each value.
- Cause test (harness only): on the head at 1280 and 100%, a style rule on the value text sets `font-kerning: auto`, `font-variant-numeric: normal`, or both.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). Desktop: 1280×800, scale 1. Phone: 390×844, touch, scale 2.
- On this machine, Chromium lays out these web fonts on whole pixels: every web-font width here is a whole number. Other systems can differ by fractions of a pixel.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 4 to 10 during the runs, on 166 cores.

## (1) Temperature: largest |head − main| at one value, px

| Setup | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | 1280, 100%, RTL |
| --- | --- | --- | --- | --- | --- |
| neutral as served | 0 | 0 | 0 | 0 | 0 |
| neutral + Figtree | 4 | 7 | 4 | 10 | 4 |
| gothic + Fustat | 7 | 12 | 7 | 12 | 7 |
| butter + Outfit | 4 | 10 | 4 | 10 | 4 |
| y2k + Poppins | 0 | 0 | 0 | 0 | 0 |

## (2) Quantity: head spread / head − main's shortest / smallest head − main at one value, px

| Setup | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | 1280, 100%, RTL |
| --- | --- | --- | --- | --- | --- |
| neutral as served | 0 / -0.98 / -16.54 | 0 / -0.98 / -32.12 | 0 / -0.99 / -18.78 | 0 / -1 / -36.59 | 0 / -0.98 / -16.54 |
| neutral + Figtree | 0 / -4 / -19 | 0 / -7 / -37 | 0 / -4 / -21 | 0 / -9 / -43 | 0 / -4 / -19 |
| gothic + Fustat | 0 / -6 / -21 | 0 / -12 / -41 | 0 / -6 / -21 | 0 / -12 / -41 | 0 / -6 / -21 |
| butter + Outfit | 0 / -5 / -19 | 0 / -9 / -37 | 0 / -6 / -23 | 0 / -11 / -43 | 0 / -5 / -19 |
| y2k + Poppins | 0 / -6 / -21 | 0 / -11 / -41 | 0 / -6 / -21 | 0 / -11 / -41 | 0 / -6 / -21 |

## (3) Price range: head spread / head − main's shortest / smallest head − main at one value, px

Head spread is for the injected slider; the head's own Text Value Widths Price range has the same widths.

| Setup | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | 1280, 100%, RTL |
| --- | --- | --- | --- | --- | --- |
| neutral as served | 0 / -15 / -61.72 | 0 / -29 / -122.44 | 0 / -17 / -70.39 | 0 / -33.02 / -139.8 | 0 / -14.97 / -61.69 |
| neutral + Figtree | 0 / -25 / -73 | 0 / -48 / -144 | 0 / -26 / -80 | 0 / -57 / -167 | 0 / -25 / -73 |
| gothic + Fustat | 0 / -29 / -79 | 0 / -64 / -160 | 0 / -29 / -79 | 0 / -64 / -160 | 0 / -29 / -79 |
| butter + Outfit | 0 / -27 / -73 | 0 / -54 / -146 | 0 / -34 / -90 | 0 / -63 / -169 | 0 / -27 / -73 |
| y2k + Poppins | 0 / -29 / -79 | 0 / -54 / -154 | 0 / -29 / -79 | 0 / -54 / -154 | 0 / -29 / -79 |

## (4) Rating: largest |head − main| at one word, px

| Setup | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | 1280, 100%, RTL |
| --- | --- | --- | --- | --- | --- |
| neutral as served | 0 | 0 | 0 | 0 | 0 |
| neutral + Figtree | 0 | 0 | 0 | 0 | 0 |
| gothic + Fustat | 6 | 13 | 6 | 13 | 6 |
| butter + Outfit | 0 | 1 | 1 | 1 | 0 |
| y2k + Poppins | 0 | 0 | 0 | 0 | 0 |

## (5) Blend: head spread / head − main's shortest, px

| Setup | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | 1280, 100%, RTL |
| --- | --- | --- | --- | --- | --- |
| neutral as served | 0 / -11.09 | 0 / -21.2 | 0 / -12.55 | 0 / -24.11 | 0 / -11.09 |
| neutral + Figtree | 0 / -12 | 0 / -24 | 0 / -14 | 0 / -27 | 0 / -12 |
| gothic + Fustat | 0 / -14 | 0 / -27 | 0 / -14 | 0 / -27 | 0 / -14 |
| butter + Outfit | 0 / -12 | 0 / -24 | 0 / -14 | 0 / -28 | 0 / -12 |
| y2k + Poppins | 0 / -13 | 0 / -27 | 0 / -13 | 0 / -27 | 0 / -13 |

## (6) Opacity: largest |head − main| at one value, px

| Setup | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | 1280, 100%, RTL |
| --- | --- | --- | --- | --- | --- |
| neutral as served | 0 | 0 | 0 | 0 | 0 |
| neutral + Figtree | 3 | 5 | 3 | 7 | 3 |
| gothic + Fustat | 13 | 22 | 13 | 22 | 13 |
| butter + Outfit | 3 | 9 | 3 | 10 | 3 |
| y2k + Poppins | 0 | 0 | 0 | 0 | 0 |

## Cause test (1280, 100%, left to right)

Largest |head − main| in px, with the head's value text as built, then with main's `font-kerning`, main's `font-variant-numeric`, or both.

| Setup | Slider | As built | Kerning `auto` | Numeric `normal` | Both |
| --- | --- | --- | --- | --- | --- |
| neutral as served | Temperature | 0 | 0 | 0 | 0 |
| neutral as served | Opacity | 0 | 0 | 0 | 0 |
| neutral as served | Rating | 0 | 0 | 0 | 0 |
| neutral + Figtree | Temperature | 4 | 4 | 0 | 0 |
| neutral + Figtree | Opacity | 3 | 3 | 0 | 0 |
| neutral + Figtree | Rating | 0 | 0 | 0 | 0 |
| gothic + Fustat | Temperature | 7 | 7 | 1 | 0 |
| gothic + Fustat | Opacity | 13 | 13 | 2 | 0 |
| gothic + Fustat | Rating | 6 | 6 | 1 | 0 |
| butter + Outfit | Temperature | 4 | 4 | 1 | 0 |
| butter + Outfit | Opacity | 3 | 3 | 1 | 0 |
| butter + Outfit | Rating | 0 | 0 | 0 | 0 |
| y2k + Poppins | Temperature | 0 | 0 | 0 | 0 |
| y2k + Poppins | Opacity | 0 | 0 | 0 | 0 |
| y2k + Poppins | Rating | 0 | 0 | 0 | 0 |

## Glyph widths under `tabular-nums` (16 px, kerning off)

| Font | Space | Period | En dash | "0" | "1" |
| --- | --- | --- | --- | --- | --- |
| Liberation Sans | 4.445 → 4.445 | 4.445 → 4.445 | 8.898 → 8.898 | 8.898 → 8.898 | 8.898 → 8.898 |
| Figtree | 4 → 4 | 3 → 3 | 9 → 9 | 10 → 10 | 7 → 10 |
| Fustat | 4 → 10 | 4 → 10 | 10 → 10 | 10 → 10 | 5 → 10 |
| Outfit | 3 → 3 | 5 → 5 | 9 → 9 | 11 → 9 | 6 → 9 |
| Poppins | 4 → 4 | 3 → 3 | 10 → 10 | 10 → 10 | 5 → 5 |

- Each cell is normal → `tabular-nums`, in px. In Fustat the space and the period become as wide as a digit.

## Clipping, overlap and overflow

- 19450 states over both builds: 0 clipped and 0 px of overlap with the track. Nothing runs past its row or the viewport (0 px), and 0 pages scroll sideways.

## Files

- `<setup>--<slider>--max--<main|pr>.png`: each slider at its maximum, at 1280, 100% text, left to right, light.
- Setups: `neutral-as-served`, `neutral-figtree`, `gothic-fustat`, `butter-outfit` and `y2k-poppins`. Sliders: `custom-step` (Quantity), `with-format-value` (Temperature), `rating`, `blend`, `opacity` and `price`.
- `gothic-fustat--<blend|price>--max--text-end--<main|pr>.png`: the right end of those stills, unscaled, to show the spacing.
- `measurements.json`: every recorded state, the font proofs, the cause test and the glyph widths.
