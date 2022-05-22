import { combineReducers } from 'redux';
import { stocksReducer } from './stocksReducer';
import { userReducer } from './userReducer';
import { userInputsReducer } from './userInputsReducer';
import { youtubeReducer } from './youtubeReducer';
import { newsReducer } from './newsReducer';
import { allNewsReducer } from './allNewsReducer';
import { wikipediaUrlReducer } from './wikipediaUrlReducer'

export const rootReducer = combineReducers({
  stocks: stocksReducer,
  user: userReducer,
  userInputs: userInputsReducer,
  youtube: youtubeReducer,
  news: newsReducer,
  allNews: allNewsReducer,
  wikipediaUrl: wikipediaUrlReducer,
});
