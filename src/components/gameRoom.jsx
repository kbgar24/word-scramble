import React, { Component } from 'react';
import LetterGenerator from './letterGenerator.jsx';
import Timer from './timer.jsx';
// import Countdown from 'react-countdown-now';
import CountdownWrapper from './countdownWrapper.jsx';
import { isRealWord, scoreMap, mapObjToArray } from '../helpers';
import { findLocalNegativePatterns } from 'fast-glob/out/managers/tasks';
import { database } from '../firebase';
import AdminView from './adminView.jsx';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header } from 'semantic-ui-react';


export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasStarted: false,
      lastWordScore: 0,
      totalScore: 0,
      showScoreboard: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { currentUser: { currentRoom, lastWordScore = 0, totalScore = 0 } } = nextProps
    console.log('nextProps gameRoom: ', nextProps);

    const { hasStarted, startTime, showScoreboard, scoreBoard  } = nextProps.state.data.rooms.find(({ name }) => name === currentRoom)
    // let { scoreBoard, hasStarted: prevHasStarted } = prevState;
    // hasStarted && (scoreBoard = false);
    return  { ...prevState, currentRoom, hasStarted, scoreBoard, startTime, showScoreboard, lastWordScore, totalScore }

  }

  handleNewLetters = (currentLetters) => {
    // this.setState({startTime: Date.now()})
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
      database
        .ref(`rooms/${this.props.currentUser.currentRoom}`)
        .update({ hasStarted: false, startTime: false, showScoreboard: true })
    }, 20100)
    this.handleGameOver();
  }
  
  handleValidWord = (word) => {
    const { totalScore, lastWordScore } = this.scoreWord(word);
    database
      .ref(`rooms/${this.props.currentUser.currentRoom}/alreadyPlayed`)
      .push(word)

    database
      .ref(`users/${this.props.currentUser.id}`)
      .update({ totalScore, lastWordScore })
  }

  handleGameOver = () => {
    const { totalScore } = this.state;
    setTimeout(() => {
      this.getUserScores()
    }, 20100)
  }

  getUserScores = () => {
    // console.log('getUserScore called!');
    // const { currentRoom } = this.state;
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

    // console.log('rawScoreboard: ', scoreBoard);
        // this.setState({ scoreBoard })
    // const scoreBoard = this.props.state.data.users
      // .filter(({currentRoom}) => currentRoom === this.state.currentRoom)
    // console.log('rawScoreboard: ', scoreBoard);
    // this.setState({ scoreBoard });
  }

  scoreWord = word => {
    const { totalScore: oldScore = 0 } = this.state;
    let lastWordScore = 0;
    const length = word.length;
    const isReal = isRealWord(word)
    if (!isReal) {
      lastWordScore = 2;
    } else {
      lastWordScore = scoreMap[length];
    }

    const totalScore = oldScore + lastWordScore;

    this.setState({ totalScore, lastWordScore })

    return { totalScore, lastWordScore };


  }

  // callOnce = (fn) => {
  //   counter = this.state.counter;
  //   return 
  // }

  render = () => {
    // console.log('propsgameroom: ', this.props)
    // console.log('stateGameroom: ', this.state)
    const { totalScore, lastWordScore, scoreBoard } = this.state;
    const currentRoom = this.props.currentUser.currentRoom;
    const currentRoomObj = this.props.state.data.rooms.find(({ name }) => name === currentRoom)
    const { currentLetters } = currentRoomObj;
    return (
      <div className='gameRoom'>
        <Button
          negative
          size='massive'
          name='Lobby'
          onClick={() => { this.props.handleLeaveRoom(this.props.currentUser.isAdmin) }}
        >
         { this.props.currentUser.isAdmin ? 'Close Room' : 'Leave Room' }
        </Button>

        {
          this.props.currentUser.isAdmin &&
         <AdminView currentRoom={this.state.currentRoom} />
        }
        {
          this.state.showScoreboard && this.state.scoreBoard && (
          <div className='scoreboard-div'>
            {/* <h1>ScoreBoard</h1> */}

            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Player Name</Table.HeaderCell>
                  <Table.HeaderCell>Total Score</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  this.state.scoreBoard.map(({ name, totalScore }, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{name}</Table.Cell>
                     <Table.Cell>{totalScore}</Table.Cell>
                    </Table.Row>
                  ))
                  }
              </Table.Body>
            </Table>
  </div>
                )
      
        }

        {/* <div className='current-players-list'> */}

          {/* <h1> Players in Room </h1> */}
          {/* <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Current Players</Table.HeaderCell>
                {/* <Table.HeaderCell>Current Room</Table.HeaderCell> */}
              {/* </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.state.data.users
                .filter(({ currentRoom }) => currentRoom === this.props.currentUser.currentRoom)
                .map(({ name, id }) => (
                <Table.Row key={id}>
                  <Table.Cell>{name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body> */}
          {/* </Table> */} */}

        {/* </div> */}
        
        {/* <h2>Users in Room</h2>
        <ul>
            { 
              this.props.state.data.users
              .filter(({currentRoom}) => currentRoom === this.props.currentUser.currentRoom) 
              .map(({ name, id }) => (
                <li key={id}>
                  { name }
                </li>
              ))
            } 
        </ul> */}
        <CountdownWrapper 
          hasStarted={this.state.hasStarted}
          startTime={this.state.startTime}/>
        {/* <Timer hasStarted={this.state.hasStarted} /> */}
        <LetterGenerator 
          admin={this.props.currentUser.isAdmin}
          alreadyPlayed={currentRoomObj.alreadyPlayed}
          handleNewLetters={this.handleNewLetters}
          currentLetters={currentLetters}
          handleValidWord={this.handleValidWord}
          hasStarted={this.state.hasStarted}
          lastWordScore={this.state.lastWordScore}
        />

        <div className='in-game-score'>
          <Table definition inverted>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Last Word Score</Table.Cell>
                <Table.Cell>{ lastWordScore }</Table.Cell>
              </Table.Row>
              {/* <Table.Row>
                <Table.Cell>Total Score</Table.Cell>
                <Table.Cell>{ totalScore }</Table.Cell>
              </Table.Row> */}
            </Table.Body>
          </Table>
        </div>

  
      </div>
    )
  };
};
