import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';
import primeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import { ViteSSG } from 'vite-ssg';
import { createMemoryHistory, createWebHashHistory } from 'vue-router';

import '~/assets/styles/base.scss';
import { routes } from '~/router';

import App from './App.vue';

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

/**
 * Leafletのアイコン設定
 *
 * Leafletのマーカーアイコンのパスが正しく設定されていない問題を修正している。
 *
 * @see https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
 */
async function setupLeaflet() {
  const { Icon } = await import('leaflet');
  const markerIconUrl = (await import('leaflet/dist/images/marker-icon.png'))
    .default;
  const markerIconUrl2x = (
    await import('leaflet/dist/images/marker-icon-2x.png')
  ).default;
  const markerShadowUrl = (
    await import('leaflet/dist/images/marker-shadow.png')
  ).default;

  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: markerIconUrl2x,
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
  });
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    history: import.meta.env.SSR
      ? createMemoryHistory()
      : createWebHashHistory(),
  },
  async (ctx) => {
    const { app } = ctx;
    app.use(createPinia());
    app.use(primeVue, {
      theme: {
        preset: preset,
        ripple: true,
      },
    });
    app.use(DialogService);

    // windowsの参照エラーが出るためクライアントサイドでのみ実行
    if (!import.meta.env.SSR) {
      await setupLeaflet();
    }
  },
);
