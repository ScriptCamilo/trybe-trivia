import { combineReducers } from 'redux';
import getToken from './tokenReducer';

const rootReducer = combineReducers({
  getToken,
});

export default rootReducer;
