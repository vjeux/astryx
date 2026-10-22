// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file source-stylesheet.test.mjs
 * @input A synthetic Astryx-shaped package, and the real Core and Lab source
 *   with their prebuilt stylesheets as scripts/build-css.mjs builds them
 * @output Proves a source build compiles only the modules an app reaches and
 *   prints them as each prebuilt stylesheet does (spec:AST-080 FR7), and covers
 *   the `@astryx` PostCSS plugin
 * @position Unit and parity tests for the Turbopack half of @astryxdesign/build
 */

import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';

const require = createRequire(import.meta.url);
const {
  compileRules,
  packageModules,
  renderPackage,
  sourcePackages,
  sourceStylesheet,
  stylexOptions,
} = require('./source-stylesheet.js');
const astryxPostcss = require('./next-postcss.js');
const {processStylexRules} = require('@stylexjs/babel-plugin');

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..',
);
const roots = [];

function tempDir() {
  const dir = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-source-')),
  );
  roots.push(dir);
  return dir;
}

function writeFiles(root, files) {
  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true});
    fs.writeFileSync(path.join(root, file), content);
  }
}

afterAll(() => {
  for (const dir of roots) fs.rmSync(dir, {recursive: true, force: true});
});

describe('the modules a source build compiles', () => {
  let app;
  const core = 'node_modules/@astryxdesign/core';
  const reached = async (source, page = 'page.tsx') => {
    fs.rmSync(path.join(app, 'src'), {recursive: true, force: true});
    writeFiles(app, {[`src/${page}`]: source});
    const {reached: files} = await sourceStylesheet({cwd: app});
    return [...files]
      .map(file => path.relative(path.join(app, core, 'src'), file))
      .sort();
  };

  beforeAll(() => {
    app = tempDir();
    writeFiles(app, {
      [`${core}/package.json`]: JSON.stringify({
        name: '@astryxdesign/core',
        sideEffects: ['**/*.stylex.ts'],
        exports: {
          '.': {source: './src/index.ts'},
          './Calendar': {source: './src/Calendar/index.ts'},
        },
      }),
      [`${core}/src/index.ts`]: [
        "'use client';",
        "export type {Props} from './types';",
        "export * from './Button';",
        "export * from './Calendar';",
        "export * from './Lazy';",
        "export * from './theme/marker.stylex';",
      ].join('\n'),
      [`${core}/src/types.ts`]: 'export interface Props {}',
      [`${core}/src/Button/index.ts`]:
        "export {Button} from './Button';\nexport type {ButtonProps} from './Button';",
      [`${core}/src/Button/Button.tsx`]: [
        "import {Icon} from '../Icon';",
        "import type {Calendar} from '../Calendar';",
        "import {tokens} from '../theme/tokens.stylex';",
        'export type ButtonProps = {};',
        'export const Button = () => <Icon size={tokens.size} />;',
      ].join('\n'),
      [`${core}/src/Icon/index.ts`]:
        "export * from './Icon';\nexport * from './IconSize';",
      [`${core}/src/Icon/Icon.tsx`]: 'export const Icon = () => null;',
      [`${core}/src/Icon/IconSize.tsx`]: 'export const IconSize = 1;',
      [`${core}/src/Calendar/index.ts`]: "export * from './Calendar';",
      [`${core}/src/Calendar/Calendar.tsx`]:
        'export const Calendar = () => null;',
      [`${core}/src/Lazy/index.ts`]:
        "export const Lazy = () => import('../Sheet/Sheet');",
      [`${core}/src/Sheet/Sheet.tsx`]: 'export default function Sheet() {}',
      [`${core}/src/theme/tokens.stylex.ts`]:
        'export const tokens = {size: 1};',
      [`${core}/src/theme/marker.stylex.ts`]: 'export const marker = {};',
    });
  });

  it('follows names through export * barrels, not every re-export', async () => {
    expect(await reached("import {Button} from '@astryxdesign/core';")).toEqual(
      [
        'Button/Button.tsx',
        'Button/index.ts',
        'Icon/Icon.tsx',
        'Icon/index.ts',
        'index.ts',
        // Declared side-effectful, so a bundler keeps it whatever is named.
        'theme/marker.stylex.ts',
        'theme/tokens.stylex.ts',
      ],
    );
  });

  it('keeps what a dynamic import loads', async () => {
    expect(await reached("import {Lazy} from '@astryxdesign/core';")).toEqual(
      expect.arrayContaining(['Lazy/index.ts', 'Sheet/Sheet.tsx']),
    );
  });

  it('resolves documented subpaths and namespace imports', async () => {
    expect(
      await reached("import {Calendar} from '@astryxdesign/core/Calendar';"),
    ).toEqual(['Calendar/Calendar.tsx', 'Calendar/index.ts']);
    expect(
      await reached("import * as Astryx from '@astryxdesign/core';"),
    ).toHaveLength(11);
  });

  it('reads MDX pages and `.ts` assertions, and skips type-only imports', async () => {
    const calendar = "import {Calendar} from '@astryxdesign/core';";
    const mdx = [
      calendar,
      '',
      '```tsx',
      "import {Lazy} from '@astryxdesign/core';",
    ];
    mdx.push(
      '',
      'export default function Demo() {}',
      '```',
      '',
      '<Calendar />',
    );
    const files = await reached(mdx.join('\n'), 'page.mdx');
    expect(files).toContain('Calendar/Calendar.tsx');
    expect(files).not.toContain('Lazy/index.ts');
    const ts = `${calendar}\nexport const b = <HTMLElement>document.body;`;
    expect(await reached(ts, 'page.ts')).toContain('Calendar/Calendar.tsx');
    expect(
      await reached("import type {Props} from '@astryxdesign/core';"),
    ).toEqual([]);
  });

  it('keeps every module an unparseable file names, and warns', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(
      await reached("import {Button} from '@astryxdesign/core';\nconst a = ;"),
    ).toHaveLength(11);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('page.tsx'));
    warn.mockRestore();
  });

  it('follows installed packages to any depth, and fails on an unreadable one', async () => {
    writeFiles(app, {
      'package.json': '{"dependencies": {"dash": "1"}}',
      'node_modules/dash/package.json':
        '{"dependencies": {"kit": "1", "bad": "1"}}',
      'node_modules/kit/package.json':
        '{"peerDependencies": {"@astryxdesign/core": "1"}}',
      'node_modules/kit/index.js':
        "export {Calendar} from '@astryxdesign/core';",
      'node_modules/bad/package.json': '{',
    });
    await expect(reached('')).rejects.toThrow(/bad.package\.json/);
    writeFiles(app, {'node_modules/bad/package.json': '{}'});
    expect(await reached('')).toContain('Calendar/Calendar.tsx');
    fs.rmSync(path.join(app, 'package.json'));
  });
});

it('numbers priority levels against the whole package', () => {
  const rule = (key, priority) => [key, {ltr: `.${key}{color:red}`}, priority];
  // Alone, xb's level would be the first present and get no suffix.
  expect(
    renderPackage([rule('xa', 1000), rule('xb', 3000)], new Set(['xb'])),
  ).toBe('@layer astryx-base {\n  .xb:not(#\\#){color:red}\n}\n');
});

describe('a source build against the prebuilt stylesheets', () => {
  let app;
  let buildCss;
  const src = name => path.join(repoRoot, `packages/${name}/src`);
  const coreTarget = {src: src('core'), aliases: {}};

  /** A package's prebuilt rules, as scripts/build-css.mjs builds them. */
  async function prebuilt(name) {
    const target =
      name === 'core'
        ? coreTarget
        : {
            src: src(name),
            aliases: {
              '@astryxdesign/core/*': [path.join(src('core'), '*')],
              '@astryxdesign/core': [src('core')],
            },
            provider: coreTarget,
          };
    const rules = await buildCss.collectStyleXCSS(target);
    const sheet = buildCss.composePackageStylesheet(
      '',
      processStylexRules(rules, false),
    );
    return sheet.slice(sheet.indexOf('@layer astryx-base {'));
  }

  beforeAll(async () => {
    app = tempDir();
    fs.mkdirSync(path.join(app, 'node_modules/@astryxdesign'), {
      recursive: true,
    });
    for (const name of ['core', 'lab']) {
      fs.symlinkSync(
        path.join(repoRoot, 'packages', name),
        path.join(app, 'node_modules/@astryxdesign', name),
        'junction',
      );
    }
    buildCss = await import(
      pathToFileURL(path.join(repoRoot, 'scripts/build-css.mjs')).href
    );
  });

  it.each(['core', 'lab'])(
    'compiles every %s module to its prebuilt stylesheet byte for byte',
    async name => {
      const packages = sourcePackages(app);
      const pkg = packages.find(({name: n}) => n === `@astryxdesign/${name}`);
      // Lab relies on astryx.css for the Core variable groups it reads.
      const provided = new Set(
        name === 'core'
          ? []
          : [...packageModules(packages[0], packages)].filter(file =>
              /\.stylex\.ts$/.test(file),
            ),
      );
      const options = stylexOptions(pkg, packages);
      const rules = [];
      for (const file of packageModules(pkg, packages, provided)) {
        rules.push(...(await compileRules(file, options)));
      }
      expect(renderPackage(rules, new Set(rules.map(([key]) => key)))).toBe(
        await prebuilt(name),
      );
    },
    180_000,
  );

  it('carries every Core definition prebuilt lab.css relies on', async () => {
    // FR7: Core source-built beside a prebuilt Lab stylesheet.
    writeFiles(app, {
      'src/page.tsx': "import {Text} from '@astryxdesign/core';",
    });
    const {css} = await sourceStylesheet({cwd: app});
    // Global definitions: variable groups (`:root` rules) and keyframes.
    const defined = sheet =>
      [
        ...(sheet.match(/:root[^{]*\{[^}]*\}/g) ?? [])
          .join()
          .matchAll(/(--[\w-]+):/g),
        ...sheet.matchAll(/@keyframes ([\w-]+)/g),
      ].map(match => match[1]);
    const core = defined(await prebuilt('core'));
    const used = (await prebuilt('lab')).match(
      /(?<=var\()--[\w-]+|(?<=animation-name:)[\w-]+/g,
    );
    const fromCore = used.filter(name => core.includes(name));
    expect(fromCore.length).toBeGreaterThan(10);
    expect(fromCore.filter(name => !defined(css).includes(name))).toEqual([]);
  }, 180_000);

  it('prints a subset as prebuilt lines in prebuilt order', async () => {
    writeFiles(app, {
      'src/page.tsx': "import {Button, Text} from '@astryxdesign/core';",
    });
    const {css, reached} = await sourceStylesheet({cwd: app});
    const files = [...reached].map(file => path.relative(app, file));
    expect(files).toContain(
      'node_modules/@astryxdesign/core/src/Button/Button.tsx',
    );
    expect(files.some(file => file.includes('/Calendar/'))).toBe(false);
    expect(files.some(file => file.includes('/lab/'))).toBe(false);

    const lines = (await prebuilt('core')).split('\n');
    const [coreBlock] = css.split(/\n(?=@layer)/);
    let at = 0;
    for (const line of coreBlock.split('\n')) {
      at = lines.indexOf(line, at) + 1;
      expect(at, line).toBeGreaterThan(0);
    }
    expect(coreBlock.length).toBeLessThan(lines.join('\n').length / 2);
    // One astryx-base layer per package: no registration, no nested layers.
    expect(css.match(/@layer[^{]*/g)).toEqual(['@layer astryx-base ']);
  }, 180_000);
});

describe('the @astryx PostCSS plugin', () => {
  /** Run the plugin over a root holding `count` bare `@astryx` rules. */
  async function run(cwd, count = 1) {
    const result = {opts: {from: path.join(cwd, 'a.css')}, messages: []};
    const rules = Array.from({length: count}, () => ({
      params: '',
      replaceWith(css) {
        this.css = css;
      },
      error: message => new Error(message),
    }));
    const root = {walkAtRules: (_, visit) => rules.forEach(visit)};
    await astryxPostcss({cwd}).Once(root, {result});
    return {css: rules[0].css, messages: result.messages};
  }

  it('replaces @astryx with the compiled rules and watches the app', async () => {
    const app = tempDir();
    writeFiles(app, {
      'node_modules/@astryxdesign/core/package.json': JSON.stringify({
        name: '@astryxdesign/core',
        exports: {'.': {source: './src/index.ts'}},
      }),
      'node_modules/@astryxdesign/core/src/index.ts':
        "import * as stylex from '@stylexjs/stylex';\nconst s = stylex.create({root: {color: 'red'}});\nexport const Box = () => stylex.props(s.root);",
      'src/page.tsx': "import {Box} from '@astryxdesign/core';",
      'lib/x/node_modules/y/z.js': '',
      '.next/server/a.js': '',
    });
    fs.symlinkSync(path.join(app, 'src'), path.join(app, 'docs'), 'junction');
    const {css, messages} = await run(app);
    expect(css).toMatch(
      /^@layer astryx-base \{\n {2}\.x[a-z0-9]+\{color:red\}/,
    );
    // No app glob reaches node_modules, a dot directory or a symlink; the
    // package's own source is the one dependency there.
    const tail = '*.{js,jsx,mjs,cjs,ts,tsx,mdx}';
    expect(
      messages.map(({dir, glob}) => `${path.relative(app, dir)} ${glob}`),
    ).toEqual(
      expect.arrayContaining([
        ` ${tail}`,
        `lib ${tail}`,
        `lib/x ${tail}`,
        'node_modules/@astryxdesign/core/src **/*.{ts,tsx}',
      ]),
    );
    expect(messages).toHaveLength(5);
    expect(messages).toContainEqual(
      expect.objectContaining({dir: path.join(app, 'src'), glob: `**/${tail}`}),
    );
    await expect(run(app, 2)).rejects.toThrow(/Only one @astryx/);
  });

  it('fails when no Astryx package ships source', async () => {
    await expect(run(tempDir())).rejects.toThrow(/No Astryx package/);
  });
});
