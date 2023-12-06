import { OnHandPokemon } from "@/atoms/onHandPokemons";
import { BattlePokemon } from "../types";
import { useCallback } from "react";
import {
  MAX_POKEMON_NO_RANGE,
  MIN_POKEMON_NO_RANGE,
  useFetchPokemons,
} from "@/poke-api";

export const useReadyBattle = () => {
  const { fetchBattlePokemonByID } = useFetchPokemons();
  /**
   * 敵のポケモンをセットする
   */
  const setEnemyBattlePokemon: () => Promise<BattlePokemon> =
    useCallback(async () => {
      const randomPokemonNo =
        Math.floor(Math.random() * MAX_POKEMON_NO_RANGE) + MIN_POKEMON_NO_RANGE;
      return await fetchBattlePokemonByID(randomPokemonNo);
    }, []);

  /**
   * 味方のポケモンをセットする
   */
  const setOnBattlePokemon = (pokemon: OnHandPokemon): BattlePokemon => {
    return {
      basic: pokemon.basic,
      status: {
        hp: pokemon.battle.status.hp,
      },
      works: [
        {
          id: 1,
          name: "たいあたり",
          pp: {
            max: 35,
            remain: 35,
          },
        },
      ],
    };
  };
  return {
    setOnBattlePokemon,
    setEnemyBattlePokemon,
  };
};
