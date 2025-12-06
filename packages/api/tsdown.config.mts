import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: 'src/index.ts',
    outDir: 'dist',
    treeshake: true,
    sourcemap: true,
    unbundle: true,
    clean: true,
  },
]);
