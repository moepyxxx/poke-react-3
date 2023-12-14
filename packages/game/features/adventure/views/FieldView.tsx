"use client";

import { useAtom } from "jotai";
import { Field } from "../components/Field";
import { currentLocationAtom } from "@/atoms/currentLocation";
import { FIELD_MIDDLE_POSITION } from "@constants";
import { FC } from "react";
import { FieldObjectMap, FieldTalkMap } from "@types";

type Props = {
  field: string;
  fieldObjectMap: FieldObjectMap;
  fieldTalkMap: FieldTalkMap;
};
export const FieldView: FC<Props> = ({
  field,
  fieldObjectMap,
  fieldTalkMap,
}) => {
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
      fieldTalkMap={fieldTalkMap}
    />
  );
};
