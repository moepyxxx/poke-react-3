import { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded shadow-md",
});

type Props = {
  onClick: () => void;
  children: ReactNode;
};
export const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button className={button()} onClick={onClick}>
      {children}
    </button>
  );
};
