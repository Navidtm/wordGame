import { describe, expect, it } from 'vitest';
import { searchWordsInGrid } from '../../app/utils/wordSearch';

describe('searchWordsInGrid', () => {
	it('finds an adjacent dictionary word and reports its path', () => {
		const matches = searchWordsInGrid([['آ', 'ب']], { minWordLength: 2 });
		expect(matches).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ word: 'آب', path: [0, 1] }),
			]),
		);
	});

	it('returns no matches for an incomplete grid cell', () => {
		expect(searchWordsInGrid([['آ', '']])).toEqual([]);
	});

	it('rejects non-rectangular grids', () => {
		expect(() => searchWordsInGrid([['آ'], ['ب', 'پ']])).toThrow(
			'inconsistent length',
		);
	});
});
