---
'@astryxdesign/core': patch
---

[feat] Slider: the thumb tracks as UISlider does, under a finger and under a mouse. Only the thumb takes a drag, through a 48 px target on a touch screen, so a swipe from the track scrolls the page; a tap on the track or a mark sets the value when the finger lifts (UISlider ignores track taps; a drag is not the only pointer way to set the value, WCAG 2.5.7). The value follows the pointer's travel past a 10 px threshold over the track's length, so the thumb never jumps to the pointer; a mouse drag may start in any direction. A finger's release coasts on UIKit's spring before `onChangeEnd` reports; the coast runs on the compositor and keeps moving while the main thread is busy. Under Reduce Motion the thumb does not grow, a tap's value applies at once, and the coast keeps moving. A mouse press on the track still sets the value where it lands, and only a primary click presses. UISlider's measured values join the internal UIKit constants table.
@vjeux
