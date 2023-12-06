"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BattlePokemon } from "../types";
import { v4 as uuid } from "uuid";
import { useReadyBattle } from "../hooks/useReadyBattle";
import { Battle } from "../components/Battle";
import { onHandPokemonsAtom } from "@/atoms/onHandPokemons";

const SAMPLE_ON_HAND_POKEMONS: BattlePokemon[] = [
  {
    basic: {
      pokemonUId: uuid(),
      name: "アチャモ",
      level: 10,
      imageURL:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png",
    },
    status: {
      hp: {
        max: 20,
        remain: 15,
      },
    },
    works: [
      {
        id: 1,
        name: "たいあたり",
        pp: {
          max: 10,
          remain: 10,
        },
      },
      {
        id: 2,
        name: "なきごえ",
        pp: {
          max: 10,
          remain: 10,
        },
      },
      {
        id: 3,
        name: "すなかけ",
        pp: {
          max: 10,
          remain: 10,
        },
      },
      {
        id: 4,
        name: "ひのこ",
        pp: {
          max: 10,
          remain: 10,
        },
      },
    ],
  },
];

const SAMPLE_ENEMY_POKEMON: BattlePokemon = {
  basic: {
    pokemonUId: uuid(),
    name: "ジグザグマ",
    level: 3,
    imageURL:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/263.png",
  },
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
        max: 10,
        remain: 10,
      },
    },
    {
      id: 2,
      name: "なきごえ",
      pp: {
        max: 10,
        remain: 10,
      },
    },
  ],
};

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

  return battlePokemon == null ? (
    ""
  ) : (
    <Battle
      enemyPokemon={battlePokemon}
      onHandPokemon={setOnBattlePokemon(onHandPokemons[0])}
    />
  );
};
