import { createSelector } from 'reselect';

const getInteractiveFile = state => state.interactiveFile;

const GetInteractiveFile = createSelector(
  [getInteractiveFile],
  interactiveFile => (
    interactiveFile
  ),
);
export default GetInteractiveFile;
