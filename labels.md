# MediaPlayer: the speed menu and a marker's popover, before and after

Chromium (Playwright), desktop 1280×800, light theme, page only.
Base: main at d1b5532b. Head: 6b6ededc.
Each still is taken after the page settles: fonts ready, network idle, the media's metadata loaded, and, on the head, the speed menu's or the popover's on-demand chunk loaded.

| Still | State |
| --- | --- |
| `speed-menu-main.png` | Lab/MediaPlayer, Custom Layout: the speed menu (`MediaPlaybackRate variant="menu"`) open after a click. Base. |
| `speed-menu-pr.png` | The same state. Head. |
| `speed-menu-diff.png` | pixelmatch, threshold 0.1: 0 differing pixels. |
| `marker-popover-main.png` | Lab/MediaPlayer, Comment Markers: the first marker's popover open (Tab to the marker, then Enter). Base. |
| `marker-popover-pr.png` | The same state. Head. |
| `marker-popover-diff.png` | pixelmatch, threshold 0.1: 0 differing pixels. |

The base and head stills of each state are byte-identical.
