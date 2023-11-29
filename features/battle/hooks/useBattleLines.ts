import { useMemo, useState } from "react";
import {
  BattlePokemon,
  ExecuteActionResult,
  InBattleResultBattleEnd,
} from "../types";
import { ActionHistory } from "@/features/adventure/hooks";

const getPokemonNameFromUId = (uId: string, pokemons: BattlePokemon[]) => {
  const pokemon = pokemons.find((pokemon) => pokemon.basic.pokemonUId === uId);
  return pokemon?.basic.nickname || pokemon?.basic.name;
};

type Options = {
  /** 最新のアクション */
  latestAction: ActionHistory | null;
  /** 手持ちのポケモン */
  onHandPokemons: BattlePokemon[];
  /** あいてのポケモン */
  enemyPokemon: BattlePokemon;
};
/** バトル中の台詞を構築・制御する */
export const useBattleLines = ({ onHandPokemons, enemyPokemon }: Options) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);

  const isLineEnd = useMemo(() => {
    return currentLineIndex === lines.length - 1;
  }, [currentLineIndex, lines]);

  const nextCurrentLineIndex = () => {
    setCurrentLineIndex((prev) => prev + 1);
  };

  const resetLines = () => {
    setLines([]);
    setCurrentLineIndex(0);
  };

  const setBattleStartLines = ({
    inBattlePokemonName,
    enemyPokemonName,
  }: {
    inBattlePokemonName: string;
    enemyPokemonName: string;
  }) => {
    setLines([
      `${enemyPokemonName}があらわれた`,
      `いけ、${inBattlePokemonName}！`,
    ]);
    setCurrentLineIndex(0);
  };

  const setExecuteActionLines = (results: ExecuteActionResult[]) => {
    setLines(
      results
        .map((result) => {
          const actionPokemon = getPokemonNameFromUId(
            result.action.pokemonUId,
            result.action.type === "onHand" ? onHandPokemons : [enemyPokemon]
          );
          const targetPokemon = getPokemonNameFromUId(
            result.effect.targetUId,
            result.effect.targetType === "onHand"
              ? onHandPokemons
              : [enemyPokemon]
          );
          const lines = [`${actionPokemon}の${result.action.workName}`];
          if (result.effect.upOrDown === "up") {
            lines.push(
              `${targetPokemon}の${result.effect.status}が${result.effect.count}あがった`
            );
          }
          if (result.effect.upOrDown === "down") {
            lines.push(
              `${targetPokemon}の${result.effect.status}に${result.effect.count}のダメージ`
            );
          }
          if (result.effect.effectLevel === "critical") {
            lines.push("こうかはばつぐんだ！");
          }
          if (result.effect.effectLevel === "notEnough") {
            lines.push("こうかはいまひとつのようだ");
          }
          return lines;
        })
        .flat()
    );
    setCurrentLineIndex(0);
  };

  const setBattleEndLines = (result: InBattleResultBattleEnd) => {
    const losePokemon = getPokemonNameFromUId(
      result.lose.UId,
      result.lose.type === "onHand" ? onHandPokemons : [enemyPokemon]
    );

    const lines = [`${losePokemon}はたおれた`];
    if (result.winner.type === "enemy") {
      lines.push(`目の前がまっくらになった・・・`);
    }
    if (result.winner.type === "onHand" && result.experiences) {
      lines.push(
        ...result.experiences.map((experience) => {
          const pokemon = getPokemonNameFromUId(
            experience.pokemonUId,
            onHandPokemons
          );
          return `${pokemon}は${experience.experience}のけいけんちをもらった`;
        })
      );
    }
    setLines(lines);
    setCurrentLineIndex(0);
  };

  return {
    lines,
    currentLineIndex,
    setBattleStartLines,
    setExecuteActionLines,
    setBattleEndLines,
    isLineEnd,
    nextCurrentLineIndex,
    resetLines,
  };
};
