import { currentLocationAtom } from "@/atoms/currentLocation";
import {
  ControllerAction,
  FieldDirection,
  FieldMode,
  FieldObjectMaps,
  FieldPosition,
} from "@/types";
import { positionToShortPosition } from "@/utils";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export type Options = {
  currentAction: ControllerAction | null;
  fieldObjectMaps: FieldObjectMaps;
  fieldMode: FieldMode;
  currentFieldPosition: FieldPosition;
  currentDirection: FieldDirection;
};
export const UsePokemonEncounterAction = ({
  currentAction,
  fieldObjectMaps,
  fieldMode,
  currentFieldPosition,
  currentDirection,
}: Options) => {
  const [, saveStateCurrentLocation] = useAtom(currentLocationAtom);
  const router = useRouter();

  /**
   * fieldModeがwalkかどうか判定
   */
  const isActionWork = useCallback(() => {
    if (fieldMode !== "walk") {
      return false;
    }
    return (
      currentAction === "onPushBelow" ||
      currentAction === "onPushAbove" ||
      currentAction === "onPushRight" ||
      currentAction === "onPushLeft"
    );
  }, [fieldMode, currentAction]);

  /**
   * 草むらかどうか判定
   */
  const isObjectGrass = useCallback(() => {
    return fieldObjectMaps[
      positionToShortPosition(currentFieldPosition)
    ].objects?.some(
      (object) => object.type === "ornament" && object.ornamentType === "grass"
    );
  }, [fieldObjectMaps, currentFieldPosition]);

  const canEncounter = useMemo(() => {
    if (!isActionWork()) {
      return false;
    }
    if (!isObjectGrass()) {
      return false;
    }
    return true;
  }, [isActionWork, isObjectGrass]);

  /**
   * 野生ポケモンとの遭遇確率による判定
   */
  const calculateIsEncounter = useCallback(() => {
    return Math.random() < 0.5;
  }, []);

  const onEncounter = useCallback(() => {
    saveStateCurrentLocation({
      field: "sample",
      position: currentFieldPosition,
      direction: currentDirection,
    });
    // バトル画面へ遷移
    router.push("/samples/battle");
  }, [
    saveStateCurrentLocation,
    currentFieldPosition,
    currentDirection,
    router,
  ]);

  useEffect(() => {
    if (!canEncounter || !calculateIsEncounter()) {
      return;
    }
    // 判定条件を満たした場合ポケモンと遭遇する
    onEncounter();
  }, [canEncounter, calculateIsEncounter, onEncounter]);
};
