import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header } from 'semantic-ui-react';

import LetterGenerator from '../components/letterGenerator.jsx';
import GameRoom from '../containers/gameRoomContainer';
import Lobby from './lobby';
import { mapObjToArray } from '../helpers';


export default class Main extends Component {

  state = {
    newRoom: '',
    currentUser: {},
    invites: [],
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { pathname } = nextProps.location;
    const roomId = pathname.slice(10);
    const currentUserId = nextProps.state.user.currentUser;
    const currentUser = currentUserId
      ? nextProps.state.data.users.find(({ id }) => currentUserId === id)
      : {}

    const occupiedRoomData = nextProps.state.data.users.reduce((tv, {currentRoom, isAdmin, name }) => {
      if (currentRoom === 'Lobby'){
        return tv;
      }
      tv[currentRoom] 
      ? tv[currentRoom]++ 
      : tv[currentRoom] = { count:  1};
      isAdmin && (tv[currentRoom].admin = name);
      return tv;
    }, {});
    
    let newRoom;
    let invites;

    if (roomId) {
      newRoom = nextProps.state.data.rooms.find(({id}) => id === roomId);
    }
    
    /*  Handles invite urls */
    if (newRoom) {
      firebase.database().ref(`users/${currentUserId}`).update({
        currentRoom: newRoom.name,
        isAdmin: false,
      })
    }

    if (currentUser){
      invites = currentUser.invites
        ? mapObjToArray(currentUser.invites)
        : []
    } else {
      invites = []
    }

    return ({
      ...prevState,
      currentUser,
      invites,
      occupiedRoomData,
    });
  }

  /* Force focus on main input field */
  componentDidUpdate(){
    this.nameInput && this.nameInput.focus();
  }

  newRoomChange = ({ target: { value: newRoom } }) => {
    this.setState({ newRoom })
  }

  handleUserLoginChange = currentUser => { this.setState({ currentUser }) }

  handleCreateNewRoom = (e) => {
    e.preventDefault();
    const { newRoom } = this.state;
    if (newRoom) {
      const roomId = uuid();
      this.props.createNewRoom(this.state.newRoom, this.props.state.user.currentUser, roomId)
      this.setState({ newRoom: '' })
    }
  }

  handleLeaveRoom = admin => {
    const { id, currentRoom: currentUserRoom } = this.state.currentUser;
    
    /* If Admin leaves gameroom, destroy that gameroom && send Admin the Lobby */
    if (admin) {
      this.props.state.data.users
        .filter(({ currentRoom }) => currentRoom === currentUserRoom)
        .map(({ id }) => id)
        .forEach(id => {
          firebase.database().ref(`users/${id}`).update({
            currentRoom: 'Lobby',
            isAdmin: false,
          })
        })
      firebase.database().ref(`rooms/${currentUserRoom}`).remove();

    /* Otherwise just send user to Lobby */
    } else {
      firebase.database().ref(`users/${id}`).update({
        currentRoom: 'Lobby',
      })
    }
    /* Handle url invites */
    this.props.history.replace('/');
  }


  handleJoinRoom = name => () => {
    const id = this.props.state.user.currentUser;
    firebase.database().ref(`users/${id}`).update({
      currentRoom: name,
    })
    this.props.joinUserRoom(name);
  }

  handleInviteDecline = senderName => () => {
    const{ invites, id } = this.state.currentUser;
    const toDelete = Object.keys(invites).find(key => invites[key].senderName === senderName);
    firebase.database().ref(`users/${id}/invites/${toDelete}`).remove();
  }

  render = () => (
    <div >
        { this.state.currentUser ?  (
          <Menu inverted id='topMenu' >
            <Menu.Item  >
            <span>Current Room |</span><span style={{ width: '10px' }}></span><strong> {`  ${this.state.currentUser.currentRoom}`}</strong>
            </Menu.Item>
            <Menu.Item position='right'>
              {this.state.currentUser.name}
            </Menu.Item>
          </Menu>
          )
          : <Menu inverted></Menu>
        }


      <h1 className='pageTitle'>WordScramble</h1>
    
    { 
      this.state.currentUser 
      && this.state.currentUser.currentRoom === 'Lobby' 
      && (
        <Lobby 
          handleCreateNewRoom ={this.handleCreateNewRoom}
          newRoom={this.state.newRoom}
          newRoomChange={this.newRoomChange}
          invites={this.state.invites}
          handleJoinRoom={this.handleJoinRoom}
          handleInviteDecline={this.handleInviteDecline}
          users={this.props.state.data.users}
          occupiedRoomData={this.state.occupiedRoomData}
        />
      )
    }

    { 
      this.state.currentUser 
      && this.state.currentUser.currentRoom !== 'Lobby' 
      && (
        <GameRoom 
          currentUser={this.state.currentUser}
          handleLeaveRoom={this.handleLeaveRoom}
        />
      ) 
    }

    <footer>
      <div>
        <h1>Kendrick Gardner</h1>
        <div></div>
        <p>Application Author</p>
      </div>
    </footer>
  </div>
  )
}
