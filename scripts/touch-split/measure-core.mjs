// Gzip sizes of the shared touch core, bundled from source the way the PR
// size report bundles a component import (esbuild, minified ESM, eager
// chunks), with React and StyleX left out.
import {build} from 'esbuild';
import {gzipSync} from 'node:zlib';
import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const src = join(root, 'packages/core/src');
const external = ['react', 'react-dom', 'react/jsx-runtime', '@stylexjs/stylex'];

async function size(name, imports) {
  const dir = mkdtempSync(join(tmpdir(), 'touch-core-'));
  const entry = join(dir, 'entry.ts');
  writeFileSync(entry, imports.map((p, i) => `export * as m${i} from ${JSON.stringify(join(src, p))};`).join('\n'));
  const result = await build({
    entryPoints: [entry], bundle: true, minify: true, format: 'esm', platform: 'browser',
    write: false, external, logLevel: 'silent', treeShaking: true,
    // The tables register themselves on import; keep what the package keeps.
  });
  const text = result.outputFiles[0].text;
  return {name, raw: text.length, gzip: gzipSync(text).length};
}

const rows = [];
rows.push(await size('animator (motion/animator.ts and what it reaches)', ['motion/animator.ts']));
rows.push(await size('motion/experimental (animator, useAnimator, spring, rubber band, bezier, resolveMotion, tables)', ['motion/experimental.ts']));
rows.push(await size('gestures/experimental (recognizers, arena, PressTracker, haptics, touch resolver)', ['gestures/experimental.ts']));
rows.push(await size('UIKit tables (motion/uikit)', ['motion/uikit/index.ts']));
rows.push(await size('shared touch core (motion + gestures experimental)', ['motion/experimental.ts', 'gestures/experimental.ts']));
for (const r of rows) console.log(`${r.name}\t${(r.raw / 1024).toFixed(1)} KB raw\t${(r.gzip / 1024).toFixed(1)} KB gzip`);
