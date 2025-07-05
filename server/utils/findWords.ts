class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isWord: boolean = false;
}

// کلاس Trie برای ساخت دیکشنری پیشوندی
class Trie {
  root: TrieNode = new TrieNode();

  constructor(words: string[]) {
    for (const word of words) {
      this.insert(word);
    }
  }

  insert(word: string) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.isWord = true;
  }

  // بررسی اینکه آیا پیشوند موجود است یا خیر
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }

  // بررسی اینکه آیا کلمه‌ی کامل وجود دارد
  search(word: string): boolean {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return node.isWord;
  }
}

// جهت‌های حرکت (8 جهت مجاور)
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

/**
 * جستجوی همه‌ی کلمات معنی‌دار از جدول
 * @param board  آرایه 4x4 حروف فارسی
 * @param wordList  لیست کلمات فارسی
 * @returns آرایه‌ی کلمات یافته شده
 */
export function findWords(board: string[][], wordList: string[]): string[] {
  const trie = new Trie(wordList);
  const found = new Set<string>();
  const m = board.length;
  const n = board[0].length;

  const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));

  function dfs(x: number, y: number, prefix: string) {
    if (x < 0 || y < 0 || x >= m || y >= n) return;
    if (visited[x][y]) return;

    const newPrefix = prefix + board[x][y];
    // اگر هیچ کلمه‌ای با این پیشوند وجود نداشته باشد، شاخه را قطع کن
    if (!trie.startsWith(newPrefix)) return;

    // اگر کلمه‌ی معنی‌دار است، به نتیجه اضافه کن
    if (trie.search(newPrefix)) {
      found.add(newPrefix);
    }

    visited[x][y] = true;
    // جستجو در 8 جهت
    for (const [dx, dy] of directions) {
      dfs(x + dx, y + dy, newPrefix);
    }
    visited[x][y] = false;
  }

  // شروع جستجو از همه‌ی خانه‌ها
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, '');
    }
  }

  return Array.from(found);
}
