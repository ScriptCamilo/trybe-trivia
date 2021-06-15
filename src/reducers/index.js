import { combineReducers } from 'redux';
import getToken from './tokenReducer';

const rootReducer = combineReducers({
  settings: getToken,
});

export default rootReducer;
