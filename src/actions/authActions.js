import firebase from 'firebase';
import { updateCurrentUser } from './userActions';

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


export const authenticate = () => () => {
  console.log('authenticate called!');
  firebase.auth().onAuthStateChanged(user => {
    let currentUser;
    if (user) {
      currentUser = {
        name: user.displayName,
        isLoggedIn: true,
        currentRoom: 'Lobby',
        id: user.uid,
      }
      firebase.database().ref('users/' + user.uid).set(currentUser)
    } else {
      currentUser = {};
    }
    // dispatch(updateCurrentUser(currentUser));
  })
}

export const signOut = id => dispatch => {
  firebase.database().ref(`/users/${id}`).set({
    isLoggedIn: false,
  })
  firebase.auth().signOut();
  dispatch(updateCurrentUser({}))
}