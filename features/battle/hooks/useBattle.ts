import { useMemo, useState } from "react";
import {
  ActionSelect,
  BattlePokemon,
  BattleResult,
  BattleState,
  ExecuteActionResult,
} from "../types";
import { useWatch } from "@/features/adventure/hooks/useWatch";
import { ActionHistory } from "@/features/adventure/hooks";
import { useBattleLines } from "./useBattleLines";
import { useBattleSystems } from "./useBattleSystems";
import { useBattleSelect } from "./useBattleSelect";

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
/**
 * ポケモンバトル全体を制御する
 */
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
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);

  const {
    lines,
    currentLineIndex,
    setBattleEndLines,
    setReadyActionLines,
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

  const {
    calculateEffect,
    calculateExperience,
    calculateOrder,
    getAfterBattleInBattlePokemonStatus,
    getHpRemain,
  } = useBattleSystems({
    onHandPokemons,
    enemyPokemon,
  });

  const { nextSelect } = useBattleSelect({
    latestAction,
    battleState,
    worksCount: inBattlePokemon.works.length,
  });

  const handleChangeBattleState = (battleState: BattleState) => {
    onChangeBattleState(battleState);
    resetLines();
  };

  const changeNextAction = () => {};

  const startBattle = () => {
    setBattleResult(null);

    // TODO: 必要があれば何かする
    setBattleStartLines({
      inBattlePokemonName:
        inBattlePokemon.basic.nickname || inBattlePokemon.basic.name,
      enemyPokemonName: enemyPokemon.basic.name,
    });
  };

  const readyAction = () => {
    setReadyActionLines({
      inBattlePokemonName:
        inBattlePokemon.basic.nickname || inBattlePokemon.basic.name,
    });
  };

  const executeAction = () => {
    const effectOrder = calculateOrder();
    const actionResults = effectOrder.map((actionType): ExecuteActionResult => {
      const actionPokemon =
        actionType === "onHand" ? inBattlePokemon : enemyPokemon;
      const targetPokemon =
        actionType === "onHand" ? enemyPokemon : inBattlePokemon;

      // TODO: あいてポケモンのworkIdはランダムにする
      const workId = actionType === "onHand" ? nextSelect?.workId : 1;

      const effect = calculateEffect(
        actionPokemon.basic.pokemonUId,
        targetPokemon.basic.pokemonUId,
        1
      );
      return {
        action: {
          pokemonUId: actionPokemon.basic.pokemonUId,
          type: actionType,
          workName:
            actionPokemon.works.find((work) => workId === work.id)?.name || "",
        },
        effect: {
          ...effect,
          targetType: actionType === "onHand" ? "enemy" : "onHand",
          targetUId: targetPokemon.basic.pokemonUId,
        },
      };
    });
    setExecuteActionLines(actionResults);
    checkIsBattleFinish();
  };

  const checkIsBattleFinish = () => {
    const {
      inBattlePokemon: inBattlePokemonRemainHp,
      enemyPokemon: enemyPokemonRemainHp,
    } = getHpRemain();

    // TODO: じばくとかだと自分も相手も同時に倒れるかも

    if (inBattlePokemonRemainHp <= 0) {
      setBattleResult({
        winner: "enemy",
      });
      return;
    }
    if (enemyPokemonRemainHp <= 0) {
      setBattleResult({
        winner: "onHand",
      });
      return;
    }
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
        handleChangeBattleState("readyAction");
        return;
      }
      nextCurrentLineIndex();
      return;
    }

    if (battleState === "readyAction") {
      if (isLineNotStarted) {
        readyAction();
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
        battleResult != null
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
