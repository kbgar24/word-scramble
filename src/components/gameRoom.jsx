import React, { Component } from 'react';


export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render = () => {
    return (
      <div>
        <h1>GameRoom!</h1>
        <h2>Room Name: { this.props.currentUser.currentRoom }</h2>
        <button name='Lobby' onClick={this.props.handleJoinRoom}>Leave Room</button>
      </div>
    )
  };
};
