# #13436 on an Android emulator: a press that lands during an input hold but arrives late

Fix: 2b75997fd0ace2e9f511ef89e1f54452940fe518, #11859's head ff541aa9 plus #13436's five files. No fix: ff541aa9a1a9d941d1e26a9b0d67156b7c3d99d8, #11859's head. All numbers are test measurements.

The case is #8080's held-Projects menu on the sandbox page `menu-grow-cases`. A second press lands while the menu's input hold is on, and it must not act. A late press is one stamped before the hold's release (its pointerdown `timeStamp`) and dispatched after it.

## Answer (test)

- Forced busy work in the release's timer task makes late presses. The fix holds all of them: 13 late cases, 0 acted (R 1, S 8, N 4).
- Without the fix, the same arm gives 14 late cases, and all 14 acted (R 4, S 7, N 3). Each one picked the row "Project 1".
- With no forced task, S still gave one late case without the fix. It was stamped at 708.6 ms, the release came at 709.8 ms, it was dispatched at 739 ms, and it acted.
- In the same S runs, the fix had 18 presses stamped before the release, and none acted.
- In the runs that log timeStamps, every fix press that acts was stamped after the release (5 presses). That is a correct tap after the hold.
- In 13 of 17 profile and arm pairs, no press in the hold acts on either build. The other 4 are the three forced-late pairs and S's late window with an instant tap.
- In those 4, only the no-fix build's late presses act. In R and N, no press in the hold acts in the natural, forced-long-hold and late-window arms.

## The test kit's cell verdicts

- The kit marks most forced-late cells "failed". That is the positive control, not a failure of the fix.
- The kit's pass rule needs every held press swallowed on both sides. In 7 of the 9 forced-late cells, the no-fix build's late presses acted, so the no-fix side failed. The other 2 passed.
- One cell failed on the fix side: S, a 120 ms press at 450 ms. Its first held press was dispatched 6.3 ms after the release, onto the row, and it acted.
- The kit counts that as a held press that acted, with no tap after the hold.
- That run logs no timeStamps, so this take cannot class that press by its stamp. The re-take of the same cell with timeStamps passed.
- The first S natural take has no result for one side, as a second take started in the same browser. Its re-take passed.

| Cell | Profile | Verdict | The side that failed |
| --- | --- | --- | --- |
| `8080-held-projects-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d150-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d160-log.R.a1` | R | passed | - |
| `8080-held-projects-log.N.a1` | N | passed | - |
| `8080-held-projects-slow75d150-log.N.a1` | N | passed | - |
| `8080-held-projects-slow75d160-log.N.a1` | N | passed | - |
| `8080-held-projects-log.S.a1` | S | failed | neither (the take had no result for one side) |
| `8080-held-projects-slow75d150-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d160-log.S.a1` | S | passed | - |
| `8080-held-projects-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d250-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d260-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d270-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d280-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d255p100-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d265p100-log.R.a1` | R | passed | - |
| `8080-held-projects-slow75d300p100-log.N.a1` | N | passed | - |
| `8080-held-projects-slow75d310p100-log.N.a1` | N | passed | - |
| `8080-held-projects-slow75d430p120-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d450p120-log.S.a1` | S | failed | fix |
| `8080-held-projects-slow75d440-ts-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d440p120-ts-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d450-ts-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d450p120-ts-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d460-ts-log.S.a1` | S | passed | - |
| `8080-held-projects-slow75d460p120-ts-log.S.a1` | S | passed | - |
| `8080-held-projects-forcedT235-R-log.R.a1` | R | failed | no fix |
| `8080-held-projects-forcedT250-R-log.R.a1` | R | failed | no fix |
| `8080-held-projects-forcedT265-R-log.R.a1` | R | passed | - |
| `8080-held-projects-forcedT440-S-log.S.a1` | S | failed | no fix |
| `8080-held-projects-forcedT460-S-log.S.a1` | S | failed | no fix |
| `8080-held-projects-forcedT480-S-log.S.a1` | S | failed | no fix |
| `8080-held-projects-forcedT265-N-log.N.a1` | N | failed | no fix |
| `8080-held-projects-forcedT280-N-log.N.a1` | N | failed | no fix |
| `8080-held-projects-forcedT295-N-log.N.a1` | N | passed | - |
| `8080-held-projects-forced210-R-log.R.a1` | R | passed | - |
| `8080-held-projects-forced225-R-log.R.a1` | R | passed | - |
| `8080-held-projects-forcedB200-R-log.R.a1` | R | passed | - |
| `8080-held-projects-forcedC255-R-log.R.a1` | R | passed | - |

## Late cases, in the runs with timeStamps (test)

| Design | Profile | Build | Presses | Stamped before the release: held / acted | Late cases | Late cases that acted | Stamped after the release, acted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| late window, no forced task (timestamp re-take) | S | fix 2b75997f | 19 | 18 / 0 | 0 | **0** | 1 |
| late window, no forced task (timestamp re-take) | S | no fix ff541aa9 | 20 | 18 / 1 | 1 | **1** | 1 |
| forced late: 100 ms busy work in the release's timer task | R | fix 2b75997f | 12 | 12 / 0 | 1 | **0** | 0 |
| forced late: 100 ms busy work in the release's timer task | R | no fix ff541aa9 | 12 | 8 / 4 | 4 | **4** | 0 |
| forced late: 100 ms busy work in the release's timer task | N | fix 2b75997f | 12 | 12 / 0 | 4 | **0** | 0 |
| forced late: 100 ms busy work in the release's timer task | N | no fix ff541aa9 | 12 | 9 / 3 | 3 | **3** | 0 |
| forced late: 100 ms busy work in the release's timer task | S | fix 2b75997f | 15 | 12 / 0 | 8 | **0** | 3 |
| forced late: 100 ms busy work in the release's timer task | S | no fix ff541aa9 | 18 | 6 / 7 | 7 | **7** | 5 |

- "Held" means the press did not act. A late case that acts is the defect, and an act stamped after the release is a correct tap.
- In the forced arm, many presses on both builds were dispatched before the release and landed on the shield.
- With the fix, that is R 11 of 12, N 8 of 12 and S 4 of 15. Without it, R 8 of 12, N 9 of 12 and S 6 of 18.
- The run record also reports that no press had its pointerdown and touchstart stamps on opposite sides of the release. The per-press file does not carry the touchstart stamps.

## Every arm (test)

| Profile | Arm | Build | Presses | In the hold | On the shield | In-hold presses that act | Late cases (acted) | Hold, ms | Press before the hold's end, ms | Tap after the hold: acted / taken |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R | natural | fix 2b75997f | 2 | 2 | 2 | **0** | not logged | 245.8 to 246.8 | 116.6 to 121.7 | 2 / 2 |
| R | natural | no fix ff541aa9 | 2 | 2 | 2 | **0** | not logged | 247.8 to 260.3 | 123.3 to 130.9 | 2 / 2 |
| R | forced long hold | fix 2b75997f | 4 | 4 | 4 | **0** | not logged | 307.7 to 317.6 | 140.4 to 158 | 4 / 4 |
| R | forced long hold | no fix ff541aa9 | 4 | 4 | 4 | **0** | not logged | 300.2 to 313.8 | 138 to 148.7 | 4 / 4 |
| R | late window, instant tap | fix 2b75997f | 8 | 8 | 8 | **0** | not logged | 300.2 to 318.1 | 11.2 to 54.5 | 8 / 8 |
| R | late window, instant tap | no fix ff541aa9 | 8 | 8 | 8 | **0** | not logged | 294.2 to 316.6 | 14.3 to 51.7 | 8 / 8 |
| R | late window, 100 ms press | fix 2b75997f | 4 | 4 | 4 | **0** | not logged | 373.2 to 387.6 | 107.2 to 115.6 | 4 / 4 |
| R | late window, 100 ms press | no fix ff541aa9 | 4 | 4 | 4 | **0** | not logged | 369.3 to 388.5 | 104.2 to 114.8 | 4 / 4 |
| R | forced late: 100 ms busy work in the release's timer task | fix 2b75997f | 12 | 12 | 11 | **0** | 1 (0) | 321.7 to 339.4 | -1.7 to 16.3 | 12 / 12 |
| R | forced late: 100 ms busy work in the release's timer task | no fix ff541aa9 | 12 | 12 | 8 | **4** | 4 (4) | 321.2 to 343.2 | -1.7 to 18.2 | 8 / 8 |
| R | forced, rejected design: a page task before the release | fix 2b75997f | 6 | 6 | 6 | **0** | 0 (0) | 304.8 to 307.5 | 3.9 to 6.6 | 6 / 6 |
| R | forced, rejected design: a page task before the release | no fix ff541aa9 | 6 | 6 | 6 | **0** | 0 (0) | 306.1 to 307.9 | 5.3 to 7 | 6 / 6 |
| R | forced, rejected design: busy work on a menu animation's finish | fix 2b75997f | 3 | 3 | 3 | **0** | 0 (0) | 238.4 to 241.3 | 30.4 to 32 | 3 / 3 |
| R | forced, rejected design: busy work on a menu animation's finish | no fix ff541aa9 | 3 | 3 | 3 | **0** | 0 (0) | 237.4 to 242.3 | 28.1 to 32.9 | 3 / 3 |
| R | forced, rejected design: a busy animation frame first | fix 2b75997f | 4 | 3 | 3 | **0** | 0 (0) | 231.1 to 349.9 | -109 to 216.5 | 4 / 4 |
| R | forced, rejected design: a busy animation frame first | no fix ff541aa9 | 4 | 3 | 3 | **0** | 0 (0) | 215.4 to 354.6 | -114.4 to 202 | 4 / 4 |
| N | natural | fix 2b75997f | 2 | 2 | 2 | **0** | not logged | 265.6 to 269.4 | 138 to 139.3 | 2 / 2 |
| N | natural | no fix ff541aa9 | 2 | 2 | 2 | **0** | not logged | 265.9 to 268.3 | 136.3 to 136.6 | 2 / 2 |
| N | forced long hold | fix 2b75997f | 4 | 4 | 4 | **0** | not logged | 341.9 to 352.6 | 170.7 to 194.7 | 4 / 4 |
| N | forced long hold | no fix ff541aa9 | 4 | 4 | 4 | **0** | not logged | 343.6 to 351.3 | 181.4 to 188 | 4 / 4 |
| N | late window, 100 ms press | fix 2b75997f | 4 | 4 | 4 | **0** | not logged | 411.9 to 422.5 | 103.5 to 109.9 | 4 / 4 |
| N | late window, 100 ms press | no fix ff541aa9 | 4 | 4 | 4 | **0** | not logged | 419.7 to 435.4 | 110.9 to 116.9 | 4 / 4 |
| N | forced late: 100 ms busy work in the release's timer task | fix 2b75997f | 12 | 12 | 8 | **0** | 4 (0) | 353.4 to 363.2 | -1.6 to 5.8 | 12 / 12 |
| N | forced late: 100 ms busy work in the release's timer task | no fix ff541aa9 | 12 | 12 | 9 | **3** | 3 (3) | 353 to 363.6 | -1.7 to 15.8 | 9 / 9 |
| S | natural | fix 2b75997f | 4 | 4 | 4 | **0** | not logged | 372 to 412.2 | 207.3 to 320.4 | 4 / 4 |
| S | natural | no fix ff541aa9 | 2 | 2 | 2 | **0** | not logged | 383.3 to 386.8 | 267.8 to 276.6 | 2 / 2 |
| S | forced long hold | fix 2b75997f | 4 | 4 | 4 | **0** | not logged | 407.3 to 450.8 | 303 to 322.9 | 4 / 4 |
| S | forced long hold | no fix ff541aa9 | 4 | 4 | 4 | **0** | not logged | 433.7 to 466.2 | 308.5 to 336.2 | 4 / 4 |
| S | late window, instant tap | fix 2b75997f | 10 | 9 | 9 | **0** | 0 (0) | 400.5 to 460.3 | -44.2 to 317.4 | 10 / 10 |
| S | late window, instant tap | no fix ff541aa9 | 11 | 10 | 9 | **1** | 1 (1) | 412.6 to 466.1 | -29.2 to 323.1 | 11 / 11 |
| S | late window, 120 ms press | fix 2b75997f | 13 | 12 | 12 | **0** | 0 (0) | 426.7 to 566.6 | -6.3 to 152.7 | 12 / 12 |
| S | late window, 120 ms press | no fix ff541aa9 | 13 | 13 | 13 | **0** | 0 (0) | 532.1 to 565.2 | 127.8 to 148 | 13 / 13 |
| S | forced late: 100 ms busy work in the release's timer task | fix 2b75997f | 15 | 12 | 4 | **0** | 8 (0) | 297.7 to 517.7 | -76.1 to 208 | 15 / 15 |
| S | forced late: 100 ms busy work in the release's timer task | no fix ff541aa9 | 18 | 13 | 6 | **7** | 7 (7) | 331.5 to 494.4 | -203.6 to 353 | 11 / 11 |

- "In the hold" uses the press's timeStamp where the run logs it, and else its dispatch time.
- "Taken" counts the rows with a tap after the hold. A row has none when its held press acted.

## Setup

- Device: the Android Emulator, system image sdk_gphone64_x86_64, Android 17 (build CE2A.260420.051.A2), x86_64 under KVM, SwiftShader GPU, Pixel 7 profile (1080 × 2400 at 420 dpi).
- Browser: Chrome 145.0.7632.218, as each run recorded it. Keyboard: Gboard.
- Profiles: R has animation scale 0, and the page reports reduced motion. N has animation scale 1. S has animation scale 1 and 4× CPU throttling. Each profile runs at 1× CPU unless it says 4×.
- Each cell has 2 reps per side. Natural: the held tap comes 120 ms after the trigger tap.
- Forced long hold: page animations run at 0.75×, and the held tap comes at 150 or 160 ms.
- Late window: page animations run at 0.75×, and the held tap lands in about the hold's last 28 to 45 ms.
- Two late-window arms keep the finger down: 100 ms in R and N, and 120 ms in S.
- Forced late: a 100 ms busy wait runs in the first page timer after shield-on plus the calibrated hold minus 20 ms. The release runs in the animator's retire timer, so it lands at the end of that busy task.
- Three other forced designs gave no late case. They stay in the tables as negatives.
- Both builds ran interleaved, in one browser session per profile.

## Builds

- Fix: commit 2b75997fd0ace2e9f511ef89e1f54452940fe518, on the branch `evidence/13436-stack-plus-fix-2b75997f` of vjeux/astryx.
- Its five files are blob-equal to #13436's head e43cef468562426a5889ee4ba066bff36510a79e.
- Static build tarball sha256: 6509cec096788ffc90c9d1950ea3d26308ae568a30d7741fd8327a3506436a24.
- No fix: commit ff541aa9a1a9d941d1e26a9b0d67156b7c3d99d8. Static build tarball sha256: 87d680082c8e89e8f35ec9eaa720a7f9375edf6780a35e2894c4ca54600680a1.
- Each tarball holds Storybook and the sandbox build, with a `version.json` that names its commit. Each run read both `version.json` files first.
- The fix build's input-hold chunk carries the late-press window, and the no-fix build's does not.

## Files

- `measurements.json`: all 224 presses (111 with the fix, 113 without), every count on this page, and the cell verdicts.
