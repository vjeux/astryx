// Differential check (scratch, not committed): v3's and v3b's
// analyzeSetupIntegrity must return the same result for random trees.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {analyzeSetupIntegrity as analyzeV3} from './setup-integrity-v3.mjs';
import {analyzeSetupIntegrity as analyzeV3b, __sections, __blobs} from './setup-integrity.mjs';
let sectionChecks = 0, blobChecks = 0, sectionFallbacks = 0;

const ITERATIONS = Number(process.argv[2] ?? 200);
let seed = Number(process.argv[3] ?? 12345);
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const pick = list => list[Math.floor(rand() * list.length)];
const git = (cwd, args) => execFileSync('git', ['-C', cwd, ...args], {stdio: ['ignore', 'pipe', 'pipe']});

const NAMES = [
  'src/App.tsx', 'src/index.css', 'src/a b.css', 'src/ünïcode.css', 'src/q"uote.css',
  'src/back\\slash.css', 'src/new\nline.css', 'src/tab\t.css', 'styles/theme.css',
  '.gitignore', 'bin/blob.bin', 'src/trailing .css', 'src/b a/x y.tsx', 'src/colon:name.css',
  'src/AstryxRegion.tsx', 'src/main.tsx', 'public/index.html',
];
const LINES = [
  '--x: 1;', '++y', '---z', '+++w', '.a { color: red !important; }', '  dark mode here',
  'color-scheme: dark;', "import {Button} from '@astryxdesign/core/Button';",
  'data-theme="dark"', '', '\\ No newline at end of file', 'diff --git a/x b/x', ' leading space',
  'line with cr\r', '@media (prefers-color-scheme: dark) { body { color: white; } }',
  'all: unset;', '/* !important in a comment */', '<div style="color: red !important">',
  'export default function App() {', '  return <Button label="Go" />;', '}', 'ok', 'ok', 'ok',
];
const lines = n => Array.from({length: n}, () => pick(LINES));
const text = n => {
  const body = lines(n).join('\n');
  return rand() < 0.2 ? body : body + '\n';
};
const binary = () => Buffer.from(Array.from({length: 40 + Math.floor(rand() * 200)}, () => Math.floor(rand() * 256)).concat([0]));

function mutate(content) {
  const list = content.split('\n');
  const edits = 1 + Math.floor(rand() * 4);
  for (let i = 0; i < edits; i++) {
    const at = Math.floor(rand() * (list.length + 1));
    const op = rand();
    if (op < 0.4) list.splice(at, 0, ...lines(1 + Math.floor(rand() * 3)));
    else if (op < 0.7) list.splice(at, 1 + Math.floor(rand() * 2));
    else list.splice(at, 1, pick(LINES));
  }
  return list.join('\n');
}

let same = 0;
let threw = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'c25-fuzz-'));
  try {
    git(dir, ['init', '-q']);
    git(dir, ['config', 'user.email', 'f@example.com']);
    git(dir, ['config', 'user.name', 'f']);
    git(dir, ['config', 'commit.gpgsign', 'false']);
    const files = new Map();
    const count = 2 + Math.floor(rand() * 6);
    for (let k = 0; k < count; k++) {
      const name = pick(NAMES);
      const content = name.endsWith('.bin') ? binary() : text(1 + Math.floor(rand() * 12));
      fs.mkdirSync(path.join(dir, path.dirname(name)), {recursive: true});
      fs.writeFileSync(path.join(dir, name), content);
      files.set(name, content);
    }
    if (rand() < 0.3) {
      fs.mkdirSync(path.join(dir, 'src'), {recursive: true});
      try { fs.symlinkSync('index.css', path.join(dir, 'src/link.css')); } catch {}
    }
    git(dir, ['add', '-A']);
    git(dir, ['commit', '-qm', 'baseline']);
    for (const [name, content] of files) {
      const r = rand();
      const full = path.join(dir, name);
      if (r < 0.15) fs.rmSync(full, {force: true});
      else if (r < 0.25) fs.chmodSync(full, 0o755);
      else if (r < 0.75) fs.writeFileSync(full, Buffer.isBuffer(content) ? binary() : mutate(content));
    }
    if (rand() < 0.3) {
      try { fs.rmSync(path.join(dir, 'src/link.css'), {force: true}); fs.symlinkSync('App.tsx', path.join(dir, 'src/link.css')); } catch {}
    }
    const extra = Math.floor(rand() * 3);
    for (let k = 0; k < extra; k++) {
      const name = 'new/' + pick(NAMES).split('/').pop();
      fs.mkdirSync(path.join(dir, 'new'), {recursive: true});
      fs.writeFileSync(path.join(dir, name), rand() < 0.15 ? binary() : text(1 + Math.floor(rand() * 6)));
      if (rand() < 0.5) git(dir, ['add', '--', name]);
    }
    {
      const paths = execFileSync('git', ['-C', dir, 'diff', '--name-only', '-z', '--no-renames', 'HEAD', '--']).toString('utf8').split('\0').filter(Boolean);
      const sections = __sections(dir);
      const blobs = __blobs(dir, paths);
      for (const p of paths) {
        const alone = execFileSync('git', ['-C', dir, '-c', 'core.quotePath=false', 'diff', '--unified=0', '--no-color', '--no-ext-diff', '--no-textconv', '--no-renames', 'HEAD', '--', p]).toString('utf8');
        if (sections.has(p)) { if (sections.get(p) !== alone) { console.log('SECTION MISMATCH', JSON.stringify(p)); process.exitCode = 1; } sectionChecks++; } else sectionFallbacks++;
        let shown = null; try { shown = execFileSync('git', ['-C', dir, 'show', 'HEAD:' + p], {stdio: ['ignore', 'pipe', 'ignore']}); } catch { shown = null; }
        if (blobs.has(p)) { const b = blobs.get(p); if ((b === null) !== (shown === null) || (b !== null && !b.equals(shown))) { console.log('BLOB MISMATCH', JSON.stringify(p)); process.exitCode = 1; } blobChecks++; }
      }
      if (process.exitCode) break;
    }
    let a, b, ea, eb;
    try { a = JSON.stringify(analyzeV3(dir)); } catch (error) { ea = String(error.message); }
    try { b = JSON.stringify(analyzeV3b(dir)); } catch (error) { eb = String(error.message); }
    if (ea !== undefined || eb !== undefined) {
      if (ea !== eb) { console.log('ERROR DIVERGED', i, ea, '|', eb); process.exitCode = 1; break; }
      threw += 1;
    } else if (a !== b) {
      console.log('RESULT DIVERGED at', i, dir);
      console.log(a.slice(0, 3000));
      console.log(b.slice(0, 3000));
      process.exitCode = 1;
      break;
    } else {
      same += 1;
    }
  } finally {
    if (!process.exitCode) fs.rmSync(dir, {recursive: true, force: true});
  }
}
console.log(JSON.stringify({iterations: ITERATIONS, same, threw, sectionChecks, sectionFallbacks, blobChecks}));
