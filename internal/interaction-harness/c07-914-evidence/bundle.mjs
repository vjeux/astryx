// Local tool, not part of any PR: bundles the harness's busy.ts for a Node replay.
import {build} from 'esbuild';
await build({
  entryPoints: [process.argv[2]],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: process.argv[3],
  external: ['@playwright/test', 'playwright', 'playwright-core'],
  logLevel: 'warning',
});
console.log('bundled', process.argv[3]);
