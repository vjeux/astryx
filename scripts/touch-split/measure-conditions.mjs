// The same component import bundled under each build condition: the default
// (universal: the touch layer is real and eager) and astryx-desktop (the
// touch layer resolves to its no-op stub).
import {build} from 'esbuild';
import {gzipSync} from 'node:zlib';
import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const components = process.argv.slice(3);
const src = join(root, 'packages/core/src');
const external = ['react', 'react-dom', 'react/jsx-runtime', '@stylexjs/stylex'];
for (const conditions of [['source'], ['astryx-desktop', 'source']]) {
  const dir = mkdtempSync(join(tmpdir(), 'touch-cond-'));
  const entry = join(dir, 'entry.ts');
  writeFileSync(entry, components.map(c => `export * from ${JSON.stringify(join(src, c, 'index.ts'))};`).join('\n'));
  const result = await build({
    entryPoints: [entry], bundle: true, minify: true, format: 'esm', platform: 'browser',
    write: false, external, logLevel: 'silent', metafile: true, conditions,
  });
  const text = result.outputFiles[0].text;
  const motion = Object.keys(result.metafile.inputs).filter(p => /[/\\](motion|gestures)[/\\]/.test(p));
  console.log(JSON.stringify({components, conditions, gzip: gzipSync(text).length, raw: text.length, touchCoreModules: motion.length}));
}
