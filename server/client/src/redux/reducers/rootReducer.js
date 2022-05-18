import { combineReducers } from 'redux';
import { actionsReducer } from './actionsReducer';
import { userReducer } from './userReducer';
import { userInputsReducer } from './userInputsReducer';
import { stocksReducer } from './stocksReducer';

export const rootReducer = combineReducers({
  actions: actionsReducer,
  user: userReducer,
  userInputs: userInputsReducer,
  stocks: stocksReducer,
});
