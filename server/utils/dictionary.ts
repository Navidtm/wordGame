import wordList from '../data/fa-IR.json';

/**
 * Represents a single node in the Trie.
 */
class TrieNode {
	children = new Map<string, TrieNode>();
	isWord = false;
}

/**
 * A Trie (prefix tree) implementation for efficient word storage and lookup.
 * The entire dictionary is loaded once and reused, preventing per‑request overhead.
 */
class WordDictionary {
	private root = new TrieNode();

	/**
	 * Builds the Trie from the provided word list.
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

// ==================================================
// Singleton Instance: Loaded Once, Reused Forever
// ==================================================
export const dictionary = new WordDictionary(wordList);
