"use client";

import { currentLocationAtom } from "@/atoms/currentLocation";
import { useAtom } from "jotai";
import {
  useControllerActionHistories,
  useGameController,
} from "@/features/adventure/hooks";
import { GameControllerView } from "@/features/adventure/components";
import { useState } from "react";
import { BattleState } from "../types";
import { useBattle } from "../hooks/useBattle";

const SAMPLE_ON_HAND_POKEMONS = [
  {
    basic: {
      pokemonUId: "ダミー味方",
      name: "アチャモ",
      level: 10,
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

const SAMPLE_ENEMY_POKEMON = {
  basic: {
    pokemonUId: "ダミー敵",
    name: "ジグザグマ",
    level: 3,
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
  const [stateCurrentLocation] = useAtom(currentLocationAtom);
  const [battleState, setBattleState] = useState<BattleState>("startBattle");

  const onChangeBattleState = (state: BattleState) => setBattleState(state);

  const { latestAction, onControllerAct } = useControllerActionHistories();

  const { controllerOptions } = useGameController({
    onControllerAct,
  });

  const { lines, currentLineIndex, nextSelect } = useBattle({
    onHandPokemons: SAMPLE_ON_HAND_POKEMONS,
    enemyPokemon: SAMPLE_ENEMY_POKEMON,
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
          : SAMPLE_ON_HAND_POKEMONS[0].works.find(
              (work) => work.id === nextSelect.workId
            )?.name}
      </p>
      <GameControllerView controllerOptions={controllerOptions} />
    </div>
  );
};
