// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file uikit.test.ts
 * @input vitest, the UIKit constants table and its source text
 * @output Enforces law P2 on the table: every leaf has a source of an
 *   allowed kind, every guess and every WebKit value names its measurement
 *   task, every task is listed in motion/README.md; checks that every spring
 *   in the table is valid and that the press clocks agree with the touch
 *   press model they were measured for
 * @position Testing; validates motion/uikit/*.ts without a browser
 */

import fs from 'node:fs';
import path from 'node:path';
import {describe, expect, it} from 'vitest';
import {
  PRESS_FADE_MS,
  PRESS_FLASH_MS,
  PRESS_ONSET_MS,
  PRESS_SCROLL_BRAKE_MS,
} from '../../utils/pressGesture';
import {settlingDuration, toSpring, type SpringDescription} from '../spring';
import {scroll, springs, timing} from '.';

const TABLE_FILES = ['springs.ts', 'scroll.ts', 'timing.ts'];
const SOURCE_KINDS =
  /^@source (apple-docs https:\/\/developer\.apple\.com\/|wwdc \d{4}-\d+ |webkit Source\/|measured: .*iOS \d|GUESS — )/;

interface Leaf {
  file: string;
  key: string;
  doc: string;
}

/**
 * Every leaf of the exported table object with the JSDoc block right above
 * it. A line ending in `{` opens a group (no source of its own); any other
 * `key: value,` line is a leaf.
 */
function leavesOf(file: string): Leaf[] {
  const text = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
  const lines = text.split('\n');
  const start = lines.findIndex(line => /^export const \w+ = \{$/.test(line));
  expect(start).toBeGreaterThan(-1);
  const leaves: Leaf[] = [];
  let doc = '';
  let inDoc = false;
  let groupLeafCount: number[] = [];
  for (const line of lines.slice(start + 1)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('/**')) {
      inDoc = true;
      doc = '';
    }
    if (inDoc) {
      doc += trimmed.replace(/^\/?\*+\/?\s?/, '') + '\n';
      if (trimmed.endsWith('*/')) {
        inDoc = false;
      }
      continue;
    }
    if (trimmed === '' || trimmed.startsWith('//')) {
      continue;
    }
    const group = /^(\w+): \{$/.exec(trimmed);
    if (group) {
      groupLeafCount.push(0);
      doc = '';
      continue;
    }
    if (/^\},?$/.test(trimmed)) {
      const count = groupLeafCount.pop();
      expect(count, `${file}: empty group`).toBeGreaterThan(0);
      continue;
    }
    if (trimmed.startsWith('} as const')) {
      break;
    }
    const leaf = /^(\w+): .+,$/.exec(trimmed);
    expect(
      leaf,
      `${file}: unexpected line ${JSON.stringify(trimmed)}`,
    ).not.toBeNull();
    if (leaf) {
      leaves.push({file, key: leaf[1], doc});
      groupLeafCount = groupLeafCount.map(n => n + 1);
    }
    doc = '';
  }
  return leaves;
}

const README = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8');

describe('UIKit constants table: every value is sourced (law P2)', () => {
  const leaves = TABLE_FILES.flatMap(leavesOf);

  it('finds the table entries', () => {
    expect(leaves.length).toBeGreaterThan(40);
  });

  for (const {file, key, doc} of leaves) {
    it(`${file} › ${key}`, () => {
      // Collapse each tag's continuation lines onto it.
      const tags = doc
        .split(/\n(?=@)/)
        .map(tag => tag.replace(/\s*\n\s*/g, ' ').trim())
        .filter(tag => tag.startsWith('@'));
      const sources = tags.filter(tag => tag.startsWith('@source '));
      expect(sources.length, `${key} has no @source`).toBeGreaterThan(0);
      for (const source of sources) {
        expect(source, `${key}: unknown source kind`).toMatch(SOURCE_KINDS);
      }
      const needsMeasurement = sources.some(source =>
        /^@source (GUESS|webkit)/.test(source),
      );
      const measures = tags.filter(tag => tag.startsWith('@measure '));
      if (needsMeasurement) {
        expect(
          measures.length,
          `${key} is unconfirmed but names no @measure task`,
        ).toBeGreaterThan(0);
      }
      for (const measure of measures) {
        const id = /^@measure (M-[A-Z0-9]+)$/.exec(measure)?.[1];
        expect(id, `${key}: malformed ${measure}`).toBeDefined();
        expect(README, `${id} is not in motion/README.md`).toMatch(
          new RegExp(`^\\| ${id} +\\|`, 'm'),
        );
      }
    });
  }
});

describe('UIKit constants table: values', () => {
  const springEntries: [string, SpringDescription][] = [
    ...Object.entries(springs),
    ['scroll.bounce', scroll.bounce],
    ['scroll.paging.snap', scroll.paging.snap],
  ];

  it.each(springEntries)(
    '%s is a valid spring that settles',
    (_, description) => {
      const spring = toSpring(description);
      const settle = settlingDuration(spring);
      expect(settle).toBeGreaterThan(0.05);
      expect(settle).toBeLessThan(2);
    },
  );

  it('UIKit\u2019s default spring has the documented damping ratio 4.56 before clamping', () => {
    const {mass, stiffness, damping} = springs.uikitDefault;
    expect(damping / (2 * Math.sqrt(stiffness * mass))).toBeCloseTo(4.56, 2);
  });

  it('deceleration rates are per-millisecond factors in (0, 1), fast below normal', () => {
    expect(scroll.decelerationRate.fast).toBeLessThan(
      scroll.decelerationRate.normal,
    );
    expect(scroll.decelerationRate.normal).toBeLessThan(1);
  });

  it('press clocks agree with the touch press model they were measured for', () => {
    expect(scroll.delaysContentTouchesMs).toBe(PRESS_ONSET_MS);
    expect(timing.press.flashMs).toBe(PRESS_FLASH_MS);
    expect(timing.press.highlightOutMs).toBe(PRESS_FADE_MS);
    expect(timing.press.scrollBrakeMs).toBe(PRESS_SCROLL_BRAKE_MS);
  });

  it('curves are valid cubic-bézier control points', () => {
    for (const [x1, , x2] of Object.values(timing.curves)) {
      expect(x1).toBeGreaterThanOrEqual(0);
      expect(x2).toBeLessThanOrEqual(1);
    }
  });
});
