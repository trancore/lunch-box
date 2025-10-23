import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ImageSplash from './index.vue';

const meta = {
  component: ImageSplash,
  title: 'Component/Image/ImageSplash',
} satisfies Meta<typeof ImageSplash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    src: '/src/assets/images/splash.png',
    alt: 'splash',
  },
};

export const SearchAndShopDetail: Story = {
  args: {
    src: '/src/assets/images/splash.png',
    alt: 'splash',
    height: 150,
  },
};
