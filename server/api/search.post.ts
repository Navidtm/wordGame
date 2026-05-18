import { chunk } from 'es-toolkit';

export default defineEventHandler(async (e) => {
	const { chars, aspect } = await readBody<{
		chars: string[];
		aspect: [number, number];
	}>(e);

	const words = await searchWordsInGrid(chunk(chars, aspect[0]), {
		maxResults: 12,
		minWordLength: 2,
	});

	return {
		words,
	};
});
