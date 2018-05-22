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
import { mapObjToArray } from '../helpers';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header } from 'semantic-ui-react';

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
      invites: [],
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
    let invites;
    if (currentUser){
      invites = currentUser.invites
        ? mapObjToArray(currentUser.invites)
        : []
    } else {
      invites = []
    }
    // console.log('this: ', this);
    console.log('CURRENTUSER!!: ', currentUser);
    return ({
      ...prevState,
      currentUser,
      invites,
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

  handleInviteDecline = (senderName) => () => {
    const{ invites, id } = this.state.currentUser;
    const toDelete = Object.keys(invites).find(key => invites[key].senderName === senderName);
    firebase.database().ref(`users/${id}/invites/${toDelete}`).remove();
  }

  render() {
    console.log('Apstate: ', this.state);

    console.log('Approps: ', this.props);
    const activeItem = 'home';
    return (
      <div >
          { this.state.currentUser ?  (
            <Menu inverted>
              <Menu.Item name='messages'  >
                {this.state.currentUser.currentRoom}
              </Menu.Item>
              <Menu.Item name='messages' >
                {this.state.currentUser.name}
              </Menu.Item>
            </Menu>
            )
            : <Menu inverted></Menu>
         }



        <h1 className='pageTitle'>WordScramble</h1>
        {/* <div className='app-sidebar'> */}

        {/* </div> */}
     
      { this.state.currentUser && this.state.currentUser.currentRoom === 'Lobby' && (
        <div>
       
          {/* { <LetterGenerator />} */}

            <div>
              <input
                type='button'
                value='Create Game'
                className='create-btn' />
            </div>
            <div className='invites-list'>
          <h1>Current Game Invites</h1>

              <Table celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Sender</Table.HeaderCell>
                    <Table.HeaderCell>Room Name</Table.HeaderCell>
                    <Table.HeaderCell>Join</Table.HeaderCell>
                    
                    
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.invites.map(({ senderName, roomName, roomId }) => (
                    <Table.Row key={roomId}>
                      <Table.Cell>{senderName}</Table.Cell>
                      <Table.Cell>{roomName}</Table.Cell>
                      <Table.Cell>
                        <button><a href={`http://localhost:8080/gameroom/${roomId}`}>Accept</a></button>
                        <button onClick={this.handleInviteDecline(senderName)}>Decline</button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
       
            
            </div>

            <div className='logged-in-users-list'>

                  <h1>Online Users </h1>
              <Table celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Player Name</Table.HeaderCell>
                    <Table.HeaderCell>Current Room</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.state.data.users.map(({ name, id, currentRoom }) => (
                      <Table.Row key={id}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{currentRoom}</Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>

            </div>


            <div className='games-in-progress'>
          <h1>Games in Progress</h1>
      <Table celled inverted selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Room Name</Table.HeaderCell>
                      <Table.HeaderCell>Admin</Table.HeaderCell>
                      <Table.HeaderCell>Number of Players</Table.HeaderCell>
                      <Table.HeaderCell>Join</Table.HeaderCell>
                      
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    { this.props.state.data.rooms
                      .filter(({name}) => name !== 'Lobby' && name !== this.props.state.user.currentUser.currentRoom)
                      .map(({name}) => (
                        <Table.Row>
                          <Table.Cell>{name}</Table.Cell>
                          <Table.Cell>Kendrick</Table.Cell>
                          <Table.Cell >5</Table.Cell>
                          <Table.Cell ><button>Join</button></Table.Cell>
                        </Table.Row>
                    ))}
                  </Table.Body>
                </Table>


            </div>
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
}
