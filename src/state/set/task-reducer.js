import * as actions from './task-actions';

export const defaultState = {
  didError: false,
  isUpdating: false,
  list: [],
  shouldUpdate: false,
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
    case actions.SHOULD_UPDATE_TASKS:
      return {
        ...state,
        shouldUpdate: true,
      };
    case actions.UPDATE_STATUS:
      return {
        didError: false,
        isUpdating: false,
        shouldUpdate: false,
        list: action.list,
        status: action.status,
      };
    case actions.UPDATING_TASK_STATUS:
      return {
        ...state,
        didError: false,
        isUpdating: true,
        shouldUpdate: false,
      };
    default:
      return state;
  }
};

export default task;
