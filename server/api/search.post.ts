import { searchWordsSchema } from '../schema/search';
import { validateRequest } from '../utils/validateRequest';

export default defineCustomHandler(
	async ({ event, signal }) => {
		const { body } = await validateRequest(event, {
			body: searchWordsSchema,
		});

		const { grid, minWordLength, maxResults } = body;

		const words: FoundWord[] = await searchWordsInGrid(grid, {
			minWordLength,
			maxResults,
			timeoutMs: 8000,
			signal,
		});

		return { words, totalFound: words.length };
	},
	{ timeoutMs: 10000 },
);
