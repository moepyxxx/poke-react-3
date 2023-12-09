"use client";

import {
  useControllerActionHistories,
  useGameController,
} from "@/features/adventure/hooks";
import { GameController } from "@/components/GameController";
import { FC, useState } from "react";
import { BattlePokemon, BattleState } from "../types";
import { useBattle } from "../hooks/useBattle";
import { BattleScreen } from "./BattleScreen";
import { GameScreen } from "@/components/GameScreen";
import { LineScreen } from "@/components/LineScreen";
import { MainSelectScreen } from "@/components/MainSelectScreen";

type Props = {
  onHandPokemon: BattlePokemon;
  enemyPokemon: BattlePokemon;
};
export const Battle: FC<Props> = ({ onHandPokemon, enemyPokemon }) => {
  const [battleState, setBattleState] = useState<BattleState>("startBattle");

  const onChangeBattleState = (state: BattleState) => setBattleState(state);

  const { latestAction, onControllerAct } = useControllerActionHistories();

  const { controllerOptions } = useGameController({
    onControllerAct,
  });

  const { lines, currentLineIndex, nextSelect } = useBattle({
    onHandPokemon,
    enemyPokemon,
    latestAction,
    battleState,
    onChangeBattleState,
  });

  return (
    <main>
      <GameScreen>
        <BattleScreen
          onHandPokemon={onHandPokemon}
          enemyPokemon={enemyPokemon}
        />
        {lines.length > 0 && <LineScreen line={lines[currentLineIndex]} />}
        {battleState === "selectAction" && nextSelect != null && (
          <MainSelectScreen<number>
            currentSelectKey={nextSelect.workId}
            selectableItems={onHandPokemon.works.map((work) => ({
              label: work.name,
              key: work.id,
            }))}
          />
        )}
      </GameScreen>
      {/* <p>バトルだ！</p>
      <p>battle state: {battleState}</p>
      <p>line: {lines.length > 0 ? lines[currentLineIndex] : ""}</p>
      <p>
        (line数:{lines.length}, currentIndex:{currentLineIndex})
      </p>
      <p>
        次のこうげき:
        {nextSelect == null
          ? "なし"
          : onHandPokemon.works.find((work) => work.id === nextSelect.workId)
              ?.name}
      </p> */}
      <div className="mt-3">
        <GameController controllerOptions={controllerOptions} />
      </div>
    </main>
  );
};
