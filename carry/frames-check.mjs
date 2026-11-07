#!/usr/bin/env node
// Same-frames check for the List batch card's desktop arm: serves two built
// Storybooks, drags each card story's first handle with a mouse in Chromium
// at 1024x720 (the card's gesture), and compares a mid-drag frame and the
// settled frame after the drop, pixel by pixel.
// Usage: node frames-check.mjs <repo-with-node_modules> <dist A> <dist B> <out dir>
import {createRequire} from 'node:module';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const [repo, distA, distB, outDir] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json'));
const {chromium} = require('playwright');
const {PNG} = require('pngjs');
const pixelmatch = require('pixelmatch').default ?? require('pixelmatch');

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function serve(dir) {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    let file = path.join(dir, decodeURIComponent(url.pathname));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
    if (!file.startsWith(dir) || !fs.existsSync(file)) {
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200, {
      'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    });
    fs.createReadStream(file).pipe(response);
  });
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// The card's desktop gesture: 2.6 rows (List: 1.6) in 40 steps over 1 s.
const STORIES = [
  {id: 'lab-transferlist--searchable', rows: 2.6},
  {id: 'lab-listinput--stress', rows: 2.6},
  {id: 'core-list--reorderable', rows: 1.6},
  {id: 'core-list--reorder-long-list', rows: 1.6},
];

async function frames(browser, origin, label) {
  const context = await browser.newContext({
    viewport: {width: 1024, height: 720},
    deviceScaleFactor: 1,
    hasTouch: false,
    reducedMotion: 'no-preference',
  });
  const results = {};
  for (const story of STORIES) {
    const page = await context.newPage();
    await page.goto(`${origin}/iframe.html?id=${story.id}&viewMode=story`);
    const handle = page.locator('button[data-astryx-list-reorder]').first();
    await handle.waitFor({state: 'visible', timeout: 15000});
    await page.waitForTimeout(500);
    const box = await handle.boundingBox();
    const rowHeight = await handle.evaluate(element => {
      const row = element.closest('li, [data-list-input-row]');
      return row?.getBoundingClientRect().height ?? 44;
    });
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    for (let step = 1; step <= 40; step += 1) {
      await page.mouse.move(x, y + (rowHeight * story.rows * step) / 40);
      await page.waitForTimeout(25);
    }
    await page.waitForTimeout(Number(process.env.EARLY_MS ?? 150));
    const early = await page.screenshot();
    const rects = await page.evaluate(() => {
      const rect = selector => {
        const element = document.querySelector(selector);
        const box = element?.getBoundingClientRect();
        return box == null
          ? null
          : [box.left, box.top, box.width, box.height].map(Math.round);
      };
      const preview = document.querySelector('[data-astryx-reorder-preview]');
      return {
        preview: rect('[data-astryx-reorder-preview]'),
        source: rect('[data-astryx-reorder-source]'),
        willChange: preview == null ? null : getComputedStyle(preview).willChange,
      };
    });
    await page.waitForTimeout(650);
    const during = await page.screenshot();
    const lateWillChange = await page.evaluate(() => {
      const preview = document.querySelector('[data-astryx-reorder-preview]');
      return preview == null ? null : getComputedStyle(preview).willChange;
    });
    await page.mouse.up();
    await page.waitForTimeout(1500);
    const after = await page.screenshot();
    fs.writeFileSync(path.join(outDir, `${label}-${story.id}-during.png`), during);
    fs.writeFileSync(path.join(outDir, `${label}-${story.id}-after.png`), after);
    fs.writeFileSync(path.join(outDir, `${label}-${story.id}-early.png`), early);
    console.log(label, story.id, JSON.stringify({...rects, lateWillChange}));
    results[story.id] = {early, during, after};
    await page.close();
  }
  await context.close();
  return results;
}

function diff(a, b) {
  const one = PNG.sync.read(a);
  const two = PNG.sync.read(b);
  if (one.width !== two.width || one.height !== two.height) {
    return `size ${one.width}x${one.height} vs ${two.width}x${two.height}`;
  }
  const count = pixelmatch(one.data, two.data, null, one.width, one.height, {
    threshold: 0,
  });
  return `${count} px differ of ${one.width * one.height}`;
}

fs.mkdirSync(outDir, {recursive: true});
const browser = await chromium.launch();
const serverA = await serve(path.resolve(distA));
const serverB = await serve(path.resolve(distB));
const a = await frames(browser, `http://127.0.0.1:${serverA.address().port}`, 'A');
const b = await frames(browser, `http://127.0.0.1:${serverB.address().port}`, 'B');
for (const story of STORIES) {
  for (const phase of ['early', 'during', 'after']) {
    console.log(
      `${story.id} ${phase}: ${diff(a[story.id][phase], b[story.id][phase])}`,
    );
  }
}
await browser.close();
serverA.close();
serverB.close();
