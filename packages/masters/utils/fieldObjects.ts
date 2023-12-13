import { FieldObjectMap } from "@types";

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
