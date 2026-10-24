// Builds the three page variants of the load-timing spike from real code:
// the desktop page (Button, Item and BottomSheet under the astryx-desktop
// condition, React included) and the touch addition (the shared touch core).
// Each payload is wrapped in a function that is parsed, not run: the page
// cannot run uncompiled StyleX, and the question is the network.
import {build} from 'esbuild';
import {mkdirSync, writeFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import {join, resolve} from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const out = resolve(process.argv[3] ?? '/tmp/touch-split-timing');
mkdirSync(out, {recursive: true});
const src = join(root, 'packages/core/src');

async function iife(contents, conditions) {
  const result = await build({
    stdin: {contents, resolveDir: root, loader: 'ts'},
    bundle: true, minify: true, format: 'iife', platform: 'browser', write: false,
    conditions, logLevel: 'silent', define: {'process.env.NODE_ENV': '"production"'},
  });
  return result.outputFiles[0].text;
}

const page = ['Button', 'Item', 'BottomSheet'].map(c => `export * from ${JSON.stringify(join(src, c, 'index.ts'))};`).join('\n') + `\nexport * from 'react-dom/client';`;
const desktop = await iife(page, ['astryx-desktop', 'source']);
const core = await iife(`export * from ${JSON.stringify(join(src, 'motion/experimental.ts'))};\nexport * from ${JSON.stringify(join(src, 'gestures/experimental.ts'))};`, ['source']);
const parseOnly = (name, text) => `function __${name}(){${text}}\n`;
const ready = `performance.mark('touch-ready');document.title='ready';\n`;

writeFileSync(join(out, 'desktop.js'), parseOnly('page', desktop) + `performance.mark('page-ready');\n`);
writeFileSync(join(out, 'mobile.js'), parseOnly('page', desktop) + parseOnly('touch', core) + `performance.mark('page-ready');\n` + ready);
writeFileSync(join(out, 'lazy-main.js'), parseOnly('page', desktop) + `performance.mark('page-ready');\nimport('./touch.js');\n`);
writeFileSync(join(out, 'touch.js'), parseOnly('touch', core) + ready);
const html = body => `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>wait</title>${body}<p>spike</p>`;
writeFileSync(join(out, 'bundle.html'), html(`<script type="module" src="mobile.js"></script>`));
writeFileSync(join(out, 'lazy.html'), html(`<script type="module" src="lazy-main.js"></script>`));
// The split: the preload scanner fetches only the entry whose media matches;
// an inline loader imports the same one. A touch-capable device gets the
// touch build, the superset.
writeFileSync(join(out, 'split.html'), html(`<link rel="modulepreload" href="mobile.js" media="(any-pointer: coarse)"><link rel="modulepreload" href="desktop.js" media="not (any-pointer: coarse)"><script type="module">import(matchMedia('(any-pointer: coarse)').matches ? './mobile.js' : './desktop.js');</script>`));
const kb = t => (gzipSync(t).length / 1024).toFixed(1);
console.log(JSON.stringify({desktopGzipKB: kb(desktop), touchCoreGzipKB: kb(core), mobileGzipKB: kb(desktop + core)}));
