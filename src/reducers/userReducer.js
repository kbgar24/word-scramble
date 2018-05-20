const defaultState = {
  currentUser: {},
}

export default ( state = defaultState, {type, payload} ) => {
  switch (type) {
    case 'UPDATE_CURRENT_USER':
    console.log('udpate!!!!')
    console.log('currentUser: ', payload);
      return {
        ...state,
        currentUser: payload,
      }
    case 'UPDATE_USERS':
      return {
        ...state,
        users: payload,
      }
    default: return state
  }
}
