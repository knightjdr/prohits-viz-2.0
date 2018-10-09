import { createSelector } from 'reselect';

const getSession = state => state.session;

const sessionSelector = createSelector(
  [getSession],
  session => (
    session
  ),
);

export default sessionSelector;
