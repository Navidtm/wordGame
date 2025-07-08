export const wordToScore = (word: string): number => {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    switch (word[i]) {
      case 'ه':
      case 'س':
      case 'ی':
      case 'ب':
      case 'ل':
      case 'ا':
      case 'ت':
      case 'ن':
      case 'م':
      case 'ر':
      case 'د':
      case 'و':
        score += 1;
        break;

      case 'پ':
      case 'ز':
      case 'ع':
      case 'ش':
      case 'ک':
      case 'گ':
      case 'خ':
      case 'ق':
      case 'ف':
      case 'ج':
        score += 2;
        break;

      case 'ظ':
      case 'غ':
      case 'ض':
      case 'ص':
      case 'چ':
      case 'ذ':
      case 'ط':
      case 'ث':
      case 'ژ':
      case 'ح':
        score += 3;
        break;
    }
  }
  return score;
};
