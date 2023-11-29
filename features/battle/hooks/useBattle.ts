import { useMemo, useState } from "react";
import { ActionSelect, BattlePokemon, BattleState } from "../types";
import { useWatch } from "@/features/adventure/hooks/useWatch";
import { ActionHistory } from "@/features/adventure/hooks";
import { useBattleLines } from "./useBattleLines";

type Options = {
  /** 手持ちのポケモン */
  onHandPokemons: BattlePokemon[];
  /** 相手のポケモン */
  enemyPokemon: BattlePokemon;
  /** 最新のアクション */
  latestAction: ActionHistory | null;
  /** バトルステータス */
  battleState: BattleState;
  /** バトルステータスの変更 */
  onChangeBattleState: (state: BattleState) => void;
};
// TODO: やせいのポケモン以外にも戦闘が出てくることを考えながら実装する
export const useBattle = ({
  onHandPokemons,
  enemyPokemon,
  latestAction,
  battleState,
  onChangeBattleState,
}: Options) => {
  const [inBattlePokemon, setBattlePokemon] = useState<BattlePokemon>(
    onHandPokemons[0]
  );
  const [nextSelect, setNextSelect] = useState<ActionSelect | null>(null);
  const [isBattleFinish, setIsBattleFinish] = useState<boolean>(false);

  const {
    lines,
    currentLineIndex,
    setBattleEndLines,
    setBattleStartLines,
    setExecuteActionLines,
    isLineEnd,
    nextCurrentLineIndex,
    resetLines,
  } = useBattleLines({
    onHandPokemons,
    enemyPokemon,
    latestAction,
  });

  const handleChangeBattleState = (battleState: BattleState) => {
    onChangeBattleState(battleState);
    resetLines();
  };

  const changeNextAction = () => {};

  const startBattle = () => {
    setIsBattleFinish(false);

    // TODO: 必要があれば何かする
    setBattleStartLines({
      inBattlePokemonName:
        inBattlePokemon.basic.nickname || inBattlePokemon.basic.name,
      enemyPokemonName: enemyPokemon.basic.name,
    });

    // TODO: selectのタイミングでセットする
    setNextSelect({
      type: "attack",
      workId: 4,
    });
  };

  const executeAction = () => {
    // 選択を元に相手の戦闘も自動試算して結果を計算する
    // 互いのポケモンのステータスを変更する
    // 結果が出た場合は勝利 or 敗北の判定
    // 結果を返す（勝利が確定した場合はstateをchangeする）
    setIsBattleFinish(true);
    setExecuteActionLines([
      {
        action: {
          pokemonUId: "ダミー敵",
          type: "enemy",
          workName: "たいあたり",
        },
        effect: {
          targetType: "onHand",
          targetUId: "ダミー味方",
          status: "hp",
          effectLevel: "normal",
          upOrDown: "down",
          count: 3,
        },
      },
      {
        action: {
          pokemonUId: "ダミー味方",
          type: "onHand",
          workName: "ひのこ",
        },
        effect: {
          targetType: "enemy",
          targetUId: "ダミー敵",
          status: "hp",
          effectLevel: "critical",
          upOrDown: "down",
          count: 10,
        },
      },
    ]);
  };

  const endBattle = () => {
    // 経験値を計算する
    setBattleEndLines({
      type: "endBattle",
      winner: {
        type: "onHand",
        UId: "ダミー味方",
      },
      lose: {
        type: "enemy",
        UId: "ダミー敵",
      },
      experiences: [
        {
          pokemonUId: "ダミー味方",
          experience: 5,
        },
      ],
    });
  };

  const isLineNotStarted = useMemo(() => {
    return lines.length === 0;
  }, [lines]);

  useWatch(latestAction, (action) => {
    if (latestAction == null) return;

    if (battleState === "startBattle") {
      if (isLineNotStarted) {
        startBattle();
        return;
      }
      if (isLineEnd) {
        handleChangeBattleState("selectAction");
        return;
      }
      nextCurrentLineIndex();
      return;
    }

    if (battleState === "selectAction") {
      switch (action?.action) {
        case "onPushA":
          if (nextSelect != null) {
            handleChangeBattleState("executeAction");
            break;
          }
          changeNextAction();
          break;
        case "onPushBelow":
        case "onPushAbove":
        case "onPushLeft":
        case "onPushRight":
          changeNextAction();
          break;
      }
      return;
    }

    if (battleState === "executeAction") {
      if (isLineNotStarted) {
        executeAction();
        return;
      }
      if (isLineEnd) {
        isBattleFinish
          ? handleChangeBattleState("endBattle")
          : handleChangeBattleState("selectAction");
        return;
      }
      nextCurrentLineIndex();
      return;
    }

    if (battleState === "endBattle") {
      if (isLineNotStarted) {
        endBattle();
        return;
      }
      if (isLineEnd) {
        // TODO: 終了
        console.log("終了!");
        return;
      }
      nextCurrentLineIndex();
      return;
    }
  });

  return {
    lines,
    currentLineIndex,
    nextSelect,
  };
};
