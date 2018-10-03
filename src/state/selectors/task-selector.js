import { createSelector } from 'reselect';

const getTasks = state => state.tasks;

const taskSelector = createSelector(
  [getTasks],
  tasks => (
    tasks
  ),
);

export default taskSelector;
