---
'@astryxdesign/core': patch
---

[fix] The calendar in the DateInput and DateTimeInput bottom sheets now tells a screen reader the month it shows. Once the calendar rests on a new month, after a swipe, a scroll, an arrow or a Page key, it announces the month politely, as the pointer Calendar does. Opening the sheet, and a month the month and year wheels choose, announce nothing.

@vjeux
