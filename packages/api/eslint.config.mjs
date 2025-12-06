import { defineConfig } from 'eslint/config';
import { nestConfig } from '@repo/eslint-config';

export default defineConfig(
  {
    ignores: ['dist/**', 'eslint.config.*'],
  },
  nestConfig,
);
