export default defineEventHandler(async (e) => {
	const { chars } = await readBody<{ chars: string[] }>(e);
	const words = findWords(chars);

	return {
		words,
	};
});
