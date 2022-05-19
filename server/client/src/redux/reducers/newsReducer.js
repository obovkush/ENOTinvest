import { initState } from '../initState';

export const newsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_NEWS':
      return payload;
    default:
      return state;
  }
};
