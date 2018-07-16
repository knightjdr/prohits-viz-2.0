import { createSelector } from 'reselect';

const getSave = state => state.save;

const GetSave = createSelector(
  [getSave],
  save => (
    save
  ),
);
export default GetSave;
