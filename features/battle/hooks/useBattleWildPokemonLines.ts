import { useState } from "react";
import { BattlePokemon, BattleState } from "../types";

// 戦闘中の様子や戦闘結果を元に表示するための文字列を返す
export const useBattleWildPokemonLines = () => {};

// 流れ
// やせいのpokemonが現れる。自分のpokemonが現れる。
// 戦闘開始
//   何をするか選択する
//   結果が表示される
// 戦闘終了
// 勝ちの場合: 経験値をもらって終了
