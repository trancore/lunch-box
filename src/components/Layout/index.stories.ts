import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Layout from './index.vue';

const meta = {
  component: Layout,
  title: 'Component/Layout',
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {
  args: {},
  render: (args) => ({
    components: { Layout },
    template:
      '<Layout v-bind="args"><div style="height: 600px">content</div></Layout>',
    setup: () => ({ args }),
  }),
};
