import { Talks } from "@types";

export const TALK_MAPS: Talks = {
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

export const FIELD_SIZE = 24;
export const FIELD_ALL_TILE_COUNT = 5;
export const FIELD_VISIBLE_TILE_COUNT = 3;
export const FIELD_MIDDLE_POSITION = Math.floor(
  (FIELD_ALL_TILE_COUNT - FIELD_VISIBLE_TILE_COUNT) / 2
);
