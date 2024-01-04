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
    variant: "fill",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Fill: Story = {};
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
