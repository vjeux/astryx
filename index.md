# DEC-31 device evidence: #8080 at b01d48c1 and #11859 at ff541aa9

- #8080: the old head is 4651f211, and the new head is b01d48c1. #11859: the old head is d93fa3db, and the new head is ff541aa9.
- All numbers are test measurements on real devices. The files name each device by a label only.
- Every number here comes from `dec31-rows-public.json`. Its `rowMap` and `definitions` give the terms that this index uses.

## Answer (test)

- Row A, physical iPhone 14: on both heads, More, Actions and Projects open over 6 to 8 frames and close over 3 or 4.
- The More menu's open took 6, 7, 6 frames on the old head and 7, 8, 7 on the new head, run by run.
- Row B, real Pixel 8 at three profiles: 17 of 18 cells met their checks (status kept). The held-projects cell at R failed on the new head.
- Held projects at R, natural runs: the new head let 5 of 16 in-hold presses act. The old head let 0 of 16 act.
- Each of those 5 presses went down 28 to 35 ms before a hold that ended at 291 to 307 ms. Old natural holds never passed 287 ms.
- With the hold forced longer, 13 old-head and 12 new-head presses went down within 45 ms of the end of a hold over 290 ms.
- Of those, the old head let 3 act, at holds of 363–375 ms, and the new head let 1 act.
- The new head's one act was in the 1.5x CPU run, whose holds did not stretch.
- By DEC-31's regression test, the file reads this as a pre-existing timing defect, not a #8080 regression.
- Row C, CPU 4x: the paired new − old first-visible medians are −9 ms and +7 ms, over 5 pairs each.
- In Row B's no-shrink cell, the paired medians are −4 ms at N, −4 ms at R and +6 ms at S.
- #11859 step 6, real Pixel 8: every pick and radio cell closed the menu and cancelled the touchend, on both heads. Nothing beneath received the touch.
- #11859 step 7, physical iPhone 14: no click reached anything beneath the menu in 11 of 12 takes.
- The one exception is an old #8080 take, 4651f211-r2, where a click reached the page body.
- #11859 step 8: nothing beneath acted in 6 of 6 takes on the two #11859 heads. The control without #11859's fix let a click act in 2 of 3.
- Keyboard rows: 36 of 36 takes pass, and the spot takes pass 2 of 2.
- Spot checks: 3 of 3 cells met their checks (status kept).
- Pointer row (a), an extra from an earlier passed set: 36 of 36 takes closed the menu and left no ring.

## Devices and kits

- Row A and step 8: physical iPhone 14 (unit 1), iOS 26.2, Mobile Safari 26.2, Reduce Motion off.
- Step 7: physical iPhone 14 (unit 2), iOS 26.2, Mobile Safari 26.2, Reduce Motion off.
- Row B and step 6: real Pixel 8 units, Android 17, Chrome 156 or 157, as each table names them.
- Keyboard rows: real Pixel 8, Android 17, Chrome 155. Keyboard spot takes: real Pixel 8 (a second unit), Android 17, Chrome 156.
- The keyboard kit: keyboard kit v2, sha256 676df5262e1abbfc13aa36dedf73a03c3863289f13090d9dd038130d240fb11b.
- The Android kit: Android touch kit 6.3.5, package sha256 636a6f88c5c4d34812720ecc9dad4498c3eef216712bfa5b8b83fa32392388cb, run as a non-gating take on any Chrome version.

## Terms

- N is the phone as it is. S adds CPU throttling at 4x. R sets the Android animation scales to 0, and the page reports reduced motion.
- First visible: the time from the tap to the first frame that shows the menu. Gone: the time from the outside tap until the menu is gone.
- Grow and shrink frames: the fewest frames that the open's or the close's size change spans. 0 means the menu shows at full size at once.
- Held cells: a press that goes down during the open's hold must not act. A tap after the hold must act.
- In step 6, the radio cell's old-head side is its own run, because that cell runs on the new head only.
- The step 8 control is main Production 45201690, which does not have #11859's fix. It is expected to fail.
- Pointer row (a) compares the trigger box before the open and after the close. 0 changed pixels means no ring is left.

## Row A: physical iPhone 14, frames per open and close (test)

| Case | Build | Open frames per run | Close frames per run |
| --- | --- | --- | --- |
| more | 4651f211 | 6, 7, 6 | 4, 4, 4 |
| more | b01d48c1 | 7, 8, 7 | 3, 4, 4 |
| actions | 4651f211 | 6, 6, 6 | 4, 4, 3 |
| actions | b01d48c1 | 6, 7, 7 | 4, 4, 4 |
| projects | 4651f211 | 7, 6, 8 | 3, 4, 4 |
| projects | b01d48c1 | 8, 8, 6 | 4, 3, 3 |
| controlled | 4651f211 | 8, 7, 8 | 4, 4, 4 |
| controlled | b01d48c1 | 7, 7, 8 | 4, 3, 3 |

- The controlled menu's page also prints "Menu is open", so its frame counts include that text's change.
- The screen stream ran at 31.5 to 41.2 frames per second.

## Row B: real Pixel 8, six menu cells at N, R and S (test)

| Profile | Cell | Status | First visible, median ms, old → new | Gone, median ms, old → new | Grow frames, fewest, old / new | Shrink frames, fewest, old / new | Opened, closed, full size first: every run, old / new | Held cells: swallowed, acts after the hold, old / new | Runs, old / new |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N | 8080-actions | kept | 36 → 38 | 178 → 182 | 12 / 12 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| N | 8080-actions-timing-noshrink | kept | 40 → 36 | 179 → 175 | 12 / 12 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 5 / 5 |
| N | 8080-controlled | kept | 32 → 34 | 170 → 179 | 12 / 12 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| N | 8080-held-projects | kept | 36 → 29 | 3170 → 3108 | 11 / 8 | 8 / 10 | yes, yes, yes / yes, yes, yes | yes, yes / yes, yes | 2 / 2 |
| N | 8080-more | kept | 33 → 33 | 172 → 176 | 12 / 12 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| N | 8080-projects | kept | 46 → 53 | 179 → 182 | 12 / 11 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| R | 8080-actions | kept | 34 → 37 | 232 → 236 | 0 / 0 | 0 / 0 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| R | 8080-actions-timing-noshrink | kept | 36 → 32 | 238 → 227 | 0 / 0 | 0 / 0 | yes, yes, yes / yes, yes, yes | - | 5 / 5 |
| R | 8080-controlled | kept | 30 → 31 | 235 → 235 | 0 / 0 | 0 / 0 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| R | 8080-held-projects | failed | 22 → 30 | 3234 → 248 | 0 / 0 | 0 / 0 | yes, yes, yes / yes, yes, yes | yes, yes / no, no | 2 / 2 |
| R | 8080-more | kept | 30 → 28 | 229 → 236 | 0 / 0 | 0 / 0 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| R | 8080-projects | kept | 44 → 54 | 238 → 232 | 0 / 0 | 0 / 0 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| S | 8080-actions | kept | 89 → 76 | 208 → 206 | 12 / 12 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| S | 8080-actions-timing-noshrink | kept | 81 → 89 | 212 → 222 | 11 / 11 | 7 / 8 | yes, yes, yes / yes, yes, yes | - | 5 / 5 |
| S | 8080-controlled | kept | 78 → 67 | 215 → 210 | 12 / 11 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| S | 8080-held-projects | kept | 87 → 82 | 4018 → 3929 | 10 / 10 | 10 / 10 | yes, yes, yes / yes, yes, yes | yes, yes / yes, yes | 2 / 2 |
| S | 8080-more | kept | 66 → 78 | 201 → 199 | 12 / 11 | 8 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |
| S | 8080-projects | kept | 161 → 132 | 229 → 226 | 12 / 12 | 7 / 8 | yes, yes, yes / yes, yes, yes | - | 2 / 2 |

## Held projects at R: every take (test)

| Take | Device | Status | Swallowed, acts after the hold, old → new | Gone, median ms, old → new |
| --- | --- | --- | --- | --- |
| Row B take | real Pixel 8 unit C, Android 17, Chrome 157 | failed | yes, yes → no, no | 3234 → 248 |
| extra run 1 | Pixel 8 unit C | kept | yes, yes → yes, yes | 3196 → 3098 |
| extra run 2 | Pixel 8 unit C | kept | yes, yes → yes, yes | 3157 → 3183 |
| extra run 1 | Pixel 8 unit A | kept | yes, yes → yes, yes | 3145 → 3145 |
| extra run 2 | Pixel 8 unit A | failed | yes, yes → no, no | 3029 → 232 |
| extra run 1 | Pixel 8 unit B | failed | yes, yes → no, no | 3171 → 244 |
| extra run 2 | Pixel 8 unit B | failed | yes, yes → no, no | 3186 → 242 |
| spot check | Pixel 8 unit A | kept | yes, yes → yes, yes | 3114 → 3233 |

## Held projects at R: every attempt (test)

| Set | Arm | Build | Attempts | Presses in the hold | Of those, acted | Hold end, ms | Press before the hold end, ms, where it acted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| natural | natural R (pinned kit) | 4651f211 | 26 | 16 | 0 | 253–287 | - |
| natural | natural R (pinned kit) | b01d48c1 | 21 | 16 | 5 | 259–307 | 28–35 |
| forced | R + 1.5x CPU | 4651f211 | 4 | 2 | 0 | 267–280 | - |
| forced | R + 1.5x CPU | b01d48c1 | 3 | 2 | 1 | 275–305 | 37 |
| forced | R + 4x CPU | 4651f211 | 4 | 4 | 0 | 344–359 | - |
| forced | R + 4x CPU | b01d48c1 | 4 | 4 | 0 | 332–396 | - |
| forced | R + animations at 0.75x, press delay 120 ms | 4651f211 | 4 | 4 | 0 | 331–345 | - |
| forced | R + animations at 0.75x, press delay 120 ms | b01d48c1 | 4 | 4 | 0 | 334–351 | - |
| forced | R + animations at 0.75x, press delay 150 ms | 4651f211 | 9 | 8 | 0 | 329–341 | - |
| forced | R + animations at 0.75x, press delay 150 ms | b01d48c1 | 8 | 8 | 0 | 327–361 | - |
| forced | R + animations at 0.75x, press delay 160 ms | 4651f211 | 8 | 8 | 3 | 329–375 | 28–32 |
| forced | R + animations at 0.75x, press delay 160 ms | b01d48c1 | 9 | 8 | 0 | 321–348 | - |

- The forced arms run the same take code, with one profile change or one injected script each. Each attempt names its arm.

## Row C: paired first-visible medians, new − old (test)

| Device | Profile | Cell | Pairs | New − old, ms, per pair | Median, ms |
| --- | --- | --- | --- | --- | --- |
| real Pixel 8 unit D, Android 17, Chrome 157 | S | 8080-actions-timing-noshrink | 5 | 5, -10, -8, -12, -9 | -9 |
| real Pixel 8 unit D, Android 17, Chrome 157 | S | 8080-timing-more | 5 | 5, 9, 4, 7, 14 | 7 |
| real Pixel 8 unit A, Android 17, Chrome 156 | N | 8080-actions-timing-noshrink | 5 | -8, -3, -4, -9, -3 | -4 |
| real Pixel 8 unit C, Android 17, Chrome 157 | R | 8080-actions-timing-noshrink | 5 | -2, -4, -7, -3, -5 | -4 |
| real Pixel 8 unit D, Android 17, Chrome 157 | S | 8080-actions-timing-noshrink | 5 | -4, 8, 6, 4, 8 | 6 |

## #11859 step 6: real Pixel 8 (test)

| Profile | Cell | Old head: closed, cancelled, runs touched beneath, runs | New head: closed, cancelled, runs touched beneath, runs |
| --- | --- | --- | --- |
| N | 11859-pick-busy | yes, yes, 0, 2 | yes, yes, 0, 2 |
| N | 11859-pick-plain | yes, yes, 0, 2 | yes, yes, 0, 2 |
| N | 11859-radio-busy | yes, yes, 0, 2 (its own run) | yes, yes, 0, 2 |
| S | 11859-pick-busy | yes, yes, 0, 2 | yes, yes, 0, 2 |
| S | 11859-pick-plain | yes, yes, 0, 2 | yes, yes, 0, 2 |
| S | 11859-radio-busy | yes, yes, 0, 2 (its own run) | yes, yes, 0, 2 |
| R | 11859-pick-busy | yes, yes, 0, 2 | yes, yes, 0, 2 |
| R | 11859-pick-plain | yes, yes, 0, 2 | yes, yes, 0, 2 |
| R | 11859-radio-busy | yes, yes, 0, 2 (its own run) | yes, yes, 0, 2 |

## #11859 step 7: physical iPhone 14 (test)

| Take | Build | Nothing beneath | Pick at the lift | Picked touchend reached the document | Move to: touchend cancelled | Menu closed | Beneath |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 4651f211-r1 | 4651f211 | yes | yes | no | yes | yes | nothing |
| 4651f211-r2 | 4651f211 | no | yes | no | yes | yes | click:BODY@page |
| 4651f211-r3 | 4651f211 | yes | yes | no | yes | yes | nothing |
| b01d48c1-r1 | b01d48c1 | yes | yes | no | yes | yes | nothing |
| b01d48c1-r2 | b01d48c1 | yes | yes | no | yes | yes | nothing |
| b01d48c1-r3 | b01d48c1 | yes | yes | no | yes | yes | nothing |
| d93fa3db-r1 | d93fa3db | yes | yes | no | yes | yes | nothing |
| d93fa3db-r2 | d93fa3db | yes | yes | no | yes | yes | nothing |
| d93fa3db-r3 | d93fa3db | yes | yes | no | yes | yes | nothing |
| ff541aa9-r1 | ff541aa9 | yes | yes | no | yes | yes | nothing |
| ff541aa9-r2 | ff541aa9 | yes | yes | no | yes | yes | nothing |
| ff541aa9-r3 | ff541aa9 | yes | yes | no | yes | yes | nothing |

## #11859 step 8: physical iPhone 14 (test)

| Take | Build | Result | Touchend cancelled | Touchend − pointerup, ms | Click beneath, ms after the touchend |
| --- | --- | --- | --- | --- | --- |
| d93fa3db-r1 | d93fa3db | NOTHING BENEATH ACTS | yes | 600 | - |
| d93fa3db-r2 | d93fa3db | NOTHING BENEATH ACTS | yes | 600 | - |
| d93fa3db-r3 | d93fa3db | NOTHING BENEATH ACTS | yes | 600 | - |
| ff541aa9-r1 | ff541aa9 | NOTHING BENEATH ACTS | yes | 600 | - |
| ff541aa9-r2 | ff541aa9 | NOTHING BENEATH ACTS | yes | 601 | - |
| ff541aa9-r3 | ff541aa9 | NOTHING BENEATH ACTS | yes | 600 | - |
| main-r1 | 45201690 | BENEATH ACTS: beneath click | no | 600 | 4 |
| main-r2 | 45201690 | NOTHING BENEATH ACTS | no | 600 | - |
| main-r3 | 45201690 | BENEATH ACTS: beneath click | no | 600 | 3 |

## Keyboard rows (test)

| Row | Build | Takes that pass |
| --- | --- | --- |
| escape | 4651f211 | 3 of 3 |
| escape | b01d48c1 | 3 of 3 |
| escape | d93fa3db | 3 of 3 |
| escape | ff541aa9 | 3 of 3 |
| tab | 4651f211 | 3 of 3 |
| tab | b01d48c1 | 3 of 3 |
| tab | d93fa3db | 3 of 3 |
| tab | ff541aa9 | 3 of 3 |
| typeahead | 4651f211 | 3 of 3 |
| typeahead | b01d48c1 | 3 of 3 |
| typeahead | d93fa3db | 3 of 3 |
| typeahead | ff541aa9 | 3 of 3 |
| spot: tab-b01d48c1-p2 | b01d48c1 | 1 of 1 |
| spot: tab-ff541aa9-p2 | ff541aa9 | 1 of 1 |

## Spot checks (test)

| Cell | Profile | Status | Summary, old → new |
| --- | --- | --- | --- |
| 8080-actions | R | kept | gone 237 → 233 ms; first visible 33 → 35 ms |
| 8080-held-projects | R | kept | gone 3114 → 3233 ms; first visible 28 → 27 ms |
| 11859-pick-busy | N | kept | closed yes → yes; cancelled yes → yes; touched beneath 0 → 0 |

## Pointer row (a), from an earlier passed set (test)

| Kind | Build | Takes | Menu closed | Trigger-box pixels changed | No ring under the pointer |
| --- | --- | --- | --- | --- | --- |
| outside | 4651f211 | 3 | 3 | 0 of 52920 | 3 |
| outside | b01d48c1 | 3 | 3 | 0 of 52920 | 3 |
| outside | d93fa3db | 3 | 3 | 0 of 52920 | 3 |
| outside | ff541aa9 | 3 | 3 | 0 of 52920 | 3 |
| pick | 4651f211 | 3 | 3 | 0 of 52920 | 3 |
| pick | b01d48c1 | 3 | 3 | 0 of 52920 | 3 |
| pick | d93fa3db | 3 | 3 | 0 of 52920 | 3 |
| pick | ff541aa9 | 3 | 3 | 0 of 52920 | 3 |
| repress | 4651f211 | 3 | 3 | 0 of 52920 | 3 |
| repress | b01d48c1 | 3 | 3 | 0 of 52920 | 3 |
| repress | d93fa3db | 3 | 3 | 0 of 52920 | 3 |
| repress | ff541aa9 | 3 | 3 | 0 of 52920 | 3 |

## Stills

- `dec31-8080-rowA-more-open-frames.png`: #8080 Row A, the More menu's open on the physical iPhone 14, old 4651f211 r1 against new b01d48c1 r1.
- It shows every distinct frame of the screen stream, from the last closed frame to the settled menu, cropped to the menu.
- Each frame shows its share of the open menu's box. The record counts 6 open frames on the old head and 7 on the new head.
- `dec31-keyboard-escape-old-vs-new.png`: the keyboard row's Escape on the real Pixel 8, at Tab, Enter and Escape, old 4651f211 against new b01d48c1.
- The stills keep their pixels. Only their tIME, caNv and text chunks are removed.

## Files

- `dec31-rows-public.json`: the source data for every number here, unchanged.
- The two stills above.
