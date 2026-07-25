import chunk from 'es-toolkit/compat/chunk';
import type { Ref } from 'vue';

import type { FoundWord } from '~/types/types';

interface SearchSettings {
	minWordLength: Ref<number>;
	maxWordLength: Ref<number>;
	maxResults: Ref<number>;
}

export const useWordResults = (
	chars: Ref<string[]>,
	aspect: Ref<[number, number]>,
	settings: SearchSettings,
) => {
	const words = ref<FoundWord[]>([]);
	const isSearching = ref(false);
	let searchVersion = 0;

	watch(
		[chars, aspect, settings.minWordLength, settings.maxWordLength, settings.maxResults],
		async () => {
			const version = ++searchVersion;
			if (chars.value.some(char => !char)) {
				words.value = [];
				isSearching.value = false;
				return;
			}

			isSearching.value = true;
			const { searchWordsInGrid } = await import('~/utils/wordSearch');
			if (version !== searchVersion) return;
			const nextWords = await searchWordsInGrid(chunk(chars.value, aspect.value[0]), {
				minWordLength: settings.minWordLength.value,
				maxWordLength: settings.maxWordLength.value,
				maxResults: settings.maxResults.value,
			});
			if (version !== searchVersion) return;
			words.value = nextWords;
			isSearching.value = false;
		},
		{ deep: true, immediate: true },
	);

	return { words, isSearching };
};
