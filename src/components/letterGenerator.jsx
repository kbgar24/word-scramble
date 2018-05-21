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

let renderCount = 0;

import WordBuilder from './wordBuilder.jsx';



export default class LetterGenerator extends React.Component {

  constructor() {
    super();
    this.state = {
      alreadyPlayedWords: [],
      wordStatus: '',
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { admin, alreadyPlayed, currentLetters } = nextProps;
    const alreadyPlayedWords = alreadyPlayed
    ? Object.keys(alreadyPlayed).map(key => alreadyPlayed[key])
    : []
    console.log('alreadyPlayedWords: ', alreadyPlayedWords);
    return {
      ...prevState,
      admin,
      alreadyPlayedWords,
      currentLetters,
    }
  }


  handleGenerate = () => {
    const letters = generateLetterList();
    const letterString = letters.join('');
    this.props.handleNewLetters(letterString);
  }

  scrambleLetterList = () => {
    const currentLetters = fisherYatesShuffle(this.state.currentLetters.split('')).join('');
    this.setState({ currentLetters });
  }

  seperateLettersByType = () => {
    const currentLetters = letterByTypeSeperator(this.state.currentLetters.split('')).join('');
    this.setState({ currentLetters })
  }

  isValidWord = word => {
    console.log('CHECKword: ', word);
    const { currentLetters, alreadyPlayedWords } = this.state;
    const isPlayedAlready = alreadyPlayedWords.includes(word);
    const isValid = isWordInLetters(word, currentLetters.split(''));
    if (isValid && !isPlayedAlready) {
      // this.addValidWord(word);
      this.props.handleValidWord(word);
    }

    const wordStatus = isPlayedAlready
      ? 'alreadyPlayed'
      : isValid 
      ? 'isValid'
      : 'notValid'
    
    this.setState({ wordStatus })
  }



  render () {
    
    
    const { wordStatus, currentLetters, alreadyPlayedWords, totalScore, lastWordScore } = this.state;
 
    console.log('letGenState: ', this.state);
    wordStatus && setTimeout(() => { this.setState({ wordStatus: '' }) }, 2500);

    return (
      <div>
        <h1>Word Scramble</h1>
        { 
          this.props.admin && !this.props.hasStarted &&
          <button onClick={this.handleGenerate}>Begin New Game!</button>
        
        }
        <button onClick={this.scrambleLetterList}>Scramble Letters</button>
        <button onClick={this.seperateLettersByType}>Seperate Letters By Type</button>
        
        <p>{currentLetters }</p>

        <ul>{ alreadyPlayedWords.map((word, i) => <li key={i}>{word}</li>) }</ul>
 
        {wordStatus === 'isValid' && <h1>Valid Word! {`+${this.props.lastWordScore}!`}</h1>}
        {wordStatus === 'alreadyPlayed' && <h1>Already Played!</h1>}
        {wordStatus === 'notValid' && <h1>Invalid Word!</h1>}
        <WordBuilder isValidWord={this.isValidWord} addValidWord={this.addValidWord} />
      </div>
    )
  };
}

