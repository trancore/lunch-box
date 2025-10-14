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

    config.css = {
      ...config.css,
      preprocessorOptions: {
        ...(config.css && config.css.preprocessorOptions),
        scss: {
          ...(config.css &&
            config.css.preprocessorOptions &&
            (config.css.preprocessorOptions as any).scss),
          additionalData: "@use '~/assets/styles/variables' as *;",
        },
      },
    } as typeof config.css;

    return config;
  },
};
export default config;
