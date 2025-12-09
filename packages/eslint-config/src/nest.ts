import { baseConfig } from '@repo/eslint-config/base';
import { OFF, WARN } from '@repo/eslint-config/utils';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export const nestConfig = defineConfig(
  baseConfig,
  {
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-floating-promises': WARN,
      '@typescript-eslint/no-unsafe-argument': OFF,
    },
  },
);
