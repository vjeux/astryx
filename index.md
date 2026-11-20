# FileInput: a narrow field's prompt at a large text size, base and head

Base: main 77a11ae0d2305c3f261190161248853f5741b52b. Head: #13079 at 247a4eedd8632799579a7d83b572b1253b15a392, `pr` in file names. The head's merge base is this main.

## Answer

- Narrow field (120 px, root text 200%): main breaks the prompt into lines, and the lines run past the field's right border. The head keeps the prompt on one line, inside the field.
- The head's prompt box is 38 px wide there. It shows the first letter and part of the ellipsis. "Cho…" would need 79.38 px (90.7 px at 390), and "Dra…" 73.13 px (83.56 px at 390). In the frames that is "C" or "D" and two dots at 1280, and one dot and a sliver of a second at 390.
- Keyboard focus on the cut field shows the full prompt in a tooltip on the head, 33.4 ms after focus; main shows none. In the story the tooltip opens below the field: the field's top is 64 px from the top of the frame. With 200 px of room above, it opens above.
- A mouse hover shows no tooltip on either build. A field whose prompt fits shows none on keyboard focus.
- Default width: at 100% text the head is byte-identical to main, at 1280 and 390. At 200% it is byte-identical at 1280, where the prompt fits on one line in a 42 px field.
- At 390 and 200%, the head changes the default-width field. Main wraps the prompt onto 2 lines in a 98 px field. The head cuts it to "Drag files here o…" on one line, in a 50 px field.
- Dropzone mode at 200% and a field with a selected file are byte-identical to main.

## Builds

- Main: the production deploy of 77a11ae0d2, by its version.json (environment "production").
- Head: the preview deploy of 247a4eedd8, by its version.json (environment "preview"). No local build was used.

## Method

- Stories: `core-fileinput--default` (input mode) and `core-fileinput--dropzone-mode`. The story file is the same in both builds.
- The Default story's prompt is "Drag files here or click to browse". The component's own default prompt, "Choose file", comes from the URL arg `placeholder:!undefined`, which removes the story's placeholder.
- Root text 200%: `document.documentElement.style.fontSize = '200%'` after load (32 px root). The 120 px field: `style.width = '120px'` on the field's parent element. The head's own browser test does both the same way.
- A selected file: Playwright's `setInputFiles` with a 2 KB file named "quarterly-report.pdf".
- Room above (keyboard case only, harness only): `padding-top: 200px` on `#storybook-root`, so the field's top moves from 64 px to 264 px.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). Desktop: 1280×800, mouse, scale 1. Phone: 390×844, touch, scale 2.
- Text measures: each character's box, grouped into lines. "Past the border" is how far a line's visible ink reaches past the field's inner right edge. A clipped span also gets `scrollWidth` against `clientWidth`.
- Cut text: Chromium keeps the first character when even one character and the ellipsis do not fit. It clips the character rather than replacing it (CSS Overflow 3), then draws the ellipsis, clipped at the box's edge.
- Keyboard and hover: 5 runs per case and build, each in a fresh context (3 runs for the room-above case). A probe reads every animation frame for 1.6 s; a CDP screencast records run 0.
- Pixel counts use pixelmatch at threshold 0.1 over the whole page. "Byte-identical" compares the screenshots' pixels exactly.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 2 to 5, on 166 cores.

## Narrow field (120 px), root text 200%

| Prompt | Viewport | Mode | Main: lines, past the border, field height | Head: shown, past the border, field height | Pixels over threshold |
| --- | --- | --- | --- | --- | --- |
| the story's | 1280 | light | 7 lines, 36.27 px, 282 px | "D" and 17.77 of the 28 px "…", 0 px, 42 px | 2026 |
| the story's | 1280 | dark | 7 lines, 36.27 px, 282 px | "D" and 17.77 of the 28 px "…", 0 px, 42 px | 2007 |
| the story's | 390 | light | 7 lines, 49.16 px, 338 px | "D" and 14.89 of the 32 px "…", 0 px, 50 px | 12981 |
| the story's | 390 | dark | 7 lines, 49.16 px, 338 px | "D" and 14.89 of the 32 px "…", 0 px, 50 px | 12944 |
| "Choose file" | 1280 | light | 2 lines, 42.52 px, 82 px | "C" and 17.77 of the 28 px "…", 0 px, 42 px | 866 |
| "Choose file" | 1280 | dark | 2 lines, 42.52 px, 82 px | "C" and 17.77 of the 28 px "…", 0 px, 42 px | 858 |
| "Choose file" | 390 | light | 2 lines, 56.3 px, 98 px | "C" and 14.89 of the 32 px "…", 0 px, 50 px | 5281 |
| "Choose file" | 390 | dark | 2 lines, 56.3 px, 98 px | "C" and 14.89 of the 32 px "…", 0 px, 50 px | 5274 |

- On the head the first letter shows in full (20.23 px at 1280, 23.11 px at 390). Then 17.77 of the ellipsis's 28 px show at 1280, and 14.89 of 32 at 390.
- One letter and the whole ellipsis need 48.23 px (55.11 px at 390); the box has 38 px.
- Main's wrapped prompt also makes its field 282 px tall at 1280 (338 px at 390) for the story's prompt.

## Default width

| Viewport | Mode | Text | Main: lines, field height | Head: shown, field height | Pixels over threshold | Byte-identical |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 | light | 100% | 1, 32 px | "Drag files here or click to browse", 32 px | 0 | yes |
| 1280 | light | 200% | 1, 42 px | "Drag files here or click to browse", 42 px | 0 | yes |
| 1280 | dark | 100% | 1, 32 px | "Drag files here or click to browse", 32 px | 0 | yes |
| 1280 | dark | 200% | 1, 42 px | "Drag files here or click to browse", 42 px | 0 | yes |
| 390 | light | 100% | 1, 32 px | "Drag files here or click to browse", 32 px | 0 | yes |
| 390 | light | 200% | 2, 98 px | "Drag files here o…", 50 px | 8773 | no |

- On the head, only keyboard focus shows a cut prompt in full: its tooltip opens for keyboard focus alone. This job did not measure a tap on the cut field at 390.

## Keyboard focus and hover (1280, root text 200%, light)

Tooltip shown: median (range), in ms after `focusin`. Full opacity: the median of the first read at 0.99 or more.

| Case | Main | Head: shown | Head: full opacity | Head: tooltip text, side, gap, x, size |
| --- | --- | --- | --- | --- |
| Tab to the 120 px field, "Choose file" | no tooltip in 5 runs | 33.4 ms (25.9–34.1) | 126.4 ms | "Choose file", below, 8 px, x 32, 172.1×56 |
| Tab to the 120 px field, the story's prompt | no tooltip in 5 runs | 32.3 ms (25.5–33.7) | 125.8 ms | "Drag files here or click to browse", below, 8 px, x 32, 300×96 |
| The same, with 200 px of room above, "Choose file" | no tooltip in 3 runs | 31.4 ms (29.9–31.8) | 126.1 ms | "Choose file", above, 8 px, x 32, 172.1×56 |
| The same, with 200 px of room above, the story's prompt | no tooltip in 3 runs | 30.8 ms (30.2–31) | 125.4 ms | "Drag files here or click to browse", above, 8 px, x 32, 300×96 |
| Mouse hover on the 120 px field, "Choose file" | no tooltip in 5 runs | no tooltip in 5 runs | — | — |
| Mouse hover on the 120 px field, the story's prompt | no tooltip in 5 runs | no tooltip in 5 runs | — | — |
| Tab to the default-width field (prompt fits) | no tooltip in 5 runs | no tooltip in 5 runs | — | — |

- In every keyboard run, one Tab press focuses the field's button and `:focus-visible` matches, on both builds.
- Below: the field's top is 64 px from the top of the frame, less than the tooltip's height and its 8 px gap. Above, with room: the tooltip covers the field's label, "Upload file".
- The tooltip starts at x 32, 16 px right of the field's left edge. A 172.1 px tooltip centred on the 120 px field would start left of the page.
- No flash: no run shows a tooltip and then removes it. In the screencasts, the head's tooltip pixels appear at about 40 ms and only grow through the fade.
- On main, keyboard focus changes only the focus ring, and a hover only the field's hover tint.

## Dropzone mode and a selected file

| Case | Viewport | Mode | Text | Width | Pixels over threshold | Byte-identical |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | 1280 | light | 200% | default | 0 | yes |
| Dropzone | 1280 | dark | 200% | default | 0 | yes |
| Dropzone | 390 | light | 200% | default | 0 | yes |
| Selected file | 1280 | light | 100% | default | 0 | yes |
| Selected file | 1280 | light | 200% | default | 0 | yes |
| Selected file | 1280 | light | 200% | 120px | 0 | yes |
| Selected file | 390 | light | 100% | default | 0 | yes |
| Selected file | 390 | light | 200% | default | 0 | yes |
| Selected file | 390 | light | 200% | 120px | 0 | yes |

- With a file in the 120 px field at 200%, both builds show 2 px of the name's first letter and no ellipsis. The clear button leaves the name almost no room, on both builds.

## Files

- `<group>--<prompt>--<viewport>--<mode>--text-<size>--<width>--main.png`, `--pr.png` and `--diff.png`: the story clipped to its root, at the viewport's scale.
- Groups: `narrow`, `defaults`, `dropzone` and `file`. `default-prompt` marks "Choose file", and `w120` the 120 px field.
- `<case>--<build>--end.png`: the page 1.6 s after the Tab or the hover, at 1280, cropped to the field and the tooltip.
- `measurements.json`: the values behind these tables.
