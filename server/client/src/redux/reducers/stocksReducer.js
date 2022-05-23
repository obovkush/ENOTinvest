import { initState } from '../initState';

export const stocksReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_STOCKS':
      return payload;
    // case 'HISTORY_USD':
    //   return { ...state, historyUSD: payload.map((el, i) => { return { id: i, price: el.c, date: new Date(el.t).toLocaleDateString("sma-SE")}}) };
    case 'SET_STOCK':
      return [...state, payload];
    case 'REMOVE_STOCK':
      return state.filter((stock) => stock.id !== payload.id);
    default:
      return state;
  }
};
