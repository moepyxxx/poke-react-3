/**
 * Poke APIの型
 * 必要なもののみ定義して利用する
 */

export type PokeAPIPokemonForm = {
  pokemon: {
    name: string;
  };
  sprites: {
    front_default: string;
    back_default: string;
  };
};
