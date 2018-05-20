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
      const {users:allUsers, rooms:roomObj} = payload;
      const users = Object.keys(allUsers)
        .filter(id => allUsers[id].isLoggedIn)
        .map(id => allUsers[id]);
      const rooms = Object.keys(roomObj).map(name => ({ ...roomObj[name], name}));
      return {
        ...state,
        users,
        rooms,
      }

    default: 
      return state;
  }
}