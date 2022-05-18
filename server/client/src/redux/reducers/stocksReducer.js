import { initState } from '../initState';

export const stocksReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_QUOTES':
      return [ ...state, payload ];
    default:
      return state;
  }
}
