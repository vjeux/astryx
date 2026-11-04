// C25 rule-47 same-moment pair runner (scratch, not committed).
// Starts N busy loops on the lane's two CPUs, then launches every arm's
// vitest run at the same instant on the same CPUs, all at nice 10, and
// prints each arm's per-test status and time from its JSON report.
//
// Usage: node pair.mjs <outdir> <loops> <testNamePattern|-> <label>=<file> ...
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CPUS = [144, 145];
const [outdir, loopsArg, pattern, ...armArgs] = process.argv.slice(2);
const loops = Number(loopsArg);
const arms = armArgs.map(arg => {
  const at = arg.indexOf('=');
  return {label: arg.slice(0, at), file: arg.slice(at + 1)};
});
fs.mkdirSync(outdir, {recursive: true});
const REPO = process.cwd();
const VITEST = path.join(REPO, 'node_modules/vitest/vitest.mjs');

const busy = [];
for (let i = 0; i < loops; i++) {
  busy.push(spawn('nice', ['-n', '10', 'taskset', '-c', String(CPUS[i % 2]), 'sh', '-c', 'while :; do :; done'], {stdio: 'ignore'}));
}
await new Promise(resolve => setTimeout(resolve, 3000));

const started = Date.now();
const results = await Promise.all(
  arms.map(
    arm =>
      new Promise(resolve => {
        const json = path.join(outdir, `${arm.label}.json`);
        const args = ['-n', '10', 'taskset', '-c', CPUS.join(','), process.execPath, VITEST, 'run', '--project', 'node', arm.file, '--reporter=json', `--outputFile=${json}`];
        if (pattern !== '-') args.push('-t', pattern);
        const child = spawn('nice', args, {cwd: REPO, stdio: 'ignore', env: {...process.env, CI: 'true'}});
        child.on('exit', code => resolve({...arm, code, json, wall: (Date.now() - started) / 1000}));
      }),
  ),
);

for (const child of busy) child.kill('SIGKILL');

for (const r of results) {
  let report = null;
  try {
    report = JSON.parse(fs.readFileSync(r.json, 'utf8'));
  } catch {}
  const tests = (report?.testResults?.[0]?.assertionResults ?? []).filter(a => a.status !== 'skipped' && a.status !== 'pending');
  const failed = tests.filter(t => t.status === 'failed');
  const ms = tests.map(t => Math.round(t.duration ?? 0));
  console.log(
    JSON.stringify({
      arm: r.label,
      exit: r.code,
      wall: Math.round(r.wall),
      tests: tests.length,
      failed: failed.length,
      firstMs: ms[0] ?? null,
      maxMs: ms.length ? Math.max(...ms) : null,
      over25s: ms.filter(m => m > 25000).length,
      failedNames: failed.map(t => `${t.title.slice(0, 50)} ${Math.round(t.duration)}ms`),
      all: tests.map(t => `${t.status === 'passed' ? 'ok' : 'FAIL'} ${(t.duration / 1000).toFixed(1)}s`),
    }),
  );
}
