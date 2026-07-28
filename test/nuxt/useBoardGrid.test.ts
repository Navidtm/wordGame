import { nextTick, ref } from 'vue';
import { describe, expect, it } from 'vitest';

import { useBoardGrid } from '~/composables/useBoardGrid';

describe('useBoardGrid', () => {
	it('invalidates a clear snapshot when the board dimensions change', async () => {
		const aspect = ref<[number, number]>([2, 2]);
		const board = useBoardGrid(aspect);
		board.chars.value = ['آ', 'ب', 'پ', 'ت'];

		board.clear();
		expect(board.canUndoClear.value).toBe(true);

		aspect.value = [3, 3];
		await nextTick();
		board.undoClear();

		expect(board.canUndoClear.value).toBe(false);
		expect(board.chars.value).toEqual(Array(9).fill(''));
	});
});
