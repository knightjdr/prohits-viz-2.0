import * as taskActions from '../set/task-actions';

const getTaskStatus = tasks => (
  (dispatch) => {
    dispatch(taskActions.updatingTaskStatus());

    const body = { tasks };
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
