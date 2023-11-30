export type BattlePokemon = {
  basic: {
    pokemonUId: string;
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

export type BattlePokemonStatus = {
  uId: string;
  name: string;
  level: number;
  status: {
    hp: number;
  };
  workIds: number[];
};

export type BattleState =
  | "startBattle"
  | "readyAction"
  | "selectAction"
  | "executeAction"
  | "endBattle";

// TODO: ポケモン, バッグ, にげるも作る
export type ActionSelect = ActionSelectAttack;

export type ActionSelectAttack = {
  type: "attack";
  workId: number;
};

export type BattlePokemonType = "onHand" | "enemy";

export type ExecuteActionEffect = {
  targetType: BattlePokemonType;
  targetUId: string;
  status: "hp"; // HP, 攻撃力, 防御力など
  effectLevel: "notEnough" | "normal" | "critical";
  upOrDown: "up" | "down";
  count: number;
};

export type ExecuteActionResult = {
  action: {
    pokemonUId: string;
    type: BattlePokemonType;
    workName: string;
  };
  effect: ExecuteActionEffect;
};

export type InBattleResult = InBattleResultBattleEnd | InBattleResultInBattle;

export type InBattleResultBattleEnd = {
  type: "endBattle";
  winner: {
    type: BattlePokemonType;
    UId: string;
  };
  lose: {
    type: BattlePokemonType;
    UId: string;
  };
  experiences?: {
    pokemonUId: string;
    experience: number;
  }[];
};

export type InBattleResultInBattle = {
  type: "inBattle";
};

export type BattleResult = {
  winner: "onHand" | "enemy";
};
