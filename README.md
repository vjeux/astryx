# Evidence: ChatLayout's scroll-to-bottom button on a page that scrolls

The sandbox Chat Layout page at `?case=long`, where the page scrolls its document, in a 402 × 714 viewport.

- **fix:** built from 45130f992c.
- **main:** the same build with main fa30cff134's `useChatStreamScroll.ts`.

Each frame: the page opens at its end, then a 600 px wheel scroll up, then 1 s.

| Engine | main | fix |
| --- | --- | --- |
| Chromium | `chromium-main.png`: the button stays hidden (`inert`) | `chromium-fix.png`: the button shows |
| WebKit | `webkit-main.png`: the button stays hidden (`inert`) | `webkit-fix.png`: the button shows |

At the page's end the button is hidden on both builds, in both engines. No page errors.
