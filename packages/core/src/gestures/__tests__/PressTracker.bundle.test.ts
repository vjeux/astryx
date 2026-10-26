// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PressTracker.bundle.test.ts
 * @input PressTracker.ts, bundled and minified by esbuild
 * @output The press tracker carries only the UIKit gesture groups it reads,
 *   never the whole table (architecture:component-style-authoring INV6)
 * @position Bundle evidence for packages/core/src/gestures: every
 *   press-tracked control ships what the tracker imports
 */

import {execFileSync} from 'node:child_process';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {afterAll, describe, expect, it} from 'vitest';

const here = path.dirname(fileURLToPath(import.meta.url));
const gestures = path.resolve(here, '..');
const repoRoot = path.resolve(here, '../../../../..');
// Inside the repo so the script resolves `esbuild` by bare specifier, and
// under node_modules so it is ignored and swept with the install.
const workspace = mkdtempSync(
  path.join(repoRoot, 'node_modules', '.astryx-press-tracker-bundle-'),
);
afterAll(() => {
  rmSync(workspace, {recursive: true, force: true});
});

const script = path.join(workspace, 'bundle.mjs');
writeFileSync(
  script,
  [
    "import {build} from 'esbuild';",
    'const [dir] = process.argv.slice(2);',
    'const out = await build({',
    "  stdin: {contents: \"import {PressTracker} from './PressTracker'; console.log(PressTracker);\", resolveDir: dir, loader: 'ts'},",
    "  bundle: true, minify: true, format: 'esm', write: false, logLevel: 'silent',",
    '});',
    'console.log(JSON.stringify(out.outputFiles[0].text));',
  ].join('\n'),
);

describe('the press tracker bundle', () => {
  const text = JSON.parse(
    execFileSync(process.execPath, [script, gestures], {
      encoding: 'utf8',
      timeout: 120_000,
    })
      .trim()
      .split('\n')
      .pop() ?? '""',
  ) as string;

  it('carries the press, pan and control groups it reads', () => {
    expect(text).toContain('quickTapFlash:');
    expect(text).toContain('trackingExpansion:');
  });

  it('never carries the whole UIKit gesture table', () => {
    // The table's own keys: only the union of every group has them.
    expect(text).not.toContain('screenEdgePan:');
    expect(text).not.toContain('longPress:');
    // Groups neither the tracker nor the tap recognizer it checks for reads.
    for (const key of [
      'edgeRegion:',
      'minimumMovementDecay:',
      'scrollReleaseWeight:',
      'strayClickWindow:',
      'minimumPressDuration:',
    ]) {
      expect(text).not.toContain(key);
    }
  });
});
