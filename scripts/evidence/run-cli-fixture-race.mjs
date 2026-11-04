// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Evidence arm, not for landing. For each named test file, runs it and
 * `scripts/check-cli-structure.mjs` together, with the walk held on the
 * first fixture the test makes inside packages/cli. Prints one line per file
 * and exits 1 when any structure check fails.
 */
import {spawn} from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
/** @param {string[]} args @param {NodeJS.ProcessEnv} env */
function run(args, env) {
  const child = spawn(process.execPath, args, {cwd: root, env});
  let out = '';
  child.stdout.on('data', chunk => (out += chunk));
  child.stderr.on('data', chunk => (out += chunk));
  return new Promise(resolve =>
    child.on('exit', code => resolve({code, out: String(out)})),
  );
}
let failed = 0;
for (const file of process.argv.slice(2)) {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-race-'));
  const env = {
    ...process.env,
    ASTRYX_FIXTURE_SIGNAL: path.join(scratch, 'fixture'),
    ASTRYX_FIXTURE_DONE: path.join(scratch, 'done'),
    ASTRYX_CLI_DIR: path.join(root, 'packages/cli'),
  };
  const test = run(
    [path.join(root, 'node_modules/vitest/vitest.mjs'), 'run', '--project', 'node', file],
    env,
  ).then(result => {
    fs.writeFileSync(env.ASTRYX_FIXTURE_DONE, '');
    return result;
  });
  const walk = /** @type {{code: number, out: string}} */ (
    await run(
      ['--import', path.join(root, 'scripts/evidence/hold-walk-on-cli-fixture.mjs'), path.join(root, 'scripts/check-cli-structure.mjs')],
      env,
    )
  );
  const tested = /** @type {{code: number, out: string}} */ (await test);
  const announced = fs.existsSync(env.ASTRYX_FIXTURE_SIGNAL)
    ? fs.readFileSync(env.ASTRYX_FIXTURE_SIGNAL, 'utf8').trim().split('\n').length
    : 0;
  const error = walk.out.split('\n').find(line => /Error/.test(line)) ?? '';
  const tests = tested.out.split('\n').find(line => /^\s+Tests\s/.test(line)) ?? '';
  console.log(`${file} | fixtures inside packages/cli: ${announced} | check:cli-structure exit ${walk.code} ${error.trim().slice(0, 140)} | test exit ${tested.code} ${tests.trim()}`);
  if (walk.code !== 0) failed += 1;
  fs.rmSync(scratch, {recursive: true, force: true});
}
process.exitCode = failed ? 1 : 0;
