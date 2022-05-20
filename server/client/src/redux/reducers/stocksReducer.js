import { initState } from '../initState';

export const stocksReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'STOCKS_EN':
      return payload;
    default:
      return state;
  }
}
