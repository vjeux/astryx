// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file playwright.config.ts
 * @input Uses @playwright/test
 * @output The gesture system's browser proof: Chromium with phone emulation
 *   and real touch input through CDP
 * @position Self-contained config for packages/core/src/gestures; run with
 *   `pnpm exec playwright test --config packages/core/src/gestures/__tests__/browser/playwright.config.ts`
 */

import os from 'node:os';
import path from 'node:path';
import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: '.',
  // Traces and screenshots of failures stay out of the source tree.
  outputDir: path.join(os.tmpdir(), 'astryx-gesture-proof'),
  testMatch: ['*.chromium.spec.ts'],
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  reporter: [['list']],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Pixel 7'],
        browserName: 'chromium',
        viewport: {width: 390, height: 844},
        deviceScaleFactor: 3,
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
});
