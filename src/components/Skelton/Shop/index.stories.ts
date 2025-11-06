import type { Meta, StoryObj } from '@storybook/vue3-vite';

import SkeltonShop from './index.vue';

const meta = {
  component: SkeltonShop,
  title: 'Component/Skelton/Shop',
} satisfies Meta<typeof SkeltonShop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SkeltonShop },
    template: '<div style="width: 270px"><SkeltonShop /></div>',
    setup: () => ({ args }),
  }),
};
