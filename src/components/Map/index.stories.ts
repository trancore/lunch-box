import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Map from './index.vue';

const meta = {
  component: Map,
  title: 'Component/Map',
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lat: 35.44604,
    lng: 139.64266,
    tooltipText: 'Sample Location',
  },
};
