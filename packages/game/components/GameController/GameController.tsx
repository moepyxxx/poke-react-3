import { ControllerOptions } from "@/features/adventure/types";
import { FC } from "react";
import { Button } from "./Button";

export type Props = {
  controllerOptions: ControllerOptions;
};
export const GameController: FC<Props> = ({ controllerOptions }) => {
  return (
    <div className="flex flex-wrap gap-1 items-center justify-center">
      <Button onClick={controllerOptions.onPushLeft}>←</Button>
      <Button onClick={controllerOptions.onPushAbove}>↑</Button>
      <Button onClick={controllerOptions.onPushBelow}>↓</Button>
      <Button onClick={controllerOptions.onPushRight}>→</Button>
      <Button onClick={controllerOptions.onPushB}>Ｂ</Button>
      <Button onClick={controllerOptions.onPushA}>Ａ</Button>
    </div>
  );
};
