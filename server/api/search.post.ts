import { searchWordsSchema } from '../schema/search';
import { defineCustomHandler } from '../utils/handler';

export default defineCustomHandler(
	async ({ body, signal }) => {
		const { grid, minWordLength, maxResults } = body;

		const words: FoundWord[] = await searchWordsInGrid(grid, {
			minWordLength,
			maxResults,
			timeoutMs: 8000,
			signal,
		});

		return { words, totalFound: words.length };
	},
	{
		schema: searchWordsSchema,
		timeoutMs: 10000,
	},
);
