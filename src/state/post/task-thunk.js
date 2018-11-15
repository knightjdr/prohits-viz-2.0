import * as taskActions from '../set/task-actions';

import arrUnique from '../../helpers/arr-unique';

const getTaskStatus = task => (
  (dispatch, getStore) => {
    const { tasks } = getStore();
    if (!task && tasks.list.length === 0) {
      return null;
    }
    dispatch(taskActions.updatingTaskStatus());

    const taskList = [...tasks.list];
    if (task) {
      taskList.push(task);
    }

    const body = { tasks: arrUnique(taskList) };
    const headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = `${process.env.REACT_APP_API_ROOT}/task`;
    return fetch(url, {
      cache: 'no-store',
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((taskStatus) => {
        dispatch(taskActions.updateStatus(taskStatus.list, taskStatus.status));
      })
      .catch(() => {
        dispatch(taskActions.updateError());
      });
  }
);

export default getTaskStatus;
