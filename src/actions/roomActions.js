import 'babel-polyfill';
// import fire from '../config/fire';
import firebase from 'firebase'

import uuid from 'uuid';
// const database = fire.database().ref();

// firebase.database().ref().on('value', (snapshot) => snapshot.val()) })
const database = firebase.database().ref();

// database.on('value', snapshot
// export const fetchData = () => async dispatch => (
//   database.on('value', snapshot => {
//     dispatch({
//       type: 'FETCH_DATA',
//       paload: snapshot.val(),
//     })
//   })
// );
// export const fetchData = () => {
//   console.log('fetch data called!')
//   return ({
//     type: 'FETCH_DATA',
//     payload: 'lol',
//   })

// }

// roomName: {
//   currentLetters: 'abcdefghij'
//   playedWords: {
//     0: 'tom',
//       1: 'bob',
//         2: 'jerry',
//     }
//   hasStarted: false,
//     canJoin: true
//   isOver: false
// }

export const createNewRoom = (room, userId, roomId) => {
  console.log('createnewroomcalled');
  firebase.database().ref(`/rooms/${room}`).set({
    currentLetters: '',
    hasStarted: false,
    canJoin: true,
    isOver: false,
    startTime: false,
    showScoreboard: false,
    scoreBoard: false,
    id: roomId,
  })
  firebase.database().ref(`/users/${userId}`).update({
    currentRoom: room,
    isAdmin: true,
  })

};
