import { chunk } from 'es-toolkit';
import type { Ref } from 'vue';

import type { FoundWord } from '~/types/types';
import { searchWordsInGrid } from '~/utils/wordSearch';

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
	const words = computed<FoundWord[]>(() => {
		if (chars.value.some(char => !char)) return [];
		return searchWordsInGrid(chunk(chars.value, aspect.value[0]), {
			minWordLength: settings.minWordLength.value,
			maxWordLength: settings.maxWordLength.value,
			maxResults: settings.maxResults.value,
		});
	});

	return { words };
};
