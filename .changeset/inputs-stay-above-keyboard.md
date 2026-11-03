---
'@astryxdesign/core': patch
---

[feat] On a phone or tablet, TextInput, TextArea and NumberInput keep themselves in view as the on-screen keyboard opens, with nothing to turn on. In scrolling content, the field's nearest scroller brings it 10 px above the keyboard as far as it can scroll. In a bar fixed at the bottom of the viewport, even one the app owns, the bar moves up by the part of it the keyboard covers and back down when it closes, and a bar the app already moves with the keyboard is left alone; bars that position with `translate` don't ride yet; use `transform` or no translate. A first tap focuses the field without the browser panning the page, and the field's `onClick` still runs once, from a synthetic touch click (a `PointerEvent` whose `isTrusted` is false). Inside a Dialog or another container that fills the viewport, the field's scroller there brings it up; with none, and in a fixed bar that floats above the bottom edge, the browser's own reveal stays. A bar taller than the room above the keyboard, such as a full-height drawer, stays put while its scroller brings the field up, or with none moves only as far as the field needs; inside a Tall BottomSheet the sheet keeps the field clear. Nothing changes under a mouse or a trackpad.

@vjeux
