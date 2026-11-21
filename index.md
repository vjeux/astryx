# VideoPlayer at 70245c94: before playback, the bar stays drawn while a marker popover is open

Main: the Production build of aa31a9eaa4e098c7382a46e2e9666b81a25cc110, the head's merge base, `main` in file names. Head: #13160 at 70245c9493089a321c72dcd6f305967d45cea022, `head` in file names.

## Answer (test)

- Before playback, Enter on a marker opens its popover and moves focus into it. On main the control bar then hides, at opacity 0. On the head it stays drawn, at opacity 1.
- That holds while focus moves on inside the popover, and through the first Escape, which closes a tooltip inside the popover.
- The second Escape closes the popover, and focus returns to the marker. The bar then follows the usual rule before playback: focus is inside it, so it shows, on both builds.
- During playback, the same flow keeps the bar drawn on both builds, through 2.4 s of idle with the popover open.
- Unchanged: a mouse move over the playing video shows the bar, and an idle bar with no popover and no focus in it hides again.
- On both builds, the bar starts to hide about 2.1 s after the last input and is gone about 2.4 s after it.
- At rest, the frames are pixel-identical between the builds, in light and dark.

## The story and its media

- The story is Lab/MediaPlayer "Comment Markers". Its sample video loads from the story's own source: 5.059 s long, so all three markers draw. Nothing is injected to give it a duration.
- The story's comment threads get no reply handler, so their popovers have no reply field. Tab moves to the popover's next control instead: the comment's time, whose tooltip shows the full date.
- That tooltip takes the first Escape, so the popover closes on the second.
- The clip is short. For the two playback flows, the harness sets the video element's loop property before playback, so the clip keeps playing through every step.

## Before playback (test)

| Step | Mode | Bar opacity, main | Bar opacity, head | Focus (both builds) | Marker popover | Video (head) | Time, ms (main / head) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| At rest | light | 0 | 0 | the page | closed | paused at 0 s | 464 / 463 |
| Tab to the first marker | light | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s | 1747 / 1729 |
| Enter (the popover opens) | light | 0 | 1 | button "Thread by Ana Ruiz", in the popover | open | paused at 0.8 s | 2513 / 2513 |
| Tab inside the popover | light | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open, and a tooltip | paused at 0.8 s | 3346 / 3263 |
| Escape | light | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open | paused at 0.8 s | 4096 / 3979 |
| Escape again | light | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0.8 s | 4863 / 4762 |
| 2.4 s idle | light | 1, focus-within (1–1 over the wait) | 1, focus-within (1–1 over the wait) | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0.8 s | 7606 / 7519 |
| At rest | dark | 0 | 0 | the page | closed | paused at 0 s | 463 / 463 |
| Tab to the first marker | dark | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s | 1713 / 1713 |
| Enter (the popover opens) | dark | 0 | 1 | button "Thread by Ana Ruiz", in the popover | open | paused at 0.8 s | 2446 / 2496 |
| Tab inside the popover | dark | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open, and a tooltip | paused at 0.8 s | 3179 / 3229 |
| Escape | dark | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open | paused at 0.8 s | 3896 / 3946 |
| Escape again | dark | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0.8 s | 4646 / 4679 |
| 2.4 s idle | dark | 1, focus-within (1–1 over the wait) | 1, focus-within (1–1 over the wait) | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0.8 s | 7339 / 7369 |

- Opacity is the bar's computed opacity. "focus-within" means that the bar matches `:focus-within`.
- With the popover open, focus is in the popover, and the bar does not match `:focus-within` on either build.
- On main, the bar's opacity is 0 for as long as the popover is open. On the head, it stays 1.

## During playback (test)

| Step | Mode | Bar opacity, main | Bar opacity, head | Focus (both builds) | Marker popover | Video (head) | Time, ms (main / head) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| At rest | light | 0 | 0 | the page | closed | paused at 0 s | 462 / 463 |
| Tab to Play | light | 1, focus-within | 1, focus-within | button "Play", in the bar | closed | paused at 0 s | 1295 / 1296 |
| Space (playback starts) | light | 1, focus-within | 1, focus-within | button "Pause", in the bar | closed | playing at 0.45 s | 2130 / 2064 |
| Tab to the first marker | light | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | playing at 1.23 s | 2930 / 2847 |
| Enter (the popover opens) | light | 1 | 1 | button "Thread by Ana Ruiz", in the popover | open | playing at 1.17 s | 3697 / 3631 |
| Tab inside the popover | light | 1 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open, and a tooltip | playing at 1.73 s | 4248 / 4199 |
| 2.4 s idle, popover open | light | 1 (1–1 over the wait) | 1 (1–1 over the wait) | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open, and a tooltip | playing at 4.43 s | 6903 / 6889 |
| Escape | light | 1 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open | playing at 4.97 s | 7414 / 7431 |
| Escape again | light | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | playing at 0.35 s | 7947 / 7980 |
| 2.4 s idle | light | 1, focus-within (1–1 over the wait) | 1, focus-within (1–1 over the wait) | button "Ana Ruiz: Love the light here.", in the bar | closed | playing at 3.02 s | 10618 / 10654 |
| At rest | dark | 0 | 0 | the page | closed | paused at 0 s | 461 / 462 |
| Tab to Play | dark | 1, focus-within | 1, focus-within | button "Play", in the bar | closed | paused at 0 s | 1228 / 1229 |
| Space (playback starts) | dark | 1, focus-within | 1, focus-within | button "Pause", in the bar | closed | playing at 0.44 s | 1997 / 1997 |
| Tab to the first marker | dark | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | playing at 1.22 s | 2779 / 2780 |
| Enter (the popover opens) | dark | 1 | 1 | button "Thread by Ana Ruiz", in the popover | open | playing at 1.16 s | 3564 / 3565 |
| Tab inside the popover | dark | 1 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open, and a tooltip | playing at 1.73 s | 4115 / 4132 |
| 2.4 s idle, popover open | dark | 1 (1–1 over the wait) | 1 (1–1 over the wait) | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open, and a tooltip | playing at 4.4 s | 6769 / 6802 |
| Escape | dark | 1 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | open | playing at 4.93 s | 7280 / 7330 |
| Escape again | dark | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | playing at 0.29 s | 7812 / 7864 |
| 2.4 s idle | dark | 1, focus-within (1–1 over the wait) | 1, focus-within (1–1 over the wait) | button "Ana Ruiz: Love the light here.", in the bar | closed | playing at 2.98 s | 10483 / 10551 |

- The bar stays at opacity 1 through every frame of the 2.4 s idle with the popover open, on both builds.
- After the popover closes, focus is on the marker in the bar. The bar then stays drawn through the next 2.4 s idle, on both builds.

## Pointer movement during playback (test)

| Step | Mode | Bar opacity, main | Bar opacity, head | Focus (both builds) | Marker popover | Video (head) | Time, ms (main / head) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| At rest | light | 0 | 0 | the page | closed | paused at 0 s | 466 / 463 |
| Mouse click on the large play control | light | 1 | 1 | div "Bee on a flower", the player | closed | playing at 0.24 s | 1117 / 1114 |
| 2.4 s idle | light | 0 (0–1 over the wait; hidden 2358 ms after the input) | 0 (0–1 over the wait; hidden 2364 ms after the input) | div "Bee on a flower", the player | closed | playing at 2.91 s | 3788 / 3786 |
| Mouse moves over the player | light | 1 | 1 | div "Bee on a flower", the player | closed | playing at 3.74 s | 4616 / 4613 |
| 2.4 s idle again | light | 0 (0–1 over the wait; hidden 2395 ms after the input) | 0 (0–1 over the wait; hidden 2395 ms after the input) | div "Bee on a flower", the player | closed | playing at 1.23 s | 7288 / 7285 |
| At rest | dark | 0 | 0 | the page | closed | paused at 0 s | 463 / 464 |
| Mouse click on the large play control | dark | 1 | 1 | div "Bee on a flower", the player | closed | playing at 0.25 s | 1114 / 1114 |
| 2.4 s idle | dark | 0 (0–1 over the wait; hidden 2362 ms after the input) | 0 (0–1 over the wait; hidden 2363 ms after the input) | div "Bee on a flower", the player | closed | playing at 2.92 s | 3786 / 3786 |
| Mouse moves over the player | dark | 1 | 1 | div "Bee on a flower", the player | closed | playing at 3.75 s | 4613 / 4614 |
| 2.4 s idle again | dark | 0 (0–1 over the wait; hidden 2393 ms after the input) | 0 (0–1 over the wait; hidden 2394 ms after the input) | div "Bee on a flower", the player | closed | playing at 1.24 s | 7302 / 7286 |

- The mouse clicks the large play control, which is out of the tab order, and then rests over the video. Focus goes to the player itself, not into the bar.

| Build | Mode | Runs | Step | Hide starts, ms after the input | Hidden, ms after the input |
| --- | --- | --- | --- | --- | --- |
| main | light | 2 | 2.4 s idle | 2125–2145 | 2358–2378 |
| main | light | 2 | 2.4 s idle again | 2157–2162 | 2391–2395 |
| main | dark | 2 | 2.4 s idle | 2128–2146 | 2362–2380 |
| main | dark | 2 | 2.4 s idle again | 2158–2160 | 2391–2393 |
| head | light | 2 | 2.4 s idle | 2130–2146 | 2364–2380 |
| head | light | 2 | 2.4 s idle again | 2158–2162 | 2391–2395 |
| head | dark | 2 | 2.4 s idle | 2129–2147 | 2363–2380 |
| head | dark | 2 | 2.4 s idle again | 2158–2161 | 2392–2394 |

- Each time counts from the start of the last input: the click, or the mouse move. Each range covers 2 runs.

## At rest: main against the head (test)

| Frame | Mode | main vs head |
| --- | --- | --- |
| At rest, before the before flow | light | identical |
| At rest, before the playing flow | light | identical |
| At rest, before the pointer flow | light | identical |
| At rest, before the before flow | dark | identical |
| At rest, before the playing flow | dark | identical |
| At rest, before the pointer flow | dark | identical |

## Builds

- Main: the Production deploy of aa31a9ea, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of 70245c94, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of the run.

## Method

- 1280 × 800, scale 1, light and dark. Keys and mouse moves are real input events from Playwright, through the DevTools protocol.
- Focus starts on the page, and the mouse rests in the corner of the page until the pointer flow.
- Each step waits 250 to 500 ms and two frames, then takes its frame and its record. An idle wait samples the bar every animation frame.
- The control bar is the player's element with `data-visible`. Its computed opacity, visibility, translate and pointer-events are read at each step.
- A focus name longer than 50 characters is cut at 50 and ends in an ellipsis.
- The Video column is the head's. Main's video times differ from the head's by at most 0.11 s.
- Each flow runs twice per build and mode, and the builds alternate. The frames come from the first run.
- Every run of a flow, build and mode gives the same bar state, focus and popover state at every step.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- On 2026-11-21 the run took 01:32:13Z to 01:36:29Z. The box load was 88 at its start and 19 at its end.

## Files

- `<k>-<step>--<flow>--<mode>--<build>.png`: the frame after each step of the flow, numbered in order. The flows are `before`, `playing` and `pointer`.
- `measurements.json`: every step's record for both runs, with the per-frame samples of each idle wait, and the summaries.
