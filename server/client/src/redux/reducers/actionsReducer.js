import { initState } from '../initState';

export const actionsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_ACTIONS':
      return payload;
    case 'SET_ACTION':
      return [...state, payload];
    case 'REMOVE_ACTION':
      return state.filter((action) => action.id !== payload.id);
    default:
      return state;
  }
};
