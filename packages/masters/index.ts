const SampleFields = require("./fields/samples.json");

export function getFieldObjectsByFieldName(fieldName: string) {
  switch (fieldName) {
    default:
      return SampleFields;
  }
}
