import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {webkit} from 'playwright';
const dir = '/tmp/touch-split-timing';
const server = createServer((req, res) => { const name = req.url.slice(1) || 'split.html'; try { res.writeHead(200, {'content-type': name.endsWith('.js') ? 'text/javascript' : 'text/html'}); res.end(readFileSync(join(dir, name))); } catch { res.writeHead(404).end(); } });
await new Promise(r => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await webkit.launch();
for (const coarse of [true, false]) {
  const context = await browser.newContext(coarse ? {isMobile: true, hasTouch: true, viewport: {width: 402, height: 874}} : {});
  const page = await context.newPage();
  const urls = [];
  page.on('request', r => urls.push(r.url().replace(base + '/', '')));
  await page.goto(`${base}/split.html`);
  await page.waitForFunction(() => performance.getEntriesByName('page-ready').length > 0, null, {timeout: 30000});
  const media = await page.evaluate(() => ({anyCoarse: matchMedia('(any-pointer: coarse)').matches, coarse: matchMedia('(pointer: coarse)').matches}));
  console.log(JSON.stringify({coarse, media, fetched: urls.filter(u => u.endsWith('.js'))}));
  await context.close();
}
await browser.close(); server.close();
