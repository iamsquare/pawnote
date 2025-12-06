import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [RuleConfigSeverity.Disabled],
    'body-max-length': [RuleConfigSeverity.Disabled],
    'body-max-line-length': [RuleConfigSeverity.Disabled],
  },
};

export default config;
