// Copyright (c) Meta Platforms, Inc. and affiliates.

// Builds dist/index.html: the page with the bundled spike inlined, so the
// rig can serve one file. Run from the repo root:
//   node internal/spikes/c17-sheet-host/build.mjs

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, '../../../package.json'));
const {build} = require('esbuild');

const result = await build({
  entryPoints: [join(here, 'src/main.ts')],
  bundle: true,
  write: false,
  format: 'iife',
  target: ['safari16', 'chrome110'],
  legalComments: 'none',
  logLevel: 'warning',
});
const js = result.outputFiles[0].text;
if (js.includes('</script')) {
  throw new Error('bundle contains </script>');
}
const html = readFileSync(join(here, 'index.html'), 'utf8').replace(
  '<!--SCRIPT-->',
  `<script>\n${js}</script>`,
);
mkdirSync(join(here, 'dist'), {recursive: true});
writeFileSync(join(here, 'dist/index.html'), html);
console.log(`dist/index.html ${html.length} bytes`);
