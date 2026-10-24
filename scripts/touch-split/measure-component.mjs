// Gzip size of one component's import from source, with React, StyleX and the
// shared touch core (motion/, gestures/, the touch resolver) left out, so a
// difference between two trees is the component's own code.
import {build} from 'esbuild';
import {gzipSync} from 'node:zlib';
import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';

const [rootArg, component, mode = 'own'] = process.argv.slice(2);
const root = resolve(rootArg);
const src = join(root, 'packages/core/src');
const external = ['react', 'react-dom', 'react/jsx-runtime', '@stylexjs/stylex'];
const shared = /[/\\](motion|gestures)[/\\]|[/\\]utils[/\\]touchPresentation\.ts$/;
const dir = mkdtempSync(join(tmpdir(), 'touch-comp-'));
const entry = join(dir, 'entry.ts');
writeFileSync(entry, `export * from ${JSON.stringify(join(src, component, 'index.ts'))};`);
const result = await build({
  entryPoints: [entry], bundle: true, minify: true, format: 'esm', platform: 'browser',
  write: false, external, logLevel: 'silent', metafile: true,
  plugins: mode === 'own' ? [{
    name: 'shared-touch-core-external',
    setup(b) {
      b.onResolve({filter: /^\./}, async args => {
        if (args.pluginData?.skip) return undefined;
        const r = await b.resolve(args.path, {resolveDir: args.resolveDir, kind: args.kind, pluginData: {skip: true}});
        return shared.test(r.path) ? {path: r.path, external: true} : r;
      });
    },
  }] : [],
});
const text = result.outputFiles[0].text;
const touchInputs = Object.keys(result.metafile.inputs).filter(p => shared.test(p)).length;
console.log(JSON.stringify({component, mode, raw: text.length, gzip: gzipSync(text).length, sharedModulesInBundle: touchInputs}));
