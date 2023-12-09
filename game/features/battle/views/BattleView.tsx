"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BattlePokemon } from "../types";
import { useReadyBattle } from "../hooks/useReadyBattle";
import { Battle } from "../components/Battle";
import { onHandPokemonsAtom } from "@/atoms/onHandPokemons";

export const BattleView = () => {
  const [onHandPokemons] = useAtom(onHandPokemonsAtom);

  const [battlePokemon, setBattlePokemon] = useState<BattlePokemon | null>(
    null
  );
  const { setEnemyBattlePokemon, setOnBattlePokemon } = useReadyBattle();

  useEffect(() => {
    setEnemy();
  }, []);

  const setEnemy = async () => {
    const pokemon = await setEnemyBattlePokemon();
    setBattlePokemon(pokemon);
  };

  if (battlePokemon == null) {
    return <></>;
  }

  return (
    <Battle
      enemyPokemon={battlePokemon}
      onHandPokemon={setOnBattlePokemon(onHandPokemons[0])}
    />
  );
};
