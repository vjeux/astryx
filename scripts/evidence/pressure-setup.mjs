// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Evidence arm, not for landing. While each test body runs,
 * ASTRYX_PRESSURE_LOOPS busy loops share the test's CPUs: a child inherits
 * the run's `taskset` mask.
 */
import {spawn} from 'node:child_process';
import {afterEach, beforeEach} from 'vitest';

const loops = Number(process.env.ASTRYX_PRESSURE_LOOPS ?? 0);
/** @type {import('node:child_process').ChildProcess[]} */
let hogs = [];
beforeEach(() => {
  hogs = Array.from({length: loops}, () =>
    spawn('yes', [], {stdio: 'ignore'}),
  );
});
afterEach(() => {
  for (const hog of hogs) hog.kill();
  hogs = [];
});
