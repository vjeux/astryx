#!/usr/bin/env node
// Bundles two entries of Core's source with the PR size report's esbuild
// options and prints their minified and gzip sizes, and whether the reorder
// entry includes any keyboard module.
// Usage: node bundle-probe.mjs <repo-dir-with-node_modules> <core-src-dir>
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const [repo, coreSrc] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json'));
const esbuild = require('esbuild');
const scratch = fs.mkdtempSync(path.join(repo, 'node_modules/.cache/c06-bundle-probe-'));
const entries = {
  reorder: `export {List} from '${coreSrc}/List/List';\nexport {ListItem} from '${coreSrc}/List/ListItem';\nexport {createReorderable} from '${coreSrc}/reorderable/createReorderable';\n`,
  listOnly: `export {List} from '${coreSrc}/List/List';\nexport {ListItem} from '${coreSrc}/List/ListItem';\n`,
  keyboard: `export * from '${coreSrc}/keyboard/keyboardTarget';\n`,
};
for (const [name, text] of Object.entries(entries)) {
  const file = path.join(scratch, `${name}.mjs`);
  fs.writeFileSync(file, text);
  const result = esbuild.buildSync({
    absWorkingDir: repo,
    entryPoints: [file],
    outdir: path.join(scratch, 'out'),
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    define: {'process.env.NODE_ENV': '"production"'},
    loader: {'.css': 'empty'},
    external: ['react', 'react/*', 'react-dom', 'react-dom/*', '@stylexjs/stylex'],
    nodePaths: [path.join(repo, 'packages/core/node_modules'), path.join(repo, 'node_modules')],
    metafile: true,
    write: false,
    logLevel: 'silent',
  });
  const js = result.outputFiles.filter(f => f.path.endsWith('.js')).map(f => f.text).join('');
  const inputs = Object.keys(result.metafile.inputs);
  const keyboard = inputs.filter(i => /\/keyboard\//.test(i)).map(i => i.replace(/.*packages\/core\/src\//, ''));
  console.log(`${name}: ${js.length} B min, ${zlib.gzipSync(js).length} B gzip; keyboard modules: ${keyboard.length ? keyboard.join(', ') : 'none'}`);
}
fs.rmSync(scratch, {recursive: true, force: true});
