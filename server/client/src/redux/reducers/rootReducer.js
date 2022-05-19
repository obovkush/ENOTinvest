import { combineReducers } from 'redux';
import { actionsReducer } from './actionsReducer';
import { userReducer } from './userReducer';
import { userInputsReducer } from './userInputsReducer';
import { youtubeReducer } from './youtubeReducer';
import { newsReducer } from './newsReducer';

export const rootReducer = combineReducers({
  actions: actionsReducer,
  user: userReducer,
  userInputs: userInputsReducer,
  youtube: youtubeReducer,
  news: newsReducer,
});
