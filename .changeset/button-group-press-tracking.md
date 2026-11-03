---
'@astryxdesign/core': patch
---

[feat] Under the touch presentation, ButtonGroup tracks a finger's or a pen's press across its buttons, like a menu. Press a button and slide across the others: the highlight follows, and the button you lift on runs. Lifting outside the group runs nothing. A mouse press is unchanged: it acts as a native button's, on the button it began on. With a finger, each button's target grows toward 44 px, up to half the gap to a neighbour, without the buttons growing. A menu trigger in the group keeps its own opening, and the keyboard is unchanged. Before, each button tracked only its own press, and sliding off it ran nothing. Under a coarse primary pointer, while its touch hit layer grows a button's target, an enabled group's root is also `position: relative` and `isolation: isolate`, so an absolutely positioned child places against it there. With a fine primary pointer, the group is unchanged.

@vjeux
