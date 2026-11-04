// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Evidence arm, not for landing. A vitest setup file: it announces
 * each temporary directory a test makes inside packages/cli (by mkdtemp, or
 * a `.tmp-` folder by mkdir), so the held structure walk
 * (hold-walk-on-cli-fixture.mjs) can wait for it.
 */
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import * as path from 'node:path';

const signal = process.env.ASTRYX_FIXTURE_SIGNAL;
const cli = process.env.ASTRYX_CLI_DIR;
if (signal && cli) {
  const inside = (/** @type {unknown} */ dir) =>
    path.resolve(String(dir)).startsWith(path.resolve(cli) + path.sep);
  const announce = (/** @type {unknown} */ dir) =>
    fs.appendFileSync(signal, `${path.resolve(String(dir))}\n`);
  const {mkdtempSync, mkdirSync} = fs;
  // @ts-expect-error the wrapper forwards every overload unchanged
  fs.mkdtempSync = function (prefix, ...rest) {
    const dir = mkdtempSync.call(this, prefix, ...rest);
    if (inside(dir)) announce(dir);
    return dir;
  };
  // @ts-expect-error the wrapper forwards every overload unchanged
  fs.mkdirSync = function (dir, ...rest) {
    const made = mkdirSync.call(this, dir, ...rest);
    if (inside(dir) && path.basename(String(dir)).startsWith('.tmp-')) {
      announce(dir);
    }
    return made;
  };
  syncBuiltinESMExports();
}
