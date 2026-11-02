// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file next.turbopack.test.mjs
 * @input ASTRYX_TURBOPACK_E2E=1 and installed Chromium;
 *   __fixtures__/next-turbopack: an app importing Core, Lab, Charts and Rich
 *   Text, with its own Babel config, mixed `*.tsx` rule list and StyleX PostCSS
 *   plugin and no layer-order line of its own; Core linked from a workspace
 *   (with its own node_modules), the others installed, and every installed
 *   prebuilt package stylesheet deleted before the build
 * @output Proves (spec:AST-080 FR7, FR9) that Turbopack's `next build` and
 *   `next dev`, and webpack's `next build`, compile every package from source
 *   with the prebuilt class names (and that Turbopack keeps the app's rules to
 *   its files in their order); that in the served page, per package, the
 *   product's class and the product's StyleX rule beat the base rule and a
 *   theme beats the base in either load order, in each built app also with
 *   its stylesheet chunks reversed; that importing a source-built package's
 *   prebuilt stylesheet fails the build; and that an app with Core alone
 *   declares Core's data-colour defaults
 * @position End-to-end check for withAstryx() under both bundlers, run
 *   by `pnpm test:build` (the Build package's own CI job) or directly:
 *   ASTRYX_TURBOPACK_E2E=1 pnpm exec vitest run --project node packages/build/src/next.turbopack.test.mjs
 */

import {execFileSync} from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {chromium} from 'playwright';
import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {
  PREBUILT,
  env,
  nextBin,
  scratchApp,
  serving,
} from '../__fixtures__/next-app.mjs';

let root, app, html, css, ruleLog;
/** Scratch folders not yet removed: each goes once its last reader is done. */
const roots = new Set();

/** A scratch fixture app; `unscratch()` removes it once it has been read. */
function scratch(options) {
  const made = scratchApp(options);
  roots.add(made.dir);
  return made;
}

/**
 * Remove a scratch folder (thousands of files: Core alone is about 4,600)
 * inside the budget of the case or hook that read it last, rather than every
 * folder at once in `afterAll`'s, which a loaded box pushes past its bound.
 */
function unscratch(dir) {
  fs.rmSync(dir, {recursive: true, force: true});
  roots.delete(dir);
}

/**
 * The page a build rendered, and its stylesheets: Turbopack writes them to
 * `static/chunks`, webpack to `static/css`.
 */
function built(dir) {
  const page = fs.readFileSync(
    path.join(dir, '.next/server/app/index.html'),
    'utf8',
  );
  const sheets = ['chunks', 'css']
    .map(folder => path.join(dir, '.next/static', folder))
    .filter(folder => fs.existsSync(folder))
    .flatMap(folder =>
      fs
        .readdirSync(folder)
        .filter(file => file.endsWith('.css'))
        .map(file => fs.readFileSync(path.join(folder, file), 'utf8')),
    );
  return {page, css: sheets.join('\n')};
}

/**
 * The rendered class lists: the stable `astryx-*` hooks, the compiled classes
 * on Astryx elements (the product's own StyleX and class on the overridden
 * ones), and the app's on its own element.
 */
function classLists(page) {
  const lists = [...page.matchAll(/<\w+([^>]*?) class="([^"]*)"/g)].map(
    ([, attrs, classes]) => ({attrs, classes: classes.split(/\s+/)}),
  );
  const isHook = name => name.startsWith('astryx-');
  const onAstryx = lists
    .filter(list => list.classes.some(isHook))
    .flatMap(list => list.classes.filter(name => name && !isHook(name)));
  return {
    hooks: lists.flatMap(list => list.classes.filter(isHook)),
    astryx: onAstryx.filter(name => /^x[a-z0-9]+$/.test(name)),
    product: [...new Set(onAstryx.filter(name => !/^x/.test(name)))],
    app: lists
      .filter(list => list.attrs.includes('id="card"'))
      .flatMap(list => list.classes),
  };
}

/** Astryx and app classes alike render with the classes their rules use. */
function expectStyled(page, stylesheet) {
  const {hooks, astryx, product, app: own} = classLists(page);
  expect(hooks).toEqual(
    expect.arrayContaining(['astryx-button', 'astryx-stat']),
  );
  expect(astryx.length).toBeGreaterThan(20);
  expect(own.length).toBeGreaterThan(0);
  // On the overridden Button and Stat: the product's StyleX and its classes.
  expect(product.filter(name => /^p[a-z0-9]+$/.test(name))).toHaveLength(2);
  expect(product.filter(name => !/^p[a-z0-9]+$/.test(name)).sort()).toEqual([
    'product-core',
    'product-lab',
  ]);
  for (const name of own) expect(name).toMatch(/^p[a-z0-9]+$/);
  for (const name of [...astryx, ...product, ...own]) {
    expect(stylesheet, name).toContain(`.${name}`);
  }
}

/**
 * Per package, a property its base rule sets on the probed element, and the
 * value of the base rule, a theme and the product (__fixtures__/next-turbopack:
 * the product's StyleX in page.tsx and modules.tsx, its classes in
 * globals.css). Core's is the destructive Button's `--color-error`.
 */
const PROBES = {
  core: {
    property: 'background-color',
    base: 'rgb(227, 25, 59)',
    theme: 'rgb(0, 120, 255)',
    product: 'rgb(255, 0, 255)',
  },
  lab: {
    property: 'flex-direction',
    base: 'column',
    theme: 'row-reverse',
    product: 'row',
  },
  richtext: {
    property: 'position',
    base: 'relative',
    theme: 'sticky',
    product: 'static',
  },
  charts: {property: 'width', base: '300px', theme: '40px', product: '50px'},
};

// A theme stylesheet registers the layer order itself (spec:AST-080 FR3).
const THEME = [
  '@layer reset, astryx-base, astryx-theme;',
  '@layer astryx-theme {',
  ...Object.entries(PROBES).map(
    ([name, {property, theme}]) =>
      `  [data-probe^="${name}-"] > * { ${property}: ${theme}; }`,
  ),
  '}',
].join('\n');

/**
 * Every probe's value, by its `data-probe` name, once the page's transitions
 * have run: a stylesheet added to a loaded page starts Button's
 * `background-color` transition, so the value read at once is the old one.
 */
async function readProbes(tab) {
  await tab.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter(animation => animation instanceof CSSTransition)
        .map(animation => animation.finished),
    ),
  );
  return tab.$$eval(
    '[data-probe]',
    (wrappers, probes) =>
      Object.fromEntries(
        wrappers.map(wrapper => {
          const {property} = probes[wrapper.dataset.probe.split('-')[0]];
          const style = getComputedStyle(wrapper.firstElementChild);
          return [wrapper.dataset.probe, style.getPropertyValue(property)];
        }),
      ),
    PROBES,
  );
}

/** What each probe reads: the base or, with a theme, the theme's value under
 * the product's class and StyleX rule. */
function expected(themed) {
  return Object.fromEntries(
    Object.entries(PROBES).flatMap(([name, probe]) => [
      [`${name}-base`, themed ? probe.theme : probe.base],
      [`${name}-stylex`, probe.product],
      [`${name}-class`, probe.product],
    ]),
  );
}

/**
 * Replace the page's stylesheet chunks with copies in reverse order, and return
 * the cascade layers each reversed chunk holds rules in, in its new order.
 */
function reverseChunks() {
  const chunks = [...document.styleSheets].map(sheet => [...sheet.cssRules]);
  for (const node of document.querySelectorAll(
    'link[rel="stylesheet"], style',
  )) {
    node.remove();
  }
  for (const rules of [...chunks].reverse()) {
    const style = document.createElement('style');
    style.textContent = rules.map(rule => rule.cssText).join('\n');
    document.head.append(style);
  }
  return chunks
    .reverse()
    .map(rules =>
      rules
        .filter(rule => rule instanceof CSSLayerBlockRule)
        .map(rule => rule.name),
    );
}

/**
 * In the page served at `origin`, per package: the product's class and StyleX
 * rule beat the base rule, and a theme beats the base in either load order
 * (spec:AST-080 FR9); with `reversed`, also with the page's stylesheet chunks
 * reversed.
 */
async function expectCascade(origin, {reversed}) {
  const browser = await chromium.launch();
  try {
    const tab = await browser.newPage();
    const load = () => tab.goto(origin, {waitUntil: 'load'});
    await load();
    // Present first: every probe, each package's three.
    expect(Object.keys(await readProbes(tab)).sort()).toEqual(
      Object.keys(expected(false)).sort(),
    );
    expect(await readProbes(tab)).toEqual(expected(false));
    await tab.addStyleTag({content: THEME});
    expect(await readProbes(tab)).toEqual(expected(true));
    await load();
    await tab.evaluate(theme => {
      const style = document.createElement('style');
      style.textContent = theme;
      document.head.prepend(style);
    }, THEME);
    expect(await readProbes(tab)).toEqual(expected(true));
    if (!reversed) return;
    await load();
    // Present first: Core's reset.css and Astryx's blocks load as separate
    // chunks, so one load order or the other puts the blocks first, where
    // only each block's own order registration keeps the reset below them.
    const layers = await tab.evaluate(reverseChunks);
    const reset = layers.findIndex(chunk => chunk.includes('reset'));
    const base = layers.findIndex(chunk => chunk.includes('astryx-base'));
    expect(reset).toBeGreaterThanOrEqual(0);
    expect(base).toBeGreaterThanOrEqual(0);
    expect(reset).not.toBe(base);
    expect(await readProbes(tab)).toEqual(expected(false));
    await tab.addStyleTag({content: THEME});
    expect(await readProbes(tab)).toEqual(expected(true));
  } finally {
    await browser.close();
  }
}

// Real Next.js builds, servers and Chromium take minutes of every core, so the
// default suite skips them; ASTRYX_TURBOPACK_E2E=1 runs them (with Chromium),
// as `pnpm test:build` does on the Build package's own CI runner.
describe.runIf(process.env.ASTRYX_TURBOPACK_E2E === '1')(
  'Turbopack end to end (ASTRYX_TURBOPACK_E2E=1)',
  () => {
    let installed;

    beforeAll(() => {
      ({app, installed} = scratch());
      root = path.dirname(app);
      // From the parent, as `next build <dir>` runs; the servers below run in the app.
      execFileSync(process.execPath, [nextBin(app), 'build', 'app'], {
        cwd: root,
        env,
      });
      ruleLog = fs.readFileSync(path.join(app, 'rules.log'), 'utf8');
      ({page: html, css} = built(app));
    }, 600_000);

    // Only a case that failed, or was filtered out, before removing its
    // folder leaves one here.
    afterAll(() => {
      for (const dir of roots) unscratch(dir);
    });

    describe('withAstryx() under Turbopack', () => {
      it('builds Core linked and Lab, Charts and Rich Text installed, with the prebuilt class names', () => {
        expectStyled(html, css);
      });

      it('builds with every installed prebuilt package stylesheet deleted', () => {
        // Present first: each package is installed with its source entry.
        for (const [name, dir] of Object.entries(installed)) {
          expect(fs.existsSync(path.join(dir, 'src/index.ts')), name).toBe(
            true,
          );
          expect(
            fs.existsSync(path.join(dir, 'dist', PREBUILT[name])),
            name,
          ).toBe(false);
        }
        expect(Object.keys(installed).sort()).toEqual(
          Object.keys(PREBUILT).sort(),
        );
      });

      it("runs the app's mixed rule list in order, on the app's files only", () => {
        // The app loader also throws on Astryx source, failing the build.
        const runs = [...ruleLog.matchAll(/^(\S+) (.*)$/gm)];
        const page = path.join(app, 'src/app/page.tsx');
        const names = runs
          .filter(([, , file]) => file === page)
          .map(run => run[1]);
        expect([...new Set(names)]).toEqual(['a', 'stylex', 'b']);
        expect(runs.every(run => run[2].startsWith(path.dirname(page)))).toBe(
          true,
        );
      });

      it('emits Astryx rules in astryx-base layers, without a priority layer', () => {
        expect(css).toContain('@layer astryx-base');
        expect(css).not.toMatch(/@layer priority|\.astryx[a-z0-9]{5,}/);
      });

      it('keeps the product and a theme over each package base in the built app', async () => {
        await serving(app, 'start', origin =>
          expectCascade(origin, {reversed: true}),
        );
      }, 300_000);

      it('serves the same in next dev', async () => {
        try {
          await serving(app, 'dev', async (origin, page) => {
            const hrefs = [...page.matchAll(/href="([^"]+\.css[^"]*)"/g)];
            const sheets = await Promise.all(
              hrefs.map(async ([, href]) =>
                (await fetch(origin + href)).text(),
              ),
            );
            expectStyled(page, sheets.join('\n'));
            // `next dev` serves Core's reset.css and Astryx's blocks in one
            // stylesheet, whose order its own rules fix; the built app's
            // separate chunks are where the order meets a reversed load.
            await expectCascade(origin, {reversed: false});
          });
        } finally {
          // The app's last reader: the cases above read it, in this order.
          unscratch(root);
        }
      }, 600_000);
    });

    describe("withAstryx() under Turbopack, importing a source-built package's prebuilt stylesheet", () => {
      // The check lives in the @astryx PostCSS plugin, which runs the same
      // under webpack; one bundler's build keeps test-build's time down.
      it('fails the build instead of taking rules from it', () => {
        const {dir, app: imports} = scratch({
          packages: [],
          keepPrebuilt: ['core'],
        });
        fs.writeFileSync(
          path.join(imports, 'src/app/page.tsx'),
          "import {Text} from '@astryxdesign/core';\nexport default function Page() {\n  return <Text>Hello</Text>;\n}\n",
        );
        fs.writeFileSync(
          path.join(imports, 'src/app/globals.css'),
          "@import '@astryxdesign/core/reset.css';\n@import '@astryxdesign/core/astryx.css';\n@astryx;\n",
        );
        let failure;
        try {
          execFileSync(process.execPath, [nextBin(imports), 'build'], {
            cwd: imports,
            env,
            stdio: 'pipe',
          });
        } catch (error) {
          failure = `${error.stdout}${error.stderr}`;
        } finally {
          unscratch(dir);
        }
        expect(failure).toMatch(
          /@astryxdesign\/core is built from source[\s\S]*astryx\.css/,
        );
      }, 600_000);
    });

    describe('withAstryx() under webpack', () => {
      let webpackDir, webpackApp, webpackHtml, webpackCss;

      beforeAll(() => {
        // The same app and config, with every installed prebuilt package
        // stylesheet deleted, built by webpack. Under webpack an app's Babel
        // config also compiles its dependencies, and Next.js's Babel cannot
        // compile Lexical's build (`\p{L}` in a regular expression), which
        // Rich Text imports: this app compiles its StyleX through its own
        // webpack rule (next.config.mjs) instead.
        ({dir: webpackDir, app: webpackApp} = scratch());
        fs.rmSync(path.join(webpackApp, 'babel.config.js'));
        execFileSync(
          process.execPath,
          [nextBin(webpackApp), 'build', '--webpack'],
          {cwd: webpackApp, env},
        );
        ({page: webpackHtml, css: webpackCss} = built(webpackApp));
      }, 600_000);

      it('builds Core linked and Lab, Charts and Rich Text installed, with the prebuilt class names', () => {
        expectStyled(webpackHtml, webpackCss);
      });

      it('emits Astryx rules in astryx-base layers, without a priority layer', () => {
        expect(webpackCss).toContain('@layer astryx-base');
        expect(webpackCss).not.toMatch(
          /@layer priority|@layer [^{;]*\bproduct\b|\.astryx[a-z0-9]{5,}/,
        );
      });

      it('keeps the product and a theme over each package base in the built app', async () => {
        try {
          await serving(webpackApp, 'start', origin =>
            expectCascade(origin, {reversed: true}),
          );
        } finally {
          // The app's last reader: the cases above read it, in this order.
          unscratch(webpackDir);
        }
      }, 300_000);

      // `next dev` runs the same withAstryx() configuration, checked under
      // Turbopack; one served webpack build keeps test-build's time down.
    });

    describe('withAstryx() under Turbopack, with Core alone', () => {
      let page, sheet;

      beforeAll(() => {
        const {dir, app: coreOnly} = scratch({packages: []});
        // An app reading a Core data colour as plain CSS, as dist dataVars compile.
        fs.writeFileSync(
          path.join(coreOnly, 'src/app/page.tsx'),
          [
            "import * as stylex from '@stylexjs/stylex';",
            "import {Text} from '@astryxdesign/core';",
            "const styles = stylex.create({swatch: {height: 8, backgroundColor: 'var(--color-data-categorical-blue)'}});",
            'export default function Page() {',
            '  return <main><Text>Hello</Text><div id="swatch" {...stylex.props(styles.swatch)} /></main>;',
            '}',
            '',
          ].join('\n'),
        );
        try {
          execFileSync(process.execPath, [nextBin(coreOnly), 'build'], {
            cwd: coreOnly,
            env,
          });
          ({page, css: sheet} = built(coreOnly));
        } finally {
          // The cases below read the page and stylesheet from memory.
          unscratch(dir);
        }
      }, 600_000);

      it("declares Core's data-colour defaults, as astryx.css does", () => {
        expect(sheet).toMatch(/--color-data-categorical-blue:/);
      });

      it('colours a swatch that reads one', async () => {
        const body = page.replace(/<link[^>]*>|<script[\s\S]*?<\/script>/g, '');
        const browser = await chromium.launch();
        try {
          const tab = await browser.newPage();
          await tab.setContent(
            body.replace('</head>', `<style>${sheet}</style></head>`),
          );
          expect(
            await tab.$eval('#swatch', swatch =>
              getComputedStyle(swatch).getPropertyValue('background-color'),
            ),
          ).toBe('rgb(1, 113, 227)');
        } finally {
          await browser.close();
        }
      });
    });
  },
);
