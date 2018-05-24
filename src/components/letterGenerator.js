import React from 'react';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header } from 'semantic-ui-react';

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

import WordBuilder from './wordBuilder.js';

export default class LetterGenerator extends React.Component {

  state = {
    alreadyPlayedWords: [],
    wordStatus: '',
  }

  static getDerivedStateFromProps = ({admin, currentLetters}, prevState) => ({
      ...prevState,
      admin,
      currentLetters,
  })

  scrambleLetterList = () => {
    const currentLetters = fisherYatesShuffle(this.state.currentLetters.split('')).join('');
    this.setState({ currentLetters });
  }

  seperateLettersByType = () => {
    const currentLetters = letterByTypeSeperator(this.state.currentLetters.split('')).join('');
    this.setState({ currentLetters })
  }

  handleKeyDown = ({ altKey, keyCode }) => {
    altKey && keyCode === 70 && this.scrambleLetterList();
    altKey && keyCode === 74 && this.seperateLettersByType();
  }

  render () {
    const { wordStatus, currentLetters, alreadyPlayedWords, totalScore, lastWordScore } = this.state;
 
    wordStatus && setTimeout(() => { this.setState({ wordStatus: '' }) }, 2500);

    return (
      <div className='letter-generator'
        onKeyDown={this.handleKeyDown}
      >
        
        <div>
          <span></span>
          <h1>Current Letters</h1>
          <span></span>
        </div>
        
        <p className='current-letters-div unselectable'>{ currentLetters }</p>

        <WordBuilder isValidWord={this.props.isValidWord} />
      
      </div>
    )
  };
}

