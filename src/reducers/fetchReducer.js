const defaultState = {
  currentUser: {},
  users: {},
  gameRooms: {},
  currentGame: {},
}

export default ( state = defaultState, { type, payload }) => {
  switch (type) {
    case 'FETCH_DATA':
      console.log('lol')
      const userId = state.currentUser.id;
      const gameId = state.currentGame;
      // const currentUser = payload.users && payload.users[userId] || {};
      // const currentGame = payload.gameRooms && payload.gameRooms[gameId] || {};

      return {
        ...state,
        ...payload,
        // currentUser,
        // currentGame,
      }

    default: 
      return state;
  }
}