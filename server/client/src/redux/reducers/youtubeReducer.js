import { initState } from '../initState';

export const youtubeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_YOUTUBE_VIDEO':
      return payload;
    default:
      return state;
  }
};
