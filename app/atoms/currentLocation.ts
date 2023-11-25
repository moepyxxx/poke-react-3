import { FieldDirection, FieldPosition } from "@/types";
import { atom } from "jotai";

type CurrentLocation = {
  field: string;
  position: FieldPosition;
  direction: FieldDirection;
} | null;

export const currentLocationAtom = atom<CurrentLocation>(null);
