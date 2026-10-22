// Copyright (c) Meta Platforms, Inc. and affiliates.

'use strict';

/**
 * @astryxdesign/build — source stylesheets (spec:AST-080 FR7): for the modules
 * a source build compiles, the prebuilt stylesheet's rules, selectors and
 * order, in one `@layer astryx-base`. `stylexOptions()` is how the prebuilt
 * stylesheets are compiled (scripts/build-css.mjs), `packageModules()` the
 * module set one covers, `reachableModules()` the part an app reaches, and
 * `renderPackage()` prints that part as the prebuilt stylesheet does. The
 * bundler compiles the same modules with the same options
 * (turbopack-loader.js), so rendered class names match the rules.
 */

const fs = require('node:fs');
const path = require('node:path');
const {globSync} = require('fast-glob');

// Loaded on first use: next.js reads this file's package helpers on the
// webpack path too, which must not start requiring the compiler.
const babel = () => require('@babel/core');
const stylexBabelPlugin = () => require('@stylexjs/babel-plugin');

/** The packages withAstryx() builds from source, when installed with
 * `source` entries. Theme packages ship none and keep their stylesheet. */
const ASTRYX_PACKAGES = [
  '@astryxdesign/core',
  '@astryxdesign/theme-neutral',
  '@astryxdesign/lab',
];

const CORE = '@astryxdesign/core';
const SCOPE = '@astryxdesign/';
const STYLEX_MODULE = /\.stylex\.[cm]?[jt]sx?$/;
const CODE_GLOB = '**/*.{js,jsx,mjs,cjs,ts,tsx,mdx}';
const IGNORE = ['**/node_modules/**', '**/.next/**', '**/*.d.{ts,mts,cts}'];
const ALL = '*';

/**
 * Locate an installed package's directory by walking `node_modules` up from
 * `from`, the way Node resolves a bare specifier. Null when not installed.
 */
function findPackageDir(name, from) {
  let dir = path.resolve(from);
  for (;;) {
    const candidate = path.join(dir, 'node_modules', name);
    if (fs.existsSync(path.join(candidate, 'package.json'))) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return null;
    }
    dir = parent;
  }
}

function readManifest(dir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  } catch {
    return null;
  }
}

/**
 * The installed packages a source build compiles, in `ASTRYX_PACKAGES`
 * order, each with its exact `source` entries (request → file). A package's
 * source directory is the one its root entry lives in.
 */
function sourcePackages(from) {
  const packages = [];
  for (const name of ASTRYX_PACKAGES) {
    const dir = findPackageDir(name, from);
    const exports = dir && readManifest(dir)?.exports;
    if (exports == null || typeof exports !== 'object') {
      continue;
    }
    const entries = new Map();
    for (const [key, value] of Object.entries(exports)) {
      if (typeof value?.source === 'string' && !key.includes('*')) {
        const request = key === '.' ? name : `${name}/${key.slice(2)}`;
        entries.set(request, path.resolve(dir, value.source));
      }
    }
    if (entries.has(name)) {
      packages.push({
        name,
        dir,
        srcDir: path.dirname(entries.get(name)),
        entries,
      });
    }
  }
  return packages;
}

/**
 * The StyleX options the prebuilt stylesheets are compiled with: the default
 * `x` class-name prefix, no development class names and StyleX's default
 * property validation. A package other than Core reads Core's variable modules
 * from Core's source, as the prebuilt build does, so each variable hashes to
 * the name Core declares. Plain JSON: Turbopack passes only serializable
 * loader options.
 */
function stylexOptions(pkg, packages) {
  const core = packages.find(candidate => candidate.name === CORE);
  return {
    dev: false,
    runtimeInjection: false,
    genConditionalClasses: true,
    treeshakeCompensation: true,
    aliases:
      pkg.name === CORE || core == null
        ? {}
        : {
            '@astryxdesign/core/*': [path.join(core.srcDir, '*')],
            '@astryxdesign/core': [core.srcDir],
          },
    unstable_moduleResolution: {type: 'commonJS', rootDir: pkg.dir},
  };
}

function staticStyleXImports(source) {
  const specifiers = [];
  const pattern =
    /\b(?:import|export)\s+([^'";]*?\sfrom\s*)?['"]([^'"]+\.stylex)['"]/g;
  for (const match of source.matchAll(pattern)) {
    const clause = (match[1] ?? '').replace(/\s+from\s*$/, '').trim();
    const named = /^\{([^}]*)\}$/.exec(clause);
    const typeOnly =
      /^type(?:\s|\*|\{)/.test(clause) ||
      (named != null &&
        named[1]
          .split(',')
          .map(specifier => specifier.trim())
          .filter(Boolean)
          .every(specifier => /^type\b/.test(specifier)));
    if (!typeOnly) {
      specifiers.push(match[2]);
    }
  }
  return specifiers;
}

const SUFFIXES = ['', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.tsx'];

/** The first file named by a base and a suffix, in order. */
function firstFile(bases, suffixes = SUFFIXES) {
  for (const file of bases.flatMap(base => suffixes.map(s => base + s))) {
    if (fs.statSync(file, {throwIfNoEntry: false})?.isFile()) return file;
  }
  return null;
}

function resolveStyleXImport(specifier, importer, aliases) {
  if (specifier.startsWith('.')) {
    return firstFile([path.resolve(path.dirname(importer), specifier)]);
  }
  for (const [pattern, targets] of Object.entries(aliases)) {
    const [prefix, suffix = ''] = pattern.split('*');
    if (specifier.startsWith(prefix) && specifier.endsWith(suffix)) {
      const matched = specifier.slice(
        prefix.length,
        specifier.length - suffix.length,
      );
      const found = targets
        .map(target => firstFile([target.replace('*', matched)]))
        .find(Boolean);
      if (found) return found;
    }
  }
  return null;
}

/**
 * The modules a package's prebuilt stylesheet is compiled from: every source
 * file except tests, plus the variable modules they import, minus those a
 * provider's stylesheet already emits. The parity test in
 * source-stylesheet.test.mjs fails if this drifts from scripts/build-css.mjs.
 */
function packageModules(pkg, packages, provided = new Set()) {
  const {aliases} = stylexOptions(pkg, packages);
  const queue = globSync('**/*.{ts,tsx}', {
    cwd: pkg.srcDir,
    absolute: true,
    ignore: ['**/*.test.*', '**/*.d.ts', '**/node_modules/**'],
  })
    .map(file => path.normalize(file))
    .filter(file => !STYLEX_MODULE.test(file));
  const modules = new Set();
  while (queue.length > 0) {
    const file = queue.shift();
    if (modules.has(file)) continue;
    modules.add(file);
    for (const specifier of staticStyleXImports(
      fs.readFileSync(file, 'utf8'),
    )) {
      const dependency = resolveStyleXImport(specifier, file, aliases);
      if (dependency == null) {
        throw new Error(
          `[@astryxdesign/build] Cannot resolve "${specifier}" from ${file}`,
        );
      }
      if (!provided.has(dependency)) queue.push(dependency);
    }
  }
  return modules;
}

const compiled = new Map();

function stamp(file) {
  const stat = fs.statSync(file);
  return `${stat.mtimeMs}:${stat.size}`;
}

/** One module's StyleX rules, cached on its modification stamp. */
async function compileRules(file, options) {
  const key = `${stamp(file)}:${JSON.stringify(options)}`;
  if (compiled.get(file)?.key === key) {
    return compiled.get(file).rules;
  }
  const code = fs.readFileSync(file, 'utf8');
  let rules = [];
  if (code.includes('@stylexjs/stylex')) {
    const result = await babel().transformAsync(code, {
      filename: file,
      babelrc: false,
      configFile: false,
      code: false,
      parserOpts: {plugins: ['typescript', 'jsx']},
      plugins: [[stylexBabelPlugin(), options]],
    });
    rules = result?.metadata?.stylex ?? [];
  }
  compiled.set(file, {key, rules});
  return rules;
}

const PLACEHOLDER = 'astryxsourcelevel';
const level = rule => Math.floor(rule[2] / 1000);

/**
 * Print the rules for `keys` exactly as the package's prebuilt stylesheet
 * prints them, given every rule of that stylesheet (`packageRules`).
 *
 * Two things in StyleX's output depend on the rules around a rule, so a
 * subset printed on its own would drift from the prebuilt stylesheet:
 *
 * - Without layers, the n-th priority level present gets n `:not(#\#)`
 *   suffixes, so a missing level renumbers every level above it. A
 *   placeholder rule per missing level keeps the numbering, and is dropped.
 * - A class two modules emit at different priorities prints once, at its
 *   earliest position. Keeping every copy of a selected class keeps that
 *   position.
 */
function renderPackage(packageRules, keys) {
  const isConstant = rule => rule[1]?.constKey != null;
  const rules = packageRules.filter(
    rule => keys.has(rule[0]) || isConstant(rule),
  );
  if (!rules.some(rule => keys.has(rule[0]) && !isConstant(rule))) {
    return '';
  }
  const present = new Set(rules.map(level));
  const placeholders = [...new Set(packageRules.map(level))]
    .filter(missing => !present.has(missing))
    .map(missing => [
      `${PLACEHOLDER}${missing}`,
      {ltr: `.${PLACEHOLDER}${missing}{--${PLACEHOLDER}:0}`, rtl: null},
      missing * 1000,
    ]);
  const css = stylexBabelPlugin()
    .processStylexRules([...rules, ...placeholders], false)
    .split('\n')
    .filter(line => !line.includes(PLACEHOLDER))
    .map(line => '  ' + line)
    .join('\n');
  return `@layer astryx-base {\n${css}\n}\n`;
}

const surfaces = new Map();

function take(map, source, name) {
  const names = map.get(source) ?? new Set();
  map.set(source, names === ALL || name === ALL ? ALL : names);
  if (name != null && name !== ALL && names !== ALL) names.add(name);
}

const TYPE_ONLY = new Set([
  'TSInterfaceDeclaration',
  'TSTypeAliasDeclaration',
  'TSDeclareFunction',
  'EmptyStatement',
]);
const isTypeOnly = node => TYPE_ONLY.has(node.type) || node.declare === true;
const nameOf = node => (node.type === 'StringLiteral' ? node.value : node.name);

function bindingNames(declaration) {
  if (declaration.type !== 'VariableDeclaration') {
    return declaration.id ? [declaration.id.name] : [];
  }
  const names = [];
  const collect = node => {
    if (node == null) return;
    if (node.type === 'Identifier') names.push(node.name);
    else if (node.type === 'ObjectPattern') {
      node.properties.forEach(p =>
        collect(p.type === 'RestElement' ? p.argument : p.value),
      );
    } else if (node.type === 'ArrayPattern') node.elements.forEach(collect);
    else if (node.type === 'AssignmentPattern') collect(node.left);
    else if (node.type === 'RestElement') collect(node.argument);
  };
  declaration.declarations.forEach(declarator => collect(declarator.id));
  return names;
}

/**
 * A module's runtime imports and exports, read from its syntax: `imports`
 * (source → names taken, `ALL` for namespaces, `import()` and `require()`),
 * `reexports` (name → source and name forwarded), `stars` (`export *`
 * sources), `locals`, and `hasCode` (runs more than imports, re-exports and
 * types). Type-only syntax never reaches a bundle and is skipped.
 */
function moduleSurface(file) {
  const key = stamp(file);
  if (surfaces.get(file)?.key === key) {
    return surfaces.get(file).surface;
  }
  const surface = {
    imports: new Map(),
    reexports: new Map(),
    stars: [],
    locals: new Set(),
    hasCode: false,
  };
  const text = fs.readFileSync(file, 'utf8');
  // MDX keeps imports and exports in top-level ESM blocks, which a blank line
  // ends and fenced code never holds.
  const code = !file.endsWith('.mdx')
    ? text
    : text
        .replace(
          /^ {0,3}(`{3,}|~{3,}).*$[^]*?(^ {0,3}\1[`~]*[ \t]*$|(?![^]))/gm,
          '',
        )
        .split(/\n[ \t]*\n/)
        .filter(block => /^(import|export)\b/.test(block.trimStart()))
        .join('\n\n');
  // In a `.ts` file, `<T>value` is a type assertion, not JSX.
  const typescript = /\.[cm]?tsx?$/.test(file) ? ['typescript'] : [];
  const parse = source =>
    babel().parseSync(source, {
      filename: file,
      babelrc: false,
      configFile: false,
      sourceType: 'unambiguous',
      parserOpts: {
        plugins: /\.[cm]?ts$/.test(file) ? typescript : [...typescript, 'jsx'],
      },
    });
  let ast;
  try {
    ast = parse(code);
  } catch (error) {
    // Unreadable syntax never fails the build: every module named stays whole.
    console.warn(
      `[@astryxdesign/build] ${error.message.split('\n')[0]}. Every module the file names is kept whole.`,
    );
    surface.hasCode = true;
    const specifier = /(?:from|import|require)\s*\(?\s*(['"])([^'"\n]+)\1/g;
    const named = [...text.matchAll(specifier)].map(match => match[2]);
    ast = parse(
      named
        .map((name, i) => `import * as m${i} from ${JSON.stringify(name)};`)
        .join('\n'),
    );
  }
  const bindings = new Map();
  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration' || node.importKind === 'type')
      continue;
    const source = node.source.value;
    if (node.specifiers.length === 0) take(surface.imports, source, null);
    for (const specifier of node.specifiers) {
      if (specifier.importKind === 'type') continue;
      const name =
        specifier.type === 'ImportNamespaceSpecifier'
          ? ALL
          : specifier.type === 'ImportDefaultSpecifier'
            ? 'default'
            : nameOf(specifier.imported);
      take(surface.imports, source, name);
      bindings.set(specifier.local.name, {source, name});
    }
  }
  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration' || node.exportKind === 'type') {
      continue;
    } else if (node.type === 'ExportAllDeclaration') {
      if (node.exported)
        surface.reexports.set(nameOf(node.exported), {
          source: node.source.value,
          name: ALL,
        });
      else surface.stars.push(node.source.value);
    } else if (node.type === 'ExportNamedDeclaration') {
      if (node.declaration && !isTypeOnly(node.declaration)) {
        surface.hasCode = true;
        bindingNames(node.declaration).forEach(name =>
          surface.locals.add(name),
        );
      }
      for (const specifier of node.specifiers) {
        if (specifier.exportKind === 'type') continue;
        const exported = nameOf(specifier.exported);
        const forwarded = node.source
          ? {
              source: node.source.value,
              name:
                specifier.type === 'ExportNamespaceSpecifier'
                  ? ALL
                  : specifier.type === 'ExportDefaultSpecifier'
                    ? 'default'
                    : nameOf(specifier.local),
            }
          : bindings.get(specifier.local.name);
        if (forwarded) surface.reexports.set(exported, forwarded);
        else surface.locals.add(exported);
      }
    } else if (node.type === 'ExportDefaultDeclaration') {
      surface.hasCode = true;
      surface.locals.add('default');
    } else if (!isTypeOnly(node)) {
      surface.hasCode = true;
      if (node.moduleReference?.type === 'TSExternalModuleReference') {
        take(surface.imports, node.moduleReference.expression.value, ALL);
      }
    }
  }
  babel().traverse(ast, {
    CallExpression({node, scope}) {
      const isRequire =
        node.callee.name === 'require' && !scope.hasBinding('require');
      if (node.callee.type !== 'Import' && !isRequire) return;
      const [argument] = node.arguments;
      const prefix =
        argument?.type === 'StringLiteral'
          ? argument.value
          : argument?.type === 'TemplateLiteral'
            ? argument.quasis[0].value.cooked
            : '';
      if (argument?.type === 'StringLiteral') {
        take(surface.imports, prefix, ALL);
      } else if (prefix.startsWith(SCOPE)) {
        // A computed Astryx specifier keeps the whole package it names.
        take(surface.imports, prefix.split('/').slice(0, 2).join('/'), ALL);
      }
    },
  });
  surfaces.set(file, {key, surface});
  return surface;
}

function resolveFile(specifier, importer) {
  const base = path.resolve(path.dirname(importer), specifier);
  // TypeScript source may spell a sibling `.ts` file with `.js`.
  return firstFile(
    [base, base.replace(/\.(m?js|jsx)$/, '')],
    [...SUFFIXES, '.jsx', '/index.js'],
  );
}

/** An export-map target under the conditions a browser bundle matches. */
function exportTarget(value) {
  if (typeof value === 'string' || value == null) return value ?? null;
  if (Array.isArray(value))
    return value.map(exportTarget).find(Boolean) ?? null;
  for (const condition of ['browser', 'import', 'module', 'default']) {
    const target = condition in value ? exportTarget(value[condition]) : null;
    if (target) return target;
  }
  return null;
}

/**
 * Where a request lands in the bundle. Relative requests stay in their
 * package. An Astryx package the build compiles resolves to its `source`
 * entry from anywhere, because the bundler's alias is global; any other
 * Astryx package resolves through its export map to its published files.
 * Other packages are not Astryx's to follow.
 */
function resolveRequest(specifier, importer, sources) {
  if (specifier.startsWith('.')) {
    return resolveFile(specifier, importer);
  }
  if (!specifier.startsWith(SCOPE)) {
    return null;
  }
  const name = specifier.split('/').slice(0, 2).join('/');
  if (sources.has(name)) {
    return sources.get(name).entries.get(specifier) ?? null;
  }
  const dir = findPackageDir(name, path.dirname(importer));
  const manifest = dir && readManifest(dir);
  if (manifest == null) return null;
  const subpath = `.${specifier.slice(name.length)}`;
  const {exports} = manifest;
  const target =
    exports == null
      ? subpath === '.'
        ? (manifest.module ?? manifest.main ?? 'index.js')
        : subpath
      : typeof exports === 'object' &&
          !Array.isArray(exports) &&
          Object.keys(exports).some(key => key.startsWith('.'))
        ? exportTarget(exports[subpath])
        : subpath === '.'
          ? exportTarget(exports)
          : null;
  return target
    ? resolveFile(`./${target.replace(/^\.\//, '')}`, path.join(dir, 'x'))
    : null;
}

const owners = new Map();

/** Whether a bundler keeps a module no import names, per its package's
 * `sideEffects` (every module counts when the field is absent). */
function hasSideEffects(file) {
  let dir = path.dirname(file);
  while (!owners.has(dir) && !fs.existsSync(path.join(dir, 'package.json'))) {
    const parent = path.dirname(dir);
    if (parent === dir) return true;
    dir = parent;
  }
  if (!owners.has(dir)) owners.set(dir, readManifest(dir)?.sideEffects);
  const sideEffects = owners.get(dir);
  if (!Array.isArray(sideEffects)) return sideEffects !== false;
  const relative = path.relative(dir, file).split(path.sep).join('/');
  return sideEffects.some(pattern => {
    const glob = pattern.replace(/^\.\//, '');
    const source = glob
      .split(/(\*\*\/|\*\*|\*|\?)/)
      .map(part =>
        part === '**/'
          ? '(?:.*/)?'
          : part === '**'
            ? '.*'
            : part === '*'
              ? '[^/]*'
              : part === '?'
                ? '[^/]'
                : part.replace(/[.+^${}()|[\]\\]/g, '\\$&'),
      )
      .join('');
    return new RegExp(
      glob.includes('/') ? `^${source}$` : `(^|/)${source}$`,
    ).test(relative);
  });
}

function exportNames(file, sources, seen = new Set()) {
  const names = new Set();
  if (seen.has(file)) return names;
  seen.add(file);
  const surface = moduleSurface(file);
  [...surface.locals, ...surface.reexports.keys()].forEach(name =>
    names.add(name),
  );
  for (const star of surface.stars) {
    const target = resolveRequest(star, file, sources);
    if (target) {
      exportNames(target, sources, seen).forEach(
        name => name !== 'default' && names.add(name),
      );
    }
  }
  return names;
}

/**
 * The modules reachable from `requests` (`{file, name}`), kept the way a
 * bundler that honors `sideEffects` keeps them: a module whose own code runs
 * is entered whole and every runtime import it makes is followed with the
 * names it takes; a re-export forwards only the names asked of it, which is
 * what keeps `import {Button} from '@astryxdesign/core'` from reaching every
 * component. Anything uncertain is kept: a missing rule leaves a component
 * unstyled, an extra one only costs bytes.
 */
function reachableModules(requests, sources) {
  const entered = new Set();
  const asked = new Map();
  const queue = [...requests];
  const follow = (source, from, name) =>
    queue.push({file: resolveRequest(source, from, sources), name});
  while (queue.length > 0) {
    const {file, name} = queue.shift();
    if (file == null) continue;
    const surface = moduleSurface(file);
    if (!entered.has(file)) {
      entered.add(file);
      if (surface.hasCode) {
        for (const [source, names] of surface.imports) {
          if (names === ALL || names.size === 0)
            follow(source, file, names === ALL ? ALL : null);
          else names.forEach(imported => follow(source, file, imported));
        }
      }
      for (const source of [
        ...surface.stars,
        ...[...surface.reexports.values()].map(entry => entry.source),
      ]) {
        const target = resolveRequest(source, file, sources);
        if (target && hasSideEffects(target))
          queue.push({file: target, name: null});
      }
    }
    const done = asked.get(file) ?? new Set();
    if (name == null || done.has(ALL) || done.has(name)) continue;
    asked.set(file, done.add(name));
    if (name === ALL) {
      surface.reexports.forEach(entry =>
        follow(entry.source, file, entry.name),
      );
      surface.stars.forEach(star => follow(star, file, ALL));
    } else if (surface.reexports.has(name)) {
      const entry = surface.reexports.get(name);
      follow(entry.source, file, entry.name);
    } else if (!surface.locals.has(name) && name !== 'default') {
      for (const star of surface.stars) {
        const target = resolveRequest(star, file, sources);
        if (target && exportNames(target, sources).has(name))
          queue.push({file: target, name});
      }
    }
  }
  return entered;
}

/**
 * Where an app's Astryx imports live: its own files (`include`, relative to
 * `cwd`), the workspace packages it links from outside `node_modules`, and the
 * installed packages, at any depth, that depend on Astryx. All three reach
 * the bundle, so all three count as the app's imports.
 */
function importingFiles(cwd, include) {
  const files = new Set(
    include.flatMap(pattern =>
      globSync(pattern, {cwd, absolute: true, ignore: IGNORE}),
    ),
  );
  const seen = new Set();
  const visit = (dir, deps) => {
    for (const name of Object.keys(deps ?? {})) {
      const found = !name.startsWith(SCOPE) && findPackageDir(name, dir);
      const real = found && fs.realpathSync.native(found);
      if (!real || seen.has(real)) continue;
      seen.add(real);
      const manifest = readManifest(real);
      if (manifest == null) {
        throw new Error(
          `[@astryxdesign/build] Cannot read ${real}/package.json`,
        );
      }
      const linked = !real.split(path.sep).includes('node_modules');
      const astryx = [manifest.dependencies, manifest.peerDependencies].some(
        map => Object.keys(map ?? {}).some(dep => dep.startsWith(SCOPE)),
      );
      if (linked || astryx) {
        globSync(CODE_GLOB, {
          cwd: real,
          absolute: true,
          ignore: IGNORE,
        }).forEach(file => files.add(file));
      }
      visit(real, {
        ...manifest.dependencies,
        ...manifest.optionalDependencies,
      });
    }
  };
  const app = readManifest(cwd) ?? {};
  visit(cwd, {
    ...app.dependencies,
    ...app.devDependencies,
    ...app.optionalDependencies,
  });
  return [...files].map(file => path.normalize(file));
}

/**
 * Globs a bundler can watch for `tail` under `dir` without walking into
 * `node_modules`, a dot directory or a symlink (which can loop): one deep glob
 * for a tree with none, else this level's files and each subtree's globs.
 */
function treeGlobs(dir, tail) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  const skipped = entry =>
    entry.isSymbolicLink() ||
    (entry.isDirectory() && /^(\.|node_modules$)/.test(entry.name));
  const below = entries
    .filter(entry => entry.isDirectory() && !skipped(entry))
    .map(entry => treeGlobs(path.join(dir, entry.name), tail));
  return entries.some(skipped) || below.some(([top]) => top.glob === tail)
    ? [{dir, glob: tail}, ...below.flat()]
    : [{dir, glob: `**/${tail}`}];
}

/** What to watch for `include`: each pattern from its static directory. */
function watchGlobs(cwd, include) {
  return include.flatMap(pattern => {
    const parts = pattern.split('/');
    const at = parts.findIndex(part => /[*?[\]{}()!]/.test(part));
    const dir = path.join(cwd, ...parts.slice(0, at));
    const rest = parts.slice(at).join('/');
    return rest.startsWith('**/') && fs.existsSync(dir)
      ? treeGlobs(dir, rest.slice(3))
      : [{dir, glob: rest}];
  });
}

/**
 * The stylesheet a source build emits for an app: the rules of the Astryx
 * modules it reaches, one `@layer astryx-base` block per package in package
 * order, as loading the prebuilt stylesheets would give. A Core build always
 * carries Core's variable modules, which other packages' prebuilt stylesheets
 * rely on (FR2, FR7).
 */
async function sourceStylesheet({cwd, include = [CODE_GLOB]}) {
  const packages = sourcePackages(cwd);
  const watch = watchGlobs(cwd, include);
  if (packages.length === 0) {
    return {css: '', packages, reached: new Set(), watch};
  }
  const sources = new Map(packages.map(pkg => [pkg.name, pkg]));
  const requests = [];
  for (const file of importingFiles(cwd, include)) {
    if (!fs.readFileSync(file, 'utf8').includes(SCOPE)) continue;
    const {imports, reexports, stars} = moduleSurface(file);
    const taken = new Map(
      [...imports].map(([source, names]) => [
        source,
        names === ALL ? ALL : new Set(names),
      ]),
    );
    reexports.forEach(entry => take(taken, entry.source, entry.name));
    stars.forEach(star => take(taken, star, ALL));
    for (const [source, names] of taken) {
      const target =
        source.startsWith(SCOPE) && resolveRequest(source, file, sources);
      if (!target) continue;
      if (names === ALL || names.size === 0)
        requests.push({file: target, name: names === ALL ? ALL : null});
      else names.forEach(name => requests.push({file: target, name}));
    }
  }
  const reached = reachableModules(requests, sources);
  const blocks = [];
  let provided = new Set();
  for (const pkg of packages) {
    const options = stylexOptions(pkg, packages);
    const whole = packageModules(pkg, packages, provided);
    const selected = [...reached].filter(file =>
      file.startsWith(pkg.srcDir + path.sep),
    );
    if (pkg.name === CORE) {
      provided = new Set([...whole].filter(file => STYLEX_MODULE.test(file)));
      selected.push(...provided);
    }
    const packageRules = [];
    for (const file of new Set([...whole, ...selected])) {
      packageRules.push(...(await compileRules(file, options)));
    }
    const keys = new Set();
    for (const file of selected) {
      (await compileRules(file, options)).forEach(rule => keys.add(rule[0]));
    }
    blocks.push(renderPackage(packageRules, keys));
  }
  return {css: blocks.filter(Boolean).join('\n'), packages, reached, watch};
}

module.exports = {
  ASTRYX_PACKAGES,
  findPackageDir,
  sourcePackages,
  stylexOptions,
  packageModules,
  compileRules,
  renderPackage,
  sourceStylesheet,
};
