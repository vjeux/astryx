// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file c13-interleaved.perf.spec.ts
 * @input Three built Sandboxes (C13_P0, C13_P1, C13_P2), each with the local
 *   `buttons` scene applied
 * @output One JSON file per scene and CPU rate: every sample, per tree, in an
 *   interleaved order, with the per-tree medians
 * @position Local measurement only, never committed. It plays the nightly
 *   perf Table scene through `measureScene`, and a 500-Button scene through
 *   its own marks and a React commit counter, on each tree in turn.
 */

import fs from 'node:fs';
import path from 'node:path';
import {expect, test, type Page} from '@playwright/test';
import {
  serveStatic,
  type StaticServer,
} from '../../../internal/a11y-spec/src/storybook';
import {frames} from '../../../internal/interaction-harness/src/index';
import {EVENT_TIMING_LOG, measureScene, type SceneSample} from './measure';

interface Tree {
  readonly name: string;
  readonly dir: string;
}

function treeFromEnv(key: string): Tree {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`${key} must name a tree as <name>=<dir>`);
  }
  const [name, dir] = value.split('=');
  return {name, dir};
}

const TREES: readonly Tree[] = [
  treeFromEnv('C13_P0'),
  treeFromEnv('C13_P1'),
  treeFromEnv('C13_P2'),
];
const RUNS = Number(process.env.C13_RUNS ?? '10');
const RATES = (process.env.C13_RATES ?? '1,4').split(',').map(Number);
const OUT_DIR = path.resolve(
  process.env.C13_OUT ?? 'test-results/c13-interleaved',
);

// React calls a DevTools hook on every commit, in production builds too.
const COMMIT_COUNTER = `(() => {
  window.__c13Commits = 0;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    supportsFiber: true,
    isDisabled: false,
    renderers: new Map(),
    inject() { return 1; },
    onScheduleFiberRoot() {},
    onCommitFiberRoot() { window.__c13Commits += 1; },
    onCommitFiberUnmount() {},
    onPostCommitFiberRoot() {},
    checkDCE() {},
  };
})();`;

let servers: StaticServer[] = [];
test.beforeAll(async () => {
  servers = await Promise.all(
    TREES.map(tree =>
      serveStatic(tree.dir, {
        sentinel: 'pages/perf-scenes/index.html',
        missing: root => `No built Sandbox at ${root}.`,
      }),
    ),
  );
});
test.afterAll(async () => {
  await Promise.all(servers.map(server => server.close()));
});

async function openScene(
  browser: import('@playwright/test').Browser,
  origin: string,
  scene: string,
  rate: number,
): Promise<{page: Page; close: () => Promise<void>}> {
  const context = await browser.newContext({
    baseURL: origin,
    viewport: {width: 1280, height: 800},
  });
  const page = await context.newPage();
  if (rate > 1) {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', {rate});
  }
  await page.addInitScript(COMMIT_COUNTER);
  await page.addInitScript(EVENT_TIMING_LOG);
  await page.goto(`/pages/perf-scenes/?scene=${scene}`);
  await page
    .locator('html[data-perf-page="interactive"]')
    .waitFor({state: 'attached'});
  await page.evaluate(() => document.fonts.ready);
  return {page, close: () => context.close()};
}

async function tableInteraction(page: Page): Promise<void> {
  await page.getByRole('button', {name: /^Name/}).first().click();
  await frames(page, 2);
  await page
    .getByRole('textbox', {name: 'Filter by name', exact: true})
    .pressSequentially('an', {delay: 50});
  await frames(page, 2);
}

interface ButtonsSample {
  readonly mountMs: number;
  readonly mountCommits: number;
  readonly rerenderMs: number;
  readonly rerenderCommits: number;
}

async function commits(page: Page): Promise<number> {
  return page.evaluate(
    () => (window as unknown as {__c13Commits: number}).__c13Commits,
  );
}

async function measureDuration(page: Page, name: string): Promise<number> {
  return page.evaluate(n => {
    const entries = performance.getEntriesByName(n, 'measure');
    return entries[entries.length - 1]?.duration ?? -1;
  }, name);
}

/** One warm-up mount and unmount, then a measured mount and re-render. */
async function measureButtons(page: Page): Promise<ButtonsSample> {
  const mountButton = page.getByRole('button', {
    name: 'Mount scene',
    exact: true,
  });
  const unmountButton = page.getByRole('button', {
    name: 'Unmount scene',
    exact: true,
  });
  await mountButton.click();
  await page
    .locator('html[data-perf-scene="ready"]')
    .waitFor({state: 'attached'});
  await frames(page, 2);
  await unmountButton.click();
  await page.locator('html[data-perf-scene]').waitFor({state: 'detached'});
  await frames(page, 2);
  await page.evaluate(() => performance.clearMeasures());

  const beforeMount = await commits(page);
  await mountButton.click();
  await page
    .locator('html[data-perf-scene="ready"]')
    .waitFor({state: 'attached'});
  await frames(page, 3);
  const afterMount = await commits(page);
  const mountMs = await measureDuration(page, 'buttons-0');

  await page.getByRole('button', {name: 'Re-render all', exact: true}).click();
  await frames(page, 3);
  const afterRerender = await commits(page);
  const rerenderMs = await measureDuration(page, 'buttons-1');
  return {
    mountMs: Math.round(mountMs * 10) / 10,
    mountCommits: afterMount - beforeMount,
    rerenderMs: Math.round(rerenderMs * 10) / 10,
    rerenderCommits: afterRerender - afterMount,
  };
}

function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarize<T extends object>(
  samples: Record<string, T[]>,
): Record<string, Record<string, number>> {
  return Object.fromEntries(
    Object.entries(samples).map(([tree, list]) => [
      tree,
      Object.fromEntries(
        (Object.keys(list[0]) as (keyof T)[]).map(key => [
          key,
          median(list.map(sample => sample[key] as unknown as number)),
        ]),
      ),
    ]),
  );
}

/** Rotates the tree order each run, so no tree always runs first. */
function orderFor(run: number): number[] {
  return TREES.map((_, index) => (index + run) % TREES.length);
}

for (const rate of RATES) {
  test(`table at ${rate}x`, async ({browser}) => {
    test.setTimeout(40 * 60_000);
    const samples: Record<string, SceneSample[]> = {};
    for (let run = 0; run < RUNS; run++) {
      for (const index of orderFor(run)) {
        const tree = TREES[index];
        const {page, close} = await openScene(
          browser,
          servers[index].origin,
          'table',
          rate,
        );
        try {
          (samples[tree.name] ??= []).push(
            await measureScene(page, tableInteraction),
          );
        } finally {
          await close();
        }
      }
    }
    fs.mkdirSync(OUT_DIR, {recursive: true});
    fs.writeFileSync(
      path.join(OUT_DIR, `table-${rate}x.json`),
      `${JSON.stringify({rate, runs: RUNS, median: summarize(samples), samples}, null, 2)}\n`,
    );
    expect(Object.keys(samples)).toHaveLength(TREES.length);
  });

  test(`buttons at ${rate}x`, async ({browser}) => {
    test.setTimeout(40 * 60_000);
    const samples: Record<string, ButtonsSample[]> = {};
    for (let run = 0; run < RUNS; run++) {
      for (const index of orderFor(run)) {
        const tree = TREES[index];
        const {page, close} = await openScene(
          browser,
          servers[index].origin,
          'buttons',
          rate,
        );
        try {
          (samples[tree.name] ??= []).push(await measureButtons(page));
        } finally {
          await close();
        }
      }
    }
    fs.mkdirSync(OUT_DIR, {recursive: true});
    fs.writeFileSync(
      path.join(OUT_DIR, `buttons-${rate}x.json`),
      `${JSON.stringify({rate, runs: RUNS, median: summarize(samples), samples}, null, 2)}\n`,
    );
    expect(Object.keys(samples)).toHaveLength(TREES.length);
  });
}
