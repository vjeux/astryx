// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file playwright.config.ts
 * @input Uses @playwright/test
 * @output The motion foundation's browser proofs: Chromium (Pixel 7) and
 *   WebKit (iPhone 13) with phone emulation (touch, mobile viewport)
 * @position Run with
 *   `pnpm exec playwright test --config packages/core/src/motion/__tests__/playwright.config.ts`.
 *   Separate from the accessibility contract run (root playwright.config.ts):
 *   these proofs need no Storybook build; they bundle the motion source with
 *   esbuild and drive it on a blank page.
 *
 * SYNC: When a motion browser proof is added, match it in `testMatch`.
 */

import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['*.compositor.spec.ts'],
  // One page at a time: the proofs block the main thread and read frame
  // timing, which other workers would disturb.
  workers: 1,
  fullyParallel: false,
  timeout: 60_000,
  reporter: [['list']],
  projects: [
    {name: 'chromium-phone', use: {...devices['Pixel 7']}},
    {name: 'webkit-phone', use: {...devices['iPhone 13']}},
  ],
});
