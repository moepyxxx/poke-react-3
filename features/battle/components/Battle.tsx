"use client";

import {
  useControllerActionHistories,
  useGameController,
} from "@/features/adventure/hooks";
import { GameController } from "@/components/GameController";
import { FC, useState } from "react";
import { BattlePokemon, BattleState } from "../types";
import { useBattle } from "../hooks/useBattle";
import Image from "next/image";

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
    <div className="p-5">
      <p>バトルだ！</p>
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
      </p>
      <Image
        src={onHandPokemon.basic.imageURL}
        alt="味方ポケモン"
        width="100"
        height="100"
      />
      <Image
        src={enemyPokemon.basic.imageURL}
        alt="敵ポケモン"
        width="100"
        height="100"
      />
      <GameController controllerOptions={controllerOptions} />
    </div>
  );
};
