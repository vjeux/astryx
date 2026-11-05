// Prints comment sentences over 25 words in the given files (ASD-STE100 check).
import fs from 'node:fs';

let total = 0;
for (const file of process.argv.slice(2)) {
  const source = fs.readFileSync(file, 'utf8');
  const lines = source.split('\n');
  // Collect comment runs: consecutive // lines, or /* ... */ blocks.
  const runs = [];
  let run = null;
  let inBlock = false;
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (inBlock) {
      const end = trimmed.indexOf('*/');
      const text = (end >= 0 ? trimmed.slice(0, end) : trimmed).replace(/^\*\s?/, '');
      run.text.push(text);
      if (end >= 0) {
        inBlock = false;
        runs.push(run);
        run = null;
      }
      return;
    }
    if (trimmed.startsWith('/*')) {
      run = {line: index + 1, text: []};
      const body = trimmed.replace(/^\/\*\*?/, '');
      const end = body.indexOf('*/');
      run.text.push(end >= 0 ? body.slice(0, end) : body);
      if (end >= 0) {
        runs.push(run);
        run = null;
      } else {
        inBlock = true;
      }
      return;
    }
    const slash = trimmed.match(/^\/\/\s?(.*)$/);
    if (slash) {
      if (run && run.kind === 'line' && run.last === index - 1) {
        run.text.push(slash[1]);
        run.last = index;
      } else {
        if (run && run.kind === 'line') runs.push(run);
        run = {line: index + 1, text: [slash[1]], kind: 'line', last: index};
      }
      return;
    }
    if (run && run.kind === 'line') {
      runs.push(run);
      run = null;
    }
  });
  if (run) runs.push(run);
  for (const r of runs) {
    const text = r.text
      .filter(t => !/^@(file|input|output|position|example|param|returns|default)\b/.test(t.trim()))
      .join(' ')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text === '' || /^(eslint|@ts-|prettier)/.test(text)) continue;
    for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z`(\-*])/)) {
      const words = sentence.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w));
      if (words.length > 25) {
        total += 1;
        console.log(`${file}:${r.line}: ${words.length} words: ${sentence.slice(0, 160)}`);
      }
    }
  }
}
console.log(`total sentences over 25 words: ${total}`);
