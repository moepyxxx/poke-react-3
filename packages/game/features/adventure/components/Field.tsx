"use client";

import { GameController } from "@/components/GameController/GameController";
import { useGameController } from "@/features/adventure/hooks/useGameController";
import {
  FIELD_ALL_TILE_COUNT,
  FIELD_SIZE,
  FIELD_VISIBLE_TILE_COUNT,
} from "@constants";
import { FieldScreen } from "@/features/adventure/components/FieldScreen";
import { usePokemonEncounterAction } from "@/features/adventure/hooks/usePokemonEncounterAction";
import { FC, useState } from "react";
import { FieldMode } from "@/features/adventure/types";
import {
  FieldDirection,
  FieldObjectMap,
  FieldPosition,
  FieldTalkMap,
} from "@types";
import { useTalkAction } from "@/features/adventure/hooks/useTalkAction";
import { useControllerActionHistories } from "@/features/adventure/hooks/useActionHistories";
import { useWalkAction } from "@/features/adventure/hooks/useWalkAction";
import { GameScreen } from "@/components/GameScreen";
import { LineScreen } from "@/components/LineScreen";
import { SubSelectScreen } from "@/components/SubSelectScreen";

type Props = {
  field: string;
  initialDirection: FieldDirection;
  initialPosition: FieldPosition;
  fieldObjectMap: FieldObjectMap;
  fieldTalkMap: FieldTalkMap;
};
export const Field: FC<Props> = ({
  field,
  initialDirection,
  initialPosition,
  fieldObjectMap,
  fieldTalkMap,
}) => {
  const [fieldMode, setFieldMode] = useState<FieldMode>("walk");
  const [fieldDirection, setFieldDirection] =
    useState<FieldDirection>(initialDirection);
  const [fieldPosition, setFieldPosition] =
    useState<FieldPosition>(initialPosition);

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
      fieldObjectMap: fieldObjectMap,
      fieldTalkMap,
      fieldDirection,
      fieldPosition,
      onChangeFieldMode,
    });

  useWalkAction({
    fieldMode,
    latestAction,
    fieldPosition,
    fieldDirection,
    fieldObjectMap: fieldObjectMap,
    onChangeFieldDirection,
    onChangeFieldPosition,
  });

  usePokemonEncounterAction({
    latestAction,
    fieldObjectMap: fieldObjectMap,
    fieldMode,
    fieldPosition,
    fieldDirection,
    currentField: field,
  });

  return (
    <main>
      <GameScreen>
        <FieldScreen
          fieldSize={FIELD_SIZE}
          fieldAllTileCount={FIELD_ALL_TILE_COUNT}
          fieldVisibleTileCount={FIELD_VISIBLE_TILE_COUNT}
          fieldObjects={fieldObjectMap}
          currentFieldPosition={fieldPosition}
          currentFieldDirection={fieldDirection}
        />
        {currentTalk && <LineScreen line={currentTalk.talk} />}
        {currentSelectionLabel && (
          <SubSelectScreen<string>
            currentSelectKey={currentSelectionLabel}
            selectableItems={currentSelection.map((selection) => ({
              label: selection.talk,
              key: selection.nextLabel,
            }))}
          />
        )}
      </GameScreen>
      {/* debug<div className="pl-12">
          <h1>field: {field}</h1>
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
        </div> */}
      <div className="mt-3">
        <GameController controllerOptions={controllerOptions} />
      </div>
    </main>
  );
};
