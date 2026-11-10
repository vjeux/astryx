---
'@astryxdesign/core': patch
---

[feat] TimeInput, DateTimeInput: under a finger, the bottom sheet's minute wheel loops, as UIDatePicker's does: past 59 comes 00. Its seam carries the hour, so four rows on from 12:58 PM reads 1:02 PM. A drag, a fling, a tap or an arrow key passes the seam. Home, End and a click on a minute stay within the hour. The minutes past the seam follow their own hour's bounds, and in DateTimeInput a carry past midnight keeps the chosen date. The hour wheel does not loop yet. Each minute is still listed once for assistive technology.

@vjeux
