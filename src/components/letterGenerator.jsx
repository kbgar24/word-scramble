import React from 'react';
import { 
  vowels,
  consonants,
  fisherYatesShuffle,
  isWordInLetters,
  letterByTypeSeperator,
  generateLetterList,
  scoreMap, 
  isRealWord,
} from '../helpers';
import WordBuilder from './wordBuilder.jsx';



export default class LetterGenerator extends React.Component {

  constructor() {
    super();
    this.state = {
      letters: [],
      validWords: [],
      totalScore: 0,
      lastWordScore: 0,
    }
  }

  scoreWord = word => {
    const { totalScore:oldScore } = this.state;
    let lastWordScore = 0;
    const length = word.length;
    const isReal = isRealWord(word)
    if (!isReal){
      lastWordScore = 2;
    } else {
      lastWordScore = scoreMap[length];
    }

    const totalScore = oldScore + lastWordScore;

    this.setState({ totalScore, lastWordScore })
  }

  handleGenerate = () => {
    const letters = generateLetterList();
    this.setState({letters})
  }

  scrambleLetterList = () => {
    const letters = fisherYatesShuffle(this.state.letters);
    this.setState({ letters });
  }

  seperateLettersByType = () => {
    const letters = letterByTypeSeperator(this.state.letters);
    this.setState({ letters })
  }

  isValidWord = word => {
    const { letters, validWords } = this.state;
    const isPlayedAlready = validWords.includes(word);
    const isValid = isWordInLetters(word, letters);
    if (isValid && !isPlayedAlready) {
      this.addValidWord(word);
      this.scoreWord(word);
    }

    return (
      isPlayedAlready
      ? 'alreadyPlayed'
      : isValid 
      ? 'isValid'
      : 'notValid'
    )
  }


  addValidWord = word => {
    const validWords = [...this.state.validWords, word].sort();
    this.setState({ validWords });
  }

  render () {
    const { letters, validWords, totalScore, lastWordScore } = this.state;
    return (
      <div>
        <h1>Word Scramble</h1>
        <button onClick={this.handleGenerate}>Generate Letters</button>
        <button onClick={this.scrambleLetterList}>Scramble Letters</button>
        <button onClick={this.seperateLettersByType}>Seperate Letters By Type</button>
        
        <p>{ letters.join(' ') }</p>

        <ul>{ validWords.map((word, i) => <li key={i}>{word}</li>) }</ul>
        <h2>Total Score: { totalScore }</h2>
        <h3>Last Word Score: { lastWordScore }</h3>
        <WordBuilder isValidWord={this.isValidWord} addValidWord={this.addValidWord} />
      </div>
    )
  };
}

