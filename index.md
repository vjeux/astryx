# #13526 at its exact head on Android: DropdownMenu's entrance hold, presses near its end

Head: #13526 at 907fb62d3e1dc11129625c556dd128390a4a8e33. Main: 3560b58cb6e13354c7cc23cc8919578977d341dd. All numbers are test measurements.

## Answer (test)

- In the natural presses near the hold's end, the head held all 5 of its (b)-shaped presses, and main let its 5 act.
- A (b)-shaped press is stamped in the hold and dispatched after the shield's removal.
- Of those natural presses stamped in the hold, none of the head's 32 acted, and 5 of main's 25 did.
- One boundary press on each build was stamped within 1 ms before the shield's `remove()` call. By the hold's end stamp it comes after the hold, so its act is correct.
- With a forced long task, on #13436's path: head 8 presses in the hold and 0 acted, and main 8 and 0.
- A spot check on another unit agrees: head 0 of 2 presses in the hold acted, and main 1 of 4.

## Builds

- Head: #13526's own preview deploy at 907fb62d3e1dc11129625c556dd128390a4a8e33.
- Main: the Production deploy of 3560b58cb6e13354c7cc23cc8919578977d341dd.
- Every take read both builds' `version.json` on the phone first.

## Story and presses

- Story: `core-dropdownmenu--tall-content-overflow`. Its menu is open at load, and each take closes it before the measured open.
- A finger taps "Move to project". Then a second finger tap lands on the first menu row's place, after the cell's delay.
- In the forced family, a long task runs in the entrance animation's `finished` getter.
- Profiles: R removes animations, N is the phone as is, and S throttles the CPU 4×.

## Rules

- In the hold: the pointerdown's `timeStamp` is more than 1 ms before the shield's `remove()` call.
- That call stands in for the hold's end stamp, which the page does not expose.
- At this head, the end stamp is `performance.now()` at the start of the release, before `ended()` and `remove()`, in the same task.
- Boundary: stamped within 1 ms before `remove()`. By the end stamp, such a press comes after the hold.
- After the hold: stamped at or after `remove()`.
- The table also gives two other rules: the strict `remove()` call time, and the kit's observer reading of the removal.
- The observer reads the removal 2.1 to 16.1 ms after the `remove()` call.
- So its rule counts some presses stamped after the removal as in the hold.
- Each of the head's 10 acts by that rule was stamped after `remove()`, or within 0.2 ms before it.
- Acted: a click dispatched after the press, within 800 ms.
- An "untrusted row click" is the menu's own: it activates a row on the finger's release with a click it dispatches.
- The kit's own per-cell verdicts are not used. Its reading counts a held press that is dispatched after the removal as an act.
- Classes of the presses that act: (a) after the hold; (b) in the hold and dispatched after `remove()`.
- Class (c) is a (b) with a long frame gap before the removal, more than twice the median of 8 frames. Class (d) is dispatched before `remove()`.

## Per family, profile and build (test)

| Family | Profile | Build | Presses | In the hold | Acted in the hold | (b)-shaped: held / acted | Boundary: n / acted | Strict remove() rule: in / acted | Observer rule: in / acted | (b)-shaped lateness, ms | Frame rate, Hz | Units |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| calibration | R | head 907fb62d | 4 | 2 | 0 | 0 / 0 | 0 / 0 | 2 / 0 | 2 / 0 | – | 59.9–60.2 | A |
| calibration | R | main 3560b58c | 3 | 2 | 0 | 0 / 0 | 0 / 0 | 2 / 0 | 2 / 0 | – | 59.9–60.2 | A |
| natural near-end | R | head 907fb62d | 48 | 13 | 0 | 3 / 0 | 0 / 0 | 13 / 0 | 17 / 4 | 5.6–10.3 | 59.9–60.2 | A, C |
| natural near-end | R | main 3560b58c | 48 | 11 | 2 | 0 / 2 | 1 / 1 | 12 / 3 | 13 / 4 | 6–6.2 | 59.9–60.2 | A, C |
| natural near-end | N | head 907fb62d | 24 | 6 | 0 | 2 / 0 | 1 / 1 | 7 / 1 | 8 / 2 | 6.1–9.7 | 59.9–60.2 | B |
| natural near-end | N | main 3560b58c | 24 | 4 | 0 | 0 / 0 | 0 / 0 | 4 / 0 | 5 / 1 | – | 59.9–60.2 | B |
| natural near-end | S | head 907fb62d | 18 | 11 | 0 | 0 / 0 | 0 / 0 | 11 / 0 | 14 / 3 | – | 59.9–60.2 | B |
| natural near-end | S | main 3560b58c | 18 | 6 | 2 | 0 / 2 | 0 / 0 | 6 / 2 | 10 / 6 | 4.6–21.3 | 59.9–60.6 | B |
| natural near-end (spot check, second unit) | R | head 907fb62d | 12 | 2 | 0 | 0 / 0 | 0 / 0 | 2 / 0 | 3 / 1 | – | 59.9–60.2 | E |
| natural near-end (spot check, second unit) | R | main 3560b58c | 12 | 4 | 1 | 0 / 1 | 0 / 0 | 4 / 1 | 5 / 2 | 10.2 | 59.5–60.2 | E |
| forced finished-getter | R | head 907fb62d | 12 | 8 | 0 | 8 / 0 | 0 / 0 | 8 / 0 | 8 / 0 | 3.6–5.6 | 59.9–60.2 | D |
| forced finished-getter | R | main 3560b58c | 12 | 8 | 0 | 8 / 0 | 0 / 0 | 8 / 0 | 8 / 0 | 3.6–6.2 | 59.9–60.2 | D |

## Boundary and (b)-shaped presses (test)

| Unit | Build | Cell / profile / rep / attempt | Stamp | remove() call | Stamp to remove(), ms | Dispatch | Outcome | Click dispatch | Where, by the 1 ms rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| unit A | main 3560b58c | sweep-d110 / R / 1 / 2 | 223.3 | 228.1 | 4.8 | 234.3 | acted | 241 (untrusted row click) | in the hold |
| unit A | head 907fb62d | sweep-d110 / R / 2 / 1 | 217.4 | 223.3 | 5.9 | 228.9 | held | – | in the hold |
| unit A | head 907fb62d | sweep-d110 / R / 2 / 3 | 240.2 | 241.5 | 1.3 | 249.6 | held | – | in the hold |
| unit A | main 3560b58c | sweep-d120 / R / 2 / 2 | 238.2 | 238.7 | 0.5 | 246.5 | acted | 252.1 (untrusted row click) | after the hold by its end stamp; 0.5 ms before remove() |
| unit B | head 907fb62d | sweep-d080 / N / 1 / 1 | 196.2 | 197.4 | 1.2 | 207.1 | held | – | in the hold |
| unit B | head 907fb62d | sweep-d080 / N / 1 / 3 | 210.5 | 213.9 | 3.4 | 220 | held | – | in the hold |
| unit B | head 907fb62d | sweep-d085 / N / 2 / 2 | 195 | 195.2 | 0.2 | 201.6 | acted | 208.2 (untrusted row click) | after the hold by its end stamp; 0.2 ms before remove() |
| unit B | main 3560b58c | sweep-d090 / S / 1 / 3 | 243.1 | 245.6 | 2.5 | 266.9 | acted | 290.3 (untrusted row click) | in the hold |
| unit B | main 3560b58c | sweep-d110 / S / 2 / 3 | 224.9 | 229.2 | 4.3 | 233.8 | acted | 254.5 (untrusted row click) | in the hold |
| unit C | head 907fb62d | sweep-d095 / R / 1 / 2 | 244.1 | 247.5 | 3.4 | 257.8 | held | – | in the hold |
| unit C | main 3560b58c | sweep-d100 / R / 1 / 1 | 229.8 | 233.6 | 3.8 | 239.6 | acted | 248.5 (untrusted row click) | in the hold |
| unit D | head 907fb62d | forced-c210-d140 / R / 1 / 1 | 279.5 | 348.2 | 68.7 | 353.8 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d140 / R / 1 / 3 | 236.8 | 336.1 | 99.3 | 340 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d140 / R / 1 / 1 | 239 | 338.3 | 99.3 | 342 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d140 / R / 1 / 3 | 261.5 | 341.4 | 79.9 | 347.6 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d140 / R / 2 / 1 | 306.4 | 328.3 | 21.9 | 331.9 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d140 / R / 2 / 3 | 269.9 | 342.8 | 72.9 | 347.8 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d140 / R / 2 / 1 | 269.4 | 324.5 | 55.1 | 328.3 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d140 / R / 2 / 3 | 280.2 | 325.8 | 45.6 | 329.8 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d150 / R / 1 / 1 | 287.1 | 339.2 | 52.1 | 343.5 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d150 / R / 1 / 3 | 313.3 | 345.9 | 32.6 | 350.9 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d150 / R / 1 / 1 | 260 | 335.9 | 75.9 | 339.9 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d150 / R / 1 / 3 | 263.8 | 342.9 | 79.1 | 347.9 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d150 / R / 2 / 1 | 309.5 | 327.7 | 18.2 | 331.3 | held | – | in the hold |
| unit D | main 3560b58c | forced-c210-d150 / R / 2 / 3 | 273 | 344.3 | 71.3 | 349.4 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d150 / R / 2 / 1 | 247.9 | 323.9 | 76 | 327.5 | held | – | in the hold |
| unit D | head 907fb62d | forced-c210-d150 / R / 2 / 3 | 313.5 | 342.3 | 28.8 | 347.4 | held | – | in the hold |
| unit E | main 3560b58c | sweep-d105 / R / 2 / 1 | 221.8 | 229.1 | 7.3 | 239.3 | acted | 249.1 (untrusted row click) | in the hold |

- Times are ms from the trace's start on the page clock. The stamps are `event.timeStamp`, and the dispatch times are `performance.now()` in capture listeners.

## Devices and kit

- Real Pixel 8 units A to E, Android 17, with Chrome 155, 156 or 157. The spot check ran on a different unit from the calibration and the sweeps.
- A copy of the Android touch kit 6.3.8, labelled for this check.

## Files

- `presses-public.json`: all 235 presses, with each rule's reading, the class, the frame timing and the click.
