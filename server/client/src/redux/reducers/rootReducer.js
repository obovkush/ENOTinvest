import { combineReducers } from 'redux';
import { stocksReducer } from './stocksReducer';
import { userReducer } from './userReducer';
import { userInputsReducer } from './userInputsReducer';
import { youtubeReducer } from './youtubeReducer';
import { newsReducer } from './newsReducer';
import { allNewsReducer } from './allNewsReducer';
import { wikipediaUrlReducer } from './wikipediaUrlReducer';
import { historyReducer } from './historyReducer';
import { companyNewsReducer } from './companyNewsReducer';
import { companyInfoReducer } from './companyInfoReducer'

export const rootReducer = combineReducers({
  history: historyReducer,
  stocks: stocksReducer,
  user: userReducer,
  userInputs: userInputsReducer,
  youtube: youtubeReducer,
  news: newsReducer,
  allNews: allNewsReducer,
  companyNews: companyNewsReducer,
  wikipediaUrl: wikipediaUrlReducer,
  companyInfo: companyInfoReducer,
});
