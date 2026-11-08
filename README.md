# ChatLayout with no keyboard open: main and #8217's head

Page: the sandbox's Chat Layout page (`/sandbox/pages/chat-layout/`), a
raw page with no sandbox chrome. Builds: main at def46d15d9 with that page
added (left in each image) and #8217's head at 9509d0bf41 (right). Desktop
is 1280 × 800. Phone is 390 × 844 at 3×, as a touch device. No keyboard is
open. Each offset is the head minus main, in CSS px, read with
`getBoundingClientRect` once the page has no running animation.

| Engine, viewport | Composer top / bottom on main | Offsets of the composer, dock, field and scroll button | Transcript scroll height | Document scroll height |
| --- | --- | --- | --- | --- |
| Chromium, desktop | 702 / 800 | 0 / 0 / 0 / 0 | 910 on both | 800 on both |
| Chromium, phone | 746 / 844 | 0 / 0 / 0 / 0 | 1,266 on both | 844 on both |
| WebKit, desktop | 702 / 800 | 0 / 0 / 0 / 0 | 910 on both | 800 on both |
| WebKit, phone | 745.98 / 843.98 | 0 / 0 / 0 / 0 | 1,266 on both | 844 on both |

The transcript is ChatLayout's own scroller, and the document does not
scroll. At rest the dock has no containment in either build
(`contain: none`).

![Chromium, desktop](chromium-desktop.png)
![Chromium, phone](chromium-phone.png)
![WebKit, desktop](webkit-desktop.png)
![WebKit, phone](webkit-phone.png)
