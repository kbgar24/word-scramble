import firebase from 'firebase';
import { auth, googleProvider, twitterProvider } from '../firebase';

export const getUser = () => {
  return dispatch => {
    dispatch({
      type: 'USER_STATUS',
      payload: true
    });
    auth.onAuthStateChanged(({uid}) => {
      dispatch({
        type: 'GET_USER',
        payload: uid
      });
      dispatch({
        type: 'USER_STATUS',
        payload: false
      });
    });
  };
}


export const logout = () => {
  return dispatch => auth.signOut();
}

export function googleLogin() {
  return dispatch => auth.signInWithPopup(googleProvider);
}


export const updateCurrentUser = userId => ({
  type: 'UPDATE_CURRENT_USER',
  payload: userId,
})

export const joinUserRoom = roomName => ({
  type: 'JOIN_USER_ROOM',
  payload: roomName,
})
  
export const leaveUserRoom = roomName => {
  return ({
    type: 'LEAVE_USER_ROOM',
    payload: roomName,
  })
}

// see if room exists 


    // if yes update
    // if no, create
  // firebase.database().ref(`rooms`).on('value').then(snapshop => {
  //   console.log('room snapshot: ', snapshop);
  // })  

  // firebase.database().ref(`users/${id}`).update({
  //   currentRoom: roomName,
  // })

  // firebase.database().ref(`users/${id}`).update({
  //   currentRoom: roomName,
  // })