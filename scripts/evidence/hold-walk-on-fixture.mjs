// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Evidence arm, not for landing. Preloaded into the CLI structure
 * check, it replays the rule-47 race in a fixed order: the walk waits until
 * build.family has finished a fixture, and it reads a file of that fixture
 * only after build.family has removed it.
 */
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import * as path from 'node:path';

const signal = String(process.env.ASTRYX_FIXTURE_SIGNAL);
const done = String(process.env.ASTRYX_FIXTURE_DONE);
const cli = path.resolve(String(process.env.ASTRYX_CLI_DIR));
const cell = new Int32Array(new SharedArrayBuffer(4));
const wait = (/** @type {number} */ ms) => Atomics.wait(cell, 0, 0, ms);
const finished = () => fs.existsSync(done);
const {readdirSync, readFileSync} = fs;
/** @type {string | null} */
let fixture = null;

// @ts-expect-error the wrapper forwards every overload unchanged
fs.readdirSync = function (dir, ...rest) {
  if (fixture === null && path.resolve(String(dir)) === cli) {
    while (!fs.existsSync(signal) && !finished()) wait(20);
    fixture = fs.existsSync(signal)
      ? readFileSync(signal, 'utf8').split('\n')[0]
      : '';
    process.stderr.write(`walk: starts with fixture ${fixture || '(none)'}\n`);
  }
  return readdirSync.call(this, dir, ...rest);
};
// @ts-expect-error the wrapper forwards every overload unchanged
fs.readFileSync = function (file, ...rest) {
  if (fixture && path.resolve(String(file)).startsWith(fixture + path.sep)) {
    while (fs.existsSync(fixture) && !finished()) wait(20);
    process.stderr.write(`walk: reads ${file} after its fixture is removed\n`);
  }
  return readFileSync.call(this, file, ...rest);
};
syncBuiltinESMExports();
process.on('exit', () => {
  const state = fixture && fs.existsSync(fixture) ? 'still exists' : 'is gone';
  process.stderr.write(`walk: ends; the fixture ${state}\n`);
});
