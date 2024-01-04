import React, { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";

export const textLink = tv({
  base: "text-primary underline decoration-primary",
});
type Props = {
  children: ReactNode;
  href: string;
  target?: string;
};

export const TextLink: FC<Props> = ({ href, target = "", children }) => {
  return (
    <a href={href} target={target} className={textLink()}>
      {children}
    </a>
  );
};
