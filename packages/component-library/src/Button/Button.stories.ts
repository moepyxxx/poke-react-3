import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  parameters: {
    layout: "centered",
  },
  args: {
    children: "ボタン",
    size: "medium",
    variant: "primary",
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
