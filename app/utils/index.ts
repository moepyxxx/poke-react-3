import { FieldPosition, ShortFieldPosition } from "@/types";

export function ShortPositionToPosition(shortPosition: string): FieldPosition {
  const [x, y] = shortPosition.split("-").map((v) => Number(v));
  return { x, y };
}

export function positionToShortPosition(
  position: FieldPosition
): ShortFieldPosition {
  return `${position.x}-${position.y}`;
}
