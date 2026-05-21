import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Background } from './Background';

const meta = {
  title: 'Components/Background',
  component: Background,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Background>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultBackgroundWithChildren: Story = {
  args: {
    children: <div>Children node</div>,
  },
};

export const RedBackgroundWithChildren: Story = {
  args: {
    className: 'bg-red-500',
    children: <div>Children node</div>,
  },
};
