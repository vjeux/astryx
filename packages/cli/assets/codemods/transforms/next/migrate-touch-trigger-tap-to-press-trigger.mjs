// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: migrate touchTrigger="tap" to pressTrigger="toggle"
 *
 * DEP-0016 (`component:Tooltip` and `component:HoverCard` DEC-1): the
 * deprecated `touchTrigger="tap"` on `Tooltip` and `HoverCard`, and
 * `touchTrigger: 'tap'` in a `useTooltip` or `useHoverCard` options object,
 * become `pressTrigger="toggle"` / `pressTrigger: 'toggle'`. A tap still opens
 * the layer, and a click, Enter, or Space on a button trigger now pins it too;
 * a trigger that is not a button keeps tap-only opening. A static
 * `touchTrigger="auto"`, the default, is removed. Beside a static
 * `pressTrigger="toggle"`, which wins, any `touchTrigger` is removed.
 *
 * Built on the shared `transformProp` helper for JSX and the same import
 * resolution for the hooks, so it does not follow variables, helpers,
 * wrappers, or types. Where it cannot prove the result it keeps the old prop
 * and leaves a TODO instead of guessing: a computed `touchTrigger`, a
 * `touchTrigger` beside a `pressTrigger` that is not a static `toggle`, an
 * element or options object that also spreads props. `touchTrigger="none"`
 * is unchanged: it is not deprecated. Comments are the codemod's only report
 * channel, and each is added once, so a second run changes nothing.
 */

import {
  importedComponents,
  isModuleBinding,
  transformProp,
} from '../../transform-prop.mjs';

export const meta = {
  title: 'Migrate touchTrigger="tap" to pressTrigger="toggle"',
  description:
    'Replaces the deprecated `touchTrigger="tap"` on Tooltip and HoverCard, ' +
    "and `touchTrigger: 'tap'` in useTooltip and useHoverCard options, with " +
    '`pressTrigger="toggle"`, and removes a static `touchTrigger="auto"`. ' +
    'Leaves a TODO where the value is computed, where a pressTrigger other ' +
    'than a static toggle is also set, and where props are spread.',
};

const OLD_NAME = 'touchTrigger';
const NEW_NAME = 'pressTrigger';
const CORE_IMPORT_RE = /^@(astryxdesign|xds)\/core(?:\/|$)/;
const COMPONENT_PROPS = new Map([
  ['Tooltip', new Set([OLD_NAME])],
  ['HoverCard', new Set([OLD_NAME])],
]);
const HOOKS = new Map([
  ['useTooltip', new Set()],
  ['useHoverCard', new Set()],
]);

const VALUE_COMMENT =
  ' TODO(astryx upgrade): touchTrigger="tap" is deprecated (DEP-0016). ' +
  'This value is computed, so it was left unchanged: pass ' +
  'pressTrigger="toggle" where it is "tap", and drop touchTrigger where it ' +
  'is "auto". ';
const PRESS_COMMENT =
  ' TODO(astryx upgrade): touchTrigger="tap" is deprecated (DEP-0016), but ' +
  'a pressTrigger other than a static "toggle" is also set here, so it was ' +
  'left unchanged. Decide which one this layer needs by hand. ';
const SPREAD_COMMENT =
  ' TODO(astryx upgrade): touchTrigger="tap" is deprecated (DEP-0016), but ' +
  'props are also spread here and may set touchTrigger or pressTrigger, so ' +
  'it was left unchanged. Pass pressTrigger="toggle" by hand. ';

const TYPE_WRAPPERS = new Set([
  'TSAsExpression',
  'TSSatisfiesExpression',
  'TSTypeAssertion',
  'TSNonNullExpression',
  'TypeCastExpression',
  'ParenthesizedExpression',
]);

/** @param {any} node */
function unwrap(node) {
  let current = node;
  while (current && TYPE_WRAPPERS.has(current.type)) {
    current = current.expression;
  }
  return current;
}

/** The static string of a node, or null. @param {any} node */
function staticString(node) {
  const value = unwrap(node);
  if (
    value != null &&
    (value.type === 'StringLiteral' || value.type === 'Literal') &&
    typeof value.value === 'string'
  ) {
    return value.value;
  }
  if (
    value?.type === 'TemplateLiteral' &&
    value.expressions.length === 0 &&
    value.quasis.length === 1
  ) {
    return value.quasis[0].value.cooked;
  }
  return null;
}

/** @param {any} attribute */
function attributeValue(attribute) {
  return attribute.value?.type === 'JSXExpressionContainer'
    ? attribute.value.expression
    : attribute.value;
}

/** @param {any} j @param {any} node @param {string} text */
function addComment(j, node, text) {
  node.comments ??= [];
  if (node.comments.some((/** @type {any} */ c) => c.value === text)) {
    return false;
  }
  node.comments.push(j.commentBlock(text, true, false));
  return true;
}

/**
 * What to do with one `touchTrigger`, given its static value, the static
 * `pressTrigger` beside it (undefined when absent, null when computed), and
 * whether props are spread beside it.
 * @param {string | null} value
 * @param {string | null | undefined} press
 * @param {boolean} spreads
 * @returns {'rewrite' | 'remove' | 'keep' | 'value' | 'press' | 'spread'}
 */
function decide(value, press, spreads) {
  if (press === 'toggle') {
    return 'remove';
  }
  if (value === 'none') {
    return 'keep';
  }
  if (spreads) {
    return 'spread';
  }
  if (value == null) {
    return 'value';
  }
  if (press !== undefined) {
    return value === 'auto' ? 'remove' : 'press';
  }
  if (value === 'tap') {
    return 'rewrite';
  }
  if (value === 'auto') {
    return 'remove';
  }
  return 'keep';
}

/**
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodFile} file
 * @param {import('../../../../authoring/codemod/type').CodemodTransformApi} api
 * @returns {string | null | undefined}
 */
export default function transformer(file, api) {
  if (!file.source.includes(OLD_NAME)) {
    return undefined;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;
  const matchesImport = (/** @type {string} */ source) =>
    CORE_IMPORT_RE.test(source);

  // JSX: removals wait until the walk is done, so no attribute is skipped.
  /** @type {Array<{opening: any, attribute: any}>} */
  const removals = [];
  transformProp(
    root,
    j,
    {matchesImport, components: COMPONENT_PROPS},
    (/** @type {any} */ propPath) => {
      const opening = propPath.parent?.node;
      const attributes = opening?.attributes ?? [];
      const attribute = propPath.node;
      const spreads = attributes.some(
        (/** @type {any} */ a) => a.type === 'JSXSpreadAttribute',
      );
      const pressAttribute = attributes.find(
        (/** @type {any} */ a) =>
          a.type === 'JSXAttribute' && a.name?.name === NEW_NAME,
      );
      const press =
        pressAttribute == null
          ? undefined
          : staticString(attributeValue(pressAttribute));
      switch (decide(staticString(attributeValue(attribute)), press, spreads)) {
        case 'rewrite': {
          attribute.name.name = NEW_NAME;
          const value = attributeValue(attribute);
          const literal = unwrap(value);
          if (literal?.type === 'TemplateLiteral') {
            attribute.value = j.stringLiteral('toggle');
          } else {
            literal.value = 'toggle';
            if (literal.raw != null) {
              literal.raw = undefined;
            }
            if (literal.extra != null) {
              literal.extra = undefined;
            }
          }
          hasChanges = true;
          return;
        }
        case 'remove':
          removals.push({opening, attribute});
          return;
        case 'value':
          hasChanges = addComment(j, attribute, VALUE_COMMENT) || hasChanges;
          return;
        case 'press':
          hasChanges = addComment(j, attribute, PRESS_COMMENT) || hasChanges;
          return;
        case 'spread':
          hasChanges = addComment(j, attribute, SPREAD_COMMENT) || hasChanges;
          return;
        default:
      }
    },
  );
  for (const {opening, attribute} of removals) {
    opening.attributes = opening.attributes.filter(
      (/** @type {any} */ a) => a !== attribute,
    );
    hasChanges = true;
  }

  // useTooltip and useHoverCard: the options object written at the call.
  const hooks = importedComponents(root, j, {
    matchesImport,
    components: HOOKS,
  });
  if (hooks.direct.size > 0 || hooks.namespaces.size > 0) {
    root.find(j.CallExpression).forEach((/** @type {any} */ callPath) => {
      const callee = callPath.node.callee;
      const isHook =
        (callee.type === 'Identifier' &&
          hooks.direct.has(callee.name) &&
          isModuleBinding(callPath, callee.name)) ||
        (callee.type === 'MemberExpression' &&
          !callee.computed &&
          callee.object.type === 'Identifier' &&
          hooks.namespaces.has(callee.object.name) &&
          isModuleBinding(callPath, callee.object.name) &&
          HOOKS.has(callee.property.name));
      const options = unwrap(callPath.node.arguments[0]);
      if (!isHook || options?.type !== 'ObjectExpression') {
        return;
      }
      const properties = options.properties;
      const keyOf = (/** @type {any} */ p) =>
        (p.type === 'ObjectProperty' || p.type === 'Property') && !p.computed
          ? p.key.type === 'Identifier'
            ? p.key.name
            : staticString(p.key)
          : null;
      const touch = properties.find(
        (/** @type {any} */ p) => keyOf(p) === OLD_NAME,
      );
      if (touch == null) {
        return;
      }
      const pressProperty = properties.find(
        (/** @type {any} */ p) => keyOf(p) === NEW_NAME,
      );
      const press =
        pressProperty == null ? undefined : staticString(pressProperty.value);
      const spreads = properties.some(
        (/** @type {any} */ p) =>
          p.type === 'SpreadElement' || p.type === 'SpreadProperty',
      );
      switch (decide(staticString(touch.value), press, spreads)) {
        case 'rewrite':
          touch.key = j.identifier(NEW_NAME);
          touch.value = j.stringLiteral('toggle');
          if (touch.shorthand) {
            touch.shorthand = false;
          }
          hasChanges = true;
          return;
        case 'remove':
          options.properties = properties.filter(
            (/** @type {any} */ p) => p !== touch,
          );
          hasChanges = true;
          return;
        case 'value':
          hasChanges = addComment(j, touch, VALUE_COMMENT) || hasChanges;
          return;
        case 'press':
          hasChanges = addComment(j, touch, PRESS_COMMENT) || hasChanges;
          return;
        case 'spread':
          hasChanges = addComment(j, touch, SPREAD_COMMENT) || hasChanges;
          return;
        default:
      }
    });
  }

  if (!hasChanges) {
    return undefined;
  }
  return root.toSource({quote: 'single'});
}
