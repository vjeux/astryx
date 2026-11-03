---
'@astryxdesign/cli': patch
'@astryxdesign/core': patch
---

[feat] `astryx upgrade` rewrites the deprecated `swipeActions` and `swipeBehavior` on `Item` and `ListItem` to `swipe={createSwipe(…)}`, and the four `ItemSwipe*` types to their `@astryxdesign/core/Swipe` names: `SwipeAction`, `CreateSwipeOptions`, `SwipeActionVariant` and `SwipeBehavior`. It is an opt-in early migration. A computed value, or a row that spreads props, keeps the old props with one TODO comment, and a second run changes nothing.

@vjeux
