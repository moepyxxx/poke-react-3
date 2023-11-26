import { useState } from "react";
import { BattlePokemon, BattleState } from "../types";

type Options = {
  /** 手持ちのポケモン */
  onHandPokemons: BattlePokemon[];
  /** やせいのポケモン */
  wildPokemon: BattlePokemon;
};
// TODO: やせいのポケモン以外にも戦闘が出てくることを考えながら実装する
export const useBattleWildPokemon = ({
  onHandPokemons,
  wildPokemon,
}: Options) => {
  const [inBattlePokemon, setBattlePokemon] = useState<BattlePokemon>(
    onHandPokemons[0]
  );
  const [battleState, setBattleState] = useState<BattleState>("startBattle");

  const executeAction = () => {
    // 選択を元に相手の戦闘も自動試算して結果を計算する
    // 互いのポケモンのステータスを変更する
    // 結果が出た場合は勝利 or 敗北の判定
    // 結果を返す
  };

  const endBattle = () => {
    // 経験値を計算する
    //
  };

  return {
    inBattlePokemon,
    battleState,
    executeAction,
  };
};

// 流れ
// やせいのpokemonが現れる。自分のpokemonが現れる。
// 戦闘開始
//   何をするか選択する
//   結果が表示される
// 戦闘終了
// 勝ちの場合: 経験値をもらって終了
