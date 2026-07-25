import type { FoundWord } from '~/types/types';
import { dictionary } from './dictionary';
import { computeScore } from './utils';

interface FindWordsOptions {
	minWordLength?: number;
	maxWordLength?: number;
	maxResults?: number;
}

/**
 * Performs a Boggle‑style word search on a grid of letters.
 *
 * @param grid - A 2D array representing the letter grid (rows x columns).
 * @param options - Configuration options for the search.
 * @returns An array of the best words found.
 */
export const searchWordsInGrid = (
	grid: string[][],
	options: FindWordsOptions = {},
): FoundWord[] => {
	const {
		minWordLength = 3,
		maxWordLength = Infinity,
		maxResults = 21,
	} = options;

	// --- Input Validation ---
	if (!Array.isArray(grid) || grid.length === 0) {
		return [];
	}
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	if (cols === 0) {
		return [];
	}
	for (let i = 0; i < rows; i++) {
		if (grid[i]!.length !== cols) {
			throw new Error(`Row ${i} has inconsistent length.`);
		}
	}

	// --- Directions for 8 adjacent moves (including diagonals) ---
	const directions: [number, number][] = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	const visited: boolean[][] = Array.from({ length: rows }, () =>
		Array(cols).fill(false),
	);
	const foundMap = new Map<string, number[]>();
	const index = (row: number, col: number): number => row * cols + col;

	const dfs = (
		row: number,
		col: number,
		prefix: string,
		path: number[],
	): void => {
		if (visited[row]![col]) return;

		const newPrefix = prefix + grid[row]![col];
		if (!dictionary.startsWith(newPrefix)) return;

		path.push(index(row, col));
		visited[row]![col] = true;

		if (newPrefix.length >= minWordLength && dictionary.search(newPrefix)) {
			if (!foundMap.has(newPrefix)) {
				foundMap.set(newPrefix, [...path]);
			}
		}

		for (const [dx, dy] of directions) {
			const nx = row + dx;
			const ny = col + dy;
			if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
				dfs(nx, ny, newPrefix, path);
			}
		}

		visited[row]![col] = false;
		path.pop();
	};

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			dfs(i, j, '', []);
		}
	}

	const results: FoundWord[] = Array.from(foundMap.entries())
		.map(([word, path]) => ({ word, path, score: computeScore(word) }))
		.filter(({ word }) => word.length <= maxWordLength)
		.sort((a, b) =>
			b.score !== a.score ? b.score - a.score : b.word.length - a.word.length,
		)
		.slice(0, maxResults);

	return results;
};
