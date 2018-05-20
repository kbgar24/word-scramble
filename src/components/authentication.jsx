import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyAKUjZ8dATJT0QNZqKWhVqTG9-bLT1JXa4",
//   authDomain: "word-scramble-bb2ad.firebaseapp.com",
//   databaseURL: "https://word-scramble-bb2ad.firebaseio.com",
//   projectId: "word-scramble-bb2ad",
//   storageBucket: "word-scramble-bb2ad.appspot.com",
//   messagingSenderId: "434068260131"
// };

// // Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
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
    // this.props.authenticate()
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        console.log('user: ', user);
        let userId;
        if (user) {
          const currentUser = {
            name: user.displayName,
            isLoggedIn: true,
            currentRoom: 'Lobby',
            id: user.uid,
          }
          firebase.database().ref('users/' + user.uid).set(currentUser)
          userId = user.uid
        } else {
          userId = '';
        }
        
        this.props.updateCurrentUser(userId);
      }
    )
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleSignOut = () => {
    console.log('handleSignout called!');
    const { id } = this.props.currentUser;
    firebase.database().ref(`/users/${id}`).update({
      isLoggedIn: false,
    })
    firebase.auth().signOut()
    // this.props.signOutUser(id)
  }

  render = () => {
    console.log('authprops: ', this.props);
    if (!this.props.currentUser.name) {
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

        <p>Welcome {this.props.currentUser.name}! You are now signed-in!</p>
 
        <a onClick={this.handleSignOut}>Sign-out</a>
      </div>
    );
  }
};
