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
import { ActionHistory } from "./useActionHistories";
import { useWatch } from "./useWatch";

export type Options = {
  latestAction: ActionHistory | null;
  fieldObjectMaps: FieldObjectMaps;
  fieldMode: FieldMode;
  fieldPosition: FieldPosition;
  fieldDirection: FieldDirection;
};

/**
 * ポケモンとの遭遇を制御する
 */
export const usePokemonEncounterAction = ({
  latestAction,
  fieldObjectMaps,
  fieldMode,
  fieldPosition,
  fieldDirection,
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
      latestAction?.action === "onPushBelow" ||
      latestAction?.action === "onPushAbove" ||
      latestAction?.action === "onPushRight" ||
      latestAction?.action === "onPushLeft"
    );
  }, [fieldMode, latestAction]);

  /**
   * 草むらかどうか判定
   */
  const isObjectGrass = useCallback(() => {
    return fieldObjectMaps[
      positionToShortPosition(fieldPosition)
    ].objects?.some(
      (object) => object.type === "ornament" && object.ornamentType === "grass"
    );
  }, [fieldObjectMaps, fieldPosition]);

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
    return Math.random() < 0.1;
  }, []);

  const onEncounter = useCallback(() => {
    saveStateCurrentLocation({
      field: "sample",
      position: fieldPosition,
      direction: fieldDirection,
    });
    // バトル画面へ遷移
    router.push("/samples/battle");
  }, [saveStateCurrentLocation, fieldPosition, fieldDirection, router]);

  useWatch(latestAction, () => {
    if (!canEncounter || !calculateIsEncounter()) {
      return;
    }
    // 判定条件を満たした場合ポケモンと遭遇する
    onEncounter();
  });
};
