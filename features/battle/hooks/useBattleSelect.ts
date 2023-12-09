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

  /**
   * cursorは上下左右に移動する
   * 1 2
   * 3 4
   * 選択肢は以上の順で並んでいるためそれを制御する
   * @returns
   */
  const onCursorUp = () => {
    if (nextSelect == null) {
      return;
    }
    if (nextSelect.workId <= 2) {
      return;
    }
    setNextSelect({
      ...nextSelect,
      workId: nextSelect.workId - 2,
    });
  };
  const onCursorDown = () => {
    if (nextSelect == null) {
      return;
    }
    if (nextSelect.workId >= 3) {
      return;
    }
    if (nextSelect.workId + 2 > worksCount) {
      return;
    }
    setNextSelect({
      ...nextSelect,
      workId: nextSelect.workId + 2,
    });
  };
  const onCursorLeft = () => {
    if (nextSelect == null) {
      return;
    }
    if (nextSelect.workId % 2 === 1) {
      return;
    }
    setNextSelect({
      ...nextSelect,
      workId: nextSelect.workId - 1,
    });
  };
  const onCursorRight = () => {
    if (nextSelect == null) {
      return;
    }
    if (nextSelect.workId % 2 === 0) {
      return;
    }
    if (nextSelect.workId + 1 > worksCount) {
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
    if (action?.action === "onPushLeft") {
      onCursorLeft();
    }
    if (action?.action === "onPushRight") {
      onCursorRight();
    }
  });

  return {
    nextSelect,
  };
};
