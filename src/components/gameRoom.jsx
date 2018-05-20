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
        <h2>Room Name: { this.props.currentUser.roomName }</h2>
        <button onClick={this.props.handleLeaveRoom}>Leave Room</button>
      </div>
    )
  };
};
