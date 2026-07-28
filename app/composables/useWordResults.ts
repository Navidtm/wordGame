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
	const isSearching = shallowRef(false);
	const searchError = shallowRef<string | null>(null);
	let searchVersion = 0;

	watch(
		[chars, aspect, settings.minWordLength, settings.maxWordLength, settings.maxResults],
		async () => {
			const version = ++searchVersion;
			searchError.value = null;
			if (chars.value.some(char => !char)) {
				words.value = [];
				isSearching.value = false;
				return;
			}

			isSearching.value = true;
			try {
				const { searchWordsInGrid } = await import('~/utils/wordSearch');
				if (version !== searchVersion) return;
				const nextWords = await searchWordsInGrid(chunk(chars.value, aspect.value[0]), {
					minWordLength: settings.minWordLength.value,
					maxWordLength: settings.maxWordLength.value,
					maxResults: settings.maxResults.value,
				});
				if (version !== searchVersion) return;
				words.value = nextWords;
			} catch (error) {
				if (version !== searchVersion) return;
				words.value = [];
				searchError.value = 'جست‌وجوی واژه‌ها انجام نشد؛ لطفاً دوباره تلاش کنید.';
				console.error('Word search failed.', error);
			} finally {
				if (version === searchVersion) isSearching.value = false;
			}
		},
		{ deep: true, immediate: true },
	);

	return { words, isSearching, searchError };
};
