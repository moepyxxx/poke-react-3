import { FieldObjectMap } from "@types";
import fs from "fs";
import path from "path";

export function getFieldObjectsByFieldName(fieldName: string) {
  const FieldObjects = require("./sources/field_objects.json") as Record<
    string,
    FieldObjectMap
  >;
  if (!FieldObjects[fieldName]) {
    throw new Error(`FieldObjects not found: ${fieldName}`);
  }

  return FieldObjects[fieldName];
}

export function getFieldObjects() {
  const FieldObjects = require("./sources/field_objects.json") as Record<
    string,
    FieldObjectMap
  >;

  return FieldObjects;
}

export function postFieldObjects(
  fieldKey: string,
  fieldObjectMap: Record<string, FieldObjectMap>
) {
  const oldFieldObjects = getFieldObjects();
  const json = JSON.stringify(
    {
      ...oldFieldObjects,
      [fieldKey]: fieldObjectMap,
    },
    null,
    2
  );
  // TODO: 実行時のパスによって動的に変更されてしまう...
  // path.resolve(__dirnameは使えそうだが...
  fs.writeFileSync("../masters/utils/sources/field_objects.json", json);
}
