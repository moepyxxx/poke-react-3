import { FieldTalkMap } from "@types";

export function getFieldTalksByFieldName(fieldName: string) {
  const FieldTalks = require("./sources/field_talks.json") as Record<
    string,
    FieldTalkMap
  >;
  if (!FieldTalks[fieldName]) {
    throw new Error(`FieldTalks not found: ${fieldName}`);
  }

  return FieldTalks[fieldName];
}
