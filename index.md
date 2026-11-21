# createReorderable attach at 4432e831: plain elements reorder by keyboard, and List reorder matches main

Main: the Production build of 8a5008a7ececb7e6296a3148597117026e5ade3e, the head's merge base, `main` in file names. Head: #11226 at 4432e831a7039b0bbd39205f200a0f59e7a419ef, `head` in file names.

## Answer (test)

- In the new story, Tab from page start lands on the first grip, "Reorder Ace of spades". Space turns reorder mode on: the grip reads aria-pressed true, and a hint shows Move up, Move down and Done.
- Each ArrowDown moves the card one place and announces its new place in the polite live region, word for word below. Escape and Done both end the mode with the same announcement.
- The moving card keeps its own look. An insertion line marks the moved card's edge, and the grip keeps its focus ring.
- Every focus ring measured has a contrast of at least 9.77:1 with the pixels next to it, on both pixel rows of its straight edges.
- A mouse drag on an attach grip moves nothing, but the grip's description says "Drag to move this item". The story itself says dragging an attached grip is not built yet.
- The List's Reorderable story behaves as on main. Every frame of a keyboard reorder and a mouse drag is pixel-identical between the builds, in light and dark.
- On both builds, each live-region text matches word for word, and so does each order.

## The attach story, step by step (test; light; dark gives the same text and order)

| Key | Live region (politeness: text) | Order | Focus | Hint buttons | Insertion line |
| --- | --- | --- | --- | --- | --- |
| - | none | Ace of spades, King of hearts, Queen of clubs, Jack of diamonds | the page | none | none |
| Tab | none | Ace of spades, King of hearts, Queen of clubs, Jack of diamonds | "Reorder Ace of spades", aria-pressed false | none | none |
| Space | none | Ace of spades, King of hearts, Queen of clubs, Jack of diamonds | "Reorder Ace of spades", aria-pressed true | Move up, Move down, Done | y -1px |
| ArrowDown | polite: "Ace of spades, position 2 of 4, after King of hearts, before Queen of clubs" | King of hearts, Ace of spades, Queen of clubs, Jack of diamonds | "Reorder Ace of spades", aria-pressed true | Move up, Move down, Done | y 93px |
| ArrowDown | polite: "Ace of spades, position 3 of 4, after Queen of clubs, before Jack of diamonds" | King of hearts, Queen of clubs, Ace of spades, Jack of diamonds | "Reorder Ace of spades", aria-pressed true | Move up, Move down, Done | y 141px |
| Escape | polite: "Done, Ace of spades at position 3 of 4" | King of hearts, Queen of clubs, Ace of spades, Jack of diamonds | "Reorder Ace of spades", aria-pressed false | none | none |
| Done (mouse click on the hint) | polite: "Done, Ace of spades at position 3 of 4" | King of hearts, Queen of clubs, Ace of spades, Jack of diamonds | "Reorder Ace of spades", aria-pressed false | none | none |

- The story is Core/Utilities/createReorderable "Attach Plain Elements", new in this pull request. Its four cards are an ordered list, and each card's grip is a plain button.
- Space announces nothing, on all 16 keyboard pages of both stories.
- The grip's aria-describedby text reads, word for word:

  > Drag to move this item, or press Space or Enter, then the arrow keys to move it one place at a time. Press Escape when you are done.

- The last row is a second page, which ends with a mouse click on the hint's Done instead of Escape.
- All 8 pages (2 modes, 2 runs, Escape and Done) give the same text, order, focus and hint at every step.
- All 64 messages, in both stories, are in the polite region (role status). No assertive message appears.

## Focus rings (test)

| Control | Build | Mode | When | Outline (computed) | Band width, px | Band color, row 1 / row 2 | Ring vs outside: min (median), row 1 / row 2 | Ring vs inside: min, row 1 / row 2 | Pixels under 3:1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Attach grip "Reorder Ace of spades" | head | light | focused | auto 1px rgb(16, 16, 16) offset 0px | 2–2 | rgb(16, 16, 16) / rgb(16, 16, 16) | 15.2 (19.03) / 18.87 (19.03) | 12.51 / 15.53 | 0 |
| Attach grip "Reorder Ace of spades" | head | light | in reorder mode | auto 1px rgb(16, 16, 16) offset 0px | 2–2 | rgb(16, 16, 16) / rgb(16, 16, 16) | 15.2 (19.03) / 18.87 (19.03) | 12.51 / 15.53 | 0 |
| List handle "Reorder" (Inbox) | main | light | focused | solid 2px rgb(27, 27, 27) offset -2px | 2–2 | rgb(27, 27, 27) / rgb(27, 27, 27) | 17.22 (17.22) / 17.22 (17.22) | 17.22 / 17.22 | 0 |
| List handle "Reorder" (Inbox) | main | light | in reorder mode | solid 2px rgb(27, 27, 27) offset -2px | 2–2 | rgb(27, 27, 27) / rgb(27, 27, 27) | 17.22 (17.22) / 17.22 (17.22) | 13.67 / 13.67 | 0 |
| List handle "Reorder" (Inbox) | head | light | focused | solid 2px rgb(27, 27, 27) offset -2px | 2–2 | rgb(27, 27, 27) / rgb(27, 27, 27) | 17.22 (17.22) / 17.22 (17.22) | 17.22 / 17.22 | 0 |
| List handle "Reorder" (Inbox) | head | light | in reorder mode | solid 2px rgb(27, 27, 27) offset -2px | 2–2 | rgb(27, 27, 27) / rgb(27, 27, 27) | 17.22 (17.22) / 17.22 (17.22) | 13.67 / 13.67 | 0 |
| Attach grip "Reorder Ace of spades" | head | dark | focused | auto 1px rgb(16, 16, 16) offset 0px | 2–2 | rgb(255, 255, 255) / rgb(255, 255, 255) | 15.67 (19.03) / 19.03 (19.03) | 12.95 / 15.72 | 0 |
| Attach grip "Reorder Ace of spades" | head | dark | in reorder mode | auto 1px rgb(16, 16, 16) offset 0px | 2–2 | rgb(255, 255, 255) / rgb(255, 255, 255) | 15.67 (19.03) / 19.03 (19.03) | 12.95 / 15.72 | 0 |
| List handle "Reorder" (Inbox) | main | dark | focused | solid 2px rgb(241, 241, 241) offset -2px | 2–2 | rgb(241, 241, 241) / rgb(241, 241, 241) | 13.4 (13.4) / 13.4 (13.4) | 13.4 / 13.4 | 0 |
| List handle "Reorder" (Inbox) | main | dark | in reorder mode | solid 2px rgb(241, 241, 241) offset -2px | 2–2 | rgb(241, 241, 241) / rgb(241, 241, 241) | 13.4 (13.4) / 13.4 (13.4) | 9.77 / 9.77 | 0 |
| List handle "Reorder" (Inbox) | head | dark | focused | solid 2px rgb(241, 241, 241) offset -2px | 2–2 | rgb(241, 241, 241) / rgb(241, 241, 241) | 13.4 (13.4) / 13.4 (13.4) | 13.4 / 13.4 | 0 |
| List handle "Reorder" (Inbox) | head | dark | in reorder mode | solid 2px rgb(241, 241, 241) offset -2px | 2–2 | rgb(241, 241, 241) / rgb(241, 241, 241) | 13.4 (13.4) / 13.4 (13.4) | 9.77 / 9.77 | 0 |

- Row 1 is the band's outer pixel row, and row 2 its inner one. Each pixel on the band's straight edges is compared with two others.
- One is the first unchanged pixel outside the band, and one is the first unchanged pixel inside it.
- The band is the pixels that change between the rest frame and the focused frame. In reorder mode, the same pixels are read on the frame after Space.
- The attach grip shows the browser's default focus ring, because the story's grip is a plain button with its own style. The ring is dark in light mode and white in dark mode.
- That ring follows the grip's content. The story's "⋮⋮" glyphs are 32 px wide in a 28 px grip, so the ring's right side steps out by 4 px around them.
- That holds for all 4 grips, in light and dark (`gripGlyphs` in measurements.json).
- The List handle draws its own 2 px ring inside its edge. In reorder mode the handle takes a fill, so the ring's inside neighbour changes, and the contrast stays above 9:1.

## The moving card and the insertion line (attach story; test)

| Mode | Step | Moving row: background, shadow, opacity, transform | A neighbour row | Grip: background, color | Insertion line: color, size, y |
| --- | --- | --- | --- | --- | --- |
| light | Tab | rgb(241, 241, 241), none, 1, none | rgb(241, 241, 241), none, 1, none | rgba(0, 0, 0, 0), rgb(106, 106, 106) | none |
| light | Space | rgb(241, 241, 241), none, 1, none | rgb(241, 241, 241), none, 1, none | rgba(0, 0, 0, 0), rgb(106, 106, 106) | rgb(27, 27, 27), 2px × 280px, -1px |
| light | ArrowDown | rgb(241, 241, 241), none, 1, none | rgb(241, 241, 241), none, 1, none | rgba(0, 0, 0, 0), rgb(106, 106, 106) | rgb(27, 27, 27), 2px × 280px, 93px |
| light | ArrowDown | rgb(241, 241, 241), none, 1, none | rgb(241, 241, 241), none, 1, none | rgba(0, 0, 0, 0), rgb(106, 106, 106) | rgb(27, 27, 27), 2px × 280px, 141px |
| dark | Tab | rgb(27, 27, 27), none, 1, none | rgb(27, 27, 27), none, 1, none | rgba(0, 0, 0, 0), rgb(158, 158, 158) | none |
| dark | Space | rgb(27, 27, 27), none, 1, none | rgb(27, 27, 27), none, 1, none | rgba(0, 0, 0, 0), rgb(158, 158, 158) | rgb(241, 241, 241), 2px × 280px, -1px |
| dark | ArrowDown | rgb(27, 27, 27), none, 1, none | rgb(27, 27, 27), none, 1, none | rgba(0, 0, 0, 0), rgb(158, 158, 158) | rgb(241, 241, 241), 2px × 280px, 93px |
| dark | ArrowDown | rgb(27, 27, 27), none, 1, none | rgb(27, 27, 27), none, 1, none | rgba(0, 0, 0, 0), rgb(158, 158, 158) | rgb(241, 241, 241), 2px × 280px, 141px |

- The moving card's background, shadow, opacity and transform stay the same as its neighbours' through every step.
- The insertion line is the list's own line, 2 px high and as wide as the list. Its y is in the list's coordinates.
- After Space the line sits on the card's top edge. After each ArrowDown it sits in the gap below the moved card.

## A mouse drag on an attach grip (test; head)

- The pointer presses on the first grip, moves down two card pitches in 14 steps, waits 400 ms and releases.
- In 4 of 4 runs, in light and dark, nothing moves. No preview, no insertion line, no reorder mode and no announcement appear.
- The order stays the same, and focus ends on the grip.
- The grip's description, which both stories share, still starts with "Drag to move this item".

## List reorder: the head against main (test)

| Gesture | Step | Mode | Live region, main | Live region, head | Order, main | Order, head | Frame, main vs head |
| --- | --- | --- | --- | --- | --- | --- | --- |
| keyboard | - | light | none | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | Tab | light | none | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | Space | light | none | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | ArrowDown | light | polite: "Inbox, position 2 of 6, after Sent, before Drafts" | same | Sent, Inbox, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | ArrowDown | light | polite: "Inbox, position 3 of 6, after Drafts, before Archive" | same | Sent, Drafts, Inbox, Archive, Spam, Trash | same | identical |
| keyboard | Escape | light | polite: "Done, Inbox at position 3 of 6" | same | Sent, Drafts, Inbox, Archive, Spam, Trash | same | identical |
| keyboard | - | dark | none | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | Tab | dark | none | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | Space | dark | none | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | ArrowDown | dark | polite: "Inbox, position 2 of 6, after Sent, before Drafts" | same | Sent, Inbox, Drafts, Archive, Spam, Trash | same | identical |
| keyboard | ArrowDown | dark | polite: "Inbox, position 3 of 6, after Drafts, before Archive" | same | Sent, Drafts, Inbox, Archive, Spam, Trash | same | identical |
| keyboard | Escape | dark | polite: "Done, Inbox at position 3 of 6" | same | Sent, Drafts, Inbox, Archive, Spam, Trash | same | identical |
| mouse drag | press on the handle, move 2 rows down | light | polite: "Picked up, position 1 of 6." | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| mouse drag | release | light | polite: "Dropped, position 3 of 6" | same | Sent, Drafts, Inbox, Archive, Spam, Trash | same | identical |
| mouse drag | press on the handle, move 2 rows down | dark | polite: "Picked up, position 1 of 6." | same | Inbox, Sent, Drafts, Archive, Spam, Trash | same | identical |
| mouse drag | release | dark | polite: "Dropped, position 3 of 6" | same | Sent, Drafts, Inbox, Archive, Spam, Trash | same | identical |

- The story is Core/List "Reorderable", on both builds. Its handles are named "Reorder", and the row's label element gives the row's name.
- The keyboard steps are the same as in the attach story. The mouse drag presses on Inbox's handle and moves it down two row pitches, then releases.
- During the drag, the source row dims to opacity 0.6. A preview follows the pointer, and the line marks the edge between Drafts and Archive.
- The preview has an opaque background, white in light and rgb(38, 38, 38) in dark, but its opacity is 0.6.
- So in the drag frame, the Drafts row shows through the preview, and both labels overlap. This is the same on main (`dragPreview` in measurements.json).
- All 8 keyboard pages and all 8 drag pages give the same text and order at every step, on both builds.

## Builds

- Main: the Production deploy of 8a5008a7ec, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of 4432e831a7, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of the run.

## Method

- 1280 × 800, scale 1, keyboard and mouse, in light and dark. Focus starts on the page.
- Each step waits 450 ms and two frames, then takes its frame and its record.
- The live region: Core's two regions, one polite and one assertive. Every text either takes is recorded word for word, with its time.
- Each case runs twice per build and mode, and the builds alternate. The frames come from the first run.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- On 2026-11-21, the run took 00:30:13Z to 00:32:14Z, at a box load of 25 at its start and 12 at its end.

## Files

- `<step>--attach--<mode>--head.png`: the attach story at rest, after Tab, Space, each ArrowDown, and Escape.
- `move2-done-path--attach--<mode>--head.png` and `drop-done--attach--<mode>--head.png`: the second page, before and after Done.
- `<step>--list--<mode>--<build>.png`: the List story at the same keyboard steps, on both builds.
- `drag-mid--list--<mode>--<build>.png` and `drag-dropped--list--<mode>--<build>.png`: during the mouse drag, and after the release.
- `measurements.json`: every step's record, the ring samples, and the summaries.
