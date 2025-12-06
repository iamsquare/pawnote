import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['generated/*.ts', 'generated/models/*.ts'],
  outDir: 'dist',
  dts: true,
  clean: true,
  external: ['node:buffer'],
});
