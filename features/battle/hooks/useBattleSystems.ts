import { useState } from "react";
import { BattlePokemon, ExecuteActionEffect } from "../types";

type Options = {
  /** 手持ちのポケモン */
  onHandPokemon: BattlePokemon;
  /** あいてのポケモン */
  enemyPokemon: BattlePokemon;
};

/**
 * バトル中のポケモンステータスの演算を構築・制御する
 */
export const useBattleSystems = ({ onHandPokemon, enemyPokemon }: Options) => {
  const [inBattlePokemon, setInBattlePokemon] =
    useState<BattlePokemon>(onHandPokemon);
  const [enemyPokemonStatus, setEnemyPokemonStatus] =
    useState<BattlePokemon>(enemyPokemon);

  /**
   * こうげきの演算
   */
  const calculateEffect = (
    actionUId: string,
    targetUId: string,
    workId: number
  ): Omit<ExecuteActionEffect, "targetType" | "targetUId"> => {
    return {
      status: "hp",
      effectLevel: "normal",
      upOrDown: "down",
      count: 10,
    };
  };

  /**
   * こうげき順の演算
   */
  const calculateOrder = (): ("enemy" | "onHand")[] => {
    return ["onHand", "enemy"];
  };

  /**
   * けいけんちの演算
   */
  const calculateExperience = () => {
    return [
      {
        pokemonUId: inBattlePokemon.basic.pokemonUId,
        experience: 100,
      },
    ];
  };

  /**
   * バトル後のポケモンのステータスを取得
   */
  const getAfterBattleInBattlePokemonStatus = () => {
    return inBattlePokemon;
  };

  const getHpRemain = () => {
    return {
      inBattlePokemon: inBattlePokemon.status.hp.remain,
      enemyPokemon: 0, // 1ターンで倒したステータスになるよう一旦仮置き
      // enemyPokemon: enemyPokemon.status.hp.remain,
    };
  };

  return {
    calculateEffect,
    calculateExperience,
    calculateOrder,
    getAfterBattleInBattlePokemonStatus,
    getHpRemain,
  };
};
