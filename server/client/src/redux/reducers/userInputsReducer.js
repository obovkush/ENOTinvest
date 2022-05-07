import { initState } from '../initState';

export const userInputsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'USERDATA_TYPING':
      return { ...state, ...payload };
    case 'USERDATA_CLEAR_INPUTS':
      return { ...payload };
    default:
      return state;
  }
};
