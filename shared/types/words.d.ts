export type Word = {
  word: string;
  score: number;
  path: number[];
};

export type WordApi = {
  query: {
    letters: string[];
  };
};

export type APIWordRes = {
  words: Word[];
};
