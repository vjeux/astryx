// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {Meta, StoryObj} from '@storybook/react';
import {Button} from '@astryxdesign/core/Button';
import {TableCell, TableHeaderCell} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Layout';

/**
 * The touch press model on table rows whose whole box is a Button's tap
 * target. A table cell installs the measurement that places such a press, so
 * these stories live apart from the other press stories.
 */
const meta: Meta = {
  title: 'Core/Press feedback in tables (touch)',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Table rows whose whole box is a Button's tap target. View with a coarse pointer (DevTools device toolbar, or a phone). A press on the Button tints the Button, and a press elsewhere on the row tints the row.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Each row is positioned, so it is the containing block of its Button's
 * `::after`. The Button stays static and has no transform. It sits in a row
 * header or in a data cell, and the last row holds a row of its own inside its
 * cell.
 */
const styles = stylex.create({
  table: {
    borderCollapse: 'collapse',
  },
  row: {
    position: 'relative',
  },
  ownRow: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  button: {
    position: 'static',
    transform: 'none',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
    },
  },
});

export const ButtonCoveringItsTableRow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Table rows whose whole box is a Button's tap target: each row is positioned, so the Button's `::after` covers the row. The Button sits in a row header, in a data cell, or in a row of its own inside a cell. A press on the Button tints the Button, and a press elsewhere on the row tints the row.",
      },
    },
  },
  render: () => {
    const [opened, setOpened] = useState('none');
    return (
      <VStack gap={3}>
        <table {...stylex.props(styles.table)}>
          <tbody>
            <tr {...stylex.props(styles.row)}>
              <TableHeaderCell scope="row">
                <Button
                  label="Open Ada"
                  variant="ghost"
                  xstyle={styles.button}
                  onClick={() => setOpened('Ada')}
                />
              </TableHeaderCell>
              <TableCell>Last message a minute ago</TableCell>
            </tr>
            <tr {...stylex.props(styles.row)}>
              <TableCell>
                <Button
                  label="Open Grace"
                  variant="ghost"
                  xstyle={styles.button}
                  onClick={() => setOpened('Grace')}
                />
              </TableCell>
              <TableCell>Last message an hour ago</TableCell>
            </tr>
            <tr>
              <TableCell colSpan={2}>
                <div {...stylex.props(styles.ownRow)}>
                  <Button
                    label="Open Alan"
                    variant="ghost"
                    xstyle={styles.button}
                    onClick={() => setOpened('Alan')}
                  />
                  <Text>Last message yesterday</Text>
                </div>
              </TableCell>
            </tr>
          </tbody>
        </table>
        <Text>Opened: {opened}</Text>
      </VStack>
    );
  },
};
