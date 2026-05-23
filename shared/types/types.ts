export interface FoundWord {
	word: string;
	path: number[];
	score: number;
}

export interface FindWordsOptions {
	minWordLength?: number;
	maxResults?: number;
	timeoutMs?: number;
	signal?: AbortSignal;
}
