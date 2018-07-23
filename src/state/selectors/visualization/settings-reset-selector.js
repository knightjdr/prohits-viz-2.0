import { createSelector } from 'reselect';

const getReset = state => state.settings.reset;

const GetReset = createSelector(
  [getReset],
  reset => (
    reset
  ),
);
export default GetReset;
