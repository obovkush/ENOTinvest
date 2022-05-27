import { initState } from '../initState';

export const favoriteReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_FAVORITE':
      return payload;
    case 'SET_FAVORITE':
      return [...state, payload];
    case 'REMOVE_FAVORITE':
      return state.filter((favorite) => favorite.secid !== payload);
    default:
      return state;
  }
};
