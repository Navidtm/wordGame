export const pathToWord = (path: number[], letters: string[]) =>
	path.map((v) => letters[v]).join('');

/**
 * Calculates the score for a word based on its length.
 * Longer words receive higher scores.
 * @param word - The word to evaluate.
 * @returns The computed score.
 */
export const computeScore = (word: string): number =>
	word.split('').reduce((a, c) => a + (scoreMap.get(c) ?? 0), 0);

const scoreMap = new Map([
	['ه', 1],
	['س', 1],
	['ی', 1],
	['ب', 1],
	['ل', 1],
	['ا', 1],
	['ت', 1],
	['ن', 1],
	['م', 1],
	['ر', 1],
	['د', 1],
	['و', 1],
	['پ', 2],
	['ز', 2],
	['ع', 2],
	['ش', 2],
	['ک', 2],
	['گ', 2],
	['خ', 2],
	['ق', 2],
	['ف', 2],
	['ج', 2],
	['ظ', 3],
	['غ', 3],
	['ض', 3],
	['ص', 3],
	['چ', 3],
	['ذ', 3],
	['ط', 3],
	['ث', 3],
	['ژ', 3],
	['ح', 3],
]);

export const persianMap = new Map([
	['q', 'ض'],
	['w', 'ص'],
	['e', 'ث'],
	['r', 'ق'],
	['t', 'ف'],
	['y', 'غ'],
	['u', 'ع'],
	['i', 'ه'],
	['o', 'خ'],
	['p', 'ح'],
	['[', 'ج'],
	[']', 'چ'],
	['a', 'ش'],
	['s', 'س'],
	['d', 'ی'],
	['f', 'ب'],
	['g', 'ل'],
	['h', 'ا'],
	['j', 'ت'],
	['k', 'ن'],
	['l', 'م'],
	[';', 'ک'],
	["'", 'گ'],
	['z', 'ظ'],
	['x', 'ط'],
	['c', 'ز'],
	['v', 'ر'],
	['b', 'ذ'],
	['n', 'د'],
	['m', 'پ'],
	[',', 'و'],
]);
