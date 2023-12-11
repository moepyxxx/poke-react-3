import { FieldDirection, FieldPosition, ShortFieldPosition } from "@types";

export function ShortPositionToPosition(shortPosition: string): FieldPosition {
  const [x, y] = shortPosition.split("-").map((v) => Number(v));
  return { x, y };
}

export function positionToShortPosition(
  position: FieldPosition
): ShortFieldPosition {
  return `${position.x}-${position.y}`;
}

export function calculateShortPosition(
  position: FieldPosition,
  direction: FieldDirection
): ShortFieldPosition {
  const { x, y } = position;
  switch (direction) {
    case "above":
      return `${x}-${y - 1}`;
    case "below":
      return `${x}-${y + 1}`;
    case "left":
      return `${x - 1}-${y}`;
    case "right":
      return `${x + 1}-${y}`;
  }
}
