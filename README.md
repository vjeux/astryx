# ChatLayout with a scrollRef: the composer and Safari's keyboard

Page: the Sandbox's Chat Layout page, in Safari on the iOS 26.2 Simulator.
`?case=long` and `?case=composer` scroll the document; `?case=docked` scrolls
itself.

## Safari in the browser

Columns: `long`, `composer`, `docked`. Top row: main with the page
(b468198b99). Bottom row: the fix at 8bb22d9c95, with the page applied
locally. Each frame is cropped to the page, above Safari's address pill.

Keyboard open, after a tap on the composer:

![Keyboard open](ios-keyboard-open.png)

No keyboard, at the document's end:

![No keyboard](ios-no-keyboard.png)

## The iOS home-screen web app

The same page added to the Home Screen and opened as a web app, so no
browser chrome shows. The fix frames come from a build of d0516270ff. The
final head changes only the lift's undo after a show that found the dock
covered, which Safari's path never reaches.

Main (left of each pair) and the fix (right): a tap on the composer, then the
keyboard's Next into the composer from a probe field. Main puts the composer
off screen; the fix rests it on the keyboard.

![Home-screen app, main and fix](ios-home-screen-main-fix.png)

The fix, every entry path. Columns: no keyboard, tap, Done, Next into the
composer from a probe field, and `focus()` with no gesture, which shows no
keyboard. Top row `?case=long`, bottom row `?case=composer`.

![Home-screen app, the fix](ios-home-screen-app.png)
