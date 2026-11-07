#!/usr/bin/env node
// INV29 sweep: every comment sentence in tracked code files (TypeScript parser,
// so text inside strings and template literals is never a comment) plus HTML
// comments in markdown, counted strictly: every token with a letter or digit is
// a word, numbers and units included. `@source` and `@example` fields, tool
// directives, SYNC lists and code fences are exempt. A sentence that starts
// with an imperative verb is an instruction (limit 20); others are
// descriptions (limit 25). Hits are blamed; a hit is the fleet's when any of
// its lines comes from a commit authored by Christopher Chedeau since Oct 1.
//
// Usage:
//   node inv29-sweep.mjs --diff <base> [--head <rev>] [--json]
//       per-PR gate: only sentences on lines the change adds or changes, from
//       the merge-base with <base> to <rev> (default: the working tree);
//       exits 1 when any sentence is over its limit
//   node inv29-sweep.mjs --sweep <outdir> [--repo <dir>]   (or: <repo> <outdir>)
//       whole-tree sweep with fleet blame
//   node inv29-sweep.mjs [--repo <dir>] --self-test
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const VALUE_FLAGS = ['--diff', '--head', '--repo', '--sweep', '--only'];
const flag = name => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1] ?? '';
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && VALUE_FLAGS.includes(argv[i - 1])));
const repo =
  flag('--repo') ??
  (positional.length >= 2
    ? positional[0]
    : execFileSync('git', ['rev-parse', '--show-toplevel'], {encoding: 'utf8'}).trim());
const outdir = flag('--sweep') ?? (positional.length >= 2 ? positional[1] : null);
const require = createRequire(path.join(repo, 'package.json'));
const ts = require('typescript');

const DESCRIPTION_LIMIT = 25;
const INSTRUCTION_LIMIT = 20;
const FLEET_SINCE = Date.parse('2026-10-01T00:00:00Z') / 1000;
const EXEMPT_TAGS = new Set(['source', 'example']);
const DIRECTIVE =
  /^(eslint-|eslint |@ts-|prettier-ignore|@pr-a11y|c8 |istanbul |@vitest-environment|#region|#endregion|@jsx|biome-ignore|@flow|@format|@noflow|global |globals |jshint|webpackChunkName|@vite-ignore|@__PURE__|#__PURE__|@license|@preserve)/;
const LOWER_START = /^["'(\[]?(iOS|iPadOS|iPad|iPhone|macOS|tvOS|watchOS|jsdom|npm|pnpm|npx|eslint|vitest|webpack|esbuild|[a-z]+[A-Z][A-Za-z0-9]*)\b/;
const ABBREV = /^(e\.g\.|i\.e\.|vs\.|etc\.|cf\.|approx\.|no\.)$/i;
const IMPERATIVE = new Set(
  `add allow always apply avoid bail call cancel check clamp clear close compute convert copy create default defer delete do don't drop emit ensure expose fall fetch fill find fire flush force forward give guard handle hide hold ignore include keep leave let limit load look make map mark measure merge move never normalize note open pass pick place prefer prevent put read recompute register remember remove render replace report request reset resolve restore return reuse run save schedule scope select send set show skip sort start stop store strip swap take tell throw toggle track treat trim try turn unwrap update use wait walk warn watch wrap write`.split(
    ' ',
  ),
);

const wordCount = s => s.filter(t => /[A-Za-z0-9]/.test(t.w)).length;

/** Comment ranges of a code file: [{pos, end, kind, text, line, endLine}]. */
export function codeComments(file, text) {
  const ext = path.extname(file);
  const kind =
    ext === '.tsx' ? ts.ScriptKind.TSX
    : ext === '.jsx' ? ts.ScriptKind.JSX
    : ext === '.ts' || ext === '.mts' || ext === '.cts' ? ts.ScriptKind.TS
    : ts.ScriptKind.JS;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  const seen = new Map();
  const add = (ranges, owner) => {
    for (const r of ranges ?? []) {
      if (!seen.has(r.pos)) seen.set(r.pos, {...r, owner});
    }
  };
  const visit = node => {
    for (const child of node.getChildren(sf)) {
      const isToken = child.kind < ts.SyntaxKind.FirstNode || child.kind === ts.SyntaxKind.EndOfFileToken;
      if (child.kind === ts.SyntaxKind.JsxText || child.kind === ts.SyntaxKind.JsxTextAllWhiteSpaces) continue;
      if (isToken) {
        add(ts.getLeadingCommentRanges(text, child.getFullStart()), child);
        add(ts.getTrailingCommentRanges(text, child.getEnd()), null);
      } else {
        visit(child);
      }
    }
  };
  visit(sf);
  const lineOf = pos => sf.getLineAndCharacterOfPosition(pos).line + 1;
  const isFn = n => n != null && (ts.isArrowFunction(n) || ts.isFunctionExpression(n));
  const declaresFunction = token => {
    let decl = token;
    while (decl.parent && decl.parent.kind !== ts.SyntaxKind.SourceFile && decl.parent.getStart(sf) === token.getStart(sf)) decl = decl.parent;
    if (ts.isFunctionDeclaration(decl) || ts.isMethodDeclaration(decl) || ts.isMethodSignature(decl) || ts.isConstructorDeclaration(decl) || ts.isGetAccessorDeclaration(decl) || ts.isSetAccessorDeclaration(decl)) return true;
    if (ts.isVariableStatement(decl)) return decl.declarationList.declarations.some(d => isFn(d.initializer));
    if (ts.isPropertyAssignment(decl) || ts.isPropertyDeclaration(decl)) return isFn(decl.initializer);
    return false;
  };
  return [...seen.values()]
    .sort((a, b) => a.pos - b.pos)
    .map(r => ({
      pos: r.pos,
      end: r.end,
      single: r.kind === ts.SyntaxKind.SingleLineCommentTrivia,
      funcDoc: r.kind === ts.SyntaxKind.MultiLineCommentTrivia && text.startsWith('/**', r.pos) && r.owner != null && declaresFunction(r.owner),
      text: text.slice(r.pos, r.end),
      line: lineOf(r.pos),
      endLine: lineOf(r.end),
    }));
}

/** Blocks of comment lines [{lines: [{n, text}]}]: consecutive `//` lines merge. */
export function blocksOf(comments, source) {
  const blocks = [];
  let prev = null;
  for (const c of comments) {
    if (c.single) {
      const text = c.text.replace(/^\/\/\/?\s?/, '');
      const between = prev ? source.slice(prev.end, c.pos) : '';
      if (prev && prev.single && c.line === prev.line + 1 && /^\s*$/.test(between)) {
        blocks.at(-1).lines.push({n: c.line, text});
      } else {
        blocks.push({lines: [{n: c.line, text}]});
      }
    } else {
      const raw = c.text.replace(/^\/\*\*?/, '').replace(/\*\/$/, '');
      const lines = raw.split('\n').map((l, i) => ({
        n: c.line + i,
        text: i === 0 ? l : l.replace(/^\s*\*(?!\/)\s?/, ''),
      }));
      blocks.push({lines, funcDoc: c.funcDoc});
    }
    prev = c;
  }
  return blocks;
}

/**
 * Comments inside template literals of test and spec files: a page script the
 * repository runs in a browser. Example code in docs and stories stays out.
 */
export function templateBlocks(file, text) {
  if (!/(\.test\.|\.spec\.|__tests__)/.test(file)) return [];
  const ext = path.extname(file);
  const kind = ext === '.tsx' ? ts.ScriptKind.TSX : ext === '.jsx' ? ts.ScriptKind.JSX : ext === '.ts' || ext === '.mts' || ext === '.cts' ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  const ranges = [];
  const visit = n => {
    if (n.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral || n.kind === ts.SyntaxKind.TemplateExpression) ranges.push([n.getStart(sf), n.getEnd()]);
    else ts.forEachChild(n, visit);
  };
  visit(sf);
  const blocks = [];
  for (const [a, b] of ranges) {
    const startLine = sf.getLineAndCharacterOfPosition(a).line + 1;
    let cur = null;
    let inBlock = false;
    text.slice(a, b).split('\n').forEach((l, i) => {
      const n = startLine + i;
      const t = l.trim();
      if (inBlock) {
        const end = t.indexOf('*/');
        cur.lines.push({n, text: (end === -1 ? t : t.slice(0, end)).replace(/^\*\s?/, '')});
        if (end !== -1) { blocks.push(cur); cur = null; inBlock = false; }
        return;
      }
      if (t.startsWith('//')) {
        if (!cur || cur.last !== n - 1 || cur.kind !== 'line') { if (cur) blocks.push(cur); cur = {kind: 'line', lines: []}; }
        cur.lines.push({n, text: t.replace(/^\/\/\s?/, '')});
        cur.last = n;
        return;
      }
      if (t.startsWith('/*')) {
        if (cur) { blocks.push(cur); cur = null; }
        const body = t.replace(/^\/\*\*?\s?/, '');
        const end = body.indexOf('*/');
        cur = {kind: 'block', lines: [{n, text: end === -1 ? body : body.slice(0, end)}]};
        if (end === -1) inBlock = true; else { blocks.push(cur); cur = null; }
        return;
      }
      if (cur) { blocks.push(cur); cur = null; }
    });
    if (cur) blocks.push(cur);
  }
  return blocks.map(b => ({lines: b.lines}));
}

/** HTML comments of a markdown file as blocks. */
export function markdownBlocks(source) {
  const blocks = [];
  const re = /<!--([\s\S]*?)-->/g;
  let m;
  while ((m = re.exec(source))) {
    const startLine = source.slice(0, m.index).split('\n').length;
    blocks.push({lines: m[1].split('\n').map((t, i) => ({n: startLine + i, text: t}))});
  }
  return blocks;
}

/** Sentences of a block: [{tokens: [{w, n}], tag}]. */
export function sentences(block) {
  const segments = [];
  let seg = [];
  let tag = null;
  let skip = false;
  let fence = false;
  let syncList = false;
  const flush = () => {
    if (seg.length) segments.push({tokens: seg, tag});
    seg = [];
  };
  for (const {n, text} of block.lines) {
    let t = text.trim();
    if (t.startsWith('```')) {
      fence = !fence;
      flush();
      continue;
    }
    if (fence) continue;
    if (t === '') {
      flush();
      syncList = false;
      continue;
    }
    if (DIRECTIVE.test(t) || /^Copyright\b/.test(t) || /^SPDX-/.test(t)) {
      flush();
      continue;
    }
    if (/^SYNC:/.test(t)) {
      flush();
      syncList = true;
      continue;
    }
    if (syncList) continue;
    if (/^([-*•]|\d+[.)])\s+/.test(t)) {
      flush();
      t = t.replace(/^([-*•]|\d+[.)])\s+/, '');
    }
    const tagMatch = t.match(/^@(\w+)\b\s*/);
    if (tagMatch) {
      flush();
      tag = tagMatch[1];
      skip = EXEMPT_TAGS.has(tag);
      t = t.slice(tagMatch[0].length).replace(/^\{[^}]*\}\s*/, '');
      if (['param', 'property', 'prop', 'arg', 'argument', 'typedef', 'template'].includes(tag)) {
        t = t.replace(/^\[?[\w$.\[\]'"=-]+\]?\s*(-\s+)?/, '');
      }
    }
    if (skip) continue;
    for (const w of t.split(/\s+/).filter(Boolean)) seg.push({w, n});
  }
  flush();
  const out = [];
  for (const s of segments) {
    let cur = [];
    for (let i = 0; i < s.tokens.length; i++) {
      cur.push(s.tokens[i]);
      const w = s.tokens[i].w;
      const next = s.tokens[i + 1]?.w;
      const bare = w.replace(/^["'`(\[*_]+/, '');
      const ends =
        /[.!?]["'`)\]*_]*$/.test(w) &&
        !ABBREV.test(bare) &&
        (next == null || /^["'`(\[*_]?[A-Z0-9`]/.test(next) || LOWER_START.test(next));
      if (ends) {
        out.push({tokens: cur, tag: s.tag});
        cur = [];
      }
    }
    if (cur.length) out.push({tokens: cur, tag: s.tag});
  }
  return out;
}

export function classify(tokens) {
  const words = tokens.map(t => t.w.replace(/^["'`(*_]+/, '').toLowerCase());
  const first = words[0] ?? '';
  const isInstruction =
    IMPERATIVE.has(first) || (first === 'do' && words[1] === 'not');
  return isInstruction ? 'instruction' : 'description';
}

function scanText(file, source) {
  const blocks = /\.md$/.test(file)
    ? markdownBlocks(source)
    : blocksOf(codeComments(file, source), source).concat(templateBlocks(file, source));
  const hits = [];
  let count = 0;
  for (const b of blocks) {
    for (const [i, s] of sentences(b).entries()) {
      count++;
      const words = wordCount(s.tokens);
      const kind = b.funcDoc && i === 0 ? 'description' : classify(s.tokens);
      const limit = kind === 'instruction' ? INSTRUCTION_LIMIT : DESCRIPTION_LIMIT;
      if (words > limit) {
        hits.push({
          file,
          from: s.tokens[0].n,
          to: s.tokens.at(-1).n,
          lines: [...new Set(s.tokens.map(t => t.n))],
          words,
          kind,
          limit,
          text: s.tokens.map(t => t.w).join(' '),
        });
      }
    }
  }
  return {hits, count};
}

function selfTest() {
  const sample = [
    '// Copyright (c) Meta Platforms, Inc. and affiliates.',
    '/**',
    ' * @file X.ts',
    ' * @input One input',
    ' * @output Tests that a toast plays its entrance once even when a Dialog or a modal Drawer',
    ' *   opens or closes over it many times in a row while the user keeps tapping fast',
    ' * @source measured: UIKit lab, iOS 26.2 simulator, iPhone 17 Pro, a long list of facts that would be far over the limit if it counted at all, Oct 24 2026',
    ' */',
    '// Use the shared helper here so that every caller in this module reads the same value from',
    '// the same place and nothing drifts between them over time.',
    'const doc = `',
    '// This line sits in a template literal and is example code with many many words in it that must never be counted as a comment at all.',
    '`;',
    "const url = 'https://example.com/a/b'; // trailing words here.",
    '// The first sentence here has exactly ten words in it now. jsdom has no touch input, so a jsdom test reads nothing of it.',
    '// Utility (e.g. DateInput) that says many things about focus being detached from the page in a long list of cases that go on and on today.',
    '/**',
    ' * Call the listener with the new answer whenever the query changes, and stop listening once the caller drops its own handle here.',
    ' */',
    'function watchQuery() {}',
    '// Call the listener with the new answer whenever the query changes, and stop listening once the caller drops its own handle here.',
    '/**',
    ' * SYNC: When modified, update these files:',
    ' * - a.ts (the fade / clock, the press, the overlay, the tracker and many more words that wrap',
    ' *   onto a continuation line that is not a bullet and has many words in it too)',
    ' */',
    'const el = <div>{/* A JSX comment with a short sentence. */}// not a comment in JSX text with lots and lots of words that would otherwise count past the limit</div>;',
  ].join('\n');
  const {hits, count} = scanText('x.tsx', sample);
  const got = hits.map(h => `${h.kind}:${h.words}`).sort();
  const ok =
    JSON.stringify(got) === JSON.stringify(['description:26', 'description:32', 'instruction:22', 'instruction:27']) &&
    hits.every(h => !/template literal|JSX text|measured/.test(h.text));
  const md = scanText('x.md', 'Text\n<!-- Use this template for a change that touches tests, tooling, CI, or repository maintenance only, with no product change at all. -->\n');
  const okMd = md.hits.length === 1 && md.hits[0].kind === 'instruction';
  console.log(JSON.stringify({ok: ok && okMd, got, count, md: md.hits.map(h => `${h.kind}:${h.words}`)}));
  process.exit(ok && okMd ? 0 : 1);
}

if (argv.includes('--self-test')) selfTest();

const git = (...a) => execFileSync('git', a, {cwd: repo, encoding: 'utf8', maxBuffer: 1 << 30});

const diffBase = flag('--diff');
if (diffBase != null) {
  const head = flag('--head');
  const asJson = argv.includes('--json');
  const mergeBase = git('merge-base', diffBase, head ?? 'HEAD').trim();
  const range = head ? [mergeBase, head] : [mergeBase];
  const changed = git('diff', '--name-only', '--diff-filter=AMR', ...range)
    .split('\n')
    .filter(f => /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts)$/.test(f) || (/\.md$/.test(f) && /^(packages|docs)\//.test(f)))
    .filter(f => !/(__golden__|\/node_modules\/|\.min\.)/.test(f));
  const results = [];
  for (const f of changed) {
    const added = new Set();
    for (const m of git('diff', '-U0', ...range, '--', f).matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
      const start = Number(m[1]);
      const len = m[2] == null ? 1 : Number(m[2]);
      for (let k = 0; k < len; k++) added.add(start + k);
    }
    if (added.size === 0) continue;
    const source = head ? git('show', `${head}:${f}`) : fs.readFileSync(path.join(repo, f), 'utf8');
    for (const h of scanText(f, source).hits) {
      if (h.lines.some(n => added.has(n))) results.push(h);
    }
  }
  if (asJson) {
    console.log(JSON.stringify({base: diffBase, mergeBase, head: head ?? 'working tree', files: changed.length, hits: results}));
  } else {
    console.log(
      `INV29 sentence check against ${diffBase} (merge-base ${mergeBase.slice(0, 10)}), head ${head ?? 'working tree'}: ${changed.length} changed file(s), ${results.length} sentence(s) over the limit on added or changed lines.`,
    );
    for (const h of results) {
      const where = `${h.file}:${h.from}${h.to !== h.from ? `-${h.to}` : ''}`;
      console.log(`  ${where}  ${h.words} words, ${h.kind} (limit ${h.limit})  ${h.text.slice(0, 200)}${h.text.length > 200 ? '…' : ''}`);
    }
  }
  process.exit(results.length ? 1 : 0);
}
if (outdir == null) {
  console.error('Usage: --diff <base> [--head <rev>] [--json] | --sweep <outdir> [--repo <dir>] | --self-test');
  process.exit(2);
}
const files = git('ls-files', '--', 'packages', 'docs')
  .split('\n')
  .filter(f => /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts|md)$/.test(f))
  .filter(f => !/(__golden__|\/node_modules\/|\.min\.)/.test(f))
  .filter(f => flag('--only') == null || flag('--only').split(',').includes(f));
let sentencesTotal = 0;
const allHits = [];
const parseErrors = [];
for (const f of files) {
  try {
    const {hits, count} = scanText(f, fs.readFileSync(path.join(repo, f), 'utf8'));
    sentencesTotal += count;
    allHits.push(...hits);
  } catch (e) {
    parseErrors.push(`${f}: ${e.message}`);
  }
}
// Blame each hit's lines, only in files a fleet commit touched since Oct 1,
// and only back to Oct 1: an older line is a boundary line, never the fleet's.
fs.mkdirSync(outdir, {recursive: true});
fs.writeFileSync(path.join(outdir, 'scan-hits.json'), JSON.stringify(allHits));
const fleetTouched = new Set(
  git('log', '--no-merges', '--author=Christopher Chedeau', '--since=2026-10-01T00:00:00Z', '--name-only', '--format=', 'HEAD', '--', 'packages', 'docs')
    .split('\n')
    .filter(Boolean),
);
const byFile = new Map();
for (const h of allHits) {
  h.commits = [];
  if (!fleetTouched.has(h.file)) continue;
  if (!byFile.has(h.file)) byFile.set(h.file, []);
  byFile.get(h.file).push(h);
}
const commitInfo = new Map();
const {execFile} = await import('node:child_process');
const blameOne = (file, hits) =>
  new Promise((resolve, reject) => {
    const ranges = hits.flatMap(h => ['-L', `${h.from},${h.to}`]);
    execFile('git', ['blame', '--line-porcelain', '--since=2026-10-01T00:00:00Z', ...ranges, '--', file], {cwd: repo, encoding: 'utf8', maxBuffer: 1 << 28}, (err, out) => {
      if (err) return reject(err);
      const lineCommit = new Map();
      let cur = null;
      for (const line of out.split('\n')) {
        const head = line.match(/^([0-9a-f]{40}) \d+ (\d+)/);
        if (head) {
          cur = {sha: head[1], line: Number(head[2])};
          lineCommit.set(cur.line, cur.sha);
          if (!commitInfo.has(cur.sha)) commitInfo.set(cur.sha, {});
          continue;
        }
        if (!cur) continue;
        const info = commitInfo.get(cur.sha);
        if (line.startsWith('author ')) info.author = line.slice(7);
        else if (line.startsWith('author-mail ')) info.mail = line.slice(12);
        else if (line.startsWith('author-time ')) info.time = Number(line.slice(12));
        else if (line.startsWith('summary ')) info.summary = line.slice(8);
        else if (line === 'boundary') info.boundary = true;
      }
      for (const h of hits) h.commits = [...new Set(h.lines.map(n => lineCommit.get(n)).filter(Boolean))];
      resolve();
    });
  });
const queue = [...byFile];
const workers = Array.from({length: 8}, async () => {
  while (queue.length) {
    const [file, hits] = queue.shift();
    await blameOne(file, hits);
  }
});
await Promise.all(workers);
const isFleet = sha => {
  const i = commitInfo.get(sha) ?? {};
  return !i.boundary && (i.author === 'Christopher Chedeau' || /vjeux/i.test(i.mail ?? '')) && (i.time ?? 0) >= FLEET_SINCE;
};
const prOf = sha => (commitInfo.get(sha)?.summary ?? '').match(/\(#(\d+)\)\s*$/)?.[1] ?? null;
for (const h of allHits) {
  h.fleetCommits = h.commits.filter(isFleet);
  h.prs = [...new Set(h.fleetCommits.map(s => prOf(s) ?? `commit:${s.slice(0, 10)}`))];
}
const fleet = allHits.filter(h => h.fleetCommits.length > 0);
fs.writeFileSync(path.join(outdir, 'all-hits.json'), JSON.stringify(allHits, null, 1));
fs.writeFileSync(path.join(outdir, 'fleet-hits.json'), JSON.stringify(fleet, null, 1));
const pkgOf = f => f.split('/').slice(0, 2).join('/');
const byPkg = {};
for (const h of fleet) byPkg[pkgOf(h.file)] = (byPkg[pkgOf(h.file)] ?? 0) + 1;
const rows = fleet
  .sort((a, b) => a.file.localeCompare(b.file) || a.from - b.from)
  .map(h => `| ${h.file}:${h.from}${h.to !== h.from ? `-${h.to}` : ''} | ${h.words} | ${h.kind === 'instruction' ? 'instr' : 'desc'} | ${h.prs.map(p => (p.startsWith('commit:') ? p : `#${p}`)).join(' ')} | ${h.text.slice(0, 140).replace(/\|/g, '\\|')}${h.text.length > 140 ? '…' : ''} |`);
fs.writeFileSync(
  path.join(outdir, 'fleet-hits.md'),
  `| Where | Words | Kind | PR | Sentence |\n|---|---|---|---|---|\n${rows.join('\n')}\n`,
);
console.log(
  JSON.stringify({
    files: files.length,
    sentences: sentencesTotal,
    hitsAllAuthors: allHits.length,
    fleetHits: fleet.length,
    fleetFiles: new Set(fleet.map(h => h.file)).size,
    fleetPRs: new Set(fleet.flatMap(h => h.prs)).size,
    byKind: {instruction: fleet.filter(h => h.kind === 'instruction').length, description: fleet.filter(h => h.kind === 'description').length},
    byPackage: byPkg,
    parseErrors: parseErrors.length,
  }),
);
for (const e of parseErrors.slice(0, 5)) console.log('PARSE ERROR', e);
