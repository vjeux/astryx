// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ReorderableAttach.stories.tsx
 * @input createReorderable and plain elements laid out by the story
 * @output createReorderable's attach on plain elements laid out by CSS (a row
 *   of cards, cards that wrap, a column of rows and the row in a dialog), and
 *   a fanned hand whose slots positions() gives
 * @position Storybook demonstrations for createReorderable consumers
 */

import {useEffect, useMemo, useRef, useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {Meta, StoryObj} from '@storybook/react';
import {createReorderable} from '@astryxdesign/core';
import {colorVars, radiusVars} from '@astryxdesign/core/theme/tokens.stylex';

const meta: Meta = {
  title: 'Core/createReorderable',
  parameters: {layout: 'centered'},
};

export default meta;
type Story = StoryObj;

/**
 * A fanned hand: five slots on an arc of radius 160 around (220, 230), 12°
 * apart, each card turned to its slot's angle.
 */
const FAN = [-24, -12, 0, 12, 24].map(angle => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.round(220 + 160 * Math.sin(radians)),
    y: Math.round(230 - 160 * Math.cos(radians)),
    angle,
  };
});

function moveKey(
  keys: ReadonlyArray<string>,
  key: unknown,
  to: number,
): string[] {
  const next = keys.filter(each => each !== key);
  next.splice(to, 0, key as string);
  return next;
}

const styles = stylex.create({
  dialog: {
    padding: 24,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
    borderRadius: radiusVars['--radius-container'],
    backgroundColor: colorVars['--color-background-surface'],
    color: colorVars['--color-text-primary'],
  },
  table: {
    position: 'relative',
  },
  // A row of five 72 x 96 cards, 88 px apart: each card's centre, its slot,
  // is 44 + 88 × its index across and 56 down.
  rowTable: {
    display: 'flex',
    gap: 16,
    padding: 8,
    boxSizing: 'border-box',
    inlineSize: 88 * 5,
    blockSize: 112,
  },
  // The fanned hand: each card placed on its slot, which positions() gives.
  fanTable: {
    inlineSize: 88 * 5,
    blockSize: 160,
  },
  // Cards that wrap, three to a row.
  wrapTable: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    inlineSize: 72 * 3 + 16 * 2,
    blockSize: 'auto',
  },
  rows: {
    display: 'flex',
    flexDirection: 'column',
    inlineSize: 280,
    margin: 0,
    padding: 0,
  },
  row: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    blockSize: 44,
    paddingInlineStart: 40,
    borderBlockEndWidth: 1,
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: colorVars['--color-border'],
    color: colorVars['--color-text-primary'],
  },
  card: {
    position: 'relative',
    flexShrink: 0,
    boxSizing: 'border-box',
    inlineSize: 72,
    blockSize: 96,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVars['--radius-container'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
    backgroundColor: colorVars['--color-background-card'],
    color: colorVars['--color-text-primary'],
    fontSize: 24,
  },
  slot: (x: number, y: number, angle: number) => ({
    position: 'absolute',
    insetInlineStart: x - 36,
    top: y - 48,
    rotate: `${angle}deg`,
  }),
  // At the card's top-left corner, the part of each card a fanned hand
  // leaves showing.
  grip: {
    position: 'absolute',
    top: 4,
    insetInlineStart: 4,
    inlineSize: 28,
    blockSize: 20,
    borderRadius: 4,
    color: colorVars['--color-icon-secondary'],
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'center',
    cursor: 'grab',
  },
});

/**
 * Plain elements reordered through `reorderable.attach`: each card's grip is
 * its handle, and the cards' measured places are their slots, or `positions()`
 * gives them (spec:AST-103 FR1, FR4b).
 */
function AttachedCards({
  layout = 'row',
  slots,
  rendersAnew = false,
}: {
  /** One row of five, or cards that wrap three to a row. */
  layout?: 'row' | 'wrap';
  /** Each card's slot, given through `positions()`, which places the cards. */
  slots?: ReadonlyArray<{x: number; y: number; angle: number}>;
  /** Each move renders every card anew: new elements, the same keys. */
  rendersAnew?: boolean;
}) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState(['A', 'K', 'Q', 'J', '10']);
  const [moves, setMoves] = useState(0);
  const reorderable = useMemo(
    () =>
      createReorderable<string>({
        onReorder: ({key, to}) => {
          setMoves(count => count + 1);
          setCards(current => moveKey(current, key, to));
        },
        positions: slots == null ? undefined : () => slots,
      }),
    [slots],
  );
  // External system: the attached reorder on the table's plain elements,
  // destroyed on unmount.
  useEffect(() => {
    const table = tableRef.current;
    if (table == null) {
      return undefined;
    }
    const {destroy} = reorderable.attach(table, {
      items: () =>
        Array.from(table.querySelectorAll<HTMLElement>('[data-card]')).map(
          element => ({
            key: element.dataset.card,
            element,
            handle:
              element.querySelector<HTMLElement>('[data-grip]') ?? element,
          }),
        ),
    });
    return destroy;
  }, [reorderable]);
  return (
    <div
      ref={tableRef}
      data-moves={moves}
      {...stylex.props(
        styles.table,
        slots != null
          ? styles.fanTable
          : layout === 'row'
            ? styles.rowTable
            : styles.wrapTable,
      )}>
      {cards.map((card, index) => (
        <div
          key={rendersAnew ? `${card}:${moves}` : card}
          data-card={card}
          aria-label={`Card ${card}`}
          {...stylex.props(
            styles.card,
            slots != null &&
              styles.slot(slots[index].x, slots[index].y, slots[index].angle),
          )}>
          <span>{card}</span>
          <span data-grip="" {...stylex.props(styles.grip)}>
            ⋮⋮
          </span>
        </div>
      ))}
    </div>
  );
}

export const AttachedCardsInARow: Story = {
  render: () => <AttachedCards />,
  parameters: {
    docs: {
      description: {
        story:
          'Plain elements reorder through `reorderable.attach(container, ' +
          '{items})`, with no collection component: each card’s grip is its ' +
          'handle, and the cards’ measured places are their slots. Drag a ' +
          'grip (on a touch screen, hold it first), or activate it and use ' +
          'the arrow keys.',
      },
    },
  },
};

export const AttachedCardsInAFan: Story = {
  render: () => <AttachedCards slots={FAN} />,
  parameters: {
    docs: {
      description: {
        story:
          'A fanned hand: `positions()` gives each card a slot on an arc, and ' +
          'a dragged card drops on the slot whose centre is nearest its own.',
      },
    },
  },
};

export const AttachedCardsRenderedAnew: Story = {
  render: () => <AttachedCards rendersAnew />,
  parameters: {
    docs: {
      description: {
        story:
          'An app that renders every card anew on each move (new elements, ' +
          'the same keys): reorder mode and the focus stay on the moved ' +
          'card’s grip.',
      },
    },
  },
};

export const AttachedCardsWrapping: Story = {
  render: () => <AttachedCards layout="wrap" />,
  parameters: {
    docs: {
      description: {
        story:
          'Cards that wrap by CSS: their measured places are the slots a ' +
          'drag drops on, and the arrow keys follow their rows and columns.',
      },
    },
  },
};

/** A column of plain rows reordered through attach. */
function AttachedRows() {
  const listRef = useRef<HTMLUListElement>(null);
  const [rows, setRows] = useState(['Inbox', 'Sent', 'Drafts', 'Archive']);
  const [moves, setMoves] = useState(0);
  const reorderable = useMemo(
    () =>
      createReorderable<string>({
        onReorder: ({key, to}) => {
          setMoves(count => count + 1);
          setRows(current => moveKey(current, key, to));
        },
      }),
    [],
  );
  // External system: the attached reorder on the list's plain rows,
  // destroyed on unmount.
  useEffect(() => {
    const list = listRef.current;
    if (list == null) {
      return undefined;
    }
    const {destroy} = reorderable.attach(list, {
      items: () =>
        Array.from(list.querySelectorAll<HTMLElement>('[data-row]')).map(
          element => ({
            key: element.dataset.row,
            element,
            handle:
              element.querySelector<HTMLElement>('[data-grip]') ?? element,
          }),
        ),
    });
    return destroy;
  }, [reorderable]);
  return (
    <ul ref={listRef} data-moves={moves} {...stylex.props(styles.rows)}>
      {rows.map(row => (
        <li key={row} data-row={row} {...stylex.props(styles.row)}>
          <span data-grip="" {...stylex.props(styles.grip)}>
            ⋮⋮
          </span>
          {row}
        </li>
      ))}
    </ul>
  );
}

export const AttachedRowsInAColumn: Story = {
  render: () => <AttachedRows />,
  parameters: {
    docs: {
      description: {
        story:
          'A column of plain rows: a drag shows the same insertion line a ' +
          'List does, at the gap where the row would land.',
      },
    },
  },
};

/**
 * The row of cards inside a native modal dialog, attached while the dialog
 * is still closed: its announcements reach the open dialog.
 */
function AttachedCardsInDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        Open the hand
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Your hand"
        {...stylex.props(styles.dialog)}>
        <AttachedCards />
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  );
}

export const AttachedCardsInADialog: Story = {
  render: () => <AttachedCardsInDialog />,
  parameters: {
    docs: {
      description: {
        story:
          'The cards are attached while their modal dialog is closed; once ' +
          'it opens, a move is announced inside the dialog, where a screen ' +
          'reader still reads.',
      },
    },
  },
};
