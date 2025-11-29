import type { Meta, StoryObj } from '@storybook/vue3-vite';

import MenuSide from './index.vue';

const meta = {
  component: MenuSide,
  title: 'Component/Menu/Side',
} satisfies Meta<typeof MenuSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shopList: [],
  },
  render: (args) => ({
    components: { MenuSide },
    template: '<MenuSide v-bind="args">result</MenuSide>',
    setup: () => ({ args }),
  }),
};

export const WithLongResult: Story = {
  args: {
    shopList: [],
  },
  render: (args) => ({
    components: { MenuSide },
    template:
      '<MenuSide v-bind="args"><div style="height: 1000px">Long</div></MenuSide>',
    setup: () => ({ args }),
  }),
};
