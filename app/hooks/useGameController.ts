"use client";

import {
  FieldAction,
  FieldDirection,
  FieldMaps,
  FieldMode,
  FieldPosition,
  FieldTalk,
  FieldTalkSelect,
  FieldTalks,
} from "@/types";
import { positionToShortPosition } from "@/utils";
import { on } from "events";
import { useCallback, useState } from "react";

export type UseGameControllerOptions = {
  initialFieldPosition: FieldPosition;
  initialFieldDirection: FieldDirection;
  fieldMaps: FieldMaps;
  talkMaps: FieldTalks;
  actionMaps: Record<string, FieldAction>;
};
export const useGameController = ({
  fieldMaps,
  initialFieldDirection,
  initialFieldPosition,
  talkMaps,
  actionMaps,
}: UseGameControllerOptions) => {
  const [currentFieldDirection, setCurrentFieldDirection] =
    useState<FieldDirection>(initialFieldDirection);
  const [currentFieldPosition, setCurrentFieldPosition] =
    useState<FieldPosition>(initialFieldPosition);
  const [currentMode, setCurrentMode] = useState<FieldMode>("walk");
  const [currentTalkLabel, setCurrentTalkLabel] = useState<string | null>(null);
  const [currentTalk, setCurrentTalk] = useState<FieldTalk | null>(null);
  const [currentSelectionLabel, setCurrentSelectionLabel] = useState<
    string | null
  >(null);
  const [currentSelection, setCurrentSelection] = useState<FieldTalkSelect[]>(
    []
  );

  const onPushA = useCallback(() => {
    // 会話モードの場合
    if (currentMode === "select" && currentTalkLabel != null) {
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
      setCurrentMode("talk");
      return;
    }

    if (currentMode === "talk") {
      // 会話終了の場合
      if (!currentTalk?.nextLabel) {
        setCurrentMode("walk");
        setCurrentTalk(null);
        setCurrentTalkLabel(null);
        return;
      }

      // 会話継続の場合
      if (currentMode === "talk" && currentTalkLabel != null) {
        // 会話継続（次の会話）の場合
        const nextTalk = talkMaps[currentTalkLabel].talkScripts.find(
          (script) => script.label === currentTalk?.nextLabel
        );
        if (!nextTalk) {
          throw new Error("nextTalk is required");
        }
        setCurrentTalk(nextTalk);

        if (nextTalk.selections) {
          setCurrentMode("select");
          setCurrentSelection(nextTalk.selections);
          setCurrentSelectionLabel(nextTalk.selections[0].nextLabel);
        }

        return;
      }
    }

    // 会話開始の場合
    const fieldMap =
      fieldMaps[positionToShortPosition(currentFieldPosition)]?.[
        currentFieldDirection
      ];
    if (fieldMap?.mode === "talk") {
      const firstTalk = talkMaps[fieldMap.talkLabel].talkScripts.find(
        (script) =>
          script.label === talkMaps[fieldMap.talkLabel].initialTalkLabel
      );
      if (!firstTalk) {
        throw new Error("firstTalk is required");
      }
      setCurrentMode("talk");
      setCurrentTalkLabel(fieldMap.talkLabel);
      setCurrentTalk(firstTalk);
      return;
    }
  }, [
    fieldMaps,
    currentFieldPosition,
    currentFieldDirection,
    setCurrentMode,
    setCurrentTalk,
    talkMaps,
    currentMode,
    currentTalk,
    currentTalkLabel,
    currentSelectionLabel,
  ]);

  // TODO
  const onPushB = useCallback(() => {
    console.log("pushB");
  }, []);

  // TODO
  const onPushStart = useCallback(() => {
    console.log("pushStart");
  }, []);

  const onWalk = useCallback(
    (direction: FieldDirection, nextPosition: FieldPosition) => {
      if (currentMode !== "walk") {
        return;
      }

      // 向きが違う場合は向きを変える
      if (currentFieldDirection !== direction) {
        setCurrentFieldDirection(direction);
        return;
      }

      // 進める場合は1マス進む
      const fieldMap =
        fieldMaps[positionToShortPosition(currentFieldPosition)]?.[direction];
      if (fieldMap?.mode === "walk") {
        setCurrentFieldPosition(nextPosition);
        return;
      }
    },
    [
      currentFieldDirection,
      setCurrentFieldDirection,
      fieldMaps,
      currentMode,
      currentFieldPosition,
    ]
  );

  const onSelect = useCallback(
    (direction: "up" | "down") => {
      if (currentMode !== "select") {
        return;
      }

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
    [currentMode, currentSelection, currentSelectionLabel]
  );

  const onPushAbove = useCallback(() => {
    switch (currentMode) {
      case "walk":
        onWalk("above", {
          ...currentFieldPosition,
          y: currentFieldPosition.y - 1,
        });
      case "select":
        onSelect("up");
        break;
    }
  }, [currentFieldPosition, onWalk, currentMode, onSelect]);

  const onPushBelow = useCallback(() => {
    switch (currentMode) {
      case "walk":
        onWalk("below", {
          ...currentFieldPosition,
          y: currentFieldPosition.y + 1,
        });
      case "select":
        onSelect("down");
        break;
    }
  }, [currentFieldPosition, onWalk, currentMode, onSelect]);

  const onPushLeft = useCallback(() => {
    onWalk("left", {
      ...currentFieldPosition,
      x: currentFieldPosition.x - 1,
    });
  }, [currentFieldPosition, onWalk]);

  const onPushRight = useCallback(() => {
    onWalk("right", {
      ...currentFieldPosition,
      x: currentFieldPosition.x + 1,
    });
  }, [currentFieldPosition, onWalk]);

  return {
    currentFieldDirection,
    currentFieldPosition,
    currentMode,
    currentTalk,
    currentSelectionLabel,
    currentSelection,
    controllerOptions: {
      onPushA,
      onPushB,
      onPushStart,
      onPushAbove,
      onPushBelow,
      onPushLeft,
      onPushRight,
    },
  };
};
