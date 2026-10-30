---
'@astryxdesign/core': patch
---

[fix] Under a coarse primary pointer (a touch screen as the main input), the touch press release of every other surface the shared pressed overlay paints now runs on the compositor, as a button's does: SegmentedControl's segments, Switch, Tab, Link, SideNav's items and headings, Stepper's steps, Outline's entries, Calendar's days, Collapsible, NumberInput's steppers, Token, TopNav's items and menus, CommandPalette's options, AvatarGroup's overflow and DateInput's touch field. The release keeps fading while the page's script is busy instead of freezing and snapping off, and it paints nothing per frame, in WebKit too; the pressed look, the clock and the curve are unchanged. A menu row's highlight now follows the finger at once instead of fading in. With any other pointer, a finger on a touch screen beside a mouse included, nothing changes. Under a coarse primary pointer, while a press is on or fading, these surfaces paint it on their own `::before` (a Stepper step on its `::after`; a Switch on its track's `::after`) and set `isolation: isolate`, and one that is not positioned becomes `position: relative`; at rest they add none of these, so a pseudo-element you style keeps its styles outside a press.

@vjeux
