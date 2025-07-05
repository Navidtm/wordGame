import { findWords } from '../utils/findWords';
import wordList from '../../fa-IR.json';

type WordApi = {
  body: {
    letters: string[][];
  };
};

defineEventHandler<WordApi>(async (e) => {
  const b = await readBody(e);
  console.log(wordList[0]);
  return [];
  // console.log(findWords(b.letters));
});
