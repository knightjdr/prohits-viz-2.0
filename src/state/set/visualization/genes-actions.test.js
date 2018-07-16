import * as actions from './genes-actions';

describe('Visualization gene selections set actions', () => {
  it('should dispatch an action to set selections', () => {
    const expectedAction = {
      columns: [],
      rows: [],
      type: actions.SET_SELECTIONS,
    };
    expect(actions.setSelections([], [])).toEqual(expectedAction);
  });

  it('should dispatch an action to store selections', () => {
    const expectedAction = {
      selections: {},
      type: actions.STORE_SELECTIONS,
    };
    expect(actions.storeSelections({})).toEqual(expectedAction);
  });
});
