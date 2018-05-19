import React from 'react';

const vowels = 'aeiouy'.split('');
const consonants = 'bcdfghjklmnpqrstvwxz'.split('');

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

  render = () => (
    <div>
      <h1>Word Scramble</h1>
      <button onClick={this.generateLetterList}>Generate Letters</button>
      <p>{ this.state.letters.join(' ') }</p>
    </div>
  );
};
