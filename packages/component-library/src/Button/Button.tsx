import React, { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";

export type FontSize = "small" | "medium" | "large";
export type FontVariant = "fill" | "outline";

const button = tv({
  base: "py-2 px-3 rounded border-2 border-primary",
  variants: {
    variant: {
      fill: "bg-primary text-white",
      outline: "text-primary",
    },
    size: {
      small: "text-sm min-w-16",
      medium: "text-base min-w-24",
      large: "text-lg min-w-32",
    },
    disabled: {
      true: "border-gray bg-gray text-white pointer-events-none",
    },
  },
});

type Props = {
  size: FontSize;
  variant: FontVariant;
  disabled: boolean;
  children: ReactNode;
};

export const Button: FC<Props> = ({ size, variant, disabled, children }) => {
  return (
    <button
      className={button({ size, variant, disabled })}
      onClick={() => alert("click button!")}>
      {children}
    </button>
  );
};
