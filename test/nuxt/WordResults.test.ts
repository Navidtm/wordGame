import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import WordResults from '~/components/game/WordResults.vue';
import type { FoundWord } from '~/types/types';

const words: FoundWord[] = [
	{ word: 'اول', path: [0, 1, 2], score: 3 },
	{ word: 'دوم', path: [3, 4, 5], score: 3 },
];

const mountResults = (selectedIndex = 0) =>
	mountSuspended(WordResults, {
		props: {
			words,
			isReady: true,
			isSearching: false,
			searchError: null,
			selectedPathLength: 3,
			selectedIndex,
			stepMode: false,
			pathStep: 0,
		},
	});

describe('WordResults', () => {
	it('selects an unselected result without removing it after pointer focus', async () => {
		const wrapper = await mountResults();
		const secondResult = wrapper.findAll('.premium-result')[1]!;

		await secondResult.trigger('pointerdown');
		await secondResult.trigger('focus');
		await secondResult.trigger('click', { detail: 1 });

		expect(wrapper.emitted('remove')).toBeUndefined();
		expect(wrapper.emitted('update:selectedIndex')?.at(-1)).toEqual([1]);
	});

	it('removes a result that was selected before pointer activation', async () => {
		const wrapper = await mountResults(1);
		const secondResult = wrapper.findAll('.premium-result')[1]!;

		await secondResult.trigger('pointerdown');
		await secondResult.trigger('focus');
		await secondResult.trigger('click', { detail: 1 });

		expect(wrapper.emitted('remove')).toHaveLength(1);
	});

	it('removes the focused selected result on keyboard activation', async () => {
		const wrapper = await mountResults(1);
		const secondResult = wrapper.findAll('.premium-result')[1]!;

		await secondResult.trigger('focus');
		await secondResult.trigger('click', { detail: 0 });

		expect(wrapper.emitted('remove')).toHaveLength(1);
	});
});
