import { updateCurrentUser, setCurrentUser } from './userActions';
import { auth, database } from '../firebase';
import firebase from 'firebase';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};


export const signOut = id => dispatch => {
  database.ref(`/users/${id}`).set({
    isLoggedIn: false,
  })
  // auth.signOut();
  dispatch(updateCurrentUser({}))
}