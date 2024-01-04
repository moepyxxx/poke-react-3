import type { Meta, StoryObj } from "@storybook/react";

import { InputText } from "./InputText";
import { useState } from "react";

const Template: Story["render"] = ({ value: _, onChange: __, ...args }) => {
  const [value, setValue] = useState("");
  return <InputText {...args} value={value} onChange={setValue} />;
};

const meta: Meta<typeof InputText> = {
  component: InputText,
  title: "Form/InputText",
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
type Story = StoryObj<typeof InputText>;

export const Base: Story = {};
