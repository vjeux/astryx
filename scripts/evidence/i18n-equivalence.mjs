// Evidence, not for landing: the six components' English keys from six builds
// (bundleImport) and from one build (bundleImportsByEntry), and the build count.
import fs from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';

const root = process.argv[2];
const require = createRequire(path.join(root, 'package.json'));
// esbuild's exports are read-only getters, so count builds through a proxy
// in the module cache, which component-size.js's lazy require then reads.
const esbuildPath = require.resolve('esbuild');
require(esbuildPath);
const cached = require.cache[esbuildPath];
const esbuild = cached.exports;
let builds = 0;
cached.exports = new Proxy(esbuild, {
  get: (target, key) =>
    key === 'buildSync'
      ? (...args) => {
          builds += 1;
          return target.buildSync(...args);
        }
      : target[key],
});
const {bundleImport, bundleImportsByEntry} = require(path.join(root, '.github/scripts/lib/component-size.js'));
const dist = path.join(root, 'packages/core/dist');
const source = fs.readFileSync(path.join(dist, 'i18n/generated-locales/en.generated.js'), 'utf8');
const keys = [...source.matchAll(/["'](@astryx\.[^"']+)["']\s*:/g)].map(m => m[1]);
const keysIn = text => keys.filter(key => text.includes(JSON.stringify(key)));
const names = ['Button', 'TreeList', 'SideNav', 'Selector', 'Table', 'DateInput'];
const entries = names.map(name => path.join(dist, name, `${name}.js`));
builds = 0;
const old = entries.map(entry => keysIn(bundleImport(entry)));
const oldBuilds = builds;
builds = 0;
const texts = bundleImportsByEntry(entries);
const now = entries.map(entry => keysIn(texts.get(entry)));
const newBuilds = builds;
let same = true;
names.forEach((name, i) => {
  const a = JSON.stringify(old[i]);
  const b = JSON.stringify(now[i]);
  if (a !== b) same = false;
  console.log(`${name}: ${old[i].length} keys from its own build, ${now[i].length} from the shared build, identical: ${a === b}`);
});
console.log(`catalog keys ${keys.length}; esbuild builds: ${oldBuilds} before, ${newBuilds} after; every set identical: ${same}`);
process.exitCode = same ? 0 : 1;
