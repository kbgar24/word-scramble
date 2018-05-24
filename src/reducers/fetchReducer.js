const defaultState = {
  users: [],
  rooms: [],
}

export default ( state = defaultState, { type, payload }) => {
  switch (type) {
    case 'FETCH_DATA':
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