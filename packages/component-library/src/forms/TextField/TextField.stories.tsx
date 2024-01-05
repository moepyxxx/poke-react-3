import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./TextField";
import { useState } from "react";

const Template: Story["render"] = ({ value: _, onChange: __, ...args }) => {
  const [value, setValue] = useState("");
  return <TextField {...args} value={value} onChange={setValue} />;
};

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: "Forms/TextField",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "好きな食べ物",
    value: "おすし",
  },
  render: Template,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Base: Story = {};
