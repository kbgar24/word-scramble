import React, { Component } from 'react';
import LetterGenerator from './letterGenerator.jsx';
import Timer from './timer.jsx';
// import Countdown from 'react-countdown-now';
import CountdownWrapper from './countdownWrapper.jsx';
import { isRealWord, scoreMap, mapObjToArray, generateLetterList, isWordInLetters } from '../helpers';
import { findLocalNegativePatterns } from 'fast-glob/out/managers/tasks';
import { database } from '../firebase';
import AdminView from './adminView.jsx';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header, Grid } from 'semantic-ui-react';


export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasStarted: false,
      lastWordScore: 0,
      totalScore: 0,
      showScoreboard: false,
      timerColor: 'white',
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    
    const { currentUser: { currentRoom, lastWordScore = 0, totalScore = 0 } } = nextProps
    console.log('nextProps gameRoom: ', nextProps);

    const { 
      hasStarted,
      startTime,
      showScoreboard,
      scoreBoard,
      alreadyPlayed,
      currentLetters,
    } = nextProps.state.data.rooms.find(({ name }) => name === currentRoom)

    const alreadyPlayedWords = alreadyPlayed
      ? Object.keys(alreadyPlayed).map(key => alreadyPlayed[key])
      : []

    return  { 
      ...prevState,
      currentRoom,
      hasStarted,
      scoreBoard,
      startTime,
      showScoreboard,
      lastWordScore,
      totalScore,
      alreadyPlayedWords,
      currentLetters,
    }
  }

  generateNewLetters = () => {
    
    const currentLetters = generateLetterList().join('');

    database
      .ref(`rooms/${this.props.currentUser.currentRoom}`)
      .update({ showScoreboard: false, currentLetters, hasStarted: true, startTime: Date.now() })
    
    this.props.state.data.users.forEach(({currentRoom, id}) => {
      if (currentRoom === this.state.currentRoom){
        database
          .ref(`users/${id}`)
          .update({ totalScore: 0, lastWordScore: 0 })
      }
    })
      setTimeout(() => {
        this.setState({ timerColor: 'red' })
      }, 10000);

      setTimeout(() => {
      database
        .ref(`rooms/${this.props.currentUser.currentRoom}`)
        .update({ hasStarted: false, startTime: false, showScoreboard: true })
        this.setState({ timerColor: 'white' })
    }, 20100)
    
    this.handleGameOver();
  }


  isValidWord = word => {
    const { currentLetters, alreadyPlayedWords } = this.state;
    const isPlayedAlready = alreadyPlayedWords.includes(word);
    const isValid = isWordInLetters(word, currentLetters.split(''));
    
    if (isValid && !isPlayedAlready) {
      this.handleValidWord(word);
    }

    const wordStatus = isPlayedAlready
      ? 'alreadyPlayed'
      : isValid
        ? 'isValid'
        : 'notValid'

    this.setState({ wordStatus })

  }
  
  handleValidWord = word => {

    const { totalScore, lastWordScore } = this.scoreWord(word);
    
    database
      .ref(`rooms/${this.props.currentUser.currentRoom}/alreadyPlayed`)
      .push(word)

    database
      .ref(`users/${this.props.currentUser.id}`)
      .update({ totalScore, lastWordScore })
    
    this.updateScoreboard();
  }

  handleGameOver = () => {
    const { totalScore } = this.state;
    setTimeout(() => {
      this.getUserScores()
    }, 20100)
  }

  updateScoreboard = () => {
    
    const scoreBoard = this.props.state.data.users
      .filter(({ currentRoom }) => currentRoom === this.state.currentRoom)
      .map(({ name, totalScore }) => ({ name, totalScore }))
      .sort((a, b) => (
        a.totalScore < b.totalScore
          ? 1
          : -1
      ))
    
    database
    .ref(`rooms/${this.props.currentUser.currentRoom}`)
    .update({ scoreBoard })
  
  }
  

  getUserScores = () => {

    const scoreBoard = this.props.state.data.users
      .filter(({ currentRoom }) => currentRoom === this.state.currentRoom)
      .map(({ name, totalScore }) => ({ name, totalScore }))
      .sort((a,b) => (
        a.totalScore < b.totalScore
        ? 1
        : -1
      ))

    database
      .ref(`rooms/${this.props.currentUser.currentRoom}`)
      .update({ scoreBoard, currentLetters: '', alreadyPlayed: false })

  }

  scoreWord = word => {
    const { totalScore: oldScore = 0 } = this.state;
    const length = word.length;
    const isReal = isRealWord(word)
    let lastWordScore = 0;
    
    if (!isReal) {
      lastWordScore = 2;
    } else {
      lastWordScore = scoreMap[length];
    }

    const totalScore = oldScore + lastWordScore;

    this.setState({ totalScore, lastWordScore })

    return { totalScore, lastWordScore };
  }

  render = () => {
    const { totalScore, lastWordScore, scoreBoard, alreadyPlayedWords, wordStatus } = this.state;
    const currentRoom = this.props.currentUser.currentRoom;
    const currentRoomObj = this.props.state.data.rooms.find(({ name }) => name === currentRoom)
    const { currentLetters } = currentRoomObj;
    
    return (
      <div className='gameRoom'>
      
        <Grid>
          <Grid.Column width={3}>
            
            {
              this.props.currentUser.isAdmin &&
              <AdminView 
                currentRoom={this.state.currentRoom}
                generateNewLetters={this.generateNewLetters}
              />
            }
            
            <div className='scoreboard-div'>
              <h2>Scoreboard</h2>
              <div className='admin-sep'></div>
              <Table celled inverted selectable>

                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Player Name</Table.HeaderCell>
                    <Table.HeaderCell>Total Score</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {
                    this.state.scoreBoard 
                    ? this.state.scoreBoard.map(({ name, totalScore }, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{totalScore}</Table.Cell>
                      </Table.Row>
                    ))
                    
                    : this.props.state.data.users
                      .filter(({ currentRoom }) => currentRoom === this.props.currentUser.currentRoom)
                      .map(({ name, id }) => (
                        <Table.Row key={id}>
                          <Table.Cell>{name}</Table.Cell>
                          <Table.Cell>{0}</Table.Cell>
                        </Table.Row>
                      ))
                  }
                </Table.Body>
              </Table>
            </div>

          </Grid.Column>
        
          <Grid.Column width={10}>
          
            <CountdownWrapper
              hasStarted={this.state.hasStarted}
              startTime={this.state.startTime} 
              timerColor={this.state.timerColor}
              />

            <LetterGenerator
              admin={this.props.currentUser.isAdmin}
              alreadyPlayed={currentRoomObj.alreadyPlayed}
              currentLetters={currentLetters}
              handleValidWord={this.handleValidWord}
              hasStarted={this.state.hasStarted}
              lastWordScore={this.state.lastWordScore}
              isValidWord={this.isValidWord}
            />

 

          </Grid.Column>

          <Grid.Column width={3} >
            <Button
              negative
              size='huge'
              name='Lobby'
              onClick={() => { this.props.handleLeaveRoom(this.props.currentUser.isAdmin) }}
            >
              {this.props.currentUser.isAdmin ? 'Close Room' : 'Leave Room'}
            </Button>

            <div className='admin-sep panel'></div>


            <div className='in-game-score'>
            
              <Table inverted>

                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Game Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {
                        wordStatus === 'isValid' && (
                          <div style={{ color: 'gold' }}>
                            <h1>Valid Word!</h1>
                            <h1>{`+${this.state.lastWordScore} points!`}</h1>
                          </div>
                        )
                      }

                      {wordStatus === 'alreadyPlayed' && <h1 style={{ color: 'red' }}>Already Played!</h1>}
                      {wordStatus === 'notValid' && <h1 style={{ color: 'red' }}>Invalid Word!</h1>}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            <div className='admin-sep panel'></div>

            <div className='recent-words'>

              <Table inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Recent Words</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  { 
                    Array(6).fill('').concat(alreadyPlayedWords).reverse().slice(0, 6).map((word, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          { word }
                        </Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
              </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};
