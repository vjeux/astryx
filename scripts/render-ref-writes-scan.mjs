// NOT FOR LANDING: render-time ref-write scan.
// Flags `x.current =` (and `??=`, `||=`, `+=`, `-=`) that runs during a
// component's or hook's render: directly in the body or a branch there, in a
// useMemo, useState, useReducer or useSyncExternalStore callback, or in a
// local function the body calls. Skips lazy init (`if (x.current == null)`
// or `??=`). Scans every non-test .ts/.tsx file in packages/core/src and
// packages/lab/src. Known blind spot: a write through an alias.
// Usage: node scripts/render-ref-writes-scan.mjs [repo root] > hits.json
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

// Scans `root` (default: the working directory) with the TypeScript beside
// this script, so an older checkout without node_modules can be scanned too.
const root = path.resolve(process.argv[2] ?? '.');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const ASSIGN_OPS = new Set([
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.QuestionQuestionEqualsToken,
  ts.SyntaxKind.BarBarEqualsToken,
  ts.SyntaxKind.PlusEqualsToken,
  ts.SyntaxKind.MinusEqualsToken,
]);
const RENDER_HOOK_ARGS = {
  useMemo: [0],
  useState: [0],
  useReducer: [0, 2],
  useSyncExternalStore: [1, 2],
};
const COMMIT_HOOKS = new Set([
  'useEffect',
  'useLayoutEffect',
  'useIsomorphicLayoutEffect',
  'useInsertionEffect',
]);

function walkFiles(dir, out) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__' || entry.name === 'node_modules') continue;
      walkFiles(p, out);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
      if (/\.(test|spec|stories)\.(ts|tsx)$/.test(entry.name)) continue;
      out.push(p);
    }
  }
}

const isFn = n =>
  ts.isFunctionDeclaration(n) ||
  ts.isFunctionExpression(n) ||
  ts.isArrowFunction(n) ||
  ts.isMethodDeclaration(n) ||
  ts.isGetAccessor(n) ||
  ts.isSetAccessor(n) ||
  ts.isConstructorDeclaration(n);

const isRenderName = name => /^[A-Z]/.test(name) || /^use[A-Z0-9]/.test(name);

function calleeName(call) {
  const e = call.expression;
  if (ts.isIdentifier(e)) return e.text;
  if (ts.isPropertyAccessExpression(e)) return e.name.text;
  return null;
}

// The name a function-like node is known by: its own, its variable's, or the
// variable a wrapping forwardRef/memo call is assigned to.
function fnName(fn) {
  if (fn.name && ts.isIdentifier(fn.name)) return fn.name.text;
  let p = fn.parent;
  while (p && ts.isCallExpression(p) && ['forwardRef', 'memo'].includes(calleeName(p) ?? '')) {
    p = p.parent;
  }
  if (p && ts.isVariableDeclaration(p) && ts.isIdentifier(p.name)) return p.name.text;
  return null;
}

// `x.current` → the text of `x`.
function refTarget(node) {
  if (ts.isPropertyAccessExpression(node) && node.name.text === 'current') {
    return node.expression.getText();
  }
  return null;
}

// True when `assign` sits in the then-branch of an `if` whose condition is a
// lazy-init test of the same ref: `x.current == null` (or `=== null`,
// `=== undefined`, `== undefined`) or `!x.current`.
function isLazyInit(assign, target) {
  let child = assign;
  let p = assign.parent;
  while (p && !isFn(p)) {
    if (ts.isIfStatement(p) && child === p.thenStatement) {
      const c = p.expression;
      const tests = [];
      const collect = e => {
        if (ts.isParenthesizedExpression(e)) return collect(e.expression);
        if (ts.isBinaryExpression(e) && e.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
          collect(e.left);
          collect(e.right);
          return;
        }
        tests.push(e);
      };
      collect(c);
      for (const e of tests) {
        if (ts.isBinaryExpression(e)) {
          const op = e.operatorToken.kind;
          const eq =
            op === ts.SyntaxKind.EqualsEqualsToken ||
            op === ts.SyntaxKind.EqualsEqualsEqualsToken;
          const nullish = x =>
            x.kind === ts.SyntaxKind.NullKeyword ||
            (ts.isIdentifier(x) && x.text === 'undefined');
          if (eq && ((refTarget(e.left) === target && nullish(e.right)) || (refTarget(e.right) === target && nullish(e.left)))) {
            return true;
          }
        }
        if (ts.isPrefixUnaryExpression(e) && e.operator === ts.SyntaxKind.ExclamationToken && refTarget(e.operand) === target) {
          return true;
        }
      }
    }
    child = p;
    p = p.parent;
  }
  return false;
}

function scanFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const hits = [];
  const renderFns = [];
  const visitTop = n => {
    if (isFn(n) && !ts.isMethodDeclaration(n)) {
      const name = fnName(n);
      if (name && isRenderName(name)) {
        renderFns.push({fn: n, name});
        return; // nested render functions are reached through their own entry
      }
    }
    ts.forEachChild(n, visitTop);
  };
  ts.forEachChild(sf, visitTop);

  for (const {fn, name} of renderFns) {
    if (!fn.body) continue;
    // Local functions declared anywhere in the body (not inside nested fns).
    const locals = new Map();
    const collectLocals = n => {
      if (n !== fn.body && isFn(n)) {
        const local = fnName(n);
        if (local && !locals.has(local) && n.parent && (ts.isFunctionDeclaration(n) || ts.isVariableDeclaration(n.parent))) {
          locals.set(local, n);
        }
        return;
      }
      ts.forEachChild(n, collectLocals);
    };
    ts.forEachChild(fn.body, collectLocals);

    const visitedLocals = new Set();
    // Walks a render context: everything that runs when this context runs.
    const walk = (node, ctx) => {
      if (node !== ctx.root && isFn(node)) {
        // A nested function runs during render only as a render-hook callback.
        const call = node.parent;
        if (call && ts.isCallExpression(call)) {
          const hook = calleeName(call);
          const idx = call.arguments.indexOf(node);
          if (hook && RENDER_HOOK_ARGS[hook]?.includes(idx)) {
            walkFn(node, `${hook}(cb)`);
          }
        }
        return;
      }
      if (ts.isBinaryExpression(node) && ASSIGN_OPS.has(node.operatorToken.kind)) {
        const target = refTarget(node.left);
        if (target != null) {
          const op = node.operatorToken.getText();
          if (op !== '??=' && !isLazyInit(node, target)) {
            const {line} = sf.getLineAndCharacterOfPosition(node.getStart());
            hits.push({line: line + 1, target, op, render: name, ctx: ctx.label});
          }
        }
      }
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        const local = locals.get(node.expression.text);
        if (local && !visitedLocals.has(local)) {
          visitedLocals.add(local);
          walkFn(local, `local ${node.expression.text}()`);
        }
      }
      ts.forEachChild(node, child => walk(child, ctx));
    };
    const walkFn = (f, label) => {
      if (!f.body) return;
      const ctx = {root: f, label};
      if (ts.isBlock(f.body)) {
        ts.forEachChild(f.body, child => walk(child, ctx));
      } else {
        walk(f.body, ctx);
      }
    };
    walkFn(fn, 'body');
  }
  // De-duplicate (a local reached from two render fns).
  const seen = new Set();
  return hits.filter(h => {
    const k = `${h.line}|${h.target}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const files = [];
for (const pkg of ['packages/core/src', 'packages/lab/src']) {
  walkFiles(path.join(root, pkg), files);
}
const out = [];
for (const file of files.sort()) {
  const rel = path.relative(path.join(root, 'packages'), file).replace('/src/', '/');
  for (const h of scanFile(file)) {
    out.push({file: rel, ...h, ref: h.target.replace(/^.*\./, '')});
  }
}
process.stdout.write(JSON.stringify({files: files.length, hits: out}, null, 1));
