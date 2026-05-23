/**
 * Performs a Boggle‑style word search on a grid of letters.
 *
 * @param grid - A 2D array representing the letter grid (rows x columns).
 * @param options - Configuration options for the search.
 * @returns A promise that resolves to an array of the best words found.
 */
export async function searchWordsInGrid(
	grid: string[][],
	options: FindWordsOptions = {},
): Promise<FoundWord[]> {
	const {
		minWordLength = 3,
		maxResults = 12,
		timeoutMs = 5000,
		signal,
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

	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new Error(`Search timed out after ${timeoutMs}ms.`));
		}, timeoutMs);

		if (signal) {
			if (signal.aborted) {
				clearTimeout(timeoutId);
				reject(new Error('Search aborted.'));
				return;
			}
			signal.addEventListener('abort', () => {
				clearTimeout(timeoutId);
				reject(new Error('Search aborted.'));
			});
		}

		const dfs = (
			row: number,
			col: number,
			prefix: string,
			path: number[],
		): void => {
			if (signal?.aborted) return;
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
				if (signal?.aborted) break;
				dfs(i, j, '', []);
			}
		}

		clearTimeout(timeoutId);

		const results: FoundWord[] = Array.from(foundMap.entries())
			.map(([word, path]) => ({ word, path, score: computeScore(word) }))
			.sort((a, b) =>
				b.score !== a.score ? b.score - a.score : a.word.length - b.word.length,
			)
			.slice(0, maxResults);

		resolve(results);
	});
}
