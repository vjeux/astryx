# ChatLayout with a scrollRef: the composer and Safari's keyboard

Page: the Sandbox's Chat Layout page (#10672), in Safari on the iOS 26.2
Simulator, phone 402 × 874. Columns: `?case=long`, `?case=composer` (both
scroll the document) and `?case=docked` (self-scroll). Top row: main with the
page (b468198b99). Bottom row: this fix at cd2f76b761, with the page applied
locally. Each frame is cropped to the page, above Safari's address pill.

Keyboard open, after a tap on the composer:

![Keyboard open](ios-keyboard-open.png)

No keyboard, at the document's end:

![No keyboard](ios-no-keyboard.png)
