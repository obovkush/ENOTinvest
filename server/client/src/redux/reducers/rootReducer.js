import { combineReducers } from 'redux';
import { stocksReducer } from './stocksReducer';
import { userReducer } from './userReducer';
import { userInputsReducer } from './userInputsReducer';
import { stocksReducer } from './stocksReducer';
import { youtubeReducer } from './youtubeReducer';
import { newsReducer } from './newsReducer';
import { allNewsReducer } from './allNewsReducer';

export const rootReducer = combineReducers({
  stocks: stocksReducer,
  user: userReducer,
  userInputs: userInputsReducer,
  stocks: stocksReducer,
  youtube: youtubeReducer,
  news: newsReducer,
  allNews: allNewsReducer,
});
