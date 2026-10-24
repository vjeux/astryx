// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file touchPresentation.source-build.test.mjs
 * @input Uses Babel, the core StyleX build config and the StyleX rule
 *   processor on a style that switches on the touch presentation's keys
 * @output Verifies the shipped stylesheet carries the touch presentation's
 *   media queries themselves, not unresolved constant references
 * @position Build regression test for utils/touchPresentation.stylex.ts
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {transformAsync} from '@babel/core';
import stylexBabelPlugin from '@stylexjs/babel-plugin';
import {describe, expect, it} from 'vitest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORE_ROOT = path.resolve(__dirname, '..', '..');

const SOURCE = `
import * as stylex from '@stylexjs/stylex';
import {touchMedia} from './touchPresentation.stylex';

export const styles = stylex.create({
  spinner: {
    animationDuration: {default: '2s', [touchMedia.touch]: '1s'},
    inlineSize: {default: '320px', [touchMedia.compact]: '100%'},
    borderRadius: {default: '8px', [touchMedia.compactTouch]: '12px'},
  },
});
`;

async function transform(code, filename) {
  const result = await transformAsync(code, {
    babelrc: false,
    configFile: path.join(CORE_ROOT, 'babel.config.json'),
    filename,
  });
  return result?.metadata?.stylex ?? [];
}

/** The stylesheet of the constants and a style using them, built together as the package is. */
async function compile() {
  const constants = path.join(__dirname, 'touchPresentation.stylex.ts');
  const rules = [
    ...(await transform(await fs.readFile(constants, 'utf8'), constants)),
    // A file beside the constants, so their import resolves.
    ...(await transform(
      SOURCE,
      path.join(__dirname, 'touchPresentationFixture.tsx'),
    )),
  ];
  return stylexBabelPlugin.processStylexRules(rules, false);
}

describe('touch presentation media keys (compiled)', () => {
  it('compile to the queries themselves', async () => {
    const css = await compile();
    expect(css).toContain('@media (pointer: coarse)');
    expect(css).toContain('@media (width < 744px), (height < 500px)');
    expect(css).toContain(
      '@media (width < 744px) and (pointer: coarse), (height < 500px) and (pointer: coarse)',
    );
    // A constant left unresolved compiles to a broken `var(--…){…}` rule.
    expect(css).not.toMatch(/(^|\n)var\(--/);
  });
});
