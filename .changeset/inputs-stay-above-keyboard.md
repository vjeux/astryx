---
'@astryxdesign/core': patch
---

[feat] On a phone or tablet, TextInput, TextArea and NumberInput keep themselves in view as the on-screen keyboard opens, with nothing to turn on. In page content, their scrollers bring the focused field 17 px above the keyboard as far as they can scroll. In a bar fixed at the bottom of the viewport, even one the app owns, the bar rides up with the keyboard and back down when it closes; the ride moves the bar with its `translate`, so the app should not animate the bar's own `translate`. A first tap focuses the field without the browser panning the page, and the field's `onClick` still runs once, from a synthetic touch click (a `PointerEvent` whose `isTrusted` is false). Inside a Dialog or a Hug or Capped BottomSheet the browser's own reveal stays, and inside a Tall BottomSheet the sheet keeps the field clear. Nothing changes under a mouse or a trackpad.

@vjeux
