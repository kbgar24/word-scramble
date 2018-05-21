import React, { Component } from 'react';
import LetterGenerator from './letterGenerator.jsx';
import Timer from './timer.jsx';
// import Countdown from 'react-countdown-now';
import CountdownWrapper from './countdownWrapper.jsx';
import { isRealWord, scoreMap, mapObjToArray } from '../helpers';
import { database } from '../firebase';
import AdminView from './adminView.jsx';

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
      <div>
        <h1>GameRoom!</h1>
        
        {
          this.props.currentUser.isAdmin &&
         <AdminView currentRoom={this.state.currentRoom} />
        }

        <h2>Room Name: { this.props.currentUser.currentRoom }</h2>
        {
          this.state.showScoreboard && this.state.scoreBoard && 
          <div>
            <h2>ScoreBoard</h2>
            {/* { console.log('scoreboard!!!!: ', this.state.scoreboard) } */}
            <ol>
              { 
                this.state.scoreBoard.map(({name, totalScore}, i) => (
                  <li key={i}>
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
