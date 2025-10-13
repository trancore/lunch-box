import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';
import primeVue from 'primevue/config';
import { createApp } from 'vue';

import '~/assets/styles/base.scss';

import App from './App.vue';
import router from './router';

const app = createApp(App);

/**
 * @see https://primevue.org/theming/styled/#colors
 */
// FIXME: テーマカラーはcomposablesで参照しても良さそう。
const THEME_COLOR = 'green';

// storybookのためにexport可能とする
export const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: `{${THEME_COLOR}.50}`,
      100: `{${THEME_COLOR}.100}`,
      200: `{${THEME_COLOR}.200}`,
      300: `{${THEME_COLOR}.300}`,
      400: `{${THEME_COLOR}.400}`,
      500: `{${THEME_COLOR}.500}`,
      600: `{${THEME_COLOR}.600}`,
      700: `{${THEME_COLOR}.700}`,
      800: `{${THEME_COLOR}.800}`,
      900: `{${THEME_COLOR}.900}`,
      950: `{${THEME_COLOR}.950}`,
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
      },
    },
  },
});

app.use(createPinia());
app.use(router);
app.use(primeVue, {
  theme: {
    preset: preset,
    ripple: true,
  },
});

app.mount('#app');
