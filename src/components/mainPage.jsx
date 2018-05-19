import React from 'react';

const vowels = 'aeiouy'.split('');
const consonants = 'bcdfghjklmnpqrstvwxz'.split('');

const fisherYatesShuffle = array => {
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


export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      letters: [],
    }
  }

  generateLetterList = () => {
    const vowelCount = Math.floor(Math.random() * 6) + 2;
    const consonantCount = 9 - vowelCount;
    const unsortedLetters = [];

    for (let i = 0; i < vowelCount; i++ ){
      const vowel = vowels[Math.floor(Math.random() * vowels.length)]
      unsortedLetters.push(vowel);
    }

    for (let i = 0; i < consonantCount; i++) {
      const consonant = consonants[Math.floor(Math.random() * vowels.length)]
      unsortedLetters.push(consonant);
    }

    const letters = unsortedLetters.sort();
    this.setState({ letters });
    
  }

  scrambleLetterList = () => {
    const { letters:oldLetters } = this.state;
    const letters = fisherYatesShuffle(oldLetters.slice());
    this.setState({ letters });
  }

  seperateLettersByType = () => {
    const { letters:oldLetters } = this.state;
    const vowelArray = [];
    const consonantArray = [];

    oldLetters.forEach(letter => {
      vowels.includes(letter)
      ? vowelArray.push(letter)
      : consonantArray.push(letter);
    })

    vowelArray.sort();
    consonantArray.sort();

    const letters = [...vowelArray, ...consonantArray];

    this.setState({ letters })


  }

  render = () => (
    <div>
      <h1>Word Scramble</h1>
      <button onClick={this.generateLetterList}>Generate Letters</button>
      <button onClick={this.scrambleLetterList}>Scramble Letters</button>
      <button onClick={this.seperateLettersByType}>Seperate Letters By Type</button>
      
      <p>{ this.state.letters.join(' ') }</p>
    </div>
  );
};
