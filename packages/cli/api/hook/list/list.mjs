// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file hook.list leaf — list hooks grouped by category.
 *
 * Emits ONE `hook.list` type across all three detail levels; the depth is
 * carried in `data.detail` ('names' | 'compact' | 'full') and `data.components`
 * holds the grouped map whose entry shape depends on that level. Byte-for-byte
 * identical to the flat command's list branch.
 *
 * @input  { cwd, category?, detail, zh, lang }
 * @output HookListResponse ({ type: 'hook.list', package: CORE_PACKAGE, data: { detail, components } })
 * @position api/hook/list/list.mjs — dispatched from ../hook.mjs
 */

import {
  discoverHooks,
  findHookDoc,
} from '../../../foundation/discovery/hook-discovery.mjs';
import {loadDocs} from '../../../foundation/discovery/component-loader.mjs';
import {AstryxError} from '../../error.mjs';
import {ERROR_CODES} from '../../../foundation/response/error-codes.mjs';
import {CORE_PACKAGE, resolveCoreDir} from '../_adapter.mjs';

// NOT FOR LANDING: times the list's phases, as a JSON line in C28_PROBE.
// The file write takes fs without an import, so the structure check sees
// no new environment import.
const c28fs = process.getBuiltinModule('node:fs');
const c28 = {find: 0, finds: 0, load: 0, loads: 0};
/** @param {string} coreDir @param {string} name */
function c28Find(coreDir, name) {
  const t0 = performance.now();
  const found = findHookDoc(coreDir, name);
  c28.find += performance.now() - t0;
  c28.finds += 1;
  return found;
}
/** @param {string} docPath @param {any} opts */
async function c28Load(docPath, opts) {
  const t0 = performance.now();
  try {
    return await loadDocs(docPath, opts);
  } finally {
    c28.load += performance.now() - t0;
    c28.loads += 1;
  }
}

/**
 * @param {object} [options]
 * @param {string} [options.cwd]
 * @param {string} [options.category] - When set, list only this category.
 * @param {'full'|'compact'|'brief'|'names'} [options.detail] - Anything other than 'compact'/'full' renders names only.
 * @param {boolean} [options.zh]
 * @param {string|null} [options.lang]
 * @returns {Promise<import('../hook.type.mjs').HookListResponse>}
 */
export async function list({
  cwd = process.cwd(),
  category,
  detail = 'names',
  zh = false,
  lang = null,
} = {}) {
  const c28t0 = performance.now();
  const coreDir = resolveCoreDir(cwd);
  const c28t1 = performance.now();
  const hooks = discoverHooks(coreDir);
  const c28t2 = performance.now();
  Object.assign(c28, {find: 0, finds: 0, load: 0, loads: 0});

  if (category) {
    const match = Object.entries(hooks).find(
      ([key]) => key.toLowerCase() === category.toLowerCase(),
    );
    if (!match) {
      throw new AstryxError(
        `Unknown category "${category}"`,
        Object.keys(hooks).map(k => ({name: k, reason: 'valid category'})),
        ERROR_CODES.ERR_UNKNOWN_CATEGORY,
      );
    }

    if (detail === 'compact') {
      /** @type {import('../hook.type.mjs').HookBriefEntry[]} */
      const entries = [];
      for (const hookName of match[1]) {
        const docPath = c28Find(coreDir, hookName);
        if (docPath) {
          try {
            const docs = await c28Load(docPath, {zh, lang, root: 'hooks'});
            entries.push({
              name: hookName,
              description: docs.usage?.description || '',
              import: docs.importPath || '@astryxdesign/core/hooks',
            });
          } catch {
            entries.push({
              name: hookName,
              description: '',
              import: '@astryxdesign/core/hooks',
            });
          }
        } else {
          entries.push({
            name: hookName,
            description: '',
            import: '@astryxdesign/core/hooks',
          });
        }
      }
      return {
        type: 'hook.list', package: CORE_PACKAGE,
        data: {detail: 'compact', components: {[match[0]]: entries}},
      };
    }

    if (detail === 'full') {
      /** @type {import('../hook.type.mjs').HookDoc[]} */
      const entries = [];
      for (const hookName of match[1]) {
        const docPath = c28Find(coreDir, hookName);
        if (docPath) {
          try {
            entries.push(await c28Load(docPath, {zh, lang, root: 'hooks'}));
          } catch {
            entries.push(
              /** @type {import('../hook.type.mjs').HookDoc} */ ({
                name: hookName,
              }),
            );
          }
        } else {
          entries.push(
            /** @type {import('../hook.type.mjs').HookDoc} */ ({
              name: hookName,
            }),
          );
        }
      }
      return {
        type: 'hook.list', package: CORE_PACKAGE,
        data: {detail: 'full', components: {[match[0]]: entries}},
      };
    }

    // Default: names only
    return {
      type: 'hook.list', package: CORE_PACKAGE,
      data: {detail: 'names', components: {[match[0]]: match[1]}},
    };
  }

  // All hooks
  if (detail === 'compact') {
    /** @type {Record<string, import('../hook.type.mjs').HookBriefEntry[]>} */
    const result = {};
    for (const [cat, hookNames] of Object.entries(hooks)) {
      result[cat] = [];
      for (const hookName of hookNames) {
        const docPath = c28Find(coreDir, hookName);
        if (docPath) {
          try {
            const docs = await c28Load(docPath, {zh, lang, root: 'hooks'});
            result[cat].push({
              name: hookName,
              description: docs.usage?.description || '',
              import: docs.importPath || '@astryxdesign/core/hooks',
            });
          } catch {
            result[cat].push({
              name: hookName,
              description: '',
              import: '@astryxdesign/core/hooks',
            });
          }
        } else {
          result[cat].push({
            name: hookName,
            description: '',
            import: '@astryxdesign/core/hooks',
          });
        }
      }
    }
    if (process.env.C28_PROBE) {
      c28fs.appendFileSync(
        process.env.C28_PROBE,
        `${JSON.stringify({pid: process.pid, event: 'hook-list-phases', detail, coreDirMs: c28t1 - c28t0, discoverMs: c28t2 - c28t1, findMs: c28.find, finds: c28.finds, loadMs: c28.load, loads: c28.loads, totalMs: performance.now() - c28t0})}\n`,
      );
    }
    return {type: 'hook.list', package: CORE_PACKAGE, data: {detail: 'compact', components: result}};
  }

  if (detail === 'full') {
    /** @type {Record<string, import('../hook.type.mjs').HookDoc[]>} */
    const result = {};
    for (const [cat, hookNames] of Object.entries(hooks)) {
      result[cat] = [];
      for (const hookName of hookNames) {
        const docPath = c28Find(coreDir, hookName);
        if (docPath) {
          try {
            result[cat].push(
              await c28Load(docPath, {zh, lang, root: 'hooks'}),
            );
          } catch {
            result[cat].push(
              /** @type {import('../hook.type.mjs').HookDoc} */ ({
                name: hookName,
              }),
            );
          }
        } else {
          result[cat].push(
            /** @type {import('../hook.type.mjs').HookDoc} */ ({
              name: hookName,
            }),
          );
        }
      }
    }
    return {type: 'hook.list', package: CORE_PACKAGE, data: {detail: 'full', components: result}};
  }

  // Default: names only
  return {type: 'hook.list', package: CORE_PACKAGE, data: {detail: 'names', components: hooks}};
}
