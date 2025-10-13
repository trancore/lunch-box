import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Header from './index.vue';

const meta = {
  component: Header,
  title: 'Component/Header',
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {
  args: {},
};
