import { atom } from "jotai";

export type BasicStatus = {
  pokemonUId: string;
  name: string;
  nickname?: string;
  level: number;
  imageURL: string;
};

export type WorkStatus = {
  id: number;
  name: string;
  pp: {
    max: number;
    remain: number;
  };
};

export type BattlePokemonStatus = {
  hp: {
    max: number;
    remain: number;
  };
};

export type OnHandPokemon = {
  basic: BasicStatus;
  battle: {
    status: BattlePokemonStatus;
    works: WorkStatus[];
  };
};

export const onHandPokemonsAtom = atom<OnHandPokemon[]>([
  {
    basic: {
      pokemonUId: "255",
      name: "アチャモ",
      level: 5,
      imageURL:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png",
    },
    battle: {
      status: {
        hp: {
          max: 10,
          remain: 10,
        },
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
        {
          id: 2,
          name: "なきごえ",
          pp: {
            max: 35,
            remain: 35,
          },
        },
        {
          id: 3,
          name: "すなかけ",
          pp: {
            max: 35,
            remain: 35,
          },
        },
        {
          id: 4,
          name: "ひのこ",
          pp: {
            max: 35,
            remain: 35,
          },
        },
      ],
    },
  },
]);
