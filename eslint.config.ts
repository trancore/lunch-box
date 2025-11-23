import skipFormatting from '@vue/eslint-config-prettier';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import * as pluginStorybook from 'eslint-plugin-storybook';
import * as pluginVue from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,tsx,vue}'],
  },
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/*.stories/**',
  ]),
  pluginStorybook.default.configs['flat/recommended'],
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
);
