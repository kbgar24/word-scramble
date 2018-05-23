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
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header } from 'semantic-ui-react';



export default class LetterGenerator extends React.Component {

  constructor() {
    super();
    this.state = {
      alreadyPlayedWords: [],
      wordStatus: '',
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { admin, currentLetters } = nextProps;
  

    return {
      ...prevState,
      admin,
      currentLetters,
    }
  }


  scrambleLetterList = () => {
    const currentLetters = fisherYatesShuffle(this.state.currentLetters.split('')).join('');
    this.setState({ currentLetters });
  }

  seperateLettersByType = () => {
    const currentLetters = letterByTypeSeperator(this.state.currentLetters.split('')).join('');
    this.setState({ currentLetters })
  }

  render () {

    const { wordStatus, currentLetters, alreadyPlayedWords, totalScore, lastWordScore } = this.state;
 
    console.log('letGenState: ', this.state);
    wordStatus && setTimeout(() => { this.setState({ wordStatus: '' }) }, 2500);

    return (
      <div className='letter-generator'>
   
         <div>
         <span></span>
         <h1>Current Letters</h1>
        <span></span>
         </div>
        <p className='current-letters-div unselectable'>{ currentLetters }</p>

        <WordBuilder isValidWord={this.props.isValidWord} addValidWord={this.addValidWord} />
      </div>
    )
  };
}

