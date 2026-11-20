# FileInput: a narrow field's prompt wraps inside the border at 200% text, base and head

Base: main 77a11ae0d2305c3f261190161248853f5741b52b. Head: #13079 at 4fe955001e45bc2a7bc4c5837d80be4c78124ff4, its head when these frames were taken, `pr` in file names. The head's merge base is this main.

## Answer

- Narrow field (120 px, root text 200%): main runs the prompt past the field's right border. The story's prompt goes 36.27 px past at 1280 and 49.16 px at 390.
- "Choose file" goes 42.52 px past at 1280 and 56.3 px at 390, on main.
- The head keeps every character inside the border, in all 8 narrow conditions: 0 px past the border, and no inline or block overflow.
- The head breaks each word that does not fit. The story's prompt takes 13 lines in a 522 px field at 1280, and 14 lines in a 674 px field at 390.
- "Choose file" takes 4 lines (162 px) at 1280 and 6 lines (290 px) at 390. Main's fields are 282 / 338 px for the story's prompt and 82 / 98 px for "Choose file".
- Phone 390, 200%, default width: the prompt wraps onto 2 lines in a 98 px field on both builds, byte-identical in light and dark. Every word is whole.
- Default width at 100% text, and at 1280 with 200%: byte-identical to main. So are dropzone mode at 200% and every selected-file state: 20 of 20 non-narrow conditions in all.
- No tooltip on either build: 0 of 70 keyboard and hover runs show one.

## Builds

- Main: the production deploy of 77a11ae0d2, by its version.json (environment "production").
- Head: the preview deploy of 4fe955001e, by its version.json (environment "preview"). No local build was used.
- The head's `FileInput.tsx` differs from main's by one style on the prompt: `overflowWrap: 'anywhere'`. The story file is the same in both builds.
- The pull request's head is now 7c8a4e1d58. It adds one declaration to the prompt's style: the private `--_astryx-text-overflow-wrap: anywhere`, which Text and Heading read. The prompt holds plain text, with no Text or Heading inside, so nothing in these stories reads it. These frames were not taken again at 7c8a4e1d58.

## Method

- Stories: `core-fileinput--default` (input mode) and `core-fileinput--dropzone-mode`.
- The Default story's prompt is "Drag files here or click to browse". The component's own default prompt, "Choose file", comes from the URL arg `placeholder:!undefined`, which removes the story's placeholder.
- Root text 200%: `document.documentElement.style.fontSize = '200%'` after load (32 px root). The 120 px field: `style.width = '120px'` on the field's parent element.
- A selected file: Playwright's `setInputFiles` with a 2 KB file named "quarterly-report.pdf".
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). Desktop: 1280×800, mouse, scale 1. Phone: 390×844, touch, scale 2.
- Text measures: each character's box, grouped into lines by its top. "Past the border" is how far a line's ink reaches past the field's inner right edge.
- A word is broken when two of its letters sit on different lines. The table lists each broken word with "|" at each break.
- Overflow: the prompt box's ink against the field's inner box, and every element in the field whose `scrollWidth` exceeds its `clientWidth`.
- Keyboard and hover: 5 runs per case and build, each in a fresh context. A probe reads every animation frame for 1.6 s and records any tooltip element. A CDP screencast records run 0.
- Positive control: the same probe recorded the tooltip of #13079's earlier head, 247a4eed. It did so in all 16 of its keyboard runs on a cut field (the 3699d415 index).
- Pixel counts use pixelmatch at threshold 0.1 over the whole page. "Byte-identical" compares the screenshots' pixels exactly.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 4 to 9 during the runs, on 166 cores.

## Narrow field (120 px), root text 200%

| Prompt | Viewport | Mode | Main: lines, past the border, field height | Head: lines, past the border, field height | Head: broken words | Pixels over threshold |
| --- | --- | --- | --- | --- | --- | --- |
| the story's | 1280 | light | 7 lines, 36.27 px, 282 px | 13 lines, 0 px, 522 px | "Dr|ag", "file|s", "he|re", "cli|ck", "br|ow|se" | 2562 |
| the story's | 1280 | dark | 7 lines, 36.27 px, 282 px | 13 lines, 0 px, 522 px | "Dr|ag", "file|s", "he|re", "cli|ck", "br|ow|se" | 2507 |
| the story's | 390 | light | 7 lines, 49.16 px, 338 px | 14 lines, 0 px, 674 px | "Dr|ag", "fil|es", "he|re", "cli|ck", "br|o|w|se" | 16575 |
| the story's | 390 | dark | 7 lines, 49.16 px, 338 px | 14 lines, 0 px, 674 px | "Dr|ag", "fil|es", "he|re", "cli|ck", "br|o|w|se" | 16532 |
| "Choose file" | 1280 | light | 2 lines, 42.52 px, 82 px | 4 lines, 0 px, 162 px | "Ch|oo|se" | 1172 |
| "Choose file" | 1280 | dark | 2 lines, 42.52 px, 82 px | 4 lines, 0 px, 162 px | "Ch|oo|se" | 1147 |
| "Choose file" | 390 | light | 2 lines, 56.3 px, 98 px | 6 lines, 0 px, 290 px | "C|ho|os|e", "fil|e" | 8579 |
| "Choose file" | 390 | dark | 2 lines, 56.3 px, 98 px | 6 lines, 0 px, 290 px | "C|ho|os|e", "fil|e" | 8565 |

- On the head, no element in the field scrolls sideways in any narrow condition. On main, 2 elements do in each.
- The head's lines at 1280, story prompt: "Dr", "ag", "file", "s", "he", "re", "or", "cli", "ck", "to", "br", "ow", "se".
- The head's lines at 390, "Choose file": "C", "ho", "os", "e", "fil", "e".

## Default width

| Viewport | Mode | Text | Main: lines, field height | Head: lines, field height | Head: broken words | Pixels over threshold | Byte-identical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | light | 100% | 1, 32 px | 1, 32 px | none | 0 | yes |
| 1280 | light | 200% | 1, 42 px | 1, 42 px | none | 0 | yes |
| 1280 | dark | 100% | 1, 32 px | 1, 32 px | none | 0 | yes |
| 1280 | dark | 200% | 1, 42 px | 1, 42 px | none | 0 | yes |
| 390 | light | 100% | 1, 32 px | 1, 32 px | none | 0 | yes |
| 390 | light | 200% | 2, 98 px | 2, 98 px | none | 0 | yes |
| 390 | dark | 100% | 1, 32 px | 1, 32 px | none | 0 | yes |
| 390 | dark | 200% | 2, 98 px | 2, 98 px | none | 0 | yes |

- At 390 and 200% both builds draw "Drag files here or" and "click to browse".

## Keyboard focus and hover

| Case | Viewport | Main | Head |
| --- | --- | --- | --- |
| Tab to the 120 px field, the story's prompt | 1280 | no tooltip in 5 runs | no tooltip in 5 runs |
| Tab to the 120 px field, "Choose file" | 1280 | no tooltip in 5 runs | no tooltip in 5 runs |
| Mouse hover on the 120 px field, the story's prompt | 1280 | no tooltip in 5 runs | no tooltip in 5 runs |
| Mouse hover on the 120 px field, "Choose file" | 1280 | no tooltip in 5 runs | no tooltip in 5 runs |
| Tab to the default-width field | 1280 | no tooltip in 5 runs | no tooltip in 5 runs |
| Tab to the 120 px field, the story's prompt | 390 | no tooltip in 5 runs | no tooltip in 5 runs |
| Tab to the default-width field | 390 | no tooltip in 5 runs | no tooltip in 5 runs |

- Keyboard: one Tab press focuses the field's button and `:focus-visible` matches, in every run on both builds. Root text is 200% in every case.
- Hover: the pointer enters the field (`pointerover`) in every hover run.
- The end stills show only the focus ring or the hover tint.

## Dropzone mode and a selected file

| Case | Viewport | Mode | Text | Width | Pixels over threshold | Byte-identical |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | 1280 | light | 200% | default | 0 | yes |
| Dropzone | 1280 | dark | 200% | default | 0 | yes |
| Dropzone | 390 | light | 200% | default | 0 | yes |
| Dropzone | 390 | dark | 200% | default | 0 | yes |
| Selected file | 1280 | light | 100% | default | 0 | yes |
| Selected file | 1280 | light | 200% | default | 0 | yes |
| Selected file | 1280 | light | 200% | 120px | 0 | yes |
| Selected file | 1280 | dark | 200% | 120px | 0 | yes |
| Selected file | 390 | light | 100% | default | 0 | yes |
| Selected file | 390 | light | 200% | default | 0 | yes |
| Selected file | 390 | light | 200% | 120px | 0 | yes |
| Selected file | 390 | dark | 200% | 120px | 0 | yes |

- The selected file's name stays on one line, cut where it does not fit, on both builds. Its `overflow-wrap` is `normal` on both: the new style is on the prompt only.

## Files

- `<group>--<prompt>--<viewport>--<mode>--text-<size>--<width>--main.png`, `--pr.png` and `--diff.png`: the story clipped to its root, at the viewport's scale.
- Groups: `narrow`, `defaults`, `dropzone` and `file`. `default-prompt` marks "Choose file", and `w120` the 120 px field.
- In dark mode, the darker band below main's shorter field is the page beyond its story root.
- `<case>--<build>--end.png`: the page 1.6 s after the Tab or the hover, cropped to the field.
- `measurements.json`: the values behind these tables.
