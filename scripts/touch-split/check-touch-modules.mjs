// The touch-module rule, checked from source:
// 1. A touch module (one some component imports through `#touch/`) is
//    imported only through `#touch/`, never by a relative path, so the
//    astryx-desktop condition can drop all of it.
// 2. A file that imports `#touch/` reads the touch presentation
//    (useTouchPresentation or readTouchPresentation), the gate its touch
//    calls sit behind; the runtime half (desktop stubs that throw in tests)
//    is described in the design.
import {readFileSync, readdirSync} from 'node:fs';
import {join, relative, resolve, dirname} from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const src = join(root, 'packages/core/src');
const files = (function walk(dir) {
  return readdirSync(dir, {withFileTypes: true}).flatMap(e => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === 'touch-stubs' || e.name === 'node_modules' ? [] : walk(p);
    return /\.tsx?$/.test(e.name) && !/\.(test|spec|stories)\.tsx?$/.test(e.name) ? [p] : [];
  });
})(src);
const touchModules = new Set();
const problems = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const touchImports = [...text.matchAll(/from '#touch\/([^']+)'/g)].map(m => join(src, `${m[1]}.ts`));
  touchImports.forEach(p => touchModules.add(p));
  if (touchImports.length > 0 && !/use(Touch)Presentation|readTouchPresentation/.test(text)) {
    problems.push(`${relative(root, file)} imports a touch module but never reads the touch presentation`);
  }
}
for (const file of files) {
  for (const m of readFileSync(file, 'utf8').matchAll(/from '(\.[^']+)'/g)) {
    const target = join(dirname(file), m[1]).replace(/\.tsx?$/, '') + '.ts';
    if (touchModules.has(target) && !touchModules.has(file)) {
      problems.push(`${relative(root, file)} imports touch module ${relative(src, target)} by path; use #touch/`);
    }
  }
}
if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`✓ ${touchModules.size} touch module(s), reached only through #touch/ and behind the touch presentation`);
