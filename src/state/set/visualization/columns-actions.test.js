import * as actions from './columns-actions';

describe('Visualization colum set actions', () => {
  it('should dispatch an action to set the reference', () => {
    const expectedAction = {
      ref: 'a',
      type: actions.SET_REFERENCE,
    };
    expect(actions.setReference('a')).toEqual(expectedAction);
  });
});
