import { currentLocationAtom } from "@/atoms/currentLocation";
import { FieldMode } from "@/features/adventure/types";
import { FieldDirection, FieldObjectMap, FieldPosition } from "@types";
import { positionToShortPosition } from "@/features/adventure/utils";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ActionHistory } from "./useActionHistories";
import { useWatch } from "./useWatch";

export type Options = {
  latestAction: ActionHistory | null;
  fieldObjectMap: FieldObjectMap;
  fieldMode: FieldMode;
  fieldPosition: FieldPosition;
  fieldDirection: FieldDirection;
  currentField: string;
};

/**
 * ポケモンとの遭遇を制御する
 */
export const usePokemonEncounterAction = ({
  latestAction,
  fieldObjectMap,
  fieldMode,
  fieldPosition,
  fieldDirection,
  currentField,
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
    return fieldObjectMap[positionToShortPosition(fieldPosition)].objects?.some(
      (object) => object.type === "ornament" && object.ornamentType === "grass"
    );
  }, [fieldObjectMap, fieldPosition]);

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
    return Math.random() < 0.3;
  }, []);

  const onEncounter = useCallback(() => {
    saveStateCurrentLocation({
      field: currentField,
      position: fieldPosition,
      direction: fieldDirection,
    });
    router.push("/samples/battle");
  }, [
    saveStateCurrentLocation,
    currentField,
    fieldPosition,
    fieldDirection,
    router,
  ]);

  useWatch(latestAction, () => {
    if (!canEncounter || !calculateIsEncounter()) {
      return;
    }
    // 判定条件を満たした場合ポケモンと遭遇する
    onEncounter();
  });
};
