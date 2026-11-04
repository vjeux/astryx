---
'@astryxdesign/core': patch
---

[feat] ChatLayout: with a software keyboard up, dragging the conversation down to the composer and lifting there now dismisses the keyboard, as in Messages; a release moving back up keeps it. A finger drags, and so does a pen the browser reports as touches; in a desktop browser a mouse press, or a press of a pen reported as a pointer, already takes focus off the composer, so the keyboard leaves at the press. A web page cannot move the system keyboard, so the keyboard leaves on its own at the lift instead of following the finger. Drags that start in the composer never dismiss it, and dismissing moves focus nowhere. Drag-to-dismiss has no caller control. Typing with a keyboard is unchanged.

@vjeux
