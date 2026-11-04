# A tall tooltip under scrolls, with and without the JS re-pick

Story `core-tooltip--tall-content`, held open. The tooltip is painted magenta
(Chromium) or orange (iOS); its trigger is cyan or blue.

- **JS on**: main at a0c48b8d73.
- **JS off**: the probe build at b2d173cec0. After the tooltip has switched to
  the anchor-clear list, the page sets `__astryxLayerProbe = 'nomove'`. The
  move report then re-reads nothing, so only CSS anchor positioning moves the
  tooltip.

The Chromium sheets come from the probe spec in the parent commit (Chromium
149, 390 x 700 viewport). The iOS sheets are frames of a 60 fps recording of
Mobile Safari in the iOS 26.2 simulator, cropped to the page.

| Sheet | What it shows |
| --- | --- |
| `chromium-busy-js-on.png` | A smooth 440 px scroll, with the main thread blocked for 1 s two frames in. During the block, the tooltip moves with its trigger and slides off the bottom edge. After the block, two more frames are wrong; the JS re-pick then places it above the trigger (t = 1035 ms). |
| `chromium-busy-js-off.png` | The same scroll. After the block, the tooltip stays off the bottom edge (610 to 1124 px at 1.5 s). |
| `chromium-instant-js-on.png` | An instant 240 px scroll. Painted frame 1 is off the top edge; frame 2 is re-fitted. |
| `chromium-instant-js-off.png` | The same scroll. The tooltip stays below its trigger, off the bottom edge. |
| `ios26-busy-js-on.png` | Every 4th frame. A smooth 440 px scroll, with the main thread blocked for 1.5 s. The trigger scrolls under the tooltip, which does not move for the whole block. The first frame after the block places it above the trigger. |
| `ios26-busy-js-off.png` | The same, with JS off: the same frames. |
| `ios26-instant-js-on.png` | Every frame. An instant 240 px scroll places the tooltip below its trigger in the first frame. |
| `ios26-instant-js-off.png` | The same, with JS off: the same frames. |
