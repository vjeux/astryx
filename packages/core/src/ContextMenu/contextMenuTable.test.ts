// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file contextMenuTable.test.ts
 * @input The context-menu constants table and the motion role registry
 * @output Checks that the hold's input timing, the commit and the menu's
 *   moment, are the table's only motion roles
 * @position Unit tests of packages/core/src/motion/uikit/contextMenu.ts
 */

import {describe, expect, it} from 'vitest';
import {listMotionRoles} from '../motion/roles';
import {
  contextMenu,
  registerContextMenuTable,
} from '../motion/uikit/contextMenu';

describe('the context-menu table', () => {
  it('registers the hold’s input timing as roles: the commit and the menu’s moment, and nothing else', () => {
    registerContextMenuTable();
    const roles = listMotionRoles()
      .filter(role => role.id.startsWith('contextMenu.'))
      .map(role => [role.id, role.kind]);
    expect(roles).toEqual([
      ['contextMenu.press.commitMs', 'duration'],
      ['contextMenu.press.menuDisplayMs', 'duration'],
    ]);
    expect(contextMenu.press.commitMs).toBe(400);
    expect(contextMenu.press.menuDisplayMs).toBe(735);
  });
});
