export type FieldTalkSelect = {
  talk: string;
  nextLabel: string;
};

export type FieldTalk = {
  talk: string;
  label: string;
  nextLabel?: string;
  selections?: FieldTalkSelect[];
  action?: () => void;
};

export type FieldTalkMap = Record<
  string,
  {
    initialTalkLabel: string;
    talkScripts: FieldTalk[];
  }
>;
