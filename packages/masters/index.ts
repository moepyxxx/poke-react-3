export function getFieldObjectsByFieldName(fieldName: string) {
  // TODO: jsonファイルの{samples}部分が{fieldName}に置き換わるようにする
  const SampleFieldObjects = require("./fieldObjects/samples.json");
  switch (fieldName) {
    default:
      return SampleFieldObjects;
  }
}

export function getFieldTalksByFieldName(fieldName: string) {
  // TODO: jsonファイルの{samples}部分が{fieldName}に置き換わるようにする
  const SampleTalks = require("./fieldTalks/samples.json");

  switch (fieldName) {
    default:
      return SampleTalks;
  }
}
