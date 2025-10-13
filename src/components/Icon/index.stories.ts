import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Icon from './index.vue';

const meta = {
  component: Icon,
  title: 'Component/Icon',
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShoppingBagPrimary: Story = {
  args: {
    name: 'SHOPPING_BAG',
    type: 'primary',
    size: 2,
  },
};

export const SearchSecondary: Story = {
  args: {
    name: 'SEARCH',
    type: 'secondary',
    size: 2,
  },
};
