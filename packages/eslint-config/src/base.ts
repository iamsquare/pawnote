import js from '@eslint/js';
import { ERROR, WARN } from '@repo/eslint-config/utils';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

export const baseConfig = defineConfig(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      turbo: turboPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      eqeqeq: ERROR,
      'no-console': WARN,
      'no-duplicate-imports': WARN,
      '@typescript-eslint/no-unused-vars': [WARN, { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [WARN, { fixStyle: 'inline-type-imports' }],
      'prettier/prettier': WARN,
      'simple-import-sort/imports': WARN,
      'simple-import-sort/exports': WARN,
      'turbo/no-undeclared-env-vars': WARN,
    },
  },
);
