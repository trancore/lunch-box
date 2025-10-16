import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Footer from './index.vue';

const meta = {
  component: Footer,
  title: 'Component/Footer',
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
