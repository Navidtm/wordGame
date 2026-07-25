import { describe, expect, it } from 'vitest';

import { normalizeWord } from '../../app/utils/dictionary';

describe('normalizeWord', () => {
	it('removes zero-width non-joiners and normalizes Arabic Yeh and Kaf', () => {
		expect(normalizeWord('مي\u200cكند')).toBe('میکند');
	});
});
