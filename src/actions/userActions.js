import firebase from 'firebase';

export const updateCurrentUser = user => ({
  type: 'UPDATE_CURRENT_USER',
  payload: user,
})

export const updateUserRoom = (userId, roomName) => ({
  type: 'UPDATE_USER_ROOM',
  payload: {
    userId, 
    roomName,
  }
})
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