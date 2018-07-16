import * as actions from './search-actions';

describe('Visualization search set actions', () => {
  it('should dispatch an action to reset search state', () => {
    const expectedAction = {
      type: actions.CLEAR_SEARCH,
    };
    expect(actions.clearSearch()).toEqual(expectedAction);
  });

  it('should dispatch an action to set search term', () => {
    const expectedAction = {
      term: 'test',
      type: actions.SET_SEARCH_TERM,
    };
    expect(actions.setSearchTerm('test')).toEqual(expectedAction);
  });
});
