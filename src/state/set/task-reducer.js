import * as actions from './task-actions';

export const defaultState = {
  didError: false,
  isUpdating: false,
  list: [
    'test1',
    'test2',
    'test3',
    'test4',
  ],
  status: [],
};

const task = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ADD_TASK:
      return {
        ...state,
        list: [
          ...state.list,
          action.id,
        ],
      };
    case actions.UPDATE_ERROR:
      return {
        ...state,
        didError: true,
        isUpdating: false,
      };
    case actions.UPDATE_STATUS:
      return {
        didError: false,
        isUpdating: false,
        list: action.list,
        status: action.status,
      };
    case actions.UPDATING_TASK_STATUS:
      return {
        ...state,
        didError: false,
        isUpdating: true,
      };
    default:
      return state;
  }
};

export default task;
