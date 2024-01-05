import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant: "h1" | "h2" | "h3";
};

export const Title: FC<Props> = ({ children, variant }) => {
  if (variant === "h1") {
    return <h1 className="text-xl font-bold">{children}</h1>;
  }
  if (variant === "h2") {
    return <h2 className="text-lg font-bold">{children}</h2>;
  }
  if (variant === "h3") {
    return <h2 className="text-base font-bold">{children}</h2>;
  }
  return <></>;
};
