import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Shop from './index.vue';

const meta = {
  component: Shop,
  title: 'Component/Card/Shop',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Shop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    shopCard: {
      id: '1',
      url: 'https://example.com/shop/1',
      name: '店舗１',
      address: '123 Example St, Example City',
      lat: 35.6895,
      lng: 139.6917,
      genre: 'イタリアン',
      regularHoliday: '毎週月曜日',
      rating: 4,
      introduction:
        '美味しいイタリアン料理を提供する人気店です。雰囲気も良く、デートや友人との食事に最適です。',
    },
  },
};
