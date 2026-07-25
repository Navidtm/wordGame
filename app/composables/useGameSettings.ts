export const useGameSettings = () => {
	const maxResults = ref(12);
	const aspect = ref<[number, number]>([4, 4]);
	const minWordLength = ref(3);
	const maxWordLength = ref(16);
	const hideThreeLetterWords = ref(false);

	const effectiveMinWordLength = computed(() =>
		Math.max(minWordLength.value, hideThreeLetterWords.value ? 4 : 3),
	);

	watch([minWordLength, maxWordLength], () => {
		if (minWordLength.value > maxWordLength.value) maxWordLength.value = minWordLength.value;
	});
	const limitMaxWordLength = (cellCount: number) => {
		maxWordLength.value = Math.min(maxWordLength.value, cellCount);
	};

	return {
		maxResults,
		aspect,
		minWordLength,
		maxWordLength,
		hideThreeLetterWords,
		effectiveMinWordLength,
		limitMaxWordLength,
	};
};
