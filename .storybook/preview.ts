import Aura from '@primeuix/themes/aura';
import { type Preview, setup } from '@storybook/vue3-vite';
import 'primeicons/primeicons.css';
import primeVue from 'primevue/config';
import type { App } from 'vue';
import '~/assets/css/styles.scss';

setup((app: App) => {
  app.use(primeVue, {
    theme: {
      preset: Aura,
      ripple: true,
    },
  });
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
