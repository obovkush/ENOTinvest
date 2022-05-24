import { initState } from '../initState';

export const companyNewsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'NEWS_OF_CURRENT_COMPANY':
      return payload;
    default:
      return state;
  }
};
