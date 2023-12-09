import { useCallback } from "react";
import { BattlePokemon } from "../features/battle/types";
import { usePokeAPI } from "./usePokeAPI";
import { v4 as uuid } from "uuid";

export const MIN_POKEMON_NO_RANGE = 252;
export const MAX_POKEMON_NO_RANGE = 386;
/**
 * ポケモンの情報をAPIからfetchする
 */
export const useFetchPokemons = () => {
  const pokeAPI = usePokeAPI();
  /**
   * やせいのポケモンをセットする
   */
  const fetchBattlePokemonByID: (pokemonID: number) => Promise<BattlePokemon> =
    useCallback(async (pokemonID: number) => {
      const res = await pokeAPI.fetchPokemonFormAPI(pokemonID);
      const battlePokemon: BattlePokemon = {
        basic: {
          pokemonUId: uuid(),
          name: res.pokemon.name,
          level: 5,
          imageURL: res.sprites.front_default,
        },
        status: {
          hp: {
            max: 10,
            remain: 10,
          },
        },
        // TODO
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
      return battlePokemon;
    }, []);

  return {
    fetchBattlePokemonByID,
  };
};
