---
'@astryxdesign/core': patch
---

[feat] Under the touch presentation, ToggleButtonGroup tracks a finger's or a pen's press across its toggles, like a menu. Press a toggle and slide across the others: the highlight follows, and only the toggle you lift on changes. Lifting outside the group changes nothing. A mouse press is unchanged: it acts as a native toggle's, on the toggle it began on. With a finger, each toggle's target grows toward 44 px, up to half the gap to a neighbour, without the toggles growing. A toggle without a value keeps its own press, and the keyboard is unchanged. Before, each toggle tracked only its own press, and sliding off it changed nothing. Under a coarse primary pointer, while its touch hit layer grows a toggle's target, an enabled group's root is also `position: relative` and `isolation: isolate`, so an absolutely positioned child places against it there. With a fine primary pointer, the group is unchanged.

@vjeux
