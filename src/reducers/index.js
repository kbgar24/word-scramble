import { combineReducers } from "redux";

import data from './fetchReducer';
import user from './userReducer';

export default combineReducers({
  data,
  user,
})