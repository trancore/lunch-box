import Aura from '@primeuix/themes/aura';
import { type Preview, setup } from '@storybook/vue3-vite';
import 'leaflet/dist/leaflet.css';
import 'primeicons/primeicons.css';
import primeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import { vueRouter } from 'storybook-vue3-router';
import type { App } from 'vue';

import '~/assets/styles/animations.scss';
import '~/assets/styles/base.scss';
import { routes } from '~/router';

import { preset } from '../src/main';

setup((app: App) => {
  app.use(primeVue, {
    theme: {
      preset: preset,
      ripple: true,
    },
  });
  app.use(DialogService);
});

const preview: Preview = {
  decorators: [vueRouter(routes)],
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
