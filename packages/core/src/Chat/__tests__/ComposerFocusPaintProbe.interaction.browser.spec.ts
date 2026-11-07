// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: a measurement probe. Paint from ChatComposer's focus
// transition while a stand-in keyboard rises after a tap.

import {test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  openStory,
  tap,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

// The iPhone 17 Pro keyboard's height, and the settle of UIKit's keyboard
// spring (m1 k555 c47.1): the window in which the keyboard rides.
const KEYBOARD = 336;
const WINDOW_MS = 383;

async function installKeyboard(page: Page) {
  await page.addInitScript(() => {
    const viewport = Object.assign(new EventTarget(), {
      height: window.innerHeight,
      width: window.innerWidth,
      offsetTop: 0,
      offsetLeft: 0,
      pageTop: 0,
      pageLeft: 0,
      scale: 1,
    });
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      get: () => viewport,
    });
    (window as unknown as {__keyboard: (cover: number) => void}).__keyboard =
      cover => {
        viewport.height = window.innerHeight - cover;
        viewport.dispatchEvent(new Event('resize'));
      };
  });
}

interface Record {
  t0: number | null;
  frames: number;
  shadowFrames: number;
  transitions: {p: string; start: number; duration: number}[];
  bodyTransition: string;
}

/** Marks the focus, raises the keyboard on it, and optionally samples frames. */
async function instrument(page: Page, off: boolean, sample: boolean) {
  await page.evaluate(
    ({off, sample, KEYBOARD, WINDOW_MS}) => {
      const body = [
        ...document.querySelectorAll<HTMLElement>('#storybook-root *'),
      ].find(el => getComputedStyle(el).transitionProperty.includes('box-shadow'));
      if (body == null) throw new Error('no element with a box-shadow transition');
      if (off) body.style.transition = 'none';
      const rec: Record = {
        t0: null,
        frames: 0,
        shadowFrames: 0,
        transitions: [],
        bodyTransition: `${getComputedStyle(body).transitionProperty} / ${getComputedStyle(body).transitionDuration}`,
      };
      (window as unknown as {__probe: Record}).__probe = rec;
      document.addEventListener(
        'focusin',
        () => {
          if (rec.t0 != null) return;
          rec.t0 = performance.now();
          console.timeStamp('probe-focus');
          (window as unknown as {__keyboard: (c: number) => void}).__keyboard(KEYBOARD);
          if (!sample) return;
          const tick = () => {
            if (performance.now() - rec.t0! > WINDOW_MS) return;
            rec.frames++;
            const running = body
              .getAnimations()
              .filter(a => a.playState === 'running') as CSSTransition[];
            if (
              running.some(
                a =>
                  a.transitionProperty === 'box-shadow' ||
                  a.transitionProperty === 'border-color',
              )
            )
              rec.shadowFrames++;
            for (const a of running) {
              if (a.transitionProperty && !rec.transitions.some(x => x.p === a.transitionProperty))
                rec.transitions.push({
                  p: a.transitionProperty,
                  start: Number(a.startTime) - rec.t0!,
                  duration: Number(a.effect?.getComputedTiming().duration),
                });
            }
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        true,
      );
    },
    {off, sample, KEYBOARD, WINDOW_MS},
  );
}

async function tapEditor(page: Page) {
  const editor = page
    .locator('#storybook-root [contenteditable="true"], #storybook-root textarea')
    .first();
  const box = await editor.boundingBox();
  if (box == null) throw new Error('no editor');
  const driver = await touchDriver(page);
  await driver.play(tap({x: box.x + box.width / 2, y: box.y + box.height / 2}, {holdMs: 60}));
  // Playwright's Linux WebKit does not focus a contenteditable on a touch
  // tap; a mouse click focuses it with pointer modality, as a tap would.
  const focused = await page.evaluate(() => document.activeElement?.closest('#storybook-root') != null);
  if (!focused) await editor.click();
}

const STORIES = [
  'core-chatcomposer--simplest',
  'core-chatcomposer--flat',
  'core-chatlayout--full-ai-chat',
];

for (const story of STORIES) {
  for (const off of [false, true]) {
    const arm = off ? 'transition-off' : 'transition-on';
    test(`probe paints ${story} ${arm}`, async ({page, browserName}) => {
      test.skip(browserName !== 'chromium', 'CDP tracing: Chromium only');
      await installKeyboard(page);
      await openStory(page, storybook(), story);
      await instrument(page, off, false);
      const cdp = await page.context().newCDPSession(page);
      const events: {name: string; ts: number; dur?: number; args?: {data?: {message?: string}}}[] = [];
      cdp.on('Tracing.dataCollected', e => events.push(...(e.value as typeof events)));
      const done = new Promise(resolve => cdp.once('Tracing.tracingComplete', resolve));
      await cdp.send('Tracing.start', {
        traceConfig: {includedCategories: ['devtools.timeline']},
        transferMode: 'ReportEvents',
      });
      await tapEditor(page);
      await page.waitForTimeout(WINDOW_MS + 400);
      await cdp.send('Tracing.end');
      await done;
      const mark = events.find(e => e.name === 'TimeStamp' && e.args?.data?.message === 'probe-focus');
      if (mark == null) throw new Error('no focus mark: the tap did not focus the editor');
      const inWindow = (e: {ts: number}) => e.ts >= mark.ts && e.ts <= mark.ts + WINDOW_MS * 1000;
      const paints = events.filter(e => e.name === 'Paint' && inWindow(e));
      const rec = await page.evaluate(() => (window as unknown as {__probe: Record}).__probe);
      console.log(
        `PROBEDATA ${JSON.stringify({engine: browserName, mode: 'paints', story, arm, paints: paints.length, paintMs: paints.reduce((s, e) => s + (e.dur ?? 0), 0) / 1000, body: rec.bodyTransition})}`,
      );
    });
    test(`probe frames ${story} ${arm}`, async ({page, browserName}) => {
      await installKeyboard(page);
      await openStory(page, storybook(), story);
      await instrument(page, off, true);
      await tapEditor(page);
      await page.waitForTimeout(WINDOW_MS + 400);
      const rec = await page.evaluate(() => (window as unknown as {__probe: Record}).__probe);
      if (rec.t0 == null) throw new Error('the tap did not focus the editor');
      console.log(
        `PROBEDATA ${JSON.stringify({engine: browserName, mode: 'frames', story, arm, frames: rec.frames, shadowFrames: rec.shadowFrames, transitions: rec.transitions, body: rec.bodyTransition})}`,
      );
    });
  }
}
