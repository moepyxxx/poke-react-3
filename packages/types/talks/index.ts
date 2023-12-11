export type TalkSelect = {
  talk: string;
  nextLabel: string;
};

export type Talk = {
  talk: string;
  label: string;
  nextLabel?: string;
  selections?: TalkSelect[];
  action?: () => void;
};

export type Talks = Record<
  string,
  {
    initialTalkLabel: string;
    talkScripts: Talk[];
  }
>;
