"use client";

import { GameControllerView } from "@/components/GameControllerView";
import { useGameController } from "@/hooks/useGameController";
import {
  FIELD_ALL_TILE_COUNT,
  FIELD_MIDDLE_POSITION,
  FIELD_SIZE,
  FIELD_VISIBLE_TILE_COUNT,
  SAMPLE_FIELD_OBJECTS,
  TALK_MAPS,
} from "./sample";
import { GameScreenView } from "@/components/GameScreenView";
import { usePokemonEncounterAction } from "@/hooks/usePokemonEncounterAction";
import { useState } from "react";
import { FieldDirection, FieldMode, FieldPosition } from "@/types";
import { useTalkAction } from "@/hooks/useTalkAction";
import { useControllerActionHistories } from "@/hooks/useActionHistories";
import { useWalkAction } from "@/hooks/useWalkAction";

export default function SampleFieldPage({
  params,
}: {
  params: { field: string };
}) {
  const [fieldMode, setFieldMode] = useState<FieldMode>("walk");
  const [fieldDirection, setFieldDirection] = useState<FieldDirection>("right");
  const [fieldPosition, setFieldPosition] = useState<FieldPosition>({
    x: 1 + FIELD_MIDDLE_POSITION,
    y: 1 + FIELD_MIDDLE_POSITION,
  });

  const onChangeFieldMode = (mode: FieldMode) => {
    setFieldMode(mode);
  };

  const onChangeFieldDirection = (direction: FieldDirection) => {
    setFieldDirection(direction);
  };

  const onChangeFieldPosition = (position: FieldPosition) => {
    setFieldPosition(position);
  };

  const { latestAction, onControllerAct } = useControllerActionHistories();

  const { controllerOptions } = useGameController({
    onControllerAct,
  });

  const { currentSelectionLabel, currentTalk, currentSelection } =
    useTalkAction({
      fieldMode,
      latestAction,
      fieldObjectMaps: SAMPLE_FIELD_OBJECTS,
      talkMaps: TALK_MAPS,
      fieldDirection,
      fieldPosition,
      onChangeFieldMode,
    });

  useWalkAction({
    fieldMode,
    latestAction,
    fieldPosition,
    fieldDirection,
    fieldObjectMaps: SAMPLE_FIELD_OBJECTS,
    onChangeFieldDirection,
    onChangeFieldPosition,
  });

  usePokemonEncounterAction({
    latestAction,
    fieldObjectMaps: SAMPLE_FIELD_OBJECTS,
    fieldMode,
    fieldPosition,
    fieldDirection,
  });

  return (
    <main className="p-24">
      <div className="mx-0 my-auto flex items-start">
        <GameScreenView
          fieldSize={FIELD_SIZE}
          fieldAllTileCount={FIELD_ALL_TILE_COUNT}
          fieldVisibleTileCount={FIELD_VISIBLE_TILE_COUNT}
          fieldObjects={SAMPLE_FIELD_OBJECTS}
          currentFieldPosition={fieldPosition}
          currentFieldDirection={fieldDirection}
        />
        <div className="pl-12">
          <h1>field: {params.field}</h1>
          <h2>current</h2>
          <p>mode: {fieldMode}</p>
          <p>direction: {fieldDirection}</p>
          <p>
            positionX: {fieldPosition.x}, positionY: {fieldPosition.y}
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
