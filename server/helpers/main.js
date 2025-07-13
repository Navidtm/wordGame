import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
// import content from '../../da'

// 1. خواندن فایل به صورت رشته
const dictPath = join(import.meta.dirname, '../data/data.json'); // مسیر فایل
const content = readFileSync(dictPath, 'utf-8');

// // 2. تقسیم روی خط جدید
// const lines = content.split(/\r?\n/);

// // 3. استخراج بخش قبل از `/` و فیلتر کردن موارد خالی
// const words = lines.filter((word) => word && word.length > 0).sort(); // حذف سطرهای خالی
// console.log(words.slice(0, 20));
// console.log(words.length);

// console.log(content.split(0, 10));

const words = JSON.parse(content);

writeFileSync('./data.json', JSON.stringify(words, null, 2));
