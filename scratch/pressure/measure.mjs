// C25 rule-47 measurement harness (scratch, not committed).
// Runs one vitest node-project case pinned to the lane's CPU pair, idle and
// with N busy loops on the same pair, at the same niceness, and prints wall
// time (vitest's per-test and per-file durations) and process-tree CPU
// (user+sys from /usr/bin/time, which counts every waited child: git,
// esbuild, Chromium).
//
// Usage: node measure.mjs <outdir> <loops,loops,...> <case-id>...
import {spawn, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CPUS = [144, 145];
const REPO = process.cwd();
const VITEST = path.join(REPO, 'node_modules/vitest/vitest.mjs');
const NO_TEST = '__c25_no_such_test__';

export const CASES = {
  a11y: {file: '.github/scripts/a11y-pr-contracts.test.mjs', t: 'changedSinceMergeBase'},
  analyze: {file: '.github/scripts/analyze-pr.test.mjs', t: 'recovers the three-dot diff'},
  lintspec: {file: '.github/scripts/ci-lint-scope.test.mjs', t: 'takes the spec fast path'},
  lintfull: {file: '.github/scripts/ci-lint-scope.test.mjs', t: 'runs full lint when a component file changes'},
  fsleg: {file: '.github/scripts/fs-guard-tests.test.mjs', t: 'each leg lists only its own'},
  fsrename: {file: '.github/scripts/fs-guard-tests.test.mjs', t: 'a renamed record runs the readers'},
  size: {file: '.github/scripts/lib/component-size.test.mjs', t: 'bundles every module the import reaches'},
  media: {file: '.github/scripts/lib/offline-media.test.mjs', t: 'routeRemoteImages in a real browser'},
  setupinv: {file: 'internal/vibe-tests/setup-test/setup-integrity.test.mjs', t: 'reports deterministic changed-file inventory'},
  setuprej: {file: 'internal/vibe-tests/setup-test/setup-integrity.test.mjs', t: 'rejects added'},
  setupall: {file: 'internal/vibe-tests/setup-test/setup-integrity.test.mjs', t: ''},
};

function foreignThreadsOnPair() {
  const ps = spawnSync('ps', ['-eLo', 'psr=,pid=,ppid=,user=,comm='], {encoding: 'utf8'}).stdout;
  return ps
    .split('\n')
    .map(line => line.trim().split(/\s+/))
    .filter(([psr, pid, ppid, user]) => CPUS.includes(Number(psr)) && ppid !== '2' && pid !== '2' && pid != null && user !== 'root')
    .map(([psr, pid, , user, comm]) => `${psr}:${pid}:${user}:${comm}`);
}

function startLoops(n) {
  const loops = [];
  for (let i = 0; i < n; i++) {
    const cpu = CPUS[i % CPUS.length];
    loops.push(spawn('nice', ['-n', '10', 'taskset', '-c', String(cpu), 'sh', '-c', 'while :; do :; done'], {stdio: 'ignore'}));
  }
  return loops;
}

async function stopLoops(loops) {
  for (const child of loops) {
    child.kill('SIGKILL');
    await new Promise(resolve => (child.exitCode != null || child.signalCode != null ? resolve() : child.once('exit', resolve)));
  }
}

function runCase(id, t, outdir, label) {
  const {file} = CASES[id];
  const json = path.join(outdir, `${id}-${label}.json`);
  const timeFile = path.join(outdir, `${id}-${label}.time`);
  const args = [
    '-f', '%e %U %S', '-o', timeFile,
    'nice', '-n', '10', 'taskset', '-c', CPUS.join(','),
    process.execPath, VITEST, 'run', '--project', 'node', file,
    ...(t ? ['-t', t] : []),
    ...(process.env.MEASURE_RAISE === '1' ? ['--testTimeout=900000', '--hookTimeout=900000'] : []),
    '--reporter=json', `--outputFile=${json}`,
  ];
  const r = spawnSync('/usr/bin/time', args, {cwd: REPO, encoding: 'utf8', env: {...process.env, CI: 'true'}});
  const [wall, user, sys] = fs.readFileSync(timeFile, 'utf8').trim().split('\n').at(-1).split(' ').map(Number);
  let report = null;
  try { report = JSON.parse(fs.readFileSync(json, 'utf8')); } catch {}
  const fileResult = report?.testResults?.[0];
  const tests = (fileResult?.assertionResults ?? []).filter(a => a.status !== 'skipped' && a.status !== 'pending');
  return {
    exit: r.status,
    wall,
    cpu: Math.round((user + sys) * 100) / 100,
    fileMs: fileResult ? fileResult.endTime - fileResult.startTime : null,
    tests: tests.map(a => ({name: a.title, ms: Math.round(a.duration ?? 0), status: a.status})),
  };
}

const [outdir, loopsArg, ...ids] = process.argv.slice(2);
fs.mkdirSync(outdir, {recursive: true});
const levels = loopsArg.split(',').map(Number);
for (const id of ids) {
  const {t} = CASES[id];
  const base = runCase(id, NO_TEST, outdir, 'base');
  console.log(JSON.stringify({id, level: 'baseline (collection only, idle)', ...base, tests: undefined}));
  for (const n of levels) {
    const foreign = foreignThreadsOnPair();
    const loops = startLoops(n);
    await new Promise(resolve => setTimeout(resolve, 300));
    let result;
    try {
      result = runCase(id, t, outdir, `loops${n}`);
    } finally {
      await stopLoops(loops);
    }
    console.log(JSON.stringify({id, loops: n, foreignBefore: foreign.length, ...result, cpuMinusBase: Math.round((result.cpu - base.cpu) * 100) / 100}));
  }
}
