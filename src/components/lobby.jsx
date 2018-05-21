import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LetterGenerator from '../components/letterGenerator.jsx';
// import Authentication from './components/authentication.jsx';
// import Authentication from '../containers/authenticationContainer';
import GameRoom from '../containers/gameRoomContainer';
import fire from '../config/fire';
import firebase from 'firebase'
import { fetchAllData } from '../actions/fetchActions';
import { createNewRoom } from '../actions/roomActions';
import { joinUserRoom } from '../actions/userActions';
import uuid from 'uuid';


const config = {
  apiKey: "AIzaSyAKUjZ8dATJT0QNZqKWhVqTG9-bLT1JXa4",
  authDomain: "word-scramble-bb2ad.firebaseapp.com",
  databaseURL: "https://word-scramble-bb2ad.firebaseio.com",
  projectId: "word-scramble-bb2ad",
  storageBucket: "word-scramble-bb2ad.appspot.com",
  messagingSenderId: "434068260131"
};

export default class Lobby extends Component {

  constructor() {
    super();

    // this.database = fire.database().ref().child('users');
    this.state = {
      newRoom: '',
      currentUser: {},
    }
  }

  componentDidMount() {
    // console.log('this.props: ', this.props);
    // this.props.fetchData();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    // const { currentUserId = '' } = nextProps;
    const { pathname } = nextProps.location;
    const roomId = pathname.slice(10);
    console.log('roomID: ', roomId)
    let newRoom;
    
    if (roomId) {
      newRoom = nextProps.state.data.rooms.find(({id}) => id === roomId);
    }
    
    const currentUserId = nextProps.state.user.currentUser;
    
    if (newRoom) {
      firebase.database().ref(`users/${currentUserId}`).update({
        currentRoom: newRoom.name,
        isAdmin: false,
      })
    }

    const currentUser = currentUserId
      ? nextProps.state.data.users.find(({ id }) => currentUserId === id)
      : {}
    // console.log('nextProps: ', nextProps);
    // const currentUsers = users 
    // ? Object.keys(users)
    //   .filter(id => users[id].isLoggedIn)
    //   .map(id => { 
    //     console.log('users[id]: ', users[id])
    //     return ({
    //     id,
    //     // ...users[id],
    //   })
    //   })
    // : [];

    // console.log('this: ', this);
    console.log('CURRENTUSER!!: ', currentUser);
    return ({
      ...prevState,
      currentUser,
    });
  }

  newRoomChange = ({ target: { value: newRoom } }) => {
    this.setState({ newRoom })
  }


  handleUserLoginChange = (currentUser) => {
    this.setState({ currentUser })
  }

  handleCreateNewRoom = (e) => {
    e.preventDefault();
    const { newRoom } = this.state;
    if (newRoom) {
      const roomId = uuid();
      this.props.createNewRoom(this.state.newRoom, this.props.state.user.currentUser, roomId)
      this.setState({ newRoom: '' })
      // this.props.history.push('/gameRoom/roomId');
    }
  }

  handleLeaveRoom = (admin) => {
    const { id, currentRoom: currentUserRoom } = this.state.currentUser;
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
    } else {
      firebase.database().ref(`users/${id}`).update({
        currentRoom: 'Lobby',
      })
    }
    this.props.history.replace('/');
  }


  handleJoinRoom = ({ target: { name } }) => {
    console.log('handleJoinRoom called: ')
    const id = this.props.state.user.currentUser;
    firebase.database().ref(`users/${id}`).update({
      currentRoom: name,
    })
    this.props.joinUserRoom(name);
  }

  render() {
    console.log('Apstate: ', this.state);

    console.log('Approps: ', this.props);
    return (
      <div>
      { this.state.currentUser && this.state.currentUser.currentRoom === 'Lobby' && (
        <div>
          <h1>LOBBY</h1>
          {
            this.state.currentUser && <h2>Current User Id: {this.state.currentUser.name}</h2>
          }
          {/* { <LetterGenerator />} */}

          <h2>Logged in Users</h2>
          <ul>
            {
              this.props.state.data.users.map(({ name, id, currentRoom }) => <li key={id}>{`${name} - ${currentRoom}`}</li>)
            }
          </ul>
          <h2>Current Rooms</h2>
          <ul>
            {
              this.props.state.data.rooms
                .filter(({ name }) => name !== 'Lobby' && name !== this.props.state.user.currentUser.currentRoom)
                .map(({ name }) => (
                  <li key={name}>
                    {`${name}`}
                    {
                      this.props.state.user.currentUser.currentRoom !== name
                        ? <button name={name} onClick={this.handleJoinRoom}>Join</button>
                        : <button name='Lobby' onClick={this.handleJoinRoom}>Leave</button>
                    }
                  </li>)
                )
            }
          </ul>
          }
          <form onSubmit={this.handleCreateNewRoom}>
            <input type='text' value={this.state.newRoom} onChange={this.newRoomChange} />
            <input type='submit' value='Create New Room' />
          </form>
          {/* {this.state.currentUser
            && this.state.currentUser.currentRoom
            && this.state.currentUser.currentRoom !== 'Lobby'
            && <GameRoom currentUser={this.state.currentUser} handleLeaveRoom={this.handleLeaveRoom} />} */}
        </div>
      )}

      { 
        this.state.currentUser && this.state.currentUser.currentRoom !== 'Lobby' && (

        <GameRoom currentUser={this.state.currentUser} handleLeaveRoom={this.handleLeaveRoom}/>
        ) 
      }
    </div>
    )
  }
}
