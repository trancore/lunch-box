import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Recommend from './index.vue';

const meta = {
  component: Recommend,
  title: 'Component/Card/Recommend',
} satisfies Meta<typeof Recommend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    shopList: [],
    status: 'idle',
  },
};

export const Loading: Story = {
  args: {
    shopList: [],
    status: 'loading',
  },
};

export const Success: Story = {
  args: {
    shopList: [
      {
        id: 1,
        url: 'https://example.com/shop/1',
        name: '店舗１',
        address: '東京都渋谷区1-2-3',
        lat: 35.6895,
        lng: 139.6917,
        genre: 'イタリアン',
        budget: 3000,
        openAt: new Date('2024-01-01T11:00:00Z'),
        closeAt: new Date('2024-01-01T22:00:00Z'),
        regularHoliday: '毎週月曜日',
        rating: '★★★★★',
        introduction: '美味しいイタリアン料理を提供する人気店です。',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      },
      {
        id: 2,
        url: 'https://example.com/shop/2',
        name: '店舗２',
        address: '大阪府大阪市4-5-6',
        lat: 34.6937,
        lng: 135.5023,
        genre: '和食',
        budget: 2500,
        openAt: new Date('2024-01-01T10:00:00Z'),
        closeAt: new Date('2024-01-01T21:00:00Z'),
        regularHoliday: '毎週火曜日',
        rating: '★★★★☆',
        introduction: '新鮮な食材を使った本格和食が楽しめます。',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      },
      {
        id: 3,
        url: 'https://example.com/shop/3',
        name: '店舗３',
        address: '福岡県福岡市7-8-9',
        lat: 33.5902,
        lng: 130.4017,
        genre: 'カフェ',
        budget: 1500,
        openAt: new Date('2024-01-01T09:00:00Z'),
        closeAt: new Date('2024-01-01T20:00:00Z'),
        regularHoliday: '毎週水曜日',
        rating: '★★★☆☆',
        introduction: '落ち着いた雰囲気の中で美味しいコーヒーが楽しめます。',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      },
      {
        id: 4,
        url: 'https://example.com/shop/4',
        name: '店舗４',
        address: '北海道札幌市10-11-12',
        lat: 43.0618,
        lng: 141.3545,
        genre: '中華',
        budget: 2800,
        openAt: new Date('2024-01-01T11:30:00Z'),
        closeAt: new Date('2024-01-01T22:30:00Z'),
        regularHoliday: '毎週木曜日',
        rating: '★★☆☆☆',
        introduction: '本格的な中華料理をリーズナブルな価格で提供しています。',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      },
    ],
    status: 'success',
  },
};

export const Error: Story = {
  args: {
    shopList: [],
    status: 'error',
  },
};
