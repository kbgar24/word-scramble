import uuid from 'uuid';
import { database } from '../firebase';

export const createNewRoom = (room, userId, roomId) => {
  database.ref(`/rooms/${room}`).set({
    currentLetters: '',
    hasStarted: false,
    canJoin: true,
    isOver: false,
    startTime: false,
    showScoreboard: false,
    scoreBoard: false,
    id: roomId,
  })
  database.ref(`/users/${userId}`).update({
    currentRoom: room,
    isAdmin: true,
  })

};


export const removeRoom = roomName => dispatch => database.ref(`rooms/${roomName}`).remove();

export const updateRoomInfo = (roomName, info) => dispatch => {
  console.log('roomName: ', roomName)
  console.log('info: ', info)
  database.ref(`rooms/${roomName}`).update(info)
}
export const updateAlreadyPlayed = (roomName, word) => dispatch => (
  database.ref(`rooms/${roomName}/alreadyPlayed`).push(word)
)