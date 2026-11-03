// INV29 sentence lengths: lists comment sentences longer than a word limit
// (default 25, a description's), counted to the period as the pre-review
// rule counts them, in the given files. Usage:
//   node ste-long.mjs [--max 25] [--summary] <file>...
import fs from 'node:fs';

const args = process.argv.slice(2);
let max = 25;
let summary = false;
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--max') max = Number(args[++i]);
  else if (args[i] === '--summary') summary = true;
  else files.push(args[i]);
}

/** Comment blocks of a file: [{line, text}], each block's lines joined. */
function commentBlocks(source) {
  const blocks = [];
  const lines = source.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    const block = /^\/\*\*?/.test(trimmed) || (/\/\*/.test(line) && !/['"`].*\/\*.*['"`]/.test(line) && trimmed.startsWith('/*'));
    if (block) {
      const start = i;
      const parts = [];
      for (;;) {
        parts.push(lines[i]);
        if (lines[i].includes('*/')) break;
        i++;
        if (i >= lines.length) break;
      }
      const text = parts
        .join('\n')
        .replace(/^\s*\/\*\*?/, '')
        .replace(/\*\/\s*$/, '')
        .split('\n')
        .map(l => l.replace(/^\s*\*\s?/, ''))
        .join('\n');
      blocks.push({line: start + 1, text});
      i++;
      continue;
    }
    if (trimmed.startsWith('//')) {
      const start = i;
      const parts = [];
      while (i < lines.length && lines[i].trim().startsWith('//')) {
        parts.push(lines[i].trim().replace(/^\/\/\s?/, ''));
        i++;
      }
      blocks.push({line: start + 1, text: parts.join('\n')});
      continue;
    }
    // A trailing comment after code.
    const trail = /[;,)}\]]\s*\/\/\s?(.*)$/.exec(line);
    if (trail != null && !/https?:\/\//.test(trail[1])) {
      blocks.push({line: i + 1, text: trail[1]});
    }
    i++;
  }
  return blocks;
}

/** Prose paragraphs of a block: tags, code fences and list markers handled. */
function sentences(text) {
  const out = [];
  // Drop fenced code, eslint and ts directives, @tag names.
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .split('\n')
    .reduce((acc, l) => {
      // A @source or @measure tag runs to the next tag or blank line.
      if (/^\s*@(source|measure)\b/.test(l)) acc.skip = true;
      else if (/^\s*@\w/.test(l) || /^\s*$/.test(l)) acc.skip = false;
      if (!acc.skip) acc.lines.push(l);
      return acc;
    }, {skip: false, lines: []})
    .lines.filter(l => !/^\s*(eslint|@ts-|prettier-ignore|SYNC:|-{3,})/.test(l))
    .map(l => l.replace(/^\s*@(file|input|output|position|example|param|returns?|source|measure|see|deprecated|default)\b\s*(\S+)?/, (m, tag, rest) => (tag === 'param' ? '' : '')))
    .join('\n');
  // A list item or a blank line ends a sentence too.
  // Each tag is its own unit: a header's tags are separate lines.
  for (const para of text.replace(/```[\s\S]*?```/g, ' ').split(/\n(?=\s*@\w)/).map(unit => unit.replace(/^\s*@(file|input|output|position|example|returns?|see|deprecated|default)\b\s*/, '')).filter(unit => !/^\s*@(source|measure|param)\b/.test(unit)).join('\n\n').split('\n').filter(l => !/^\s*(eslint|@ts-|prettier-ignore|SYNC:|-{3,})/.test(l)).join('\n').split(/\n\s*\n|\n\s*- /)) {
    const flat = para.replace(/\s+/g, ' ').trim();
    if (flat === '') continue;
    // Split at a period, question or exclamation mark followed by space and
    // a capital or a backquote, or at the end; keep "e.g." and decimals.
    const parts = flat
      .replace(/\b(e\.g|i\.e|etc|vs|cf)\./g, '$1§')
      .split(/(?<=[.!?])\s+(?=[A-Z`(“"'])/);
    for (const part of parts) out.push(part.replace(/§/g, '.'));
  }
  return out;
}

const words = s => s.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;

let total = 0;
const perFile = [];
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  let count = 0;
  for (const {line, text} of commentBlocks(source)) {
    for (const sentence of sentences(text)) {
      const n = words(sentence);
      if (n > max) {
        count++;
        if (!summary) console.log(`${file}:${line}: ${n} words: ${sentence.slice(0, 160)}`);
      }
    }
  }
  total += count;
  perFile.push([file, count]);
}
if (summary) for (const [file, count] of perFile) console.log(`${count}\t${file}`);
console.log(`total sentences over ${max} words: ${total}`);
