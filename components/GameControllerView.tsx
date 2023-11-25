import { ControllerOptions } from "@/types";
import { FC } from "react";

export type Props = {
  controllerOptions: ControllerOptions;
};
export const GameControllerView: FC<Props> = ({ controllerOptions }) => {
  return (
    <div className="pt-10">
      <h2>操作画面</h2>
      <ul>
        <li>
          <button onClick={controllerOptions.onPushA}>Aボタン</button>
        </li>
        <li>
          <button onClick={controllerOptions.onPushB}>Bボタン</button>
        </li>
        <li>
          <button onClick={controllerOptions.onPushStart}>Startボタン</button>
        </li>
        <li>
          <button onClick={controllerOptions.onPushAbove}>↑ボタン</button>
        </li>
        <li>
          <button onClick={controllerOptions.onPushRight}>→ボタン</button>
        </li>
        <li>
          <button onClick={controllerOptions.onPushBelow}>↓ボタン</button>
        </li>
        <li>
          <button onClick={controllerOptions.onPushLeft}>←ボタン</button>
        </li>
      </ul>
    </div>
  );
};
