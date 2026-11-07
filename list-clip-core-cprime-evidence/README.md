# Variant C': drop the list's isolation for the post-drop glide

NOT FOR LANDING. A runtime injection on the control build: at the lift, the `ul`'s `isolation` becomes `auto`; when the glide's animations end (727 to 745 ms after the lift), it returns.

- The 1 pt step: 0 frames off in all six takes of the plain clipped card and TransferList (same-session controls 14 and 14, 14 and 15).
- In those two stories nothing rises inside the list, because their rows are not interactive. A fixed header (z-index 1) before the list and an overlay after it keep their taps and pixels through the glide.
- List raises an interactive row's touch band and a swipeable row (z-index 1) at rest under a finger, not only while a finger is down. With interactive, swipeable rows (`core-list--reorder-interactive-in-clipped-card`, build ecef6e4d25):
  - iOS 26.2 Simulator: the rows paint over the header in 22 frames of the glide, up to 7.8 % of its pixels, and a tap at its centre hits a row from the lift on. The control shows 0 frames. `header-mid-glide.png` shows frames 100, 120 and 150: the control on the left, C' on the right.
  - Chromium, phone emulation: for 45 frames (13 to 728 ms after the lift) the header loses its tap at the first row's band, and a page layer before the list is painted over. The control shows 0 frames.
  - An overlay after the list stays on top in both arms.

Files: `detect-*.txt`, `band-paint.txt`, `chromium-glide-isolation.jsonl`. The probe is commit ac70ff795e.
