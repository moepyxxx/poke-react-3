import type { Meta, StoryObj } from "@storybook/react";

import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Atoms/Title",
  parameters: {
    layout: "centered",
  },
  args: {
    children: "タイトルがここに入ります！",
    variant: "h1",
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const H1Title: Story = {};
export const H2Title: Story = {
  args: {
    variant: "h2",
  },
};
export const H3Title: Story = {
  args: {
    variant: "h3",
  },
};
