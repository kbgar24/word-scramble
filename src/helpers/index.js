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