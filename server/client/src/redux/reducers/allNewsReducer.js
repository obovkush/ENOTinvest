import { initState } from '../initState';

export const allNewsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_NEWS_AND_YOUTUBE_TOGETHER':
      return payload;
    default:
      return state;
  }
};
