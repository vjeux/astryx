// Local probe, not for landing: loads a deployed busy-page tooltip-scroll
// story at phone width and checks it works.
//   node c07-preview-check.mjs <iframe url> <out prefix>
import {chromium} from '@playwright/test';

const [url, out] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 390, height: 844}});
const response = await page.goto(url, {waitUntil: 'load'});
const tooltip = page.getByRole('tooltip');
const trigger = page.getByRole('button', {name: 'Row 31: tooltip trigger'});
const busy = page.getByRole('switch', {name: 'Busy page'});
await tooltip.waitFor({state: 'visible', timeout: 30_000});
await trigger.waitFor({state: 'visible', timeout: 30_000});
await page.waitForTimeout(500);
const list = () =>
  trigger.evaluate(el => {
    let node = el.parentElement;
    while (node && getComputedStyle(node).overflowY !== 'auto') {
      node = node.parentElement;
    }
    const r = node.getBoundingClientRect();
    return {x: r.x, y: r.y, width: r.width, height: r.height, scrollTop: node.scrollTop};
  });
const opened = {
  status: response?.status(),
  tooltip: await tooltip.boundingBox(),
  trigger: await trigger.boundingBox(),
  list: await list(),
  docWidth: await page.evaluate(() => document.documentElement.scrollWidth),
  docHeight: await page.evaluate(() => document.documentElement.scrollHeight),
};
await page.screenshot({path: `${out}-opened.png`});
await page.evaluate(() => {
  window.__long = [];
  new PerformanceObserver(entries => {
    for (const entry of entries.getEntries()) {
      window.__long.push(Math.round(entry.duration));
    }
  }).observe({type: 'longtask'});
});
await busy.click();
const checked = await busy.isChecked();
const box = opened.list;
await page.mouse.move(box.x + box.width - 12, box.y + box.height / 2);
for (let i = 0; i < 16; i += 1) {
  await page.mouse.wheel(0, 50);
  await page.waitForTimeout(40);
}
await page.waitForTimeout(1200);
const scrolled = await list();
const longTasks = await page.evaluate(() => window.__long);
await page.screenshot({path: `${out}-scrolled.png`});
console.log(
  JSON.stringify({url, opened, checked, scrolledTop: scrolled.scrollTop, pageY: await page.evaluate(() => scrollY), longTasks}),
);
await browser.close();
