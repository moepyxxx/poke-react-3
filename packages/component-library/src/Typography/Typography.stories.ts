import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: "Typography",
  parameters: {
    layout: "centered",
  },
  args: {
    children: "テキストリンク",
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Base: Story = {};
