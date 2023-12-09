import { FC } from "react";

type Props = {
  line: string;
};
export const LineScreen: FC<Props> = ({ line }) => {
  return (
    <div
      className="absolute bottom-2 left-2 border-2 border-black p-2"
      style={{ width: "360px", height: "72px" }}>
      <p>{line}</p>
    </div>
  );
};
