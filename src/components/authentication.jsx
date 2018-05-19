import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAKUjZ8dATJT0QNZqKWhVqTG9-bLT1JXa4",
  authDomain: "word-scramble-bb2ad.firebaseapp.com",
  databaseURL: "https://word-scramble-bb2ad.firebaseio.com",
  projectId: "word-scramble-bb2ad",
  storageBucket: "word-scramble-bb2ad.appspot.com",
  messagingSenderId: "434068260131"
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};

export default class Authentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      currentUser: {},
      currentUsers: [],
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        console.log('user: ', user);
        if (user) {
          firebase.database().ref('users/' + user.uid).set({
            name: user.displayName,
            isLoggedIn: true,
            currentRoom: 'Lobby',
            id: user.uid,
          })
          this.setState({ currentUser: { id: user.uid, name: user.displayName }})
        }
        this.setState({ isSignedIn: !!user })
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleSignOut = () => {
    const { id } = this.state.currentUser;
    firebase.database().ref(`/users/${id}`).set({
      isLoggedIn: false,
    })
    firebase.auth().signOut()
  }

  render = () => {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <h2>Current User Id: {this.state.currentUser.id}</h2>
        <h2>Current User Id: {this.state.currentUser.name}</h2>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <h2>Logged in Users</h2>
        <ul>
          { 
            this.state.currentUsers.map( user => <li>user.name</li> ) 
          }
        </ul>
        <a onClick={this.handleSignOut}>Sign-out</a>
      </div>
    );
  }
};
