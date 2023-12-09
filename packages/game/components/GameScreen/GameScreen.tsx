import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const GameScreen: FC<Props> = ({ children }) => {
  return (
    <div
      style={{ width: "384px", height: "384px" }}
      className="border-black border-4 relative mx-auto">
      {children}
    </div>
  );
};
