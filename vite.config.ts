import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import vueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // FIXME: VueDevToolsとStorybookが競合して動かないため、一旦コメントアウト。
    // vueDevTools(),
    viteSingleFile(),
    tsconfigPaths({ loose: true }),
    svgLoader(),
    Components({
      resolvers: [PrimeVueResolver()],
      dts: 'src/@types/components.d.ts',
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/consts'],
      dts: 'src/@types/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/variables" as *;',
      },
    },
  },
});
