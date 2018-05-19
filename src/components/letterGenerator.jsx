import React from 'react';
import { vowels, consonants, fisherYatesShuffle } from '../helpers';
import WordBuilder from './wordBuilder.jsx';

export default class LetterGenerator extends React.Component {

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

  isValidWord = word => {
    const { letters } = this.state;
    return word.split('').every( letter => letters.includes(letter) );
  }

  render = () => (
    <div>
      <h1>Word Scramble</h1>
      <button onClick={this.generateLetterList}>Generate Letters</button>
      <button onClick={this.scrambleLetterList}>Scramble Letters</button>
      <button onClick={this.seperateLettersByType}>Seperate Letters By Type</button>
      
      <p>{ this.state.letters.join(' ') }</p>

      <WordBuilder isValidWord={this.isValidWord} />
    </div>
  );
};
