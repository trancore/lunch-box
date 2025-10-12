import type { StorybookConfig } from '@storybook/vue3-vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  viteFinal: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '~': path.resolve(__dirname, '../src'),
      };
    }

    return config;
  },
};
export default config;
