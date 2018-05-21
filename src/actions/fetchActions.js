import 'babel-polyfill';
// import fire from '../config/fire';
// import firebase from 'firebase'
import { database } from '../firebase';

// const database = fire.database().ref();

// firebase.database().ref().on('value', (snapshot) => snapshot.val()) })
// const database = firebase.database().ref();

// database.on('value', snapshot
// export const fetchData = () => async dispatch => (
//   database.on('value', snapshot => {
//     dispatch({
//       type: 'FETCH_DATA',
//       paload: snapshot.val(),
//     })
//   })
// );
// export const fetchData = () => {
//   console.log('fetch data called!')
//   return ({
//     type: 'FETCH_DATA',
//     payload: 'lol',
//   })

// }
// export const fetchData = () => dispatch => (
//   database.on('value', snapshot => {
//     dispatch({
//       type: 'FETCH_DATA',
//       payload: snapshot.val(),
//     })
//   })
// );

export function getAllData() {
  return dispatch => {
    dispatch({
      type: 'FETCH_STATUS',
      payload: true
    });
    database.on('value', snapshot => {
      dispatch({
        type: 'FETCH_STATUS',
        payload: false
      });
      dispatch({
        type: 'FETCH_ALL_DATA',
        payload: snapshot.val()
      });
    }, () => {
      dispatch({
        type: 'FETCH_STATUS',
        payload: -1
      })
    });
  };
}

// export function savePost(post, uid) {
//   return dispatch => database.push({ ...post, uid });
// }

// export function deletePost(id) {
//   return dispatch => database.child(id).remove();
// }