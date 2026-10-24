// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DropdownMenuRadioItem.tsx
 * @input React, stylex, Item + Icon + DropdownMenu context + tokens from core
 * @output DropdownMenuRadioItem — a single option in a radio group, drawn as a
 *   row or, given children, as a cell
 * @position Sub-component; must be used inside a DropdownMenuRadioGroup.
 *
 * A menu item representing one option in a single-select group
 * (role="menuitemradio"). The row owns the role and aria-checked; there is no
 * nested native <input> (per the WAI-ARIA menuitemradio pattern). Selection
 * state + onChange come from DropdownMenuRadioGroupContext. Keyboard nav +
 * Enter/Space activation come from the parent DropdownMenu.
 *
 * The round radio visual is the shared radio indicator, decorative
 * (aria-hidden) — the row owns the checked state, and menu radios pick up the
 * same `radio` theming (and any theme replacement) as RadioList. This row keeps
 * the marker box: its size is derived from the menu's item size and it swaps to
 * the inline-end of the row on coarse-pointer (touch) devices via CSS `order`.
 *
 * Given children, the item is a cell instead: the caller's content is the
 * tile (a swatch, an icon, a numbered slot), with no radio mark and no row
 * layout, named by `label` through a visually hidden element. The checked cell
 * carries an accent border. Cells keep the row's role, focus and selection, so
 * the menu's arrow keys, typeahead and press model reach them in DOM order;
 * a caller lays them out by styling the group or a wrapper as a grid.
 */

import {useCallback, useId, type PointerEvent, type ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {renderIconSlot, type IconType} from '../Icon';
import {useIndicator} from '../Indicator';
import {Item} from '../Item';
import {VisuallyHidden} from '../VisuallyHidden';
import {useDevWarning} from '../hooks/useDevWarning';
import {useDropdownMenuContext} from './DropdownMenuContext';
import {focusMenuItemOnHover} from './menuItemHover';
import {focusOutlineStyles} from '../utils/focusOutline.stylex';
import {colorVars, spacingVars} from '../theme/tokens.stylex';
import {mergeProps, themeProps} from '../utils';
import type {BaseProps} from '../BaseProps';
import {useDropdownMenuRadioGroupContext} from './DropdownMenuContext';

const styles = stylex.create({
  root: {
    width: '100%',
    borderRadius: `max(0px, calc(var(--_dropdown-menu-radius, ${spacingVars['--spacing-2']}) - var(--_dropdown-menu-padding, ${spacingVars['--spacing-1']})))`,
    color: colorVars['--color-text-primary'],
    backgroundColor: {
      default: 'transparent',
      ':focus': colorVars['--color-overlay-hover'],
    },
    cursor: {
      default: 'pointer',
      ':is(:disabled,[aria-disabled="true"])': 'default',
    },
    outline: 'none',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'default',
  },
  // A cell: caller content as a tile instead of a row. A 2px border is always
  // reserved, so checking a cell recolors it rather than moving its content,
  // and it is a border, not a shadow, because forced colors keep borders and
  // drop shadows. Positioned so its visually hidden name stays inside it.
  cell: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minWidth: 0,
    padding: spacingVars['--spacing-0-5'],
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: {
      default: 'transparent',
      // A system color, which forced colors leave as written, so an unchecked
      // cell's border stays invisible against the menu.
      '@media (forced-colors: active)': 'Canvas',
    },
    borderRadius: `max(0px, calc(var(--_dropdown-menu-radius, ${spacingVars['--spacing-2']}) - var(--_dropdown-menu-padding, ${spacingVars['--spacing-1']})))`,
    color: colorVars['--color-text-primary'],
    backgroundColor: {
      default: 'transparent',
      ':focus': colorVars['--color-overlay-hover'],
    },
    cursor: {
      default: 'pointer',
      ':is([aria-disabled="true"])': 'default',
    },
    // The shared keyboard ring sits outside the border that marks the checked
    // cell, so a focused checked cell shows both; it is also what marks focus
    // under forced colors, which drop the focus overlay.
    outlineOffset: 2,
  },
  cellChecked: {
    borderColor: {
      default: colorVars['--color-accent'],
      '@media (forced-colors: active)': 'Highlight',
    },
  },
  // Rendered in Item's `marker` slot as a raw flex child. On touch it moves to
  // the inline-end of the row via `order`.
  // Layout box for the decorative marker. The painted circle is the radio
  // indicator inside it, which carries the shared `radio` theme target.
  // Placement of the marker within the row. The indicator draws its own box
  // (size, fill, border) — these are only the rules the MENU owns: where the
  // marker sits in the row, and that it never takes the pointer.
  marker: {
    pointerEvents: 'none',
    order: {
      default: 0,
      '@media (pointer: coarse)': 1,
    },
    marginInlineStart: {
      default: 0,
      '@media (pointer: coarse)': 'auto',
    },
  },
});

// Matches the control sizes RadioList uses, so a radio reads the same in a
// menu row as it does in a radio group.
export interface DropdownMenuRadioItemProps extends Omit<
  BaseProps,
  'role' | 'aria-checked' | 'tabIndex'
> {
  /**
   * The value this item represents within its group. The group's `value`
   * matches against this to determine the checked state.
   */
  value: string;
  /**
   * Primary label text identifying the option.
   */
  label: ReactNode;
  /**
   * Secondary description text displayed below the label.
   */
  description?: ReactNode;
  /**
   * Icon to display before the label. Accepts a semantic icon name (see
   * `astryx docs icons`) or a rendered node.
   */
  icon?: ReactNode | IconType;
  /**
   * Whether this individual radio item is disabled. Disabled items stay
   * focusable (via `aria-disabled`) so they remain discoverable by keyboard
   * and assistive technology, but selection is blocked.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Content to render after the label and description, such as a badge or
   * metadata.
   */
  endContent?: ReactNode;
  /**
   * Content drawn as a cell instead of the row: a tile, a colour swatch, an
   * icon, a numbered slot. The cell shows no radio mark; `label` names it
   * through a visually hidden element, and the checked cell carries an accent
   * border. Cells keep the row's role, focus and selection, so the menu's
   * arrow keys and typeahead reach them in DOM order; lay them out by styling
   * the group or a wrapper inside it (a grid). `icon`, `description` and
   * `endContent` are not shown in a cell.
   */
  children?: ReactNode;
  /** Ref forwarded to the row root — the element carrying `role="menuitemradio"`. */
  ref?: React.Ref<HTMLElement>;
}

/**
 * A single option in a DropdownMenuRadioGroup (role="menuitemradio").
 *
 * @example
 * ```
 * <DropdownMenuRadioGroup value={sort} onChange={setSort} label="Sort by">
 *   <DropdownMenuRadioItem value="newest" label="Newest" />
 *   <DropdownMenuRadioItem value="oldest" label="Oldest" icon="clock" />
 * </DropdownMenuRadioGroup>
 * <DropdownMenuRadioGroup
 *   value={color}
 *   onChange={setColor}
 *   label="Color"
 *   xstyle={styles.swatchGrid}>
 *   <DropdownMenuRadioItem value="red" label="Red">
 *     <Swatch color="red" />
 *   </DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
export function DropdownMenuRadioItem({
  value,
  label,
  description,
  icon,
  isDisabled = false,
  endContent,
  children,
  ref,
  xstyle,
  className,
  style,
  ...rest
}: DropdownMenuRadioItemProps) {
  const menuCtx = useDropdownMenuContext();
  const groupCtx = useDropdownMenuRadioGroupContext();
  if (!groupCtx) {
    throw new Error(
      'DropdownMenuRadioItem must be used within a DropdownMenuRadioGroup',
    );
  }
  const menuSize = menuCtx?.menuSize ?? 'md';
  const controlSize = menuSize === 'sm' ? 'sm' : 'md';
  const isChecked = groupCtx.value === value;
  const RadioControl = useIndicator('radio');

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }
    groupCtx.onChange(value);
    if (groupCtx.hasCloseOnSelect) {
      menuCtx?.closeMenu();
    }
  }, [isDisabled, groupCtx, value, menuCtx]);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => focusMenuItemOnHover(e, isDisabled),
    [isDisabled],
  );

  const isCell = children != null;
  const labelId = useId();
  useDevWarning(
    'DropdownMenuRadioItem',
    'A radio item with children is a cell, which shows no icon, description ' +
      'or endContent: put them in its children, or drop them.',
    isCell && (icon != null || description != null || endContent != null),
  );

  if (isCell) {
    return (
      <div
        {...rest}
        ref={ref as React.Ref<HTMLDivElement>}
        role="menuitemradio"
        aria-checked={isChecked}
        aria-disabled={isDisabled || undefined}
        aria-labelledby={labelId}
        tabIndex={isDisabled ? undefined : -1}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        {...mergeProps(
          stylex.props(
            focusOutlineStyles.focusVisible,
            styles.cell,
            isChecked && styles.cellChecked,
            isDisabled && styles.disabled,
            xstyle,
          ),
          {className, style},
        )}>
        <VisuallyHidden id={labelId}>{label}</VisuallyHidden>
        {children}
      </div>
    );
  }

  return (
    <Item
      {...rest}
      ref={ref}
      role="menuitemradio"
      aria-checked={isChecked}
      tabIndex={isDisabled ? undefined : -1}
      onPointerMove={handlePointerMove}
      marker={
        // No wrapper — see DropdownMenuCheckboxItem: the target belongs on the
        // visible circle, and the indicator already owns its control size.
        <RadioControl
          state={isChecked ? 'checked' : 'unchecked'}
          size={controlSize}
          isDisabled={isDisabled}
          xstyle={styles.marker}
          {...themeProps('dropdown-menu-radio', {
            size: controlSize,
            checked: isChecked ? 'checked' : null,
            disabled: isDisabled ? 'disabled' : null,
          })}
        />
      }
      startContent={
        icon
          ? renderIconSlot(icon, {size: 'sm', color: 'secondary'})
          : undefined
      }
      label={label}
      description={description}
      endContent={endContent}
      onClick={handleClick}
      isDisabled={isDisabled}
      xstyle={[styles.root, isDisabled && styles.disabled, xstyle]}
      {...mergeProps(themeProps('dropdown-menu-item', {size: menuSize}), {
        className,
        style,
      })}
    />
  );
}

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';
