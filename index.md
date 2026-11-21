# #13436 at its exact head on Android: DropdownMenu's entrance hold and a forced late press

Head: #13436 at e43cef468562426a5889ee4ba066bff36510a79e, its own commit. Main: 0ed091c8b8c7d4b0af48a9b68507618e73227892, the head's parent. All numbers are test measurements.

This adds to the [earlier Android index for #13436](https://github.com/vjeux/astryx/blob/3353567caacc93bde62fff1a38112440a28f9d11/index.md), which tested the fix stacked on #11859. Here the pull request's exact head runs against its own base.

## Answer (test)

- Forced busy work in the menu entrance animation's `finished` reaction makes late presses. The head holds all of them, and main lets all of them act:

| Unit and profile | Head e43cef46: late cases → acted | Main 0ed091c8: late cases → acted |
| --- | --- | --- |
| Unit 1, R | 12 → **0** | 12 → **12** |
| Unit 1, N | 12 → **0** | 12 → **12** |
| Unit 1, S, first arm | 6 → **0** | 5 → **5** |
| Unit 1, S, re-armed | 10 → **0** | 9 → **9** |
| Unit 2, R | 4 → **0** | 4 → **4** |
| All | 44 → **0** | 42 → **42** |

- A late press is one whose pointerdown is stamped before the hold's release and dispatched after it. "Acted" is a click on a menu row after that press.
- On the head, no press stamped before the release acts, in any unit, profile or run.
- In S's first run, the natural hold sometimes ended before the arm time. Then no busy work ran: in 14 of the head's 24 presses and 19 of main's 24.
- Of those, 6 on the head and 7 on main were stamped after the release and acted. That is a correct tap, not a late case.
- The re-armed S run arms the busy work earlier, and the busy work ran for every one of its presses.
- Unit 2 is a second emulator, a fresh device with a different screen, on the same system image. It gives the same result as unit 1 in R.

## Builds

- The Vercel preview deploys could not be reached from the test environment. So both exact commits were built from source and served locally.
- Head: e43cef468562426a5889ee4ba066bff36510a79e. Static build tarball sha256: 45c435161e13611371f1ffc463ab80acca232d8b7402e7435b76bdd4cf2a94a1.
- Main: 0ed091c8b8c7d4b0af48a9b68507618e73227892, the head's parent and merge base. It was a Production deploy, but not the current one. Static build tarball sha256: 25ddf63076ff1c0dc237d33b18bf5fd4e1e3d1bb27ae9258cbdb3c10da4de7a2.
- Each tarball holds the Storybook build, with a `version.json` that names its commit. Every take read both `version.json` files.
- Positive control: the head's input-hold chunk carries the late-press window, and main's does not. The head's `inputHold.ts` is the fix, and main's is without it.

## Story and the hold under test

- Story: `core-dropdownmenu--tall-content-overflow`. The trigger is the button "Move to project", and the rows are the project menu items.
- The story opens its menu at load. Each take first closes it, so every measured open starts from a closed menu, with a finger tap on "Move to project".
- The hold under test is DropdownMenu's entrance hold, `holdEntranceInput`, with a coarse pointer. It waits for the entrance animations' `finished`, then releases.

## How the late press is forced

- At document start, `Animation.prototype.finished` is wrapped. Once armed, a menu entrance animation's own `finished` reaction busy-waits 100 ms.
- That reaction runs in the same microtask checkpoint as the hold's release, so the release lands at the end of the busy work.
- Per press, the busy work is armed at shield-on plus the calibrated hold minus 20 ms.
- In R and N, the held tap comes at the calibrated hold plus 5, 15 or 25 ms after the trigger tap. The finger then goes down inside the busy window.
- In S, the held tap first came at the calibrated hold plus 46, 56 or 66 ms after the trigger tap. The trigger's handler runs later at 4× CPU.
- The re-armed S run arms the busy work at shield-on plus 170 ms. That is 190 ms minus 20 ms, set from the natural holds of the first run's presses with no busy work.
- In the re-armed S run, the held tap comes 236, 246 or 256 ms after the trigger tap.

## Calibration: the natural entrance hold (test)

| Unit and profile | Holds, ms | Upper median, ms |
| --- | --- | --- |
| unit 1 R | 206.6, 211.2, 211.7, 222.3 | 211.7 |
| unit 1 N | 166.4, 171.6, 172.4, 175.7 | 172.4 |
| unit 1 S | 213, 221.1, 221.5, 231.9 | 221.5 |
| unit 2 R | 206.5, 220, 222.8, 224.3 | 222.8 |

- Each hold runs from shield-on to the release, with no forcing. Two holds in each row come from each build.
- The arm time uses the upper of the two middle values.

## Forced late presses (test)

| Unit and profile | Run | Build | Held presses | Late cases | Late cases that acted | Acted, all held presses | Late: busy start | Late: press stamp | Late: press dispatch | Late: release | Release after the busy end |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| unit 1 R | forced late | head e43cef46 (fix) | 24 | 12 | **0** | 0 | 200.3–226.7 | 225.2–252.5 | 304.4–329.7 | 303–328.5 | 1.8–3.3 |
| unit 1 R | forced late | main 0ed091c8 | 24 | 12 | **12** | 12 | 200.7–226.4 | 226.9–248.3 | 304–329.4 | 302.7–328.1 | 1.7–2.1 |
| unit 1 N | forced late | head e43cef46 (fix) | 24 | 12 | **0** | 0 | 162–175.8 | 186.4–208.3 | 266.2–279.8 | 264.7–278.3 | 2.3–3.4 |
| unit 1 N | forced late | main 0ed091c8 | 24 | 12 | **12** | 12 | 169.3–175.7 | 185.8–208.3 | 274.3–279.9 | 272.5–278.6 | 2.3–3.2 |
| unit 1 S | forced late | head e43cef46 (fix) | 24 | 6 | **0** | 6 | 207.3–214.2 | 238.9–269.5 | 328.1–336.1 | 320–327.8 | 12–13.6 |
| unit 1 S | forced late | main 0ed091c8 | 24 | 5 | **5** | 12 | 202.5–222.5 | 236.9–263.2 | 322.2–344.1 | 315.7–336 | 12.7–13.2 |
| unit 1 S | forced late, re-armed | head e43cef46 (fix) | 22 | 10 | **0** | 0 | 173.4–213.8 | 205.4–236.1 | 293–336.4 | 286.1–328.1 | 12.1–15 |
| unit 1 S | forced late, re-armed | main 0ed091c8 | 24 | 9 | **9** | 9 | 183–209.8 | 209.2–239.2 | 302.7–331 | 295.5–323.3 | 11.4–14.8 |
| unit 2 R | forced late | head e43cef46 (fix) | 8 | 4 | **0** | 0 | 218.1–226.2 | 248.5–252.2 | 321.3–329.3 | 320–328 | 1.8–2.8 |
| unit 2 R | forced late | main 0ed091c8 | 9 | 4 | **4** | 4 | 204.9–223.1 | 247.4–249.8 | 307.9–326 | 306.7–324.8 | 1.7–2 |

- Late-case timings are in ms, relative to shield-on, the hold's start.
- In S, the release lands 11.4 to 15 ms after the busy end. In R and N, on both units, it lands 1.7 to 3.4 ms after it.
- On the head, a swallowed late press leaves the menu open, as designed. The take's next retry then taps the trigger, which closes the menu, so that retry lands on the page with no hold.
- Those retries are not presses under test. There is one after each of the head's late cases.
- Unit 1 has 12 in R, 12 in N and 16 in S over both runs. Unit 2 has 4 in R.

## Devices

- Both units are Android Emulator devices with the system image sdk_gphone64_x86_64, Android 17 (build CE2A.260420.051.A2), x86_64, with a SwiftShader GPU. Touch is real input to the emulator.
- Unit 1: a 1080 × 2400 screen at 420 dpi.
- Unit 2: a fresh device made and booted with wiped data for this check, with a Pixel 9 Pro profile (1280 × 2856 at 480 dpi).
- Both run Chrome 145.0.7632.218 and Gboard 17.2.2.
- Profiles: R has animation scale 0, and the page reports reduced motion. N has animation scale 1. S has animation scale 1 and 4× CPU throttling. R and N run at 1× CPU.

## Takes

| Run | Cell | Unit | Profile | Status | Head version.json | Main version.json |
| --- | --- | --- | --- | --- | --- | --- |
| cal-R | `13436-tall-calib-R-log.R.a1` | unit 1 | R | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| cal-N | `13436-tall-calib-N-log.N.a1` | unit 1 | N | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| cal-S | `13436-tall-calib-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-R | `13436-tall-forced-d217-R-log.R.a1` | unit 1 | R | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-R | `13436-tall-forced-d227-R-log.R.a1` | unit 1 | R | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-R | `13436-tall-forced-d237-R-log.R.a1` | unit 1 | R | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-N | `13436-tall-forced-d177-N-log.N.a1` | unit 1 | N | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-N | `13436-tall-forced-d187-N-log.N.a1` | unit 1 | N | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-N | `13436-tall-forced-d197-N-log.N.a1` | unit 1 | N | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-S | `13436-tall-forced-d268-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-S | `13436-tall-forced-d278-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| forced-S | `13436-tall-forced-d288-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| rearm-S | `13436-tall-rearm-d236-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| rearm-S | `13436-tall-rearm-d246-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| rearm-S | `13436-tall-rearm-d256-S-log.S.a1` | unit 1 | S | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| u2-cal-R | `13436-tall-calib-R-log.R.a1` | unit 2 | R | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |
| u2-forced-R | `13436-u2-tall-forced-d238-R-log.R.a1` | unit 2 | R | kept | e43cef468562 local-static | 0ed091c8b8c7 local-static |

## Files

- `measurements.json`: all 223 presses, every count and range on this page, the recipe and the takes.
