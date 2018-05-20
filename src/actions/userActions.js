import firebase from 'firebase';

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