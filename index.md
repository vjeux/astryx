# SegmentedControl at 200% text: a segment grows with its label, main and head

Main: b9329f65ad200d7d13177b385992914c5d748397, the head's merge parent, `main` in file names. Head: #12457 at a09460dd380b6b79ff3cd48e12d836b60674f464, `pr` in file names. The head merges this main into the branch.

## Answer

- At 200% text, every head segment holds its label's line: 480 of 480 labels, against 6 of 480 on main.
- That holds for every theme, at 1280 and 390, in light and dark.
- The selected segment holds its label in 160 of 160 groups on the head, against 2 of 160 on main.
- Every icon sits inside its segment on the head: 96 of 96, against 0 of 96 on main.
- No segment width differs between the two builds, in any condition.
- At 100% text, the head's frames are pixel-identical to main's in all 96 conditions.
- At 200%, 166 of 480 labels truncate on the 390 phone. They truncate the same way on both builds.

## Heights at 200% (px)

Each value is sm / md / lg, from `size-variants`. Light and dark give the same heights.

| Theme | 1280, main | 1280, head | 390, main | 390, head |
| --- | --- | --- | --- | --- |
| No theme global | 20 / 24 / 28 | 40 / 40 / 40 | 20 / 24 / 28 | 40 / 48 / 48 |
| Neutral | 20 / 24 / 28 | 40 / 40 / 40 | 20 / 24 / 28 | 40 / 48 / 48 |
| Stone | 24 / 28 / 32 | 34.91 / 40 / 40 | 24 / 28 / 32 | 40 / 48 / 48 |
| Butter | 28 / 36 / 44 | 34.91 / 40 / 44 | 28 / 36 / 44 | 40 / 48 / 48 |
| Chocolate | 24 / 28 / 32 | 40 / 40 / 40 | 24 / 28 / 32 | 40 / 48 / 48 |
| Gothic | 24 / 28 / 32 | 40 / 48 / 48 | 24 / 28 / 32 | 40 / 48 / 48 |
| Matcha | 32 / 36 / 40 | 40 / 48 / 48 | 32 / 36 / 40 | 40 / 48 / 48 |
| Y2K | 28 / 36 / 44 | 36.92 / 48 / 48 | 28 / 36 / 44 | 36.92 / 48 / 48 |

- A head segment is as tall as its label's line, or as its own size when that is taller.
- Butter's large segment is 44 px at 1280, and its label's line already fits, so it does not grow.
- At 100% text, each theme's heights are the same on both builds, and the same as main's column at 200%.

## Clipping and overflow

- Main, 200%: the label's line box passes the segment's top or bottom in 474 of 480 labels. Its glyphs pass it in 402 of 480.
- Head, 200%: both the line box and the glyphs sit within the segment's top and bottom, in 480 of 480.
- No page scrolls sideways, and every segment stays inside its group, on both builds.
- On the 390 phone, the md and lg labels truncate with an ellipsis on both builds.
- Matcha and Y2K also truncate sm there. Their `with-icons` labels show one letter or part of one, with no ellipsis.
- Labels truncated at 390 and 200%: 18 each for no theme, Neutral, Stone, Butter, Chocolate and Gothic, 28 for Matcha and 30 for Y2K.
- The head changes no width, so these truncations are the same on both builds. Nothing truncates at 1280, or at 100% text.

## The selection indicator

- The selected segment draws the indicator itself: its own background, with a shadow in every theme but Neutral and no theme global. No other element draws it.
- On main at 200%, the selected segment is shorter than its label's line in 158 of 160 groups.
- The two that fit are Butter's large segment at 1280, in light and dark.
- On the head, the selected segment holds its label's line box and glyphs in 160 of 160 groups.

## Fonts

- Storybook loads no theme font. So the harness loads each theme's body face from the theme's own `fonts.css`.
- On every page, the labels draw in that face, by the browser's platform-font check:

| Theme | Body family | Faces drawn |
| --- | --- | --- |
| No theme global | Figtree, not loaded | Liberation Sans |
| Neutral | Figtree | Figtree Light Medium, Figtree Light SemiBold |
| Stone | Figtree | Figtree Light Medium, Figtree Light SemiBold |
| Butter | Outfit | Outfit Thin Medium, Outfit Thin SemiBold |
| Chocolate | Albert Sans | Albert Sans Medium, Albert Sans SemiBold |
| Gothic | Fustat | Fustat Medium, Fustat SemiBold |
| Matcha | DM Sans | DM Sans 9pt Medium, DM Sans 9pt SemiBold |
| Y2K | Poppins | Poppins Medium, Poppins SemiBold |

- These are the names inside the faces' files. Medium draws the unselected labels, and SemiBold the selected one.
- "No theme global" is Storybook's default. It uses Neutral's tokens, and its Figtree is not loaded, so the fallback face draws.
- Gothic is a dark-only theme. Its 8 light and dark still pairs are byte-identical.

## The changeset's phone line

- The changeset says Neutral's small phone segment grows from 20 to 21 px at the default text size.
- In Chromium it does not. The small label's line is 20.0004 px, and the segment stays 20 px on both builds.
- That holds at 390 × 844, scale 2, and at the repository's own phone preset, 402 × 714, scale 3.
- At that preset, the 100% frames are pixel-identical on both builds for no theme, Neutral and Stone. WebKit and iOS were not tested.

## Builds

- Main: the production deploy of b9329f65ad, by its version.json (environment "production").
- Head: the preview deploy of a09460dd38, by its version.json (environment "preview").
- Both version.json files and the pull request's head were the same at the start and at the end of the run.

## Method

- Stories: `core-segmentedcontrol--size-variants`, `core-segmentedcontrol--with-icons` and `core-segmentedcontrol--default`. The stills show the first two, at 200%.
- Themes: the Storybook global `astryxTheme`, with no theme and the 7 published themes. Mode: the global `colorMode` and the page's color scheme.
- 200% text: the root font size set to 200%, as a browser's larger-text setting does. Text sizes are rem, and element sizes are px.
- Fonts: the theme's `fonts.css` faces for its body family, injected as data URLs. Then `document.fonts` loads them, and the harness waits for them.
- Each page settles: network idle, fonts ready, two animation frames, then 250 ms, with reduced motion.
- Label boxes: the title element's line box, and a DOM range over the title for its glyphs. "Inside" allows 1 px.
- Truncated: the title's scroll width is more than its client width.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). 1280: 1280 × 800, mouse, scale 1. 390: 390 × 844, touch, scale 2.
- Stills: the radiogroups and their titles with a 12 px margin, at the viewport's scale.
- All numbers are test measurements: hosted builds over this machine's network, one machine.
- Box load average (1 min): about 25 to 32 during the run, on 166 cores, with a test suite running alongside.
- Times on 2026-11-20: 384 page loads from 16:39:21Z to 16:52:49Z. The phone-preset check ran at about 16:54Z.

## Files

- `<theme>--<story>--<device>--<mode>--<build>.png`: the 128 stills at 200%. `desktop` is 1280 and `phone` is 390; theme `none` has no theme global.
- `measurements.json`: every condition's heights, label boxes, truncation, widths, selected segment and drawn faces. It also holds the 100% pixel identity and the phone-preset check.
