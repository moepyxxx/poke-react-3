import { PokeAPIPokemonForm } from ".";

const POKE_API_BASE_ENDPOINT = "https://pokeapi.co/api/v2";

export const usePokeAPI = () => {
  /**
   * GET pokemon-form API
   */
  const fetchPokemonFormAPI = async (
    pokemonId: number
  ): Promise<PokeAPIPokemonForm> => {
    return await fetch(`${POKE_API_BASE_ENDPOINT}/pokemon-form/${pokemonId}`, {
      cache: "force-cache",
    }).then((res) => res.json());
  };
  return {
    fetchPokemonFormAPI,
  };
};
