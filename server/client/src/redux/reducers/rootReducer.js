import { combineReducers } from 'redux';
import { actionsReducer } from './actionsReducer';
import { userReducer } from './userReducer';
import { userInputsReducer } from './userInputsReducer';
import { stocksReducer } from './stocksReducer';
import { youtubeReducer } from './youtubeReducer';
import { newsReducer } from './newsReducer';
import { allNewsReducer } from './allNewsReducer';

export const rootReducer = combineReducers({
  actions: actionsReducer,
  user: userReducer,
  userInputs: userInputsReducer,
  stocks: stocksReducer,
  youtube: youtubeReducer,
  news: newsReducer,
  allNews: allNewsReducer,
});
