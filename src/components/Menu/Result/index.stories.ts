import type { Meta, StoryObj } from '@storybook/vue3-vite';

import MenuResult from './index.vue';

const meta = {
  component: MenuResult,
  title: 'Component/Menu/Result',
} satisfies Meta<typeof MenuResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    shopList: [],
    status: 'idle',
    searchFiltering: {
      selectedSort: {
        id: 1,
        name: 'おすすめ順',
        value: 'recommended',
      },
      selectedGenre: [],
      priceMin: 0,
      priceMax: 10000,
      selectedRating: 0,
    },
  },
};

export const Loading: Story = {
  args: {
    shopList: [],
    status: 'loading',
    searchFiltering: {
      selectedSort: {
        id: 1,
        name: 'おすすめ順',
        value: 'recommended',
      },
      selectedGenre: [],
      priceMin: 0,
      priceMax: 10000,
      selectedRating: 0,
    },
  },
};

export const Success: Story = {
  args: {
    shopList: [],
    status: 'success',
    searchFiltering: {
      selectedSort: {
        id: 1,
        name: 'おすすめ順',
        value: 'recommended',
      },
      selectedGenre: [],
      priceMin: 0,
      priceMax: 10000,
      selectedRating: 0,
    },
  },
};

export const Error: Story = {
  args: {
    shopList: [],
    status: 'error',
    searchFiltering: {
      selectedSort: {
        id: 1,
        name: 'おすすめ順',
        value: 'recommended',
      },
      selectedGenre: [],
      priceMin: 0,
      priceMax: 10000,
      selectedRating: 0,
    },
  },
};
