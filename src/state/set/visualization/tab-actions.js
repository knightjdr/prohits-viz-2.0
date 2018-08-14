export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_TAB = 'SET_TAB';

export const removeTab = tab => ({
  tab,
  type: REMOVE_TAB,
});

export const setTab = tab => ({
  tab,
  type: SET_TAB,
});
