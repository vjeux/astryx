# ChatLayout with no keyboard open: main and #8217's merge

Builds: main at def46d15d9 (left in each image) and #8217's merge at
4a546c248e (right). Story: `core-chatlayout--full-ai-chat`. Desktop is
1280 × 800. Phone is 390 × 844 at 3×, as a touch device. No keyboard is
open. Each offset is the merge minus main, in CSS px, read with
`getBoundingClientRect` once the page has no running animation.

| Engine, viewport | Composer top / bottom on main | Offsets of the composer, dock, field and scroll button | Transcript scroll height |
| --- | --- | --- | --- |
| Chromium, desktop | 650 / 784 | 0 / 0 / 0 / 0 | 931 on both |
| Chromium, phone | 694 / 828 | 0 / 0 / 0 / 0 | 1,177 on both |
| WebKit, desktop | 650 / 784 | 0 / 0 / 0 / 0 | 928 on both |
| WebKit, phone | 693.78 / 827.78 | 0 / 0 / 0 / 0 | 1,249 on both |

At rest the dock has no containment in either build (`contain: none`).

![Chromium, desktop](chromium-desktop.png)
![Chromium, phone](chromium-phone.png)
![WebKit, desktop](webkit-desktop.png)
![WebKit, phone](webkit-phone.png)
