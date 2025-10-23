import type { Meta, StoryObj } from '@storybook/vue3-vite';

import MenuResult from './index.vue';

const meta = {
  component: MenuResult,
  title: 'Component/Menu/Result',
} satisfies Meta<typeof MenuResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
