# VideoPlayer at 754b56ee: the bar stays drawn while a marker popover is open, also through a handoff to a second marker

Main: the Production build of aa31a9eaa4e098c7382a46e2e9666b81a25cc110, the head's merge base, `main` in file names. Head: #13160 at 754b56ee1b71ef28975abf9a529edda12c6080e1, `head` in file names. The previous head, 70245c9493089a321c72dcd6f305967d45cea022, runs the two-marker flow only, `prev` in file names.

## Answer (test)

- (a) One marker, before playback: Enter opens marker A's popover, and focus moves into it. On main the bar hides, at opacity 0. On the head it stays at 1.
- After the popover closes, focus returns to the marker, and the bar shows on both builds, because focus is inside it.
- (b) Two markers, before playback, on the head: A opens from the keyboard, then a mouse click on marker B opens B and closes A.
- On the head, the bar is at opacity 1 on every frame, from 200 ms before the mouse starts toward B to 1600 ms after.
- One Escape closes B, and focus returns to B in the bar. A mouse click on blank page then moves focus to the page.
- The bar then fades out. It is at 0.001 or less from 325–334 ms after that mouse action starts, and it does not come back. No hold is left behind.
- On main, the bar is hidden while A is open, and it takes no clicks. The click at B's position starts playback instead, and B does not open.
- On the previous head, B opens, but the bar fades out while B is open. It is at 0.001 or less from 356–378 ms after the mouse starts toward B.
- (c) Unchanged: during playback, a mouse move shows the bar, and an idle bar hides again, on both builds.
- The bar starts to hide 2127–2168 ms after the last input, and is hidden 2360–2401 ms after it, on both builds.
- At rest, the frames are pixel-identical between the builds, in light and dark.

## The story and its media

- The story is Lab/MediaPlayer "Comment Markers". Its sample video loads from the story's own source: 5.059 s long, so all three markers draw. Nothing is injected to give it a duration.
- Marker A is the first marker, for Ana Ruiz's comment. Marker B is the second, for Lin Park's comment.
- A marker popover has no reply field. Tab inside it goes to the comment's time, whose tooltip shows the full date.
- In (a), that tooltip takes the first Escape, so the popover closes on the second. In (b), nothing inside B's popover is focused with Tab, so one Escape closes it.

## (a) One marker, before playback (test)

| Step | Mode | Bar opacity, main | Bar opacity, head | Focus, main | Focus, head | Marker popover, main / head | Video (head) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| At rest | light | 0 | 0 | the page | same | closed / closed | paused at 0 s |
| Tab to the first marker | light | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | same | closed / closed | paused at 0 s |
| Enter (the popover opens) | light | 0 | 1 | button "Thread by Ana Ruiz", in the popover | same | A open / A open | paused at 0.8 s |
| Tab inside the popover | light | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | same | A open, and a tooltip / A open, and a tooltip | paused at 0.8 s |
| Escape | light | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | same | A open / A open | paused at 0.8 s |
| Escape again | light | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | same | closed / closed | paused at 0.8 s |
| 2.4 s idle | light | 1, focus-within (1–1 over the wait) | 1, focus-within (1–1 over the wait) | button "Ana Ruiz: Love the light here.", in the bar | same | closed / closed | paused at 0.8 s |
| At rest | dark | 0 | 0 | the page | same | closed / closed | paused at 0 s |
| Tab to the first marker | dark | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | same | closed / closed | paused at 0 s |
| Enter (the popover opens) | dark | 0 | 1 | button "Thread by Ana Ruiz", in the popover | same | A open / A open | paused at 0.8 s |
| Tab inside the popover | dark | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | same | A open, and a tooltip / A open, and a tooltip | paused at 0.8 s |
| Escape | dark | 0 | 1 | time "16d ago, November 4, 2026 at 9:02:00 AM Pacific St…", in the popover | same | A open / A open | paused at 0.8 s |
| Escape again | dark | 1, focus-within | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | same | closed / closed | paused at 0.8 s |
| 2.4 s idle | dark | 1, focus-within (1–1 over the wait) | 1, focus-within (1–1 over the wait) | button "Ana Ruiz: Love the light here.", in the bar | same | closed / closed | paused at 0.8 s |

- Opacity is the bar's computed opacity. "focus-within" means that the bar matches `:focus-within`.
- With the popover open, focus is in the popover, and the bar does not match `:focus-within` on either build.

## (b) Two markers, before playback (test)

| Step | Mode | Build | Bar opacity | Focus | Marker popover | Video |
| --- | --- | --- | --- | --- | --- | --- |
| At rest | light | main | 0 | the page | closed | paused at 0 s |
| Tab to marker A | light | main | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s |
| Enter (A opens) | light | main | 0 | button "Thread by Ana Ruiz", in the popover | A open | paused at 0.8 s |
| Mouse click on marker B | light | main | 1 (every frame after the action starts: 0–1. 0 until +118 ms, then 1 from +382 ms as playback starts) | div "Bee on a flower", the player | closed | playing at 2.28 s |
| Escape | light | main | 1 | div "Bee on a flower", the player | closed | playing at 3.03 s |
| Mouse click on blank page (focus leaves) | light | main | 1 (every frame after the action starts: 0–1. 0.001 or less from +341 ms until the clip ends at +1664 ms, then 1 from +1924 ms) | the page | closed | ended at 5.06 s |
| At rest | light | head | 0 | the page | closed | paused at 0 s |
| Tab to marker A | light | head | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s |
| Enter (A opens) | light | head | 1 | button "Thread by Ana Ruiz", in the popover | A open | paused at 0.8 s |
| Mouse click on marker B | light | head | 1 (every frame after the action starts: 1–1) | button "Thread by Lin Park", in the popover | B open | paused at 2.2 s |
| Escape | light | head | 1, focus-within | button "Lin Park: Can we hold on this for a beat longer?", in the bar | closed | paused at 2.2 s |
| Mouse click on blank page (focus leaves) | light | head | 0 (every frame after the action starts: 0–1. 0.001 or less from +332 ms) | the page | closed | paused at 2.2 s |
| At rest | light | previous head | 0 | the page | closed | paused at 0 s |
| Tab to marker A | light | previous head | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s |
| Enter (A opens) | light | previous head | 1 | button "Thread by Ana Ruiz", in the popover | A open | paused at 0.8 s |
| Mouse click on marker B | light | previous head | 0 (every frame after the action starts: 0–1. 0.001 or less from +357 ms) | button "Thread by Lin Park", in the popover | B open | paused at 2.2 s |
| Escape | light | previous head | 1, focus-within | button "Lin Park: Can we hold on this for a beat longer?", in the bar | closed | paused at 2.2 s |
| Mouse click on blank page (focus leaves) | light | previous head | 0 (every frame after the action starts: 0–1. 0.001 or less from +318 ms) | the page | closed | paused at 2.2 s |
| At rest | dark | main | 0 | the page | closed | paused at 0 s |
| Tab to marker A | dark | main | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s |
| Enter (A opens) | dark | main | 0 | button "Thread by Ana Ruiz", in the popover | A open | paused at 0.8 s |
| Mouse click on marker B | dark | main | 1 (every frame after the action starts: 0–1. 0 until +105 ms, then 1 from +370 ms as playback starts) | div "Bee on a flower", the player | closed | playing at 2.3 s |
| Escape | dark | main | 1 | div "Bee on a flower", the player | closed | playing at 3.07 s |
| Mouse click on blank page (focus leaves) | dark | main | 1 (every frame after the action starts: 0–1. 0.001 or less from +326 ms until the clip ends at +1647 ms, then 1 from +1909 ms) | the page | closed | ended at 5.06 s |
| At rest | dark | head | 0 | the page | closed | paused at 0 s |
| Tab to marker A | dark | head | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s |
| Enter (A opens) | dark | head | 1 | button "Thread by Ana Ruiz", in the popover | A open | paused at 0.8 s |
| Mouse click on marker B | dark | head | 1 (every frame after the action starts: 1–1) | button "Thread by Lin Park", in the popover | B open | paused at 2.2 s |
| Escape | dark | head | 1, focus-within | button "Lin Park: Can we hold on this for a beat longer?", in the bar | closed | paused at 2.2 s |
| Mouse click on blank page (focus leaves) | dark | head | 0 (every frame after the action starts: 0–1. 0.001 or less from +334 ms) | the page | closed | paused at 2.2 s |
| At rest | dark | previous head | 0 | the page | closed | paused at 0 s |
| Tab to marker A | dark | previous head | 1, focus-within | button "Ana Ruiz: Love the light here.", in the bar | closed | paused at 0 s |
| Enter (A opens) | dark | previous head | 1 | button "Thread by Ana Ruiz", in the popover | A open | paused at 0.8 s |
| Mouse click on marker B | dark | previous head | 0 (every frame after the action starts: 0–1. 0.001 or less from +356 ms) | button "Thread by Lin Park", in the popover | B open | paused at 2.2 s |
| Escape | dark | previous head | 1, focus-within | button "Lin Park: Can we hold on this for a beat longer?", in the bar | closed | paused at 2.2 s |
| Mouse click on blank page (focus leaves) | dark | previous head | 0 (every frame after the action starts: 0–1. 0.001 or less from +332 ms) | the page | closed | paused at 2.2 s |

- On main, while A is open, the hidden bar sits lower: B's center is at y 582.5, against 574.5 on the head.
- At that point on main, the top element is a plain div, not marker B. On the head and the previous head, it is B.
- On main, the click there starts playback, and A's popover closes. The bar shows during playback, and again when the clip ends.
- "Focus leaves" is a mouse click on blank page, above and left of the player. Focus then moves to the page.
- In the head's Escape frame, B's hover preview shows under the resting pointer. The previous head's frame shows none.

### The bar on every frame (run 0)

Each row is a run of frames with the same bar opacity, open marker, `:focus-within` and focus. The times count from the start of the mouse action, its moves and its click. The click reaches the page 56 to 103 ms after that start.

| Mode | Build | Window | From, ms | To, ms | Frames | Bar opacity | Open marker | Bar focus-within | Focus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | head | click on B | -201.5 | 71.1 | 17 | 1 | A | no | Thread by Ana Ruiz |
| light | head | click on B | 81.5 | 81.5 | 1 | 1 | A | yes | Lin Park: Can we hold on this for a beat longer? |
| light | head | click on B | 97.2 | 97.2 | 1 | 1 | A | no | Thread by Lin Park |
| light | head | click on B | 105.8 | 1602.2 | 91 | 1 | B | no | Thread by Lin Park |
| light | head | focus leaves | -100.8 | 66.3 | 11 | 1 | none | yes | Lin Park: Can we hold on this for a beat longer? |
| light | head | focus leaves | 82.3 | 82.3 | 1 | 1 | none | no | body |
| light | head | focus leaves | 99 | 99 | 1 | 0.781 | none | no | body |
| light | head | focus leaves | 115.7 | 115.7 | 1 | 0.593 | none | no | body |
| light | head | focus leaves | 132.3 | 132.3 | 1 | 0.438 | none | no | body |
| light | head | focus leaves | 149 | 149 | 1 | 0.315 | none | no | body |
| light | head | focus leaves | 165.6 | 165.6 | 1 | 0.223 | none | no | body |
| light | head | focus leaves | 182.3 | 182.3 | 1 | 0.155 | none | no | body |
| light | head | focus leaves | 199 | 199 | 1 | 0.106 | none | no | body |
| light | head | focus leaves | 215.7 | 215.7 | 1 | 0.071 | none | no | body |
| light | head | focus leaves | 232.4 | 232.4 | 1 | 0.046 | none | no | body |
| light | head | focus leaves | 249 | 249 | 1 | 0.029 | none | no | body |
| light | head | focus leaves | 265.7 | 265.7 | 1 | 0.018 | none | no | body |
| light | head | focus leaves | 282.3 | 282.3 | 1 | 0.01 | none | no | body |
| light | head | focus leaves | 299 | 299 | 1 | 0.005 | none | no | body |
| light | head | focus leaves | 315.6 | 315.6 | 1 | 0.003 | none | no | body |
| light | head | focus leaves | 332.3 | 332.3 | 1 | 0.001 | none | no | body |
| light | head | focus leaves | 348.9 | 3398.9 | 184 | 0 | none | no | body |
| light | previous head | click on B | -200.5 | 75.9 | 17 | 1 | A | no | Thread by Ana Ruiz |
| light | previous head | click on B | 84.4 | 84.4 | 1 | 1 | A | yes | Lin Park: Can we hold on this for a beat longer? |
| light | previous head | click on B | 99.6 | 99.6 | 1 | 1 | A | no | Thread by Lin Park |
| light | previous head | click on B | 111.9 | 111.9 | 1 | 1 | B | no | Thread by Lin Park |
| light | previous head | click on B | 123.6 | 123.6 | 1 | 0.782 | B | no | Thread by Lin Park |
| light | previous head | click on B | 140.1 | 140.1 | 1 | 0.593 | B | no | Thread by Lin Park |
| light | previous head | click on B | 156.9 | 156.9 | 1 | 0.437 | B | no | Thread by Lin Park |
| light | previous head | click on B | 173.5 | 173.5 | 1 | 0.316 | B | no | Thread by Lin Park |
| light | previous head | click on B | 190.2 | 190.2 | 1 | 0.223 | B | no | Thread by Lin Park |
| light | previous head | click on B | 206.7 | 206.7 | 1 | 0.155 | B | no | Thread by Lin Park |
| light | previous head | click on B | 223.6 | 223.6 | 1 | 0.106 | B | no | Thread by Lin Park |
| light | previous head | click on B | 240.3 | 240.3 | 1 | 0.071 | B | no | Thread by Lin Park |
| light | previous head | click on B | 256.7 | 256.7 | 1 | 0.046 | B | no | Thread by Lin Park |
| light | previous head | click on B | 273.5 | 273.5 | 1 | 0.029 | B | no | Thread by Lin Park |
| light | previous head | click on B | 290.1 | 290.1 | 1 | 0.018 | B | no | Thread by Lin Park |
| light | previous head | click on B | 307 | 307 | 1 | 0.01 | B | no | Thread by Lin Park |
| light | previous head | click on B | 323.5 | 323.5 | 1 | 0.005 | B | no | Thread by Lin Park |
| light | previous head | click on B | 340.1 | 340.1 | 1 | 0.003 | B | no | Thread by Lin Park |
| light | previous head | click on B | 356.9 | 356.9 | 1 | 0.001 | B | no | Thread by Lin Park |
| light | previous head | click on B | 373.4 | 1606.5 | 75 | 0 | B | no | Thread by Lin Park |
| light | previous head | focus leaves | -100.1 | 52 | 11 | 1 | none | yes | Lin Park: Can we hold on this for a beat longer? |
| light | previous head | focus leaves | 68.3 | 68.3 | 1 | 1 | none | no | body |
| light | previous head | focus leaves | 84.8 | 84.8 | 1 | 0.782 | none | no | body |
| light | previous head | focus leaves | 101.5 | 101.5 | 1 | 0.593 | none | no | body |
| light | previous head | focus leaves | 118.2 | 118.2 | 1 | 0.437 | none | no | body |
| light | previous head | focus leaves | 134.9 | 134.9 | 1 | 0.316 | none | no | body |
| light | previous head | focus leaves | 151.6 | 151.6 | 1 | 0.223 | none | no | body |
| light | previous head | focus leaves | 168.2 | 168.2 | 1 | 0.155 | none | no | body |
| light | previous head | focus leaves | 185 | 185 | 1 | 0.106 | none | no | body |
| light | previous head | focus leaves | 201.6 | 201.6 | 1 | 0.071 | none | no | body |
| light | previous head | focus leaves | 218.2 | 218.2 | 1 | 0.046 | none | no | body |
| light | previous head | focus leaves | 234.9 | 234.9 | 1 | 0.029 | none | no | body |
| light | previous head | focus leaves | 251.6 | 251.6 | 1 | 0.018 | none | no | body |
| light | previous head | focus leaves | 268.2 | 268.2 | 1 | 0.01 | none | no | body |
| light | previous head | focus leaves | 285 | 285 | 1 | 0.005 | none | no | body |
| light | previous head | focus leaves | 301.6 | 301.6 | 1 | 0.003 | none | no | body |
| light | previous head | focus leaves | 318.1 | 318.1 | 1 | 0.001 | none | no | body |
| light | previous head | focus leaves | 334.7 | 3401.4 | 185 | 0 | none | no | body |
| light | main | click on B | -201.6 | 65.5 | 17 | 0 | A | no | Thread by Ana Ruiz |
| light | main | click on B | 81.4 | 81.4 | 1 | 0 | A | no | Bee on a flower |
| light | main | click on B | 117 | 117.9 | 2 | 0 | none | no | Bee on a flower |
| light | main | click on B | 132.2 | 132.2 | 1 | 0.219 | none | no | Bee on a flower |
| light | main | click on B | 148.7 | 148.7 | 1 | 0.407 | none | no | Bee on a flower |
| light | main | click on B | 165.5 | 165.5 | 1 | 0.562 | none | no | Bee on a flower |
| light | main | click on B | 182.2 | 182.2 | 1 | 0.684 | none | no | Bee on a flower |
| light | main | click on B | 198.7 | 198.7 | 1 | 0.777 | none | no | Bee on a flower |
| light | main | click on B | 215.6 | 215.6 | 1 | 0.845 | none | no | Bee on a flower |
| light | main | click on B | 232 | 232 | 1 | 0.894 | none | no | Bee on a flower |
| light | main | click on B | 248.6 | 248.6 | 1 | 0.929 | none | no | Bee on a flower |
| light | main | click on B | 265.4 | 265.4 | 1 | 0.954 | none | no | Bee on a flower |
| light | main | click on B | 281.9 | 281.9 | 1 | 0.971 | none | no | Bee on a flower |
| light | main | click on B | 298.7 | 298.7 | 1 | 0.982 | none | no | Bee on a flower |
| light | main | click on B | 315.4 | 315.4 | 1 | 0.99 | none | no | Bee on a flower |
| light | main | click on B | 332 | 332 | 1 | 0.995 | none | no | Bee on a flower |
| light | main | click on B | 348.6 | 348.6 | 1 | 0.997 | none | no | Bee on a flower |
| light | main | click on B | 365.3 | 365.3 | 1 | 0.999 | none | no | Bee on a flower |
| light | main | click on B | 382.2 | 1598.7 | 74 | 1 | none | no | Bee on a flower |
| light | main | focus leaves | -92.7 | 58 | 10 | 1 | none | no | Bee on a flower |
| light | main | focus leaves | 73.8 | 91.3 | 2 | 1 | none | no | body |
| light | main | focus leaves | 107.9 | 107.9 | 1 | 0.782 | none | no | body |
| light | main | focus leaves | 124.4 | 124.4 | 1 | 0.593 | none | no | body |
| light | main | focus leaves | 141 | 141 | 1 | 0.438 | none | no | body |
| light | main | focus leaves | 157.8 | 157.8 | 1 | 0.315 | none | no | body |
| light | main | focus leaves | 174.2 | 174.2 | 1 | 0.223 | none | no | body |
| light | main | focus leaves | 190.9 | 190.9 | 1 | 0.155 | none | no | body |
| light | main | focus leaves | 208.1 | 208.1 | 1 | 0.106 | none | no | body |
| light | main | focus leaves | 223.9 | 223.9 | 1 | 0.071 | none | no | body |
| light | main | focus leaves | 241 | 241 | 1 | 0.046 | none | no | body |
| light | main | focus leaves | 257.6 | 257.6 | 1 | 0.029 | none | no | body |
| light | main | focus leaves | 274.5 | 274.5 | 1 | 0.018 | none | no | body |
| light | main | focus leaves | 291 | 291 | 1 | 0.01 | none | no | body |
| light | main | focus leaves | 307.9 | 307.9 | 1 | 0.005 | none | no | body |
| light | main | focus leaves | 324.2 | 324.2 | 1 | 0.003 | none | no | body |
| light | main | focus leaves | 341.3 | 341.3 | 1 | 0.001 | none | no | body |
| light | main | focus leaves | 357.8 | 1663.6 | 79 | 0 | none | no | body |
| light | main | focus leaves | 1673.7 | 1673.7 | 1 | 0.219 | none | no | body |
| light | main | focus leaves | 1690.5 | 1690.5 | 1 | 0.407 | none | no | body |
| light | main | focus leaves | 1707 | 1707 | 1 | 0.563 | none | no | body |
| light | main | focus leaves | 1723.7 | 1723.7 | 1 | 0.684 | none | no | body |
| light | main | focus leaves | 1740.4 | 1740.4 | 1 | 0.777 | none | no | body |
| light | main | focus leaves | 1757.1 | 1757.1 | 1 | 0.845 | none | no | body |
| light | main | focus leaves | 1773.7 | 1773.7 | 1 | 0.894 | none | no | body |
| light | main | focus leaves | 1790.3 | 1790.3 | 1 | 0.929 | none | no | body |
| light | main | focus leaves | 1807 | 1807 | 1 | 0.954 | none | no | body |
| light | main | focus leaves | 1823.7 | 1823.7 | 1 | 0.971 | none | no | body |
| light | main | focus leaves | 1840.5 | 1840.5 | 1 | 0.982 | none | no | body |
| light | main | focus leaves | 1857.1 | 1857.1 | 1 | 0.99 | none | no | body |
| light | main | focus leaves | 1873.8 | 1873.8 | 1 | 0.995 | none | no | body |
| light | main | focus leaves | 1890.4 | 1890.4 | 1 | 0.997 | none | no | body |
| light | main | focus leaves | 1907.1 | 1907.1 | 1 | 0.999 | none | no | body |
| light | main | focus leaves | 1923.8 | 3407 | 90 | 1 | none | no | body |
| dark | head | click on B | -201.5 | 71.4 | 17 | 1 | A | no | Thread by Ana Ruiz |
| dark | head | click on B | 81.9 | 81.9 | 1 | 1 | A | yes | Lin Park: Can we hold on this for a beat longer? |
| dark | head | click on B | 96.9 | 96.9 | 1 | 1 | A | no | Thread by Lin Park |
| dark | head | click on B | 106 | 1603.6 | 91 | 1 | B | no | Thread by Lin Park |
| dark | head | focus leaves | -101.1 | 68.1 | 12 | 1 | none | yes | Lin Park: Can we hold on this for a beat longer? |
| dark | head | focus leaves | 84.3 | 84.3 | 1 | 1 | none | no | body |
| dark | head | focus leaves | 101.1 | 101.1 | 1 | 0.783 | none | no | body |
| dark | head | focus leaves | 117.7 | 117.7 | 1 | 0.593 | none | no | body |
| dark | head | focus leaves | 134.4 | 134.4 | 1 | 0.437 | none | no | body |
| dark | head | focus leaves | 151.1 | 151.1 | 1 | 0.316 | none | no | body |
| dark | head | focus leaves | 167.7 | 167.7 | 1 | 0.223 | none | no | body |
| dark | head | focus leaves | 184.3 | 184.3 | 1 | 0.155 | none | no | body |
| dark | head | focus leaves | 201 | 201 | 1 | 0.106 | none | no | body |
| dark | head | focus leaves | 217.6 | 217.6 | 1 | 0.071 | none | no | body |
| dark | head | focus leaves | 234.3 | 234.3 | 1 | 0.046 | none | no | body |
| dark | head | focus leaves | 251.1 | 251.1 | 1 | 0.029 | none | no | body |
| dark | head | focus leaves | 267.7 | 267.7 | 1 | 0.018 | none | no | body |
| dark | head | focus leaves | 284.2 | 284.2 | 1 | 0.01 | none | no | body |
| dark | head | focus leaves | 301 | 301 | 1 | 0.005 | none | no | body |
| dark | head | focus leaves | 317.5 | 317.5 | 1 | 0.003 | none | no | body |
| dark | head | focus leaves | 334.2 | 334.2 | 1 | 0.001 | none | no | body |
| dark | head | focus leaves | 350.9 | 3400.9 | 184 | 0 | none | no | body |
| dark | previous head | click on B | -201.6 | 73.5 | 17 | 1 | A | no | Thread by Ana Ruiz |
| dark | previous head | click on B | 83.4 | 83.4 | 1 | 1 | A | yes | Lin Park: Can we hold on this for a beat longer? |
| dark | previous head | click on B | 98.8 | 98.8 | 1 | 1 | A | no | Thread by Lin Park |
| dark | previous head | click on B | 110.9 | 110.9 | 1 | 1 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 122.7 | 122.7 | 1 | 0.782 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 139.1 | 139.1 | 1 | 0.593 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 155.8 | 155.8 | 1 | 0.438 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 172.6 | 172.6 | 1 | 0.315 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 189.3 | 189.3 | 1 | 0.223 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 205.7 | 205.7 | 1 | 0.155 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 222.6 | 222.6 | 1 | 0.106 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 239.5 | 239.5 | 1 | 0.071 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 255.9 | 255.9 | 1 | 0.046 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 272.4 | 272.4 | 1 | 0.029 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 289.1 | 289.1 | 1 | 0.018 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 305.8 | 305.8 | 1 | 0.01 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 322.5 | 322.5 | 1 | 0.005 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 339.3 | 339.3 | 1 | 0.003 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 355.9 | 355.9 | 1 | 0.001 | B | no | Thread by Lin Park |
| dark | previous head | click on B | 372.6 | 1605.7 | 75 | 0 | B | no | Thread by Lin Park |
| dark | previous head | focus leaves | -101.3 | 65.5 | 11 | 1 | none | yes | Lin Park: Can we hold on this for a beat longer? |
| dark | previous head | focus leaves | 81.8 | 81.8 | 1 | 1 | none | no | body |
| dark | previous head | focus leaves | 98.5 | 98.5 | 1 | 0.782 | none | no | body |
| dark | previous head | focus leaves | 115.1 | 115.1 | 1 | 0.593 | none | no | body |
| dark | previous head | focus leaves | 131.9 | 131.9 | 1 | 0.438 | none | no | body |
| dark | previous head | focus leaves | 148.5 | 148.5 | 1 | 0.316 | none | no | body |
| dark | previous head | focus leaves | 165.2 | 165.2 | 1 | 0.224 | none | no | body |
| dark | previous head | focus leaves | 181.9 | 181.9 | 1 | 0.155 | none | no | body |
| dark | previous head | focus leaves | 198.5 | 198.5 | 1 | 0.106 | none | no | body |
| dark | previous head | focus leaves | 215.3 | 215.3 | 1 | 0.071 | none | no | body |
| dark | previous head | focus leaves | 232 | 232 | 1 | 0.046 | none | no | body |
| dark | previous head | focus leaves | 248.6 | 248.6 | 1 | 0.029 | none | no | body |
| dark | previous head | focus leaves | 265.1 | 265.1 | 1 | 0.018 | none | no | body |
| dark | previous head | focus leaves | 281.9 | 281.9 | 1 | 0.01 | none | no | body |
| dark | previous head | focus leaves | 298.6 | 298.6 | 1 | 0.005 | none | no | body |
| dark | previous head | focus leaves | 315.3 | 315.3 | 1 | 0.003 | none | no | body |
| dark | previous head | focus leaves | 331.9 | 331.9 | 1 | 0.001 | none | no | body |
| dark | previous head | focus leaves | 348.6 | 3398.4 | 184 | 0 | none | no | body |
| dark | main | click on B | -200.9 | 53.4 | 17 | 0 | A | no | Thread by Ana Ruiz |
| dark | main | click on B | 69.3 | 69.3 | 1 | 0 | A | no | Bee on a flower |
| dark | main | click on B | 104.6 | 105.4 | 2 | 0 | none | no | Bee on a flower |
| dark | main | click on B | 119.7 | 119.7 | 1 | 0.219 | none | no | Bee on a flower |
| dark | main | click on B | 136.3 | 136.3 | 1 | 0.407 | none | no | Bee on a flower |
| dark | main | click on B | 153.4 | 153.4 | 1 | 0.562 | none | no | Bee on a flower |
| dark | main | click on B | 169.9 | 169.9 | 1 | 0.684 | none | no | Bee on a flower |
| dark | main | click on B | 186.7 | 186.7 | 1 | 0.777 | none | no | Bee on a flower |
| dark | main | click on B | 203 | 203 | 1 | 0.845 | none | no | Bee on a flower |
| dark | main | click on B | 219.6 | 219.6 | 1 | 0.894 | none | no | Bee on a flower |
| dark | main | click on B | 236.5 | 236.5 | 1 | 0.929 | none | no | Bee on a flower |
| dark | main | click on B | 253.4 | 253.4 | 1 | 0.954 | none | no | Bee on a flower |
| dark | main | click on B | 269.9 | 269.9 | 1 | 0.971 | none | no | Bee on a flower |
| dark | main | click on B | 286.5 | 286.5 | 1 | 0.982 | none | no | Bee on a flower |
| dark | main | click on B | 303.3 | 303.3 | 1 | 0.99 | none | no | Bee on a flower |
| dark | main | click on B | 320 | 320 | 1 | 0.995 | none | no | Bee on a flower |
| dark | main | click on B | 336.5 | 336.5 | 1 | 0.997 | none | no | Bee on a flower |
| dark | main | click on B | 353 | 353 | 1 | 0.999 | none | no | Bee on a flower |
| dark | main | click on B | 369.7 | 1603.2 | 75 | 1 | none | no | Bee on a flower |
| dark | main | focus leaves | -91.1 | 59.4 | 10 | 1 | none | no | Bee on a flower |
| dark | main | focus leaves | 75.5 | 75.5 | 1 | 1 | none | no | body |
| dark | main | focus leaves | 92.7 | 92.7 | 1 | 0.782 | none | no | body |
| dark | main | focus leaves | 109.1 | 109.1 | 1 | 0.593 | none | no | body |
| dark | main | focus leaves | 126.1 | 126.1 | 1 | 0.438 | none | no | body |
| dark | main | focus leaves | 142.4 | 142.4 | 1 | 0.316 | none | no | body |
| dark | main | focus leaves | 159.2 | 159.2 | 1 | 0.223 | none | no | body |
| dark | main | focus leaves | 175.8 | 175.8 | 1 | 0.155 | none | no | body |
| dark | main | focus leaves | 192.4 | 192.4 | 1 | 0.106 | none | no | body |
| dark | main | focus leaves | 209.1 | 209.1 | 1 | 0.071 | none | no | body |
| dark | main | focus leaves | 226.1 | 226.1 | 1 | 0.046 | none | no | body |
| dark | main | focus leaves | 242.8 | 242.8 | 1 | 0.029 | none | no | body |
| dark | main | focus leaves | 259.5 | 259.5 | 1 | 0.018 | none | no | body |
| dark | main | focus leaves | 275.8 | 275.8 | 1 | 0.01 | none | no | body |
| dark | main | focus leaves | 292.6 | 292.6 | 1 | 0.005 | none | no | body |
| dark | main | focus leaves | 309.2 | 309.2 | 1 | 0.003 | none | no | body |
| dark | main | focus leaves | 325.7 | 325.7 | 1 | 0.001 | none | no | body |
| dark | main | focus leaves | 342.7 | 1647.1 | 79 | 0 | none | no | body |
| dark | main | focus leaves | 1658.9 | 1658.9 | 1 | 0.219 | none | no | body |
| dark | main | focus leaves | 1675.6 | 1675.6 | 1 | 0.408 | none | no | body |
| dark | main | focus leaves | 1692.1 | 1692.1 | 1 | 0.562 | none | no | body |
| dark | main | focus leaves | 1708.9 | 1708.9 | 1 | 0.684 | none | no | body |
| dark | main | focus leaves | 1725.6 | 1725.6 | 1 | 0.777 | none | no | body |
| dark | main | focus leaves | 1742.2 | 1742.2 | 1 | 0.845 | none | no | body |
| dark | main | focus leaves | 1758.9 | 1758.9 | 1 | 0.894 | none | no | body |
| dark | main | focus leaves | 1775.6 | 1775.6 | 1 | 0.929 | none | no | body |
| dark | main | focus leaves | 1792.3 | 1792.3 | 1 | 0.954 | none | no | body |
| dark | main | focus leaves | 1808.8 | 1808.8 | 1 | 0.971 | none | no | body |
| dark | main | focus leaves | 1825.6 | 1825.6 | 1 | 0.982 | none | no | body |
| dark | main | focus leaves | 1842.2 | 1842.2 | 1 | 0.99 | none | no | body |
| dark | main | focus leaves | 1858.8 | 1858.8 | 1 | 0.995 | none | no | body |
| dark | main | focus leaves | 1875.5 | 1875.5 | 1 | 0.997 | none | no | body |
| dark | main | focus leaves | 1892.1 | 1892.1 | 1 | 0.999 | none | no | body |
| dark | main | focus leaves | 1908.7 | 3408.6 | 91 | 1 | none | no | body |

### After focus leaves: no stuck hold (both runs)

| Build | Mode | Runs | Bar at 0.001 or less, ms after the action starts | Highest opacity from that frame on | Time covered after that, ms | Clip ends, ms after the action starts | Focus after |
| --- | --- | --- | --- | --- | --- | --- | --- |
| main | light | 2 | 341–343 | 1 | 3066 | 1664–2201 | the page |
| main | dark | 2 | 326 | 1 | 3082–3083 | 1647–2209 | the page |
| head | light | 2 | 328–332 | 0.001 | 3067–3083 | not playing | the page |
| head | dark | 2 | 325–334 | 0.001 | 3067–3083 | not playing | the page |
| previous head | light | 2 | 318–328 | 0.001 | 3083 | not playing | the page |
| previous head | dark | 2 | 327–332 | 0.001 | 3067–3083 | not playing | the page |

- On the head and the previous head, the bar stays at 0 from that frame to the end of the 3400 ms window. The highest opacity from that frame on is the threshold frame itself.
- On main, the bar shows again when the clip ends, 1647–2209 ms after the action starts. Main shows its controls at the end of a clip.

## (c) Pointer movement during playback (test)

| Step | Mode | Bar opacity, main | Bar opacity, head | Focus, main | Focus, head | Marker popover, main / head | Video (head) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| At rest | light | 0 | 0 | the page | same | closed / closed | paused at 0 s |
| Mouse click on the large play control | light | 1 | 1 | div "Bee on a flower", the player | same | closed / closed | playing at 0.24 s |
| 2.4 s idle | light | 0 (0–1 over the wait; hidden 2366 ms after the input) | 0 (0–1 over the wait; hidden 2360 ms after the input) | div "Bee on a flower", the player | same | closed / closed | playing at 2.92 s |
| Mouse moves over the player | light | 1 | 1 | div "Bee on a flower", the player | same | closed / closed | playing at 3.74 s |
| 2.4 s idle again | light | 0 (0–1 over the wait; hidden 2401 ms after the input) | 0 (0–1 over the wait; hidden 2385 ms after the input) | div "Bee on a flower", the player | same | closed / closed | playing at 1.26 s |
| At rest | dark | 0 | 0 | the page | same | closed / closed | paused at 0 s |
| Mouse click on the large play control | dark | 1 | 1 | div "Bee on a flower", the player | same | closed / closed | playing at 0.25 s |
| 2.4 s idle | dark | 0 (0–1 over the wait; hidden 2361 ms after the input) | 0 (0–1 over the wait; hidden 2363 ms after the input) | div "Bee on a flower", the player | same | closed / closed | playing at 2.92 s |
| Mouse moves over the player | dark | 1 | 1 | div "Bee on a flower", the player | same | closed / closed | playing at 3.75 s |
| 2.4 s idle again | dark | 0 (0–1 over the wait; hidden 2389 ms after the input) | 0 (0–1 over the wait; hidden 2392 ms after the input) | div "Bee on a flower", the player | same | closed / closed | playing at 1.26 s |

- The mouse clicks the large play control, which is out of the tab order, and then rests over the video. Focus goes to the player itself, not into the bar.

| Build | Mode | Runs | Step | Hide starts, ms after the input | Hidden, ms after the input |
| --- | --- | --- | --- | --- | --- |
| main | light | 2 | 2.4 s idle | 2133–2145 | 2366–2378 |
| main | light | 2 | 2.4 s idle again | 2152–2168 | 2386–2401 |
| main | dark | 2 | 2.4 s idle | 2127–2146 | 2361–2380 |
| main | dark | 2 | 2.4 s idle again | 2155–2156 | 2388–2389 |
| head | light | 2 | 2.4 s idle | 2127–2146 | 2360–2379 |
| head | light | 2 | 2.4 s idle again | 2153–2165 | 2385–2399 |
| head | dark | 2 | 2.4 s idle | 2129–2146 | 2363–2379 |
| head | dark | 2 | 2.4 s idle again | 2156–2159 | 2389–2392 |

- Each time counts from the start of the last input: the click, or the mouse move. Each range covers 2 runs.

## At rest: main against the head (test)

| Frame | Mode | main vs head |
| --- | --- | --- |
| At rest, before the before flow | light | identical |
| At rest, before the handoff flow | light | identical |
| At rest, before the pointer flow | light | identical |
| At rest, before the before flow | dark | identical |
| At rest, before the handoff flow | dark | identical |
| At rest, before the pointer flow | dark | identical |

## Builds

- Main: the Production deploy of aa31a9ea, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of 754b56ee, by its version.json (environment "preview"). The previous head: the preview deploy of 70245c94.
- The version.json files and the pull request's head were the same at the start and the end of the run.

## Method

- 1280 × 800, scale 1, light and dark. Keys and mouse moves are real input events from Playwright, through the DevTools protocol.
- Focus starts on the page, and the mouse rests in the corner of the page until a flow moves it.
- Each step waits 250 to 500 ms and two frames, then takes its frame and its record. An idle wait samples the bar every animation frame.
- In (b), the mouse moves to B's center in 4 steps and clicks. Times count from the start of that action, and the click reaches the page 56 to 103 ms later. The bar is sampled every animation frame, from 200 ms before that start to 1600 ms after it.
- After focus leaves, the bar is sampled every animation frame for 3400 ms.
- The control bar is the player's element with `data-visible`. Its computed opacity, visibility, translate and pointer-events are read at each step.
- A focus name longer than 50 characters is cut at 50 and ends in an ellipsis.
- The Video column of (a) and (c) is the head's. In (b), each build's video is shown.
- Each flow runs twice per build and mode, and the builds alternate. The frames come from the first run.
- Every run of a flow, build and mode gives the same bar state, focus and popover state at every step.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- On 2026-11-21 the run took 02:15:03Z to 02:19:57Z. The box load was 21 at its start and 22 at its end.

## Files

- `<k>-<step>--<flow>--<mode>--<build>.png`: the frame after each step, numbered in order. The flows are `before` (a), `handoff` (b) and `pointer` (c).
- `measurements.json`: every step's record for both runs, with the per-frame samples of each idle wait and each click window, and the summaries.
