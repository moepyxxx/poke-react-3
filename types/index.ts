export type FieldDirection = "right" | "left" | "above" | "below";
export type FieldPosition = {
  x: number;
  y: number;
};
export type ShortFieldPosition = `${number}-${number}`;
export type FieldButtonAction =
  | "pushA"
  | "pushB"
  | "pushStart"
  | "pushCursorRight"
  | "pushCursorLeft"
  | "pushCursorAbove"
  | "pushCursorBelow";
export type FieldMode = "walk" | "talk" | "action" | "select";
export type FieldBase = "liver" | "black" | "grass" | "grass-load";
export type FieldOrnamentType = "tree" | "grass";
export type FieldPersonType = "hakase";
export type FieldObjectType = "person" | "ornament";
export type FieldObjectOrnament = {
  type: "ornament";
  ornamentType: FieldOrnamentType;
};
export type FieldObjectPerson = {
  type: "person";
  personType: FieldPersonType;
  direction: FieldDirection;
};
export type FieldObject = FieldObjectOrnament | FieldObjectPerson;
export type FieldTalkSelect = {
  talk: string;
  nextLabel: string;
};

export type FieldTalk = {
  talk: string;
  label: string;
  nextLabel?: string;
  selections?: FieldTalkSelect[];
  action?: () => void;
};

export type FieldTalks = Record<
  string,
  {
    initialTalkLabel: string;
    talkScripts: FieldTalk[];
  }
>;

export type FieldAction = {
  action: () => void;
};

export type ControllerAction =
  | "onPushA"
  | "onPushB"
  | "onPushStart"
  | "onPushAbove"
  | "onPushBelow"
  | "onPushLeft"
  | "onPushRight";

export type FieldWalkMap = {
  mode: "walk";
};

export type FieldTalkMap = {
  mode: "talk";
  talkLabel: string;
};

export type FieldActionMap = {
  mode: "action";
  actionLabel: string;
};

export type FieldMap = FieldActionMap | FieldWalkMap | FieldTalkMap;

export type ControllerOptions = {
  onPushA: () => void;
  onPushB: () => void;
  onPushStart: () => void;
  onPushRight: () => void;
  onPushLeft: () => void;
  onPushAbove: () => void;
  onPushBelow: () => void;
};

export type FieldMaterial = {
  base: FieldBase;
  objects?: FieldObject[];
};

/**
 * フィールドに対する紐付け
 */

// フィールドに対するActionマッピング
// Current情報とFieldObjectMapsを元にすればFieldMapsは不要かも
export type FieldMaps = Record<
  ShortFieldPosition,
  Partial<Record<FieldDirection, FieldMap>>
>;

// フィールドに対するObjectマッピング
export type FieldObjectMaps = Record<
  ShortFieldPosition,
  {
    base: FieldBase;
    objects?: FieldObject[];
  }
>;
