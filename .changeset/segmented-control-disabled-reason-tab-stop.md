---
'@astryxdesign/core': patch
---

[fix] A disabled `SegmentedControl` keeps its one Tab stop, and its `disabledMessage` describes the segment that takes focus (`spec:AST-085` FR1, FR5). Before, a control disabled without a reason, or one whose selected segment was itself disabled, could not be reached with Tab, and the reason described only the radiogroup. The Tab stop is the selected segment, even one disabled by its own `isDisabled`, or, for a value no segment carries, the first segment not disabled by itself. It follows focus inside the control and returns to the selected segment when focus leaves. A caller's `aria-describedby` stays on the radiogroup; the reason is no longer added there.

@vjeux
