# Tab at b4cb4d09: the hover and press layer paints under the label

Head: #12662 at b4cb4d093df928acf833eb11606d33e2e3cbda15, `head` in file names. Main: 67b821f39b7d30b703570f350c258232e80095e6, the current main, `main` in file names. All numbers are test measurements.

## Answer (test)

- (1) Under an opaque hover overlay, main hides the unselected tab's label: 0 pixels of its label box differ from the overlay colour.
- On the head, the label shows through it. In light mode, 805 of its 843 ink pixels stay visible; in dark mode, 785 of 785.
- Under the default hover, the head adds no tint to the label. Its ink stays 71, 71, 71 in light mode and 158, 158, 158 in dark mode, as at rest.
- On main, the default hover tints the ink to 67, 67, 67 in light mode and to 162, 162, 162 in dark mode.
- The hover layer still paints on both builds. The background goes from 255 to 242 in light mode, and from 38 to 49 in dark mode.
- Under the default hover, head and main differ only inside the label's text box. They differ in 901 px in light mode, and 828 px in dark mode.
- (2) The selected tab at rest is pixel-identical between the builds, in light and dark. Its label sits at its tab's centre.
- The unselected tab at rest is pixel-identical between the builds too.
- (3) In the Wrapped label story at 390 px, the "Eligibility and registration requirements" tab takes 3 lines on both builds.
- At rest it is pixel-identical between the builds, in light and dark. Its text box is centred in its tab, within 0.01 px on each line.
- Every tab in that story has the same readings on both builds.

## What changed

- The tab gets `isolation: isolate`, and its hover and press layer gets `z-index: -1`. So the layer paints under the label, inside the tab.
- The pull request does the same for TabMenu's trigger. This take does not measure TabMenu.
- Main's #12593 re-centred wrapped Tab labels after the first frames of this pull request. So these frames are a re-take on the current main.
- Main has moved 13 commits past the head's merge base, facdcb9a. None of them changes TabList.

## Builds

- Head: the preview deploy of b4cb4d09, by its version.json (environment "preview").
- Main: the Production deploy of 67b821f3, by its version.json (environment "production").
- The version.json files, the pull request's head and main's head were the same at the start and the end of the run.

## (1) An unselected tab under an opaque hover overlay (test)

| Mode | Build | Label box, device px | Pixels that are not the overlay colour | Ink pixels at rest that stay visible |
| --- | --- | --- | --- | --- |
| light | main | 4440 | 0 | 0 of 843 |
| light | head | 4440 | 805 | 805 of 843 |
| dark | main | 4440 | 0 | 0 of 785 |
| dark | head | 4440 | 785 | 785 of 785 |

- The tab is the Default story's first unselected tab, "Projects". The overlay colour is rgb(255, 0, 255).
- The label box is the label element's box at scale 2.

## (1) The same tab under the default hover (test)

| Mode | Build | Hover layer colour | Background, rest → hover | Ink colour at rest (pixels) | Ink colour under the default hover (pixels) |
| --- | --- | --- | --- | --- | --- |
| light | main | rgba(0, 0, 0, 0.05) | 255, 255, 255 → 242, 242, 242 | 71, 71, 71 (324) | 67, 67, 67 (324) |
| light | head | rgba(0, 0, 0, 0.05) | 255, 255, 255 → 242, 242, 242 | 71, 71, 71 (324) | 71, 71, 71 (324) |
| dark | main | rgba(255, 255, 255, 0.05) | 38, 38, 38 → 49, 49, 49 | 158, 158, 158 (317) | 162, 162, 162 (324) |
| dark | head | rgba(255, 255, 255, 0.05) | 38, 38, 38 → 49, 49, 49 | 158, 158, 158 (317) | 158, 158, 158 (317) |

- The ink colour is the glyphs' full-coverage colour: the label box's most frequent colour, far from its background.

## Head against main (test)

| Frame | Mode | Head against main |
| --- | --- | --- |
| Unselected tab, at rest | light | pixel-identical |
| Selected tab, at rest | light | pixel-identical |
| Unselected tab, under the default hover | light | 901 px differ: 901 inside the label's text box, 0 outside it |
| Wrapped label story, the "overview" tab, at rest | light | pixel-identical |
| Wrapped label story, the "eligibility" tab, at rest | light | pixel-identical |
| Wrapped label story, the "documents" tab, at rest | light | pixel-identical |
| Wrapped label story, the "contacts" tab, at rest | light | not fully in the viewport; readings equal |
| Wrapped label story, the "review" tab, at rest | light | not fully in the viewport; readings equal |
| Unselected tab, at rest | dark | pixel-identical |
| Selected tab, at rest | dark | pixel-identical |
| Unselected tab, under the default hover | dark | 828 px differ: 828 inside the label's text box, 0 outside it |
| Wrapped label story, the "overview" tab, at rest | dark | pixel-identical |
| Wrapped label story, the "eligibility" tab, at rest | dark | pixel-identical |
| Wrapped label story, the "documents" tab, at rest | dark | pixel-identical |
| Wrapped label story, the "contacts" tab, at rest | dark | not fully in the viewport; readings equal |
| Wrapped label story, the "review" tab, at rest | dark | not fully in the viewport; readings equal |

- The "overview" and "documents" tabs have no still of their own. Both lie inside the strip still, which is pixel-identical.

## Centring (test)

| Story | Tab | Lines | Text box centre against the tab's centre, x / y, px | Each line's centre against the tab's centre, x, px | Tab size, px | Head = main |
| --- | --- | --- | --- | --- | --- | --- |
| Default | "Home" (selected) | 1 | 0 / 0 | 0 | 62.91 × 32 | yes |
| Default | "Projects" (unselected) | 1 | -0.01 / 0 | -0.01 | 79.25 × 32 | yes |
| Wrapped label, 390 px | "Overview" (selected) | 1 | 0 / 0 | 0 | 86.27 × 100 | yes |
| Wrapped label, 390 px | "Eligibility and registration requirements" | 3 | 0 / 0 | 0, 0, -0.01 | 112.69 × 100 | yes |
| Wrapped label, 390 px | "Supporting documents to upload" | 3 | 0 / 0 | -0.01, 0, 0 | 98.67 × 100 | yes |
| Wrapped label, 390 px | "Emergency contact information" | 3 | -0.01 / 0 | -0.01, 0, 0 | 100.98 × 100 | yes |
| Wrapped label, 390 px | "Review and submit your application" | 3 | -0.01 / 0 | 0, 0.01, 0 | 97.89 × 100 | yes |

- The offsets are in CSS px. A positive x is right of the tab's centre, and a positive y is below it. The dark readings equal the light ones.
- At 390 px, the tab strip scrolls, so the last two tabs lie partly or wholly outside the viewport. Their stills are not taken.

## Method

- Chromium 149.0.7827.55 through Playwright, at scale 2. Light and dark come from the Storybook `colorMode` global.
- The Default story runs at 1280 × 800 px. The Wrapped label story runs at 390 × 700 px, the phone width that #12593's own spec uses.
- The hover is a real mouse at the tab's centre. Each frame is taken when three screenshots in a row are identical.
- The opaque overlay sets the `--color-overlay-hover` token to rgb(255, 0, 255) under the story root, with transitions off. The pull request's own spec does the same.
- A pixel counts as visible when its colour differs from the overlay colour by more than 60, summed over the channels. That is the spec's threshold.
- The ink pixels at rest are the label box's pixels that differ from its background by more than 60.
- The text box is the label text's Range box. Its lines are the Range's line boxes.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `default-unselected-rest--<mode>--<build>.png`, `default-unselected-hover--…`, `default-unselected-opaque-hover--…`: the unselected tab, with 8 px around it.
- `default-selected-rest--<mode>--<build>.png`: the selected tab at rest.
- `wrapped-eligibility--<mode>--<build>.png` and `wrapped-strip--<mode>--<build>.png`: the wrapped tab, and the tab strip at 390 px.
- `measurements.json`: every reading and the summaries.
