import React, { Component } from 'react';


export default class GameRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render = () => {
    console.log('propsgameroom: ', this.props)
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

        <button name='Lobby' onClick={() => {this.props.handleLeaveRoom(this.props.currentUser.isAdmin)}}>Leave Room</button>
        
      </div>
    )
  };
};
