import Detail from '~/components/Page/Detail/index.vue';
import Search from '~/components/Page/Search/index.vue';
import Top from '~/components/Page/Top/index.vue';

export const routes = [
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
    path: '/shops/:id',
    name: 'detail',
    component: Detail,
  },
];

// 注意: SSG/SSR ビルド時に window 参照を避けるため、
// ここでは Router インスタンスを生成しない。
// Router の生成は ViteSSG が内部で行う。
