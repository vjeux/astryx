// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ChatLayoutTranscriptDismiss.interaction.browser.spec.ts
 * @input The Core/ChatLayout full AI chat story, a visual viewport the test
 *   drives as Mobile Safari's keyboard does, and the harness's touch driver
 * @output Proves the drag-to-dismiss in real browsers. A finger's drag down
 *   the transcript that lifts at the composer dismisses the keyboard. One that
 *   stays above it, or starts in the composer's text, keeps it. A mouse or pen
 *   press takes focus off the composer at the press.
 * @position Interaction proofs for ChatLayout's FR10, run in Chromium and
 *   WebKit
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  touchDriver,
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
    // Mobile Safari has no keyboard geometry API (spec:AST-099 FR6).
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

interface Chat {
  composer: Locator;
  editable: Locator;
}

async function openChat(page: Page): Promise<Chat> {
  await installKeyboard(page);
  await openStory(page, storybook(), 'core-chatlayout--full-ai-chat');
  const editable = page.locator('[contenteditable="true"]').first();
  await expect(editable).toBeVisible();
  // Name the composer's box: the sticky dock's child that holds the text.
  await editable.evaluate(element => {
    let box: HTMLElement | null = element as HTMLElement;
    while (
      box?.parentElement != null &&
      getComputedStyle(box.parentElement).position !== 'sticky'
    ) {
      box = box.parentElement;
    }
    box?.setAttribute('data-testid', 'chat-composer-box');
  });
  const composer = page.getByTestId('chat-composer-box');
  await expect(composer).toBeVisible();
  // The story opens at its newest message.
  await page.waitForTimeout(300);
  return {composer, editable};
}

async function keyboardUp(page: Page, {composer, editable}: Chat) {
  await editable.focus();
  await page.evaluate(
    c => (window as unknown as {__keyboard: (c: number) => void}).__keyboard(c),
    COVER,
  );
  await expect(editable).toBeFocused();
  const composerBox = await composer.boundingBox();
  const textBox = await editable.boundingBox();
  if (composerBox == null || textBox == null) {
    throw new Error('The composer has no box.');
  }
  return {
    x: textBox.x + textBox.width / 2,
    // Above everything the composer holds.
    aboveComposer: composerBox.y - 40,
    // Inside the composer's text.
    inComposer: textBox.y + 4,
  };
}

const transcriptScroll = async (composer: Locator) =>
  composer.evaluate(el => {
    let scroller: HTMLElement | null = el.parentElement;
    while (
      scroller != null &&
      !/(auto|scroll)/.test(getComputedStyle(scroller).overflowY)
    ) {
      scroller = scroller.parentElement;
    }
    return (scroller ?? document.scrollingElement)?.scrollTop ?? 0;
  });

test('a drag that stays above the composer scrolls and keeps the keyboard', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  const driver = await touchDriver(page);
  const before = await transcriptScroll(chat.composer);
  await driver.play(
    drag(
      {x: rows.x, y: 120},
      {x: rows.x, y: rows.aboveComposer},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).toBeFocused();
  if (driver.drivesNativeGestures) {
    expect(await transcriptScroll(chat.composer)).toBeLessThan(before);
  }
});

test('a drag that reaches the composer dismisses the keyboard, and focus moves nowhere else', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: 120},
      {x: rows.x, y: rows.inComposer},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).not.toBeFocused();
  // The dismissal only blurs the composer's text (FR10).
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBe(
    'BODY',
  );
});

test('a drag that starts in the composer’s text keeps the keyboard', async ({
  page,
}) => {
  const chat = await openChat(page);
  const rows = await keyboardUp(page, chat);
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: rows.x, y: rows.inComposer},
      {x: rows.x, y: rows.inComposer + 30},
      {durationMs: 300},
    ),
  );
  await expect(chat.editable).toBeFocused();
});

test.describe('a finger where the primary pointer is fine, as on a touch-screen laptop', () => {
  test.use({hasTouch: true, isMobile: false});
  test.beforeEach(async ({page}) => {
    // The primary pointer reads fine while touch input is present.
    await page.addInitScript(() => {
      const matchMedia = window.matchMedia.bind(window);
      window.matchMedia = query =>
        /\(pointer:\s*coarse\)/.test(query)
          ? matchMedia('(min-width: 100000px)')
          : /\(pointer:\s*fine\)/.test(query)
            ? matchMedia('(min-width: 0px)')
            : matchMedia(query);
    });
  });

  test('a drag that reaches the composer dismisses the keyboard (spec:AST-094 FR19, FR43)', async ({
    page,
  }) => {
    const chat = await openChat(page);
    expect(
      await page.evaluate(() => window.matchMedia('(pointer: fine)').matches),
    ).toBe(true);
    const rows = await keyboardUp(page, chat);
    const driver = await touchDriver(page);
    await driver.play(
      drag(
        {x: rows.x, y: 120},
        {x: rows.x, y: rows.inComposer},
        {durationMs: 300},
      ),
    );
    await expect(chat.editable).not.toBeFocused();
  });
});

test.describe('a mouse or pen press on the transcript', () => {
  // A desktop browser: the primary pointer is fine (the projects emulate a
  // phone).
  test.use({hasTouch: false, isMobile: false});

  test('takes focus off the composer at the press, so the keyboard leaves before any drag reaches the composer (spec:AST-094 FR43)', async ({
    page,
  }) => {
    const chat = await openChat(page);
    const rows = await keyboardUp(page, chat);
    await page.mouse.move(rows.x, 120);
    await page.mouse.down();
    // The browser's own press moves focus off the composer.
    await expect(chat.editable).not.toBeFocused();
    await page.mouse.move(rows.x, rows.inComposer, {steps: 12});
    await page.mouse.up();
    await expect(chat.editable).not.toBeFocused();
  });

  test('a pen press reported as a pointer does the same', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'pen input is dispatched through the Chrome DevTools Protocol',
    );
    const chat = await openChat(page);
    const rows = await keyboardUp(page, chat);
    await page.evaluate(() => {
      const seen: string[] = [];
      (window as unknown as {__pointerTypes: string[]}).__pointerTypes = seen;
      window.addEventListener(
        'pointerdown',
        event => seen.push(event.pointerType),
        true,
      );
    });
    const client = await page.context().newCDPSession(page);
    const pen = async (
      type: 'mousePressed' | 'mouseMoved' | 'mouseReleased',
      y: number,
    ) =>
      client.send('Input.dispatchMouseEvent', {
        type,
        x: rows.x,
        y,
        button: 'left',
        buttons: type === 'mouseReleased' ? 0 : 1,
        clickCount: 1,
        pointerType: 'pen',
      });
    await pen('mousePressed', 120);
    expect(
      await page.evaluate(
        () => (window as unknown as {__pointerTypes: string[]}).__pointerTypes,
      ),
    ).toEqual(['pen']);
    await expect(chat.editable).not.toBeFocused();
    for (let step = 1; step <= 12; step += 1) {
      await pen('mouseMoved', 120 + ((rows.inComposer - 120) * step) / 12);
    }
    await pen('mouseReleased', rows.inComposer);
    await expect(chat.editable).not.toBeFocused();
  });
});
