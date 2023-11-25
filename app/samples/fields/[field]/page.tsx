"use client";

import { GameControllerView } from "@/components/GameControllerView";
import { useGameController } from "@/hooks/useGameController";
import {
  ACTION_MAPS,
  FIELD_ALL_TILE_COUNT,
  FIELD_MIDDLE_POSITION,
  FIELD_SIZE,
  FIELD_VISIBLE_TILE_COUNT,
  SAMPLE_FIELD_OBJECTS,
  SAMPLE_FIELD_MAP,
  TALK_MAPS,
} from "./sample";
import { GameScreenView } from "@/components/GameScreenView";
import { UsePokemonEncounterAction } from "@/hooks/usePokemonEncounterAction";

export default function SampleFieldPage({
  params,
}: {
  params: { field: string };
}) {
  const {
    controllerOptions,
    currentFieldDirection,
    currentFieldPosition,
    currentMode,
    currentTalk,
    currentAction,
    currentSelection,
    currentSelectionLabel,
  } = useGameController({
    fieldMaps: SAMPLE_FIELD_MAP,
    talkMaps: TALK_MAPS,
    actionMaps: ACTION_MAPS,
    initialFieldDirection: "right",
    initialFieldPosition: {
      x: 1 + FIELD_MIDDLE_POSITION,
      y: 1 + FIELD_MIDDLE_POSITION,
    },
  });

  UsePokemonEncounterAction({
    currentAction,
    fieldObjectMaps: SAMPLE_FIELD_OBJECTS,
    fieldMode: currentMode,
    currentFieldPosition,
    currentDirection: currentFieldDirection,
  });

  return (
    <main className="p-24">
      <div className="mx-0 my-auto flex items-start">
        <GameScreenView
          fieldSize={FIELD_SIZE}
          fieldAllTileCount={FIELD_ALL_TILE_COUNT}
          fieldVisibleTileCount={FIELD_VISIBLE_TILE_COUNT}
          fieldObjects={SAMPLE_FIELD_OBJECTS}
          currentFieldPosition={currentFieldPosition}
          currentFieldDirection={currentFieldDirection}
        />
        <div className="pl-12">
          <h1>field: {params.field}</h1>
          <h2>current</h2>
          <p>mode: {currentMode}</p>
          <p>direction: {currentFieldDirection}</p>
          <p>
            positionX: {currentFieldPosition.x}, positionY:{" "}
            {currentFieldPosition.y}
          </p>
          <h2>talk content</h2>
          {currentTalk && <p>「{currentTalk?.talk}」</p>}
          {currentSelectionLabel && <p>現在の選択: {currentSelectionLabel}</p>}
          {currentSelection.map((selection) => (
            <p key={selection.nextLabel}>
              talk: {selection.talk}, next: {selection.nextLabel}
            </p>
          ))}
        </div>
      </div>
      <GameControllerView controllerOptions={controllerOptions} />
    </main>
  );
}
