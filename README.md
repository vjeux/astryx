# Reset native-control-part stills

Bare pages with only `packages/core/src/reset.css` inlined, plus a few author styles for the fields. Each `-before` page carries main 3e58ae0f8f's reset, which is the merge base of both pull requests. Each `-after` page carries the head's reset.

| Page | Reset from |
| --- | --- |
| `pages/7524-before.html` | main 3e58ae0f8f |
| `pages/7524-after.html` | #7524 head 6efb2174e554b37c0a0c398772d3e13448f4892b |
| `pages/7529-before.html` | main 3e58ae0f8f |
| `pages/7529-after.html` | #7529 head 494a49ea8f36da807eafa65261e402ad1ae4547f |

Chrome stills: Chrome for Testing 149.0.7827.55 (Playwright's full Chromium build, not the headless shell), Linux, 2x, light, each page's `#shot` element.

| Still | Field heights (CSS px) |
| --- | --- |
| `7524-before-chrome.png` | text 40, empty date 42, date 42, time 42 |
| `7524-after-chrome.png` | text 40, empty date 40, date 40, time 40 |
| `7529-before-chrome.png` | file input 24, button 24 (enabled and disabled) |
| `7529-after-chrome.png` | file input 26, button 24 (enabled and disabled) |
