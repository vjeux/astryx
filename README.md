# Citation pill and number badge at larger text, under every theme (ed308afc)

#12461 at ed308afc02468c275cc3d0d8bfc9a783ef54ae5f (head) against its main parent, b9329f65ad200d7d13177b385992914c5d748397 (main). The head keeps the number badge's line height (the role's leading) and sizes it `height: max(--spacing-5, min(1lh, 1.5em))`. Each build's Storybook was checked by its version.json. All results are from test runs.

For context, the line rise also shows earlier heads of the same pull request: 0252d110, ab745726 and 274ac707. The first is from this run. The other two are from the previous run, whose In A Sentence main frames equal this run's byte for byte (64 of 64).

## Summary

- **100%:** byte-identical to main in all 64 cases, In A Sentence and Bracket Notation, under every theme, at both viewports, in light and dark.
- **Text outside its pill or badge, at text-only 200%:** none, under every theme, at both viewports.
- **The badge's text box against its 1.5em cap:** the largest ratio is 1.423, under Gothic. Every drawn face is at most 1.5.
- **The line rise:** no worse than 0252d110's in any theme and viewport case.
- **The label pill:** unchanged from 274ac707. 640 of 640 label pills have the same size, centre and Range reading.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 2, with close-ups at 4.
- Viewports: 1280 × 900 px with a mouse, and 390 × 900 px with touch (`hasTouch` and `isMobile`, so `(pointer: coarse)` matches).
- Themes: the Storybook `astryxTheme` global for each of the 7 published themes, and no theme global (the default). Light and dark use the `colorMode` global and `prefers-color-scheme`. Gothic is dark only.
- Fonts: each theme's `fonts.css` at the build's commit gives the faces of the family the prose and the citations use. Each font file is inlined as a data URL and loaded before the measurement.
- The drawn face is read through the DevTools protocol (`CSS.getPlatformFontsForNode`), and a run stops if a loaded family is not drawn.
- Stories: Citation, In A Sentence (a label, a label with an icon, and a number), and MarkdownCitations, Bracket Notation (eight labels).
- Text sizes: 100%, and text only at 200%. For the second, the root Theme's private `--_dynamic-type-*` text-size scales are forced to 2.
- The spec's reading: a Range over each citation's contents against the citation's own box.
- The ratio: the number citation's Range height divided by its computed font size, at text-only 200%.
- The rise: the pitch above the number's line, minus main's.
- Bracket Notation's citations draw external favicons. A first pass did not wait for them, and whether they had loaded changed about 1,100 px in some frames, on main as well. So that story was taken again: before each frame, every image has loaded and decoded, and a failed image reloads the page.
- In that pass, 192 of 192 pages had all 4 images loaded (0 needed a reload). As a control, the head's Bracket Notation frames equal 0252d110's, which has the same label code, in 64 of 64 cases.
- Every frame was looked at.

## The badge's text box against the 1.5em cap

| Theme | Face drawn (from the font file) | Badge font size at text-only 200% | Badge text box height (Range) | Ratio | At most 1.5 |
| --- | --- | --- | --- | --- | --- |
| Default (no theme) | LiberationSans (system) | 24, 28 px | 27, 31 px | 1.13, 1.11 | yes |
| Neutral | FigtreeLight-Regular (web font) | 24, 28 px | 29, 34 px | 1.21 | yes |
| Stone | FigtreeLight-Regular (web font) | 24, 26 px | 29, 32 px | 1.21, 1.23 | yes |
| Butter | OutfitThin-Regular (web font) | 24, 26 px | 30, 33 px | 1.25, 1.27 | yes |
| Chocolate | AlbertSans-Regular (web font) | 24, 28 px | 29, 34 px | 1.21 | yes |
| Gothic | Fustat-Regular (web font) | 26 px | 37 px | 1.42 | yes |
| Matcha | DMSans9pt-Regular (web font) | 26 px | 34 px | 1.31 | yes |
| Y2K | Poppins-Regular (web font) | 24 px | 33 px | 1.38 | yes |

## At 100%

| Theme | Viewport | Frames equal to main, of 4 | Badge and pill heights, main / head |
| --- | --- | --- | --- |
| Default (no theme) | 1280 px, mouse | 4 | 20 / 20 px |
| Default (no theme) | 390 px, touch | 4 | 20 / 20 px |
| Neutral | 1280 px, mouse | 4 | 20 / 20 px |
| Neutral | 390 px, touch | 4 | 20 / 20 px |
| Stone | 1280 px, mouse | 4 | 20 / 20 px |
| Stone | 390 px, touch | 4 | 20 / 20 px |
| Butter | 1280 px, mouse | 4 | 20 / 20 px |
| Butter | 390 px, touch | 4 | 20 / 20 px |
| Chocolate | 1280 px, mouse | 4 | 20 / 20 px |
| Chocolate | 390 px, touch | 4 | 20 / 20 px |
| Gothic | 1280 px, mouse | 4 | 20 / 20 px |
| Gothic | 390 px, touch | 4 | 20 / 20 px |
| Matcha | 1280 px, mouse | 4 | 30 / 30 px |
| Matcha | 390 px, touch | 4 | 30 / 30 px |
| Y2K | 1280 px, mouse | 4 | 30 / 30 px |
| Y2K | 390 px, touch | 4 | 30 / 30 px |

- Each "of 4" counts In A Sentence and Bracket Notation, in light and dark.

## At text-only 200%

| Theme | Viewport | Text past its pill or badge, at most: main / 0252d110 / ab745726 / 274ac707 / ed308afc | Number badge height: main / 0252d110 / ab745726 / 274ac707 / ed308afc | Rise of the number's line against main: 0252d110 / ab745726 / 274ac707 / ed308afc | No worse than 0252d110 | Label pill height: main / 274ac707 / ed308afc |
| --- | --- | --- | --- | --- | --- | --- |
| Default (no theme) | 1280 px, mouse | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 32 / 28 / 36 px | 9.94 / 5.94 / 3.94 / 7.94 px | yes | 20 / 40 / 40 px |
| Default (no theme) | 390 px, touch | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 36 / 32 / 40 px | 5.66 / 3.66 / 1.66 / 5.66 px | yes | 20 / 40 / 40 px |
| Neutral | 1280 px, mouse | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 32 / 29 / 36 px | 11.33 / 7.33 / 6.33 / 9.33 px | yes | 20 / 40 / 40 px |
| Neutral | 390 px, touch | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 36 / 34 / 40 px | 6.66 / 4.66 / 3.66 / 6.66 px | yes | 20 / 40 / 40 px |
| Stone | 1280 px, mouse | 7.45 out / 0 / 0 / 0 / 0 px | 20 / 34.91 / 32 / 29 / 34.91 px | 5.78 / 4.33 / 3.78 / 5.78 px | yes | 20 / 34.91 / 34.91 px |
| Stone | 390 px, touch | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 34 / 32 / 39 px | 5.66 / 2.66 / 1.66 / 5.16 px | yes | 20 / 40 / 40 px |
| Butter | 1280 px, mouse | 7.45 out / 0 / 0 / 0 / 0 px | 20 / 34.91 / 32 / 30 / 34.91 px | 7.13 / 5.67 / 5.13 / 7.13 px | yes | 20 / 34.91 / 34.91 px |
| Butter | 390 px, touch | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 34 / 33 / 39 px | 5.06 / 2.06 / 2.06 / 4.56 px | yes | 20 / 40 / 40 px |
| Chocolate | 1280 px, mouse | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 32 / 29 / 36 px | 8.33 / 4.33 / 3.33 / 6.33 px | yes | 20 / 40 / 40 px |
| Chocolate | 390 px, touch | 10 out / 0 / 0 / 0 / 0 px | 20 / 40 / 36 / 34 / 40 px | 6.66 / 4.66 / 3.66 / 6.66 px | yes | 20 / 40 / 40 px |
| Gothic | 1280 px, mouse | 10 out / 0 / 2 out / 0 / 0 px | 20 / 40 / 34 / 37 / 39 px | 5.66 / 2.66 / 4.66 / 5.16 px | yes | 20 / 40 / 40 px |
| Gothic | 390 px, touch | 10 out / 0 / 2 out / 0 / 0 px | 20 / 40 / 34 / 37 / 39 px | 5.66 / 2.66 / 4.66 / 5.16 px | yes | 20 / 40 / 40 px |
| Matcha | 1280 px, mouse | 5 out / 0 / 0 / 0 / 0 px | 30 / 40 / 38 / 34 / 39 px | 5 / 4 / 2 / 4.5 px | yes | 30 / 40 / 40 px |
| Matcha | 390 px, touch | 5 out / 0 / 0 / 0 / 0 px | 30 / 40 / 38 / 34 / 39 px | 5 / 4 / 2 / 4.5 px | yes | 30 / 40 / 40 px |
| Y2K | 1280 px, mouse | 3.47 out / 0 / 0 / 0 / 0 px | 30 / 36.92 / 36 / 35 / 36 px | 2.66 / 2.2 / 2.66 / 2.2 px | yes | 30 / 36.92 / 36.92 px |
| Y2K | 390 px, touch | 3.47 out / 0 / 0 / 0 / 0 px | 30 / 36.92 / 36 / 35 / 36 px | 2.66 / 2.2 / 2.66 / 2.2 px | yes | 30 / 36.92 / 36.92 px |

- Values in px. "out" means the text's box reaches past the pill's or badge's box; "in" means it stays inside by that much.
- The values are the same in light and dark.

## Frames

In [frames/](frames/), each name is `<build>-<theme>-<story>-<scheme>-<viewport>-<size>.png`, where the build is `head` (ed308afc) or `main`. The theme is `none` for the default.

Close-ups at 4×: `<build>-<theme>-sentence-<scheme>-text-200-zoom-<n>-<citation>.png`.

Contact sheets, per theme: `sheets/<theme>-sentence.png`, `sheets/<theme>-closeups.png` and `sheets/<theme>-markdown.png`.

The raw numbers are in [results.json](results.json) (main, ed308afc, 0252d110; with each Bracket Notation page's image states) and [results-earlier.json](results-earlier.json) (274ac707, ab745726). The frame comparisons are in [controls.json](controls.json).
