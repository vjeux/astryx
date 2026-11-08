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

## The iOS home-screen web app

The same page added to the Home Screen and opened as a web app, so no
browser chrome shows. Built from b143b86c01's code.

Main (left of each pair) and this fix (right): a tap on the composer, then
the keyboard's Next into the composer from a probe field. Main puts the
composer off screen; the fix rests it on the keyboard.

![Home-screen app, main and fix](ios-home-screen-main-fix.png)

This fix, every entry path. Columns: no keyboard, tap, Done, Previous (top
row, `?case=long`) or Next (bottom row, `?case=composer`) into the composer
from a probe field, and `focus()` with no gesture, which shows no keyboard.

![Home-screen app, this fix](ios-home-screen-app.png)
