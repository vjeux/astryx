// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzC08CaretClassification.interaction.browser.spec.ts (NOT FOR LANDING)
 * @input The built "Full AI Chat" ChatLayout story, a stand-in visual
 *   viewport that reports a software keyboard, real touch input and the
 *   interaction harness
 * @output Proofs that on Chrome's profile the dock rides Gboard's slide up
 *   and down with no Layout or Paint per frame. Under Reduce Motion it never
 *   travels, also on a hide reported in steps. The transcript stays at its
 *   newest message. A tap on the composer's text scrolls no page. Done's park
 *   shows the focus ring after typing only. A storyboard shows the rise
 * @position Browser proofs for Chat/useChatKeyboard.ts and
 *   keyboard/keyboardLayoutGuide.ts. Headless browsers have no software
 *   keyboard, so the test shrinks the page's `visualViewport` as Mobile
 *   Safari does: one `resize`, to the final height
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {cubicBezier} from '../../motion/bezier';
import {keyboard as ANDROID_KEYBOARD} from '../../motion/android/keyboard';
import {
  animationStoryboard,
  compareCurve,
  countBetween,
  frames,
  curveOf,
  holdAnimations,
  type HeldAnimation,
  openStory,
  releaseAnimations,
  sampleCurve,
  timeline,
  touchDriver,
  traceRendering,
  waitForAnimation,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
// The cover Mobile Safari reports on an iPhone 17 Pro (keyboard, accessory
// bar and the floating address bar over a 714 px layout viewport).
const COVER = 337;

/**
 * Replaces `window.visualViewport` before the page loads with one the test
 * drives: `__keyboard(cover)` shrinks it from the bottom and fires one
 * `resize`, as Mobile Safari does.
 */
async function installKeyboard(page: Page) {
  await page.addInitScript(() => {
    // Mobile Safari has no VirtualKeyboard API, so the keyboard layout guide
    // publishes no slide there.
    Reflect.deleteProperty(Navigator.prototype, 'virtualKeyboard');
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

/**
 * Chrome on Android: the visual viewport the test drives, and a
 * VirtualKeyboard object the guide must leave alone, so the guide reads
 * Chrome's profile. It runs under a finger, as Chrome on Android does, so the
 * composer's focus routes are the touch ones.
 */
async function installAndroidKeyboard(page: Page) {
  await page.addInitScript(() => {
    const keyboard = Object.assign(new EventTarget(), {
      overlaysContent: false,
      boundingRect: new DOMRect(0, 0, 0, 0),
    });
    Object.defineProperty(navigator, 'virtualKeyboard', {
      configurable: true,
      value: keyboard,
    });
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

interface Chat {
  dock: Locator;
  messages: Locator;
  editable: Locator;
  /**
   * How far the dock rises for COVER: until its resting bottom (the root's
   * bottom edge, which may sit below the layout viewport's) clears the cover.
   */
  lift: number;
}

async function openChat(
  page: Page,
  {android = false}: {android?: boolean} = {},
): Promise<Chat> {
  if (android) {
    await installAndroidKeyboard(page);
  } else {
    await installKeyboard(page);
  }
  await openStory(page, storybook(), 'core-chatlayout--full-ai-chat');
  const editable = page.locator('[contenteditable="true"]').first();
  await expect(editable).toBeVisible();
  // Name the dock (the sticky container around the composer) and the
  // message area for the locators below.
  await editable.evaluate(element => {
    let dock: HTMLElement | null = element as HTMLElement;
    while (dock != null && getComputedStyle(dock).position !== 'sticky') {
      dock = dock.parentElement;
    }
    dock?.setAttribute('data-testid', 'keyboard-dock');
    dock?.parentElement?.firstElementChild?.setAttribute(
      'data-testid',
      'keyboard-messages',
    );
  });
  const dock = page.getByTestId('keyboard-dock');
  const messages = page.getByTestId('keyboard-messages');
  // The story opens at its newest message.
  await page.waitForTimeout(300);
  const lift = await dock.evaluate(
    (el, cover) =>
      (el.parentElement as HTMLElement).getBoundingClientRect().bottom -
      (window.innerHeight - cover),
    COVER,
  );
  return {dock, messages, editable, lift};
}

const showKeyboard = async (page: Page, cover = COVER) =>
  page.evaluate(
    c => (window as unknown as {__keyboard: (c: number) => void}).__keyboard(c),
    cover,
  );

// Where the dock is drawn relative to its rest without a keyboard, CSS px,
// negative up. It is its presented vertical `translate`, less the `bottom`
// offset the layout gives it from the keyboard height. The animator moves the
// individual property, not `transform`.
const dockY = async (dock: Locator) => dock.evaluate(presentedY);

// How far above the bottom of the transcript's scrollport the dock is drawn:
// 0 at rest with no keyboard. A sticky dock leaves the bottom when the
// content ends inside the scrollport. A translate or a late scroll clamp can
// cause that, and the dock's styles alone would not show it.
const dockGap = async (dock: Locator) =>
  dock.evaluate(
    el =>
      (el.parentElement as HTMLElement).getBoundingClientRect().bottom -
      el.getBoundingClientRect().bottom,
  );

function presentedY(el: Element): number {
  const style = getComputedStyle(el);
  const translate =
    style.translate === 'none'
      ? 0
      : parseFloat(style.translate.split(' ')[1] ?? '0') || 0;
  const bottom =
    style.position === 'sticky' || style.position === 'fixed'
      ? parseFloat(style.bottom) || 0
      : 0;
  return translate - bottom;
}

// NOT FOR LANDING: the classification probe for the rise proof's extra frame.
// It runs the proof's steps under the harness's trace flow and logs each
// main-thread task's source and each frame's invalidations.
type Ev = {name: string; cat: string; ts: number; dur?: number; pid: number; tid: number; ph: string; args?: Record<string, unknown>};
for (const mode of ['harness', 'nostanddown'] as const) {
  test.describe(`classify ${mode}`, () => {
    test.use({hasTouch: true, isMobile: true});
    test(`rise window frames (${mode})`, async ({page}) => {
      const {editable} = await openChat(page, {android: true});
      await editable.focus();
      await page.evaluate(async () => {
        const ts = document.getAnimations().filter(a => a instanceof CSSTransition);
        await Promise.all(ts.map(async t => t.finished.catch(() => undefined)));
      });
      const cdp = await page.context().newCDPSession(page);
      const events: Ev[] = [];
      cdp.on('Tracing.dataCollected', ({value}) => { events.push(...(value as unknown as Ev[])); });
      const complete = new Promise<void>(r => cdp.once('Tracing.tracingComplete', () => r()));
      await cdp.send('Tracing.start', {transferMode: 'ReportEvents', traceConfig: {includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'blink.user_timing', 'toplevel', 'disabled-by-default-devtools.timeline.invalidationTracking', 'disabled-by-default-devtools.timeline.frame', '__metadata'], excludedCategories: ['*']}});
      const standDown = (on: boolean) => page.evaluate(v => { const w = window as unknown as {__harnessRenderingTrace?: boolean; __harnessAnimations?: {resume?: () => void}}; w.__harnessRenderingTrace = v; if (!v) w.__harnessAnimations?.resume?.(); }, on);
      if (mode === 'harness') await standDown(true);
      await frames(page, 1);
      await page.evaluate(async cover => {
        performance.mark('zz-report');
        (window as unknown as {__keyboard: (c: number) => void}).__keyboard(cover);
        await new Promise(r => setTimeout(r, 400));
      }, COVER);
      if (mode === 'harness') await standDown(false);
      await cdp.send('Tracing.end');
      await complete;
      await cdp.detach();
      const rep = events.find(e => e.name === 'zz-report');
      if (!rep) throw new Error('no mark');
      const rel = (ts: number) => Math.round(((ts - rep.ts) / 1000) * 10) / 10;
      const mainEv = events.filter(e => e.pid === rep.pid && e.tid === rep.tid && e.ph !== 'E');
      const winPaints = mainEv.filter(e => e.name === 'Paint' && rel(e.ts) >= 125 && rel(e.ts) <= 220).length;
      const lines: string[] = [];
      for (const e of mainEv) {
        const t = rel(e.ts);
        if (t < 100 || t > 300) continue;
        const d = (e.args?.data ?? {}) as Record<string, unknown>;
        if (e.name === 'ThreadControllerImpl::RunTask') {
          const a = e.args ?? {};
          lines.push(`${t} task ${String(a.src_file ?? '').split('/').pop()}:${String(a.src_func ?? '')}`);
        } else if (e.name === 'StyleRecalcInvalidationTracking') {
          lines.push(`${t} inval ${String(d.reason ?? '')} ${String(d.nodeName ?? '').slice(0, 40)}`);
        } else if (['Paint', 'HitTest', 'Layout', 'UpdateLayoutTree', 'BeginMainThreadFrame'].includes(e.name)) {
          lines.push(`${t} ${e.name}${e.name === 'Paint' ? ' ' + String(d.nodeName ?? '').slice(0, 40) : ''}`);
        }
      }
      console.log(`CLASS ${mode} dirty=${winPaints > 0}\n${lines.join('\n')}\nEND`);
    });
  });
}
