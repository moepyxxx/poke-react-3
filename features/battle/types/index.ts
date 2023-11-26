export type BattlePokemon = {
  basic: {
    name: string;
    nickname?: string;
    level: number;
  };
  status: {
    hp: {
      max: number;
      remain: number;
    };
    // TODO: add status
  };
  works: {
    id: number;
    name: string;
    pp: {
      max: number;
      remain: number;
    };
  }[];
};

export type BattleState = "startBattle" | "inBattle" | "endBattle";

// TODO: ポケモン, バッグ, にげるも作る
export type ActionSelect = ActionSelectAttack;

export type ActionSelectAttack = {
  type: "attack";
  workId: number;
};

export type ActionSelectResult = ActionSelectResultBattleEnd;
export type ActionSelectResultBattleEnd = {
  type: "endBattle";
  winner: "player" | "enemy";
};
