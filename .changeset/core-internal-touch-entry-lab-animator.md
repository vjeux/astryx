---
'@astryxdesign/core': patch
---

[chore] Internal: Core's internal touch entry re-exports, by name, what Lab's PageControl, NavigationStack and TabBar import: the pan gesture recognizer and its hook, the motion engine's factory (renamed `createMotionEngine`) with its engine, options and curve types, the rubber-band curve, the UIKit gesture values, the right-to-left check, and the touch-presentation hook and query. Lab's `useMotionEngine` hook wraps the engine. Apps import nothing new.

@vjeux
