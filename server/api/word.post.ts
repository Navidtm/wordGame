import { chunk, sortBy } from 'es-toolkit';
import { findWords } from '../utils/findWords';
import { WordApi } from '~~/shared/types/api/word.post';
import { invertBy } from 'es-toolkit/compat';

export default defineEventHandler<WordApi>(async (e) => {
  const { letters } = await readBody(e);

  const wordList = findWords(chunk(letters, 4));

  const sortedWordList = sortBy(wordList, ['score', ({ word }) => -word.length])
    .reverse()
    .slice(0, 50);

  return {
    words: sortedWordList
  };
});
