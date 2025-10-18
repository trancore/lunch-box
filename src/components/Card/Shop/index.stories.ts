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
    id: '1',
    imageUrl: '/src/assets/images/dummy-lunch.png',
    name: 'Shop Title',
    price: '1,500',
    genre: 'イタリアン',
    businessHours: '11:00 - 22:00',
    rating: 4,
    canExpenses: true,
  },
};

export const Undefined: Story = {
  args: {
    id: '2',
    name: 'UndefinedShop',
  },
};
