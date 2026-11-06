// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * NOT FOR LANDING: X1's probe of the claim in popoverSurfaceMotion.ts that a
 * touch starting in the frame before the hold does not dismiss the popover.
 */

import {expect, test} from '@astryxdesign/a11y-spec/playwright';
import {
  freezePageOn,
  installPageFreeze,
  installTimerGate,
  openStory,
  thawPage,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

interface Logged {
  type: string;
  target: string;
  shield: boolean;
  open: boolean;
  t: number;
}

for (const control of [false, true]) {
  test(`touch before the hold: ${control ? 'CONTROL, the touch starts after the hold' : 'the touch starts before the hold'}`, async ({
    page,
  }, testInfo) => {
    await installPageFreeze(page);
    await openStory(page, storybook(), 'core-popover--default');
    const driver = await touchDriver(page);
    await installTimerGate(page);
    const trigger = page.getByRole('button', {name: 'Settings'});
    const box = await trigger.boundingBox();
    if (box == null) {
      throw new Error('no trigger');
    }
    const layer = page.locator('[popover]:has([role="dialog"])').first();
    const viewport = page.viewportSize() ?? {width: 402, height: 714};
    const outside = {x: 20, y: viewport.height - 20};
    await page.evaluate(() => {
      const w = window as unknown as {__x1log: Logged[]};
      w.__x1log = [];
      const describe = (node: EventTarget | null) => {
        if (!(node instanceof Element)) {
          return String(node);
        }
        const hidden = node.getAttribute('aria-hidden') === 'true';
        const pop = node.getAttribute('popover');
        return `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ''}${pop != null ? `[popover=${pop}]` : ''}${hidden ? '[aria-hidden]' : ''}`;
      };
      const state = () => {
        const shield = document.querySelector(
          '[popover="manual"][aria-hidden="true"]',
        );
        const layerEl = document.querySelector('[popover]:has([role="dialog"])');
        return {
          shield: shield != null,
          open: layerEl != null && layerEl.matches(':popover-open'),
        };
      };
      for (const type of [
        'touchstart',
        'touchend',
        'touchcancel',
        'pointerdown',
        'pointerup',
        'pointercancel',
        'gotpointercapture',
        'lostpointercapture',
        'click',
      ]) {
        window.addEventListener(
          type,
          e => {
            w.__x1log.push({
              type: e.type + ((e as PointerEvent).pointerId != null ? `:${(e as PointerEvent).pointerId}` : ''),
              target: describe(e.target),
              ...state(),
              t: Math.round(performance.now()),
            });
          },
          {capture: true},
        );
      }
      document.addEventListener(
        'toggle',
        e => {
          w.__x1log.push({
            type: `toggle:${(e as ToggleEvent).newState}`,
            target: describe(e.target),
            ...state(),
            t: Math.round(performance.now()),
          });
        },
        {capture: true},
      );
    });

    if (!control) {
      // The scene stops in the opening tap's lift, so the frame that starts
      // the growth and its hold waits for the thaw.
      await freezePageOn(page, 'touchend');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const atTouch = await page.evaluate(() => ({
      shield:
        document.querySelector('[popover="manual"][aria-hidden="true"]') !=
        null,
    }));
    if (control) {
      await page.waitForFunction(
        () =>
          document.querySelector('[popover="manual"][aria-hidden="true"]') !=
          null,
      );
    }
    const script = [
      {t: 0, fingers: [{id: 7, ...outside}]},
      {t: 600, fingers: [{id: 7, ...outside}]},
      {t: 616, fingers: []},
    ];
    let shieldBeforeLift = false;
    await driver.play(script, {
      onEvent: async step => {
        if (step.type === 'touchStart' && !control) {
          await thawPage(page);
        }
        if (step.type === 'touchStart' || step.type === 'touchMove') {
          shieldBeforeLift = await page.evaluate(
            () =>
              document.querySelector(
                '[popover="manual"][aria-hidden="true"]',
              ) != null,
          );
        }
      },
    });
    await page.waitForTimeout(800);
    const openAfter = await layer.evaluate(el => el.matches(':popover-open'));
    const expanded = await trigger.getAttribute('aria-expanded');
    const log = await page.evaluate(
      () => (window as unknown as {__x1log: Logged[]}).__x1log,
    );
    const summary = {
      engine: testInfo.project.name,
      control,
      shieldWhenTouchStarted: atTouch.shield,
      shieldBeforeLift,
      openAfter,
      expanded,
      log,
    };
    console.log(`X1PROBE ${JSON.stringify(summary)}`);
    await testInfo.attach('x1-probe.json', {
      body: JSON.stringify(summary, null, 2),
      contentType: 'application/json',
    });
  });
}
