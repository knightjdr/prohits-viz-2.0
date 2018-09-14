import * as actions from './columns-actions';

describe('Customize column set actions', () => {
  it('should dispatch an action to SET_CUSTOMIZE_REFERENCE', () => {
    const expectedAction = {
      ref: 'ref',
      type: actions.SET_CUSTOMIZE_REFERENCE,
    };
    expect(actions.setReference('ref')).toEqual(expectedAction);
  });
});
