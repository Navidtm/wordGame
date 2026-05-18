import { describe, expect, it } from 'vitest';
import { searchWordsInGrid } from '../utils/wordSearch';

describe('find words', () => {
	it('should be works as expected', async () => {
		const wordList = await searchWordsInGrid([
			['ش', 'س', 'ص', 'ض'],
			['ی', 'ب', 'ق', 'ث'],
			['ل', 'ا', 'غ', 'ف'],
			['ت', 'ن', 'ه', 'ع'],
		]);

		const words = wordList.map((v) => v.word);
		const scores = wordList.map((v) => v.score);

		const expectedWords = [
			'صباغ',
			'صبغه',
			'قصبات',
			'تناقض',
			'فغان',
			'ناقص',
			'ناقض',
			'غالبی',
			'نابغه',
			'قصب',
			'غایب',
			'غالب',
		];

		expect(words).toEqual(expectedWords);
		expect(scores).toEqual(expectedWords.map((v) => computeScore(v)));
	});
});
