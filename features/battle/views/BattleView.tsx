"use client";

import { currentLocationAtom } from "@/atoms/currentLocation";
import { useAtom } from "jotai";
import {
  useControllerActionHistories,
  useGameController,
} from "@/features/adventure/hooks";

export const BattleView = () => {
  const [stateCurrentLocation] = useAtom(currentLocationAtom);

  const { latestAction, onControllerAct } = useControllerActionHistories();

  const { controllerOptions } = useGameController({
    onControllerAct,
  });

  return (
    <>
      <p>バトルだ！</p>
      <p>{stateCurrentLocation?.direction}</p>
      <p>{stateCurrentLocation?.field}</p>
      <p>
        {stateCurrentLocation?.position.x} : {stateCurrentLocation?.position.y}
      </p>
    </>
  );
};
