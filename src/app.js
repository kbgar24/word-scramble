import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LetterGenerator from './components/letterGenerator.jsx';
// import Authentication from './components/authentication.jsx';
import Authentication from './containers/authenticationContainer';
import GameRoom from './components/gameRoom.jsx';
import fire from './config/fire';
import firebase from 'firebase'
import { Provider, connect } from 'react-redux';
import store from './store';
import { fetchData } from './actions/fetchActions';
import { createNewRoom } from './actions/roomActions';
import { updateUserRoom } from './actions/userActions';


const config = {
  apiKey: "AIzaSyAKUjZ8dATJT0QNZqKWhVqTG9-bLT1JXa4",
  authDomain: "word-scramble-bb2ad.firebaseapp.com",
  databaseURL: "https://word-scramble-bb2ad.firebaseio.com",
  projectId: "word-scramble-bb2ad",
  storageBucket: "word-scramble-bb2ad.appspot.com",
  messagingSenderId: "434068260131"
};

class App extends Component {
  
  constructor(){
    super();

    // this.database = fire.database().ref().child('users');
    this.state = {
      currentUsers: [],
      newRoom: '',
      currentUser: {},
    }
  }

  componentDidMount(){
    // console.log('this.props: ', this.props);
    this.props.fetchData();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { users, currentUser = {} } = nextProps;
    // console.log('nextProps: ', nextProps);
    const currentUsers = users 
    ? Object.keys(users)
      .filter(id => users[id].isLoggedIn)
      .map(id => { 
        console.log('users[id]: ', users[id])
        return ({
        id,
        // ...users[id],
      })
      })
    : [];

    // console.log('this: ', this);
    return ({
      ...prevState,
      currentUsers, currentUser 
    });
  }

  newRoomChange = ({target: { value:newRoom }}) => {
    this.setState({ newRoom })
  }


  handleUserLoginChange = (currentUser) => {
    this.setState({ currentUser })
  }

  handleCreateNewRoom= (e) => {
    e.preventDefault();
    // const { id } = this.props.users.currentUser;
    
    this.props.createNewRoom(this.state.newRoom, this.props.state.user.currentUser.id)
    this.setState({ newRoom : '' })
    //render new room
    // update current room for user in db
    // 
  }

  // handleLeaveRoom = () => {
  //   const { id } = this.props.state.user.currentUser;
  //   firebase.database().ref(`users/${id}`).update({
  //     currentRoom: 'Lobby',
  //   })
  // }

  handleJoinRoom = ({ target: {  name } }) => {
    const { id } = this.props.state.user.currentUser;
    firebase.database().ref(`users/${id}`).update({
      currentRoom: name,
    })
    this.props.updateUserRoom(name);
  }

  render(){
    console.log('Approps: ', this.props);
    return(
      <div>
        <h1>My App</h1>
        { this.state.currentUser && (
          <h2>Current User Id: { this.state.currentUser.name }</h2>
        )
        }
      
        {this.state.user ? <LetterGenerator /> : <Authentication handleUserLoginChange={this.handleUserLoginChange} /> }

        {/* <BrowserRouter>
          <Switch>
            <Route path='/' component={ MainPage } exact={ true } ></Route>
            <Route path='/two' component={ PageTwo }></Route>
            <Route component={ NotFoundPage }></Route>
          </Switch>
        </BrowserRouter> */}
        <h2>Logged in Users</h2>
          <ul>
            {
              this.props.state.data.users.map(({name, id, currentRoom}) => <li key={id}>{`${name} - ${currentRoom}`}</li>)
            }
          </ul>

        <h2>Current Rooms</h2>
        <ul>
          {
            this.props.state.data.rooms
            .filter(({name}) => name !== 'Lobby' && name !== this.props.state.user.currentUser.currentRoom )
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
          <input type='text' value={this.state.newRoom} onChange={this.newRoomChange}/>
          <input type='submit' value='Create New Room'/>
        </form>
        { this.state.currentUser 
          && this.state.currentUser.currentRoom
          && this.state.currentUser.currentRoom !== 'Lobby'
          && <GameRoom currentUser={this.state.currentUser} handleLeaveRoom={this.handleLeaveRoom}/> }
      </div>
    )
  }
}


const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  createNewRoom,
  updateUserRoom: roomName => dispatch(updateUserRoom(roomName)),

});


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />  
  </Provider>,
  document.getElementById('app'));
