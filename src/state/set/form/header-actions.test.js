import * as actions from './header-actions';

describe('File header set actions', () => {
  it('should dispatch an action to set the header', () => {
    const header = ['column1', 'column2'];
    const expectedAction = {
      header,
      type: actions.SET_FILE_HEADER,
    };
    expect(actions.setFileHeader(header)).toEqual(expectedAction);
  });

  it('should dispatch an action to clear the header', () => {
    const expectedAction = {
      type: actions.CLEAR_FILE_HEADER,
    };
    expect(actions.clearFileHeader()).toEqual(expectedAction);
  });
});
