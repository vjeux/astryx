// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: move useMenuPress to its ref form
 *
 * `useMenuPress({menuRef, ...options})` becomes
 * `useMenuPress(menuRef, {...options})`. The ref form listens on the menu and
 * the trigger itself. So the spreads of the old return's `menuProps` and
 * `triggerProps` go. A trigger that got the press only through its spread
 * gets `triggerRef` from its `ref`. In a DropdownMenu trigger render
 * function, plain forwards of the deprecated `onPointerDown` and
 * `onContextMenu` go too, where the same element takes the trigger's ref.
 *
 * Where it cannot prove the result, it leaves the code unchanged with a TODO.
 * That covers options that are not an object literal or that spread, and a
 * return used other than through those spreads, `isTriggerClickFromPress`
 * and `cancel`. It also covers a spread on an element whose `ref` is not
 * the menu's or the trigger's. So does a trigger handler used other than as a
 * plain forward. The deprecated forms keep working there. Comments are the
 * codemod's only report channel. Each is added once, so a second run changes
 * nothing.
 */

export const meta = {
  title: 'Move useMenuPress to its ref form',
  description:
    'Rewrites `useMenuPress({menuRef, ...options})` to ' +
    '`useMenuPress(menuRef, {...options})` and removes the spreads of its ' +
    '`menuProps` and `triggerProps`, which the ref form does not return. ' +
    "Removes plain forwards of a DropdownMenu trigger's deprecated " +
    '`onPointerDown` and `onContextMenu`. Leaves a TODO where it cannot ' +
    'prove the result; the deprecated forms still work there.',
};

const HOOK = 'useMenuPress';
const DROPDOWN = 'DropdownMenu';
const TRIGGER_PROPS_TYPE = 'DropdownMenuTriggerProps';
const CORE_IMPORT_RE = /^@(astryxdesign|xds)\/core(?:\/|$)/;
const TRIGGER_HANDLERS = new Set(['onPointerDown', 'onContextMenu']);
const KEPT_RETURN_KEYS = new Set(['isTriggerClickFromPress', 'cancel']);
const SPREAD_KEYS = new Set(['menuProps', 'triggerProps']);

const CALL_COMMENT =
  ' TODO(astryx upgrade): useMenuPress({menuRef, ...}) is deprecated. Call ' +
  'useMenuPress(menuRef, options) instead, pass triggerRef, and remove the ' +
  'menuProps and triggerProps spreads; this call could not be rewritten ' +
  'safely, so it was left unchanged. ';
const TRIGGER_COMMENT =
  " TODO(astryx upgrade): the trigger props' onPointerDown and onContextMenu " +
  'are deprecated, because the menu listens on its trigger itself. Remove ' +
  "these forwards and give the element the trigger props' ref; this use " +
  'could not be rewritten safely, so it was left unchanged. ';

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

/** @param {any} property */
function isPlainProperty(property) {
  return (
    (property.type === 'ObjectProperty' || property.type === 'Property') &&
    property.kind !== 'get' &&
    property.kind !== 'set' &&
    property.method !== true
  );
}

/** The static name of a property's key, or null. @param {any} property */
function keyName(property) {
  if (property.computed) {
    return null;
  }
  const key = property.key;
  if (key.type === 'Identifier') {
    return key.name;
  }
  if (
    (key.type === 'StringLiteral' || key.type === 'Literal') &&
    typeof key.value === 'string'
  ) {
    return key.value;
  }
  return null;
}

/** The imported name of a specifier. @param {any} specifier */
function importedName(specifier) {
  return specifier.imported.name ?? specifier.imported.value;
}

/** @param {any} attribute */
function attributeExpression(attribute) {
  return attribute?.value?.type === 'JSXExpressionContainer'
    ? attribute.value.expression
    : null;
}

/** @param {any} opening @param {string} name */
function findAttribute(opening, name) {
  return (
    opening.attributes.find(
      (/** @type {any} */ attribute) =>
        attribute.type === 'JSXAttribute' &&
        attribute.name.type === 'JSXIdentifier' &&
        attribute.name.name === name,
    ) ?? null
  );
}

/** Source text with whitespace removed, to compare two refs. */
function sourceOf(/** @type {any} */ j, /** @type {any} */ node) {
  return j(node).toSource().replace(/\s+/g, '');
}

/**
 * A name, or a property chain on one with no call and no computed key other
 * than a literal: safe to read twice.
 * @param {any} node
 * @returns {boolean}
 */
function isCallFreeChain(node) {
  const value = unwrap(node);
  if (value == null) {
    return false;
  }
  if (value.type === 'Identifier' || value.type === 'ThisExpression') {
    return true;
  }
  if (value.type === 'MemberExpression') {
    const key = value.property;
    const literalKey =
      !value.computed ||
      key.type === 'StringLiteral' ||
      key.type === 'NumericLiteral' ||
      key.type === 'Literal';
    return (
      literalKey && value.optional !== true && isCallFreeChain(value.object)
    );
  }
  return false;
}

/** A fresh copy of a call-free chain. @param {any} j @param {any} node */
function cloneChain(j, node) {
  const value = unwrap(node);
  if (value.type === 'Identifier') {
    return j.identifier(value.name);
  }
  if (value.type === 'ThisExpression') {
    return j.thisExpression();
  }
  const property = value.computed
    ? j.literal(value.property.value)
    : j.identifier(value.property.name);
  return j.memberExpression(
    cloneChain(j, value.object),
    property,
    value.computed,
  );
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
 * Whether an identifier reads its binding, as opposed to naming a property
 * or a type.
 * @param {any} path
 */
function isReference(path) {
  const parent = path.parent?.node;
  const node = path.node;
  if (parent == null) {
    return true;
  }
  if (node.type === 'JSXIdentifier') {
    // A JSX attribute's name is no read; a component's name is.
    return parent.type === 'JSXMemberExpression'
      ? parent.object === node
      : parent.type === 'JSXOpeningElement';
  }
  if (
    (parent.type === 'MemberExpression' ||
      parent.type === 'OptionalMemberExpression') &&
    parent.property === node &&
    !parent.computed
  ) {
    return false;
  }
  // A shorthand property reads its name in an object, but its key only names
  // the property in a pattern.
  if (
    (parent.type === 'ObjectProperty' || parent.type === 'Property') &&
    parent.key === node &&
    !parent.computed &&
    (parent.shorthand !== true ||
      path.parent.parent?.node.type === 'ObjectPattern')
  ) {
    return false;
  }
  if (
    (parent.type === 'ObjectMethod' ||
      parent.type === 'ClassProperty' ||
      parent.type === 'ClassMethod' ||
      parent.type === 'TSPropertySignature') &&
    parent.key === node &&
    !parent.computed
  ) {
    return false;
  }
  return !(
    parent.type === 'TSQualifiedName' ||
    parent.type === 'TSTypeReference' ||
    parent.type === 'LabeledStatement' ||
    parent.type === 'BreakStatement' ||
    parent.type === 'ContinueStatement'
  );
}

/** Whether an identifier declares a binding. @param {any} path */
function isBinding(path) {
  const parent = path.parent?.node;
  const node = path.node;
  if (parent == null) {
    return false;
  }
  switch (parent.type) {
    case 'VariableDeclarator':
      return parent.id === node;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'ArrowFunctionExpression':
    case 'ClassDeclaration':
      return parent.id === node || parent.params?.includes(node) === true;
    case 'AssignmentPattern':
      return parent.left === node;
    case 'RestElement':
      return parent.argument === node;
    case 'ArrayPattern':
      return parent.elements.includes(node);
    case 'CatchClause':
      return parent.param === node;
    case 'ObjectProperty':
    case 'Property':
      return (
        parent.value === node &&
        path.parent.parent?.node.type === 'ObjectPattern'
      );
    case 'ImportSpecifier':
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
      return parent.local === node;
    default:
      return false;
  }
}

/** Whether `name` is bound again inside `scope`, besides `binding`. */
function isRedeclared(
  /** @type {any} */ j,
  /** @type {any} */ scope,
  /** @type {string} */ name,
  /** @type {any} */ binding,
) {
  return (
    j(scope)
      .find(j.Identifier, {name})
      .filter(
        (/** @type {any} */ path) => path.node !== binding && isBinding(path),
      )
      .size() > 0
  );
}

/**
 * The spreads of the old return's `menuProps` and `triggerProps`, and the
 * edits that drop them, or null when another use keeps the call unproven.
 * @param {any} j @param {any} root @param {any} callPath
 * @param {any} menuRef @param {any} triggerRef
 */
function planReturnUses(j, root, callPath, menuRef, triggerRef) {
  const parent = callPath.parent.node;
  /** @type {{removals: Array<() => void>, triggerRef: any}} */
  const plan = {removals: [], triggerRef: null};
  if (parent.type === 'ExpressionStatement') {
    return plan;
  }
  if (parent.type !== 'VariableDeclarator' || parent.init !== callPath.node) {
    return null;
  }
  const functions = j(callPath).closest(j.Function);
  const scope =
    functions.size() > 0
      ? functions.paths()[0]
      : root.find(j.Program).paths()[0];
  /** @type {{menuProps: any[], triggerProps: any[]}} */
  const spreads = {menuProps: [], triggerProps: []};

  if (parent.id.type === 'Identifier') {
    const name = parent.id.name;
    if (isRedeclared(j, scope, name, parent.id)) {
      return null;
    }
    let isProven = true;
    j(scope)
      .find(j.Identifier, {name})
      .forEach((/** @type {any} */ path) => {
        if (!isProven || path.node === parent.id || !isReference(path)) {
          return;
        }
        const member = path.parent.node;
        if (
          member.type !== 'MemberExpression' ||
          member.object !== path.node ||
          member.computed
        ) {
          isProven = false;
          return;
        }
        const key = member.property.name;
        if (KEPT_RETURN_KEYS.has(key)) {
          return;
        }
        const spread = path.parent.parent;
        if (
          !SPREAD_KEYS.has(key) ||
          spread?.node.type !== 'JSXSpreadAttribute' ||
          spread.node.argument !== member
        ) {
          isProven = false;
          return;
        }
        spreads[/** @type {'menuProps' | 'triggerProps'} */ (key)].push(spread);
      });
    if (!isProven) {
      return null;
    }
  } else if (parent.id.type === 'ObjectPattern') {
    const pattern = parent.id;
    /** @type {any[]} */
    const kept = [];
    for (const property of pattern.properties) {
      if (!isPlainProperty(property)) {
        return null;
      }
      const key = keyName(property);
      if (key != null && KEPT_RETURN_KEYS.has(key)) {
        kept.push(property);
        continue;
      }
      if (key == null || !SPREAD_KEYS.has(key)) {
        return null;
      }
      const local = property.value;
      if (
        local.type !== 'Identifier' ||
        isRedeclared(j, scope, local.name, local)
      ) {
        return null;
      }
      let isProven = true;
      j(scope)
        .find(j.Identifier, {name: local.name})
        .forEach((/** @type {any} */ path) => {
          if (!isProven || path.node === local || !isReference(path)) {
            return;
          }
          if (path.parent.node.type !== 'JSXSpreadAttribute') {
            isProven = false;
            return;
          }
          spreads[/** @type {'menuProps' | 'triggerProps'} */ (key)].push(
            path.parent,
          );
        });
      if (!isProven) {
        return null;
      }
    }
    const declaration = callPath.parent.parent;
    plan.removals.push(() => {
      if (kept.length > 0 || declaration.node.declarations.length > 1) {
        pattern.properties = kept;
        return;
      }
      j(declaration).replaceWith(j.expressionStatement(callPath.node));
    });
  } else {
    return null;
  }

  const menuSource = sourceOf(j, menuRef);
  for (const spread of spreads.menuProps) {
    const ref = attributeExpression(findAttribute(spread.parent.node, 'ref'));
    if (ref == null || sourceOf(j, ref) !== menuSource) {
      return null;
    }
  }
  let triggerSource = triggerRef == null ? null : sourceOf(j, triggerRef);
  for (const spread of spreads.triggerProps) {
    const ref = attributeExpression(findAttribute(spread.parent.node, 'ref'));
    if (ref == null) {
      return null;
    }
    if (triggerSource == null) {
      if (!isCallFreeChain(ref)) {
        return null;
      }
      plan.triggerRef = cloneChain(j, ref);
      triggerSource = sourceOf(j, ref);
    } else if (sourceOf(j, ref) !== triggerSource) {
      return null;
    }
  }
  for (const spread of [...spreads.menuProps, ...spreads.triggerProps]) {
    plan.removals.push(() => j(spread).remove());
  }
  return plan;
}

/**
 * Whether a JSX element takes the trigger props' ref: it spreads one of
 * `spreadNames`, or its `ref` reads one of `refSources`.
 * @param {any} j @param {any} opening
 * @param {string[]} spreadNames @param {string[]} refSources
 */
function takesTriggerRef(j, opening, spreadNames, refSources) {
  return opening.attributes.some((/** @type {any} */ attribute) => {
    if (attribute.type === 'JSXSpreadAttribute') {
      const argument = unwrap(attribute.argument);
      return (
        argument?.type === 'Identifier' && spreadNames.includes(argument.name)
      );
    }
    if (attribute.name?.name !== 'ref') {
      return false;
    }
    const ref = attributeExpression(attribute);
    return ref != null && refSources.includes(sourceOf(j, ref));
  });
}

/**
 * The JSX attribute a reference is the whole value of, when its name is
 * `name`, or null.
 * @param {any} path @param {string} name
 */
function forwardingAttribute(path, name) {
  const container = path.parent;
  const attribute = container?.parent;
  if (
    container?.node.type !== 'JSXExpressionContainer' ||
    attribute?.node.type !== 'JSXAttribute' ||
    attribute.node.name.name !== name
  ) {
    return null;
  }
  return attribute;
}

/**
 * Drops plain forwards of the deprecated trigger handlers in one trigger
 * render function. Returns 'changed', 'unproven' or 'none'.
 * @param {any} j @param {any} fnPath
 */
function migrateTriggerFunction(j, fnPath) {
  const param = fnPath.node.params[0];
  const body = j(fnPath.get('body'));
  /** @type {any[]} */
  const forwards = [];
  if (param?.type === 'Identifier') {
    let isProven = true;
    body
      .find(j.MemberExpression, {
        object: {type: 'Identifier', name: param.name},
      })
      .forEach((/** @type {any} */ path) => {
        const member = path.node;
        if (
          !isProven ||
          member.computed ||
          !TRIGGER_HANDLERS.has(member.property.name)
        ) {
          return;
        }
        const attribute = forwardingAttribute(path, member.property.name);
        if (
          attribute == null ||
          !takesTriggerRef(
            j,
            attribute.parent.node,
            [param.name],
            [`${param.name}.ref`],
          )
        ) {
          isProven = false;
          return;
        }
        forwards.push(attribute);
      });
    if (!isProven) {
      return 'unproven';
    }
    forwards.forEach(attribute => j(attribute).remove());
    return forwards.length > 0 ? 'changed' : 'none';
  }
  if (param?.type !== 'ObjectPattern') {
    return 'none';
  }
  /** @type {string[]} */
  const spreadNames = [];
  /** @type {string[]} */
  const refSources = [];
  /** @type {Array<{property: any, key: string, name: string}>} */
  const handlers = [];
  for (const property of param.properties) {
    if (property.type === 'RestElement') {
      if (property.argument.type === 'Identifier') {
        spreadNames.push(property.argument.name);
      }
      continue;
    }
    const key = isPlainProperty(property) ? keyName(property) : null;
    if (key === 'ref' && property.value.type === 'Identifier') {
      refSources.push(property.value.name);
    }
    if (key != null && TRIGGER_HANDLERS.has(key)) {
      if (property.value.type !== 'Identifier') {
        return 'unproven';
      }
      handlers.push({property, key, name: property.value.name});
    }
  }
  if (handlers.length === 0) {
    return 'none';
  }
  for (const handler of handlers) {
    let isProven = true;
    body
      .find(j.Identifier, {name: handler.name})
      .forEach((/** @type {any} */ path) => {
        if (!isProven || !isReference(path)) {
          return;
        }
        const attribute = forwardingAttribute(path, handler.key);
        if (
          attribute == null ||
          !takesTriggerRef(j, attribute.parent.node, spreadNames, refSources)
        ) {
          isProven = false;
          return;
        }
        forwards.push(attribute);
      });
    if (!isProven) {
      return 'unproven';
    }
  }
  forwards.forEach(attribute => j(attribute).remove());
  param.properties = param.properties.filter(
    (/** @type {any} */ property) =>
      !handlers.some(handler => handler.property === property),
  );
  return 'changed';
}

/** @param {any} file @param {any} api */
export default function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  /** @type {Set<string>} */
  const hookNames = new Set();
  /** @type {Set<string>} */
  const dropdownNames = new Set();
  /** @type {Set<string>} */
  const triggerTypeNames = new Set();
  /** @type {Set<string>} */
  const namespaces = new Set();
  root.find(j.ImportDeclaration).forEach((/** @type {any} */ path) => {
    const source = path.node.source.value;
    if (typeof source !== 'string' || !CORE_IMPORT_RE.test(source)) {
      return;
    }
    for (const specifier of path.node.specifiers ?? []) {
      if (specifier.type === 'ImportNamespaceSpecifier') {
        namespaces.add(specifier.local.name);
      } else if (specifier.type === 'ImportSpecifier') {
        const imported = importedName(specifier);
        const isTypeOnly =
          path.node.importKind === 'type' || specifier.importKind === 'type';
        if (imported === TRIGGER_PROPS_TYPE) {
          triggerTypeNames.add(specifier.local.name);
        } else if (!isTypeOnly && imported === HOOK) {
          hookNames.add(specifier.local.name);
        } else if (!isTypeOnly && imported === DROPDOWN) {
          dropdownNames.add(specifier.local.name);
        }
      }
    }
  });
  /** @param {any} node @param {Set<string>} names @param {string} exported */
  const resolves = (node, names, exported) =>
    (node.type === 'Identifier' && names.has(node.name)) ||
    (node.type === 'JSXIdentifier' && names.has(node.name)) ||
    ((node.type === 'MemberExpression' ||
      node.type === 'JSXMemberExpression') &&
      !node.computed &&
      (node.object.type === 'Identifier' ||
        node.object.type === 'JSXIdentifier') &&
      namespaces.has(node.object.name) &&
      node.property.name === exported);

  let changed = false;
  /** @param {any} path @param {string} text */
  const report = (path, text) => {
    const statement = j(path).closest(j.Statement);
    const target = statement.size() > 0 ? statement.paths()[0].node : null;
    if (target != null && addComment(j, target, text)) {
      changed = true;
    }
  };

  root
    .find(j.CallExpression)
    .filter(
      (/** @type {any} */ path) =>
        path.node.arguments.length === 1 &&
        resolves(path.node.callee, hookNames, HOOK),
    )
    .forEach((/** @type {any} */ path) => {
      const options = unwrap(path.node.arguments[0]);
      if (options?.type !== 'ObjectExpression') {
        report(path, CALL_COMMENT);
        return;
      }
      let menuRef = null;
      let triggerRef = null;
      /** @type {any[]} */
      const rest = [];
      for (const property of options.properties) {
        const key = isPlainProperty(property) ? keyName(property) : null;
        if (key == null) {
          report(path, CALL_COMMENT);
          return;
        }
        if (key === 'menuRef') {
          menuRef = property.value;
          continue;
        }
        if (key === 'triggerRef') {
          triggerRef = property.value;
        }
        rest.push(property);
      }
      const plan =
        menuRef == null
          ? null
          : planReturnUses(j, root, path, menuRef, triggerRef);
      if (plan == null) {
        report(path, CALL_COMMENT);
        return;
      }
      if (plan.triggerRef != null) {
        rest.push(
          j.objectProperty(j.identifier('triggerRef'), plan.triggerRef),
        );
      }
      path.node.arguments = [menuRef, j.objectExpression(rest)];
      plan.removals.forEach(remove => remove());
      changed = true;
    });

  /** @type {Set<any>} */
  const triggerFunctions = new Set();
  root.find(j.JSXAttribute).forEach((/** @type {any} */ path) => {
    if (
      path.node.name.name !== 'renderTrigger' ||
      !resolves(path.parent.node.name, dropdownNames, DROPDOWN)
    ) {
      return;
    }
    const value = unwrap(attributeExpression(path.node));
    if (
      value?.type === 'ArrowFunctionExpression' ||
      value?.type === 'FunctionExpression'
    ) {
      triggerFunctions.add(value);
    }
  });
  root.find(j.Function).forEach((/** @type {any} */ path) => {
    const annotation = path.node.params[0]?.typeAnnotation?.typeAnnotation;
    if (
      annotation?.type === 'TSTypeReference' &&
      annotation.typeName.type === 'Identifier' &&
      triggerTypeNames.has(annotation.typeName.name)
    ) {
      triggerFunctions.add(path.node);
    }
  });
  root
    .find(j.Function)
    .filter((/** @type {any} */ path) => triggerFunctions.has(path.node))
    .forEach((/** @type {any} */ path) => {
      const outcome = migrateTriggerFunction(j, path);
      if (outcome === 'changed') {
        changed = true;
      } else if (outcome === 'unproven') {
        report(path, TRIGGER_COMMENT);
      }
    });

  return changed ? root.toSource() : null;
}
