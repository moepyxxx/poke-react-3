export type FieldMode = "walk" | "talk" | "action" | "select";

export type ControllerAction =
  | "onPushA"
  | "onPushB"
  | "onPushStart"
  | "onPushAbove"
  | "onPushBelow"
  | "onPushLeft"
  | "onPushRight";

export type ControllerOptions = {
  onPushA: () => void;
  onPushB: () => void;
  onPushStart: () => void;
  onPushRight: () => void;
  onPushLeft: () => void;
  onPushAbove: () => void;
  onPushBelow: () => void;
};
