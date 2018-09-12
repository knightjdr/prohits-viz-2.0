import { createSelector } from 'reselect';

const getAnnotations = state => state.annotations;

const annotationsSelector = createSelector(
  [getAnnotations],
  annotations => (
    annotations
  ),
);
export default annotationsSelector;
