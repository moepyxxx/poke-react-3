import {
  FieldAction,
  FieldBase,
  FieldMaps,
  FieldObject,
  FieldTalks,
  ShortFieldPosition,
} from "@/features/adventure/types";

export const SAMPLE_FIELD_OBJECTS: Record<
  ShortFieldPosition,
  {
    base: FieldBase;
    objects?: FieldObject[];
  }
> = {
  "1-1": { base: "black" },
  "2-1": { base: "black" },
  "3-1": { base: "black" },
  "4-1": { base: "black" },
  "5-1": { base: "black" },
  "1-2": { base: "black" },
  "2-2": { base: "grass" },
  "3-2": { base: "grass-load" },
  "4-2": { base: "grass-load" },
  "5-2": { base: "black" },
  "1-3": { base: "black" },
  "2-3": { base: "grass" },
  "3-3": {
    base: "grass-load",
    objects: [
      {
        type: "person",
        personType: "hakase",
        talkLabel: "sample_talk_selection",
        direction: "below",
      },
    ],
  },
  "4-3": {
    base: "grass",
  },
  "5-3": { base: "black" },
  "1-4": { base: "black" },
  "2-4": {
    base: "grass",
    objects: [{ type: "ornament", ornamentType: "grass" }],
  },
  "3-4": {
    base: "grass",
    objects: [{ type: "ornament", ornamentType: "grass" }],
  },
  "4-4": {
    base: "grass",
    objects: [{ type: "ornament", ornamentType: "tree" }],
  },
  "5-4": { base: "black" },
  "1-5": { base: "black" },
  "2-5": { base: "black" },
  "3-5": { base: "black" },
  "4-5": { base: "black" },
  "5-5": { base: "black" },
};

export const TALK_MAPS: FieldTalks = {
  sample_talk_talk_only: {
    initialTalkLabel: "sample_talk_1",
    talkScripts: [
      {
        label: "sample_talk_1",
        talk: "サンプルテキストです。1",
        nextLabel: "sample_talk_2",
      },
      {
        label: "sample_talk_2",
        talk: "サンプルテキストです。2",
      },
    ],
  },
  sample_talk_selection: {
    initialTalkLabel: "sample_talk_1",
    talkScripts: [
      {
        talk: "サンプルテキストです。",
        label: "sample_talk_1",
        nextLabel: "sample_talk_2",
      },
      {
        talk: "どれを選択しますか？",
        label: "sample_talk_2",
        selections: [
          {
            talk: "選択肢1",
            nextLabel: "sample_talk_3",
          },
          {
            talk: "選択肢2",
            nextLabel: "sample_talk_4",
          },
        ],
      },
      {
        talk: "なるほどですね。選択肢1なんですね",
        label: "sample_talk_3",
      },
      {
        talk: "なるほどですね。選択肢2なんですね",
        label: "sample_talk_4",
      },
    ],
  },
};

export const ACTION_MAPS: Record<string, FieldAction> = {};

export const FIELD_SIZE = 24;
export const FIELD_ALL_TILE_COUNT = 5;
export const FIELD_VISIBLE_TILE_COUNT = 3;
export const FIELD_MIDDLE_POSITION = Math.floor(
  (FIELD_ALL_TILE_COUNT - FIELD_VISIBLE_TILE_COUNT) / 2
);
