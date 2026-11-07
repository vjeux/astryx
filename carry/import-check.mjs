#!/usr/bin/env node
// Lists relative imports that resolve to no file in a git tree.
// Usage: node import-check.mjs <tree-ish>   (run inside the repo)
import {execFileSync, spawn} from 'node:child_process';
import path from 'node:path';

const treeish = process.argv[2];
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', treeish], {
  encoding: 'utf8',
  maxBuffer: 1 << 28,
})
  .split('\n')
  .filter(Boolean);
const all = new Set(files);
const sources = files.filter(
  f =>
    /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$/.test(f) &&
    /^(packages|apps|scripts|internal)\//.test(f) &&
    !/(^|\/)(node_modules|dist|build)\//.test(f),
);

const EXTS = ['', '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs', '.json', '.d.ts', '.css'];
function resolves(from, spec) {
  const base = path.posix.normalize(path.posix.join(path.posix.dirname(from), spec));
  const cands = [];
  for (const e of EXTS) cands.push(base + e);
  for (const e of EXTS.slice(1)) cands.push(base + '/index' + e);
  if (/\.js$/.test(base)) cands.push(base.replace(/\.js$/, '.ts'), base.replace(/\.js$/, '.tsx'));
  if (/\.mjs$/.test(base)) cands.push(base.replace(/\.mjs$/, '.mts'));
  if (/\.cjs$/.test(base)) cands.push(base.replace(/\.cjs$/, '.cts'));
  return cands.some(c => all.has(c)) || [...all].some(f => f.startsWith(base + '/'));
}

const RX = [
  /(?:import|export)\s[^'"`;]*?\sfrom\s*['"](\.{1,2}\/[^'"]+)['"]/g,
  /import\s*\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g,
  /^\s*import\s+['"](\.{1,2}\/[^'"]+)['"]/gm,
  /require\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g,
  /vi\.mock\(\s*['"](\.{1,2}\/[^'"]+)['"]/g,
];

const proc = spawn('git', ['cat-file', '--batch'], {stdio: ['pipe', 'pipe', 'inherit']});
let buf = Buffer.alloc(0);
const out = [];
let idx = 0;
proc.stdout.on('data', d => {
  buf = Buffer.concat([buf, d]);
  for (;;) {
    const nl = buf.indexOf(10);
    if (nl < 0) return;
    const header = buf.subarray(0, nl).toString();
    const m = header.match(/^[0-9a-f]+ (\w+) (\d+)$/);
    if (!m) { buf = buf.subarray(nl + 1); idx++; continue; }
    const size = Number(m[2]);
    if (buf.length < nl + 1 + size + 1) return;
    const body = buf.subarray(nl + 1, nl + 1 + size).toString('utf8');
    buf = buf.subarray(nl + 1 + size + 1);
    const file = sources[idx++];
    const seen = new Set();
    for (const rx of RX) {
      rx.lastIndex = 0;
      let mm;
      while ((mm = rx.exec(body))) {
        const spec = mm[1].split('?')[0];
        if (seen.has(spec)) continue;
        seen.add(spec);
        if (!resolves(file, spec)) out.push(`${file} -> ${spec}`);
      }
    }
  }
});
proc.on('close', () => {
  for (const l of out.sort()) console.log(l);
});
for (const f of sources) proc.stdin.write(`${treeish}:${f}\n`);
proc.stdin.end();
