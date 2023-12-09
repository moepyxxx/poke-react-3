"use client";

import { FC, useMemo } from "react";
import { BattlePokemon, BattleResult, BattleState } from "../types";
import Image from "next/image";

type Props = {
  onHandPokemon: BattlePokemon;
  enemyPokemon: BattlePokemon;
  winner: BattleResult["winner"] | null;
  battleState: BattleState;
};
export const BattleScreen: FC<Props> = ({
  onHandPokemon,
  enemyPokemon,
  winner,
  battleState,
}) => {
  const isOnHandPokemonDisplay = useMemo(() => {
    if (battleState === "endBattle" && winner === "enemy") {
      return false;
    }
    if (battleState === "startBattle") {
      return false;
    }
    return true;
  }, [battleState, winner]);

  const isEnemyPokemonDisplay = useMemo(() => {
    if (battleState === "endBattle" && winner === "onHand") {
      return false;
    }
    return true;
  }, [battleState, winner]);

  return (
    <div className="flex gap-2 justify-center	mt-10">
      <div className={`${isOnHandPokemonDisplay ? "" : "opacity-0"}`}>
        <Image
          src={onHandPokemon.basic.imageURL}
          alt="味方ポケモン"
          width="100"
          height="100"
        />
      </div>
      <div className={`${isEnemyPokemonDisplay ? "" : "opacity-0"}`}>
        <Image
          src={enemyPokemon.basic.imageURL}
          alt="敵ポケモン"
          width="100"
          height="100"
        />
      </div>
    </div>
  );
};
