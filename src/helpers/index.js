export const vowels = 'aeiouy'.split('');

export const consonants = 'bcdfghjklmnpqrstvwxz'.split('');

export const fisherYatesShuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export const makeLetterFrequencyMap = arrayofLetters => (
  arrayofLetters.reduce((tv, cv) => {
    tv[cv] ? tv[cv]++ : tv[cv] = 1;
    return tv;
  }, {})
)

export const isWordInLetters = (word, letters) => {
  const letterMap = makeLetterFrequencyMap(letters);
  const wordMap = makeLetterFrequencyMap(word.split(''));
  const wordLetters = Object.keys(wordMap);

  for (let letter of wordLetters) {
    if (!letterMap[letter] || wordMap[letter] > letterMap[letter]) {
      return false;
    }
  }
  return true;
}