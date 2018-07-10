import { createSelector } from 'reselect';

const getAnnotations = state => state.annotations;

const GetAnnotations = createSelector(
  [getAnnotations],
  annotations => (
    annotations
  ),
);
export default GetAnnotations;
