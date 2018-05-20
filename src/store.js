import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
// import fetchReducer from './reducers/fetchReducer';

// const store = {
  
//   currentUser: {
//     id:
//     name:
//     currentRoom:
//     isAdmin:
//   }
  
//   users: {
//     id: {
//       name, 
//       isLoggedIn:
//       currentRoom: 
//       isLoggedIn,
//       isAdmin
//     }
//   }

//   gameRooms: {
//    :roomid : 'Bathroom',
//    : roomid : 'Tanya' 
//   }

//   currentGame: {
//     roomID: 
//     users: 
//     currentLetters: 
//     playedWords: 
//     hasStarted:
//     isOver: 
//     admin: 
//   }


  
// //

//   db:/
//   rooms: {
//     :garageid : {
//       adming: uid
//       name: 
//       users: {
//         kendrick { score: 0, isAdmin: true },
//         kendrickTest { score: 0, isAdmin: false },
//       },
//       currentLetters: 'abcdefghij'
//       playedWords: {
//         0: 'tom',
//         1: 'bob',
//         2: 'jerry',
//       }
//       hasStarted: false,
//         canJoin: true
//       isOver: false
//     }
//   }


export default createStore(
  reducers,
  // fetchReducer,
  applyMiddleware(
    thunk,
    createLogger(),
  )
);