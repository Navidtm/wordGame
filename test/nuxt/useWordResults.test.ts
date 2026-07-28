import { flushPromises } from '@vue/test-utils';
import { ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useWordResults } from '~/composables/useWordResults';

const { searchWordsInGrid } = vi.hoisted(() => ({
	searchWordsInGrid: vi.fn(),
}));

vi.mock('~/utils/wordSearch', () => ({ searchWordsInGrid }));

afterEach(() => {
	vi.restoreAllMocks();
	searchWordsInGrid.mockReset();
});

describe('useWordResults', () => {
	it('clears the loading state and exposes an error when searching fails', async () => {
		searchWordsInGrid.mockRejectedValueOnce(new Error('Dictionary unavailable'));
		vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const result = useWordResults(ref(['آ', 'ب']), ref<[number, number]>([2, 1]), {
			minWordLength: ref(2),
			maxWordLength: ref(2),
			maxResults: ref(12),
		});

		await flushPromises();

		expect(result.isSearching.value).toBe(false);
		expect(result.words.value).toEqual([]);
		expect(result.searchError.value).toBe('جست‌وجوی واژه‌ها انجام نشد؛ لطفاً دوباره تلاش کنید.');
	});
});
