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
      totalScore: 0,
      lastWordScore: 0,
      alreadyPlayedWords: [],
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
      this.scoreWord(word);
    }



    // return (
    //   isPlayedAlready
    //   ? 'alreadyPlayedWords'
    //   : isValid 
    //   ? 'isValid'
    //   : 'notValid'
    // )
  }



  render () {
    const { currentLetters, alreadyPlayedWords, totalScore, lastWordScore } = this.state;
    console.log('letGenState: ', this.state);
    return (
      <div>
        <h1>Word Scramble</h1>
        { 
          this.props.admin && 
          <button onClick={this.handleGenerate}>Generate Letters</button>
        
        }
        <button onClick={this.scrambleLetterList}>Scramble Letters</button>
        <button onClick={this.seperateLettersByType}>Seperate Letters By Type</button>
        
        <p>{currentLetters }</p>

        <ul>{ alreadyPlayedWords.map((word, i) => <li key={i}>{word}</li>) }</ul>
        <h2>Total Score: { totalScore }</h2>
        <h3>Last Word Score: { lastWordScore }</h3>
        <WordBuilder isValidWord={this.isValidWord} addValidWord={this.addValidWord} />
      </div>
    )
  };
}

