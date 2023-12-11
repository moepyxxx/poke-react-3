"use client";

import { useAtom } from "jotai";
import { Field } from "../components/Field";
import { currentLocationAtom } from "@/atoms/currentLocation";
import { FIELD_MIDDLE_POSITION } from "../datas/sample";
import { FC } from "react";
import { FieldObjectMap } from "@types";

type Props = {
  field: string;
  fieldObjectMap: FieldObjectMap;
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
