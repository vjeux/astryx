# Task checkbox and reorder handle spacing after the base merge

#11575 at 178b38c042756751bbcaf247bc6fcd735eca6dbb (after) against its previous head, 15ae97ae5a98e36f9561d4639850bb57520c7c41 (before). After merges the stack's base branch, which carries newer main, into before, and adds one line to the export-sync script. Each hosted preview was checked by its version.json. All results are from test runs.

After the merge, ListItem's task box keeps main's one-line-tall centred box (a line's height, `align-items: center`) and the pull request's `margin-inline-end: var(--_item-marker-room)`.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 2. Viewports are 1280 × 900 and 390 × 900 px. Light and dark use the Storybook `colorMode` global and `prefers-color-scheme`.
- **The task List with handles is a harness, not a shipped story.** No shipped story shows a task List with reorder handles. Task items come only from Markdown, through the internal `ListMarkerScope`, and Markdown's lists take no `reorderable`.
- The harness, [harness/TaskListReorderHarness.stories.tsx](harness/TaskListReorderHarness.stories.tsx), renders a task List as Markdown does: a List with `listStyle="disc"`, each ListItem inside a `ListMarkerScope` with a task. `createReorderable` makes it reorderable, with the handles at the start, at the end, or none. The last task stays put, so it has no handle.
- The harness was built into a local static Storybook at each head. The stories list was narrowed to the harness, List and Markdown stories, as [harness/storybook-main.diff](harness/storybook-main.diff) shows.
- Positive control: the local builds' List story (Reorder Handle Options, handles at the start) and Markdown story (Default) equal the hosted previews', pixel for pixel. Pixels that differ: 0, 0, 0, 0.
- Shipped stories, on the hosted previews:
  - List's Reorder Handle Options, with the handles at the start and at the end;
  - Reorder In Card's numbered list, whose start handles show on hover.
- Checkbox sizes: the shipped 20 px box, and the theme-sized 13 px and 26 px boxes of main's task-checkbox spec (width and height on `checkbox-indicator`).
- Reorder mode: the second row's handle takes the focus (the first row's in the numbered list), and Enter turns the mode on.
- Each row's checkbox, handle and label (its first text line) are measured, with the task box's computed style.
- Every frame was looked at.

## The task List with handles (harness)

With the shipped 20 px checkbox, before / after:

| Handles | Mode | Checkbox centre against the label's line | Checkbox to handle | Handle to label | Checkbox to label | Handle to the row's end | Label of the task without a handle, against the others | Task box's inline-end margin: row with a handle / row without |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| at the start | at rest | 0 px on both | 8 px on both | 8 px on both | – | – | 0 px off on both | 0px / 24px on both |
| at the start | reorder mode | 0 px on both | 8 px on both | 8 px on both | – | – | 0 px off on both | 0px / 24px on both |
| at the end | at rest | 0 px on both | – | – | 8 px on both | 8 px on both | 0 px off on both | 0px / 0px on both |
| at the end | reorder mode | 0 px on both | – | – | 8 px on both | 8 px on both | 0 px off on both | 0px / 0px on both |
| none | at rest | 0 px on both | – | – | 8 px on both | – | 0 px off on both | – / 0px on both |

- The task box computes as main's after the merge: height 20px, align-items center, margin-top 0px. Before, it was height 20px, align-items normal, margin-top 0.0002px.
- The pull request's room: at the start, the task without a handle gets a 24 px inline-end margin on its box. That is the grip's 16 px and an 8 px gap. So its label lines up with the rows that have a handle. The margin is 0 on rows with a handle, at the end and without reorder, on both builds.
- With the shipped box, before and after differ only in the handle's glyph: six heavier dots after, from the stack's base branch. The pixels that differ: 516 at rest, 344 in reorder mode, and 0 without handles.
- In reorder mode, the move hint (↑, ↓, Done) opens under the pressed handle. It covers 100% of the next row's handle at either end. With the handles at the start, it also covers 58% of the box of that row's first label line. With the handles at the end, it covers none of it. It sits in the same place on both builds.

With the theme-sized checkboxes, at rest:

| Checkbox | Handles | Checkbox centre against the label's line, before / after | Checkbox to the next item (the handle at the start, else the label), before / after | Label starts at, before / after |
| --- | --- | --- | --- | --- |
| 13 px | at the start | 0 / 0 px | 11.5 / 8 px | 60 / 53 px from the row's start |
| 13 px | at the end | 0 / 0 px | 11.5 / 8 px | 36 / 29 px from the row's start |
| 13 px | none | 0 / 0 px | 11.5 / 8 px | 36 / 29 px from the row's start |
| 26 px | at the start | 0 / 0 px | 5 / 8 px | 60 / 66 px from the row's start |
| 26 px | at the end | 0 / 0 px | 5 / 8 px | 36 / 42 px from the row's start |
| 26 px | none | 0 / 0 px | 5 / 8 px | 36 / 42 px from the row's start |

- Each checkbox stays centred on its label's line on both builds.
- Before, the checkbox drew inside a 20 px slot. A 13 px box left 11.5 px to the next item, and a 26 px box left 5 px.
- After, main's CheckboxInput change (merged in with main) makes the slot as big as the box. So 8 px separates the box from the next item at every size, and the handle and the label move with the box.
- The task without a handle stays in line with the others at every size.

## Shipped stories on the previews

| Story | Case | Before | After | Pixels that differ, before against after |
| --- | --- | --- | --- | --- |
| Reorder Handle Options | handles at the start, at rest | Row start to handle: 8 px. Handle to label: 8 px. Handle centre off the label's line: 0 px. Trash, which stays put: label 0 px off. | the same | 860 (the handle glyph) |
| Reorder Handle Options | handles at the start, reorder mode | Row start to handle: 8 px. Handle to label: 8 px. Handle centre off the label's line: 0 px. Trash, which stays put: label 0 px off. | the same | 688 (the handle glyph) |
| Reorder Handle Options | handles at the end, at rest | Handle to the row's end: 8 px. Handle centre off the label's line: 0 px. Trash, which stays put: label 0 px off. | the same | 860 (the handle glyph) |
| Reorder Handle Options | handles at the end, reorder mode | Handle to the row's end: 8 px. Handle centre off the label's line: 0 px. Trash, which stays put: label 0 px off. | the same | 688 (the handle glyph) |
| Reorder In Card, numbered list | start handles that show on hover, at rest | Marker to handle: 8 px. Handle to label: 8 px. Handle opacity: 0. Sent, which stays put: label 0 px off. | the same | 0 |
| Reorder In Card, numbered list | start handles that show on hover, first row hovered | Marker to handle: 8 px. Handle to label: 8 px. Handle opacity: 1 on the first row, 0 on Drafts. Sent, which stays put: label 0 px off. | the same | 172, 168, 156 (the handle glyph) |
| Reorder In Card, numbered list | start handles that show on hover, reorder mode | Marker to handle: 8 px. Handle to label: 8 px. Handle opacity: 1 on the pressed first row, 0 on Drafts. Sent, which stays put: label 0 px off. | the same | 172, 152, 156 (the handle glyph) |

- All values are the same in light and dark, at 1280 and at 390 px.

## Notes

- Markdown's Default story draws its task list as a CheckboxList, not with ListItem's task box, so it is not used here.

## Frames

Contact sheets: [harness, light](sheets/harness-light.png), [harness, dark](sheets/harness-dark.png), [Reorder Handle Options, light](sheets/handle-options-light.png), [Reorder Handle Options, dark](sheets/handle-options-dark.png), [numbered list, light](sheets/numbered-light.png), [numbered list, dark](sheets/numbered-dark.png).

In [frames/](frames/), each name starts with the build (`before` or `after`):
- `<build>-harness-<handles>-<checkbox>-<mode>-<scheme>-<viewport>.png`: the harness, with handles `start`, `end` or `none`;
- `<build>-handle-options-<placement>-<mode>-<scheme>-<viewport>.png`: Reorder Handle Options;
- `<build>-numbered-<mode>-<scheme>-<viewport>.png`: Reorder In Card's numbered list.

The raw numbers are in [results-harness.json](results-harness.json) and [results-shipped.json](results-shipped.json).
