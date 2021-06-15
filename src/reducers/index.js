import { combineReducers } from 'redux';
import getToken from './tokenReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  settings: getToken,
  game: gameReducer,
});

export default rootReducer;
