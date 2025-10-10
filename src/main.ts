import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import primeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(primeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount('#app');
