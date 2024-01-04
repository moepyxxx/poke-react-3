import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: "Typography",
  args: {
    children: "ここにテキストが入ります",
  },
  decorators: [
    (Story) => (
      <div className="m-5">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Base: Story = {};
