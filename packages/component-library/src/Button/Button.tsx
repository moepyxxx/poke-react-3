import React, { FC, ReactNode } from "react";

export type FontSize = "small" | "medium" | "large";
export type FontVariant = "primary" | "secondary";

type Props = {
  size: FontSize;
  variant: FontVariant;
  isDisabled: boolean;
  children: ReactNode;
};
export const Button: FC<Props> = ({ size, variant, isDisabled, children }) => {
  return (
    <button
      className="p-4 text-secondary"
      onClick={() => alert("click button!")}>
      {children}
    </button>
  );
};
