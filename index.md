# DEC-31 stack evidence: #8080 at a5cfd2a9 and #11859 at 128a529d, against the heads passed in review

#8080: new a5cfd2a9996e3f25a4c6f86d224afb79bafd7818, old b01d48c1e6f331dbd948568234cc753663fdea53. #11859: new 128a529dabdea3cd7717734bb218f664629fd965, old ff541aa9a1a9d941d1e26a9b0d67156b7c3d99d8. All numbers are test measurements.

- Both new heads merge main at 3b1719aa1bdfa2b86bdd3fcb51184727abf48973, which holds #13436 and #13526. The old heads are the ones passed in review.
- This follows the [earlier DEC-31 index](https://github.com/vjeux/astryx/blob/318b3083346af8d5ec299487532e0afbc2aadb4c/index.md) to the stack's final heads.
- Each take reads every build's `version.json` on the phone first. Each row runs on one device in one session, with the builds interleaved.

## Answer (test)

- Every row passed in review shows no major difference between the old and new heads, on a physical iPhone 14 and real Pixel 8 phones.
- The held-Projects re-count at the new heads: no press stamped in the hold acted.
- At N, that is 0 of 34 on #8080 and 0 of 34 on #11859. At R, with reduced motion, it is 0 of 38 and 0 of 37.
- In 8080-held-projects at S, the open and close frame counts vary from take to take on both builds. So they are not a build difference.
- #12888: the passed rows open no bottom sheet at any head, and the drill-in control renders one at every head.
- In #12888's own sheet case, a row pull under `pinch-zoom` moves the sheet 0 px at the new heads. At the old heads, it moves 49.2 to 49.3 px.
- That difference is main's intended change, not the stack's.
- Keyboard rows: all 36 takes pass. They ran at the previous heads, 47b1104b and 948472f7, and carry over.

## Summary: old against new, per row and device (test)

| PR | Row | Device | Old | New | Difference |
| --- | --- | --- | --- | --- | --- |
| #8080 | Row A: grow/shrink frames, more / controlled / actions / projects, 3 takes each | physical iPhone 14 unit G (iOS 26.2) | open 6–8 frames, close 3–4 | open 5–9, close 3–4 | see the Row A table |
| #8080 | Row B: six menu cells, profile N | Pixel 8 unit D (build CP3A.260905.009), Chrome 157.0.8103.78 | opens/closes: 6/6 cells | 6/6; 6/6 kept | first-visible median, new − old: -10–3 ms per cell |
| #8080 | Row B: six menu cells, profile R | Pixel 8 unit D (build CP3A.260905.009), Chrome 157.0.8103.78 | opens/closes: 6/6 cells | 6/6; 6/6 kept | first-visible median, new − old: -4–11 ms per cell |
| #8080 | Row B: six menu cells, profile S | Pixel 8 unit D (build CP3A.260905.009), Chrome 157.0.8103.78; Pixel 8 unit H (build CP3A.260905.009), Chrome 156.0.8078.79 (3 cells each; see the note) | opens/closes: 6/6 cells | 6/6; 6/6 kept | first-visible median, new − old: -20–20 ms per cell |
| #8080 | Row C: paired first-visible medians, new − old | Pixel 8 unit H (build CP3A.260905.009), Chrome 156.0.8078.79 | old b01d48c1 | new a5cfd2a9 | 8080-actions-timing-noshrink: 1 ms (5 pairs); 8080-timing-more: -4 ms (5 pairs) |
| #11859 | Step 9 (= step 6 cells), profile N | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 | touchend cancelled, menu closed, nothing beneath: 3/3 cells | 3/3; 3/3 kept | none |
| #11859 | Step 9 (= step 6 cells), profile S | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 | touchend cancelled, menu closed, nothing beneath: 3/3 cells | 3/3; 3/3 kept | none |
| #11859 | Step 9 (= step 6 cells), profile R | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 | touchend cancelled, menu closed, nothing beneath: 3/3 cells | 3/3; 3/3 kept | none |
| #11859 | Step 9 spot check: busy pick at N, a second Pixel 8 | Pixel 8 unit C (build CP3A.260905.009), Chrome 155.0.8059.87 | pass | pass | none (first attempt: page-load stall, re-taken) |
| #11859 | Step 10 (= step 7): Submenu pick, 3 takes | physical iPhone 14 unit E | 3/3 all four measures | 3/3 | none |
| #11859 | Step 11 (= step 8): pick + 600 ms task, full-screen button beneath, 3 takes | physical iPhone 14 unit E | 3/3 nothing beneath + touchend cancelled | 3/3 | none (main 3b1719aa control: touchend cancelled 0/3, click beneath 0/3) |

- Unit letters name the phones within this run. The held-Projects re-count uses its own letters.

## #8080 Row A: physical iPhone 14, frames per open and close (test)

| Case | Build | Open frames | Close frames |
| --- | --- | --- | --- |
| more | old b01d48c1 | 8 / 8 / 7 | 3 / 4 / 4 |
| more | new a5cfd2a9 | 8 / 8 / 7 | 4 / 3 / 3 |
| controlled | old b01d48c1 | 6 / 7 / 8 | 4 / 4 / 3 |
| controlled | new a5cfd2a9 | 7 / 8 / 8 | 4 / 4 / 3 |
| actions | old b01d48c1 | 7 / 7 / 7 | 3 / 3 / 4 |
| actions | new a5cfd2a9 | 6 / 6 / 7 | 3 / 3 / 3 |
| projects | old b01d48c1 | 8 / 6 / 6 | 3 / 4 / 3 |
| projects | new a5cfd2a9 | 9 / 8 / 5 | 4 / 3 / 3 |

- The frames are distinct frames of the phone's own screen stream, not times.

## #8080 Rows B and C: real Pixel 8, the six menu cells (test)

| Cell | Profile | Status | Old b01d48c1 | New a5cfd2a9 | Pairs |
| --- | --- | --- | --- | --- | --- |
| 8080-actions | N | kept | fv 42 ms, grow 12, gone 176 ms, shrink 8, runs 2 | fv 32 ms, grow 12, gone 177 ms, shrink 8, runs 2 |  |
| 8080-actions-timing-noshrink | N | kept | fv 40 ms, grow 12, gone 176 ms, shrink 8, runs 5 | fv 35 ms, grow 12, gone 176 ms, shrink 8, runs 5 | median -5 ms over 5 pairs |
| 8080-controlled | N | kept | fv 33 ms, grow 12, gone 178 ms, shrink 8, runs 2 | fv 31 ms, grow 12, gone 178 ms, shrink 8, runs 2 |  |
| 8080-held-projects | N | kept | fv 28 ms, grow 12, gone 3113 ms, shrink 8, runs 2 | fv 29 ms, grow 12, gone 3073 ms, shrink 8, runs 2 |  |
| 8080-more | N | kept | fv 33 ms, grow 12, gone 175 ms, shrink 8, runs 2 | fv 34 ms, grow 12, gone 175 ms, shrink 8, runs 2 |  |
| 8080-projects | N | kept | fv 51 ms, grow 12, gone 188 ms, shrink 9, runs 2 | fv 54 ms, grow 12, gone 194 ms, shrink 8, runs 2 |  |
| 8080-actions | R | kept | fv 35 ms, grow 0, gone 241 ms, shrink 0, runs 2 | fv 36 ms, grow 0, gone 238 ms, shrink 0, runs 2 |  |
| 8080-actions-timing-noshrink | R | kept | fv 37 ms, grow 0, gone 232 ms, shrink 0, runs 5 | fv 33 ms, grow 0, gone 237 ms, shrink 0, runs 5 | median -3 ms over 5 pairs |
| 8080-controlled | R | kept | fv 32 ms, grow 0, gone 226 ms, shrink 0, runs 2 | fv 43 ms, grow 0, gone 238 ms, shrink 0, runs 2 |  |
| 8080-held-projects | R | kept | fv 32 ms, grow 0, gone 3145 ms, shrink 0, runs 2 | fv 34 ms, grow 0, gone 3137 ms, shrink 0, runs 2 |  |
| 8080-more | R | kept | fv 29 ms, grow 0, gone 223 ms, shrink 0, runs 2 | fv 35 ms, grow 0, gone 235 ms, shrink 0, runs 2 |  |
| 8080-projects | R | kept | fv 52 ms, grow 0, gone 235 ms, shrink 0, runs 2 | fv 51 ms, grow 0, gone 250 ms, shrink 0, runs 2 |  |
| 8080-actions | S | kept | fv 107 ms, grow 12, gone 239 ms, shrink 7, runs 2 | fv 103 ms, grow 12, gone 234 ms, shrink 8, runs 2 |  |
| 8080-held-projects | S | kept | fv 99 ms, grow 8, gone 4247 ms, shrink 12, runs 2 | fv 119 ms, grow 1, gone 4210 ms, shrink 18, runs 2 |  |
| 8080-more | S | failed | fv ? ms, grow ?, gone ? ms, shrink ?, runs ? | fv ? ms, grow ?, gone ? ms, shrink ?, runs ? |  |
| 8080-projects | S | kept | fv 160 ms, grow 12, gone 260 ms, shrink 8, runs 2 | fv 170 ms, grow 12, gone 270 ms, shrink 8, runs 2 |  |
| 8080-actions-timing-noshrink | S | kept | fv 117 ms, grow 12, gone 248 ms, shrink 8, runs 5 | fv 99 ms, grow 12, gone 230 ms, shrink 8, runs 5 | median -18 ms over 5 pairs |
| 8080-controlled | S | kept | fv 89 ms, grow 12, gone 252 ms, shrink 8, runs 2 | fv 69 ms, grow 12, gone 228 ms, shrink 7, runs 2 |  |
| 8080-more | S | kept | fv 92 ms, grow 12, gone 229 ms, shrink 8, runs 2 | fv 91 ms, grow 12, gone 258 ms, shrink 8, runs 2 |  |
| 8080-actions-timing-noshrink | S | kept | fv 116 ms, grow 11, gone 231 ms, shrink 8, runs 5 | fv 107 ms, grow 12, gone 236 ms, shrink 8, runs 5 | median 1 ms over 5 pairs |
| 8080-timing-more | S | kept | fv 97 ms, grow 12, gone 239 ms, shrink 7, runs 5 | fv 89 ms, grow 12, gone 252 ms, shrink 8, runs 5 | median -4 ms over 5 pairs |

- "fv" is the time to the first visible frame. "grow" and "shrink" count the frames of the size change. "gone" is the time to the frame without the menu.
- At S, unit D left the device pool during 8080-more. That take failed, so it is listed but not counted.
- 8080-more, 8080-controlled and 8080-actions-timing-noshrink at S, and the S pairs, then ran on unit H.

| Take | Verdict | Device |
| --- | --- | --- |
| 8080-N | `VERDICT: PASS (N: 6/6 cells kept; 0 problem(s))` | Pixel 8 unit D (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 8080-R | `VERDICT: PASS (R: 6/6 cells kept; 0 problem(s))` | Pixel 8 unit D (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 8080-S | `VERDICT: FAIL (S: no complete run; 0 problem(s))` | Pixel 8 unit D (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 8080-S-rest | `VERDICT: PASS (S: 3/3 cells kept; 0 problem(s))` | Pixel 8 unit H (build CP3A.260905.009), Chrome 156.0.8078.79 |
| 8080-S-pairs | `VERDICT: PASS (S: 2/2 cells kept; 0 problem(s))` | Pixel 8 unit H (build CP3A.260905.009), Chrome 156.0.8078.79 |
| 11859-N | `VERDICT: PASS (N: 3/3 cells kept; 0 problem(s))` | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 11859-S | `VERDICT: PASS (S: 3/3 cells kept; 0 problem(s))` | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 11859-R | `VERDICT: PASS (R: 3/3 cells kept; 0 problem(s))` | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 11859-radio-old-N | `VERDICT: PASS (N: 1/1 cells kept; 0 problem(s))` | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 11859-radio-old-S | `VERDICT: PASS (S: 1/1 cells kept; 0 problem(s))` | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 |
| 11859-radio-old-R | `VERDICT: PASS (R: 1/1 cells kept; 0 problem(s))` | Pixel 8 unit F (build CP3A.260905.009), Chrome 157.0.8103.78 |
| spot-11859-N | `VERDICT: PASS (N: 1/1 cells kept; 0 problem(s))` | Pixel 8 unit C (build CP3A.260905.009), Chrome 155.0.8059.87 |

## 8080-held-projects at S: the frame counts vary from take to take (test)

| Take | Unit | Build | Rep | Open frames (grow) | Close frames (shrink) | First visible, ms |
| --- | --- | --- | --- | --- | --- | --- |
| earlier side-by-side | Pixel 8 unit H | new 47b1104b | 1 | 8 (7) | 15 (13) | 110 |
| earlier side-by-side | Pixel 8 unit H | old b01d48c1 | 1 | 3 (2) | 22 (19) | 113 |
| earlier side-by-side | Pixel 8 unit H | old b01d48c1 | 2 | 3 (2) | 21 (18) | 173 |
| earlier side-by-side | Pixel 8 unit H | new 47b1104b | 2 | 7 (6) | 17 (14) | 101 |
| this run, first S take | Pixel 8 unit D | new a5cfd2a9 | 1 | 3 (2) | 21 (18) | 119 |
| this run, first S take | Pixel 8 unit D | old b01d48c1 | 1 | 10 (9) | 15 (12) | 114 |
| this run, first S take | Pixel 8 unit D | old b01d48c1 | 2 | 9 (8) | 16 (13) | 99 |
| this run, first S take | Pixel 8 unit D | new a5cfd2a9 | 2 | 2 (1) | 22 (19) | 183 |
| re-take 1 | Pixel 8 unit H | new a5cfd2a9 | 1 | 5 (4) | 19 (16) | 134 |
| re-take 1 | Pixel 8 unit H | old b01d48c1 | 1 | 8 (7) | 18 (15) | 110 |
| re-take 1 | Pixel 8 unit H | old b01d48c1 | 2 | 8 (7) | 17 (14) | 111 |
| re-take 1 | Pixel 8 unit H | new a5cfd2a9 | 2 | 6 (5) | 18 (15) | 106 |
| re-take 2 | Pixel 8 unit H | new a5cfd2a9 | 1 | 6 (5) | 18 (15) | 123 |
| re-take 2 | Pixel 8 unit H | old b01d48c1 | 1 | 8 (7) | 17 (14) | 110 |
| re-take 2 | Pixel 8 unit H | old b01d48c1 | 2 | 6 (5) | 18 (15) | 99 |
| re-take 2 | Pixel 8 unit H | new a5cfd2a9 | 2 | 9 (8) | 16 (13) | 101 |
| re-take 3 | Pixel 8 unit H | new a5cfd2a9 | 1 | 5 (4) | 18 (16) | 128 |
| re-take 3 | Pixel 8 unit H | old b01d48c1 | 1 | 6 (5) | 17 (14) | 110 |
| re-take 3 | Pixel 8 unit H | old b01d48c1 | 2 | 5 (4) | 18 (15) | 115 |
| re-take 3 | Pixel 8 unit H | new a5cfd2a9 | 2 | 7 (6) | 16 (13) | 105 |

- The same old build read grow 2 in the earlier side-by-side, and grow 8 or 9 in this run's first take.
- On the re-takes, both builds read in between. The held press lands at a varying point in the grow.
- On every take, the held behavior is the same: the press is held in the hold and swallowed, and a tap after the hold acts.

## #11859 steps 9 to 11 (test)

- Step 9 runs step 6's three cells on a real Pixel 8 at N, S and R. A second Pixel 8 gives a spot check.
- Step 9's rows are in the summary and the verdict table.
- Step 10 is step 7 on a physical iPhone 14: a drill-in submenu pick (Actions, then "Move to", then "Folder C").

| Take | Build | Nothing beneath acts | Pick at the lift | Picked row's touchend reached the document | "Move to" touchend cancelled | Menu closed |
| --- | --- | --- | --- | --- | --- | --- |
| s4s10-s7-ff541aa9-r1 | ff541aa9 | true | true | false | true | true |
| s4s10-s7-ff541aa9-r2 | ff541aa9 | true | true | false | true | true |
| s4s10-s7-ff541aa9-r3 | ff541aa9 | true | true | false | true | true |
| s4s10-s7-128a529d-r1 | 128a529d | true | true | false | true | true |
| s4s10-s7-128a529d-r2 | 128a529d | true | true | false | true | true |
| s4s10-s7-128a529d-r3 | 128a529d | true | true | false | true | true |

- The driver's own one-word verdict reads CHECK on every take, because its rule expects a touchend for the pick. The four measures are the record's rule.
- Step 11 is step 8 on the same iPhone 14: the pick with a 600 ms task from its pointerup and a full-screen button beneath.

| Take | Build | Result | Touchend cancelled | Touchend − pointerup | Busy span | Beneath |
| --- | --- | --- | --- | --- | --- | --- |
| s3s11-ff541aa9-r1 | ff541aa9 | NOTHING BENEATH ACTS | true | 600 ms | 600 ms | none |
| s3s11-ff541aa9-r2 | ff541aa9 | NOTHING BENEATH ACTS | true | 600 ms | 600 ms | none |
| s3s11-ff541aa9-r3 | ff541aa9 | NOTHING BENEATH ACTS | true | 600 ms | 600 ms | none |
| s3s11-128a529d-r1 | 128a529d | NOTHING BENEATH ACTS | true | 600 ms | 600 ms | none |
| s3s11-128a529d-r2 | 128a529d | NOTHING BENEATH ACTS | true | 600 ms | 600 ms | none |
| s3s11-128a529d-r3 | 128a529d | NOTHING BENEATH ACTS | true | 600 ms | 600 ms | none |
| s3s11-3b1719aa-r1 | 3b1719aa | NOTHING BENEATH ACTS | false | 600 ms | 600 ms | none |
| s3s11-3b1719aa-r2 | 3b1719aa | NOTHING BENEATH ACTS | false | 600 ms | 600 ms | none |
| s3s11-3b1719aa-r3 | 3b1719aa | NOTHING BENEATH ACTS | false | 601 ms | 601 ms | none |

- The control is main at 3b1719aa1bdfa2b86bdd3fcb51184727abf48973.

## held-Projects re-count at the new heads (test)

- Rule: in the hold means stamped more than 1 ms before the shield's `remove()` call. Within 1 ms before it, a press is after the hold by its end stamp.
- A (b)-shaped press is stamped in the hold and dispatched after the shield's `remove()` call.
- Acted means a click dispatched within 800 ms. The bar is at least 16 presses in the hold per build, on at least two Pixel 8 units, with a spot check.
- Each run pairs the two heads, as main at 3b1719aa has no Projects story.

| Profile | Build | Presses | In the hold (acted) | Of those, (b)-shaped (lateness, ms) | Boundary, within 1 ms (acted) | After the hold (acted) | Frame rate, Hz |
| --- | --- | --- | --- | --- | --- | --- | --- |
| N | #8080 a5cfd2a9 | 38 | 34 (0) | 2 (3.2–5.4) | 0 (0) | 4 (4) | 59.9–60.2 |
| N | #11859 128a529d | 41 | 34 (0) | 2 (3.1–10.1) | 0 (0) | 7 (7) | 59.9–60.2 |
| R | #8080 a5cfd2a9 | 57 | 38 (0) | 2 (4.2–4.8) | 0 (0) | 19 (19) | 59.5–60.2 |
| R | #11859 128a529d | 60 | 37 (0) | 0 (–) | 1 (0) | 22 (22) | 59.9–60.2 |

| Profile | Unit | Role | Build | In the hold (acted) | Boundary (acted) | After the hold (acted) |
| --- | --- | --- | --- | --- | --- | --- |
| R | Pixel 8 unit A | counting | #8080 a5cfd2a9 | 4 (0) | 0 (0) | 2 (2) |
| R | Pixel 8 unit A | counting | #11859 128a529d | 4 (0) | 0 (0) | 3 (3) |
| R | Pixel 8 unit B | counting | #8080 a5cfd2a9 | 16 (0) | 0 (0) | 8 (8) |
| R | Pixel 8 unit B | counting | #11859 128a529d | 15 (0) | 1 (0) | 7 (7) |
| R | Pixel 8 unit C | counting | #8080 a5cfd2a9 | 14 (0) | 0 (0) | 8 (8) |
| R | Pixel 8 unit C | counting | #11859 128a529d | 14 (0) | 0 (0) | 9 (9) |
| R | Pixel 8 unit D | spot check | #8080 a5cfd2a9 | 4 (0) | 0 (0) | 1 (1) |
| R | Pixel 8 unit D | spot check | #11859 128a529d | 4 (0) | 0 (0) | 3 (3) |
| N | Pixel 8 unit A | counting | #8080 a5cfd2a9 | 14 (0) | 0 (0) | 1 (1) |
| N | Pixel 8 unit A | counting | #11859 128a529d | 14 (0) | 0 (0) | 3 (3) |
| N | Pixel 8 unit E | counting | #8080 a5cfd2a9 | 16 (0) | 0 (0) | 1 (1) |
| N | Pixel 8 unit E | counting | #11859 128a529d | 16 (0) | 0 (0) | 4 (4) |
| N | Pixel 8 unit D | spot check | #8080 a5cfd2a9 | 4 (0) | 0 (0) | 2 (2) |
| N | Pixel 8 unit D | spot check | #11859 128a529d | 4 (0) | 0 (0) | 0 (0) |

- No press in the hold acted. The one boundary press, on #11859 on unit B, was stamped 0.4 ms before `remove()` and was held.
- Three runs gave no take and are not counted: a device left early, a page load stalled, and a preflight could not reach its device.

## Keyboard rows, carried from the previous heads (test)

| Row | b01d48c1 (old #8080) | 47b1104b (#8080, previous head) | ff541aa9 (old #11859) | 948472f7 (#11859, previous head) |
| --- | --- | --- | --- | --- |
| escape | 3/3 PASS | 3/3 PASS | 3/3 PASS | 3/3 PASS |
| tab | 3/3 PASS | 3/3 PASS | 3/3 PASS | 3/3 PASS |
| typeahead | 3/3 PASS | 3/3 PASS | 3/3 PASS | 3/3 PASS |

- A take passes when the driver's explicit rules and a separate page-pixel verifier both pass. All of them ran on one real Pixel 8, Android 17, Chrome 157.
- Since those heads, the only runtime changes in the menu, hold, motion and sheet code are #13526, which holds pointer input only, and #9763.

## What main changed since the heads passed in review

Since the heads passed in review, b01d48c1 and ff541aa9, main merged 117 commits into both. In the menu, hold, motion and sheet code these cells run, four change runtime code.

They are #13436, #13526, #9763 and #12888. Other merged changes reach shared code these cells also run, such as the hit area's read of settling animations (#13124) and prop merging (#12173).

#13212 changes `motion/animatedLayout.ts`, which a menu loads only with its bottom-sheet presentation. No passed cell renders one.

### #13436 and #13526, `Layer/inputHold.ts`

- #13436 holds a press that went down during an input hold but arrives after a long task ends that hold.
- #13526 also holds such a press after a release in time, for two of the hold's frame intervals.
- With #13526, a finger's or a pen's pointerdown and touchstart get one verdict.
- The menus' entrance holds use this hold, so it reaches every held cell, the held Projects cell included.

### #9763, `motion/animator.ts` and `motion/reducedMotion.ts`

- The animator and the reduced-motion fade now call `reducesMotion`. It reads the person's Reduce Motion setting, or a theme's `reducedMotion: 'always'` mark.
- Before, each made the same two reads in two calls. So for any page, the answer is the same as before.
- No public theme can set `'always'` yet. On every page these cells load, motion follows the person's setting alone.
- The animator runs every menu's grow and fade, so this reaches every animated cell.

### #12888, `utils/scrollView.ts` and `BottomSheet/useSheetGestures.ts`

- In `utils/scrollView.ts`, `touchActionAllowsPan` takes an optional `boundary`, and its walk stops before it. Without one, the walk is the same as before.
- `isInsideScrollView`, the one export of that file that `hooks/useMenuPress.ts` uses, is byte-identical at the old and new heads.
- `Layer/outsidePress.ts` calls `touchActionAllowsPan` at line 164 and passes no `boundary`.
- The behavior change is in `BottomSheet/useSheetGestures.ts`. A sheet's body drag now leaves a touch on content that allows no one-finger pan, such as a menu's fitting rows.
- So it reaches a menu only when the menu, or other content, sits inside a bottom sheet. A sheet-presented menu's rows declare `auto`, so it leaves them alone.
- On a real Pixel 8 (test), a check opened each menu surface of the passed cells: 6 for #8080's heads and 7 for #11859's.
- No surface rendered a bottom sheet at any head. The positive control, the compact drill-in menu, rendered one at every head.
- In #12888's own sheet case (`core-bottomsheet--showcase`), the same Pixel 8 pulled a row 100 px up.
- Under `pinch-zoom`, the sheet moved 0 px at #8080's new head, a5cfd2a999, and 49 px at its old head, b01d48c1e6.
- Under `pan-y pinch-zoom` and `pan-x`, it moved 49 px at both. #11859's heads, 128a529dab and ff541aa9a1, gave the same numbers.
- That difference is main's intended change, not the stack's.


### #12888 on the phone (test)

| Pair | Device | Passed-row surfaces opened, new / old | A sheet on any of them, new / old | The drill-in control renders a sheet, new / old | Verdict |
| --- | --- | --- | --- | --- | --- |
| #8080: a5cfd2a9 vs b01d48c1 | Pixel 8 unit H | 6 / 6 | 0 / 0 | true / true | `VERDICT: PASS (N: 1/1 cells kept; 0 problem(s))` |
| #11859: 128a529d vs ff541aa9 | Pixel 8 unit H | 7 / 7 | 0 / 0 | true / true | `VERDICT: PASS (N: 1/1 cells kept; 0 problem(s))` |

| Pair | Device | touch-action | New, CSS px per rep | Old, CSS px per rep |
| --- | --- | --- | --- | --- |
| #8080: a5cfd2a9 vs b01d48c1 | Pixel 8 unit H | `pinch-zoom` | 0, 0, 0 | 49.2, 49.2, 49.2 |
| #8080: a5cfd2a9 vs b01d48c1 | Pixel 8 unit H | `pan-y pinch-zoom` | 49.2, 49.2, 49.2 | 49.3, 49.2, 49.2 |
| #8080: a5cfd2a9 vs b01d48c1 | Pixel 8 unit H | `pan-x` | 49.2, 49.2, 49.2 | 49.3, 49.3, 49.3 |
| #11859: 128a529d vs ff541aa9 | Pixel 8 unit H | `pinch-zoom` | 0, 0, 0 | 49.3, 49.2, 49.2 |
| #11859: 128a529d vs ff541aa9 | Pixel 8 unit H | `pan-y pinch-zoom` | 49.3, 49.2, 49.3 | 49.2, 49.2, 49.2 |
| #11859: 128a529d vs ff541aa9 | Pixel 8 unit H | `pan-x` | 49.2, 49.2, 49.2 | 49.2, 49.2, 49.3 |

- The no-sheet check opens every surface the passed rows open and looks for a sheet. The drill-in control is a positive control.
- The pull moves one finger 100 CSS px on a row of #12888's own sheet case, `core-bottomsheet--showcase`.

## Devices and kits

- Real Pixel 8 phones, Android 17, build CP3A.260905.009, with Chrome 155, 156 or 157 as each row names it.
- Physical iPhone 14 phones, iOS 26.2, Mobile Safari 26.2.
- The Android touch kit 6.3.8, run unchanged. The kit copies that add the sheet checks are labelled where they appear.
- The keyboard kit v2, sha256 676df5262e1abbfc13aa36dedf73a03c3863289f13090d9dd038130d240fb11b.

## Files

- `dec31-final-public.json`: every row on this page, the keyboard judge and verifier rows, the #12888 runs and the code-reading section.
- `heldprojects-recount-presses.json`: all 196 presses of the held-Projects re-count, with each rule's reading and the click.
