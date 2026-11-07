// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ChatLayoutPanelView.interaction.browser.spec.ts
 * @input The Core/ChatLayout "Panel View" story and the interaction harness
 * @output Proves that the composer of a ChatLayout in a fixed-height panel
 *   rests inside the panel, at its bottom edge, on a phone and on a desktop
 * @position Interaction proof for the Panel View story's layout
 */

import {expect, test} from '@astryxdesign/a11y-spec/playwright';
import {openStory, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

for (const viewport of [
  {width: 412, height: 791},
  {width: 1280, height: 800},
]) {
  test(`the composer rests at the bottom of its panel at ${viewport.width}×${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await openStory(page, storybook(), 'core-chatlayout--panel-view');
    const editable = page.locator('[contenteditable="true"]').first();
    await expect(editable).toBeVisible();
    const placement = await editable.evaluate(element => {
      // The dock is the composer's sticky container, the layout's last
      // child. The panel holds the layout.
      let dock: HTMLElement | null = element as HTMLElement;
      while (dock != null && getComputedStyle(dock).position !== 'sticky') {
        dock = dock.parentElement;
      }
      const panel = dock?.parentElement?.parentElement;
      if (dock == null || panel == null) {
        throw new Error('no sticky dock inside a panel');
      }
      const panelBox = panel.getBoundingClientRect();
      return {
        dockBottom: dock.getBoundingClientRect().bottom,
        panelBottom: panelBox.bottom - panel.clientTop,
      };
    });
    expect(placement.dockBottom).toBeLessThanOrEqual(
      placement.panelBottom + 0.5,
    );
    expect(placement.dockBottom).toBeGreaterThan(placement.panelBottom - 2);
  });
}
