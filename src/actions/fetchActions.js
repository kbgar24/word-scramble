import { database } from '../firebase';
import { mapObjToArray } from '../helpers';

export const fetchAllData = () => dispatch => (
  database.ref().on('value', snapshot => {
    const { rooms = {}, users = {} } = snapshot.val();
    const userArray = mapObjToArray(users);

    /* Filter out rooms that were improperly closed */
    const roomsToRemove = Object.keys(rooms)
      .filter((roomName) => (
        !userArray.some(({ currentRoom }) => currentRoom === roomName)
      ))
    roomsToRemove.forEach(roomName => {
      database.ref(`/rooms/${roomName}`).remove()
    })

    dispatch({
      type: 'FETCH_DATA',
      payload: snapshot.val(),
    })
  })
)

