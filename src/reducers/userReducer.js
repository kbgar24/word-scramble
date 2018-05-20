const defaultState = {
  currentUser: '',
}

export default ( state = defaultState, {type, payload} ) => {
  switch (type) {
    case 'UPDATE_CURRENT_USER':
    console.log('STATE: ', state);
      return {
        ...state,
        currentUser: payload,
      }
    // case 'JOIN_USER_ROOM':
    //   console.log('STATE!!!:  ', state)
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       currentRoom: payload,
    //     }
    //   }

    // case 'CREATE_USER_ROOM':
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       currentRoom: payload.room,
    //       isAdmin: true,
    //     }
    //   }
    default: return state
  }
}
