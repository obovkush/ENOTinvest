import { initState } from '../initState';

export const wikipediaUrlReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_LINK_OF_WIKIPEDIA':
      return payload;
    default:
      return state;
  }
};
