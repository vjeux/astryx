# #8098: the frame gap at the Dialog's opening on the Android emulator

The Android clip in #8098 has one 69 ms recorder gap when the Dialog opens. Measured below: it is the emulator's warm-up at the first dialog opens of a browser session, and main shows the same.

## Android 15 emulator, Chrome 124

Gate emulator under a recording lease (busyEmulators 1–2), 720×1600, backdrop blur off (as in the clip). Dialog "Scrolling Content" story with 30 page rows. Each take opens and closes the Dialog four times; the page logs its own `requestAnimationFrame` times around each opening (the largest frame interval in the 750 ms after the click), and the recording's frame gaps are read from its timestamps. Two fresh sessions, the builds in opposite orders.

| Session | Build | Opening 1 | Opening 2 | Opening 3 | Opening 4 |
|---|---|---|---|---|---|
| A | this PR (first) | cold: the page's frames stop (7 frames in 750 ms); recording gap 950 ms | 67 ms | 17 ms | 17 ms |
| A | main (second) | 17 ms | 17 ms | 17 ms | 17 ms (one 52 ms recording gap) |
| B | main (first) | cold: the page's frames stop (7 frames in 750 ms); recording gap 1,067 ms | 67 ms | 17 ms | 17 ms |
| B | this PR (second) | 50 ms (recording gap 65 ms) | 17 ms | 17 ms | 17 ms |

The stall follows the position in the session, not the build: the first opening after the emulator boots freezes for about a second on either build, the next one or two openings miss one to three frames on either build, and later openings run at 60 fps on both. The clip's take was the second in its session, so its opening is the "opening 2" case.

## Chromium, phone profile, 4× CPU throttle

Five runs per build of a trace from the click through 1.2 s, on this PR, its base (#8320 without this PR's commits) and main:

| Build | Longest main-thread task | of which React render and commit | style | layout | page's largest frame interval |
|---|---|---|---|---|---|
| this PR | 59–72 ms | 44–55 ms | 13–14 ms (69 elements) | 11–14 ms (100 objects) | 50–67 ms |
| base | 68–75 ms | 52–56 ms | 14–15 ms (68 elements) | 13 ms (101 objects) | 50–67 ms |
| main | 65–70 ms | 48–54 ms | 12–14 ms (68 elements) | 10–14 ms (101 objects) | 50–67 ms |

The opening costs the same on all three builds, and the lock's part is the same size: this PR's lock invalidates style once and layout twice (the claim, then the gutter hold's settle), as main's lock does.
