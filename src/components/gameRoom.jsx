import React, { Component } from 'react';

import LetterGenerator from './letterGenerator.jsx';

export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleNewLetters = (currentLetters) => {
    firebase
      .database()
      .ref(`rooms/${this.props.currentUser.currentRoom}`)
      .update({ currentLetters })
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

        <LetterGenerator 
          admin={this.props.currentUser.isAdmin}
          alreadyPlayed={currentRoomObj.alreadyPlayed}
          handleNewLetters={this.handleNewLetters}
          currentLetters={currentLetters}
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
