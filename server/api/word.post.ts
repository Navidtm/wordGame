import { sortBy } from 'es-toolkit';
import { findWords } from '../utils/findWords';
import { WordApi } from '~~/shared/types/api/word.post';

export default defineEventHandler<WordApi>(async (e) => {
  const { letters } = await readBody(e);

  const wordList = findWords(letters);

  const sortedWordList = sortBy(wordList, ['score', ({ word }) => -word.length]);

  return {
    words: sortedWordList
  };
});
