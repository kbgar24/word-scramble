export default ( state = {}, {type, payload} ) => {
  switch (type) {
    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        currentUser: payload,
      }

    case 'GET_USER':
      return payload;

    default: 
      return state;
  }
}
