# Table FR26 and FR27: Current (main) and a mock-up of the spec

#10131 at b4df87d236c4c6bb4f347f14f23a612a7c09770a changes only spec records. It has no code change, so its head renders as its base on main does. Current is main at 351206d7a0bf3865cd62d27b4c4aed0e197bc4eb. All numbers are test measurements.

So each "Proposed" frame is a mock-up of the spec's result, made with CSS on main. It is not the implementation. Each frame names itself in its own caption.

## Answer (test)

- FR26, Current: when the pane scrolls halfway, the toolbar and the header row leave view. The whole Table scrolls with the pane.
- FR26, Proposed (spec mock-up): the pane does not scroll. The Table's own region scrolls, the toolbar stays at the top, and the header row sticks under it.
- With a pinned column, the same holds. The pinned column stays at the pane's start edge in both frames.
- FR27, Current: narrowing Email by 120 px makes the last column, Role, grow by 120 px. On main the last column has no resize handle.
- FR27, Proposed (spec mock-up): Role keeps its width, and an empty trailing track takes the 120 px. The row's striping, dividers and selection wash continue across it to the edge.

## Fixtures

- The stock stories have no Table under a toolbar in a pane of a fixed height, and none that combines column resize, striping and selection. So a scratch story, `ZZ/TableFR`, has the fixtures. It is in neither tree, and it uses main's own Table and plugins.
- FR26: a pane 720 px wide and 400 px high, a flex column with a 48 px toolbar and a Table of 30 rows. The pane is the scroller, as a caller would make it.
- FR26 with a pinned column: the same pane, with 8 wide columns and the Name column pinned through `useTableStickyColumns`.
- FR27: a Table at most 600 px wide, with column resize, selection, `isStriped`, and Bob's row selected. A real mouse drag narrows Email by 120 px.
- The FR27 cases follow the spec's first case: narrowing any column leaves the space it gives up as filler.
- The fixtures hold sample e-mail addresses. Before it reads or shoots, the harness shows each one as a handle such as "@person10", so no frame shows a host name.
- Widths come from the columns, not their text, so this changes no width.

## How the mock-ups are made

- FR26: the pane gets `overflow: hidden`. The Table's scroll region gets `height: 100%` and `overflow: auto`, and the header cells get `position: sticky` and `top: 0`.
- The header cells take the colour behind the table, so rows scroll under them. The pinned header cell sits above the others.
- FR27: the Table gets one empty trailing column after Role, with no padding, so it has no width before the drag.
- After the same drag, CSS sets Role back to its width before the drag, and the trailing column takes the rest. Its cells get `aria-hidden`; they hold no content and nothing in them takes focus.
- A measurement guide under each FR27 table marks the widths. It is not part of the Table.

## FR26 (test)

| Fixture | Scheme | Frame | What scrolled, px | Toolbar top, in view | Header top, in view | First body row fully in view | Pinned column left |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR26 | light | Current (main) | the pane: 398 of 796 | -398, no | -350, no | Person 10 | - |
| FR26 | light | Proposed (spec mock-up) | the Table's region: 398 of 796 | 0, yes | 48, yes | Person 12 | - |
| FR26, pinned column | light | Current (main) | the pane: 398 of 796; the Table's region inline 341 of 682 | -398, no | -350, no | Person 10 | 0 (Name) |
| FR26, pinned column | light | Proposed (spec mock-up) | the Table's region: 398 of 796; inline 341 of 682 | 0, yes | 48, yes | Person 12 | 0 (Name) |
| FR26 | dark | Current (main) | the pane: 398 of 796 | -398, no | -350, no | Person 10 | - |
| FR26 | dark | Proposed (spec mock-up) | the Table's region: 398 of 796 | 0, yes | 48, yes | Person 12 | - |
| FR26, pinned column | dark | Current (main) | the pane: 398 of 796; the Table's region inline 341 of 682 | -398, no | -350, no | Person 10 | 0 (Name) |
| FR26, pinned column | dark | Proposed (spec mock-up) | the Table's region: 398 of 796; inline 341 of 682 | 0, yes | 48, yes | Person 12 | 0 (Name) |

- Positions are CSS px from the top or start edge of the pane's visible box. A negative top is above the pane, out of view.
- In the mock-up, the first row fully in view is the first one below the sticky header.

## FR27 widths (test)

| Scheme | Frame | Before the drag | After the drag | Trailing track |
| --- | --- | --- | --- | --- |
| light | Current (main) | Name 188, Email 188, Role 188 | Name 188, Email 68, Role 308 | none |
| light | Proposed (spec mock-up) | Name 188, Email 188, Role 188 | Name 188, Email 68, Role 188 | 120 px; 6 cells, empty yes, focusable 0, aria-hidden |
| dark | Current (main) | Name 188, Email 188, Role 188 | Name 188, Email 68, Role 308 | none |
| dark | Proposed (spec mock-up) | Name 188, Email 188, Role 188 | Name 188, Email 68, Role 188 | 120 px; 6 cells, empty yes, focusable 0, aria-hidden |

- Widths are CSS px. The selection checkbox column is 36 px in every frame.

## FR27 row paint, from the pixels (test)

| Scheme | Frame | Row | Near the right edge | In the Role column |
| --- | --- | --- | --- | --- |
| light | Current (main) | Bob (selected) | #D4D4D4 | #D4D4D4 |
| light | Current (main) | Charlie | #FFFFFF | #FFFFFF |
| light | Current (main) | Diana (striped) | #F1F1F1 | #F1F1F1 |
| light | Proposed (spec mock-up) | Bob (selected) | #D4D4D4 | #D4D4D4 |
| light | Proposed (spec mock-up) | Charlie | #FFFFFF | #FFFFFF |
| light | Proposed (spec mock-up) | Diana (striped) | #F1F1F1 | #F1F1F1 |
| dark | Current (main) | Bob (selected) | #474747 | #474747 |
| dark | Current (main) | Charlie | #262626 | #262626 |
| dark | Current (main) | Diana (striped) | #1B1B1B | #1B1B1B |
| dark | Proposed (spec mock-up) | Bob (selected) | #474747 | #474747 |
| dark | Proposed (spec mock-up) | Charlie | #262626 | #262626 |
| dark | Proposed (spec mock-up) | Diana (striped) | #1B1B1B | #1B1B1B |

- "Near the right edge" is 6 CSS px inside the table's end edge. In the mock-up that point is in the trailing track, and in Current it is in Role.
- In both frames, the selected row's wash and the striped row's stripe reach the edge.

## Builds

- Current: a local build of main at 351206d7, with the scratch story added. The hosted Production deploy of 351206d7 serves as its control, by version.json:

| Story | Scheme | Local against hosted, px that differ |
| --- | --- | --- |
| `core-table--default` | light | 0 |
| `core-table--default` | dark | 0 |
| `core-tablecolumnresize--with-selection-and-resize` | light | 0 |
| `core-tablecolumnresize--with-selection-and-resize` | dark | 0 |

- The version.json files and the pull request's head were the same at the start and the end of the run.

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 px at scale 2, the Neutral theme, light and dark, reduced motion.
- FR26 scrolls are set to half of each scroll range. Each frame is taken when three shots in a row are identical. Every frame was looked at.

## Files

- `<fixture>--<scheme>--current-vs-mockup.png`: Current (main) on the left, Proposed (spec mock-up) on the right.
- `measurements.json`: every reading, the mock-up rules, and each frame's sha256.
