"use client";

import { currentLocationAtom } from "@/atoms/currentLocation";
import { useAtom } from "jotai";

export default function BattlePage() {
  const [stateCurrentLocation] = useAtom(currentLocationAtom);

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
}
