import { initState } from '../initState';

export const companyInfoReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CURRENT_COMPANY_INFO':
      return payload;
    default:
      return state;
  }
};
