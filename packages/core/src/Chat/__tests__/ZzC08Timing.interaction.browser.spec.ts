// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ZzC08Timing.interaction.browser.spec.ts (NOT FOR LANDING)
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

// NOT FOR LANDING: times a keyboard report's ride start, first frame and lift
// commit, at 1x and 4x CPU, for the commit-path refactor's before and after.
for (const rate of [1, 4]) {
  test.describe(`timing ${rate}x`, () => {
    test.use({hasTouch: true, isMobile: true});
    test(`android: report to ride start and first frame (${rate}x)`, async ({page}) => {
      const {editable} = await openChat(page, {android: true});
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', {rate});
      await page.evaluate(() => {
        const dock = document.querySelector('[data-testid="keyboard-dock"]');
        const w = window as unknown as {__rideAt: number | null};
        w.__rideAt = null;
        const animate = Element.prototype.animate;
        Element.prototype.animate = function (this: Element, keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions) {
          const animation = animate.call(this, keyframes, options);
          if (this === dock && w.__rideAt == null && Array.isArray(keyframes) && keyframes.some(k => 'translate' in k)) {
            w.__rideAt = performance.now();
          }
          return animation;
        };
      });
      const r = await editable.evaluate(async (element, cover) => {
        (element as HTMLElement).focus();
        await Promise.all(document.getAnimations().filter(a => a instanceof CSSTransition).map(async t => t.finished.catch(() => undefined)));
        const w = window as unknown as {__rideAt: number | null; __keyboard: (c: number) => void};
        let frameAt = 0;
        const at = performance.now();
        w.__keyboard(cover);
        const sync = performance.now();
        requestAnimationFrame(() => { frameAt = performance.now(); });
        await new Promise(resolve => setTimeout(resolve, 400));
        return {ride: (w.__rideAt ?? NaN) - at, sync: sync - at, frame: frameAt - at};
      }, COVER);
      console.log(`TIMING android ${rate}x ${JSON.stringify(r)}`);
      await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
    });
    test(`safari: report to lift commit (${rate}x)`, async ({page}) => {
      const {editable, dock} = await openChat(page);
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', {rate});
      await editable.evaluate(async element => {
        (element as HTMLElement).focus();
        await Promise.all(document.getAnimations().filter(a => a instanceof CSSTransition).map(async t => t.finished.catch(() => undefined)));
      });
      const r = await dock.evaluate(async (el, cover) => {
        const root = el.parentElement as HTMLElement;
        const w = window as unknown as {__keyboard: (c: number) => void};
        let commitAt = 0;
        const observer = new MutationObserver(records => {
          if (commitAt === 0 && records.some(rec => rec.attributeName === 'style' || rec.attributeName === 'class')) {
            commitAt = performance.now();
          }
        });
        observer.observe(root, {attributes: true, subtree: true, attributeFilter: ['style', 'class']});
        let frameAt = 0;
        const at = performance.now();
        w.__keyboard(cover);
        const sync = performance.now();
        requestAnimationFrame(() => { frameAt = performance.now(); });
        await new Promise(resolve => setTimeout(resolve, 400));
        observer.disconnect();
        return {commit: commitAt === 0 ? NaN : commitAt - at, sync: sync - at, frame: frameAt - at, lifted: root.getBoundingClientRect().bottom};
      }, COVER);
      console.log(`TIMING safari ${rate}x ${JSON.stringify(r)}`);
      await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
    });
  });
}
