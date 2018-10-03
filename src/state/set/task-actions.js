export const ADD_TASK = 'ADD_TASK';
export const UPDATING_TASK_STATUS = 'GETTING_TASK_STATUS';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const updateError = () => ({
  type: UPDATE_ERROR,
});

export const updateStatus = (list, status) => ({
  list,
  status,
  type: UPDATE_STATUS,
});

export const updatingTaskStatus = () => ({
  type: UPDATING_TASK_STATUS,
});
