import { Action } from "rxjs/scheduler/Action";

const defaultState = {
  users: [],
  rooms: [],
  currentGame: {},
}

export default ( state = defaultState, { type, payload }) => {
  switch (type) {
    case 'FETCH_DATA':
      // const userId = state.currentUser.id;
      // const gameId = state.currentGame;
      // const currentUser = payload.users && payload.users[userId] || {};
      // const currentGame = payload.gameRooms && payload.gameRooms[gameId] || {};
      const {users:allUsers = {}, rooms:roomObj = {}} = payload;
      const userKeys = Object.keys(allUsers);
      const roomKeys = Object.keys(roomObj);
      const users = userKeys.length 
        ? userKeys
          .filter(id => allUsers[id].isLoggedIn)
          .map(id => allUsers[id])
        : []

      const rooms = roomKeys.length
        ? roomKeys.map(name => ({ ...roomObj[name], name}))
        : []

      return {
        ...state,
        users,
        rooms,
      }

    case 'FETCH_ROOM_DATA':
      return payload;

    default: 
      return state;
  }
}