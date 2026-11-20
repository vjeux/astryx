# Citation pill and number badge at larger text, under every theme

#12461 at 274ac707791a70110c7c6f6320a0db65f5277209 (head) against its main parent, b9329f65ad200d7d13177b385992914c5d748397 (main), with its previous head, ab745726c13d8c720c56add081c8f040fc66028d (previous head). The head sizes the number badge with `line-height: normal` and `height: max(--spacing-5, 1lh)`, so `1lh` is its own text box. Each build's Storybook was checked by its version.json. All results are from test runs.

## Summary

- **Text outside its pill or badge, at text-only 200%:** none on the head, under every theme, at both viewports. At most, a number's digits touch the badge's edge (0 px). Main reaches 10 px out, and the previous head 2 px.
- **100%, badge and pill heights:** equal to main's under every theme: 20 px, or 30 px under Matcha and Y2K, as on main. Under the 20 px themes, the previous head's badge was 21 to 22 px at 390 px with touch. Under Gothic, it was 21 px at 1280 px too.
- **100%, byte identity with main:** it holds in Bracket Notation under every theme. In In A Sentence it holds under Default and Gothic, Neutral and Chocolate at 1280 px, and Butter at 390 px. It does not hold in the other 9 theme and viewport cases.
- There, the number's line sits 0.23 to 0.73 px lower than on main, with everything on it and after it. The badge stays where it was, so its digit sits lower inside it by the same amount.
- **The label pill:** unchanged from the previous head, under every theme and at both sizes. 640 of 640 label pills have the same size, centre and Range reading. 64 of 64 Bracket Notation frames are byte-identical to the previous head's.
- **The number's line, at text-only 200%:** there are 16 theme and viewport cases. Against the previous head, it rises less in 11, the same in 1 (Butter at 390 px), and more in 4.
- It rises more under Gothic and Y2K. Under Gothic, the badge is 37 px tall, against 34 px, and reaches 2 px further above its line. Under Y2K, the badge is 35 px, against 36 px, but sits higher and reaches 0.45 px further above its line. The figures are at 1280 px.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 2, with close-ups at 4.
- Viewports: 1280 × 900 px with a mouse, and 390 × 900 px with touch (`hasTouch` and `isMobile`, so `(pointer: coarse)` matches).
- Themes: the Storybook `astryxTheme` global for each of the 7 published themes, and no theme global (the default). Light and dark use the `colorMode` global and `prefers-color-scheme`. Gothic is dark only, so its light frames are dark too.
- Fonts: for each theme, its `fonts.css` at the build's commit gives the `@font-face` rules of the family the prose and the citations use. Each font file is inlined as a data URL, and the faces load before the measurement.
- The drawn face is read through the DevTools protocol (`CSS.getPlatformFontsForNode`) for the prose and a label citation. A run stops if a loaded family is not drawn.
- Stories:
  - Citation, In A Sentence: a label citation, a label citation with an icon, and a number citation in one paragraph;
  - MarkdownCitations, Bracket Notation: eight label citations.
- Text sizes: 100%, and text only at 200%. For the second, the root Theme's private `--_dynamic-type-*` text-size scales are forced to 2. Font sizes double and spacing stays, as with iOS Dynamic Type.
- The spec's reading: a Range over each citation's contents, against the citation's own box. "Out" means the text's box reaches past the citation's box.
- The pitch above the number's line: from the top of the text line before it to the top of its own text line.
- Every frame was looked at.

## Fonts

| Theme | Family loaded | Face drawn in the prose and the citations (from the font file) | Same face on main, the previous head and the head |
| --- | --- | --- | --- |
| Default (no theme) | – | LiberationSans (system) | yes |
| Neutral | Figtree | FigtreeLight-Regular (web font) | yes |
| Stone | Figtree | FigtreeLight-Regular (web font) | yes |
| Butter | Outfit | OutfitThin-Regular (web font) | yes |
| Chocolate | Albert Sans | AlbertSans-Regular (web font) | yes |
| Gothic | Fustat | Fustat-Regular (web font) | yes |
| Matcha | DM Sans | DMSans9pt-Regular (web font) | yes |
| Y2K | Poppins | Poppins-Regular (web font) | yes |

## At 100%

| Theme | Viewport | Frames equal to main, of 4 | Badge and pill heights, main / head | Number badge, previous head | Number line's pitch, head minus main |
| --- | --- | --- | --- | --- | --- |
| Default (no theme) | 1280 px, mouse | 4 | 20 / 20 px | 20 px | 0 px |
| Default (no theme) | 390 px, touch | 4 | 20 / 20 px | 22 px | 0 px |
| Neutral | 1280 px, mouse | 4 | 20 / 20 px | 20 px | 0 px |
| Neutral | 390 px, touch | 2 | 20 / 20 px | 22 px | 0.5 px |
| Stone | 1280 px, mouse | 2 | 20 / 20 px | 20 px | 0.73 px |
| Stone | 390 px, touch | 2 | 20 / 20 px | 21 px | 0.5 px |
| Butter | 1280 px, mouse | 2 | 20 / 20 px | 20 px | 0.23 px |
| Butter | 390 px, touch | 4 | 20 / 20 px | 21 px | 0 px |
| Chocolate | 1280 px, mouse | 4 | 20 / 20 px | 20 px | 0 px |
| Chocolate | 390 px, touch | 2 | 20 / 20 px | 22 px | 0.5 px |
| Gothic | 1280 px, mouse | 4 | 20 / 20 px | 21 px | 0 px |
| Gothic | 390 px, touch | 4 | 20 / 20 px | 21 px | 0 px |
| Matcha | 1280 px, mouse | 2 | 30 / 30 px | 30 px | 0.5 px |
| Matcha | 390 px, touch | 2 | 30 / 30 px | 30 px | 0.5 px |
| Y2K | 1280 px, mouse | 2 | 30 / 30 px | 30 px | 0.23 px |
| Y2K | 390 px, touch | 2 | 30 / 30 px | 30 px | 0.23 px |

- Each "of 4" counts In A Sentence and Bracket Notation, in light and dark.
- The values are the same in light and dark.

## At text-only 200%

| Theme | Viewport | Text past its pill or badge, at most: main / previous head / head | Number badge height: main / previous head / head | Pitch above the number's line: main / previous head / head | Rise against main: previous head / head | Label pill height: main / previous head / head |
| --- | --- | --- | --- | --- | --- | --- |
| Default (no theme) | 1280 px, mouse | 10 px out / touches (0 px) / touches (0 px) | 20 / 32 / 28 px | 40 / 45.94 / 43.94 px | 5.94 / 3.94 px | 20 / 40 / 40 px |
| Default (no theme) | 390 px, touch | 10 px out / touches (0 px) / touches (0 px) | 20 / 36 / 32 px | 48 / 51.66 / 49.66 px | 3.66 / 1.66 px | 20 / 40 / 40 px |
| Neutral | 1280 px, mouse | 10 px out / touches (0 px) / touches (0 px) | 20 / 32 / 29 px | 40 / 47.33 / 46.33 px | 7.33 / 6.33 px | 20 / 40 / 40 px |
| Neutral | 390 px, touch | 10 px out / touches (0 px) / touches (0 px) | 20 / 36 / 34 px | 48 / 52.66 / 51.66 px | 4.66 / 3.66 px | 20 / 40 / 40 px |
| Stone | 1280 px, mouse | 7.45 px out / touches (0 px) / touches (0 px) | 20 / 32 / 29 px | 40 / 44.33 / 43.78 px | 4.33 / 3.78 px | 20 / 34.91 / 34.91 px |
| Stone | 390 px, touch | 10 px out / touches (0 px) / touches (0 px) | 20 / 34 / 32 px | 48 / 50.66 / 49.66 px | 2.66 / 1.66 px | 20 / 40 / 40 px |
| Butter | 1280 px, mouse | 7.45 px out / touches (0 px) / touches (0 px) | 20 / 32 / 30 px | 40 / 45.67 / 45.13 px | 5.67 / 5.13 px | 20 / 34.91 / 34.91 px |
| Butter | 390 px, touch | 10 px out / touches (0 px) / touches (0 px) | 20 / 34 / 33 px | 48 / 50.06 / 50.06 px | 2.06 / 2.06 px | 20 / 40 / 40 px |
| Chocolate | 1280 px, mouse | 10 px out / touches (0 px) / touches (0 px) | 20 / 32 / 29 px | 40 / 44.33 / 43.33 px | 4.33 / 3.33 px | 20 / 40 / 40 px |
| Chocolate | 390 px, touch | 10 px out / touches (0 px) / touches (0 px) | 20 / 36 / 34 px | 48 / 52.66 / 51.66 px | 4.66 / 3.66 px | 20 / 40 / 40 px |
| Gothic | 1280 px, mouse | 10 px out / 2 px out / touches (0 px) | 20 / 34 / 37 px | 48 / 50.66 / 52.66 px | 2.66 / 4.66 px | 20 / 40 / 40 px |
| Gothic | 390 px, touch | 10 px out / 2 px out / touches (0 px) | 20 / 34 / 37 px | 48 / 50.66 / 52.66 px | 2.66 / 4.66 px | 20 / 40 / 40 px |
| Matcha | 1280 px, mouse | 5 px out / touches (0 px) / touches (0 px) | 30 / 38 / 34 px | 48.66 / 52.66 / 50.66 px | 4 / 2 px | 30 / 40 / 40 px |
| Matcha | 390 px, touch | 5 px out / touches (0 px) / touches (0 px) | 30 / 38 / 34 px | 48.66 / 52.66 / 50.66 px | 4 / 2 px | 30 / 40 / 40 px |
| Y2K | 1280 px, mouse | 3.47 px out / touches (0 px) / touches (0 px) | 30 / 36 / 35 px | 48 / 50.2 / 50.66 px | 2.2 / 2.66 px | 30 / 36.92 / 36.92 px |
| Y2K | 390 px, touch | 3.47 px out / touches (0 px) / touches (0 px) | 30 / 36 / 35 px | 48 / 50.2 / 50.66 px | 2.2 / 2.66 px | 30 / 36.92 / 36.92 px |

- The values are the same in light and dark.

## Frames

In [frames/](frames/), each name is `<build>-<theme>-<story>-<scheme>-<viewport>-<size>.png`, where the build is `head` (274ac707) or `main`. The theme is `none` for the default.

Close-ups at 4×: `<build>-<theme>-sentence-<scheme>-text-200-zoom-<n>-<citation>.png`.

Contact sheets, per theme: `sheets/<theme>-sentence.png`, `sheets/<theme>-closeups.png` and `sheets/<theme>-markdown.png`.

The raw numbers for all three builds are in [results.json](results.json), and the frame comparisons in [controls.json](controls.json).
