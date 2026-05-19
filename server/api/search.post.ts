import { searchWordsSchema } from '../schemas/search';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { data, success, error } = searchWordsSchema.safeParse(body);

	if (!success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: error.message,
		});
	}

	const { grid, minWordLength, maxResults, timeoutMs } = data;

	const { abort, signal } = new AbortController();
	event.node.req.on('close', () => {
		if (!event.node.req.destroyed) {
			abort();
		}
	});

	const startTime = Date.now();

	try {
		const words: FoundWord[] = await searchWordsInGrid(grid, {
			minWordLength,
			maxResults,
			timeoutMs,
			signal,
		});

		const durationMs = Date.now() - startTime;

		return {
			words,
			totalFound: words.length,
			durationMs,
		};
	} catch (error: any) {
		if (
			error.message === 'Operation aborted' ||
			error.message === 'Search aborted.'
		) {
			throw createError({
				statusCode: 499,
				statusMessage: 'Client Closed Request',
				message: 'Request cancelled by client',
			});
		}
		if (error.message?.includes('timed out')) {
			throw createError({
				statusCode: 408,
				statusMessage: 'Request Timeout',
				message: error.message,
			});
		}
		console.error('Word search error:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			message: 'An unexpected error occurred',
		});
	}
});
