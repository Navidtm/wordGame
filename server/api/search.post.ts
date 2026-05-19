import { searchWordsSchema } from '../schema/search';
import { validateRequest } from '../utils/validateRequest';

export default defineCustomHandler(
	async ({ event, signal }) => {
		const { body } = await validateRequest(event, {
			body: searchWordsSchema,
		});

		const { grid, ...options } = body;

		const words = await searchWordsInGrid(grid, {
			...options,
			signal,
		});

		return { words };
	},
	{ timeoutMs: 10000 },
);
