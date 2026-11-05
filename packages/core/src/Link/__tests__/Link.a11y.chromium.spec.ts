// Copyright (c) Meta Platforms, Inc. and affiliates.
// @pr-a11y scope ^(internal/a11y-spec/src/patterns/link\.|packages/core/src/Link/|apps/storybook/stories/LinkA11y)

/**
 * Real-browser and accessibility-tree binding evidence for Link.
 *
 * A link's activation leaves no trace on the link, so the binding counts every
 * navigation the story requests: native navigations through the browser's
 * Navigation API (cancelled, so the story stays mounted), router navigations
 * the story's router component records, and new tabs the page opens.
 */

import {
  expect,
  test,
  type CDPSession,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  LINK_PATTERN,
  blockingResults,
  checkAccessibilitySpec,
  formatFailures,
  neverExercised,
  summarize,
  type BindingResult,
} from '@astryxdesign/a11y-spec';
import {
  createChromiumHarness,
  holdMotionStill,
} from '@astryxdesign/a11y-spec/chromium';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';
import {LINK_A11Y_STATES, type LinkA11yRow} from './Link.a11y.states';

const SUBJECT_SELECTOR = '[data-a11y-link]';
const NEW_TAB_SETTLE_MS = 500;
let storybook: StaticServer;

interface NavigationWindow extends Window {
  __a11yLinkNavigations?: number;
}

test.beforeAll(async () => {
  storybook = await serveStorybook(
    process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
  );
});

test.afterAll(async () => storybook?.close());

function storyUrl(id: string): string {
  return `${storybook.origin}/iframe.html?id=${id}&viewMode=story`;
}

async function countNavigations(
  page: Page,
  opensNewTab: boolean,
  cdp?: CDPSession,
): Promise<() => Promise<number>> {
  // NOT FOR LANDING: records when each tab is requested (Page.windowOpen on
  // the page's own session), when its page reaches the test, and each
  // reading, as JSON lines under LINK_PROBE_DIR.
  const fs = await import('node:fs');
  const t0 = Date.now();
  const probeFile = `${process.env.LINK_PROBE_DIR ?? '/tmp'}/probe-${process.pid}-${t0}.jsonl`;
  let windowOpens = 0;
  const note = (entry: object) =>
    fs.appendFileSync(
      probeFile,
      `${JSON.stringify({t: Date.now() - t0, title: test.info().title, repeat: test.info().repeatEachIndex, ...entry})}\n`,
    );
  if (cdp != null) {
    await cdp.send('Page.enable');
    cdp.on('Page.windowOpen', () => {
      windowOpens += 1;
      note({event: 'windowOpen', windowOpens});
    });
  }
  let newTabs = 0;
  page.context().on('page', opened => {
    newTabs += 1;
    note({event: 'page', newTabs});
    void opened.close();
  });
  await page.evaluate(() => {
    const target = window as NavigationWindow & {navigation: EventTarget};
    target.__a11yLinkNavigations = 0;
    target.navigation.addEventListener('navigate', event => {
      target.__a11yLinkNavigations = (target.__a11yLinkNavigations ?? 0) + 1;
      if (event.cancelable) {
        event.preventDefault();
      }
    });
  });
  return async () => {
    // A new tab reaches the test through the browser's target events, after
    // the click or key that opened it has returned. Give it time to arrive so
    // a later reading cannot miss a navigation an earlier one started.
    note({event: 'read-start', newTabs, windowOpens});
    if (opensNewTab) {
      await page.waitForTimeout(NEW_TAB_SETTLE_MS);
    }
    const inPage = await page.evaluate(
      () => (window as NavigationWindow).__a11yLinkNavigations ?? 0,
    );
    note({event: 'read', inPage, newTabs, windowOpens});
    return inPage + newTabs;
  };
}

async function runState(
  page: Page,
  cdp: CDPSession,
  state: LinkA11yRow,
): Promise<BindingResult> {
  let navigations: () => Promise<number> = async () => {
    throw new Error('the Link story was not mounted');
  };
  return checkAccessibilitySpec({
    spec: LINK_PATTERN,
    binding: 'Link',
    state: state.id,
    facts: state.facts,
    mount: async () => {
      // NOT FOR LANDING: a new tab's first document is answered 600 ms late,
      // as a loaded runner answers it, so its page reaches the test late.
      const context =
        page.context() as typeof page.context extends () => infer C
          ? C & {delayed?: boolean}
          : never;
      if (context.delayed !== true) {
        context.delayed = true;
        await context.route('**/*', async route => {
          const request = route.request();
          if (request.isNavigationRequest()) {
            let fromThisPage = false;
            try {
              fromThisPage = request.frame().page() === page;
            } catch {
              fromThisPage = false;
            }
            if (!fromThisPage) {
              await new Promise(resolve => setTimeout(resolve, 600));
            }
          }
          await route.fallback();
        });
      }
      await page.goto(storyUrl(state.storyId), {waitUntil: 'load'});
      await holdMotionStill(page);
      const subject = page.locator(SUBJECT_SELECTOR);
      await subject.waitFor({state: 'visible'});
      await expect(subject).toHaveCount(1);
      navigations = await countNavigations(
        page,
        state.id === 'external-new-tab',
        cdp,
      );
      return createChromiumHarness({page, cdp, subject});
    },
    activations: async () => navigations(),
  });
}

// Checking coverage runs every state again, which on a loaded runner nears
// the per-test timeout as one test. It runs as one serial part per state,
// sharing their results, then one check over all of them.
test.describe('every Link expectation is exercised by at least one Link state', () => {
  test.describe.configure({mode: 'serial'});
  const results: BindingResult[] = [];

  for (const state of LINK_A11Y_STATES) {
    test(`runs ${state.id}`, async ({page}) => {
      const cdp = await page.context().newCDPSession(page);
      results.push(await runState(page, cdp, state));
    });
  }

  test('no expectation is left unexercised', () => {
    // Every part ran in this worker; this test alone proves nothing.
    expect(results.map(result => result.state).sort()).toEqual(
      LINK_A11Y_STATES.map(state => state.id).sort(),
    );
    expect(neverExercised(results)).toEqual([]);
  });
});

for (const state of LINK_A11Y_STATES) {
  test(`Link [${state.id}] — ${state.summary}`, async ({page}) => {
    const cdp = await page.context().newCDPSession(page);
    const result = await runState(page, cdp, state);
    const report = summarize(LINK_PATTERN, [result]);
    expect(formatFailures(blockingResults([result]))).toBe('');
    expect(
      result.results
        .filter(row => row.status === 'fail')
        .map(row => `${row.expectation}: ${row.detail ?? ''}`),
    ).toEqual([]);
    expect(report.unrunLayers).toEqual([]);
    expect(report.counts.unexpectedPass).toBe(0);
  });
}
