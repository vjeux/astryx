// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Evidence arm, not for landing. Runs build.family.test.mjs and
 * `scripts/check-cli-structure.mjs` together, with the walk held on
 * build.family's fixture (hold-walk-on-fixture.mjs). Exits 1 when the
 * structure check fails.
 */
import {spawn} from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-race-'));
const env = {
  ...process.env,
  ASTRYX_FIXTURE_SIGNAL: path.join(scratch, 'fixture'),
  ASTRYX_FIXTURE_DONE: path.join(scratch, 'done'),
  ASTRYX_CLI_DIR: path.join(root, 'packages/cli'),
};
/** @param {string[]} args @returns {Promise<{code: number | null, out: string}>} */
function run(args) {
  const child = spawn(process.execPath, args, {cwd: root, env});
  let out = '';
  child.stdout.on('data', chunk => (out += chunk));
  child.stderr.on('data', chunk => (out += chunk));
  return new Promise(resolve => child.on('exit', code => resolve({code, out})));
}
const family = run([
  path.join(root, 'node_modules/vitest/vitest.mjs'),
  'run',
  '--project',
  'node',
  'packages/cli/api/theme/build/build.family.test.mjs',
]).then(result => {
  fs.writeFileSync(env.ASTRYX_FIXTURE_DONE, '');
  return result;
});
const walk = await run([
  '--import',
  path.join(root, 'scripts/evidence/hold-walk-on-fixture.mjs'),
  path.join(root, 'scripts/check-cli-structure.mjs'),
]);
const familyResult = await family;
const lines = walk.out.split('\n');
const shown = lines.filter(line =>
  /^walk:|Error|command\(s\) checked/.test(line),
);
console.log(shown.slice(0, 6).join('\n'));
console.log(
  `check:cli-structure exit ${walk.code}; build.family exit ${familyResult.code}`,
);
fs.rmSync(scratch, {recursive: true, force: true});
process.exitCode = walk.code === 0 ? 0 : 1;
