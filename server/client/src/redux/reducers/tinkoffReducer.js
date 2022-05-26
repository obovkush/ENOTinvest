import { initState } from '../initState';

export const tinkoffReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_SHARE':
      return [...state, payload];
    case 'ADD_PROFILE':
      return [...state, payload];
    case 'ADD_ETFS':
      return [...state, payload];
    case 'REMOVE_PROFILE':
      return state.filter((stock) => stock.id !== payload.id);
    default:
      return state;
  }
};
