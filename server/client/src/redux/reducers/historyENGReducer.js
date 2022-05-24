import { initState } from '../initState';

export const historyUSDReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'HISTORY_USD':
      return { ...state, allHistory: payload.map((el, i) => { return { id: i, price: el.c, date: new Date(el.t).toLocaleDateString("sma-SE")}}) };
    default: 
      return state;
    }
}
