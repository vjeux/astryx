// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: checks the focus-depth try-it story under a finger, a
// mouse and the keyboard, in modes A (today) and B (fine-pointer gate).
import {test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {openStory, tap, touchDriver, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const STORY = 'core-chatcomposer--try-it-focus-depth';

/** The painted bodies (the elements with a box-shadow transition) and the TextInput wrapper. */
async function read(page: Page) {
  return page.evaluate(() => {
    const root = document.getElementById('storybook-root')!;
    const bodies = [...root.querySelectorAll<HTMLElement>('*')].filter(el =>
      getComputedStyle(el).transitionProperty.includes('box-shadow') && el.querySelector('[contenteditable="true"], textarea'),
    );
    const input = root.querySelector('input[type="text"], input:not([type])') as HTMLElement | null;
    let wrapper = input?.parentElement ?? null;
    while (wrapper && !getComputedStyle(wrapper).transitionProperty.includes('border-color')) wrapper = wrapper.parentElement;
    const css = (el: Element | null) => (el ? {shadow: getComputedStyle(el).boxShadow, border: getComputedStyle(el).borderTopColor, outline: `${getComputedStyle(el).outlineStyle} ${getComputedStyle(el).outlineWidth}`, anims: el.getAnimations().map(a => (a as CSSTransition).transitionProperty)} : null);
    return {bodies: bodies.map(css), input: css(wrapper), active: document.activeElement?.tagName + (document.activeElement?.getAttribute('contenteditable') ? '[ce]' : '')};
  });
}

for (const mode of ['today', 'fine-pointer'] as const) {
  test(`finger ${mode}`, async ({page}) => {
    await openStory(page, storybook(), STORY, {mode});
    const before = await read(page);
    const driver = await touchDriver(page);
    for (const sel of ['[contenteditable="true"]', 'input']) {
      const box = await page.locator(`#storybook-root ${sel}`).first().boundingBox();
      await driver.play(tap({x: box!.x + 20, y: box!.y + box!.height / 2}, {holdMs: 60}));
      await page.waitForTimeout(60);
      const during = await read(page);
      await page.waitForTimeout(400);
      const after = await read(page);
      console.log(`TRYIT ${JSON.stringify({input: 'finger', mode, target: sel, active: after.active, before: sel === 'input' ? before.input : before.bodies[0], during: sel === 'input' ? during.input : during.bodies[0], after: sel === 'input' ? after.input : after.bodies[0]})}`);
    }
  });
  test(`mouse and keyboard ${mode}`, async ({browser}) => {
    const context = await browser.newContext({viewport: {width: 1280, height: 800}, hasTouch: false, isMobile: false});
    const page = await context.newPage();
    try {
      await openStory(page, storybook(), STORY, {mode});
      const before = await read(page);
      await page.locator('#storybook-root [contenteditable="true"]').first().click();
      await page.waitForTimeout(400);
      const clicked = await read(page);
      await page.locator('#storybook-root input').first().click();
      await page.waitForTimeout(400);
      const inputClicked = await read(page);
      // Keyboard: focus the toggle, then tab into the first composer's editor.
      await page.mouse.click(5, 5);
      await page.locator('#storybook-root [role="radio"], #storybook-root button').first().focus();
      let active = '';
      for (let k = 0; k < 6 && !/\[ce\]/.test(active); k++) {
        await page.keyboard.press('Tab');
        active = (await read(page)).active;
      }
      await page.waitForTimeout(400);
      const keyed = await read(page);
      console.log(`TRYIT ${JSON.stringify({input: 'mouse', mode, before: before.bodies[0], clicked: clicked.bodies[0], inputBefore: before.input, inputClicked: inputClicked.input})}`);
      console.log(`TRYIT ${JSON.stringify({input: 'keyboard', mode, active: keyed.active, body: keyed.bodies[0]})}`);
    } finally {
      await context.close();
    }
  });
}
