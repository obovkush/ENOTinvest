import { initState } from '../initState';

export const historyReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_HISTORY':
      return [...state, ...payload];
    case 'REMOVE_HISTORY':
      return payload;
    default:
      return state;
  }
};
