import { describe, expect, it } from 'vitest';

import { searchWordsInGrid } from '../../app/utils/wordSearch';

describe('searchWordsInGrid', () => {
	it('finds an adjacent dictionary word and reports its path', async () => {
		const matches = await searchWordsInGrid([['آ', 'ب']], { minWordLength: 2 });
		expect(matches).toEqual(
			expect.arrayContaining([expect.objectContaining({ word: 'آب', path: [0, 1] })]),
		);
	});

	it('returns no matches for an incomplete grid cell', async () => {
		await expect(searchWordsInGrid([['آ', '']])).resolves.toEqual([]);
	});

	it('filters out words longer than the configured maximum length', async () => {
		await expect(
			searchWordsInGrid([['آ', 'ب']], {
				minWordLength: 2,
				maxWordLength: 1,
			}),
		).resolves.toEqual([]);
	});

	it('stops searching once the configured maximum length is reached', async () => {
		const matches = await searchWordsInGrid([['آ', 'ب']], {
			minWordLength: 2,
			maxWordLength: 2,
		});
		expect(matches.every(({ word }) => word.length <= 2)).toBe(true);
	});

	it('rejects non-rectangular grids', async () => {
		await expect(searchWordsInGrid([['آ'], ['ب', 'پ']])).rejects.toThrow('inconsistent length');
	});
});
