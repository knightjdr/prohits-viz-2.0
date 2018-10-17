import task, { defaultState } from './task-reducer';
import * as actions from './task-actions';

describe('Task set reducer', () => {
  it('should return initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(task(undefined, action)).toEqual(expectedState);
  });

  it('should handle ADD_TASK action', () => {
    const action = {
      id: 'task1',
      type: actions.ADD_TASK,
    };
    const expectedState = {
      ...defaultState,
      list: ['task1'],
    };
    expect(task(undefined, action)).toEqual(expectedState);
  });

  it('should handle SHOULD_UPDATE_TASKS action', () => {
    const action = {
      type: actions.SHOULD_UPDATE_TASKS,
    };
    const expectedState = {
      ...defaultState,
      shouldUpdate: true,
    };
    expect(task(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ERROR action', () => {
    const action = {
      type: actions.UPDATE_ERROR,
    };
    const expectedState = {
      ...defaultState,
      didError: true,
      isUpdating: false,
    };
    expect(task(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_STATUS action', () => {
    const action = {
      list: ['task1', 'task2'],
      status: [
        { id: 'task1', status: 'running' },
        { id: 'task2', status: 'complete' },
      ],
      type: actions.UPDATE_STATUS,
    };
    const expectedState = {
      didError: false,
      isUpdating: false,
      shouldUpdate: false,
      list: action.list,
      status: action.status,
    };
    expect(task(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATING_TASK_STATUS action', () => {
    const action = {
      type: actions.UPDATING_TASK_STATUS,
    };
    const expectedState = {
      ...defaultState,
      didError: false,
      isUpdating: true,
      shouldUpdate: false,
    };
    expect(task(undefined, action)).toEqual(expectedState);
  });
});
