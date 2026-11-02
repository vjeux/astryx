// Copyright (c) Meta Platforms, Inc. and affiliates.

import * as vm from 'node:vm';
import {describe, it, expect} from 'vitest';

async function apply(name, source, filePath) {
  const {default: transform} = await import(`../${name}.mjs`);
  const jscodeshift = (await import('jscodeshift')).default;
  const api = {jscodeshift, stats: () => {}, report: () => {}};
  return transform({source, path: filePath}, api) ?? source;
}

const stylesheet = (source, filePath = 'src/app/globals.css') =>
  apply('migrate-next-webpack-stylesheet', source, filePath);
const config = (source, filePath) =>
  apply('migrate-next-webpack-config', source, filePath);

describe('migrate-next-webpack-stylesheet', () => {
  it("drops `product` from the former webpack setup's layer list", async () => {
    expect(
      await stylesheet(
        '@layer reset, astryx-base, astryx-theme, product;\n',
        'src/app/layers.css',
      ),
    ).toBe('@layer reset, astryx-base, astryx-theme;\n');
  });

  it("adds `@astryx;` before `@stylex;` in the former webpack setup's global stylesheet", async () => {
    const input = [
      "@import './layers.css';",
      "@import '@astryxdesign/core/reset.css';",
      "@import '@astryxdesign/theme-neutral/theme.css';",
      '',
      '@stylex;',
      '',
    ].join('\n');
    expect(await stylesheet(input)).toBe(
      input.replace('@stylex;', '@astryx;\n@stylex;'),
    );
  });

  it('leaves a stylesheet that loads a prebuilt package stylesheet alone', async () => {
    const input = [
      "@import '@astryxdesign/core/reset.css';",
      "@import '@astryxdesign/core/astryx.css';",
      '@stylex;',
      '',
    ].join('\n');
    expect(await stylesheet(input)).toBe(input);
  });

  it('leaves a stylesheet that already holds `@astryx;` alone', async () => {
    const input =
      "@import '@astryxdesign/core/reset.css';\n@astryx;\n@stylex;\n";
    expect(await stylesheet(input)).toBe(input);
  });

  it('adds nothing where there is no `@stylex;` or no Core reset', async () => {
    const noStylex = "@import '@astryxdesign/core/reset.css';\n.a {}\n";
    const noReset = '@stylex;\n';
    expect(await stylesheet(noStylex)).toBe(noStylex);
    expect(await stylesheet(noReset)).toBe(noReset);
  });
});

describe('migrate-next-webpack-config', () => {
  it("rewrites the former webpack setup's Babel plugin to StyleX's, with its options", async () => {
    const input = [
      'module.exports = {',
      "  presets: ['next/babel'],",
      "  plugins: [['@astryxdesign/build/babel', {dev: false, runtimeInjection: false}]],",
      '};',
      '',
    ].join('\n');
    const output = await config(input, 'babel.config.js');
    expect(output).toContain("'@stylexjs/babel-plugin'");
    expect(output).toContain('{dev: false, runtimeInjection: false}');
    expect(output).not.toContain('@astryxdesign/build/babel');
  });

  it('rewrites the former PostCSS plugin to @astryx plus StyleX for the app', async () => {
    const input = [
      'module.exports = {',
      '  plugins: {',
      "    '@astryxdesign/build/postcss': {",
      "      appDir: 'app',",
      "      babelPlugins: [['@stylexjs/babel-plugin', {dev: false}]],",
      '    },',
      '  },',
      '};',
      '',
    ].join('\n');
    const output = await config(input, 'postcss.config.js');
    const sandbox = {module: {}};
    vm.runInNewContext(output, sandbox);
    const {plugins} = sandbox.module.exports;
    expect(plugins).toEqual({
      '@astryxdesign/build/next/postcss': {},
      '@stylexjs/postcss-plugin': {
        include: ['app/**/*.{js,jsx,ts,tsx}'],
        babelConfig: {
          babelrc: false,
          parserOpts: {plugins: ['typescript', 'jsx']},
          plugins: [['@stylexjs/babel-plugin', {dev: false}]],
        },
      },
    });
  });

  it('adds only the @astryx plugin when the app compiled no StyleX of its own', async () => {
    const input =
      "export default {plugins: {'@astryxdesign/build/postcss': {}}};\n";
    const output = await config(input, 'postcss.config.mjs');
    expect(output).toContain("'@astryxdesign/build/next/postcss': {}");
    expect(output).not.toContain('@stylexjs/postcss-plugin');
    expect(output).not.toContain("'@astryxdesign/build/postcss'");
  });

  it('leaves a PostCSS entry with other options, and files that are not configs, alone', async () => {
    const custom =
      "module.exports = {plugins: {'@astryxdesign/build/postcss': {libraryPrefix: 'lib'}}};\n";
    expect(await config(custom, 'postcss.config.js')).toBe(custom);
    const other = "export const plugin = '@astryxdesign/build/babel';\n";
    expect(await config(other, 'src/plugins.js')).toBe(other);
  });
});
