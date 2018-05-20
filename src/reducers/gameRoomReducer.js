const defaultState = {
  gameRooms: {},
  currentGame: {},
}

const gameRoomReducer = ( state = { defaultState }, { type, payload } ) => {
  switch(type){
    case 'UPDATE_GAME_ROOMS':
      return {
        ...state,
        gameRooms: payload,
      }
    case 'UPDATE_CURRENT_GAME':
      return {
        ...state,
        currentGame: payload,
      }
  }
}