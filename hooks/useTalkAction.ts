import { currentLocationAtom } from "@/atoms/currentLocation";
import {
  ControllerAction,
  FieldDirection,
  FieldMaps,
  FieldMode,
  FieldObjectMaps,
  FieldPosition,
  FieldTalk,
  FieldTalkSelect,
  FieldTalks,
} from "@/types";
import { calculateShortPosition, positionToShortPosition } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWatch } from "./useWatch";
import { ActionHistory } from "./useActionHistories";

export type Options = {
  fieldMode: FieldMode;
  latestAction: ActionHistory | null;
  fieldObjectMaps: FieldObjectMaps;
  talkMaps: FieldTalks;
  fieldPosition: FieldPosition;
  fieldDirection: FieldDirection;
  onChangeFieldMode: (mode: FieldMode) => void;
};

/**
 * フィールドでの会話を制御する
 */
export const useTalkAction = ({
  latestAction,
  fieldPosition,
  fieldDirection,
  fieldObjectMaps,
  talkMaps,
  fieldMode,
  onChangeFieldMode,
}: Options) => {
  const [currentTalkLabel, setCurrentTalkLabel] = useState<string | null>(null);
  const [currentTalk, setCurrentTalk] = useState<FieldTalk | null>(null);
  const [currentSelectionLabel, setCurrentSelectionLabel] = useState<
    string | null
  >(null);
  const [currentSelection, setCurrentSelection] = useState<FieldTalkSelect[]>(
    []
  );

  const onTalk = useCallback(() => {
    // 会話モードの場合
    if (fieldMode === "select" && currentTalkLabel != null) {
      if (currentSelectionLabel == null) {
        throw new Error("currentSelectionLabel is required");
      }
      // 会話継続（選択）の場合
      const nextTalk = talkMaps[currentTalkLabel].talkScripts.find(
        (script) => script.label === currentSelectionLabel
      );
      if (!nextTalk) {
        throw new Error("nextTalk is required");
      }
      setCurrentTalk(nextTalk);
      setCurrentSelectionLabel(null);
      setCurrentSelection([]);
      onChangeFieldMode("talk");
      return;
    }

    if (fieldMode === "talk") {
      // 会話終了の場合
      if (!currentTalk?.nextLabel) {
        onChangeFieldMode("walk");
        setCurrentTalk(null);
        setCurrentTalkLabel(null);
        return;
      }

      // 会話継続の場合
      if (fieldMode === "talk" && currentTalkLabel != null) {
        // 会話継続（次の会話）の場合
        const nextTalk = talkMaps[currentTalkLabel].talkScripts.find(
          (script) => script.label === currentTalk?.nextLabel
        );
        if (!nextTalk) {
          throw new Error("nextTalk is required");
        }
        setCurrentTalk(nextTalk);

        if (nextTalk.selections) {
          onChangeFieldMode("select");
          setCurrentSelection(nextTalk.selections);
          setCurrentSelectionLabel(nextTalk.selections[0].nextLabel);
        }

        return;
      }
    }
  }, [
    onChangeFieldMode,
    setCurrentTalk,
    talkMaps,
    fieldMode,
    currentTalk,
    currentTalkLabel,
    currentSelectionLabel,
  ]);

  const onSelect = useCallback(
    (direction: "up" | "down") => {
      const allSelectionLength = currentSelection.length;
      const currentSelectionIndex = currentSelection.findIndex(
        (selection) => selection.nextLabel === currentSelectionLabel
      );

      if (direction === "up") {
        if (currentSelectionIndex === 0) {
          return;
        }
        setCurrentSelectionLabel(
          currentSelection[currentSelectionIndex - 1].nextLabel
        );
      }

      if (direction === "down") {
        if (currentSelectionIndex === allSelectionLength - 1) {
          return;
        }
        setCurrentSelectionLabel(
          currentSelection[currentSelectionIndex + 1].nextLabel
        );
      }
    },
    [currentSelection, currentSelectionLabel]
  );

  /**
   * 会話ができる場所にいるかを確認
   */
  const canTalk = useCallback(() => {
    if (!latestAction || latestAction.action !== "onPushA") {
      return false;
    }
    const fieldMap =
      fieldObjectMaps[calculateShortPosition(fieldPosition, fieldDirection)];
    if (!fieldMap.objects?.some((object) => object.type === "person")) {
      return false;
    }
    return true;
  }, [latestAction, fieldObjectMaps, fieldPosition, fieldDirection]);

  /**
   * 会話開始
   */
  const onStartTalk = useCallback(() => {
    const fieldMap = fieldObjectMaps[
      calculateShortPosition(fieldPosition, fieldDirection)
    ].objects?.find((object) => object.type === "person");
    if (!fieldMap) {
      return;
    }
    if (fieldMap.type === "person" && fieldMap.talkLabel) {
      const firstTalk = talkMaps[fieldMap.talkLabel].talkScripts.find(
        (script) =>
          script.label === talkMaps[fieldMap.talkLabel].initialTalkLabel
      );
      if (!firstTalk) {
        throw new Error("firstTalk is required");
      }
      onChangeFieldMode("talk");
      setCurrentTalkLabel(fieldMap.talkLabel);
      setCurrentTalk(firstTalk);
      return;
    }
  }, [
    fieldDirection,
    fieldPosition,
    fieldObjectMaps,
    talkMaps,
    onChangeFieldMode,
  ]);

  useWatch(latestAction, (latestAction) => {
    if (fieldMode === "walk") {
      if (!canTalk()) {
        return;
      }
      onStartTalk();
    }

    if (latestAction?.action === "onPushAbove") {
      onSelect("up");
      return;
    }
    if (latestAction?.action === "onPushBelow") {
      onSelect("down");
      return;
    }
    if (latestAction?.action === "onPushA") {
      onTalk();
      return;
    }
  });

  return {
    currentTalk,
    currentTalkLabel,
    currentSelectionLabel,
    currentSelection,
  };
};
