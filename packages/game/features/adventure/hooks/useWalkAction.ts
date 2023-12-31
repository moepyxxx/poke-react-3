"use client";

import { FieldMode } from "@/features/adventure/types";
import {
  FieldDirection,
  FieldObject,
  FieldObjectMap,
  FieldPosition,
} from "@types";
import { calculateShortPosition } from "@/features/adventure/utils";
import { useCallback } from "react";
import { useWatch } from "./useWatch";
import { ActionHistory } from "./useActionHistories";

export type Options = {
  fieldDirection: FieldDirection;
  fieldPosition: FieldPosition;
  latestAction: ActionHistory | null;
  fieldMode: FieldMode;
  fieldObjectMap: FieldObjectMap;
  onChangeFieldDirection: (direction: FieldDirection) => void;
  onChangeFieldPosition: (position: FieldPosition) => void;
};

/**
 * フィールドでの歩行を制御する
 */
export const useWalkAction = ({
  fieldDirection,
  fieldPosition,
  fieldMode,
  fieldObjectMap,
  latestAction,
  onChangeFieldDirection,
  onChangeFieldPosition,
}: Options) => {
  const isPassable = useCallback((objects: FieldObject[]): boolean => {
    return objects.every((object) => {
      if (object.type === "person") {
        return false;
      }
      if (object.type === "ornament" && object.ornamentType !== "grass") {
        return false;
      }
      return true;
    });
  }, []);

  const onWalk = useCallback(
    (direction: FieldDirection, nextPosition: FieldPosition) => {
      if (fieldMode !== "walk") {
        return;
      }

      // 向きが違う場合は向きを変える
      if (fieldDirection !== direction) {
        onChangeFieldDirection(direction);
        return;
      }

      // 進める場合は1マス進む
      const fieldMap =
        fieldObjectMap[calculateShortPosition(fieldPosition, fieldDirection)];
      if (
        fieldMap.base !== "black" &&
        (!fieldMap.objects || isPassable(fieldMap.objects))
      ) {
        onChangeFieldPosition(nextPosition);
        return;
      }
    },
    [
      fieldDirection,
      onChangeFieldDirection,
      onChangeFieldPosition,
      fieldObjectMap,
      fieldMode,
      fieldPosition,
      isPassable,
    ]
  );

  useWatch(latestAction, (latestAction) => {
    if (fieldMode !== "walk" || latestAction == null) {
      return;
    }
    switch (latestAction.action) {
      case "onPushAbove":
        onWalk("above", {
          ...fieldPosition,
          y: fieldPosition.y - 1,
        });
        break;
      case "onPushBelow":
        onWalk("below", {
          ...fieldPosition,
          y: fieldPosition.y + 1,
        });
        break;
      case "onPushLeft":
        onWalk("left", {
          ...fieldPosition,
          x: fieldPosition.x - 1,
        });
        break;
      case "onPushRight":
        onWalk("right", {
          ...fieldPosition,
          x: fieldPosition.x + 1,
        });
        break;
    }
  });
};
