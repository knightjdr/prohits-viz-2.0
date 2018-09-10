import { createSelector } from 'reselect';

const getGo = state => state.go;

const goSelector = createSelector(
  [getGo],
  go => (
    go
  ),
);

export default goSelector;
