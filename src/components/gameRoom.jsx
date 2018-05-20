import React, { Component } from 'react';

import LetterGenerator from './letterGenerator.jsx';
import Timer from './timer.jsx';

import Countdown from 'react-countdown-now';

export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTimer: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { currentRoom } = nextProps.currentUser;
    const { hasStarted  } = nextProps.state.data.rooms.find(({ name }) => name === currentRoom)
    console.log('startingTimer!');
    return hasStarted 
    ? { ...prevState, startTimer: true }
    : null
  }

  handleNewLetters = (currentLetters) => {
    firebase
      .database()
      .ref(`rooms/${this.props.currentUser.currentRoom}`)
      .update({ currentLetters, hasStarted: true })
    
    setTimeout(() => {
      firebase
        .database()
        .ref(`rooms/${this.props.currentUser.currentRoom}`)
        .update({ hasStarted: false })
    }, 60000)
  }
  
  handleValidWord = (word) => {
    firebase
      .database()
      .ref(`rooms/${this.props.currentUser.currentRoom}/alreadyPlayed`)
      .push(word)
  }
  render = () => {
    console.log('propsgameroom: ', this.props)
    const currentRoom = this.props.currentUser.currentRoom;
    const currentRoomObj = this.props.state.data.rooms.find(({ name }) => name === currentRoom)
    const { currentLetters } = currentRoomObj;
    console.log('currenRoomObj: ', currentRoomObj);
    return (
      <div>
        <h1>GameRoom!</h1>
        
        {
          this.props.currentUser.isAdmin &&
          <h3>Admin View</h3>
        }

        <h2>Room Name: { this.props.currentUser.currentRoom }</h2>
        
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
        {
          this.state.startTimer
            ? <Countdown
              date={Date.now() + 60000}
              intervalDelay={0}
              precision={3}
              renderer={props => <div>{(props.total / 1000).toFixed(2)}</div>}
            // controlled={true}
            // getTimeDifference={() => <div>{props.total}</div>}

            />
            : <div>60.00</div>
        }
        
       
      
        {/* <Timer startTimer={this.state.startTimer} /> */}
        <LetterGenerator 
          admin={this.props.currentUser.isAdmin}
          alreadyPlayed={currentRoomObj.alreadyPlayed}
          handleNewLetters={this.handleNewLetters}
          currentLetters={currentLetters}
          handleValidWord={this.handleValidWord}
        />
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
