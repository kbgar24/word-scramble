import React, { Component } from 'react';
import LetterGenerator from './letterGenerator.jsx';
import Timer from './timer.jsx';
// import Countdown from 'react-countdown-now';
import CountdownWrapper from './countdownWrapper.jsx';
import { isRealWord, scoreMap, mapObjToArray } from '../helpers';

export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasStarted: false,
      lastWordScore: 0,
      totalScore: 0,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { currentRoom } = nextProps.currentUser;
    const { hasStarted, startTime  } = nextProps.state.data.rooms.find(({ name }) => name === currentRoom)
    let { scoreBoard, hasStarted: prevHasStarted } = prevState;
    hasStarted && (scoreBoard = false);
    // return hasStarted === prevHasStarted === true
    // ? null
    // : { ...prevState, currentRoom, hasStarted, scoreBoard }
    return startTime 
    ? { ...prevState, currentRoom, hasStarted, scoreBoard, startTime }
      : { ...prevState, currentRoom, hasStarted, scoreBoard }

  }

  handleNewLetters = (currentLetters) => {
    this.setState({startTime: Date.now()})
    firebase.database()
      .ref(`rooms/${this.props.currentUser.currentRoom}`)
      .update({ currentLetters, hasStarted: true, startTime: Date.now() })
      
    setTimeout(() => {
      firebase.database()
        .ref(`rooms/${this.props.currentUser.currentRoom}`)
        .update({ hasStarted: false })
    }, 20100)
    this.handleGameOver();
  }
  
  handleValidWord = (word) => {
    const totalScore = this.scoreWord(word);
    firebase
      .database()
      .ref(`rooms/${this.props.currentUser.currentRoom}/alreadyPlayed`)
      .push(word)

    // firebase 
    //   .database()
    //   .ref(`users/${this.props.currentUser.id}`)
    //   .update({ totalScore })
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
    firebase.database()
      .ref('/rooms')
      .once('value')
      .then(snapshot => {
        const roomObj = snapshot.val();
        const rooms = mapObjToArray(roomObj);

        const scoreBoard = rooms.filter(({ currentRoom }) => currentRoom === this.state.currentRoom)
        console.log('rawScoreboard: ', scoreBoard);
        this.setState({ scoreBoard })
      })
    // const scoreBoard = this.props.state.data.users
      // .filter(({currentRoom}) => currentRoom === this.state.currentRoom)
      // .map(({ name, totalScore }) => { name, totalScore })
      // .sort((a,b) => (
      //   a.totalScore < b.totalScore
      //   ? -1
      //   : 1
      // ))
    // console.log('rawScoreboard: ', scoreBoard);
    // this.setState({ scoreBoard });
  }

  scoreWord = word => {
    const { totalScore: oldScore } = this.state;
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

    return totalScore;


  }

  // callOnce = (fn) => {
  //   counter = this.state.counter;
  //   return 
  // }

  render = () => {
    console.log('propsgameroom: ', this.props)
    // console.log('stateGameroom: ', this.state)
    const { totalScore, lastWordScore, scoreBoard } = this.state;
    const currentRoom = this.props.currentUser.currentRoom;
    const currentRoomObj = this.props.state.data.rooms.find(({ name }) => name === currentRoom)
    const { currentLetters } = currentRoomObj;
    console.log('scoreBoard!!: ', scoreBoard)
    return (
      <div>
        <h1>GameRoom!</h1>
        
        {
          this.props.currentUser.isAdmin &&
          <h3>Admin View</h3>
        }

        <h2>Room Name: { this.props.currentUser.currentRoom }</h2>
        {
          this.state.scoreBoard &&
          <div>
            <h2>ScoreBoard</h2>
            { console.log('scoreboard!!!!: ', this.state.scoreboard) }
            <ol>
              { 
                this.state.scoreBoard.map(({name, totalScore}) => (
                  <li>
                    { `${name} - ${totalScore}points `}
                  </li>
                )) 
              }
            </ol>
          </div>

        }
        <h2>Users in Room</h2>
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
        </ul>
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
        <h2>Total Score: {totalScore}</h2>
        <h3>Last Word Score: {lastWordScore}</h3>
        <button 
          name='Lobby'
          onClick={() => {this.props.handleLeaveRoom(this.props.currentUser.isAdmin)}}
        >
            Leave Room
        </button>
        
      </div>
    )
  };
};
