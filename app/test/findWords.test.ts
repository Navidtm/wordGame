import { describe, expect, it } from 'vitest';

describe('find words', () => {
	it('should be works as expected', () => {
		const wordList = findWords([
			'ش',
			'س',
			'ص',
			'ض',
			'ی',
			'ب',
			'ق',
			'ث',
			'ل',
			'ا',
			'غ',
			'ف',
			'ت',
			'ن',
			'ه',
			'ع',
		]);

		const words = wordList.map((v) => v[0]);
		const scores = wordList.map((v) => v[2]);

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
		expect(scores).toEqual(expectedWords.map((v) => wordToScore(v)));
	});
});
