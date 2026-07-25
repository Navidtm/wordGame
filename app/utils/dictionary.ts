/** Normalizes dictionary spellings to the characters available on a board tile. */
export const normalizeWord = (word: string): string =>
	word.replaceAll('\u200c', '').replaceAll('ي', 'ی').replaceAll('ك', 'ک');

/** Represents a single node in the Trie. */
class TrieNode {
	children = new Map<string, TrieNode>();
	isWord = false;
}

/**
 * A Trie (prefix tree) implementation for efficient word storage and lookup.
 */
class WordDictionary {
	private root = new TrieNode();

	/**
	 * Builds the Trie from the provided word list.
	 *
	 * @param words - An array of words to populate the dictionary.
	 */
	constructor(words: string[]) {
		for (const word of words) {
			this.insert(word);
		}
	}

	/** Inserts a single word into the Trie. */
	private insert(word: string): void {
		let node = this.root;
		for (const char of word) {
			if (!node.children.has(char)) {
				node.children.set(char, new TrieNode());
			}
			node = node.children.get(char)!;
		}
		node.isWord = true;
	}

	/**
	 * Checks if a specific word exists in the dictionary.
	 *
	 * @param word - The word to search for.
	 * @returns `true` if the word exists, `false` otherwise.
	 */
	public search(word: string): boolean {
		let node = this.root;
		for (const char of word) {
			if (!node.children.has(char)) return false;
			node = node.children.get(char)!;
		}
		return node.isWord;
	}

	/**
	 * Checks if any word in the dictionary starts with the given prefix.
	 *
	 * @param prefix - The prefix to test.
	 * @returns `true` if a matching prefix exists, `false` otherwise.
	 */
	public startsWith(prefix: string): boolean {
		let node = this.root;
		for (const char of prefix) {
			if (!node.children.has(char)) return false;
			node = node.children.get(char)!;
		}
		return true;
	}
}

let dictionaryPromise: Promise<WordDictionary> | undefined;

/**
 * Loads the word list only when a completed board needs to be searched. The resulting Trie is
 * cached for the remainder of the session so subsequent searches do not rebuild it.
 */
export const loadDictionary = (): Promise<WordDictionary> => {
	dictionaryPromise ??= import('../data/fa-IR.json').then(
		({ default: wordList }) => new WordDictionary([...new Set(wordList.map(normalizeWord))]),
	);

	return dictionaryPromise;
};
