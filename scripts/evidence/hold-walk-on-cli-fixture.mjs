// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Evidence arm, not for landing. Preloaded into the CLI structure
 * check, it replays the rule-47 race in a fixed order: the walk waits until a
 * test has made a fixture inside packages/cli and written a file in it. It
 * then lists or reads anything of that fixture only after the test has
 * removed it.
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
const {readdirSync, readFileSync, statSync} = fs;
/** @type {string | null} */
let fixture = null;
/** @param {string} dir */
const holdsFile = dir => {
  try {
    return readdirSync(dir, {recursive: true}).length > 0;
  } catch {
    return false;
  }
};
/** @param {unknown} target */
const inFixture = target => {
  const resolved = path.resolve(String(target));
  return Boolean(
    fixture && (resolved === fixture || resolved.startsWith(fixture + path.sep)),
  );
};
/** @param {string} what @param {unknown} target */
const holdUntilRemoved = (what, target) => {
  while (fixture && fs.existsSync(fixture) && !finished()) wait(20);
  process.stderr.write(`walk: ${what} ${target} after its fixture is removed\n`);
};
/** Starts the walk once the first announced fixture holds a file. */
const start = () => {
  if (fixture !== null) return;
  while (!fs.existsSync(signal) && !finished()) wait(20);
  fixture = fs.existsSync(signal)
    ? readFileSync(signal, 'utf8').split('\n')[0]
    : '';
  while (fixture && !holdsFile(fixture) && fs.existsSync(fixture)) wait(20);
  process.stderr.write(`walk: starts with fixture ${fixture || '(none)'}\n`);
};

// @ts-expect-error the wrapper forwards every overload unchanged
fs.readdirSync = function (dir, ...rest) {
  if (path.resolve(String(dir)).startsWith(cli)) start();
  if (inFixture(dir)) holdUntilRemoved('lists', dir);
  return readdirSync.call(this, dir, ...rest);
};
// @ts-expect-error the wrapper forwards every overload unchanged
fs.statSync = function (file, ...rest) {
  if (inFixture(file)) holdUntilRemoved('stats', file);
  return statSync.call(this, file, ...rest);
};
// @ts-expect-error the wrapper forwards every overload unchanged
fs.readFileSync = function (file, ...rest) {
  if (inFixture(file)) holdUntilRemoved('reads', file);
  return readFileSync.call(this, file, ...rest);
};
syncBuiltinESMExports();
process.on('exit', () => {
  const state = fixture && fs.existsSync(fixture) ? 'still exists' : 'is gone';
  process.stderr.write(`walk: ends; the fixture ${state}\n`);
});
