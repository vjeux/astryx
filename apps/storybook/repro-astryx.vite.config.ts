import path from 'node:path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {astryxStylex} from '../../packages/build/src/vite.ts';
const rootDir = path.resolve(__dirname, '../..');
const entry = process.env.REPRO === 'value' ? 'ValueConsumer' : 'MediaKeyConsumer';
const stylexOptions = {
  dev: false,
  styleResolution: 'application-order' as const,
  aliases: {
    '@astryxdesign/core/*': [path.join(rootDir, 'packages/core/src/*')],
    '@astryxdesign/core': [path.join(rootDir, 'packages/core/src')],
  },
  unstable_moduleResolution: {type: 'commonJS' as const, rootDir},
};
export default defineConfig({
  plugins: [
    ...astryxStylex({stylexOptions}),
    react(),
  ],
  build: {
    outDir: '/tmp/stylex-consts-repro/astryx-' + entry,
    emptyOutDir: true,
    lib: {
      entry: path.join(rootDir, 'packages/core/src/utils/__stylexConstsRepro__', entry + '.tsx'),
      formats: ['es'],
      fileName: entry,
    },
    rollupOptions: {external: ['react', 'react/jsx-runtime', 'react-dom']},
  },
});
