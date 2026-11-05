// Local probe, not for landing: checks the busy-page tooltip-scroll story.
import fs from 'node:fs';
import path from 'node:path';
import {
  castStoryboard,
  startScreencast,
  trackMarker,
} from '@astryxdesign/interaction-harness';
import {expect, test} from '@astryxdesign/a11y-spec/playwright';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';

const OUT = process.env.C07_OUT ?? path.join(process.cwd(), 'c07-story-check');
const TAG = process.env.C07_TAG ?? 'local';
// A deployed Storybook (its /storybook root) instead of the local build.
const ORIGIN = process.env.C07_ORIGIN ?? '';
const MAGENTA = [255, 0, 255] as const;
const CYAN = [0, 255, 255] as const;

let storybook: StaticServer;

test.beforeAll(async () => {
  if (!ORIGIN) {
    storybook = await serveStorybook(
      process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
    );
  }
  fs.mkdirSync(OUT, {recursive: true});
});

test.afterAll(async () => {
  await storybook?.close();
});

for (const busyOn of [false, true]) {
  test(`busy-page tooltip-scroll story at phone width, Busy page ${busyOn ? 'on' : 'off'}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto(
      `${ORIGIN || storybook.origin}/iframe.html?id=core-tooltip-busy-page-scroll--default&viewMode=story`,
    );
    const tooltip = page.getByRole('tooltip');
    const trigger = page.getByRole('button', {name: 'Row 31: tooltip trigger'});
    const busy = page.getByRole('switch', {name: 'Busy page'});
    await expect(tooltip).toBeVisible();
    await expect(trigger).toBeVisible();
    await expect(busy).toBeVisible();
    const opened = {
      tooltip: await tooltip.boundingBox(),
      trigger: await trigger.boundingBox(),
      docWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    };
    await page.addStyleTag({
      content:
        '[role="tooltip"], [role="tooltip"] * {background: rgb(255, 0, 255) !important; color: rgb(255, 0, 255) !important; border-color: rgb(255, 0, 255) !important; box-shadow: none !important; outline: none !important}',
    });
    await trigger.evaluate(el => {
      for (const node of [el, ...el.querySelectorAll<HTMLElement>('*')]) {
        node.style.setProperty('background', 'rgb(0, 255, 255)', 'important');
        node.style.setProperty('color', 'rgb(0, 255, 255)', 'important');
        node.style.setProperty('border-color', 'rgb(0, 255, 255)', 'important');
        node.style.setProperty('box-shadow', 'none', 'important');
      }
    });
    await page.evaluate(() => {
      const w = window as unknown as {__long: number[]};
      w.__long = [];
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          w.__long.push(Math.round(entry.duration));
        }
      }).observe({type: 'longtask'});
    });
    if (busyOn) {
      await busy.click();
      await expect(busy).toBeChecked();
    }
    const listBox = await trigger.evaluate(el => {
      let node = el.parentElement;
      while (node && getComputedStyle(node).overflowY !== 'auto') {
        node = node.parentElement;
      }
      const r = node!.getBoundingClientRect();
      return {x: r.x, y: r.y, width: r.width, height: r.height};
    });
    // The strip right of the tooltip: a wheel there always reaches the list.
    await page.mouse.move(
      listBox.x + listBox.width - 12,
      listBox.y + listBox.height / 2,
    );
    const cast = await startScreencast(page);
    await expect.poll(() => cast.frameCount()).toBeGreaterThan(0);
    for (let i = 0; i < 16; i += 1) {
      await page.mouse.wheel(0, 50);
      await page.waitForTimeout(40);
    }
    await page.waitForTimeout(1200);
    const frames = await cast.stop();
    const longTasks = await page.evaluate(
      () => (window as unknown as {__long: number[]}).__long,
    );
    const scrollTop = await trigger.evaluate(el => {
      let node = el.parentElement;
      while (node && getComputedStyle(node).overflowY !== 'auto') {
        node = node.parentElement;
      }
      return node!.scrollTop;
    });
    const tip = await trackMarker(page, frames, {rgb: MAGENTA});
    const trg = await trackMarker(page, frames, {rgb: CYAN});
    const name = `c07-story-${TAG}-busy-${busyOn ? 'on' : 'off'}`;
    const sheet = await castStoryboard(page, frames, {
      name,
      zero: frames[0]!.t,
      columns: 12,
      cellScale: 0.25,
    });
    const files = await sheet.write(testInfo);
    fs.writeFileSync(
      path.join(OUT, `${name}.json`),
      JSON.stringify(
        {
          opened,
          listBox,
          pageScrollY: await page.evaluate(() => window.scrollY),
          docHeight: await page.evaluate(
            () => document.documentElement.scrollHeight,
          ),
          longTasks,
          scrollTop,
          files,
          frames: frames.map((frame, i) => ({
            t: Math.round(frame.t - frames[0]!.t),
            tooltip: tip[i]!.box,
            trigger: trg[i]!.box,
          })),
        },
        null,
        1,
      ),
    );
    expect(scrollTop).toBeGreaterThan(0);
    if (busyOn) {
      expect(longTasks.length).toBeGreaterThan(0);
    }
  });
}
