import * as actions from './task-actions';

describe('Task action', () => {
  it('should dispatch an action to UPDATE_ERROR', () => {
    const expectedAction = {
      type: actions.UPDATE_ERROR,
    };
    expect(actions.updateError()).toEqual(expectedAction);
  });

  it('should dispatch an action to UPDATE_STATUS', () => {
    const expectedAction = {
      list: ['task1'],
      status: 'running',
      type: actions.UPDATE_STATUS,
    };
    expect(actions.updateStatus(['task1'], 'running')).toEqual(expectedAction);
  });

  it('should dispatch an action to UPDATING_TASK_STATUS', () => {
    const expectedAction = {
      type: actions.UPDATING_TASK_STATUS,
    };
    expect(actions.updatingTaskStatus()).toEqual(expectedAction);
  });
});
