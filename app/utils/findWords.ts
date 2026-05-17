import { chunk, fill, range } from 'es-toolkit';
import wordList from '~~/data/fa-IR.json';

export type Word = {
	word: string;
	path: number[];
	score: number;
};

class Node {
	children = new Map<string, Node>();
	isWord: boolean = false;
}

class Tree {
	root = new Node();

	constructor() {
		for (const word of wordList) {
			this.insert(word);
		}
	}

	insert(word: string) {
		let node = this.root;
		for (const ch of word) {
			if (!node.children.has(ch)) {
				node.children.set(ch, new Node());
			}
			node = node.children.get(ch)!;
		}
		node.isWord = true;
	}

	startsWith(prefix: string): boolean {
		let node = this.root;
		for (const ch of prefix) {
			if (!node.children.has(ch)) return false;
			node = node.children.get(ch)!;
		}
		return true;
	}

	search(word: string): boolean {
		let node = this.root;
		for (const ch of word) {
			if (!node.children.has(ch)) return false;
			node = node.children.get(ch)!;
		}
		return node.isWord;
	}
}

export const findWords = (letters: string[]): Word[] => {
	if (letters.filter(Boolean).length < 4 * 4) return [];

	const board = chunk(letters, 4);
	const tree = new Tree();

	const visited = chunk(fill(Array(4 * 4), false), 4);
	const found = new Map<string, number[]>();

	const dfs = (x: number, y: number, prefix: string, path: number[]) => {
		if (x < 0 || y < 0 || x >= 4 || y >= 4) return;
		if (visited[x]![y]) return;

		const newPrefix = prefix + board[x]![y];
		if (!tree.startsWith(newPrefix)) return;

		path.push(x * 4 + y);
		visited[x]![y] = true;

		if (tree.search(newPrefix) && !found.has(newPrefix)) {
			found.set(newPrefix, [...path]);
		}

		range(9).forEach((n) =>
			dfs(x + Math.floor(n / 3) - 1, y + ((n % 3) - 1), newPrefix, path),
		);

		visited[x]![y] = false;
		path.pop();
	};

	range(16).forEach((n) => dfs(Math.floor(n / 4), n % 4, '', []));

	return found
		.entries()
		.toArray()
		.map<Word>((v) => ({ word: v[0], path: v[1], score: wordToScore(v[0]) }))
		.sort((a, b) =>
			b.score == a.score ? a.word.length - b.word.length : b.score - a.score,
		)
		.slice(0, 12);
};
