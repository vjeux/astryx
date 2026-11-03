// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file interactionOverlay.exports.test.ts
 * @input vitest, core's package.json, the published overlay module
 *   (interactionOverlay.stylex.ts) and the utils entry point (index.ts)
 * @output Asserts the list row's press layer stays internal. The utils entry
 *   point and the published overlay module expose none of its styles or
 *   clocks. Core's `exports` list neither module that holds them.
 * @position Unit test beside utils/interactionOverlay.stylex.ts and
 *   utils/rowPressLayer.stylex.ts
 */

import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import * as utils from './index';
import * as overlay from './interactionOverlay.stylex';

const ROW_LAYER_STYLES = ['cell', 'cellOnImage'];
const ROW_LAYER_EXPORTS = ['cellPressConsts'];

describe("the list row's press layer stays internal", () => {
  it('is not exported from @astryxdesign/core/utils/interactionOverlay.stylex', () => {
    for (const name of ROW_LAYER_EXPORTS) {
      expect(overlay, name).not.toHaveProperty(name);
    }
    for (const name of ROW_LAYER_STYLES) {
      expect(overlay.interactionOverlayStyles, name).not.toHaveProperty(name);
    }
  });

  it('is not exported from @astryxdesign/core/utils', () => {
    for (const name of ROW_LAYER_EXPORTS) {
      expect(utils, name).not.toHaveProperty(name);
    }
    for (const name of ROW_LAYER_STYLES) {
      expect(utils.interactionOverlayStyles, name).not.toHaveProperty(name);
    }
  });

  it('lives in a module that core’s exports do not list', () => {
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), 'packages/core/package.json'), 'utf8'),
    ) as {exports: Record<string, string | {source?: string}>};
    const sources = Object.values(pkg.exports).map(entry =>
      typeof entry === 'string' ? entry : entry.source,
    );
    expect(sources).not.toContain('./src/utils/rowPressLayer.stylex.ts');
    expect(sources).not.toContain('./src/privateAttributes/press.stylex.ts');
  });
});
