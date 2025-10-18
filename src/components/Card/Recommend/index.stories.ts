import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Recommend from './index.vue';

const meta = {
  component: Recommend,
  title: 'Component/Card/Recommend',
} satisfies Meta<typeof Recommend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {},
};
