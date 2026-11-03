---
'@astryxdesign/core': patch
---

[feat] NumberInput: a held number stepper keeps stepping, under a mouse, a pen or a finger, wherever the steppers show (a fine primary pointer). It steps once after half a second, as a native iOS stepper does, then on one steady ramp that starts at a quarter of a second and quickens by a tenth each step, down to a twentieth of a second. A tap steps exactly once, on the click the browser sends when it lifts, and a right click presses nothing. While a press steps, the field shows each value, and `onChange` is called once, with the final value, when the press ends; a controlled field then shows whatever value its parent passes back. Sliding onto the other stepper carries the repeat to it. Outside the steppers the repeat keeps its stepper, and sliding more than 70 px away pauses it; coming back resumes it, never with a step at once. The pressed stepper lights at once and clears at once, and a held press selects no text. On a touchscreen laptop, a finger's quick taps on a stepper no longer zoom the page. Keyboard and assistive-technology activation are unchanged.

@vjeux
