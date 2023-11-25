import { ControllerAction } from "@/types";
import { useState } from "react";

export type ActionHistory = {
  action: ControllerAction;
  timestamp: number;
};

/**
 * 主人公のcontrollerのアクション履歴を管理する
 */
export const useControllerActionHistories = () => {
  const [histories, setHistories] = useState<ActionHistory[]>([]);

  const onControllerAct = (action: ControllerAction) => {
    setHistories((prev) => [
      {
        action,
        timestamp: performance.now(),
      },
      ...prev,
    ]);
    if (histories.length > 50) {
      setHistories(histories.slice(0, 50));
    }
  };

  return {
    histories,
    latestAction: histories.length > 0 ? histories[0] : null,
    onControllerAct,
  };
};
