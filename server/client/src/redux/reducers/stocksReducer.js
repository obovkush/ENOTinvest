import { initState } from '../initState';

export const stocksReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_STOCKS':
      return payload;
    case 'SET_STOCK':
      return [...state, payload];
    case 'REMOVE_STOCK':
      return state.filter((stock) => stock.id !== payload.id);
    default:
      return state;
  }
};
