export type FieldDirection = "right" | "left" | "above" | "below";
export type FieldPosition = {
  x: number;
  y: number;
};

export type ShortFieldPosition = `${number}-${number}`;

// export type FieldMode = "walk" | "talk" | "action" | "select";

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
  talkLabel: string;
};

export type FieldObject = FieldObjectOrnament | FieldObjectPerson;

export type ControllerAction =
  | "onPushA"
  | "onPushB"
  | "onPushStart"
  | "onPushAbove"
  | "onPushBelow"
  | "onPushLeft"
  | "onPushRight";

export type FieldMaterial = {
  base: FieldBase;
  objects?: FieldObject[];
};

// フィールドに対するObjectマッピング
export type FieldObjectMap = Record<
  ShortFieldPosition,
  {
    base: FieldBase;
    objects?: FieldObject[];
  }
>;
