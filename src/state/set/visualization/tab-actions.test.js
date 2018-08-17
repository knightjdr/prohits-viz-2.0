import * as actions from './tab-actions';

describe('Visualization tab set actions', () => {
  it('should add a tab', () => {
    const expectedAction = {
      tab: 'go',
      type: actions.ADD_TAB,
    };
    expect(actions.addTab('go')).toEqual(expectedAction);
  });

  it('should remove a tab', () => {
    const expectedAction = {
      tab: 'customize',
      type: actions.REMOVE_TAB,
    };
    expect(actions.removeTab('customize')).toEqual(expectedAction);
  });

  it('should set the active tab', () => {
    const expectedAction = {
      tab: 'customize',
      type: actions.SET_TAB,
    };
    expect(actions.setTab('customize')).toEqual(expectedAction);
  });
});
