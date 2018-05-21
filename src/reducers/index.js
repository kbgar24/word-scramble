import { combineReducers } from "redux";

import data from './fetchReducer';
import user from './userReducer';
import loading from './loadingReducer';


export default combineReducers({
  data,
  user,
  loading,
})