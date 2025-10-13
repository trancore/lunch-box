import { createRouter, createWebHistory } from 'vue-router';

import Detail from '~/components/Page/Detail/index.vue';
import Search from '~/components/Page/Search/index.vue';
import Top from '~/components/Page/Top/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/shop/:id',
      name: 'detail',
      component: Detail,
    },
  ],
});

export default router;
