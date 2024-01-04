import React, { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { FontSize } from "../Button/Button";

export const typography = tv({
  base: "",
  variants: {
    color: {
      primary: "text-primary",
      black: "text-black",
    },
    size: {
      small: "text-sm min-w-16",
      medium: "text-base min-w-24",
      large: "text-lg min-w-32",
    },
  },
});

type Props = {
  children: ReactNode;
  size?: FontSize;
  color?: "primary" | "black";
};

export const Typography: FC<Props> = ({
  children,
  size = "medium",
  color = "black",
}) => {
  return <p className={typography({ size, color })}>{children}</p>;
};
