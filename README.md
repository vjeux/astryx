# Table heading titles and cut-heading tooltips

#13109 at 6e3fb84cea20e19de931829d44184c7df565b374 (head) against its merge base, e833d923df6691974455e31216026206dec16a97 (main). Each build's Storybook was checked by its version.json: the head's preview, and the merge base's production deploy. All results are from test runs.

## Results

| Check | Where | Heading | Main | Head |
| --- | --- | --- | --- | --- |
| (1) Mouse hover over the cut plain heading for 1.2 s | Responsive Scroll | Department | title "Department"; Astryx tooltips none | title none (no attribute); Astryx tooltips none |
| (1) The same in the harness | harness | Criterion | title "Criterion"; Astryx tooltips none | title none (no attribute); Astryx tooltips none |
| (2) Tab to the cut sortable heading's sort control | harness | Apple Notes | focus on the button after 3 Tabs; tooltips 1: "Apple Notes"; title none (no attribute) | focus on the button after 3 Tabs; tooltips 1: "Apple Notes"; title none (no attribute) |
| (3) Mouse hover over the fitting plain heading | Responsive Scroll | Name | title "Name"; Astryx tooltips none | title none (no attribute); Astryx tooltips none |
| (3) Mouse hover over a fitting sortable heading | harness | Obsidian | title none (no attribute); tooltips none | title none (no attribute); tooltips none |
| (3) Tab to the fitting sortable heading's sort control | harness | Obsidian | focus on the button after 1 Tab; tooltips none | focus on the button after 1 Tab; tooltips none |
| (4) The cut plain heading in the accessibility tree | Responsive Scroll | Department | name "Department" | name "Department" |
| (4) The same in the harness | harness | Criterion | name "Criterion" | name "Criterion" |

- A native title tooltip is drawn by the browser outside the page, so a headless screenshot cannot show it. The table gives the `title` attribute that would make one, not a tooltip seen on screen.
- Titles of the first table's headings in Responsive Scroll:
  - main: Name: "Name"; Department (cut): "Department"; Title: "Title"; Location (cut): "Location"; Email: "Email"; Status: "Status";
  - head: no heading has a title attribute.
- Titles of the harness's headings:
  - main: Criterion (cut): "Criterion"; Obsidian (sortable): none (no attribute); Notion (sortable): none (no attribute); Apple Notes (cut) (sortable): none (no attribute);
  - head: no heading has a title attribute.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at 1280 × 900 px and device pixel ratio 2, light mode, with a mouse and the keyboard.
- Shipped story, on the hosted builds: Table, Responsive Scroll. Its first table is 360 px wide and truncates: "Department" is cut, "Name" fits, and no column is sortable.
- **The truncating sortable table is a harness, not a shipped story.** No shipped story renders a truncating Table with a sortable column at either commit.
- The harness, [harness/TableTruncateHarness.stories.tsx](harness/TableTruncateHarness.stories.tsx), uses the Table stories' Heading Overflow data with `textOverflow="truncate"` and the sort plugin. Narrow pixel widths cut "Criterion" (plain) and "Apple Notes" (sortable). "Obsidian" and "Notion" (sortable) fit.
- The harness wraps its Table in a `width: fit-content` box, which lets the Table fill the page, so its pixel widths only set minimums. The run narrows that box to 448 px, the sum of the column widths, with one injected rule: `#storybook-root div[style*="fit-content"] { width: 448px !important; }`. Both builds get the same rule.
- The harness was built into a local static Storybook at each commit. The stories list was narrowed to the harness and the Table stories, as [harness/storybook-main.diff](harness/storybook-main.diff) shows.
- Positive control: each local build's Responsive Scroll page equals the hosted build's, pixel for pixel. Pixels that differ: 0, 0.
- Hover: the mouse rests at the heading's centre for 1.2 s. Focus: Tab from the start of the page until the heading's sort control takes the focus, then 1.2 s.
- Tooltips: elements with `role="tooltip"` or an open popover, painted with a size.
- Accessibility tree: the column headers' names from Chromium's accessibility tree, through the DevTools protocol (`Accessibility.getFullAXTree`).
- Every frame was looked at.

## Frames

Contact sheets: [Responsive Scroll](sheets/shipped.png) and [harness](sheets/harness.png).

In [frames/](frames/), each name starts with the build (`main` or `head`), then `shipped` or `harness`:
- `-rest`: the table at rest;
- `-hover-<heading>`: the mouse over that heading;
- `-focus-<heading>`: the keyboard focus on that heading's sort control.

The raw readings are in [results.json](results.json).
