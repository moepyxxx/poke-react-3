import { ActionHistory } from "@/features/adventure/hooks";
import { ActionSelect, BattleState } from "../types";
import { useWatch } from "@/features/adventure/hooks/useWatch";
import { useState } from "react";

type Options = {
  /** 最新のアクション */
  latestAction: ActionHistory | null;
  /** バトルステータス */
  battleState: BattleState;
  /** わざの数 */
  worksCount: number;
};
/**
 * バトル中の選択処理を構築・制御する
 */
export const useBattleSelect = ({
  latestAction,
  battleState,
  worksCount,
}: Options) => {
  const [nextSelect, setNextSelect] = useState<ActionSelect | null>(null);

  const onCursorUp = () => {
    if (nextSelect == null) {
      return;
    }
    if (nextSelect.workId === 1) {
      return;
    }
    setNextSelect({
      ...nextSelect,
      workId: nextSelect.workId - 1,
    });
  };
  const onCursorDown = () => {
    if (nextSelect == null) {
      return;
    }
    if (nextSelect.workId === worksCount) {
      return;
    }
    setNextSelect({
      ...nextSelect,
      workId: nextSelect.workId + 1,
    });
  };

  useWatch(latestAction, (action) => {
    if (battleState !== "selectAction") {
      return;
    }
    if (nextSelect == null) {
      setNextSelect({
        type: "attack",
        workId: 1,
      });
    }
    if (action?.action === "onPushAbove") {
      onCursorUp();
    }
    if (action?.action === "onPushBelow") {
      onCursorDown();
    }
  });

  return {
    nextSelect,
  };
};
