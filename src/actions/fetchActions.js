import { database } from '../firebase';

export const fetchAllData = () => dispatch => (
    // dispatch({
    //   type: 'FETCH_STATUS',
    //   payload: true
    // });
  database.ref().on('value', snapshot => (
      // dispatch({
      //   type: 'FETCH_STATUS',
      //   payload: false
      // });
    dispatch({
      type: 'FETCH_DATA',
      payload: snapshot.val()
    })
    // }, () => {
      // dispatch({
      //   type: 'FETCH_STATUS',
      //   payload: -1
      // })
  ))
    // });
)

