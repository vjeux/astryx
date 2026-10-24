// Load timing of the three variants under throttled networks in Chromium:
// navigation start to the touch layer ready, and which scripts were fetched.
import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import {join, resolve} from 'node:path';
import {chromium} from 'playwright';

const dir = resolve(process.argv[2] ?? '/tmp/touch-split-timing');
const runs = Number(process.argv[3] ?? 8);
const server = createServer((req, res) => {
  const name = req.url.split('?')[0].replace(/^\//, '') || 'bundle.html';
  try {
    const body = gzipSync(readFileSync(join(dir, name)));
    res.writeHead(200, {
      'content-type': name.endsWith('.js') ? 'text/javascript' : 'text/html',
      'content-encoding': 'gzip',
      'cache-control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise(r => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const profiles = {
  'slow 4G (150 ms RTT, 1.6 Mbps)': {latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8},
  '4G (70 ms RTT, 9 Mbps)': {latency: 70, downloadThroughput: 9e6 / 8, uploadThroughput: 1.5e6 / 8},
};
const browser = await chromium.launch();
const results = [];
for (const [profile, conditions] of Object.entries(profiles)) {
  for (const [variant, coarse] of [['bundle', true], ['lazy', true], ['split', true], ['split', false]]) {
    const times = [];
    let fetched = [];
    for (let i = 0; i < runs; i++) {
      const context = await browser.newContext(coarse ? {isMobile: true, hasTouch: true, viewport: {width: 402, height: 874}} : {});
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', {cacheDisabled: true});
      await cdp.send('Network.emulateNetworkConditions', {offline: false, ...conditions});
      const urls = [];
      page.on('request', r => urls.push(r.url().replace(base + '/', '')));
      await page.goto(`${base}/${variant}.html`);
      const mark = coarse ? 'touch-ready' : 'page-ready';
      await page.waitForFunction(m => performance.getEntriesByName(m).length > 0, mark, {timeout: 60000});
      times.push(await page.evaluate(m => performance.getEntriesByName(m)[0].startTime, mark));
      fetched = urls;
      await context.close();
    }
    times.sort((a, b) => a - b);
    const median = times[Math.floor(times.length / 2)];
    results.push({profile, variant, pointer: coarse ? 'coarse' : 'fine', medianMs: Math.round(median), minMs: Math.round(times[0]), maxMs: Math.round(times.at(-1)), fetched: fetched.filter(u => u.endsWith('.js'))});
    console.log(JSON.stringify(results.at(-1)));
  }
}
await browser.close();
server.close();
