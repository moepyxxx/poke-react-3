import { useState } from "react";
import { BattlePokemon, BattlePokemonStatus } from "../types";

type Options = {
  /** 手持ちのポケモン */
  onHandPokemons: BattlePokemon[];
  /** あいてのポケモン */
  enemyPokemon: BattlePokemon;
};

function getPokemonStatus(pokemon: BattlePokemon): BattlePokemonStatus {
  return {
    uId: pokemon.basic.pokemonUId,
    name: pokemon.basic.name,
    level: pokemon.basic.level,
    status: {
      hp: pokemon.status.hp.remain,
    },
    // ポケモンの種類やlevelから計算して入れる
    workIds: pokemon.works.map((work) => work.id),
  };
}

/**
 * バトル中のポケモンステータスの演算を構築・制御する
 */
export const useBattleSystems = ({ onHandPokemons, enemyPokemon }: Options) => {
  const [inBattlePokemonStatus, setInBattlePokemonStatus] =
    useState<BattlePokemonStatus>(getPokemonStatus(onHandPokemons[0]));
  const [enemyPokemonStatus, setEnemyPokemonStatus] =
    useState<BattlePokemonStatus>(getPokemonStatus(enemyPokemon));

  /**
   * こうげきの演算
   */
  const calculateEffect = () => {
    return;
  };

  /**
   * けいけんちの演算
   */
  const calculateExperience = () => {
    return;
  };

  /**
   * バトル後のポケモンのステータスを取得
   */
  const getAfterBattleInBattlePokemonStatus = () => {
    return inBattlePokemonStatus;
  };

  return {
    calculateEffect,
    calculateExperience,
    getAfterBattleInBattlePokemonStatus,
  };
};
