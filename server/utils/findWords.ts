import wordList from '~~/server/data/fa-IR.json';

class TreeNode {
  children: Map<string, TreeNode> = new Map();
  isWord: boolean = false;
}

class Tree {
  root: TreeNode = new TreeNode();

  constructor(words: string[]) {
    for (const word of words) {
      this.insert(word);
    }
  }

  insert(word: string) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TreeNode());
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

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
] as const;

export function findWords(board: string[][]): Word[] {
  const tree = new Tree(wordList);
  const m = board.length;
  const n = board[0].length;
  const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
  const found: Map<string, number[]> = new Map();

  function dfs(x: number, y: number, prefix: string, path: number[]) {
    if (x < 0 || y < 0 || x >= m || y >= n) return;
    if (visited[x][y]) return;

    const newPrefix = prefix + board[x][y];
    if (!tree.startsWith(newPrefix)) return;

    path.push(x * 4 + y);
    visited[x][y] = true;

    if (tree.search(newPrefix)) {
      if (!found.has(newPrefix)) {
        found.set(newPrefix, [...path]);
      }
    }

    for (const [dx, dy] of directions) {
      dfs(x + dx, y + dy, newPrefix, path);
    }

    visited[x][y] = false;
    path.pop();
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, '', []);
    }
  }

  return Array.from(found.entries()).map(([word, path]) => ({
    word,
    path,
    score: wordToScore(word)
  }));
}
