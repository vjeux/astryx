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
browser chrome shows. The fix frames come from a build of d0516270ff.

Main (left of each pair) and the fix (right): a tap on the composer, then the
keyboard's Next into the composer from a probe field. Main puts the composer
off screen; the fix rests it on the keyboard.

![Home-screen app, main and fix](ios-home-screen-main-fix.png)

The fix, every entry path. Columns: no keyboard, tap, Done, Next into the
composer from a probe field, and `focus()` with no gesture, which shows no
keyboard. Top row `?case=long`, bottom row `?case=composer`.

![Home-screen app, the fix](ios-home-screen-app.png)

## Safari at 714141ef23: a scripted trace

The frames above come from earlier builds (8bb22d9c95 in the browser,
d0516270ff as a home-screen app). Safari at 714141ef23 is carried by a
scripted trace on the iOS 26.2 Simulator, `?case=long`: a tap on the composer,
then, with the keyboard up, drags toward the top, to the bottom and back to the
top, then three lines typed. A page-side recorder logs the dock's rect, its
applied lift and the visual viewport on every frame.

On every frame of every take, the dock's applied lift is 0 px at 714141ef23, as
on 33bc644a. Neither build flips the dock's direction within 100 ms at 2 px or
more. Each cell is the share of settled frames, with the keyboard up and the
composer focused, where the dock's bottom sits more than 1 px off the visual
viewport's bottom. Safari's own slide on a slow drag toward the top is the same
on both builds, as in earlier releases.

| Build, take | Toward the top | To the bottom | Back to the top | Typing |
| --- | --- | --- | --- | --- |
| 33bc644a, browser 1 | 88% | 37% | 0% | 0% |
| 33bc644a, browser 2 | 90% | 49% | 0% | 0% |
| 714141ef23, browser 1 | 82% | 55% | 0% | 0% |
| 714141ef23, browser 2 | 88% | 39% | 0% | 0% |
| 33bc644a, home-screen app | 86% | 41% | not recorded | not recorded |
| 714141ef23, home-screen app | 88% | 46% | not recorded | not recorded |

The home-screen takes stop recording at 5,400 frames, before the last two
phases, on both builds.
