// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file storybook.interaction.browser.spec.ts
 * @input The built Storybook (`withStorybook`) and one of its stories
 * @output `openStory` returns once Storybook has finished the story's render,
 *   so no listener Storybook adds to the document or the window lands after
 *   it. Both engines
 * @position Self-test for story.ts; it needs the built Storybook, as every
 *   component proof does
 */

import {expect, test} from '@playwright/test';
import {openStory, withStorybook} from './story';

const storybook = withStorybook(test);

/**
 * Records every listener added to the document or the window, and when, from
 * before Storybook loads.
 */
function recordListeners(): void {
  const w = window as unknown as {
    __listeners: {type: string; target: string; at: number}[];
  };
  w.__listeners = [];
  const add = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (
    this: EventTarget,
    ...args: Parameters<EventTarget['addEventListener']>
  ) {
    if (this === document || this === window) {
      w.__listeners.push({
        type: args[0],
        target: this === document ? 'document' : 'window',
        at: performance.now(),
      });
    }
    return add.apply(this, args);
  };
}

test("openStory returns once Storybook has finished the story's render: no listener Storybook adds lands after it", async ({
  page,
}) => {
  await page.addInitScript(recordListeners);
  await openStory(page, storybook(), 'core-button--primary');
  const returned = await page.evaluate(() => ({
    at: performance.now(),
    phase: (
      window as unknown as {
        __STORYBOOK_PREVIEW__?: {currentRender?: {phase?: string}};
      }
    ).__STORYBOOK_PREVIEW__?.currentRender?.phase,
  }));
  // Two frames and a task more: a listener a render still in flight adds
  // lands by then; a finished one adds none.
  await page.evaluate(
    () =>
      new Promise<void>(resolve =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTimeout(resolve, 0)),
        ),
      ),
  );
  const late = await page.evaluate(
    at =>
      (
        window as unknown as {
          __listeners: {type: string; target: string; at: number}[];
        }
      ).__listeners
        .filter(listener => listener.at > at)
        .map(({type, target}) => `${target} ${type}`),
    returned.at,
  );
  expect({phase: returned.phase, late}).toEqual({phase: 'finished', late: []});
});
