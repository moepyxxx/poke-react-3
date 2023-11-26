import { FieldDirection, FieldPosition } from "@/app/features/adventure/types";
import { atom } from "jotai";

type CurrentLocation = {
  field: string;
  position: FieldPosition;
  direction: FieldDirection;
} | null;

export const currentLocationAtom = atom<CurrentLocation>(null);
