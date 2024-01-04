import type { Meta, StoryObj } from "@storybook/react";

import { TextLink } from "./TextLink";

const meta: Meta<typeof TextLink> = {
  component: TextLink,
  title: "TextLink",
  parameters: {
    layout: "centered",
  },
  args: {
    children: "テキストリンク",
    href: "",
  },
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Base: Story = {};
