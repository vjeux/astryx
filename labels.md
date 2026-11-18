# meta/astryx#11575 reorder handle options: frames and labels

Frames come from the hosted Vercel Storybook previews. Before each capture the
deployment's /version.json was read and its commit checked:

- head 3d714b05b6fd55a0ed218153d83bfd356b311116: https://astryx-mgm57c1v5-fbopensource.vercel.app
- base (#11445) 4060e59cb5fab6968e05049c0afe7c7201a062a1: https://astryx-jwcoozq5y-fbopensource.vercel.app

Chromium 149.0.7827.55 (Playwright 1.61.1, new headless), light, neutral theme.
Desktop is 1280x800 CSS px at 2x; phone is 390x844 at 3x with touch (coarse
pointer). Each frame is cropped to the story with 16 px around it.

Measures, in CSS px, for the row the frame is about:
- hang: how far the handle's 16 px box sits outside the row's content box
  (negative: inside it).
- edge: the 24 px target's inner edge to the row's content edge (0: it stops
  at the content; negative: it reaches into it).
- room: how far the label sits in from the row's content edge (start), or
  how much of the content box the target takes (end).
- hit: the target as hit testing finds it, walked out from the handle's
  center in 0.25 px steps. Each side can read up to 0.25 px over.

| Frame | Story, args | State | Row | Shown | Handle / target / hit | Hang | Edge | Room |
|---|---|---|---|---|---|---|---|---|
| 01-list-end-always-rest.png | list--reorder-handle-options end-always (desktop, 3d714b05) | at rest | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 20 |
| 02-list-end-always-hover.png | list--reorder-handle-options end-always (desktop, 3d714b05) | hover, row 2 | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 20 |
| 03-list-end-adaptive-rest.png | list--reorder-handle-options end-adaptive (desktop, 3d714b05) | at rest | Sent | false | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 04-list-end-adaptive-hover.png | list--reorder-handle-options end-adaptive (desktop, 3d714b05) | hover, row 2 | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 05-list-start-always-rest.png | list--reorder-handle-options start-always (desktop, 3d714b05) | at rest | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 24 |
| 06-list-start-always-hover.png | list--reorder-handle-options start-always (desktop, 3d714b05) | hover, row 2 | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 24 |
| 07-list-start-adaptive-rest.png | list--reorder-handle-options start-adaptive (desktop, 3d714b05) | at rest | Sent | false | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 08-list-start-adaptive-hover.png | list--reorder-handle-options start-adaptive (desktop, 3d714b05) | hover, row 2 | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 09-list-start-adaptive-keyboard-focus.png | list--reorder-handle-options start-adaptive (desktop, 3d714b05) | Tab x1 to the first handle | Inbox | true | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 10-list-start-always-keyboard-focus.png | list--reorder-handle-options start-always (desktop, 3d714b05) | Tab x1 to the first handle | Inbox | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 24 |
| 11-phone-list-start-adaptive-rest.png | list--reorder-handle-options start-adaptive (phone, 3d714b05) | at rest | Sent | true | 16x16 / 24x24 / 43.75x40.5 | -6 | -26 | 30 |
| 12-phone-list-end-adaptive-rest.png | list--reorder-handle-options end-adaptive (phone, 3d714b05) | at rest | Sent | true | 16x16 / 24x24 / 43.75x40.5 | -6 | -26 | 26 |
| 13-listinput-start-adaptive-rest.png | listinput--reorder-handle-options start-adaptive (desktop, 3d714b05) | at rest | Green | false | 16x16 / 24x24 / 23.75x24.5 | 20 | 0 | 13 |
| 14-listinput-start-adaptive-hover.png | listinput--reorder-handle-options start-adaptive (desktop, 3d714b05) | hover, row 2 | Green | true | 16x16 / 24x24 / 23.75x24.5 | 20 | 0 | 13 |
| 15-listinput-end-always-rest.png | listinput--reorder-handle-options end-always (desktop, 3d714b05) | at rest | Green | true | 16x16 / 24x24 / 24.5x24.5 | -4 | -24 | 24 |
| 16-transferlist-start-always-rest.png | transferlist--reorder-handle-options start-always (desktop, 3d714b05) | at rest | Owner | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 24 |
| 17-transferlist-end-adaptive-rest.png | transferlist--reorder-handle-options end-adaptive (desktop, 3d714b05) | at rest | Owner | false | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 18-transferlist-end-adaptive-hover.png | transferlist--reorder-handle-options end-adaptive (desktop, 3d714b05) | hover, row 2 | Owner | true | 16x16 / 24x24 / 24.5x24.5 | 20 | 0 | 0 |
| 19-list-in-card-rest.png | list--reorder-in-card (desktop, 3d714b05) | at rest | Sent | false | 16x16 / 24x24 / 23.5x24.5 | 20 | 0 | 0 |
| 20-list-in-card-padded-hover.png | list--reorder-in-card (desktop, 3d714b05) | hover, padded card, row 1 | Inbox | true | 16x16 / 24x24 / 23.5x24.5 | 20 | 0 | 0 |
| 21-list-in-card-flush-hover.png | list--reorder-in-card (desktop, 3d714b05) | hover, flush card, row 1 | Inbox | true | 16x16 / 24x24 / 23.5x24.5 | 20 | 0 | 0 |
| 22-list-in-card-outset-hover.png | list--reorder-in-card (desktop, 3d714b05) | hover, outset card, row 1 | Inbox | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 24 |
| 23-list-in-card-bleed-hover.png | list--reorder-in-card (desktop, 3d714b05) | hover, bleed card, row 1 | Inbox | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 24 |
| 24-list-in-card-numbered-hover.png | list--reorder-in-card (desktop, 3d714b05) | hover, numbered card, row 1 | Inbox | true | 16x16 / 24x24 / 24.5x24.5 | -24 | -44 | 48 |
| 25-list-reorderable-default-base.png | list--reorderable (desktop, 4060e59c) | at rest | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 20 |
| 26-list-reorderable-default-head.png | list--reorderable (desktop, 3d714b05) | at rest | Sent | true | 16x16 / 24x24 / 24.5x24.5 | 0 | -20 | 20 |

In the card story, frames 20-24 hover the first row of each card, in the
order padded, flush, outset, bleed, numbered. Their rows:
- padded: hang 20, edge 0, room 0
- flush: hang 20, edge 0, room 0
- outset: hang 0, edge -20, room 24
- bleed: hang 0, edge -20, room 24
- numbered: hang -24, edge -44, room 48

ListInput (frames 13-15): the row's content is its field box. The target's
inner edge stops at the field box (edge 0); room 13 is the label text's inset
inside that field box.

Phone (frames 11-12): the hit area is the handle's ::after, 44px x 41px; the
row is 41 px tall.

Frames 25 and 26 (the default reorderable list on #11445 and on this head)
are byte-identical. So are 01 and 02, and 05 and 06: with revealBehavior
always, hovering a row changes nothing.

Earlier heads of this pull request, measured the same way (no frames). With
the 28 px box the label sat 36 px in from the content edge. On this head it
sits 24 px in (start, always), 12 px closer. When the handle hangs (start,
adaptive), it sits 0 px in.
- e81fac348e placement:start;revealBehavior:always: handle/target 16x16 / 24x24, hang 0, edge -20, room 24, target to label 4
- e81fac348e placement:start;revealBehavior:adaptive: handle/target 16x16 / 24x24, hang 20, edge 0, room 0, target to label 0
- 7900246d90 placement:start;revealBehavior:always: handle/target 16x16 / 24x24, hang 0, edge -20, room 24, target to label 4
- 7900246d90 placement:start;revealBehavior:adaptive: handle/target 16x16 / 24x24, hang 20, edge 0, room 0, target to label 0
- d45d60b408 placement:start;revealBehavior:always: handle/target 16x16 / 24x24, hang 0, edge -20, room 24, target to label 4
- d45d60b408 placement:start;revealBehavior:adaptive: handle/target 16x16 / 24x24, hang 20, edge 0, room 0, target to label 0
- 6f8fbe46f2 placement:start;revealBehavior:always: handle/target 16x16 / 24x24, hang 0, edge -20, room 24, target to label 4
- 6f8fbe46f2 placement:start;revealBehavior:adaptive: handle/target 16x16 / 24x24, hang 24, edge 4, room 0, target to label 4
- dd91dd7c4c placement:start;revealBehavior:always: handle/target 16x16 / 24x24, hang 0, edge -20, room 24, target to label 4
- dd91dd7c4c placement:start;revealBehavior:adaptive: handle/target 16x16 / 24x24, hang 0, edge -20, room 24, target to label 4
- 4ab27d712c placement:start;revealBehavior:always: handle/target 28x28 / 28x28, hang 0, edge -28, room 36, target to label 8
- 4ab27d712c placement:start;revealBehavior:adaptive: handle/target 28x28 / 28x28, hang 0, edge -28, room 36, target to label 8
- 12d969413a placement:start;revealBehavior:always: handle/target 28x28 / 28x28, hang 0, edge -28, room 36, target to label 8
- 12d969413a placement:start;revealBehavior:adaptive: handle/target 28x28 / 28x28, hang 0, edge -28, room 36, target to label 8
- ab193b0058 placement:start;revealBehavior:always: handle/target 28x28 / 28x28, hang 0, edge -28, room 36, target to label 8
- ab193b0058 placement:start;revealBehavior:adaptive: handle/target 28x28 / 28x28, hang 0, edge -28, room 36, target to label 8
