import { FC } from "react";
import { tv } from "tailwind-variants";

export const subScreen = tv({
  base: "absolute bottom-2 left-2 border-2 border-black p-2",
});

type Props = {
  line: string;
};
export const LineScreen: FC<Props> = ({ line }) => {
  return (
    <div className={subScreen()} style={{ width: "360px", height: "72px" }}>
      <p>{line}</p>
    </div>
  );
};
