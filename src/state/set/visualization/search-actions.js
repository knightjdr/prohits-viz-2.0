export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH',
});

export const setSearchTerm = term => ({
  term,
  type: 'SET_SEARCH_TERM',
});
