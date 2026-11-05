// One-off probe (not committed): what a hot reload does to on-screen toasts under
// Storybook's Vite dev server (React Fast Refresh). Usage:
//   node hmr-probe.mjs <repo> <port> <file1> [file2 ...]
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const [repo, port, ...files] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json'));
const {chromium} = require('@playwright/test');
const url = `http://127.0.0.1:${port}/iframe.html?id=core-toast--shown-on-mount&viewMode=story`;

async function waitForServer() {
  for (let i = 0; i < 240; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('storybook dev did not come up');
}

const state = page =>
  page.evaluate(() => ({
    marker: window.__hmrMarker ?? null,
    toastIds: [...document.querySelectorAll('#storybook-root [data-toast-id]')].map(
      el => el.getAttribute('data-toast-id'),
    ),
    toastText: [...document.querySelectorAll('#storybook-root [data-toast-id]')].map(
      el => el.textContent.slice(0, 30),
    ),
    buttonSame: window.__hmrButton != null && window.__hmrButton.isConnected,
  }));

await waitForServer();
const browser = await chromium.launch();
const page = await browser.newPage();
const log = [];
page.on('console', m => {
  const t = m.text();
  if (/vite|hmr|hot|reload|refresh/i.test(t)) log.push(t.slice(0, 160));
});
await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 300000});
await page.locator('[popover="manual"]').getByText('Shown as the page mounted').first().waitFor({timeout: 300000});
await page.waitForTimeout(1500);
// Click once so a second, button-made toast is on screen too.
await page.getByRole('button', {name: 'Show another toast'}).click();
await page.waitForTimeout(800);
await page.evaluate(() => {
  window.__hmrMarker = 'set before the edit';
  window.__hmrButton = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Show another toast'));
});
const results = [{step: 'before any edit', ...(await state(page))}];
for (const rel of files) {
  const file = path.join(repo, rel);
  const original = fs.readFileSync(file, 'utf8');
  try {
    log.length = 0;
    fs.writeFileSync(file, original + `\n// hmr probe ${Date.now()}\n`);
    await page.waitForTimeout(6000);
    results.push({step: `after editing ${rel}`, ...(await state(page)), vite: [...log]});
  } finally {
    fs.writeFileSync(file, original);
  }
  await page.waitForTimeout(6000);
  results.push({step: `after restoring ${rel}`, ...(await state(page))});
}
await browser.close();
console.log(JSON.stringify(results, null, 1));
