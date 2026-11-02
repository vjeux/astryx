// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ReorderableAttach.stories.tsx
 * @input createReorderable and plain elements laid out by the story
 * @output createReorderable's attach on plain elements laid out by CSS: a row
 *   of cards, cards that wrap, a column of rows and the row in a dialog, the
 *   row, the wrap and the column each with a Line | Shift toggle for the
 *   drag's feedback (spec:AST-103 FR9), on Line by default
 * @position Storybook demonstrations for createReorderable consumers
 */

import {useEffect, useMemo, useRef, useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {Meta, StoryObj} from '@storybook/react';
import {
  createReorderable,
  SegmentedControl,
  SegmentedControlItem,
} from '@astryxdesign/core';
import {colorVars, radiusVars} from '@astryxdesign/core/theme/tokens.stylex';

const meta: Meta = {
  title: 'Core/createReorderable',
  parameters: {layout: 'centered'},
};

export default meta;
type Story = StoryObj;

function moveKey(
  keys: ReadonlyArray<string>,
  key: unknown,
  to: number,
): string[] {
  const next = keys.filter(each => each !== key);
  next.splice(to, 0, key as string);
  return next;
}

type Feedback = 'insertion-line' | 'shift';

/**
 * The drag's feedback: Line, the default, or Shift, where the other items
 * slide aside to open the gap (spec:AST-103 FR9).
 */
function FeedbackToggle({
  value,
  onChange,
}: {
  value: Feedback;
  onChange: (value: Feedback) => void;
}) {
  return (
    <SegmentedControl
      label="Drag feedback"
      size="sm"
      value={value}
      onChange={next =>
        onChange(next === 'shift' ? 'shift' : 'insertion-line')
      }>
      <SegmentedControlItem value="insertion-line" label="Line" />
      <SegmentedControlItem value="shift" label="Shift" />
    </SegmentedControl>
  );
}

const styles = stylex.create({
  demo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
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
  // At the card's top-left corner.
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
 * Plain elements, laid out by CSS, reordered through `reorderable.attach`:
 * each card's grip is its handle, and the cards' measured places are their
 * slots (spec:AST-103 FR1, FR4b).
 */
function AttachedCards({
  layout = 'row',
  rendersAnew = false,
}: {
  /** One row of five, or cards that wrap three to a row. */
  layout?: 'row' | 'wrap';
  /** Each move renders every card anew: new elements, the same keys. */
  rendersAnew?: boolean;
}) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState(['A', 'K', 'Q', 'J', '10']);
  const [moves, setMoves] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>('insertion-line');
  const reorderable = useMemo(
    () =>
      createReorderable<string>({
        onReorder: ({key, to}) => {
          setMoves(count => count + 1);
          setCards(current => moveKey(current, key, to));
        },
        feedback,
      }),
    [feedback],
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
  const table = (
    <div
      ref={tableRef}
      data-moves={moves}
      {...stylex.props(
        styles.table,
        layout === 'row' ? styles.rowTable : styles.wrapTable,
      )}>
      {cards.map(card => (
        <div
          key={rendersAnew ? `${card}:${moves}` : card}
          data-card={card}
          aria-label={`Card ${card}`}
          {...stylex.props(styles.card)}>
          <span>{card}</span>
          <span data-grip="" {...stylex.props(styles.grip)}>
            ⋮⋮
          </span>
        </div>
      ))}
    </div>
  );
  if (rendersAnew) {
    return table;
  }
  return (
    <div {...stylex.props(styles.demo)}>
      <FeedbackToggle value={feedback} onChange={setFeedback} />
      {table}
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
          'the arrow keys. Line, the default, keeps the other cards still ' +
          'and draws a line where the card would land; Shift ' +
          "(`feedback: 'shift'`) slides them aside to open the gap, as a " +
          'hand of cards makes room.',
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
  const [feedback, setFeedback] = useState<Feedback>('insertion-line');
  const reorderable = useMemo(
    () =>
      createReorderable<string>({
        onReorder: ({key, to}) => {
          setMoves(count => count + 1);
          setRows(current => moveKey(current, key, to));
        },
        feedback,
      }),
    [feedback],
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
    <div {...stylex.props(styles.demo)}>
      <FeedbackToggle value={feedback} onChange={setFeedback} />
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
    </div>
  );
}

export const AttachedRowsInAColumn: Story = {
  render: () => <AttachedRows />,
  parameters: {
    docs: {
      description: {
        story:
          'A column of plain rows: a drag shows the same insertion line a ' +
          'List does, at the gap where the row would land; under Shift the ' +
          'rows slide aside to open it instead.',
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
