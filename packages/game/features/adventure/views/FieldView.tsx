"use client";

import { useAtom } from "jotai";
import { Field } from "../components/Field";
import { currentLocationAtom } from "@/atoms/currentLocation";
import { FIELD_MIDDLE_POSITION } from "../datas/sample";
import { FC } from "react";
import { FieldBase, FieldObject, ShortFieldPosition } from "../types";

type Props = {
  field: string;
  fieldObjectMap: Record<
    ShortFieldPosition,
    {
      base: FieldBase;
      objects?: FieldObject[];
    }
  >;
};
export const FieldView: FC<Props> = ({ field, fieldObjectMap }) => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  if (!currentLocation) {
    setCurrentLocation({
      field: field,
      position: { x: 1 + FIELD_MIDDLE_POSITION, y: 1 + FIELD_MIDDLE_POSITION },
      direction: "below",
    });
    return;
  }

  return (
    <Field
      field={field}
      initialDirection={currentLocation.direction}
      initialPosition={currentLocation.position}
      fieldObjectMap={fieldObjectMap}
    />
  );
};
