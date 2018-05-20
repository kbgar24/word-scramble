const defaultState = {
  users: [],
  gameRooms: {},
  currentGame: {},
}

export default ( state = defaultState, { type, payload }) => {
  switch (type) {
    case 'FETCH_DATA':
      console.log('lol')
      // const userId = state.currentUser.id;
      // const gameId = state.currentGame;
      // const currentUser = payload.users && payload.users[userId] || {};
      // const currentGame = payload.gameRooms && payload.gameRooms[gameId] || {};
      const allUsers = payload.users;
      const users = Object.keys(allUsers)
        .filter(id => allUsers[id].isLoggedIn)
        .map(id => allUsers[id]);
      console.log('loggedInUsers: : ', users);;
      console.log('payload: ', payload);
      return {
        ...state,
        users,
        // currentUser,
        // currentGame,
      }

    default: 
      return state;
  }
}