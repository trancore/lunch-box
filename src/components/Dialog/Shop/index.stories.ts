import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Shop from './index.vue';

const meta = {
  component: Shop,
  title: 'Component/Dialog/Shop',
} satisfies Meta<typeof Shop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
