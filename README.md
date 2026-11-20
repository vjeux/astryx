# Citation pill at larger text, after the number badge change

#12461 at ab745726c13d8c720c56add081c8f040fc66028d (head) against its main parent, b9329f65ad200d7d13177b385992914c5d748397 (main), with its previous head, 0252d110adf7da2783412b6e678d1d982a66e266 (previous head). The head changes only the number badge's height: `max(--spacing-5, 1em + 2 × --spacing-1)` instead of `max(--spacing-5, 1lh)`. Each build's Storybook was checked by its version.json: the two heads' previews and main's production deploy. All results are from test runs.

## What changed from the previous head

- At 100%, nothing changed. The number badge is 20 px tall on all three builds. The head's 14 frames at 100% equal main's, byte for byte (0 differ), and so do its 14 frames at 200% root (0 differ).
- At 200% text only, the number badge is 32 px tall on the head. It is 40 px on the previous head and 20 px on main. Its digit's box stays 2 px inside the top and 3 px inside the bottom, and no ink is clipped.
- The number's line rises less. The pitch above it is 45.94 px on the head, 49.94 px on the previous head and 40 px on main. So that line rises 5.94 px instead of 9.94 px.
- The label pill is the same as on the previous head. At 200% text only, it is 40 px tall, and its centre is 2.11 px below the line's centre. No citation's ink is clipped on either head, at any size.
- 8 of the head's 42 frames differ from the previous head's, all at 200% text only in In A Sentence. They are the 4 prose frames, the 2 close-ups of the number, and the 2 close-ups of the label with an icon. In those last two, the next line's badge now enters the frame's margin, and the pill's own box is unchanged.
- Controls: main's 42 frames equal those of the earlier index, byte for byte (0 differ). The previous head's 42 frames equal that index's head frames (0 differ).

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 2, with close-ups at 4. Viewports are 1280 × 900 and 390 × 900 px. Light and dark use the Storybook `colorMode` global and `prefers-color-scheme`.
- Two stories show citations in prose:
  - Citation, In A Sentence: a label citation, a label citation with an icon, and a number citation in one paragraph;
  - MarkdownCitations, Bracket Notation: eight label citations, four with an icon, in Markdown paragraphs and a list.
- Three text sizes:
  - 100%: the default.
  - 200%, root: `html { font-size: 200% }`, so the root font size is 32 px. Astryx sizes text and spacing in rem, so this doubles both.
  - 200%, text only: the root Theme's text-size scales (its private `--_dynamic-type-*` properties) forced to 2. Font sizes double and spacing stays, as with iOS Dynamic Type.
- The text line: the block's own text, citations excluded, grouped into lines by each character's client rect. A line's centre is the middle of its text's content area.
- (a) Each citation's vertical centre is compared with the centre of the line it sits on.
- (b) Each citation's text box is compared with its own box. Clipped ink, at 1280 px in light and dark: the citation's region is rendered as it is and with `overflow: visible` on that citation alone. The pixels that differ are the ink its clip cuts, given in CSS px².
- (c) The pitch is the distance from one text line's top to the next one's in the same block. A line's own box is its text's content area plus half the leading above and below. A citation that reaches past that box makes the line taller.
- Every frame was looked at.

## (a) Vertical centre, In A Sentence

| Citation | Text size | Pill height, main / previous head / head | Centre below the line's centre, main / previous head / head |
| --- | --- | --- | --- |
| label | 100% | 20 / 20 / 20 px | 1.3 / 1.3 / 1.3 px |
| label | 200%, root | 40 / 40 / 40 px | 2.11 / 2.11 / 2.11 px |
| label | 200%, text only | 20 / 40 / 40 px | 2.11 / 2.11 / 2.11 px |
| label with an icon | 100% | 20 / 20 / 20 px | 1.3 / 1.3 / 1.3 px |
| label with an icon | 200%, root | 40 / 40 / 40 px | 2.11 / 2.11 / 2.11 px |
| label with an icon | 200%, text only | 20 / 40 / 40 px | 2.11 / 2.11 / 2.11 px |
| number | 100% | 20 / 20 / 20 px | -4.66 / -4.66 / -4.66 px |
| number | 200%, root | 40 / 40 / 40 px | -7.83 / -7.83 / -7.83 px |
| number | 200%, text only | 20 / 40 / 32 px | -7.83 / -7.83 / -7.83 px |

- The values are the same in light and dark, at 1280 and at 390 px.
- The number citation is a superscript, so its centre sits above the line on all three builds.

## (b) Each citation inside its own box

| Text size | Build | Label pill height | Label's text box past the pill, above / below | Number badge, width × height | Number's digit box past the badge, above / below | Clipped ink per citation, In A Sentence: label, label with an icon, number | Clipped ink per citation, Bracket Notation (8 labels) | Label pill corner radius |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 100% | main | 20 px | 3 px inside / 3 px inside | 20 × 20 px | 3 px inside / 3 px inside | 0, 0, 0 px² | 0 px² | 10 px: a capsule |
| 100% | previous head | 20 px | 3 px inside / 3 px inside | 20 × 20 px | 3 px inside / 3 px inside | 0, 0, 0 px² | 0 px² | 10 px: a capsule |
| 100% | head | 20 px | 3 px inside / 3 px inside | 20 × 20 px | 3 px inside / 3 px inside | 0, 0, 0 px² | 0 px² | 10 px: a capsule |
| 200%, root | main | 40 px | 6 px inside / 7 px inside | 40 × 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 20 px: a capsule |
| 200%, root | previous head | 40 px | 6 px inside / 7 px inside | 40 × 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 20 px: a capsule |
| 200%, root | head | 40 px | 6 px inside / 7 px inside | 40 × 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 20 px: a capsule |
| 200%, text only | main | 20 px | 4 px out / 3 px out | 21.36 × 20 px | 4 px out / 3 px out | 13.75 to 14, 8.25 to 8.5, 0 px² | 32 to 54 px² | 10 px: a capsule |
| 200%, text only | previous head | 40 px | 6 px inside / 7 px inside | 21.36 × 40 px | 6 px inside / 7 px inside | 0, 0, 0 px² | 0 px² | 10 px: a rounded rectangle |
| 200%, text only | head | 40 px | 6 px inside / 7 px inside | 21.36 × 32 px | 2 px inside / 3 px inside | 0, 0, 0 px² | 0 px² | 10 px: a rounded rectangle |

- A number citation is not clipped on any build, because its overflow is visible.

## (c) Line height

| Story | Viewport | Text size | Blocks' height, main / previous head / head | Pitches where a citation is on either line, main / previous head / head | Pitch across a citation alone on its line, main / previous head / head | A label citation past its line's box, main / previous head / head | The number citation past its line's box, main / previous head / head |
| --- | --- | --- | --- | --- | --- | --- | --- |
| In A Sentence | 1280 px | 100% | 47.25 / 47.25 / 47.25 px | 25.95 / 25.95 / 25.95 px | – / – / – | 1.3 / 1.3 / 1.3 px | 4.66 / 4.66 / 4.66 px |
| In A Sentence | 1280 px | 200%, root | 171.55 / 171.55 / 171.55 px | 40, 41.61, 49.94 / 40, 41.61, 49.94 / 40, 41.61, 49.94 px | – / – / – | 2.11 / 2.11 / 2.11 px | 7.83 / 7.83 / 7.83 px |
| In A Sentence | 1280 px | 200%, text only | 160 / 171.55 / 167.55 px | 40 / 40, 41.61, 49.94 / 40, 41.61, 45.94 px | – / – / – | -7.89 / 2.11 / 2.11 px | -2.17 / 7.83 / 3.83 px |
| In A Sentence | 390 px | 100% | 67.25 / 67.25 / 67.25 px | 20, 25.95 / 20, 25.95 / 20, 25.95 px | – / – / – | 1.3 / 1.3 / 1.3 px | 4.66 / 4.66 / 4.66 px |
| In A Sentence | 390 px | 200%, root | 251.55 / 251.55 / 251.55 px | 40, 41.61, 49.94 / 40, 41.61, 49.94 / 40, 41.61, 49.94 px | – / – / – | 2.11 / 2.11 / 2.11 px | 7.83 / 7.83 / 7.83 px |
| In A Sentence | 390 px | 200%, text only | 240 / 251.55 / 247.55 px | 40 / 40, 41.61, 49.94 / 40, 41.61, 45.94 px | – / – / – | -7.89 / 2.11 / 2.11 px | -2.17 / 7.83 / 3.83 px |
| Bracket Notation | 1280 px | 100% | 281.08 / 281.08 / 281.08 px | 20, 21.3 / 20, 21.3 / 20, 21.3 px | – / – / – | 1.3 / 1.3 / 1.3 px | – |
| Bracket Notation | 1280 px | 200%, root | 795.27 / 795.27 / 795.27 px | 40, 41.61 / 40, 41.61 / 40, 41.61 px | – / – / – | 2.11 / 2.11 / 2.11 px | – |
| Bracket Notation | 1280 px | 200%, text only | 672 / 683.27 / 683.27 px | 40 / 40, 41.61 / 40, 41.61 px | – / – / – | -7.89 / 2.11 / 2.11 px | – |
| Bracket Notation | 390 px | 100% | 381.08 / 381.08 / 381.08 px | 20, 21.3 / 20, 21.3 / 20, 21.3 px | – / – / – | 1.3 / 1.3 / 1.3 px | – |
| Bracket Notation | 390 px | 200%, root | 1196.88 / 1196.88 / 1196.88 px | 40, 41.61 / 40, 41.61 / 40, 41.61 px | 81.61 / 81.61 / 81.61 | 2.11 / 2.11 / 2.11 px | – |
| Bracket Notation | 390 px | 200%, text only | 1112 / 1124.88 / 1124.88 px | 40 / 40, 41.61 / 40, 41.61 px | 80 / 81.61 / 81.61 | -7.89 / 2.11 / 2.11 px | – |

- The values are the same in light and dark.
- In In A Sentence, the largest pitch at 200% is the gap above the number citation's line. The superscript badge raises that line.
- A citation alone on a line has no text on that line, so (a) and the overhang columns leave it out. The pitch across it spans two text lines.

## Notes

- At 390 px, the second "Japan Statistics Bureau - Population" citation reaches past the viewport's right edge on all three builds. It reaches 428 px at 200% root and 402 px at 200% text only.
- That label is cut short with an ellipsis at every size, on all three builds.

## Frames

Contact sheets: [In A Sentence, light](sheets/sentence-light.png), [In A Sentence, dark](sheets/sentence-dark.png), [Bracket Notation, light](sheets/markdown-light.png), [Bracket Notation, dark](sheets/markdown-dark.png), [close-ups, light](sheets/zoom-light.png), [close-ups, dark](sheets/zoom-dark.png).

In [frames/](frames/), each name starts with the build (`head` is ab745726, `main` its main parent):
- `<build>-sentence-<scheme>-<viewport>-<size>.png` and `<build>-markdown-<scheme>-<viewport>-<size>.png`: the citations' blocks;
- `<build>-sentence-<scheme>-<size>-zoom-<n>-<citation>.png`: each citation at 1280 px, at 4×.

The sizes are `100`, `root-200` and `text-200`. The raw numbers for all three builds are in [results.json](results.json) and [ink.json](ink.json).
