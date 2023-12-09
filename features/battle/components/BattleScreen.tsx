"use client";

import { FC } from "react";
import { BattlePokemon } from "../types";
import Image from "next/image";

type Props = {
  onHandPokemon: BattlePokemon;
  enemyPokemon: BattlePokemon;
};
export const BattleScreen: FC<Props> = ({ onHandPokemon, enemyPokemon }) => {
  return (
    <div className="flex gap-2 justify-center	mt-10">
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
    </div>
  );
};
