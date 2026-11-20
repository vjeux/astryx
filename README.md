# Citation pill at larger text

#12461 at 0252d110adf7da2783412b6e678d1d982a66e266 against its main parent, b9329f65ad200d7d13177b385992914c5d748397. Each build's Storybook was checked by its version.json: the head's preview serves 0252d110, and the main parent's production deploy serves b9329f65. Main's #12434 (`verticalAlign: middle`) is in both builds. All results are from test runs.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 2, with close-ups at 4. Viewports are 1280 × 900 and 390 × 900 px. Light and dark use the Storybook `colorMode` global and `prefers-color-scheme`.
- Two stories show citations in prose:
  - Citation, In A Sentence: a label citation, a label citation with an icon, and a number citation in one paragraph;
  - MarkdownCitations, Bracket Notation: eight label citations, four with an icon, in Markdown paragraphs and a list.
- Three text sizes:
  - 100%: the default.
  - 200%, root: `html { font-size: 200% }`, so the root font size is 32 px. Astryx sizes text and spacing in rem, so this doubles both, and the pill's height too.
  - 200%, text only: the root Theme's text-size scales (its private `--_dynamic-type-*` properties) forced to 2. Font sizes double and spacing stays, as with iOS Dynamic Type. This is the case the pull request changes.
- The text line: the block's own text, citations excluded, grouped into lines by each character's client rect. A line's centre is the middle of its text's content area.
- (a) Each citation's vertical centre is compared with the centre of the line it sits on.
- (b) The label's text box is compared with the pill's box. Clipped ink, at 1280 px in light and dark: the pill's region is rendered as it is and with `overflow: visible` on that citation alone. The pixels that differ are the ink the pill's clip cuts, given in CSS px².
- (c) The pitch is the distance from one text line's top to the next one's in the same block. A line's own box is its text's content area plus half the leading above and below. A citation that reaches past that box makes the line taller.
- Every frame was looked at.

## (a) Vertical centre

In A Sentence:

| Citation | Text size | Pill height, main / head | Centre below the line's centre, main / head | Head minus main |
| --- | --- | --- | --- | --- |
| label | 100% | 20 / 20 px | 1.3 / 1.3 px | 0 px |
| label | 200%, root | 40 / 40 px | 2.11 / 2.11 px | 0 px |
| label | 200%, text only | 20 / 40 px | 2.11 / 2.11 px | 0 px |
| label with an icon | 100% | 20 / 20 px | 1.3 / 1.3 px | 0 px |
| label with an icon | 200%, root | 40 / 40 px | 2.11 / 2.11 px | 0 px |
| label with an icon | 200%, text only | 20 / 40 px | 2.11 / 2.11 px | 0 px |
| number | 100% | 20 / 20 px | -4.66 / -4.66 px | 0 px |
| number | 200%, root | 40 / 40 px | -7.83 / -7.83 px | 0 px |
| number | 200%, text only | 20 / 40 px | -7.83 / -7.83 px | 0 px |

- The values are the same in light and dark, at 1280 and at 390 px.
- At 100%, main puts a label citation's centre 1.3 px below the line's centre. At 200%, both builds put it 2.11 px below. That is 0.81 px from main's 100% reference, and 0 px from main at the same size.
- A number citation is a superscript, so its centre sits above the line on both builds.
- In Bracket Notation, the label citations sit 1.3 px below their line's centre at 100%, and 2.11 px below at 200%. The head's values equal main's at every size.
- A citation alone on a line has no text on that line to compare with, so (a) leaves it out. Of the 8 citations in Bracket Notation, these are alone on a line:
  - at 390 px: 1 at 100%, 4 at 200% root, and 4 on main and 4 on the head at 200% text only;
  - at 1280 px: 0 at 100%, 2 at 200% root, and 1 on main and 1 on the head at 200% text only.

## (b) The label inside its pill

| Text size | Build | Label pill height | Label's text box past the pill, above / below | Clipped ink per citation, In A Sentence: label, label with an icon, number | Clipped ink per citation, Bracket Notation (8 labels) | Label pill corner radius |
| --- | --- | --- | --- | --- | --- | --- |
| 100% | main | 20 px | 3 px inside / 3 px inside | 0, 0, 0 px² | 0 px² | 10 px: a capsule |
| 100% | head | 20 px | 3 px inside / 3 px inside | 0, 0, 0 px² | 0 px² | 10 px: a capsule |
| 200%, root | main | 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 20 px: a capsule |
| 200%, root | head | 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 20 px: a capsule |
| 200%, text only | main | 20 px | 4 px out / 3 px out | 13.75 to 14, 8.25 to 8.5, 0 px² | 32 to 54 px² | 10 px: a capsule |
| 200%, text only | head | 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 10 px: a rounded rectangle |

- At 200% text only, main keeps the pill 20 px tall. The label's text box reaches past it, and the pill's clip cuts part of the label's ink.
- The labels in In A Sentence have no descenders, and each loses 8.25 to 14 px² of ink. Every label in Bracket Notation has a descender, and each loses 32 to 54 px².
- The head grows the pill to 40 px. The label stays 6 to 7 px inside it, and nothing is clipped.
- A number citation is not clipped, because its overflow is visible. On main at 200% text only, its digit's box reaches 4 px above and 3 px below the 20 px badge. On the head, the badge grows to 21.36 × 40 px, a tall capsule.
- At 200% text only, the head's 40 px label pill keeps its 10 px corner radius, so it is a rounded rectangle. At 200% root, the radius grows to 20 px with the height, and the pill stays a capsule.

## (c) Line height

| Story | Viewport | Text size | Height of the citations' blocks, main / head | Pitch where a citation is on either line, main / head | Pitch with no citation on either line, main / head | Pitch across a citation alone on its line, main / head | A label citation past its line's box, main / head | A number citation past its line's box, main / head |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| In A Sentence | 1280 px | 100% | 47.25 / 47.25 px | 25.95 / 25.95 px | – / – | – / – | 1.3 / 1.3 px | 4.66 / 4.66 px |
| In A Sentence | 1280 px | 200%, root | 171.55 / 171.55 px | 40, 41.61, 49.94 / 40, 41.61, 49.94 px | – / – | – / – | 2.11 / 2.11 px | 7.83 / 7.83 px |
| In A Sentence | 1280 px | 200%, text only | 160 / 171.55 px | 40 / 40, 41.61, 49.94 px | – / – | – / – | -7.89 / 2.11 px | -2.17 / 7.83 px |
| In A Sentence | 390 px | 100% | 67.25 / 67.25 px | 20, 25.95 / 20, 25.95 px | – / – | – / – | 1.3 / 1.3 px | 4.66 / 4.66 px |
| In A Sentence | 390 px | 200%, root | 251.55 / 251.55 px | 40, 41.61, 49.94 / 40, 41.61, 49.94 px | 40 / 40 | – / – | 2.11 / 2.11 px | 7.83 / 7.83 px |
| In A Sentence | 390 px | 200%, text only | 240 / 251.55 px | 40 / 40, 41.61, 49.94 px | 40 / 40 | – / – | -7.89 / 2.11 px | -2.17 / 7.83 px |
| Bracket Notation | 1280 px | 100% | 281.08 / 281.08 px | 20, 21.3 / 20, 21.3 px | – / – | – / – | 1.3 / 1.3 px | – |
| Bracket Notation | 1280 px | 200%, root | 795.27 / 795.27 px | 40, 41.61 / 40, 41.61 px | 40 / 40 | – / – | 2.11 / 2.11 px | – |
| Bracket Notation | 1280 px | 200%, text only | 672 / 683.27 px | 40 / 40, 41.61 px | 40 / 40 | – / – | -7.89 / 2.11 px | – |
| Bracket Notation | 390 px | 100% | 381.08 / 381.08 px | 20, 21.3 / 20, 21.3 px | 20 / 20 | – / – | 1.3 / 1.3 px | – |
| Bracket Notation | 390 px | 200%, root | 1196.88 / 1196.88 px | 40, 41.61 / 40, 41.61 px | 40 / 40 | 81.61 / 81.61 | 2.11 / 2.11 px | – |
| Bracket Notation | 390 px | 200%, text only | 1112 / 1124.88 px | 40 / 40, 41.61 px | 40 / 40 | 80 / 81.61 | -7.89 / 2.11 px | – |

- The values are the same in light and dark.
- At 100% and at 200% root, every value is the same on both builds.
- At 200% text only, main's pitch is 40 px everywhere, because its 20 px pill fits inside the 40 px line. But main clips the label, as (b) shows.
- At 200% text only, the head's lines with a citation take the same pitches that both builds show at 200% root. There, main's pills are 40 px tall too.
- The largest pitch in In A Sentence, 49.94 px at 200%, is the gap above the number citation's line. The superscript badge raises that line.
- Across a citation alone on its line, the pitch spans two text lines. At 200% text only it is 80 px on main and 81.61 px on the head. At 200% root it is 81.61 px on both builds.
- The overhang columns leave out citations alone on a line.

## Notes

- At 390 px, the second "Japan Statistics Bureau - Population" citation reaches past the viewport's right edge. It reaches 428 px at 200% root and 402 px at 200% text only, the same on both builds.
- That label is cut short with an ellipsis at every size, on both builds.

## Frames

Contact sheets: [In A Sentence, light](sheets/sentence-light.png), [In A Sentence, dark](sheets/sentence-dark.png), [Bracket Notation, light](sheets/markdown-light.png), [Bracket Notation, dark](sheets/markdown-dark.png), [close-ups, light](sheets/zoom-light.png), [close-ups, dark](sheets/zoom-dark.png).

In [frames/](frames/), each name starts with the build (`head` is #12461, `main` its main parent):
- `<build>-sentence-<scheme>-<viewport>-<size>.png` and `<build>-markdown-<scheme>-<viewport>-<size>.png`: the citations' blocks;
- `<build>-sentence-<scheme>-<size>-zoom-<n>-<citation>.png`: each citation at 1280 px, at 4×.

The sizes are `100`, `root-200` and `text-200`. The raw numbers are in [results.json](results.json) and [ink.json](ink.json).
