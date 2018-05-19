export const vowels = 'aeiouy'.split('');

export const consonants = 'bcdfghjklmnpqrstvwxz'.split('');

export const fisherYatesShuffle = array => {
  const newArray = array.slice();
  let currentIndex = newArray.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }
  return newArray;
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
  return word.length && true;
}

export const lettersByTypeSeperator = letters => {
  const vowelArray = [];
  const consonantArray = [];

  letters.forEach(letter => {
    vowels.includes(letter)
      ? vowelArray.push(letter)
      : consonantArray.push(letter);
  })

  vowelArray.sort();
  consonantArray.sort();

  return [...vowelArray, ...consonantArray];
}

export const generateLetterList = () => {
  
  const vowelCount = Math.floor(Math.random() * 6) + 2;
  const consonantCount = 9 - vowelCount;
  const unsortedLetters = [];

  for (let i = 0; i < vowelCount; i++) {
    const vowel = vowels[Math.floor(Math.random() * vowels.length)]
    unsortedLetters.push(vowel);
  }

  for (let i = 0; i < consonantCount; i++) {
    const consonant = consonants[Math.floor(Math.random() * vowels.length)]
    unsortedLetters.push(consonant);
  }

  return unsortedLetters.sort();

}

export const scoreMap = {
  9: 20,
  8: 17,
  7: 15,
  6: 13,
  5: 10,
  4: 8,
  3: 6,
  2: 4,
  1: 2,
}

export const isRealWord = word => Math.floor(Math.random() * 2);