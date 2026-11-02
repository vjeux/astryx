---
'@astryxdesign/core': patch
---

[chore] Internal: UIDatePicker's values measured on iOS 26.2 join the UIKit constants table. For the inline calendar they cover how a day tap selects, the title following a drag of the month grid, the chevron's retarget, the month/year toggle's fade and chevron turn, and the month/year wheels changing the date. For the wheels they cover the AM/PM column following the hour, the turn back onto a bound, and the day clamped to the month. Each value comes with its source. None is exported from the package entry point.

@vjeux
