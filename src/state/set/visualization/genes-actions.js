export const SET_SELECTIONS = 'SET_SELECTIONS';
export const STORE_SELECTIONS = 'STORE_SELECTIONS';

export const setSelections = (columns, rows) => ({
  columns,
  rows,
  type: SET_SELECTIONS,
});

export const storeSelections = selections => ({
  selections,
  type: STORE_SELECTIONS,
});
