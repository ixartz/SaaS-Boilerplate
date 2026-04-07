import type { Meta, StoryObj } from '@storybook/react';

import { Background } from './Background';

const meta = {
  title: 'Components/Background',
  component: Background,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Background>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultBackgroundWithChildren = {
  args: {
    children: <div>Children node</div>,
  },
} satisfies Story;

export const RedBackgroundWithChildren = {
  args: {
    className: 'bg-red-500',
    children: <div>Children node</div>,
  },
} satisfies Story;
